<script lang="ts">
	import type { GraderResponse } from '$lib/grader';
	import { trackEvent } from '$lib/analytics';
	import { MAX_CHARS, validateInput } from '$lib/grader';

	type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';
	type SubmitRouteResponse =
		| {
				ok: true;
				mode: 'graded';
				message: string;
				result: GraderResponse;
		  }
		| {
				ok: true;
				mode: 'queued';
				message: string;
				fallback_reason?: string | null;
		  };

	const MAX_FILE_BYTES = 10 * 1024 * 1024;
	const ALLOWED_EXTENSIONS = ['.docx', '.pptx', '.md', '.txt', '.html'] as const;
	const FILE_ACCEPT =
		'.docx,.pptx,.md,.txt,.html,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/markdown,text/plain,text/html';
	const aiAreaItems = [
		{ key: 'named_doer', label: 'Named doer' },
		{ key: 'context_source_named', label: 'Context source named' },
		{ key: 'boundaries_defined', label: 'Boundaries defined' },
		{ key: 'step_structure', label: 'Step structure' },
		{ key: 'decision_points_defined', label: 'Decision points' },
		{
			key: 'outputs_handoffs_and_completeness',
			label: 'Outputs, handoffs, completeness'
		}
	] as const;
	const humanAreaItems = [
		{ key: 'readability', label: 'Readability' },
		{ key: 'scannability', label: 'Scannability' },
		{ key: 'self_contained_context', label: 'Self-contained context' },
		{ key: 'references_linked', label: 'References linked' },
		{ key: 'terms_consistent', label: 'Terms consistent' },
		{ key: 'internal_consistency', label: 'Internal consistency' }
	] as const;

	let sopText = $state('');
	let replyEmail = $state('');
	let fileMeta = $state<{ name: string; size: number } | null>(null);
	let fileInput: HTMLInputElement | null = null;
	let submitStatus = $state<SubmitStatus>('idle');
	let formError = $state('');
	let submitMessage = $state('');
	let gradeResult = $state<GraderResponse | null>(null);

	const charsUsed = $derived(sopText.trim().length);
	const hasFile = $derived(fileMeta !== null);
	const submitLabel = $derived(
		hasFile
			? submitStatus === 'submitting'
				? 'Scoring file…'
				: 'Upload and score'
			: submitStatus === 'submitting'
				? 'Scoring…'
				: 'Get score'
	);
	const gradeCaption = $derived.by(() => {
		if (!gradeResult?.valid) return '';
		if (gradeResult.follow_up_cta === 'try_quaestor_free') {
			return 'Strong enough for direct product trial on both the AI and human axes.';
		}

		if (gradeResult.ai_readiness.grade === 'F' || gradeResult.human_readiness.grade === 'F') {
			return 'The process is still carrying structural gaps that would create chaos for both agents and new hires.';
		}

		return 'There is usable structure here, but it still needs human guardrails and cleanup before it scales cleanly.';
	});
	const followUpHref = $derived.by(() => {
		if (!gradeResult?.valid) return '';
		return gradeResult.follow_up_cta === 'try_quaestor_free'
			? 'https://qstr.cursus.tools/login?utm_source=cursus.tools&utm_medium=website&utm_campaign=v1_launch&utm_content=ai_score_result'
			: 'https://cal.com/danny-cursus/15min';
	});
	const followUpLabel = $derived.by(() => {
		if (!gradeResult?.valid) return '';
		return gradeResult.follow_up_cta === 'try_quaestor_free' ? 'Try Quaestor free' : 'Book a demo';
	});

	const getFileInputEl = (): HTMLInputElement | null => {
		if (fileInput) return fileInput;
		if (typeof document === 'undefined') return null;
		return document.querySelector<HTMLInputElement>(
			'input[type="file"][data-role="ai-score-file"]'
		);
	};

	const getCurrentFile = (): File | null => {
		const input = getFileInputEl();
		const f = input?.files?.[0];
		return f && f.size > 0 ? f : null;
	};

	const getSource = (): string => {
		if (typeof window === 'undefined') {
			return 'organic';
		}

		const value = new URLSearchParams(window.location.search).get('utm_source')?.trim();
		return value || 'organic';
	};

	const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

	const hasAllowedExtension = (name: string) => {
		const lower = name.toLowerCase();
		return ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext));
	};

	const formatBytes = (bytes: number) => {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	};

	const getErrorMessage = (payload: unknown, fallback: string): string => {
		if (
			typeof payload === 'object' &&
			payload !== null &&
			'error' in payload &&
			typeof payload.error === 'string'
		) {
			return payload.error;
		}

		return fallback;
	};

	const isSubmitRouteResponse = (value: unknown): value is SubmitRouteResponse => {
		if (!value || typeof value !== 'object') return false;
		const candidate = value as Record<string, unknown>;
		return (
			candidate.ok === true &&
			(candidate.mode === 'graded' || candidate.mode === 'queued') &&
			typeof candidate.message === 'string'
		);
	};

	const trackResultCta = () => {
		if (!gradeResult?.valid) return;
		if (gradeResult.follow_up_cta === 'try_quaestor_free') {
			trackEvent('signup_start', { location: 'ai_score_result_cta' });
			return;
		}
		trackEvent('booking_click', { location: 'ai_score_result_cta' });
	};

	const revealResult = () => {
		if (typeof document === 'undefined') return;
		requestAnimationFrame(() => {
			document.getElementById('ai-score-result')?.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	};

	const onFileChange = (event: Event) => {
		formError = '';
		submitMessage = '';
		const input = event.currentTarget as HTMLInputElement;
		const file = input.files?.[0] ?? null;

		if (!file) {
			fileMeta = null;
			return;
		}

		if (!hasAllowedExtension(file.name)) {
			formError = 'Supported file types: .docx, .pptx, .md, .txt, .html.';
			input.value = '';
			fileMeta = null;
			return;
		}

		if (file.size > MAX_FILE_BYTES) {
			formError = 'File is too large. Keep attachments under 10 MB.';
			input.value = '';
			fileMeta = null;
			return;
		}

		fileMeta = { name: file.name, size: file.size };
		gradeResult = null;
	};

	const clearFile = () => {
		fileMeta = null;
		const input = getFileInputEl();
		if (input) {
			input.value = '';
		}
	};

	const submitAiScoreSubmission = async (
		currentFile: File | null,
		normalizedEmail: string,
		validatedText: string,
		source: string
	) => {
		const payload: Record<string, unknown> = {
			email: normalizedEmail,
			source
		};

		if (validatedText) {
			payload.text = validatedText;
		}

		if (currentFile) {
			const buffer = await currentFile.arrayBuffer();
			const bytes = new Uint8Array(buffer);
			let binary = '';
			const chunkSize = 0x8000;
			for (let i = 0; i < bytes.length; i += chunkSize) {
				binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
			}

			payload.file = {
				name: currentFile.name,
				size: currentFile.size,
				type: currentFile.type || '',
				content_base64: btoa(binary)
			};
		}

		const response = await fetch('/ai-score/submit', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(payload)
		});

		const responseData = (await response.json()) as unknown;
		if (!response.ok) {
			throw new Error(
				getErrorMessage(responseData, 'Could not send your submission right now. Please try again.')
			);
		}

		if (!isSubmitRouteResponse(responseData)) {
			throw new Error('Unexpected response from AI Score submission.');
		}

		trackEvent('ai_score_submit', {
			source,
			mode:
				responseData.mode === 'graded'
					? currentFile
						? 'instant_file_grade'
						: 'instant_grade'
					: currentFile
						? 'manual_file_review'
						: 'manual_review',
			has_file: currentFile ? 'true' : 'false'
		});

		submitStatus = 'success';
		submitMessage = responseData.message;

		if (responseData.mode === 'graded') {
			gradeResult = responseData.result;
			revealResult();
		} else {
			gradeResult = null;
		}

		sopText = '';
		replyEmail = '';
		clearFile();
	};

	const submitForReview = async (event: SubmitEvent) => {
		event.preventDefault();

		formError = '';
		submitMessage = '';

		const normalizedEmail = replyEmail.trim();
		const currentFile = getCurrentFile();
		const trimmedText = sopText.trim();
		const source = getSource();
		let validatedText = '';

		if (!isValidEmail(normalizedEmail)) {
			formError =
				'Enter a valid email address so we can send your submission to our inbox and reply.';
			return;
		}

		if (currentFile) {
			if (trimmedText.length > MAX_CHARS) {
				formError = `Keep typed notes under ${MAX_CHARS} characters.`;
				return;
			}

			validatedText = trimmedText;
		} else {
			const validation = validateInput(sopText);
			if (!validation.valid) {
				formError = validation.error;
				return;
			}
			validatedText = validation.text;
		}

		submitStatus = 'submitting';

		try {
			await submitAiScoreSubmission(currentFile, normalizedEmail, validatedText, source);
		} catch (error) {
			submitStatus = 'error';
			submitMessage = error instanceof Error ? error.message : 'Network error while grading.';
		}
	};
</script>

<svelte:head>
	<title>AI Score — Quaestor</title>
	<meta
		name="description"
		content="Paste or upload an SOP, flow, or process doc and get a free AI-Readiness evaluation."
	/>
</svelte:head>

<div class="min-h-screen overflow-x-hidden bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
	<div class="relative">
		<section class="relative py-12 md:py-20">
			<div class="mx-auto w-full max-w-5xl px-6">
				<div class="text-center">
					<span
						class="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-[rgb(var(--accent))]/20 bg-[rgb(var(--accent))]/5 px-3 py-1 text-xs text-[rgb(var(--accent))]"
					>
						✦ AI Score
					</span>
					<h1 class="mt-6 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
						Paste one SOP or process.
					</h1>
					<h2 class="mt-4 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
						Get an instant AI-readiness score.
					</h2>
					<p class="mx-auto mt-4 max-w-2xl text-pretty text-[rgb(var(--muted))]">
						Enter your email, paste text for an immediate result, or upload a file. Every submission
						also goes to our inbox so we can follow up personally.
					</p>
				</div>

				<div class="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
					<form
						class="rounded-[1.9rem] border border-[rgb(var(--border-strong))] bg-[rgb(var(--bg-elev))] p-6 shadow-[0_24px_60px_rgb(103_80_54_/_0.12)] md:p-8"
						onsubmit={submitForReview}
					>
						<label class="space-y-2 text-sm">
							<span class="text-[rgb(var(--surface-text-strong))]">Email (required)</span>
							<input
								type="email"
								bind:value={replyEmail}
								class="w-full rounded-xl border border-[rgb(var(--border))] bg-black/30 px-3 py-3 text-sm text-white placeholder:text-[rgb(var(--muted))]"
								placeholder="you@company.com"
							/>
						</label>

						<label class="mt-4 block space-y-2 text-sm">
							<span class="text-[rgb(var(--surface-text-strong))]">SOP text (100–50,000 chars)</span
							>
							<textarea
								bind:value={sopText}
								rows="10"
								maxlength={MAX_CHARS}
								class="w-full rounded-xl border border-[rgb(var(--border))] bg-black/30 px-3 py-3 text-sm text-white placeholder:text-[rgb(var(--muted))]"
								placeholder="Paste your SOP, workflow, or process doc here for an instant read."
							></textarea>
						</label>

						<div class="mt-3 flex items-center justify-between text-xs text-[rgb(var(--muted))]">
							<span>{charsUsed} / {MAX_CHARS}</span>
							<span
								>{hasFile
									? 'File ingest → inline grade or inbox fallback'
									: 'Text submit → inbox + instant result'}</span
							>
						</div>

						<div class="mt-5 space-y-2 text-sm">
							<span class="text-[rgb(var(--surface-text-strong))]"
								>Or attach a file for inline grading</span
							>
							<div
								class="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-[rgb(var(--border))] bg-black/20 px-3 py-3"
							>
								<input
									bind:this={fileInput}
									type="file"
									accept={FILE_ACCEPT}
									onchange={onFileChange}
									data-role="ai-score-file"
									class="block max-w-full text-xs text-[rgb(var(--muted))] file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-xs file:text-white hover:file:bg-white/20"
								/>
								{#if fileMeta}
									<span class="text-xs text-[rgb(var(--surface-text-body))]">
										{fileMeta.name} · {formatBytes(fileMeta.size)}
									</span>
									<button
										type="button"
										onclick={clearFile}
										class="text-xs text-[rgb(var(--muted))] underline hover:text-[rgb(var(--surface-text-strong))]"
									>
										remove
									</button>
								{/if}
							</div>
							<p class="text-xs text-[rgb(var(--muted))]">
								.docx, .md, .txt, or .html score inline. .pptx is accepted and routed to inbox
								review. Up to 10 MB.
							</p>
							<div class="mt-4 rounded-2xl border border-[rgb(var(--border))] bg-white/70 p-4">
								<p class="text-sm font-semibold text-[rgb(var(--text))]">
									Don't have docs to upload?
								</p>
								<p class="mt-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
									That makes it harder to use agents in your business. If you'd like help changing
									that, we can connect you with our network of partners to help build your
									documentation.
								</p>
								<a
									class="mt-3 inline-flex items-center rounded-xl bg-[rgb(var(--accent))] px-4 py-2 text-sm font-semibold text-[rgb(var(--bg-elev))] shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:brightness-110"
									href="/partners"
								>
									Connect me with a partner →
								</a>
							</div>
						</div>

						{#if formError}
							<p
								class="mt-4 rounded-xl border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-100"
							>
								{formError}
							</p>
						{/if}

						{#if submitMessage}
							<p
								class={`mt-4 rounded-xl border px-3 py-2 text-sm ${
									submitStatus === 'error'
										? 'border-red-400/40 bg-red-500/10 text-red-100'
										: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100'
								}`}
							>
								{submitMessage}
							</p>
						{/if}

						<div class="mt-6 flex justify-end">
							<button
								type="submit"
								disabled={submitStatus === 'submitting'}
								class="inline-flex min-w-[190px] items-center justify-center rounded-xl bg-[rgb(var(--accent))] px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
							>
								{submitLabel}
							</button>
						</div>
					</form>

					<aside
						class="rounded-[1.9rem] border border-[rgb(var(--border))] bg-white/70 p-6 shadow-[0_18px_44px_rgb(103_80_54_/_0.08)] md:p-7"
					>
						<p
							class="text-[11px] font-semibold tracking-[0.24em] text-[rgb(var(--muted))] uppercase"
						>
							How this works
						</p>
						<h3 class="mt-3 text-2xl font-semibold text-[rgb(var(--text))]">
							Paste for instant scoring.
						</h3>
						<p class="mt-3 text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
							The page submits through <span class="font-mono text-xs">/ai-score/submit</span> so every
							lead includes a reply email. Text submissions are graded inline. File uploads try inline
							extraction first, then fall back to inbox review when the file type or content blocks instant
							grading.
						</p>

						<div class="mt-6 grid gap-3">
							<div
								class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-4"
							>
								<p class="text-sm font-semibold text-[rgb(var(--text))]">Instant path</p>
								<p class="mt-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
									Paste 100–50,000 characters and get inline AI and Human readiness scores, summary,
									and top pathologies while your submission also lands in our inbox.
								</p>
							</div>
							<div
								class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-4"
							>
								<p class="text-sm font-semibold text-[rgb(var(--text))]">Manual file path</p>
								<p class="mt-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
									Attach a .docx, .md, .txt, or .html file for inline extraction and scoring.
									Unsupported or non-extractable files fall back to the grader inbox.
								</p>
							</div>
							<div
								class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-4"
							>
								<p class="text-sm font-semibold text-[rgb(var(--text))]">Required reply email</p>
								<p class="mt-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
									Every submission is emailed to our inbox so we can reply directly after the score
									or manual review.
								</p>
							</div>
						</div>
					</aside>
				</div>

				{#if gradeResult}
					<section
						id="ai-score-result"
						class="mt-8 rounded-[2rem] border border-[rgb(var(--border-strong))] bg-[rgb(var(--bg-elev))] p-6 shadow-[0_24px_60px_rgb(103_80_54_/_0.12)] md:p-8"
					>
						{#if gradeResult.valid}
							<div class="grid gap-6 xl:grid-cols-[280px_1fr] xl:items-start">
								<div class="space-y-4">
									<div
										class="rounded-[1.6rem] border border-[rgb(var(--border))] bg-white/70 p-6 text-center"
									>
										<p
											class="text-[11px] font-semibold tracking-[0.24em] text-[rgb(var(--muted))] uppercase"
										>
											AI readiness
										</p>
										<div class="mt-4 text-6xl leading-none font-semibold text-[rgb(var(--accent))]">
											{gradeResult.ai_readiness.score}
										</div>
										<p class="mt-2 text-sm font-semibold text-[rgb(var(--text))]">
											Grade {gradeResult.ai_readiness.grade}
										</p>
										<p class="mt-4 text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
											{gradeCaption}
										</p>
									</div>

									<div
										class="rounded-[1.6rem] border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-5"
									>
										<p
											class="text-[11px] font-semibold tracking-[0.22em] text-[rgb(var(--muted))] uppercase"
										>
											Human readiness
										</p>
										<div class="mt-3 text-4xl leading-none font-semibold text-[rgb(var(--text))]">
											{gradeResult.human_readiness.score}
										</div>
										<p class="mt-2 text-sm font-semibold text-[rgb(var(--text-secondary))]">
											Grade {gradeResult.human_readiness.grade}
										</p>
									</div>
								</div>

								<div>
									<h3 class="text-3xl font-semibold text-[rgb(var(--text))]">
										What the rubric sees
									</h3>
									<p
										class="mt-4 max-w-3xl text-base leading-relaxed text-[rgb(var(--text-secondary))]"
									>
										{gradeResult.summary}
									</p>

									<div class="mt-6 grid gap-4 lg:grid-cols-2">
										<div
											class="rounded-[1.6rem] border border-[rgb(var(--border))] bg-white/70 p-5"
										>
											<p
												class="text-[11px] font-semibold tracking-[0.22em] text-[rgb(var(--muted))] uppercase"
											>
												AI area breakdown
											</p>
											<div class="mt-4 grid gap-3 sm:grid-cols-2">
												{#each aiAreaItems as item}
													<div
														class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-4"
													>
														<p class="text-xs font-semibold text-[rgb(var(--text))]">
															{item.label}
														</p>
														<p class="mt-2 text-2xl font-semibold text-[rgb(var(--accent))]">
															{gradeResult.ai_readiness.areas[item.key].score}
														</p>
													</div>
												{/each}
											</div>
										</div>

										<div
											class="rounded-[1.6rem] border border-[rgb(var(--border))] bg-white/70 p-5"
										>
											<p
												class="text-[11px] font-semibold tracking-[0.22em] text-[rgb(var(--muted))] uppercase"
											>
												Human area breakdown
											</p>
											<div class="mt-4 grid gap-3 sm:grid-cols-2">
												{#each humanAreaItems as item}
													<div
														class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-4"
													>
														<p class="text-xs font-semibold text-[rgb(var(--text))]">
															{item.label}
														</p>
														<p class="mt-2 text-2xl font-semibold text-[rgb(var(--text))]">
															{gradeResult.human_readiness.areas[item.key].score}
														</p>
													</div>
												{/each}
											</div>
										</div>
									</div>

									<div
										class="mt-6 rounded-[1.6rem] border border-[rgb(var(--border))] bg-white/70 p-5"
									>
										<div class="flex flex-wrap items-center justify-between gap-3">
											<p
												class="text-[11px] font-semibold tracking-[0.22em] text-[rgb(var(--muted))] uppercase"
											>
												Top pathologies
											</p>
											<a
												class="inline-flex items-center rounded-xl bg-[rgb(var(--accent))] px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:brightness-110"
												href={followUpHref}
												onclick={trackResultCta}
											>
												{followUpLabel} →
											</a>
										</div>
										<ul
											class="mt-4 space-y-4 text-sm leading-relaxed text-[rgb(var(--text-secondary))]"
										>
											{#each gradeResult.pathologies as pathology}
												<li
													class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-4"
												>
													<p class="font-semibold text-[rgb(var(--text))]">{pathology.title}</p>
													<p class="mt-2">{pathology.detail}</p>
												</li>
											{/each}
										</ul>
									</div>
								</div>
							</div>
						{:else}
							<div class="rounded-[1.6rem] border border-[rgb(var(--border))] bg-white/70 p-6">
								<p
									class="text-[11px] font-semibold tracking-[0.24em] text-[rgb(var(--muted))] uppercase"
								>
									Result
								</p>
								<h3 class="mt-3 text-3xl font-semibold text-[rgb(var(--text))]">
									This doesn’t look like operational content yet.
								</h3>
								<p
									class="mt-4 max-w-3xl text-base leading-relaxed text-[rgb(var(--text-secondary))]"
								>
									{gradeResult.message}
								</p>
							</div>
						{/if}
					</section>
				{/if}
			</div>
		</section>
	</div>
</div>
