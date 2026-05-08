<script lang="ts">
	import { trackEvent } from '$lib/analytics';

	const seo = {
		title: 'Contact - Quaestor Partners',
		description: 'Talk with Quaestor about partner fit, client rollout, or direct team deployment.',
		ogTitle: "Let's test fit.",
		ogDescription:
			'For ops partners, fractionals, and operator teams ready to map the first bottleneck.'
	};
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta property="og:title" content={seo.ogTitle} />
	<meta property="og:description" content={seo.ogDescription} />
	<meta property="og:image:alt" content="Quaestor operational atlas interface preview." />
	<meta name="twitter:title" content={seo.ogTitle} />
	<meta name="twitter:description" content={seo.ogDescription} />
	<meta name="twitter:image:alt" content="Quaestor operational atlas interface preview." />
</svelte:head>

<div class="min-h-screen overflow-x-hidden bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
	<div class="relative">
		<section class="relative py-20 md:py-24">
			<div class="mx-auto w-full max-w-5xl px-6">
				<div class="mx-auto max-w-3xl text-center">
					<span
						class="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-[rgb(var(--accent))]/20 bg-[rgb(var(--accent))]/5 px-3 py-1 text-xs text-[rgb(var(--accent))]"
					>
						Contact
					</span>
					<h1 class="mt-5 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
						Let's test fit.
					</h1>
					<p class="mt-4 text-pretty text-[rgb(var(--muted))] md:text-lg">
						Partner-first is the default. If you deploy ops systems, we map fit and next steps.
						Direct teams can start here too.
					</p>
				</div>

				<div class="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
					<div class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-6">
						<h2 class="text-base font-semibold">Partners and fractionals</h2>
						<p class="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">
							Bring the client bottleneck. We will map fit, motion, and the first rollout.
						</p>
						<a
							class="btn btn-primary mt-6"
							href="/partners"
							onclick={() =>
								trackEvent('partner_intake_click', { location: 'contact_partner_card' })}
						>
							View partner details
						</a>
						<div class="mt-3">
							<a
								class="inline-flex text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--surface-text-strong))]"
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
							No partner? Bring the workflow that keeps breaking. We will scope the next move.
						</p>
						<a
							class="btn btn-secondary mt-6"
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
