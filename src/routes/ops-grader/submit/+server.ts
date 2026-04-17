import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import { validateInput } from '$lib/grader';
import type { RequestHandler } from './$types';

const RESEND_API_URL = 'https://api.resend.com/emails';
const DEFAULT_TO_EMAIL = 'danny+grader@cursus.tools';

const NO_STORE_HEADERS = {
	'cache-control': 'no-store'
};

export const prerender = false;

const badRequest = (error: string) => json({ error }, { status: 400, headers: NO_STORE_HEADERS });

const getPrivateEnv = (...keys: string[]): string => {
	for (const key of keys) {
		const value = env[key]?.trim();
		if (value) {
			return value;
		}
	}

	return '';
};

const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const sanitizeSource = (value: unknown): string => {
	if (typeof value !== 'string') {
		return 'organic';
	}

	const trimmed = value.trim().toLowerCase();
	if (!trimmed) {
		return 'organic';
	}

	return trimmed.replace(/[^a-z0-9_:/.-]/g, '-').slice(0, 64) || 'organic';
};

export const POST: RequestHandler = async ({ request }) => {
	let payload: { email?: unknown; text?: unknown; source?: unknown };

	try {
		payload = (await request.json()) as { email?: unknown; text?: unknown; source?: unknown };
	} catch {
		return badRequest('Invalid request body.');
	}

	const email = typeof payload.email === 'string' ? payload.email.trim() : '';
	if (!isValidEmail(email)) {
		return badRequest('Enter a valid email address so we can reply.');
	}

	const rawText = typeof payload.text === 'string' ? payload.text : '';
	const validation = validateInput(rawText);
	if (!validation.valid) {
		return badRequest(validation.error);
	}

	const resendApiKey = getPrivateEnv('RESEND_API_KEY', 'PRIVATE_RESEND_API_KEY');
	const fromEmail = getPrivateEnv('OPS_GRADER_FROM_EMAIL', 'PRIVATE_FROM_ADMIN_EMAIL');
	const toEmail = getPrivateEnv('OPS_GRADER_TO_EMAIL', 'PRIVATE_ADMIN_EMAIL') || DEFAULT_TO_EMAIL;

	if (!resendApiKey || !fromEmail) {
		console.error('Ops Grader Resend config missing', {
			hasResendApiKey: Boolean(resendApiKey),
			hasFromEmail: Boolean(fromEmail),
			toEmail
		});
		return json(
			{ error: 'Ops Grader email delivery is not configured yet.' },
			{ status: 503, headers: NO_STORE_HEADERS }
		);
	}

	const source = sanitizeSource(payload.source);
	const submittedAt = new Date().toISOString();
	const message = [
		'New Ops Grader submission',
		'',
		`Reply email: ${email}`,
		`Source: ${source}`,
		`Submitted at: ${submittedAt}`,
		'',
		'SOP text:',
		validation.text
	].join('\n');

	const response = await fetch(RESEND_API_URL, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${resendApiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from: fromEmail,
			to: [toEmail],
			subject: 'Ops Grader submission',
			text: message,
			reply_to: email
		})
	});

	if (!response.ok) {
		const body = await response.text();
		console.error('Resend email send failed', {
			status: response.status,
			body
		});
		return json(
			{ error: 'Could not send your submission right now. Please try again.' },
			{ status: 502, headers: NO_STORE_HEADERS }
		);
	}

	return json({ ok: true }, { headers: NO_STORE_HEADERS });
};
