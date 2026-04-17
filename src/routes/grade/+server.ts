import { dev } from '$app/environment';
import { json, redirect } from '@sveltejs/kit';
import { validateInput } from '$lib/grader';
import {
	attachEmailAndSopText,
	checkRateLimit,
	createSubmission,
	getClientIp,
	gradeSopText,
	hashIp,
	isValidEmail,
	sanitizeSource
} from '$lib/server/grader-service';
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
	let payload: { text?: unknown; source?: unknown };

	try {
		payload = (await event.request.json()) as { text?: unknown; source?: unknown };
	} catch {
		return badRequest('Invalid request body.');
	}

	const rawText = typeof payload.text === 'string' ? payload.text : '';
	const validation = validateInput(rawText);
	if (!validation.valid) {
		return badRequest(validation.error);
	}

	const clientIp = getClientIp(event);
	const ipHash = await hashIp(clientIp);

	try {
		const rateLimit = await checkRateLimit(ipHash);
		if (!rateLimit.allowed) {
			return json(
				{ error: 'Rate limit reached. Try again in about an hour.' },
				{
					status: 429,
					headers: {
						...NO_STORE_HEADERS,
						'retry-after': String(rateLimit.retryAfterSeconds)
					}
				}
			);
		}
	} catch (error) {
		console.error('Rate limit check failed', error);
		return json(
			{ error: 'Unable to process grading right now. Please try again shortly.' },
			{ status: 503, headers: NO_STORE_HEADERS }
		);
	}

	try {
		const result = await gradeSopText(validation.text);

		if (result.valid) {
			const submissionId = await createSubmission(result, ipHash, sanitizeSource(payload.source));
			event.cookies.set(SUBMISSION_COOKIE, submissionId, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: !dev,
				maxAge: SUBMISSION_COOKIE_MAX_AGE_SECONDS
			});
		}

		return json(result, { headers: NO_STORE_HEADERS });
	} catch (error) {
		console.error('SOP grading failed', error);
		return json(
			{ error: 'Unable to grade this SOP right now. Please try again in a moment.' },
			{ status: 502, headers: NO_STORE_HEADERS }
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
		return badRequest('Enter a valid email address.');
	}

	const rawText = typeof payload.text === 'string' ? payload.text : '';
	const validation = validateInput(rawText);
	if (!validation.valid) {
		return badRequest(validation.error);
	}

	const clientIp = getClientIp(event);
	const ipHash = await hashIp(clientIp);

	try {
		const updated = await attachEmailAndSopText({
			submissionId,
			ipHash,
			email,
			sopText: validation.text
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
