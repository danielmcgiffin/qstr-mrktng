<script lang="ts">
	import { trackEvent } from '$lib/analytics';
	import StarfieldBackground from '$lib/components/StarfieldBackground.svelte';
</script>

<svelte:head>
	<title>Contact — Quaestor Partners</title>
	<meta
		name="description"
		content="Talk with Quaestor about partner fit, client deployment support, or direct team rollout."
	/>
</svelte:head>

<div class="min-h-screen overflow-x-hidden bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
	<div class="relative">
		<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
			<StarfieldBackground variant="soft" />
			<div
				class="absolute top-[-28%] left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-white/[0.04] blur-3xl"
			></div>
			<div class="absolute inset-0 bg-gradient-to-b from-black/0 via-black/16 to-black/45"></div>
		</div>

		<section class="relative py-20 md:py-24">
			<div class="mx-auto w-full max-w-5xl px-6">
				<div class="mx-auto max-w-3xl text-center">
					<span
						class="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-white/5 px-3 py-1 text-xs text-white/80"
					>
						Contact
					</span>
					<h1 class="mt-5 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
						Let's talk partner fit
					</h1>
					<p class="mt-4 text-pretty text-[rgb(var(--muted))] md:text-lg">
						Partner-first is our default motion. If you deploy ops systems for clients, we'll map
						fit and next steps. Direct operator teams can also start here.
					</p>
				</div>

				<div class="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
					<div class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-6">
						<h2 class="text-base font-semibold">Partners and fractionals</h2>
						<p class="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">
							If you deploy ops systems across client engagements, let's align on fit, motion, and
							your first rollout.
						</p>
						<a
							class="mt-6 inline-flex rounded-xl bg-[rgb(var(--accent))] px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:brightness-110"
							href="/partners"
							onclick={() =>
								trackEvent('partner_intake_click', { location: 'contact_partner_card' })}
						>
							View partner details
						</a>
						<div class="mt-3">
							<a
								class="inline-flex text-sm text-[rgb(var(--muted))] hover:text-white"
								href="https://cal.com/danny-cursus/15min"
								target="_blank"
								rel="noreferrer"
								onclick={() => trackEvent('booking_click', { location: 'contact_partner_card' })}
							>
								Or book directly →
							</a>
						</div>
					</div>

					<div class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-6">
						<h2 class="text-base font-semibold">Direct teams</h2>
						<p class="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">
							If you're an operator team working without a partner, we can still walk your first
							bottleneck workflow and scope rollout support.
						</p>
						<a
							class="mt-6 inline-flex rounded-xl border border-[rgb(var(--border))] bg-white/5 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
							href="https://cal.com/danny-cursus/15min"
							target="_blank"
							rel="noreferrer"
							onclick={() => trackEvent('booking_click', { location: 'contact_direct_card' })}
						>
							Book a 15-min call →
						</a>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>
