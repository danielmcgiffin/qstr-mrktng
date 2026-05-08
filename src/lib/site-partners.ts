import { pricingContent } from './pricing-content';
import type {
	CTA,
	DetailItem,
	FaqItem,
	FeatureItem,
	NavItem,
	SeoContent,
	StepItem
} from './marketing-content';

const demoHref = 'https://qstr.cursus.tools/demo/process';
const bookingHref = 'https://cal.com/danny-cursus/15min';

export const site = {
	brand: 'Quaestor',

	seo: {
		title: 'Quaestor - Partner-first operational atlas',
		description:
			'Quaestor gives ops partners a living atlas their clients keep using after handoff.',
		ogTitle: 'Turn client handoffs into a living operational atlas.',
		ogDescription: 'Map the work. Hand over something alive. Stop the drift back to static docs.',
		imageAlt: 'Quaestor operational atlas interface preview for partners.'
	} satisfies SeoContent,

	nav: [
		{ label: 'Home', href: '/' },
		{ label: 'Partners', href: '/partners' },
		{ label: 'Method', href: '/method' },
		{ label: 'Demo', href: demoHref },
		{ label: 'Blog', href: 'https://blog.cursus.tools' },
		{ label: 'Contact', href: '/contact' }
	] satisfies NavItem[],

	navCta: {
		label: 'Book a partner call',
		href: bookingHref
	} satisfies CTA,

	partnerCall: {
		label: 'Book a partner call',
		href: bookingHref
	} satisfies CTA,

	// Future Tally form scaffold:
	// - replace `href` with the real Tally URL
	// - flip `live` to `true`
	// - header + page CTAs will update automatically
	partnerApply: {
		label: 'Apply to partner program',
		href: bookingHref,
		live: false
	} satisfies CTA & { live: boolean },

	// ───────────────────────────────────────────
	// HERO
	// ───────────────────────────────────────────
	hero: {
		kicker: 'Partner program',
		headline: 'You built the',
		rotatingWords: [
			'handoff map',
			'onboarding doc',
			'process library',
			'SOP folder',
			'Notion workspace',
			'Loom library',
			'40-slide deck'
		],
		subhead:
			'You mapped the work. Then the engagement ended. The docs died. Quaestor keeps the work alive.',
		primaryCta: {
			label: 'Book a partner call',
			href: bookingHref
		},
		secondaryCta: { label: 'See the demo', href: demoHref }
	} satisfies {
		kicker: string;
		headline: string;
		rotatingWords: string[];
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
		eyebrow: 'The delivery gap',
		headline: 'Great engagement. Dead deliverable.',
		intro: 'Strong delivery. Clean handoff. Six months later, the founder is the help desk again.',
		bullets: [
			'You map the work and train the team.',
			'Then updates stop.',
			'Ownership blurs.',
			'The old fires come back.'
		],
		punchline: 'Your method is not the problem. Static docs are.'
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
		eyebrow: 'Why it dies after handoff',
		headline: 'Static docs can’t carry live operations.',
		subhead:
			'Document libraries are snapshots. Operations need live links between people, steps, systems, and standards.',
		points: [
			{
				title: 'Ownership blurs in prose',
				desc: 'Accountability buried in paragraphs does not survive handoff.'
			},
			{
				title: 'Change never propagates',
				desc: 'One role changes. One system changes. The static deliverable starts lying.'
			},
			{
				title: 'Retrieval stays broken',
				desc: 'If the team has to hunt, the founder becomes the help desk.'
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
		headline: 'Keep the work alive.',
		subhead:
			'Start with the client bottleneck. Map roles, steps, systems, decisions, and standards. Hand over a map, not a folder.',
		steps: [
			{
				n: '01',
				title: 'Scope one bottleneck',
				desc: 'Pick the workflow that keeps hitting leadership.'
			},
			{
				n: '02',
				title: 'Map the real work',
				desc: 'Capture owner, system, decision, and standard.'
			},
			{
				n: '03',
				title: 'Hand off a live atlas',
				desc: 'Give the client a map they can run.'
			},
			{
				n: '04',
				title: 'Catch drift after rolloff',
				desc: 'Flags surface stale work before the handoff rots.'
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
		eyebrow: 'What your client gets',
		headline: 'A map beats a folder after the engagement ends.',
		subhead: 'Ownership, retrieval, and maintenance stay in the work.',
		items: [
			{
				title: 'Clear ownership',
				desc: 'Every step has a role. Accountability survives.',
				icon: 'users'
			},
			{
				title: 'Cleaner handoffs',
				desc: 'Steps and systems stay connected. People move without guessing.',
				icon: 'refresh-cw'
			},
			{
				title: 'Ongoing maintenance',
				desc: 'Flags catch drift before the deliverable dies.',
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
		headline: 'You can hand this to the client.',
		subhead: 'Open the atlas. See ownership, process, systems, and drift.',
		items: [
			{
				title: 'Role manual',
				desc: 'Open a role. See what it owns and where work lives.',
				gifSrc: '/role-details.webm'
			},
			{
				title: 'Process steps',
				desc: 'See steps, systems, decisions, and standards.',
				gifSrc: '/process-steps.webm'
			},
			{
				title: 'Flags',
				desc: 'When work drifts, the client sees it.',
				gifSrc: '/flags.webm'
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
	// FAQ
	// ───────────────────────────────────────────
	faq: {
		eyebrow: 'Common questions',
		headline: '',
		subhead: 'Direct answers.',
		items: [
			{
				q: 'How is this different from Notion / Confluence / a wiki?',
				a: 'Wikis store pages. Quaestor stores relationships: owner, action, process, system. That is why the handoff lives.'
			},
			{
				q: 'How quickly can I use this in a client engagement?',
				a: 'Map one bottleneck in the first session. Show value fast. Expand from the live map.'
			},
			{
				q: 'What if the client already has SOPs and docs?',
				a: 'Use them as source material. Link the useful parts to owners, actions, and systems.'
			},
			{
				q: 'What happens after I roll off?',
				a: 'The client keeps a live atlas with owners and drift signals. Your work keeps working.'
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
		headline: 'Start with the processes you keep rebuilding.',
		text: 'Bring the bottleneck that keeps hitting the founder. Turn it into a live atlas. Make the handoff hold.',
		primaryCta: {
			label: 'Book a partner call',
			href: bookingHref
		},
		secondaryCta: {
			label: 'Apply to partner program',
			href: bookingHref
		}
	} satisfies {
		headline: string;
		text: string;
		primaryCta: CTA;
		secondaryCta: CTA;
	},

	footer: {
		tagline: 'Handle Your Business.',
		copyrightName: 'Quaestor'
	} as const
} as const;
