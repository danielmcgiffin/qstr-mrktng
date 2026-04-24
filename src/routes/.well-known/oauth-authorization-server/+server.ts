import { oauthAuthorizationServerMetadata } from '$lib/agent-discovery';

export const prerender = false;

export async function GET() {
	return new Response(JSON.stringify(oauthAuthorizationServerMetadata), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
