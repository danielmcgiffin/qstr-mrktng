<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';
	import ImageModal from '$lib/components/ImageModal.svelte';
	import FinalCtaSection from '$lib/components/marketing/FinalCtaSection.svelte';
	import MarketingFooter from '$lib/components/marketing/MarketingFooter.svelte';
	import { trackEvent } from '$lib/analytics';
	import { atlasEngagementContent as content } from './content';

	const trackAtlasFitCall = (location: string) => {
		trackEvent('booking_click', { location });
	};

	const trackTransitionApply = (location: string) => {
		trackEvent('booking_click', { location, type: 'transition_atlas' });
	};

	let activeModalImage = $state<string | null>(null);
	let activeModalAlt = $state('');
</script>

<svelte:head>
	<title>The Atlas Engagement — Quaestor</title>
	<meta
		name="description"
		content="Take a real vacation in 30 days. The Atlas Engagement turns operational chaos into a working map of your business in 4 weeks. Fixed price. Delivered or it's free."
	/>
</svelte:head>

<div class="marketing-page">
	<div class="marketing-page-inner atlas-engagement-page">
		<!-- HERO SECTION -->
		<section class="marketing-section marketing-section-hero">
			<div class="marketing-container-narrow hero-grid">
				<div class="hero-content">
					<h1 class="hero-title"><BrandText text={content.headline} /></h1>
					<p class="hero-subhead"><BrandText text={content.subheadline} /></p>

					<div
						style="margin-top: 1rem; display: grid; gap: 0.75rem; color: rgb(var(--muted)); font-size: 0.975rem; line-height: 1.65;"
					>
						{#each content.heroParagraphs as paragraph}
							<p><BrandText text={paragraph} /></p>
						{/each}
					</div>

					<div class="button-row" style="margin-top: 1.5rem;">
						<a
							class="btn btn-primary"
							href={content.primaryCta.href}
							target="_blank"
							rel="noreferrer"
							onclick={() => trackAtlasFitCall('atlas_hero_primary')}
						>
							{content.primaryCta.label} <span aria-hidden="true">&rarr;</span>
						</a>
					</div>
					<p style="margin-top: 0.6rem; color: rgb(var(--muted)); font-size: var(--fs-small);">
						{content.heroAvailabilityNote}
					</p>
				</div>
				<div class="hero-visual hero-visual-framed">
					<div class="hero-image-shell">
						<button
							type="button"
							class="hero-image-btn"
							onclick={() => {
								activeModalImage = '/Hero.webp';
								activeModalAlt = 'Annotated diagram of the Quaestor operational atlas.';
							}}
							aria-label="Zoom in on hero interface diagram"
						>
							<img
								class="hero-image"
								src="/Hero.webp"
								alt="Annotated diagram of the Quaestor operational atlas."
								loading="eager"
								decoding="async"
							/>
						</button>
					</div>
				</div>
			</div>
		</section>

		<!-- WEEKS SECTION -->
		<section class="marketing-section">
			<div class="marketing-container-narrow">
				<div class="section-header">
					<h2 class="section-title"><BrandText text={content.weeksHeading} /></h2>
				</div>
				<div class="card-grid card-grid-two">
					{#each content.weeks as week}
						<article class="panel-card">
							<span class="step-badge" style="margin-bottom: 0.75rem;">{week.badge}</span>
							<h3 class="card-title"><BrandText text={week.title} /></h3>
							<p class="card-copy" style="margin-top: 0.65rem;"><BrandText text={week.body} /></p>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<!-- WHAT'S INCLUDED & NOT INCLUDED SECTION -->
		<section class="marketing-section">
			<div class="marketing-container-narrow" style="display: grid; gap: 1.5rem;">
				<div class="panel-card">
					<h2 class="section-title" style="margin-bottom: 1.5rem;">
						<BrandText text={content.includedHeading} />
					</h2>
					<ul class="check-list">
						{#each content.includedItems as item}
							<li>
								<span class="check-mark" aria-hidden="true">&#10003;</span>
								<span><BrandText text={item} /></span>
							</li>
						{/each}
					</ul>
				</div>
				<div class="panel-card panel-card-soft">
					<h2 class="section-title" style="margin-bottom: 1.5rem;">
						<BrandText text={content.notIncludedHeading} />
					</h2>
					<ul class="check-list" style="color: rgb(var(--text-muted));">
						{#each content.notIncludedItems as item}
							<li>
								<span
									style="color: rgb(var(--accent)); font-weight: 600; font-family: var(--font-mono); margin-right: 0.25rem;"
									>×</span
								>
								<span><BrandText text={item} /></span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</section>

		<!-- PRICE SECTION -->
		<section class="marketing-section">
			<div class="marketing-container-tight" style="text-align: center;">
				<p
					style="font-family: var(--font-display); font-size: clamp(2.5rem, 6vw, 3.5rem); font-weight: 700; color: rgb(var(--text)); margin-top: 0.5rem;"
				>
					<BrandText text={content.price} />
				</p>
				<p class="section-copy section-copy-large" style="margin-inline: auto;">
					<BrandText text={content.priceSubtext} />
				</p>
			</div>
		</section>

		<!-- IS THIS FOR YOU SECTION -->
		<section class="marketing-section">
			<div class="marketing-container-narrow">
				<div class="section-header">
					<h2 class="section-title"><BrandText text={content.qualificationHeading} /></h2>
				</div>
				<div class="card-grid card-grid-two">
					{#each content.qualificationColumns as column}
						<div class="panel-card">
							<h3
								class="card-title"
								style="font-size: var(--fs-h3); font-family: var(--font-body); font-weight: 600; margin-bottom: 1rem;"
							>
								<BrandText text={column.heading} />
							</h3>
							<ul class="check-list">
								{#each column.items as item}
									<li>
										{#if column.heading.includes('not')}
											<span
												style="color: rgb(var(--text-muted)); font-weight: bold; margin-right: 0.25rem;"
												>•</span
											>
										{:else}
											<span class="check-mark" aria-hidden="true">&#10003;</span>
										{/if}
										<span><BrandText text={item} /></span>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- AVAILABILITY SECTION -->
		<FinalCtaSection
			headline={content.availabilityHeading}
			text={content.availabilityBody}
			ctas={[
				{
					label: content.primaryCta.label,
					href: content.primaryCta.href,
					external: true,
					onclick: () => trackAtlasFitCall('atlas_availability_primary')
				}
			]}
		/>

		<!-- UPSELL SECTION -->
		<section class="marketing-section">
			<div class="marketing-container-narrow">
				<div class="panel-card panel-card-soft">
					<h2 class="section-title" style="margin-bottom: 1rem;">
						<BrandText text={content.upsellHeading} />
					</h2>
					<div class="section-copy" style="margin-bottom: 1.5rem; display: grid; gap: 0.75rem;">
						{#each content.upsellParagraphs as paragraph}
							<p><BrandText text={paragraph} /></p>
						{/each}
					</div>
					<a
						class="btn btn-secondary"
						href={content.upsellCta.href}
						target="_blank"
						rel="noreferrer"
						onclick={() => trackTransitionApply('atlas_upsell_secondary')}
					>
						{content.upsellCta.label}
					</a>
				</div>
			</div>
		</section>

		<!-- FOOTER LINE SECTION -->
		<section class="marketing-section" style="padding-top: 1rem; padding-bottom: 2rem;">
			<div class="marketing-container-narrow">
				<p
					style="margin: 0; font-size: var(--fs-small); line-height: 1.65; font-style: italic; color: rgb(var(--text-muted)); text-align: center;"
				>
					<BrandText text={content.footerLine} />
				</p>
			</div>
		</section>

		<MarketingFooter />
	</div>
</div>

<ImageModal src={activeModalImage} alt={activeModalAlt} onClose={() => (activeModalImage = null)} />

<style>
	.atlas-engagement-page {
		padding-top: 0.5rem;
	}

	.hero-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		align-items: center;
	}

	.hero-visual-framed {
		justify-self: stretch;
	}

	.hero-image-shell {
		position: relative;
		width: min(100%, 34rem);
		margin-inline: auto;
		padding: clamp(0.625rem, 1.2vw, 0.95rem);
		border: 1px solid rgb(var(--border));
		border-radius: calc(var(--radius-lg) + 0.75rem);
		background: rgb(var(--bg-panel));
		box-shadow:
			0 18px 36px rgb(var(--text) / 0.08),
			inset 0 1px 0 rgb(255 255 255 / 0.65);
	}

	.hero-image {
		display: block;
		width: 100%;
		height: auto;
		border-radius: var(--radius-lg);
		box-shadow: 0 0 0 1px rgb(var(--border) / 0.55);
	}

	.hero-visual {
		min-width: 0;
	}

	.hero-image-btn {
		display: block;
		width: 100%;
		border: none;
		background: none;
		padding: 0;
		cursor: zoom-in;
	}

	@media (min-width: 768px) {
		.hero-grid {
			grid-template-columns: 1fr 1fr;
			gap: 4rem;
		}
	}

	@media (max-width: 768px) {
		.hero-image-shell {
			width: min(100%, 28rem);
		}
	}
</style>
