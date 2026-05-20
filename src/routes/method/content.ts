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
		title: 'Why Most Ops Documentation Fails',
		summary: 'The patterns that kill documentation. Yours is probably already bleeding.',
		intro:
			'You have seen it. Maybe you built it. Great on day one. Dead by month three. Five failure modes do the damage. Quaestor is built to kill them.',
		groups: [
			{
				items: [
					{
						id: 'theater',
						title: 'Documentation theater',
						desc: 'Long SOPs. Clean binder. Dead in a month. Built to look complete, not to disappear into the work. Hard to find. Harder to maintain. The business leaves them behind.'
					},
					{
						id: 'duplicates',
						title: 'Duplicate systems of record',
						desc: 'Copies of copies. Same process in a doc, a wiki, and an email thread. None current. Multiple truths equal no truth. The team slows down to debate what "right" means.'
					},
					{
						id: 'unowned',
						title: 'Unowned actions, systems, or roles',
						desc: 'Passive voice kills accountability. "This will be done" names nobody. No owner means no update, no decision, no standard. Put a role on every action. Accountability is load-bearing.'
					},
					{
						id: 'graveyard',
						title: 'The documentation graveyard',
						desc: 'Wikis nobody reads. SOPs from dead org charts. A SharePoint full of answers no one asks for. Real time. Real money. No return.'
					},
					{
						id: 'consultant-imposed',
						title: 'Consultant-imposed structures',
						desc: 'Slideware. Binders. Maturity models. Someone else’s abstraction stapled to your business. The map was never of your territory.'
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
			'Every operation reduces to three things and the links between them. Quaestor turns those links into a living graph: current, connected, queryable.',
		groups: [
			{
				items: [
					{
						id: 'primitives',
						title: 'Three primitives: Roles, Processes, Systems',
						desc: 'Every action in the business has a role that owns it, a standard for how it’s done, and a system where it happens. A person does a thing in a place. Everything else is detail.'
					},
					{
						id: 'connections',
						title: 'Everything connected, nothing duplicated',
						desc: 'Each element links to what it touches. Change a role, process, system, activity, or resource once. The map updates where it matters. One change. One place. Less drift.'
					},
					{
						id: 'steps-connect',
						title: 'Steps are the connective tissue',
						desc: 'Roles, processes, and systems are the primitives. Steps are the joint. Every step has the same five parts: a trigger that starts it, an input it receives in a specific shape, operations the role performs on that input, an output it produces in a specific shape, and a destination where that output goes next. A signed SOW arrives. The ops manager creates the client folder. A folder link gets handed off to client success. Miss any of the five and the step leaks.'
					},
					{
						id: 'source-of-truth',
						title: 'The map is the source of truth',
						desc: 'Leadership sees the field. Teams get what they need at the point of need. Quaestor is not another copy of your docs. It connects systems, people, and work.'
					},
					{
						id: 'outputs',
						title: 'Atomic knowledge, dynamic outputs',
						desc: 'Capture knowledge once at the smallest useful level. Generate guides, manuals, and system docs from current graph data. Write once. Use everywhere.'
					},
					{
						id: 'built-for-people',
						title: 'Built for your people, not your systems',
						desc: 'Knowledge infrastructure is for the people doing the work. If your operator has to hunt, the system failed. Quaestor surfaces the answer where the decision gets made.'
					}
				]
			}
		]
	},
	{
		slug: 'method',
		title: 'How to Map Your Operations',
		summary: 'Start where it hurts. Ship the MVP. Build capture into the rhythm.',
		intro:
			'No six-month rollout. Start with the workflow that costs the most. Map it in a sitting. Ship the draft. Build from there.',
		groups: [
			{
				items: [
					{
						id: 'existing-material',
						title: 'Map what you already have',
						desc: 'Do not write a new SOP yet. Audit what exists: docs, Looms, Slack canvases, system notes, and the senior operator’s head. You probably have the raw material. It is just scattered and disconnected.'
					},
					{
						id: 'bottleneck',
						title: 'Start with the bottleneck',
						desc: 'Open your inbox. Open your calendar. What’s the question your people keep asking you? What decision can’t happen without your input? The process behind that question is the heaviest chain on your desk. Start there.'
					},
					{
						id: 'interfaces',
						title: 'Define the handoffs',
						desc: 'Work breaks at handoff. Make the edge explicit: who sends, what triggers, what moves, who owns the next step. Handoffs without owners are hopes.'
					},
					{
						id: 'station',
						title: 'A step is a station',
						desc: [
							'A step is a station on an assembly line.',
							'Every step in your business has the same five parts. A trigger that starts it. An input it receives, in a specific shape. Operations the role performs on that input. An output it produces, in a specific shape. A destination where that output goes next.',
							'Miss any of the five and the step leaks. Leaks get patched by the person who’s been there longest, quietly, without writing it down. That’s tribal knowledge, and it’s the tax you pay for working around a step that was never fully described.'
						]
					},
					{
						id: 'assembly-line',
						title: 'The process is the assembly line',
						desc: [
							'The factory is the right picture.',
							'A station on an assembly line has a bell that signals start. A half-finished chassis rolls up on the belt. The worker installs the dashboard. The assembly moves on. The bay after it paints. The bay after that installs the wheels. No station does its job well if it doesn’t know what’s arriving, what’s leaving, or where it’s going next.',
							'Office work is the same, with invisible belts. The trigger is a form submission, a calendar event, a status change in the CRM. The input is a signed SOW, a ticket in a specific state, a brief with all the fields filled in. The output is an email sent, a folder created, an access request approved. The destination is the next role, the client, a downstream system. The belt is there. It’s just that nobody drew it.'
						]
					},
					{
						id: 'ai-ready-by-accident',
						title: 'AI-ready by accident',
						desc: [
							'Write every step this way and agents come for free.',
							'Here’s the part most founders miss. A step described with all five parts is a step a new hire can run on their first Tuesday. It’s also a step an agent can execute on first pass. Not because you wrote it for AI. Because you wrote it well enough for a human, and that turns out to be the same thing.',
							'The way to be AI-ready is to stop writing for AI. Write for the person who doesn’t know the tribal answer yet. You’ll get the agent for free.'
						]
					},
					{
						id: 'commands',
						title: 'Write steps as commands',
						desc: 'Verbs, not paragraphs. Each step should be executable without a meeting and linked to the system where the work actually happens. If a step requires interpretation, it’s just a suggestion.'
					},
					{
						id: 'watch-real-work',
						title: 'Watch how work actually gets done',
						desc: 'Ignore the official process for a minute. Watch the senior operator handle the hard call. The written version is theory. Tuesday with an angry client is the business. Capture that.'
					},
					{
						id: 'ship',
						title: 'Ship the 80%',
						desc: 'A working map beats a perfect map you never ship. Publish the draft. Let the team push back. The map gets better through contact.'
					},
					{
						id: 'rhythm',
						title: 'Make it a rhythm, not a project',
						desc: 'Do not document everything at once. You will quit. Capture work in rhythm. Finish onboarding? Open Quaestor. What happened? What broke? What would have helped? Update the map. Repeat. Do not schedule a quarterly “documentation review.” That meeting dies.'
					}
				]
			}
		]
	},
	{
		slug: 'signals',
		title: 'Measure freedom, not folders',
		summary: 'Signals that prove the map is doing real work.',
		intro:
			'Documentation for its own sake is busywork. These are the signals the map is doing real work.',
		groups: [
			{
				items: [
					{
						id: 'time-to-answer',
						title: 'Time to answer',
						desc: 'How long before someone finds what they need without asking the person who “just knows.” If this number isn’t dropping, the map isn’t working.'
					},
					{
						id: 'interruptions',
						title: 'Interruptions per week',
						desc: 'Count the questions routed to one expert. Track before. Track after. The delta is the ROI.'
					},
					{
						id: 'vacation-test',
						title: 'The vacation test',
						desc: 'Can the owner leave for a week without everything falling apart? If not, the map isn’t done yet. This is the only metric that ultimately matters.'
					},
					{
						id: 'real-delegation',
						title: 'Real delegation',
						desc: 'Real delegation is when someone makes the call and tells you later. If they still need pre-approval, you are still in the loop. Watch for the first hard call handled without you.'
					}
				]
			},
			{
				title: 'What We Won’t Do',
				items: [
					{
						id: 'no-theater',
						title: 'No documentation theater',
						desc: 'We won’t help you build long, static docs that look impressive in a deliverable and go stale in a month. We’ve all been there. Never again.'
					},
					{
						id: 'no-duplicates',
						title: 'No duplicate systems of record',
						desc: 'If work happens in a system, the map links to it, it doesn’t copy it. One source of truth means one source of truth.'
					},
					{
						id: 'no-unowned',
						title: 'No unowned workflows',
						desc: 'If a process doesn’t have an owner, it doesn’t get published. Period. Ambiguity is not a feature.'
					},
					{
						id: 'no-consultant-theater',
						title: 'No consultant theater',
						desc: 'No maturity models. No capability matrices. No frameworks that look good in a deck and die on first contact with the actual business. We map what’s there. If you want theater, hire a Big 4 consultancy. They do it better.'
					}
				]
			}
		]
	}
];
