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
	import { site } from '$lib/site-partners';

	type FinalCta = {
		label: string;
		href: string;
		variant?: 'primary' | 'secondary';
		external?: boolean;
		onclick?: () => void;
		showArrow?: boolean;
	};

	const year = new Date().getFullYear();
	const footerLinks = [
		{ label: 'Problem', href: '#problem' },
		{ label: 'Proof', href: '#proof' },
		{ label: 'Pricing', href: '#pricing' },
		{ label: 'Method', href: '/method' },
		{ label: 'Operators', href: '/ops' }
	] as const;

	let activeModalImage = $state<string | null>(null);
	let activeModalAlt = $state('');

	const showPartnerApply = $derived(site.partnerApply.live);

	const trackPartnerCall = (location: string) => {
		trackEvent('booking_click', { location });
	};

	const trackDemoClick = (location: string) => {
		trackEvent('demo_click', { location });
	};

	const trackPartnerApply = (location: string) => {
		trackEvent('partner_intake_click', { location });
	};

	const trackSignupStart = (location: string) => {
		trackEvent('signup_start', { location });
	};

	const trackPricingPlanClick = (planName: string, href: string) => {
		const location = `partners_pricing_${planName.toLowerCase().replace(/\s+/g, '_')}`;
		trackEvent('pricing_plan_click', { location, plan_name: planName, href });

		if (href.includes('qstr.cursus.tools/login')) {
			trackSignupStart(location);
		}
	};

	const finalCtas = $derived.by((): FinalCta[] => {
		const ctas: FinalCta[] = [
			{
				label: site.finalCta.primaryCta.label,
				href: site.finalCta.primaryCta.href,
				external: true,
				onclick: () => trackPartnerCall('partners_final_cta_primary')
			}
		];

		if (showPartnerApply) {
			ctas.push({
				label: site.partnerApply.label,
				href: site.partnerApply.href,
				variant: 'secondary',
				external: true,
				onclick: () => trackPartnerApply('partners_final_cta_apply'),
				showArrow: false
			});
		}

		return ctas;
	});
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
			primaryExternal
			onPrimaryClick={() => trackPartnerCall('partners_hero_primary')}
			onSecondaryClick={() => trackDemoClick('partners_hero_secondary')}
		/>

		<BulletSection
			id="problem"
			headline={site.forYou.headline}
			intro={site.forYou.intro}
			bullets={site.forYou.bullets}
			punchline={site.forYou.punchline}
		/>

		<CardGridSection
			id="why"
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
			demoCta={{ label: 'See the demo', href: site.hero.secondaryCta.href }}
			onDemoClick={() => trackDemoClick('partners_proof_demo')}
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
			onPlanClick={trackPricingPlanClick}
			onFreeLinkClick={() => trackSignupStart('partners_pricing_free_link')}
		/>

		<FinalCtaSection headline={site.finalCta.headline} text={site.finalCta.text} ctas={finalCtas} />

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
