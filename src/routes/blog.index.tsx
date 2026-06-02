import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Search } from "lucide-react";
import { useStoredPosts } from "@/lib/content-store";
import { keywords, BLOG_KEYWORDS } from "@/data/seo";

const BLOG_TITLE = "AI Agents & Automation Blog — Agentic AI Insights & Guides | GOFTUS";
const BLOG_DESC = "Field notes on AI agents, agentic AI, and AI automation — practical guides on deploying AI agents and custom AI solutions for business.";

export const Route = createFileRoute("/blog/")({
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

function BlogPage() {
  const posts = useStoredPosts();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    return posts.filter((p) =>
      (cat === "All" || p.cat === cat) &&
      (q === "" || p.title.toLowerCase().includes(q.toLowerCase()))
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

      {/* Featured */}
      {featured && (
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="block bg-ink text-ink-foreground rounded-[2rem] p-10 md:p-16 ring-1 ring-transparent hover:ring-accent transition-all"
          >
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Featured · {featured.cat}</span>
            <h2 className="font-typemachine text-3xl md:text-5xl font-bold tracking-tight mt-6 mb-6 text-balance">{featured.title}</h2>
            {featured.excerpt && <p className="text-ink-foreground/70 max-w-2xl text-lg mb-8">{featured.excerpt}</p>}
            <div className="flex items-center gap-3 text-xs font-mono text-ink-foreground/60 uppercase tracking-widest">
              <span>{featured.author}</span>
              <span>·</span>
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.read}</span>
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
              <div className="aspect-[4/3] mb-6 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 ring-1 ring-border" />
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
    </SiteLayout>
  );
}
