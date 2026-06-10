import type { CTA, SeoContent } from '$lib/marketing-content';

const bookingHref = 'https://cal.com/danny-cursus/15min';

export const partnersContent = {
	seo: {
		title: 'Quaestor - Partners',
		description:
			'Quaestor gives ops partners a living atlas their clients keep using after handoff.',
		ogTitle: 'Hand your clients something alive.',
		ogDescription: 'Map the work. Hand over something alive. Stop the drift back to static docs.',
		imageAlt: 'Quaestor operational atlas interface preview for partners.'
	} satisfies SeoContent,

	kicker: 'Partners',
	headline: 'Great engagement. Dead deliverable.',
	subhead:
		'You mapped the work. Then the engagement ended. The docs died. Quaestor keeps the work alive.',
	body: [
		'If you build operating systems for clients, as a consultant, fractional, or agency, Quaestor gives the handoff somewhere to live: owners, steps, systems, and drift flags instead of a binder.',
		'There is no formal partner program right now. We work with a small number of partners directly. If that sounds like you, book a call or send a note and tell us about the client.'
	],

	primaryCta: { label: 'Book a partner call', href: bookingHref } satisfies CTA,
	secondaryCta: { label: 'Send a note', href: '/contact?type=partner' } satisfies CTA
} as const;
