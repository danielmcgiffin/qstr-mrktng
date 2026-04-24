import { error, json } from '@sveltejs/kit';
import {
	getReviewSubmission,
	isReviewStatus,
	requireAdmin,
	updateReviewSubmission
} from '$lib/server/review-service';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	requireAdmin(event);
	const submission = await getReviewSubmission(event.params.id);
	return json({ submission });
};

export const PATCH: RequestHandler = async (event) => {
	requireAdmin(event);
	const payload = (await event.request.json()) as {
		founder_note?: unknown;
		override_scores?: unknown;
		review_status?: unknown;
	};
	if (payload.review_status !== undefined && !isReviewStatus(payload.review_status)) {
		throw error(400, 'Invalid review status.');
	}
	const updated = await updateReviewSubmission(event.params.id, {
		founder_note: typeof payload.founder_note === 'string' ? payload.founder_note : null,
		override_scores: payload.override_scores,
		review_status: payload.review_status
	});
	return json({ ok: updated });
};
