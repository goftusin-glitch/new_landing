import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CTASection } from "@/components/site/CTASection";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import { Reveal } from "@/components/site/Reveal";
import { HowItWorks } from "@/components/site/HowItWorks";
import { ArrowRight, Plus, Bot, Boxes, Zap, Rocket, Workflow, Database, Headphones, ShieldCheck, Plug, Building2, LifeBuoy, FileText, Users, HeartPulse, Landmark, ShoppingBag, Truck, Building, GraduationCap, Factory, Scale, Network } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GOFTUS — AI Agents, Agentic AI & Automation for Every Business" },
      { name: "description", content: "GOFTUS builds AI agents, agentic AI systems, AI automation, and AI-powered products for businesses of every size — from startups to enterprises." },
      { property: "og:title", content: "GOFTUS — AI Agents, Agentic AI & Automation for Every Business" },
      { property: "og:description", content: "GOFTUS builds AI agents, agentic AI systems, AI automation, and AI-powered products for businesses of every size — from startups to enterprises." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "GOFTUS",
        description: "GOFTUS builds AI agents, agentic AI systems, AI automation, and AI-powered products for businesses of every size.",
        url: "/",
      }),
    }],
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
            Intelligence that <span className="text-accent">actually</span> acts.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground text-pretty mb-12 animate-fade-up [animation-delay:200ms]">
            Goftus builds autonomous AI agentic systems that integrate deeply with your existing
            business infrastructure to automate complex workflows.
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
          Built for businesses of every size and stage
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
            <div className="relative z-10 flex flex-col h-full">
              <span className="text-[10px] font-mono text-accent mb-4">01 / AI AGENTS</span>
              <h3 className="font-typemachine text-3xl font-bold mb-4">AI agents that do the work</h3>
              <p className="text-muted-foreground max-w-sm mb-12">
                Voice, chat, and task agents that handle real requests end-to-end — connected to
                the tools, data, and channels your team already uses.
              </p>
              <div className="mt-auto w-full aspect-[2/1] bg-background rounded-2xl ring-1 ring-border grid place-items-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center gap-1">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-accent/60 rounded-full"
                      style={{
                        height: `${20 + Math.abs(Math.sin(i * 0.4)) * 80}%`,
                        animation: `fade-in 1.2s ease-out ${i * 30}ms both`,
                      }}
                    />
                  ))}
                </div>
                <Bot className="absolute top-4 right-4 size-5 text-muted-foreground/40" />
              </div>
            </div>
          </Reveal>

          <Reveal as="div" from="right" delay={0.1} className="md:col-span-4 flex flex-col bg-accent/5 rounded-[2rem] p-10 ring-1 ring-accent/10 transition-transform hover:-translate-y-1">
            <Boxes className="size-6 text-accent mb-6" />
            <span className="text-[10px] font-mono text-accent mb-2 block">02 / AGENTIC AI</span>
            <h3 className="font-typemachine text-2xl font-bold mb-4">Agentic AI systems</h3>
            <p className="text-muted-foreground text-sm">
              Multi-agent systems that reason, plan, and coordinate across tools to complete
              multi-step work with oversight.
            </p>

            {/* Multi-agent coordination diagram */}
            <div className="mt-auto pt-10">
              {/* Orchestrator */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-accent text-accent-foreground shadow-sm">
                  <Network className="size-4" />
                  <span className="text-[11px] font-bold tracking-wide">Orchestrator</span>
                </div>
              </div>
              {/* Drop from orchestrator into the bus */}
              <div className="flex justify-center">
                <div className="h-5 w-px bg-accent/40" />
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
                        className={`absolute top-0 h-px bg-accent/40 ${
                          i === 0 ? "left-1/2 right-0" : i === 2 ? "left-0 right-1/2" : "left-0 right-0"
                        }`}
                      />
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-px bg-accent/40" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="size-11 rounded-2xl bg-background ring-1 ring-border grid place-items-center transition-colors hover:ring-accent">
                        <a.icon className="size-4 text-accent" />
                      </div>
                      <span className="text-[10px] font-semibold text-muted-foreground">{a.label}</span>
                    </div>
                  </div>
                ))}
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

      <CTASection />
    </SiteLayout>
  );
}
