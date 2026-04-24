<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';

	let {
		id,
		headline,
		intro,
		bullets,
		punchline
	}: {
		id: string;
		headline: string;
		intro: string;
		bullets: readonly string[];
		punchline: string;
	} = $props();
</script>

<section {id} class="marketing-section">
	<div class="marketing-container">
		<div class="section-header">
			<h2 class="section-title"><BrandText text={headline} /></h2>
			<p class="section-copy section-copy-large"><BrandText text={intro} /></p>
		</div>

		<div class="card-grid card-grid-two">
			{#each bullets as bullet}
				<div class="panel-card">
					<p class="card-copy"><BrandText text={bullet} /></p>
				</div>
			{/each}
		</div>

		<p class="punchline"><BrandText text={punchline} /></p>
	</div>
</section>
