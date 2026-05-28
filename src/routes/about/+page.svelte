<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';
	import FinalCtaSection from '$lib/components/marketing/FinalCtaSection.svelte';
	import MarketingFooter from '$lib/components/marketing/MarketingFooter.svelte';
	import { trackEvent } from '$lib/analytics';
	import { aboutContent as content } from './content';
</script>

<svelte:head>
	<title>{content.seo.title}</title>
	<meta name="description" content={content.seo.description} />
	<meta property="og:title" content={content.seo.ogTitle} />
	<meta property="og:description" content={content.seo.ogDescription} />
	<meta property="og:image:alt" content="Quaestor founder page preview." />
	<meta name="twitter:title" content={content.seo.ogTitle} />
	<meta name="twitter:description" content={content.seo.ogDescription} />
	<meta name="twitter:image:alt" content="Quaestor founder page preview." />
</svelte:head>

<div class="marketing-page">
	<div class="marketing-page-inner about-page">
		<section class="marketing-section marketing-section-hero about-hero">
			<div class="marketing-container-narrow">
				<h1 class="hero-title about-title"><BrandText text={content.title} /></h1>
				<p class="section-copy section-copy-large"><BrandText text={content.foundersIntro} /></p>
			</div>
		</section>

		<section id="founders" class="marketing-section about-founders-section">
			<div class="marketing-container-narrow">
				<div class="founder-grid">
					{#each content.founders as founder (founder.name)}
						<article class="founder-card">
							<div class="founder-card-head">
								<div class="founder-headshot">
									{#if founder.headshotSrc}
										<img
											src={founder.headshotSrc}
											alt={founder.headshotAlt}
											loading="lazy"
											width="160"
											height="160"
										/>
									{:else}
										<span aria-hidden="true">{founder.initials}</span>
									{/if}
								</div>

								<div>
									<h3><BrandText text={founder.name} /></h3>
									<p class="founder-role"><BrandText text={founder.role} /></p>
								</div>
							</div>

							<div class="founder-bio">
								{#each founder.bio as paragraph (paragraph)}
									<p><BrandText text={paragraph} /></p>
								{/each}
							</div>

							{#if founder.focus?.length}
								<ul class="founder-focus" aria-label={`${founder.name} focus areas`}>
									{#each founder.focus as item (item)}
										<li><BrandText text={item} /></li>
									{/each}
								</ul>
							{/if}
						</article>
					{/each}
				</div>
			</div>
		</section>

		<FinalCtaSection
			headline={content.finalCta.headline}
			text={content.finalCta.text}
			ctas={[
				{
					label: content.finalCta.label,
					href: content.finalCta.href,
					onclick: () => trackEvent('contact_click', { location: 'about_final_cta' })
				}
			]}
		/>

		<MarketingFooter />
	</div>
</div>

<style>
	.about-page {
		padding-top: 0.5rem;
	}

	.about-hero {
		padding-bottom: 1.5rem;
	}

	.about-founders-section {
		padding-top: 1.5rem;
	}

	.founder-grid {
		display: grid;
		gap: 1rem;
	}

	.founder-card {
		display: grid;
		gap: 1.25rem;
		border: 1px solid rgb(var(--border));
		border-radius: var(--radius-lg);
		background: rgb(var(--bg-panel));
		padding: 1.25rem;
	}

	.founder-card-head {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.founder-headshot {
		display: grid;
		width: 5rem;
		height: 5rem;
		flex: 0 0 auto;
		place-items: center;
		overflow: hidden;
		border: 1px solid rgb(var(--border-strong));
		border-radius: 50%;
		background: rgb(var(--bg-subtle));
		color: rgb(var(--accent));
		font-family: var(--font-mono);
		font-size: 0.95rem;
		font-weight: 500;
		letter-spacing: 0.08em;
	}

	.founder-headshot img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.founder-card h3 {
		margin: 0;
		font-size: clamp(1.25rem, 3vw, 1.5rem);
		font-weight: 600;
		line-height: 1.2;
	}

	.founder-role {
		margin: 0.35rem 0 0;
		color: rgb(var(--accent));
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.founder-bio {
		display: grid;
		gap: 0.75rem;
	}

	.founder-bio p {
		margin: 0;
		color: rgb(var(--muted));
		font-size: 1rem;
		line-height: 1.7;
		text-wrap: pretty;
	}

	.founder-grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.founder-card {
		padding: 1.5rem;
	}
</style>
