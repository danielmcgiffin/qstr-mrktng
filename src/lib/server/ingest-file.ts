import {
	createIngestMetadata,
	describeRejection,
	ingestText,
	type IngestFileType,
	type IngestResult,
	type IngestSource
} from '$lib/server/ingest';

export type UploadedFileInput = {
	name: string;
	size: number;
	mimeType?: string | null;
	contentBase64: string;
	userAgent?: string | null;
	source?: IngestSource;
};

const EXTENSION_TO_TYPE: Record<string, IngestFileType> = {
	'.txt': 'txt',
	'.md': 'md',
	'.docx': 'docx',
	'.html': 'html',
	'.htm': 'html',
	'.pdf': 'pdf',
	'.pptx': 'pptx'
};

const BLOCK_TAGS =
	/<(\/)?(p|div|section|article|header|footer|aside|main|nav|ul|ol|li|table|tr|td|th|blockquote|pre|h[1-6])\b[^>]*>/gi;

const getExtension = (name: string): string => {
	const lower = name.toLowerCase();
	const dot = lower.lastIndexOf('.');
	return dot >= 0 ? lower.slice(dot) : '';
};

export const detectFileType = (name: string, mimeType?: string | null): IngestFileType => {
	const extension = getExtension(name);
	const byExtension = EXTENSION_TO_TYPE[extension];
	if (byExtension) return byExtension;

	const mime = (mimeType || '').toLowerCase();
	if (mime.includes('text/plain')) return 'txt';
	if (mime.includes('text/markdown')) return 'md';
	if (mime.includes('text/html')) return 'html';
	if (mime.includes('application/pdf')) return 'pdf';
	if (mime.includes('presentationml.presentation')) return 'pptx';
	if (mime.includes('wordprocessingml.document')) return 'docx';
	return 'unknown';
};

const base64ToBytes = (value: string): Uint8Array | null => {
	try {
		const clean = value.replace(/\s+/g, '');
		const binary = atob(clean);
		const bytes = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i += 1) {
			bytes[i] = binary.charCodeAt(i);
		}
		return bytes;
	} catch {
		return null;
	}
};

const arrayBufferFromBytes = (bytes: Uint8Array): ArrayBuffer => {
	const copy = new Uint8Array(bytes.byteLength);
	copy.set(bytes);
	return copy.buffer;
};

const looksBinaryGarbage = (decoded: string): boolean => {
	if (!decoded) return true;
	const sample = decoded.slice(0, 4000);
	const replacementChars = (sample.match(/\uFFFD/g) || []).length;
	let nullBytes = 0;
	let weirdControls = 0;
	for (const char of sample) {
		const code = char.codePointAt(0) ?? 0;
		if (code === 0) {
			nullBytes += 1;
			continue;
		}
		if (code === 127 || (code < 32 && code !== 9 && code !== 10 && code !== 13)) {
			weirdControls += 1;
		}
	}
	return (
		replacementChars > sample.length * 0.08 || nullBytes > 0 || weirdControls > sample.length * 0.02
	);
};

const decodeUtf8Text = (bytes: Uint8Array): string | null => {
	try {
		const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
		if (looksBinaryGarbage(text)) return null;
		return text;
	} catch {
		return null;
	}
};

const decodeHtmlEntity = (entity: string): string => {
	switch (entity) {
		case '&nbsp;':
			return ' ';
		case '&amp;':
			return '&';
		case '&lt;':
			return '<';
		case '&gt;':
			return '>';
		case '&quot;':
			return '"';
		case '&#39;':
			return "'";
		default:
			if (/^&#x[0-9a-f]+;$/i.test(entity)) {
				return String.fromCodePoint(parseInt(entity.slice(3, -1), 16));
			}
			if (/^&#\d+;$/.test(entity)) {
				return String.fromCodePoint(parseInt(entity.slice(2, -1), 10));
			}
			return entity;
	}
};

export const stripHtmlToText = (html: string): string =>
	html
		.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
		.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
		.replace(/<!--([\s\S]*?)-->/g, '')
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<(li)\b[^>]*>/gi, '\n- ')
		.replace(BLOCK_TAGS, '\n')
		.replace(/<[^>]+>/g, '')
		.replace(/&(nbsp|amp|lt|gt|quot);|&#39;|&#x[0-9a-f]+;|&#\d+;/gi, decodeHtmlEntity);

const rejectFile = (
	fileType: IngestFileType,
	reason: 'unsupported_type' | 'binary_garbage' | 'decode_failed' | 'no_text',
	params: UploadedFileInput
): IngestResult => ({
	ok: false,
	error: describeRejection(reason),
	reason,
	metadata: createIngestMetadata(
		fileType,
		params.source ?? 'upload',
		params.userAgent ?? null,
		{
			name: params.name,
			size: params.size,
			mime: params.mimeType ?? null
		},
		''
	)
});

const ingestDecodedText = (
	rawText: string,
	fileType: IngestFileType,
	params: UploadedFileInput
): IngestResult =>
	ingestText({
		rawText,
		originalText: rawText,
		fileType,
		source: params.source ?? 'upload',
		userAgent: params.userAgent ?? null,
		file: {
			name: params.name,
			size: params.size,
			mime: params.mimeType ?? null
		}
	});

const extractDocxText = async (
	bytes: Uint8Array
): Promise<{ ok: true; text: string } | { ok: false; reason: 'unsupported_type' | 'no_text' }> => {
	try {
		const mammothModule = await import('mammoth');
		const result = await mammothModule.default.convertToHtml(
			{ arrayBuffer: arrayBufferFromBytes(bytes) },
			{ ignoreEmptyParagraphs: false }
		);
		const text = stripHtmlToText(result.value || '');
		return text.trim() ? { ok: true, text } : { ok: false, reason: 'no_text' };
	} catch (error) {
		console.warn('DOCX inline extraction unavailable; falling back to inbox review', error);
		return { ok: false, reason: 'unsupported_type' };
	}
};

export const ingestUploadedFile = async (params: UploadedFileInput): Promise<IngestResult> => {
	const fileType = detectFileType(params.name, params.mimeType);
	if (fileType === 'pdf' || fileType === 'pptx' || fileType === 'unknown') {
		return rejectFile(fileType, 'unsupported_type', params);
	}

	const bytes = base64ToBytes(params.contentBase64);
	if (!bytes) {
		return rejectFile(fileType, 'decode_failed', params);
	}

	if (fileType === 'txt' || fileType === 'md') {
		const text = decodeUtf8Text(bytes);
		if (!text) {
			return rejectFile(fileType, 'binary_garbage', params);
		}
		return ingestDecodedText(text, fileType, params);
	}

	if (fileType === 'html') {
		const html = decodeUtf8Text(bytes);
		if (!html) {
			return rejectFile(fileType, 'binary_garbage', params);
		}
		const text = stripHtmlToText(html);
		if (!text.trim()) {
			return rejectFile(fileType, 'no_text', params);
		}
		return ingestDecodedText(text, fileType, params);
	}

	if (fileType === 'docx') {
		const extracted = await extractDocxText(bytes);
		if (!extracted.ok) {
			return rejectFile(fileType, extracted.reason, params);
		}
		return ingestDecodedText(extracted.text, fileType, params);
	}

	return rejectFile(fileType, 'unsupported_type', params);
};
