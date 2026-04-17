import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import { MAX_CHARS, validateInput } from '$lib/grader';
import type { RequestHandler } from './$types';

const RESEND_API_URL = 'https://api.resend.com/emails';
const DEFAULT_TO_EMAIL = 'danny+grader@cursus.tools';

const MAX_FILE_BYTES = 10 * 1024 * 1024;

const ALLOWED_EXTENSIONS = ['.docx', '.pptx', '.md', '.txt'] as const;

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

const sanitizeFilename = (value: string): string => {
	const cleaned = value.replace(/[\\/]+/g, '_').replace(/[^\w.\-() ]+/g, '_');
	return cleaned.slice(-120) || 'upload';
};

const hasAllowedExtension = (name: string): boolean => {
	const lower = name.toLowerCase();
	return ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext));
};

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
	const bytes = new Uint8Array(buffer);
	let binary = '';
	const chunkSize = 0x8000;
	for (let i = 0; i < bytes.length; i += chunkSize) {
		binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
	}
	return btoa(binary);
};

export const POST: RequestHandler = async ({ request }) => {
	const contentType = request.headers.get('content-type') || '';
	if (!contentType.toLowerCase().includes('multipart/form-data')) {
		return badRequest('Invalid request body.');
	}

	let form: FormData;
	try {
		form = await request.formData();
	} catch {
		return badRequest('Invalid request body.');
	}

	const email = typeof form.get('email') === 'string' ? (form.get('email') as string).trim() : '';
	if (!isValidEmail(email)) {
		return badRequest('Enter a valid email address so we can reply.');
	}

	const rawText = typeof form.get('text') === 'string' ? (form.get('text') as string) : '';
	const fileEntry = form.get('file');
	// More robust file detection for different environments
	const file =
		fileEntry &&
		typeof fileEntry === 'object' &&
		'arrayBuffer' in fileEntry &&
		'size' in fileEntry &&
		(fileEntry as unknown as { size: number }).size > 0
			? (fileEntry as unknown as File)
			: null;

	let bodyText = '';
	const trimmedRawText = rawText.trim();
	if (file) {
		if (trimmedRawText.length > MAX_CHARS) {
			return badRequest(`Keep typed notes under ${MAX_CHARS} characters.`);
		}
		bodyText = trimmedRawText;
	} else if (trimmedRawText.length > 0) {
		const validation = validateInput(rawText);
		if (!validation.valid) {
			return badRequest(validation.error);
		}
		bodyText = validation.text;
	} else {
		return badRequest('Paste an SOP section or attach a file so we have something to grade.');
	}

	let attachment: { filename: string; content: string } | null = null;
	if (file) {
		if (file.size > MAX_FILE_BYTES) {
			return badRequest('File is too large. Keep attachments under 10 MB.');
		}

		const filename = sanitizeFilename(file.name || 'upload');
		if (!hasAllowedExtension(filename)) {
			return badRequest('Supported file types: .docx, .pptx, .md, .txt.');
		}

		const content = arrayBufferToBase64(await file.arrayBuffer());
		attachment = {
			filename,
			content
		};
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

	const source = sanitizeSource(form.get('source'));
	const submittedAt = new Date().toISOString();
	const messageLines = [
		'New Ops Grader submission',
		'',
		`Reply email: ${email}`,
		`Source: ${source}`,
		`Submitted at: ${submittedAt}`
	];

	if (attachment) {
		messageLines.push(`Attachment: ${attachment.filename} (${file!.size} bytes)`);
	}

	if (bodyText) {
		messageLines.push('', 'SOP text:', bodyText);
	} else {
		messageLines.push('', '(No pasted text — see attachment.)');
	}

	const emailPayload: Record<string, unknown> = {
		from: fromEmail,
		to: [toEmail],
		subject: 'Ops Grader submission',
		text: messageLines.join('\n'),
		reply_to: email
	};

	if (attachment) {
		emailPayload.attachments = [attachment];
	}

	const response = await fetch(RESEND_API_URL, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${resendApiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(emailPayload)
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
