import { oauthProtectedResourceMetadata } from '$lib/agent-discovery';

export const prerender = false;

export async function GET() {
	return new Response(JSON.stringify(oauthProtectedResourceMetadata), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
