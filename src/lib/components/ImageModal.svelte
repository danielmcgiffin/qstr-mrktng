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
		<img
			{src}
			{alt}
			class="mx-auto block max-h-[85vh] w-auto max-w-full rounded-2xl border border-[rgb(var(--border-strong))] shadow-[0_24px_60px_rgb(103_80_54_/_0.2)]"
			transition:scale={{ duration: 200, start: 0.95 }}
		/>
	</button>
{/if}
