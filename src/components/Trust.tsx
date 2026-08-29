import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

import { FadeUp } from "./Reveal";

// PLACEHOLDER FIGURES — replace with JD Tree Service's real numbers.
const STATS = [
  { value: 500, suffix: "+", label: "Trees cared for" },
  { value: 10, suffix: "+", label: "Years experience" },
  { value: 100, suffix: "%", label: "Commitment to safety" },
];

const QUOTES = [
  {
    q: "JD Tree Service took down a leaning oak six feet from our roof and you'd never know a crew had been here.",
    a: "Marcus D.",
    r: "Homeowner",
  },
  {
    q: "They showed up the night the storm hit. Cleared the drive, made the property safe, came back the next day to finish properly.",
    a: "Elena R.",
    r: "Property manager",
  },
  {
    q: "Honest quote, no upsell, and the trimming actually made the yard feel twice as big.",
    a: "Tom W.",
    r: "Homeowner",
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1600);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="display text-[clamp(3.5rem,12vw,9rem)] text-cream">
      {n}
      <span className="text-sun">{suffix}</span>
    </span>
  );
}

export function Trust() {
  return (
    <section className="bg-background px-6 py-32 md:px-14 md:py-48">
      <p className="eyebrow text-sun/80">07 / Proof</p>

      <div className="mt-16 grid gap-14 md:grid-cols-3">
        {STATS.map((s) => (
          <FadeUp key={s.label}>
            <div className="border-t border-border pt-8">
              <Counter value={s.value} suffix={s.suffix} />
              <p className="eyebrow mt-4 text-cream/50">{s.label}</p>
            </div>
          </FadeUp>
        ))}
      </div>

      <div className="mt-32 grid gap-10 md:grid-cols-3">
        {QUOTES.map((c, i) => (
          <FadeUp key={c.a} delay={i * 0.08}>
            <figure className="flex h-full flex-col justify-between border-l border-border pl-6">
              <blockquote className="display text-2xl leading-tight text-cream/90 md:text-3xl">
                “{c.q}”
              </blockquote>
              <figcaption className="mt-8">
                <p className="text-xs tracking-widest text-sun">★★★★★</p>
                <p className="eyebrow mt-3 text-cream/70">{c.a}</p>
                <p className="mt-1 text-[11px] text-cream/40">{c.r}</p>
              </figcaption>
            </figure>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
