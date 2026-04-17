export const prerender = true;

export async function GET() {
	const domain = 'https://marketing.dannymcgiffin.com';

	const catalog = {
		linkset: [
			{
				anchor: `${domain}/api-catalog`,
				'service-desc': [
					{
						href: `${domain}/docs/api`,
						type: 'text/html'
					}
				]
			},
			{
				anchor: `${domain}/grade`,
				rel: 'service',
				'service-doc': [
					{
						href: `${domain}/ai-score`,
						type: 'text/html'
					}
				],
				method: ['POST', 'PATCH'],
				'accept-post': ['application/json']
			},
			{
				anchor: `${domain}/ai-score/submit`,
				rel: 'service',
				'service-doc': [
					{
						href: `${domain}/ai-score`,
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
			'Content-Type': 'application/linkset+json',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
