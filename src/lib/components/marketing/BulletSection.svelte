<script lang="ts">
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
			<h2 class="section-title">{headline}</h2>
			<p class="section-copy section-copy-large">{intro}</p>
		</div>

		<div class="card-grid card-grid-two">
			{#each bullets as bullet}
				<div class="panel-card">
					<p class="card-copy">{bullet}</p>
				</div>
			{/each}
		</div>

		<p class="punchline">{punchline}</p>
	</div>
</section>
