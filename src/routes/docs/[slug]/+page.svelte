<script lang="ts">
	import { resolve } from '$app/paths';
	import BrandText from '$lib/components/BrandText.svelte';
	import type { DocsArticle } from '../articles';

	export let data: {
		article: DocsArticle;
		prev: DocsArticle | null;
		next: DocsArticle | null;
	};
</script>

<svelte:head>
	<title>{data.article.title} - Quaestor Docs</title>
	<meta name="description" content={data.article.description} />
	<meta property="og:title" content={`${data.article.title} - Quaestor Docs`} />
	<meta property="og:description" content={data.article.description} />
	<meta property="og:image:alt" content="Quaestor docs article preview." />
	<meta name="twitter:title" content={`${data.article.title} - Quaestor Docs`} />
	<meta name="twitter:description" content={data.article.description} />
	<meta name="twitter:image:alt" content="Quaestor docs article preview." />
</svelte:head>

<article class="docs-article">
	<a class="docs-back-link" href={resolve('/docs')}>&larr; Docs Index</a>

	<header class="docs-article-header">
		<p class="label-cap"><BrandText text={data.article.category} /></p>
		<h1 class="hero-title docs-article-title"><BrandText text={data.article.title} /></h1>
		<p class="docs-article-description"><BrandText text={data.article.description} /></p>
	</header>

	<div class="docs-article-body">
		{#each data.article.blocks as block (block.title)}
			<section>
				<h2><BrandText text={block.title} /></h2>
				{#each block.body as paragraph (paragraph)}
					<p><BrandText text={paragraph} /></p>
				{/each}
			</section>
		{/each}
	</div>

	<nav class="docs-article-nav" aria-label="Docs article navigation">
		{#if data.prev}
			<a href={resolve(`/docs/${data.prev.slug}` as '/')}>
				<span>Previous</span>
				<strong><BrandText text={data.prev.title} /></strong>
			</a>
		{:else}
			<span></span>
		{/if}

		{#if data.next}
			<a class="docs-article-nav-next" href={resolve(`/docs/${data.next.slug}` as '/')}>
				<span>Next</span>
				<strong><BrandText text={data.next.title} /></strong>
			</a>
		{:else}
			<a class="docs-article-nav-next" href={resolve('/changelog')}>
				<span>Next</span>
				<strong>Changelog</strong>
			</a>
		{/if}
	</nav>
</article>

<style>
	.docs-article {
		padding-top: 3rem;
	}

	.docs-back-link {
		display: inline-flex;
		margin-bottom: 2rem;
		color: rgb(var(--accent));
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		font-weight: 500;
		letter-spacing: 0.08em;
		text-decoration: none;
		text-transform: uppercase;
	}

	.docs-back-link:hover {
		color: rgb(var(--accent-deep));
	}

	.docs-article-header {
		padding-bottom: 2rem;
		border-bottom: 1px solid rgb(var(--border));
	}

	.docs-article-title {
		margin-top: 0.75rem;
		font-size: clamp(2rem, 6vw, 3.5rem);
	}

	.docs-article-description {
		max-width: 62ch;
		margin: 1.25rem 0 0;
		color: rgb(var(--muted));
		font-size: clamp(1.0625rem, 2vw, 1.2rem);
		line-height: 1.7;
		text-wrap: pretty;
	}

	.docs-article-body {
		display: grid;
		gap: 2rem;
		padding-block: 2rem 2.5rem;
	}

	.docs-article-body section {
		display: grid;
		gap: 0.85rem;
	}

	.docs-article-body h2 {
		margin: 0;
		color: rgb(var(--text));
		font-size: clamp(1.35rem, 3vw, 1.75rem);
		font-weight: 600;
		line-height: 1.2;
	}

	.docs-article-body p {
		margin: 0;
		color: rgb(var(--muted));
		font-size: 1rem;
		line-height: 1.75;
		text-wrap: pretty;
	}

	.docs-article-nav {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		border-top: 1px solid rgb(var(--border));
		padding-top: 1.5rem;
	}

	.docs-article-nav a {
		display: grid;
		gap: 0.35rem;
		color: rgb(var(--muted));
		text-decoration: none;
	}

	.docs-article-nav a:hover strong {
		color: rgb(var(--accent));
	}

	.docs-article-nav span {
		font-family: var(--font-mono);
		font-size: var(--fs-micro);
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.docs-article-nav strong {
		color: rgb(var(--text));
		font-size: 0.95rem;
		font-weight: 600;
		line-height: 1.35;
	}

	.docs-article-nav-next {
		text-align: right;
	}
</style>
