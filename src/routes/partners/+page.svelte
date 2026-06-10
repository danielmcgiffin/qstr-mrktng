<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';
	import MarketingFooter from '$lib/components/marketing/MarketingFooter.svelte';
	import { trackEvent } from '$lib/analytics';
	import { partnersContent as content } from './content';
</script>

<svelte:head>
	<title>{content.seo.title}</title>
	<meta name="description" content={content.seo.description} />
	<meta property="og:title" content={content.seo.ogTitle ?? content.seo.title} />
	<meta property="og:description" content={content.seo.ogDescription ?? content.seo.description} />
	<meta property="og:image:alt" content={content.seo.imageAlt} />
	<meta name="twitter:title" content={content.seo.ogTitle ?? content.seo.title} />
	<meta name="twitter:description" content={content.seo.ogDescription ?? content.seo.description} />
	<meta name="twitter:image:alt" content={content.seo.imageAlt} />
</svelte:head>

<div class="marketing-page">
	<div class="marketing-page-inner">
		<section class="marketing-section marketing-section-hero">
			<div class="marketing-container-tight">
				<p class="label-cap">{content.kicker}</p>
				<h1 class="hero-title partners-title"><BrandText text={content.headline} /></h1>
				<p class="hero-subhead"><BrandText text={content.subhead} /></p>

				{#each content.body as paragraph (paragraph)}
					<p class="partners-body"><BrandText text={paragraph} /></p>
				{/each}

				<div class="button-row">
					<a
						class="btn btn-primary"
						href={content.primaryCta.href}
						target="_blank"
						rel="noreferrer"
						onclick={() => trackEvent('booking_click', { location: 'partners_primary' })}
					>
						{content.primaryCta.label} <span aria-hidden="true">&rarr;</span>
					</a>
					<a
						class="btn btn-secondary"
						href={content.secondaryCta.href}
						onclick={() => trackEvent('partner_intake_click', { location: 'partners_secondary' })}
					>
						{content.secondaryCta.label}
					</a>
				</div>
			</div>
		</section>

		<MarketingFooter />
	</div>
</div>

<style>
	.partners-title {
		margin-top: 1rem;
	}

	.partners-body {
		max-width: 64ch;
		margin: 1.25rem 0 0;
		color: rgb(var(--text-muted));
		font-size: 1rem;
		line-height: 1.65;
		text-wrap: pretty;
	}
</style>
