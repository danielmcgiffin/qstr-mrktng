<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';

	type FaqItem = {
		q: string;
		a: string;
	};

	let {
		id,
		headline,
		items
	}: {
		id: string;
		headline: string;
		items: readonly FaqItem[];
	} = $props();
</script>

<section {id} class="marketing-section">
	<div class="marketing-container">
		<div class="faq-wrap">
			<h2 class="faq-heading"><BrandText text={headline} /></h2>
			<div class="faq-list">
				{#each items as item}
					<details class="faq-item">
						<summary>
							<span><BrandText text={item.q} /></span>
							<span class="faq-indicator" aria-hidden="true">&rsaquo;</span>
						</summary>
						<p class="card-copy"><BrandText text={item.a} /></p>
					</details>
				{/each}
			</div>
		</div>
	</div>
</section>
