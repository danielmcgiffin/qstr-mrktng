<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
	import { docsContent } from './content';
	import MarketingFooter from '$lib/components/marketing/MarketingFooter.svelte';

	let { children } = $props();

	// Normalize pathname to strip proxy prefix and trailing slashes for routing checks
	const pathname = $derived($page.url.pathname);
	const normalizedPathname = $derived.by(() => {
		const stripped = pathname.replace(/^\/proxy\/\d+(?=\/|$)/, '') || '/';
		if (stripped === '/') return stripped;
		return stripped.replace(/\/+$/, '') || '/';
	});

	const isOverview = $derived(normalizedPathname === '/docs');

	let mobileNavOpen = $state(false);

	// Helper to check if a topic's href matches the current page
	const isActive = (href: string | undefined) => {
		if (!href) return false;
		const cleanHref = href.replace(/\/+$/, '');
		return normalizedPathname === cleanHref;
	};

	const activeTopicLabel = $derived.by(() => {
		for (const section of docsContent.sections) {
			for (const topic of section.topics) {
				if (isActive(topic.href)) {
					return topic.label;
				}
			}
		}
		return 'Navigate';
	});
</script>

<div class="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
	<div class="relative">
		{#if isOverview}
			{@render children()}
		{:else}
			<section class="relative py-12 md:py-16">
				<div class="mx-auto w-full max-w-7xl px-6">
					<div class="grid gap-10 md:grid-cols-[220px_1fr] md:gap-16">
						<!-- Desktop sidebar -->
						<aside class="hidden md:block">
							<div class="max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 md:sticky md:top-24">
								<a class="docs-back-to-index" href={resolve('/docs')}> &larr; Back to Index </a>
								<div class="space-y-6">
									{#each docsContent.sections as section}
										<div class="sidebar-group">
											<h3 class="sidebar-group-title">
												{section.title}
											</h3>
											<ul class="sidebar-group-list">
												{#each section.topics as topic}
													<li>
														{#if topic.href}
															<a
																class="sidebar-link"
																class:active={isActive(topic.href)}
																href={resolve(topic.href as '/')}
															>
																{topic.label}
															</a>
														{/if}
													</li>
												{/each}
											</ul>
										</div>
									{/each}
								</div>
							</div>
						</aside>

						<!-- Main content container -->
						<div class="w-full max-w-3xl space-y-12">
							<!-- Mobile nav — dropdown -->
							<div class="mb-6 md:hidden">
								<button
									class="flex w-full items-center justify-between rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] px-4 py-3 text-sm text-[rgb(var(--accent))]"
									onclick={() => (mobileNavOpen = !mobileNavOpen)}
								>
									<span>{activeTopicLabel}</span>
									<span
										class="text-[rgb(var(--muted))] transition-transform duration-200"
										class:rotate-180={mobileNavOpen}>▾</span
									>
								</button>

								{#if mobileNavOpen}
									<div
										class="mt-2 max-h-[300px] space-y-4 overflow-y-auto rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-3"
									>
										<a
											class="mb-2 block text-xs font-semibold tracking-wider text-[rgb(var(--accent))] uppercase"
											href={resolve('/docs')}
											onclick={() => (mobileNavOpen = false)}
										>
											&larr; Docs Index
										</a>
										{#each docsContent.sections as section}
											<div>
												<h4
													class="mb-1.5 text-[10px] font-bold tracking-wider text-[rgb(var(--muted))] uppercase"
												>
													{section.title}
												</h4>
												<ul class="space-y-1 text-sm">
													{#each section.topics as topic}
														{#if topic.href}
															<li>
																<a
																	class="mobile-dropdown-link"
																	class:active={isActive(topic.href)}
																	href={resolve(topic.href as '/')}
																	onclick={() => (mobileNavOpen = false)}
																>
																	{topic.label}
																</a>
															</li>
														{/if}
													{/each}
												</ul>
											</div>
										{/each}
									</div>
								{/if}
							</div>

							{@render children()}
						</div>
					</div>
				</div>
			</section>
			<MarketingFooter />
		{/if}
	</div>
</div>

<style>
	.docs-back-to-index {
		display: inline-block;
		margin-bottom: 1.5rem;
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		font-weight: 500;
		letter-spacing: var(--ls-label);
		text-transform: uppercase;
		color: rgb(var(--accent));
		text-decoration: none;
		transition: color 160ms ease;
	}

	.docs-back-to-index:hover {
		color: rgb(var(--accent-deep));
		text-decoration: underline;
	}

	.sidebar-group {
		margin-bottom: 1.5rem;
	}

	.sidebar-group-title {
		margin: 0 0 0.5rem 0;
		font-family: var(--font-body);
		font-size: var(--fs-micro);
		font-weight: 600;
		letter-spacing: var(--ls-label);
		text-transform: uppercase;
		color: rgb(var(--text-muted));
	}

	.sidebar-group-list {
		margin: 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 0.25rem;
	}

	.sidebar-link {
		display: block;
		border-radius: var(--radius-sm);
		padding: 0.35rem 0.65rem;
		font-size: var(--fs-small);
		color: rgb(var(--text-muted));
		text-decoration: none;
		transition: all 160ms ease;
	}

	.sidebar-link:hover {
		color: rgb(var(--text));
		background: rgb(var(--bg-subtle));
	}

	.sidebar-link.active {
		font-weight: 500;
		color: rgb(var(--accent));
		background: rgb(var(--accent-tint));
	}

	.mobile-dropdown-link {
		display: block;
		border-radius: var(--radius-sm);
		padding: 0.25rem 0.5rem;
		font-size: var(--fs-small);
		color: rgb(var(--text-muted));
		text-decoration: none;
		transition: all 160ms ease;
	}

	.mobile-dropdown-link:hover {
		color: rgb(var(--text));
		background: rgb(var(--bg-subtle));
	}

	.mobile-dropdown-link.active {
		font-weight: 500;
		color: rgb(var(--accent));
		background: rgb(var(--accent-tint));
	}
</style>
