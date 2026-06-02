import { Link } from "@tanstack/react-router";

interface CTAProps {
  title?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryTo?: "/contact" | "/agents" | "/services";
  secondaryTo?: "/contact" | "/services" | "/agents" | "/about" | "/products";
}

export function CTASection({
  title = "Ready to automate the impossible?",
  primaryLabel = "Book a Consultation",
  secondaryLabel = "Get in touch",
  primaryTo = "/contact",
  secondaryTo = "/contact",
}: CTAProps) {
  const titleWords = title.split(" ");

  return (
    <section className="max-w-7xl mx-auto px-6 pb-32">
      <div className="bg-ink rounded-[3rem] p-12 md:p-24 text-center overflow-hidden relative ring-1 ring-white/10 shadow-[0_24px_90px_rgba(25,18,13,0.22)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,_var(--color-accent)_0%,_transparent_58%)] opacity-35 cta-glow-drift" />
        <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-accent/20 blur-3xl cta-orb-one" />
        <div className="pointer-events-none absolute -right-20 bottom-0 size-80 rounded-full bg-white/10 blur-3xl cta-orb-two" />
        <div className="pointer-events-none absolute inset-0 cta-live-grid opacity-30" />
        <div className="pointer-events-none absolute left-[14%] top-[28%] size-1.5 rounded-full bg-accent/80 cta-particle" />
        <div className="pointer-events-none absolute right-[18%] top-[36%] size-1 rounded-full bg-white/70 cta-particle [animation-delay:1.2s]" />
        <div className="pointer-events-none absolute left-[62%] bottom-[18%] size-1.5 rounded-full bg-accent/70 cta-particle [animation-delay:2.1s]" />
        <div className="relative z-10">
          <h2 className="font-sans text-4xl md:text-6xl font-bold text-ink-foreground tracking-tight mb-8 text-balance max-w-3xl mx-auto">
            {titleWords.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="cta-title-word inline-block"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                {word}
                {index < titleWords.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={primaryTo}
              className="relative overflow-hidden px-10 py-5 bg-accent text-accent-foreground rounded-2xl font-bold hover:scale-105 transition-transform shadow-[0_16px_40px_color-mix(in_oklab,var(--color-accent)_24%,transparent)] before:absolute before:inset-y-0 before:-left-1/2 before:w-1/2 before:skew-x-[-18deg] before:bg-white/20 before:transition-transform before:duration-700 hover:before:translate-x-[340%]"
            >
              <span className="relative z-10">{primaryLabel}</span>
            </Link>
            <Link
              to={secondaryTo}
              className="px-10 py-5 bg-white/10 text-ink-foreground rounded-2xl font-bold backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
