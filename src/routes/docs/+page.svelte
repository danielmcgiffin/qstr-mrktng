<script lang="ts">
	import { resolve } from '$app/paths';
	import BrandText from '$lib/components/BrandText.svelte';
	import MarketingFooter from '$lib/components/marketing/MarketingFooter.svelte';
	import { docsContent as content } from './content';
</script>

<svelte:head>
	<title>{content.seo.title}</title>
	<meta name="description" content={content.seo.description} />
	<meta property="og:title" content={content.seo.ogTitle} />
	<meta property="og:description" content={content.seo.ogDescription} />
	<meta property="og:image:alt" content="Quaestor docs page preview." />
	<meta name="twitter:title" content={content.seo.ogTitle} />
	<meta name="twitter:description" content={content.seo.ogDescription} />
	<meta name="twitter:image:alt" content="Quaestor docs page preview." />
</svelte:head>

<div class="marketing-page">
	<div class="marketing-page-inner docs-page">
		<section class="marketing-section marketing-section-hero docs-hero">
			<div class="marketing-container-narrow">
				<h1 class="hero-title docs-title"><BrandText text={content.title} /></h1>
				<p class="docs-intro"><BrandText text={content.intro} /></p>
			</div>
		</section>

		<section class="marketing-section docs-index-section" aria-label="Docs index">
			<div class="marketing-container-narrow docs-grid">
				{#each content.sections as section, index (section.title)}
					<article class="docs-card">
						<div class="docs-card-heading">
							<span>{String(index + 1).padStart(2, '0')}</span>
							<h2><BrandText text={section.title} /></h2>
						</div>

						<ul>
							{#each section.topics as topic (topic.href ?? topic.label)}
								<li>
									{#if topic.href}
										<a href={resolve(topic.href as '/')}><BrandText text={topic.label} /></a>
									{:else}
										<span><BrandText text={topic.label} /></span>
									{/if}
								</li>
							{/each}
						</ul>
					</article>
				{/each}
			</div>
		</section>

		<MarketingFooter />
	</div>
</div>

<style>
	.docs-page {
		padding-top: 0.5rem;
	}

	.docs-hero {
		padding-bottom: 3rem;
	}

	.docs-title {
		max-width: 13ch;
		margin-top: 0.75rem;
	}

	.docs-intro {
		max-width: 64ch;
		margin: 1.5rem 0 0;
		color: rgb(var(--muted));
		font-size: clamp(1.0625rem, 2vw, 1.25rem);
		line-height: 1.7;
		text-wrap: pretty;
	}

	.docs-index-section {
		padding-block: 2rem 5rem;
	}

	.docs-grid {
		display: grid;
		gap: 1rem;
	}

	.docs-card {
		display: grid;
		gap: 1.25rem;
		border: 1px solid rgb(var(--border));
		border-radius: var(--radius-lg);
		background: rgb(var(--bg-panel));
		padding: 1.25rem;
	}

	.docs-card-heading {
		display: grid;
		gap: 0.5rem;
	}

	.docs-card-heading span {
		color: rgb(var(--accent));
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		font-weight: 500;
		letter-spacing: 0.08em;
	}

	.docs-card h2 {
		margin: 0;
		font-size: clamp(1.25rem, 3vw, 1.5rem);
		font-weight: 600;
		line-height: 1.2;
	}

	.docs-card ul {
		display: grid;
		gap: 0.65rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.docs-card li {
		color: rgb(var(--muted));
		font-size: 1rem;
		line-height: 1.55;
	}

	.docs-card a {
		color: rgb(var(--accent));
		font-weight: 500;
		text-decoration: none;
	}

	.docs-card a:hover {
		color: rgb(var(--accent-deep));
	}

	@media (min-width: 768px) {
		.docs-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.docs-card {
			padding: 1.5rem;
		}
	}
</style>
