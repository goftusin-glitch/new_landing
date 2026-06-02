import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CTASection } from "@/components/site/CTASection";
import { Boxes, Bot, Workflow, Puzzle, Compass, GraduationCap } from "lucide-react";
import { keywords, SERVICES_KEYWORDS, MARKETS_LABEL } from "@/data/seo";

const SERVICES_TITLE = "AI Automation Services — AI Development, Consulting & Workflow Automation | GOFTUS";
const SERVICES_DESC = `AI automation services: AI product development, agentic systems, intelligent automation, custom AI solutions, AI consulting and enterprise integration — for businesses across ${MARKETS_LABEL}.`;

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
  }),
  component: ServicesPage,
});

const services = [
  { icon: Boxes, title: "AI Product Development", items: ["MVP", "SaaS", "AI Apps"] },
  { icon: Bot, title: "Agentic Systems", items: ["Multi-Agent Systems", "Automation"] },
  { icon: Workflow, title: "AI Automation", items: ["Workflow Automation", "CRM Automation"] },
  { icon: Puzzle, title: "Custom AI Solutions", items: ["Enterprise Integrations"] },
  { icon: Compass, title: "AI Consulting", items: ["Strategy", "Implementation"] },
  { icon: GraduationCap, title: "AI Education", items: ["Workshops", "Training"] },
];

const process = ["Discover", "Design", "Build", "Deploy", "Scale"];

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
            <div
              key={s.title}
              className={`rounded-3xl p-10 ring-1 transition-all hover:-translate-y-1 ${
                i === 1 ? "bg-ink text-ink-foreground ring-transparent" : "bg-surface ring-border hover:ring-accent"
              }`}
            >
              <s.icon className={`size-6 mb-6 ${i === 1 ? "text-accent" : "text-accent"}`} />
              <h3 className="font-typemachine text-2xl font-bold mb-6">{s.title}</h3>
              <ul className={`space-y-2 text-sm ${i === 1 ? "text-ink-foreground/70" : "text-muted-foreground"}`}>
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-accent" /> {it}
                  </li>
                ))}
              </ul>
            </div>
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
              <li key={p} className="relative bg-background rounded-2xl p-6 ring-1 ring-border">
                <span className="text-[10px] font-mono text-muted-foreground">0{i + 1}</span>
                <h4 className="font-typemachine font-bold text-xl mt-2">{p}</h4>
                {i < 4 && <div className="hidden md:block absolute top-1/2 -right-2 size-1.5 rounded-full bg-accent" />}
              </li>
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
