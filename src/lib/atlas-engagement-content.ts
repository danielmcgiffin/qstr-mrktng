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
	subheadline: 'Get the business out of your head.',
	heroParagraphs: [
		'Stop being the answer key. Stop carrying the business in your head.',
		'If you cannot leave without an emergency, you do not own the business. It owns you.',
		'In 4 weeks, we turn your scattered operations into a working atlas: roles, processes, systems, owners, handoffs, and gaps.',
		'Not a deck. Not a framework. An atlas. Your business, out of your brain.'
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
			body: 'You give us the raw material: SOPs, Looms, emails, job descriptions, system notes, voice memos. We pull the business out of the mess.'
		},
		{
			badge: 'Week 2',
			title: 'Draft + Walkthrough',
			body: 'We build the draft atlas. You walk it with us. We find what is real, what is fantasy, and what is missing. Team interviews are optional and short.'
		},
		{
			badge: 'Week 3',
			title: 'Refinement',
			body: 'We close the gaps. Role manuals. Process docs. System index. Handoff.'
		},
		{
			badge: 'Week 4',
			title: 'Rollout + Handoff',
			body: 'We roll it out. The team learns where to look before asking you. Then you take the vacation test.'
		}
	],
	includedHeading: "What's included",
	includedItems: [
		'A complete operating atlas covering your ~20 most important processes',
		"Role manuals for every seat that's part of those processes",
		'Searchable process documentation',
		'System guides mapped to the work they support',
		'The Founder Handoff Document',
		'A gap report: missing owners, stale processes, weak handoffs, single points of failure',
		'12 months of Quaestor platform access ($3,000 value)'
	],
	notIncludedHeading: "What we won't do",
	notIncludedItems: [
		'No SOW theater. This page is the offer.',
		'No 6-month consulting odyssey.',
		'No retainer. Four weeks. Done.',
		'No vision theater. Groundwork first.',
		'No MBA lecture on Lean Six Sigma.',
		'No company redesign.',
		"No pretending AI alone fixes operations. We extract what is in people's heads."
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
				'You hate consultant theater'
			]
		},
		{
			heading: 'This is not for you if',
			items: [
				'You want to dump files into a folder and call it fixed',
				'You want a 6-month consulting engagement with 12 review meetings',
				'You think your Notion only needs discipline',
				'You want a company redesign'
			]
		}
	],
	availabilityHeading: 'Limited availability',
	availabilityBody: 'We take a limited number of Atlas Engagements. First ready, first served.',
	upsellHeading: 'The bigger version',
	upsellParagraphs: [
		'The Atlas Engagement maps the business you have.',
		'The Transition Atlas designs the business you are building: current state, future state, and the path between.',
		'Starts at $45,000. One engagement per quarter. By application.'
	],
	upsellCta: {
		label: 'Apply for The Transition Atlas',
		href: bookingHref
	},
	footerLine:
		'Quaestor turns your operations into a typed semantic model: readable by people, agents, and systems. The Atlas is the artifact.'
};
