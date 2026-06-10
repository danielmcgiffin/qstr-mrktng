export type ManifestoConviction = {
	title: string;
	desc: string;
};

export type ManifestoContent = {
	seo: {
		title: string;
		description: string;
		ogTitle: string;
		ogDescription: string;
	};
	eyebrow: string;
	title: string;
	paragraphs: string[];
	convictionsHeading: string;
	convictions: ManifestoConviction[];
	closingParagraphs: string[];
	close: string[];
	cta: {
		label: string;
		href: string;
	};
};

export const manifestoContent: ManifestoContent = {
	seo: {
		title: 'Manifesto - Quaestor',
		description:
			'Why Quaestor exists: legibility from within, not imposed from above. The operational atlas for owners.',
		ogTitle: 'The Quaestor Manifesto',
		ogDescription: 'Don’t let your business run you. Own it.'
	},
	eyebrow: 'Manifesto',
	title: 'The operational atlas for owners.',
	paragraphs: [
		'The world is being consolidated. Rolled up, automated, financialized, and abstracted into line items, dashboards, holding companies, and systems no owner can keep command of. The age belongs to scale, and scale demands everything become flat and legible: to investors as numbers, to platforms as usage, to software as workflows, to consultants as frameworks, to AI as structured context.',
		'None of that is evil. A business that cannot be understood cannot be improved, delegated, sold, or scaled. But legibility becomes dangerous when it is imposed from above, when the living shape of the business gets flattened into someone else’s model.',
		'The false prophets arrive on schedule. They know you feel the gap between what you have built and what you can explain. They know the business works, but not cleanly. They know the knowledge is real, but scattered across instincts, exceptions, relationships, and a hundred judgment calls nobody has written down. So they offer the cure: a framework, a platform, a methodology, a folder structure in a shared drive. Each one promising the same deal: stop trusting yourself and start trusting the system. Hand us your judgment. Hand us your instincts. Hand us the local genius your people actually showed up for. They call it best practice. They call it maturity. They call it growing up.',
		'What they are selling is a subtraction. The business survives. The owner disappears. When the dust settles, you are managing someone else’s operating model in your own building, wondering why it does not quite fit and why the thing you built feels foreign to you now.',
		'That is the bargain Quaestor rejects.',
		'A small business is still one of the last places where you can build something real: serve people you can name, create wealth, train apprentices, reward loyalty, protect a family, anchor a community. Growth should make that business clearer without making it foreign. More systematic without making it soulless. More legible without making the owner disappear.',
		'Quaestor exists for owners who want to scale, sell, or step back from a position of strength, not surrender. We build the tools to make a business legible from within: preserving the character, judgment, and spirit that made it worth building, while turning the actual operating model into something visible, usable, and transferable.'
	],
	convictionsHeading: 'Quaestor is built on three convictions.',
	convictions: [
		{
			title: 'Relationships, not documents',
			desc: 'Your business is not made of pages. It is made of flows, handoffs, roles, systems, decisions, and conditions. Map the relationships and the documents become outputs, not the foundation.'
		},
		{
			title: 'Structure at the point of work',
			desc: 'Your people do not need more text blobs or another wiki. They need structure they can use where the work happens. Operations structured clearly enough for people are structured enough for AI, too.'
		},
		{
			title: 'Owners, not cap tables',
			desc: 'Most software makes more money every time you hire. We do not. One flat price per workspace, not per seat. Your headcount is not our revenue model.'
		}
	],
	closingParagraphs: [
		'When you can see your operating model, you can work on the business instead of being trapped inside it. You can preserve what works, fix what breaks, transfer judgment, and choose your next move from strength.'
	],
	close: ['Retake Command.', 'Don’t let your business run you.', 'Own it.'],
	cta: {
		label: 'Map your business',
		href: 'https://qstr.cursus.tools/login?utm_source=qstr.tools&utm_medium=website&utm_campaign=v1_launch&utm_content=manifesto'
	}
};
