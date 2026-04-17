import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Add Link headers for agent discovery (RFC 8288)
	const domain = 'https://marketing.dannymcgiffin.com';
	const links = [
		`</.well-known/api-catalog>; rel="api-catalog"`,
		`</.well-known/mcp/server-card.json>; rel="mcp-server-card"`,
		`</.well-known/agent-skills/index.json>; rel="agent-skills"`,
		`</ai-score>; rel="service-doc"`
	];

	response.headers.append('Link', links.join(', '));

	// Handle Markdown Negotiation
	const accept = event.request.headers.get('accept') || '';
	if (accept.includes('text/markdown')) {
		const isHome = event.url.pathname === '/' || event.url.pathname === '/ops';
		if (isHome) {
			const markdown = `# Quaestor — The Operational Atlas\n\nQuaestor helps ops partners and teams deploy living operational atlases that stay useful after the engagement ends.\n\n## Key Features\n- Reusable delivery model\n- Explicit handoffs\n- Post-engagement durability\n- Automated staleness signals\n\n## Tools\n- [AI Score Evaluation](/ai-score): Paste or upload an SOP to get an AI-readiness score.\n\n## Contact\n- Email: hello@cursus.tools\n- [Book a call](https://cal.com/danny-cursus/15min)`;

			return new Response(markdown, {
				headers: {
					'Content-Type': 'text/markdown',
					'X-Markdown-Tokens': 'quaestor-marketing-v1'
				}
			});
		}
	}

	return response;
};
