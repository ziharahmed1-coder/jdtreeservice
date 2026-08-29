import { FadeUp, Reveal } from "./Reveal";

const STEPS = [
  { n: "01", t: "Assess", d: "We inspect the tree, the property, the surroundings and the risks." },
  { n: "02", t: "Plan", d: "We determine the safest and most appropriate approach — and price it plainly." },
  { n: "03", t: "Execute", d: "Our crew performs the work with rigging, precision and zero improvisation." },
  { n: "04", t: "Restore", d: "We leave your property clean and your landscape looking right." },
];

export function Method() {
  return (
    <section id="method" className="relative bg-[oklch(0.13_0.012_152)] px-6 py-32 md:px-14 md:py-48">
      <p className="eyebrow text-sun/80">06 / The JD method</p>
      <h2 className="display mt-8 text-[clamp(2.8rem,10vw,9rem)] text-cream">
        <Reveal>We don't</Reveal>
        <Reveal delay={0.08}>just cut trees.</Reveal>
      </h2>

      <div className="mt-24 md:mt-40">
        {STEPS.map((s, i) => (
          <FadeUp key={s.n} delay={i * 0.05}>
            <div className="grid grid-cols-12 items-start gap-6 border-t border-border py-12 md:py-16">
              <span className="display col-span-2 text-3xl text-sun/70 md:text-5xl">{s.n}</span>
              <h3 className="display col-span-10 text-4xl text-cream md:col-span-5 md:text-7xl">
                {s.t}
              </h3>
              <p className="col-span-12 max-w-sm text-sm leading-relaxed text-cream/55 md:col-span-5 md:col-start-8">
                {s.d}
              </p>
            </div>
          </FadeUp>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  );
}
