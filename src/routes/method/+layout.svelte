<script lang="ts">
	import { methodSections, methodPath } from '$lib/method';
	import { page } from '$app/stores';
	import StarfieldBackground from '$lib/components/StarfieldBackground.svelte';

	let { children } = $props();

	const pathname = $derived($page.url.pathname);
	const activeIndex = $derived(
		methodSections.findIndex((section) => pathname === methodPath(section.slug))
	);
	const isOverview = $derived(pathname === '/method' || pathname === '/method/');

	let mobileNavOpen = $state(false);

	const currentLabel = $derived(
		isOverview
			? 'Overview'
			: activeIndex >= 0
				? `${activeIndex + 1}. ${methodSections[activeIndex].title}`
				: 'Navigate'
	);
</script>

<div class="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
	<div class="relative">
		<!-- Quieter background for method pages -->
		<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
			<StarfieldBackground variant="soft" />
			<div
				class="absolute top-[-35%] left-1/2 h-[820px] w-[820px] -translate-x-1/2 rounded-full bg-white/[0.02] blur-3xl"
			></div>
			<div class="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/40"></div>
		</div>

		<section class="relative py-12 md:py-16">
			<div class="mx-auto w-full max-w-7xl px-6">
				<div class="grid gap-10 md:grid-cols-[200px_1fr] md:gap-16">
					<!-- Desktop sidebar — minimal -->
					<aside class="hidden md:block">
						<div class="md:sticky md:top-24">
							<ol class="space-y-1 text-sm">
								<li>
									<a
										class={'block rounded-lg px-3 py-1.5 transition-colors duration-200 ' +
											(isOverview
												? 'font-medium text-white'
												: 'text-[rgb(var(--muted))] hover:text-white')}
										href="/method"
									>
										Overview
									</a>
								</li>
								{#each methodSections as item, i}
									<li>
										<a
											class={'flex items-center gap-2.5 rounded-lg px-3 py-1.5 transition-colors duration-200 ' +
												(activeIndex === i
													? 'font-medium text-white'
													: 'text-[rgb(var(--muted))] hover:text-white')}
											href={methodPath(item.slug)}
										>
											<span class="w-4 text-xs text-[rgb(var(--muted))]/60 tabular-nums"
												>{String(i + 1).padStart(2, '0')}</span
											>
											<span>{item.title}</span>
										</a>
									</li>
								{/each}
							</ol>
						</div>
					</aside>

					<div class="method-page max-w-none space-y-12 text-base md:text-lg">
						<!-- Mobile nav — dropdown -->
						<div class="md:hidden">
							<button
								class="flex w-full items-center justify-between rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] px-4 py-3 text-sm text-white"
								onclick={() => (mobileNavOpen = !mobileNavOpen)}
							>
								<span>{currentLabel}</span>
								<span
									class="text-[rgb(var(--muted))] transition-transform duration-200"
									class:rotate-180={mobileNavOpen}>▾</span
								>
							</button>

							{#if mobileNavOpen}
								<ol
									class="mt-2 space-y-0.5 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-2"
								>
									<li>
										<a
											class={'block rounded-lg px-3 py-2 text-sm transition-colors ' +
												(isOverview ? 'font-medium text-white' : 'text-[rgb(var(--muted))]')}
											href="/method"
											onclick={() => (mobileNavOpen = false)}
										>
											Overview
										</a>
									</li>
									{#each methodSections as item, i}
										<li>
											<a
												class={'block rounded-lg px-3 py-2 text-sm transition-colors ' +
													(activeIndex === i
														? 'font-medium text-white'
														: 'text-[rgb(var(--muted))]')}
												href={methodPath(item.slug)}
												onclick={() => (mobileNavOpen = false)}
											>
												<span class="mr-2 text-[rgb(var(--muted))]/60 tabular-nums"
													>{String(i + 1).padStart(2, '0')}</span
												>
												{item.title}
											</a>
										</li>
									{/each}
								</ol>
							{/if}
						</div>

						{@render children()}
					</div>
				</div>
			</div>
		</section>
	</div>
</div>
