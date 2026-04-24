<script lang="ts">
	type ReviewStatus = 'unreviewed' | 'reviewing' | 'sent' | 'archived';
	type FollowUpCta = 'book_demo' | 'try_quaestor_free';
	type AreaLike = {
		score: number;
		reasoning?: string;
		disqualifiers_present?: string[];
		subdims?: Record<string, AreaLike>;
	};
	type ScoreEnvelope = {
		spec_version: string;
		ai_readiness: {
			score: number;
			grade: string;
			summary: string;
			areas: Record<string, AreaLike>;
		};
		human_readiness: {
			score: number;
			grade: string;
			summary: string;
			areas: Record<string, AreaLike>;
		};
		follow_up_cta: FollowUpCta;
	};
	type Pathology = {
		title: string;
		detail: string;
		source: 'ai' | 'human';
		area: string;
	};
	type ToolArtifact = {
		prompt_kind: 'ai' | 'human';
		response_id: string | null;
		model: string;
		stop_reason: string | null;
		tool_name: string;
		tool_input: Record<string, unknown>;
		usage?: {
			input_tokens?: number;
			output_tokens?: number;
			cache_creation_input_tokens?: number;
			cache_read_input_tokens?: number;
		} | null;
	};
	type VarianceDimension = {
		key: string;
		values: number[];
		min: number;
		max: number;
		span: number;
	};
	type VarianceBlock = {
		run_count: number;
		trigger_threshold: number;
		max_divergence: number;
		mean_divergence: number;
		third_run_triggered: boolean;
		dimensions: VarianceDimension[];
	};
	type VarianceEnvelope = {
		ai: VarianceBlock | null;
		human: VarianceBlock | null;
	};

	const AI_AREA_MAX: Record<string, number> = {
		named_doer: 15,
		context_source_named: 20,
		boundaries_defined: 15,
		step_structure: 15,
		decision_points_defined: 15,
		outputs_handoffs_and_completeness: 20
	};

	const HUMAN_AREA_MAX: Record<string, number> = {
		readability: 20,
		scannability: 15,
		self_contained_context: 20,
		references_linked: 15,
		terms_consistent: 15,
		internal_consistency: 15
	};

	const MODEL_PRICING_USD_PER_MTOK = {
		input: 0.8,
		output: 4.0,
		cache_write: 1.0,
		cache_read: 0.08
	} as const;

	const isObject = (value: unknown): value is Record<string, unknown> =>
		typeof value === 'object' && value !== null;

	const titleCase = (value: string): string =>
		value
			.replaceAll('_', ' ')
			.replaceAll('.', ' › ')
			.replace(/\b\w/g, (char) => char.toUpperCase());

	const formatDate = (value: string | null | undefined): string =>
		value ? new Date(value).toLocaleString() : '—';

	const formatUsd = (value: number): string => `$${value.toFixed(3)}`;
	const formatInt = (value: number): string => new Intl.NumberFormat().format(value);
	const clampPct = (value: number): number => Math.max(0, Math.min(100, value));

	const coerceArea = (value: unknown): AreaLike | null => {
		if (!isObject(value) || typeof value.score !== 'number') return null;
		const subdims = isObject(value.subdims)
			? Object.fromEntries(
					Object.entries(value.subdims)
						.map(([key, subdim]) => [key, coerceArea(subdim)])
						.filter((entry): entry is [string, AreaLike] => entry[1] !== null)
				)
			: undefined;
		return {
			score: value.score,
			reasoning: typeof value.reasoning === 'string' ? value.reasoning : '',
			disqualifiers_present: Array.isArray(value.disqualifiers_present)
				? value.disqualifiers_present.filter((item): item is string => typeof item === 'string')
				: [],
			subdims: subdims && Object.keys(subdims).length > 0 ? subdims : undefined
		};
	};

	const coerceScoreEnvelope = (value: unknown): ScoreEnvelope | null => {
		if (!isObject(value)) return null;
		const ai = isObject(value.ai_readiness) ? value.ai_readiness : null;
		const human = isObject(value.human_readiness) ? value.human_readiness : null;
		if (!ai || !human || !isObject(ai.areas) || !isObject(human.areas)) return null;

		const aiAreas = Object.fromEntries(
			Object.entries(ai.areas)
				.map(([key, area]) => [key, coerceArea(area)])
				.filter((entry): entry is [string, AreaLike] => entry[1] !== null)
		);
		const humanAreas = Object.fromEntries(
			Object.entries(human.areas)
				.map(([key, area]) => [key, coerceArea(area)])
				.filter((entry): entry is [string, AreaLike] => entry[1] !== null)
		);

		if (
			typeof ai.score !== 'number' ||
			typeof human.score !== 'number' ||
			typeof ai.grade !== 'string' ||
			typeof human.grade !== 'string'
		) {
			return null;
		}

		return {
			spec_version: typeof value.spec_version === 'string' ? value.spec_version : '0.3',
			ai_readiness: {
				score: ai.score,
				grade: ai.grade,
				summary: typeof ai.summary === 'string' ? ai.summary : '',
				areas: aiAreas
			},
			human_readiness: {
				score: human.score,
				grade: human.grade,
				summary: typeof human.summary === 'string' ? human.summary : '',
				areas: humanAreas
			},
			follow_up_cta: value.follow_up_cta === 'try_quaestor_free' ? 'try_quaestor_free' : 'book_demo'
		};
	};

	const coercePathologies = (value: unknown): Pathology[] => {
		if (!isObject(value) || !Array.isArray(value.pathologies)) return [];
		return value.pathologies.filter(
			(item): item is Pathology =>
				isObject(item) &&
				typeof item.title === 'string' &&
				typeof item.detail === 'string' &&
				(item.source === 'ai' || item.source === 'human') &&
				typeof item.area === 'string'
		);
	};

	const coerceArtifacts = (value: unknown): ToolArtifact[] => {
		if (!Array.isArray(value)) return [];
		return value.filter(
			(item): item is ToolArtifact =>
				isObject(item) &&
				(item.prompt_kind === 'ai' || item.prompt_kind === 'human') &&
				typeof item.model === 'string' &&
				typeof item.tool_name === 'string' &&
				isObject(item.tool_input)
		);
	};

	const coerceVariance = (value: unknown): VarianceEnvelope => {
		const parseBlock = (block: unknown): VarianceBlock | null => {
			if (!isObject(block) || !Array.isArray(block.dimensions)) return null;
			return {
				run_count: typeof block.run_count === 'number' ? block.run_count : 0,
				trigger_threshold:
					typeof block.trigger_threshold === 'number' ? block.trigger_threshold : 0,
				max_divergence: typeof block.max_divergence === 'number' ? block.max_divergence : 0,
				mean_divergence: typeof block.mean_divergence === 'number' ? block.mean_divergence : 0,
				third_run_triggered: Boolean(block.third_run_triggered),
				dimensions: block.dimensions.filter(
					(item): item is VarianceDimension =>
						isObject(item) &&
						typeof item.key === 'string' &&
						Array.isArray(item.values) &&
						typeof item.min === 'number' &&
						typeof item.max === 'number' &&
						typeof item.span === 'number'
				)
			};
		};

		if (!isObject(value)) {
			return { ai: null, human: null };
		}

		return {
			ai: parseBlock(value.ai),
			human: parseBlock(value.human)
		};
	};

	const summarizeUsage = (artifacts: ToolArtifact[]) => {
		let inputTokens = 0;
		let outputTokens = 0;
		let cacheWriteTokens = 0;
		let cacheReadTokens = 0;

		for (const artifact of artifacts) {
			inputTokens += artifact.usage?.input_tokens ?? 0;
			outputTokens += artifact.usage?.output_tokens ?? 0;
			cacheWriteTokens += artifact.usage?.cache_creation_input_tokens ?? 0;
			cacheReadTokens += artifact.usage?.cache_read_input_tokens ?? 0;
		}

		const totalUsd =
			(inputTokens / 1_000_000) * MODEL_PRICING_USD_PER_MTOK.input +
			(outputTokens / 1_000_000) * MODEL_PRICING_USD_PER_MTOK.output +
			(cacheWriteTokens / 1_000_000) * MODEL_PRICING_USD_PER_MTOK.cache_write +
			(cacheReadTokens / 1_000_000) * MODEL_PRICING_USD_PER_MTOK.cache_read;

		return {
			calls: artifacts.length,
			input_tokens: inputTokens,
			output_tokens: outputTokens,
			cache_write_tokens: cacheWriteTokens,
			cache_read_tokens: cacheReadTokens,
			total_usd: totalUsd
		};
	};

	const toAreaEntries = (areas: Record<string, AreaLike>, maxMap: Record<string, number>) =>
		Object.entries(areas).map(([key, area]) => ({
			key,
			label: titleCase(key),
			score: area.score,
			max: maxMap[key] ?? 100,
			reasoning: area.reasoning || '',
			disqualifiers: area.disqualifiers_present || [],
			subdims: area.subdims
				? Object.entries(area.subdims).map(([subKey, subArea]) => ({
						key: subKey,
						label: titleCase(subKey),
						score: subArea.score,
						reasoning: subArea.reasoning || ''
					}))
				: []
		}));

	const topVarianceDimensions = (block: VarianceBlock | null): VarianceDimension[] =>
		(block?.dimensions || [])
			.slice()
			.sort((a, b) => b.span - a.span)
			.slice(0, 4);

	const statusTone = (value: string | null | undefined): string => {
		switch (value) {
			case 'sent':
				return 'bg-emerald-100 text-emerald-800 border-emerald-300';
			case 'reviewing':
				return 'bg-amber-100 text-amber-800 border-amber-300';
			case 'archived':
				return 'bg-slate-200 text-slate-700 border-slate-300';
			default:
				return 'bg-blue-100 text-blue-800 border-blue-300';
		}
	};

	let { data } = $props();
	let note = $state('');
	let status = $state<ReviewStatus>('unreviewed');
	let busy = $state(false);
	let message = $state('');

	$effect(() => {
		note = data.submission.founder_note || '';
		status = (data.submission.review_status || 'unreviewed') as ReviewStatus;
	});

	const scoreEnvelope = $derived(coerceScoreEnvelope(data.submission.scores));
	const pathologies = $derived(coercePathologies(data.submission.extracted));
	const artifacts = $derived(coerceArtifacts(data.submission.raw_llm_responses));
	const usage = $derived(summarizeUsage(artifacts));
	const variance = $derived(coerceVariance(data.submission.variance_report));
	const aiAreas = $derived(
		scoreEnvelope ? toAreaEntries(scoreEnvelope.ai_readiness.areas, AI_AREA_MAX) : []
	);
	const humanAreas = $derived(
		scoreEnvelope ? toAreaEntries(scoreEnvelope.human_readiness.areas, HUMAN_AREA_MAX) : []
	);
	const ctaLabel = $derived(
		scoreEnvelope?.follow_up_cta === 'try_quaestor_free' ? 'Try Quaestor free' : 'Book a demo'
	);

	const patchSubmission = async () => {
		busy = true;
		message = '';
		const response = await fetch(`/admin/review/api/${data.submission.id}`, {
			method: 'PATCH',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ founder_note: note, review_status: status })
		});
		busy = false;
		message = response.ok ? 'Saved.' : 'Could not save.';
	};

	const postAction = async (path: string, success: string) => {
		busy = true;
		message = '';
		const response = await fetch(path, { method: 'POST' });
		busy = false;
		message = response.ok ? success : 'Action failed.';
		if (response.ok) location.reload();
	};
</script>

<svelte:head>
	<title>Review {data.submission.id} — Quaestor</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-6 py-10">
	<div class="flex flex-wrap items-start justify-between gap-4">
		<div>
			<a class="text-sm underline" href="/admin/review">← Back to queue</a>
			<h1 class="mt-4 text-3xl font-semibold">Review submission</h1>
			<p class="mt-2 font-mono text-xs text-black/60">{data.submission.id}</p>
		</div>
		<div
			class={`rounded-full border px-3 py-1 text-sm ${statusTone(data.submission.review_status)}`}
		>
			{data.submission.review_status || 'unreviewed'}
		</div>
	</div>

	<div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
		<div class="rounded-2xl border bg-white p-5 shadow-sm">
			<p class="text-xs font-semibold tracking-[0.2em] text-black/50 uppercase">AI readiness</p>
			{#if scoreEnvelope}
				<p class="mt-3 text-3xl font-semibold">{scoreEnvelope.ai_readiness.score}</p>
				<p class="mt-1 text-sm text-black/70">Grade {scoreEnvelope.ai_readiness.grade}</p>
			{:else}
				<p class="mt-3 text-sm text-black/60">No stored score envelope</p>
			{/if}
		</div>
		<div class="rounded-2xl border bg-white p-5 shadow-sm">
			<p class="text-xs font-semibold tracking-[0.2em] text-black/50 uppercase">Human readiness</p>
			{#if scoreEnvelope}
				<p class="mt-3 text-3xl font-semibold">{scoreEnvelope.human_readiness.score}</p>
				<p class="mt-1 text-sm text-black/70">Grade {scoreEnvelope.human_readiness.grade}</p>
			{:else}
				<p class="mt-3 text-sm text-black/60">No stored score envelope</p>
			{/if}
		</div>
		<div class="rounded-2xl border bg-white p-5 shadow-sm">
			<p class="text-xs font-semibold tracking-[0.2em] text-black/50 uppercase">Model usage</p>
			<p class="mt-3 text-3xl font-semibold">{usage.calls}</p>
			<p class="mt-1 text-sm text-black/70">tool runs · {formatUsd(usage.total_usd)}</p>
		</div>
		<div class="rounded-2xl border bg-white p-5 shadow-sm">
			<p class="text-xs font-semibold tracking-[0.2em] text-black/50 uppercase">Follow-up CTA</p>
			<p class="mt-3 text-lg font-semibold">{ctaLabel}</p>
			<p class="mt-1 text-sm text-black/70">
				Spec v{scoreEnvelope?.spec_version || data.submission.spec_version || '—'}
			</p>
		</div>
	</div>

	<div class="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(340px,0.8fr)]">
		<section class="space-y-6">
			<div class="rounded-2xl border bg-white p-5 shadow-sm">
				<h2 class="text-lg font-semibold">Submission summary</h2>
				<p class="mt-3 text-sm leading-relaxed text-black/80">{data.submission.summary}</p>
				<div class="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
					<div class="rounded-xl bg-black/5 p-3">
						<p class="text-xs text-black/50 uppercase">Email</p>
						<p class="mt-1 break-all">{data.submission.email || '—'}</p>
					</div>
					<div class="rounded-xl bg-black/5 p-3">
						<p class="text-xs text-black/50 uppercase">Source</p>
						<p class="mt-1">{data.submission.source || 'organic'}</p>
					</div>
					<div class="rounded-xl bg-black/5 p-3">
						<p class="text-xs text-black/50 uppercase">Created</p>
						<p class="mt-1">{formatDate(data.submission.created_at)}</p>
					</div>
					<div class="rounded-xl bg-black/5 p-3">
						<p class="text-xs text-black/50 uppercase">Sent</p>
						<p class="mt-1">{formatDate(data.submission.sent_at)}</p>
					</div>
				</div>
			</div>

			<div class="grid gap-6 lg:grid-cols-2">
				<div class="rounded-2xl border bg-white p-5 shadow-sm">
					<div class="flex items-center justify-between gap-3">
						<h2 class="text-lg font-semibold">AI area breakdown</h2>
						{#if scoreEnvelope}
							<span class="text-sm text-black/60"
								>{scoreEnvelope.ai_readiness.score}/100 · {scoreEnvelope.ai_readiness.grade}</span
							>
						{/if}
					</div>
					{#if scoreEnvelope}
						<p class="mt-3 text-sm leading-relaxed text-black/70">
							{scoreEnvelope.ai_readiness.summary}
						</p>
						<div class="mt-4 space-y-4">
							{#each aiAreas as area}
								<div>
									<div class="flex items-center justify-between gap-3 text-sm font-medium">
										<span>{area.label}</span>
										<span>{area.score}/{area.max}</span>
									</div>
									<div class="mt-2 h-2 rounded-full bg-black/10">
										<div
											class="h-2 rounded-full bg-black"
											style={`width: ${clampPct((area.score / area.max) * 100)}%`}
										></div>
									</div>
									{#if area.reasoning}
										<p class="mt-2 text-sm leading-relaxed text-black/70">{area.reasoning}</p>
									{/if}
									{#if area.disqualifiers.length > 0}
										<p class="mt-2 text-xs text-black/60">
											Disqualifiers: {area.disqualifiers.join(', ')}
										</p>
									{/if}
									{#if area.subdims.length > 0}
										<ul class="mt-2 space-y-1 text-xs text-black/60">
											{#each area.subdims as subdim}
												<li>
													{subdim.label}: {subdim.score}
													{#if subdim.reasoning}
														— {subdim.reasoning}
													{/if}
												</li>
											{/each}
										</ul>
									{/if}
								</div>
							{/each}
						</div>
					{:else}
						<p class="mt-3 text-sm text-black/60">No stored AI breakdown.</p>
					{/if}
				</div>

				<div class="rounded-2xl border bg-white p-5 shadow-sm">
					<div class="flex items-center justify-between gap-3">
						<h2 class="text-lg font-semibold">Human area breakdown</h2>
						{#if scoreEnvelope}
							<span class="text-sm text-black/60"
								>{scoreEnvelope.human_readiness.score}/100 · {scoreEnvelope.human_readiness
									.grade}</span
							>
						{/if}
					</div>
					{#if scoreEnvelope}
						<p class="mt-3 text-sm leading-relaxed text-black/70">
							{scoreEnvelope.human_readiness.summary}
						</p>
						<div class="mt-4 space-y-4">
							{#each humanAreas as area}
								<div>
									<div class="flex items-center justify-between gap-3 text-sm font-medium">
										<span>{area.label}</span>
										<span>{area.score}/{area.max}</span>
									</div>
									<div class="mt-2 h-2 rounded-full bg-black/10">
										<div
											class="h-2 rounded-full bg-black"
											style={`width: ${clampPct((area.score / area.max) * 100)}%`}
										></div>
									</div>
									{#if area.reasoning}
										<p class="mt-2 text-sm leading-relaxed text-black/70">{area.reasoning}</p>
									{/if}
									{#if area.disqualifiers.length > 0}
										<p class="mt-2 text-xs text-black/60">
											Disqualifiers: {area.disqualifiers.join(', ')}
										</p>
									{/if}
								</div>
							{/each}
						</div>
					{:else}
						<p class="mt-3 text-sm text-black/60">No stored Human breakdown.</p>
					{/if}
				</div>
			</div>

			<div class="grid gap-6 lg:grid-cols-2">
				<div class="rounded-2xl border bg-white p-5 shadow-sm">
					<h2 class="text-lg font-semibold">Top pathologies</h2>
					{#if pathologies.length > 0}
						<ul class="mt-4 space-y-4">
							{#each pathologies as pathology}
								<li class="rounded-xl bg-black/5 p-4">
									<div class="flex items-center justify-between gap-3">
										<p class="font-medium">{pathology.title}</p>
										<span class="text-xs text-black/50 uppercase">{pathology.source}</span>
									</div>
									<p class="mt-2 text-sm leading-relaxed text-black/70">{pathology.detail}</p>
									<p class="mt-2 text-xs text-black/50">Area: {titleCase(pathology.area)}</p>
								</li>
							{/each}
						</ul>
					{:else}
						<p class="mt-3 text-sm text-black/60">No stored pathologies.</p>
					{/if}
				</div>

				<div class="rounded-2xl border bg-white p-5 shadow-sm">
					<h2 class="text-lg font-semibold">Variance + usage</h2>
					<div class="mt-4 grid gap-3 sm:grid-cols-2">
						<div class="rounded-xl bg-black/5 p-4">
							<p class="text-xs text-black/50 uppercase">AI variance</p>
							<p class="mt-2 text-2xl font-semibold">{variance.ai?.max_divergence ?? 0}</p>
							<p class="text-sm text-black/60">
								max · mean {(variance.ai?.mean_divergence ?? 0).toFixed(2)}
							</p>
						</div>
						<div class="rounded-xl bg-black/5 p-4">
							<p class="text-xs text-black/50 uppercase">Human variance</p>
							<p class="mt-2 text-2xl font-semibold">{variance.human?.max_divergence ?? 0}</p>
							<p class="text-sm text-black/60">
								max · mean {(variance.human?.mean_divergence ?? 0).toFixed(2)}
							</p>
						</div>
					</div>
					<div class="mt-4 grid gap-3 sm:grid-cols-2">
						<div class="rounded-xl bg-black/5 p-4">
							<p class="text-xs text-black/50 uppercase">Input tokens</p>
							<p class="mt-2 text-lg font-semibold">{formatInt(usage.input_tokens)}</p>
						</div>
						<div class="rounded-xl bg-black/5 p-4">
							<p class="text-xs text-black/50 uppercase">Output tokens</p>
							<p class="mt-2 text-lg font-semibold">{formatInt(usage.output_tokens)}</p>
						</div>
					</div>
					{#if topVarianceDimensions(variance.ai).length > 0 || topVarianceDimensions(variance.human).length > 0}
						<div class="mt-4 space-y-3 text-sm">
							{#if topVarianceDimensions(variance.ai).length > 0}
								<div>
									<p class="font-medium">AI hottest dimensions</p>
									<ul class="mt-2 space-y-1 text-black/70">
										{#each topVarianceDimensions(variance.ai) as dimension}
											<li>
												{titleCase(dimension.key)} · span {dimension.span} · {dimension.values.join(
													' / '
												)}
											</li>
										{/each}
									</ul>
								</div>
							{/if}
							{#if topVarianceDimensions(variance.human).length > 0}
								<div>
									<p class="font-medium">Human hottest dimensions</p>
									<ul class="mt-2 space-y-1 text-black/70">
										{#each topVarianceDimensions(variance.human) as dimension}
											<li>
												{titleCase(dimension.key)} · span {dimension.span} · {dimension.values.join(
													' / '
												)}
											</li>
										{/each}
									</ul>
								</div>
							{/if}
						</div>
					{/if}
				</div>
			</div>

			<details class="rounded-2xl border bg-white p-5 shadow-sm" open>
				<summary class="cursor-pointer text-lg font-semibold">Normalized text</summary>
				<pre
					class="mt-4 overflow-x-auto rounded-xl bg-black/5 p-4 text-xs whitespace-pre-wrap">{data
						.submission.normalized_text || '—'}</pre>
			</details>

			<details class="rounded-2xl border bg-white p-5 shadow-sm">
				<summary class="cursor-pointer text-lg font-semibold">Original document text</summary>
				<pre
					class="mt-4 overflow-x-auto rounded-xl bg-black/5 p-4 text-xs whitespace-pre-wrap">{data
						.submission.original_doc || '—'}</pre>
			</details>

			<details class="rounded-2xl border bg-white p-5 shadow-sm">
				<summary class="cursor-pointer text-lg font-semibold"
					>Raw model runs ({artifacts.length})</summary
				>
				<div class="mt-4 space-y-4">
					{#if artifacts.length > 0}
						{#each artifacts as artifact, index}
							<div class="rounded-xl bg-black/5 p-4">
								<div class="flex flex-wrap items-center justify-between gap-3">
									<p class="font-medium">Run {index + 1} · {artifact.prompt_kind.toUpperCase()}</p>
									<p class="text-xs text-black/50">{artifact.tool_name} · {artifact.model}</p>
								</div>
								<p class="mt-2 text-xs text-black/60">
									Input {formatInt(artifact.usage?.input_tokens ?? 0)} · Output {formatInt(
										artifact.usage?.output_tokens ?? 0
									)}
								</p>
								<pre
									class="mt-3 overflow-x-auto rounded-lg bg-white p-3 text-xs whitespace-pre-wrap">{JSON.stringify(
										artifact.tool_input,
										null,
										2
									)}</pre>
							</div>
						{/each}
					{:else}
						<p class="text-sm text-black/60">No raw model artifacts stored.</p>
					{/if}
				</div>
			</details>
		</section>

		<aside class="space-y-4 rounded-2xl border bg-white p-5 shadow-sm">
			<div>
				<h2 class="text-lg font-semibold">Review controls</h2>
				<p class="mt-2 text-sm text-black/70">
					Prompt {data.submission.prompt_version || '—'} · file {data.submission.file_name || '—'}
				</p>
				{#if data.submission.file_size || data.submission.file_mime}
					<p class="mt-1 text-xs text-black/50">
						{data.submission.file_size ? `${formatInt(data.submission.file_size)} bytes` : ''}
						{#if data.submission.file_size && data.submission.file_mime}
							·
						{/if}
						{data.submission.file_mime || ''}
					</p>
				{/if}
			</div>

			<label class="block space-y-2 text-sm">
				<span>Review status</span>
				<select bind:value={status} class="w-full rounded-xl border px-3 py-2">
					<option value="unreviewed">unreviewed</option>
					<option value="reviewing">reviewing</option>
					<option value="sent">sent</option>
					<option value="archived">archived</option>
				</select>
			</label>

			<label class="block space-y-2 text-sm">
				<span>Founder note</span>
				<textarea
					bind:value={note}
					rows="10"
					class="w-full rounded-xl border px-3 py-2"
					placeholder="What should the recipient understand beyond the raw score?"
				></textarea>
			</label>

			<div class="grid gap-3">
				<button
					class="rounded-xl border border-[rgb(var(--accent))] bg-[rgb(var(--accent))] px-4 py-2 text-left font-semibold text-[rgb(var(--bg-elev))] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
					disabled={busy}
					onclick={patchSubmission}
				>
					Save note + status
				</button>
				<button
					class="rounded-xl border border-[rgb(var(--accent))] bg-[rgb(var(--accent))] px-4 py-2 text-left font-semibold text-[rgb(var(--bg-elev))] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
					disabled={busy}
					onclick={() =>
						postAction(`/admin/review/api/${data.submission.id}/rescore`, 'Re-scored.')}
				>
					Re-score from stored text
				</button>
				<button
					class="rounded-xl border border-[rgb(var(--accent))] bg-[rgb(var(--accent))] px-4 py-2 text-left font-semibold text-[rgb(var(--bg-elev))] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
					disabled={busy}
					onclick={() => postAction(`/admin/review/api/${data.submission.id}/send`, 'Sent report.')}
				>
					Send final report email
				</button>
			</div>

			{#if message}
				<p class="rounded-xl bg-black/5 px-3 py-2 text-sm">{message}</p>
			{/if}
		</aside>
	</div>
</div>
