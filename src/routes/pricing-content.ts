export type PricingCta = {
	label: string;
	href: string;
};

export type PricingPlan = {
	name: string;
	price: string;
	period: string;
	desc: string;
	perks: string[];
	cta: PricingCta;
	featured: boolean;
	badge?: string;
	note?: string;
};

export type PricingContent = {
	eyebrow: string;
	headline: string;
	subhead: string;
	plans: PricingPlan[];
	freeLink?: PricingCta;
};

const signupBaseHref =
	'https://qstr.cursus.tools/login?utm_source=cursus.tools&utm_medium=website&utm_campaign=v1_launch';

export const pricingContent: PricingContent = {
	eyebrow: 'Pricing',
	headline: 'Simple price. Serious leverage.',
	subhead:
		'Start with the software. Or have us help build your first operating atlas. Priced by workspace, not by seat, because the point is to get the whole team using the same map.',
	plans: [
		{
			name: 'Quaestor Workspace',
			price: '$3,000',
			period: 'year',
			desc: 'For teams ready to map their own operations.',
			perks: [
				'Unlimited viewers and editors',
				'Unlimited processes, roles, and systems',
				'Role, workflow, and system views',
				'Flags and team feedback',
				'Updates that keep connected views current'
			],
			cta: {
				label: 'Start your workspace',
				href: `${signupBaseHref}&utm_content=pricing_growth`
			},
			featured: false,
			badge: 'Software only',
			note: 'Best if you already know what you want to map first.'
		},
		{
			name: 'Atlas Engagement',
			price: '$7,500',
			period: 'one time',
			desc: 'For teams who want the first version built with them.',
			perks: [
				'Guided operating atlas build',
				'Up to 15 core workflows mapped',
				'Rollout and handoff support',
				'Training for your operators',
				'12 months of Quaestor Workspace included'
			],
			cta: {
				label: 'Book an Atlas call',
				href: '/atlas-engagement'
			},
			featured: true,
			badge: 'Fastest path to value',
			note: 'Best if the work is still mostly in your head.'
		}
	]
};
