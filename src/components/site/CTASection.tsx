import { Link } from "@tanstack/react-router";

interface CTAProps {
  title?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryTo?: "/contact" | "/agents" | "/services";
  secondaryTo?: "/services" | "/agents" | "/about";
}

export function CTASection({
  title = "Ready to automate the impossible?",
  primaryLabel = "Book a Consultation",
  secondaryLabel = "Explore Services",
  primaryTo = "/contact",
  secondaryTo = "/services",
}: CTAProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-32">
      <div className="bg-ink rounded-[3rem] p-12 md:p-24 text-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_-20%,_var(--color-accent)_0%,_transparent_60%)]" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-ink-foreground tracking-tight mb-8 text-balance max-w-3xl mx-auto">
            {title}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={primaryTo}
              className="px-10 py-5 bg-accent text-accent-foreground rounded-2xl font-bold hover:scale-105 transition-transform"
            >
              {primaryLabel}
            </Link>
            <Link
              to={secondaryTo}
              className="px-10 py-5 bg-white/10 text-ink-foreground rounded-2xl font-bold backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
