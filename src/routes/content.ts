import { pricingContent } from './pricing-content';
import type {
	CTA,
	DetailItem,
	FaqItem,
	FeatureItem,
	NavItem,
	SeoContent,
	StepItem
} from '$lib/marketing-content';

const demoHref = 'https://qstr.cursus.tools/demo/process';
const signupBaseHref =
	'https://qstr.cursus.tools/login?utm_source=qstr.tools&utm_medium=website&utm_campaign=v1_launch';

export const site = {
	brand: 'Quaestor',

	seo: {
		title: 'Quaestor - Don’t let your business run you.',
		description:
			'Quaestor maps who owns what, where it happens, and how the work moves, so every answer stops routing through you.',
		ogTitle: 'Don’t let your business run you. Own it.',
		ogDescription: 'Map roles, processes, and systems. Stop being the answer key.',
		imageAlt: 'Quaestor: how your business actually works.'
	} satisfies SeoContent,

	nav: [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' },
		{ label: 'How', href: '/method' },
		{ label: 'Docs', href: '/docs' },
		{ label: 'Demo', href: demoHref },
		{ label: 'Blog', href: 'https://blog.cursus.tools' },
		{ label: 'Contact', href: '/contact' }
	] satisfies NavItem[],

	navCta: {
		label: 'Build your workspace',
		href: `${signupBaseHref}&utm_content=nav`
	} satisfies CTA,

	// ───────────────────────────────────────────
	// HERO
	// ───────────────────────────────────────────
	hero: {
		headline: 'You built it from nothing.',
		subhead:
			'Twenty people. Forty. Five, six, eight million in revenue. Real payroll, real clients, and every hard question still routes through you. Quaestor maps who owns what, where it happens, and how the work moves, so your team finds answers without you.',
		primaryCta: {
			label: 'Build your workspace',
			href: `${signupBaseHref}&utm_content=hero`
		},
		secondaryCta: { label: 'See how Quaestor works', href: demoHref },
		imageSrc: '/Hero.webp',
		imageAlt: 'Quaestor operational atlas: an annotated role map of processes, steps, and systems.',
		imageCaption:
			'One role, mapped: the processes it owns, the steps it runs, the systems it touches. Click to enlarge.'
	} satisfies {
		headline: string;
		subhead: string;
		primaryCta: CTA;
		secondaryCta: CTA;
		imageSrc?: string;
		imageAlt?: string;
		imageCaption?: string;
	},

	// ───────────────────────────────────────────
	// DEMO
	// ───────────────────────────────────────────
	demo: {
		videoSrc: '/qstr-demo.webm',
		gifSrc: '/demo-screenshot.png',
		posterSrc: '/demo-screenshot.png',
		alt: 'Quaestor showing a connected operational atlas with roles, processes, and systems.',
		label: 'Quaestor product demo video'
	},

	// ───────────────────────────────────────────
	// PAIN
	// ───────────────────────────────────────────
	forYou: {
		headline: 'This was supposed to be the part where you stepped back.',
		intro: 'First, there was no money. You fixed that. \nNow there is no time.',
		bullets: [
			'Every escalation. Every exception. Every “hey, quick question.”',
			'A calendar full of work you thought you’d have delegated by now.',
			'Phone buzzing at dinner. Laptop open on vacation.',
			'You’re not just running the company. You are being the company.'
		],
		punchline:
			'Now you’re Atlas, holding it up forever.\nThat’s not ownership. That’s a hostage situation.'
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
			'Docs go stale. People improvise. Responsibility blurs. \n Then every hard question routes back to whoever remembers.',
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
			'Pick the process that drags you back. Map who owns it, where it happens, and what done means. \n Ship it. Tighten it. Keep moving.',
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
				desc: 'Create flags to catch drift before it goes stale.'
			}
		]
	} satisfies {
		headline: string;
		subhead: string;
		steps: StepItem[];
	},

	// ───────────────────────────────────────────
	// THREE CONVICTIONS
	// ───────────────────────────────────────────
	setsApart: {
		headline: 'Built on three convictions.',
		subhead:
			'Repositories store files. Recorders capture tasks. Project tools track work.\n Quaestor maps the operating model underneath it all.',
		items: [
			{
				title: 'Relationships, not documents',
				desc: 'Your business is not made of pages. It is made of flows, handoffs, roles, systems, decisions, and conditions. Map the relationships and the documents become outputs, not the foundation.'
			},
			{
				title: 'Structure at the point of work',
				desc: 'Your people do not need more text blobs or another wiki. They need structure they can use where the work happens. Operations structured clearly enough for people are structured enough for AI, too.'
			},
			{
				title: 'Owners, not cap tables',
				desc: 'Most software makes more money every time you hire. We do not. One flat price per workspace, not per seat. Your headcount is not our revenue model.'
			}
		]
	} satisfies {
		headline: string;
		subhead: string;
		items: DetailItem[];
	},

	// ───────────────────────────────────────────
	// SOCIAL PROOF
	// ───────────────────────────────────────────
	socialProof: {
		headline: 'User Reactions',
		items: [
			{
				pullQuote: "It's process documentation people will USE.",
				quote:
					"Super intuitive. Quaestor breaks down process entry into the questions that actually make written workflows usable. Then it lets you sort and re-sort those processes according to what you need, so they're genuinely transferable - not just useful to the person who wrote them.",
				attribution: 'Mary, Podcast Producer'
			},
			{
				pullQuote: 'I needed one place to see the work.',
				quote:
					'I run our business out of Quaestor because I needed one place to see the work in one place where I could look at it before we made new hires or major system changes.',
				attribution: 'J., Technology Founder'
			}
		]
	} satisfies {
		headline: string;
		items: {
			pullQuote: string;
			quote: string;
			attribution: string;
		}[];
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
			'Open the atlas. See the role, the process, the system, and the risk. \n Not a folder. An atlas.',
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
				title: 'The new-hire test',
				desc: 'Can your new hire see everything they do and touch in one place?'
			},
			{
				title: 'The exit test',
				desc: 'Could someone run this without ever even meeting you?'
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
				a: 'No. Wikis store pages. Quaestor maps roles, processes, systems, and ownership. The worker gets the answer, not a treasure hunt.'
			},
			{
				q: 'How do I get up and running fast?',
				a: 'Start with the process keeping you chained to your phone. Map it. Publish it. Let the team run with it.'
			},
			{
				q: 'What if we already have SOPs and docs?',
				a: 'Good. Use them as raw material. Structure the work. Kill the gaps. Keep what earns its place.'
			},
			{
				q: 'Why won’t this die like my last solution?',
				a: 'Because drift gets flagged in the work, and everyone can help keep it updated. No annual cleanup ritual. No guilt project.'
			}
		]
	} satisfies {
		eyebrow: string;
		headline: string;
		subhead: string;
		items: FaqItem[];
	},

	// ───────────────────────────────────────────
	// NEWSLETTER
	// ───────────────────────────────────────────
	newsletter: {
		headline: 'Stay in the loop',
		text: 'Field notes on running a tighter operation, straight to your inbox.',
		formId: '5c2c6c68-41c3-484d-b54d-7d5c08a90f87'
	} satisfies {
		headline: string;
		text: string;
		formId: string;
	},

	// ───────────────────────────────────────────
	// FINAL CTA
	// ───────────────────────────────────────────
	finalCta: {
		headline: 'Retake Command',
		text: 'Map it. Shape it. Hand it off. Own it.',
		cta: {
			label: 'Map your business',
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
		tagline: 'Own it.',
		copyrightName: 'Quaestor',
		entityName: 'Cursus Tools, LLC',
		supportEmail: 'support@cursus.tools',
		linkedinHref: 'https://www.linkedin.com/company/qstr-tools',
		legalLinks: [
			{ label: 'Privacy', href: '/legal#privacy' },
			{ label: 'Terms', href: '/legal#terms' },
			{ label: 'DPA', href: '/legal#dpa' }
		],
		productLinks: [
			{ label: 'The Problem', href: '/#problem' },
			{ label: 'Convictions', href: '/#convictions' },
			{ label: 'Pricing', href: '/#pricing' },
			{ label: 'How', href: '/method' },
			{ label: 'AI Score', href: '/ai-score' },
			{ label: 'Manifesto', href: '/manifesto' },
			{ label: 'Partners', href: '/partners' },
			{ label: 'About', href: '/about' }
		]
	} as const
} as const;
