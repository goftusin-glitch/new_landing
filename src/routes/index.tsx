import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CTASection } from "@/components/site/CTASection";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import { Reveal } from "@/components/site/Reveal";
import { HowItWorks } from "@/components/site/HowItWorks";
import { ArrowRight, Plus, Bot, Boxes, Zap, Rocket, Workflow, Database, Headphones, ShieldCheck, Plug, Building2, LifeBuoy, FileText, Users, HeartPulse, Landmark, ShoppingBag, Truck, Building, GraduationCap, Factory, Scale, Network } from "lucide-react";
import { keywords, CORE_KEYWORDS, AREA_SERVED, MARKETS_LABEL } from "@/data/seo";

const HOME_TITLE = "AI Automation Agency & AI Agent Development Company — GOFTUS";
const HOME_DESC = `GOFTUS builds AI agents, agentic AI systems, AI automation, and custom AI solutions for businesses of every size — serving startups and enterprises across ${MARKETS_LABEL}.`;

// Most-asked questions about AI for business processes & operations.
const HOME_FAQS = [
  {
    q: "How can AI automation improve our business processes?",
    a: "AI automation removes repetitive, manual steps — data entry, follow-ups, reporting, routing — so your team focuses on higher-value work. AI agents can run these processes 24/7, reduce errors, and speed up turnaround across sales, support, and back-office operations.",
  },
  {
    q: "What business operations can AI agents handle?",
    a: "Customer support, sales outreach and lead qualification, order and invoice processing, HR onboarding, knowledge lookups, scheduling, and multi-step internal workflows. We build agents specialized to your operations and connect them to your existing tools.",
  },
  {
    q: "How do AI agents integrate with our existing tools and software?",
    a: "Our agents use tool-calling and APIs to connect with the systems you already run — CRMs, helpdesks, databases, spreadsheets, WhatsApp, email, and internal apps — so automation fits your current stack instead of replacing it.",
  },
  {
    q: "How long does it take to deploy AI automation?",
    a: "A focused pilot can ship in a few weeks. Larger, multi-agent automations are scoped to your needs and rolled out in stages so you see results early and scale what works.",
  },
  {
    q: "Do we need a large technical team or lots of data to start?",
    a: "No. We handle the build end to end, and most operations automations work with the data and documents you already have. You can start small with one process and expand from there.",
  },
  {
    q: "Is our business data safe with AI automation?",
    a: "Yes. We deploy in your cloud or ours, with guardrails, encryption, and audit trails, and we scope each agent to only the data and actions it needs.",
  },
  {
    q: "What is the ROI of AI automation for operations?",
    a: "Most clients measure ROI in hours saved, faster response and processing times, fewer errors, and the ability to scale operations without scaling headcount. We focus on automations tied to real business numbers, not demos.",
  },
  {
    q: "Can startups and small businesses use AI automation too?",
    a: "Absolutely. We build for every size — from startups automating their first workflow to enterprises running multi-agent systems across departments.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESC },
      { name: "keywords", content: keywords(CORE_KEYWORDS) },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESC },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "GOFTUS",
          description: HOME_DESC,
          url: "https://goftus.com",
          logo: {
            "@type": "ImageObject",
            url: "https://goftus.com/og-image.svg",
            width: 1200,
            height: 630,
          },
          areaServed: AREA_SERVED,
          knowsAbout: [
            "AI agents",
            "Agentic AI",
            "AI automation",
            "Custom AI solutions",
            "AI consulting",
            "Workflow automation",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: HOME_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: HomePage,
});

const segments = ["STARTUPS", "SMBs", "ENTERPRISES", "E-COMMERCE", "SAAS"];

const industries = [
  { name: "Healthcare", icon: HeartPulse },
  { name: "Fintech & Banking", icon: Landmark },
  { name: "Retail & E-commerce", icon: ShoppingBag },
  { name: "Logistics & Supply Chain", icon: Truck },
  { name: "Real Estate", icon: Building },
  { name: "Education", icon: GraduationCap },
  { name: "Manufacturing", icon: Factory },
  { name: "Legal & Compliance", icon: Scale },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 glow-bg animate-glow-drift pointer-events-none" />
        <FluidParticlesBackground
          particleCount={1400}
          className="absolute inset-0 h-full bg-transparent dark:bg-transparent pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface/50 text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-8 animate-fade-up">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            AI Agents · Agentic AI · Automation
          </div>
          <h1 className="font-gameplay text-4xl sm:text-6xl md:text-8xl tracking-tight text-balance break-words mb-8 animate-fade-up [animation-delay:100ms]">
            Intelligence that <span className="animate-hero-blink text-accent">actually</span> acts.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground text-pretty mb-12 animate-fade-up [animation-delay:200ms]">
            GOFTUS is an AI automation agency and AI agent development company building autonomous
            agentic AI systems and custom AI solutions that integrate deeply with your business
            infrastructure to automate complex workflows.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:300ms]">
            <Link to="/contact" className="font-romanica tracking-wide w-full sm:w-auto px-8 py-4 bg-foreground text-background rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all">
              Build your first agent
            </Link>
            <Link to="/services" className="font-romanica tracking-wide w-full sm:w-auto px-8 py-4 bg-surface ring-1 ring-border rounded-xl font-bold hover:bg-muted transition-all">
              View Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Who we build for */}
      <Reveal className="max-w-7xl mx-auto px-6 py-12 border-y border-border">
        <p className="text-center text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-10">
          Trusted for AI automation across the US, UK, Europe, Dubai, Singapore &amp; Malaysia
        </p>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60">
          {segments.map((seg, i) => (
            <Reveal as="div" key={seg} delay={i * 0.08} from="up">
              <span className="font-mono font-bold text-xl tracking-tighter text-muted-foreground">{seg}</span>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* What we build */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <Reveal className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="font-typemachine text-4xl font-bold tracking-tight mb-4">What we build</h2>
            <p className="text-muted-foreground">Four core services that take AI from idea to production inside your business.</p>
          </div>
          <Link to="/services" className="text-sm font-bold border-b-2 border-accent pb-1 flex items-center gap-2">
            Explore our services <ArrowRight className="size-4" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Reveal as="div" from="left" className="md:col-span-8 group relative bg-surface rounded-[2rem] p-10 ring-1 ring-border overflow-hidden transition-transform hover:-translate-y-1">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <div className="pointer-events-none absolute right-8 top-8 size-32 rounded-full bg-accent/10 blur-3xl agent-orb-drift" />
            <div className="relative z-10 flex flex-col h-full">
              <span className="text-[10px] font-mono text-accent mb-4">01 / AI AGENTS</span>
              <h3 className="font-typemachine text-3xl font-bold mb-4">AI agents that do the work</h3>
              <p className="text-muted-foreground max-w-sm mb-12">
                Voice, chat, and task agents that handle real requests end-to-end — connected to
                the tools, data, and channels your team already uses.
              </p>
              <div className="mt-auto w-full aspect-[2/1] bg-background rounded-2xl ring-1 ring-border grid place-items-center relative overflow-hidden">
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-surface/80 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground ring-1 ring-border backdrop-blur">
                  <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                  Live agent stream
                </div>
                <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center gap-2">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full bg-gradient-to-b from-accent/35 via-accent/90 to-accent/35 agent-wave-bar shadow-[0_0_18px_color-mix(in_oklab,var(--color-accent)_28%,transparent)]"
                      style={{
                        height: `${30 + Math.abs(Math.sin(i * 0.48)) * 62}%`,
                        animationDelay: `${i * 95}ms`,
                        animationDuration: `${2400 + (i % 6) * 180}ms`,
                      }}
                    />
                  ))}
                </div>
                <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-accent ring-1 ring-accent/20">
                  42 requests routed
                </div>
                <Bot className="absolute top-4 right-4 size-5 text-muted-foreground/40 agent-bot-float" />
              </div>
            </div>
          </Reveal>

          <Reveal as="div" from="right" delay={0.1} className="md:col-span-4 relative overflow-hidden bg-accent/5 rounded-[2rem] p-10 ring-1 ring-accent/10 transition-transform hover:-translate-y-1">
            <div className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-accent/10 blur-3xl agent-orb-drift" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,color-mix(in_oklab,var(--color-accent)_12%,transparent),transparent_34%)]" />
            <div className="relative z-10">
            <div className="mb-5 flex items-center justify-between gap-4">
              <Boxes className="size-6 text-accent" />
              <span className="inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground ring-1 ring-border">
                <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                Live
              </span>
            </div>
            <span className="text-[10px] font-mono text-accent mb-2 block">02 / AGENTIC AI</span>
            <h3 className="font-typemachine text-2xl font-bold mb-4">Agentic AI systems</h3>
            <p className="text-muted-foreground text-sm">
              Multi-agent systems that reason, plan, and coordinate across tools to complete
              multi-step work with oversight.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-background/65 p-3 ring-1 ring-border">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Agents</p>
                <p className="mt-1 font-typemachine text-xl font-bold">03 active</p>
              </div>
              <div className="rounded-2xl bg-background/65 p-3 ring-1 ring-border">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Tools</p>
                <p className="mt-1 font-typemachine text-xl font-bold">12 linked</p>
              </div>
            </div>

            {/* Multi-agent coordination diagram */}
            <div className="mt-8 rounded-[1.5rem] bg-background/50 p-5 ring-1 ring-border">
              {/* Orchestrator */}
              <div className="flex justify-center">
                <div className="agent-orchestrator inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-accent text-accent-foreground shadow-sm">
                  <Network className="size-4" />
                  <span className="text-[11px] font-bold tracking-wide">Orchestrator</span>
                </div>
              </div>
              {/* Drop from orchestrator into the bus */}
              <div className="flex justify-center">
                <div className="h-5 w-px bg-accent/40 agent-flow-line" />
              </div>
              {/* Worker agents */}
              <div className="grid grid-cols-3">
                {[
                  { icon: Workflow, label: "Plan" },
                  { icon: Zap, label: "Act" },
                  { icon: ShieldCheck, label: "Verify" },
                ].map((a, i) => (
                  <div key={a.label} className="flex flex-col items-center">
                    {/* horizontal bus + vertical drop */}
                    <div className="relative w-full h-5">
                      <div
                        className={`absolute top-0 h-px bg-accent/40 agent-flow-line ${
                          i === 0 ? "left-1/2 right-0" : i === 2 ? "left-0 right-1/2" : "left-0 right-0"
                        }`}
                      />
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-px bg-accent/40 agent-flow-line" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="agent-node size-11 rounded-2xl bg-background ring-1 ring-border grid place-items-center transition-colors hover:ring-accent" style={{ animationDelay: `${i * 180}ms` }}>
                        <a.icon className="size-4 text-accent" />
                      </div>
                      <span className="text-[10px] font-semibold text-muted-foreground">{a.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </Reveal>

          <Reveal as="div" delay={0.05} className="md:col-span-4 bg-surface rounded-[2rem] p-10 ring-1 ring-border transition-transform hover:-translate-y-1">
            <Zap className="size-6 text-foreground mb-6" />
            <span className="text-[10px] font-mono text-muted-foreground mb-2 block">03 / AI AUTOMATION</span>
            <h3 className="font-typemachine text-2xl font-bold mb-4">AI automation</h3>
            <p className="text-muted-foreground text-sm">
              Automate repetitive, manual workflows across your existing stack so your team
              focuses on higher-value work.
            </p>
          </Reveal>
          <Reveal as="div" delay={0.15} className="md:col-span-4 bg-ink text-ink-foreground rounded-[2rem] p-10 transition-transform hover:-translate-y-1">
            <Rocket className="size-6 mb-6 text-accent" />
            <span className="text-[10px] font-mono text-ink-foreground/60 mb-2 block">04 / PRODUCT BUILDING</span>
            <h3 className="font-typemachine text-2xl font-bold mb-4">AI product building</h3>
            <p className="text-ink-foreground/70 text-sm">
              Ship AI-powered products from prototype to production — design, build, and scale
              with you.
            </p>
          </Reveal>
          <Reveal as="div" delay={0.25} from="right" className="md:col-span-4">
            <Link to="/contact" className="h-full bg-surface rounded-[2rem] p-10 ring-1 ring-border flex flex-col items-center justify-center text-center hover:ring-accent transition-all group">
              <div className="size-12 rounded-full border border-border grid place-items-center mb-4 group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-all">
                <Plus className="size-5" />
              </div>
              <p className="font-typemachine font-bold">Something custom?</p>
              <p className="text-muted-foreground text-xs mt-2">Tell us your use case and we'll scope it with you</p>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <HowItWorks />

      {/* How we work */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <Reveal className="max-w-2xl mb-16">
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest">How we work</span>
          <h2 className="font-typemachine text-4xl font-bold tracking-tight mt-4">Built for real businesses, not demos.</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Plug, label: "Your stack", text: "Agents plug into the tools, data, and channels you already run on." },
            { icon: ShieldCheck, label: "Production-ready", text: "Guardrails, human-in-the-loop, and monitoring built in from day one." },
            { icon: Building2, label: "Any business", text: "From early-stage startups to established enterprises, across industries." },
            { icon: LifeBuoy, label: "End-to-end", text: "Strategy, build, deployment, and ongoing support — handled with you." },
          ].map((item, i) => (
            <Reveal as="div" key={item.label} delay={i * 0.1}>
              <item.icon className="size-6 text-accent mb-4" />
              <div className="font-typemachine font-bold text-lg mb-2">{item.label}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Industries we serve */}
      <section className="bg-surface border-y border-border py-32">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="max-w-2xl mb-16">
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Industries</span>
            <h2 className="font-typemachine text-4xl font-bold tracking-tight mt-4">AI for every industry.</h2>
            <p className="text-muted-foreground mt-4">
              No matter your domain, we tailor agents and automation to how your business actually
              runs — and these are just a starting point.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((ind, i) => (
              <Reveal
                as="div"
                key={ind.name}
                delay={(i % 4) * 0.08}
                from={i % 2 === 0 ? "left" : "right"}
                className="flex items-center gap-3 bg-background rounded-2xl p-5 ring-1 ring-border hover:ring-accent transition-all"
              >
                <ind.icon className="size-5 text-accent shrink-0" />
                <span className="font-semibold text-sm">{ind.name}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="max-w-7xl mx-auto px-6 pb-32 pt-32">
        <Reveal className="max-w-2xl mb-16">
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Use cases</span>
          <h2 className="font-typemachine text-4xl font-bold tracking-tight mt-4">Where GOFTUS goes to work.</h2>
          <p className="text-muted-foreground mt-4">
            We're domain-agnostic by design. From healthcare and fintech to retail, logistics,
            real estate, and education — GOFTUS implements AI across every industry and business
            function. Here are common places teams put our agents and automation into production.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: Headphones, tag: "CUSTOMER SUPPORT", title: "24/7 support agents", excerpt: "Voice and chat agents that resolve common requests across channels and escalate the rest to your team." },
            { icon: Workflow, tag: "SALES & MARKETING", title: "Lead qualification & outreach", excerpt: "Agents that research prospects, score leads, and personalize follow-ups so reps talk to the right people." },
            { icon: Boxes, tag: "OPERATIONS", title: "Back-office automation", excerpt: "Connect your apps and let agents run repetitive, multi-step processes with an audit trail." },
            { icon: Database, tag: "KNOWLEDGE", title: "RAG assistants", excerpt: "Answers grounded in your own documents and data, so teams and customers get accurate responses fast." },
            { icon: FileText, tag: "FINANCE & ADMIN", title: "Document processing", excerpt: "Extract, classify, and reconcile invoices, forms, and contracts — turning paperwork into structured data." },
            { icon: Users, tag: "HR & RECRUITING", title: "Hiring & onboarding agents", excerpt: "Screen applicants, answer policy questions, and automate onboarding so people teams scale without the busywork." },
          ].map((c, i) => (
            <Reveal
              as="article"
              key={c.title}
              delay={(i % 2) * 0.12}
              from={i % 2 === 0 ? "left" : "right"}
              className="group bg-surface rounded-[2rem] p-10 ring-1 ring-border hover:ring-accent transition-all"
            >
              <c.icon className="size-6 text-accent mb-6" />
              <span className="text-[10px] font-mono text-accent uppercase tracking-widest">{c.tag}</span>
              <h3 className="font-typemachine text-2xl font-bold mt-4 mb-4 group-hover:text-accent transition-colors">{c.title}</h3>
              <p className="text-muted-foreground text-sm">{c.excerpt}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Our promise */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <Reveal as="div" className="max-w-3xl">
        <blockquote>
          <p className="text-3xl md:text-4xl font-medium tracking-tight text-balance leading-tight">
            "We don't ship AI demos — we ship agents and automation that do real work.
            Integrated with your tools, accountable to your numbers, and built to run in production."
          </p>
          <footer className="mt-8 flex items-center gap-3">
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Our promise</span>
            <span className="h-px w-8 bg-border" />
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">The GOFTUS Team</span>
          </footer>
        </blockquote>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <Reveal className="max-w-2xl mb-16">
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest">FAQ</span>
          <h2 className="font-typemachine text-3xl md:text-5xl font-bold tracking-tight mt-4">
            AI for business, answered.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Common questions about using AI agents and automation across your business processes and
            operations.
          </p>
        </Reveal>
        <div className="space-y-4">
          {HOME_FAQS.map((f, i) => (
            <Reveal as="div" key={f.q} delay={i * 0.04}>
              <details className="group bg-surface rounded-2xl ring-1 ring-border open:ring-accent transition-all">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-6">
                  <span className="font-typemachine text-lg font-bold tracking-tight">{f.q}</span>
                  <Plus className="size-5 shrink-0 text-accent transition-transform group-open:rotate-45" />
                </summary>
                <p className="px-6 pb-6 -mt-1 text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
