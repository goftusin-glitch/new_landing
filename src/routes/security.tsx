import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileSearch, KeyRound, Lock, Mail, ServerCrash, ShieldCheck, UserCheck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

const SECURITY_TITLE = "Security & Compliance | GOFTUS";
const SECURITY_DESC = "Security practices for GOFTUS AI agents, automation systems, infrastructure, application delivery, and enterprise engagements.";

const securitySections = [
  {
    title: "Data Protection",
    items: [
      "TLS for client-server and service-service traffic where applicable.",
      "Encryption at rest across supported databases, object storage, backups, and managed queues.",
      "Data minimization practices that reduce unnecessary personal or business-sensitive data exposure.",
    ],
  },
  {
    title: "Identity & Access Management",
    items: [
      "Least-privilege access for administrative systems and production environments.",
      "Role-based controls for internal systems and client delivery workflows.",
      "Credential rotation and secret management practices for integrations and infrastructure.",
    ],
  },
  {
    title: "Application Security",
    items: [
      "Secure coding reviews for authentication, authorization, data handling, and API boundaries.",
      "Input validation and output controls for web applications, AI agents, and automation endpoints.",
      "Dependency review and patching practices during active delivery and maintenance windows.",
    ],
  },
  {
    title: "Monitoring & Incident Response",
    items: [
      "Operational monitoring for availability, errors, suspicious behavior, and failed integration flows.",
      "Audit trails for important admin, automation, and data access events where supported.",
      "Incident review process focused on containment, recovery, root cause, and prevention.",
    ],
  },
];

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: SECURITY_TITLE },
      { name: "description", content: SECURITY_DESC },
      { property: "og:title", content: SECURITY_TITLE },
      { property: "og:description", content: SECURITY_DESC },
      { property: "og:url", content: "/security" },
    ],
    links: [{ rel: "canonical", href: "/security" }],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-24 pb-14">
        <div className="absolute inset-0 glow-bg animate-glow-drift pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-foreground transition-colors mb-10">
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Security</span>
          <h1 className="font-typemachine text-5xl md:text-7xl font-bold tracking-tight mt-4 mb-6">Security & Compliance</h1>
          <p className="max-w-3xl text-lg text-muted-foreground">Security practices built into GOFTUS agentic AI systems, automation workflows, cloud infrastructure, and client delivery processes.</p>
          <p className="mt-6 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Last updated: June 2, 2026</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-8 grid md:grid-cols-3 gap-4">
        <SecurityCard icon={Lock} title="Data Protection" text="Encryption, access controls, and minimization practices for sensitive workloads." />
        <SecurityCard icon={UserCheck} title="Access Control" text="Least-privilege access, credential hygiene, and role-based operational boundaries." />
        <SecurityCard icon={FileSearch} title="Auditability" text="Event visibility and review processes for important admin and automation actions." />
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-32">
        <div className="bg-surface ring-1 ring-border rounded-[2rem] p-8 md:p-10 space-y-8">
          {securitySections.map((section) => (
            <section key={section.title}>
              <h2 className="font-typemachine text-2xl font-bold mb-4">{section.title}</h2>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 text-muted-foreground leading-relaxed">
                    <ShieldCheck className="mt-1 size-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <section className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-background ring-1 ring-border p-6">
              <KeyRound className="size-5 text-accent mb-3" />
              <h2 className="font-typemachine text-xl font-bold mb-2">Enterprise Requests</h2>
              <p className="text-muted-foreground">For regulated projects, we can discuss security questionnaires, architecture reviews, and deployment boundaries under NDA.</p>
            </div>
            <div className="rounded-2xl bg-background ring-1 ring-border p-6">
              <ServerCrash className="size-5 text-accent mb-3" />
              <h2 className="font-typemachine text-xl font-bold mb-2">Report Issues</h2>
              <p className="text-muted-foreground">
                Report security concerns to{" "}
                <a href="mailto:security@goftus.com" className="font-bold text-foreground hover:text-accent">
                  security@goftus.com
                </a>
                .
              </p>
            </div>
          </section>
          <section className="rounded-2xl bg-background ring-1 ring-border p-6">
            <Mail className="size-5 text-accent mb-3" />
            <h2 className="font-typemachine text-xl font-bold mb-2">Security Contact</h2>
            <p className="text-muted-foreground">
              For security documentation or project-specific controls, email{" "}
              <a href="mailto:security@goftus.com" className="font-bold text-foreground hover:text-accent">
                security@goftus.com
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </SiteLayout>
  );
}

function SecurityCard({ icon: Icon, title, text }: { icon: typeof Lock; title: string; text: string }) {
  return (
    <div className="bg-surface ring-1 ring-border rounded-3xl p-6">
      <Icon className="size-5 text-accent mb-4" />
      <h2 className="font-typemachine font-bold text-xl mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}
