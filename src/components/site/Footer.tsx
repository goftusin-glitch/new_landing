import { Link } from "@tanstack/react-router";

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
              The autonomous infrastructure for the next generation of enterprise automation.
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
              <li><a href="#" className="hover:text-accent transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            © 2026 GOFTUS Systems Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-muted-foreground text-[10px] font-mono uppercase tracking-widest">
            <a href="#" className="hover:text-accent">Twitter</a>
            <a href="#" className="hover:text-accent">LinkedIn</a>
            <a href="#" className="hover:text-accent">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
