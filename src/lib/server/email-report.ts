import { env } from '$env/dynamic/private';
import type { FollowUpCta, GraderPathology, GraderSuccessResponse } from '$lib/grader';

type PersistedScoreEnvelope = {
	spec_version: string;
	ai_readiness: GraderSuccessResponse['ai_readiness'];
	human_readiness: GraderSuccessResponse['human_readiness'];
	follow_up_cta: FollowUpCta;
};

export type EmailReportPayload = {
	from: string;
	to: string[];
	subject: string;
	text: string;
	html: string;
};

export const buildEmailReportPayload = (params: {
	email: string;
	submissionId: string;
	result: PersistedScoreEnvelope;
	summary: string;
	pathologies?: GraderPathology[];
	founderNote?: string | null;
}): EmailReportPayload => {
	const from = env.AI_SCORE_FROM_EMAIL?.trim() || env.PRIVATE_FROM_ADMIN_EMAIL?.trim() || '';
	const ctaHref =
		params.result.follow_up_cta === 'try_quaestor_free'
			? 'https://qstr.cursus.tools/login?utm_source=cursus.tools&utm_medium=website&utm_campaign=v1_launch&utm_content=ai_score_result'
			: 'https://cal.com/danny-cursus/15min';
	const ctaLabel =
		params.result.follow_up_cta === 'try_quaestor_free' ? 'Try Quaestor free' : 'Book a demo';
	const pathologies = params.pathologies ?? [];
	const note = params.founderNote?.trim() || '';

	const text = [
		`Quaestor AI Score report · submission ${params.submissionId}`,
		'',
		`Rubric version: ${params.result.spec_version}`,
		`AI readiness: ${params.result.ai_readiness.grade} (${params.result.ai_readiness.score}/100)`,
		`Human readiness: ${params.result.human_readiness.grade} (${params.result.human_readiness.score}/100)`,
		'',
		params.summary,
		'',
		pathologies.length ? `Top pathologies:\n- ${pathologies.map((p) => p.title).join('\n- ')}` : '',
		note ? `Founder note:\n${note}` : '',
		'',
		`${ctaLabel}: ${ctaHref}`
	]
		.filter(Boolean)
		.join('\n');

	const html = `
		<h1>Quaestor AI Score</h1>
		<p><strong>Rubric version:</strong> ${params.result.spec_version}</p>
		<p><strong>AI readiness:</strong> ${params.result.ai_readiness.grade} (${params.result.ai_readiness.score}/100)</p>
		<p><strong>Human readiness:</strong> ${params.result.human_readiness.grade} (${params.result.human_readiness.score}/100)</p>
		<p>${escapeHtml(params.summary)}</p>
		${pathologies.length ? `<h2>Top pathologies</h2><ul>${pathologies.map((p) => `<li>${escapeHtml(p.title)}</li>`).join('')}</ul>` : ''}
		${note ? `<h2>Founder note</h2><p>${escapeHtml(note)}</p>` : ''}
		<p><a href="${ctaHref}">${ctaLabel}</a></p>
	`;

	return {
		from,
		to: [params.email],
		subject: `Quaestor AI Score: ${params.result.ai_readiness.grade}`,
		text,
		html
	};
};

const escapeHtml = (value: string): string =>
	value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');

export const sendEmailReport = async (payload: EmailReportPayload): Promise<void> => {
	const apiKey = env.RESEND_API_KEY?.trim() || env.PRIVATE_RESEND_API_KEY?.trim() || '';
	if (!apiKey || !payload.from) {
		throw new Error('Email delivery is not configured.');
	}

	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});
	if (!response.ok) {
		throw new Error(`Email send failed (${response.status})`);
	}
};
