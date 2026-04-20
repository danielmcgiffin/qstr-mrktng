import { env } from '$env/dynamic/private';
import { redactForLogs } from '$lib/server/guards';

export type TraceSpan = {
	label: string;
	started_at: string;
	ended_at: string;
	duration_ms: number;
	payload?: unknown;
};

const getSupabaseBaseUrl = (): string | null => {
	const url = env.SUPABASE_URL?.trim();
	return url ? `${url}/rest/v1` : null;
};

const getSupabaseHeaders = (): HeadersInit | null => {
	const key = env.SUPABASE_SERVICE_ROLE_KEY?.trim();
	if (!key) return null;
	return {
		apikey: key,
		Authorization: `Bearer ${key}`,
		'Content-Type': 'application/json'
	};
};

export const newRequestId = (): string => crypto.randomUUID();

export const startTrace = () => {
	const spans: TraceSpan[] = [];
	return {
		mark: (label: string, payload?: unknown) => {
			const started = Date.now();
			return (endPayload?: unknown) => {
				const ended = Date.now();
				spans.push({
					label,
					started_at: new Date(started).toISOString(),
					ended_at: new Date(ended).toISOString(),
					duration_ms: ended - started,
					payload: redactForLogs(endPayload ?? payload)
				});
			};
		},
		finish: (): TraceSpan[] => spans
	};
};

export const logEvent = (requestId: string, event: string, payload?: unknown): void => {
	console.info(
		'[grader]',
		JSON.stringify({
			request_id: requestId,
			event,
			payload: redactForLogs(payload ?? null)
		})
	);
};

export const upsertDailyGraderStats = async (params: {
	aiScore: number;
	humanScore: number;
	variance: number;
	costUsd: number;
}): Promise<void> => {
	const base = getSupabaseBaseUrl();
	const headers = getSupabaseHeaders();
	if (!base || !headers) return;

	const tableUrl = `${base}/grader_daily_stats`;
	const day = new Date().toISOString().slice(0, 10);
	const selectUrl = new URL(tableUrl);
	selectUrl.searchParams.set('select', 'day,submissions,avg_ai,avg_human,avg_variance,cost_usd');
	selectUrl.searchParams.set('day', `eq.${day}`);
	selectUrl.searchParams.set('limit', '1');

	const existingResponse = await fetch(selectUrl, { headers, method: 'GET' });
	if (!existingResponse.ok) return;
	const rows = (await existingResponse.json()) as Array<{
		day: string;
		submissions?: number;
		avg_ai?: number;
		avg_human?: number;
		avg_variance?: number;
		cost_usd?: number;
	}>;
	const current = rows[0];
	const submissions = (current?.submissions ?? 0) + 1;
	const avg = (prior: number | undefined, next: number): number =>
		((prior ?? 0) * (submissions - 1) + next) / submissions;

	await fetch(tableUrl, {
		method: 'POST',
		headers: {
			...headers,
			Prefer: 'resolution=merge-duplicates,return=minimal'
		},
		body: JSON.stringify({
			day,
			submissions,
			avg_ai: avg(current?.avg_ai, params.aiScore),
			avg_human: avg(current?.avg_human, params.humanScore),
			avg_variance: avg(current?.avg_variance, params.variance),
			cost_usd: (current?.cost_usd ?? 0) + params.costUsd,
			updated_at: new Date().toISOString()
		})
	});
};
