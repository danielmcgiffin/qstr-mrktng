export type MethodItem = {
	id: string;
	title: string;
	desc: string | string[];
};

export type MethodGroup = {
	title?: string;
	items: MethodItem[];
};

export type MethodContentSection = {
	slug: string;
	title: string;
	summary: string;
	intro: string;
	groups: MethodGroup[];
};

export const methodContent: MethodContentSection[] = [
	{
		slug: 'diagnosis',
		title: 'Why Operations Documents Fail',
		summary: 'Why operations documents fail.',
		intro:
			'Traditional procedures fail because they are too complex and detached from daily work. They become static checklists that everyone ignores. We focus on capturing real data, not writing binders.',
		groups: [
			{
				items: [
					{
						id: 'external-templates',
						title: 'Playbooks from the outside do not work',
						desc: 'When you try to force someone else\'s generic playbook onto your team, it fails. You trade your team\'s real, local knowledge for what a consultant calls a "best practice." The system might look clean, but it does not work in the field.'
					},
					{
						id: 'documentation-theater',
						title: 'Duplicate records create confusion',
						desc: 'When information is scattered across wikis, folders, and threads, no one knows where to look. Multiple versions of a process mean no one has a standard. The team stops executing and starts debating. The documentation gets left behind.'
					}
				]
			}
		]
	},
	{
		slug: 'model',
		title: 'The Operating Model',
		summary: 'Three simple primitives. Work as a living graph.',
		intro:
			'Every business reduces to three things: Roles, Processes, and Systems. Quaestor maps how they connect so you can see how the business actually runs.',
		groups: [
			{
				items: [
					{
						id: 'living-graph',
						title: 'A living graph, not folders',
						desc: [
							'Your business does not run on pages in a folder. It runs on flows, handoffs, and tools. By mapping how these parts connect, you build a map of your real operations.',
							'A connected map is easy to maintain. Update a system or role in one place, and the change reflects everywhere. The model stays clean and under your control.'
						]
					},
					{
						id: 'three-primitives',
						title: 'Roles, Processes, Systems',
						desc: 'A defined role executes a specific process inside a designated system. Organize your business around these three primitives. It keeps your standards clear and protects the actual knowledge of your team, leaving everything else as detail.'
					}
				]
			}
		]
	},
	{
		slug: 'method',
		title: 'How to Map Your Operations',
		summary: 'Map the work, define the handoffs, and ship the draft.',
		intro:
			'Do not stop the business for a massive documentation project. Map the reality of the work, make the handoffs clear, and let real-world execution refine the map.',
		groups: [
			{
				items: [
					{
						id: 'map-reality',
						title: 'Map the reality',
						desc: 'Audit what you already have: Slack threads, screenshots, and the checklists your team actually uses. Start exactly where it hurts—the recurring question, the dropped handoff, or the bottleneck that stops execution.'
					},
					{
						id: 'define-handoffs',
						title: 'Define the handoffs',
						desc: 'Make transitions explicit. Define who sends, what triggers the action, what moves, and who owns the output. If a handoff does not have a clear owner, the work stops. Write steps as simple, executable commands.'
					},
					{
						id: 'ship-draft',
						title: 'Ship the draft',
						desc: 'An 80% draft in the hands of your team today is worth more than a perfect framework next month. Let the team execute on it. Use their feedback to make it better. Build mapping into the daily rhythm of the work so the map stays alive.'
					}
				]
			}
		]
	},
	{
		slug: 'signals',
		title: 'Measure Freedom, Not Folders',
		summary: 'Signals that prove the map works.',
		intro:
			'Documentation is useless if it does not create leverage. If your map is doing real work, the results are simple and measurable.',
		groups: [
			{
				title: 'Signals of a working atlas',
				items: [
					{
						id: 'time-to-answer',
						title: 'Time to answer',
						desc: 'A sharp decrease in the time it takes a new hire to find an answer without interrupting an expert.'
					},
					{
						id: 'interruptions',
						title: 'Interruptions per week',
						desc: 'A drop in repetitive questions sent to the founder or expert, giving you back your time.'
					},
					{
						id: 'real-delegation',
						title: 'Real delegation',
						desc: 'Your team handles the problem and tells you the result, rather than asking for pre-approval.'
					}
				]
			},
			{
				title: 'Our convictions',
				items: [
					{
						id: 'no-consultant-theater',
						title: 'No consultant theater',
						desc: 'We map the real territory. No maturity models, no abstract slides, and no heavy frameworks that die on day one.'
					},
					{
						id: 'relationships-not-documents',
						title: 'Relationships over documents',
						desc: 'We do not use nested folder structures. By structuring the work clearly for your team, it naturally becomes structured enough for AI agents to help.'
					},
					{
						id: 'built-for-owners',
						title: 'Built for owners, not cap tables',
						desc: 'Most software companies charge per seat, which rewards hiring more people. We charge a flat rate per workspace. Your headcount is not our revenue model.'
					}
				]
			}
		]
	}
];
