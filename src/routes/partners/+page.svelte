<script lang="ts">
	import RotatingWords from '$lib/components/RotatingWords.svelte';
	import { trackEvent } from '$lib/analytics';
	import { site } from '$lib/site-partners';

	const year = new Date().getFullYear();

	const showPartnerApply = $derived(site.partnerApply.live);

	const trackPartnerCall = (location: string) => {
		trackEvent('booking_click', { location });
	};

	const trackDemoClick = (location: string) => {
		trackEvent('demo_click', { location });
	};

	const trackPartnerApply = (location: string) => {
		trackEvent('partner_intake_click', { location });
	};

	const trackSignupStart = (location: string) => {
		trackEvent('signup_start', { location });
	};
</script>

<svelte:head>
	<title>Quaestor — Partner-first operational atlas</title>
	<meta
		name="description"
		content="Quaestor helps ops partners turn their client delivery into a living operational atlas that stays useful after the engagement ends."
	/>
</svelte:head>

<div class="min-h-screen overflow-x-hidden bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
	<div class="relative">
		<!-- ═══════════════════════════════════════ -->
		<!-- HERO                                    -->
		<!-- ═══════════════════════════════════════ -->
		<section class="relative py-14 md:py-20">
			<div class="mx-auto w-full max-w-5xl px-6">
				<div class="mx-auto max-w-4xl text-center">
					<span class="label-cap">{site.hero.kicker}</span>

					<h1
						class="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-[rgb(var(--text))] md:text-6xl"
					>
						<span class="grid w-full grid-cols-1 items-baseline md:grid-cols-2">
							<span
								class="text-center whitespace-nowrap text-[rgb(var(--text))] md:pr-2 md:text-right"
								>{site.hero.headline}&nbsp;</span
							>
							<span class="mt-2 text-center whitespace-nowrap md:mt-0 md:text-left">
								<RotatingWords words={site.hero.rotatingWords} />
							</span>
						</span>
					</h1>

					<p
						class="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-pretty text-[rgb(var(--muted))] md:text-lg"
					>
						{site.hero.subhead}
					</p>

					<div
						class="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
					>
						<a
							class="w-full min-w-[170px] rounded-xl bg-[rgb(var(--accent))] px-4 py-2 text-center text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:brightness-110 sm:w-auto"
							href={site.hero.primaryCta.href}
							target="_blank"
							rel="noreferrer"
							onclick={() => trackPartnerCall('partners_hero_primary')}
						>
							{site.hero.primaryCta.label} →
						</a>

						<a
							class="w-full min-w-[170px] rounded-xl border border-[rgb(var(--border-strong))] bg-[rgb(var(--bg-elev))] px-4 py-2 text-center text-sm font-medium text-[rgb(var(--surface-text-strong))] shadow-sm transition hover:border-[rgb(var(--accent))]/30 hover:bg-[rgb(var(--bg-elev-2))] sm:w-auto"
							href={site.hero.secondaryCta.href}
							onclick={() => trackDemoClick('partners_hero_secondary')}
						>
							{site.hero.secondaryCta.label}
						</a>
					</div>

					<div class="mx-auto mt-12 max-w-4xl">
						<div
							class="overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-black/70 shadow-2xl"
						>
							<video autoplay loop muted playsinline class="block w-full">
								<source src="/qstr-demo.webm" type="video/webm" />
								<source src="/qstr-demo.mp4" type="video/mp4" />
							</video>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════ -->
		<!-- PAIN                                    -->
		<!-- ═══════════════════════════════════════ -->
		<section id="problem" class="relative py-16 md:py-24">
			<div class="mx-auto w-full max-w-6xl px-6">
				<div class="mx-auto max-w-3xl text-center">
					<h2 class="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
						{site.forYou.headline}
					</h2>
					<p class="mx-auto mt-4 max-w-3xl text-pretty text-[rgb(var(--muted))] md:text-lg">
						{site.forYou.intro}
					</p>
				</div>

				<div class="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
					{#each site.forYou.bullets as bullet}
						<div
							class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] px-6 py-5"
						>
							<p class="text-sm leading-relaxed text-[rgb(var(--muted))] md:text-base">{bullet}</p>
						</div>
					{/each}
				</div>

				<p
					class="mx-auto mt-8 max-w-3xl text-center text-lg leading-relaxed font-medium text-[rgb(var(--surface-text-strong))]"
				>
					{site.forYou.punchline}
				</p>
			</div>
		</section>

		<!-- ═══════════════════════════════════════ -->
		<!-- DIAGNOSIS                               -->
		<!-- ═══════════════════════════════════════ -->
		<section id="why" class="relative py-16 md:py-24">
			<div class="mx-auto w-full max-w-6xl px-6">
				<div class="mx-auto max-w-3xl text-center">
					<h2 class="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
						{site.shadowOps.headline}
					</h2>
					<p class="mx-auto mt-4 max-w-3xl text-pretty text-[rgb(var(--muted))] md:text-lg">
						{site.shadowOps.subhead}
					</p>
				</div>

				<div class="mt-10 grid gap-4 md:grid-cols-3">
					{#each site.shadowOps.points as point}
						<div
							class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-6"
						>
							<h3 class="text-base font-semibold text-[rgb(var(--surface-text-strong))]">
								{point.title}
							</h3>
							<p class="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">{point.desc}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════ -->
		<!-- MECHANISM                               -->
		<!-- ═══════════════════════════════════════ -->
		<section id="workflow" class="relative py-16 md:py-24">
			<div class="mx-auto w-full max-w-6xl px-6">
				<div class="mx-auto max-w-3xl text-center">
					<h2 class="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
						{site.howItWorks.headline}
					</h2>
					<p class="mt-4 text-pretty text-[rgb(var(--muted))] md:text-lg">
						{site.howItWorks.subhead}
					</p>
				</div>

				<div class="mx-auto mt-10 max-w-4xl space-y-3">
					{#each site.howItWorks.steps as step}
						<div
							class="flex gap-4 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-5"
						>
							<div class="shrink-0">
								<div
									class="inline-flex items-center rounded-full border border-[rgb(var(--accent))] bg-[rgb(var(--bg-panel))] px-2.5 py-1 font-mono text-[11px] text-[rgb(var(--accent))]"
								>
									{step.n}
								</div>
							</div>
							<div>
								<h3
									class="text-sm font-semibold text-[rgb(var(--surface-text-strong))] md:text-base"
								>
									{step.title}
								</h3>
								<p class="mt-1 text-sm leading-relaxed text-[rgb(var(--muted))] md:text-base">
									{step.desc}
								</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════ -->
		<!-- PROOF                                   -->
		<!-- ═══════════════════════════════════════ -->
		<section id="proof" class="relative py-16 md:py-24">
			<div class="mx-auto w-full max-w-6xl px-6">
				<div class="mx-auto max-w-3xl text-center">
					<h2 class="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
						{site.proof.headline}
					</h2>
					<p class="mt-4 text-pretty text-[rgb(var(--muted))] md:text-lg">{site.proof.subhead}</p>
				</div>

				<div class="mt-10 grid gap-4 md:grid-cols-3">
					{#each site.proof.items as item}
						<div
							class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-6"
						>
							{#if item.gifSrc}
								<div
									class="mb-6 overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-panel))]"
								>
									<img src={item.gifSrc} alt={item.title} class="block w-full" loading="lazy" />
								</div>
							{/if}
							<h3 class="text-base font-semibold text-[rgb(var(--surface-text-strong))]">
								{item.title}
							</h3>
							<p class="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">{item.desc}</p>
						</div>
					{/each}
				</div>

				<div class="mx-auto mt-12 max-w-3xl">
					<h3 class="text-center text-xl font-semibold tracking-tight text-balance md:text-2xl">
						{site.faq.headline}
					</h3>
					<div class="mt-6 space-y-3">
						{#each site.faq.items as item}
							<details
								class="group rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-5"
							>
								<summary class="flex cursor-pointer list-none items-center justify-between gap-4">
									<span class="text-sm font-semibold md:text-base">{item.q}</span>
									<span
										class="text-[rgb(var(--surface-text-muted))] transition group-open:rotate-90"
										>›</span
									>
								</summary>
								<p class="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] md:text-base">
									{item.a}
								</p>
							</details>
						{/each}
					</div>

					<div class="mt-8 text-center">
						<a
							class="inline-flex min-w-[170px] items-center justify-center rounded-xl border border-[rgb(var(--border-strong))] bg-[rgb(var(--bg-elev))] px-4 py-2 text-sm font-medium text-[rgb(var(--surface-text-strong))] transition hover:border-[rgb(var(--accent))]/30 hover:bg-[rgb(var(--bg-elev-2))]"
							href={site.hero.secondaryCta.href}
							onclick={() => trackDemoClick('partners_proof_demo')}
						>
							See the demo
						</a>
					</div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════ -->
		<!-- PRICING                                 -->
		<!-- ═══════════════════════════════════════ -->
		<section id="pricing" class="relative py-16 md:py-24">
			<div class="mx-auto w-full max-w-6xl px-6">
				<div class="mx-auto max-w-3xl text-center">
					<h2 class="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
						{site.pricing.headline}
					</h2>
					<p class="mt-4 text-pretty text-[rgb(var(--muted))] md:text-lg">{site.pricing.subhead}</p>
				</div>

				<div class="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
					{#each site.pricing.plans as plan}
						<div
							class={'relative flex flex-col rounded-2xl border p-6 shadow-sm ' +
								(plan.featured
									? 'border-[rgb(var(--border-strong))] bg-[rgb(var(--bg-elev-2))]'
									: 'border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))]')}
						>
							<div class="flex items-baseline justify-between gap-4">
								<h3 class="text-lg font-semibold">{plan.name}</h3>
								<div class="text-sm text-[rgb(var(--muted))]">/mo</div>
							</div>
							<div class="mt-3 text-3xl font-semibold">{plan.price}</div>
							<p class="mt-2 text-sm leading-relaxed text-[rgb(var(--muted))]">{plan.desc}</p>

							<ul class="mt-6 space-y-2 text-sm text-[rgb(var(--muted))]">
								{#each plan.perks as perk}
									<li class="flex items-start gap-2">
										<span class="mt-0.5 text-[rgb(var(--surface-text-muted))]">✓</span><span
											>{perk}</span
										>
									</li>
								{/each}
							</ul>

							<div class="mt-auto pt-8">
								<a
									class="block w-full rounded-xl bg-[rgb(var(--accent))] px-4 py-2 text-center text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:brightness-110"
									href={plan.cta.href}
									onclick={() => trackSignupStart(`partners_pricing_${plan.name.toLowerCase()}`)}
								>
									{plan.cta.label}
								</a>
							</div>
						</div>
					{/each}
				</div>

				{#if site.pricing.freeLink}
					<div class="mt-6 text-center">
						<a
							class="inline-flex items-center text-sm font-medium text-[rgb(var(--accent))] hover:text-[rgb(var(--accent-deep))]"
							href={site.pricing.freeLink.href}
							onclick={() => trackSignupStart('partners_pricing_free_link')}
						>
							{site.pricing.freeLink.label}
						</a>
					</div>
				{/if}
			</div>
		</section>

		<!-- ═══════════════════════════════════════ -->
		<!-- FINAL CTA                               -->
		<!-- ═══════════════════════════════════════ -->
		<section class="relative py-16 md:py-24">
			<div class="mx-auto w-full max-w-4xl px-6">
				<div
					class="rounded-2xl border border-[rgb(var(--border-strong))] bg-[rgb(var(--bg-elev-2))] px-8 py-10 text-center md:px-12"
				>
					<h2 class="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
						{site.finalCta.headline}
					</h2>
					<p class="mx-auto mt-4 max-w-2xl text-pretty text-[rgb(var(--muted))] md:text-lg">
						{site.finalCta.text}
					</p>
					<div class="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
						<a
							class="inline-flex min-w-[170px] items-center justify-center rounded-xl bg-[rgb(var(--accent))] px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:brightness-110"
							href={site.finalCta.primaryCta.href}
							target="_blank"
							rel="noreferrer"
							onclick={() => trackPartnerCall('partners_final_cta_primary')}
						>
							{site.finalCta.primaryCta.label} →
						</a>

						{#if showPartnerApply}
							<a
								class="inline-flex min-w-[170px] items-center justify-center rounded-xl border border-[rgb(var(--border-strong))] bg-[rgb(var(--bg-elev))] px-4 py-2 text-sm font-medium text-[rgb(var(--surface-text-strong))] shadow-sm transition hover:border-[rgb(var(--accent))]/30 hover:bg-[rgb(var(--bg-elev-2))]"
								href={site.partnerApply.href}
								target="_blank"
								rel="noreferrer"
								onclick={() => trackPartnerApply('partners_final_cta_apply')}
							>
								{site.partnerApply.label}
							</a>
						{/if}
					</div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════ -->
		<!-- FOOTER                                  -->
		<!-- ═══════════════════════════════════════ -->
		<footer class="relative border-t border-[rgb(var(--border))] py-12">
			<div class="mx-auto w-full max-w-6xl px-6">
				<div class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
					<div>
						<div class="text-sm font-semibold">{site.brand}</div>
						<div class="mt-2 text-xs text-[rgb(var(--muted))]">{site.footer.tagline}</div>
						<div class="mt-3 text-xs text-[rgb(var(--muted))]">
							© {year}
							{site.footer.copyrightName}. All rights reserved.
						</div>
					</div>

					<div class="flex flex-wrap gap-4 text-sm text-[rgb(var(--muted))]">
						<a class="hover:text-[rgb(var(--surface-text-strong))]" href="#problem">Problem</a>
						<a class="hover:text-[rgb(var(--surface-text-strong))]" href="#proof">Proof</a>
						<a class="hover:text-[rgb(var(--surface-text-strong))]" href="#pricing">Pricing</a>
						<a class="hover:text-[rgb(var(--surface-text-strong))]" href="/method">Method</a>
						<a class="hover:text-[rgb(var(--surface-text-strong))]" href="/ops">Operators</a>
					</div>
				</div>
			</div>
		</footer>
	</div>
</div>
