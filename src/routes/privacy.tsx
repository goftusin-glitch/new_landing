import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft, Database, Lock, Mail, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

const PRIVACY_TITLE = "Privacy Policy | GOFTUS";
const PRIVACY_DESC = "Privacy Policy for GOFTUS AI automation, agentic AI systems, products, and consulting services.";

type LegalSection = {
  title: string;
  body: string;
};

const sections: LegalSection[] = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly, including contact details, company details, project requirements, support requests, newsletter signups, and information submitted through forms or booking flows.",
  },
  {
    title: "How We Use Information",
    body: "We use information to respond to inquiries, provide services, improve products, manage subscriptions, communicate about projects, maintain security, and comply with legal or operational obligations.",
  },
  {
    title: "Information Sharing",
    body: "We do not sell personal information. We may share limited information with trusted service providers, infrastructure vendors, or advisors when required to operate, secure, or deliver our services.",
  },
  {
    title: "Data Security",
    body: "We apply reasonable technical and organizational safeguards, including access controls, encrypted transport, restricted administrative access, monitoring, and secure development practices.",
  },
  {
    title: "Your Choices",
    body: "You can request access, correction, deletion, or restriction of personal information where applicable. You can also unsubscribe from non-essential communications.",
  },
];

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: PRIVACY_TITLE },
      { name: "description", content: PRIVACY_DESC },
      { property: "og:title", content: PRIVACY_TITLE },
      { property: "og:description", content: PRIVACY_DESC },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <LegalHero label="Privacy" title="Privacy Policy" description="How GOFTUS collects, uses, protects, and manages information across our website, services, products, and AI automation work." />
      <LegalGrid>
        <LegalCard icon={Database} title="Minimal Collection" text="We collect only what is needed to respond, deliver, support, and secure the work." />
        <LegalCard icon={Lock} title="Protected Data" text="Access is restricted and data is handled with security controls appropriate to the engagement." />
        <LegalCard icon={ShieldCheck} title="No Selling" text="We do not sell personal information or use client data for unrelated advertising." />
      </LegalGrid>
      <LegalContent sections={sections} contact="privacy@goftus.com" />
    </SiteLayout>
  );
}

function LegalHero({ label, title, description }: { label: string; title: string; description: string }) {
  return (
    <section className="relative overflow-hidden pt-24 pb-14">
      <div className="absolute inset-0 glow-bg animate-glow-drift pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-foreground transition-colors mb-10">
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
        <span className="text-[10px] font-mono text-accent uppercase tracking-widest">{label}</span>
        <h1 className="font-typemachine text-5xl md:text-7xl font-bold tracking-tight mt-4 mb-6">{title}</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">{description}</p>
        <p className="mt-6 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Last updated: June 2, 2026</p>
      </div>
    </section>
  );
}

function LegalGrid({ children }: { children: ReactNode }) {
  return <section className="max-w-5xl mx-auto px-6 pb-8 grid md:grid-cols-3 gap-4">{children}</section>;
}

function LegalCard({ icon: Icon, title, text }: { icon: typeof ShieldCheck; title: string; text: string }) {
  return (
    <div className="bg-surface ring-1 ring-border rounded-3xl p-6">
      <Icon className="size-5 text-accent mb-4" />
      <h2 className="font-typemachine font-bold text-xl mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}

function LegalContent({ sections, contact }: { sections: LegalSection[]; contact: string }) {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-32">
      <div className="bg-surface ring-1 ring-border rounded-[2rem] p-8 md:p-10 space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-typemachine text-2xl font-bold mb-3">{section.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{section.body}</p>
          </section>
        ))}
        <section className="rounded-2xl bg-background ring-1 ring-border p-6">
          <Mail className="size-5 text-accent mb-3" />
          <h2 className="font-typemachine text-xl font-bold mb-2">Contact</h2>
          <p className="text-muted-foreground">
            Questions about this page can be sent to{" "}
            <a href={`mailto:${contact}`} className="font-bold text-foreground hover:text-accent">
              {contact}
            </a>
            .
          </p>
        </section>
      </div>
    </section>
  );
}
