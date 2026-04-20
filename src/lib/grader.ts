import type { LetterGrade } from '$lib/grader/rubric';

export const MAX_CHARS = 150_000;
export const WARNING_CHARS = 75_000;
export const MIN_CHARS = 100;

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
			error: 'Paste at least 100 characters from an actual process, SOP, or workflow.'
		};
	}

	if (trimmed.length > MAX_CHARS) {
		return {
			valid: false,
			error: `That submission is too long. Paste a single process, not the whole manual (${MAX_CHARS.toLocaleString()} characters max).`
		};
	}

	return { valid: true, text: trimmed };
};

export type OverallGrade = LetterGrade;

export type GraderDimensionResult = {
	score: number;
	reasoning: string;
	disqualifiers_present: string[];
};

export type CompositeGraderAreaResult<SubdimKey extends string> = GraderDimensionResult & {
	subdims: Record<SubdimKey, GraderDimensionResult>;
};

export type AiAreaKey =
	| 'named_doer'
	| 'context_source_named'
	| 'boundaries_defined'
	| 'step_structure'
	| 'decision_points_defined'
	| 'outputs_handoffs_and_completeness';

export type HumanAreaKey =
	| 'readability'
	| 'scannability'
	| 'self_contained_context'
	| 'references_linked'
	| 'terms_consistent'
	| 'internal_consistency';

export type AiReadinessAreas = {
	named_doer: GraderDimensionResult;
	context_source_named: GraderDimensionResult;
	boundaries_defined: CompositeGraderAreaResult<'process_trigger' | 'process_outcome'>;
	step_structure: CompositeGraderAreaResult<'step_granularity' | 'step_triggers' | 'step_outcomes'>;
	decision_points_defined: CompositeGraderAreaResult<'judgment_flagged' | 'criteria_provided'>;
	outputs_handoffs_and_completeness: CompositeGraderAreaResult<
		'outputs_and_state_changes_named' | 'handoffs_explicit' | 'process_completeness'
	>;
};

export type HumanReadinessAreas = Record<HumanAreaKey, GraderDimensionResult>;

export type GraderReadinessBlock<Areas> = {
	score: number;
	grade: LetterGrade;
	areas: Areas;
	summary: string;
};

export type AiReadinessResult = GraderReadinessBlock<AiReadinessAreas>;
export type HumanReadinessResult = GraderReadinessBlock<HumanReadinessAreas>;

export type GraderPathology = {
	title: string;
	detail: string;
	source: 'ai' | 'human';
	area: string;
};

export type FollowUpCta = 'book_demo' | 'try_quaestor_free';

export type GraderSuccessResponse = {
	valid: true;
	spec_version: string;
	ai_readiness: AiReadinessResult;
	human_readiness: HumanReadinessResult;
	pathologies: GraderPathology[];
	summary: string;
	follow_up_cta: FollowUpCta;
};

export type GraderRejectionResponse = {
	valid: false;
	rejection_reason: 'not_operational_content';
	message: string;
};

export type GraderResponse = GraderSuccessResponse | GraderRejectionResponse;
