import { json } from '@sveltejs/kit';
import { requireAdmin, sendReviewReport } from '$lib/server/review-service';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	requireAdmin(event);
	const ok = await sendReviewReport(event.params.id);
	return json({ ok });
};
