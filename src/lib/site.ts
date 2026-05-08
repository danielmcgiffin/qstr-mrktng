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
			'Quaestor is an operational atlas that makes small businesses work, so the business stops routing every question back through you.',
		ogTitle: 'Quaestor - How your business actually works.',
		ogDescription:
			'Map roles, processes, and systems into an operational atlas your team can actually use.',
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
		label: 'Start your atlas for free',
		href: `${signupBaseHref}&utm_content=nav`
	} satisfies CTA,

	// ───────────────────────────────────────────
	// HERO
	// ───────────────────────────────────────────
	hero: {
		headline: "If the business only works when you're there, it's not a business.",
		subhead:
			"You have a job... and you're stuck at it. Quaestor is the operating system that gets the business out of your head and into something your team can actually run with.",
		primaryCta: {
			label: 'Start your atlas for free',
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
		headline: "The Founder's Bottleneck",
		intro:
			'There’s the way you say your business works, and then there’s what actually happens when everything’s exploding. That gap is costing you time, money, and sanity.',
		bullets: [
			'Your people wait on you for every answer.',
			'If you leave, things stop.',
			'If your people leave, the work falls back on you.',
			'The business runs on memory right up until memory fails.'
		],
		punchline: 'If it only works when you’re around, you don’t have a business.'
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
		headline: string;
		subhead: string;
		points: DetailItem[];
	},

	// ───────────────────────────────────────────
	// HOW IT WORKS
	// ───────────────────────────────────────────
	howItWorks: {
		headline: 'This is how it stops falling apart.',
		subhead:
			'Start with the process that keeps pulling you back in. That’s the tell the work isn’t working yet. Write out what right looks like step by step: who does what, which system they use, and how decisions get made. When the handoffs get cleaner and your Slack gets quieter, you know it’s working.',
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
		headline: 'You could just hand this to someone.',
		subhead:
			'Open the atlas and click through the work. You can see what a role owns, how a process actually runs, and what needs attention before it breaks. This isn’t another folder full of pages. It’s something another person can actually use.',
		items: [
			{
				title: 'Role manual',
				desc: 'Open a role and see what that person owns, what processes they touch, and where the work lives.',
				gifSrc: '/role-details.webm'
			},
			{
				title: 'Process steps',
				desc: 'See the steps, the systems, the decisions, and what right looks like.',
				gifSrc: '/process-steps.webm'
			},
			{
				title: 'Flags',
				desc: 'When something drifts, Quaestor surfaces it before the work quietly falls apart again.',
				gifSrc: '/flags.webm'
			}
		]
	} satisfies {
		headline: string;
		subhead: string;
		items: DetailItem[];
	},

	trust: {
		headline: 'A calmer business is the proof.',
		subhead:
			'The first win is not a prettier wiki. It is fewer repeat questions, cleaner handoffs, and work that keeps moving when the usual answer-person is not there.',
		items: [
			{
				title: 'The vacation test',
				desc: 'Can the team run a normal week without routing every edge case through the founder?'
			},
			{
				title: 'The handoff test',
				desc: 'Can a person see what they own, where the work happens, and what right looks like?'
			},
			{
				title: 'The new-hire test',
				desc: 'Can someone useful get oriented from the map before they start asking around?'
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
		headline: '',
		subhead: 'Short answers to the last few reasons people hesitate.',
		items: [
			{
				q: 'Is this just another documentation tool?',
				a: 'No. Legacy documentation tools are built around the writer and the organizer. Quaestor is built around the person doing the work. It treats roles, processes, and systems as first-class, instead of burying the business inside pages and pages of text.'
			},
			{
				q: 'How do I get up and running fast?',
				a: 'Start with the process that keeps you chained to your phone. Once you’ve gotten what’s in your head into the system, you have something people can use.'
			},
			{
				q: 'What if we already have SOPs and docs?',
				a: 'Use them as source material. Bring them in, clean them up, structure them, and fill the gaps so your existing docs become operations multipliers instead of wasted storage space.'
			},
			{
				q: 'Why won’t this die like my last solution?',
				a: 'Flags! Your doers can catch when the docs drift. People can mark what’s unclear, thin, or outdated. The point is to keep it alive in the flow of work, not wait for an annual cleanup project.'
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
			label: 'Start your atlas for free',
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
