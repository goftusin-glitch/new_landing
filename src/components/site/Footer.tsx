import { Link } from "@tanstack/react-router";

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com/goftus_ai" },
  { name: "WhatsApp", href: "https://wa.me/916380654780" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          <div className="col-span-2">
            <Link to="/" className="font-mono font-bold tracking-tighter text-2xl">
              GOFTUS
            </Link>
            <p className="mt-6 text-muted-foreground text-sm max-w-xs">
              AI automation agency and AI agent development company building agentic AI and custom
              AI solutions for businesses across the US, UK, Europe, Dubai, Singapore &amp; Malaysia.
            </p>
          </div>
          <div>
            <p className="font-bold text-sm mb-6">Product</p>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/agents" className="hover:text-accent transition-colors">Agents</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Services</Link></li>
              <li><Link to="/products" className="hover:text-accent transition-colors">Products</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Book Demo</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-sm mb-6">Company</p>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-accent transition-colors">About</Link></li>
              <li><Link to="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-sm mb-6">Legal</p>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-accent transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-accent transition-colors">Terms</Link></li>
              <li><Link to="/security" className="hover:text-accent transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            © 2026 GOFTUS Systems Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-muted-foreground text-[10px] font-mono uppercase tracking-widest">
            {socialLinks.map((item) => (
              <a key={item.name} href={item.href} target="_blank" rel="noreferrer" className="hover:text-accent">
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
