import { dev } from '$app/environment';
import { json, redirect } from '@sveltejs/kit';
import { sendGraderAlert } from '$lib/server/alerts';
import { calculateActualCostUsd } from '$lib/server/cost-estimator';
import { incrementDailyCost, runSubmissionGuards } from '$lib/server/guards';
import { ingestText } from '$lib/server/ingest';
import {
	attachEmailAndSopText,
	checkRateLimit,
	createSubmission,
	getClientIp,
	gradeSopTextDetailed,
	hashIp,
	isValidEmail,
	sanitizeSource
} from '$lib/server/grader-service';
import { logEvent, newRequestId, startTrace, upsertDailyGraderStats } from '$lib/server/telemetry';
import type { RequestHandler } from './$types';

const SUBMISSION_COOKIE = 'grader_submission_id';
const SUBMISSION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const NO_STORE_HEADERS = {
	'cache-control': 'no-store'
};

export const prerender = false;

const badRequest = (error: string) => json({ error }, { status: 400, headers: NO_STORE_HEADERS });

export const GET: RequestHandler = async () => {
	throw redirect(307, '/ai-score');
};

export const POST: RequestHandler = async (event) => {
	const requestId = newRequestId();
	const trace = startTrace();
	const endValidate = trace.mark('validate');

	let payload: { text?: unknown; source?: unknown };
	try {
		payload = (await event.request.json()) as { text?: unknown; source?: unknown };
	} catch {
		endValidate({ ok: false, error: 'invalid_request_body' });
		return badRequest('Invalid request body.');
	}

	const rawText = typeof payload.text === 'string' ? payload.text : '';
	const ingested = ingestText({
		rawText,
		fileType: 'paste',
		source: 'paste',
		userAgent: event.request.headers.get('user-agent')
	});
	if (!ingested.ok) {
		endValidate({ ok: false, error: ingested.error });
		return badRequest(ingested.error);
	}
	endValidate({ ok: true, char_count: ingested.metadata.char_count });

	const clientIp = getClientIp(event);
	const ipHash = await hashIp(clientIp);

	try {
		const endRateLimit = trace.mark('rate_limit');
		const rateLimit = await checkRateLimit(ipHash);
		endRateLimit(rateLimit);
		if (!rateLimit.allowed) {
			logEvent(requestId, 'rate_limited', rateLimit);
			return json(
				{ error: 'Too many submissions for now. Try again in about an hour.' },
				{
					status: 429,
					headers: {
						...NO_STORE_HEADERS,
						'x-request-id': requestId,
						'retry-after': String(rateLimit.retryAfterSeconds)
					}
				}
			);
		}
	} catch (error) {
		console.warn('Rate limit check unavailable; continuing without persisted rate limiting', error);
	}

	try {
		let guard = null;
		try {
			const endGuard = trace.mark('guard_preflight');
			guard = await runSubmissionGuards({
				text: ingested.normalized_text,
				ipHash
			});
			endGuard({
				blocked: guard.blocked,
				dedup: Boolean(guard.dedupResult),
				review_status: guard.reviewStatus,
				projected_cost_usd: guard.projectedCost.total_usd
			});
		} catch (error) {
			console.warn('Extended grader guards unavailable; continuing without them', error);
		}

		if (guard?.blocked) {
			logEvent(requestId, 'blocked', { status: guard.status, error: guard.error });
			return json(
				{ error: guard.error ?? 'Submission blocked by guard rails.' },
				{
					status: guard.status ?? 400,
					headers: {
						...NO_STORE_HEADERS,
						'x-request-id': requestId,
						...(guard.retryAfterSeconds ? { 'retry-after': String(guard.retryAfterSeconds) } : {})
					}
				}
			);
		}

		if (guard?.dedupResult) {
			logEvent(requestId, 'dedup_hit', { trace: trace.finish() });
			return json(guard.dedupResult, {
				headers: { ...NO_STORE_HEADERS, 'x-request-id': requestId }
			});
		}

		const endGrade = trace.mark('grade');
		const detailed = await gradeSopTextDetailed(guard?.guardedText ?? ingested.normalized_text);
		endGrade({
			valid: detailed.result.valid,
			raw_responses: detailed.artifacts.raw_llm_responses.length,
			variance_report: detailed.artifacts.variance_report
		});
		const result = detailed.result;

		if (result.valid) {
			const actualCost = calculateActualCostUsd(detailed.artifacts.raw_llm_responses);
			const reviewStatus =
				(guard?.reviewStatus ?? 'unreviewed') === 'reviewing' || result.ai_readiness.score > 95
					? 'reviewing'
					: 'unreviewed';
			try {
				const endPersist = trace.mark('persist');
				const submissionId = await createSubmission(
					result,
					ipHash,
					sanitizeSource(payload.source),
					{
						sopText: ingested.original_text,
						normalizedText: ingested.normalized_text,
						originalDoc: ingested.original_text,
						promptVersion: detailed.artifacts.prompt_version,
						rawLlmResponses: detailed.artifacts.raw_llm_responses,
						varianceReport: detailed.artifacts.variance_report,
						ingestMetadata: ingested.metadata,
						reviewStatus,
						docHash: guard?.docHash ?? null,
						emailHash: guard?.emailHash ?? null
					}
				);
				event.cookies.set(SUBMISSION_COOKIE, submissionId, {
					path: '/',
					httpOnly: true,
					sameSite: 'lax',
					secure: !dev,
					maxAge: SUBMISSION_COOKIE_MAX_AGE_SECONDS
				});
				await incrementDailyCost(actualCost.total_usd);
				await upsertDailyGraderStats({
					aiScore: result.ai_readiness.score,
					humanScore: result.human_readiness.score,
					variance: Math.max(
						detailed.artifacts.variance_report.ai?.max_divergence ?? 0,
						detailed.artifacts.variance_report.human?.max_divergence ?? 0
					),
					costUsd: actualCost.total_usd
				});
				await sendGraderAlert({
					requestId,
					submissionId,
					aiScore: result.ai_readiness.score,
					humanScore: result.human_readiness.score,
					variance: Math.max(
						detailed.artifacts.variance_report.ai?.max_divergence ?? 0,
						detailed.artifacts.variance_report.human?.max_divergence ?? 0
					),
					summary: result.summary,
					reviewUrl: `/admin/review/${submissionId}`
				});
				endPersist({ submission_id: submissionId, cost_usd: actualCost.total_usd });
			} catch (error) {
				console.warn(
					'Grade submission persistence unavailable; returning inline result only',
					error
				);
			}
		}

		logEvent(requestId, 'response', { valid: result.valid, trace: trace.finish() });
		return json(result, {
			headers: { ...NO_STORE_HEADERS, 'x-request-id': requestId }
		});
	} catch (error) {
		console.error('SOP grading failed', error);
		return json(
			{ error: 'The grader is unavailable. Try again in a moment.' },
			{ status: 502, headers: { ...NO_STORE_HEADERS, 'x-request-id': requestId } }
		);
	}
};

export const PATCH: RequestHandler = async (event) => {
	const submissionId = event.cookies.get(SUBMISSION_COOKIE);
	if (!submissionId) {
		return badRequest('No grade submission found to update. Run a grade first.');
	}

	let payload: { email?: unknown; text?: unknown };
	try {
		payload = (await event.request.json()) as { email?: unknown; text?: unknown };
	} catch {
		return badRequest('Invalid request body.');
	}

	const email = typeof payload.email === 'string' ? payload.email.trim() : '';
	if (!isValidEmail(email)) {
		return badRequest('Enter a work email so we can send the score.');
	}

	const rawText = typeof payload.text === 'string' ? payload.text : '';
	const ingested = ingestText({
		rawText,
		fileType: 'paste',
		source: 'paste',
		userAgent: event.request.headers.get('user-agent')
	});
	if (!ingested.ok) {
		return badRequest(ingested.error);
	}

	const clientIp = getClientIp(event);
	const ipHash = await hashIp(clientIp);

	try {
		const updated = await attachEmailAndSopText({
			submissionId,
			ipHash,
			email,
			sopText: ingested.original_text
		});

		if (!updated) {
			return json(
				{ error: 'This submission could not be updated.' },
				{ status: 409, headers: NO_STORE_HEADERS }
			);
		}

		return json({ ok: true }, { headers: NO_STORE_HEADERS });
	} catch (error) {
		console.error('Failed to attach email and SOP text', error);
		return json(
			{ error: 'Unable to save your email right now. Please try again.' },
			{ status: 502, headers: NO_STORE_HEADERS }
		);
	}
};
