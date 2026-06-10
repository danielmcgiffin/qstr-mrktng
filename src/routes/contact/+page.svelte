<script lang="ts">
	import { trackEvent } from '$lib/analytics';

	const seo = {
		title: 'Contact - Quaestor',
		description: 'Get in touch with the Quaestor team about direct team deployment or questions.',
		ogTitle: 'Get in touch.',
		ogDescription: 'Get in touch with the Quaestor team.'
	};

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let status = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	const handleSubmit = async (event?: Event) => {
		if (event) event.preventDefault();
		if (!name || !email || !message) {
			errorMessage = 'All fields are required.';
			status = 'error';
			return;
		}

		status = 'submitting';
		errorMessage = '';

		try {
			const response = await fetch('/contact/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, email, message })
			});

			const result = await response.json();
			if (!response.ok || !result.ok) {
				errorMessage = result.error || 'Something went wrong. Please try again.';
				status = 'error';
				trackEvent('contact_form_error', { error: errorMessage });
				return;
			}

			status = 'success';
			trackEvent('contact_form_success');
			name = '';
			email = '';
			message = '';
		} catch (err) {
			console.error('Contact submission error:', err);
			errorMessage = 'Connection error. Please try again later.';
			status = 'error';
			trackEvent('contact_form_error', { error: errorMessage });
		}
	};
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta property="og:title" content={seo.ogTitle} />
	<meta property="og:description" content={seo.ogDescription} />
	<meta property="og:image:alt" content="Quaestor operational atlas interface preview." />
	<meta name="twitter:title" content={seo.ogTitle} />
	<meta name="twitter:description" content={seo.ogDescription} />
	<meta name="twitter:image:alt" content="Quaestor operational atlas interface preview." />
</svelte:head>

<div class="min-h-screen overflow-x-hidden bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
	<div class="relative py-20 md:py-24">
		<div class="mx-auto w-full max-w-xl px-6">
			<div class="text-center">
				<span
					class="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-[rgb(var(--accent))]/20 bg-[rgb(var(--accent))]/5 px-3 py-1 text-xs text-[rgb(var(--accent))]"
				>
					Contact
				</span>
				<h1 class="mt-5 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
					Get in touch.
				</h1>
				<p class="mt-4 text-pretty text-[rgb(var(--muted))] md:text-lg">
					Bring the bottleneck. Or just ask a question. We read everything.
				</p>
			</div>

			<div
				class="mt-12 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-6 shadow-[0_18px_48px_rgb(103_80_54_/_0.08)] md:p-8"
			>
				{#if status === 'success'}
					<div class="success-message py-8 text-center">
						<div class="success-icon">✓</div>
						<h2 class="mt-4 text-xl font-semibold">Message sent successfully</h2>
						<p class="mt-2 text-sm text-[rgb(var(--muted))]">
							Thanks for reaching out. We will get back to you shortly.
						</p>
						<button class="btn btn-secondary mt-6" onclick={() => (status = 'idle')}>
							Send another message
						</button>
					</div>
				{:else}
					<form onsubmit={(e) => e.preventDefault()} class="space-y-5">
						{#if status === 'error'}
							<div class="error-banner">
								{errorMessage}
							</div>
						{/if}

						<div class="form-group">
							<label for="name" class="form-label">Name</label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder="Your name"
								bind:value={name}
								required
								disabled={status === 'submitting'}
								class="form-input"
							/>
						</div>

						<div class="form-group">
							<label for="email" class="form-label">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="you@company.com"
								bind:value={email}
								required
								disabled={status === 'submitting'}
								class="form-input"
							/>
						</div>

						<div class="form-group">
							<label for="message" class="form-label">Message</label>
							<textarea
								id="message"
								name="message"
								rows="5"
								placeholder="Describe the bottleneck or your question..."
								bind:value={message}
								required
								disabled={status === 'submitting'}
								class="form-textarea"
							></textarea>
						</div>

						<div class="flex justify-end pt-2">
							<button
								type="button"
								onclick={handleSubmit}
								disabled={status === 'submitting'}
								class="btn btn-primary min-w-[140px]"
							>
								{status === 'submitting' ? 'Sending...' : 'Send Message'}
							</button>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.form-group {
		display: grid;
		gap: 0.5rem;
	}

	.form-label {
		font-family: var(--font-body);
		font-size: var(--fs-micro);
		font-weight: 600;
		letter-spacing: var(--ls-label);
		text-transform: uppercase;
		color: rgb(var(--text-muted));
	}

	.form-input,
	.form-textarea {
		width: 100%;
		border-radius: var(--radius-sm);
		border: 1px solid rgb(var(--border));
		background: rgb(var(--bg-panel));
		padding: 0.65rem 0.85rem;
		font-size: var(--fs-small);
		color: rgb(var(--text));
		font-family: var(--font-body);
		transition: all 160ms ease;
	}

	.form-input:focus,
	.form-textarea:focus {
		outline: none;
		border-color: rgb(var(--accent));
		box-shadow: 0 0 0 2px rgb(var(--accent) / 0.12);
	}

	.form-input:disabled,
	.form-textarea:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		background: rgb(var(--bg-subtle));
	}

	.error-banner {
		padding: 0.75rem 1rem;
		background: rgb(var(--accent-tint));
		border: 1px solid rgb(var(--accent) / 0.2);
		border-radius: var(--radius-sm);
		color: rgb(var(--accent));
		font-size: var(--fs-small);
		line-height: 1.4;
	}

	.success-icon {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		margin: 0 auto;
		border-radius: 50%;
		background: rgb(var(--accent-tint));
		color: rgb(var(--accent));
		font-size: 1.5rem;
		font-weight: bold;
	}
</style>
