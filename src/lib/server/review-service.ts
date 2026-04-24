import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { error, type Cookies, type RequestEvent } from '@sveltejs/kit';
import type { GraderSuccessResponse } from '$lib/grader';
import { buildEmailReportPayload, sendEmailReport } from '$lib/server/email-report';
import { gradeSopTextDetailed } from '$lib/server/grader-service';

export const ADMIN_COOKIE = 'qstr_admin_token';
const REVIEW_STATUSES = ['unreviewed', 'reviewing', 'sent', 'archived'] as const;
export type ReviewStatus = (typeof REVIEW_STATUSES)[number];
type EmailReportInput = Parameters<typeof buildEmailReportPayload>[0];

export type ReviewSubmissionRow = {
	id: string;
	email: string | null;
	overall_grade: string;
	total_score: number;
	summary: string;
	source: string | null;
	created_at: string;
	review_status: ReviewStatus | null;
	founder_note: string | null;
	spec_version?: string | null;
	prompt_version?: string | null;
	scores?: Record<string, unknown> | null;
	extracted?: Record<string, unknown> | null;
	normalized_text?: string | null;
	original_doc?: string | null;
	raw_llm_responses?: unknown;
	variance_report?: unknown;
	override_scores?: unknown;
	sent_at?: string | null;
	file_name?: string | null;
	file_size?: number | null;
	file_mime?: string | null;
};

const getExpectedToken = (): string => env.PRIVATE_ADMIN_TOKEN?.trim() || '';

const isObject = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null;

const isFollowUpCta = (value: unknown): value is GraderSuccessResponse['follow_up_cta'] =>
	value === 'book_demo' || value === 'try_quaestor_free';

const isReadinessBlock = (
	value: unknown
): value is GraderSuccessResponse['ai_readiness'] | GraderSuccessResponse['human_readiness'] =>
	isObject(value) &&
	typeof value.score === 'number' &&
	typeof value.grade === 'string' &&
	typeof value.summary === 'string' &&
	isObject(value.areas);

const isPersistedScoreEnvelope = (value: unknown): value is EmailReportInput['result'] =>
	isObject(value) &&
	typeof value.spec_version === 'string' &&
	isReadinessBlock(value.ai_readiness) &&
	isReadinessBlock(value.human_readiness) &&
	isFollowUpCta(value.follow_up_cta);

const getSupabaseBaseUrl = (): string => {
	const base = env.SUPABASE_URL?.trim();
	const key = env.SUPABASE_SERVICE_ROLE_KEY?.trim();
	if (!base || !key) {
		throw error(503, 'Supabase admin access is not configured.');
	}
	return `${base}/rest/v1/grader_submissions`;
};

const getSupabaseHeaders = (): HeadersInit => {
	const key = env.SUPABASE_SERVICE_ROLE_KEY?.trim();
	if (!key) {
		throw error(503, 'Supabase admin access is not configured.');
	}
	return {
		apikey: key,
		Authorization: `Bearer ${key}`,
		'Content-Type': 'application/json'
	};
};

export const isValidAdminToken = (token: string | null | undefined): boolean => {
	const expected = getExpectedToken();
	return Boolean(expected) && token === expected;
};

export const isReviewStatus = (value: unknown): value is ReviewStatus =>
	typeof value === 'string' && REVIEW_STATUSES.includes(value as ReviewStatus);

export const getAdminToken = (event: RequestEvent): string =>
	event.url.searchParams.get('admin_token')?.trim() || event.cookies.get(ADMIN_COOKIE) || '';

export const requireAdmin = (event: RequestEvent): void => {
	const token = getAdminToken(event);
	if (!isValidAdminToken(token)) {
		throw error(401, 'Admin token required.');
	}
};

export const persistAdminTokenCookie = (cookies: Cookies, token: string): void => {
	if (!isValidAdminToken(token)) return;
	cookies.set(ADMIN_COOKIE, token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: !dev,
		maxAge: 60 * 60 * 24 * 7
	});
};

export const listReviewSubmissions = async (status?: string): Promise<ReviewSubmissionRow[]> => {
	const url = new URL(getSupabaseBaseUrl());
	url.searchParams.set(
		'select',
		'id,email,overall_grade,total_score,summary,source,created_at,review_status,founder_note,spec_version,sent_at,file_name'
	);
	if (isReviewStatus(status)) {
		url.searchParams.set('review_status', `eq.${status}`);
	}
	url.searchParams.set('order', 'created_at.desc');
	url.searchParams.set('limit', '200');

	const response = await fetch(url, { headers: getSupabaseHeaders(), method: 'GET' });
	if (!response.ok) {
		throw error(502, 'Could not load review queue.');
	}
	return (await response.json()) as ReviewSubmissionRow[];
};

export const getReviewSubmission = async (id: string): Promise<ReviewSubmissionRow | null> => {
	const url = new URL(getSupabaseBaseUrl());
	url.searchParams.set(
		'select',
		'id,email,overall_grade,total_score,summary,source,created_at,review_status,founder_note,spec_version,prompt_version,scores,extracted,normalized_text,original_doc,raw_llm_responses,variance_report,override_scores,sent_at,file_name,file_size,file_mime'
	);
	url.searchParams.set('id', `eq.${id}`);
	url.searchParams.set('limit', '1');

	const response = await fetch(url, { headers: getSupabaseHeaders(), method: 'GET' });
	if (!response.ok) {
		throw error(502, 'Could not load review item.');
	}
	const rows = (await response.json()) as ReviewSubmissionRow[];
	return rows[0] ?? null;
};

export const updateReviewSubmission = async (
	id: string,
	payload: Partial<
		Pick<ReviewSubmissionRow, 'founder_note' | 'override_scores' | 'review_status' | 'sent_at'>
	>
): Promise<boolean> => {
	const url = new URL(getSupabaseBaseUrl());
	url.searchParams.set('id', `eq.${id}`);

	const response = await fetch(url, {
		method: 'PATCH',
		headers: {
			...getSupabaseHeaders(),
			Prefer: 'return=representation'
		},
		body: JSON.stringify(payload)
	});
	if (!response.ok) {
		throw error(502, 'Could not update review item.');
	}
	const rows = (await response.json()) as Array<{ id: string }>;
	return rows.length > 0;
};

export const rescoreReviewSubmission = async (
	id: string
): Promise<GraderSuccessResponse | null> => {
	const row = await getReviewSubmission(id);
	const sourceText = row?.normalized_text || row?.original_doc || '';
	if (!row || !sourceText.trim()) {
		throw error(400, 'No stored document text available to re-score.');
	}

	const detailed = await gradeSopTextDetailed(sourceText);
	if (!detailed.result.valid) {
		throw error(422, detailed.result.message);
	}

	const result = detailed.result;
	await updateReviewSubmission(id, { review_status: 'reviewing' });

	const url = new URL(getSupabaseBaseUrl());
	url.searchParams.set('id', `eq.${id}`);
	const response = await fetch(url, {
		method: 'PATCH',
		headers: getSupabaseHeaders(),
		body: JSON.stringify({
			overall_grade: result.ai_readiness.grade,
			total_score: Math.max(5, Math.min(25, Math.round(result.ai_readiness.score / 4))),
			summary: result.summary,
			scores: {
				spec_version: result.spec_version,
				ai_readiness: result.ai_readiness,
				human_readiness: result.human_readiness,
				follow_up_cta: result.follow_up_cta
			},
			gaps: result.pathologies.map((pathology) => `${pathology.title}: ${pathology.detail}`),
			extracted: { pathologies: result.pathologies },
			raw_llm_responses: detailed.artifacts.raw_llm_responses,
			variance_report: detailed.artifacts.variance_report,
			prompt_version: detailed.artifacts.prompt_version,
			spec_version: result.spec_version
		})
	});
	if (!response.ok) {
		throw error(502, 'Could not persist the re-scored review item.');
	}

	return result;
};

export const sendReviewReport = async (id: string): Promise<boolean> => {
	const row = await getReviewSubmission(id);
	if (!row?.email) {
		throw error(400, 'No recipient email is stored for this submission.');
	}
	if (!isPersistedScoreEnvelope(row.scores)) {
		throw error(400, 'No complete score envelope is stored for this submission.');
	}

	const payload = buildEmailReportPayload({
		email: row.email,
		founderNote: row.founder_note,
		submissionId: row.id,
		result: row.scores,
		summary: row.summary,
		pathologies: Array.isArray(row.extracted?.pathologies)
			? (row.extracted.pathologies as GraderSuccessResponse['pathologies'])
			: []
	});
	await sendEmailReport(payload);
	return updateReviewSubmission(id, {
		review_status: 'sent',
		sent_at: new Date().toISOString()
	});
};
