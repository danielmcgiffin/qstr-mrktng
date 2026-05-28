export type DocsBlock = {
	title: string;
	body: string[];
};

export type DocsArticle = {
	slug: string;
	title: string;
	description: string;
	category: string;
	blocks: DocsBlock[];
};

export const docsArticles: DocsArticle[] = [
	{
		slug: 'create-your-workspace',
		title: 'Establish your workspace',
		description: 'The foundational container for your operations atlas.',
		category: 'Getting started',
		blocks: [
			{
				title: 'The single source of truth',
				body: [
					'Your workspace holds the map of your operations. It connects the roles, processes, systems, and actions that define how the business runs. If teams share customers, systems, and handoffs, keep them in one workspace to prevent confusion.'
				]
			},
			{
				title: 'Before capturing work',
				body: [
					'Do not try to map the whole company at once. Start with one workflow that causes questions, errors, or constant interruptions. Gather the videos, checklists, and notes that already exist.'
				]
			},
			{
				title: 'The initial draft',
				body: [
					'Set up the workspace and add the core roles and systems that touch your bottleneck workflow. Focus on immediate utility, not perfection. The map will grow and improve as you connect more work.'
				]
			}
		]
	},
	{
		slug: 'add-your-first-role',
		title: 'Add your first role',
		description: 'Define ownership without tying operations to a specific employee.',
		category: 'Getting started',
		blocks: [
			{
				title: 'Roles over individuals',
				body: [
					'A role is a seat in your business. A person occupies the seat, but the role owns the decisions and handoffs. Use the simple, common names your team actually uses (like Ops Lead or Account Manager) rather than fancy titles.'
				]
			},
			{
				title: 'Boundaries of accountability',
				body: [
					'Define roles by their concrete outcomes and decisions, not long job descriptions. Make it clear what they decide, what they produce, and who depends on their output.'
				]
			},
			{
				title: 'Immediate integration',
				body: [
					'A role must interact with the business to have value. Connect every new role to a process step or action immediately. Unconnected roles are just decoration; connected roles hold weight.'
				]
			}
		]
	},
	{
		slug: 'add-your-first-process',
		title: 'Add your first process',
		description: 'Capture workflows as a continuous sequence of executable steps.',
		category: 'Getting started',
		blocks: [
			{
				title: 'Define the trigger',
				body: [
					'Every process starts because something happened—a signed contract, a status change in a tool, or a specific date. Define this start condition clearly so the team knows exactly when to begin.'
				]
			},
			{
				title: 'Steps as stations',
				body: [
					'Define each step with clear inputs, operations, outputs, and destinations. This gives the operator everything they need to execute. Break down vague instructions like "handle request" into clear actions.'
				]
			},
			{
				title: 'Publish for momentum',
				body: [
					'Publish the process as soon as an operator can execute it without a meeting. Document the standard path first, and add exceptions as the team uses it.'
				]
			}
		]
	},
	{
		slug: 'add-systems',
		title: 'Add systems',
		description:
			'Anchor the work to the tools where truth is established and decisions are recorded.',
		category: 'Getting started',
		blocks: [
			{
				title: 'Defining a system',
				body: [
					'A system is where work happens or truth is stored—like your CRM, email, accounting software, or shared drives. Point to the system; do not try to duplicate it in Quaestor.'
				]
			},
			{
				title: 'Operational context',
				body: [
					'State what the system is used for, who uses it, and what data lives inside it. Focus on what business reality lives in the tool, not just the software name.'
				]
			},
			{
				title: 'Linking to action',
				body: [
					'Connect systems directly to the steps performed within them. This ensures your tools are linked to the actual work.'
				]
			}
		]
	},
	{
		slug: 'connect-actions-to-roles-and-systems',
		title: 'Connect actions to roles and systems',
		description: 'Establish clear accountability and locate the work.',
		category: 'Getting started',
		blocks: [
			{
				title: 'The foundational rule',
				body: [
					'Every action needs a role to own it and a system where it happens. An action without a role has no accountability. An action without a system is disconnected.'
				]
			},
			{
				title: 'Executable commands',
				body: [
					'Write actions as simple commands: reconcile invoice, send email, create folder. Active verbs clarify expectations and make automation easier later.'
				]
			},
			{
				title: 'Handoff validation',
				body: [
					'Make sure every action produces a clear output with a destination. If the output has nowhere to go, the process stops and breaks.'
				]
			}
		]
	},
	{
		slug: 'search-and-lookup',
		title: 'Search and lookup',
		description: 'Navigate the business through connected operational objects.',
		category: 'Using the atlas',
		blocks: [
			{
				title: 'Search the graph, not a document',
				body: [
					'Quaestor operates on data, not static documents. When you need an answer, search for the role, the system, or the specific client event you are trying to execute—not the title of an old SOP. Locate the real object, not a static page.'
				]
			},
			{
				title: 'Navigate the connections',
				body: [
					'When viewing a process, use the links to see who owns each step and where the work happens. When viewing a role, see its actual impact on the business.'
				]
			},
			{
				title: 'Refine through use',
				body: [
					'If an answer is hard to find, simplify the names. Match the vocabulary your team uses in daily operations.'
				]
			}
		]
	},
	{
		slug: 'role-manuals',
		title: 'Role manuals',
		description: 'Leverage dynamic data for onboarding and true delegation.',
		category: 'Using the atlas',
		blocks: [
			{
				title: 'Dynamic generation',
				body: [
					"A role manual is a live view of a role's purpose, processes, systems, and handoffs, pulled directly from the atlas. Do not maintain it as a separate document."
				]
			},
			{
				title: 'Contextual onboarding',
				body: [
					'Give new hires a live manual that points directly to their connected work, rather than a generic job description. Walk through their processes in order.'
				]
			},
			{
				title: 'Maintain the source',
				body: [
					'When a role changes, update the underlying roles, processes, or systems. Editing a manual in isolation creates duplicate truths; updating the map updates the organization.'
				]
			}
		]
	},
	{
		slug: 'process-steps',
		title: 'Process steps',
		description: 'Eliminate ambiguity with structured, atomic knowledge.',
		category: 'Using the atlas',
		blocks: [
			{
				title: 'The five components',
				body: [
					'Every step needs a trigger, input, operation, output, and destination. This structure turns vague text into executable actions and highlights missing context.'
				]
			},
			{
				title: 'Defined outputs',
				body: [
					'Inputs and outputs must have a clear shape. Replace vague terms like "client info" with exact details (like signed SOW, billing email, and launch date).'
				]
			},
			{
				title: 'Singular ownership',
				body: [
					'Only one role can own a step. If the owner changes during the step, split the step to show the handoff.'
				]
			}
		]
	},
	{
		slug: 'flags',
		title: 'Flags',
		description: 'Identify friction and maintain operational momentum.',
		category: 'Using the atlas',
		blocks: [
			{
				title: 'Targeted identification',
				body: [
					'Use flags to mark bottlenecks—like missing owners, unclear inputs, or decisions that get stuck. Flags point to operational weaknesses, not formatting issues.'
				]
			},
			{
				title: 'Actionable clarity',
				body: [
					'Be specific. "Needs review" is too vague. "Missing output format for billing handoff" is actionable. Assign the flag to the role that can fix it.'
				]
			},
			{
				title: 'Rhythmic review',
				body: [
					'Review flags as part of your regular operations—after onboarding, after project delivery, or after an error—to keep the work moving.'
				]
			}
		]
	},
	{
		slug: 'handoffs',
		title: 'Handoffs',
		description: 'Fortify the spaces between roles.',
		category: 'Using the atlas',
		blocks: [
			{
				title: 'The point of failure',
				body: [
					'Breakdowns happen in the transition between roles, not inside tasks. A handoff is only successful when the receiver gets the right output, in the right place, with enough context to act.'
				]
			},
			{
				title: 'Explicit transitions',
				body: [
					'Define the sender, the receiver, the output, and the trigger for the next step. If the receiver is unclear, the handoff is incomplete.'
				]
			},
			{
				title: 'Capture the failure mode',
				body: [
					'Document the common errors (like missing files or wrong status tags) to capture local knowledge before it causes a delay.'
				]
			}
		]
	},
	{
		slug: 'users-and-access',
		title: 'Users and access',
		description: 'Distribute visibility without diluting ownership.',
		category: 'Administration',
		blocks: [
			{
				title: 'Aligned access',
				body: [
					'Give access based on operational need. Invite team members to read or edit based on the role they perform.'
				]
			},
			{
				title: 'Access is not accountability',
				body: [
					'Being able to edit a process does not make you the owner. The role remains the single point of accountability.'
				]
			},
			{
				title: 'Intentional transitions',
				body: [
					'When someone changes seats, use the map to review the systems and processes they touch to ensure a clean handoff of access.'
				]
			}
		]
	},
	{
		slug: 'workspace-settings',
		title: 'Workspace settings',
		description: 'Maintain a cohesive and recognizable environment.',
		category: 'Administration',
		blocks: [
			{
				title: 'Clarity in naming',
				body: [
					'Name the workspace after the company or business unit your team recognizes. Avoid clever codes or names that confuse new hires.'
				]
			},
			{
				title: 'Visible administration',
				body: [
					'Assign a clear owner for workspace hygiene and access. They do not have to maintain every process, but they are responsible for the structure.'
				]
			}
		]
	},
	{
		slug: 'exporting-your-data',
		title: 'Exporting your data',
		description: 'Preserve the architecture of your operations.',
		category: 'Administration',
		blocks: [
			{
				title: 'Relational value',
				body: [
					'The value of the map is the connections between roles, systems, and processes. Keep this structure intact during exports so the workflow remains clear.'
				]
			},
			{
				title: 'Audits, not drift',
				body: [
					'Use exports for reviews or audits. Do not update exported files separately, or you will create a second source of truth.'
				]
			}
		]
	},
	{
		slug: 'deleting-your-data',
		title: 'Deleting your data',
		description: 'Manage operational records with intention.',
		category: 'Administration',
		blocks: [
			{
				title: 'Calculated removal',
				body: [
					'Before deleting workspaces or records, check the operational impact to make sure you do not break active workflows.'
				]
			},
			{
				title: 'Managed transitions',
				body: [
					'If you delete or change a process, assign a role to manage the transition so the team is not left without a clear standard.'
				]
			}
		]
	}
];

export const getDocsArticle = (slug: string): DocsArticle | undefined =>
	docsArticles.find((article) => article.slug === slug);
