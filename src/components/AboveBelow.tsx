import { useRef } from "react";
import { useScroll } from "motion/react";

import { interp, useScrollStyles } from "@/hooks/use-scroll-styles";
import roots from "@/assets/roots.jpg";

export function AboveBelow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const aboveRef = useRef<HTMLHeadingElement>(null);
  const belowRef = useRef<HTMLHeadingElement>(null);
  const soilRef = useRef<HTMLImageElement>(null);

  useScrollStyles(scrollYProgress, [
    {
      ref: aboveRef,
      apply: (el, p) => {
        el.style.opacity = String(interp(p, [0, 0.26, 0.44], [1, 1, 0]));
        el.style.transform = `translateY(${interp(p, [0, 0.45], [0, -140])}px)`;
      },
    },
    {
      ref: belowRef,
      apply: (el, p) => {
        el.style.opacity = String(interp(p, [0.36, 0.5], [0, 1]));
        el.style.transform = `translateY(${interp(p, [0.36, 1], [140, -40])}px)`;
      },
    },
    {
      ref: soilRef,
      apply: (el, p) => {
        el.style.opacity = String(interp(p, [0.25, 0.6], [0, 0.55]));
        el.style.transform = `scale(${interp(p, [0.25, 1], [1.25, 1])})`;
      },
    },
  ]);

  return (
    <section ref={ref} className="relative h-[220vh] bg-background">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden grain">
        <img
          ref={soilRef}
          src={roots}
          alt="Underground root system"
          loading="lazy"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/30 to-background" />

        <h2
          ref={aboveRef}
          className="display absolute text-[clamp(5rem,26vw,22rem)] text-cream"
        >
          Above.
        </h2>
        <h2
          ref={belowRef}
          className="display absolute text-[clamp(5rem,26vw,22rem)] text-sun"
        >
          Below.
        </h2>
      </div>
    </section>
  );
}
