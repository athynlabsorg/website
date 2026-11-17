import { ph, type Field } from "@/lib/placeholder";

/**
 * All homepage copy (spec §8.2). `ph(...)` marks placeholder content that must be
 * replaced with real content before launch. The production build refuses it.
 * Copy rules: no em dashes, no "not X, just Y" lines.
 */

type Link = { label: string; href: string };
import type { ServiceIconName } from "@/components/art/ServiceIcon";

export type HomeContent = {
  site: {
    bookingUrl: Field<string>;
    email: Field<string>;
    legalName: Field<string>;
    linkedin: Field<string>;
    github: Field<string>;
  };
  nav: { links: Link[]; cta: string };
  hero: {
    line1: string;
    line2: string;
    accent1: string;
    accent2: string;
    intro: string;
    primary: string;
    secondary: Link;
  };
  services: {
    heading: string;
    accent: string;
    note: string;
    cards: { icon: ServiceIconName; tone: "light" | "evergreen"; title: string; body: string }[];
  };
  work: {
    heading: string;
    accent: string;
    note: string;
    cases: {
      metric: Field<string>;
      metricLabel: Field<string>;
      sector: Field<string>;
      summary: Field<string>;
    }[];
  };
  process: {
    heading: string;
    accent: string;
    steps: { label: string; title: string; body: string }[];
  };
  about: {
    greeting: string;
    heading: string;
    accent: string;
    /** A path under public/ (e.g. "/fodilu.jpg"). Hosted URLs need images.remotePatterns in next.config.ts. */
    photo: Field<`/${string}` | null>;
    initials: string;
    bio: Field<string>;
    credentials: { figure: Field<string>; label: Field<string> }[];
  };
  // Lab cards sit on an absolutely positioned map: keep name ≤ 14, status ≤ 16, body ≤ 145 characters
  // (lib/copy-budget.ts; enforced by tests/copy-budget.test.ts).
  lab: {
    kicker: string;
    heading: string;
    accent: string;
    products: { name: Field<string>; status: string; body: string }[];
  };
  contact: { heading: string; accent: string; button: string; emailLead: string };
  footer: { tagline: string };
};

export const home: HomeContent = {
  site: {
    bookingUrl: ph("https://cal.com/athynlabs/intro"),
    email: ph("hello@athynlabs.com"),
    legalName: ph("Athyn Labs Inc."),
    linkedin: ph("https://www.linkedin.com/"),
    github: ph("https://github.com/"),
  },
  nav: {
    links: [
      { label: "Work with us", href: "#services" },
      { label: "The lab", href: "#lab" },
      { label: "About", href: "#about" },
    ],
    cta: "Start a project",
  },
  hero: {
    line1: "We build software",
    line2: "that",
    accent1: "pays",
    accent2: "attention.",
    intro:
      "Athyn Labs is a small engineering studio in Canada. We build AI systems for companies and public teams, and we grow our own products on the side.",
    primary: "Start a project",
    secondary: { label: "Peek inside the lab", href: "#lab" },
  },
  services: {
    heading: "Need a hand? Here’s what we’re",
    accent: "good at.",
    note: "You talk to the person writing the code, from the first call all the way to launch day.",
    cards: [
      {
        icon: "agents",
        tone: "light",
        title: "AI agents for real workflows",
        body: "Intake, document processing, triage and reporting. Built with the guardrails and monitoring to run in production.",
      },
      {
        icon: "product",
        tone: "light",
        title: "Product engineering",
        body: "Web and mobile products built to last. We scope a first release you can launch, then keep building as it grows.",
      },
      {
        icon: "public",
        tone: "evergreen",
        title: "Public sector projects",
        body: "Clear scopes, a fixed price you can take to procurement, and documentation your own team can run with.",
      },
    ],
  },
  work: {
    heading: "Selected",
    accent: "work.",
    note: "A few recent projects. Some clients prefer to stay unnamed, so we describe them by industry.",
    cases: [
      {
        metric: ph("40%"),
        metricLabel: ph("less time on manual intake"),
        sector: ph("Insurance brokerage, Ontario"),
        summary: ph("An intake agent that reads claim documents and fills in case files for the team to review."),
      },
      {
        metric: ph("6 wks"),
        metricLabel: ph("from kickoff to launch"),
        sector: ph("Municipal government, Canada"),
        summary: ph("A resident-facing service portal that replaced a paper form process for permit requests."),
      },
      {
        metric: ph("3×"),
        metricLabel: ph("faster weekly reporting"),
        sector: ph("Logistics company, North America"),
        summary: ph("An internal dashboard and reporting pipeline that pulls shipment data from four systems into one view."),
      },
    ],
  },
  process: {
    heading: "How a project",
    accent: "goes.",
    steps: [
      {
        label: "Step 1",
        title: "Plan it",
        body: "A quick call, then a written plan with milestones and a price you can sign off on.",
      },
      {
        label: "Step 2",
        title: "Build it",
        body: "Working software every week, live in a test space you can click around in.",
      },
      {
        label: "Step 3",
        title: "Launch it",
        body: "We ship, write everything down, and either hand you the keys or stay on to keep it running.",
      },
    ],
  },
  about: {
    greeting: "hi, I’m Fodilu",
    heading: "The engineer you’ll actually",
    accent: "work with.",
    photo: ph<`/${string}` | null>(null),
    initials: "FA",
    bio: ph(
      "I’ve spent years building software for companies across Canada. Athyn Labs is where I take on client work and grow our own products. When you hire us, I’m the one on your calls and in your codebase.",
    ),
    credentials: [
      { figure: ph("8+ yrs"), label: ph("shipping production software") },
      { figure: ph("20+"), label: ph("client projects delivered") },
      { figure: "CA", label: "incorporated, contract-ready" },
    ],
  },
  lab: {
    kicker: "out in the lab…",
    heading: "Three peaks we’re",
    accent: "climbing.",
    products: [
      {
        name: "Praxis",
        status: "on the ascent",
        body: "An AI clinic assistant that sits in on patient visits and writes the chart, notes and insurance forms. Clinicians get their evenings back.",
      },
      {
        name: ph("Agent Review"),
        status: "at base camp",
        body: "A second pair of eyes for your AI agents. It watches them in production and tells you what they did, and where they slipped.",
      },
      {
        name: "Toren",
        status: "at base camp",
        body: "A living map of your city. Know what’s happening right now at the spots you care about, before you head out.",
      },
    ],
  },
  contact: {
    heading: "Tell us what you’re",
    accent: "building.",
    button: "Book a 30-minute chat",
    emailLead: "or email",
  },
  footer: { tagline: "Made with care in Canada." },
};
