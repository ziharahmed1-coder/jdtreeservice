import { useCallback, useRef, useState } from "react";

import before from "@/assets/before.jpg";
import after from "@/assets/after.jpg";

export function BeforeAfter() {
  const [pos, setPos] = useState(48);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <section id="results" className="relative bg-background px-0 py-28">
      <div className="px-6 md:px-14">
        <p className="eyebrow text-sun/80">05 / The result</p>
        <h2 className="display mt-6 text-[clamp(2.5rem,7vw,6rem)] text-cream">
          Drag to reveal.
        </h2>
      </div>

      <div
        ref={ref}
        data-cursor="Drag →"
        className="relative mt-12 h-[70vh] w-full cursor-ew-resize select-none overflow-hidden md:h-[88vh]"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && move(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
      >
        <img
          src={after}
          alt="Property after JD Tree Service"
          loading="lazy"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img
            src={before}
            alt="Property before JD Tree Service"
            loading="lazy"
            width={1600}
            height={1008}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-background/35" />
        </div>

        <div
          className="absolute inset-y-0 w-px bg-cream/80"
          style={{ left: `${pos}%` }}
          aria-hidden
        >
          <div className="absolute top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cream/60 bg-background/40 backdrop-blur-md">
            <span className="text-xs text-cream">↔</span>
          </div>
        </div>

        <span className="eyebrow absolute left-6 top-6 text-cream/80">Before</span>
        <span className="eyebrow absolute right-6 top-6 text-cream/80">After</span>
        <span className="eyebrow absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/60">
          Drag to reveal →
        </span>
      </div>
    </section>
  );
}
