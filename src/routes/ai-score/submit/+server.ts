import { json } from '@sveltejs/kit';
import { MAX_CHARS, type GraderResponse } from '$lib/grader';
import { sendAiScoreSubmissionAlert, type SubmissionAlertAttachment } from '$lib/server/alerts';
import { calculateActualCostUsd } from '$lib/server/cost-estimator';
import { incrementDailyCost, runSubmissionGuards } from '$lib/server/guards';
import { ingestText } from '$lib/server/ingest';
import { ingestUploadedFile } from '$lib/server/ingest-file';
import {
	checkRateLimit,
	createSubmission,
	getClientIp,
	gradeSopTextDetailed,
	hashIp,
	isValidEmail,
	sanitizeSource
} from '$lib/server/grader-service';
import type { RequestHandler } from './$types';

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['.docx', '.pptx', '.md', '.txt', '.html'] as const;

const NO_STORE_HEADERS = {
	'cache-control': 'no-store'
};

export const prerender = false;

const badRequest = (error: string) => json({ error }, { status: 400, headers: NO_STORE_HEADERS });

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
	'.txt': 'text/plain',
	'.html': 'text/html'
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

const queueManualReview = async (params: {
	email: string;
	source: string;
	bodyText: string;
	attachment: SubmissionAlertAttachment | null;
	attachmentSize: number;
	fallbackReason?: string;
}) => {
	try {
		await sendAiScoreSubmissionAlert({
			email: params.email,
			source: params.source,
			mode: 'queued',
			bodyText: params.bodyText,
			attachment: params.attachment,
			attachmentSize: params.attachmentSize,
			fallbackReason: params.fallbackReason
		});
	} catch (error) {
		console.error('AI Score inbox delivery failed', error);
		return json(
			{ error: 'Could not send your submission right now. Please try again.' },
			{ status: 502, headers: NO_STORE_HEADERS }
		);
	}

	return json(
		{
			ok: true,
			mode: 'queued',
			message: `We couldn't score this file instantly, but we sent it to our inbox and we'll follow up at ${params.email}.`,
			fallback_reason: params.fallbackReason ?? null
		},
		{ headers: NO_STORE_HEADERS }
	);
};

const deliverFounderInboxAlert = async (params: {
	email: string;
	source: string;
	bodyText: string;
	attachment: SubmissionAlertAttachment | null;
	attachmentSize: number;
	result: GraderResponse;
}) => {
	try {
		await sendAiScoreSubmissionAlert({
			email: params.email,
			source: params.source,
			mode: 'graded',
			bodyText: params.bodyText,
			attachment: params.attachment,
			attachmentSize: params.attachmentSize,
			result: params.result
		});
		return null;
	} catch (error) {
		console.error('AI Score inbox delivery failed', error);
		return json(
			{ error: 'Could not send your submission right now. Please try again.' },
			{ status: 502, headers: NO_STORE_HEADERS }
		);
	}
};

export const POST: RequestHandler = async (event) => {
	const contentType = event.request.headers.get('content-type') || '';
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
		payload = (await event.request.json()) as typeof payload;
	} catch {
		return badRequest('Invalid request body.');
	}

	const email = typeof payload.email === 'string' ? payload.email.trim() : '';
	if (!isValidEmail(email)) {
		return badRequest('Enter a valid email address so we can reply.');
	}

	const rawText = typeof payload.text === 'string' ? payload.text : '';
	const trimmedNotes = rawText.trim();
	const filePayload = isFilePayload(payload.file) ? payload.file : null;
	const source = sanitizeSource(payload.source);
	const userAgent = event.request.headers.get('user-agent');

	if (!filePayload && !trimmedNotes) {
		return badRequest('Paste an SOP section or attach a file so we have something to grade.');
	}

	if (trimmedNotes.length > MAX_CHARS) {
		return badRequest(`Keep typed notes under ${MAX_CHARS} characters.`);
	}

	let attachment: SubmissionAlertAttachment | null = null;
	let attachmentSize = 0;
	if (filePayload) {
		const decodedSize = base64ByteLength(filePayload.content_base64);
		attachmentSize = decodedSize;
		if (decodedSize > MAX_FILE_BYTES) {
			return badRequest('File is too large. Keep attachments under 10 MB.');
		}

		const filename = sanitizeFilename(filePayload.name || 'upload');
		if (!hasAllowedExtension(filename)) {
			return badRequest('Supported file types: .docx, .pptx, .md, .txt, .html.');
		}

		attachment = {
			filename,
			content: filePayload.content_base64,
			content_type: contentTypeFor(filename, (filePayload.type || '').toLowerCase())
		};
	}

	let normalizedText = '';
	let originalText = '';
	let ingestMetadata: unknown = null;
	let fileDetails: { name?: string | null; size?: number | null; mime?: string | null } | null =
		null;

	if (filePayload) {
		const fileIngest = await ingestUploadedFile({
			name: filePayload.name,
			size: filePayload.size,
			mimeType: filePayload.type || null,
			contentBase64: filePayload.content_base64,
			userAgent,
			source: 'upload'
		});

		if (!fileIngest.ok) {
			return await queueManualReview({
				email,
				source,
				bodyText: trimmedNotes,
				attachment,
				attachmentSize,
				fallbackReason: fileIngest.error
			});
		}

		const combinedRawText = trimmedNotes
			? `Operator note:\n${trimmedNotes}\n\n--- Extracted file text ---\n${fileIngest.original_text}`
			: fileIngest.original_text;
		const combinedIngest = ingestText({
			rawText: combinedRawText,
			originalText: combinedRawText,
			fileType: fileIngest.metadata.file_type,
			source: 'upload',
			userAgent,
			file: {
				name: fileIngest.metadata.file_name,
				size: fileIngest.metadata.file_size,
				mime: fileIngest.metadata.file_mime
			}
		});

		if (!combinedIngest.ok) {
			return badRequest(combinedIngest.error);
		}

		normalizedText = combinedIngest.normalized_text;
		originalText = combinedIngest.original_text;
		ingestMetadata = combinedIngest.metadata;
		fileDetails = {
			name: combinedIngest.metadata.file_name,
			size: combinedIngest.metadata.file_size,
			mime: combinedIngest.metadata.file_mime
		};
	} else {
		const textIngest = ingestText({
			rawText: trimmedNotes,
			fileType: 'paste',
			source: 'paste',
			userAgent
		});

		if (!textIngest.ok) {
			return badRequest(textIngest.error);
		}

		normalizedText = textIngest.normalized_text;
		originalText = textIngest.original_text;
		ingestMetadata = textIngest.metadata;
	}

	const founderBodyText = attachment ? trimmedNotes : originalText;
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
		console.warn('Rate limit check unavailable; continuing without persisted rate limiting', error);
	}

	try {
		let guard = null;
		try {
			guard = await runSubmissionGuards({
				text: normalizedText,
				ipHash,
				email
			});
		} catch (error) {
			console.warn('Extended grader guards unavailable; continuing without them', error);
		}

		if (guard?.blocked) {
			return json(
				{ error: guard.error ?? 'Submission blocked by guard rails.' },
				{
					status: guard.status ?? 400,
					headers: {
						...NO_STORE_HEADERS,
						...(guard.retryAfterSeconds ? { 'retry-after': String(guard.retryAfterSeconds) } : {})
					}
				}
			);
		}

		if (guard?.dedupResult) {
			const alertFailure = await deliverFounderInboxAlert({
				email,
				source,
				bodyText: founderBodyText,
				attachment,
				attachmentSize,
				result: guard.dedupResult
			});
			if (alertFailure) {
				return alertFailure;
			}

			return json(
				{
					ok: true,
					mode: 'graded',
					message: `We already graded an identical document recently. Reusing that result and we'll follow up at ${email}.`,
					result: guard.dedupResult
				},
				{ headers: NO_STORE_HEADERS }
			);
		}

		const detailed = await gradeSopTextDetailed(guard?.guardedText ?? normalizedText);
		const result = detailed.result;

		if (result.valid) {
			const actualCost = calculateActualCostUsd(detailed.artifacts.raw_llm_responses);
			const reviewStatus =
				(guard?.reviewStatus ?? 'unreviewed') === 'reviewing' || result.ai_readiness.score > 95
					? 'reviewing'
					: 'unreviewed';
			try {
				await createSubmission(result, ipHash, source, {
					email,
					sopText: originalText,
					normalizedText,
					originalDoc: originalText,
					file: fileDetails,
					promptVersion: detailed.artifacts.prompt_version,
					rawLlmResponses: detailed.artifacts.raw_llm_responses,
					varianceReport: detailed.artifacts.variance_report,
					ingestMetadata,
					reviewStatus,
					docHash: guard?.docHash ?? null,
					emailHash: guard?.emailHash ?? null
				});
				await incrementDailyCost(actualCost.total_usd);
			} catch (error) {
				console.warn(
					'Grade submission persistence unavailable; returning inline result only',
					error
				);
			}
		}

		const alertFailure = await deliverFounderInboxAlert({
			email,
			source,
			bodyText: founderBodyText,
			attachment,
			attachmentSize,
			result
		});
		if (alertFailure) {
			return alertFailure;
		}

		return json(
			{
				ok: true,
				mode: 'graded',
				message: `Instant score ready below. We sent your submission to our inbox and we'll follow up at ${email}.`,
				result
			},
			{ headers: NO_STORE_HEADERS }
		);
	} catch (error) {
		console.error('AI score file submission inline grading failed', error);

		if (filePayload) {
			return await queueManualReview({
				email,
				source,
				bodyText: trimmedNotes || originalText,
				attachment,
				attachmentSize,
				fallbackReason: 'Inline grading failed; queued for manual review instead.'
			});
		}

		return json(
			{ error: 'Unable to grade this SOP right now. Please try again in a moment.' },
			{ status: 502, headers: NO_STORE_HEADERS }
		);
	}
};
