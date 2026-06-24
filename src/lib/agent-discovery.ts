import * as envStatic from '$env/static/public';
const env = envStatic as Record<string, string>;
import { site as universalHomeSite } from '../routes/content';
import { aboutContent } from '../routes/about/content';
import { changelogContent } from '../routes/changelog/content';
import { docsArticles } from '../routes/docs/articles';
import { docsContent } from '../routes/docs/content';
import { legalContent } from '../routes/legal/content';
import { manifestoContent } from '../routes/manifesto/content';
import { methodContent } from '../routes/method/content';
import { methodPath } from '../routes/method/nav';
import { partnersContent } from '../routes/partners/content';
import { securityContent } from '../routes/security/content';

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
	setsApart?: {
		headline: string;
		subhead: string;
		items: ReadonlyArray<{ title: string; desc: string }>;
	};
	socialProof?: {
		headline: string;
		items: ReadonlyArray<{ pullQuote: string; quote: string; attribution: string }>;
	};
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
		includeHowItWorks?: boolean;
		includeProof?: boolean;
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

${site.setsApart ? `## ${site.setsApart.headline}\n${site.setsApart.subhead}\n\n${site.setsApart.items.map((item) => `- **${item.title}:** ${item.desc}`).join('\n')}\n` : ''}

${site.socialProof ? `## ${site.socialProof.headline}\n${site.socialProof.items.map((item) => `- **${item.pullQuote}** ${item.quote} - ${item.attribution}`).join('\n')}\n` : ''}

## Core problem
### ${site.forYou.headline}
${site.forYou.bullets.map((bullet) => `- ${bullet}`).join('\n')}

${site.forYou.punchline}

## Why Quaestor
### ${site.shadowOps.headline}
${site.shadowOps.subhead}

${site.shadowOps.points.map((point) => `- **${point.title}:** ${point.desc}`).join('\n')}

${
	options.includeHowItWorks === false
		? ''
		: `## How it works
### ${site.howItWorks.headline}
${site.howItWorks.subhead}

${site.howItWorks.steps.map((step) => `${step.n}. **${step.title}** — ${step.desc}`).join('\n')}\n`
}

## Features
### ${site.features.headline}
${site.features.subhead}

${site.features.items.map((item) => `- **${item.title}:** ${item.desc}`).join('\n')}

${
	options.includeProof === false
		? ''
		: `## Proof
### ${site.proof.headline}
${site.proof.subhead}

${site.proof.items.map((item) => `- **${item.title}:** ${item.desc}`).join('\n')}\n`
}

## Pricing
### ${site.pricing.headline}
${site.pricing.subhead}

${renderPlanMarkdown(site.pricing)}

## FAQ
${renderFaqMarkdown(site.faq.items)}

## Links
- [Partners](${absoluteUrl('/partners')})
- [About](${absoluteUrl('/about')})
- [Docs](${absoluteUrl('/docs')})
- [Method](${absoluteUrl('/method')})
- [AI Score](${absoluteUrl('/ai-score')})
- [Legal](${absoluteUrl('/legal')})
- [Security](${absoluteUrl('/security')})
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

const renderPartnersMarkdown = (): string => `# ${partnersContent.seo.title}

${partnersContent.subhead}

${partnersContent.body.join('\n\n')}

## Primary actions
- [${partnersContent.primaryCta.label}](${absoluteUrl(partnersContent.primaryCta.href)})
- [${partnersContent.secondaryCta.label}](${absoluteUrl(partnersContent.secondaryCta.href)})

## Links
- [Home](${absoluteUrl('/')})
- [Contact](${absoluteUrl('/contact')})
- [Demo](https://qstr.cursus.tools/demo/process)`;

const renderManifestoMarkdown = (): string => `# ${manifestoContent.seo.ogTitle}

${manifestoContent.paragraphs.join('\n\n')}

## ${manifestoContent.convictionsHeading}
${manifestoContent.convictions.map((conviction) => `- **${conviction.title}:** ${conviction.desc}`).join('\n')}

${manifestoContent.closingParagraphs.join('\n\n')}

${manifestoContent.close.join(' ')}

## Links
- [${manifestoContent.cta.label}](${manifestoContent.cta.href})
- [Home](${absoluteUrl('/')})
- [Contact](${absoluteUrl('/contact')})`;

const renderContactMarkdown = (): string => `# Contact Quaestor

Talk with Quaestor about partner fit, client rollout, or direct team deployment.

## Partners and fractionals
Bring the client bottleneck. We will map fit, motion, and the first rollout.

- [View partner details](${absoluteUrl('/partners')})
- [Book directly](https://cal.com/danny-cursus/15min)

## Direct teams
No partner? Bring the workflow that keeps breaking. We will scope the next move.

- [Book a 15-min call](https://cal.com/danny-cursus/15min)`;

const renderAboutMarkdown = (): string => `# ${aboutContent.seo.ogTitle}

${aboutContent.foundersIntro}

${aboutContent.founders
	.map(
		(founder) => `## ${founder.name}
${founder.role}

${founder.bio.join('\n\n')}${founder.focus?.length ? `\n\nFocus: ${founder.focus.join(', ')}` : ''}`
	)
	.join('\n\n')}

## Links
- [Contact](${absoluteUrl('/contact')})
- [Security](${absoluteUrl('/security')})
- [Method](${absoluteUrl('/method')})`;

const renderDocsMarkdown = (): string => `# ${docsContent.seo.ogTitle}

${docsContent.intro}

${docsContent.sections
	.map(
		(section) =>
			`## ${section.title}\n${section.topics
				.map((topic) =>
					topic.href ? `- [${topic.label}](${absoluteUrl(topic.href)})` : `- ${topic.label}`
				)
				.join('\n')}`
	)
	.join('\n\n')}

## Articles
${docsArticles
	.map(
		(article) =>
			`### ${article.title}\n${article.description}\n\n${article.blocks
				.map((block) => `#### ${block.title}\n${block.body.join('\n\n')}`)
				.join('\n\n')}\n\n[Open article](${absoluteUrl(`/docs/${article.slug}`)})`
	)
	.join('\n\n')}`;

const renderChangelogMarkdown = (): string => `# ${changelogContent.title}

${changelogContent.intro}

## Links
- [Docs](${absoluteUrl('/docs')})
- [Contact](${absoluteUrl('/contact')})`;

const renderLegalMarkdown = (): string => `# ${legalContent.seo.ogTitle}

${legalContent.intro}

Entity: ${legalContent.entityName}
Support: ${legalContent.supportEmail}

${legalContent.sections
	.map((section) => {
		const paragraphs = section.paragraphs.join('\n\n');
		const items = section.items?.length
			? `\n\n${section.items.map((item) => `- ${item}`).join('\n')}`
			: '';
		const links = section.links?.length
			? `\n\n${section.links.map((link) => `- [${link.label}](${absoluteUrl(link.href)})`).join('\n')}`
			: '';

		return `## ${section.title}\n\n${paragraphs}${items}${links}`;
	})
	.join('\n\n')}

## Links
- [Security](${absoluteUrl('/security')})
- [Contact](${absoluteUrl('/contact')})
- [Docs](${absoluteUrl('/docs')})`;

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
- [Security](${absoluteUrl('/security')})
- [Method](${absoluteUrl('/method')})`;

const renderSecurityMarkdown = (): string => `# ${securityContent.title}

${securityContent.opening}

Last updated: ${securityContent.lastUpdated}

${securityContent.verificationNote}

${securityContent.sections
	.map((section) => `## ${section.title}\n\n${section.paragraphs.join('\n\n')}`)
	.join('\n\n')}

## ${securityContent.subprocessors.title}
${securityContent.subprocessors.intro}

${securityContent.subprocessors.items
	.map((provider) => `- **${provider.name}:** ${provider.purpose}`)
	.join('\n')}

## Links
- [About](${absoluteUrl('/about')})
- [Contact](${absoluteUrl('/contact')})
- [Method](${absoluteUrl('/method')})`;

export const getMarkdownForPath = (pathname: string): string | null => {
	const normalizedPath = normalizeAgentPath(pathname);

	if (normalizedPath === '/') {
		return renderHomeMarkdown(universalHomeSite, {
			title: 'Quaestor - Don’t let your business run you.',
			description:
				'Quaestor maps who owns what, where it happens, and how the work moves, so every answer stops routing through you.',
			primaryAudience: 'Owner-operators carrying the business in their heads',
			primaryCtaLabel: 'Offload your first process',
			primaryCtaHref: 'https://qstr.cursus.tools/login?initialState=new',
			secondaryCtaLabel: "Find out if it's right for you",
			secondaryCtaHref: 'https://tidycal.com/qstr/fit'
		});
	}

	if (normalizedPath === '/manifesto') return renderManifestoMarkdown();
	if (normalizedPath === '/partners') return renderPartnersMarkdown();
	if (normalizedPath === '/about') return renderAboutMarkdown();
	if (normalizedPath === '/docs') return renderDocsMarkdown();
	if (normalizedPath === '/changelog') return renderChangelogMarkdown();
	if (normalizedPath === '/legal') return renderLegalMarkdown();
	if (normalizedPath === '/contact') return renderContactMarkdown();
	if (normalizedPath === '/ai-score') return renderAiScoreMarkdown();
	if (normalizedPath === '/security') return renderSecurityMarkdown();
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
