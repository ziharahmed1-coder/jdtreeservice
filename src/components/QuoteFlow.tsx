import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const NEEDS = ["Tree removal", "Tree trimming", "Storm damage", "Stump grinding", "Other"];
const TIMING = ["Emergency — today", "This week", "This month", "Just planning"];

type Answers = {
  need: string;
  address: string;
  timing: string;
  name: string;
  contact: string;
};

const EMPTY: Answers = { need: "", address: "", timing: "", name: "", contact: "" };

export function QuoteFlow() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>(EMPTY);
  const [done, setDone] = useState(false);

  const set = (k: keyof Answers, v: string) => setA((p) => ({ ...p, [k]: v }));
  const next = () => setStep((s) => s + 1);

  const chip =
    "eyebrow rounded-full border border-border px-6 py-4 text-cream/70 transition-all duration-300 hover:border-sun hover:text-cream";
  const field =
    "w-full border-b border-border bg-transparent py-4 display text-3xl text-cream outline-none placeholder:text-cream/25 focus:border-sun md:text-5xl";

  const steps = [
    <div key="need">
      <p className="display text-[clamp(2rem,6vw,4.5rem)] text-cream">
        What do you need help with?
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        {NEEDS.map((n) => (
          <button
            key={n}
            className={chip}
            onClick={() => {
              set("need", n);
              next();
            }}
          >
            {n}
          </button>
        ))}
      </div>
    </div>,
    <div key="where">
      <p className="display text-[clamp(2rem,6vw,4.5rem)] text-cream">Where is the property?</p>
      <input
        autoFocus
        className={`${field} mt-10`}
        placeholder="Street, city"
        value={a.address}
        onChange={(e) => set("address", e.target.value)}
      />
      <button className={`${chip} mt-10`} disabled={!a.address} onClick={next}>
        Continue →
      </button>
    </div>,
    <div key="when">
      <p className="display text-[clamp(2rem,6vw,4.5rem)] text-cream">How soon do you need us?</p>
      <div className="mt-10 flex flex-wrap gap-3">
        {TIMING.map((t) => (
          <button
            key={t}
            className={chip}
            onClick={() => {
              set("timing", t);
              next();
            }}
          >
            {t}
          </button>
        ))}
      </div>
    </div>,
    <div key="who">
      <p className="display text-[clamp(2rem,6vw,4.5rem)] text-cream">Where can we reach you?</p>
      <input
        autoFocus
        className={`${field} mt-10`}
        placeholder="Your name"
        value={a.name}
        onChange={(e) => set("name", e.target.value)}
      />
      <input
        className={`${field} mt-6`}
        placeholder="Phone or email"
        value={a.contact}
        onChange={(e) => set("contact", e.target.value)}
      />
      <button
        className="eyebrow mt-12 inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 text-background transition-colors hover:bg-sun disabled:opacity-40"
        disabled={!a.name || !a.contact}
        onClick={() => setDone(true)}
      >
        Get my free estimate →
      </button>
    </div>,
  ];

  return (
    <section id="estimate" className="relative bg-[oklch(0.13_0.012_152)] px-6 py-32 md:px-14 md:py-48">
      <div className="flex items-center justify-between">
        <p className="eyebrow text-sun/80">09 / Free estimate</p>
        <p className="eyebrow text-cream/35">{done ? "Sent" : `0${step + 1} / 04`}</p>
      </div>

      <div className="mt-16 min-h-[46vh] max-w-4xl">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="display text-[clamp(2.2rem,7vw,5.5rem)] text-cream">
                Thank you, {a.name.split(" ")[0]}.
              </p>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/60">
                We have your request for {a.need.toLowerCase()} at {a.address}. A JD arborist
                will reach out on {a.contact} — usually within a few hours.
              </p>
              <button
                className="eyebrow mt-10 text-sun link-underline"
                onClick={() => {
                  setA(EMPTY);
                  setStep(0);
                  setDone(false);
                }}
              >
                Start another request
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {steps[step]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step > 0 && !done && (
        <button className="eyebrow text-cream/40 link-underline" onClick={() => setStep(step - 1)}>
          ← Back
        </button>
      )}
    </section>
  );
}
