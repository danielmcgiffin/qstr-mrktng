<script lang="ts">
	let { text }: { text: string } = $props();

	type Token =
		| { type: 'text'; value: string; bold: boolean }
		| { type: 'brand'; value: string; bold: boolean }
		| { type: 'email'; value: string; bold: boolean }
		| { type: 'newline' };

	const tokens = $derived.by<Token[]>(() => {
		const rawParts = text.split(
			/(Quaestor|\n|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\*\*)/g
		);
		const result: Token[] = [];
		let isBold = false;

		for (const part of rawParts) {
			if (!part) continue;
			if (part === '**') {
				isBold = !isBold;
			} else if (part === 'Quaestor') {
				result.push({ type: 'brand', value: part, bold: isBold });
			} else if (part === '\n') {
				result.push({ type: 'newline' });
			} else if (
				part.includes('@') &&
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)
			) {
				result.push({ type: 'email', value: part, bold: isBold });
			} else {
				result.push({ type: 'text', value: part, bold: isBold });
			}
		}
		return result;
	});
</script>

{#each tokens as token}
	{#if token.type === 'brand'}
		<strong class="brand-word">Quaestor</strong>
	{:else if token.type === 'newline'}
		<br />
	{:else if token.bold}
		{#if token.type === 'email'}
			<a href="mailto:{token.value}" class="brand-link"><strong>{token.value}</strong></a>
		{:else}
			<strong>{token.value}</strong>
		{/if}
	{:else if token.type === 'email'}
		<a href="mailto:{token.value}" class="brand-link">{token.value}</a>
	{:else}
		{token.value}
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
