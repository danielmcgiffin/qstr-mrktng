export type MethodItem = {
	id: string;
	title: string;
	desc: string;
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
		title: 'Why Most Ops Documentation Fails',
		summary: 'The patterns that kill documentation efforts... and why yours probably already died.',
		intro:
			"You've seen this before. Maybe you built it yourself, maybe you inherited it. Either way, the result is the same: documentation that looked great on day one and became a liability (or got forgotten) by month three. We've done this for a lot of businesses, and have found four primary failure modes. We've designed Quaestor to eliminate all of them.",
		groups: [
			{
				items: [
					{
						id: 'theater',
						title: 'Documentation theater',
						desc: "Long SOPs that look professional in the binder and are abandoned within a month. Everyone's built these. Nobody uses them. This is 80% of the consultant deliverables and 90% of the templates online, designed to look 'complete' instead of 'getting out of the way so we can do our jobs'. The effort goes into the writing, screenshots, and layout... but it's hard to find info and harder to maintain. The business leaves the docs behind almost before the ink is dry."
					},
					{
						id: 'duplicates',
						title: 'Duplicate systems of record',
						desc: 'Copies of copies of copies. The same process described in a Google Doc, a wiki page, and an email thread... and none of them are current. Multiple versions of SOPs are the same as having no SOP at all. Instead of streamlining work, teams slow down to debate what "right" is, and it makes finding the right document in the shared drive a tedious nightmare.'
					},
					{
						id: 'unowned',
						title: 'Unowned actions, systems, or roles',
						desc: 'When writing SOPs, people often use passive voice ("this will be done") without assigning ownership to a person or role. So "steps" that exist on paper have no owner (or no clear system, or lacking additional context) cause confusion and create operational drag. When something breaks, everyone’s pointing the finger at someone else. When something changes, no one’s updating the map. But having a role on every action keeps things moving well... accountability is load-bearing.'
					},
					{
						id: 'graveyard',
						title: 'The documentation graveyard',
						desc: 'Wikis nobody reads. SOPs layered on SOPs from reorgs in ages past. A SharePoint full of answers to questions no one is asking. The saddest part: someone spent real time and money building all of it. Usage fails for many reasons, often in combination, but the result is the same: investment without return.'
					}
				]
			}
		]
	},
	{
		slug: 'model',
		title: 'The Operating Model',
		summary: 'Three primitives. Infinite connections. One source of truth.',
		intro:
			'Every business operation — no matter the industry, no matter the size — reduces to three essential elements and the relationships between them. Quaestor maps these relationships into a living graph so the picture of how work works is always current, always connected, and always queryable in the simplest, most frictionless way possible.',
		groups: [
			{
				items: [
					{
						id: 'primitives',
						title: 'Three primitives: Roles, Processes, Systems',
						desc: "Who does what, where. Every action in your business has one accountable role who does it, they have the standard to which the action needs doing, and they have the system (or place) where they do that action. This isn't an over-simplification or abstraction. It's the atomic structure of operations. A person does an action in a place (or system, or app...), everything else is detail."
					},
					{
						id: 'connections',
						title: 'Everything connected, nothing duplicated',
						desc: "Each element links to every other element it touches. Change a role's responsibilities and every affected process updates. Change a system, and the system is updated across your whole org's process documentation. Realign a role, refine a process, change an activity or a resource, and never worry about what other documents you have to update because you made that update. One change, one place, zero drift."
					},
					{
						id: 'source-of-truth',
						title: 'The map is the source of truth',
						desc: "Quaestor organizes operations so leadership can see the big picture and teams can retrieve what they need at the point of need. It's not another copy of your docs. It's a live graph connecting systems of record, people, and work. Quaestor doesn't replace your tools, it connects them so your work can run the way it actually runs."
					},
					{
						id: 'outputs',
						title: 'Atomic knowledge, dynamic outputs',
						desc: 'When you capture knowledge once at the smallest useful level, those pieces can be assembled into whatever output you need. Instead of writing and maintaining onboarding guides, role manuals, and system docs by hand, generate them on demand from current graph data. Write once, use everywhere.'
					}
				]
			}
		]
	},
	{
		slug: 'method',
		title: 'How to Map Your Operations',
		summary: 'Four steps. Start where it hurts. Ship the MVP.',
		intro:
			"This doesn't need a six-month implementation. Start with the workflow that costs the most time, map it in a sitting, and let the structure grow from there. The method works whether you're mapping your own business or deploying it across multiple client engagements.",
		groups: [
			{
				items: [
					{
						id: 'bottleneck',
						title: 'Start with the bottleneck',
						desc: 'Find the workflow that generates the most interruptions, causes the most heartburn, or pulls leadership into it every time. Map those processes first. It proves immediate value, sets the pattern for everything else, and builds the momentum to keep going.'
					},
					{
						id: 'interfaces',
						title: 'Define the handoffs',
						desc: 'Where work passes between people is where operations break down. Make those edges explicit: who hands off to whom, what triggers the handoff, and who owns the next step. Handoffs without owners are just hopes.'
					},
					{
						id: 'step',
						title: 'Steps are everything',
						desc: "Think of each step as everything that happens before the work gets handed off. Using a factory analogy, each step has a thing that arrives, gets changed, and is handed-off. If the work moves to a new system or a new role, then it's a new step."
					},
					{
						id: 'commands',
						title: 'Write steps as commands',
						desc: "Verbs, not paragraphs. Each step should be executable without a meeting and linked to the system where the work actually happens. If a step requires interpretation, it's just a suggestion."
					},
					{
						id: 'ship',
						title: 'Ship the 80%',
						desc: "A working map you can react to beats a perfect map you never finish. Publish the draft. Let the team push back, fill gaps, and correct what's wrong. The map gets better through use, not through tweaking endlessly in isolation."
					}
				]
			}
		]
	},
	{
		slug: 'signals',
		title: "How You Know It's Working",
		summary: 'Three metrics that prove the map is reducing friction, not just adding pages.',
		intro:
			"Documentation for its own sake is busywork. These are the signals that tell you whether the map is actually making operations run better... and they're the same metrics you'd use to prove the ROI to anyone who asks.",
		groups: [
			{
				items: [
					{
						id: 'time-to-answer',
						title: 'Time to answer',
						desc: "How long before someone finds what they need without asking the person who 'just knows.' If this number isn't dropping, the map isn't working."
					},
					{
						id: 'interruptions',
						title: 'Interruptions per week',
						desc: 'The number of questions routed to a single person... usually the owner or similarly long-tenured expert. Track it before, track it after. That delta is the ROI.'
					},
					{
						id: 'vacation-test',
						title: 'The vacation test',
						desc: "Can the owner leave for a week without everything falling apart? If not, the map isn't done yet. This is the only metric that ultimately matters."
					}
				]
			},
			{
				title: "What We Won't Do",
				items: [
					{
						id: 'no-theater',
						title: 'No documentation theater',
						desc: "We won't help you build long, static docs that look impressive in a deliverable and go stale in a month. We've all been there. Never again."
					},
					{
						id: 'no-duplicates',
						title: 'No duplicate systems of record',
						desc: "If work happens in a system, the map links to it, it doesn't copy it. One source of truth means one source of truth."
					},
					{
						id: 'no-unowned',
						title: 'No unowned workflows',
						desc: "If a process doesn't have an owner, it doesn't get published. Period. Ambiguity is not a feature."
					}
				]
			}
		]
	}
];
