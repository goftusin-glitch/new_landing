import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Search } from "lucide-react";
import { useStoredPosts } from "@/lib/content-store";
import { fetchPostsFromBackend } from "@/lib/backend-api";
import { keywords, BLOG_KEYWORDS } from "@/data/seo";

const BLOG_TITLE = "AI Agents & Automation Blog — Agentic AI Insights & Guides | GOFTUS";
const BLOG_DESC = "Field notes on AI agents, agentic AI, and AI automation — practical guides on deploying AI agents and custom AI solutions for business.";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const posts = await fetchPostsFromBackend().catch(() => []);
    return { posts };
  },
  head: () => ({
    meta: [
      { title: BLOG_TITLE },
      { name: "description", content: BLOG_DESC },
      { name: "keywords", content: keywords(BLOG_KEYWORDS) },
      { property: "og:title", content: BLOG_TITLE },
      { property: "og:description", content: BLOG_DESC },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const categories = ["All", "AI Agents", "Agentic AI", "Automation", "Product Development", "Tutorials", "Case Studies"] as const;

/* ─────────────────────────── skeleton helpers ────────────────────────────── */

function Hex({ delay, size = 40 }: { delay: number; size?: number }) {
  return (
    <span
      className="block shrink-0 animate-pulse"
      style={{
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        width: size,
        height: Math.round(size * 1.14),
        background: "color-mix(in oklab, var(--color-accent) 22%, transparent)",
        animationDelay: `${delay}ms`,
        animationDuration: "1.8s",
      }}
    />
  );
}

function HexHoneycomb({ seed = 0, cols = 3, rows = 3, size = 40 }: { seed?: number; cols?: number; rows?: number; size?: number }) {
  const offset = Math.round((size + 6) / 2);
  return (
    <div className="flex flex-col items-start" style={{ gap: Math.round(size * 0.28) }}>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex" style={{ gap: 6, marginLeft: r % 2 === 1 ? offset : 0 }}>
          {Array.from({ length: cols }).map((_, c) => (
            <Hex key={c} delay={(seed + r * cols + c) * 55} size={size} />
          ))}
        </div>
      ))}
    </div>
  );
}

function BlogSkeleton() {
  return (
    <>
      {/* Featured skeleton */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="relative overflow-hidden bg-ink rounded-[2rem] p-10 md:p-16 ring-1 ring-white/5">
          {/* decorative hex wall */}
          <div className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 opacity-[0.07]">
            <HexHoneycomb seed={0} cols={4} rows={5} size={52} />
          </div>
          <div className="relative z-10 animate-pulse max-w-xl space-y-4">
            <div className="h-2.5 w-32 rounded-full bg-white/15" />
            <div className="h-8 w-4/5 rounded-xl bg-white/10" />
            <div className="h-8 w-3/5 rounded-xl bg-white/10" />
            <div className="h-4 w-2/3 rounded-lg bg-white/7 mt-2" />
            <div className="h-4 w-1/2 rounded-lg bg-white/7" />
            <div className="flex items-center gap-3 pt-4">
              <div className="h-2.5 w-16 rounded-full bg-white/15" />
              <div className="size-1 rounded-full bg-white/10" />
              <div className="h-2.5 w-20 rounded-full bg-white/15" />
              <div className="size-1 rounded-full bg-white/10" />
              <div className="h-2.5 w-12 rounded-full bg-white/15" />
            </div>
          </div>
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-surface rounded-3xl p-8 ring-1 ring-border overflow-hidden">
              {/* hex image placeholder */}
              <div className="aspect-4/3 mb-6 rounded-2xl bg-muted/40 flex items-center justify-center overflow-hidden">
                <HexHoneycomb seed={i * 9} cols={3} rows={3} size={42} />
              </div>
              <div className="animate-pulse space-y-3" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="h-2.5 w-16 rounded-full bg-muted" />
                <div className="h-5 w-full rounded-lg bg-muted" />
                <div className="h-5 w-4/5 rounded-lg bg-muted" />
                <div className="flex items-center gap-2 pt-1">
                  <div className="h-2.5 w-14 rounded-full bg-muted/70" />
                  <div className="size-1 rounded-full bg-muted/40" />
                  <div className="h-2.5 w-16 rounded-full bg-muted/70" />
                  <div className="size-1 rounded-full bg-muted/40" />
                  <div className="h-2.5 w-12 rounded-full bg-muted/70" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function BlogPage() {
  const { posts: loaderPosts } = Route.useLoaderData();
  const fallbackPosts = useStoredPosts();
  const posts = loaderPosts.length ? loaderPosts : fallbackPosts;
  const loading = false;
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    return posts.filter((p) =>
      (cat === "All" || p.cat === cat) &&
      (q === "" ||
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(q.toLowerCase()))
    );
  }, [posts, q, cat]);

  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const rest = filtered.filter((p) => p !== featured);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 glow-bg animate-glow-drift pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Blog</span>
          <h1 className="font-typemachine text-5xl md:text-7xl font-bold tracking-tight text-balance mt-4 mb-8 max-w-4xl">
            Field notes from the agentic frontier.
          </h1>
        </div>
      </section>

      {/* Search & filter */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-11 pr-4 py-3 bg-surface rounded-full ring-1 ring-border focus:ring-accent focus:outline-none text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  cat === c ? "bg-foreground text-background" : "bg-surface ring-1 ring-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading ? <BlogSkeleton /> : (
        <>
          {/* Featured */}
          {featured && (
            <section className="max-w-7xl mx-auto px-6 pb-16">
              <Link
                to="/blog/$slug"
                params={{ slug: featured.slug }}
                className="relative block overflow-hidden bg-ink text-ink-foreground rounded-[2rem] ring-1 ring-transparent hover:ring-accent transition-all min-h-72"
              >
                {/* Background image */}
                {(featured.coverImage || featured.thumbnailImage) && (
                  <img
                    src={featured.coverImage || featured.thumbnailImage}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                {/* Gradient overlay — dark on the left so text is legible, fades right to let image show */}
                <div className="absolute inset-0 bg-linear-to-r from-ink from-40% via-ink/85 to-ink/30" />
                {/* Bottom fade for extra safety on short viewports */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-ink/60 to-transparent" />

                {/* Content */}
                <div className="relative z-10 p-10 md:p-16 max-w-2xl">
                  <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Featured · {featured.cat}</span>
                  <h2 className="font-typemachine text-3xl md:text-5xl font-bold tracking-tight mt-6 mb-6 text-balance text-ink-foreground">{featured.title}</h2>
                  {featured.excerpt && (
                    <p className="text-ink-foreground/75 text-lg mb-8 leading-relaxed">{featured.excerpt}</p>
                  )}
                  <div className="flex items-center gap-3 text-xs font-mono text-ink-foreground/50 uppercase tracking-widest">
                    <span>{featured.author}</span>
                    <span>·</span>
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span>{featured.read}</span>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Grid */}
          <section className="max-w-7xl mx-auto px-6 pb-32">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group bg-surface rounded-3xl p-8 ring-1 ring-border hover:ring-accent hover:-translate-y-1 transition-all"
                >
                  {p.thumbnailImage || p.coverImage ? (
                    <img
                      src={p.thumbnailImage || p.coverImage}
                      alt={p.title}
                      className="aspect-4/3 mb-6 w-full rounded-2xl object-cover ring-1 ring-border"
                      loading="lazy"
                    />
                  ) : (
                    <div className="aspect-4/3 mb-6 rounded-2xl bg-linear-to-br from-accent/20 to-accent/5 ring-1 ring-border" />
                  )}
                  <span className="text-[10px] font-mono text-accent uppercase tracking-widest">{p.cat}</span>
                  <h3 className="font-typemachine text-xl font-bold mt-3 mb-4 group-hover:text-accent transition-colors">{p.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                    <span>{p.author}</span>
                    <span>·</span>
                    <span>{p.date}</span>
                    <span>·</span>
                    <span>{p.read}</span>
                  </div>
                </Link>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-16">No articles match your search.</p>
            )}
          </section>
        </>
      )}
    </SiteLayout>
  );
}
