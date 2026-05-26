<script lang="ts">
	import { resolve } from '$app/paths';
	import BrandText from '$lib/components/BrandText.svelte';

	type FooterLink = {
		label: string;
		href: string;
	};

	const defaultFooter = {
		brand: 'Quaestor',
		tagline: 'Handle Your Business.',
		copyrightName: 'Quaestor',
		entityName: 'Cursus Tools, LLC',
		supportEmail: 'support@cursus.tools',
		linkedinHref: 'https://www.linkedin.com/company/cursus-tools',
		legalLinks: [
			{ label: 'Privacy', href: '/legal#privacy' },
			{ label: 'Terms', href: '/legal#terms' },
			{ label: 'DPA', href: '/legal#dpa' },
			{ label: 'Subprocessors', href: '/legal#subprocessors' }
		],
		productLinks: [
			{ label: 'Problem', href: '/#problem' },
			{ label: 'Reactions', href: '/#reactions' },
			{ label: 'Pricing', href: '/#pricing' },
			{ label: 'Why', href: '/method' },
			{ label: 'Partners', href: '/partners' },
			{ label: 'About', href: '/about' }
		]
	} as const;

	let {
		brand = defaultFooter.brand,
		tagline = defaultFooter.tagline,
		copyrightName = defaultFooter.copyrightName,
		entityName = defaultFooter.entityName,
		supportEmail = defaultFooter.supportEmail,
		linkedinHref = defaultFooter.linkedinHref,
		legalLinks = defaultFooter.legalLinks,
		year = new Date().getFullYear(),
		links = defaultFooter.productLinks
	}: {
		brand?: string;
		tagline?: string;
		copyrightName?: string;
		entityName?: string;
		supportEmail?: string;
		linkedinHref?: string;
		legalLinks?: readonly FooterLink[];
		year?: number;
		links?: readonly FooterLink[];
	} = $props();
</script>

<footer class="marketing-footer">
	<div class="marketing-container">
		<div class="footer-grid">
			<div class="footer-col footer-brand-col">
				<div class="footer-brand"><BrandText text={brand} /></div>
				<div class="footer-tagline"><BrandText text={tagline} /></div>
				<div class="footer-entity"><BrandText text={entityName} /></div>
				<div class="footer-contact">
					<a href="mailto:{supportEmail}">{supportEmail}</a>
					{#if linkedinHref}
						<a
							{...{
								href: linkedinHref,
								target: '_blank',
								rel: 'noopener noreferrer'
							}}>LinkedIn</a
						>
					{/if}
				</div>
				<div class="footer-copyright">
					&copy; {year}
					{copyrightName}. All rights reserved.
				</div>
			</div>

			<nav class="footer-col" aria-label="Product navigation">
				<p class="footer-col-title">Product</p>
				<div class="footer-links-stack">
					{#each links as link (link.href)}
						<a href={resolve(link.href as '/')}>{link.label}</a>
					{/each}
				</div>
			</nav>

			<nav class="footer-col" aria-label="Legal navigation">
				<p class="footer-col-title">Legal & Trust</p>
				<div class="footer-links-stack">
					{#each legalLinks as link (link.href)}
						<a href={resolve(link.href as '/')}>{link.label}</a>
					{/each}
					<a href={resolve('/security')}>Security</a>
					<a href={resolve('/docs')}>Docs</a>
				</div>
			</nav>
		</div>
	</div>
</footer>

<style>
	.marketing-footer {
		position: relative;
		border-top: 1px solid rgb(var(--border));
		padding-block: 4rem;
		background: rgb(var(--bg-panel) / 0.3);
	}

	.footer-grid {
		display: grid;
		gap: 3rem;
		grid-template-columns: 1fr;
	}

	.footer-col {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.footer-brand-col {
		gap: 0.5rem;
	}

	.footer-brand {
		font-size: 1.125rem;
		font-weight: 700;
	}

	.footer-tagline {
		color: rgb(var(--surface-text-strong));
		font-size: var(--fs-small);
		font-weight: 500;
	}

	.footer-entity {
		margin-top: 0.5rem;
		color: rgb(var(--muted));
		font-size: var(--fs-small);
	}

	.footer-contact {
		display: flex;
		flex-wrap: wrap;
		gap: 1.25rem;
		margin-top: 0.25rem;
		font-size: var(--fs-small);
	}

	.footer-contact a {
		color: rgb(var(--accent));
		font-weight: 500;
		text-decoration: none;
	}

	.footer-contact a:hover {
		text-decoration: underline;
	}

	.footer-copyright {
		margin-top: 1.5rem;
		color: rgb(var(--muted));
		font-size: var(--fs-micro);
		opacity: 0.8;
	}

	.footer-col-title {
		margin: 0 0 0.5rem;
		color: rgb(var(--surface-text-strong));
		font-size: var(--fs-micro);
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.footer-links-stack {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.footer-links-stack a {
		color: rgb(var(--muted));
		font-size: var(--fs-small);
		text-decoration: none;
		transition: color 160ms ease;
	}

	.footer-links-stack a:hover {
		color: rgb(var(--surface-text-strong));
	}

	@media (min-width: 768px) {
		.footer-grid {
			grid-template-columns: 2fr 1fr 1fr;
			gap: 2rem;
		}
	}
</style>
