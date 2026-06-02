import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Mail, Calendar as CalendarIcon, Instagram, MessageCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { submitContact } from "@/lib/backend-api";
import { keywords, CONTACT_KEYWORDS, MARKETS_LABEL } from "@/data/seo";

const CONTACT_TITLE = "Contact GOFTUS — Hire AI Developers & Build Your AI Agent | Free Consultation";
const CONTACT_DESC = `Hire AI developers and build your AI agent with GOFTUS. Book a demo or get a free AI automation consultation — serving businesses across ${MARKETS_LABEL}.`;

const CONTACT_EMAIL = "mail@goftus.co.uk";
const socialLinks = [
  { name: "Instagram", href: "https://instagram.com/goftus_ai", icon: Instagram },
  { name: "WhatsApp", href: "https://wa.me/916380654780", icon: MessageCircle },
];
const demoTimes = ["10:00 AM", "12:30 PM", "03:00 PM"];

const faqs = [
  { q: "How fast can we build something?", a: "Small pilots can ship in a few weeks; larger builds are scoped to what you need." },
  { q: "Do you handle integrations?", a: "Yes — we connect agents and automation to the tools, data, and channels you already use." },
  { q: "Where does our data live?", a: "Your cloud or ours — your call. Built with guardrails, encryption, and audit trails." },
  { q: "Can we start small?", a: "Absolutely. Most projects begin with a focused pilot before we scale it up." },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: CONTACT_TITLE },
      { name: "description", content: CONTACT_DESC },
      { name: "keywords", content: keywords(CONTACT_KEYWORDS) },
      { property: "og:title", content: CONTACT_TITLE },
      { property: "og:description", content: CONTACT_DESC },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => new Date());
  const [selectedTime, setSelectedTime] = useState(demoTimes[0]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDateLabel = selectedDate
    ? selectedDate.toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })
    : "Select a date";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Capture the form ref immediately — React nullifies event.currentTarget after any await
    const formEl = event.currentTarget;
    setLoading(true);
    setError(null);
    const form = new FormData(formEl);
    const fullName = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const company = String(form.get("company") || "").trim();
    const role = String(form.get("role") || "").trim();
    const message = String(form.get("message") || "").trim();

    const demoSlot = selectedDate
      ? `${selectedDateLabel} at ${selectedTime}`
      : "No date selected";

    try {
      await submitContact({
        fullName,
        email,
        company,
        need: "AI automation consultation",
        message: [
          `Business Problem: ${message || "Not provided"}`,
          `Role: ${role || "Not specified"}`,
          `Requested Demo Slot: ${demoSlot}`,
          `Consultation Request: AI automation consultation`,
        ].join("\n"),
      });
      setSent(true);
      formEl.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send message.");
    } finally {
      setLoading(false);
    }
  };

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
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name" name="name" />
                <Field label="Company" name="company" />
              </div>
              <Field label="Work Email" name="email" type="email" />
              <Field label="Role" name="role" />
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">What are you trying to automate?</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 bg-background ring-1 ring-border rounded-2xl focus:ring-accent focus:outline-none text-sm"
                />
              </div>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <button type="submit" disabled={loading || sent} className="px-8 py-4 bg-foreground text-background rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? "Sending..." : sent ? "Thanks - we'll be in touch" : "Send message"}
              </button>
            </form>
          </div>

          {/* Right: calendly + info */}
          <div className="space-y-6">
            <div className="relative overflow-hidden bg-ink text-ink-foreground rounded-[2rem] p-10 ring-1 ring-white/10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklab,var(--color-accent)_20%,transparent),transparent_36%)]" />
              <div className="relative z-10">
              <CalendarIcon className="size-6 text-accent mb-6" />
              <h3 className="font-typemachine text-2xl font-bold mb-3">Book a 30-min demo</h3>
              <p className="text-ink-foreground/70 mb-8">See our agent platform in action with one of our founders.</p>

              <div className="rounded-2xl bg-white/[0.06] ring-1 ring-white/10 p-5">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-ink-foreground/45">Selected date</p>
                    <p className="font-bold mt-1">{selectedDateLabel}</p>
                  </div>
                  <span className="rounded-full bg-accent/15 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-accent ring-1 ring-accent/20">
                    30 min
                  </span>
                </div>

                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < today}
                  buttonVariant="ghost"
                  className="mx-auto bg-transparent p-0 text-ink-foreground [--cell-size:2.35rem]"
                  classNames={{
                    caption_label: "text-sm font-bold text-ink-foreground",
                    weekday: "text-ink-foreground/45 text-[0.7rem] font-mono uppercase",
                    outside: "text-ink-foreground/20",
                    disabled: "text-ink-foreground/20 opacity-40",
                    today: "rounded-md bg-accent/15 text-accent",
                  }}
                />

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {demoTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ring-1 ${
                        selectedTime === time
                          ? "bg-accent text-accent-foreground ring-accent"
                          : "bg-white/5 text-ink-foreground/75 ring-white/10 hover:bg-white/10"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

              </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-surface ring-1 ring-border rounded-3xl p-8">
                <Mail className="size-5 text-accent mb-4" />
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Email</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold hover:text-accent">{CONTACT_EMAIL}</a>
              </div>
              <div className="bg-surface ring-1 ring-border rounded-3xl p-8">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">Social</p>
                <div className="flex gap-3">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.name}
                        className="size-9 rounded-full bg-background ring-1 ring-border grid place-items-center hover:text-accent transition-colors"
                      >
                        <Icon className="size-4" />
                      </a>
                    );
                  })}
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
