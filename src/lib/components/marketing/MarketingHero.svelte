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
		onSecondaryClick
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
	} = $props();
</script>

<section class="marketing-section marketing-section-hero">
	<div class="marketing-container-narrow hero-grid">
		<div class="hero-content">
			{#if kicker}
				<span class="label-cap">{kicker}</span>
			{/if}

			<h1 class:hero-title-with-kicker={Boolean(kicker)} class="hero-title">
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
					<img class="hero-image" src={imageSrc} alt={imageAlt} loading="eager" decoding="async" />
				</div>
			{:else}
				<AtlasHeroVisual />
			{/if}
		</div>
	</div>
</section>

<style>
	.hero-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
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
		border: 2px solid rgb(var(--accent));
		border-radius: calc(var(--radius-lg) + 0.75rem);
		background: rgb(var(--bg-panel));
		box-shadow:
			0 18px 36px rgb(var(--accent) / 0.12),
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
