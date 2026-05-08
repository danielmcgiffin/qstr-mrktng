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
		title: "Quaestor - It doesn't have to be this hard.",
		description:
			'Quaestor maps the business into a living atlas, so every answer stops routing through you.',
		ogTitle: 'Quaestor - How your business actually works.',
		ogDescription: 'Map roles, processes, and systems. Stop being the answer key.',
		imageAlt: 'Quaestor operational atlas interface preview.'
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
		label: 'Start free',
		href: `${signupBaseHref}&utm_content=nav`
	} satisfies CTA,

	// ───────────────────────────────────────────
	// HERO
	// ───────────────────────────────────────────
	hero: {
		headline: "If the business only works when you're there, it's not a business.",
		subhead:
			'You are the bottleneck. Get the work out of your head. Put it where the team can run it.',
		primaryCta: {
			label: 'Start free',
			href: `${signupBaseHref}&utm_content=hero`
		},
		secondaryCta: { label: 'See the map', href: demoHref }
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
		headline: "The Founder's Bottleneck",
		intro:
			'The official process says one thing. The real work says another. That gap burns time, money, and sanity.',
		bullets: [
			'Your team waits for your answer.',
			'You leave. Work stalls.',
			'They leave. The work lands back on you.',
			'Memory works until it fails.'
		],
		punchline: 'If it needs you to run, it owns you.'
	} satisfies {
		headline: string;
		intro: string;
		bullets: string[];
		punchline: string;
	},

	// ───────────────────────────────────────────
	// WHY THIS HAPPENS
	// ───────────────────────────────────────────
	shadowOps: {
		headline: 'Memory is not an operating system.',
		subhead:
			'Docs stale. People improvise. Owners blur. Then every hard question routes back to whoever remembers.',
		points: [
			{
				title: 'The answer lives in a person',
				desc: 'If one person has to decode the work, the process is not in the business yet.'
			},
			{
				title: 'The handoff breaks',
				desc: 'Fuzzy handoffs make people stop, wait, and improvise. The owner gets dragged back in.'
			},
			{
				title: 'The doc rots quietly',
				desc: 'If nothing catches drift, useful docs become dead weight.'
			}
		]
	} satisfies {
		headline: string;
		subhead: string;
		points: DetailItem[];
	},

	// ───────────────────────────────────────────
	// HOW IT WORKS
	// ───────────────────────────────────────────
	howItWorks: {
		headline: 'Break the loop.',
		subhead:
			'Pick the process that drags you back. Map who owns it, where it happens, and what done means. Ship it. Tighten it. Keep moving.',
		steps: [
			{
				n: '01',
				title: 'Start at the bottleneck',
				desc: 'Pick the workflow that keeps interrupting you.'
			},
			{
				n: '02',
				title: 'Map the real work',
				desc: 'Capture owner, system, decision, and standard.'
			},
			{
				n: '03',
				title: 'Clean up the handoffs',
				desc: 'Make the next move obvious. No guessing.'
			},
			{
				n: '04',
				title: 'Keep it alive',
				desc: 'Flags catch drift before the map goes stale.'
			}
		]
	} satisfies {
		headline: string;
		subhead: string;
		steps: StepItem[];
	},

	// ───────────────────────────────────────────
	// SUPPORTING DETAIL
	// ───────────────────────────────────────────
	features: {
		eyebrow: 'Usable work',
		headline: 'Own it. Find it. Fix it.',
		subhead: 'Roles, steps, systems, and flags. No scavenger hunt.',
		items: [
			{
				title: 'Role manual',
				desc: 'See what the role owns, touches, and uses.',
				icon: 'users'
			},
			{
				title: 'Process steps',
				desc: 'See the steps, systems, decisions, and standards.',
				icon: 'refresh-cw'
			},
			{
				title: 'Flags',
				desc: 'Catch drift before work breaks.',
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
		headline: 'Hand this to the next operator.',
		subhead:
			'Open the atlas. See the role, the process, the system, and the risk. Not a folder. A command map.',
		items: [
			{
				title: 'Role manual',
				desc: 'Open a role. See ownership, processes, and systems.',
				gifSrc: '/role-details.webm'
			},
			{
				title: 'Process steps',
				desc: 'See the work, step by step.',
				gifSrc: '/process-steps.webm'
			},
			{
				title: 'Flags',
				desc: 'When work drifts, Quaestor marks it.',
				gifSrc: '/flags.webm'
			}
		]
	} satisfies {
		headline: string;
		subhead: string;
		items: DetailItem[];
	},

	trust: {
		headline: 'Freedom is the proof.',
		subhead: 'Fewer repeat questions. Cleaner handoffs. Work that moves when you are gone.',
		items: [
			{
				title: 'The vacation test',
				desc: 'Can the team run a normal week without you?'
			},
			{
				title: 'The handoff test',
				desc: 'Can someone see what they own and move?'
			},
			{
				title: 'The new-hire test',
				desc: 'Can a new hire get useful before asking around?'
			}
		]
	} satisfies {
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
		eyebrow: 'Common questions',
		headline: 'FAQ',
		subhead: 'Direct answers.',
		items: [
			{
				q: 'Is this just another documentation tool?',
				a: 'No. Wikis store pages. Quaestor maps roles, processes, systems, and ownership. The worker gets the answer, not another folder.'
			},
			{
				q: 'How do I get up and running fast?',
				a: 'Start with the process chained to your phone. Map it. Publish it. Let the team use it.'
			},
			{
				q: 'What if we already have SOPs and docs?',
				a: 'Good. Use them as raw material. Structure the work. Kill the gaps. Keep what earns its place.'
			},
			{
				q: 'Why won’t this die like my last solution?',
				a: 'Because drift gets flagged in the work. No annual cleanup ritual. No guilt project. Keep it alive or cut it.'
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
		headline: 'Start with the chain.',
		text: 'Pick the process that keeps pulling you back. Map it. Hand it off. Take back ground.',
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
