import { products as seedProducts, type Product } from "@/data/products";
import { posts as seedPosts, type Post, type PostSection } from "@/data/posts";

const trimSlash = (value: string) => value.replace(/\/+$/, "");
const SAME_ORIGIN_API_BASE = "/api";

export const resolveApiBase = () => {
  const raw = (import.meta.env.VITE_API_BASE as string | undefined)?.trim();
  const source = raw && !raw.includes("onrender.com") ? raw : SAME_ORIGIN_API_BASE;
  return trimSlash(source);
};

const API_BASE = resolveApiBase();

const resolveApiOrigin = () => {
  if (/^https?:\/\//i.test(API_BASE)) {
    try {
      return new URL(API_BASE).origin;
    } catch {
      return "";
    }
  }
  if (typeof window !== "undefined") return window.location.origin;
  return "";
};

const resolveBackendAssetUrl = (value: unknown): string | undefined => {
  const raw = typeof value === "string" ? value.trim() : "";
  if (!raw) return undefined;

  const apiOrigin = resolveApiOrigin();
  if (raw.startsWith("/uploads/")) return apiOrigin ? `${apiOrigin}${raw}` : raw;
  if (!/^https?:\/\//i.test(raw)) return raw;

  try {
    const url = new URL(raw);
    const isLocalHost =
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname === "0.0.0.0" ||
      /^192\.168\./.test(url.hostname) ||
      /^10\./.test(url.hostname) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(url.hostname);

    if (isLocalHost && apiOrigin) {
      return `${apiOrigin}${url.pathname}${url.search}`;
    }
  } catch {
    return raw;
  }

  return raw;
};

const parseJson = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }
  return response.json() as Promise<T>;
};

const estimateReadMinutes = (content?: string) => {
  if (!content) return 5;
  const words = String(content).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.round(words / 220));
};

const formatDate = (value?: string) => {
  if (!value) return "May 2026";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "May 2026";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const isoDate = (value?: string) => {
  if (!value) return new Date().toISOString().slice(0, 10);
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
};

const splitList = (text: string) =>
  text
    .split(/\r?\n|,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
    .map((part) => part.trim())
    .filter(Boolean);

const normalizeBenefits = (value: unknown): string[] => {
  const out: string[] = [];
  const collect = (input: unknown) => {
    if (input == null) return;
    if (Array.isArray(input)) {
      input.forEach(collect);
      return;
    }
    if (typeof input !== "string") {
      out.push(String(input));
      return;
    }
    const raw = input.trim();
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (parsed !== raw) {
        collect(parsed);
        return;
      }
    } catch {
      // Fall back to simple list parsing.
    }
    splitList(raw).forEach((part) => {
      const cleaned = part
        .replace(/^[-*•\s]+/, "")
        .replace(/^"+|"+$/g, "")
        .replace(/^'+|'+$/g, "")
        .trim();
      if (cleaned) out.push(cleaned);
    });
  };
  collect(value);
  return Array.from(new Set(out)).slice(0, 6);
};

const normalizePostTags = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.map(String).map((tag) => tag.trim()).filter(Boolean);
  if (typeof value !== "string") return [];
  const raw = value.trim();
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.map(String).map((tag) => tag.trim()).filter(Boolean);
  } catch {
    // Fall through to comma splitting.
  }
  return splitList(raw);
};

const normalizeCategory = (value?: string) => {
  const category = String(value || "").toLowerCase();
  if (category.includes("case") || category.includes("client")) return "Case Studies";
  if (category.includes("tutorial")) return "Tutorials";
  if (category.includes("product")) return "Product Development";
  if (category.includes("automation")) return "Automation";
  if (category.includes("agentic")) return "Agentic AI";
  return "AI Agents";
};

const markdownToSections = (content?: string): { intro: string; sections: PostSection[] } => {
  const text = String(content || "").replace(/\r/g, "").trim();
  if (!text) return { intro: "No content has been added yet.", sections: [] };

  const lines = text.split("\n");
  const introLines: string[] = [];
  const sections: PostSection[] = [];
  let current: PostSection | null = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    const heading = line.match(/^#{1,3}\s+(.+)$/);
    if (heading) {
      current = { heading: heading[1].trim(), paragraphs: [] };
      sections.push(current);
      continue;
    }
    const cleaned = line
      .replace(/^[-*]\s+/, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1");
    if (current) current.paragraphs.push(cleaned);
    else introLines.push(cleaned);
  }

  if (sections.length === 0 && introLines.length > 1) {
    return {
      intro: introLines[0],
      sections: [{ heading: "Overview", paragraphs: introLines.slice(1) }],
    };
  }

  return { intro: introLines.join(" ") || text.slice(0, 220), sections };
};

export type BackendPost = {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  cover_image?: string;
  thumbnail_image?: string;
  author?: string;
  tags?: string[] | string;
  content_type?: "article" | "video";
  video_url?: string;
  video_duration?: string;
  hub_category?: string;
  is_featured?: boolean;
  is_featured_video?: boolean;
  is_trending?: boolean;
  status?: string;
  published_at?: string;
  updated_at?: string;
  created_at?: string;
};

type BackendProduct = {
  id: string | number;
  name?: string;
  description?: string;
  benefits?: unknown;
  image_url?: string | null;
  link?: string | null;
  subtitle?: string | null;
  status?: string | null;
};

const productTag = (subtitle?: string | null) => {
  if (subtitle === "live_product") return "Live Product";
  if (subtitle === "product_snapshot") return "Product Snapshot";
  return "AI Product";
};

const mapBackendProduct = (item: BackendProduct, index: number): Product => {
  const tags = normalizeBenefits(item.benefits);
  return {
    id: String(item.id),
    name: item.name || "Untitled product",
    tag: productTag(item.subtitle),
    status: item.status === "inactive" ? "Beta" : "Live",
    icon: index === 0 ? "Sparkles" : "Bot",
    desc: item.description || "Production-ready AI product from GOFTUS.",
    tags: tags.length ? tags : ["AI", "Automation"],
    featured: index === 0 || item.subtitle === "live_product",
    imageUrl: resolveBackendAssetUrl(item.image_url),
    href: item.link || undefined,
  };
};

export const mapBackendPost = (post: BackendPost): Post => {
  const sourceDate = post.published_at || post.updated_at || post.created_at;
  const { intro, sections } = markdownToSections(post.content);
  const tags = normalizePostTags(post.tags);
  const cat = normalizeCategory(post.hub_category || tags[0]);
  const readMinutes = estimateReadMinutes(post.content);

  return {
    slug: post.slug,
    title: post.title || "Untitled article",
    cat,
    author: post.author || "GOFTUS Team",
    date: formatDate(sourceDate),
    iso: isoDate(sourceDate),
    read: post.content_type === "video" && post.video_duration ? post.video_duration : `${readMinutes} min`,
    excerpt: post.excerpt || intro.slice(0, 180),
    featured: Boolean(post.is_featured || post.is_featured_video),
    intro,
    sections,
    coverImage: post.cover_image || undefined,
    thumbnailImage: post.thumbnail_image || post.cover_image || undefined,
    contentType: post.content_type,
    videoUrl: post.video_url || undefined,
  };
};

export const fetchProductsFromBackend = async () => {
  const response = await fetch(`${API_BASE}/products?status=active`);
  const data = await parseJson<{ products?: BackendProduct[]; data?: BackendProduct[] } | BackendProduct[]>(response);
  const products = Array.isArray(data)
    ? data
    : Array.isArray(data.products)
      ? data.products
      : Array.isArray(data.data)
        ? data.data
        : [];
  return products.map(mapBackendProduct);
};

export const fetchPostsFromBackend = async () => {
  try {
    const response = await fetch(`${API_BASE}/posts/hub`);
    const data = await parseJson<{ posts?: BackendPost[]; latest?: BackendPost[] }>(response);
    const posts = data.posts?.length ? data.posts : data.latest || [];
    return posts.map(mapBackendPost);
  } catch {
    const response = await fetch(`${API_BASE}/posts?page=1&limit=50`);
    const data = await parseJson<{ posts?: BackendPost[] }>(response);
    return (data.posts || []).map(mapBackendPost);
  }
};

export const fetchPostFromBackend = async (slug: string) => {
  const response = await fetch(`${API_BASE}/posts/${encodeURIComponent(slug)}`);
  return mapBackendPost(await parseJson<BackendPost>(response));
};

export const submitContact = async (payload: {
  fullName: string;
  email: string;
  company?: string;
  need?: string;
  message: string;
}) => {
  const response = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJson<{ success: boolean; emailSent?: boolean }>(response);
};

export const submitAutomationInquiry = async (payload: {
  choice: string;
  fullName: string;
  email: string;
  company: string;
  exploration: string;
  description?: string;
}) => {
  const response = await fetch(`${API_BASE}/automation-inquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJson<{ success: boolean; emailSent?: boolean }>(response);
};

export const useBackendProductsFallback = () => seedProducts;
export const useBackendPostsFallback = () => seedPosts;
