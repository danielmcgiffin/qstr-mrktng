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
		padding: 0.55rem;
		overflow: hidden;
		border: 1px solid transparent;
		border-radius: var(--radius-lg);
		background:
			linear-gradient(rgb(var(--bg-panel)), rgb(var(--bg-panel))) padding-box,
			linear-gradient(
					135deg,
					rgb(var(--border-strong)),
					rgb(var(--accent) / 0.45) 48%,
					rgb(var(--border-strong))
				)
				border-box;
		box-shadow:
			0 16px 34px rgb(32 37 46 / 0.1),
			inset 0 1px 0 rgb(255 255 255 / 0.8),
			inset 0 -1px 0 rgb(var(--border-strong) / 0.2);
		isolation: isolate;
	}

	.atlas-visual::before,
	.atlas-visual::after {
		content: '';
		position: absolute;
		pointer-events: none;
		z-index: 2;
	}

	.atlas-visual::before {
		inset: 0.55rem;
		border: 1px solid rgb(var(--border) / 0.88);
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 0.72),
			inset 0 -1px 0 rgb(var(--border-strong) / 0.18);
	}

	.atlas-visual::after {
		inset: 0.9rem;
		background:
			linear-gradient(to right, rgb(var(--accent) / 0.72), rgb(var(--border-strong))) left top /
				3.25rem 1px no-repeat,
			linear-gradient(to bottom, rgb(var(--accent) / 0.72), rgb(var(--border-strong))) left top /
				1px 3.25rem no-repeat,
			linear-gradient(to left, rgb(var(--accent) / 0.72), rgb(var(--border-strong))) right top /
				3.25rem 1px no-repeat,
			linear-gradient(to bottom, rgb(var(--accent) / 0.72), rgb(var(--border-strong))) right top /
				1px 3.25rem no-repeat,
			linear-gradient(to right, rgb(var(--accent) / 0.72), rgb(var(--border-strong))) left bottom /
				3.25rem 1px no-repeat,
			linear-gradient(to top, rgb(var(--accent) / 0.72), rgb(var(--border-strong))) left bottom /
				1px 3.25rem no-repeat,
			linear-gradient(to left, rgb(var(--accent) / 0.72), rgb(var(--border-strong))) right bottom /
				3.25rem 1px no-repeat,
			linear-gradient(to top, rgb(var(--accent) / 0.72), rgb(var(--border-strong))) right bottom /
				1px 3.25rem no-repeat;
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
		border: 1px solid rgb(var(--border));
		object-fit: cover;
	}
</style>
