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
		description:
			'Quaestor maps who does what, in which system, as a connected graph so your team finds answers instead of asking you.',
		ogTitle: 'No more dead docs, bad handoffs, or tribal ops.',
		ogDescription:
			'Turn roles, process steps, and systems into a navigable map your team can work from.',
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
			'Quaestor maps who does what, in which system, as an operational atlas... so your team finds answers instead of asking you.',
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
			'If you have to schedule business around employee PTO plans... you aren’t ready to scale. The business keeps falling back into your inbox when you most need it to run without your hand on the wheel.',
		bullets: [
			'The process lives in someone’s head and three Slack threads from 2022.',
			'The SOP exists. It’s in a folder somewhere. Nobody’s opened it since it was written.',
			'Every question routes to the same person because they’re the only one who knows how it actually works.',
			'A key person leaves and years of context and judgement walk out the door with them.'
		],
		punchline: 'You need to get the business out of your head, and into your team’s hands.'
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
		headline: 'Shadow Ops: the hidden operating system inside your business.',
		subhead:
			'Shadow ops is the load-bearing knowledge trapped in founders, long-time team members, and old communications. It works enough... right up until someone is out sick, quits, or gets overwhelmed.',
		points: [
			{
				title: 'Human API',
				desc: 'If one person has to answer every edge-case question, they are the API. That’s operational debt waiting to come due.'
			},
			{
				title: 'Coordination tax',
				desc: 'Every undocumented handoff adds delays, follow-up messages, and rework. The tax compounds every week.'
			},
			{
				title: 'Documentation graveyards',
				desc: 'Dead SOPs are a symptom. The root cause is ease of access, competent search, and the missing relationships between roles, processes, and systems.'
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
		headline: 'Map it once, and it can keep itself alive.',
		subhead:
			'Start with the workflow that hurts the most. Map the roles, steps, systems, decisions, and standards. Then give the team something they can actually use instead of another folder they have to interpret.',
		steps: [
			{
				n: '01',
				title: 'Start with the bottleneck',
				desc: 'Pick the workflow that generates the most interruptions. Map the roles, steps, and systems involved.'
			},
			{
				n: '02',
				title: 'Connect everything',
				desc: 'Link ownership to steps and steps to systems so the shape of operations becomes visible.'
			},
			{
				n: '03',
				title: 'Ship it to the team',
				desc: 'Publish the map so people can search, find, and stop asking you. Answers in three clicks.'
			},
			{
				n: '04',
				title: 'Keep it honest',
				desc: 'Stale steps get flagged. Owners get nudged. The map stays current because the system will not let it rot quietly.'
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
		headline: 'A map beats a folder. Ownership beats guessing.',
		subhead: 'Everything connects. Everything has an owner. Everything stays current.',
		items: [
			{
				title: 'Onboarding in days, not weeks',
				desc: 'Generate role-specific guides from the graph. New hires find answers without finding you.',
				icon: 'rocket'
			},
			{
				title: 'Clean handoffs',
				desc: 'Every handoff point is explicit and owned. No more mystery meat between teams.',
				icon: 'refresh-cw'
			},
			{
				title: 'Stale steps get flagged',
				desc: 'Ownership is explicit. When a linked system changes, affected steps surface before they hurt.',
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
		headline: 'What buyers see in the first 15 minutes.',
		subhead:
			'The demo is built around one bottleneck workflow so prospects can see immediate contrast with static docs.',
		items: [
			{
				title: 'Gaps and contradictions surface fast',
				desc: 'When roles, actions, and systems are linked, missing ownership and broken handoffs show up immediately.',
				gifSrc: '/flags.webm'
			},
			{
				title: 'Role portal answers real questions',
				desc: 'Click into a role and see every connected process and system in one place. No scavenger hunt.',
				gifSrc: '/role-details.webm'
			},
			{
				title: 'Dynamic onboarding output',
				desc: 'Generate a guide from atomic knowledge in the graph, on demand, instead of writing it all by hand.',
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
		subhead: 'Short answers to the last few reasons people hesitate.',
		items: [
			{
				q: 'How is this different from Notion / Confluence / a wiki?',
				a: 'Wikis store pages. Quaestor stores relationships: roles, processes, and systems linked into a single graph. Change a role’s responsibilities and every connected process updates. That’s not something a wiki can do, because a wiki doesn’t automatically know what’s connected to what.'
			},
			{
				q: 'How long does setup take?',
				a: 'Most teams map their first bottleneck workflow in a single sitting. From there, the map grows organically; each new workflow connects to what’s already there. There’s no building a documentation library from scratch; you’re building a network one link at a time.'
			},
			{
				q: 'What if I already have SOPs and docs?',
				a: 'Good! That’s raw material, not wasted effort. Import the roles, steps, and systems from what you’ve already built. The docs become references linked from the map, not duplicated inside it. The map makes it easy for the team to use the docs.'
			},
			{
				q: 'Is this just another tool I have to maintain?',
				a: 'Because of our flags system, every team member plays a role in keeping the documentation fresh on a rolling basis, so there’s no annual guilt-trip lift. The maintenance is built into how the tool already works.'
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
		text: 'Map one workflow, make the handoffs clear, and see how quickly the business stops routing everything back through you.',
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
