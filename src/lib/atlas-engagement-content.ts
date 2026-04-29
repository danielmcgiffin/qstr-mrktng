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

const bookingHref = 'https://cal.com/danny-cursus/15min';

export const atlasEngagementContent: AtlasEngagementContent = {
	eyebrow: 'The Atlas Engagement',
	headline: 'Take a real vacation in 30 days.',
	subheadline: 'Without your business running through your phone.',
	heroParagraphs: [
		"Right now, your business runs on memory. Yours. Your ops person's. The one employee who knows where the weird client exception lives. The person everyone Slacks because the 'process' is buried in a Google Doc from 2021, a Notion nobody trusts, or a Trainual video that teaches the wrong thing slowly.",
		"That isn't an operating system. That's a hostage situation.",
		"The Atlas Engagement turns the operational knowledge scattered across your business into a working map your team can actually use. In 4 weeks, you'll have a connected operating model of your back office: every covered role, every core process, every system, all linked, all owned, all searchable.",
		'Not another documentation graveyard. A map.'
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
			body: "You give us the raw material: SOPs, Looms, training videos, Slack exports, onboarding emails, job descriptions, system notes. We pull the shape of the business out of the mess. You don't start from a blank page."
		},
		{
			badge: 'Week 2',
			title: 'Draft + Walkthrough',
			body: "We assemble a draft atlas. We sit down with you for one working session and walk every role, process, and system. You tell us what's right, what's wrong, and where reality differs from the official version. Some of this requires interviews with your team — usually 3-5 short sessions, max 45 minutes each. We do them. You don't."
		},
		{
			badge: 'Week 3',
			title: 'Refinement',
			body: 'We close the gaps. Role manuals finalized. Process docs finalized. System index complete. Handoff document drafted.'
		},
		{
			badge: 'Week 4',
			title: 'Rollout + Handoff',
			body: 'We roll it out with your team. They learn where to look before they ask you. You take the vacation test.'
		}
	],
	includedHeading: "What's included",
	includedItems: [
		'A complete operating atlas covering up to 25 roles, 40 core processes, and unlimited connected systems',
		'Role manuals for every covered back-office seat',
		'Core process documentation, searchable in 3 clicks or less',
		'System index of every tool your team uses, mapped to the work it supports',
		'The Founder Handoff Document — what you give your first ops hire on day one',
		'A gap report flagging missing owners, stale processes, unclear handoffs, and single points of failure',
		'12 months of Quaestor platform access ($3,000 value)',
		'AI-powered drift detection that flags stale processes before they bite'
	],
	notIncludedHeading: "What we won't do",
	notIncludedItems: [
		'No SOW theater. This page is the offer.',
		'No 6-month consulting odyssey.',
		"No retainer. Engagement ends in 4 weeks. You don't need us hovering.",
		"No MBA who's never run a business lecturing you about Lean Six Sigma.",
		"We won't redesign your company from scratch. That's a different engagement.",
		"We won't pretend AI alone replaces the work. Some of what's in your team's heads has to be extracted by a human asking good questions. That's our job, not yours."
	],
	priceHeading: 'Price',
	price: '$7,500 one-time',
	priceSubtext: 'Includes the 4-week engagement and 12 months of platform access.',
	priceAfterYearOne:
		'After year 1, platform access is $3,000/yr. No retainer. No surprise invoices.',
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
				'You run a 15-60 person services business',
				'You can name three things only you know how to do',
				"You haven't taken a real vacation in over a year",
				"You'd be in trouble if your ops person quit tomorrow",
				"You've thought about hiring a consultant and decided you'd rather not"
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
	availabilityBody: 'We take 4 Atlas Engagements per quarter. Q3 has 2 slots open.',
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
