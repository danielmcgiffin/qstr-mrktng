import { SITE_ORIGIN } from '$lib/agent-discovery';

export const prerender = false;

export async function GET() {
	const catalog = {
		linkset: [
			{
				anchor: `${SITE_ORIGIN}/.well-known/api-catalog`,
				'service-desc': [
					{
						href: `${SITE_ORIGIN}/ai-score`,
						type: 'text/html'
					}
				]
			},
			{
				anchor: `${SITE_ORIGIN}/grade`,
				rel: 'service',
				'service-doc': [
					{
						href: `${SITE_ORIGIN}/ai-score`,
						type: 'text/html'
					}
				],
				method: ['POST', 'PATCH'],
				'accept-post': ['application/json']
			},
			{
				anchor: `${SITE_ORIGIN}/ai-score/submit`,
				rel: 'service',
				'service-doc': [
					{
						href: `${SITE_ORIGIN}/ai-score`,
						type: 'text/html'
					}
				],
				method: ['POST'],
				'accept-post': ['application/json']
			}
		]
	};

	return new Response(JSON.stringify(catalog), {
		headers: {
			'Content-Type': 'application/linkset+json; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
