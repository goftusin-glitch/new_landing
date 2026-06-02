import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileText, Handshake, Mail, Scale } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

const TERMS_TITLE = "Terms & Conditions | GOFTUS";
const TERMS_DESC = "Terms and conditions for using GOFTUS websites, services, AI automation products, and consulting engagements.";

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing GOFTUS websites, products, content, or services, you agree to use them responsibly and comply with these terms and any project-specific agreement we sign with you.",
  },
  {
    title: "Services and Engagements",
    body: "Project scope, delivery timelines, fees, ownership, support, and acceptance criteria are defined in written proposals, statements of work, invoices, or other agreed project documents.",
  },
  {
    title: "Client Responsibilities",
    body: "You are responsible for providing accurate requirements, timely feedback, lawful data, required access, and approvals needed for GOFTUS to deliver the agreed work.",
  },
  {
    title: "Intellectual Property",
    body: "Unless otherwise agreed, GOFTUS retains ownership of pre-existing tools, frameworks, templates, and know-how. Client-specific deliverables are handled according to the applicable agreement.",
  },
  {
    title: "Limitation of Liability",
    body: "To the maximum extent permitted by law, GOFTUS is not liable for indirect, incidental, special, consequential, or punitive damages arising from use of our website, services, or deliverables.",
  },
];

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TERMS_TITLE },
      { name: "description", content: TERMS_DESC },
      { property: "og:title", content: TERMS_TITLE },
      { property: "og:description", content: TERMS_DESC },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-24 pb-14">
        <div className="absolute inset-0 glow-bg animate-glow-drift pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-foreground transition-colors mb-10">
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Legal</span>
          <h1 className="font-typemachine text-5xl md:text-7xl font-bold tracking-tight mt-4 mb-6">Terms & Conditions</h1>
          <p className="max-w-3xl text-lg text-muted-foreground">The baseline terms for using GOFTUS websites, services, products, demos, and AI automation engagements.</p>
          <p className="mt-6 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Last updated: June 2, 2026</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-8 grid md:grid-cols-3 gap-4">
        <LegalCard icon={FileText} title="Clear Scope" text="Work is governed by agreed project documents and written approvals." />
        <LegalCard icon={Handshake} title="Fair Use" text="Use services lawfully and provide accurate inputs, access, and approvals." />
        <LegalCard icon={Scale} title="Defined Liability" text="Risks and responsibilities are limited as described in these terms." />
      </section>

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
              Questions about these terms can be sent to{" "}
              <a href="mailto:legal@goftus.com" className="font-bold text-foreground hover:text-accent">
                legal@goftus.com
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </SiteLayout>
  );
}

function LegalCard({ icon: Icon, title, text }: { icon: typeof FileText; title: string; text: string }) {
  return (
    <div className="bg-surface ring-1 ring-border rounded-3xl p-6">
      <Icon className="size-5 text-accent mb-4" />
      <h2 className="font-typemachine font-bold text-xl mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}
