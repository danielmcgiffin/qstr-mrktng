<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';
	import MarketingFooter from '$lib/components/marketing/MarketingFooter.svelte';
	import { changelogContent as content } from './content';
</script>

<svelte:head>
	<title>{content.seo.title}</title>
	<meta name="description" content={content.seo.description} />
	<meta property="og:title" content={content.seo.ogTitle} />
	<meta property="og:description" content={content.seo.ogDescription} />
	<meta property="og:image:alt" content="Quaestor changelog page preview." />
	<meta name="twitter:title" content={content.seo.ogTitle} />
	<meta name="twitter:description" content={content.seo.ogDescription} />
	<meta name="twitter:image:alt" content="Quaestor changelog page preview." />
</svelte:head>

<div class="marketing-page">
	<div class="marketing-page-inner changelog-page">
		<section class="marketing-section marketing-section-hero changelog-hero">
			<div class="marketing-container-narrow">
				<p class="label-cap"><BrandText text={content.eyebrow} /></p>
				<h1 class="hero-title changelog-title"><BrandText text={content.title} /></h1>
				<p class="changelog-intro"><BrandText text={content.intro} /></p>
			</div>
		</section>

		<MarketingFooter />
	</div>
</div>

<style>
	.changelog-page {
		padding-top: 0.5rem;
	}

	.changelog-hero {
		padding-bottom: 5rem;
	}

	.changelog-title {
		max-width: 13ch;
		margin-top: 0.75rem;
	}

	.changelog-intro {
		max-width: 60ch;
		margin: 1.5rem 0 0;
		color: rgb(var(--muted));
		font-size: clamp(1.0625rem, 2vw, 1.25rem);
		line-height: 1.7;
		text-wrap: pretty;
	}
</style>
