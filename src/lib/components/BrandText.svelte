<script lang="ts">
	let { text }: { text: string } = $props();

	const parts = $derived(text.split(/(Quaestor|\n)/g));
</script>

{#each parts as part}
	{#if part === 'Quaestor'}
		<strong class="brand-word">Quaestor</strong>
	{:else if part === '\n'}
		<br />
	{:else}
		{part}
	{/if}
{/each}
