import { env } from '$env/dynamic/private';
import type { GraderResponse } from '$lib/grader';

const RESEND_API_URL = 'https://api.resend.com/emails';

const getPrivateEnv = (...keys: string[]): string => {
	for (const key of keys) {
		const value = env[key]?.trim();
		if (value) return value;
	}
	return '';
};

const sendEmail = async (params: {
	to: string;
	from: string;
	subject: string;
	text: string;
	replyTo?: string;
	attachments?: Array<{ filename: string; content: string; content_type: string }>;
}): Promise<void> => {
	const resendApiKey = getPrivateEnv('RESEND_API_KEY', 'PRIVATE_RESEND_API_KEY');
	if (!resendApiKey) {
		throw new Error('AI Score email delivery is not configured yet.');
	}

	const payload: Record<string, unknown> = {
		from: params.from,
		to: [params.to],
		subject: params.subject,
		text: params.text
	};

	if (params.replyTo) {
		payload.reply_to = params.replyTo;
	}

	if (params.attachments?.length) {
		payload.attachments = params.attachments;
	}

	const response = await fetch(RESEND_API_URL, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${resendApiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`Email send failed (${response.status}): ${body}`);
	}
};

export const sendGraderAlert = async (params: {
	requestId: string;
	submissionId?: string | null;
	aiScore: number;
	humanScore: number;
	variance: number;
	summary: string;
	reviewUrl?: string | null;
}): Promise<void> => {
	const fromEmail = getPrivateEnv('AI_SCORE_FROM_EMAIL', 'PRIVATE_FROM_ADMIN_EMAIL');
	const toEmail = getPrivateEnv(
		'GRADER_ALERT_TO_EMAIL',
		'AI_SCORE_TO_EMAIL',
		'PRIVATE_ADMIN_EMAIL'
	);
	if (!fromEmail || !toEmail) return;

	const varianceFlag = params.variance > 5 ? 'VARIANCE' : 'normal';
	const lines = [
		'New grader submission',
		'',
		`Request ID: ${params.requestId}`,
		`Submission ID: ${params.submissionId ?? '(inline only)'}`,
		`AI score: ${params.aiScore}`,
		`Human score: ${params.humanScore}`,
		`Variance max: ${params.variance}`,
		`Flag: ${varianceFlag}`,
		'',
		params.summary
	];

	if (params.reviewUrl) {
		lines.push('', `Review: ${params.reviewUrl}`);
	}

	await sendEmail({
		to: toEmail,
		from: fromEmail,
		subject: `Grader alert · AI ${params.aiScore} / Human ${params.humanScore}`,
		text: lines.join('\n')
	}).catch(() => undefined);
};

export type SubmissionAlertAttachment = {
	filename: string;
	content: string;
	content_type: string;
};

export const sendAiScoreSubmissionAlert = async (params: {
	email: string;
	source: string;
	mode: 'graded' | 'queued';
	bodyText: string;
	attachment?: SubmissionAlertAttachment | null;
	attachmentSize?: number;
	fallbackReason?: string;
	result?: GraderResponse | null;
}): Promise<void> => {
	const fromEmail = getPrivateEnv('AI_SCORE_FROM_EMAIL', 'PRIVATE_FROM_ADMIN_EMAIL');
	const toEmail = getPrivateEnv(
		'AI_SCORE_TO_EMAIL',
		'GRADER_ALERT_TO_EMAIL',
		'PRIVATE_ADMIN_EMAIL'
	);
	if (!fromEmail || !toEmail) {
		throw new Error('AI Score email delivery is not configured yet.');
	}

	const submittedAt = new Date().toISOString();
	const lines = [
		'New AI Score submission',
		'',
		`Mode: ${params.mode}`,
		`Reply email: ${params.email}`,
		`Source: ${params.source}`,
		`Submitted at: ${submittedAt}`
	];

	if (params.fallbackReason) {
		lines.push(`Fallback reason: ${params.fallbackReason}`);
	}

	if (params.attachment) {
		lines.push(
			`Attachment: ${params.attachment.filename} (${params.attachmentSize ?? 'unknown'} bytes)`
		);
	}

	if (params.result) {
		if (params.result.valid) {
			lines.push(
				'',
				`AI readiness: ${params.result.ai_readiness.grade} (${params.result.ai_readiness.score}/100)`,
				`Human readiness: ${params.result.human_readiness.grade} (${params.result.human_readiness.score}/100)`,
				`Follow-up CTA: ${params.result.follow_up_cta}`,
				'',
				'Summary:',
				params.result.summary
			);

			if (params.result.pathologies.length > 0) {
				lines.push(
					'',
					'Top pathologies:',
					...params.result.pathologies.map(
						(pathology) => `- ${pathology.title}: ${pathology.detail}`
					)
				);
			}
		} else {
			lines.push('', 'Model outcome:', params.result.message);
		}
	}

	if (params.bodyText) {
		lines.push('', 'Submitted text / notes:', params.bodyText);
	} else {
		lines.push('', '(No pasted text — see attachment.)');
	}

	const subject =
		params.result?.valid === true
			? `AI Score submission · AI ${params.result.ai_readiness.score} / Human ${params.result.human_readiness.score}`
			: params.mode === 'queued'
				? 'AI Score submission · manual follow-up'
				: 'AI Score submission';

	await sendEmail({
		to: toEmail,
		from: fromEmail,
		subject,
		text: lines.join('\n'),
		replyTo: params.email,
		attachments: params.attachment ? [params.attachment] : undefined
	});
};
