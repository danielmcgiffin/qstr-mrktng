<script lang="ts">
	import MarketingFooter from '$lib/components/marketing/MarketingFooter.svelte';
	import { atlasEngagementContent as content } from '$lib/atlas-engagement-content';
	import { site } from '$lib/site';

	const year = new Date().getFullYear();
	const footerLinks = [
		{ label: 'Home', href: '/' },
		{ label: 'Method', href: '/method' },
		{ label: 'Partners', href: '/partners' },
		{ label: 'Contact', href: '/contact' }
	] as const;
</script>

<svelte:head>
	<title>The Atlas Engagement — Quaestor</title>
	<meta
		name="description"
		content="Take a real vacation in 30 days. The Atlas Engagement turns operational chaos into a working map of your business in 4 weeks. Fixed price. Delivered or it's free."
	/>
</svelte:head>

<div data-theme="dark" class="atlas-page min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
	<div class="mx-auto w-full max-w-7xl px-6 py-10 sm:py-12">
		<section
			class="mx-auto max-w-4xl rounded-3xl border border-[rgb(var(--border))] bg-white/5 p-6 sm:p-8"
		>
			<p class="label-cap !text-[rgb(var(--accent))]">{content.eyebrow}</p>
			<h1
				class="mt-4 text-4xl leading-[1.05] font-[var(--font-display)] font-semibold text-balance text-[rgb(var(--text))] sm:text-6xl"
			>
				{content.headline}
			</h1>
			<p class="mt-4 text-xl font-medium text-[rgb(var(--text))] sm:text-2xl">
				{content.subheadline}
			</p>

			<div class="mt-6 space-y-3 text-base leading-relaxed text-[rgb(var(--muted))]">
				{#each content.heroParagraphs as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>

			<div class="mt-6">
				<a class="btn btn-primary" href={content.primaryCta.href} target="_blank" rel="noreferrer">
					{content.primaryCta.label}
				</a>
				<p class="mt-3 text-sm text-[rgb(var(--muted))]">{content.heroAvailabilityNote}</p>
			</div>
		</section>

		<section class="mx-auto mt-10 max-w-4xl">
			<h2 class="text-3xl font-semibold text-[rgb(var(--text))] sm:text-4xl">
				{content.weeksHeading}
			</h2>
			<div class="mt-5 grid gap-4 md:grid-cols-2">
				{#each content.weeks as week}
					<article class="rounded-2xl border border-[rgb(var(--border))] bg-white/5 p-5 sm:p-6">
						<span
							class="inline-flex rounded-full border border-[rgb(var(--accent))] bg-[rgb(var(--accent)_/_0.18)] px-3 py-1 text-[0.72rem] font-[var(--font-mono)] tracking-[0.08em] text-[rgb(var(--accent))] uppercase"
						>
							{week.badge}
						</span>
						<h3 class="mt-3 text-xl font-semibold text-[rgb(var(--text))]">{week.title}</h3>
						<p class="mt-2.5 text-sm leading-relaxed text-[rgb(var(--muted))] sm:text-[0.95rem]">
							{week.body}
						</p>
					</article>
				{/each}
			</div>
		</section>

		<section
			class="mx-auto mt-10 max-w-4xl rounded-2xl border border-[rgb(var(--border))] bg-white/5 p-6 sm:p-7"
		>
			<h2 class="text-3xl font-semibold text-[rgb(var(--text))] sm:text-4xl">
				{content.includedHeading}
			</h2>
			<ul class="mt-5 space-y-2.5">
				{#each content.includedItems as item}
					<li class="flex gap-3 text-sm leading-relaxed text-[rgb(var(--muted))] sm:text-base">
						<span
							class="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[rgb(var(--accent))] bg-[rgb(var(--accent)_/_0.18)] text-xs font-semibold text-[rgb(var(--accent))]"
							aria-hidden="true"
						>
							✓
						</span>
						<span>{item}</span>
					</li>
				{/each}
			</ul>
		</section>

		<section
			class="mx-auto mt-9 max-w-4xl rounded-2xl border border-[rgb(var(--border-strong))] bg-[rgb(var(--bg-elev))]/55 p-6 sm:p-7"
		>
			<h2 class="text-3xl font-semibold text-[rgb(var(--text))] sm:text-4xl">
				{content.notIncludedHeading}
			</h2>
			<ul class="mt-5 space-y-2.5">
				{#each content.notIncludedItems as item}
					<li class="flex gap-3 text-sm leading-relaxed text-[rgb(var(--muted))] sm:text-base">
						<span class="mt-0.5 inline-block text-[rgb(var(--accent))]" aria-hidden="true">×</span>
						<span>{item}</span>
					</li>
				{/each}
			</ul>
		</section>

		<section class="mx-auto mt-10 max-w-3xl text-center">
			<h2 class="text-3xl font-semibold text-[rgb(var(--text))] sm:text-4xl">
				{content.priceHeading}
			</h2>
			<p class="mt-3 text-4xl font-semibold text-[rgb(var(--text))] sm:text-5xl">{content.price}</p>
			<p class="mt-2.5 text-base text-[rgb(var(--muted))] sm:text-lg">{content.priceSubtext}</p>
			<p class="mt-2 text-sm text-[rgb(var(--muted))]">{content.priceAfterYearOne}</p>
		</section>

		<section
			class="mx-auto mt-10 max-w-4xl rounded-2xl border border-[rgb(var(--accent))] bg-[rgb(var(--accent)_/_0.1)] p-6 sm:p-7"
		>
			<h2 class="text-3xl font-semibold text-[rgb(var(--text))] sm:text-4xl">
				{content.guaranteeHeading}
			</h2>
			<div class="mt-4 space-y-3 text-sm leading-relaxed text-[rgb(var(--muted))] sm:text-base">
				{#each content.guaranteeParagraphs as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>
		</section>

		<section class="mx-auto mt-10 max-w-4xl">
			<h2 class="text-3xl font-semibold text-[rgb(var(--text))] sm:text-4xl">
				{content.qualificationHeading}
			</h2>
			<div class="mt-5 grid gap-4 md:grid-cols-2">
				{#each content.qualificationColumns as column}
					<div class="rounded-2xl border border-[rgb(var(--border))] bg-white/5 p-5 sm:p-6">
						<h3 class="text-xl font-semibold text-[rgb(var(--text))]">{column.heading}</h3>
						<ul class="mt-3.5 space-y-2.5">
							{#each column.items as item}
								<li
									class="flex gap-3 text-sm leading-relaxed text-[rgb(var(--muted))] sm:text-base"
								>
									<span
										class="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--accent))]"
									></span>
									<span>{item}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</section>

		<section class="mx-auto mt-10 max-w-3xl text-center">
			<h2 class="text-3xl font-semibold text-[rgb(var(--text))] sm:text-4xl">
				{content.availabilityHeading}
			</h2>
			<p class="mt-3 text-base leading-relaxed text-[rgb(var(--muted))] sm:text-lg">
				{content.availabilityBody}
			</p>
			<div class="mt-5">
				<a class="btn btn-primary" href={content.primaryCta.href} target="_blank" rel="noreferrer">
					{content.primaryCta.label}
				</a>
			</div>
		</section>

		<section
			class="mx-auto mt-10 max-w-4xl rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))]/45 p-6 sm:p-7"
		>
			<h2 class="text-3xl font-semibold text-[rgb(var(--text))] sm:text-4xl">
				{content.upsellHeading}
			</h2>
			<div class="mt-4 space-y-3 text-sm leading-relaxed text-[rgb(var(--muted))] sm:text-base">
				{#each content.upsellParagraphs as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>
			<div class="mt-5">
				<a class="btn btn-secondary" href={content.upsellCta.href} target="_blank" rel="noreferrer">
					{content.upsellCta.label}
				</a>
			</div>
		</section>

		<p
			class="mx-auto mt-10 max-w-4xl text-center text-sm leading-relaxed text-[rgb(var(--muted))] italic"
		>
			{content.footerLine}
		</p>
	</div>

	<MarketingFooter
		brand={site.brand}
		tagline={site.footer.tagline}
		copyrightName={site.footer.copyrightName}
		{year}
		links={footerLinks}
	/>
</div>
