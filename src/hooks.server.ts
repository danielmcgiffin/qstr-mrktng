import type { Handle } from '@sveltejs/kit';
import {
	DISCOVERY_LINK_HEADER,
	estimateMarkdownTokens,
	getMarkdownForPath
} from '$lib/agent-discovery';

const appendVaryValue = (existing: string | null, value: string): string => {
	if (!existing) return value;

	const parts = existing
		.split(',')
		.map((part) => part.trim())
		.filter(Boolean);

	return parts.includes(value) ? existing : `${existing}, ${value}`;
};

export const handle: Handle = async ({ event, resolve }) => {
	const accept = event.request.headers.get('accept') || '';
	if (accept.includes('text/markdown')) {
		const markdown = getMarkdownForPath(event.url.pathname);
		if (markdown) {
			return new Response(markdown, {
				headers: {
					'content-type': 'text/markdown; charset=utf-8',
					link: DISCOVERY_LINK_HEADER,
					vary: 'accept',
					'x-markdown-tokens': String(estimateMarkdownTokens(markdown))
				}
			});
		}
	}

	const response = await resolve(event);
	response.headers.append('Link', DISCOVERY_LINK_HEADER);
	response.headers.set('Vary', appendVaryValue(response.headers.get('Vary'), 'Accept'));
	return response;
};
