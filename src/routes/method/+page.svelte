<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';
	import { methodSections, methodPath } from '$lib/method';

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

<section class="space-y-16">
	<div>
		<h1
			class="gradient-text text-4xl leading-[1.1] font-semibold tracking-tight text-balance md:text-5xl"
		>
			The operational atlas,
			<span class="text-[rgb(var(--accent))]">step by step</span>
		</h1>
		<p
			class="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-[rgb(var(--text-secondary))] md:text-lg"
		>
			If your business can’t work without you, it owns you. This method is how you get out.
		</p>
		<p
			class="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-[rgb(var(--text-secondary))] md:text-lg"
		>
			Four parts. Why docs die. The model that lives. How to map the work. How to measure freedom.
		</p>
		<div class="mt-8 flex flex-col gap-3 sm:flex-row">
			<a class="btn btn-primary" href={methodPath(methodSections[0].slug)}>
				Start at the top <span aria-hidden="true">&rarr;</span>
			</a>
			<a class="btn btn-secondary" href="https://qstr.cursus.tools/demo/process">
				See the product <span aria-hidden="true">&rarr;</span>
			</a>
		</div>
	</div>

	<ol class="space-y-0">
		{#each methodSections as section, i}
			<li>
				<a
					class="group flex items-start gap-5 py-6 transition-colors duration-200 hover:opacity-100"
					href={methodPath(section.slug)}
					style={i === 0 ? '' : ''}
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
</section>
