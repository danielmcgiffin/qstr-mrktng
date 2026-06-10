<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';
	import AtlasHeroVisual from '$lib/components/marketing/AtlasHeroVisual.svelte';
	import RotatingWords from '$lib/components/RotatingWords.svelte';

	type CTA = {
		label: string;
		href: string;
	};

	let {
		kicker,
		headline,
		rotatingWords = [],
		subhead,
		primaryCta,
		secondaryCta,
		imageSrc,
		imageAlt = '',
		primaryExternal = false,
		secondaryExternal = false,
		onPrimaryClick,
		onSecondaryClick,
		onImageClick
	}: {
		kicker?: string;
		headline: string;
		rotatingWords?: string[];
		subhead: string;
		primaryCta: CTA;
		secondaryCta: CTA;
		imageSrc?: string;
		imageAlt?: string;
		primaryExternal?: boolean;
		secondaryExternal?: boolean;
		onPrimaryClick?: () => void;
		onSecondaryClick?: () => void;
		onImageClick?: () => void;
	} = $props();
</script>

<section class="marketing-section marketing-section-hero">
	<div class="marketing-container-narrow hero-grid">
		<div class="hero-content">
			{#if kicker}
				<p class="hero-kicker"><BrandText text={kicker} /></p>
			{/if}
			<h1 class="hero-title" class:hero-title-with-kicker={Boolean(kicker)}>
				{#if rotatingWords.length}
					<span class="hero-title-grid">
						<span class="hero-title-lead"><BrandText text={headline} />&nbsp;</span>
						<span class="hero-title-rotating">
							<RotatingWords words={rotatingWords} />
						</span>
					</span>
				{:else}
					<BrandText text={headline} />
				{/if}
			</h1>

			<p class="hero-subhead"><BrandText text={subhead} /></p>

			<div class="button-row">
				<a
					class="btn btn-primary"
					href={primaryCta.href}
					target={primaryExternal ? '_blank' : undefined}
					rel={primaryExternal ? 'noreferrer' : undefined}
					onclick={() => onPrimaryClick?.()}
				>
					{primaryCta.label} <span aria-hidden="true">&rarr;</span>
				</a>

				<a
					class="btn btn-secondary"
					href={secondaryCta.href}
					target={secondaryExternal ? '_blank' : undefined}
					rel={secondaryExternal ? 'noreferrer' : undefined}
					onclick={() => onSecondaryClick?.()}
				>
					{secondaryCta.label}
				</a>
			</div>
		</div>
		<div class="hero-visual" class:hero-visual-framed={Boolean(imageSrc)}>
			{#if imageSrc}
				<div class="hero-image-shell">
					{#if onImageClick}
						<button
							type="button"
							class="hero-image-btn"
							onclick={onImageClick}
							aria-label="Zoom in on hero interface diagram"
						>
							<img
								class="hero-image"
								src={imageSrc}
								alt={imageAlt}
								loading="eager"
								decoding="async"
								width="1560"
								height="1486"
							/>
						</button>
					{:else}
						<img
							class="hero-image"
							src={imageSrc}
							alt={imageAlt}
							loading="eager"
							decoding="async"
							width="1560"
							height="1486"
						/>
					{/if}
				</div>
			{:else}
				<AtlasHeroVisual />
			{/if}
		</div>
	</div>
</section>

<style>
	.hero-kicker {
		font-size: var(--fs-small, 0.875rem);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: rgb(var(--accent));
		margin: 0 0 0.5rem;
	}

	.hero-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
	}

	.hero-image-btn {
		display: block;
		width: 100%;
		border: none;
		background: none;
		padding: 0;
		cursor: zoom-in;
	}

	.hero-visual {
		min-width: 0;
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

	@media (max-width: 768px) {
		.hero-grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}

		.hero-image-shell {
			width: min(100%, 28rem);
		}
	}
</style>
