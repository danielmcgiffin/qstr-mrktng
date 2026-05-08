<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';
	import { trackEvent } from '$lib/analytics';
	import type { GraderResponse } from '$lib/grader';
	import { MAX_CHARS, WARNING_CHARS, validateInput } from '$lib/grader';
	import { onMount } from 'svelte';

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

	type MammothBrowser = {
		extractRawText: (input: { arrayBuffer: ArrayBuffer }) => Promise<{ value?: string }>;
		convertToHtml: (input: { arrayBuffer: ArrayBuffer }) => Promise<{ value?: string }>;
	};

	const MAX_FILE_BYTES = 10 * 1024 * 1024;
	const ALLOWED_EXTENSIONS = ['.docx', '.pptx', '.md', '.txt', '.html'] as const;
	const FILE_ACCEPT =
		'.docx,.pptx,.md,.txt,.html,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/markdown,text/plain,text/html';
	const selfServeSignupHref =
		'https://qstr.cursus.tools/login?utm_source=cursus.tools&utm_medium=website&utm_campaign=v1_launch&utm_content=ai_score_result';
	const implementationIntakeHref =
		'https://cal.com/danny-cursus/15min?utm_source=cursus.tools&utm_medium=website&utm_campaign=ai_score&utm_content=implementation_intake';
	const seo = {
		title: 'AI Score for SOPs | Quaestor',
		description:
			'Paste an SOP. Get AI-readiness, human-readiness, and the handoffs likely to break.',
		ogTitle: 'Paste an SOP. Get two scores. See what breaks.',
		ogDescription: 'Score the process before you automate it or hand it off.'
	};
	const aiAreaItems = [
		{ key: 'named_doer', label: 'Named owner', max: 15 },
		{ key: 'context_source_named', label: 'Source named', max: 20 },
		{ key: 'boundaries_defined', label: 'Start and finish', max: 15 },
		{ key: 'step_structure', label: 'Step shape', max: 15 },
		{ key: 'decision_points_defined', label: 'Decision rules', max: 15 },
		{
			key: 'outputs_handoffs_and_completeness',
			label: 'Outputs and handoffs',
			max: 20
		}
	] as const;
	const humanAreaItems = [
		{ key: 'readability', label: 'Plain language', max: 20 },
		{ key: 'scannability', label: 'Easy scan', max: 15 },
		{ key: 'self_contained_context', label: 'Self-contained', max: 20 },
		{ key: 'references_linked', label: 'Links and sources', max: 15 },
		{ key: 'terms_consistent', label: 'Same words', max: 15 },
		{ key: 'internal_consistency', label: 'No contradictions', max: 15 }
	] as const;

	let sopText = $state('');
	let replyEmail = $state('');
	let fileMeta = $state<{ name: string; size: number } | null>(null);
	let fileInput: HTMLInputElement | null = null;
	let submitStatus = $state<SubmitStatus>('idle');
	let formError = $state('');
	let submitMessage = $state('');
	let gradeResult = $state<GraderResponse | null>(null);
	let isHydrated = $state(false);
	let hasTrackedFormStart = false;

	onMount(() => {
		isHydrated = true;
	});

	const textFieldClass = $derived(
		`w-full rounded-xl bg-[rgb(var(--bg-panel))] px-3 py-3 text-sm text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))] focus:outline-none focus:border-[rgb(var(--accent))] ${
			formError
				? 'border-2 border-[rgb(var(--accent))] focus:ring-4 focus:ring-[rgb(var(--accent))]/15'
				: 'border border-[rgb(var(--border))] focus:ring-2 focus:ring-[rgb(var(--accent))]/12'
		}`
	);

	const charsUsed = $derived(sopText.trim().length);
	const showSizeWarning = $derived(charsUsed > WARNING_CHARS);
	const hasFile = $derived(fileMeta !== null);
	const submitLabel = $derived(
		!isHydrated
			? 'Loading form'
			: hasFile
				? submitStatus === 'submitting'
					? 'Scoring file'
					: 'Score uploaded file'
				: submitStatus === 'submitting'
					? 'Scoring'
					: 'Score my SOP'
	);
	const submitDisabled = $derived(!isHydrated || submitStatus === 'submitting');
	const aiGradeCaption = $derived.by(() => {
		if (!gradeResult?.valid) return '';
		if (gradeResult.ai_readiness.grade === 'A') {
			return 'An agent can follow this. Owners, boundaries, and context are clear.';
		}
		if (gradeResult.ai_readiness.grade === 'B') {
			return 'Close. A few gaps still depend on human memory.';
		}
		if (gradeResult.ai_readiness.grade === 'C') {
			return 'An agent will stall. Handoffs and decisions need more structure.';
		}
		if (gradeResult.ai_readiness.grade === 'D') {
			return 'Not ready yet. The missing rules will break the run.';
		}
		return 'Not ready yet. Rewrite the process before an agent touches it.';
	});

	const humanGradeCaption = $derived.by(() => {
		if (!gradeResult?.valid) return '';
		if (gradeResult.human_readiness.grade === 'A') {
			return 'Clear enough for a new hire to run.';
		}
		if (gradeResult.human_readiness.grade === 'B') {
			return 'Readable, but a new hire will still ask questions.';
		}
		if (gradeResult.human_readiness.grade === 'C') {
			return 'Usable, but too much context lives outside the doc.';
		}
		if (gradeResult.human_readiness.grade === 'D') {
			return 'Hard to follow. Missing context and contradictions will slow the work.';
		}
		return 'A new hire cannot run this from the doc yet.';
	});
	const followUpHref = $derived.by(() => {
		if (!gradeResult?.valid) return '';
		return gradeResult.follow_up_cta === 'try_quaestor_free'
			? selfServeSignupHref
			: implementationIntakeHref;
	});
	const followUpLabel = $derived.by(() => {
		if (!gradeResult?.valid) return '';
		return gradeResult.follow_up_cta === 'try_quaestor_free'
			? 'Load this into Quaestor'
			: 'Fix this with us';
	});
	const followUpHelper = $derived.by(() => {
		if (!gradeResult?.valid) return '';
		return gradeResult.follow_up_cta === 'try_quaestor_free'
			? 'This process is close enough to load into the atlas and keep alive.'
			: 'Start with the lowest section. Rewrite that process before you automate it.';
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

	const trackFormStart = (field: 'text' | 'email' | 'file') => {
		if (hasTrackedFormStart) return;
		hasTrackedFormStart = true;
		trackEvent('ai_score_form_start', { source: getSource(), field });
	};

	const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

	const hasAllowedExtension = (name: string) => {
		const lower = name.toLowerCase();
		return ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext));
	};

	const isDocxFile = (file: File): boolean => {
		const lower = file.name.toLowerCase();
		return (
			lower.endsWith('.docx') ||
			(file.type || '').toLowerCase().includes('wordprocessingml.document')
		);
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

	const escapeHtml = (unsafe: string) => {
		return unsafe
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	};

	const renderMarkdown = (text: string, firstMargin: string = 'mt-4') => {
		if (!text) return '';
		let safeText = escapeHtml(text);

		// Handle bold markdown
		safeText = safeText.replace(
			/\*\*(.*?)\*\*/g,
			'<strong class="font-semibold text-[rgb(var(--text))]">$1</strong>'
		);

		// Break into blocks (paragraphs or lists)
		const blocks = safeText
			.split(/\n+/)
			.map((p) => p.trim())
			.filter((p) => p.length > 0);

		let html = '';
		let inList = false;

		blocks.forEach((block, i) => {
			const isListItem = block.startsWith('- ');
			const headerMatch = block.match(/^#{1,6}\s*(.*)$/);

			if (isListItem) {
				if (!inList) {
					html += `<ul class="${i === 0 ? firstMargin : 'mt-4'} list-disc pl-5 space-y-2">`;
					inList = true;
				}
				html += `<li>${block.substring(2)}</li>`;
			} else {
				if (inList) {
					html += '</ul>';
					inList = false;
				}
				if (headerMatch) {
					const cleanHeader = headerMatch[1].replace(/<\/?[^>]+(>|$)/g, '');
					html += `<h4 class="${i === 0 ? firstMargin : 'mt-6'} text-sm font-bold tracking-wide uppercase text-[rgb(var(--text))]">${cleanHeader}</h4>`;
				} else {
					html += `<p class="${i === 0 ? firstMargin : 'mt-4'}">${block}</p>`;
				}
			}
		});

		if (inList) {
			html += '</ul>';
		}

		return html;
	};

	const trackResultCta = () => {
		if (!gradeResult?.valid) return;
		const props = {
			location: 'ai_score_result_cta',
			ai_score: gradeResult.ai_readiness.score,
			ai_grade: gradeResult.ai_readiness.grade,
			human_score: gradeResult.human_readiness.score,
			human_grade: gradeResult.human_readiness.grade,
			cta: gradeResult.follow_up_cta
		};
		trackEvent('ai_score_result_cta_click', props);
		if (gradeResult.follow_up_cta === 'try_quaestor_free') {
			trackEvent('signup_start', props);
			return;
		}
		trackEvent('booking_click', props);
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
		trackFormStart('file');
		const input = event.currentTarget as HTMLInputElement;
		const file = input.files?.[0] ?? null;

		if (!file) {
			fileMeta = null;
			return;
		}

		if (!hasAllowedExtension(file.name)) {
			formError = 'Use .docx, .pptx, .md, .txt, or .html.';
			trackEvent('ai_score_validation_error', { source: getSource(), field: 'file_type' });
			input.value = '';
			fileMeta = null;
			return;
		}

		if (file.size > MAX_FILE_BYTES) {
			formError = 'Keep files under 10 MB.';
			trackEvent('ai_score_validation_error', { source: getSource(), field: 'file_size' });
			input.value = '';
			fileMeta = null;
			return;
		}

		fileMeta = { name: file.name, size: file.size };
		trackEvent('ai_score_file_selected', {
			source: getSource(),
			extension: file.name.split('.').pop() ?? ''
		});
		gradeResult = null;
	};

	const clearFile = () => {
		fileMeta = null;
		const input = getFileInputEl();
		if (input) {
			input.value = '';
		}
	};

	const extractDocxTextInBrowser = async (arrayBuffer: ArrayBuffer): Promise<string> => {
		const mammothModule = (await import('mammoth/mammoth.browser')) as unknown as
			| MammothBrowser
			| { default: MammothBrowser };
		const mammoth = 'default' in mammothModule ? mammothModule.default : mammothModule;
		const result = await mammoth.convertToHtml({ arrayBuffer });

		let html = result.value || '';
		html = html
			.replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (match, url, text) => {
				return `${text.trim()} (${url.trim()})`;
			})
			.replace(/<\/(p|div|li|h[1-6])>/gi, '\n')
			.replace(/<br\s*\/?>/gi, '\n')
			.replace(/<(li)\b[^>]*>/gi, '\n- ')
			.replace(/<[^>]+>/g, '')
			.replace(/&(nbsp|amp|lt|gt|quot);/gi, (entity) => {
				switch (entity.toLowerCase()) {
					case '&nbsp;':
						return ' ';
					case '&amp;':
						return '&';
					case '&lt;':
						return '<';
					case '&gt;':
						return '>';
					case '&quot;':
						return '"';
					default:
						return entity;
				}
			});

		const text = html.trim();
		if (!text) {
			throw new Error('We could not read this .docx. Export as .txt or paste the text.');
		}
		return text;
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

			if (isDocxFile(currentFile)) {
				try {
					const extractedText = await extractDocxTextInBrowser(buffer);
					payload.extracted_text = validatedText
						? `Operator note:\n${validatedText}\n\n--- Extracted file text ---\n${extractedText}`
						: extractedText;
				} catch (error) {
					console.warn('Client-side DOCX extraction failed; falling back to inbox review', error);
					if (validatedText) {
						payload.text = validatedText;
					}
				}
			} else if (validatedText) {
				payload.text = validatedText;
			}
		} else if (validatedText) {
			payload.text = validatedText;
		}

		const response = await fetch('/ai-score/submit', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(payload)
		});

		const responseData = (await response.json()) as unknown;
		if (!response.ok) {
			throw new Error(
				getErrorMessage(responseData, 'We could not send this. Try again in a minute.')
			);
		}

		if (!isSubmitRouteResponse(responseData)) {
			throw new Error('Something changed on our side. Try again.');
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
			if (responseData.result.valid) {
				trackEvent('ai_score_result_view', {
					source,
					ai_score: responseData.result.ai_readiness.score,
					ai_grade: responseData.result.ai_readiness.grade,
					human_score: responseData.result.human_readiness.score,
					human_grade: responseData.result.human_readiness.grade
				});
			}
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

		trackEvent('ai_score_form_submit_attempt', {
			source,
			has_file: currentFile ? 'true' : 'false'
		});

		if (currentFile) {
			if (trimmedText.length > MAX_CHARS) {
				formError = `Keep typed notes under ${MAX_CHARS.toLocaleString()} characters.`;
				trackEvent('ai_score_validation_error', { source, field: 'notes_length' });
				return;
			}

			validatedText = trimmedText;
		} else {
			const validation = validateInput(sopText);
			if (!validation.valid) {
				formError = validation.error;
				trackEvent('ai_score_validation_error', { source, field: 'sop_text' });
				return;
			}
			validatedText = validation.text;
		}

		if (!isValidEmail(normalizedEmail)) {
			formError = 'Enter a work email so we can send the score.';
			trackEvent('ai_score_validation_error', { source, field: 'email' });
			return;
		}

		submitStatus = 'submitting';

		try {
			await submitAiScoreSubmission(currentFile, normalizedEmail, validatedText, source);
		} catch (error) {
			submitStatus = 'error';
			submitMessage =
				error instanceof Error ? error.message : 'The grader did not respond. Try again.';
		}
	};
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta property="og:title" content={seo.ogTitle} />
	<meta property="og:description" content={seo.ogDescription} />
	<meta property="og:image:alt" content="Quaestor AI Score interface preview." />
	<meta name="twitter:title" content={seo.ogTitle} />
	<meta name="twitter:description" content={seo.ogDescription} />
	<meta name="twitter:image:alt" content="Quaestor AI Score interface preview." />
</svelte:head>

<div class="min-h-screen overflow-x-hidden bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
	<div class="relative">
		<section class="relative py-12 md:py-20">
			<div class="mx-auto w-full max-w-5xl px-6">
				<div class="text-center">
					<span
						class="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-[rgb(var(--accent))]/20 bg-[rgb(var(--accent))]/5 px-3 py-1 text-xs text-[rgb(var(--accent))]"
					>
						SOP score
					</span>
					<h1 class="mt-6 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
						Paste an SOP.
					</h1>
					<h2 class="mt-4 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
						Get two scores. See what breaks.
					</h2>
					<p class="mx-auto mt-4 max-w-2xl text-pretty text-[rgb(var(--muted))]">
						Paste the process. Add your email. Get the score. Fix what breaks.
					</p>
				</div>

				<div class="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
					<form
						class="rounded-[1.9rem] border border-[rgb(var(--border-strong))] bg-[rgb(var(--bg-elev))] p-6 shadow-[0_24px_60px_rgb(103_80_54_/_0.12)] md:p-8"
						novalidate
						onsubmit={submitForReview}
					>
						<label class="space-y-2 text-sm">
							<span class="text-[rgb(var(--surface-text-strong))]">SOP or process text</span>
							<textarea
								bind:value={sopText}
								disabled={!isHydrated}
								oninput={() => trackFormStart('text')}
								rows="10"
								maxlength={MAX_CHARS}
								class={textFieldClass}
								placeholder="Paste the process your team actually uses. Steps, owners, tools, handoffs."
							></textarea>
						</label>

						<div
							class="mt-3 flex items-center justify-between gap-3 text-xs text-[rgb(var(--muted))]"
						>
							<span class={showSizeWarning ? 'font-semibold text-amber-600' : ''}
								>{charsUsed.toLocaleString()} / {MAX_CHARS.toLocaleString()}</span
							>
							<span
								>{hasFile
									? 'File may score inline or route to review'
									: 'Text gets an instant score'}</span
							>
						</div>

						{#if showSizeWarning}
							<div
								class="mt-3 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900"
							>
								<p>
									<strong>Long document.</strong> You can submit it, but one process at a time usually
									gets a sharper score.
								</p>
							</div>
						{/if}

						<details class="mt-5 border-t border-[rgb(var(--border))] pt-5 text-sm">
							<summary
								class="min-h-11 cursor-pointer font-semibold text-[rgb(var(--surface-text-strong))]"
							>
								Upload instead
							</summary>
							<div class="mt-3 space-y-2">
								<div
									class="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))]/50 px-3 py-3"
								>
									<input
										bind:this={fileInput}
										type="file"
										disabled={!isHydrated}
										accept={FILE_ACCEPT}
										onchange={onFileChange}
										data-role="ai-score-file"
										class="block max-w-full text-xs text-[rgb(var(--text-secondary))] file:mr-3 file:cursor-pointer file:rounded-lg file:border file:border-[rgb(var(--border))] file:bg-[rgb(var(--bg-subtle))] file:px-3 file:py-1.5 file:text-xs file:text-[rgb(var(--accent))] hover:file:bg-[rgb(var(--accent-tint))]"
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
											Remove file
										</button>
									{/if}
								</div>
								<p class="text-xs text-[rgb(var(--muted))]">
									.docx, .md, .txt, and .html can score inline. .pptx goes to review. 10 MB max.
								</p>
								<p class="text-xs text-[rgb(var(--muted))]">
									Upload only what you are comfortable sharing. Remove customer secrets first.
								</p>
							</div>
						</details>

						<label class="mt-5 block space-y-2 text-sm">
							<span class="text-[rgb(var(--surface-text-strong))]">Work email</span>
							<input
								type="email"
								autocomplete="email"
								inputmode="email"
								autocapitalize="off"
								required
								bind:value={replyEmail}
								disabled={!isHydrated}
								oninput={() => trackFormStart('email')}
								class={textFieldClass}
								placeholder="you@company.com"
							/>
						</label>
						<p class="mt-2 text-xs text-[rgb(var(--muted))]">
							We use this to send the score and follow up if a file needs review. We do not publish
							your SOP.
						</p>

						{#if formError}
							<p
								role="alert"
								aria-live="polite"
								class="mt-4 rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-900"
							>
								{formError}
							</p>
						{/if}

						{#if submitMessage}
							<p
								role={submitStatus === 'error' ? 'alert' : 'status'}
								aria-live="polite"
								class={`mt-4 rounded-xl border px-3 py-2 text-sm ${
									submitStatus === 'error'
										? 'border-red-300 bg-red-50 text-red-900'
										: 'border-emerald-300 bg-emerald-50 text-emerald-900'
								}`}
							>
								{submitMessage}
							</p>
						{/if}

						<div class="mt-6 flex justify-end">
							<button
								type="submit"
								disabled={submitDisabled}
								class="inline-flex min-h-11 min-w-[190px] items-center justify-center rounded-xl bg-[rgb(var(--accent))] px-4 py-2 text-sm font-medium text-[rgb(var(--text-inverse))] shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
							>
								{submitLabel}
							</button>
						</div>
					</form>

					<aside
						class="rounded-[1.9rem] border border-[rgb(var(--border))] bg-[rgb(var(--bg-panel))]/70 p-6 shadow-[0_18px_44px_rgb(103_80_54_/_0.08)] md:p-7"
					>
						<p
							class="text-[11px] font-semibold tracking-[0.24em] text-[rgb(var(--muted))] uppercase"
						>
							What you get
						</p>
						<h3 class="mt-3 text-2xl font-semibold text-[rgb(var(--text))]">
							Two scores and the failure points.
						</h3>
						<p class="mt-3 text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
							The grader checks whether an agent can execute the process and whether a new hire can
							follow it. If a file cannot be read inline, it routes to review.
						</p>

						<div class="mt-6 divide-y divide-[rgb(var(--border))]">
							<div class="py-4 first:pt-0">
								<p class="text-sm font-semibold text-[rgb(var(--text))]">Sample result</p>
								<p class="mt-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
									AI-readiness 62. Human-readiness 71. Top failure point: decisions need rules.
								</p>
							</div>
							<div class="py-4">
								<p class="text-sm font-semibold text-[rgb(var(--text))]">Why this is free</p>
								<p class="mt-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
									Bad SOPs are the blocker. The score shows where the map needs work before agents
									touch it.
								</p>
							</div>
							<div class="pt-4">
								<p class="text-sm font-semibold text-[rgb(var(--text))]">Privacy note</p>
								<p class="mt-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
									Use a real process. Remove secrets first. We use your email to send the score and
									follow up if review is needed.
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
								<div class="flex flex-col gap-4">
									<div
										class="flex h-full flex-col items-center justify-center rounded-[1.6rem] border border-[rgb(var(--border))] bg-[rgb(var(--bg-panel))]/70 p-6 text-center"
									>
										<p
											class="text-[11px] font-semibold tracking-[0.24em] text-[rgb(var(--muted))] uppercase"
										>
											AI-readiness
										</p>
										<div class="mt-4 text-7xl leading-none font-bold text-[rgb(var(--accent))]">
											{gradeResult.ai_readiness.grade}
										</div>
										<p class="mt-2 text-base font-semibold text-[rgb(var(--text-secondary))]">
											{gradeResult.ai_readiness.score} / 100
										</p>
										<p class="mt-4 text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
											{aiGradeCaption}
										</p>
									</div>

									<div
										class="flex h-full flex-col items-center justify-center rounded-[1.6rem] border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-5 text-center"
									>
										<p
											class="text-[11px] font-semibold tracking-[0.22em] text-[rgb(var(--muted))] uppercase"
										>
											Human-readiness
										</p>
										<div class="mt-4 text-7xl leading-none font-bold text-[rgb(var(--text))]">
											{gradeResult.human_readiness.grade}
										</div>
										<p class="mt-2 text-base font-semibold text-[rgb(var(--text-secondary))]">
											{gradeResult.human_readiness.score} / 100
										</p>
										<p class="mt-4 text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
											{humanGradeCaption}
										</p>
									</div>
								</div>

								<div>
									<h3 class="text-3xl font-semibold text-[rgb(var(--text))]">What broke</h3>
									<div
										class="max-w-3xl text-base leading-relaxed text-[rgb(var(--text-secondary))]"
									>
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										{@html renderMarkdown(gradeResult.summary, 'mt-4')}
									</div>

									<div
										class="mt-6 rounded-[1.6rem] border border-[rgb(var(--border))] bg-[rgb(var(--accent-tint))] p-5"
									>
										<p
											class="text-[11px] font-semibold tracking-[0.22em] text-[rgb(var(--accent))] uppercase"
										>
											Next step
										</p>
										<div
											class="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
										>
											<p class="max-w-xl text-sm leading-relaxed text-[rgb(var(--text-secondary))]">
												{followUpHelper}
											</p>
											<a
												class="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--accent))] px-4 py-2 text-sm font-medium text-[rgb(var(--text-inverse))] shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:brightness-110"
												href={followUpHref}
												target={followUpHref.includes('cal.com') ? '_blank' : undefined}
												rel={followUpHref.includes('cal.com') ? 'noreferrer' : undefined}
												onclick={trackResultCta}
											>
												<BrandText text={followUpLabel} /> →
											</a>
										</div>
									</div>

									<div class="mt-6 grid gap-4 lg:grid-cols-2">
										<div
											class="rounded-[1.6rem] border border-[rgb(var(--border))] bg-[rgb(var(--bg-panel))]/70 p-5"
										>
											<p
												class="text-[11px] font-semibold tracking-[0.22em] text-[rgb(var(--muted))] uppercase"
											>
												AI-readiness breakdown
											</p>
											<div class="mt-4 grid gap-3 sm:grid-cols-2">
												{#each aiAreaItems as item}
													<div
														class="flex h-full min-h-[100px] flex-col items-center justify-between rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-4 text-center"
													>
														<p class="mb-4 text-xs font-semibold text-[rgb(var(--text))]">
															{item.label}
														</p>
														<p class="mt-auto text-2xl font-semibold text-[rgb(var(--accent))]">
															{gradeResult.ai_readiness.areas[item.key].score}
															<span class="text-sm font-medium text-[rgb(var(--muted))]"
																>/ {item.max}</span
															>
														</p>
													</div>
												{/each}
											</div>
										</div>

										<div
											class="rounded-[1.6rem] border border-[rgb(var(--border))] bg-[rgb(var(--bg-panel))]/70 p-5"
										>
											<p
												class="text-[11px] font-semibold tracking-[0.22em] text-[rgb(var(--muted))] uppercase"
											>
												Human-readiness breakdown
											</p>
											<div class="mt-4 grid gap-3 sm:grid-cols-2">
												{#each humanAreaItems as item}
													<div
														class="flex h-full min-h-[100px] flex-col items-center justify-between rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-4 text-center"
													>
														<p class="mb-4 text-xs font-semibold text-[rgb(var(--text))]">
															{item.label}
														</p>
														<p class="mt-auto text-2xl font-semibold text-[rgb(var(--text))]">
															{gradeResult.human_readiness.areas[item.key].score}
															<span class="text-sm font-medium text-[rgb(var(--muted))]"
																>/ {item.max}</span
															>
														</p>
													</div>
												{/each}
											</div>
										</div>
									</div>

									<div
										class="mt-6 rounded-[1.6rem] border border-[rgb(var(--border))] bg-[rgb(var(--bg-panel))]/70 p-5"
									>
										<div class="flex flex-wrap items-center justify-between gap-3">
											<p
												class="text-[11px] font-semibold tracking-[0.22em] text-[rgb(var(--muted))] uppercase"
											>
												Top failure points
											</p>
										</div>
										<ul
											class="mt-4 space-y-4 text-sm leading-relaxed text-[rgb(var(--text-secondary))]"
										>
											{#each gradeResult.pathologies as pathology}
												<li
													class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-4"
												>
													<p class="font-semibold text-[rgb(var(--text))]">{pathology.title}</p>
													<div class="text-[rgb(var(--text-secondary))]">
														<!-- eslint-disable-next-line svelte/no-at-html-tags -->
														{@html renderMarkdown(pathology.detail, 'mt-2')}
													</div>
												</li>
											{/each}
										</ul>
									</div>
								</div>
							</div>
						{:else}
							<div
								class="rounded-[1.6rem] border border-[rgb(var(--border))] bg-[rgb(var(--bg-panel))]/70 p-6"
							>
								<p
									class="text-[11px] font-semibold tracking-[0.24em] text-[rgb(var(--muted))] uppercase"
								>
									Result
								</p>
								<h3 class="mt-3 text-3xl font-semibold text-[rgb(var(--text))]">
									This is not an SOP yet.
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
