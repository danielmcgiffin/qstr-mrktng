<script lang="ts">
	import ImageModal from '$lib/components/ImageModal.svelte';
	import BulletSection from '$lib/components/marketing/BulletSection.svelte';
	import CardGridSection from '$lib/components/marketing/CardGridSection.svelte';
	import FinalCtaSection from '$lib/components/marketing/FinalCtaSection.svelte';
	import MarketingFooter from '$lib/components/marketing/MarketingFooter.svelte';
	import MarketingHero from '$lib/components/marketing/MarketingHero.svelte';
	import PricingSection from '$lib/components/marketing/PricingSection.svelte';
	import ProofFaqSection from '$lib/components/marketing/ProofFaqSection.svelte';
	import StepsSection from '$lib/components/marketing/StepsSection.svelte';
	import { trackEvent } from '$lib/analytics';
	import { site } from '$lib/site';

	const year = new Date().getFullYear();
	const footerLinks = [
		{ label: 'Problem', href: '/#problem' },
		{ label: 'Proof', href: '/#proof' },
		{ label: 'Pricing', href: '/#pricing' },
		{ label: 'Method', href: '/method' },
		{ label: 'Partners', href: '/partners' }
	] as const;

	let activeModalImage = $state<string | null>(null);
	let activeModalAlt = $state('');

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
			onPrimaryClick={trackHeroPrimaryCta}
			onSecondaryClick={() => trackDemoClick('home_hero_secondary')}
		/>

		<BulletSection
			id="problem"
			headline={site.forYou.headline}
			intro={site.forYou.intro}
			bullets={site.forYou.bullets}
			punchline={site.forYou.punchline}
		/>

		<StepsSection
			id="workflow"
			headline={site.howItWorks.headline}
			subhead={site.howItWorks.subhead}
			steps={site.howItWorks.steps}
		/>

		<ProofFaqSection
			id="proof"
			headline={site.proof.headline}
			subhead={site.proof.subhead}
			items={site.proof.items}
			faqHeadline={site.faq.headline}
			faqItems={site.faq.items}
			demoCta={{ label: 'Explore the demo', href: site.hero.secondaryCta.href }}
			onDemoClick={() => trackDemoClick('home_proof_demo')}
			onImageOpen={(src, alt) => {
				activeModalImage = src;
				activeModalAlt = alt;
			}}
		/>

		<CardGridSection
			id="trust"
			headline={site.trust.headline}
			subhead={site.trust.subhead}
			items={site.trust.items}
		/>

		<PricingSection
			id="pricing"
			headline={site.pricing.headline}
			subhead={site.pricing.subhead}
			plans={site.pricing.plans}
			freeLink={site.pricing.freeLink}
			onPlanClick={(planName) => trackSignupStart(`home_pricing_${planName.toLowerCase()}`)}
			onFreeLinkClick={() => trackSignupStart('home_pricing_free_link')}
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

		<MarketingFooter
			brand={site.brand}
			tagline={site.footer.tagline}
			copyrightName={site.footer.copyrightName}
			{year}
			links={footerLinks}
		/>
	</div>
</div>

<ImageModal src={activeModalImage} alt={activeModalAlt} onClose={() => (activeModalImage = null)} />
