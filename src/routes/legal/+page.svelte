<script lang="ts">
	import { resolve } from '$app/paths';
	import BrandText from '$lib/components/BrandText.svelte';
	import MarketingFooter from '$lib/components/marketing/MarketingFooter.svelte';
	import { legalContent as content } from './content';

	const supportHref = `mailto:${content.supportEmail}`;
</script>

<svelte:head>
	<title>{content.seo.title}</title>
	<meta name="description" content={content.seo.description} />
	<meta property="og:title" content={content.seo.ogTitle} />
	<meta property="og:description" content={content.seo.ogDescription} />
	<meta property="og:image:alt" content="Quaestor legal page preview." />
	<meta name="twitter:title" content={content.seo.ogTitle} />
	<meta name="twitter:description" content={content.seo.ogDescription} />
	<meta name="twitter:image:alt" content="Quaestor legal page preview." />
</svelte:head>

<div class="marketing-page">
	<div class="marketing-page-inner legal-page">
		<section class="marketing-section marketing-section-hero legal-hero">
			<div class="marketing-container-narrow">
				<p class="label-cap"><BrandText text={content.eyebrow} /></p>
				<h1 class="hero-title legal-title"><BrandText text={content.title} /></h1>
				<p class="legal-intro"><BrandText text={content.intro} /></p>

				<div class="legal-contact-card">
					<p><BrandText text={content.entityName} /></p>
					<a href={supportHref}>{content.supportEmail}</a>
				</div>
			</div>
		</section>

		<section class="marketing-section legal-index-section" aria-label="Legal links">
			<div class="marketing-container-narrow legal-stack">
				{#each content.sections as section, index (section.id)}
					<article id={section.id} class="legal-row">
						<div class="legal-row-heading">
							<span>{String(index + 1).padStart(2, '0')}</span>
							<h2><BrandText text={section.title} /></h2>
						</div>

						<div class="legal-row-body">
							{#each section.paragraphs as paragraph (paragraph)}
								<p><BrandText text={paragraph} /></p>
							{/each}

							{#if section.items}
								<ul>
									{#each section.items as item (item)}
										<li><BrandText text={item} /></li>
									{/each}
								</ul>
							{/if}

							{#if section.links}
								<div class="legal-row-links">
									{#each section.links as link (link.href)}
										<a href={resolve(link.href as '/')}>{link.label}</a>
									{/each}
								</div>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</section>

		<MarketingFooter />
	</div>
</div>

<style>
	.legal-page {
		padding-top: 0.5rem;
	}

	.legal-hero {
		padding-bottom: 3rem;
	}

	.legal-title {
		max-width: 14ch;
		margin-top: 0.75rem;
	}

	.legal-intro {
		max-width: 64ch;
		margin: 1.5rem 0 0;
		color: rgb(var(--muted));
		font-size: clamp(1.0625rem, 2vw, 1.25rem);
		line-height: 1.7;
		text-wrap: pretty;
	}

	.legal-contact-card {
		display: grid;
		gap: 0.25rem;
		width: fit-content;
		margin-top: 2rem;
		border: 1px solid rgb(var(--border));
		border-radius: var(--radius-lg);
		background: rgb(var(--bg-panel));
		padding: 1rem;
		font-size: var(--fs-small);
	}

	.legal-contact-card p {
		margin: 0;
		color: rgb(var(--surface-text-strong));
		font-weight: 600;
	}

	.legal-contact-card a,
	.legal-row-links a {
		color: rgb(var(--accent));
		font-weight: 500;
		text-decoration: none;
	}

	.legal-contact-card a:hover,
	.legal-row-links a:hover {
		color: rgb(var(--accent-deep));
	}

	.legal-index-section {
		padding-block: 2rem 5rem;
	}

	.legal-stack {
		display: grid;
		gap: 0;
	}

	.legal-row {
		display: grid;
		gap: 1rem;
		border-top: 1px solid rgb(var(--border));
		padding-block: 1.75rem;
		scroll-margin-top: 6rem;
	}

	.legal-row:last-child {
		border-bottom: 1px solid rgb(var(--border));
	}

	.legal-row-heading {
		display: grid;
		gap: 0.55rem;
	}

	.legal-row-heading span {
		color: rgb(var(--accent));
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		font-weight: 500;
		letter-spacing: 0.08em;
	}

	.legal-row h2 {
		margin: 0;
		font-size: clamp(1.35rem, 3vw, 1.75rem);
		font-weight: 600;
		line-height: 1.2;
	}

	.legal-row-body {
		display: grid;
		gap: 0.85rem;
		max-width: 68ch;
	}

	.legal-row-body p,
	.legal-row-body li {
		margin: 0;
		color: rgb(var(--muted));
		font-size: 1rem;
		line-height: 1.7;
		text-wrap: pretty;
	}

	.legal-row-body ul {
		display: grid;
		gap: 0.65rem;
		margin: 0;
		padding-left: 1.1rem;
	}

	.legal-row-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 0.25rem;
		font-size: var(--fs-small);
	}

	@media (min-width: 768px) {
		.legal-row {
			grid-template-columns: minmax(12rem, 0.34fr) 1fr;
			gap: 2rem;
			padding-block: 2.25rem;
		}
	}
</style>
