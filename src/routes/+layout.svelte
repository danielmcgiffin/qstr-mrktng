<script lang="ts">
	import '../app.css';
	import './layout.css';
	import { env } from '$env/dynamic/public';
	import { page } from '$app/stores';
	import { trackEvent } from '$lib/analytics';
	import { site } from '$lib/site';
	import { site as partnerSite } from '$lib/site-partners';

	let { children } = $props();

	type HeaderCta = { label: string; href: string };
	type ModelContextTool = {
		name: string;
		description: string;
		inputSchema: {
			type: 'object';
			properties: Record<string, { type: 'string'; description: string }>;
			required: string[];
		};
		execute: (input: { text: string }) => Promise<unknown>;
	};
	type NavigatorWithModelContext = Navigator & {
		modelContext?: {
			provideContext: (context: { tools: ModelContextTool[] }) => void;
		};
	};

	const plausibleDomain = env.PUBLIC_PLAUSIBLE_DOMAIN || 'cursus.tools';
	const siteOrigin = (env.PUBLIC_SITE_ORIGIN || 'https://marketing.dannymcgiffin.com').replace(
		/\/+$/,
		''
	);
	const demoHref = 'https://qstr.cursus.tools/demo/process';
	const bookingHref = 'https://cal.com/danny-cursus/15min';
	const signupHref =
		'https://qstr.cursus.tools/login?utm_source=cursus.tools&utm_medium=website&utm_campaign=v1_launch&utm_content=header';

	const normalizePath = (pathname: string): string => {
		const stripped = pathname.replace(/^\/proxy\/\d+(?=\/|$)/, '') || '/';
		if (stripped === '/') return stripped;
		return stripped.replace(/\/+$/, '') || '/';
	};

	const isBookingLink = (href: string): boolean => href.includes('cal.com');

	const getHeaderCtaAttrs = (href: string) => ({
		target: isBookingLink(href) ? '_blank' : undefined,
		rel: isBookingLink(href) ? 'noreferrer' : undefined
	});

	let mobileNavOpen = $state(false);

	const currentPath = $derived.by(() => normalizePath($page.url.pathname));
	const proxyPrefix = $derived.by(() => {
		const match = $page.url.pathname.match(/^\/proxy\/\d+/);
		return match ? match[0] : '';
	});
	const logoSrc = $derived(`${proxyPrefix}/quaestor-logo.png`);
	const faviconHref = $derived(`${proxyPrefix}/favicon.png`);
	const ogImageHref = `${siteOrigin}/demo-screenshot.png`;
	const canonicalHref = $derived(`${siteOrigin}${currentPath}`);
	const currentHomeHref = $derived(currentPath === '/ops' ? '/ops' : '/');
	const headerNavItems = $derived([
		{ label: 'Operators', href: '/ops' },
		{ label: 'Partners', href: '/partners' },
		...site.nav.filter((item) => !['Home', 'Partners', 'Demo'].includes(item.label))
	]);
	const headerCtas = $derived.by((): { primary: HeaderCta; secondary: HeaderCta } => {
		if (currentPath === '/partners') {
			if (partnerSite.partnerApply.live) {
				return {
					primary: { label: partnerSite.partnerApply.label, href: partnerSite.partnerApply.href },
					secondary: { label: 'Book a partner call', href: bookingHref }
				};
			}

			return {
				primary: { label: 'Book a partner call', href: bookingHref },
				secondary: { label: 'See the Demo', href: demoHref }
			};
		}

		if (currentHomeHref === '/ops') {
			return {
				primary: { label: 'Get my AI-readiness score', href: '/ai-score' },
				secondary: { label: 'See the Demo', href: demoHref }
			};
		}

		return {
			primary: { label: 'Start free', href: signupHref },
			secondary: { label: 'Get your ops AI-ready', href: '/ai-score' }
		};
	});
	const primaryHeaderCtaAttrs = $derived(getHeaderCtaAttrs(headerCtas.primary.href));
	const secondaryHeaderCtaAttrs = $derived(getHeaderCtaAttrs(headerCtas.secondary.href));

	$effect(() => {
		void currentPath;
		mobileNavOpen = false;
	});

	const trackLinkClick = (href: string, location: string) => {
		if (href === '#partner-intake' || href.includes('/partners') || href.includes('tally.so')) {
			trackEvent('partner_intake_click', { location });
			return;
		}

		if (href.includes('cal.com')) {
			trackEvent('booking_click', { location });
			return;
		}

		if (href.includes('demo/process')) {
			trackEvent('demo_click', { location });
			return;
		}

		if (href.includes('/ai-score')) {
			trackEvent('ai_score_click', { location });
			return;
		}

		if (href.includes('qstr.cursus.tools/login')) {
			trackEvent('signup_start', { location });
		}
	};

	const trackNavClick = (label: string, href: string) => {
		const location = `header_nav_${label.toLowerCase().replace(/\s+/g, '_')}`;
		trackLinkClick(href, location);
	};

	const trackHeaderCta = (tier: 'primary' | 'secondary', href: string) => {
		trackLinkClick(href, `header_${tier}_cta`);
	};

	const handleMobileNavClick = (label: string, href: string) => {
		trackNavClick(label, href);
		mobileNavOpen = false;
	};

	const handleMobileCtaClick = (tier: 'primary' | 'secondary', href: string) => {
		trackHeaderCta(tier, href);
		mobileNavOpen = false;
	};

	// WebMCP Tool Registration
	$effect(() => {
		if (typeof document === 'undefined') return;

		document.body.classList.add('paper-theme');
		return () => document.body.classList.remove('paper-theme');
	});

	$effect(() => {
		if (typeof window === 'undefined') return;

		const navigatorWithModelContext = window.navigator as NavigatorWithModelContext;
		if (!navigatorWithModelContext.modelContext) return;

		try {
			navigatorWithModelContext.modelContext.provideContext({
				tools: [
					{
						name: 'get_ai_readiness_score',
						description: 'Get an AI-readiness evaluation for an SOP or process.',
						inputSchema: {
							type: 'object',
							properties: {
								text: { type: 'string', description: 'The SOP text to grade.' }
							},
							required: ['text']
						},
						execute: async ({ text }: { text: string }) => {
							const response = await fetch('/grade', {
								method: 'POST',
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify({ text, source: 'webmcp' })
							});
							return await response.json();
						}
					}
				]
			});
		} catch (e) {
			console.error('WebMCP registration failed', e);
		}
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href={faviconHref} />
	<link rel="canonical" href={canonicalHref} />
	<meta property="og:site_name" content="Quaestor" />
	<meta property="og:type" content={currentPath.startsWith('/method/') ? 'article' : 'website'} />
	<meta property="og:url" content={canonicalHref} />
	<meta property="og:image" content={ogImageHref} />
	<meta property="og:image:alt" content="Quaestor operational atlas interface preview." />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={ogImageHref} />
	<script
		defer
		data-domain={plausibleDomain}
		src="https://plausible.io/js/script.tagged-events.outbound-links.js"
	></script>
</svelte:head>

<header
	class="sticky top-0 z-50 border-b border-transparent bg-[rgb(var(--bg-elev))]/90 shadow-[0_18px_48px_rgb(103_80_54_/_0.08)] backdrop-blur-xl"
	style="border-image: linear-gradient(to right, transparent, rgba(118,94,67,0.18), transparent) 1;"
>
	<div class="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
		<a href="/" class="flex items-center gap-3">
			<img src={logoSrc} alt={`${site.brand} logo`} class="h-8 w-auto" loading="eager" />
		</a>

		<nav class="hidden items-center gap-10 md:flex lg:gap-12">
			{#each headerNavItems as item}
				<a
					class="text-sm text-[rgb(var(--text-secondary))] transition-colors duration-200 hover:text-[rgb(var(--accent))]"
					href={item.href}
					onclick={() => trackNavClick(item.label, item.href)}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="hidden items-center gap-3 md:flex">
			<a
				class="btn btn-secondary"
				href={headerCtas.secondary.href}
				target={secondaryHeaderCtaAttrs.target}
				rel={secondaryHeaderCtaAttrs.rel}
				onclick={() => trackHeaderCta('secondary', headerCtas.secondary.href)}
			>
				{headerCtas.secondary.label}
			</a>
			<a
				class="btn btn-primary"
				href={headerCtas.primary.href}
				target={primaryHeaderCtaAttrs.target}
				rel={primaryHeaderCtaAttrs.rel}
				onclick={() => trackHeaderCta('primary', headerCtas.primary.href)}
			>
				{headerCtas.primary.label} <span aria-hidden="true">&rarr;</span>
			</a>
		</div>

		<button
			class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] text-lg font-medium text-[rgb(var(--text-secondary))] transition-colors duration-200 hover:bg-[rgb(var(--bg-elev-2))] hover:text-[rgb(var(--text))] md:hidden"
			type="button"
			aria-expanded={mobileNavOpen}
			aria-controls="mobile-nav-menu"
			aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
			onclick={() => (mobileNavOpen = !mobileNavOpen)}
		>
			<span class="leading-none">{mobileNavOpen ? '✕' : '☰'}</span>
		</button>
	</div>

	{#if mobileNavOpen}
		<div id="mobile-nav-menu" class="border-t border-[rgb(var(--border))] md:hidden">
			<div class="mx-auto w-full max-w-7xl px-6 py-4">
				<div class="space-y-2">
					{#each headerNavItems as item}
						<a
							class="block rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] px-4 py-3 text-sm text-[rgb(var(--text-secondary))] transition-colors duration-200 hover:bg-[rgb(var(--bg-elev-2))] hover:text-[rgb(var(--accent))]"
							href={item.href}
							onclick={() => handleMobileNavClick(item.label, item.href)}
						>
							{item.label}
						</a>
					{/each}
				</div>

				<div class="mt-4 grid gap-2">
					<a
						class="btn btn-secondary w-full"
						href={headerCtas.secondary.href}
						target={secondaryHeaderCtaAttrs.target}
						rel={secondaryHeaderCtaAttrs.rel}
						onclick={() => handleMobileCtaClick('secondary', headerCtas.secondary.href)}
					>
						{headerCtas.secondary.label}
					</a>
					<a
						class="btn btn-primary w-full"
						href={headerCtas.primary.href}
						target={primaryHeaderCtaAttrs.target}
						rel={primaryHeaderCtaAttrs.rel}
						onclick={() => handleMobileCtaClick('primary', headerCtas.primary.href)}
					>
						{headerCtas.primary.label} <span aria-hidden="true">&rarr;</span>
					</a>
				</div>
			</div>
		</div>
	{/if}
</header>

{@render children()}
