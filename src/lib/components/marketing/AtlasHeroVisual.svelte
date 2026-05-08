<script lang="ts">
	import { page } from '$app/stores';

	const proxyPrefix = $derived.by(() => {
		const match = $page.url.pathname.match(/^\/proxy\/\d+/);
		return match ? match[0] : '';
	});
</script>

<figure class="atlas-visual" aria-labelledby="atlas-visual-title">
	<figcaption id="atlas-visual-title" class="sr-only">Quaestor Helices</figcaption>

	<img
		src="{proxyPrefix}/quaestor-helices.png"
		alt="Abstract Quaestor atlas relationship visual"
		class="helices-image"
		width="1200"
		height="1200"
		loading="eager"
		decoding="async"
		fetchpriority="high"
	/>
</figure>

<style>
	.atlas-visual {
		position: relative;
		width: 100%;
		margin: 0;
		overflow: hidden;
		border: 1px solid rgb(var(--border-strong));
		border-radius: var(--radius-lg);
		background: rgb(var(--bg-panel));
		box-shadow:
			0 12px 30px rgb(32 37 46 / 0.08),
			inset 0 1px 0 rgb(255 255 255 / 0.74);
		isolation: isolate;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.helices-image {
		display: block;
		width: 100%;
		height: auto;
		object-fit: cover;
	}
</style>
