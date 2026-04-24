<script lang="ts">
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
</script>

<section {id} class="marketing-section">
	<div class="marketing-container">
		<div class="section-header">
			<h2 class="section-title">{headline}</h2>
			<p class="section-copy section-copy-large">{subhead}</p>
		</div>

		<div class="proof-grid">
			{#each items as item}
				<div class="panel-card">
					{#if item.gifSrc}
						<button
							type="button"
							class="proof-image-button"
							onclick={() => item.gifSrc && onImageOpen?.(item.gifSrc, item.title)}
						>
							<img src={item.gifSrc} alt={item.title} loading="lazy" />
						</button>
					{/if}
					<h3 class="card-title">{item.title}</h3>
					<p class="card-copy">{item.desc}</p>
				</div>
			{/each}
		</div>

		<div class="faq-wrap">
			<h3 class="faq-heading">{faqHeadline}</h3>
			<div class="faq-list">
				{#each faqItems as item}
					<details class="faq-item">
						<summary>
							<span>{item.q}</span>
							<span class="faq-indicator" aria-hidden="true">&rsaquo;</span>
						</summary>
						<p class="card-copy">{item.a}</p>
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
