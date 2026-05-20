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
			headshotSrc: null,
			headshotAlt: 'Headshot of John Marlett',
			bio: [
				'John turns the atlas model into working product infrastructure.',
				'He works closest to the places where product claims become real: architecture, data, security posture, and the application itself.'
			],
			focus: ['Product engineering', 'AWS infrastructure', 'data model']
		}
	],
	finalCta: {
		headline: 'Bring the bottleneck.',
		text: 'If the business still depends on who remembers, start there. That is where the map begins.',
		label: 'Talk to us',
		href: '/contact'
	}
};
