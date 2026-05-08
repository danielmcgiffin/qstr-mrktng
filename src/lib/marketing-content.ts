export type NavItem = { label: string; href: string };
export type CTA = { label: string; href: string };
export type SeoContent = {
	title: string;
	description: string;
	ogTitle?: string;
	ogDescription?: string;
	image?: string;
	imageAlt?: string;
};

export type FeatureItem = { title: string; desc: string; icon: string };
export type StepItem = { n: string; title: string; desc: string };
export type FaqItem = { q: string; a: string };
export type DetailItem = { title: string; desc: string; gifSrc?: string };
