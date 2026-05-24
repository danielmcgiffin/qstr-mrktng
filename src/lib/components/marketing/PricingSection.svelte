<script lang="ts">
	import BrandText from '$lib/components/BrandText.svelte';

	type PricingCta = {
		label: string;
		href: string;
	};

	type PricingPlan = {
		name: string;
		price: string;
		period: string;
		desc: string;
		perks: readonly string[];
		cta: PricingCta;
		featured: boolean;
		badge?: string;
		note?: string;
	};

	let {
		id,
		headline,
		subhead,
		plans,
		freeLink,
		onPlanClick,
		onFreeLinkClick
	}: {
		id: string;
		headline: string;
		subhead: string;
		plans: readonly PricingPlan[];
		freeLink?: PricingCta;
		onPlanClick?: (planName: string, href: string) => void;
		onFreeLinkClick?: () => void;
	} = $props();
</script>

<section {id} class="marketing-section pricing-section">
	<div class="marketing-container">
		<div class="section-header pricing-header">
			<h2 class="section-title"><BrandText text={headline} /></h2>
			<p class="section-copy section-copy-large"><BrandText text={subhead} /></p>
		</div>

		<div class="pricing-grid">
			{#each plans as plan}
				<div class={'pricing-card ' + (plan.featured ? 'pricing-card-featured' : '')}>
					{#if plan.badge}
						<div class="pricing-badge" class:pricing-badge-featured={plan.featured}>
							{#if plan.featured}
								<span aria-hidden="true">&diams;</span>
							{/if}
							<BrandText text={plan.badge} />
						</div>
					{/if}

					<h3 class="pricing-name"><BrandText text={plan.name} /></h3>
					<div class="pricing-price-row">
						<span class="pricing-price">{plan.price}</span>
						<span class="pricing-period">/ {plan.period}</span>
					</div>
					<div class="pricing-rule"></div>
					<p class="pricing-desc"><BrandText text={plan.desc} /></p>

					<ul class="check-list">
						{#each plan.perks as perk}
							<li>
								<span class="check-mark" aria-hidden="true">&#10003;</span>
								<span><BrandText text={perk} /></span>
							</li>
						{/each}
					</ul>

					<div class="pricing-card-action">
						<a
							class="btn btn-primary"
							href={plan.cta.href}
							onclick={() => onPlanClick?.(plan.name, plan.cta.href)}
						>
							{plan.cta.label}
						</a>
					</div>

					{#if plan.note}
						<p class="pricing-note">
							<span class="pricing-note-icon" aria-hidden="true">&oplus;</span>
							<BrandText text={plan.note} />
						</p>
					{/if}
				</div>
			{/each}
		</div>

		{#if freeLink}
			<div class="pricing-free-link">
				<a class="text-link" href={freeLink.href} onclick={() => onFreeLinkClick?.()}>
					{freeLink.label}
				</a>
			</div>
		{/if}
	</div>
</section>
