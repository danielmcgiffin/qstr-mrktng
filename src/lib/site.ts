import { pricingContent } from './pricing-content';

export type NavItem = { label: string; href: string };
export type CTA = { label: string; href: string };

export type FeatureItem = { title: string; desc: string; icon: string };
export type StepItem = { n: string; title: string; desc: string };
export type FaqItem = { q: string; a: string };
export type DetailItem = { title: string; desc: string };

export const site = {
	brand: 'Quaestor',

	nav: [
		{ label: 'Home', href: '/' },
		{ label: 'Partners', href: '/partners' },
		{ label: 'Method', href: '/method' },
		{ label: 'Demo', href: 'https://qstr.cursus.tools/demo/process' },
		{ label: 'Blog', href: 'https://blog.cursus.tools' },
		{ label: 'Contact', href: '/contact' }
	] satisfies NavItem[],

	navCta: {
		label: 'Book partner call',
		href: 'https://cal.com/danny-cursus/15min'
	} satisfies CTA,

	// ───────────────────────────────────────────
	// HERO
	// ───────────────────────────────────────────
	hero: {
		kicker: 'The operational atlas',
		headline: 'You built the',
		subhead:
			'You mapped their processes, wrote the SOPs, and trained the team. Six months later, it drifts. Quaestor keeps your work alive after you roll off.',
		primaryCta: {
			label: 'Book a call',
			href: 'https://cal.com/danny-cursus/15min'
		},
		secondaryCta: { label: 'View partner program', href: '/partners' }
	} satisfies {
		kicker: string;
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
		alt: 'Quaestor showing connected roles, processes, and systems in one operational map.'
	},

	// ───────────────────────────────────────────
	// "FOR YOU" — partner-first emotional hook
	// ───────────────────────────────────────────
	forYou: {
		eyebrow: 'You know this pattern',
		headline: 'Great engagement. Dead deliverable.',
		bullets: [
			'You run a strong engagement: process map, SOPs, handoff guidance, team training.',
			'Once you leave, updates stall and ownership gets fuzzy.',
			'The founder becomes the help desk again because nobody trusts where answers live.',
			'By next quarter, your playbook is stale and the same operational fires are back.'
		],
		punchline: "It isn't your method failing. It's the underlying tool model."
	} satisfies {
		eyebrow: string;
		headline: string;
		bullets: string[];
		punchline: string;
	},

	// ───────────────────────────────────────────
	// SHADOW OPS
	// ───────────────────────────────────────────
	shadowOps: {
		eyebrow: 'Why this keeps happening',
		headline: "Static docs can't carry live operations",
		subhead:
			'Document libraries are snapshots. Engagement outcomes need living relationships between people, steps, and systems.',
		points: [
			{
				title: 'No connected ownership',
				desc: 'If ownership is trapped in prose, accountability blurs. Quaestor makes ownership explicit at each action.'
			},
			{
				title: 'No change propagation',
				desc: "When one role or system changes, static SOPs don't update themselves. The graph does."
			},
			{
				title: 'No retrieval path',
				desc: 'Teams need answers in context, not folders. Links make the path to truth obvious in a few clicks.'
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
		eyebrow: 'Partner-first workflow',
		headline: 'Deploy once. Reuse everywhere.',
		subhead:
			'Use one role-process-system model across clients so your delivery gets faster and your outcomes last longer.',
		steps: [
			{
				n: '01',
				title: 'Scope one bottleneck',
				desc: 'Start each client with the workflow causing the most interruptions and handoff friction.'
			},
			{
				n: '02',
				title: 'Map role → process → system links',
				desc: 'Capture ownership and execution context directly in the graph during implementation sessions.'
			},
			{
				n: '03',
				title: 'Publish operational atlas',
				desc: 'Clients get one place to retrieve answers without routing everything back through leadership.'
			},
			{
				n: '04',
				title: 'Keep it alive after handoff',
				desc: 'Staleness alerts and explicit owners keep your work current after you roll off.'
			}
		]
	} satisfies {
		eyebrow: string;
		headline: string;
		subhead: string;
		steps: StepItem[];
	},

	// ───────────────────────────────────────────
	// SIDE-BY-SIDE CARDS
	// ───────────────────────────────────────────
	howItWorksSide: {
		cards: [
			{
				title: 'What your clients gain',
				items: [
					{ k: 'Clarity', v: 'who owns each action' },
					{ k: 'Retrieval', v: 'answers in 3 clicks' },
					{ k: 'Resilience', v: 'less founder dependency' },
					{ k: 'Continuity', v: 'your work stays live' }
				]
			},
			{
				title: 'What you stop rebuilding',
				items: [
					{ k: 'Bespoke docs', v: 'new stack every client' },
					{ k: 'Wiki sprawl', v: 'dead pages and drift' },
					{ k: 'Handoff debt', v: 'unclear ownership edges' },
					{ k: 'Follow-up cleanup', v: 'post-engagement rework' }
				]
			}
		]
	},

	// ───────────────────────────────────────────
	// IMPLEMENTATION CALLOUT
	// ───────────────────────────────────────────
	implementationCallout: {
		headline: 'Need support on your first rollout?',
		text: 'We can co-pilot your first client deployment, then hand off a repeatable motion your team can run independently.',
		cta: { label: 'Book a partner call', href: 'https://cal.com/danny-cursus/15min' }
	},

	// ───────────────────────────────────────────
	// FEATURES
	// ───────────────────────────────────────────
	features: {
		eyebrow: 'Why partners choose Quaestor',
		headline: 'Your outcomes persist after the engagement',
		subhead:
			'Quaestor turns your delivery into client infrastructure, not a one-time documentation artifact.',
		items: [
			{
				title: 'Reusable delivery model',
				desc: 'One ontology across industries means less reinvention and faster client onboarding.',
				icon: 'rocket'
			},
			{
				title: 'Explicit handoffs',
				desc: 'Ownership and transitions are visible at action level, reducing dropped work between teams.',
				icon: 'refresh-cw'
			},
			{
				title: 'Post-engagement durability',
				desc: 'Clients keep working from the map after you roll off, preserving your implementation value.',
				icon: 'palmtree'
			},
			{
				title: 'Automated staleness signals',
				desc: 'Outdated steps surface automatically so drift is caught before it becomes fire-fighting.',
				icon: 'bell-ring'
			},
			{
				title: 'Dynamic client outputs',
				desc: 'Generate role guides and process views from the graph instead of rewriting deliverables by hand.',
				icon: 'users'
			},
			{
				title: 'Portfolio leverage',
				desc: 'Manage multiple client environments with a common operating model and consistent implementation quality.',
				icon: 'trending-up'
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
		headline: 'What partners can show in week one',
		subhead:
			'You can demonstrate concrete operational progress quickly, without waiting for a massive documentation project.',
		items: [
			{
				title: 'Ownership gaps surface immediately',
				desc: 'Missing owners and broken handoffs become visible as soon as roles, actions, and systems are linked.'
			},
			{
				title: 'Role-level retrieval works on day one',
				desc: 'Client operators can answer execution questions from role portals instead of Slack archaeology.'
			},
			{
				title: 'Deliverables stay maintainable',
				desc: 'Generated outputs reflect current graph state, so your implementation doesn’t decay into static artifacts.'
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
	// FAQ — partner-first with direct-team fallback
	// ───────────────────────────────────────────
	faq: {
		eyebrow: 'FAQ',
		headline: 'Partner-first answers',
		subhead: 'Clear fit, clear motion, clear outcomes.',
		items: [
			{
				q: 'How is this different from Notion / Confluence / a wiki?',
				a: 'Wikis store documents. Quaestor stores relationships: who owns each action, in which process, in which system. That structure is why partner deliverables stay useful after rollout instead of drifting into dead pages.'
			},
			{
				q: 'How quickly can I deploy this in a client engagement?',
				a: 'Most partners can map one meaningful bottleneck workflow in the first implementation session and show value immediately. You expand from a working map instead of waiting for a complete documentation project.'
			},
			{
				q: 'What if the client already has SOPs and docs?',
				a: 'Great — use them as source material. Quaestor links existing documentation to owned actions and systems so retrieval is contextual and maintenance is explicit.'
			},
			{
				q: 'What happens after I roll off with my client?',
				a: 'The client keeps a living atlas with named owners and staleness signals. Your implementation doesn’t die in a static handoff folder.'
			},
			{
				q: 'Who is the best fit for the partnership program?',
				a: 'Fractional COOs, ops consultants, integrators, and implementation teams that repeatedly map and stabilize operational workflows for SMB clients.'
			},
			{
				q: 'Can direct operator teams use Quaestor without a partner?',
				a: 'Yes. Partner-first is our go-to-market motion, but direct teams can still deploy Quaestor and map their first bottleneck workflow with optional implementation support.'
			}
		]
	} satisfies {
		eyebrow: string;
		headline: string;
		subhead: string;
		items: FaqItem[];
	},

	// ───────────────────────────────────────────
	// FOOTER
	// ───────────────────────────────────────────
	footer: {
		tagline: 'The operational atlas',
		copyrightName: 'Quaestor'
	} as const
} as const;
