import { useEffect, useRef, useState } from "react";

type Step = {
  kicker?: string;
  title?: string;
  line?: string;
  hold: number;
};

const STEPS: Step[] = [
  { kicker: "JAPAN / ARCHIVE / 2026", hold: 2600 },
  { title: "YAKUZA", hold: 3000 },
  { line: "A HISTÓRIA POR TRÁS DO CRIME ORGANIZADO JAPONÊS", hold: 3000 },
  { line: "DOCUMENTÁRIO INTERATIVO", hold: 2400 },
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function OpeningSequence({ onFinish }: { onFinish: () => void }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    if (prefersReducedMotion()) {
      onFinish();
      return;
    }
    setLeaving(true);
    window.setTimeout(onFinish, 900);
  };

  useEffect(() => {
    if (prefersReducedMotion()) {
      const t = window.setTimeout(finish, 1200);
      return () => window.clearTimeout(t);
    }
    if (index >= STEPS.length) {
      finish();
      return;
    }
    const t = window.setTimeout(() => setIndex((i) => i + 1), STEPS[index]!.hold);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = STEPS[Math.min(index, STEPS.length - 1)];

  return (
    <section
      aria-label="Abertura cinematográfica"
      className={`paper-grain wave-marks fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center ${
        leaving ? "animate-veil-out" : ""
      }`}
    >
      <p aria-live="polite" className="sr-only">
        YAKUZA ARCHIVE — documentário interativo sobre o crime organizado japonês.
      </p>

      <div className="relative z-10 flex min-h-[9rem] w-full max-w-3xl items-center justify-center sm:min-h-[12rem]">
        <div key={index} className="animate-archive-in">
          {step?.kicker && (
            <p className="kicker text-[0.6rem] sm:text-xs">{step.kicker}</p>
          )}
          {step?.title && (
            <h1 className="font-display text-5xl leading-none tracking-[0.28em] text-foreground sm:text-7xl md:text-8xl">
              {step.title}
            </h1>
          )}
          {step?.line && (
            <p className="mx-auto max-w-xl font-display text-base leading-relaxed tracking-[0.16em] text-muted-foreground sm:text-xl">
              {step.line}
            </p>
          )}
        </div>
      </div>

      <div className="relative z-10 mt-16 flex w-full max-w-3xl flex-col items-center gap-6">
        <div className="hairline" />
        <button
          type="button"
          onClick={finish}
          className="kicker rounded-sm px-3 py-2 text-[0.6rem] transition-colors hover:text-foreground"
        >
          Pular abertura
        </button>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-24 bg-gradient-to-r from-transparent via-crimson/30 to-transparent"
      />
    </section>
  );
}
