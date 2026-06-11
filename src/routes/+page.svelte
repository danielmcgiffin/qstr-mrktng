<script lang="ts">
	import ImageModal from '$lib/components/ImageModal.svelte';
	import BulletSection from '$lib/components/marketing/BulletSection.svelte';
	import CardGridSection from '$lib/components/marketing/CardGridSection.svelte';
	import FaqSection from '$lib/components/marketing/FaqSection.svelte';
	import FinalCtaSection from '$lib/components/marketing/FinalCtaSection.svelte';
	import MarketingFooter from '$lib/components/marketing/MarketingFooter.svelte';
	import MarketingHero from '$lib/components/marketing/MarketingHero.svelte';
	import PricingSection from '$lib/components/marketing/PricingSection.svelte';
	import ProofSection from '$lib/components/marketing/ProofSection.svelte';
	import SocialProofSection from '$lib/components/marketing/SocialProofSection.svelte';
	import StepsSection from '$lib/components/marketing/StepsSection.svelte';
	import { onMount } from 'svelte';
	import { trackEvent } from '$lib/analytics';
	import { site } from './content';

	const footerLinks = site.footer.productLinks;

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

	let activeModalImage = $state<string | null>(null);
	let activeModalAlt = $state('');

	onMount(() => {
		if (site.beehiivFormId) {
			const loader = document.createElement('script');
			loader.async = true;
			loader.src = 'https://subscribe-forms.beehiiv.com/v3/loader.js';
			loader.dataset.beehiivForm = site.beehiivFormId;
			document.body.appendChild(loader);

			const attribution = document.createElement('script');
			attribution.async = true;
			attribution.src = 'https://subscribe-forms.beehiiv.com/attribution.js';
			document.body.appendChild(attribution);

			return () => {
				loader.remove();
				attribution.remove();
			};
		}
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
			headline={site.hero.headline}
			subhead={site.hero.subhead}
			primaryCta={site.hero.primaryCta}
			secondaryCta={site.hero.secondaryCta}
			imageSrc={site.hero.imageSrc}
			imageAlt={site.hero.imageAlt}
			imageCaption={site.hero.imageCaption}
			onPrimaryClick={trackHeroPrimaryCta}
			onSecondaryClick={() => trackDemoClick('home_hero_secondary')}
			onImageClick={() => {
				activeModalImage = site.hero.imageSrc;
				activeModalAlt = site.hero.imageAlt ?? '';
			}}
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

		<ProofSection
			id="proof"
			headline={site.proof.headline}
			subhead={site.proof.subhead}
			items={site.proof.items}
			demoVideo={site.demo}
			demoCta={{ label: 'See the demo', href: site.hero.secondaryCta.href }}
			onDemoClick={() => trackDemoClick('home_proof_demo')}
			onImageOpen={(src, alt) => {
				activeModalImage = src;
				activeModalAlt = alt;
			}}
		/>

		<StepsSection
			id="workflow"
			headline={site.howItWorks.headline}
			subhead={site.howItWorks.subhead}
			steps={site.howItWorks.steps}
		/>

		<CardGridSection
			id="convictions"
			headline={site.setsApart.headline}
			subhead={site.setsApart.subhead}
			items={site.setsApart.items}
		/>

		<SocialProofSection
			id="reactions"
			headline={site.socialProof.headline}
			items={site.socialProof.items}
		/>

		<CardGridSection
			id="tests"
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
			onPlanClick={trackPricingPlanClick}
			onFreeLinkClick={() => trackSignupStart('home_pricing_free_link')}
		/>

		<FaqSection id="faq" headline={site.faq.headline} items={site.faq.items} />

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

<ImageModal src={activeModalImage} alt={activeModalAlt} onClose={() => (activeModalImage = null)} />
