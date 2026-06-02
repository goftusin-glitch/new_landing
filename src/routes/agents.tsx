import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CTASection } from "@/components/site/CTASection";
import {
  Headphones, Mic, TrendingUp, Settings, Users, BookOpen,
  MessageCircle, Sparkles, Brain, Wrench, Database, Workflow, BarChart3, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "AI Agents — GOFTUS" },
      { name: "description", content: "Specialized AI agents for support, sales, ops, HR, and knowledge — built for business automation." },
      { property: "og:title", content: "AI Agents — GOFTUS" },
      { property: "og:description", content: "Specialized AI agents for support, sales, ops, HR, and knowledge — built for business automation." },
      { property: "og:url", content: "/agents" },
    ],
    links: [{ rel: "canonical", href: "/agents" }],
  }),
  component: AgentsPage,
});

const categories = [
  { icon: Headphones, name: "Customer Support", desc: "Tier-1 resolution with multilingual coverage." },
  { icon: Mic, name: "Voice Agents", desc: "Sub-second latency, human-like delivery." },
  { icon: TrendingUp, name: "Sales Agents", desc: "Lead scoring, personalized outreach at scale." },
  { icon: Settings, name: "Operations", desc: "Workflow execution across internal tools." },
  { icon: Users, name: "HR Agents", desc: "Onboarding, screening, policy answers." },
  { icon: BookOpen, name: "Knowledge Agents", desc: "Instant RAG over your documentation." },
  { icon: MessageCircle, name: "WhatsApp Agents", desc: "Conversational commerce + support." },
  { icon: Sparkles, name: "Custom Agents", desc: "Bespoke logic for your unique stack." },
];

const features = [
  { icon: Brain, name: "Multi-Agent Systems", desc: "Orchestrated specialists that hand off work." },
  { icon: Database, name: "RAG", desc: "Vector memory tied to your proprietary data." },
  { icon: Wrench, name: "Tool Calling", desc: "Native integrations and sandboxed execution." },
  { icon: Sparkles, name: "Memory", desc: "Long-term context that improves with usage." },
  { icon: Workflow, name: "Workflow Automation", desc: "Triggered, scheduled, or event-driven flows." },
  { icon: BarChart3, name: "Analytics", desc: "Granular metrics across every agent run." },
];

function AgentsPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-24 pb-24">
        <div className="absolute inset-0 glow-bg animate-glow-drift pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest animate-fade-up">Agents</span>
          <h1 className="font-typemachine text-5xl md:text-7xl font-bold tracking-tight text-balance mt-4 mb-8 animate-fade-up [animation-delay:100ms] max-w-4xl">
            AI Agents Built For Business Automation
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground animate-fade-up [animation-delay:200ms]">
            Production-grade autonomous agents that handle real work — not demos.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <h2 className="font-typemachine text-3xl font-bold mb-12">Agent Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((c) => (
            <div key={c.name} className="group bg-surface rounded-3xl p-6 ring-1 ring-border hover:ring-accent hover:-translate-y-1 transition-all">
              <c.icon className="size-6 text-accent mb-6" />
              <h3 className="font-typemachine font-bold text-lg mb-2">{c.name}</h3>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="bg-ink text-ink-foreground py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Architecture</span>
            <h2 className="font-typemachine text-4xl font-bold tracking-tight mt-4 mb-4">The Agent Stack</h2>
            <p className="text-ink-foreground/70">Each layer is replaceable, observable, and secure by default.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { label: "User", desc: "Voice, text, API, webhook" },
              { label: "Agent Layer", desc: "Reasoning + orchestration" },
              { label: "Tools", desc: "Calling, code, browser" },
              { label: "Integrations", desc: "CRM, ERP, Slack, DB" },
              { label: "Business Systems", desc: "Real outcomes, audited" },
            ].map((s, i) => (
              <div key={s.label} className="relative">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 ring-1 ring-white/10 h-full">
                  <span className="text-[10px] font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h4 className="font-typemachine font-bold mt-2 mb-2">{s.label}</h4>
                  <p className="text-xs text-ink-foreground/60 leading-relaxed">{s.desc}</p>
                </div>
                {i < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 size-2 rounded-full bg-accent z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="font-typemachine text-3xl font-bold mb-12">Capabilities</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.name} className="p-8 bg-surface ring-1 ring-border rounded-3xl">
              <f.icon className="size-6 text-accent mb-6" />
              <h3 className="font-typemachine font-bold text-lg mb-2">{f.name}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demos */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <h2 className="font-typemachine text-3xl font-bold mb-12">See Agents In Action</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { tag: "VOICE", title: "Inbound triage in real time" },
            { tag: "OPS", title: "Auto-reconcile invoices nightly" },
            { tag: "SALES", title: "Outbound personalization at scale" },
          ].map((d) => (
            <Link to="/contact" key={d.title} className="group bg-accent/5 ring-1 ring-accent/10 rounded-3xl p-8 hover:bg-accent/10 transition-all">
              <span className="text-[10px] font-mono text-accent uppercase tracking-widest">{d.tag}</span>
              <h3 className="font-typemachine text-xl font-bold mt-4 mb-6">{d.title}</h3>
              <span className="text-sm font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Request demo <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTASection
        title="Book a consultation with our agent team"
        primaryLabel="Book Agent Consultation"
        secondaryLabel="View Services"
      />
    </SiteLayout>
  );
}
