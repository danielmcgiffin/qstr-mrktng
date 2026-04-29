<script lang="ts">
	import MarketingFooter from '$lib/components/marketing/MarketingFooter.svelte';
	import { atlasEngagementContent as content } from '$lib/atlas-engagement-content';
	import { site } from '$lib/site';

	const year = new Date().getFullYear();
	const footerLinks = [
		{ label: 'Home', href: '/' },
		{ label: 'Method', href: '/method' },
		{ label: 'Partners', href: '/partners' },
		{ label: 'Contact', href: '/contact' }
	] as const;
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
		<section class="marketing-section marketing-section-hero">
			<div class="marketing-container-narrow">
				<div class="atlas-hero panel-card">
					<p class="label-cap">{content.eyebrow}</p>
					<h1 class="hero-title atlas-hero-title">{content.headline}</h1>
					<p class="atlas-subheadline">{content.subheadline}</p>

					<div class="atlas-copy">
						{#each content.heroParagraphs as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>

					<div class="atlas-hero-cta">
						<a
							class="btn btn-primary"
							href={content.primaryCta.href}
							target="_blank"
							rel="noreferrer"
						>
							{content.primaryCta.label}
						</a>
						<p class="atlas-note">{content.heroAvailabilityNote}</p>
					</div>
				</div>
			</div>
		</section>

		<section class="marketing-section atlas-section-tight">
			<div class="marketing-container-narrow">
				<h2 class="section-title atlas-section-title-left">{content.weeksHeading}</h2>
				<div class="atlas-grid atlas-grid-2">
					{#each content.weeks as week}
						<article class="panel-card atlas-week-card">
							<span class="atlas-week-badge">{week.badge}</span>
							<h3 class="card-title atlas-card-title">{week.title}</h3>
							<p class="card-copy atlas-card-copy">{week.body}</p>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section class="marketing-section atlas-section-tight">
			<div class="marketing-container-narrow">
				<div class="panel-card atlas-list-card">
					<h2 class="section-title atlas-section-title-left">{content.includedHeading}</h2>
					<ul class="atlas-list atlas-list-check">
						{#each content.includedItems as item}
							<li>
								<span class="atlas-list-mark" aria-hidden="true">✓</span>
								<span>{item}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</section>

		<section class="marketing-section atlas-section-tight">
			<div class="marketing-container-narrow">
				<div class="panel-card panel-card-soft atlas-list-card atlas-negative-card">
					<h2 class="section-title atlas-section-title-left">{content.notIncludedHeading}</h2>
					<ul class="atlas-list atlas-list-negative">
						{#each content.notIncludedItems as item}
							<li>
								<span class="atlas-list-mark" aria-hidden="true">×</span>
								<span>{item}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</section>

		<section class="marketing-section atlas-section-tight">
			<div class="marketing-container-tight atlas-price-wrap">
				<h2 class="section-title">{content.priceHeading}</h2>
				<p class="atlas-price-value">{content.price}</p>
				<p class="section-copy section-copy-large atlas-price-copy">{content.priceSubtext}</p>
				<p class="section-copy atlas-price-copy-subtle">{content.priceAfterYearOne}</p>
			</div>
		</section>

		<section class="marketing-section atlas-section-tight">
			<div class="marketing-container-narrow">
				<div class="final-cta atlas-guarantee">
					<h2 class="final-cta-title">{content.guaranteeHeading}</h2>
					<div class="atlas-guarantee-copy">
						{#each content.guaranteeParagraphs as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<section class="marketing-section atlas-section-tight">
			<div class="marketing-container-narrow">
				<h2 class="section-title atlas-section-title-left">{content.qualificationHeading}</h2>
				<div class="atlas-grid atlas-grid-2">
					{#each content.qualificationColumns as column}
						<div class="panel-card atlas-qualification-card">
							<h3 class="card-title atlas-card-title">{column.heading}</h3>
							<ul class="atlas-list atlas-list-dot">
								{#each column.items as item}
									<li>
										<span class="atlas-list-mark" aria-hidden="true">•</span>
										<span>{item}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<section class="marketing-section atlas-section-tight">
			<div class="marketing-container-tight atlas-availability-wrap">
				<h2 class="section-title">{content.availabilityHeading}</h2>
				<p class="section-copy section-copy-large atlas-availability-copy">
					{content.availabilityBody}
				</p>
				<a class="btn btn-primary" href={content.primaryCta.href} target="_blank" rel="noreferrer">
					{content.primaryCta.label}
				</a>
			</div>
		</section>

		<section class="marketing-section atlas-section-tight">
			<div class="marketing-container-narrow">
				<div class="panel-card panel-card-soft atlas-upsell-card">
					<h2 class="section-title atlas-section-title-left">{content.upsellHeading}</h2>
					<div class="atlas-copy atlas-upsell-copy">
						{#each content.upsellParagraphs as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>
					<a
						class="btn btn-secondary"
						href={content.upsellCta.href}
						target="_blank"
						rel="noreferrer"
					>
						{content.upsellCta.label}
					</a>
				</div>
			</div>
		</section>

		<section class="marketing-section atlas-section-tight atlas-footer-line-section">
			<div class="marketing-container-narrow">
				<p class="atlas-footer-line">{content.footerLine}</p>
			</div>
		</section>

		<MarketingFooter
			brand={site.brand}
			tagline={site.footer.tagline}
			copyrightName={site.footer.copyrightName}
			{year}
			links={footerLinks}
		/>
	</div>
</div>

<style>
	.atlas-engagement-page {
		padding-top: 0.5rem;
	}

	.atlas-section-tight {
		padding-block: 1.35rem;
	}

	.atlas-hero {
		text-align: left;
		padding: 1.75rem;
	}

	.atlas-hero-title {
		margin-top: 0.75rem;
		font-size: clamp(2.1rem, 6vw, 3.6rem);
		text-align: left;
	}

	.atlas-subheadline {
		margin: 0.85rem 0 0;
		font-size: clamp(1.15rem, 2.2vw, 1.5rem);
		font-weight: 500;
		line-height: 1.35;
		color: rgb(var(--surface-text-strong));
	}

	.atlas-copy {
		margin-top: 1rem;
		display: grid;
		gap: 0.75rem;
		color: rgb(var(--muted));
		font-size: 0.975rem;
		line-height: 1.65;
	}

	.atlas-hero-cta {
		margin-top: 1.35rem;
	}

	.atlas-note {
		margin: 0.6rem 0 0;
		color: rgb(var(--muted));
		font-size: var(--fs-small);
	}

	.atlas-section-title-left {
		text-align: left;
		font-size: clamp(1.65rem, 3.2vw, 2.25rem);
	}

	.atlas-grid {
		display: grid;
		gap: 1rem;
		margin-top: 1rem;
	}

	.atlas-grid-2 {
		grid-template-columns: 1fr;
	}

	.atlas-week-card,
	.atlas-qualification-card,
	.atlas-list-card,
	.atlas-upsell-card {
		padding: 1.25rem;
	}

	.atlas-week-badge {
		display: inline-flex;
		padding: 0.2rem 0.65rem;
		border-radius: var(--radius-pill);
		border: 1px solid rgb(var(--accent));
		background: rgb(var(--accent-tint));
		color: rgb(var(--accent));
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		line-height: 1;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.atlas-card-title {
		margin-top: 0.75rem;
		font-size: 1.05rem;
	}

	.atlas-card-copy {
		margin-top: 0.65rem;
		line-height: 1.65;
	}

	.atlas-list {
		margin: 1rem 0 0;
		padding: 0;
		display: grid;
		gap: 0.65rem;
		list-style: none;
	}

	.atlas-list li {
		display: flex;
		align-items: flex-start;
		gap: 0.55rem;
		color: rgb(var(--muted));
		font-size: 0.95rem;
		line-height: 1.6;
	}

	.atlas-list-mark {
		flex: 0 0 auto;
		font-weight: 600;
		color: rgb(var(--accent));
	}

	.atlas-negative-card {
		border-color: rgb(var(--border-strong));
	}

	.atlas-price-wrap,
	.atlas-availability-wrap {
		text-align: center;
	}

	.atlas-price-value {
		margin: 0.6rem 0 0;
		font-size: clamp(2.35rem, 7vw, 3.4rem);
		font-weight: 600;
		line-height: 1.08;
		color: rgb(var(--surface-text-strong));
	}

	.atlas-price-copy {
		margin-top: 0.65rem;
	}

	.atlas-price-copy-subtle {
		margin-top: 0.2rem;
	}

	.atlas-guarantee {
		text-align: left;
		padding: 1.75rem;
	}

	.atlas-guarantee-copy {
		margin-top: 1rem;
		display: grid;
		gap: 0.7rem;
		color: rgb(var(--muted));
		font-size: 0.96rem;
		line-height: 1.62;
	}

	.atlas-availability-copy {
		margin-bottom: 1rem;
	}

	.atlas-upsell-copy {
		margin-bottom: 1.05rem;
	}

	.atlas-footer-line-section {
		padding-top: 1.1rem;
		padding-bottom: 2.25rem;
	}

	.atlas-footer-line {
		margin: 0;
		font-size: var(--fs-small);
		line-height: 1.65;
		font-style: italic;
		color: rgb(var(--muted));
		text-align: center;
	}

	@media (min-width: 768px) {
		.atlas-grid-2 {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.atlas-week-card,
		.atlas-qualification-card,
		.atlas-list-card,
		.atlas-upsell-card,
		.atlas-hero,
		.atlas-guarantee {
			padding: 1.5rem;
		}
	}
</style>
