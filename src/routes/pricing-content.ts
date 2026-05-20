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
	subhead: 'One workspace maps the business. Add more when the operation demands it.',
	plans: [
		{
			name: 'Quaestor Workspace',
			price: '$3,000',
			period: 'annual',
			desc: 'One workspace. Unlimited people. Unlimited operational map.',
			perks: [
				'Unlimited viewers & editors',
				'Unlimited processes, roles, and systems',
				'Unlimited flags and team feedback'
			],
			cta: {
				label: 'Start today',
				href: `${signupBaseHref}&utm_content=pricing_growth`
			},
			featured: true
		},
		{
			name: 'Atlas Engagement',
			price: '$7,500',
			period: 'one time',
			desc: 'Four weeks. Twenty core processes. A working atlas, plus 12 months of platform access.',
			perks: [
				'Done-for-you operating atlas',
				'Rollout and handoff support',
				'12 months of platform access included'
			],
			cta: {
				label: 'See the engagement',
				href: '/atlas-engagement'
			},
			featured: false
		}
	]
};
