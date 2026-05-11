export type AnalyticsPrimitive = string | number | boolean;
export type AnalyticsProps = Record<string, AnalyticsPrimitive | null | undefined>;

declare global {
	interface Window {
		plausible?: (
			eventName: string,
			options?: { props?: Record<string, AnalyticsPrimitive> }
		) => void;
		dataLayer?: Array<Record<string, unknown> | unknown[]>;
		gtag?: (...args: unknown[]) => void;
	}
}

const cleanProps = (props: AnalyticsProps): Record<string, AnalyticsPrimitive> =>
	Object.fromEntries(
		Object.entries(props).filter(
			(entry): entry is [string, AnalyticsPrimitive] => entry[1] !== null && entry[1] !== undefined
		)
	);

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
