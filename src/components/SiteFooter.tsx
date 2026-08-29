export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background px-6 py-14 md:px-14">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display text-4xl text-cream md:text-6xl">JD Tree Service</p>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-cream/45">
            Licensed and insured tree care. Removal, trimming, stump grinding and 24/7 storm
            response.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-3">
          <a href="tel:+15550142873" className="eyebrow text-cream/60 link-underline">
            (555) 014-2873
          </a>
          <a href="mailto:hello@jdtreeservice.com" className="eyebrow text-cream/60 link-underline">
            hello@jdtreeservice.com
          </a>
          <a href="#estimate" className="eyebrow text-sun link-underline">
            Free estimate →
          </a>
        </div>
      </div>
      <p className="eyebrow mt-14 text-cream/25">
        © {new Date().getFullYear()} JD Tree Service — Rooted in care. Built to last.
      </p>
    </footer>
  );
}
