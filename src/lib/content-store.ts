import { useEffect, useState } from "react";
import { posts as seedPosts, type Post, type PostSection } from "@/data/posts";
import { products as seedProducts, type Product } from "@/data/products";

const POSTS_KEY = "goftus_posts_v1";
const PRODUCTS_KEY = "goftus_products_v1";
const isBrowser = typeof window !== "undefined";

/* ----------------------------- low-level store ---------------------------- */

function read<T>(key: string, seed: T[]): T[] {
  if (!isBrowser) return seed;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T[];
  } catch {
    /* fall through to seed */
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(seed));
  } catch {
    /* ignore quota / privacy mode */
  }
  return seed;
}

function write<T>(key: string, list: T[]) {
  if (isBrowser) window.localStorage.setItem(key, JSON.stringify(list));
}

/* -------------------------------- posts ---------------------------------- */

export function getStoredPosts(): Post[] {
  return read<Post>(POSTS_KEY, seedPosts);
}

export function savePosts(list: Post[]) {
  write(POSTS_KEY, list);
}

export function upsertPost(post: Post) {
  const list = getStoredPosts();
  const idx = list.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) list[idx] = post;
  else list.unshift(post);
  savePosts(list);
}

export function deletePost(slug: string) {
  savePosts(getStoredPosts().filter((p) => p.slug !== slug));
}

export function resetPosts() {
  savePosts(seedPosts);
}

/* ------------------------------- products -------------------------------- */

export function getStoredProducts(): Product[] {
  return read<Product>(PRODUCTS_KEY, seedProducts);
}

export function saveProducts(list: Product[]) {
  write(PRODUCTS_KEY, list);
}

export function upsertProduct(product: Product) {
  const list = getStoredProducts();
  const idx = list.findIndex((p) => p.id === product.id);
  if (idx >= 0) list[idx] = product;
  else list.unshift(product);
  saveProducts(list);
}

export function deleteProduct(id: string) {
  saveProducts(getStoredProducts().filter((p) => p.id !== id));
}

export function resetProducts() {
  saveProducts(seedProducts);
}

/* --------------------------------- hooks --------------------------------- */
// Initialize with seed (matches SSR), then hydrate from localStorage after mount
// to avoid hydration mismatches.

export function useStoredPosts(): Post[] {
  const [list, setList] = useState<Post[]>(seedPosts);
  useEffect(() => setList(getStoredPosts()), []);
  return list;
}

export function useStoredProducts(): Product[] {
  const [list, setList] = useState<Product[]>(seedProducts);
  useEffect(() => setList(getStoredProducts()), []);
  return list;
}

/* ------------------------------- helpers --------------------------------- */

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

export function uniqueSlug(base: string, existing: string[]): string {
  let slug = base || "post";
  let n = 2;
  while (existing.includes(slug)) slug = `${base}-${n++}`;
  return slug;
}

/**
 * Parse a simple authoring format into intro + sections.
 * Lines starting with "## " begin a new section heading; other non-empty
 * lines are paragraphs. Text before the first "## " becomes the intro.
 */
export function parseContent(text: string): { intro: string; sections: PostSection[] } {
  const lines = text.replace(/\r/g, "").split("\n");
  const introLines: string[] = [];
  const sections: PostSection[] = [];
  let current: PostSection | null = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("## ")) {
      current = { heading: line.slice(3).trim(), paragraphs: [] };
      sections.push(current);
    } else if (line) {
      if (current) current.paragraphs.push(line);
      else introLines.push(line);
    }
  }
  return { intro: introLines.join(" "), sections };
}

/** Inverse of parseContent — turn a post body back into the editable format. */
export function stringifyContent(intro: string, sections: PostSection[]): string {
  const parts: string[] = [intro.trim()];
  for (const s of sections) {
    parts.push("");
    parts.push(`## ${s.heading}`);
    parts.push(s.paragraphs.join("\n"));
  }
  return parts.join("\n").trim();
}
