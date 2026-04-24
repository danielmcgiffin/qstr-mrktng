import { SITE_ORIGIN } from '$lib/agent-discovery';

export const prerender = false;

export async function GET() {
	const skillsIndex = {
		$schema: 'https://agentskills.io/schema/v0.2.0/index.json',
		skills: [
			{
				name: 'ops-grader',
				type: 'tool',
				description: 'Grades an SOP for AI-readiness and human legibility.',
				url: `${SITE_ORIGIN}/ai-score`
			}
		]
	};

	return new Response(JSON.stringify(skillsIndex), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
