<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';

	type Testimonial = {
		pullQuote: string;
		quote: string;
		attribution: string;
	};

	let {
		id,
		headline,
		items
	}: {
		id: string;
		headline: string;
		items: readonly Testimonial[];
	} = $props();
</script>

<section {id} class="marketing-section social-proof-section">
	<div class="marketing-container">
		<div class="section-header">
			<h2 class="section-title"><BrandText text={headline} /></h2>
		</div>

		<div class="testimonial-grid">
			{#each items as item}
				<figure class="testimonial-card">
					<blockquote>
						<p class="testimonial-pull">"<BrandText text={item.pullQuote} />"</p>
						<p class="testimonial-quote">"<BrandText text={item.quote} />"</p>
					</blockquote>
					<figcaption>
						<span aria-hidden="true">-</span>
						<cite><BrandText text={item.attribution} /></cite>
					</figcaption>
				</figure>
			{/each}
		</div>
	</div>
</section>

<style>
	.social-proof-section {
		padding-top: 2.5rem;
	}

	.testimonial-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		margin-top: 2.5rem;
	}

	.testimonial-card {
		position: relative;
		display: flex;
		min-height: 100%;
		flex-direction: column;
		justify-content: space-between;
		gap: 1.5rem;
		margin: 0;
		border: 1px solid rgb(var(--border));
		border-left: 4px solid rgb(var(--accent));
		border-radius: var(--radius-lg);
		background: rgb(var(--bg-panel));
		padding: 1.5rem;
		box-shadow: 0 10px 24px rgb(32 37 46 / 0.06);
	}

	.testimonial-card blockquote {
		margin: 0;
	}

	.testimonial-pull {
		margin: 0;
		color: rgb(var(--surface-text-strong));
		font-size: 1.125rem;
		font-weight: 700;
		line-height: 1.35;
	}

	.testimonial-quote {
		margin: 1rem 0 0;
		color: rgb(var(--muted));
		font-size: var(--fs-small);
		line-height: 1.65;
	}

	.testimonial-card figcaption {
		display: flex;
		gap: 0.45rem;
		align-items: center;
		color: rgb(var(--accent));
		font-size: var(--fs-small);
		font-weight: 700;
	}

	.testimonial-card cite {
		font-style: normal;
	}

	@media (min-width: 900px) {
		.testimonial-grid {
			grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		}
	}
</style>
