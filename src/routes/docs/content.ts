export type DocsTopic = {
	label: string;
	href?: string;
};

export type DocsSection = {
	title: string;
	topics: DocsTopic[];
};

export type DocsContent = {
	seo: {
		title: string;
		description: string;
		ogTitle: string;
		ogDescription: string;
	};
	eyebrow: string;
	title: string;
	intro: string;
	sections: DocsSection[];
};

export const docsContent: DocsContent = {
	seo: {
		title: 'Docs - Quaestor',
		description: 'Quaestor docs for building and using an operational atlas.',
		ogTitle: 'Quaestor Docs',
		ogDescription: 'Getting started, atlas usage, administration, and release notes.'
	},
	eyebrow: 'Docs',
	title: 'Build the atlas. Run the work.',
	intro:
		'Practical docs for turning roles, processes, systems, and handoffs into a living operating map.',
	sections: [
		{
			title: 'Getting started',
			topics: [
				{ label: 'Create your workspace', href: '/docs/create-your-workspace' },
				{ label: 'Add your first role', href: '/docs/add-your-first-role' },
				{ label: 'Add your first process', href: '/docs/add-your-first-process' },
				{ label: 'Add systems', href: '/docs/add-systems' },
				{
					label: 'Connect actions to roles and systems',
					href: '/docs/connect-actions-to-roles-and-systems'
				}
			]
		},
		{
			title: 'Using the atlas',
			topics: [
				{ label: 'Search and lookup', href: '/docs/search-and-lookup' },
				{ label: 'Role manuals', href: '/docs/role-manuals' },
				{ label: 'Process steps', href: '/docs/process-steps' },
				{ label: 'Flags', href: '/docs/flags' },
				{ label: 'Handoffs', href: '/docs/handoffs' }
			]
		},
		{
			title: 'Administration',
			topics: [
				{ label: 'Users and access', href: '/docs/users-and-access' },
				{ label: 'Workspace settings', href: '/docs/workspace-settings' },
				{ label: 'Exporting your data', href: '/docs/exporting-your-data' },
				{ label: 'Deleting your data', href: '/docs/deleting-your-data' }
			]
		},
		{
			title: 'Release notes',
			topics: [{ label: 'Changelog', href: '/changelog' }]
		}
	]
};
