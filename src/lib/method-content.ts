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
		summary: 'The patterns that kill documentation efforts... and why yours probably already died.',
		intro:
			'You’ve seen this before. Maybe you built it yourself. Maybe you inherited it. Documentation that looked great on day one. A liability by month three. We’ve done this for a lot of businesses and found five failure modes. Quaestor eliminates all of them.',
		groups: [
			{
				items: [
					{
						id: 'theater',
						title: 'Documentation theater',
						desc: 'Long SOPs that look professional in the binder and are abandoned within a month. Everyone’s built these. Nobody uses them. This is 80% of the consultant deliverables and 90% of the templates online, built to look complete, not to disappear into the work. The effort goes into the writing, screenshots, and layout... but it’s hard to find info and harder to maintain. The business leaves the docs behind almost before the ink is dry.'
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
					},
					{
						id: 'consultant-imposed',
						title: 'Consultant-imposed structures',
						desc: 'Frameworks that look impressive in slides and don’t match how the business actually works. Binders. Maturity models. Capability matrices. Someone else’s abstraction stapled to your operation, sold back to you as insight. Most of it destroys more value than it creates. The map was never of your territory.'
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
						desc: 'Every action in the business has a role that owns it, a standard for how it’s done, and a system where it happens. A person does a thing in a place. Everything else is detail.'
					},
					{
						id: 'connections',
						title: 'Everything connected, nothing duplicated',
						desc: 'Each element links to every other element it touches. Change a role’s responsibilities and every affected process updates. Change a system, and the system is updated across your whole org’s process documentation. Realign a role, refine a process, change an activity or a resource, and never worry about what other documents you have to update because you made that update. One change, one place, zero drift.'
					},
					{
						id: 'steps-connect',
						title: 'Steps are the connective tissue',
						desc: 'Roles, processes, and systems are the primitives. Steps are the joint. Every step has the same five parts: a trigger that starts it, an input it receives in a specific shape, operations the role performs on that input, an output it produces in a specific shape, and a destination where that output goes next. A signed SOW arrives. The ops manager creates the client folder. A folder link gets handed off to client success. Miss any of the five and the step leaks.'
					},
					{
						id: 'source-of-truth',
						title: 'The map is the source of truth',
						desc: 'Quaestor organizes operations so leadership can see the big picture and teams can retrieve what they need at the point of need. It’s not another copy of your docs. It’s a live graph connecting systems of record, people, and work. Quaestor doesn’t replace your tools, it connects them so your work can run the way it actually runs.'
					},
					{
						id: 'outputs',
						title: 'Atomic knowledge, dynamic outputs',
						desc: 'When you capture knowledge once at the smallest useful level, those pieces can be assembled into whatever output you need. Instead of writing and maintaining onboarding guides, role manuals, and system docs by hand, generate them on demand from current graph data. Write once, use everywhere.'
					},
					{
						id: 'built-for-people',
						title: 'Built for your people, not your systems',
						desc: 'Knowledge infrastructure is for the people doing the work. Not for the admins filing the documents. Not for the consultants who wrote them. If your operator has to hunt, the system failed. Knowledge workers already spend about 20% of their time looking things up. Quaestor surfaces what someone needs where the decision gets made. Not three folders deep in a shared drive nobody maintains.'
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
			'This doesn’t need a six-month implementation. Start with the workflow that costs the most time, map it in a sitting, and let the structure grow from there. The method works whether you’re mapping your own business or deploying it across multiple client engagements.',
		groups: [
			{
				items: [
					{
						id: 'existing-material',
						title: 'Map what you already have',
						desc: 'Most businesses are drowning in information and starving for insight. Before you write a single new SOP, do an honest audit. Docs in the shared drive. Loom videos somebody made last quarter. Slack canvases. The stuff in your senior operator’s head that’s never been written down. You probably have 60% of the raw material already, scattered across seven places. Everybody has information. The problem is nothing talks to anything else.'
					},
					{
						id: 'bottleneck',
						title: 'Start with the bottleneck',
						desc: 'Open your inbox. Open your calendar. What’s the question your people keep asking you? What decision can’t happen without your input? The process behind that question is the heaviest chain on your desk. Start there.'
					},
					{
						id: 'interfaces',
						title: 'Define the handoffs',
						desc: 'Where work passes between people is where operations break down. Make those edges explicit: who hands off to whom, what triggers the handoff, and who owns the next step. Handoffs without owners are just hopes.'
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
						desc: 'Ignore the official process doc. Watch how your senior operator actually handles the tough calls. That’s where the real knowledge is. The written version is somebody’s theory of how it should go. What happens on a Tuesday with a pissed-off client is the business. Capture the second one.'
					},
					{
						id: 'ship',
						title: 'Ship the 80%',
						desc: 'A working map you can react to beats a perfect map you never finish. Publish the draft. Let the team push back, fill gaps, and correct what’s wrong. The map gets better through use, not through tweaking endlessly in isolation.'
					},
					{
						id: 'rhythm',
						title: 'Make it a rhythm, not a project',
						desc: 'Documentation projects fail because founders try to document everything at once. They burn out in three weeks. They quit. Your business didn’t accumulate complexity overnight, and you’re not going to solve it in a weekend sprint. Build capture into the rhythm of the work. Finish a client onboarding? Sit down with the team, open Quaestor, walk through what happened. What worked. What didn’t. What would’ve been useful to have. Do it again next time. Then once a quarter. Then once a year. Keep touching it. Do not schedule a three-hour block once a quarter called “documentation review.” That block has a 100% death rate.'
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
						desc: 'The number of questions routed to a single person... usually the owner or similarly long-tenured expert. Track it before, track it after. That delta is the ROI.'
					},
					{
						id: 'vacation-test',
						title: 'The vacation test',
						desc: 'Can the owner leave for a week without everything falling apart? If not, the map isn’t done yet. This is the only metric that ultimately matters.'
					},
					{
						id: 'real-delegation',
						title: 'Real delegation',
						desc: 'Real delegation is when someone makes a decision and tells you about it after. If they’re still checking in, asking for advice, or getting pre-approval, the circuit isn’t closed. You’re still on the loop. The graduation moment is the first time an operator handles a hard call and you only hear about it at the end of the week. Watch for it.'
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
