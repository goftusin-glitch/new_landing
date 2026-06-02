import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CTASection } from "@/components/site/CTASection";
import { Brain, Code2, Youtube, Sparkles, Network, Rocket } from "lucide-react";
import thirumuruganPhoto from "@/assets/thirumurugan.png";
import bharathvajPhoto from "@/assets/bharathvaj.png";
import { Reveal } from "@/components/site/Reveal";
import g9 from "@/assets/gallery-9.png";
import g10 from "@/assets/gallery-10.png";
import g11 from "@/assets/gallery-11.png";
import g12 from "@/assets/gallery-12.png";
import g13 from "@/assets/gallery-13.png";
import g14 from "@/assets/gallery-14.png";
import g15 from "@/assets/gallery-15.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — GOFTUS" },
      { name: "description", content: "GOFTUS was founded in 2025 by Thirumurugan and Bharathvaj — engineers specializing in AI and full-stack development — building AI agents, products, and custom automation for businesses." },
      { property: "og:title", content: "About — GOFTUS" },
      { property: "og:description", content: "GOFTUS was founded in 2025 by Thirumurugan and Bharathvaj — engineers specializing in AI and full-stack development — building AI agents, products, and custom automation for businesses." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const founders = [
  {
    name: "Thirumurugan",
    role: "Founder",
    photo: thirumuruganPhoto,
    objectPos: "object-center",
    tags: [
      { icon: Brain, label: "AI ML Engineer" },
      { icon: Code2, label: "Full-Stack Development" },
      { icon: Youtube, label: "Youtuber" },
      { icon: Sparkles, label: "AI Content Creator" },
    ],
    bio: "Drives product and engineering — turning AI ideas into agents and automation that businesses can actually put to work.",
  },
  {
    name: "Bharathvaj",
    role: "Co-Founder",
    photo: bharathvajPhoto,
    objectPos: "object-top",
    tags: [
      { icon: Network, label: "AI Orchestrator" },
      { icon: Code2, label: "Full-Stack Development" },
      { icon: Rocket, label: "GTM Specialist" },
    ],
    bio: "Leads architecture and delivery — building reliable, production-grade AI systems across the full stack.",
  },
];

const timeline = [
  { year: "2025", title: "GOFTUS is founded", desc: "Thirumurugan and Bharathvaj start GOFTUS with one goal: build AI that does real work for businesses." },
  { year: "2025", title: "Starting small", desc: "Shipped focused, small products to validate ideas quickly and learn what teams really need." },
  { year: "2025", title: "A growing AI product suite", desc: "Built a range of AI products — agents, assistants, and automation across many use cases." },
  { year: "2026", title: "Custom AI for business", desc: "Now building tailored AI agents, agentic systems, and automation for businesses of every kind." },
];

const values = [
  { title: "Outcomes over demos", desc: "We ship to production, not to a pitch deck." },
  { title: "Engineering over hype", desc: "Boring infrastructure, brilliant results." },
  { title: "Customer obsession", desc: "Your goals are the only ones we report on." },
  { title: "Honest AI", desc: "Audit trails, guardrails, observability everywhere." },
];

const gallery = [
  { src: g9, alt: "At the TN Digital Summit", span: "col-span-2 row-span-2", pos: "object-center" },
  { src: g14, alt: "With the GOFTUS community", span: "row-span-2", pos: "object-top" },
  { src: g15, alt: "Sharing the Machine Learning book", span: "row-span-2", pos: "object-top" },
  { src: g10, alt: "In conversation at the summit", span: "", pos: "object-top" },
  { src: g11, alt: "Recognizing a workshop team", span: "", pos: "object-center" },
  { src: g12, alt: "On stage explaining the AI stack", span: "", pos: "object-center" },
  { src: g13, alt: "Meeting builders and mentors", span: "", pos: "object-top" },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-24 pb-24">
        <div className="absolute inset-0 glow-bg animate-glow-drift pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest animate-fade-up">About</span>
          <h1 className="font-typemachine text-5xl md:text-7xl font-bold tracking-tight text-balance mt-4 mb-8 animate-fade-up [animation-delay:100ms] max-w-4xl">
            Two young builders, obsessed with shipping real AI.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground animate-fade-up [animation-delay:200ms]">
            GOFTUS was founded in 2025 by Thirumurugan and Bharathvaj — engineers specializing in AI and
            full-stack development — on a simple idea: businesses don't need AI demos, they need AI that
            does real work.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="bg-surface ring-1 ring-border rounded-[2rem] p-12 md:p-20">
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Mission</span>
          <p className="text-3xl md:text-5xl font-bold tracking-tight text-balance mt-6 leading-tight">
            Make AI a reliable colleague — for every business that wants to put intelligence to work.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Founders</span>
        <h2 className="font-typemachine text-3xl font-bold mt-4 mb-12">The minds behind GOFTUS</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {founders.map((f) => (
            <div key={f.name} className="bg-surface rounded-3xl p-10 ring-1 ring-border hover:ring-accent transition-all">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={f.photo}
                  alt={f.name}
                  className={`size-16 rounded-full object-cover ${f.objectPos} ring-2 ring-accent shrink-0`}
                />
                <div>
                  <h3 className="font-typemachine text-2xl font-bold">{f.name}</h3>
                  <span className="text-[10px] font-mono text-accent uppercase tracking-widest">{f.role}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {f.tags.map((t) => (
                  <span
                    key={t.label}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-background ring-1 ring-border rounded-full px-3 py-1.5"
                  >
                    <t.icon className="size-3.5 text-accent" /> {t.label}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Gallery */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Gallery</span>
        <h2 className="font-typemachine text-3xl font-bold mt-4 mb-12">Out in the world</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[195px] gap-4 grid-flow-dense">
          {gallery.map((g, i) => (
            <Reveal
              as="div"
              key={i}
              from="up"
              delay={(i % 4) * 0.06}
              className={`${g.span} group rounded-2xl overflow-hidden ring-1 ring-border`}
            >
              <img
                src={g.src}
                alt={g.alt}
                className={`w-full h-full object-cover ${g.pos} transition-transform duration-500 group-hover:scale-105`}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-surface border-y border-border py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-typemachine text-3xl font-bold mb-12">Our journey</h2>
          <ol className="space-y-px">
            {timeline.map((t, i) => (
              <li key={`${t.year}-${i}`} className="grid grid-cols-12 gap-6 py-8 border-t border-border">
                <span className="col-span-2 font-mono text-sm text-accent">{t.year}</span>
                <h4 className="col-span-10 md:col-span-3 font-typemachine font-bold text-lg">{t.title}</h4>
                <p className="col-span-12 md:col-span-7 text-muted-foreground">{t.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="font-typemachine text-3xl font-bold mb-12">Core Values</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-surface rounded-3xl p-10 ring-1 ring-border">
              <h3 className="font-typemachine text-xl font-bold mb-3">{v.title}</h3>
              <p className="text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection title="Want to work with us?" primaryLabel="Talk to the founders" secondaryLabel="See our work" secondaryTo="/agents" />
    </SiteLayout>
  );
}
