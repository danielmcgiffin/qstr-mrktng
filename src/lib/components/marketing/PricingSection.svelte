<script lang="ts">
	type PricingCta = {
		label: string;
		href: string;
	};

	type PricingPlan = {
		name: string;
		price: string;
		desc: string;
		perks: readonly string[];
		cta: PricingCta;
		featured: boolean;
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
		onPlanClick?: (planName: string) => void;
		onFreeLinkClick?: () => void;
	} = $props();
</script>

<section {id} class="marketing-section">
	<div class="marketing-container">
		<div class="section-header">
			<h2 class="section-title">{headline}</h2>
			<p class="section-copy section-copy-large">{subhead}</p>
		</div>

		<div class="pricing-grid">
			{#each plans as plan}
				<div class={'pricing-card ' + (plan.featured ? 'pricing-card-featured' : '')}>
					<div class="pricing-card-header">
						<h3 class="pricing-name">{plan.name}</h3>
						<div class="pricing-period">/mo</div>
					</div>
					<div class="pricing-price">{plan.price}</div>
					<p class="pricing-desc">{plan.desc}</p>

					<ul class="check-list">
						{#each plan.perks as perk}
							<li>
								<span class="check-mark" aria-hidden="true">&#10003;</span>
								<span>{perk}</span>
							</li>
						{/each}
					</ul>

					<div class="pricing-card-action">
						<a
							class="btn btn-primary"
							href={plan.cta.href}
							onclick={() => onPlanClick?.(plan.name)}
						>
							{plan.cta.label}
						</a>
					</div>
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
