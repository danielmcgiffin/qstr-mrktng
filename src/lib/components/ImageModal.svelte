<script lang="ts">
	import { fade, scale } from 'svelte/transition';

	let {
		src,
		alt,
		onClose
	}: {
		src: string | null;
		alt: string;
		onClose: () => void;
	} = $props();

	const isVideo = $derived(Boolean(src && /\.(webm|mp4)$/i.test(src)));
	const mediaClass =
		'mx-auto block h-auto max-h-[92vh] max-w-[calc(100vw-2rem)] rounded-2xl border border-[rgb(var(--border-strong))] object-contain shadow-[0_24px_60px_rgb(103_80_54_/_0.2)] sm:max-w-[calc(100vw-4rem)]';

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape' && src) {
			onClose();
		}
	};
</script>

<svelte:window onkeydown={handleKeydown} />

{#if src}
	<button
		type="button"
		class="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-[rgb(var(--bg-panel))]/90 p-4 backdrop-blur-sm sm:p-8"
		onclick={onClose}
		aria-label="Close modal"
		transition:fade={{ duration: 150 }}
	>
		{#if isVideo}
			<video
				{src}
				aria-label={alt}
				autoplay
				loop
				muted
				playsinline
				class={mediaClass}
				transition:scale={{ duration: 200, start: 0.95 }}
			></video>
		{:else}
			<img
				{src}
				{alt}
				class={mediaClass}
				transition:scale={{ duration: 200, start: 0.95 }}
			/>
		{/if}
	</button>
{/if}
