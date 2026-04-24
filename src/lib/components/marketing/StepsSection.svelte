<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';

	type StepItem = {
		n: string;
		title: string;
		desc: string;
	};

	let {
		id,
		headline,
		subhead,
		steps
	}: {
		id: string;
		headline: string;
		subhead: string;
		steps: readonly StepItem[];
	} = $props();
</script>

<section {id} class="marketing-section">
	<div class="marketing-container">
		<div class="section-header">
			<h2 class="section-title"><BrandText text={headline} /></h2>
			<p class="section-copy section-copy-large"><BrandText text={subhead} /></p>
		</div>

		<div class="steps-list">
			{#each steps as step}
				<div class="panel-card step-card">
					<div>
						<span class="step-badge">{step.n}</span>
					</div>
					<div>
						<h3 class="card-title"><BrandText text={step.title} /></h3>
						<p class="card-copy"><BrandText text={step.desc} /></p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
