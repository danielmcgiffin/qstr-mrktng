export type SecuritySection = {
	id: string;
	title: string;
	paragraphs: string[];
	items?: { label: string; text: string }[];
};

export type SecuritySubprocessor = {
	name: string;
	purpose: string;
};

export type SecurityContent = {
	seo: {
		title: string;
		description: string;
		ogTitle: string;
		ogDescription: string;
	};
	eyebrow: string;
	title: string;
	lastUpdated: string;
	opening: string;
	verificationNote: string;
	sections: SecuritySection[];
	subprocessors: {
		title: string;
		intro: string;
		items: SecuritySubprocessor[];
	};
	finalCta: {
		headline: string;
		text: string;
		label: string;
		href: string;
	};
};

export const securityContent: SecurityContent = {
	seo: {
		title: 'Security & Data Handling - Quaestor',
		description:
			'How Quaestor handles workspace data, AI use, encryption, access, backups, retention, subprocessors, and SOC 2 maturity.',
		ogTitle: 'Security & Data Handling',
		ogDescription:
			'Plain statements about how Quaestor handles operational knowledge and customer data.'
	},
	eyebrow: 'Security posture',
	title: 'Security & Data Handling',
	lastUpdated: 'May 2026',
	opening:
		'Quaestor stores operational knowledge: roles, processes, systems, handoffs, decision criteria, SOPs, and internal workflows. That means security is not decoration. It is part of the product.',
	verificationNote:
		'This page states the current product posture without pretending to be a formal compliance report.',
	sections: [
		{
			id: 'data-ownership',
			title: 'Data ownership',
			paragraphs: [
				'Your workspace data belongs to you. Quaestor does not claim ownership over your business processes, documents, org structure, internal workflows, or operational records.'
			]
		},
		{
			id: 'ai-customer-data',
			title: 'AI and customer data',
			paragraphs: [
				'Customer data is not used to train public AI models. Where AI features are used, they are used to help structure, retrieve, or assemble customer-provided operational knowledge inside the customer workspace.',
				'If an AI feature cannot meet that rule, the policy changes before the feature ships.'
			]
		},
		{
			id: 'encryption',
			title: 'Encryption',
			paragraphs: [
				'Production traffic uses HTTPS/TLS in transit.',
				'Production application infrastructure is hosted on AWS. The current product stack uses an Angular client, AWS API Gateway, AWS Lambda APIs, Drizzle, PostgreSQL on Amazon RDS, Amazon S3-backed uploads, Cognito authentication, and AWS Secrets Manager for database credentials.',
				'At-rest encryption is confirmed for S3-backed uploads in the infrastructure code. We are verifying the live production database encryption setting before making a broader at-rest encryption claim.'
			]
		},
		{
			id: 'access-controls',
			title: 'Access controls',
			paragraphs: [
				'Workspace access is permissioned. Customers control who can view, edit, and administer their atlas.',
				'Fine-grained role-based permissions are on the roadmap. Do not read this as a mature enterprise RBAC claim.'
			]
		},
		{
			id: 'backups-recovery',
			title: 'Backups and recovery',
			paragraphs: [
				'Production data is backed up on a recurring schedule through the managed database layer.',
				'Formal recovery procedures are maintained and tested as the platform matures. Quaestor does not currently claim SOC 2-tested recovery controls, RTO, or RPO commitments on this page.'
			]
		},
		{
			id: 'data-retention',
			title: 'Data retention',
			paragraphs: [
				'Customer workspace data is retained while the account is active. After cancellation or written deletion request, data is deleted according to our retention schedule, except where retention is required for legal, billing, security, or backup purposes.'
			]
		},
		{
			id: 'soc-2-roadmap',
			title: 'SOC 2 roadmap',
			paragraphs: [
				'Quaestor is not currently SOC 2 certified. We are building toward a formal compliance program as customer requirements demand it.'
			]
		}
	],
	subprocessors: {
		title: 'Subprocessors',
		intro:
			'Quaestor uses a limited set of infrastructure and service providers to operate the product and public trust-signal flows.',
		items: [
			{
				name: 'Amazon Web Services',
				purpose:
					'Core product infrastructure, including AWS Lambda, API Gateway, Amazon RDS for PostgreSQL, Amazon S3, Cognito, Secrets Manager, SES, and CloudWatch.'
			},
			{
				name: 'Stripe',
				purpose: 'Payments, checkout, subscriptions, billing portal, and billing records.'
			},
			{
				name: 'Cloudflare',
				purpose: 'Public marketing site hosting, CDN, Pages previews, and edge functions.'
			},
			{
				name: 'Anthropic',
				purpose:
					'AI-assisted scoring and structuring where AI features are enabled, including AI Score flows.'
			},
			{
				name: 'Supabase',
				purpose:
					'AI Score intake persistence where configured during the public-site migration period.'
			},
			{
				name: 'Resend',
				purpose: 'Email delivery for public-site intake and AI Score review flows where configured.'
			},
			{
				name: 'Google Analytics',
				purpose:
					'Public-site analytics. Workspace content should not be sent to analytics providers.'
			}
		]
	},
	finalCta: {
		headline: 'Need the details?',
		text: 'Bring the question. We will answer what is true, mark what is in progress, and skip the theater.',
		label: 'Ask a security question',
		href: '/contact'
	}
};
