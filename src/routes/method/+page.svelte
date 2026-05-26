<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';
	import MarketingFooter from '$lib/components/marketing/MarketingFooter.svelte';
	import { methodSections, methodPath } from './nav';

	const seo = {
		title: 'Method - Quaestor',
		description:
			'The Quaestor method: map the work, assign ownership, and keep the business moving.',
		ogTitle: 'The operational atlas, step by step.',
		ogDescription:
			'Why ops docs die, how the model works, and how to get the business out of your head.'
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

<div class="marketing-page">
	<div class="marketing-page-inner method-overview-page">
		<section class="marketing-section marketing-section-hero method-hero">
			<div class="marketing-container-narrow">
				<h1 class="hero-title">
					The operational atlas, <span class="text-[rgb(var(--accent))]">step by step</span>
				</h1>
				<p class="section-copy section-copy-large">
					If your business can’t work without you, it owns you. This method is how you get out. Four
					parts: why docs die, the model that lives, how to map the work, and how to measure
					freedom.
				</p>
				<div class="button-row">
					<a class="btn btn-primary" href={methodPath(methodSections[0].slug)}>
						Start at the top <span aria-hidden="true">&rarr;</span>
					</a>
					<a class="btn btn-secondary" href="https://qstr.cursus.tools/demo/process">
						See the product
					</a>
				</div>
			</div>
		</section>

		<section class="marketing-section method-chapters-section">
			<div class="marketing-container-narrow">
				<ol class="space-y-0">
					{#each methodSections as section, i}
						<li>
							<a
								class="group flex items-start gap-5 py-6 transition-colors duration-200 hover:opacity-100"
								href={methodPath(section.slug)}
							>
								<span
									class="mt-0.5 w-6 shrink-0 text-sm font-medium text-[rgb(var(--muted))] tabular-nums"
									>{String(i + 1).padStart(2, '0')}</span
								>
								<span class="flex-1">
									<span
										class="text-base font-semibold text-[rgb(var(--surface-text-strong))] transition-colors duration-200 group-hover:text-[rgb(var(--surface-text-body))]"
										><BrandText text={section.title} /></span
									>
									<span class="mt-2 block text-sm leading-relaxed text-[rgb(var(--muted))]"
										><BrandText text={section.summary} /></span
									>
								</span>
								<span
									class="mt-1 text-[rgb(var(--muted))] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[rgb(var(--surface-text-strong))]"
									aria-hidden="true">→</span
								>
							</a>
							{#if i < methodSections.length - 1}
								<div class="border-b border-[rgb(var(--border))]"></div>
							{/if}
						</li>
					{/each}
				</ol>
			</div>
		</section>

		<MarketingFooter />
	</div>
</div>

<style>
	.method-overview-page {
		padding-top: 0.5rem;
	}

	.method-hero {
		padding-bottom: 3.5rem;
	}

	.method-chapters-section {
		padding-block: 3.5rem 6rem;
	}
</style>
