import { json } from '@sveltejs/kit';

const NO_STORE_HEADERS = {
	'cache-control': 'no-store'
};

export const prerender = false;

export async function POST() {
	return json(
		{
			error: 'unsupported_grant_type',
			error_description: 'OAuth token issuance is not enabled on the public marketing site yet.'
		},
		{ status: 400, headers: NO_STORE_HEADERS }
	);
}
