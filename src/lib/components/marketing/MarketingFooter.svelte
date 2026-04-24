<script lang="ts">
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
				<div class="footer-brand">{brand}</div>
				<div class="footer-muted">{tagline}</div>
				<div class="footer-muted">&copy; {year} {copyrightName}. All rights reserved.</div>
			</div>

			<nav class="footer-links" aria-label="Footer navigation">
				{#each links as link}
					<a href={link.href}>{link.label}</a>
				{/each}
			</nav>
		</div>
	</div>
</footer>
