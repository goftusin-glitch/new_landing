import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Plus, Pencil, Trash2, X, Lock, FileText, Package, RotateCcw } from "lucide-react";
import type { Post } from "@/data/posts";
import type { Product } from "@/data/products";
import { PRODUCT_ICONS, PRODUCT_STATUSES } from "@/data/products";
import {
  getStoredPosts, upsertPost, deletePost, resetPosts,
  getStoredProducts, upsertProduct, deleteProduct, resetProducts,
  slugify, uniqueSlug, parseContent, stringifyContent,
} from "@/lib/content-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — GOFTUS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const ADMIN_PASSWORD = "goftus-admin";
const AUTH_KEY = "goftus_admin_ok";
const CATEGORIES = ["AI Agents", "Agentic AI", "Automation", "Product Development", "Tutorials", "Case Studies"];

const inputCls = "w-full px-4 py-2.5 bg-background ring-1 ring-border rounded-xl focus:ring-accent focus:outline-none text-sm";
const labelCls = "text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2";

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState<"blogs" | "products">("blogs");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(AUTH_KEY) === "1") setAuthed(true);
  }, []);

  if (!authed) {
    return (
      <SiteLayout>
        <section className="max-w-md mx-auto px-6 py-32">
          <div className="bg-surface ring-1 ring-border rounded-[2rem] p-10">
            <div className="size-12 rounded-2xl bg-accent text-accent-foreground grid place-items-center mb-6">
              <Lock className="size-5" />
            </div>
            <h1 className="font-typemachine text-3xl font-bold mb-2">Admin</h1>
            <p className="text-muted-foreground text-sm mb-8">Enter the password to manage blogs and products.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (pw === ADMIN_PASSWORD) {
                  sessionStorage.setItem(AUTH_KEY, "1");
                  setAuthed(true);
                } else {
                  alert("Incorrect password");
                }
              }}
            >
              <label className={labelCls}>Password</label>
              <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} className={inputCls} autoFocus />
              <button type="submit" className="mt-6 w-full px-6 py-3 bg-foreground text-background rounded-xl font-bold hover:opacity-90 transition-opacity">
                Sign in
              </button>
            </form>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Admin</span>
            <h1 className="font-typemachine text-4xl font-bold tracking-tight mt-2">Content manager</h1>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem(AUTH_KEY); setAuthed(false); }}
            className="text-sm font-bold text-muted-foreground hover:text-foreground"
          >
            Sign out
          </button>
        </div>

        <div className="flex gap-2 mb-10">
          <TabButton active={tab === "blogs"} onClick={() => setTab("blogs")} icon={FileText} label="Blogs" />
          <TabButton active={tab === "products"} onClick={() => setTab("products")} icon={Package} label="Products" />
        </div>

        {tab === "blogs" ? <BlogAdmin /> : <ProductAdmin />}
      </section>
    </SiteLayout>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: typeof FileText; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
        active ? "bg-foreground text-background" : "bg-surface ring-1 ring-border text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="size-4" /> {label}
    </button>
  );
}

/* --------------------------------- Blogs --------------------------------- */

const emptyBlogForm = {
  slug: "",
  title: "",
  cat: CATEGORIES[0],
  author: "GOFTUS Team",
  iso: "",
  read: "5 min",
  excerpt: "",
  featured: false,
  content: "",
};

function BlogAdmin() {
  const [list, setList] = useState<Post[]>([]);
  const [editing, setEditing] = useState<typeof emptyBlogForm | null>(null);

  const refresh = () => setList(getStoredPosts());
  useEffect(refresh, []);

  const startNew = () => setEditing({ ...emptyBlogForm });
  const startEdit = (p: Post) =>
    setEditing({
      slug: p.slug,
      title: p.title,
      cat: p.cat,
      author: p.author,
      iso: p.iso,
      read: p.read,
      excerpt: p.excerpt,
      featured: !!p.featured,
      content: stringifyContent(p.intro, p.sections),
    });

  const save = () => {
    if (!editing) return;
    if (!editing.title.trim()) return alert("Title is required");
    const existingSlugs = getStoredPosts().map((p) => p.slug);
    const slug = editing.slug || uniqueSlug(slugify(editing.title), existingSlugs);
    const iso = editing.iso || new Date().toISOString().slice(0, 10);
    const date = new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    const { intro, sections } = parseContent(editing.content);
    const post: Post = {
      slug, title: editing.title.trim(), cat: editing.cat, author: editing.author.trim() || "GOFTUS Team",
      date, iso, read: editing.read.trim() || "5 min", excerpt: editing.excerpt.trim(),
      featured: editing.featured, intro, sections,
    };
    upsertPost(post);
    setEditing(null);
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">{list.length} post{list.length === 1 ? "" : "s"}</p>
        <div className="flex gap-2">
          <button onClick={() => { if (confirm("Reset blogs to defaults?")) { resetPosts(); refresh(); } }} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground">
            <RotateCcw className="size-4" /> Reset
          </button>
          <button onClick={startNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground rounded-xl font-bold text-sm hover:opacity-90">
            <Plus className="size-4" /> New post
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {list.map((p) => (
          <div key={p.slug} className="flex items-center gap-4 bg-surface ring-1 ring-border rounded-2xl p-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest">{p.cat}</span>
                {p.featured && <span className="text-[9px] font-mono uppercase tracking-widest bg-accent/15 text-accent rounded-full px-2 py-0.5">Featured</span>}
              </div>
              <h3 className="font-bold truncate">{p.title}</h3>
              <p className="text-xs text-muted-foreground">/blog/{p.slug} · {p.author} · {p.date}</p>
            </div>
            <button onClick={() => startEdit(p)} className="size-9 grid place-items-center rounded-lg ring-1 ring-border hover:ring-accent hover:text-accent"><Pencil className="size-4" /></button>
            <button onClick={() => { if (confirm(`Delete "${p.title}"?`)) { deletePost(p.slug); refresh(); } }} className="size-9 grid place-items-center rounded-lg ring-1 ring-border hover:ring-destructive hover:text-destructive"><Trash2 className="size-4" /></button>
          </div>
        ))}
      </div>

      {editing && (
        <Modal title={editing.slug ? "Edit post" : "New post"} onClose={() => setEditing(null)} onSave={save}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelCls}>Title</label>
              <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <select value={editing.cat} onChange={(e) => setEditing({ ...editing, cat: e.target.value })} className={inputCls}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Author</label>
              <input value={editing.author} onChange={(e) => setEditing({ ...editing, author: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Date</label>
              <input type="date" value={editing.iso} onChange={(e) => setEditing({ ...editing, iso: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Read time</label>
              <input value={editing.read} onChange={(e) => setEditing({ ...editing, read: e.target.value })} className={inputCls} placeholder="5 min" />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Excerpt</label>
              <textarea rows={2} value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} className={inputCls} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Content — use "## Heading" to start a section</label>
              <textarea rows={12} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className={`${inputCls} font-mono leading-relaxed`} placeholder={"Intro paragraph...\n\n## First section\nA paragraph.\nAnother paragraph.\n\n## Second section\nMore text."} />
            </div>
            <label className="sm:col-span-2 flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="size-4 accent-[var(--color-accent)]" />
              Mark as featured
            </label>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* -------------------------------- Products ------------------------------- */

const ICON_KEYS = Object.keys(PRODUCT_ICONS);
const emptyProductForm = {
  id: "",
  name: "",
  tag: "AI Agent",
  status: PRODUCT_STATUSES[0] as string,
  icon: ICON_KEYS[0],
  desc: "",
  tagsText: "",
  featured: false,
};

function ProductAdmin() {
  const [list, setList] = useState<Product[]>([]);
  const [editing, setEditing] = useState<typeof emptyProductForm | null>(null);

  const refresh = () => setList(getStoredProducts());
  useEffect(refresh, []);

  const startNew = () => setEditing({ ...emptyProductForm });
  const startEdit = (p: Product) =>
    setEditing({ id: p.id, name: p.name, tag: p.tag, status: p.status, icon: p.icon, desc: p.desc, tagsText: p.tags.join(", "), featured: !!p.featured });

  const save = () => {
    if (!editing) return;
    if (!editing.name.trim()) return alert("Name is required");
    const id = editing.id || `${slugify(editing.name)}-${Date.now().toString(36)}`;
    const product: Product = {
      id, name: editing.name.trim(), tag: editing.tag.trim() || "Product", status: editing.status,
      icon: editing.icon, desc: editing.desc.trim(),
      tags: editing.tagsText.split(",").map((t) => t.trim()).filter(Boolean),
      featured: editing.featured,
    };
    upsertProduct(product);
    setEditing(null);
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">{list.length} product{list.length === 1 ? "" : "s"}</p>
        <div className="flex gap-2">
          <button onClick={() => { if (confirm("Reset products to defaults?")) { resetProducts(); refresh(); } }} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground">
            <RotateCcw className="size-4" /> Reset
          </button>
          <button onClick={startNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground rounded-xl font-bold text-sm hover:opacity-90">
            <Plus className="size-4" /> New product
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {list.map((p) => {
          const Icon = PRODUCT_ICONS[p.icon] ?? Package;
          return (
            <div key={p.id} className="flex items-center gap-4 bg-surface ring-1 ring-border rounded-2xl p-4">
              <div className="size-11 rounded-xl bg-accent/10 grid place-items-center shrink-0"><Icon className="size-5 text-accent" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-accent uppercase tracking-widest">{p.tag}</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest bg-muted rounded-full px-2 py-0.5">{p.status}</span>
                  {p.featured && <span className="text-[9px] font-mono uppercase tracking-widest bg-accent/15 text-accent rounded-full px-2 py-0.5">Featured</span>}
                </div>
                <h3 className="font-bold truncate">{p.name}</h3>
              </div>
              <button onClick={() => startEdit(p)} className="size-9 grid place-items-center rounded-lg ring-1 ring-border hover:ring-accent hover:text-accent"><Pencil className="size-4" /></button>
              <button onClick={() => { if (confirm(`Delete "${p.name}"?`)) { deleteProduct(p.id); refresh(); } }} className="size-9 grid place-items-center rounded-lg ring-1 ring-border hover:ring-destructive hover:text-destructive"><Trash2 className="size-4" /></button>
            </div>
          );
        })}
      </div>

      {editing && (
        <Modal title={editing.id ? "Edit product" : "New product"} onClose={() => setEditing(null)} onSave={save}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelCls}>Name</label>
              <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Tag / Category</label>
              <input value={editing.tag} onChange={(e) => setEditing({ ...editing, tag: e.target.value })} className={inputCls} placeholder="AI Agent" />
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className={inputCls}>
                {PRODUCT_STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Icon</label>
              <select value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className={inputCls}>
                {ICON_KEYS.map((k) => <option key={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Tech tags (comma-separated)</label>
              <input value={editing.tagsText} onChange={(e) => setEditing({ ...editing, tagsText: e.target.value })} className={inputCls} placeholder="Voice, Support" />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Description</label>
              <textarea rows={3} value={editing.desc} onChange={(e) => setEditing({ ...editing, desc: e.target.value })} className={inputCls} />
            </div>
            <label className="sm:col-span-2 flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="size-4 accent-[var(--color-accent)]" />
              Feature this product (shown large at the top)
            </label>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* --------------------------------- Modal --------------------------------- */

function Modal({ title, children, onClose, onSave }: { title: string; children: React.ReactNode; onClose: () => void; onSave: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-foreground/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-[2rem] ring-1 ring-border p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-typemachine text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="size-9 grid place-items-center rounded-lg hover:bg-muted"><X className="size-5" /></button>
        </div>
        {children}
        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl ring-1 ring-border font-bold text-sm hover:bg-muted">Cancel</button>
          <button onClick={onSave} className="px-6 py-2.5 rounded-xl bg-foreground text-background font-bold text-sm hover:opacity-90">Save</button>
        </div>
      </div>
    </div>
  );
}
