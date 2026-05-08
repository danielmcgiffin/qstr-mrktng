<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';

	type DetailItem = {
		title: string;
		desc: string;
		gifSrc?: string;
	};

	type FaqItem = {
		q: string;
		a: string;
	};

	type CTA = {
		label: string;
		href: string;
	};

	let {
		id,
		headline,
		subhead,
		items,
		faqHeadline,
		faqItems,
		demoCta,
		onDemoClick,
		onImageOpen
	}: {
		id: string;
		headline: string;
		subhead: string;
		items: readonly DetailItem[];
		faqHeadline: string;
		faqItems: readonly FaqItem[];
		demoCta: CTA;
		onDemoClick?: () => void;
		onImageOpen?: (src: string, alt: string) => void;
	} = $props();

	const isVideo = (src: string) => /\.(webm|mp4)$/i.test(src);
	const mediaType = (src: string) => (src.endsWith('.mp4') ? 'video/mp4' : 'video/webm');
</script>

<section {id} class="marketing-section">
	<div class="marketing-container">
		<div class="section-header">
			<h2 class="section-title"><BrandText text={headline} /></h2>
			<p class="section-copy section-copy-large"><BrandText text={subhead} /></p>
		</div>

		<div class="proof-grid">
			{#each items as item}
				<div class="panel-card">
					{#if item.gifSrc}
						<button
							type="button"
							class="proof-image-button"
							aria-label={`Open ${item.title} animation`}
							onclick={() => item.gifSrc && onImageOpen?.(item.gifSrc, item.title)}
						>
							{#if isVideo(item.gifSrc)}
								<video autoplay loop muted playsinline preload="metadata" width="800" height="393">
									<source src={item.gifSrc} type={mediaType(item.gifSrc)} />
								</video>
							{:else}
								<img src={item.gifSrc} alt={item.title} loading="lazy" width="800" height="393" />
							{/if}
						</button>
					{/if}
					<h3 class="card-title"><BrandText text={item.title} /></h3>
					<p class="card-copy"><BrandText text={item.desc} /></p>
				</div>
			{/each}
		</div>

		<div class="faq-wrap">
			<h3 class="faq-heading"><BrandText text={faqHeadline} /></h3>
			<div class="faq-list">
				{#each faqItems as item}
					<details class="faq-item">
						<summary>
							<span><BrandText text={item.q} /></span>
							<span class="faq-indicator" aria-hidden="true">&rsaquo;</span>
						</summary>
						<p class="card-copy"><BrandText text={item.a} /></p>
					</details>
				{/each}
			</div>

			<div class="proof-cta">
				<a class="btn btn-secondary" href={demoCta.href} onclick={() => onDemoClick?.()}>
					{demoCta.label}
				</a>
			</div>
		</div>
	</div>
</section>
