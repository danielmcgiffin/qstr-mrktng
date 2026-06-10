export type FounderLink = {
	label: string;
	href: string;
};

export type FounderCard = {
	name: string;
	role: string;
	initials: string;
	headshotSrc: string | null;
	headshotAlt: string;
	bio: string[];
	focus?: string[];
	links?: FounderLink[];
};

export type AboutContent = {
	seo: {
		title: string;
		description: string;
		ogTitle: string;
		ogDescription: string;
	};
	eyebrow: string;
	title: string;
	foundersIntro: string;
	founders: FounderCard[];
	anthem: {
		heading: string;
		lines: string[];
	};
	finalCta: {
		headline: string;
		text: string;
		label: string;
		href: string;
	};
};

export const aboutContent: AboutContent = {
	seo: {
		title: 'About - Quaestor',
		description:
			'Meet the people building Quaestor, the operational atlas for founder-led businesses.',
		ogTitle: 'About Quaestor',
		ogDescription: 'The people behind the operational atlas.'
	},
	eyebrow: 'Meet the team',
	title: 'Building tools for real businesses',
	foundersIntro:
		'Quaestor is built by operators who know how small and medium-sized businesses actually run: through people, judgment, systems, handoffs, and a lot of knowledge that never makes it into the SOP folder.',
	founders: [
		{
			name: 'Danny McGiffin',
			role: 'Founder',
			initials: 'DM',
			headshotSrc: '/DM_headshot.jpeg',
			headshotAlt: 'Headshot of Danny McGiffin',
			bio: [
				'From Army logistics to management consulting, Danny spent a decade building systems for organizations, watching documents nobody read get filed into SharePoints nobody opened.',
				"The moment of revelation came mid-project at a major consulting firm: he was building excellent docs, and he knew after he left they'd be outdated in months and read by essentially zero people. That was a waste.",
				'Quaestor is his answer: not a better document, but a way to make the real operating model of the business understandable and usable.'
			]
		},
		{
			name: 'John Marlett',
			role: 'Founder, Engineering',
			initials: 'JM',
			headshotSrc: '/John_headshot.jpeg',
			headshotAlt: 'Headshot of John Marlett',
			bio: [
				"It's often said the best solution is the simplest one.",
				'John likes writing things down and designing systems that work for everyone.',
				'Quaestor is his solution to the business problem of **needing to write things down**.'
			]
		}
	],
	anthem: {
		heading: 'Here’s to the owners.',
		lines: [
			'The operators. The builders. The ones standing in the gap.',
			'The ones who signed the loan, took the calls, made payroll, and carried the thing further than anyone could guess.',
			'They do not need another binder, another framework, or another person’s ideas about the thing they have poured themselves into.',
			'They need the work made visible. Not trapped in their head. Not buried in PowerPoint. Not scattered across docs nobody trusts.',
			'Ownership is not just having your name on the paperwork. Ownership is command. A business you have to drag by hand is still another chain.',
			'Map it. Shape it. Hand it off. **Own it.**'
		]
	},
	finalCta: {
		headline: 'Bring the bottleneck.',
		text: 'If the business still depends on who remembers, start there. That is where the map begins.',
		label: 'Talk to us',
		href: '/contact'
	}
};
