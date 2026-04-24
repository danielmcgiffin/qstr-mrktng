<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';

	type FooterLink = {
		label: string;
		href: string;
	};

	let {
		brand,
		tagline,
		copyrightName,
		year,
		links
	}: {
		brand: string;
		tagline: string;
		copyrightName: string;
		year: number;
		links: readonly FooterLink[];
	} = $props();
</script>

<footer class="marketing-footer">
	<div class="marketing-container">
		<div class="marketing-footer-row">
			<div>
				<div class="footer-brand"><BrandText text={brand} /></div>
				<div class="footer-muted"><BrandText text={tagline} /></div>
				<div class="footer-muted">
					&copy; {year}
					<BrandText text={copyrightName} />. All rights reserved.
				</div>
			</div>

			<nav class="footer-links" aria-label="Footer navigation">
				{#each links as link}
					<a href={link.href}>{link.label}</a>
				{/each}
			</nav>
		</div>
	</div>
</footer>
