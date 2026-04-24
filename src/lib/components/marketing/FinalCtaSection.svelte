<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';

	type CTA = {
		label: string;
		href: string;
		variant?: 'primary' | 'secondary';
		external?: boolean;
		onclick?: () => void;
		showArrow?: boolean;
	};

	let {
		headline,
		text,
		ctas
	}: {
		headline: string;
		text: string;
		ctas: readonly CTA[];
	} = $props();
</script>

<section class="marketing-section">
	<div class="marketing-container-tight">
		<div class="final-cta">
			<h2 class="final-cta-title"><BrandText text={headline} /></h2>
			<p class="final-cta-copy"><BrandText {text} /></p>

			<div class="button-row">
				{#each ctas as cta}
					<a
						class={'btn ' + (cta.variant === 'secondary' ? 'btn-secondary' : 'btn-primary')}
						href={cta.href}
						target={cta.external ? '_blank' : undefined}
						rel={cta.external ? 'noreferrer' : undefined}
						onclick={() => cta.onclick?.()}
					>
						{cta.label}
						{#if cta.showArrow !== false}
							<span aria-hidden="true">&rarr;</span>
						{/if}
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>
