import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { CTASection } from "@/components/site/CTASection";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { getPost, type Post } from "@/data/posts";
import { getStoredPosts } from "@/lib/content-store";
import { fetchPostFromBackend, fetchPostsFromBackend } from "@/lib/backend-api";
import { keywords, CORE_KEYWORDS } from "@/data/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const seed = getPost(params.slug);
    if (seed) return seed;
    return fetchPostFromBackend(params.slug).catch(() => null);
  },
  staleTime: 30_000,
  pendingMs: 0,
  pendingComponent: () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  ),
  head: ({ loaderData: post }) => {
    if (!post) return {};
    const url = `/blog/${post.slug}`;
    return {
      meta: [
        { title: `${post.title} — GOFTUS Blog` },
        { name: "description", content: post.excerpt },
        { name: "author", content: post.author },
        { name: "keywords", content: keywords([post.cat], CORE_KEYWORDS) },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:site_name", content: "GOFTUS" },
        { property: "article:published_time", content: post.iso },
        { property: "article:author", content: post.author },
        { property: "article:section", content: post.cat },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.excerpt },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.iso,
            dateModified: post.iso,
            author: { "@type": "Person", name: post.author },
            publisher: {
              "@type": "Organization",
              name: "GOFTUS",
            },
            articleSection: post.cat,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
          }),
        },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const post = Route.useLoaderData();
  const { slug } = Route.useParams();
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  useEffect(() => {
    let cancelled = false;
    const stored = getStoredPosts();
    fetchPostsFromBackend()
      .then((items) => { if (!cancelled) setAllPosts(items.length ? items : stored); })
      .catch(() => { if (!cancelled) setAllPosts(stored); });
    return () => { cancelled = true; };
  }, []);

  if (!post) {
    return <PostNotFound />;
  }

  const pool = allPosts.length ? allPosts : [];
  const related = pool.filter((p) => p.slug !== post.slug && p.cat === post.cat);
  const more = (related.length ? related : pool.filter((p) => p.slug !== post.slug)).slice(0, 2);

  return (
    <SiteLayout>
      <article>
        {/* Header */}
        <header className="relative overflow-hidden pt-24 pb-12">
          <div className="absolute inset-0 glow-bg animate-glow-drift pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-6">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors mb-8">
              <ArrowLeft className="size-4" /> All articles
            </Link>
            <span className="block text-[10px] font-mono text-accent uppercase tracking-widest">{post.cat}</span>
            <h1 className="font-typemachine text-4xl md:text-6xl font-bold tracking-tight text-balance mt-4 mb-6">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground text-pretty mb-8">{post.excerpt}</p>
            <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              <span className="text-foreground font-bold">{post.author}</span>
              <span>·</span>
              <time dateTime={post.iso}>{post.date}</time>
              <span>·</span>
              <span>{post.read} read</span>
            </div>
          </div>
        </header>

        {/* Cover */}
        <div className="max-w-5xl mx-auto px-6 mb-16">
          {post.contentType === "video" && post.videoUrl ? (
            <VideoFrame post={post} />
          ) : post.coverImage || post.thumbnailImage ? (
            <img
              src={post.coverImage || post.thumbnailImage}
              alt={post.title}
              className="aspect-16/7 w-full rounded-[2rem] object-cover ring-1 ring-border"
            />
          ) : (
            <div className="aspect-16/7 rounded-[2rem] bg-linear-to-br from-accent/25 via-accent/10 to-transparent ring-1 ring-border" />
          )}
        </div>

        {/* Body */}
        <div className="max-w-3xl mx-auto px-6 pb-24">
          <p className="text-xl leading-relaxed text-foreground/90 mb-12">{post.intro}</p>

          <div className="space-y-12">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-typemachine text-2xl font-bold tracking-tight mb-4">{section.heading}</h2>
                <div className="space-y-4">
                  {section.paragraphs.map((para, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed text-[17px]">{para}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Author footer */}
          <div className="mt-16 pt-8 border-t border-border flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              <span>Written by</span>
              <span className="text-foreground font-bold">{post.author}</span>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-bold border-b-2 border-accent pb-0.5 hover:gap-3 transition-all">
              Work with us <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </article>

      {/* Related */}
      {more.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <h2 className="font-typemachine text-2xl font-bold tracking-tight mb-8">Keep reading</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {more.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group bg-surface rounded-3xl p-8 ring-1 ring-border hover:ring-accent hover:-translate-y-1 transition-all"
              >
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest">{p.cat}</span>
                <h3 className="font-typemachine text-xl font-bold mt-3 mb-4 group-hover:text-accent transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CTASection title="Have a project in mind?" primaryLabel="Talk to us" secondaryLabel="See our products" secondaryTo="/products" />
    </SiteLayout>
  );
}

function PostNotFound() {
  return (
    <SiteLayout>
      <section className="max-w-3xl mx-auto px-6 py-40 text-center">
        <span className="text-[10px] font-mono text-accent uppercase tracking-widest">404</span>
        <h1 className="font-typemachine text-4xl font-bold tracking-tight mt-4 mb-4">Article not found</h1>
        <p className="text-muted-foreground mb-8">This post doesn't exist or may have been moved.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-bold">
          <ArrowLeft className="size-4" /> Back to blog
        </Link>
      </section>
    </SiteLayout>
  );
}

function toEmbedUrl(url?: string) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
    if (parsed.hostname.includes("youtube.com")) {
      const watchId = parsed.searchParams.get("v");
      if (watchId) return `https://www.youtube.com/embed/${watchId}`;
      const parts = parsed.pathname.split("/").filter(Boolean);
      if ((parts[0] === "shorts" || parts[0] === "embed") && parts[1]) {
        return `https://www.youtube.com/embed/${parts[1]}`;
      }
    }
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : "";
    }
  } catch {
    return "";
  }
  return "";
}

function VideoFrame({ post }: { post: Post }) {
  const embedUrl = toEmbedUrl(post.videoUrl);
  return (
    <div className="overflow-hidden rounded-[2rem] bg-ink ring-1 ring-border">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={post.title}
          className="aspect-video w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video
          controls
          playsInline
          preload="metadata"
          poster={post.thumbnailImage || post.coverImage}
          className="aspect-video w-full bg-black"
        >
          <source src={post.videoUrl} />
        </video>
      )}
      <div className="flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-widest text-ink-foreground/70">
        <Play className="size-4 text-accent" /> Video
      </div>
    </div>
  );
}
