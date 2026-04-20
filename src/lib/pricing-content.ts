export type PricingCta = {
	label: string;
	href: string;
};

export type PricingPlan = {
	name: string;
	price: string;
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
		'Two plans, depending on the size of your team. If you want help getting it mapped, we can connect you with an implementer.',
	plans: [
		{
			name: 'Growth',
			price: '$149',
			desc: 'For teams under 25 that need the work to stop routing back through one person.',
			perks: ['Under 25 people', 'Shared operational atlas', 'Flags and team feedback'],
			cta: {
				label: 'Start with Growth',
				href: `${signupBaseHref}&utm_content=pricing_growth`
			},
			featured: true
		},
		{
			name: 'Scale',
			price: '$299',
			desc: 'For teams over 25 that need cleaner handoffs across the business.',
			perks: ['Over 25 people', 'Shared operational atlas', 'Flags and team feedback'],
			cta: {
				label: 'Start with Scale',
				href: `${signupBaseHref}&utm_content=pricing_scale`
			},
			featured: false
		}
	],
	freeLink: {
		label: 'Or start free →',
		href: `${signupBaseHref}&utm_content=pricing_free_link`
	}
};
