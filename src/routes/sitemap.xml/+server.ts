import { env } from '$env/dynamic/public';
import { methodContent } from '$lib/method-content';

export const prerender = true;

export async function GET() {
	const domain = (env.PUBLIC_SITE_ORIGIN || 'https://qstr.tools').replace(/\/+$/, '');
	const pages = ['', '/ops', '/partners', '/method', '/atlas-engagement', '/contact', '/ai-score'];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${domain}${page}</loc>
  </url>`
	)
	.join('\n')}
${methodContent
	.map(
		(m) => `  <url>
    <loc>${domain}/method/${m.slug}</loc>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
