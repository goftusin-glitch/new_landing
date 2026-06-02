import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/goftus-mark.png";
const links = [
  { to: "/", label: "Home" },
  { to: "/agents", label: "Agents" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      // Always reveal near the top; otherwise hide on scroll down, show on scroll up.
      if (y < 80) {
        setHidden(false);
      } else if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY);
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full bg-transparent transition-transform duration-300 ease-out ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link to="/" className="justify-self-start flex items-center gap-2" aria-label="GOFTUS home">
          <span className="grid place-items-center size-10 rounded-xl bg-ink p-1.5 ring-1 ring-border/40">
            <img src={logo} alt="GOFTUS" className="h-full w-full object-contain" />
          </span>
          <span className="font-romanica font-bold tracking-wider text-2xl">GOFTUS</span>
        </Link>

        <div className={`hidden md:flex items-center gap-1 justify-self-center rounded-full px-2 py-1.5 ring-1 ring-border/60 backdrop-blur-md transition-colors ${scrolled ? "bg-background/70" : "bg-background/40"}`}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-romanica tracking-wide px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              activeProps={{ className: "text-foreground bg-muted" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 justify-self-end">
          <Link
            to="/contact"
            className="font-romanica tracking-wide hidden sm:inline-flex px-5 py-2 bg-foreground text-background rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Book Demo
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 rounded-md hover:bg-muted"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>



      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="font-romanica tracking-wide text-sm font-medium text-muted-foreground hover:text-foreground py-1.5"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="font-romanica tracking-wide mt-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-semibold text-center"
            >
              Book Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
