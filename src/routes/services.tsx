import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CTASection } from "@/components/site/CTASection";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, ArrowUpRight, Boxes, Bot, CheckCircle2, Compass, GraduationCap, Puzzle, Workflow } from "lucide-react";
import { keywords, SERVICES_KEYWORDS, MARKETS_LABEL, AREA_SERVED } from "@/data/seo";

const SERVICES_TITLE = "AI Automation Services — AI Development, Consulting & Workflow Automation | GOFTUS";
const SERVICES_DESC = `AI automation services: AI product development, agentic systems, intelligent automation, custom AI solutions, AI consulting and enterprise integration — for businesses across ${MARKETS_LABEL}.`;

const SERVICE_OFFERINGS = [
  "AI Product Development",
  "Agentic AI Systems",
  "AI Automation & Workflow Automation",
  "Custom AI Solutions & Enterprise Integration",
  "AI Consulting & Strategy",
  "AI Education & Training",
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: SERVICES_TITLE },
      { name: "description", content: SERVICES_DESC },
      { name: "keywords", content: keywords(SERVICES_KEYWORDS) },
      { property: "og:title", content: SERVICES_TITLE },
      { property: "og:description", content: SERVICES_DESC },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "AI Automation & AI Agent Development",
        provider: { "@type": "Organization", name: "GOFTUS" },
        description: SERVICES_DESC,
        areaServed: AREA_SERVED,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "AI Services",
          itemListElement: SERVICE_OFFERINGS.map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      }),
    }],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Boxes,
    title: "AI Product Development",
    eyebrow: "From idea to launch",
    desc: "We design and build AI-first products that users can actually adopt, test, and scale.",
    items: ["MVP validation", "SaaS dashboards", "AI web/mobile apps", "Usage analytics"],
    outcome: "Launch faster with a product-ready AI foundation.",
  },
  {
    icon: Bot,
    title: "Agentic Systems",
    eyebrow: "Autonomous work execution",
    desc: "Multi-agent systems that plan, call tools, hand off tasks, and keep humans in control.",
    items: ["Multi-agent orchestration", "Tool calling", "Memory + RAG", "Human approval flows"],
    outcome: "Turn repeatable operations into reliable agent workflows.",
  },
  {
    icon: Workflow,
    title: "AI Automation",
    eyebrow: "Less manual work",
    desc: "Automations that connect your CRM, email, forms, spreadsheets, and internal tools.",
    items: ["Workflow automation", "CRM automation", "Lead routing", "Reports and alerts"],
    outcome: "Reduce response time, rework, and operational bottlenecks.",
  },
  {
    icon: Puzzle,
    title: "Custom AI Solutions",
    eyebrow: "Built around your stack",
    desc: "Private, business-specific AI systems integrated with your existing data and software.",
    items: ["Enterprise integrations", "Internal copilots", "Document intelligence", "API connectors"],
    outcome: "Make AI useful inside the systems your team already uses.",
  },
  {
    icon: Compass,
    title: "AI Consulting",
    eyebrow: "Clarity before build",
    desc: "Strategy, architecture, and implementation planning for practical AI adoption.",
    items: ["AI roadmap", "Feasibility audits", "Architecture planning", "Implementation support"],
    outcome: "Know what to build, what to avoid, and where ROI comes from.",
  },
  {
    icon: GraduationCap,
    title: "AI Education",
    eyebrow: "Upskill your team",
    desc: "Hands-on workshops that teach teams how to use, evaluate, and ship AI safely.",
    items: ["Team workshops", "Prompt systems", "Automation training", "AI governance basics"],
    outcome: "Give your team the confidence to use AI with discipline.",
  },
];

const process = [
  {
    title: "Discover",
    desc: "Map goals, blockers, systems, data, and success metrics.",
    tone: "bg-background ring-border",
    chip: "bg-accent/10 text-accent ring-accent/15",
  },
  {
    title: "Design",
    desc: "Define flows, agent roles, integrations, guardrails, and UX.",
    tone: "bg-background ring-border",
    chip: "bg-accent/10 text-accent ring-accent/15",
  },
  {
    title: "Build",
    desc: "Ship working agents, automations, APIs, and dashboards.",
    tone: "bg-background ring-border",
    chip: "bg-accent/10 text-accent ring-accent/15",
  },
  {
    title: "Deploy",
    desc: "Launch with monitoring, testing, access control, and support.",
    tone: "bg-background ring-border",
    chip: "bg-accent/10 text-accent ring-accent/15",
  },
  {
    title: "Scale",
    desc: "Improve reliability, extend use cases, and measure ROI.",
    tone: "bg-ink text-ink-foreground ring-transparent",
    chip: "bg-accent text-accent-foreground ring-accent",
    dark: true,
  },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-24 pb-24">
        <div className="absolute inset-0 glow-bg animate-glow-drift pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest animate-fade-up">Services</span>
          <h1 className="font-typemachine text-5xl md:text-7xl font-bold tracking-tight text-balance mt-4 mb-8 animate-fade-up [animation-delay:100ms] max-w-4xl">
            Build, deploy, and scale intelligence.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground animate-fade-up [animation-delay:200ms]">
            End-to-end services covering strategy, engineering, and enablement.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 0.1}
              className="h-full"
            >
            <div
              className={`service-card group relative overflow-hidden rounded-3xl p-8 ring-1 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_80px_rgba(25,18,13,0.12)] ${
                i === 1
                  ? "bg-ink text-ink-foreground ring-transparent"
                  : "bg-surface ring-border hover:ring-accent/40"
              }`}
            >
              <div className={`service-card-glow pointer-events-none absolute -right-20 -top-20 size-44 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
                i === 1 ? "bg-accent/20 opacity-60" : "bg-accent/10 opacity-0"
              }`} />
              <div className="service-card-line pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="service-card-sheen pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0" />

              <div className="relative z-10">
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div className={`grid size-12 place-items-center rounded-2xl ring-1 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 ${
                    i === 1 ? "bg-white/5 ring-white/10" : "bg-background ring-border"
                  }`}>
                    <s.icon className="size-5 text-accent" />
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-widest ${
                    i === 1 ? "bg-white/10 text-ink-foreground/60" : "bg-accent/10 text-accent"
                  }`}>
                    {s.eyebrow}
                  </span>
                </div>

                <h3 className="font-typemachine text-2xl font-bold mb-3">{s.title}</h3>
                <p className={`mb-6 text-sm leading-relaxed ${i === 1 ? "text-ink-foreground/68" : "text-muted-foreground"}`}>
                  {s.desc}
                </p>

                <ul className={`space-y-3 text-sm ${i === 1 ? "text-ink-foreground/76" : "text-muted-foreground"}`}>
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 shrink-0 text-accent" />
                    <span>{it}</span>
                  </li>
                ))}
                </ul>

                <div className={`mt-7 rounded-2xl p-4 ring-1 transition-colors ${
                  i === 1 ? "bg-white/[0.06] ring-white/10" : "bg-background/70 ring-border group-hover:ring-accent/20"
                }`}>
                  <p className={`text-xs leading-relaxed ${i === 1 ? "text-ink-foreground/70" : "text-muted-foreground"}`}>
                    {s.outcome}
                  </p>
                </div>

                <Link to="/contact" className={`mt-6 inline-flex items-center gap-2 text-xs font-bold transition-colors ${
                  i === 1 ? "text-accent" : "text-foreground group-hover:text-accent"
                }`}>
                  Explore service <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-surface border-y border-border py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Process</span>
            <h2 className="font-typemachine text-4xl font-bold tracking-tight mt-4">A five-stage delivery model.</h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {process.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={i * 0.12}
                className="relative"
              >
                <div
                  className={`process-card ${p.dark ? "process-card-dark" : ""} group relative h-full overflow-hidden rounded-2xl ${p.tone} p-6 ring-1 shadow-sm transition-all ${
                    p.dark
                      ? "hover:ring-accent/35 hover:shadow-[0_18px_50px_rgba(25,18,13,0.18)]"
                      : "hover:bg-surface hover:ring-accent/35 hover:shadow-[0_18px_50px_rgba(25,18,13,0.1)]"
                  }`}
                >
                  <div className={`process-card-glow pointer-events-none absolute -right-12 -top-12 size-28 rounded-full blur-2xl opacity-0 transition-opacity group-hover:opacity-100 ${
                    p.dark ? "bg-accent/18" : "bg-accent/12"
                  }`} />
                  <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative z-10">
                    <span className={`inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-[10px] font-mono ring-1 transition-transform group-hover:scale-110 ${p.chip}`}>
                      0{i + 1}
                    </span>
                    <h4 className="font-typemachine font-bold text-xl mt-4">{p.title}</h4>
                    <p className={`mt-3 text-xs leading-relaxed ${p.dark ? "text-ink-foreground/65" : "text-muted-foreground"}`}>{p.desc}</p>
                  </div>
                </div>
                {i < 4 && (
                  <div className="hidden md:grid absolute top-1/2 -right-3 z-20 size-7 -translate-y-1/2 place-items-center rounded-full bg-accent text-accent-foreground shadow-sm ring-4 ring-surface">
                    <ArrowRight className="size-3.5" />
                  </div>
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="bg-accent/5 ring-1 ring-accent/10 rounded-[2rem] p-12 md:p-20 text-center">
          <h2 className="font-typemachine text-3xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
            Engagements scoped to your stage.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            From rapid agent pilots to enterprise rollouts. Pricing built around outcomes, not seats.
          </p>
        </div>
      </section>

      <CTASection title="Start your engagement" primaryLabel="Get a Quote" secondaryLabel="See Agents" secondaryTo="/agents" />
    </SiteLayout>
  );
}
