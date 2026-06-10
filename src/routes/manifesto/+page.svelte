<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';
	import MarketingFooter from '$lib/components/marketing/MarketingFooter.svelte';
	import { trackEvent } from '$lib/analytics';
	import { manifestoContent as content } from './content';
</script>

<svelte:head>
	<title>{content.seo.title}</title>
	<meta name="description" content={content.seo.description} />
	<meta property="og:title" content={content.seo.ogTitle} />
	<meta property="og:description" content={content.seo.ogDescription} />
	<meta name="twitter:title" content={content.seo.ogTitle} />
	<meta name="twitter:description" content={content.seo.ogDescription} />
</svelte:head>

<div class="marketing-page">
	<div class="marketing-page-inner">
		<section class="marketing-section marketing-section-hero">
			<div class="marketing-container-tight">
				<p class="label-cap">{content.eyebrow}</p>
				<h1 class="hero-title manifesto-title"><BrandText text={content.title} /></h1>
			</div>
		</section>

		<section class="marketing-section manifesto-body-section">
			<div class="marketing-container-tight">
				{#each content.paragraphs as paragraph (paragraph)}
					<p class="manifesto-paragraph"><BrandText text={paragraph} /></p>
				{/each}

				<h2 class="manifesto-convictions-heading">
					<BrandText text={content.convictionsHeading} />
				</h2>
				<div class="manifesto-convictions">
					{#each content.convictions as conviction (conviction.title)}
						<div class="panel-card">
							<h3 class="card-title"><BrandText text={conviction.title} /></h3>
							<p class="card-copy"><BrandText text={conviction.desc} /></p>
						</div>
					{/each}
				</div>

				{#each content.closingParagraphs as paragraph (paragraph)}
					<p class="manifesto-paragraph"><BrandText text={paragraph} /></p>
				{/each}

				<div class="manifesto-close">
					{#each content.close as line (line)}
						<p class="manifesto-close-line"><BrandText text={line} /></p>
					{/each}
				</div>

				<div class="button-row manifesto-cta">
					<a
						class="btn btn-primary"
						href={content.cta.href}
						onclick={() => trackEvent('signup_start', { location: 'manifesto_cta' })}
					>
						{content.cta.label} <span aria-hidden="true">&rarr;</span>
					</a>
				</div>
			</div>
		</section>

		<MarketingFooter />
	</div>
</div>

<style>
	.manifesto-title {
		margin-top: 1rem;
	}

	.manifesto-body-section {
		padding-top: 0;
	}

	.manifesto-paragraph {
		margin: 1.5rem 0 0;
		color: rgb(var(--text-muted));
		font-size: 1.0625rem;
		line-height: 1.75;
		text-wrap: pretty;
	}

	.manifesto-convictions-heading {
		margin: 3rem 0 0;
		font-size: var(--fs-h2);
		line-height: 1.2;
	}

	.manifesto-convictions {
		display: grid;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.manifesto-close {
		margin-top: 3rem;
	}

	.manifesto-close-line {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 3vw, 2rem);
		font-weight: 700;
		line-height: 1.3;
		color: rgb(var(--text));
	}

	.manifesto-close-line:last-child {
		color: rgb(var(--accent));
	}

	.manifesto-cta {
		margin-top: 2.5rem;
	}
</style>
