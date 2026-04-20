import { env } from '$env/dynamic/private';
import type { RequestEvent } from '@sveltejs/kit';
import type {
	AiReadinessAreas,
	CompositeGraderAreaResult,
	GraderDimensionResult,
	GraderPathology,
	GraderRejectionResponse,
	GraderResponse,
	GraderSuccessResponse,
	HumanReadinessAreas,
	OverallGrade
} from '$lib/grader';
import {
	AI_GRADER_SYSTEM_PROMPT,
	GRADER_PROMPT_VERSION,
	HUMAN_GRADER_SYSTEM_PROMPT,
	buildAiReadinessUserPrompt,
	buildHumanReadinessUserPrompt
} from '$lib/server/grader-prompt';
import { AI_GRADE_TOOL, HUMAN_GRADE_TOOL, REJECT_TOOL } from '$lib/server/grader-tools';
import { gradeForScore, isPassingGrade, RUBRIC_SPEC_VERSION } from '$lib/grader/rubric';

const ANTHROPIC_MODEL = 'claude-haiku-4-5-20251001';
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_MAX_TOKENS = 6000;

const RATE_LIMIT_PER_HOUR = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

const SUPABASE_TABLE = 'grader_submissions';

const DIVERGENCE_THRESHOLD = 4;

type AnthropicToolUseBlock = {
	type: 'tool_use';
	id: string;
	name: string;
	input: Record<string, unknown>;
};

type AnthropicContentBlock = AnthropicToolUseBlock | { type: string };

type AnthropicUsage = {
	input_tokens?: number;
	output_tokens?: number;
	cache_creation_input_tokens?: number;
	cache_read_input_tokens?: number;
};

type AnthropicResponse = {
	id?: string;
	model?: string;
	content?: AnthropicContentBlock[];
	stop_reason?: string;
	usage?: AnthropicUsage;
};

type AnthropicToolArtifact = {
	prompt_kind: 'ai' | 'human';
	response_id: string | null;
	model: string;
	stop_reason: string | null;
	tool_name: string;
	tool_input: Record<string, unknown>;
	usage: AnthropicUsage | null;
};

type AnthropicToolCallResult = {
	tool: AnthropicToolUseBlock;
	artifact: AnthropicToolArtifact;
};

type SupabaseInsertResponse = {
	id: string;
};

type RateLimitResult = {
	allowed: boolean;
	retryAfterSeconds: number;
};

type ModelAreasResult<Areas> = {
	kind: 'grade';
	areas: Areas;
	summary: string;
	artifact: AnthropicToolArtifact;
};

type ModelRejectionResult = {
	kind: 'reject';
	reason: string;
	artifact: AnthropicToolArtifact;
};

type AiRunResult = ModelAreasResult<AiReadinessAreas> | ModelRejectionResult;
type HumanRunResult = ModelAreasResult<HumanReadinessAreas> | ModelRejectionResult;

type VarianceDimensionReport = {
	key: string;
	values: number[];
	min: number;
	max: number;
	span: number;
};

export type VarianceReport = {
	run_count: number;
	trigger_threshold: number;
	max_divergence: number;
	mean_divergence: number;
	third_run_triggered: boolean;
	dimensions: VarianceDimensionReport[];
};

export type GradeComputationArtifacts = {
	prompt_version: string;
	raw_llm_responses: AnthropicToolArtifact[];
	variance_report: {
		ai: VarianceReport | null;
		human: VarianceReport | null;
	};
};

export type GraderDetailedResponse = {
	result: GraderResponse;
	artifacts: GradeComputationArtifacts;
};

export type SubmissionCreateDetails = {
	email?: string | null;
	sopText?: string | null;
	normalizedText?: string | null;
	originalDoc?: string | null;
	file?: {
		name?: string | null;
		size?: number | null;
		mime?: string | null;
	} | null;
	promptVersion?: string | null;
	rawLlmResponses?: unknown;
	varianceReport?: unknown;
	reviewStatus?: 'unreviewed' | 'reviewing' | 'sent' | 'archived';
	founderNote?: string | null;
	overrideScores?: unknown;
	sentAt?: string | null;
	purgeAfter?: string | null;
	ingestMetadata?: unknown;
	docHash?: string | null;
	emailHash?: string | null;
};

const AI_AREA_POINTS = {
	named_doer: 15,
	context_source_named: 20,
	boundaries_defined: 15,
	step_structure: 15,
	decision_points_defined: 15,
	outputs_handoffs_and_completeness: 20
} as const;

const HUMAN_AREA_POINTS = {
	readability: 20,
	scannability: 15,
	self_contained_context: 20,
	references_linked: 15,
	terms_consistent: 15,
	internal_consistency: 15
} as const;

const AI_COMPOSITE_SUBDIMS = {
	boundaries_defined: { process_trigger: 5, process_outcome: 10 },
	step_structure: { step_granularity: 8, step_triggers: 4, step_outcomes: 3 },
	decision_points_defined: { judgment_flagged: 7, criteria_provided: 8 },
	outputs_handoffs_and_completeness: {
		outputs_and_state_changes_named: 8,
		handoffs_explicit: 7,
		process_completeness: 5
	}
} as const;

const AI_PATHOLOGY_MAP: Record<keyof typeof AI_AREA_POINTS, string> = {
	named_doer: 'Heroic Operations detected',
	context_source_named: 'Ask-Sarah dependency detected',
	boundaries_defined: 'Open-loop boundary detected',
	step_structure: 'Fat-step compression detected',
	decision_points_defined: 'Judgment trap detected',
	outputs_handoffs_and_completeness: 'Broken handoff chain detected'
};

const HUMAN_PATHOLOGY_MAP: Record<keyof typeof HUMAN_AREA_POINTS, string> = {
	readability: 'Consultant-speak friction detected',
	scannability: 'Wall-of-text pattern detected',
	self_contained_context: 'Tribal knowledge dependency detected',
	references_linked: 'Missing retrieval path detected',
	terms_consistent: 'Terminology drift detected',
	internal_consistency: 'Contradictory SOP pattern detected'
};

const requireEnv = (key: keyof typeof env): string => {
	const value = env[key];

	if (!value) {
		throw new Error(`${key} is not configured`);
	}

	return value;
};

const getSupabaseRestUrl = (): string => `${requireEnv('SUPABASE_URL')}/rest/v1/${SUPABASE_TABLE}`;

const getSupabaseHeaders = (prefer?: string): HeadersInit => {
	const key = requireEnv('SUPABASE_SERVICE_ROLE_KEY');

	const headers: HeadersInit = {
		apikey: key,
		Authorization: `Bearer ${key}`,
		'Content-Type': 'application/json'
	};

	if (prefer) {
		headers.Prefer = prefer;
	}

	return headers;
};

const isObject = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null;

const isStringArray = (value: unknown): value is string[] =>
	Array.isArray(value) && value.every((item) => typeof item === 'string');

const isBoundedInt = (value: unknown, min: number, max: number): value is number =>
	typeof value === 'number' && Number.isInteger(value) && value >= min && value <= max;

const coerceDimensionResult = (value: unknown, maxScore: number): GraderDimensionResult | null => {
	if (!isObject(value)) return null;
	if (!isBoundedInt(value.score, 0, maxScore)) return null;

	const reasoning = typeof value.reasoning === 'string' ? value.reasoning : '';
	const disqualifiers = isStringArray(value.disqualifiers_present)
		? value.disqualifiers_present
		: [];

	return {
		score: value.score,
		reasoning,
		disqualifiers_present: disqualifiers
	};
};

const coerceCompositeArea = <SubdimKey extends string>(
	value: unknown,
	maxScore: number,
	subdimPoints: Record<SubdimKey, number>
): (GraderDimensionResult & { subdims: Record<SubdimKey, GraderDimensionResult> }) | null => {
	const dim = coerceDimensionResult(value, maxScore);
	if (!dim) return null;

	const composite = value as Record<string, unknown> & { subdims?: Record<string, unknown> };
	const rawSubdims = isObject(composite.subdims) ? composite.subdims : {};

	const coercedSubdims = {} as Record<SubdimKey, GraderDimensionResult>;
	for (const [key, points] of Object.entries(subdimPoints) as Array<[SubdimKey, number]>) {
		const coerced = coerceDimensionResult(rawSubdims[key], points);
		if (!coerced) return null;
		coercedSubdims[key] = coerced;
	}

	return {
		...dim,
		subdims: coercedSubdims
	};
};

const coerceAiAreas = (value: unknown): AiReadinessAreas | null => {
	if (!isObject(value)) return null;

	const namedDoer = coerceDimensionResult(value.named_doer, AI_AREA_POINTS.named_doer);
	const contextSource = coerceDimensionResult(
		value.context_source_named,
		AI_AREA_POINTS.context_source_named
	);
	const boundaries = coerceCompositeArea(
		value.boundaries_defined,
		AI_AREA_POINTS.boundaries_defined,
		AI_COMPOSITE_SUBDIMS.boundaries_defined
	);
	const stepStructure = coerceCompositeArea(
		value.step_structure,
		AI_AREA_POINTS.step_structure,
		AI_COMPOSITE_SUBDIMS.step_structure
	);
	const decisionPoints = coerceCompositeArea(
		value.decision_points_defined,
		AI_AREA_POINTS.decision_points_defined,
		AI_COMPOSITE_SUBDIMS.decision_points_defined
	);
	const outputsHandoffs = coerceCompositeArea(
		value.outputs_handoffs_and_completeness,
		AI_AREA_POINTS.outputs_handoffs_and_completeness,
		AI_COMPOSITE_SUBDIMS.outputs_handoffs_and_completeness
	);

	if (
		!namedDoer ||
		!contextSource ||
		!boundaries ||
		!stepStructure ||
		!decisionPoints ||
		!outputsHandoffs
	) {
		return null;
	}

	return {
		named_doer: namedDoer,
		context_source_named: contextSource,
		boundaries_defined: boundaries,
		step_structure: stepStructure,
		decision_points_defined: decisionPoints,
		outputs_handoffs_and_completeness: outputsHandoffs
	};
};

const coerceHumanAreas = (value: unknown): HumanReadinessAreas | null => {
	if (!isObject(value)) return null;

	const readability = coerceDimensionResult(value.readability, HUMAN_AREA_POINTS.readability);
	const scannability = coerceDimensionResult(value.scannability, HUMAN_AREA_POINTS.scannability);
	const selfContainedContext = coerceDimensionResult(
		value.self_contained_context,
		HUMAN_AREA_POINTS.self_contained_context
	);
	const referencesLinked = coerceDimensionResult(
		value.references_linked,
		HUMAN_AREA_POINTS.references_linked
	);
	const termsConsistent = coerceDimensionResult(
		value.terms_consistent,
		HUMAN_AREA_POINTS.terms_consistent
	);
	const internalConsistency = coerceDimensionResult(
		value.internal_consistency,
		HUMAN_AREA_POINTS.internal_consistency
	);

	if (
		!readability ||
		!scannability ||
		!selfContainedContext ||
		!referencesLinked ||
		!termsConsistent ||
		!internalConsistency
	) {
		return null;
	}

	return {
		readability,
		scannability,
		self_contained_context: selfContainedContext,
		references_linked: referencesLinked,
		terms_consistent: termsConsistent,
		internal_consistency: internalConsistency
	};
};

const totalAiScore = (areas: AiReadinessAreas): number =>
	Object.keys(AI_AREA_POINTS).reduce(
		(sum, key) => sum + Number(areas[key as keyof AiReadinessAreas].score),
		0
	);

const totalHumanScore = (areas: HumanReadinessAreas): number =>
	Object.keys(HUMAN_AREA_POINTS).reduce(
		(sum, key) => sum + Number(areas[key as keyof HumanReadinessAreas].score),
		0
	);

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

export const isValidEmail = (email: string): boolean =>
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));

export const getClientIp = (event: RequestEvent): string => {
	const cfIp = event.request.headers.get('cf-connecting-ip');
	if (cfIp) return cfIp;

	const forwarded = event.request.headers.get('x-forwarded-for');
	if (forwarded) {
		return forwarded.split(',')[0]?.trim() || forwarded;
	}

	const realIp = event.request.headers.get('x-real-ip');
	if (realIp) return realIp;

	try {
		return event.getClientAddress();
	} catch {
		return '0.0.0.0';
	}
};

export const hashIp = async (ip: string): Promise<string> => {
	const salt = env.IP_HASH_SALT ?? 'qstr-grader';
	const payload = new TextEncoder().encode(`${salt}:${ip}`);
	const digest = await crypto.subtle.digest('SHA-256', payload);

	return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
};

const getRecentSubmissions = async (ipHash: string): Promise<string[]> => {
	const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
	const url = new URL(getSupabaseRestUrl());

	url.searchParams.set('select', 'created_at');
	url.searchParams.set('ip_hash', `eq.${ipHash}`);
	url.searchParams.set('created_at', `gte.${windowStart}`);
	url.searchParams.set('order', 'created_at.asc');
	url.searchParams.set('limit', String(RATE_LIMIT_PER_HOUR));

	const response = await fetch(url, {
		method: 'GET',
		headers: getSupabaseHeaders()
	});

	if (!response.ok) {
		throw new Error(`Rate limit lookup failed with status ${response.status}`);
	}

	const rows = (await response.json()) as Array<{ created_at?: string }>;
	return rows
		.map((row) => row.created_at)
		.filter((createdAt): createdAt is string => typeof createdAt === 'string');
};

export const checkRateLimit = async (ipHash: string): Promise<RateLimitResult> => {
	const timestamps = await getRecentSubmissions(ipHash);

	if (timestamps.length < RATE_LIMIT_PER_HOUR) {
		return { allowed: true, retryAfterSeconds: 0 };
	}

	const oldest = timestamps[0];
	const oldestMs = oldest ? Date.parse(oldest) : Date.now();
	const elapsedMs = Date.now() - oldestMs;
	const retryAfterSeconds = Math.max(1, Math.ceil((RATE_LIMIT_WINDOW_MS - elapsedMs) / 1000));

	return {
		allowed: false,
		retryAfterSeconds
	};
};

const getAnthropicApiKey = (): string => requireEnv('ANTHROPIC_API_KEY');

type ToolDef = typeof AI_GRADE_TOOL | typeof HUMAN_GRADE_TOOL | typeof REJECT_TOOL;

const callAnthropicTool = async (
	promptKind: 'ai' | 'human',
	systemPrompt: string,
	userPrompt: string,
	tools: ToolDef[]
): Promise<AnthropicToolCallResult> => {
	const response = await fetch(ANTHROPIC_API_URL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'x-api-key': getAnthropicApiKey(),
			'anthropic-version': '2023-06-01'
		},
		body: JSON.stringify({
			model: ANTHROPIC_MODEL,
			max_tokens: ANTHROPIC_MAX_TOKENS,
			temperature: 0,
			system: systemPrompt,
			tools,
			tool_choice: { type: 'any' },
			messages: [{ role: 'user', content: userPrompt }]
		})
	});

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`Anthropic request failed (${response.status}): ${body}`);
	}

	const payload = (await response.json()) as AnthropicResponse;
	const toolBlock = payload.content?.find(
		(item): item is AnthropicToolUseBlock => item.type === 'tool_use'
	);

	if (!toolBlock) {
		throw new Error(
			`Anthropic response missing tool_use block (stop_reason=${payload.stop_reason ?? 'unknown'})`
		);
	}

	return {
		tool: toolBlock,
		artifact: {
			prompt_kind: promptKind,
			response_id: payload.id ?? null,
			model: payload.model ?? ANTHROPIC_MODEL,
			stop_reason: payload.stop_reason ?? null,
			tool_name: toolBlock.name,
			tool_input: toolBlock.input,
			usage: payload.usage ?? null
		}
	};
};

const withRetry = async <T>(operation: () => Promise<T>, label: string): Promise<T> => {
	try {
		return await operation();
	} catch (error) {
		console.warn(`${label} failed once; retrying`, error);
		return operation();
	}
};

const extractSummary = (input: Record<string, unknown>): string => {
	if (typeof input.summary === 'string') return input.summary;
	return '';
};

const interpretAiTool = (call: AnthropicToolCallResult): AiRunResult => {
	const { tool, artifact } = call;
	if (tool.name === AI_GRADE_TOOL.name) {
		const input = tool.input as Record<string, unknown>;
		const areas = coerceAiAreas(input.areas);
		if (areas) {
			return { kind: 'grade', areas, summary: extractSummary(input), artifact };
		}
		console.warn('AI readiness tool input failed coercion', JSON.stringify(input).slice(0, 2000));
		throw new Error('AI readiness tool input failed validation');
	}

	if (tool.name === REJECT_TOOL.name) {
		const raw = (tool.input as Record<string, unknown>).reason;
		const reason = typeof raw === 'string' ? raw : '';
		return { kind: 'reject', reason, artifact };
	}

	throw new Error(`Unexpected AI tool: ${tool.name}`);
};

const interpretHumanTool = (call: AnthropicToolCallResult): HumanRunResult => {
	const { tool, artifact } = call;
	if (tool.name === HUMAN_GRADE_TOOL.name) {
		const input = tool.input as Record<string, unknown>;
		const areas = coerceHumanAreas(input.areas);
		if (areas) {
			return { kind: 'grade', areas, summary: extractSummary(input), artifact };
		}
		console.warn(
			'Human readiness tool input failed coercion',
			JSON.stringify(input).slice(0, 2000)
		);
		throw new Error('Human readiness tool input failed validation');
	}

	if (tool.name === REJECT_TOOL.name) {
		const raw = (tool.input as Record<string, unknown>).reason;
		const reason = typeof raw === 'string' ? raw : '';
		return { kind: 'reject', reason, artifact };
	}

	throw new Error(`Unexpected human tool: ${tool.name}`);
};

const runAiReadinessOnce = async (text: string): Promise<AiRunResult> =>
	withRetry(async () => {
		const tool = await callAnthropicTool(
			'ai',
			AI_GRADER_SYSTEM_PROMPT,
			buildAiReadinessUserPrompt(text),
			[AI_GRADE_TOOL, REJECT_TOOL]
		);
		return interpretAiTool(tool);
	}, 'AI readiness tool call');

const runHumanReadinessOnce = async (text: string): Promise<HumanRunResult> =>
	withRetry(async () => {
		const tool = await callAnthropicTool(
			'human',
			HUMAN_GRADER_SYSTEM_PROMPT,
			buildHumanReadinessUserPrompt(text),
			[HUMAN_GRADE_TOOL, REJECT_TOOL]
		);
		return interpretHumanTool(tool);
	}, 'Human readiness tool call');

const medianByScore = <T extends { score: number }>(items: T[]): T => {
	if (items.length === 0) {
		throw new Error('medianByScore received empty array');
	}
	const sorted = [...items].sort((a, b) => a.score - b.score);
	const idx = Math.floor((sorted.length - 1) / 2);
	return sorted[idx];
};

const mergeDim = (runs: GraderDimensionResult[]): GraderDimensionResult => {
	const median = medianByScore(runs);
	return {
		score: median.score,
		reasoning: median.reasoning,
		disqualifiers_present: median.disqualifiers_present
	};
};

const mergeComposite = <SubdimKey extends string>(
	runs: Array<CompositeGraderAreaResult<SubdimKey>>,
	subdimKeys: readonly SubdimKey[]
): CompositeGraderAreaResult<SubdimKey> => {
	const mergedSubdims = {} as Record<SubdimKey, GraderDimensionResult>;
	for (const key of subdimKeys) {
		mergedSubdims[key] = mergeDim(runs.map((run) => run.subdims[key]));
	}

	const total = subdimKeys.reduce((sum, key) => sum + mergedSubdims[key].score, 0);
	const closest = [...runs].sort(
		(a, b) => Math.abs(a.score - total) - Math.abs(b.score - total)
	)[0];

	return {
		score: total,
		reasoning: closest.reasoning,
		disqualifiers_present: closest.disqualifiers_present,
		subdims: mergedSubdims
	};
};

const mergeAiAreas = (runs: AiReadinessAreas[]): AiReadinessAreas => ({
	named_doer: mergeDim(runs.map((run) => run.named_doer)),
	context_source_named: mergeDim(runs.map((run) => run.context_source_named)),
	boundaries_defined: mergeComposite(
		runs.map((run) => run.boundaries_defined),
		Object.keys(AI_COMPOSITE_SUBDIMS.boundaries_defined) as Array<
			keyof typeof AI_COMPOSITE_SUBDIMS.boundaries_defined
		>
	),
	step_structure: mergeComposite(
		runs.map((run) => run.step_structure),
		Object.keys(AI_COMPOSITE_SUBDIMS.step_structure) as Array<
			keyof typeof AI_COMPOSITE_SUBDIMS.step_structure
		>
	),
	decision_points_defined: mergeComposite(
		runs.map((run) => run.decision_points_defined),
		Object.keys(AI_COMPOSITE_SUBDIMS.decision_points_defined) as Array<
			keyof typeof AI_COMPOSITE_SUBDIMS.decision_points_defined
		>
	),
	outputs_handoffs_and_completeness: mergeComposite(
		runs.map((run) => run.outputs_handoffs_and_completeness),
		Object.keys(AI_COMPOSITE_SUBDIMS.outputs_handoffs_and_completeness) as Array<
			keyof typeof AI_COMPOSITE_SUBDIMS.outputs_handoffs_and_completeness
		>
	)
});

const mergeHumanAreas = (runs: HumanReadinessAreas[]): HumanReadinessAreas => ({
	readability: mergeDim(runs.map((run) => run.readability)),
	scannability: mergeDim(runs.map((run) => run.scannability)),
	self_contained_context: mergeDim(runs.map((run) => run.self_contained_context)),
	references_linked: mergeDim(runs.map((run) => run.references_linked)),
	terms_consistent: mergeDim(runs.map((run) => run.terms_consistent)),
	internal_consistency: mergeDim(runs.map((run) => run.internal_consistency))
});

type DimensionScoreEntry = {
	key: string;
	score: number;
};

const pairMaxDivergence = (a: number, b: number): number => Math.abs(a - b);

const aiDimensionEntries = (areas: AiReadinessAreas): DimensionScoreEntry[] => [
	{ key: 'named_doer', score: areas.named_doer.score },
	{ key: 'context_source_named', score: areas.context_source_named.score },
	{ key: 'boundaries_defined', score: areas.boundaries_defined.score },
	{
		key: 'boundaries_defined.process_trigger',
		score: areas.boundaries_defined.subdims.process_trigger.score
	},
	{
		key: 'boundaries_defined.process_outcome',
		score: areas.boundaries_defined.subdims.process_outcome.score
	},
	{ key: 'step_structure', score: areas.step_structure.score },
	{
		key: 'step_structure.step_granularity',
		score: areas.step_structure.subdims.step_granularity.score
	},
	{ key: 'step_structure.step_triggers', score: areas.step_structure.subdims.step_triggers.score },
	{ key: 'step_structure.step_outcomes', score: areas.step_structure.subdims.step_outcomes.score },
	{ key: 'decision_points_defined', score: areas.decision_points_defined.score },
	{
		key: 'decision_points_defined.judgment_flagged',
		score: areas.decision_points_defined.subdims.judgment_flagged.score
	},
	{
		key: 'decision_points_defined.criteria_provided',
		score: areas.decision_points_defined.subdims.criteria_provided.score
	},
	{
		key: 'outputs_handoffs_and_completeness',
		score: areas.outputs_handoffs_and_completeness.score
	},
	{
		key: 'outputs_handoffs_and_completeness.outputs_and_state_changes_named',
		score: areas.outputs_handoffs_and_completeness.subdims.outputs_and_state_changes_named.score
	},
	{
		key: 'outputs_handoffs_and_completeness.handoffs_explicit',
		score: areas.outputs_handoffs_and_completeness.subdims.handoffs_explicit.score
	},
	{
		key: 'outputs_handoffs_and_completeness.process_completeness',
		score: areas.outputs_handoffs_and_completeness.subdims.process_completeness.score
	}
];

const humanDimensionEntries = (areas: HumanReadinessAreas): DimensionScoreEntry[] => [
	{ key: 'readability', score: areas.readability.score },
	{ key: 'scannability', score: areas.scannability.score },
	{ key: 'self_contained_context', score: areas.self_contained_context.score },
	{ key: 'references_linked', score: areas.references_linked.score },
	{ key: 'terms_consistent', score: areas.terms_consistent.score },
	{ key: 'internal_consistency', score: areas.internal_consistency.score }
];

const anyDimensionDiverges = (a: DimensionScoreEntry[], b: DimensionScoreEntry[]): boolean => {
	if (a.length !== b.length) return true;
	for (let i = 0; i < a.length; i += 1) {
		if (pairMaxDivergence(a[i].score, b[i].score) > DIVERGENCE_THRESHOLD) {
			return true;
		}
	}
	return false;
};

const buildVarianceReport = (runs: DimensionScoreEntry[][]): VarianceReport => {
	const dimensions =
		runs[0]?.map((entry, index) => {
			const values = runs.map((run) => run[index]?.score ?? 0);
			const min = Math.min(...values);
			const max = Math.max(...values);
			return {
				key: entry.key,
				values,
				min,
				max,
				span: max - min
			};
		}) ?? [];

	const totalSpan = dimensions.reduce((sum, dimension) => sum + dimension.span, 0);
	const maxDivergence = dimensions.reduce((max, dimension) => Math.max(max, dimension.span), 0);

	return {
		run_count: runs.length,
		trigger_threshold: DIVERGENCE_THRESHOLD,
		max_divergence: maxDivergence,
		mean_divergence: dimensions.length ? totalSpan / dimensions.length : 0,
		third_run_triggered: runs.length > 2,
		dimensions
	};
};

type AiGradeOutcome =
	| {
			kind: 'grade';
			areas: AiReadinessAreas;
			summary: string;
			runCount: number;
			rawResponses: AnthropicToolArtifact[];
			varianceReport: VarianceReport;
	  }
	| {
			kind: 'reject';
			reason: string;
			rawResponses: AnthropicToolArtifact[];
			varianceReport: VarianceReport | null;
	  };

type HumanGradeOutcome =
	| {
			kind: 'grade';
			areas: HumanReadinessAreas;
			summary: string;
			runCount: number;
			rawResponses: AnthropicToolArtifact[];
			varianceReport: VarianceReport;
	  }
	| {
			kind: 'reject';
			reason: string;
			rawResponses: AnthropicToolArtifact[];
			varianceReport: VarianceReport | null;
	  };

const gradeAiReadinessWithVariance = async (text: string): Promise<AiGradeOutcome> => {
	const [first, second] = await Promise.all([runAiReadinessOnce(text), runAiReadinessOnce(text)]);
	const initialArtifacts = [first.artifact, second.artifact];

	if (first.kind === 'reject') {
		return {
			kind: 'reject',
			reason: first.reason,
			rawResponses: initialArtifacts,
			varianceReport: null
		};
	}
	if (second.kind === 'reject') {
		return {
			kind: 'reject',
			reason: second.reason,
			rawResponses: initialArtifacts,
			varianceReport: null
		};
	}

	let runs: Array<ModelAreasResult<AiReadinessAreas>> = [first, second];

	if (anyDimensionDiverges(aiDimensionEntries(first.areas), aiDimensionEntries(second.areas))) {
		const third = await runAiReadinessOnce(text);
		if (third.kind === 'reject') {
			return {
				kind: 'reject',
				reason: third.reason,
				rawResponses: [...initialArtifacts, third.artifact],
				varianceReport: null
			};
		}
		runs = [first, second, third];
	}

	const mergedAreas = mergeAiAreas(runs.map((run) => run.areas));
	return {
		kind: 'grade',
		areas: mergedAreas,
		summary: runs[0].summary,
		runCount: runs.length,
		rawResponses: runs.map((run) => run.artifact),
		varianceReport: buildVarianceReport(runs.map((run) => aiDimensionEntries(run.areas)))
	};
};

const gradeHumanReadinessWithVariance = async (text: string): Promise<HumanGradeOutcome> => {
	const [first, second] = await Promise.all([
		runHumanReadinessOnce(text),
		runHumanReadinessOnce(text)
	]);
	const initialArtifacts = [first.artifact, second.artifact];

	if (first.kind === 'reject') {
		return {
			kind: 'reject',
			reason: first.reason,
			rawResponses: initialArtifacts,
			varianceReport: null
		};
	}
	if (second.kind === 'reject') {
		return {
			kind: 'reject',
			reason: second.reason,
			rawResponses: initialArtifacts,
			varianceReport: null
		};
	}

	let runs: Array<ModelAreasResult<HumanReadinessAreas>> = [first, second];

	if (
		anyDimensionDiverges(humanDimensionEntries(first.areas), humanDimensionEntries(second.areas))
	) {
		const third = await runHumanReadinessOnce(text);
		if (third.kind === 'reject') {
			return {
				kind: 'reject',
				reason: third.reason,
				rawResponses: [...initialArtifacts, third.artifact],
				varianceReport: null
			};
		}
		runs = [first, second, third];
	}

	const mergedAreas = mergeHumanAreas(runs.map((run) => run.areas));
	return {
		kind: 'grade',
		areas: mergedAreas,
		summary: runs[0].summary,
		runCount: runs.length,
		rawResponses: runs.map((run) => run.artifact),
		varianceReport: buildVarianceReport(runs.map((run) => humanDimensionEntries(run.areas)))
	};
};

const rejectionFromReason = (reason: string): GraderRejectionResponse => ({
	valid: false,
	rejection_reason: 'not_operational_content',
	message: reason?.trim().length
		? reason.trim()
		: 'This tool analyzes operational documents like SOPs, process guides, and workflow descriptions. Paste a paragraph from one of those to get your agent-readiness score.'
});

const buildPathologies = (
	aiAreas: AiReadinessAreas,
	humanAreas: HumanReadinessAreas
): GraderPathology[] => {
	const aiEntries = Object.entries(AI_AREA_POINTS).map(([area, points]) => {
		const result = aiAreas[area as keyof AiReadinessAreas];
		return {
			title: AI_PATHOLOGY_MAP[area as keyof typeof AI_PATHOLOGY_MAP],
			detail: result.reasoning,
			source: 'ai' as const,
			area,
			ratio: result.score / points,
			score: result.score
		};
	});

	const humanEntries = Object.entries(HUMAN_AREA_POINTS).map(([area, points]) => {
		const result = humanAreas[area as keyof HumanReadinessAreas];
		return {
			title: HUMAN_PATHOLOGY_MAP[area as keyof typeof HUMAN_PATHOLOGY_MAP],
			detail: result.reasoning,
			source: 'human' as const,
			area,
			ratio: result.score / points,
			score: result.score
		};
	});

	return [...aiEntries, ...humanEntries]
		.sort((a, b) => a.ratio - b.ratio || a.score - b.score)
		.slice(0, 3)
		.map(({ title, detail, source, area }) => ({ title, detail, source, area }));
};

const buildCombinedSummary = (
	aiScore: number,
	aiGrade: OverallGrade,
	aiSummary: string,
	humanScore: number,
	humanGrade: OverallGrade,
	humanSummary: string
): string =>
	`AI readiness is ${aiGrade} (${aiScore}/100). ${aiSummary} Human readiness is ${humanGrade} (${humanScore}/100). ${humanSummary}`;

const buildSuccessResponse = (
	aiAreas: AiReadinessAreas,
	aiSummary: string,
	humanAreas: HumanReadinessAreas,
	humanSummary: string
): GraderSuccessResponse => {
	const aiScore = totalAiScore(aiAreas);
	const humanScore = totalHumanScore(humanAreas);
	const aiGrade = gradeForScore(aiScore);
	const humanGrade = gradeForScore(humanScore);

	return {
		valid: true,
		spec_version: RUBRIC_SPEC_VERSION,
		ai_readiness: {
			score: aiScore,
			grade: aiGrade,
			areas: aiAreas,
			summary: aiSummary
		},
		human_readiness: {
			score: humanScore,
			grade: humanGrade,
			areas: humanAreas,
			summary: humanSummary
		},
		pathologies: buildPathologies(aiAreas, humanAreas),
		summary: buildCombinedSummary(
			aiScore,
			aiGrade,
			aiSummary,
			humanScore,
			humanGrade,
			humanSummary
		),
		follow_up_cta:
			isPassingGrade(aiGrade) && isPassingGrade(humanGrade) ? 'try_quaestor_free' : 'book_demo'
	};
};

export const gradeSopTextDetailed = async (text: string): Promise<GraderDetailedResponse> => {
	const [aiOutcome, humanOutcome] = await Promise.all([
		gradeAiReadinessWithVariance(text),
		gradeHumanReadinessWithVariance(text)
	]);

	if (aiOutcome.kind === 'reject') {
		return {
			result: rejectionFromReason(aiOutcome.reason),
			artifacts: {
				prompt_version: GRADER_PROMPT_VERSION,
				raw_llm_responses: [...aiOutcome.rawResponses, ...humanOutcome.rawResponses],
				variance_report: {
					ai: aiOutcome.varianceReport,
					human: humanOutcome.varianceReport
				}
			}
		};
	}

	if (humanOutcome.kind === 'reject') {
		return {
			result: rejectionFromReason(humanOutcome.reason),
			artifacts: {
				prompt_version: GRADER_PROMPT_VERSION,
				raw_llm_responses: [...aiOutcome.rawResponses, ...humanOutcome.rawResponses],
				variance_report: {
					ai: aiOutcome.varianceReport,
					human: humanOutcome.varianceReport
				}
			}
		};
	}

	return {
		result: buildSuccessResponse(
			aiOutcome.areas,
			aiOutcome.summary,
			humanOutcome.areas,
			humanOutcome.summary
		),
		artifacts: {
			prompt_version: GRADER_PROMPT_VERSION,
			raw_llm_responses: [...aiOutcome.rawResponses, ...humanOutcome.rawResponses],
			variance_report: {
				ai: aiOutcome.varianceReport,
				human: humanOutcome.varianceReport
			}
		}
	};
};

export const gradeSopText = async (text: string): Promise<GraderResponse> => {
	const detailed = await gradeSopTextDetailed(text);
	return detailed.result;
};

export const sanitizeSource = (value: unknown): string => {
	if (typeof value !== 'string') {
		return 'organic';
	}

	const trimmed = value.trim().toLowerCase();
	if (!trimmed) {
		return 'organic';
	}

	return trimmed.replace(/[^a-z0-9_:/.-]/g, '-').slice(0, 64) || 'organic';
};

const defaultPurgeAfter = (): string =>
	new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

export const createSubmission = async (
	result: GraderSuccessResponse,
	ipHash: string,
	source: string,
	details: SubmissionCreateDetails = {}
): Promise<string> => {
	const legacyTotalScore = Math.max(5, Math.min(25, Math.round(result.ai_readiness.score / 4)));
	const normalizedEmail = details.email ? normalizeEmail(details.email) : null;
	const emailHash = details.emailHash ?? (normalizedEmail ? await hashIp(normalizedEmail) : null);
	const payload = {
		email: normalizedEmail,
		email_hash: emailHash,
		overall_grade: result.ai_readiness.grade,
		total_score: legacyTotalScore,
		scores: {
			spec_version: result.spec_version,
			ai_readiness: result.ai_readiness,
			human_readiness: result.human_readiness,
			follow_up_cta: result.follow_up_cta
		},
		gaps: result.pathologies.map((pathology) => `${pathology.title}: ${pathology.detail}`),
		extracted: {
			pathologies: result.pathologies,
			ingest_metadata: details.ingestMetadata ?? null
		},
		summary: result.summary,
		sop_text: details.sopText ?? null,
		source,
		ip_hash: ipHash,
		doc_hash: details.docHash ?? null,
		spec_version: result.spec_version,
		prompt_version: details.promptVersion ?? null,
		file_name: details.file?.name ?? null,
		file_size: details.file?.size ?? null,
		file_mime: details.file?.mime ?? null,
		normalized_text: details.normalizedText ?? null,
		original_doc: details.originalDoc ?? null,
		raw_llm_responses: details.rawLlmResponses ?? [],
		variance_report: details.varianceReport ?? null,
		review_status: details.reviewStatus ?? 'unreviewed',
		founder_note: details.founderNote ?? null,
		override_scores: details.overrideScores ?? null,
		sent_at: details.sentAt ?? null,
		purge_after: details.purgeAfter ?? defaultPurgeAfter()
	};

	const response = await fetch(getSupabaseRestUrl(), {
		method: 'POST',
		headers: getSupabaseHeaders('return=representation'),
		body: JSON.stringify(payload)
	});

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`Supabase insert failed (${response.status}): ${body}`);
	}

	const rows = (await response.json()) as SupabaseInsertResponse[];
	const id = rows[0]?.id;

	if (!id) {
		throw new Error('Supabase insert did not return submission id');
	}

	return id;
};

export const attachEmailAndSopText = async (params: {
	submissionId: string;
	ipHash: string;
	email: string;
	sopText: string;
}): Promise<boolean> => {
	const url = new URL(getSupabaseRestUrl());
	url.searchParams.set('id', `eq.${params.submissionId}`);
	url.searchParams.set('ip_hash', `eq.${params.ipHash}`);
	url.searchParams.set('email', 'is.null');

	const response = await fetch(url, {
		method: 'PATCH',
		headers: getSupabaseHeaders('return=representation'),
		body: JSON.stringify({
			email: normalizeEmail(params.email),
			email_hash: await hashIp(normalizeEmail(params.email)),
			sop_text: params.sopText
		})
	});

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`Supabase update failed (${response.status}): ${body}`);
	}

	const rows = (await response.json()) as Array<{ id: string }>;
	return rows.length > 0;
};
