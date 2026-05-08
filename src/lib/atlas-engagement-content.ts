export type AtlasWeek = {
	badge: string;
	title: string;
	body: string;
};

export type AtlasQualification = {
	heading: string;
	items: string[];
};

export type AtlasEngagementContent = {
	eyebrow: string;
	headline: string;
	subheadline: string;
	heroParagraphs: string[];
	primaryCta: {
		label: string;
		href: string;
	};
	heroAvailabilityNote: string;
	weeksHeading: string;
	weeks: AtlasWeek[];
	includedHeading: string;
	includedItems: string[];
	notIncludedHeading: string;
	notIncludedItems: string[];
	priceHeading: string;
	price: string;
	priceSubtext: string;
	priceAfterYearOne: string;
	guaranteeHeading: string;
	guaranteeParagraphs: string[];
	qualificationHeading: string;
	qualificationColumns: [AtlasQualification, AtlasQualification];
	availabilityHeading: string;
	availabilityBody: string;
	upsellHeading: string;
	upsellParagraphs: string[];
	upsellCta: {
		label: string;
		href: string;
	};
	footerLine: string;
};

const bookingHref = 'https://tidycal.com/atlas-build/explo';

export const atlasEngagementContent: AtlasEngagementContent = {
	eyebrow: 'The Atlas Engagement',
	headline: 'Take the vacation.',
	subheadline: "Here's what you're going to do.",
	heroParagraphs: [
		"You're going to stop being the answer key for every question. You're going to set your business up to run the day-to-day without you. And you're going to do it without dropping any of the plates you're currently spinning.",
		"If you can't leave without there being some kind of emergency, we have a name for that: hostage situation.",
		"The Atlas Engagement turns your existing operations, scattered across the people, papers, and systems that have cycled in and out over the years, into a working map your team can actually use. In 4 weeks, you'll have a connected operating model of your back office: every covered role, every core process, every system, all linked, all owned, all searchable.",
		'Not a deck. Not a framework. Not a "deliverable" that goes nowhere. An atlas. Your business, out of your brain.'
	],
	primaryCta: {
		label: 'Book a 15-minute Atlas Fit Call',
		href: bookingHref
	},
	heroAvailabilityNote: '4 engagements per quarter. Q3 has 2 slots open.',
	weeksHeading: 'How it works',
	weeks: [
		{
			badge: 'Week 1',
			title: 'Discovery + Ingest',
			body: "You give us the raw material: SOPs, Looms, training videos, Slack exports, onboarding emails, job descriptions, system notes, impromptu voice recordings. We pull the shape of the business out of the mess. You don't start from a blank page, and you don't have to set aside any time to write anything."
		},
		{
			badge: 'Week 2',
			title: 'Draft + Walkthrough',
			body: "We assemble a draft atlas, then we'll sit down with you for one working session and walk every role, process, and system. You tell us what's right, what's wrong, and where your real world and your paper dreams don't match up. If you want, we can leverage brief interviews with your team as well. Usually 3-5 short sessions, max 45 minutes each."
		},
		{
			badge: 'Week 3',
			title: 'Refinement',
			body: 'We close the gaps. Role manuals finalized. Process docs finalized. System index complete. Handoff drafted.'
		},
		{
			badge: 'Week 4',
			title: 'Rollout + Handoff',
			body: 'We roll it out with your team. They learn where to look before they ask you. You go take that vacation test.'
		}
	],
	includedHeading: "What's included",
	includedItems: [
		'A complete operating atlas covering your ~20 most important processes',
		"Role manuals for every seat that's part of those processes",
		'A library of process documentation, maximally searchable',
		'System guides for every tool your team uses in those processes, mapped to the work it supports',
		'The Founder Handoff Document: what you give your next ops leader on day one',
		'A gap report flagging missing owners, stale processes, unclear handoffs, and single points of failure',
		'12 months of Quaestor platform access ($3,000 value)'
	],
	notIncludedHeading: "What we won't do",
	notIncludedItems: [
		'No SOW theater. This page is the offer.',
		'No 6-month consulting odyssey.',
		"No retainer. Engagement ends in 4 weeks. You don't need us hovering.",
		'No interviews with your CFO about his "vision." Groundwork first, then you can reach for the stars.',
		"No MBA who's never run a business lecturing you about Lean Six Sigma.",
		"No redesigning your company from scratch (that's a different engagement).",
		"No pretending AI alone replaces the work. Some of what's in your team's heads has to be extracted by a human asking good questions. That's our job, not yours."
	],
	priceHeading: 'Price',
	price: '$7,500 one-time',
	priceSubtext: 'Includes the 4-week engagement and 12 months of platform access.',
	priceAfterYearOne: 'After year 1, platform access is $3,000/yr, flat.',
	guaranteeHeading: 'Our guarantee',
	guaranteeParagraphs: [
		"Atlas delivered in 4 weeks. Or you don't pay for the engagement.",
		'If we miss the delivery date, the engagement is free — and you keep the platform access for the year regardless.',
		"If the deliverable is incomplete, unclear, or unusable, we fix it at our cost until it isn't.",
		"We guarantee the deliverable. We can't guarantee your team's adoption — that's between you and them — but we'll set you up to win the conversation."
	],
	qualificationHeading: 'Is this for you?',
	qualificationColumns: [
		{
			heading: 'This is for you if',
			items: [
				'You run a 15-90 person business',
				'You can name three things only you know how to do',
				"You haven't taken a real vacation in over a year",
				"You'd be in trouble if your ops person quit tomorrow",
				"You've thought about hiring a consultant and hate that idea"
			]
		},
		{
			heading: 'This is not for you if',
			items: [
				'You want to dump files into a folder and pretend AI fixed it',
				'You want a 6-month consulting engagement with 12 review meetings',
				"Your Notion is 'basically done, just needs discipline'",
				'You want us to redesign your whole company from scratch'
			]
		}
	],
	availabilityHeading: 'Limited availability',
	availabilityBody:
		'We take as many Atlas Engagements per quarter as we can, on a first-come, first-serve basis.',
	upsellHeading: 'The bigger version',
	upsellParagraphs: [
		'The Atlas Engagement maps the business you have.',
		"The Transition Atlas designs the business you're trying to build — current state, future state, and the operating transition between them.",
		'Starts at $45,000. One engagement per quarter. By application.'
	],
	upsellCta: {
		label: 'Apply for The Transition Atlas',
		href: bookingHref
	},
	footerLine:
		"Quaestor's underlying architecture is a typed semantic model of your operations — your business made readable by humans, agents, integrators, and yourself. The Atlas is the artifact you walk away with."
};
