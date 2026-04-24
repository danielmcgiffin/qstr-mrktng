import { json } from '@sveltejs/kit';
import { listReviewSubmissions, requireAdmin } from '$lib/server/review-service';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	requireAdmin(event);
	const status = event.url.searchParams.get('status') || undefined;
	return json({ submissions: await listReviewSubmissions(status) });
};
