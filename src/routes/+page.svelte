<script lang="ts">
	import CardGridSection from '$lib/components/marketing/CardGridSection.svelte';
	import FinalCtaSection from '$lib/components/marketing/FinalCtaSection.svelte';
	import MarketingFooter from '$lib/components/marketing/MarketingFooter.svelte';
	import MarketingHero from '$lib/components/marketing/MarketingHero.svelte';
	import PricingSection from '$lib/components/marketing/PricingSection.svelte';
	import SocialProofSection from '$lib/components/marketing/SocialProofSection.svelte';
	import { trackEvent } from '$lib/analytics';
	import { site } from './content';

	const footerLinks = [
		{ label: 'What sets us apart', href: '/#problem' },
		{ label: 'Reactions', href: '/#reactions' },
		{ label: 'Pricing', href: '/#pricing' },
		{ label: 'Why', href: '/method' },
		{ label: 'Docs', href: '/docs' },
		{ label: 'About', href: '/about' }
	] as const;

	const trackHeroPrimaryCta = () => {
		const href = site.hero.primaryCta.href;
		const location = 'home_hero_primary';

		trackEvent('hero_cta_click', { location });

		if (href.includes('qstr.cursus.tools/login')) {
			trackEvent('signup_start', { location });
		}
	};

	const trackDemoClick = (location: string) => {
		trackEvent('demo_click', { location });
	};

	const trackSignupStart = (location: string) => {
		trackEvent('signup_start', { location });
	};

	const trackPricingPlanClick = (planName: string, href: string) => {
		const location = `home_pricing_${planName.toLowerCase().replace(/\s+/g, '_')}`;
		trackEvent('pricing_plan_click', { location, plan_name: planName, href });

		if (href.includes('qstr.cursus.tools/login')) {
			trackSignupStart(location);
		}
	};
</script>

<svelte:head>
	<title>{site.seo.title}</title>
	<meta name="description" content={site.seo.description} />
	<meta property="og:title" content={site.seo.ogTitle ?? site.seo.title} />
	<meta property="og:description" content={site.seo.ogDescription ?? site.seo.description} />
	<meta property="og:image:alt" content={site.seo.imageAlt} />
	<meta name="twitter:title" content={site.seo.ogTitle ?? site.seo.title} />
	<meta name="twitter:description" content={site.seo.ogDescription ?? site.seo.description} />
	<meta name="twitter:image:alt" content={site.seo.imageAlt} />
</svelte:head>

<div class="marketing-page">
	<div class="marketing-page-inner">
		<MarketingHero
			headline={site.hero.headline}
			subhead={site.hero.subhead}
			primaryCta={site.hero.primaryCta}
			secondaryCta={site.hero.secondaryCta}
			imageSrc={site.hero.imageSrc}
			imageAlt={site.hero.imageAlt}
			onPrimaryClick={trackHeroPrimaryCta}
			onSecondaryClick={() => trackDemoClick('home_hero_secondary')}
		/>

		<CardGridSection
			id="problem"
			headline={site.setsApart.headline}
			subhead={site.setsApart.subhead}
			items={site.setsApart.items}
			layout="stack"
		/>

		<SocialProofSection
			id="reactions"
			headline={site.socialProof.headline}
			items={site.socialProof.items}
		/>

		<PricingSection
			id="pricing"
			headline={site.pricing.headline}
			subhead={site.pricing.subhead}
			plans={site.pricing.plans}
			freeLink={site.pricing.freeLink}
			onPlanClick={trackPricingPlanClick}
			onFreeLinkClick={() => trackSignupStart('home_pricing_free_link')}
		/>

		<CardGridSection
			id="trust"
			headline={site.trust.headline}
			subhead={site.trust.subhead}
			items={site.trust.items}
		/>

		<FinalCtaSection
			headline={site.finalCta.headline}
			text={site.finalCta.text}
			ctas={[
				{
					label: site.finalCta.cta.label,
					href: site.finalCta.cta.href,
					onclick: () => trackSignupStart('home_final_cta')
				}
			]}
		/>

		<MarketingFooter links={footerLinks} />
	</div>
</div>
