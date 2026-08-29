import { useEffect, useState } from "react";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Method", href: "#method" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#estimate" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between p-5 md:p-8">
      <a
        href="#top"
        className={`pointer-events-auto eyebrow rounded-full px-4 py-2.5 transition-all duration-700 ${
          scrolled ? "glass-pill text-cream" : "text-cream/80"
        }`}
      >
        JD Tree Service
      </a>

      <nav
        className={`pointer-events-auto hidden items-center gap-7 rounded-full px-6 py-2.5 transition-all duration-700 md:flex ${
          scrolled ? "glass-pill" : ""
        }`}
      >
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="eyebrow link-underline text-cream/70 transition-colors hover:text-cream"
          >
            {l.label}
          </a>
        ))}
        <a
          href="tel:+15550142873"
          data-cursor="Call"
          className="eyebrow rounded-full bg-primary px-4 py-2 text-primary-foreground transition-opacity hover:opacity-85"
        >
          (555) 014-2873
        </a>
      </nav>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        className={`pointer-events-auto eyebrow rounded-full px-4 py-2.5 text-cream transition-all duration-700 md:hidden ${
          scrolled ? "glass-pill" : ""
        }`}
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <div className="pointer-events-auto fixed inset-0 top-0 z-40 flex flex-col justify-center gap-6 bg-background/95 px-8 backdrop-blur-xl md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="display text-5xl text-cream"
            >
              {l.label}
            </a>
          ))}
          <a href="tel:+15550142873" className="eyebrow mt-6 text-primary">
            (555) 014-2873
          </a>
        </div>
      )}
    </header>
  );
}
