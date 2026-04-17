<script lang="ts">
	import { trackEvent } from '$lib/analytics';
	import StarfieldBackground from '$lib/components/StarfieldBackground.svelte';
	import { MAX_CHARS, validateInput } from '$lib/grader';

	type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

	let sopText = $state('');
	let replyEmail = $state('');
	let submitStatus = $state<SubmitStatus>('idle');
	let formError = $state('');
	let submitMessage = $state('');

	const charsUsed = $derived(sopText.trim().length);

	const getSource = (): string => {
		if (typeof window === 'undefined') {
			return 'organic';
		}

		const value = new URLSearchParams(window.location.search).get('utm_source')?.trim();
		return value || 'organic';
	};

	const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

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

	const submitForReview = async (event: SubmitEvent) => {
		event.preventDefault();

		formError = '';
		submitMessage = '';

		const validation = validateInput(sopText);
		if (!validation.valid) {
			formError = validation.error;
			return;
		}

		const normalizedEmail = replyEmail.trim();
		if (!isValidEmail(normalizedEmail)) {
			formError = 'Enter a valid email address so we can reply.';
			return;
		}

		submitStatus = 'submitting';

		try {
			const source = getSource();
			const response = await fetch('/ops-grader/submit', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					email: normalizedEmail,
					text: validation.text,
					source
				})
			});

			const payload = (await response.json()) as unknown;

			if (!response.ok) {
				submitStatus = 'error';
				submitMessage = getErrorMessage(
					payload,
					'Could not send your submission right now. Please try again.'
				);
				return;
			}

			trackEvent('ops_grader_submit', {
				source,
				mode: 'resend'
			});

			submitStatus = 'success';
			submitMessage = `Thanks — your submission was sent. We'll reply to ${normalizedEmail}.`;
			sopText = '';
			replyEmail = '';
		} catch {
			submitStatus = 'error';
			submitMessage = 'Network error while sending. Please try again.';
		}
	};
</script>

<svelte:head>
	<title>Ops Grader — Quaestor</title>
	<meta
		name="description"
		content="Paste one SOP section and get a free AI-Readiness evaluation."
	/>
</svelte:head>

<div class="min-h-screen overflow-x-hidden bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
	<div class="relative">
		<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
			<StarfieldBackground variant="soft" />
			<div
				class="absolute top-[-30%] left-1/2 h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl"
			></div>
			<div class="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black/60"></div>
		</div>

		<section class="relative py-12 md:py-20">
			<div class="mx-auto w-full max-w-4xl px-6">
				<div class="text-center">
					<span
						class="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-white/5 px-3 py-1 text-xs text-white/80"
					>
						✦ Ops Grader
					</span>
					<h1 class="mt-6 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
						Paste one SOP section. We’ll tell you how ready for AI implementation you are.
					</h1>
					<p class="mx-auto mt-4 max-w-2xl text-pretty text-[rgb(var(--muted))]">
						We’ll reply from
						<span class="text-white">grader@cursus.tools</span>.
					</p>
				</div>

				<form
					class="mt-10 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-6 md:p-8"
					onsubmit={submitForReview}
				>
					<label class="space-y-2 text-sm">
						<span class="text-white">Your email (for follow-up)</span>
						<input
							type="email"
							bind:value={replyEmail}
							required
							class="w-full rounded-xl border border-[rgb(var(--border))] bg-black/30 px-3 py-3 text-sm text-white placeholder:text-[rgb(var(--muted))]"
							placeholder="you@company.com"
						/>
					</label>

					<label class="mt-4 block space-y-2 text-sm">
						<span class="text-white">SOP text (50–2000 chars)</span>
						<textarea
							bind:value={sopText}
							required
							rows="10"
							maxlength={MAX_CHARS}
							class="w-full rounded-xl border border-[rgb(var(--border))] bg-black/30 px-3 py-3 text-sm text-white placeholder:text-[rgb(var(--muted))]"
							placeholder="Paste one section from an SOP, workflow, or process doc..."
						></textarea>
					</label>

					<div class="mt-3 flex items-center justify-between text-xs text-[rgb(var(--muted))]">
						<span>{charsUsed} / {MAX_CHARS}</span>
						<span>AI Rediness review</span>
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
							class="inline-flex min-w-[170px] items-center justify-center rounded-xl bg-[rgb(var(--accent))] px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
						>
							{submitStatus === 'submitting' ? 'Sending…' : 'Send to grader inbox'}
						</button>
					</div>
				</form>
			</div>
		</section>
	</div>
</div>
