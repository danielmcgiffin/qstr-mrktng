import { env } from '$env/dynamic/private';
import type { RequestEvent } from '@sveltejs/kit';
import type {
	GraderExtracted,
	GraderResponse,
	GraderScores,
	GraderSuccessResponse,
	OverallGrade
} from '$lib/grader';
import { buildGraderUserPrompt, GRADER_SYSTEM_PROMPT } from '$lib/server/grader-prompt';

const ANTHROPIC_MODEL = 'claude-haiku-4-5-20251001';
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_MAX_TOKENS = 1024;

const RATE_LIMIT_PER_HOUR = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

const SUPABASE_TABLE = 'grader_submissions';

const SCORE_KEYS = ['structure', 'ownership', 'systems', 'decision_criteria', 'freshness'] as const;

const GRADE_VALUES: OverallGrade[] = ['A', 'B', 'C', 'D', 'F'];

type AnthropicTextBlock = {
	type: 'text';
	text: string;
};

type AnthropicResponse = {
	content?: Array<AnthropicTextBlock | { type: string }>;
};

type SupabaseInsertResponse = {
	id: string;
};

type RateLimitResult = {
	allowed: boolean;
	retryAfterSeconds: number;
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

const extractJsonString = (raw: string): string => {
	const trimmed = raw.trim();
	const fenceMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
	const withoutFence = fenceMatch ? fenceMatch[1].trim() : trimmed;

	const firstBrace = withoutFence.indexOf('{');
	const lastBrace = withoutFence.lastIndexOf('}');

	if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
		return withoutFence.slice(firstBrace, lastBrace + 1);
	}

	return withoutFence;
};

const isObject = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null;

const isBoundedInt = (value: unknown, min: number, max: number): value is number =>
	typeof value === 'number' && Number.isInteger(value) && value >= min && value <= max;

const isStringArray = (value: unknown): value is string[] =>
	Array.isArray(value) && value.every((item) => typeof item === 'string');

const isScores = (value: unknown): value is GraderScores => {
	if (!isObject(value)) return false;

	for (const key of SCORE_KEYS) {
		if (!isBoundedInt(value[key], 1, 5)) {
			return false;
		}
	}

	if (!isBoundedInt(value.total, 5, 25)) {
		return false;
	}

	const computedTotal = SCORE_KEYS.reduce((sum, key) => sum + Number(value[key]), 0);
	return value.total === computedTotal;
};

const isExtracted = (value: unknown): value is GraderExtracted => {
	if (!isObject(value)) return false;
	return isStringArray(value.roles) && isStringArray(value.actions) && isStringArray(value.systems);
};

const isOverallGrade = (value: unknown): value is OverallGrade =>
	typeof value === 'string' && GRADE_VALUES.includes(value as OverallGrade);

const isGraderSuccessResponse = (value: unknown): value is GraderSuccessResponse => {
	if (!isObject(value) || value.valid !== true) {
		return false;
	}

	if (!isScores(value.scores)) {
		return false;
	}

	if (!isOverallGrade(value.overall_grade) || typeof value.agent_ready !== 'boolean') {
		return false;
	}

	if (!isExtracted(value.extracted)) {
		return false;
	}

	if (!isStringArray(value.gaps) || value.gaps.length < 3 || value.gaps.length > 6) {
		return false;
	}

	return typeof value.summary === 'string' && value.summary.trim().length > 0;
};

const isGraderRejectionResponse = (
	value: unknown
): value is Extract<GraderResponse, { valid: false }> => {
	if (!isObject(value) || value.valid !== false) {
		return false;
	}

	return value.rejection_reason === 'not_operational_content' && typeof value.message === 'string';
};

const parseGraderResponse = (raw: string): GraderResponse => {
	const parsed = JSON.parse(extractJsonString(raw)) as unknown;

	if (isGraderSuccessResponse(parsed) || isGraderRejectionResponse(parsed)) {
		return parsed;
	}

	throw new Error('Model returned JSON outside expected schema');
};

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

export const gradeSopText = async (text: string): Promise<GraderResponse> => {
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
			system: GRADER_SYSTEM_PROMPT,
			messages: [{ role: 'user', content: buildGraderUserPrompt(text) }]
		})
	});

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`Anthropic request failed (${response.status}): ${body}`);
	}

	const payload = (await response.json()) as AnthropicResponse;
	const textBlock = payload.content?.find((item) => item.type === 'text') as
		| AnthropicTextBlock
		| undefined;

	if (!textBlock?.text) {
		throw new Error('Anthropic response missing text content');
	}

	return parseGraderResponse(textBlock.text);
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

export const createSubmission = async (
	result: GraderSuccessResponse,
	ipHash: string,
	source: string
): Promise<string> => {
	const payload = {
		overall_grade: result.overall_grade,
		total_score: result.scores.total,
		scores: result.scores,
		gaps: result.gaps,
		extracted: result.extracted,
		summary: result.summary,
		source,
		ip_hash: ipHash
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
