import type { features } from "process";

export const site = {
  brand: "Quaestor",
  nav: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "https://blog.cursus.tools" },
    { label: "Demo", href: "https://qstr.cursus.tools/demo/process" },
    { label: "Method", href: "/method" },
    { label: "Partners", href: "/partners" },
    { label: "Contact", href: "/contact" }
  ],
  navCta: { label: "Book a call", href: "https://cal.com/danny-cursus/15min" },

  hero: {
    kicker: "No More Dead Docs",
    headline: "Your ops can't live in docs.",
    subhead:
      "Quaestor maps who does what, in which system, as an operational atlas. Roles connect to processes. Processes connect to systems. Everything links.",
    primaryCta: { label: "See it in Action", href: "https://qstr.cursus.tools" },
    secondaryCta: { label: "FAQs", href: "#faq" }
  },

  demo: {
    gifSrc: "/role-details.png",
    alt: "Quaestor connected processes, roles, and systems."
  },

  forYou: {
    title: "It's For You",
    eyebrow: "You Know the Feeling...",
    bullets: [
      "The process lives in your head and three Slack threads from 2022.",
      "You wrote the SOP. It's in a folder somewhere. Nobody's ever opened it.",
      "Every question comes to you because you're the only one who knows how it actually works."
    ],
    punchline: "But what if your team could find it without having to go look for it?"
  },

  howItWorks: {
    title: "How it Works",
    headline: "Document Once. Reference Forever.",
    steps: [
      { n: "Step 1", title: "Write", desc: "Add your processes, roles, and systems. Start with the biggest pain points." },
      { n: "Step 2", title: "Connect", desc: "Link ownership + systems. Make the shape of your ops visible." },
      { n: "Step 3", title: "Use", desc: "Your team searches, your team finds, your team stops asking you." },
      { n: "Step 4", title: "Refine", desc: "Fix outdated steps on the spot. Stale docs get flagged before they bite." }
    ]
  },

  features: {
    title: "Why Quaestor",
    items: [
      { title: "Faster Onboarding", desc: "New hires find answers without finding you." },
      { title: "Smoother Coordination", desc: "Stop emailing each other to answer what you could look up." },
      { title: "Time Off", desc: "The business doesn’t break because you’re not the only one who knows." },
      { title: "Cost Efficiency", desc: "Stale processes get flagged automatically. Ownership is explicit." },
      { title: "Data-Driven Insights", desc: "Transitions stop being a scramble because knowledge isn’t walking out the door." },
      { title: "Scalability & Growth", desc: "Investors/acquirers see real ops, not check-the-box docs." }
    ]
  },

  pricing: {
    title: "Velocity at the Right Price",
    subtitle: "Choose a plan that fits and stop losing momentum.",
    plans: [
      { name: "Starter", price: "$99/mo", desc: "Perfect for small businesses finally writing it down.", cta: { label: "Choose this plan", href: "#" }, perks: ["Unlimited viewers", "Up to 3 editors", "Maintenance alerts"], featured: false },
      { name: "Professional", badge: "Popular", price: "$199/mo", desc: "For those ready to scale their ops.", cta: { label: "Choose this plan", href: "#" }, perks: ["Unlimited editors", "Priority support", "Custom alerts"], featured: true },
      { name: "Enterprise", price: "Custom", desc: "If you need implementation or custom features.", cta: { label: "Schedule a call", href: "https://cal.com" }, perks: ["Done-for-you process builds", "Custom rules", "VIP support"], featured: false }
    ]
  },

  faq: {
    title: "We’ve Got the Answers You’re Looking For",
    items: [
      { q: "How is this different from Notion / Confluence / a wiki?", a: "Wikis store pages. Quaestor stores a map: roles ↔ actions ↔ systems." },
      { q: "How long does setup take?", a: "Start with one cross-department workflow. Expand from there." },
      { q: "What if I already have SOPs and docs?", a: "Import the intent: roles, steps, systems. Keep docs as references." },
      { q: "Is this just another tool I have to maintain?", a: "Maintenance is the point: ownership + alerts keep it from rotting." },
      { q: "Who is this for?", a: "Founder-bottlenecked teams who need answers to stop routing to the same person." }
    ]
  },

  footer: {
    tagline: "Your Operational Atlas"
  }
};