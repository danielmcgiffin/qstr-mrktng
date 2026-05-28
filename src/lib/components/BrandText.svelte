<script lang="ts">
	let { text }: { text: string } = $props();

	const parts = $derived(
		text.split(/(Quaestor|\n|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g)
	);
</script>

{#each parts as part}
	{#if part === 'Quaestor'}
		<strong class="brand-word">Quaestor</strong>
	{:else if part === '\n'}
		<br />
	{:else if part.includes('@') && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)}
		<a href="mailto:{part}" class="brand-link">{part}</a>
	{:else}
		{part}
	{/if}
{/each}

<style>
	.brand-link {
		color: rgb(var(--accent));
		font-weight: 500;
		text-decoration: none;
		border-bottom: 1px solid rgb(var(--accent) / 0.3);
		transition: all 150ms ease;
	}
	.brand-link:hover {
		color: rgb(var(--accent-deep));
		border-bottom-color: rgb(var(--accent-deep));
	}
</style>
