import { json } from '@sveltejs/kit';

const NO_STORE_HEADERS = {
	'cache-control': 'no-store'
};

export const prerender = false;

export async function GET() {
	return json(
		{
			error: 'temporarily_unavailable',
			error_description: 'OAuth authorization is not enabled on the public marketing site yet.'
		},
		{ status: 501, headers: NO_STORE_HEADERS }
	);
}
