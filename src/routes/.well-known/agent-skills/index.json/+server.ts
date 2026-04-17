export const prerender = true;

export async function GET() {
	const domain = 'https://marketing.dannymcgiffin.com';

	const skillsIndex = {
		$schema: 'https://agentskills.io/schema/v0.2.0/index.json',
		skills: [
			{
				name: 'ops-grader',
				type: 'tool',
				description: 'Grades an SOP for AI-readiness and human legibility.',
				url: `${domain}/ai-score`,
				digest: 'sha256:...' // Placeholder or calculate if needed
			}
		]
	};

	return new Response(JSON.stringify(skillsIndex), {
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
