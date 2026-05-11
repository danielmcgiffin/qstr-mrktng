export type AnalyticsPrimitive = string | number | boolean;
export type AnalyticsProps = Record<string, AnalyticsPrimitive | null | undefined>;

export type AnalyticsPageContext = {
	pagePath: string;
	pageUrl?: string;
	pageTitle?: string;
};

type AnalyticsTrackingOptions = {
	shouldTrackPath?: (pagePath: string) => boolean;
};

type InteractionTrackingOptions = AnalyticsTrackingOptions & {
	getPageContext?: () => AnalyticsPageContext;
};

declare global {
	interface Window {
		plausible?: (
			eventName: string,
			options?: { props?: Record<string, AnalyticsPrimitive> }
		) => void;
		dataLayer?: Array<Record<string, unknown> | unknown[]>;
		gtag?: (...args: unknown[]) => void;
		qstrGaConfigured?: string;
	}
}

const SCROLL_DEPTH_THRESHOLDS = [25, 50, 75, 90, 100] as const;
const MAX_PROP_LENGTH = 120;

let activeGaMeasurementId: string | null = null;

export const normalizeAnalyticsPath = (pathname: string): string => {
	const stripped = pathname.replace(/^\/proxy\/\d+(?=\/|$)/, '') || '/';
	if (stripped === '/') return stripped;
	return stripped.replace(/\/+$/, '') || '/';
};

const cleanProps = (props: AnalyticsProps): Record<string, AnalyticsPrimitive> =>
	Object.fromEntries(
		Object.entries(props).filter(
			(entry): entry is [string, AnalyticsPrimitive] => entry[1] !== null && entry[1] !== undefined
		)
	);

const compactText = (value: string | null | undefined, maxLength = MAX_PROP_LENGTH): string =>
	(value ?? '').replace(/\s+/g, ' ').trim().slice(0, maxLength);

const slugify = (value: string): string =>
	compactText(value)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '_')
		.replace(/^_+|_+$/g, '')
		.slice(0, 80);

const defaultShouldTrackPath = (pagePath: string): boolean => !pagePath.startsWith('/admin');

const shouldTrack = (
	pagePath: string,
	shouldTrackPath: AnalyticsTrackingOptions['shouldTrackPath'] = defaultShouldTrackPath
): boolean => shouldTrackPath(pagePath);

const getDefaultPageContext = (): AnalyticsPageContext => ({
	pagePath: `${normalizeAnalyticsPath(window.location.pathname)}${window.location.search}`,
	pageUrl: window.location.href,
	pageTitle: document.title
});

const getElementLabel = (element: Element): string =>
	compactText(
		element.getAttribute('data-analytics-label') ||
			element.getAttribute('aria-label') ||
			element.textContent
	);

const getFormLabel = (form: HTMLFormElement): string =>
	compactText(
		form.getAttribute('data-analytics-label') ||
			form.getAttribute('aria-label') ||
			form.getAttribute('name') ||
			form.id ||
			'form'
	);

const getSectionDetails = (element: HTMLElement, index: number) => {
	const heading = compactText(
		element.getAttribute('data-analytics-heading') ||
			element.querySelector('[data-analytics-heading], h1, h2, h3')?.textContent
	);
	const rawName =
		compactText(element.dataset.analyticsSection) ||
		compactText(element.id) ||
		compactText(element.getAttribute('aria-label')) ||
		heading ||
		`${element.tagName.toLowerCase()}_${index + 1}`;

	return {
		section: slugify(rawName) || `${element.tagName.toLowerCase()}_${index + 1}`,
		section_heading: heading || rawName,
		section_index: index + 1
	};
};

const getInteractionLocation = (element: Element): string => {
	const explicitArea = element.closest<HTMLElement>('[data-analytics-area]')?.dataset.analyticsArea;
	if (explicitArea) return slugify(explicitArea) || explicitArea;
	if (element.closest('header')) return 'header';
	if (element.closest('footer')) return 'footer';

	const section = element.closest<HTMLElement>('[data-analytics-section], section, article');
	if (section) return getSectionDetails(section, 0).section;

	return element.closest('main') ? 'main' : 'page';
};

const getLinkProps = (anchor: HTMLAnchorElement, context: AnalyticsPageContext): AnalyticsProps => {
	const rawHref = anchor.getAttribute('href') || anchor.href;
	let linkUrl = rawHref;
	let linkDomain = '';
	let linkPath = rawHref;
	let linkType = rawHref.startsWith('#') ? 'hash' : 'unknown';

	try {
		const url = new URL(anchor.href, window.location.href);
		const isOutbound = url.origin !== window.location.origin;
		linkDomain = url.hostname;
		linkPath = `${url.pathname}${url.search}${url.hash}`;
		linkUrl = isOutbound ? `${url.origin}${url.pathname}` : linkPath;
		linkType = isOutbound ? 'outbound' : rawHref.startsWith('#') ? 'hash' : 'internal';
	} catch {
		// Keep the raw href for non-URL values.
	}

	return {
		page_path: context.pagePath,
		location: getInteractionLocation(anchor),
		link_text: getElementLabel(anchor),
		link_url: compactText(linkUrl, 180),
		link_domain: linkDomain,
		link_path: compactText(linkPath, 180),
		link_type: linkType,
		new_tab: anchor.target === '_blank'
	};
};

const getButtonProps = (
	button: HTMLButtonElement,
	context: AnalyticsPageContext
): AnalyticsProps => {
	const form = button.form;

	return {
		page_path: context.pagePath,
		location: getInteractionLocation(button),
		button_text: getElementLabel(button),
		button_type: button.type || 'button',
		form_id: form?.id,
		form_label: form ? getFormLabel(form) : undefined
	};
};

const trackDetailsToggle = (summary: HTMLElement, context: AnalyticsPageContext) => {
	const details = summary.closest('details');
	if (!details) return;

	window.setTimeout(() => {
		trackEvent('details_toggle', {
			page_path: context.pagePath,
			location: getInteractionLocation(summary),
			summary_text: getElementLabel(summary),
			open: details.open
		});
	}, 0);
};

export const initializeGoogleAnalytics = (measurementId: string): boolean => {
	if (typeof window === 'undefined' || !measurementId) return false;

	window.dataLayer = window.dataLayer ?? [];
	window.gtag =
		window.gtag ??
		((...args: unknown[]) => {
			window.dataLayer?.push(args);
		});

	if (activeGaMeasurementId !== measurementId && window.qstrGaConfigured !== measurementId) {
		window.gtag('js', new Date());
		window.gtag('config', measurementId, { send_page_view: false });
		window.qstrGaConfigured = measurementId;
	}

	activeGaMeasurementId = measurementId;

	return true;
};

export const trackPageView = (measurementId: string, context: AnalyticsPageContext) => {
	if (!initializeGoogleAnalytics(measurementId)) return;

	const props = cleanProps({
		page_title: context.pageTitle ?? document.title,
		page_location: context.pageUrl ?? window.location.href,
		page_path: context.pagePath
	});

	window.gtag?.('event', 'page_view', props);
	window.dispatchEvent(
		new CustomEvent('qstr:analytics', { detail: { eventName: 'page_view', props } })
	);
};

export const trackEvent = (eventName: string, props: AnalyticsProps = {}) => {
	if (typeof window === 'undefined') return;

	const cleaned = cleanProps(props);

	window.dataLayer = window.dataLayer ?? [];
	window.dataLayer.push({ event: eventName, ...cleaned });

	if (typeof window.gtag === 'function') {
		window.gtag('event', eventName, cleaned);
	}

	if (typeof window.plausible === 'function') {
		window.plausible(eventName, { props: cleaned });
	}

	window.dispatchEvent(
		new CustomEvent('qstr:analytics', {
			detail: { eventName, props: cleaned }
		})
	);
};

export const installInteractionTracking = (options: InteractionTrackingOptions = {}) => {
	if (typeof document === 'undefined') return () => undefined;

	const getPageContext = options.getPageContext ?? getDefaultPageContext;
	const shouldTrackPath = options.shouldTrackPath ?? defaultShouldTrackPath;

	const onClick = (event: MouseEvent) => {
		if (!(event.target instanceof Element)) return;

		const context = getPageContext();
		if (!shouldTrack(context.pagePath, shouldTrackPath)) return;

		const ignored = event.target.closest('[data-analytics-ignore="true"]');
		if (ignored) return;

		const anchor = event.target.closest('a[href]');
		if (anchor instanceof HTMLAnchorElement) {
			trackEvent('link_click', getLinkProps(anchor, context));
			return;
		}

		const summary = event.target.closest('summary');
		if (summary instanceof HTMLElement) {
			trackDetailsToggle(summary, context);
			return;
		}

		const button = event.target.closest('button');
		if (button instanceof HTMLButtonElement) {
			trackEvent('button_click', getButtonProps(button, context));
		}
	};

	const onSubmit = (event: SubmitEvent) => {
		if (!(event.target instanceof HTMLFormElement)) return;

		const context = getPageContext();
		if (!shouldTrack(context.pagePath, shouldTrackPath)) return;
		if (event.target.matches('[data-analytics-ignore="true"]')) return;

		trackEvent('form_submit', {
			page_path: context.pagePath,
			location: getInteractionLocation(event.target),
			form_id: event.target.id,
			form_label: getFormLabel(event.target),
			form_method: (event.target.method || 'get').toLowerCase()
		});
	};

	document.addEventListener('click', onClick, true);
	document.addEventListener('submit', onSubmit, true);

	return () => {
		document.removeEventListener('click', onClick, true);
		document.removeEventListener('submit', onSubmit, true);
	};
};

const installScrollDepthTracking = (context: AnalyticsPageContext) => {
	const sent = new Set<number>();
	let frame = 0;

	const getDepth = () => {
		const documentElement = document.documentElement;
		const body = document.body;
		const scrollHeight = Math.max(
			documentElement.scrollHeight,
			documentElement.offsetHeight,
			body?.scrollHeight ?? 0,
			body?.offsetHeight ?? 0
		);
		const viewportBottom = window.scrollY + window.innerHeight;
		return scrollHeight <= 0 ? 0 : Math.min(100, Math.round((viewportBottom / scrollHeight) * 100));
	};

	const evaluateDepth = () => {
		frame = 0;
		const depth = getDepth();

		for (const threshold of SCROLL_DEPTH_THRESHOLDS) {
			if (depth < threshold || sent.has(threshold)) continue;
			sent.add(threshold);
			trackEvent('scroll_depth', {
				page_path: context.pagePath,
				depth_percent: threshold,
				page_title: context.pageTitle
			});
		}

		if (sent.size === SCROLL_DEPTH_THRESHOLDS.length) {
			window.removeEventListener('scroll', scheduleDepthCheck);
			window.removeEventListener('resize', scheduleDepthCheck);
		}
	};

	const scheduleDepthCheck = () => {
		if (frame) return;
		frame = window.requestAnimationFrame(evaluateDepth);
	};

	window.addEventListener('scroll', scheduleDepthCheck, { passive: true });
	window.addEventListener('resize', scheduleDepthCheck);
	window.setTimeout(scheduleDepthCheck, 200);

	return () => {
		if (frame) window.cancelAnimationFrame(frame);
		window.removeEventListener('scroll', scheduleDepthCheck);
		window.removeEventListener('resize', scheduleDepthCheck);
	};
};

const installSectionViewTracking = (context: AnalyticsPageContext) => {
	if (typeof IntersectionObserver === 'undefined') return () => undefined;

	const root = document.querySelector('main') ?? document.body;
	const observed = new WeakSet<Element>();
	const seen = new Set<string>();
	const details = new WeakMap<Element, ReturnType<typeof getSectionDetails>>();
	let frame = 0;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting || entry.intersectionRatio < 0.35) continue;

				const sectionDetails = details.get(entry.target);
				if (!sectionDetails || seen.has(sectionDetails.section)) continue;

				seen.add(sectionDetails.section);
				trackEvent('section_view', {
					page_path: context.pagePath,
					page_title: context.pageTitle,
					section: sectionDetails.section,
					section_heading: sectionDetails.section_heading,
					section_index: sectionDetails.section_index,
					visible_ratio: Math.round(entry.intersectionRatio * 100) / 100
				});
				observer.unobserve(entry.target);
			}
		},
		{ rootMargin: '0px 0px -10% 0px', threshold: [0.35, 0.5, 0.75] }
	);

	const observeSections = () => {
		frame = 0;
		const sections = Array.from(
			root.querySelectorAll<HTMLElement>('[data-analytics-section], section, article')
		).filter((section) => !section.matches('[data-analytics-ignore="true"]'));

		sections.forEach((section, index) => {
			if (observed.has(section)) return;
			observed.add(section);
			details.set(section, getSectionDetails(section, index));
			observer.observe(section);
		});
	};

	const scheduleObserveSections = () => {
		if (frame) window.cancelAnimationFrame(frame);
		frame = window.requestAnimationFrame(observeSections);
	};

	const mutationObserver = new MutationObserver(scheduleObserveSections);
	mutationObserver.observe(root, { childList: true, subtree: true });
	scheduleObserveSections();

	return () => {
		if (frame) window.cancelAnimationFrame(frame);
		observer.disconnect();
		mutationObserver.disconnect();
	};
};

export const installPageExposureTracking = (
	context: AnalyticsPageContext,
	options: AnalyticsTrackingOptions = {}
) => {
	if (typeof window === 'undefined' || !shouldTrack(context.pagePath, options.shouldTrackPath)) {
		return () => undefined;
	}

	const stopSectionTracking = installSectionViewTracking(context);
	const stopScrollTracking = installScrollDepthTracking(context);

	return () => {
		stopSectionTracking();
		stopScrollTracking();
	};
};
