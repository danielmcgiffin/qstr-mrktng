import { json } from '@sveltejs/kit';
import { sendContactFormEmail } from '$lib/server/alerts';
import type { RequestHandler } from './$types';

const NO_STORE_HEADERS = {
	'cache-control': 'no-store'
};

export const prerender = false;

export const POST: RequestHandler = async (event) => {
	const contentType = event.request.headers.get('content-type') || '';
	if (!contentType.toLowerCase().includes('application/json')) {
		return json({ error: 'Invalid content type.' }, { status: 400, headers: NO_STORE_HEADERS });
	}

	let payload: {
		name?: unknown;
		email?: unknown;
		message?: unknown;
		reason?: unknown;
	};
	try {
		payload = (await event.request.json()) as typeof payload;
	} catch {
		return json({ error: 'Invalid JSON body.' }, { status: 400, headers: NO_STORE_HEADERS });
	}

	const name = typeof payload.name === 'string' ? payload.name.trim() : '';
	const email = typeof payload.email === 'string' ? payload.email.trim() : '';
	const message = typeof payload.message === 'string' ? payload.message.trim() : '';
	const allowedReasons = ['owner', 'partner', 'other'] as const;
	const reason =
		typeof payload.reason === 'string' &&
		(allowedReasons as readonly string[]).includes(payload.reason)
			? (payload.reason as (typeof allowedReasons)[number])
			: undefined;

	if (!name) {
		return json({ error: 'Name is required.' }, { status: 400, headers: NO_STORE_HEADERS });
	}
	if (!email) {
		return json({ error: 'Email is required.' }, { status: 400, headers: NO_STORE_HEADERS });
	}
	// Simple email regex check
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return json({ error: 'Invalid email address.' }, { status: 400, headers: NO_STORE_HEADERS });
	}
	if (!message) {
		return json({ error: 'Message is required.' }, { status: 400, headers: NO_STORE_HEADERS });
	}

	try {
		await sendContactFormEmail({ name, email, message, reason });
	} catch (error) {
		console.error('Failed to send contact email:', error);
		const errMsg = error instanceof Error ? error.message : '';
		if (errMsg.includes('Contact email delivery is not configured')) {
			return json(
				{ error: 'Email delivery is not fully configured yet on the server.' },
				{ status: 502, headers: NO_STORE_HEADERS }
			);
		}
		return json(
			{ error: 'Failed to send message. Please try again later.' },
			{ status: 500, headers: NO_STORE_HEADERS }
		);
	}

	return json(
		{ ok: true, message: 'Your message has been sent successfully.' },
		{ headers: NO_STORE_HEADERS }
	);
};
