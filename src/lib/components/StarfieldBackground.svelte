<script lang="ts">
	type Variant = 'default' | 'soft';
	type Star = {
		left: number;
		top: number;
		size: number;
		opacity: number;
		driftX: number;
		driftY: number;
		floatDuration: number;
		floatDelay: number;
		twinkleDuration: number;
		twinkleDelay: number;
	};

	let { variant = 'default' }: { variant?: Variant } = $props();

	const fract = (value: number): number => value - Math.floor(value);
	const noise = (seed: number): number => fract(Math.sin(seed * 12.9898 + 78.233) * 43758.5453);
	const range = (seed: number, min: number, max: number): number => min + noise(seed) * (max - min);

	const buildLayer = (
		count: number,
		seedOffset: number,
		options: {
			minSize: number;
			maxSize: number;
			minOpacity: number;
			maxOpacity: number;
			drift: number;
			floatDuration: [number, number];
			twinkleDuration: [number, number];
		}
	): Star[] =>
		Array.from({ length: count }, (_, index) => {
			const seed = seedOffset * 1000 + index + 1;

			return {
				left: range(seed * 1.11, 0, 100),
				top: range(seed * 1.37, 0, 100),
				size: range(seed * 1.79, options.minSize, options.maxSize),
				opacity: range(seed * 2.23, options.minOpacity, options.maxOpacity),
				driftX: -range(seed * 2.71, options.drift * 0.35, options.drift),
				driftY: range(seed * 3.17, options.drift * 0.18, options.drift * 0.55),
				floatDuration: range(seed * 3.61, options.floatDuration[0], options.floatDuration[1]),
				floatDelay: -range(seed * 4.09, 0, options.floatDuration[1]),
				twinkleDuration: range(seed * 4.57, options.twinkleDuration[0], options.twinkleDuration[1]),
				twinkleDelay: -range(seed * 5.03, 0, options.twinkleDuration[1])
			};
		});

	const layers = [
		{
			className: 'star-layer star-layer-far',
			stars: buildLayer(360, 1, {
				minSize: 0.8,
				maxSize: 1.6,
				minOpacity: 0.24,
				maxOpacity: 0.6,
				drift: 18,
				floatDuration: [32, 54],
				twinkleDuration: [4, 9]
			})
		},
		{
			className: 'star-layer star-layer-mid',
			stars: buildLayer(240, 2, {
				minSize: 1.1,
				maxSize: 2.1,
				minOpacity: 0.35,
				maxOpacity: 0.82,
				drift: 26,
				floatDuration: [22, 38],
				twinkleDuration: [3.5, 8]
			})
		},
		{
			className: 'star-layer star-layer-near',
			stars: buildLayer(144, 3, {
				minSize: 1.5,
				maxSize: 2.9,
				minOpacity: 0.45,
				maxOpacity: 1,
				drift: 36,
				floatDuration: [16, 28],
				twinkleDuration: [3, 6]
			})
		},
		{
			className: 'star-layer star-layer-glow',
			stars: buildLayer(36, 4, {
				minSize: 5,
				maxSize: 12,
				minOpacity: 0.05,
				maxOpacity: 0.14,
				drift: 44,
				floatDuration: [18, 32],
				twinkleDuration: [8, 14]
			})
		}
	] as const;
</script>

<div class:soft={variant === 'soft'} class="starfield-background" aria-hidden="true">
	<div class="starfield-gradient starfield-gradient-a"></div>
	<div class="starfield-gradient starfield-gradient-b"></div>

	{#each layers as layer}
		<div class={layer.className}>
			{#each layer.stars as star}
				<span
					class="star-node"
					style={`left:${star.left.toFixed(2)}%;top:${star.top.toFixed(2)}%;width:${star.size.toFixed(2)}px;height:${star.size.toFixed(2)}px;--base-opacity:${star.opacity.toFixed(3)};--drift-x:${star.driftX.toFixed(2)}px;--drift-y:${star.driftY.toFixed(2)}px;--float-duration:${star.floatDuration.toFixed(2)}s;--float-delay:${star.floatDelay.toFixed(2)}s;--twinkle-duration:${star.twinkleDuration.toFixed(2)}s;--twinkle-delay:${star.twinkleDelay.toFixed(2)}s;`}
				>
					<span class="star-dot"></span>
				</span>
			{/each}
		</div>
	{/each}
</div>

<style>
	.starfield-background {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		opacity: 0.9;
	}

	.starfield-background.soft {
		opacity: 0.55;
	}

	.starfield-gradient {
		position: absolute;
		border-radius: 9999px;
		filter: blur(100px);
		mix-blend-mode: screen;
	}

	.starfield-gradient-a {
		top: -12%;
		left: 12%;
		height: 18rem;
		width: 18rem;
		background: radial-gradient(circle, rgb(var(--accent) / 0.22), transparent 72%);
		opacity: 0.2;
	}

	.starfield-gradient-b {
		right: 8%;
		bottom: 10%;
		height: 24rem;
		width: 24rem;
		background: radial-gradient(circle, rgb(255 255 255 / 0.12), transparent 76%);
		opacity: 0.18;
	}

	.star-layer {
		position: absolute;
		inset: -12%;
		will-change: transform;
	}

	.star-layer-far {
		opacity: 0.72;
		animation: layer-pan-far 42s linear infinite alternate;
	}

	.star-layer-mid {
		opacity: 0.88;
		animation: layer-pan-mid 28s linear infinite alternate;
	}

	.star-layer-near {
		opacity: 1;
		animation: layer-pan-near 18s linear infinite alternate;
	}

	.star-layer-glow {
		animation: layer-pan-glow 22s linear infinite alternate;
		filter: blur(0.45px);
	}

	.star-node {
		position: absolute;
		animation: star-float var(--float-duration) ease-in-out infinite alternate;
		animation-delay: var(--float-delay);
	}

	.star-dot {
		display: block;
		height: 100%;
		width: 100%;
		border-radius: 9999px;
		opacity: var(--base-opacity);
		background: radial-gradient(
			circle,
			rgba(255, 255, 255, 0.98) 0%,
			rgba(255, 255, 255, 0.9) 38%,
			rgba(255, 255, 255, 0.08) 70%,
			rgba(255, 255, 255, 0) 100%
		);
		box-shadow: 0 0 14px rgb(255 255 255 / 0.18);
		animation: star-twinkle var(--twinkle-duration) ease-in-out infinite;
		animation-delay: var(--twinkle-delay);
	}

	.star-layer-glow .star-dot {
		background: radial-gradient(
			circle,
			rgb(var(--accent) / 0.72) 0%,
			rgb(var(--accent) / 0.2) 38%,
			rgba(255, 255, 255, 0) 72%
		);
		box-shadow: 0 0 34px rgb(var(--accent) / 0.28);
	}

	@keyframes star-float {
		from {
			transform: translate3d(0, 0, 0);
		}
		to {
			transform: translate3d(var(--drift-x), var(--drift-y), 0);
		}
	}

	@keyframes star-twinkle {
		0%,
		100% {
			transform: scale(0.82);
			filter: brightness(0.82);
		}
		50% {
			transform: scale(1.18);
			filter: brightness(1.45);
		}
	}

	@keyframes layer-pan-far {
		from {
			transform: translate3d(0, 0, 0) scale(1);
		}
		to {
			transform: translate3d(-2%, 1.5%, 0) scale(1.02);
		}
	}

	@keyframes layer-pan-mid {
		from {
			transform: translate3d(0, 0, 0) scale(1);
		}
		to {
			transform: translate3d(2.4%, -1.8%, 0) scale(1.03);
		}
	}

	@keyframes layer-pan-near {
		from {
			transform: translate3d(0, 0, 0) scale(1);
		}
		to {
			transform: translate3d(-3.6%, 2.6%, 0) scale(1.05);
		}
	}

	@keyframes layer-pan-glow {
		from {
			transform: translate3d(0, 0, 0) scale(1);
		}
		to {
			transform: translate3d(3%, -2.5%, 0) scale(1.08);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.star-layer,
		.star-node,
		.star-dot {
			animation: none !important;
		}
	}
</style>
