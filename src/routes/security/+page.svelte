<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';
	import FinalCtaSection from '$lib/components/marketing/FinalCtaSection.svelte';
	import MarketingFooter from '$lib/components/marketing/MarketingFooter.svelte';
	import { securityContent as content } from './content';
</script>

<svelte:head>
	<title>{content.seo.title}</title>
	<meta name="description" content={content.seo.description} />
	<meta property="og:title" content={content.seo.ogTitle} />
	<meta property="og:description" content={content.seo.ogDescription} />
	<meta property="og:image:alt" content="Quaestor security and data handling page preview." />
	<meta name="twitter:title" content={content.seo.ogTitle} />
	<meta name="twitter:description" content={content.seo.ogDescription} />
	<meta name="twitter:image:alt" content="Quaestor security and data handling page preview." />
</svelte:head>

<div class="marketing-page">
	<div class="marketing-page-inner security-page">
		<section class="marketing-section marketing-section-hero security-hero">
			<div class="marketing-container-narrow">
				<h1 class="hero-title security-title"><BrandText text={content.title} /></h1>
				<p class="security-opening"><BrandText text={content.opening} /></p>

				<div class="security-posture" aria-label="Security page status">
					<span>Last updated {content.lastUpdated}</span>
					<span><BrandText text={content.verificationNote} /></span>
				</div>
			</div>
		</section>

		<section
			class="marketing-section security-policy-section"
			aria-label="Security policy sections"
		>
			<div class="marketing-container-narrow security-stack">
				{#each content.sections as section, index (section.id)}
					<article id={section.id} class="security-row">
						<div class="security-row-heading">
							<span class="security-row-number">{String(index + 1).padStart(2, '0')}</span>
							<h2><BrandText text={section.title} /></h2>
						</div>

						<div class="security-row-body">
							{#each section.paragraphs as paragraph (paragraph)}
								<p><BrandText text={paragraph} /></p>
							{/each}
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="subprocessors" class="marketing-section security-subprocessors">
			<div class="marketing-container-narrow">
				<div class="section-header">
					<h2 class="section-title"><BrandText text={content.subprocessors.title} /></h2>
					<p class="section-copy section-copy-large">
						<BrandText text={content.subprocessors.intro} />
					</p>
				</div>

				<div class="security-provider-list">
					{#each content.subprocessors.items as provider (provider.name)}
						<article class="security-provider">
							<h3><BrandText text={provider.name} /></h3>
							<p><BrandText text={provider.purpose} /></p>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<FinalCtaSection
			headline={content.finalCta.headline}
			text={content.finalCta.text}
			ctas={[{ label: content.finalCta.label, href: content.finalCta.href }]}
		/>

		<MarketingFooter />
	</div>
</div>

<style>
	.security-page {
		padding-top: 0.5rem;
	}

	.security-hero {
		padding-bottom: 3rem;
	}

	.security-title {
		max-width: 14ch;
		margin-top: 0.75rem;
	}

	.security-opening {
		max-width: 66ch;
		margin: 1.5rem 0 0;
		color: rgb(var(--muted));
		font-size: clamp(1.0625rem, 2vw, 1.25rem);
		line-height: 1.7;
		text-wrap: pretty;
	}

	.security-posture {
		display: grid;
		gap: 0.6rem;
		max-width: 58rem;
		margin-top: 2rem;
		border: 1px solid rgb(var(--border));
		border-radius: var(--radius-lg);
		background: rgb(var(--bg-panel));
		padding: 1rem;
		color: rgb(var(--muted));
		font-size: var(--fs-small);
		line-height: 1.55;
	}

	.security-posture span:first-child {
		color: rgb(var(--accent));
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.security-policy-section,
	.security-subprocessors {
		padding-block: 2rem 4rem;
	}

	.security-stack {
		display: grid;
		gap: 0;
	}

	.security-row {
		display: grid;
		gap: 1rem;
		border-top: 1px solid rgb(var(--border));
		padding-block: 1.75rem;
		scroll-margin-top: 6rem;
	}

	.security-row:last-child {
		border-bottom: 1px solid rgb(var(--border));
	}

	.security-row-heading {
		display: grid;
		gap: 0.55rem;
	}

	.security-row-number {
		color: rgb(var(--accent));
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		font-weight: 500;
		letter-spacing: 0.08em;
	}

	.security-row h2,
	.security-provider h3 {
		margin: 0;
		color: rgb(var(--surface-text-strong));
		font-family: var(--font-body);
		font-weight: 600;
		line-height: 1.25;
	}

	.security-row h2 {
		font-size: clamp(1.35rem, 3vw, 1.75rem);
	}

	.security-row-body {
		display: grid;
		gap: 0.85rem;
		max-width: 65ch;
	}

	.security-row-body p,
	.security-provider p {
		margin: 0;
		color: rgb(var(--muted));
		font-size: 1rem;
		line-height: 1.7;
		text-wrap: pretty;
	}

	.security-provider-list {
		display: grid;
		gap: 0.75rem;
		margin-top: 2rem;
	}

	.security-provider {
		display: grid;
		gap: 0.4rem;
		border: 1px solid rgb(var(--border));
		border-radius: var(--radius-lg);
		background: rgb(var(--bg-panel));
		padding: 1rem;
	}

	.security-provider h3 {
		font-size: 1rem;
	}

	@media (min-width: 768px) {
		.security-posture {
			grid-template-columns: minmax(9rem, 0.3fr) 1fr;
			align-items: start;
			padding: 1.1rem 1.25rem;
		}

		.security-row {
			grid-template-columns: minmax(12rem, 0.34fr) 1fr;
			gap: 2rem;
			padding-block: 2.25rem;
		}

		.security-provider {
			grid-template-columns: minmax(11rem, 0.3fr) 1fr;
			gap: 1.5rem;
			padding: 1.1rem 1.25rem;
		}
	}
</style>
