import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
	getAdminToken,
	getReviewSubmission,
	isValidAdminToken,
	persistAdminTokenCookie
} from '$lib/server/review-service';

export const load: PageServerLoad = async (event) => {
	const token = getAdminToken(event);
	if (!isValidAdminToken(token)) {
		throw error(401, 'Admin token required.');
	}
	persistAdminTokenCookie(event.cookies, token);
	const submission = await getReviewSubmission(event.params.id);
	if (!submission) {
		throw error(404, 'Submission not found.');
	}
	return { submission };
};
