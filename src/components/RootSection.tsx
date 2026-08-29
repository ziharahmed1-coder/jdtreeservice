import { FadeUp, Reveal } from "./Reveal";

const ITEMS = [
  { n: "01", t: "Tree Health", d: "Disease, decay and vigour assessment before it becomes a loss." },
  { n: "02", t: "Root Management", d: "Protecting foundations, drives and drainage from root conflict." },
  { n: "03", t: "Stump Grinding", d: "Ground below grade, backfilled, ready to plant or pave." },
  { n: "04", t: "Risk Assessment", d: "Structural evaluation of lean, load and failure points." },
];

export function RootSection() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-32 md:px-14 md:py-48">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="eyebrow text-sun/80">03 / Beneath the surface</p>
          <h2 className="display mt-8 text-[clamp(2.6rem,7vw,6rem)] text-cream">
            <Reveal>What you don't see</Reveal>
            <Reveal delay={0.08}>still matters.</Reveal>
          </h2>
          <FadeUp delay={0.2}>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-cream/60">
              From root systems to structural stability, our approach looks beyond what's
              visible. Most tree failures begin somewhere nobody was looking.
            </p>
          </FadeUp>
        </div>

        <div className="md:col-span-6 md:pt-16">
          {ITEMS.map((it, i) => (
            <FadeUp key={it.n} delay={i * 0.06}>
              <div
                data-cursor="Explore →"
                className="group flex items-baseline gap-6 border-t border-border py-7 transition-colors hover:border-sun/50"
              >
                <span className="eyebrow text-cream/35">{it.n}</span>
                <div className="flex-1">
                  <h3 className="display text-3xl text-cream transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                    {it.t}
                  </h3>
                  <p className="mt-2 max-w-sm text-xs leading-relaxed text-cream/50">{it.d}</p>
                </div>
                <span className="text-cream/30 transition-all duration-500 group-hover:translate-x-1 group-hover:text-sun">
                  →
                </span>
              </div>
            </FadeUp>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}
