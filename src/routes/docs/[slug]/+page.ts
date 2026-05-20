import { error } from '@sveltejs/kit';
import { docsArticles } from '../articles';

export const prerender = true;

export const entries = () => docsArticles.map((article) => ({ slug: article.slug }));

export const load = ({ params }) => {
	const idx = docsArticles.findIndex((article) => article.slug === params.slug);
	if (idx === -1) {
		throw error(404, 'Not found');
	}

	return {
		article: docsArticles[idx],
		prev: idx > 0 ? docsArticles[idx - 1] : null,
		next: idx < docsArticles.length - 1 ? docsArticles[idx + 1] : null
	};
};
