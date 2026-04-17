export const MAX_CHARS = 2000;
export const MIN_CHARS = 50;

export type InputValidationResult =
	| {
			valid: true;
			text: string;
	  }
	| {
			valid: false;
			error: string;
	  };

export const validateInput = (text: string): InputValidationResult => {
	const trimmed = text.trim();

	if (trimmed.length < MIN_CHARS) {
		return {
			valid: false,
			error: 'Paste at least a paragraph (50+ characters) from a process doc or SOP.'
		};
	}

	if (trimmed.length > MAX_CHARS) {
		return {
			valid: false,
			error: `Keep it to one section — ${MAX_CHARS} characters max. We grade depth, not volume.`
		};
	}

	return { valid: true, text: trimmed };
};

export type OverallGrade = 'A' | 'B' | 'C' | 'D' | 'F';

export type GraderScores = {
	structure: number;
	ownership: number;
	systems: number;
	decision_criteria: number;
	freshness: number;
	total: number;
};

export type GraderExtracted = {
	roles: string[];
	actions: string[];
	systems: string[];
};

export type GraderSuccessResponse = {
	valid: true;
	scores: GraderScores;
	overall_grade: OverallGrade;
	agent_ready: boolean;
	extracted: GraderExtracted;
	gaps: string[];
	summary: string;
};

export type GraderRejectionResponse = {
	valid: false;
	rejection_reason: 'not_operational_content';
	message: string;
};

export type GraderResponse = GraderSuccessResponse | GraderRejectionResponse;
