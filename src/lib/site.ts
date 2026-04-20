import { pricingContent } from './pricing-content';

export type NavItem = { label: string; href: string };
export type CTA = { label: string; href: string };

export type FeatureItem = { title: string; desc: string; icon: string };
export type StepItem = { n: string; title: string; desc: string };
export type FaqItem = { q: string; a: string };
export type DetailItem = { title: string; desc: string };

const demoHref = 'https://qstr.cursus.tools/demo/process';
const signupBaseHref =
	'https://qstr.cursus.tools/login?utm_source=cursus.tools&utm_medium=website&utm_campaign=v1_launch';

export const site = {
	brand: 'Quaestor',

	nav: [
		{ label: 'Home', href: '/' },
		{ label: 'Partners', href: '/partners' },
		{ label: 'Method', href: '/method' },
		{ label: 'Demo', href: demoHref },
		{ label: 'Blog', href: 'https://blog.cursus.tools' },
		{ label: 'Contact', href: '/contact' }
	] satisfies NavItem[],

	navCta: {
		label: 'Start free',
		href: `${signupBaseHref}&utm_content=nav`
	} satisfies CTA,

	// ───────────────────────────────────────────
	// HERO
	// ───────────────────────────────────────────
	hero: {
		headline: "It doesn't have to be this hard.",
		subhead:
			"For founders who can't delegate because nothing's written down. Quaestor is the atlas that maps who does what, and how, across your whole business.",
		primaryCta: {
			label: 'Start free',
			href: `${signupBaseHref}&utm_content=hero`
		},
		secondaryCta: { label: 'See a sample org', href: demoHref }
	} satisfies {
		headline: string;
		subhead: string;
		primaryCta: CTA;
		secondaryCta: CTA;
	},

	// ───────────────────────────────────────────
	// DEMO
	// ───────────────────────────────────────────
	demo: {
		gifSrc: '/demo-screenshot.png',
		posterSrc: '/demo-screenshot.png',
		alt: 'Quaestor showing a connected operational atlas with roles, processes, and systems.'
	},

	// ───────────────────────────────────────────
	// PAIN
	// ───────────────────────────────────────────
	forYou: {
		eyebrow: 'The pattern',
		headline: 'Everyone knows this story.',
		intro:
			'There’s the way you say your business works, and then there’s what actually happens when everything’s exploding. That gap is costing you time, money, and sanity.',
		bullets: [
			'Your people wait on you for every answer.',
			'If you leave, things stop.',
			'If your people leave, the work falls back on you.',
			'The business runs on memory right up until memory fails.'
		],
		punchline:
			'If it only works when you’re around, you don’t have a business. You have a job, and you’re stuck at it.'
	} satisfies {
		eyebrow: string;
		headline: string;
		intro: string;
		bullets: string[];
		punchline: string;
	},

	// ───────────────────────────────────────────
	// WHY THIS HAPPENS
	// ───────────────────────────────────────────
	shadowOps: {
		eyebrow: 'Why it keeps breaking',
		headline: 'The story and the reality keep drifting apart.',
		subhead:
			'Static docs capture what someone meant to write down. The work keeps moving. The people doing it keep improvising. Ownership, systems, and standards drift apart until the business routes back through whoever still remembers how it actually works.',
		points: [
			{
				title: 'The answer lives in a person',
				desc: 'If everyone still needs one person to decode the work, the process is not really in the business yet.'
			},
			{
				title: 'The handoff keeps collapsing',
				desc: 'When handoffs are fuzzy, people stop, wait, and improvise. The owner gets pulled back in.'
			},
			{
				title: 'The doc goes stale quietly',
				desc: 'What was useful at handoff turns into a graveyard when nothing catches drift.'
			}
		]
	} satisfies {
		eyebrow: string;
		headline: string;
		subhead: string;
		points: DetailItem[];
	},

	// ───────────────────────────────────────────
	// HOW IT WORKS
	// ───────────────────────────────────────────
	howItWorks: {
		eyebrow: 'How it works',
		headline: 'This is how it stops falling apart.',
		subhead:
			"Start with the process that keeps pulling you back in. That’s the tell the work isn't working yet. Write out what right looks like step by step: who does what, which system they use, and how decisions get made. When the handoffs get cleaner and your Slack gets quieter, you know it’s working.",
		steps: [
			{
				n: '01',
				title: 'Start where it pulls you back in',
				desc: 'Begin with the process that keeps routing back through you.'
			},
			{
				n: '02',
				title: 'Map the real work',
				desc: 'Write it out step by step: who does what, which system they use, how they decide, and what right looks like.'
			},
			{
				n: '03',
				title: 'Clean up the handoffs',
				desc: 'When people can move work forward without stopping at your desk, the structure is getting real.'
			},
			{
				n: '04',
				title: 'Keep it alive',
				desc: 'Quaestor uses flags so nothing quietly drifts out of date the way static docs do.'
			}
		]
	} satisfies {
		eyebrow: string;
		headline: string;
		subhead: string;
		steps: StepItem[];
	},

	// ───────────────────────────────────────────
	// SUPPORTING DETAIL
	// ───────────────────────────────────────────
	features: {
		eyebrow: 'What people can actually use',
		headline: 'The work is visible to the people doing it.',
		subhead: 'Roles, process steps, and flags give people something they can actually work from.',
		items: [
			{
				title: 'Role manual',
				desc: 'See what a role owns, what processes it touches, and where the work lives.',
				icon: 'users'
			},
			{
				title: 'Process steps',
				desc: 'See the steps, the systems, the decisions, and what right looks like.',
				icon: 'refresh-cw'
			},
			{
				title: 'Flags',
				desc: 'See what is drifting before the work quietly falls apart again.',
				icon: 'bell-ring'
			}
		]
	} satisfies {
		eyebrow: string;
		headline: string;
		subhead: string;
		items: FeatureItem[];
	},

	// ───────────────────────────────────────────
	// PROOF
	// ───────────────────────────────────────────
	proof: {
		eyebrow: 'Proof',
		headline: 'You could hand this to someone.',
		subhead:
			'Open the atlas and click through the work. You can see what a role owns, how a process actually runs, and what needs attention before it breaks. This isn’t another folder full of pages. It’s something another person can actually use.',
		items: [
			{
				title: 'Role manual',
				desc: 'Open a role and see what that person owns, what processes they touch, and where the work lives.'
			},
			{
				title: 'Process steps',
				desc: 'See the steps, the systems, the decisions, and what right looks like.'
			},
			{
				title: 'Flags',
				desc: 'When something drifts, Quaestor surfaces it before the work quietly falls apart again.'
			}
		]
	} satisfies {
		eyebrow: string;
		headline: string;
		subhead: string;
		items: DetailItem[];
	},

	// ───────────────────────────────────────────
	// PRICING
	// ───────────────────────────────────────────
	pricing: pricingContent,

	// ───────────────────────────────────────────
	// OBJECTIONS / FAQ
	// ───────────────────────────────────────────
	faq: {
		eyebrow: 'What people ask next',
		headline: 'What people ask next',
		subhead: 'Short answers to the last few reasons people hesitate.',
		items: [
			{
				q: 'Is this just another documentation tool?',
				a: 'No. Legacy documentation tools are built around the writer and the organizer. Quaestor is built around the person doing the work. It treats roles, processes, and systems as first-class, instead of burying the business inside page after page of text.'
			},
			{
				q: 'How long until it’s useful?',
				a: 'Start with the process that keeps you chained to your phone. As soon as what’s in your head is in the system, you have something people can use.'
			},
			{
				q: 'What if we already have SOPs and docs?',
				a: 'Use them as source material. Bring them in, clean them up, structure them, and fill the gaps so your existing docs become usable operations instead of another graveyard.'
			},
			{
				q: "Why won't this die like my last solution?",
				a: 'Flags catch drift. People can mark what’s unclear, thin, or outdated. The point is to keep it alive in the flow of work, not wait for an annual cleanup project.'
			}
		]
	} satisfies {
		eyebrow: string;
		headline: string;
		subhead: string;
		items: FaqItem[];
	},

	// ───────────────────────────────────────────
	// FINAL CTA
	// ───────────────────────────────────────────
	finalCta: {
		headline: 'Start with one process.',
		text: 'Pick the process that keeps pulling you back in. Map it, hand it off, and see what changes.',
		cta: {
			label: 'Start free',
			href: `${signupBaseHref}&utm_content=final_cta`
		}
	} satisfies {
		headline: string;
		text: string;
		cta: CTA;
	},

	// ───────────────────────────────────────────
	// FOOTER
	// ───────────────────────────────────────────
	footer: {
		tagline: 'Handle Your Business.',
		copyrightName: 'Quaestor'
	} as const
} as const;
