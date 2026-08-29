import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import roots from "@/assets/roots.jpg";

export function AboveBelow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const aboveOpacity = useTransform(scrollYProgress, [0, 0.28, 0.42], [1, 1, 0]);
  const aboveY = useTransform(scrollYProgress, [0, 0.45], ["0px", "-140px"]);
  const belowOpacity = useTransform(scrollYProgress, [0.48, 0.66], [0, 1]);
  const belowY = useTransform(scrollYProgress, [0.48, 1], ["140px", "-40px"]);
  const soilOpacity = useTransform(scrollYProgress, [0.35, 0.72], [0, 0.55]);
  const soilScale = useTransform(scrollYProgress, [0.35, 1], [1.25, 1]);

  return (
    <section ref={ref} className="relative h-[220vh] bg-background">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden grain">
        <motion.img
          src={roots}
          alt="Underground root system"
          loading="lazy"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: soilOpacity, scale: soilScale }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/30 to-background" />

        <motion.h2
          style={{ opacity: aboveOpacity, y: aboveY }}
          className="display absolute text-[clamp(5rem,26vw,22rem)] text-cream"
        >
          Above.
        </motion.h2>
        <motion.h2
          style={{ opacity: belowOpacity, y: belowY }}
          className="display absolute text-[clamp(5rem,26vw,22rem)] text-sun"
        >
          Below.
        </motion.h2>
      </div>
    </section>
  );
}
