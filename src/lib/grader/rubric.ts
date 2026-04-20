export const RUBRIC_SPEC_VERSION = '0.3' as const;

export type LetterGrade = 'A' | 'B' | 'C' | 'F';

type RubricItem = {
	label: string;
	points: number;
	question: string;
	fullCreditRequires: string[];
	disqualifiedByAny: string[];
	partialCreditDescription: string;
	noneDescription: string;
	partialScore: number;
	noneScore: 0;
};

type CompositeRubricItem = {
	label: string;
	points: number;
	question: string;
	subdims: Record<string, RubricItem>;
};

export const AI_READINESS_RUBRIC = {
	named_doer: {
		label: 'Named doer',
		points: 15,
		question: 'Is the actor for each step explicitly named as a role?',
		fullCreditRequires: [
			'Every step names a specific role.',
			'No pronouns or collective nouns are used as the actor.',
			'Allowed delegates or substitutes are explicitly named.',
			'Approvers, reviewers, and escalation actors are named as specific roles.'
		],
		disqualifiedByAny: [
			'Any step uses “the team”, “they”, “someone”, or implicit “we” as the actor.',
			'Uses “[Role] or designee” without naming the designee role.',
			'Approval or review appears without a named approver role.',
			'Uses person names instead of role names.',
			'External parties are referenced without a specific role.'
		],
		partialCreditDescription:
			'Most steps have named roles, but some use pronouns, collective nouns, or unnamed delegates.',
		noneDescription: 'Majority of steps lack a named actor.',
		partialScore: 7,
		noneScore: 0
	} satisfies RubricItem,
	context_source_named: {
		label: 'Context source named',
		points: 20,
		question:
			'Does each step name the specific source of the information needed to act — a URL, a system, a field, or an upstream output?',
		fullCreditRequires: [
			'Every step that needs external information names a specific, addressable source.',
			'System references include the specific instance, path, or record type.',
			'Policy or threshold references point to a named section, table, or location.',
			'Criteria and rules are stated inline or pointed to a retrievable location.',
			'Naming conventions and reference lists are included or addressably linked.'
		],
		disqualifiedByAny: [
			'Any step says “follow [document]” or “per policy” without naming the section.',
			'Thresholds or criteria are referenced but not stated or pointed to.',
			'System references are generic (“the spreadsheet”, “the CRM”, “ask in Slack”).',
			'Uses “ask [person]” or “check with [role]” as a context source.',
			'Approved lists, templates, or naming conventions exist only by reference.',
			'Uses “as appropriate”, “as needed”, or similar fuzzy language without criteria.'
		],
		partialCreditDescription:
			'Some steps name sources; others rely on usual places, informal asks, or implicit context.',
		noneDescription: 'Context is assumed rather than surfaced.',
		partialScore: 10,
		noneScore: 0
	} satisfies RubricItem,
	boundaries_defined: {
		label: 'Boundaries defined',
		points: 15,
		question: 'Does the process have a clear start and a clear end?',
		subdims: {
			process_trigger: {
				label: 'Process trigger',
				points: 5,
				question: 'Is the trigger for the process explicit and concrete?',
				fullCreditRequires: [
					'The process names the event, schedule, upstream output, or request that starts it.',
					'The trigger is concrete enough for an observer to detect.',
					'Multiple triggers are enumerated when relevant.'
				],
				disqualifiedByAny: [
					'The process begins mid-workflow without naming the earlier event.',
					'Trigger is “when needed”, “as appropriate”, “periodically”, or similarly fuzzy.',
					'Trigger is implied by section context but never stated.',
					'The actor is named but the triggering event is not.'
				],
				partialCreditDescription: 'Trigger is implied or fuzzy.',
				noneDescription: 'No trigger stated.',
				partialScore: 2,
				noneScore: 0
			},
			process_outcome: {
				label: 'Process outcome',
				points: 10,
				question: 'Is “done” defined as a verifiable outcome?',
				fullCreditRequires: [
					'“Done” is a verifiable artifact, state change, or confirmed delivery.',
					'The last step actually produces the stated outcome.',
					'The outcome can be verified without asking the doer.'
				],
				disqualifiedByAny: [
					'Outcome is a feeling or abstract claim.',
					'Multiple candidate endings appear without designating one as canonical.',
					'The last step describes an external actor’s behavior instead of the process output.',
					'Outcome is implied but not stated.'
				],
				partialCreditDescription:
					'Outcome is stated but not verifiable, or multiple candidate endings appear without a canonical one.',
				noneDescription: 'No stated outcome.',
				partialScore: 5,
				noneScore: 0
			}
		}
	} satisfies CompositeRubricItem,
	step_structure: {
		label: 'Step structure',
		points: 15,
		question: 'Are the steps shaped for execution, or do they hide complexity?',
		subdims: {
			step_granularity: {
				label: 'Step granularity',
				points: 8,
				question: 'Are steps atomic enough for one actor to execute cleanly?',
				fullCreditRequires: [
					'Each step names one action one actor can complete in one session.',
					'Step verbs are concrete and executable.',
					'Multi-part steps are decomposed into atomic actions.'
				],
				disqualifiedByAny: [
					'Any step uses vague super-verbs like evaluate, prepare, handle, manage, process, or complete without decomposition.',
					'A step contains multiple conjunction-joined actions that should be separate.',
					'A step requires another document to know what it really entails.',
					'Super-steps appear without breakdown.'
				],
				partialCreditDescription:
					'Mix of atomic and fat steps; some compress multiple actions or decisions.',
				noneDescription: 'Most steps are super-steps that hide real complexity.',
				partialScore: 4,
				noneScore: 0
			},
			step_triggers: {
				label: 'Step triggers',
				points: 4,
				question: 'Does each step state how it knows to fire?',
				fullCreditRequires: [
					'Each step states its trigger or dependency.',
					'Parallel or out-of-order steps are explicitly flagged.',
					'Step dependencies are unambiguous.'
				],
				disqualifiedByAny: [
					'Step order is implied only by position.',
					'Notes like “may occur earlier” or “as needed” appear without trigger conditions.',
					'References to “step N” appear in an unnumbered document.',
					'Parallel steps are presented sequentially without flagging.'
				],
				partialCreditDescription: 'Some steps have implicit triggers; others are unclear.',
				noneDescription: 'No step-level triggers specified.',
				partialScore: 2,
				noneScore: 0
			},
			step_outcomes: {
				label: 'Step outcomes',
				points: 3,
				question: 'Does each step name what it produces?',
				fullCreditRequires: [
					'Each step names an output, state change, or confirmation.',
					'Step completion is verifiable by the next step.'
				],
				disqualifiedByAny: [
					'Steps end without stated outputs.',
					'Step completion is implicit only.',
					'Outcomes are described only as verbs without observable artifacts.'
				],
				partialCreditDescription: 'Some steps have outcomes; others do not.',
				noneDescription: 'Step outcomes are not specified.',
				partialScore: 1,
				noneScore: 0
			}
		}
	} satisfies CompositeRubricItem,
	decision_points_defined: {
		label: 'Decision points defined',
		points: 15,
		question: 'Where does the process require judgment, and what criteria drive the decision?',
		subdims: {
			judgment_flagged: {
				label: 'Judgment flagged',
				points: 7,
				question: 'Are judgment calls explicitly marked as decisions?',
				fullCreditRequires: [
					'Every place requiring judgment is explicitly marked as a decision.',
					'The decision type is named.',
					'Duplicate decisions are distinguished by context.'
				],
				disqualifiedByAny: [
					'Decisions are buried in procedural language.',
					'“Use your best judgment”, “as appropriate”, or similar language appears without flagging the underlying decision.',
					'Identical decision labels appear without distinction.',
					'Implicit judgment is required but not called out.'
				],
				partialCreditDescription: 'Some decisions are flagged; others are silent.',
				noneDescription: 'Decisions are invisible.',
				partialScore: 3,
				noneScore: 0
			},
			criteria_provided: {
				label: 'Criteria provided',
				points: 8,
				question: 'Does every flagged decision provide criteria, thresholds, or rules?',
				fullCreditRequires: [
					'Every flagged decision states the criteria, thresholds, or policies that drive it.',
					'Criteria are specific enough for consistent application.',
					'External criteria are addressably linked or stated.',
					'Factors are accompanied by weights, thresholds, or decision rules.'
				],
				disqualifiedByAny: [
					'A decision is flagged but criteria are absent or just “use judgment”.',
					'Factors are named without thresholds, weights, or a rule.',
					'Decision depends on established thresholds that are not stated or pointed to.',
					'Criteria are inconsistent across decisions.',
					'Decision rules require open interpretation.'
				],
				partialCreditDescription:
					'Some decisions have criteria; others still rely on judgment alone.',
				noneDescription: 'Decisions are flagged but criteria are absent.',
				partialScore: 4,
				noneScore: 0
			}
		}
	} satisfies CompositeRubricItem,
	outputs_handoffs_and_completeness: {
		label: 'Outputs, handoffs, and completeness',
		points: 20,
		question:
			'Does the process compose into a larger system — what it produces, who it hands to, and whether it fully covers the journey?',
		subdims: {
			outputs_and_state_changes_named: {
				label: 'Outputs & state changes named',
				points: 8,
				question: 'Are outputs and state changes named with enough specificity?',
				fullCreditRequires: [
					'Each step names what it produces.',
					'Outputs are specific enough for later reference.',
					'State changes name both the from-state and to-state.'
				],
				disqualifiedByAny: [
					'Outputs are generic (“update the system”, “save the doc”).',
					'Outputs are implied rather than stated.',
					'State changes are referenced without naming the states.',
					'Steps clearly produce outputs that are not named.'
				],
				partialCreditDescription: 'Some steps have named outputs; others leave them implicit.',
				noneDescription: 'Outputs are absent or vague.',
				partialScore: 4,
				noneScore: 0
			},
			handoffs_explicit: {
				label: 'Handoffs explicit',
				points: 7,
				question: 'Are inter-actor transitions explicit about recipient, format, and medium?',
				fullCreditRequires: [
					'Inter-actor transitions name the recipient, format, and medium.',
					'Handoffs to external parties specify the expected return path.',
					'Asynchronous handoffs specify the channel and lookup path.'
				],
				disqualifiedByAny: [
					'Handoffs say “pass it along”, “forward to [role]”, or “let the team know” without specifics.',
					'Recipient is named without format or medium.',
					'Response is expected but the return path is not named.',
					'Handoff is implied only by adjacent steps assigned to different roles.'
				],
				partialCreditDescription: 'Handoffs happen, but some are vague.',
				noneDescription: 'Handoffs are implicit or absent.',
				partialScore: 3,
				noneScore: 0
			},
			process_completeness: {
				label: 'Process completeness',
				points: 5,
				question: 'Does the process cover trigger-to-outcome, including alternates and errors?',
				fullCreditRequires: [
					'Steps cover the trigger-to-outcome path with no gaps.',
					'Alternate paths are addressed.',
					'Error and edge cases have handling.',
					'Termination conditions for non-happy paths are explicit.'
				],
				disqualifiedByAny: [
					'Only the happy path is described.',
					'Rejection, failure, or decline states are mentioned but not handled.',
					'Decision points reference escalation without specifying the path.',
					'Process ends before the stated outcome is achieved.',
					'Gaps exist where a step output does not connect to any later input.'
				],
				partialCreditDescription:
					'Mostly complete but with one or two obvious gaps, or only the happy path is fully covered.',
				noneDescription: 'Significant steps are missing from the path.',
				partialScore: 2,
				noneScore: 0
			}
		}
	} satisfies CompositeRubricItem
} as const;

export const HUMAN_READINESS_RUBRIC = {
	readability: {
		label: 'Readability',
		points: 20,
		question: 'Could a plainspoken person read this without a dictionary?',
		fullCreditRequires: [
			'Average sentence length stays under roughly 25 words.',
			'Specialist terms are defined on first use or obvious from context.',
			'Procedure begins near the top with minimal preamble.',
			'Active voice is the default.',
			'Plain language is chosen over corporate or consultant register.'
		],
		disqualifiedByAny: [
			'More than three undefined acronyms appear without explanation.',
			'Corporate-wellness preamble appears before the procedure.',
			'Dense passive-voice constructions require rereading.',
			'Specialist jargon appears without plain-language support.',
			'Paragraph-length sentences contain multiple nested clauses.',
			'Section-opening abstract claims do not contribute to execution.'
		],
		partialCreditDescription:
			'Competent but dense — long sentences, specialist vocabulary, or passive constructions force rereading.',
		noneDescription:
			'Impenetrable — consultant-speak, walls of qualification, or writing that assumes prior knowledge.',
		partialScore: 10,
		noneScore: 0
	} satisfies RubricItem,
	scannability: {
		label: 'Scannability',
		points: 15,
		question: 'Can a harried ops lead find the step they need without reading the whole document?',
		fullCreditRequires: [
			'Steps are numbered in an ordered process.',
			'Section headers have clear hierarchy.',
			'Whitespace separates steps and sections.',
			'Notes, examples, and sub-bullets are visually distinct from top-level steps.',
			'A reader can locate step N without reading all prior steps.'
		],
		disqualifiedByAny: [
			'Steps are unnumbered in an ordered process.',
			'Sub-bullets or notes render at the same indentation as top-level steps.',
			'Headers are missing or ambiguous.',
			'Wall-of-prose structure with no visual breaks.',
			'References to “step N” appear in an unnumbered document.'
		],
		partialCreditDescription:
			'Some structure exists, but walls of text, missing headers, or inconsistent visual hierarchy remain.',
		noneDescription: 'Reader must read top-to-bottom to find anything.',
		partialScore: 7,
		noneScore: 0
	} satisfies RubricItem,
	self_contained_context: {
		label: 'Self-contained context',
		points: 20,
		question:
			'Can the reader act on the process without hunting for information outside the document?',
		fullCreditRequires: [
			'All context needed for execution is present in the document.',
			'External references support deeper understanding but are not required for action.',
			'Thresholds, rules, and policies are stated rather than only referenced.',
			'A new hire with no prior context could execute after one read.'
		],
		disqualifiedByAny: [
			'Execution requires consulting other documents for core information.',
			'Thresholds, policies, or rules are referenced but not stated inline.',
			'Tribal knowledge is assumed.',
			'Named dependencies are not included or summarized.',
			'Required templates, lists, or naming conventions exist only by reference.'
		],
		partialCreditDescription:
			'Doc assumes familiarity with adjacent processes, systems, or roles and still needs outside context for basic execution.',
		noneDescription:
			'Document is a skeleton; execution requires tribal knowledge or another document entirely.',
		partialScore: 10,
		noneScore: 0
	} satisfies RubricItem,
	references_linked: {
		label: 'References linked',
		points: 15,
		question: 'Are external dependencies addressable?',
		fullCreditRequires: [
			'External references use specific names, URLs, record IDs, or system identifiers.',
			'Policy or manual references include section numbers or headings.',
			'System references identify specific instances, paths, or records.',
			'A new hire could locate every referenced source without asking a colleague.'
		],
		disqualifiedByAny: [
			'References are vague (“the spreadsheet”, “the doc”, “the tool”).',
			'Named documents exist without section or page references.',
			'URLs, record IDs, or specific field names are absent where needed.',
			'Quality manual or external standard references appear without enough context.'
		],
		partialCreditDescription:
			'References exist but are vague in places — named but not sufficiently locatable.',
		noneDescription: 'External dependencies are alluded to but never named or pointed to.',
		partialScore: 7,
		noneScore: 0
	} satisfies RubricItem,
	terms_consistent: {
		label: 'Terms consistent',
		points: 15,
		question: 'Is the same concept named with the same word throughout the document?',
		fullCreditRequires: [
			'One term per concept is used consistently.',
			'Synonyms only appear when they intentionally mean different things.',
			'Role, system, and artifact names stay constant.',
			'Capitalization of proper nouns is consistent.'
		],
		disqualifiedByAny: [
			'Important entities are used interchangeably without explanation.',
			'Role names drift.',
			'System references rotate between multiple names without clarification.',
			'Artifact or process labels shift without explanation.'
		],
		partialCreditDescription:
			'Mostly consistent but some important entities drift across multiple names.',
		noneDescription: 'Heavy synonym drift forces the reader to map concepts manually.',
		partialScore: 7,
		noneScore: 0
	} satisfies RubricItem,
	internal_consistency: {
		label: 'Internal consistency',
		points: 15,
		question: 'Does the process contradict itself?',
		fullCreditRequires: [
			'No contradictions exist between steps.',
			'Step outputs match later step inputs.',
			'Named dependencies and references all resolve.',
			'Stated outcome matches the final step output.',
			'Roles and responsibilities stay stable throughout.'
		],
		disqualifiedByAny: [
			'References to numbered steps appear in an unnumbered document.',
			'Steps reference outputs that are not clearly produced earlier.',
			'Stated outcome differs from what the final step actually produces.',
			'Roles or responsibilities shift mid-document without explanation.',
			'Duplicate-but-distinct steps are not reconciled.',
			'Optional paths are flagged without branching logic.'
		],
		partialCreditDescription:
			'Minor inconsistencies exist, but the document is still mostly coherent.',
		noneDescription: 'Significant contradictions break the process logic.',
		partialScore: 7,
		noneScore: 0
	} satisfies RubricItem
} as const;

export const AI_GRADE_BANDS = {
	A: [90, 100],
	B: [80, 89],
	C: [60, 79],
	F: [0, 59]
} as const;

export const HUMAN_GRADE_BANDS = {
	A: [90, 100],
	B: [80, 89],
	C: [60, 79],
	F: [0, 59]
} as const;

export const gradeForScore = (score: number): LetterGrade => {
	if (score >= 90) return 'A';
	if (score >= 80) return 'B';
	if (score >= 60) return 'C';
	return 'F';
};

export const isPassingGrade = (grade: LetterGrade): boolean => grade === 'A' || grade === 'B';
