import type { PageServerLoad } from './$types';
import {
	getAdminToken,
	isValidAdminToken,
	listReviewSubmissions,
	persistAdminTokenCookie
} from '$lib/server/review-service';

export const load: PageServerLoad = async (event) => {
	const token = getAdminToken(event);
	const authorized = isValidAdminToken(token);
	const status = event.url.searchParams.get('status') || 'unreviewed';

	if (!authorized) {
		return {
			authorized: false,
			status,
			submissions: []
		};
	}

	persistAdminTokenCookie(event.cookies, token);
	return {
		authorized: true,
		status,
		submissions: await listReviewSubmissions(status)
	};
};
