export const prerender = true;

export async function GET() {
	const domain = 'https://marketing.dannymcgiffin.com';

	const serverCard = {
		mcpServerInfo: {
			name: 'Quaestor Marketing API',
			version: '1.0.0',
			description: 'API for grading AI-readiness of operational processes.'
		},
		capabilities: {
			tools: [
				{
					name: 'grade_sop',
					description: 'Grades an SOP for AI-readiness.',
					inputSchema: {
						type: 'object',
						properties: {
							text: { type: 'string', description: 'The SOP text to grade.' },
							source: { type: 'string', description: 'UTM source or identifier.' }
						},
						required: ['text']
					}
				}
			]
		},
		endpoints: [
			{
				name: 'main',
				url: `${domain}/grade`,
				type: 'sse'
			}
		]
	};

	return new Response(JSON.stringify(serverCard), {
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
