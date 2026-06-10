<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';

	type DetailItem = {
		title: string;
		desc: string;
		gifSrc?: string;
	};

	type CTA = {
		label: string;
		href: string;
	};

	type DemoVideo = {
		videoSrc: string;
		posterSrc?: string;
		alt: string;
		label?: string;
	};

	let {
		id,
		headline,
		subhead,
		items,
		demoVideo,
		demoCta,
		onDemoClick,
		onImageOpen
	}: {
		id: string;
		headline: string;
		subhead: string;
		items: readonly DetailItem[];
		demoVideo?: DemoVideo;
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

		{#if demoVideo}
			<div class="media-frame proof-demo-frame">
				<video
					controls
					muted
					playsinline
					preload="metadata"
					poster={demoVideo.posterSrc}
					aria-label={demoVideo.alt}
					width="1600"
					height="900"
				>
					<source src={demoVideo.videoSrc} type={mediaType(demoVideo.videoSrc)} />
				</video>
			</div>
		{/if}

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

		<div class="proof-cta">
			<a class="btn btn-secondary" href={demoCta.href} onclick={() => onDemoClick?.()}>
				{demoCta.label}
			</a>
		</div>
	</div>
</section>
