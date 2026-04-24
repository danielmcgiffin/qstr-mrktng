<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';
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
		primaryExternal?: boolean;
		secondaryExternal?: boolean;
		onPrimaryClick?: () => void;
		onSecondaryClick?: () => void;
	} = $props();
</script>

<section class="marketing-section marketing-section-hero">
	<div class="marketing-container-narrow">
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

			<div class="media-frame">
				<video autoplay loop muted playsinline>
					<source src="/qstr-demo.webm" type="video/webm" />
				</video>
			</div>
		</div>
	</div>
</section>
