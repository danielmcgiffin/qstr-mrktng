export const INGEST_MIN_CHARS = 100;
export const INGEST_MAX_CHARS = 150_000;

export type IngestFileType = 'paste' | 'txt' | 'md' | 'docx' | 'pptx' | 'pdf' | 'html' | 'unknown';
export type IngestSource = 'paste' | 'upload';

export type IngestMetadata = {
	char_count: number;
	word_count: number;
	reading_time_sec: number;
	file_type: IngestFileType;
	source: IngestSource;
	submitted_at: string;
	user_agent: string | null;
	file_name: string | null;
	file_size: number | null;
	file_mime: string | null;
};

export type IngestRejectionReason =
	| 'no_text'
	| 'too_long'
	| 'too_short'
	| 'non_english'
	| 'unsupported_type'
	| 'binary_garbage'
	| 'decode_failed';

export type IngestResult =
	| { ok: true; normalized_text: string; original_text: string; metadata: IngestMetadata }
	| {
			ok: false;
			error: string;
			reason: IngestRejectionReason;
			metadata: IngestMetadata;
	  };

const WORDS_PER_MINUTE = 220;

export const estimateReadingTimeSec = (wordCount: number): number =>
	Math.max(1, Math.round((wordCount / WORDS_PER_MINUTE) * 60));

export const countWords = (text: string): number => {
	const trimmed = text.trim();
	if (!trimmed) return 0;
	return trimmed.split(/\s+/).length;
};

const toNfc = (text: string): string => {
	try {
		return text.normalize('NFC');
	} catch {
		return text;
	}
};

const stripControlChars = (text: string): string => {
	let output = '';
	for (const char of text.replace(/\r\n?/g, '\n')) {
		const code = char.codePointAt(0) ?? 0;
		if (code === 0 || code === 127) continue;
		if (code < 32 && code !== 9 && code !== 10) continue;
		output += char;
	}
	return output;
};

const collapseWhitespacePreservingStructure = (text: string): string => {
	const lines = text.split('\n');
	const cleaned = lines.map((line) => line.replace(/[ \t\f\v]+/g, ' ').replace(/ +$/g, ''));
	const collapsed: string[] = [];
	let blankRun = 0;
	for (const line of cleaned) {
		if (line.trim() === '') {
			blankRun += 1;
			if (blankRun <= 1) {
				collapsed.push('');
			}
		} else {
			blankRun = 0;
			collapsed.push(line);
		}
	}
	return collapsed.join('\n').trim();
};

export const normalizeText = (raw: string): string =>
	collapseWhitespacePreservingStructure(stripControlChars(toNfc(raw)));

const englishHeuristic = (text: string): boolean => {
	const sample = text.slice(0, 4000);
	if (!sample.trim()) return false;
	let visible = 0;
	let asciiAlpha = 0;
	for (const char of sample) {
		const code = char.codePointAt(0) ?? 0;
		if (code <= 32) continue;
		visible += 1;
		if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
			asciiAlpha += 1;
		}
	}
	if (visible < 40) return true;
	return asciiAlpha / visible >= 0.55;
};

const REJECTION_MESSAGES: Record<IngestRejectionReason, string> = {
	no_text: "We couldn't find any readable text in that file. Paste the text directly instead.",
	too_long: `This is too long for one score. Paste one process, not the whole manual (max ${INGEST_MAX_CHARS.toLocaleString()} characters).`,
	too_short: `Paste at least ${INGEST_MIN_CHARS} characters from a real process.`,
	non_english: 'English only for now. Paste the English version of the process.',
	unsupported_type:
		'Unsupported file type. Supported types: .txt, .md, .docx, .html. Paste text for anything else.',
	binary_garbage:
		"We couldn't read this file — looks like binary or scanned content. Paste the text instead.",
	decode_failed: "We couldn't decode that file. Try another format or paste the text instead."
};

export const describeRejection = (reason: IngestRejectionReason): string =>
	REJECTION_MESSAGES[reason];

export const createIngestMetadata = (
	fileType: IngestFileType,
	source: IngestSource,
	userAgent: string | null,
	fileMeta: { name?: string | null; size?: number | null; mime?: string | null } = {},
	textSample = ''
): IngestMetadata => {
	const charCount = textSample.length;
	const wordCount = countWords(textSample);
	return {
		char_count: charCount,
		word_count: wordCount,
		reading_time_sec: estimateReadingTimeSec(wordCount),
		file_type: fileType,
		source,
		submitted_at: new Date().toISOString(),
		user_agent: userAgent ?? null,
		file_name: fileMeta.name ?? null,
		file_size: fileMeta.size ?? null,
		file_mime: fileMeta.mime ?? null
	};
};

export type IngestInput = {
	rawText: string;
	originalText?: string;
	fileType: IngestFileType;
	source: IngestSource;
	userAgent?: string | null;
	file?: { name?: string | null; size?: number | null; mime?: string | null };
};

export const ingestText = (input: IngestInput): IngestResult => {
	const original = input.originalText ?? input.rawText;
	const normalized = normalizeText(input.rawText);
	const metadata = createIngestMetadata(
		input.fileType,
		input.source,
		input.userAgent ?? null,
		input.file ?? {},
		normalized
	);

	if (!normalized) {
		return {
			ok: false,
			error: REJECTION_MESSAGES.no_text,
			reason: 'no_text',
			metadata
		};
	}

	if (normalized.length < INGEST_MIN_CHARS) {
		return {
			ok: false,
			error: REJECTION_MESSAGES.too_short,
			reason: 'too_short',
			metadata
		};
	}

	if (normalized.length > INGEST_MAX_CHARS) {
		return {
			ok: false,
			error: REJECTION_MESSAGES.too_long,
			reason: 'too_long',
			metadata
		};
	}

	if (!englishHeuristic(normalized)) {
		return {
			ok: false,
			error: REJECTION_MESSAGES.non_english,
			reason: 'non_english',
			metadata
		};
	}

	return {
		ok: true,
		normalized_text: normalized,
		original_text: original,
		metadata
	};
};
