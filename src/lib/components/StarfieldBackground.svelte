<script lang="ts">
	type Variant = 'default' | 'soft';

	let { variant = 'default' }: { variant?: Variant } = $props();
</script>

<div class:soft={variant === 'soft'} class="atlas-background" aria-hidden="true">
	<div class="paper-wash paper-wash-a"></div>
	<div class="paper-wash paper-wash-b"></div>
	<div class="atlas-grid"></div>
	<div class="atlas-contours atlas-contours-a"></div>
	<div class="atlas-contours atlas-contours-b"></div>
	<div class="atlas-compass"></div>
</div>

<style>
	.atlas-background {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		opacity: 1;
	}

	.atlas-background.soft {
		opacity: 0.62;
	}

	.paper-wash,
	.atlas-grid,
	.atlas-contours,
	.atlas-compass {
		position: absolute;
	}

	.paper-wash {
		filter: blur(72px);
		border-radius: 9999px;
	}

	.paper-wash-a {
		top: -10%;
		left: -6%;
		height: 26rem;
		width: 32rem;
		background: radial-gradient(circle, rgb(var(--accent) / 0.16), transparent 68%);
		opacity: 0.42;
	}

	.paper-wash-b {
		right: -10%;
		bottom: -8%;
		height: 30rem;
		width: 34rem;
		background: radial-gradient(circle, rgb(var(--map-line) / 0.14), transparent 70%);
		opacity: 0.36;
	}

	.atlas-grid {
		inset: -8%;
		opacity: 0.28;
		background-image:
			linear-gradient(rgb(var(--map-line) / 0.1) 1px, transparent 1px),
			linear-gradient(90deg, rgb(var(--map-line) / 0.08) 1px, transparent 1px);
		background-size: 108px 108px;
		mask-image: radial-gradient(circle at center, black 28%, transparent 92%);
	}

	.atlas-contours {
		inset: -14%;
		mix-blend-mode: multiply;
		opacity: 0.34;
		will-change: transform;
	}

	.atlas-contours-a {
		background-image: repeating-radial-gradient(
			circle at 18% 28%,
			rgb(var(--map-line) / 0.18) 0 1px,
			transparent 1px 18px
		);
		transform: rotate(-11deg) scale(1.12);
		animation: atlas-drift-a 34s ease-in-out infinite alternate;
	}

	.atlas-contours-b {
		background-image: repeating-radial-gradient(
			circle at 76% 62%,
			rgb(var(--map-line) / 0.14) 0 1px,
			transparent 1px 22px
		);
		transform: rotate(9deg) scale(1.08);
		animation: atlas-drift-b 42s ease-in-out infinite alternate;
	}

	.atlas-compass {
		top: 12%;
		right: 8%;
		height: 11rem;
		width: 11rem;
		border-radius: 9999px;
		border: 1px solid rgb(var(--map-line) / 0.16);
		opacity: 0.4;
		background:
			radial-gradient(
				circle,
				transparent 0 48%,
				rgb(var(--map-line) / 0.1) 48% 49%,
				transparent 49%
			),
			linear-gradient(rgb(var(--map-line) / 0.16), rgb(var(--map-line) / 0.16)) center / 1px 100%
				no-repeat,
			linear-gradient(90deg, rgb(var(--map-line) / 0.16), rgb(var(--map-line) / 0.16)) center / 100%
				1px no-repeat;
		transform: rotate(14deg);
	}

	.atlas-compass::before,
	.atlas-compass::after {
		content: '';
		position: absolute;
		inset: 12%;
		border-radius: 9999px;
		border: 1px dashed rgb(var(--map-line) / 0.14);
	}

	.atlas-compass::after {
		inset: 28%;
		border-style: solid;
		opacity: 0.7;
	}

	@keyframes atlas-drift-a {
		from {
			transform: rotate(-11deg) scale(1.12) translate3d(0, 0, 0);
		}
		to {
			transform: rotate(-9deg) scale(1.15) translate3d(2%, -2%, 0);
		}
	}

	@keyframes atlas-drift-b {
		from {
			transform: rotate(9deg) scale(1.08) translate3d(0, 0, 0);
		}
		to {
			transform: rotate(11deg) scale(1.12) translate3d(-2.5%, 2%, 0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.atlas-contours {
			animation: none !important;
		}
	}
</style>
