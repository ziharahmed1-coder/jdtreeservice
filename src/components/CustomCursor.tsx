import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.4 });
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(el ? el.dataset["cursor"] || null : null);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cream/70 text-[9px] font-medium uppercase tracking-[0.28em] text-cream mix-blend-difference"
        animate={
          label
            ? { width: 108, height: 108, backgroundColor: "rgba(255,255,255,0.06)" }
            : { width: 12, height: 12, backgroundColor: "rgba(255,255,255,0)" }
        }
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="whitespace-nowrap px-2 text-center">{label}</span>
      </motion.div>
    </motion.div>
  );
}
