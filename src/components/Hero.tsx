import { useRef } from "react";
import { motion, useScroll } from "motion/react";

import { interp, useScrollStyles } from "@/hooks/use-scroll-styles";
import canopyVideo from "@/assets/jd-canopy.mp4.asset.json";
import poster from "@/assets/canopy-poster.jpg";

const HOTSPOTS = [
  {
    id: "trimming",
    label: "Trimming",
    title: "Tree Trimming",
    copy: "Precision cuts. Healthier growth.",
    pos: "left-[62%] top-[26%]",
  },
  {
    id: "removal",
    label: "Removal",
    title: "Tree Removal",
    copy: "Controlled take-downs in tight spaces.",
    pos: "left-[80%] top-[52%]",
  },
  {
    id: "storm",
    label: "Storm",
    title: "Storm Damage",
    copy: "Emergency response, day or night.",
    pos: "left-[46%] top-[62%]",
  },
  {
    id: "health",
    label: "Health",
    title: "Tree Health",
    copy: "Diagnosis, feeding, structural care.",
    pos: "left-[70%] top-[78%]",
  },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const videoRef = useRef<HTMLVideoElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const spotsRef = useRef<HTMLDivElement>(null);

  useScrollStyles(scrollYProgress, [
    {
      ref: videoRef,
      apply: (el, p) => {
        el.style.transform = `translateY(${interp(p, [0, 1], [0, -6])}%) scale(${interp(p, [0, 1], [1.08, 1.24])})`;
      },
    },
    {
      ref: veilRef,
      apply: (el, p) => {
        el.style.opacity = String(interp(p, [0, 0.5, 1], [0.25, 0.5, 0.72]));
      },
    },
    {
      ref: heroRef,
      apply: (el, p) => {
        el.style.opacity = String(interp(p, [0, 0.18, 0.3], [1, 1, 0]));
        el.style.transform = `translateY(${interp(p, [0, 0.3], [0, -70])}px)`;
      },
    },
    {
      ref: sceneRef,
      apply: (el, p) => {
        el.style.opacity = String(interp(p, [0.32, 0.42, 0.58, 0.66], [0, 1, 1, 0]));
        el.style.transform = `translateY(${interp(p, [0.32, 0.66], [60, -60])}px)`;
      },
    },
    {
      ref: spotsRef,
      apply: (el, p) => {
        el.style.opacity = String(interp(p, [0.68, 0.78], [0, 1]));
      },
    },
  ]);

  return (
    <section ref={ref} id="top" className="relative h-[280vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black grain">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={canopyVideo.url}
          poster={poster.src ?? poster}
          autoPlay
          muted
          playsInline
          preload="auto"
        />
        <div ref={veilRef} className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />

        {/* 01 — HERO */}
        <div
          ref={heroRef}
          className="absolute inset-0 flex flex-col justify-end px-6 pb-20 md:justify-center md:px-14 md:pb-0"
        >
          <div className="max-w-[46rem]">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1.4 }}
              className="eyebrow text-sun"
            >
              JD Tree Service
            </motion.p>

            <h1 className="display mt-6 text-[clamp(3.2rem,11vw,10rem)] text-cream">
              {["Rooted in care.", "Built to last."].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "115%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      delay: 1.7 + i * 0.14,
                      duration: 1.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 1.2 }}
              className="mt-8 max-w-md text-sm leading-relaxed text-cream/70 md:text-base"
            >
              Professional tree care, removal, trimming and emergency response for the places
              you call home.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1.2 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <a
                href="#estimate"
                data-cursor="Get started →"
                className="group eyebrow inline-flex items-center gap-3 rounded-full bg-cream px-7 py-4 text-background transition-colors hover:bg-sun"
              >
                Get a free estimate
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#services"
                className="eyebrow link-underline text-cream/70 hover:text-cream"
              >
                Explore our services ↓
              </a>
            </motion.div>
          </div>
        </div>

        {/* 02 — LOOK CLOSER */}
        <div
          ref={sceneRef}
          className="absolute inset-0 flex flex-col justify-center px-6 md:px-14"
        >
          <p className="eyebrow text-sun/80">01 / Understanding the canopy</p>
          <h2 className="display mt-6 max-w-[16ch] text-[clamp(2.8rem,9vw,8rem)] text-cream">
            Every tree tells a story.
          </h2>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-cream/65">
            Healthy trees don't happen by accident. They need attention, knowledge, and the
            right care at the right time.
          </p>
        </div>

        {/* 03 — THE TREE AS INTERFACE */}
        <div ref={spotsRef} className="absolute inset-0">
          <p className="eyebrow absolute left-6 top-1/2 -translate-y-1/2 text-cream/50 md:left-14">
            02 / The canopy, annotated
          </p>
          {HOTSPOTS.map((h) => (
            <div key={h.id} className={`group absolute ${h.pos} hidden md:block`}>
              <div className="relative flex items-center">
                <span className="block h-1.5 w-1.5 rounded-full bg-sun shadow-[0_0_0_6px_color-mix(in_oklab,var(--sun)_18%,transparent)] transition-transform duration-500 group-hover:scale-150" />
                <span className="ml-0 h-px w-0 bg-cream/40 transition-all duration-500 group-hover:ml-3 group-hover:w-10" />
                <span className="eyebrow ml-3 whitespace-nowrap text-cream/60 transition-colors group-hover:text-cream">
                  {h.label}
                </span>
                <div className="pointer-events-none absolute left-0 top-8 w-60 border-l border-cream/25 pl-4 opacity-0 transition-all duration-500 group-hover:top-6 group-hover:opacity-100">
                  <p className="display text-2xl text-cream">{h.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-cream/60">{h.copy}</p>
                  <p className="eyebrow mt-3 text-sun">Explore →</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="eyebrow absolute bottom-6 right-6 text-cream/35 md:right-14">
          Scroll
        </div>
      </div>
    </section>
  );
}
