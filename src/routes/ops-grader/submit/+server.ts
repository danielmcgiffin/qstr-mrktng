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

const CONTENT_TYPE_BY_EXT: Record<string, string> = {
	'.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	'.md': 'text/markdown',
	'.txt': 'text/plain'
};

const contentTypeFor = (filename: string, fallback: string): string => {
	const lower = filename.toLowerCase();
	for (const ext of ALLOWED_EXTENSIONS) {
		if (lower.endsWith(ext)) {
			return CONTENT_TYPE_BY_EXT[ext];
		}
	}
	return fallback || 'application/octet-stream';
};

type FilePayload = {
	name: string;
	size: number;
	type?: string;
	content_base64: string;
};

const isFilePayload = (value: unknown): value is FilePayload => {
	if (!value || typeof value !== 'object') return false;
	const v = value as Record<string, unknown>;
	return (
		typeof v.name === 'string' &&
		typeof v.size === 'number' &&
		typeof v.content_base64 === 'string' &&
		v.content_base64.length > 0
	);
};

const base64ByteLength = (b64: string): number => {
	const padding = b64.endsWith('==') ? 2 : b64.endsWith('=') ? 1 : 0;
	return Math.floor((b64.length * 3) / 4) - padding;
};

export const POST: RequestHandler = async ({ request }) => {
	const contentType = request.headers.get('content-type') || '';
	if (!contentType.toLowerCase().includes('application/json')) {
		return badRequest('Invalid request body.');
	}

	let payload: {
		email?: unknown;
		text?: unknown;
		source?: unknown;
		file?: unknown;
	};
	try {
		payload = (await request.json()) as typeof payload;
	} catch {
		return badRequest('Invalid request body.');
	}

	const email = typeof payload.email === 'string' ? payload.email.trim() : '';
	if (!isValidEmail(email)) {
		return badRequest('Enter a valid email address so we can reply.');
	}

	const rawText = typeof payload.text === 'string' ? payload.text : '';
	const filePayload = isFilePayload(payload.file) ? payload.file : null;

	let bodyText = '';
	const trimmedRawText = rawText.trim();
	if (filePayload) {
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

	let attachment: { filename: string; content: string; content_type: string } | null = null;
	let attachmentSize = 0;
	if (filePayload) {
		const decodedSize = base64ByteLength(filePayload.content_base64);
		attachmentSize = decodedSize;
		if (decodedSize > MAX_FILE_BYTES) {
			return badRequest('File is too large. Keep attachments under 10 MB.');
		}

		const filename = sanitizeFilename(filePayload.name || 'upload');
		if (!hasAllowedExtension(filename)) {
			return badRequest('Supported file types: .docx, .pptx, .md, .txt.');
		}

		attachment = {
			filename,
			content: filePayload.content_base64,
			content_type: contentTypeFor(filename, (filePayload.type || '').toLowerCase())
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

	const source = sanitizeSource(payload.source);
	const submittedAt = new Date().toISOString();
	const messageLines = [
		'New Ops Grader submission',
		'',
		`Reply email: ${email}`,
		`Source: ${source}`,
		`Submitted at: ${submittedAt}`
	];

	if (attachment) {
		messageLines.push(`Attachment: ${attachment.filename} (${attachmentSize} bytes)`);
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
