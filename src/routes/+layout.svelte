<script lang="ts">
	import '../app.css';
	import './layout.css';
	import { env } from '$env/dynamic/public';
	import { page } from '$app/stores';
	import { trackEvent } from '$lib/analytics';
	import { site } from '$lib/site';

	let { children } = $props();

	type HeaderCta = { label: string; href: string };

	const plausibleDomain = env.PUBLIC_PLAUSIBLE_DOMAIN || 'cursus.tools';
	const demoHref = 'https://qstr.cursus.tools/demo/process';
	const bookingHref = 'https://cal.com/danny-cursus/15min';

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

	let activeHomeHref = $state<'/' | '/ops'>('/ops');
	let mobileNavOpen = $state(false);

	const currentPath = $derived.by(() => normalizePath($page.url.pathname));
	const proxyPrefix = $derived.by(() => {
		const match = $page.url.pathname.match(/^\/proxy\/\d+/);
		return match ? match[0] : '';
	});
	const logoSrc = $derived(`${proxyPrefix}/quaestor-logo.png`);
	const faviconHref = $derived(`${proxyPrefix}/favicon.png`);
	const currentHomeHref = $derived(
		currentPath === '/' || currentPath === '/ops' ? currentPath : activeHomeHref
	);
	const homeSwitcher = $derived(
		currentHomeHref === '/ops'
			? { label: 'Partners', href: '/' }
			: { label: 'Operators', href: '/ops' }
	);
	const headerNavItems = $derived([
		homeSwitcher,
		...site.nav.filter((item) => !['Home', 'Partners', 'Demo'].includes(item.label))
	]);
	const headerCtas = $derived.by((): { primary: HeaderCta; secondary: HeaderCta } => {
		if (currentPath === '/partners') {
			return {
				primary: { label: 'Become a partner', href: '#partner-intake' },
				secondary: { label: 'Book a quick call', href: bookingHref }
			};
		}

		if (currentHomeHref === '/ops') {
			return {
				primary: { label: 'Grade my AI-readiness', href: '/ops-grader' },
				secondary: { label: 'See the Demo', href: demoHref }
			};
		}

		return {
			primary: { label: 'View Partner Program', href: '/partners' },
			secondary: { label: 'See the Demo', href: demoHref }
		};
	});
	const primaryHeaderCtaAttrs = $derived(getHeaderCtaAttrs(headerCtas.primary.href));
	const secondaryHeaderCtaAttrs = $derived(getHeaderCtaAttrs(headerCtas.secondary.href));

	$effect(() => {
		const stored = window.localStorage.getItem('qstr:last-home-href');
		if (stored === '/' || stored === '/ops') {
			activeHomeHref = stored;
		}
	});

	$effect(() => {
		if (currentPath === '/' || currentPath === '/ops') {
			activeHomeHref = currentPath;
			window.localStorage.setItem('qstr:last-home-href', currentPath);
		}
	});

	$effect(() => {
		currentPath;
		mobileNavOpen = false;
	});

	const trackLinkClick = (href: string, location: string) => {
		if (href === '#partner-intake' || href.includes('/partners')) {
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

		if (href.includes('/ops-grader')) {
			trackEvent('ops_grader_click', { location });
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
</script>

<svelte:head>
	<link rel="icon" type="image/png" href={faviconHref} />
	<script
		defer
		data-domain={plausibleDomain}
		src="https://plausible.io/js/script.tagged-events.outbound-links.js"
	></script>
</svelte:head>

<header
	class="sticky top-0 z-50 border-b border-transparent bg-black/70 backdrop-blur-xl supports-[backdrop-filter]:bg-black/50"
	style="border-image: linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent) 1;"
>
	<div class="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
		<a href={currentHomeHref} class="flex items-center gap-3">
			<img src={logoSrc} alt={`${site.brand} logo`} class="h-8 w-auto" loading="eager" />
		</a>

		<nav class="hidden items-center gap-6 md:flex">
			{#each headerNavItems as item}
				<a
					class="text-sm text-[rgb(var(--muted))] transition-colors duration-200 hover:text-white"
					href={item.href}
					onclick={() => trackNavClick(item.label, item.href)}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="hidden items-center gap-2 md:flex">
			<a
				class="rounded-xl border border-[rgb(var(--border))] bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition-colors duration-200 hover:bg-white/10"
				href={headerCtas.secondary.href}
				target={secondaryHeaderCtaAttrs.target}
				rel={secondaryHeaderCtaAttrs.rel}
				onclick={() => trackHeaderCta('secondary', headerCtas.secondary.href)}
			>
				{headerCtas.secondary.label}
			</a>
			<a
				class="inline-flex items-center gap-2 rounded-xl bg-[rgb(var(--accent))] px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] transition hover:brightness-110"
				href={headerCtas.primary.href}
				target={primaryHeaderCtaAttrs.target}
				rel={primaryHeaderCtaAttrs.rel}
				onclick={() => trackHeaderCta('primary', headerCtas.primary.href)}
			>
				{headerCtas.primary.label} →
			</a>
		</div>

		<button
			class="inline-flex items-center gap-2 rounded-xl border border-[rgb(var(--border))] bg-white/5 px-3 py-2 text-sm font-medium text-white/90 transition-colors duration-200 hover:bg-white/10 md:hidden"
			type="button"
			aria-expanded={mobileNavOpen}
			aria-controls="mobile-nav-menu"
			aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
			onclick={() => (mobileNavOpen = !mobileNavOpen)}
		>
			<span>{mobileNavOpen ? 'Close' : 'Menu'}</span>
			<span class="text-base leading-none">{mobileNavOpen ? '✕' : '☰'}</span>
		</button>
	</div>

	{#if mobileNavOpen}
		<div id="mobile-nav-menu" class="border-t border-white/8 md:hidden">
			<div class="mx-auto w-full max-w-7xl px-6 py-4">
				<div class="space-y-2">
					{#each headerNavItems as item}
						<a
							class="block rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] px-4 py-3 text-sm text-white/90 transition-colors duration-200 hover:bg-white/8"
							href={item.href}
							onclick={() => handleMobileNavClick(item.label, item.href)}
						>
							{item.label}
						</a>
					{/each}
				</div>

				<div class="mt-4 grid gap-2">
					<a
						class="block rounded-xl border border-[rgb(var(--border))] bg-white/5 px-4 py-3 text-center text-sm font-medium text-white/90 transition-colors duration-200 hover:bg-white/10"
						href={headerCtas.secondary.href}
						target={secondaryHeaderCtaAttrs.target}
						rel={secondaryHeaderCtaAttrs.rel}
						onclick={() => handleMobileCtaClick('secondary', headerCtas.secondary.href)}
					>
						{headerCtas.secondary.label}
					</a>
					<a
						class="block rounded-xl bg-[rgb(var(--accent))] px-4 py-3 text-center text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] transition hover:brightness-110"
						href={headerCtas.primary.href}
						target={primaryHeaderCtaAttrs.target}
						rel={primaryHeaderCtaAttrs.rel}
						onclick={() => handleMobileCtaClick('primary', headerCtas.primary.href)}
					>
						{headerCtas.primary.label} →
					</a>
				</div>
			</div>
		</div>
	{/if}
</header>

{@render children()}
