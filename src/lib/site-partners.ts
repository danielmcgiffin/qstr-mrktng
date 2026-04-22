import { pricingContent } from './pricing-content';

export type NavItem = { label: string; href: string };
export type CTA = { label: string; href: string };

export type FeatureItem = { title: string; desc: string; icon: string };
export type StepItem = { n: string; title: string; desc: string };
export type FaqItem = { q: string; a: string };
export type DetailItem = { title: string; desc: string; gifSrc?: string };

const demoHref = 'https://qstr.cursus.tools/demo/process';
const bookingHref = 'https://cal.com/danny-cursus/15min';

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
			'You mapped the work, wrote the SOPs, and trained the team. Then the engagement ended. Quaestor turns that work into a living operational atlas your client can keep using.',
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
		eyebrow: 'You know this pattern',
		headline: 'Great engagement. Dead deliverable.',
		intro:
			'Strong delivery. Clean handoff. Six months later the founder is the help desk again and your work is sitting in a folder nobody trusts.',
		bullets: [
			'You map the work, train the team, and leave a clean handoff.',
			'Updates stall as soon as the engagement ends.',
			'Ownership gets fuzzy and questions route back through leadership again.',
			'By next quarter the playbook is stale and the same fires are back.'
		],
		punchline: 'The problem isn’t your method. It’s the tool model underneath it.'
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
			'Document libraries are snapshots. Client operations need living relationships between people, steps, systems, and standards so the work stays usable after you roll off.',
		points: [
			{
				title: 'Ownership blurs in prose',
				desc: 'If accountability is trapped inside paragraphs, handoffs get fuzzy fast.'
			},
			{
				title: 'Change never propagates',
				desc: 'One role or system changes and the static deliverable starts drifting immediately.'
			},
			{
				title: 'Retrieval is still a scavenger hunt',
				desc: 'If the team has to interpret folders and pages, the founder becomes the help desk again.'
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
		headline: 'This is how your work stays alive.',
		subhead:
			'Start with the client bottleneck that keeps dragging leadership back in. Map the roles, process steps, systems, decisions, and standards. Hand over a map the client can work from instead of a folder they have to interpret.',
		steps: [
			{
				n: '01',
				title: 'Scope one bottleneck',
				desc: 'Start with the workflow that keeps routing back through the founder or operator.'
			},
			{
				n: '02',
				title: 'Map the real work',
				desc: 'Capture who does what, in which system, how decisions get made, and what right looks like.'
			},
			{
				n: '03',
				title: 'Hand off a live atlas',
				desc: 'Give the client something they can navigate and use instead of a static deliverable.'
			},
			{
				n: '04',
				title: 'Catch drift after rolloff',
				desc: 'Flags surface stale work so your delivery does not quietly rot after the engagement ends.'
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
		subhead:
			'Ownership, retrieval, and maintenance stay inside the work instead of depending on the founder remembering what you meant.',
		items: [
			{
				title: 'Clear ownership',
				desc: 'Every step has a role attached to it, so accountability survives the handoff.',
				icon: 'users'
			},
			{
				title: 'Cleaner handoffs',
				desc: 'Process steps and systems stay connected, so people can move work forward without guessing.',
				icon: 'refresh-cw'
			},
			{
				title: 'Ongoing maintenance',
				desc: 'Flags catch drift before the deliverable turns into another dead artifact.',
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
		subhead:
			'Open the atlas and click through the work. The client can see who owns what, how the process actually runs, and what is drifting before it breaks.',
		items: [
			{
				title: 'Role manual',
				desc: 'A client operator can open a role and see exactly what that person owns and where the work lives.',
				gifSrc: '/role-details.gif'
			},
			{
				title: 'Process steps',
				desc: 'The client can see the steps, systems, decisions, and standards without digging through a folder.',
				gifSrc: '/process-steps.gif'
			},
			{
				title: 'Flags',
				desc: 'When the work drifts, the client sees it before your deliverable quietly dies.',
				gifSrc: '/flags.gif'
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
		eyebrow: 'What partners ask next',
		headline: 'What partners ask next:',
		subhead: 'Short answers to the questions that come up once the model clicks.',
		items: [
			{
				q: 'How is this different from Notion / Confluence / a wiki?',
				a: 'Wikis store pages. Quaestor stores relationships: who owns each action, in which process, in which system. That structure is why your deliverables stay useful after rollout instead of drifting into dead pages.'
			},
			{
				q: 'How quickly can I use this in a client engagement?',
				a: 'Most partners can map one meaningful bottleneck workflow in the first implementation session and show value immediately. You expand from a working map instead of waiting for a complete documentation project.'
			},
			{
				q: 'What if the client already has SOPs and docs?',
				a: 'Use them as source material. Quaestor links existing documentation to owned actions and systems so retrieval is contextual and maintenance is explicit.'
			},
			{
				q: 'What happens after I roll off?',
				a: 'The client keeps a living atlas with named owners and staleness signals. Your implementation does not die in a static handoff folder.'
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
		headline: 'Bring the process you keep rebuilding.',
		text: 'Bring the client bottleneck that keeps falling back to the founder. We’ll show you how to turn it into a live atlas that survives the handoff.',
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
