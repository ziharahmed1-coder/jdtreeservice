import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import removal from "@/assets/svc-removal.jpg";
import trimming from "@/assets/svc-trimming.jpg";
import storm from "@/assets/svc-storm.jpg";

const PANELS = [
  {
    n: "01",
    title: ["Tree", "Removal"],
    img: removal,
    statement: "Safe. Controlled. Precise.",
    copy: "Rigging and sectional dismantling for trees that can't simply be felled — over roofs, fences and power lines.",
    tone: "dark" as const,
  },
  {
    n: "02",
    title: ["Tree", "Trimming"],
    img: trimming,
    statement: "Shape the canopy. Preserve the tree.",
    copy: "Crown thinning, raising and reduction by ANSI A300 standards — light where you need it, structure where the tree needs it.",
    tone: "light" as const,
  },
  {
    n: "03",
    title: ["Storm", "Damage"],
    img: storm,
    statement: "When nature doesn't wait.",
    copy: "Hazard clearing, emergency limb removal and property make-safe. We answer the phone at 3am.",
    tone: "storm" as const,
  },
];

function Panel({ panel, index }: { panel: (typeof PANELS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div
      ref={ref}
      data-cursor="Explore →"
      className="group sticky top-0 h-screen w-full overflow-hidden grain"
      style={{ zIndex: index + 1 }}
    >
      <motion.img
        src={panel.img}
        alt={panel.title.join(" ")}
        loading="lazy"
        width={1600}
        height={1008}
        style={{ y: imgY }}
        className="absolute inset-0 h-[116%] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
      />
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          panel.tone === "light"
            ? "bg-background/55 group-hover:bg-background/35"
            : "bg-background/70 group-hover:bg-background/55"
        }`}
      />
      {panel.tone === "storm" && (
        <div className="pointer-events-none absolute inset-0 opacity-60">
          {Array.from({ length: 26 }).map((_, i) => (
            <span
              key={i}
              className="absolute w-px bg-cream/25"
              style={{
                left: `${(i * 3.9) % 100}%`,
                top: `${(i * 13) % 100}%`,
                height: `${18 + (i % 5) * 10}px`,
                transform: "rotate(12deg)",
                animation: `drift ${5 + (i % 4)}s linear infinite`,
                animationDelay: `${i * 0.23}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative flex h-full flex-col justify-between px-6 py-24 md:px-14 md:py-20">
        <div className="flex items-start justify-between">
          <span className="eyebrow text-cream/50">{panel.n}</span>
          <span className="eyebrow text-cream/50">JD Tree Service</span>
        </div>

        <div>
          <h3 className="display text-[clamp(3rem,13vw,11rem)] text-cream">
            {panel.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h3>
          <div className="mt-6 max-w-lg overflow-hidden">
            <div className="translate-y-4 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="eyebrow text-sun">{panel.statement}</p>
              <p className="mt-4 text-sm leading-relaxed text-cream/70">{panel.copy}</p>
              <a
                href="#estimate"
                className="eyebrow mt-6 inline-flex items-center gap-3 text-cream link-underline"
              >
                Learn more <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative bg-background">
      <div className="px-6 py-28 md:px-14">
        <p className="eyebrow text-sun/80">04 / What we do</p>
        <h2 className="display mt-6 max-w-[14ch] text-[clamp(2.5rem,7vw,6rem)] text-cream">
          Every service, one standard.
        </h2>
      </div>
      {PANELS.map((p, i) => (
        <Panel key={p.n} panel={p} index={i} />
      ))}
    </section>
  );
}
