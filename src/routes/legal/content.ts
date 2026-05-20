import { securityContent } from '../security/content';

export type LegalSection = {
	id: string;
	title: string;
	paragraphs: string[];
	items?: string[];
	links?: { label: string; href: string }[];
};

export type LegalContent = {
	seo: {
		title: string;
		description: string;
		ogTitle: string;
		ogDescription: string;
	};
	eyebrow: string;
	title: string;
	intro: string;
	entityName: string;
	supportEmail: string;
	linkedinHref: string;
	sections: LegalSection[];
};

export const legalContent: LegalContent = {
	seo: {
		title: 'Legal - Quaestor',
		description: 'Legal, privacy, DPA, subprocessor, security, and support links for Quaestor.',
		ogTitle: 'Quaestor Legal',
		ogDescription: 'Policy links for Quaestor and Cursus Tools, LLC.'
	},
	eyebrow: 'Legal',
	title: 'Legal, support, and policy links.',
	intro:
		'Quaestor asks customers to trust it with internal operational knowledge. The legal surface should be easy to find, boring, and direct.',
	entityName: 'Cursus Tools, LLC',
	supportEmail: 'support@cursus.tools',
	linkedinHref: 'https://www.linkedin.com/company/cursus-tools',
	sections: [
		{
			id: 'privacy',
			title: 'Privacy Policy',
			paragraphs: [
				'Quaestor collects the account, billing, support, product, and workspace information needed to operate the service.',
				'Customer workspace data remains customer data. Quaestor does not claim ownership over customer processes, documents, org structure, workflows, or operational records.'
			],
			links: [{ label: 'Read security and data handling', href: '/security' }]
		},
		{
			id: 'terms',
			title: 'Terms of Service',
			paragraphs: [
				'Terms of Service govern access to Quaestor, account responsibilities, acceptable use, subscriptions, and service limits.',
				'If a signed customer agreement says something different, the signed agreement controls.'
			]
		},
		{
			id: 'dpa',
			title: 'Data Processing Addendum',
			paragraphs: [
				'A Data Processing Addendum is available for customers who need one for procurement, vendor review, or privacy review.',
				`Request a DPA at ${'support@cursus.tools'}.`
			]
		},
		{
			id: 'subprocessors',
			title: 'Subprocessors',
			paragraphs: [
				'Quaestor uses a limited set of infrastructure and service providers to operate the product and public trust-signal flows.'
			],
			items: securityContent.subprocessors.items.map(
				(provider) => `${provider.name}: ${provider.purpose}`
			),
			links: [{ label: 'Read security posture', href: '/security' }]
		}
	]
};
