import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import canopyVideo from "@/assets/jd-canopy.mp4.asset.json";
import poster from "@/assets/canopy-poster.jpg";

export function CinematicCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [0, 0.45, 0.15]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-black grain">
      <motion.video
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity, scale }}
        src={canopyVideo.url}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/80" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow text-sun">JD Tree Service</p>
        <h2 className="display mt-8 text-[clamp(2.8rem,10vw,9rem)] text-cream">
          <span className="block">Let's take</span>
          <span className="block">care of your trees.</span>
        </h2>
        <p className="mt-8 max-w-sm text-sm text-cream/60">
          Tell us what you need. We'll take it from there.
        </p>
        <a
          href="#estimate"
          data-cursor="Get started →"
          className="group eyebrow mt-10 inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 text-background transition-colors hover:bg-sun"
        >
          Get your free estimate
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
        <a href="tel:+15550142873" className="eyebrow mt-6 text-cream/50 link-underline">
          (555) 014-2873
        </a>
      </div>
    </section>
  );
}
