import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Lock, LogOut, FileText, Package, Megaphone, Users,
  Plus, Pencil, Trash2, X, Eye, EyeOff, Upload, CheckCircle2,
  AlertCircle, ChevronDown,
} from "lucide-react";
import { resolveApiBase } from "@/lib/backend-api";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — GOFTUS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

/* ─────────────────────────── auth ─────────────────────────────── */

const TOKEN_KEY = "goftus_admin_token";
const EMAIL_KEY = "goftus_admin_email";
const SUPER_KEY = "goftus_admin_super";

const getAuth = () => ({
  token: typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null,
  email: typeof window !== "undefined" ? localStorage.getItem(EMAIL_KEY) : null,
  isSuper: typeof window !== "undefined" ? localStorage.getItem(SUPER_KEY) === "true" : false,
});

const saveAuth = (token: string, email: string, isSuper: boolean) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EMAIL_KEY, email);
  localStorage.setItem(SUPER_KEY, String(isSuper));
};

const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
  localStorage.removeItem(SUPER_KEY);
};

/* ─────────────────────────── api helpers ────────────────────────── */

const API = resolveApiBase();

const apiFetch = async (path: string, token: string | null, opts: RequestInit = {}) => {
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers as Record<string, string> ?? {}),
    },
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "Request failed");
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json();
};

/* ─────────────────────────── shared ui ─────────────────────────── */

const cls = {
  input: "w-full px-4 py-2.5 bg-background ring-1 ring-border rounded-xl focus:ring-accent focus:outline-none text-sm transition-colors",
  label: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5",
  btn: {
    primary: "inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-xl text-sm font-bold hover:opacity-90 active:scale-95 transition-all",
    accent: "inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground rounded-xl text-sm font-bold hover:opacity-90 active:scale-95 transition-all",
    ghost: "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
    danger: "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-destructive hover:bg-destructive/10 transition-colors",
    icon: "size-8 grid place-items-center rounded-lg ring-1 ring-border hover:ring-accent hover:text-accent transition-colors",
    iconDanger: "size-8 grid place-items-center rounded-lg ring-1 ring-border hover:ring-destructive hover:text-destructive transition-colors",
  },
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={cls.label}>{label}</label>
      {children}
    </div>
  );
}

function Toast({ msg, ok }: { msg: string; ok: boolean }) {
  return (
    <div className={`fixed bottom-6 right-6 z-100 flex items-center gap-3 rounded-2xl px-5 py-3 ring-1 text-sm font-bold shadow-xl ${ok ? "bg-surface ring-accent/40 text-foreground" : "bg-surface ring-destructive/40 text-destructive"}`}>
      {ok ? <CheckCircle2 className="size-4 text-accent shrink-0" /> : <AlertCircle className="size-4 shrink-0" />}
      {msg}
    </div>
  );
}

function Modal({ title, onClose, onSave, saving, children }: {
  title: string; onClose: () => void; onSave: () => void; saving?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-start overflow-y-auto bg-foreground/40 backdrop-blur-sm p-4 pt-16" onClick={onClose}>
      <div className="w-full max-w-2xl mx-auto bg-background rounded-[2rem] ring-1 ring-border p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-typemachine text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className={cls.btn.icon}><X className="size-4" /></button>
        </div>
        <div className="space-y-4">{children}</div>
        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
          <button onClick={onClose} className={cls.btn.ghost}>Cancel</button>
          <button onClick={onSave} disabled={saving} className={cls.btn.primary}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── main page ─────────────────────────── */

type Tab = "posts" | "products" | "banners" | "users";

function AdminPage() {
  const [auth, setAuth] = useState(getAuth);
  const [tab, setTab] = useState<Tab>("posts");
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const notify = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const logout = () => { clearAuth(); setAuth(getAuth()); };

  if (!auth.token) {
    return <LoginPage onLogin={(t, e, s) => { saveAuth(t, e, s); setAuth(getAuth()); }} />;
  }

  const tabs: { id: Tab; label: string; icon: typeof FileText; superOnly?: boolean }[] = [
    { id: "posts", label: "Posts", icon: FileText },
    { id: "products", label: "Products", icon: Package },
    { id: "banners", label: "Banners", icon: Megaphone },
    { id: "users", label: "Users", icon: Users, superOnly: true },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-romanica font-bold text-xl tracking-wider">GOFTUS</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent bg-accent/10 px-2 py-1 rounded-full">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground hidden sm:block">{auth.email}</span>
            {auth.isSuper && <span className="text-[10px] font-mono uppercase tracking-widest text-accent bg-accent/10 px-2 py-1 rounded-full">Super</span>}
            <button onClick={logout} className={cls.btn.ghost}><LogOut className="size-4" /> Sign out</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.filter(t => !t.superOnly || auth.isSuper).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                tab === t.id ? "bg-foreground text-background" : "bg-surface ring-1 ring-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="size-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === "posts" && <PostsTab token={auth.token} notify={notify} />}
        {tab === "products" && <ProductsTab token={auth.token} notify={notify} />}
        {tab === "banners" && <BannersTab token={auth.token} notify={notify} />}
        {tab === "users" && auth.isSuper && <UsersTab token={auth.token} notify={notify} />}
      </div>

      {toast && <Toast msg={toast.msg} ok={toast.ok} />}
    </div>
  );
}

/* ─────────────────────────── login ─────────────────────────────── */

function LoginPage({ onLogin }: { onLogin: (token: string, email: string, isSuper: boolean) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch("/admin/login", null, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      onLogin(data.token, data.email, Boolean(data.isSuperAdmin));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-surface ring-1 ring-border rounded-[2rem] p-10">
          <div className="size-12 rounded-2xl bg-accent text-accent-foreground grid place-items-center mb-6">
            <Lock className="size-5" />
          </div>
          <h1 className="font-typemachine text-3xl font-bold mb-1">Admin</h1>
          <p className="text-muted-foreground text-sm mb-8">Sign in to manage GOFTUS content.</p>

          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <AlertCircle className="size-4 shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <Field label="Email">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={cls.input} required autoFocus />
            </Field>
            <Field label="Password">
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className={`${cls.input} pr-10`} required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </Field>
            <button type="submit" disabled={loading} className={`${cls.btn.primary} w-full justify-center mt-2`}>
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── posts tab ─────────────────────────── */

type Post = {
  id: string | number; title: string; slug: string; status: string;
  author?: string; published_at?: string; updated_at?: string;
  excerpt?: string; content?: string; cover_image?: string;
  is_featured?: boolean; is_trending?: boolean; hub_category?: string;
  tags?: string; content_type?: string;
};

const POST_CATS = ["AI Agents", "Agentic AI", "Automation", "Product Development", "Tutorials", "Case Studies"];

const emptyPost = {
  title: "", slug: "", excerpt: "", content: "", author: "GOFTUS Team",
  hub_category: POST_CATS[0], tags: "", cover_image: "",
  is_featured: false, is_trending: false,
};

function PostsTab({ token, notify }: { token: string; notify: (m: string, ok?: boolean) => void }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editing, setEditing] = useState<typeof emptyPost & { id?: string | number } | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const d = await apiFetch("/admin/posts", token);
      setPosts(d.posts || []);
    } catch (e) {
      notify((e as Error).message, false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = posts.filter((p) => {
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const startEdit = (p: Post) => setEditing({
    id: p.id, title: p.title, slug: p.slug, excerpt: p.excerpt ?? "",
    content: p.content ?? "", author: p.author ?? "GOFTUS Team",
    hub_category: p.hub_category ?? POST_CATS[0],
    tags: Array.isArray(p.tags) ? (p.tags as unknown as string[]).join(", ") : (p.tags ?? ""),
    cover_image: p.cover_image ?? "", is_featured: !!p.is_featured, is_trending: !!p.is_trending,
  });

  const save = async () => {
    if (!editing || !editing.title.trim()) return notify("Title required", false);
    setSaving(true);
    try {
      const payload = {
        title: editing.title.trim(),
        slug: editing.slug.trim() || editing.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        excerpt: editing.excerpt.trim(),
        content: editing.content.trim(),
        author: editing.author.trim() || "GOFTUS Team",
        hub_category: editing.hub_category,
        tags: editing.tags,
        cover_image: editing.cover_image.trim() || null,
        is_featured: editing.is_featured,
        is_trending: editing.is_trending,
      };
      if (editing.id) {
        await apiFetch(`/admin/posts/${editing.id}`, token, { method: "PUT", body: JSON.stringify(payload) });
        notify("Post updated");
      } else {
        await apiFetch("/admin/posts", token, { method: "POST", body: JSON.stringify(payload) });
        notify("Post created");
      }
      setEditing(null);
      load();
    } catch (e) {
      notify((e as Error).message, false);
    } finally {
      setSaving(false);
    }
  };

  const del = async (p: Post) => {
    if (!confirm(`Delete "${p.title}"?`)) return;
    try {
      await apiFetch(`/admin/posts/${p.id}`, token, { method: "DELETE" });
      notify("Post deleted");
      load();
    } catch (e) {
      notify((e as Error).message, false);
    }
  };

  const toggle = async (p: Post) => {
    try {
      const action = p.status === "published" ? "unpublish" : "publish";
      await apiFetch(`/admin/posts/${p.id}/${action}`, token, { method: "POST" });
      notify(action === "publish" ? "Published" : "Unpublished");
      load();
    } catch (e) {
      notify((e as Error).message, false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="font-typemachine text-2xl font-bold">Posts</h2>
        <button onClick={() => setEditing({ ...emptyPost })} className={cls.btn.accent}><Plus className="size-4" /> New post</button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts…" className={`${cls.input} max-w-xs`} />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={`${cls.input} w-auto`}>
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {loading ? (
        <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 bg-surface rounded-2xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-2">
          {filtered.map((p) => (
            <div key={p.id} className="flex items-center gap-4 bg-surface ring-1 ring-border rounded-2xl px-5 py-4 hover:ring-accent/40 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full ring-1 ${p.status === "published" ? "text-accent ring-accent/30 bg-accent/10" : "text-muted-foreground ring-border bg-muted/30"}`}>
                    {p.status}
                  </span>
                  {p.is_featured && <span className="text-[10px] font-mono uppercase tracking-widest text-accent bg-accent/10 rounded-full px-2 py-0.5">Featured</span>}
                  <span className="text-[10px] font-mono text-muted-foreground">{p.hub_category}</span>
                </div>
                <h3 className="font-bold truncate">{p.title}</h3>
                <p className="text-xs text-muted-foreground truncate">/blog/{p.slug} · {p.author}</p>
              </div>
              <button onClick={() => toggle(p)} title={p.status === "published" ? "Unpublish" : "Publish"} className={cls.btn.icon}>
                {p.status === "published" ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
              <button onClick={() => startEdit(p)} className={cls.btn.icon}><Pencil className="size-4" /></button>
              <button onClick={() => del(p)} className={cls.btn.iconDanger}><Trash2 className="size-4" /></button>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">No posts found.</p>}
        </div>
      )}

      {editing && (
        <Modal title={editing.id ? "Edit post" : "New post"} onClose={() => setEditing(null)} onSave={save} saving={saving}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Title"><input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={cls.input} /></Field>
            <Field label="Slug (auto if blank)"><input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className={cls.input} placeholder="auto-generated" /></Field>
            <Field label="Author"><input value={editing.author} onChange={(e) => setEditing({ ...editing, author: e.target.value })} className={cls.input} /></Field>
            <Field label="Category">
              <select value={editing.hub_category} onChange={(e) => setEditing({ ...editing, hub_category: e.target.value })} className={cls.input}>
                {POST_CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Tags (comma-separated)"><input value={editing.tags} onChange={(e) => setEditing({ ...editing, tags: e.target.value })} className={cls.input} placeholder="AI, Agents" /></Field>
            <Field label="Cover image URL"><input value={editing.cover_image} onChange={(e) => setEditing({ ...editing, cover_image: e.target.value })} className={cls.input} placeholder="https://…" /></Field>
            <div className="sm:col-span-2">
              <Field label="Excerpt">
                <textarea rows={2} value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} className={cls.input} />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Content (Markdown)">
                <textarea rows={14} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className={`${cls.input} font-mono text-xs leading-relaxed`} placeholder={"# Introduction\n\nYour content here...\n\n## Section\n\nMore text."} />
              </Field>
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
              <input type="checkbox" checked={editing.is_featured} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} className="size-4 accent-(--color-accent)" />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
              <input type="checkbox" checked={editing.is_trending} onChange={(e) => setEditing({ ...editing, is_trending: e.target.checked })} className="size-4 accent-(--color-accent)" />
              Trending
            </label>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ─────────────────────────── products tab ───────────────────────── */

type Product = { id: string | number; name: string; description?: string; benefits?: string; image_url?: string; link?: string; subtitle?: string; status?: string; };

const emptyProduct = { name: "", description: "", benefits: "", image_url: "", link: "", subtitle: "product_snapshot", status: "active" };

function ProductsTab({ token, notify }: { token: string; notify: (m: string, ok?: boolean) => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<typeof emptyProduct & { id?: string | number } | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const d = await apiFetch("/admin/products", token);
      setProducts(d.products || []);
    } catch (e) {
      notify((e as Error).message, false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const startEdit = (p: Product) => setEditing({
    id: p.id, name: p.name, description: p.description ?? "",
    benefits: typeof p.benefits === "string" ? p.benefits : JSON.stringify(p.benefits ?? ""),
    image_url: p.image_url ?? "", link: p.link ?? "",
    subtitle: p.subtitle ?? "product_snapshot", status: p.status ?? "active",
  });

  const save = async () => {
    if (!editing || !editing.name.trim()) return notify("Name required", false);
    setSaving(true);
    try {
      const payload = { name: editing.name.trim(), description: editing.description.trim(), benefits: editing.benefits.trim(), image_url: editing.image_url.trim() || null, link: editing.link.trim() || null, subtitle: editing.subtitle, status: editing.status };
      if (editing.id) {
        await apiFetch(`/admin/products/${editing.id}`, token, { method: "PUT", body: JSON.stringify(payload) });
        notify("Product updated");
      } else {
        await apiFetch("/admin/products", token, { method: "POST", body: JSON.stringify(payload) });
        notify("Product created");
      }
      setEditing(null);
      load();
    } catch (e) {
      notify((e as Error).message, false);
    } finally {
      setSaving(false);
    }
  };

  const del = async (p: Product) => {
    if (!confirm(`Delete "${p.name}"?`)) return;
    try {
      await apiFetch(`/admin/products/${p.id}`, token, { method: "DELETE" });
      notify("Product deleted");
      load();
    } catch (e) {
      notify((e as Error).message, false);
    }
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const d = await apiFetch("/admin/products/upload-image", token, { method: "POST", body: JSON.stringify({ dataUrl: reader.result, filename: file.name }) });
        setEditing((prev) => prev ? { ...prev, image_url: d.url } : prev);
        notify("Image uploaded");
        setUploading(false);
      };
    } catch (e) {
      notify((e as Error).message, false);
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="font-typemachine text-2xl font-bold">Products</h2>
        <button onClick={() => setEditing({ ...emptyProduct })} className={cls.btn.accent}><Plus className="size-4" /> New product</button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 gap-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 bg-surface rounded-2xl animate-pulse" />)}</div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-4 bg-surface ring-1 ring-border rounded-2xl p-4 hover:ring-accent/40 transition-colors">
              {p.image_url ? (
                <img src={p.image_url} alt={p.name} className="size-14 rounded-xl object-cover ring-1 ring-border shrink-0" />
              ) : (
                <div className="size-14 rounded-xl bg-accent/10 grid place-items-center shrink-0"><Package className="size-5 text-accent" /></div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-mono text-accent uppercase tracking-widest">{p.subtitle === "live_product" ? "Live Product" : "Snapshot"}</span>
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full ring-1 ${p.status === "active" ? "text-accent ring-accent/30 bg-accent/10" : "text-muted-foreground ring-border bg-muted/30"}`}>{p.status}</span>
                </div>
                <h3 className="font-bold truncate">{p.name}</h3>
              </div>
              <button onClick={() => startEdit(p)} className={cls.btn.icon}><Pencil className="size-4" /></button>
              <button onClick={() => del(p)} className={cls.btn.iconDanger}><Trash2 className="size-4" /></button>
            </div>
          ))}
          {products.length === 0 && <p className="col-span-2 text-center text-muted-foreground py-12">No products yet.</p>}
        </div>
      )}

      {editing && (
        <Modal title={editing.id ? "Edit product" : "New product"} onClose={() => setEditing(null)} onSave={save} saving={saving}>
          <Field label="Name"><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={cls.input} /></Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Type">
              <select value={editing.subtitle} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} className={cls.input}>
                <option value="product_snapshot">Product Snapshot</option>
                <option value="live_product">Live Product</option>
              </select>
            </Field>
            <Field label="Status">
              <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className={cls.input}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </Field>
          </div>
          <Field label="Description"><textarea rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className={cls.input} /></Field>
          <Field label="Benefits (one per line or comma-separated)"><textarea rows={3} value={editing.benefits} onChange={(e) => setEditing({ ...editing, benefits: e.target.value })} className={cls.input} placeholder="Real-time tracking, Automated alerts…" /></Field>
          <Field label="Product link (optional)"><input value={editing.link} onChange={(e) => setEditing({ ...editing, link: e.target.value })} className={cls.input} placeholder="https://…" /></Field>
          <Field label="Image">
            <div className="flex gap-3 items-start">
              <input value={editing.image_url} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} className={cls.input} placeholder="https://… or upload below" />
              <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className={`${cls.btn.ghost} shrink-0`}>
                <Upload className="size-4" /> {uploading ? "…" : "Upload"}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); }} />
            </div>
            {editing.image_url && <img src={editing.image_url} className="mt-3 h-28 rounded-xl object-cover ring-1 ring-border" alt="preview" />}
          </Field>
        </Modal>
      )}
    </div>
  );
}

/* ─────────────────────────── banners tab ───────────────────────── */

type Banner = { id: string | number; product: string; message: string; href?: string; is_active: boolean; };
const emptyBanner = { product: "", message: "", href: "", is_active: false };

function BannersTab({ token, notify }: { token: string; notify: (m: string, ok?: boolean) => void }) {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<typeof emptyBanner & { id?: string | number } | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const d = await apiFetch("/admin/banners", token);
      setBanners(d.banners || []);
    } catch (e) {
      notify((e as Error).message, false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const startEdit = (b: Banner) => setEditing({ id: b.id, product: b.product, message: b.message, href: b.href ?? "", is_active: b.is_active });

  const save = async () => {
    if (!editing || !editing.product.trim() || !editing.message.trim()) return notify("Product and message required", false);
    setSaving(true);
    try {
      const payload = { product: editing.product.trim(), message: editing.message.trim(), href: editing.href?.trim() || null, is_active: editing.is_active };
      if (editing.id) {
        await apiFetch(`/admin/banners/${editing.id}`, token, { method: "PUT", body: JSON.stringify(payload) });
        notify("Banner updated");
      } else {
        await apiFetch("/admin/banners", token, { method: "POST", body: JSON.stringify(payload) });
        notify("Banner created");
      }
      setEditing(null);
      load();
    } catch (e) {
      notify((e as Error).message, false);
    } finally {
      setSaving(false);
    }
  };

  const del = async (b: Banner) => {
    if (!confirm(`Delete banner for "${b.product}"?`)) return;
    try {
      await apiFetch(`/admin/banners/${b.id}`, token, { method: "DELETE" });
      notify("Banner deleted");
      load();
    } catch (e) {
      notify((e as Error).message, false);
    }
  };

  const toggleActive = async (b: Banner) => {
    try {
      const action = b.is_active ? "deactivate" : "activate";
      await apiFetch(`/admin/banners/${b.id}/${action}`, token, { method: "POST" });
      notify(b.is_active ? "Deactivated" : "Activated");
      load();
    } catch (e) {
      notify((e as Error).message, false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="font-typemachine text-2xl font-bold">Banners</h2>
        <button onClick={() => setEditing({ ...emptyBanner })} className={cls.btn.accent}><Plus className="size-4" /> New banner</button>
      </div>

      {loading ? (
        <div className="space-y-2">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-16 bg-surface rounded-2xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-2">
          {banners.map((b) => (
            <div key={b.id} className="flex items-center gap-4 bg-surface ring-1 ring-border rounded-2xl px-5 py-4 hover:ring-accent/40 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full ring-1 ${b.is_active ? "text-accent ring-accent/30 bg-accent/10" : "text-muted-foreground ring-border bg-muted/30"}`}>
                    {b.is_active ? "Active" : "Inactive"}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">{b.product}</span>
                </div>
                <p className="text-sm truncate">{b.message}</p>
                {b.href && <p className="text-xs text-muted-foreground truncate">{b.href}</p>}
              </div>
              <button onClick={() => toggleActive(b)} className={cls.btn.icon} title={b.is_active ? "Deactivate" : "Activate"}>
                {b.is_active ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
              <button onClick={() => startEdit(b)} className={cls.btn.icon}><Pencil className="size-4" /></button>
              <button onClick={() => del(b)} className={cls.btn.iconDanger}><Trash2 className="size-4" /></button>
            </div>
          ))}
          {banners.length === 0 && <p className="text-center text-muted-foreground py-12">No banners yet.</p>}
        </div>
      )}

      {editing && (
        <Modal title={editing.id ? "Edit banner" : "New banner"} onClose={() => setEditing(null)} onSave={save} saving={saving}>
          <Field label="Product name"><input value={editing.product} onChange={(e) => setEditing({ ...editing, product: e.target.value })} className={cls.input} placeholder="e.g. Callflow AI" /></Field>
          <Field label="Message"><textarea rows={2} value={editing.message} onChange={(e) => setEditing({ ...editing, message: e.target.value })} className={cls.input} placeholder="Banner message shown to users" /></Field>
          <Field label="Link (optional)"><input value={editing.href} onChange={(e) => setEditing({ ...editing, href: e.target.value })} className={cls.input} placeholder="https://…" /></Field>
          <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
            <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} className="size-4 accent-(--color-accent)" />
            Make active immediately
          </label>
        </Modal>
      )}
    </div>
  );
}

/* ─────────────────────────── users tab ─────────────────────────── */

type AdminUser = { id: string | number; email: string; created_at?: string; };

function UsersTab({ token, notify }: { token: string; notify: (m: string, ok?: boolean) => void }) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const d = await apiFetch("/admin/users", token);
      setUsers(d.users || []);
    } catch (e) {
      notify((e as Error).message, false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newPassword.trim()) return notify("Email and password required", false);
    setSaving(true);
    try {
      await apiFetch("/admin/users", token, { method: "POST", body: JSON.stringify({ email: newEmail.trim(), password: newPassword.trim() }) });
      notify("User created");
      setNewEmail(""); setNewPassword(""); setShowForm(false);
      load();
    } catch (e) {
      notify((e as Error).message, false);
    } finally {
      setSaving(false);
    }
  };

  const del = async (u: AdminUser) => {
    if (!confirm(`Remove admin access for ${u.email}?`)) return;
    try {
      await apiFetch(`/admin/users/${u.id}`, token, { method: "DELETE" });
      notify("User removed");
      load();
    } catch (e) {
      notify((e as Error).message, false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="font-typemachine text-2xl font-bold">Admin users</h2>
        <button onClick={() => setShowForm(!showForm)} className={cls.btn.accent}><Plus className="size-4" /> Add user</button>
      </div>

      {showForm && (
        <form onSubmit={create} className="bg-surface ring-1 ring-border rounded-2xl p-6 mb-6 grid sm:grid-cols-3 gap-4 items-end">
          <Field label="Email"><input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className={cls.input} required /></Field>
          <Field label="Password"><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={cls.input} required /></Field>
          <button type="submit" disabled={saving} className={cls.btn.primary}>{saving ? "Adding…" : "Add user"}</button>
        </form>
      )}

      {loading ? (
        <div className="space-y-2">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-14 bg-surface rounded-2xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-2">
          {users.map((u) => (
            <div key={u.id} className="flex items-center gap-4 bg-surface ring-1 ring-border rounded-2xl px-5 py-4 hover:ring-accent/40 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="font-bold">{u.email}</p>
                {u.created_at && <p className="text-xs text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</p>}
              </div>
              <button onClick={() => del(u)} className={cls.btn.iconDanger}><Trash2 className="size-4" /></button>
            </div>
          ))}
          {users.length === 0 && <p className="text-center text-muted-foreground py-12">No sub-admins yet.</p>}
        </div>
      )}
    </div>
  );
}
