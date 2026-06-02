import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CTASection } from "@/components/site/CTASection";
import { ArrowRight, Sparkles } from "lucide-react";
import { PRODUCT_ICONS } from "@/data/products";
import { useStoredProducts } from "@/lib/content-store";
import { keywords, PRODUCTS_KEYWORDS, MARKETS_LABEL } from "@/data/seo";

const PRODUCTS_TITLE = "AI Products — AI Agents, Automation & Knowledge Assistants We've Built | GOFTUS";
const PRODUCTS_DESC = `Explore AI products built by GOFTUS — AI agents, automation tools, AI chatbots and knowledge assistants shipped to production for businesses across ${MARKETS_LABEL}.`;

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: PRODUCTS_TITLE },
      { name: "description", content: PRODUCTS_DESC },
      { name: "keywords", content: keywords(PRODUCTS_KEYWORDS) },
      { property: "og:title", content: PRODUCTS_TITLE },
      { property: "og:description", content: PRODUCTS_DESC },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

const statusStyles: Record<string, string> = {
  Live: "bg-accent text-accent-foreground",
  Beta: "bg-foreground text-background",
  Available: "bg-accent text-accent-foreground",
};

function ProductsPage() {
  const allProducts = useStoredProducts();
  const featured = allProducts.find((p) => p.featured) ?? allProducts[0];
  const rest = allProducts.filter((p) => p !== featured);
  const FeaturedIcon = featured ? PRODUCT_ICONS[featured.icon] ?? Sparkles : Sparkles;

  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-24 pb-24">
        <div className="absolute inset-0 glow-bg animate-glow-drift pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest animate-fade-up">Products</span>
          <h1 className="font-typemachine text-5xl md:text-7xl font-bold tracking-tight text-balance mt-4 mb-8 animate-fade-up [animation-delay:100ms] max-w-4xl">
            Products we've built.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground animate-fade-up [animation-delay:200ms]">
            From AI agents to automation and education — here's a look at what we've shipped, and what
            we're building next.
          </p>
        </div>
      </section>

      {/* Featured product */}
      {featured && (
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <div className="grid lg:grid-cols-2 gap-0 bg-surface rounded-[2rem] ring-1 ring-border overflow-hidden">
            <div className="relative aspect-[4/3] lg:aspect-auto bg-gradient-to-br from-accent/25 via-accent/10 to-transparent grid place-items-center">
              <FeaturedIcon className="size-20 text-accent" />
              <span className={`absolute top-6 left-6 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full ${statusStyles[featured.status] ?? "bg-accent text-accent-foreground"}`}>
                {featured.status}
              </span>
            </div>
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <span className="text-[10px] font-mono text-accent uppercase tracking-widest">{featured.tag} · Featured</span>
              <h2 className="font-typemachine text-3xl md:text-4xl font-bold tracking-tight mt-4 mb-4">{featured.name}</h2>
              <p className="text-muted-foreground mb-6">{featured.desc}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {featured.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-background ring-1 ring-border rounded-full px-3 py-1.5">
                    <Sparkles className="size-3 text-accent" /> {t}
                  </span>
                ))}
              </div>
              <Link to="/contact" className="self-start inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all">
                Get this product <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Product grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((p) => {
            const Icon = PRODUCT_ICONS[p.icon] ?? Sparkles;
            return (
              <article key={p.id} className="group flex flex-col bg-surface rounded-3xl ring-1 ring-border overflow-hidden hover:ring-accent hover:-translate-y-1 transition-all">
                <div className="relative aspect-[16/10] bg-gradient-to-br from-accent/20 to-accent/5 grid place-items-center">
                  <Icon className="size-12 text-accent" />
                  <span className={`absolute top-4 left-4 text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full ${statusStyles[p.status] ?? "bg-accent text-accent-foreground"}`}>
                    {p.status}
                  </span>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <span className="text-[10px] font-mono text-accent uppercase tracking-widest">{p.tag}</span>
                  <h3 className="font-typemachine text-xl font-bold mt-2 mb-3 group-hover:text-accent transition-colors">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground bg-background ring-1 ring-border rounded-full px-2.5 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}

          {/* Build-with-us card */}
          <Link to="/contact" className="group flex flex-col items-center justify-center text-center bg-accent/5 rounded-3xl ring-1 ring-accent/10 p-10 hover:ring-accent transition-all min-h-[280px]">
            <div className="size-14 rounded-full border border-border grid place-items-center mb-5 group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-all">
              <ArrowRight className="size-5" />
            </div>
            <h3 className="font-typemachine text-xl font-bold mb-2">Build with us</h3>
            <p className="text-muted-foreground text-sm">Have a product in mind? We'll design and ship it with you.</p>
          </Link>
        </div>
      </section>

      <CTASection
        title="Want a product like these built for you?"
        primaryLabel="Start a project"
        secondaryLabel="See our services"
        secondaryTo="/services"
      />
    </SiteLayout>
  );
}
