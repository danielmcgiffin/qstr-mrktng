export type NavItem = { label: string; href: string };
export type CTA = { label: string; href: string };

export type FeatureItem = { title: string; desc: string };
export type StepItem = { n: string; title: string; desc: string };
export type FaqItem = { q: string; a: string };

export type PricingPlan = {
  name: string;
  price: string;
  desc: string;
  perks: string[];
  cta: CTA;
  featured: boolean;
  badge?: string;
};

export const site = {
  brand: "Quaestor",

  nav: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "https://blog.cursus.tools" },
    { label: "Demo", href: "https://qstr.cursus.tools/demo/process" },
    { label: "Method", href: "/method" },
    { label: "Partners", href: "/partners" },
    { label: "Contact", href: "/contact" }
  ] satisfies NavItem[],

  navCta: { label: "Book a call", href: "https://cal.com/danny-cursus/15min" } satisfies CTA,

  hero: {
    kicker: "Clarity is Freedom",
    headline: "No more",
    subhead:
      "Quaestor maps who does what, in which system, as an operational atlas. Roles connect to processes. Processes connect to systems. Everything links.",
    primaryCta: { label: "See it in Action", href: "https://qstr.cursus.tools" },
    secondaryCta: { label: "FAQs", href: "#faq" }
  } satisfies {
    kicker: string;
    headline: string;
    subhead: string;
    primaryCta: CTA;
    secondaryCta: CTA;
  },

  demo: {
    // Prefer MP4 for quality/perf. Put the file in /static/demo.mp4
    gifSrc: "/role-details.png",
    // Optional poster image in /static/demo-poster.jpg
    posterSrc: "/demo-poster.jpg",
    alt: "Quaestor connected processes, roles, and systems."
  } satisfies { mp4Src: string; posterSrc?: string; alt: string },

  forYou: {
    eyebrow: "You Know the Feeling...",
    headline: "It’s for you",
    bullets: [
      "The process lives in your head and three Slack threads from 2022.",
      "You wrote the SOP. It’s in a folder somewhere. Nobody’s ever opened it.",
      "Every question comes to you because you’re the only one who knows how it actually works."
    ],
    punchline: "But what if your team could find it without having to go look for it?"
  } satisfies { eyebrow: string; headline: string; bullets: string[]; punchline: string },

  howItWorks: {
    eyebrow: "How it Works",
    headline: "Document once. Reference forever.",
    subhead: "Build an operational map your team can actually use.",
    steps: [
      { n: "Step 1", title: "Write", desc: "Add processes, roles, and systems. Start with the biggest pain points." },
      { n: "Step 2", title: "Connect", desc: "Link ownership + systems. Make the shape of your ops visible." },
      { n: "Step 3", title: "Use", desc: "Your team searches, your team finds, your team stops asking you." },
      { n: "Step 4", title: "Refine", desc: "Fix outdated steps on the spot. Flag rot before it bites." }
    ]
  } satisfies { eyebrow: string; headline: string; subhead: string; steps: StepItem[] },

  howItWorksSide: {
    cards: [
      {
        title: "What you get",
        items: [
          { k: "Roles", v: "who owns what" },
          { k: "Processes", v: "what happens next" },
          { k: "Systems", v: "where it happens" },
          { k: "Links", v: "answers in 3 clicks" }
        ]
      },
      {
        title: "What it replaces",
        items: [
          { k: "Wikis", v: "page sprawl" },
          { k: "Folders", v: "lost context" },
          { k: "Slack", v: "load-bearing threads" },
          { k: "Docs", v: "stale + unloved" }
        ]
      }
    ]
  },

  features: {
    eyebrow: "Why Quaestor?",
    headline: "Stop babysitting. Start building.",
    subhead: "A map beats a folder. Ownership beats guessing.",
    items: [
      { title: "Faster onboarding", desc: "New hires find answers without finding you." },
      { title: "Smoother coordination", desc: "Stop ping-ponging questions. Point to the map." },
      { title: "Time off", desc: "The business doesn’t break because you’re not the only one who knows." },
      { title: "Maintenance alerts", desc: "Ownership is explicit. Stale steps surface before they hurt." },
      { title: "Cross-team clarity", desc: "Handoffs stop being mystery meat." },
      { title: "Scales with you", desc: "Capital sees real operations, not check-the-box docs." }
    ]
  } satisfies { eyebrow: string; headline: string; subhead: string; items: FeatureItem[] },

  pricing: {
    eyebrow: "Pricing",
    headline: "Simple pricing that scales with you",
    subhead: "Pick your company size. Upgrade when you grow.",
    plans: [
      {
        name: "Starter",
        badge: "Optional",
        price: "$49",
        desc: "For very small teams getting their map out of heads and into links.",
        perks: ["<10 employees", "Unlimited viewers", "Up to 3 editors", "Maintenance alerts"],
        cta: { label: "Get started", href: "https://qstr.cursus.tools" },
        featured: false
      },
      {
        name: "Growth",
        price: "$99",
        desc: "For teams starting to feel the coordination tax.",
        perks: ["10–25 employees", "Unlimited viewers", "Unlimited editors", "Priority support"],
        cta: { label: "Start Growth", href: "https://qstr.cursus.tools" },
        featured: true,
        badge: "Most popular"
      },
      {
        name: "Scale",
        price: "$299",
        desc: "For multi-team workflows and real cross-department handoffs.",
        perks: ["26–100 employees", "Unlimited editors", "Advanced alerts", "Implementation guidance"],
        cta: { label: "Start Scale", href: "https://qstr.cursus.tools" },
        featured: false
      },
      {
        name: "Business",
        price: "$499",
        desc: "For ops-heavy orgs standardizing how work gets done.",
        perks: ["101–499 employees", "Advanced permissions", "SLA support", "Onboarding assistance"],
        cta: { label: "Start Business", href: "https://qstr.cursus.tools" },
        featured: false
      },
      {
        name: "Enterprise",
        price: "Custom",
        desc: "For regulated environments, custom requirements, or rollout support.",
        perks: ["500+ employees", "Security review", "SSO/SAML (if needed)", "Dedicated onboarding"],
        cta: { label: "Talk to us", href: "https://cal.com/danny-cursus/15min" },
        featured: false
      }
    ]
  },

  faq: {
    eyebrow: "FAQ",
    headline: "Answers, without the runaround",
    subhead: "The point is less hunting, less asking, fewer dropped balls.",
    items: [
      { q: "How is this different from Notion / Confluence / a wiki?", a: "Wikis store pages. Quaestor stores a map: roles ↔ actions ↔ systems." },
      { q: "How long does setup take?", a: "Start with one cross-department workflow. Expand from there." },
      { q: "What if I already have SOPs and docs?", a: "Import the intent: roles, steps, systems. Keep docs as references." },
      { q: "Is this just another tool I have to maintain?", a: "Maintenance is the point: ownership + alerts keep it from rotting." },
      { q: "Who is this for?", a: "Founder-bottlenecked teams who need answers to stop routing to the same person." }
    ]
  } satisfies { eyebrow: string; headline: string; subhead: string; items: FaqItem[] },

  footer: {
    tagline: "Your Operational Atlas",
    copyrightName: "Quaestor"
  } as const
} as const;