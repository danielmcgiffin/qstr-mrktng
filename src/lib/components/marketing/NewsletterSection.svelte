<script lang="ts">
	import { onMount } from 'svelte';
	import BrandText from '$lib/components/BrandText.svelte';
	import { trackEvent } from '$lib/analytics';

	let {
		id,
		headline,
		text,
		formId
	}: {
		id?: string;
		headline: string;
		text: string;
		formId: string;
	} = $props();

	let embedContainer: HTMLDivElement;
	let sectionEl: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					trackEvent('newsletter_view', { location: 'home_newsletter' });
					observer.disconnect();
				}
			},
			{ threshold: 0.5 }
		);
		observer.observe(sectionEl);

		// Beehiiv's embed only ships as <script> tags, which Svelte markup cannot
		// execute, so the loader has to be injected into the container at runtime.
		const loader = document.createElement('script');
		loader.async = true;
		loader.src = 'https://subscribe-forms.beehiiv.com/v3/loader.js';
		loader.dataset.beehiivForm = formId;
		// eslint-disable-next-line svelte/no-dom-manipulating
		embedContainer.appendChild(loader);

		const attribution = document.createElement('script');
		attribution.async = true;
		attribution.src = 'https://subscribe-forms.beehiiv.com/attribution.js';
		// eslint-disable-next-line svelte/no-dom-manipulating
		embedContainer.appendChild(attribution);

		return () => observer.disconnect();
	});
</script>

<section {id} class="marketing-section" bind:this={sectionEl}>
	<div class="marketing-container-tight">
		<div class="newsletter-cta">
			<h2 class="final-cta-title"><BrandText text={headline} /></h2>
			<p class="final-cta-copy"><BrandText {text} /></p>
			<div class="newsletter-embed" bind:this={embedContainer}></div>
		</div>
	</div>
</section>

<style>
	.newsletter-cta {
		text-align: center;
	}

	.newsletter-embed {
		margin-top: 1.5rem;
		display: flex;
		justify-content: center;
	}
</style>
