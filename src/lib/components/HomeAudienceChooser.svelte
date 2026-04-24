<script lang="ts">
	import { trackEvent } from '$lib/analytics';

	type AudienceView = 'partners' | 'operators';
	type AudienceOption = {
		id: AudienceView;
		label: string;
		href: string;
	};

	let { activeView }: { activeView: AudienceView } = $props();

	const options: AudienceOption[] = [
		{
			id: 'partners',
			label: 'For partners',
			href: '/'
		},
		{
			id: 'operators',
			label: 'For operators',
			href: '/ops'
		}
	];

	const handleSwitchClick = (target: AudienceView) => {
		if (target === activeView) return;
		trackEvent('home_view_switch', { from: activeView, to: target });
	};
</script>

<div
	class="mx-auto mb-6 max-w-4xl rounded-[1.2rem] border border-[rgb(var(--border))] bg-white/84 px-3 py-1.5 shadow-[0_6px_14px_rgb(103_80_54_/_0.05)] backdrop-blur"
>
	<div class="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
		<div class="min-w-0 px-1">
			<p class="text-[10px] font-semibold tracking-[0.24em] text-[rgb(var(--muted))] uppercase">
				Choose your route
			</p>
			<p class="mt-0.5 text-xs text-[rgb(var(--muted))]">Same product, different starting point</p>
		</div>

		<div
			class="grid w-full gap-1 rounded-[0.9rem] border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-1 sm:w-auto sm:min-w-[360px] sm:grid-cols-2"
		>
			{#each options as option}
				<a
					class={`rounded-[0.75rem] px-4 py-1.5 text-center text-sm font-semibold transition-all duration-200 ${
						option.id === activeView
							? 'bg-[rgb(var(--accent))] text-[rgb(var(--bg-elev))] shadow-[0_1px_0_rgb(255_255_255_/_0.18)]'
							: 'text-[rgb(var(--text-secondary))] hover:bg-white hover:text-[rgb(var(--text))]'
					}`}
					href={option.href}
					onclick={() => handleSwitchClick(option.id)}
				>
					{option.label}
				</a>
			{/each}
		</div>
	</div>
</div>
