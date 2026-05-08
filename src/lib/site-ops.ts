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
const signupBaseHref =
	'https://qstr.cursus.tools/login?utm_source=cursus.tools&utm_medium=website&utm_campaign=v1_launch';

export const site = {
	brand: 'Quaestor',

	seo: {
		title: 'Quaestor - Your Operational Atlas',
		description: 'Quaestor maps who owns what, where it happens, and how the work moves.',
		ogTitle: 'No more dead docs, bad handoffs, or tribal ops.',
		ogDescription: 'Turn roles, process steps, and systems into a map your team can use.',
		imageAlt: 'Quaestor showing connected processes, roles, and systems.'
	} satisfies SeoContent,

	nav: [
		{ label: 'Home', href: '/' },
		{ label: 'Method', href: '/method' },
		{ label: 'Blog', href: 'https://blog.cursus.tools' },
		{ label: 'Demo', href: demoHref },
		{ label: 'Partners', href: '/partners' },
		{ label: 'Contact', href: '/contact' }
	] satisfies NavItem[],

	navCta: {
		label: 'Get my AI-readiness score',
		href: '/ai-score'
	} satisfies CTA,

	// ───────────────────────────────────────────
	// HERO
	// ───────────────────────────────────────────
	hero: {
		kicker: 'Your operational atlas',
		headline: 'No more',
		rotatingWords: [
			'dead docs',
			'"ask Sarah"',
			'dropped balls',
			'wiki sprawl',
			'tribal ops',
			'"who does this?"',
			'SOP graveyards',
			'bad handoffs'
		],
		subhead:
			'Map who owns what, where it happens, and how the work moves. Stop being the answer desk.',
		primaryCta: {
			label: 'See it in action',
			href: demoHref
		},
		secondaryCta: { label: 'Read the method', href: '/method' }
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
		alt: 'Quaestor showing connected processes, roles, and systems.'
	},

	// ───────────────────────────────────────────
	// PAIN
	// ───────────────────────────────────────────
	forYou: {
		eyebrow: 'You know the feeling',
		headline: 'This is how it breaks.',
		intro:
			'If PTO can break the business, the business is not ready. The work keeps falling back into your inbox.',
		bullets: [
			'The process lives in a head and three Slack threads.',
			'The SOP exists. Nobody trusts it.',
			'Every hard question routes to the same person.',
			'One person leaves. Years of judgment leave with them.'
		],
		punchline: 'Get the business out of your head. Put it in your team’s hands.'
	} satisfies {
		eyebrow: string;
		headline: string;
		intro: string;
		bullets: string[];
		punchline: string;
	},

	// ───────────────────────────────────────────
	// DIAGNOSIS
	// ───────────────────────────────────────────
	shadowOps: {
		eyebrow: 'Shadow ops',
		headline: 'Shadow ops is running the business.',
		subhead:
			'The real system lives in founders, veterans, and old messages. It works until someone disappears.',
		points: [
			{
				title: 'Human API',
				desc: 'If one person answers every edge case, they are the system.'
			},
			{
				title: 'Coordination tax',
				desc: 'Every undocumented handoff adds delay, rework, and noise.'
			},
			{
				title: 'Documentation graveyards',
				desc: 'Dead SOPs are not the disease. Missing ownership is.'
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
		headline: 'Map the pain. Break the loop.',
		subhead:
			'Start with the workflow that hurts. Map roles, steps, systems, decisions, and standards. Give the team orders they can execute.',
		steps: [
			{
				n: '01',
				title: 'Start with the bottleneck',
				desc: 'Pick the workflow causing the most interruptions.'
			},
			{
				n: '02',
				title: 'Connect everything',
				desc: 'Link owner, step, system, and standard.'
			},
			{
				n: '03',
				title: 'Ship it to the team',
				desc: 'Publish the map. Make the answer findable.'
			},
			{
				n: '04',
				title: 'Keep it honest',
				desc: 'Flag stale steps. Nudge owners. Stop quiet rot.'
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
		eyebrow: 'Usable work',
		headline: 'A map beats a folder. Ownership beats guessing.',
		subhead: 'Everything connects. Everything has an owner.',
		items: [
			{
				title: 'Onboarding in days, not weeks',
				desc: 'Generate role guides from the graph. New hires move faster.',
				icon: 'rocket'
			},
			{
				title: 'Clean handoffs',
				desc: 'Every handoff is explicit and owned.',
				icon: 'refresh-cw'
			},
			{
				title: 'Stale steps get flagged',
				desc: 'System changed? Affected steps surface before they hurt.',
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
		eyebrow: 'Proof in the product',
		headline: 'The difference is visible fast.',
		subhead: 'One bottleneck workflow. One live map. Immediate contrast with static docs.',
		items: [
			{
				title: 'Gaps and contradictions surface fast',
				desc: 'Link roles, actions, and systems. Broken handoffs show up.',
				gifSrc: '/flags.webm'
			},
			{
				title: 'Role portal answers real questions',
				desc: 'Open a role. See every connected process and system.',
				gifSrc: '/role-details.webm'
			},
			{
				title: 'Dynamic onboarding output',
				desc: 'Generate current guides from the graph.',
				gifSrc: '/process-steps.webm'
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
		eyebrow: 'What people ask next',
		headline: 'What people ask next:',
		subhead: 'Direct answers.',
		items: [
			{
				q: 'How is this different from Notion / Confluence / a wiki?',
				a: 'Wikis store pages. Quaestor stores relationships. Change a role, process, or system once. The map stays connected.'
			},
			{
				q: 'How long does setup take?',
				a: 'Map the first bottleneck in one sitting. Add the next workflow when it matters. Build the network one link at a time.'
			},
			{
				q: 'What if I already have SOPs and docs?',
				a: 'Good. Use them as raw material. Extract roles, steps, and systems. Link the docs where they belong.'
			},
			{
				q: 'Is this just another tool I have to maintain?',
				a: 'No. The team flags drift while doing the work. Maintenance becomes contact, not ceremony.'
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
		headline: 'Start with the process that hurts the most.',
		text: 'Map one workflow. Make the handoffs clear. Stop the questions before they reach you.',
		cta: {
			label: 'Start free',
			href: `${signupBaseHref}&utm_content=ops_final_cta`
		}
	} satisfies {
		headline: string;
		text: string;
		cta: CTA;
	},

	footer: {
		tagline: 'Handle Your Business.',
		copyrightName: 'Quaestor'
	} as const
} as const;
