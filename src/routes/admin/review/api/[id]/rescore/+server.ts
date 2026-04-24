import { json } from '@sveltejs/kit';
import { requireAdmin, rescoreReviewSubmission } from '$lib/server/review-service';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	requireAdmin(event);
	const result = await rescoreReviewSubmission(event.params.id);
	return json({ ok: true, result });
};
