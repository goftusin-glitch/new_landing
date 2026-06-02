import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CTASection } from "@/components/site/CTASection";
import { ArrowRight, Sparkles } from "lucide-react";
import { PRODUCT_ICONS, products as seedProducts, type Product } from "@/data/products";
import { fetchProductsFromBackend } from "@/lib/backend-api";
import { keywords, PRODUCTS_KEYWORDS, MARKETS_LABEL } from "@/data/seo";
import { useEffect, useState } from "react";

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


function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProductsFromBackend()
      .then((items) => {
        if (!cancelled) setProducts(items.length ? items : seedProducts);
      })
      .catch(() => {
        if (!cancelled) setProducts(seedProducts);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

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

      {loading ? (
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="bg-surface rounded-[2rem] ring-1 ring-border p-12 text-center">
            <Sparkles className="mx-auto size-8 text-accent mb-4 animate-pulse" />
            <p className="font-bold">Loading products from backend...</p>
            <p className="mt-2 text-sm text-muted-foreground">Syncing the live product catalog.</p>
          </div>
        </section>
      ) : !products.length ? (
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="bg-surface rounded-[2rem] ring-1 ring-border p-12 text-center">
            <p className="font-bold">No active products found.</p>
            <p className="mt-2 text-sm text-muted-foreground">Add active products in the backend admin panel to display them here.</p>
          </div>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid sm:grid-cols-2 gap-6">
            {products.map((p, index) => {
              const Icon = PRODUCT_ICONS[p.icon] ?? Sparkles;
              const num = String(index + 1).padStart(2, "0");
              return (
                <article
                  key={p.id}
                  className="group flex flex-col bg-surface rounded-[2rem] ring-1 ring-border overflow-hidden hover:ring-accent/50 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.22)] transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative aspect-4/3 overflow-hidden bg-linear-to-br from-accent/20 via-accent/5 to-background">
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="h-full w-full grid place-items-center">
                        <Icon className="size-16 text-accent/60" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-surface/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="absolute top-4 right-4 font-mono text-[11px] font-bold text-white/40 tabular-nums">
                      {num}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6 md:p-7">
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest">{p.tag}</span>
                    <h2 className="font-typemachine text-xl md:text-2xl font-bold tracking-tight mt-2 mb-2 group-hover:text-accent transition-colors duration-300">
                      {p.name}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 text-[10px] font-semibold bg-background ring-1 ring-border rounded-full px-2.5 py-1 group-hover:ring-accent/30 transition-colors"
                        >
                          <Sparkles className="size-2.5 text-accent" /> {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      to="/contact"
                      className="self-start inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-xl text-sm font-bold hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      Get this product <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <CTASection
        title="Want a product like these built for you?"
        primaryLabel="Start a project"
        secondaryLabel="Talk to us"
        secondaryTo="/contact"
      />
    </SiteLayout>
  );
}
