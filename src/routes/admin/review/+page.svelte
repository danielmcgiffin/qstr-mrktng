<script lang="ts">
	let { data } = $props();

	const statusTone = (value: string): string => {
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

	const formatDate = (value: string): string => new Date(value).toLocaleString();
	const truncate = (value: string, max = 180): string =>
		value.length > max ? `${value.slice(0, max).trimEnd()}…` : value;

	const statusCounts = $derived.by(() => {
		const counts = {
			unreviewed: 0,
			reviewing: 0,
			sent: 0,
			archived: 0
		};
		for (const submission of data.submissions) {
			const key = submission.review_status || 'unreviewed';
			if (key in counts) {
				counts[key as keyof typeof counts] += 1;
			}
		}
		return counts;
	});
</script>

<svelte:head>
	<title>Admin Review — Quaestor</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-6 py-10">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<h1 class="text-3xl font-semibold">Grader review queue</h1>
			<p class="mt-2 text-sm text-black/70">
				Triage submissions, add founder context, re-score when needed, and send the final report.
			</p>
		</div>
	</div>

	{#if !data.authorized}
		<form class="mt-6 max-w-md rounded-2xl border bg-white p-5 shadow-sm" method="GET">
			<label class="block space-y-2 text-sm">
				<span>Admin token</span>
				<input
					name="admin_token"
					type="password"
					class="w-full rounded-xl border px-3 py-2"
					placeholder="PRIVATE_ADMIN_TOKEN"
				/>
			</label>
			<button
				class="mt-4 rounded-xl bg-[rgb(var(--accent))] px-4 py-2 font-semibold text-[rgb(var(--bg-elev))]"
				type="submit"
			>
				Open queue
			</button>
		</form>
	{:else}
		<div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
			<div class="rounded-2xl border bg-white p-5 shadow-sm">
				<p class="text-xs font-semibold tracking-[0.2em] text-black/50 uppercase">Unreviewed</p>
				<p class="mt-3 text-3xl font-semibold">{statusCounts.unreviewed}</p>
			</div>
			<div class="rounded-2xl border bg-white p-5 shadow-sm">
				<p class="text-xs font-semibold tracking-[0.2em] text-black/50 uppercase">Reviewing</p>
				<p class="mt-3 text-3xl font-semibold">{statusCounts.reviewing}</p>
			</div>
			<div class="rounded-2xl border bg-white p-5 shadow-sm">
				<p class="text-xs font-semibold tracking-[0.2em] text-black/50 uppercase">Sent</p>
				<p class="mt-3 text-3xl font-semibold">{statusCounts.sent}</p>
			</div>
			<div class="rounded-2xl border bg-white p-5 shadow-sm">
				<p class="text-xs font-semibold tracking-[0.2em] text-black/50 uppercase">Archived</p>
				<p class="mt-3 text-3xl font-semibold">{statusCounts.archived}</p>
			</div>
		</div>

		<div class="mt-6 flex flex-wrap gap-3">
			{#each ['unreviewed', 'reviewing', 'sent', 'archived'] as status}
				<a
					href={`/admin/review?status=${status}`}
					class={`rounded-full border px-3 py-1 text-sm ${data.status === status ? 'border-[rgb(var(--accent))] bg-[rgb(var(--accent))] font-semibold text-[rgb(var(--bg-elev))]' : 'bg-white text-[rgb(var(--text-secondary))]'}`}
				>
					{status}
				</a>
			{/each}
		</div>

		<div class="mt-6 space-y-4">
			{#if data.submissions.length === 0}
				<div class="rounded-2xl border bg-white p-6 text-sm text-black/60 shadow-sm">
					No submissions in this bucket yet.
				</div>
			{:else}
				{#each data.submissions as submission}
					<a
						class="block rounded-2xl border bg-white p-5 shadow-sm transition hover:border-black/30 hover:shadow-md"
						href={`/admin/review/${submission.id}`}
					>
						<div class="flex flex-wrap items-start justify-between gap-4">
							<div class="min-w-0 flex-1">
								<div class="flex flex-wrap items-center gap-2">
									<span
										class={`rounded-full border px-2.5 py-1 text-xs ${statusTone(submission.review_status || 'unreviewed')}`}
									>
										{submission.review_status || 'unreviewed'}
									</span>
									<span class="rounded-full border px-2.5 py-1 text-xs text-black/60">
										{submission.overall_grade} · {submission.total_score}
									</span>
									{#if submission.file_name}
										<span class="rounded-full border px-2.5 py-1 text-xs text-black/60">
											{submission.file_name}
										</span>
									{/if}
								</div>
								<p class="mt-3 font-mono text-xs text-black/45">{submission.id}</p>
								<p class="mt-3 text-sm leading-relaxed text-black/80">
									{truncate(submission.summary)}
								</p>
							</div>

							<div class="min-w-[220px] text-sm text-black/65">
								<p><strong>Email:</strong> {submission.email || '—'}</p>
								<p class="mt-1"><strong>Source:</strong> {submission.source || 'organic'}</p>
								<p class="mt-1"><strong>Created:</strong> {formatDate(submission.created_at)}</p>
								{#if submission.sent_at}
									<p class="mt-1"><strong>Sent:</strong> {formatDate(submission.sent_at)}</p>
								{/if}
							</div>
						</div>
					</a>
				{/each}
			{/if}
		</div>
	{/if}
</div>
