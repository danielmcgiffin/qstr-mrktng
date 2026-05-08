import { env } from '$env/dynamic/public';
import { methodContent } from './method-content';
import { methodPath } from './method';
import { site as universalHomeSite } from './site';
import { site as opsHomeSite } from './site-ops';
import { site as partnersHomeSite } from './site-partners';

export const SITE_ORIGIN = (env.PUBLIC_SITE_ORIGIN || 'https://qstr.tools').replace(/\/+$/, '');

export const DISCOVERY_LINKS = [
	`</.well-known/api-catalog>; rel="api-catalog"`,
	`</.well-known/mcp/server-card.json>; rel="mcp-server-card"`,
	`</.well-known/agent-skills/index.json>; rel="agent-skills"`,
	`</ai-score>; rel="service-doc"`
] as const;

export const DISCOVERY_LINK_HEADER = DISCOVERY_LINKS.join(', ');

const absoluteUrl = (href: string): string => {
	if (href.startsWith('http://') || href.startsWith('https://')) {
		return href;
	}

	return `${SITE_ORIGIN}${href.startsWith('/') ? href : `/${href}`}`;
};

export const normalizeAgentPath = (pathname: string): string => {
	const stripped = pathname.replace(/^\/proxy\/\d+(?=\/|$)/, '') || '/';
	if (stripped === '/') return stripped;
	return stripped.replace(/\/+$/, '') || '/';
};

export const estimateMarkdownTokens = (markdown: string): number =>
	Math.max(1, Math.ceil(markdown.length / 4));

const renderPlanMarkdown = (pricing: MarketingHomeContent['pricing']): string => {
	const plans = pricing.plans
		.map(
			(plan) =>
				`### ${plan.name} — ${plan.price}\n${plan.desc}\n\n${plan.perks.map((perk) => `- ${perk}`).join('\n')}\n\nCTA: [${plan.cta.label}](${absoluteUrl(plan.cta.href)})`
		)
		.join('\n\n');

	if (!pricing.freeLink) {
		return plans;
	}

	return `${plans}\n\n${pricing.freeLink.label}: [${pricing.freeLink.label}](${absoluteUrl(pricing.freeLink.href)})`;
};

const renderFaqMarkdown = (items: ReadonlyArray<{ q: string; a: string }>): string =>
	items.map((item) => `### ${item.q}\n${item.a}`).join('\n\n');

type MarketingHomeContent = {
	brand: string;
	forYou: {
		headline: string;
		bullets: readonly string[];
		punchline: string;
	};
	shadowOps: {
		headline: string;
		subhead: string;
		points: ReadonlyArray<{ title: string; desc: string }>;
	};
	howItWorks: {
		headline: string;
		subhead: string;
		steps: ReadonlyArray<{ n: string; title: string; desc: string }>;
	};
	features: {
		headline: string;
		subhead: string;
		items: ReadonlyArray<{ title: string; desc: string }>;
	};
	proof: {
		headline: string;
		subhead: string;
		items: ReadonlyArray<{ title: string; desc: string }>;
	};
	pricing: {
		headline: string;
		subhead: string;
		plans: ReadonlyArray<{
			name: string;
			price: string;
			desc: string;
			perks: ReadonlyArray<string>;
			cta: { label: string; href: string };
		}>;
		freeLink?: { label: string; href: string };
	};
	faq: {
		items: ReadonlyArray<{ q: string; a: string }>;
	};
};

const renderHomeMarkdown = (
	site: MarketingHomeContent,
	options: {
		title: string;
		description: string;
		primaryAudience: string;
		primaryCtaLabel: string;
		primaryCtaHref: string;
		secondaryCtaLabel: string;
		secondaryCtaHref: string;
	}
): string => `# ${options.title}

${options.description}

## Audience
- ${options.primaryAudience}
- Brand: ${site.brand}

## Primary actions
- [${options.primaryCtaLabel}](${absoluteUrl(options.primaryCtaHref)})
- [${options.secondaryCtaLabel}](${absoluteUrl(options.secondaryCtaHref)})
- [Contact](${absoluteUrl('/contact')})

## Core problem
### ${site.forYou.headline}
${site.forYou.bullets.map((bullet) => `- ${bullet}`).join('\n')}

${site.forYou.punchline}

## Why Quaestor
### ${site.shadowOps.headline}
${site.shadowOps.subhead}

${site.shadowOps.points.map((point) => `- **${point.title}:** ${point.desc}`).join('\n')}

## How it works
### ${site.howItWorks.headline}
${site.howItWorks.subhead}

${site.howItWorks.steps.map((step) => `${step.n}. **${step.title}** — ${step.desc}`).join('\n')}

## Features
### ${site.features.headline}
${site.features.subhead}

${site.features.items.map((item) => `- **${item.title}:** ${item.desc}`).join('\n')}

## Proof
### ${site.proof.headline}
${site.proof.subhead}

${site.proof.items.map((item) => `- **${item.title}:** ${item.desc}`).join('\n')}

## Pricing
### ${site.pricing.headline}
${site.pricing.subhead}

${renderPlanMarkdown(site.pricing)}

## FAQ
${renderFaqMarkdown(site.faq.items)}

## Links
- [Partners](${absoluteUrl('/partners')})
- [Method](${absoluteUrl('/method')})
- [AI Score](${absoluteUrl('/ai-score')})
- [Contact](${absoluteUrl('/contact')})
- [Demo](https://qstr.cursus.tools/demo/process)`;

const renderMethodIndexMarkdown = (): string => `# The Quaestor Method

The operational atlas, step by step.

If your business can’t work without you, you don’t have a business. You have a job, and it comes with chains. This method is how you get out.

Four parts. Why most ops docs die. The model that doesn’t. How to map what’s in your head without losing a weekend. The signals that tell you the map is doing real work.

## Sections
${methodContent.map((section, index) => `${index + 1}. [${section.title}](${absoluteUrl(methodPath(section.slug))}) — ${section.summary}`).join('\n')}

## Start here
- [Start at the top](${absoluteUrl(methodPath(methodContent[0].slug))})
- [See the product](https://qstr.cursus.tools/demo/process)`;

const renderMethodItemDescription = (desc: string | string[]): string =>
	Array.isArray(desc) ? desc.join('\n\n') : desc;

const renderMethodSectionMarkdown = (slug: string): string | null => {
	const index = methodContent.findIndex((section) => section.slug === slug);
	if (index === -1) return null;

	const section = methodContent[index];
	const prev = index > 0 ? methodContent[index - 1] : null;
	const next = index < methodContent.length - 1 ? methodContent[index + 1] : null;

	return `# ${section.title}

${section.summary}

${section.intro}

${section.groups
	.map((group) => {
		const heading = group.title ? `## ${group.title}\n\n` : '';
		const items = group.items
			.map((item) => `### ${item.title}\n${renderMethodItemDescription(item.desc)}`)
			.join('\n\n');
		return `${heading}${items}`;
	})
	.join('\n\n')}

## Next steps
${prev ? `- Previous: [${prev.title}](${absoluteUrl(methodPath(prev.slug))})` : '- Previous: none'}
${next ? `- Next: [${next.title}](${absoluteUrl(methodPath(next.slug))})` : `- Next: [Talk to us](${absoluteUrl('/contact')})`}
- Method index: [The Quaestor Method](${absoluteUrl('/method')})`;
};

const renderPartnersMarkdown = (): string =>
	renderHomeMarkdown(partnersHomeSite, {
		title: 'Quaestor — Partner-first operational atlas',
		description:
			'Quaestor helps ops partners deploy living operational atlases that stay useful after the engagement ends.',
		primaryAudience: 'Ops consultants, fractional operators, and implementation partners',
		primaryCtaLabel: 'Book a partner call',
		primaryCtaHref: 'https://cal.com/danny-cursus/15min',
		secondaryCtaLabel: 'See the Demo',
		secondaryCtaHref: 'https://qstr.cursus.tools/demo/process'
	});

const renderContactMarkdown = (): string => `# Contact Quaestor

Talk with Quaestor about partner fit, client rollout, or direct team deployment.

## Partners and fractionals
Bring the client bottleneck. We will map fit, motion, and the first rollout.

- [View partner details](${absoluteUrl('/partners')})
- [Book directly](https://cal.com/danny-cursus/15min)

## Direct teams
No partner? Bring the workflow that keeps breaking. We will scope the next move.

- [Book a 15-min call](https://cal.com/danny-cursus/15min)`;

const renderAiScoreMarkdown = (): string => `# AI Score

Paste an SOP, flow, or process doc and get AI-readiness, Human-readiness, and the handoffs likely to break.

## Instant grading
- Paste SOP text between 100 and 150,000 characters for an immediate response
- POST [${absoluteUrl('/grade')}](${absoluteUrl('/grade')})
- Content type: application/json
- Request body: { "text": "<SOP text>", "source": "optional" }

## Manual file review
- Optional file upload: .docx, .pptx, .md, .txt, or .html
- File size limit: 10 MB
- POST [${absoluteUrl('/ai-score/submit')}](${absoluteUrl('/ai-score/submit')}) for file-based review
- Reply email required for score delivery and manual review follow-up

## What happens next
- Text submissions receive inline AI-readiness and Human-readiness scores immediately
- Files that cannot score inline route to review for follow-up

## Links
- [Contact](${absoluteUrl('/contact')})
- [Method](${absoluteUrl('/method')})`;

export const getMarkdownForPath = (pathname: string): string | null => {
	const normalizedPath = normalizeAgentPath(pathname);

	if (normalizedPath === '/') {
		return renderHomeMarkdown(universalHomeSite, {
			title: "Quaestor - It doesn't have to be this hard.",
			description: 'Quaestor maps the business, so every answer stops routing through you.',
			primaryAudience: 'Founders and operators carrying the business in their heads',
			primaryCtaLabel: 'Start free',
			primaryCtaHref:
				'https://qstr.cursus.tools/login?utm_source=cursus.tools&utm_medium=website&utm_campaign=v1_launch&utm_content=hero',
			secondaryCtaLabel: 'See the map',
			secondaryCtaHref: 'https://qstr.cursus.tools/demo/process'
		});
	}

	if (normalizedPath === '/ops') {
		return renderHomeMarkdown(opsHomeSite, {
			title: 'Quaestor — Your operational atlas',
			description:
				'Quaestor maps who does what, in which system, as a connected graph so your team finds answers instead of asking you.',
			primaryAudience:
				'Founders and operator teams dealing with wiki sprawl, tribal knowledge, and dropped handoffs',
			primaryCtaLabel: 'Get my AI-readiness score',
			primaryCtaHref: '/ai-score',
			secondaryCtaLabel: 'See the Demo',
			secondaryCtaHref: 'https://qstr.cursus.tools/demo/process'
		});
	}

	if (normalizedPath === '/partners') return renderPartnersMarkdown();
	if (normalizedPath === '/contact') return renderContactMarkdown();
	if (normalizedPath === '/ai-score') return renderAiScoreMarkdown();
	if (normalizedPath === '/method') return renderMethodIndexMarkdown();

	if (normalizedPath.startsWith('/method/')) {
		return renderMethodSectionMarkdown(normalizedPath.slice('/method/'.length));
	}

	return null;
};

export const oauthAuthorizationServerMetadata = {
	issuer: SITE_ORIGIN,
	authorization_endpoint: `${SITE_ORIGIN}/oauth/authorize`,
	token_endpoint: `${SITE_ORIGIN}/oauth/token`,
	jwks_uri: `${SITE_ORIGIN}/.well-known/jwks.json`,
	grant_types_supported: [],
	response_types_supported: [],
	scopes_supported: [],
	service_documentation: `${SITE_ORIGIN}/ai-score`
} as const;

export const openIdConfigurationMetadata = {
	...oauthAuthorizationServerMetadata,
	subject_types_supported: ['public'],
	id_token_signing_alg_values_supported: ['RS256'],
	claims_supported: []
} as const;

export const oauthProtectedResourceMetadata = {
	resource: SITE_ORIGIN,
	authorization_servers: [SITE_ORIGIN],
	scopes_supported: [],
	bearer_methods_supported: [],
	resource_name: 'Quaestor Marketing API',
	resource_documentation: `${SITE_ORIGIN}/ai-score`
} as const;

export const mcpServerCard = {
	name: 'Quaestor Marketing MCP',
	serverInfo: {
		name: 'Quaestor Marketing MCP',
		version: '1.0.0'
	},
	description: 'Discovery card for Quaestor marketing site tools and APIs.',
	endpoint: `${SITE_ORIGIN}/grade`,
	capabilities: {
		tools: {
			listChanged: false
		},
		resources: {
			subscribe: false,
			listChanged: false
		},
		prompts: {
			listChanged: false
		}
	},
	tools: [
		{
			name: 'get_ai_readiness_score',
			description: 'Get an AI-readiness evaluation for an SOP or process.',
			inputSchema: {
				type: 'object',
				properties: {
					text: { type: 'string', description: 'The SOP text to grade.' },
					source: { type: 'string', description: 'Optional attribution source.' }
				},
				required: ['text']
			}
		}
	]
} as const;
