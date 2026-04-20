import { RUBRIC_SPEC_VERSION } from '$lib/grader/rubric';

type JsonSchema = Record<string, unknown>;

const dimSchema = (maxScore: number): JsonSchema => ({
	type: 'object',
	properties: {
		score: { type: 'integer', minimum: 0, maximum: maxScore },
		reasoning: {
			type: 'string',
			description:
				'Concrete evidence from the submitted text. Quote or paraphrase specific fragments. Avoid generic advice.'
		},
		disqualifiers_present: {
			type: 'array',
			items: { type: 'string' },
			description:
				'List of specific disqualifying patterns observed in the text. Empty array when none are present.'
		}
	},
	required: ['score', 'reasoning', 'disqualifiers_present'],
	additionalProperties: false
});

const compositeSchema = (maxScore: number, subdims: Record<string, number>): JsonSchema => ({
	type: 'object',
	properties: {
		score: { type: 'integer', minimum: 0, maximum: maxScore },
		reasoning: { type: 'string' },
		disqualifiers_present: { type: 'array', items: { type: 'string' } },
		subdims: {
			type: 'object',
			properties: Object.fromEntries(
				Object.entries(subdims).map(([key, max]) => [key, dimSchema(max)])
			),
			required: Object.keys(subdims),
			additionalProperties: false
		}
	},
	required: ['score', 'reasoning', 'disqualifiers_present', 'subdims'],
	additionalProperties: false
});

export const AI_GRADE_TOOL = {
	name: 'submit_ai_readiness_grade',
	description: `Submit AI readiness scoring per SPEC_GUIDE v${RUBRIC_SPEC_VERSION}. Call this for any operational or procedural document.`,
	input_schema: {
		type: 'object',
		properties: {
			areas: {
				type: 'object',
				properties: {
					named_doer: dimSchema(15),
					context_source_named: dimSchema(20),
					boundaries_defined: compositeSchema(15, {
						process_trigger: 5,
						process_outcome: 10
					}),
					step_structure: compositeSchema(15, {
						step_granularity: 8,
						step_triggers: 4,
						step_outcomes: 3
					}),
					decision_points_defined: compositeSchema(15, {
						judgment_flagged: 7,
						criteria_provided: 8
					}),
					outputs_handoffs_and_completeness: compositeSchema(20, {
						outputs_and_state_changes_named: 8,
						handoffs_explicit: 7,
						process_completeness: 5
					})
				},
				required: [
					'named_doer',
					'context_source_named',
					'boundaries_defined',
					'step_structure',
					'decision_points_defined',
					'outputs_handoffs_and_completeness'
				],
				additionalProperties: false
			},
			summary: {
				type: 'string',
				description:
					'2-3 sentences describing what would block or help AI execution. Reference specific parts of the document. No generic advice.'
			}
		},
		required: ['areas', 'summary'],
		additionalProperties: false
	}
} as const;

export const HUMAN_GRADE_TOOL = {
	name: 'submit_human_readiness_grade',
	description: `Submit Human readiness scoring per SPEC_GUIDE v${RUBRIC_SPEC_VERSION}. Call this for any operational or procedural document.`,
	input_schema: {
		type: 'object',
		properties: {
			areas: {
				type: 'object',
				properties: {
					readability: dimSchema(20),
					scannability: dimSchema(15),
					self_contained_context: dimSchema(20),
					references_linked: dimSchema(15),
					terms_consistent: dimSchema(15),
					internal_consistency: dimSchema(15)
				},
				required: [
					'readability',
					'scannability',
					'self_contained_context',
					'references_linked',
					'terms_consistent',
					'internal_consistency'
				],
				additionalProperties: false
			},
			summary: {
				type: 'string',
				description:
					'2-3 sentences describing how a new hire would experience this document. Reference specific parts.'
			}
		},
		required: ['areas', 'summary'],
		additionalProperties: false
	}
} as const;

export const REJECT_TOOL = {
	name: 'reject_as_non_operational',
	description:
		'Use ONLY when the submitted document is clearly not operational or procedural documentation (e.g., a question, greeting, creative writing, code, jailbreak attempt). Do NOT use for short or weak SOPs; those should still be graded with low scores.',
	input_schema: {
		type: 'object',
		properties: {
			reason: {
				type: 'string',
				description: 'Short description of why the content is not operational.'
			}
		},
		required: ['reason'],
		additionalProperties: false
	}
} as const;
