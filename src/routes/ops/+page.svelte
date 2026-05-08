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
	import { site } from '$lib/site-ops';

	const year = new Date().getFullYear();
	const footerLinks = [
		{ label: 'Problem', href: '#problem' },
		{ label: 'Proof', href: '#proof' },
		{ label: 'Pricing', href: '#pricing' },
		{ label: 'Method', href: '/method' },
		{ label: 'Partners', href: '/partners' }
	] as const;

	let activeModalImage = $state<string | null>(null);
	let activeModalAlt = $state('');

	const trackHeroPrimaryCta = () => {
		trackEvent('hero_cta_click', { location: 'ops_hero_primary' });
		trackEvent('signup_start', { location: 'ops_hero_primary' });
	};

	const trackDemoClick = (location: string) => {
		trackEvent('demo_click', { location });
	};

	const trackSignupStart = (location: string) => {
		trackEvent('signup_start', { location });
	};

	const trackAiScoreClick = (location: string) => {
		trackEvent('ai_score_click', { location });
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
			kicker={site.hero.kicker}
			headline={site.hero.headline}
			rotatingWords={site.hero.rotatingWords}
			subhead={site.hero.subhead}
			primaryCta={site.hero.primaryCta}
			secondaryCta={site.hero.secondaryCta}
			onPrimaryClick={trackHeroPrimaryCta}
		/>

		<BulletSection
			id="problem"
			headline={site.forYou.headline}
			intro={site.forYou.intro}
			bullets={site.forYou.bullets}
			punchline={site.forYou.punchline}
		/>

		<CardGridSection
			id="shadow-ops"
			headline={site.shadowOps.headline}
			subhead={site.shadowOps.subhead}
			items={site.shadowOps.points}
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
			demoCta={{ label: 'See the demo', href: 'https://qstr.cursus.tools/demo/process' }}
			onDemoClick={() => trackDemoClick('ops_proof_demo')}
			onImageOpen={(src, alt) => {
				activeModalImage = src;
				activeModalAlt = alt;
			}}
		/>

		<PricingSection
			id="pricing"
			headline={site.pricing.headline}
			subhead={site.pricing.subhead}
			plans={site.pricing.plans}
			freeLink={site.pricing.freeLink}
			onPlanClick={(planName) => trackSignupStart(`ops_pricing_${planName.toLowerCase()}`)}
			onFreeLinkClick={() => trackSignupStart('ops_pricing_free_link')}
		/>

		<FinalCtaSection
			headline={site.finalCta.headline}
			text={site.finalCta.text}
			ctas={[
				{
					label: site.finalCta.cta.label,
					href: site.finalCta.cta.href,
					onclick: () => trackAiScoreClick('ops_final_cta')
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
