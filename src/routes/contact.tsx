import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Mail, Calendar, Twitter, Linkedin, Github } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — GOFTUS" },
      { name: "description", content: "Book a demo, talk to founders, or send us a message about your AI agent project." },
      { property: "og:title", content: "Contact — GOFTUS" },
      { property: "og:description", content: "Book a demo, talk to founders, or send us a message about your AI agent project." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const faqs = [
  { q: "How fast can we build something?", a: "Small pilots can ship in a few weeks; larger builds are scoped to what you need." },
  { q: "Do you handle integrations?", a: "Yes — we connect agents and automation to the tools, data, and channels you already use." },
  { q: "Where does our data live?", a: "Your cloud or ours — your call. Built with guardrails, encryption, and audit trails." },
  { q: "Can we start small?", a: "Absolutely. Most projects begin with a focused pilot before we scale it up." },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 glow-bg animate-glow-drift pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Contact</span>
          <h1 className="font-typemachine text-5xl md:text-7xl font-bold tracking-tight text-balance mt-4 mb-8 max-w-4xl">
            Let's build your first agent.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">Tell us what you're trying to automate. We'll respond within one business day.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-surface rounded-[2rem] p-10 ring-1 ring-border">
            <h2 className="font-typemachine text-2xl font-bold mb-8">Send a message</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name" name="name" />
                <Field label="Company" name="company" />
              </div>
              <Field label="Work Email" name="email" type="email" />
              <Field label="Role" name="role" />
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">What are you trying to automate?</label>
                <textarea
                  rows={5}
                  required
                  className="w-full px-4 py-3 bg-background ring-1 ring-border rounded-2xl focus:ring-accent focus:outline-none text-sm"
                />
              </div>
              <button type="submit" className="px-8 py-4 bg-foreground text-background rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all">
                {sent ? "Thanks — we'll be in touch" : "Send message"}
              </button>
            </form>
          </div>

          {/* Right: calendly + info */}
          <div className="space-y-6">
            <div className="bg-ink text-ink-foreground rounded-[2rem] p-10">
              <Calendar className="size-6 text-accent mb-6" />
              <h3 className="font-typemachine text-2xl font-bold mb-3">Book a 30-min demo</h3>
              <p className="text-ink-foreground/70 mb-8">See our agent platform in action with one of our founders.</p>
              <div className="aspect-[4/3] rounded-2xl bg-white/5 ring-1 ring-white/10 grid place-items-center">
                <span className="text-xs font-mono text-ink-foreground/40 uppercase tracking-widest">Calendly embed</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-surface ring-1 ring-border rounded-3xl p-8">
                <Mail className="size-5 text-accent mb-4" />
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Email</p>
                <a href="mailto:hello@goftus.com" className="font-bold hover:text-accent">hello@goftus.com</a>
              </div>
              <div className="bg-surface ring-1 ring-border rounded-3xl p-8">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">Social</p>
                <div className="flex gap-3">
                  <a href="#" className="size-9 rounded-full bg-background ring-1 ring-border grid place-items-center hover:text-accent"><Twitter className="size-4" /></a>
                  <a href="#" className="size-9 rounded-full bg-background ring-1 ring-border grid place-items-center hover:text-accent"><Linkedin className="size-4" /></a>
                  <a href="#" className="size-9 rounded-full bg-background ring-1 ring-border grid place-items-center hover:text-accent"><Github className="size-4" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <h2 className="font-typemachine text-4xl font-bold tracking-tight mb-12">FAQ</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {faqs.map((f) => (
            <div key={f.q} className="bg-surface ring-1 ring-border rounded-3xl p-8">
              <h3 className="font-typemachine font-bold mb-3">{f.q}</h3>
              <p className="text-muted-foreground text-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">{label}</label>
      <input id={name} name={name} type={type} required className="w-full px-4 py-3 bg-background ring-1 ring-border rounded-2xl focus:ring-accent focus:outline-none text-sm" />
    </div>
  );
}
