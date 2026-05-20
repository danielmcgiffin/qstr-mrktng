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
		title: 'Create your workspace',
		description: 'Set up the workspace that will hold your operating map.',
		category: 'Getting started',
		blocks: [
			{
				title: 'What the workspace is',
				body: [
					'Your workspace is the container for one operating atlas: the roles, processes, systems, actions, and links that describe how the business actually runs.',
					'Use one workspace for one company or operating unit. If two teams share customers, systems, and handoffs, they usually belong in the same workspace.'
				]
			},
			{
				title: 'Before you add content',
				body: [
					'Pick one workflow that already creates questions, rework, or founder interruptions. Do not start by documenting the whole company.',
					'Gather whatever already exists: SOPs, onboarding docs, Looms, Slack notes, system checklists, and the person who knows the real version.'
				]
			},
			{
				title: 'First pass',
				body: [
					'Create the workspace, name it after the business or operating unit, and add the first few roles, processes, and systems that touch the bottleneck workflow.',
					'The first pass should be useful, not complete. You can connect and refine the atlas after the core workflow is visible.'
				]
			}
		]
	},
	{
		slug: 'add-your-first-role',
		title: 'Add your first role',
		description: 'Define who owns work without tying the map to one employee.',
		category: 'Getting started',
		blocks: [
			{
				title: 'Use roles, not people',
				body: [
					'A role is a seat in the operating model. A person can hold a role, but the role is what owns decisions, actions, and handoffs.',
					'Name the role the way the team would say it in real work: Ops Manager, Client Success Lead, Bookkeeper, Founder, or Implementation Specialist.'
				]
			},
			{
				title: 'Write the responsibility boundary',
				body: [
					'Add the short version of what this role is accountable for. Focus on decisions and outcomes, not a job-description paragraph.',
					'A useful role description answers: what does this role decide, what does it produce, and when does another role need to receive something from it?'
				]
			},
			{
				title: 'Connect it immediately',
				body: [
					'After creating the role, connect it to at least one process step or action. Unconnected roles become org-chart decoration.',
					'If nobody can name a process the role owns or supports, the role may be too vague.'
				]
			}
		]
	},
	{
		slug: 'add-your-first-process',
		title: 'Add your first process',
		description: 'Capture a workflow as a chain of owned, executable steps.',
		category: 'Getting started',
		blocks: [
			{
				title: 'Start with the trigger',
				body: [
					'Every process starts because something happened: a contract is signed, a ticket changes status, a client sends a request, a payment fails, or a weekly review begins.',
					'Write the trigger plainly. If the start condition is fuzzy, the rest of the process will be fuzzy too.'
				]
			},
			{
				title: 'Describe steps as stations',
				body: [
					'Each step should name the owner, input, operation, output, and destination. That is the minimum structure for work another person can run.',
					'If a step says "handle request" or "follow up as needed", split it until the action is observable.'
				]
			},
			{
				title: 'Stop at the first useful version',
				body: [
					'The first process does not need every exception. Capture the normal path first, then add edge cases after the team uses it.',
					'A process is ready to publish when someone outside your head can run the next step without a meeting.'
				]
			}
		]
	},
	{
		slug: 'add-systems',
		title: 'Add systems',
		description: 'Map the tools where work happens and decisions are recorded.',
		category: 'Getting started',
		blocks: [
			{
				title: 'What counts as a system',
				body: [
					'A system is any place work happens or truth is stored: CRM, email, project management, accounting, shared drive, ticketing, payroll, calendar, or an internal spreadsheet.',
					'Do not duplicate the system in Quaestor. Add the system so processes can point to the real place where the work happens.'
				]
			},
			{
				title: 'Add operational context',
				body: [
					'For each system, capture what it is used for, which roles touch it, and what kind of records live there.',
					'The useful question is not "what software do we use?" It is "what business truth lives here, and who depends on it?"'
				]
			},
			{
				title: 'Link systems to actions',
				body: [
					'Connect the system to the actions performed inside it. A CRM is abstract; "update deal stage after signed SOW" is operational.',
					'These links are what keep the atlas from becoming another static software inventory.'
				]
			}
		]
	},
	{
		slug: 'connect-actions-to-roles-and-systems',
		title: 'Connect actions to roles and systems',
		description: 'Make every action accountable and anchored to the tool where it happens.',
		category: 'Getting started',
		blocks: [
			{
				title: 'The basic rule',
				body: [
					'Every action should have a role and, when applicable, a system. The role owns the work. The system is where the work happens or where the output lands.',
					'An action without a role has no accountability. An action without a system may still be valid, but it should be intentionally system-free.'
				]
			},
			{
				title: 'Write action names as commands',
				body: [
					'Use verbs: create client folder, approve access request, send kickoff email, reconcile invoice, update renewal date.',
					'Command-shaped actions are easier to assign, audit, search, and eventually automate.'
				]
			},
			{
				title: 'Check the handoff',
				body: [
					'For each action, ask what output is produced and where it goes next. If the output has no destination, the process stops silently.',
					'Good links make the next role obvious before anyone asks.'
				]
			}
		]
	},
	{
		slug: 'search-and-lookup',
		title: 'Search and lookup',
		description:
			'Find the current role, process, system, or action without hunting through old docs.',
		category: 'Using the atlas',
		blocks: [
			{
				title: 'Search for the object, not the document',
				body: [
					'Quaestor is organized around operational objects: roles, processes, systems, and actions. Search for the thing you need to operate, not the title of an old SOP.',
					'Useful searches usually include the customer event, system name, role name, or output you are trying to produce.'
				]
			},
			{
				title: 'Follow the links',
				body: [
					'When you land on a process, use the connected roles and systems to understand who owns each part and where the work happens.',
					'When you land on a role or system, use the connected actions to see what that role or system actually does in the business.'
				]
			},
			{
				title: 'Fix bad lookup results',
				body: [
					'If the right answer is hard to find, improve the object names and descriptions. Search problems are usually naming problems.',
					'Prefer the words your team already uses. The atlas should match the operating language of the company.'
				]
			}
		]
	},
	{
		slug: 'role-manuals',
		title: 'Role manuals',
		description: 'Use connected role data as the starting point for onboarding and delegation.',
		category: 'Using the atlas',
		blocks: [
			{
				title: 'What a role manual contains',
				body: [
					'A role manual should collect the role purpose, owned processes, recurring actions, systems used, key handoffs, and decision boundaries.',
					'It should be generated from the connected atlas wherever possible, not maintained as a separate document that drifts.'
				]
			},
			{
				title: 'Use it for onboarding',
				body: [
					'Give a new operator the manual for the role they are stepping into, then walk through the connected processes and systems in order.',
					'The manual is useful when it points to live work. It is not useful when it reads like a generic job description.'
				]
			},
			{
				title: 'Keep it current',
				body: [
					'When the role changes, update the underlying role, process, action, or system records. The manual should reflect the map.',
					'If you edit only the manual, you have created a second source of truth.'
				]
			}
		]
	},
	{
		slug: 'process-steps',
		title: 'Process steps',
		description: 'Structure each step so a person or agent can execute it without hidden context.',
		category: 'Using the atlas',
		blocks: [
			{
				title: 'Five parts',
				body: [
					'Each process step needs a trigger, input, operation, output, and destination.',
					'This structure turns vague process prose into executable work. It also exposes missing context quickly.'
				]
			},
			{
				title: 'Inputs and outputs must have shape',
				body: [
					'Do not say "client info" if the next role needs a signed SOW, billing contact, target launch date, and implementation notes.',
					'Do not say "send update" if the output must be a Slack message in a specific channel with the client name, blocker, owner, and next deadline.'
				]
			},
			{
				title: 'One owner per step',
				body: [
					'A step can involve multiple people, but it should have one accountable role.',
					'If ownership changes inside the step, split the step. That is a handoff, not a detail.'
				]
			}
		]
	},
	{
		slug: 'flags',
		title: 'Flags',
		description: 'Use flags to mark risk, drift, missing ownership, or places that need review.',
		category: 'Using the atlas',
		blocks: [
			{
				title: 'What to flag',
				body: [
					'Flag anything that weakens execution: missing owner, unclear input, stale system note, undocumented exception, broken handoff, or decision that still routes to the founder.',
					'Flags are not polish tasks. They identify places where work can stall.'
				]
			},
			{
				title: 'Make flags specific',
				body: [
					'A useful flag names the issue and the object it affects. "Needs cleanup" is vague. "Billing handoff has no output format" is actionable.',
					'Assign the flag to the role best positioned to fix it.'
				]
			},
			{
				title: 'Close the loop',
				body: [
					'Review flags in the same rhythm as real operations: after onboarding, after client delivery, after a dropped handoff, or after a repeated question.',
					'Do not let flags become a backlog nobody owns.'
				]
			}
		]
	},
	{
		slug: 'handoffs',
		title: 'Handoffs',
		description:
			'Document the edge where work leaves one role and becomes another role’s responsibility.',
		category: 'Using the atlas',
		blocks: [
			{
				title: 'Why handoffs matter',
				body: [
					'Most operational breakage happens between roles, not inside a single task. The sender thinks the work is done; the receiver lacks what they need.',
					'A handoff is complete only when the next role receives the right output, in the right place, with enough context to act.'
				]
			},
			{
				title: 'Name the sender and receiver',
				body: [
					'Every handoff should identify the sending role, receiving role, output, destination, and trigger for the next step.',
					'If the receiver is "whoever sees it", the handoff is not designed yet.'
				]
			},
			{
				title: 'Document the failure mode',
				body: [
					'Add the common thing that goes wrong: missing file, wrong status, unclear priority, no deadline, or silent client exception.',
					'Failure modes are where tribal knowledge hides. Capture them while they are fresh.'
				]
			}
		]
	},
	{
		slug: 'users-and-access',
		title: 'Users and access',
		description: 'Give teammates the access they need without blurring ownership.',
		category: 'Administration',
		blocks: [
			{
				title: 'Access follows operating need',
				body: [
					'Invite users who need to read, maintain, or operate against the atlas. Keep access aligned with the role they perform in the business.',
					'Do not use access as a substitute for ownership. A user can edit many things; a role still owns the work.'
				]
			},
			{
				title: 'Review access during role changes',
				body: [
					'When someone changes seats, review the roles, systems, and processes they touch.',
					'The operating map should make access reviews easier because it shows which systems and actions depend on the role.'
				]
			}
		]
	},
	{
		slug: 'workspace-settings',
		title: 'Workspace settings',
		description: 'Keep workspace-level details aligned with the business unit being mapped.',
		category: 'Administration',
		blocks: [
			{
				title: 'Use plain names',
				body: [
					'Name the workspace after the company or operating unit your team recognizes. Clever internal labels make search and support harder.',
					'If you operate multiple brands or divisions, create a naming convention before the second workspace appears.'
				]
			},
			{
				title: 'Keep ownership visible',
				body: [
					'The workspace should have a clear administrative owner responsible for access, hygiene, and escalation.',
					'That owner does not need to maintain every process, but they should know who does.'
				]
			}
		]
	},
	{
		slug: 'exporting-your-data',
		title: 'Exporting your data',
		description: 'Understand what to preserve when you need a copy of the atlas.',
		category: 'Administration',
		blocks: [
			{
				title: 'Export the relationships',
				body: [
					'The value of the atlas is not just the text fields. It is the connections between roles, processes, systems, actions, and handoffs.',
					'When preparing an export, preserve enough structure that another person can see what owns what and where work moves next.'
				]
			},
			{
				title: 'Use exports for review, not drift',
				body: [
					'Exports are useful for audits, reviews, and transition planning. They should not become a parallel documentation system.',
					'If the exported copy gets edited separately, the atlas is no longer the source of truth.'
				]
			}
		]
	},
	{
		slug: 'deleting-your-data',
		title: 'Deleting your data',
		description: 'Plan deletion so operational ownership and records are handled intentionally.',
		category: 'Administration',
		blocks: [
			{
				title: 'Before deletion',
				body: [
					'Confirm which workspace, records, or user data you intend to remove. Deletion should be specific enough that no one is surprised by the operational impact.',
					'If the atlas is being replaced, decide where the source of truth will live afterward.'
				]
			},
			{
				title: 'Operational handoff',
				body: [
					'Before deleting material that people still rely on, assign a role to own the transition.',
					'The goal is not to preserve everything forever. The goal is to avoid deleting the map while the team is still using it to operate.'
				]
			}
		]
	}
];

export const getDocsArticle = (slug: string): DocsArticle | undefined =>
	docsArticles.find((article) => article.slug === slug);
