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
};

export const pricingContent: PricingContent = {
	eyebrow: 'Pricing',
	headline: 'Simple pricing that scales with you',
	subhead: 'Monthly plans from Stripe. Annual billing options are available at checkout.',
	plans: [
		{
			name: 'Starter',
			price: '$49',
			desc: 'For small teams just getting started, invite up to 11 people to share your workspace.',
			perks: ['Up to 11 people', 'Shared workspace', 'Monthly billing'],
			cta: {
				label: 'Subscribe',
				href: 'https://checkout.stripe.com/c/pay/prctbl_1TFbsbPXv0uLqE40qDYif6Bq/prctblitm_UE40W3wl1qFxHz#fidkdWxOYHwnPyd1blppbHNgWjA0VlEzdklVXXM1cEl0QDE1T3xDU09cT1xrMWBtM1BzfVVhXWZUYU9mN1YzM0xOcV9KNVc2ZDNCaTZgS3BvTUtrR0g3TDVDZHI1Rmo0MXZWNFNdR0FNVHMyNTV8YUpxYVV%2FVCcpJ3ZwZ3Zmd2x1cWxqa1BrbHRwYGtgdnZAa2RnaWBhJz9jZGl2YHgl'
			},
			featured: false
		},
		{
			name: 'Growth',
			price: '$99',
			desc: 'For growing teams, invite up to 49 people to your team as you start to formalize and scale operations.',
			perks: ['Up to 49 people', 'Team workspace', 'Monthly billing'],
			cta: {
				label: 'Subscribe',
				href: 'https://checkout.stripe.com/c/pay/prctbl_1TFbsbPXv0uLqE40qDYif6Bq/prctblitm_UE40AXIzHWrB7j#fidkdWxOYHwnPyd1blppbHNgWjA0VlEzdklVXXM1cEl0QDE1T3xDU09cT1xrMWBtM1BzfVVhXWZUYU9mN1YzM0xOcV9KNVc2ZDNCaTZgS3BvTUtrR0g3TDVDZHI1Rmo0MXZWNFNdR0FNVHMyNTV8YUpxYVV%2FVCcpJ3ZwZ3Zmd2x1cWxqa1BrbHRwYGtgdnZAa2RnaWBhJz9jZGl2YHgl'
			},
			featured: false
		},
		{
			name: 'Scale',
			price: '$299',
			desc: 'For teams growing quickly, invite up to 200 people to make sure your operations grow with your business.',
			perks: ['Up to 200 people', 'Team workspace', 'Monthly billing'],
			cta: {
				label: 'Subscribe',
				href: 'https://checkout.stripe.com/c/pay/prctbl_1TFbsbPXv0uLqE40qDYif6Bq/prctblitm_UE40MsThQoifvq#fidkdWxOYHwnPyd1blppbHNgWjA0VlEzdklVXXM1cEl0QDE1T3xDU09cT1xrMWBtM1BzfVVhXWZUYU9mN1YzM0xOcV9KNVc2ZDNCaTZgS3BvTUtrR0g3TDVDZHI1Rmo0MXZWNFNdR0FNVHMyNTV8YUpxYVV%2FVCcpJ3ZwZ3Zmd2x1cWxqa1BrbHRwYGtgdnZAa2RnaWBhJz9jZGl2YHgl'
			},
			featured: false
		},
		{
			name: 'Free',
			price: '$0',
			desc: "Try Quaestor for free! Make unlimited processes, roles, and systems. Only pay when you're ready to invite others.",
			perks: ['Unlimited processes', 'Unlimited roles', 'Unlimited systems'],
			cta: {
				label: 'Start free',
				href: 'https://checkout.stripe.com/c/pay/prctbl_1TFbsbPXv0uLqE40qDYif6Bq/prctblitm_UE40ZT1pn3oIPm#fidkdWxOYHwnPyd1blppbHNgWjA0VlEzdklVXXM1cEl0QDE1T3xDU09cT1xrMWBtM1BzfVVhXWZUYU9mN1YzM0xOcV9KNVc2ZDNCaTZgS3BvTUtrR0g3TDVDZHI1Rmo0MXZWNFNdR0FNVHMyNTV8YUpxYVV%2FVCcpJ3ZwZ3Zmd2x1cWxqa1BrbHRwYGtgdnZAa2RnaWBhJz9jZGl2YHgl'
			},
			featured: false
		}
	]
};
