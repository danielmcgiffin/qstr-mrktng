<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';

	type DetailItem = {
		title: string;
		desc: string;
	};

	let {
		id,
		headline,
		subhead,
		items
	}: {
		id: string;
		headline: string;
		subhead: string;
		items: readonly DetailItem[];
	} = $props();
</script>

<section {id} class="marketing-section">
	<div class="marketing-container">
		<div class="section-header">
			<h2 class="section-title"><BrandText text={headline} /></h2>
			<p class="section-copy section-copy-large"><BrandText text={subhead} /></p>
		</div>

		<div class="card-grid card-grid-three">
			{#each items as item}
				<div class="panel-card">
					<h3 class="card-title"><BrandText text={item.title} /></h3>
					<p class="card-copy"><BrandText text={item.desc} /></p>
				</div>
			{/each}
		</div>
	</div>
</section>
