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
	headline: 'Ready to get started.',
	subhead:
		"One price for your business. A workspace contains everything you need to map your entire business or, if you're larger or more complex, a whole business function (or client space or delivery type... etc).",
	plans: [
		{
			name: 'Quaestor Workspace',
			price: '$3,000',
			period: 'annual',
			desc: 'One price for your business. You can purchase additional workspaces as needed for the same rate.',
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
			desc: 'A 4-week implementation that turns your 20 most important processes into a working atlas, with 12 months of platform access included.',
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
