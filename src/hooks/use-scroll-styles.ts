import { useEffect } from "react";
import type { MotionValue } from "motion/react";

/**
 * Applies scroll progress to element styles manually, bypassing Motion's
 * WAAPI/ViewTimeline acceleration which mis-computes progress for elements
 * inside sticky containers (causing ghost/overlapping text).
 */
export function interp(p: number, input: number[], output: number[]): number {
  const firstIn = input[0]!;
  if (p <= firstIn) return output[0]!;
  const last = input.length - 1;
  const lastIn = input[last]!;
  if (p >= lastIn) return output[last]!;
  for (let i = 1; i < input.length; i++) {
    const hi = input[i]!;
    if (p <= hi) {
      const lo = input[i - 1]!;
      const t = (p - lo) / (hi - lo);
      return output[i - 1]! + (output[i]! - output[i - 1]!) * t;
    }
  }
  return output[last]!;
}

type Binding = {
  ref: React.RefObject<HTMLElement | null>;
  apply: (el: HTMLElement, p: number) => void;
};

export function useScrollStyles(progress: MotionValue<number>, bindings: Binding[]) {
  useEffect(() => {
    const update = (p: number) => {
      for (const { ref, apply } of bindings) {
        const el = ref.current;
        if (el) apply(el, p);
      }
    };
    update(progress.get());
    const unsub = progress.on("change", update);
    const t = window.setTimeout(() => update(progress.get()), 400);
    return () => {
      unsub();
      window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);
}
