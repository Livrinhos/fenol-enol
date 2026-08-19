import type { ChapterVisual as Visual } from "@/lib/chapters";

const label = "text-[0.6rem] tracking-[0.28em] uppercase";

export function ChapterVisual({ visual }: { visual: Visual }) {
  switch (visual.kind) {
    case "none":
      return null;

    case "timeline":
      return (
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-3">
          {visual.steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span className={`${label} border border-border/70 bg-ink/50 px-3 py-2 text-foreground/90`}>
                {s}
              </span>
              {i < visual.steps.length - 1 && (
                <span aria-hidden="true" className="text-gold/70">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      );

    case "flow":
      return (
        <ol className="flex flex-col gap-2 sm:gap-2.5">
          {visual.steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span className="font-display text-[0.7rem] text-gold/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-6 bg-border" aria-hidden="true" />
              <span className={`${label} text-foreground/90`}>{s}</span>
            </li>
          ))}
        </ol>
      );

    case "orbit":
      return (
        <div className="flex flex-col gap-6">
          <div className="border border-crimson/50 bg-ink/60 px-5 py-6 text-center">
            <p className="font-display text-[clamp(1.7rem,7vw,3.2rem)] leading-none tracking-[0.08em] whitespace-nowrap text-foreground uppercase">
              {visual.center}
            </p>
            {visual.centerNote && (
              <p className={`${label} mt-3 text-crimson`}>{visual.centerNote}</p>
            )}
          </div>
          <ul className="grid grid-cols-2 gap-px bg-border/60 sm:grid-cols-3">
            {visual.around.map((a) => (
              <li key={a} className={`${label} bg-ink/70 px-3 py-4 text-center text-muted-foreground`}>
                {a}
              </li>
            ))}
          </ul>
        </div>
      );

    case "grid":
      return (
        <ul className="grid grid-cols-2 gap-px bg-border/60 sm:grid-cols-3">
          {visual.items.map((a) => (
            <li key={a} className={`${label} bg-ink/70 px-3 py-4 text-foreground/85`}>
              {a}
            </li>
          ))}
        </ul>
      );

    case "stat":
      return (
        <div className="border border-border/70 bg-ink/60 p-5 sm:p-6">
          <p className="font-display text-[clamp(2.4rem,9vw,4.5rem)] leading-none tracking-[0.04em] text-foreground">
            {visual.value}
          </p>
          <p className={`${label} mt-3 text-muted-foreground normal-case tracking-[0.16em]`}>
            {visual.label}
          </p>
          {visual.bars && (
            <ul className="mt-6 flex flex-col gap-3">
              {visual.bars.map((b) => (
                <li key={b.label} className="flex items-center gap-4">
                  <span className={`${label} w-28 shrink-0 text-muted-foreground`}>{b.label}</span>
                  <span className="h-1.5 min-w-0 flex-1 bg-[color-mix(in_oklab,var(--color-foreground)_14%,transparent)]">
                    <span className="block h-full bg-crimson" style={{ width: `${b.value}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    case "axis":
      return (
        <div className="border border-border/70 bg-ink/60 p-6 text-center">
          <p className="font-display text-2xl tracking-[0.2em] text-foreground uppercase">
            {visual.top}
          </p>
          <p aria-hidden="true" className="my-3 text-gold/80">
            ↕
          </p>
          <p className="font-display text-2xl tracking-[0.2em] text-crimson uppercase">
            {visual.bottom}
          </p>
          {visual.note && (
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{visual.note}</p>
          )}
        </div>
      );

    case "map":
      return (
        <ul className="flex flex-col gap-px bg-border/60">
          {visual.cities.map((c) => (
            <li key={c.name} className="flex items-baseline gap-4 bg-ink/70 px-4 py-4">
              <span aria-hidden="true" className="size-1.5 shrink-0 translate-y-[-2px] bg-crimson" />
              <span className="font-display text-sm tracking-[0.24em] text-foreground uppercase">
                {c.name}
              </span>
              <span className="text-[0.62rem] tracking-[0.16em] text-muted-foreground">{c.note}</span>
            </li>
          ))}
        </ul>
      );

    case "vs":
      return (
        <div className="grid gap-px bg-border/60 sm:grid-cols-2">
          {[visual.left, visual.right].map((side, i) => (
            <div key={side.title} className="bg-ink/70 p-5">
              <p className={`${label} ${i === 0 ? "text-gold/85" : "text-crimson"}`}>{side.title}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {side.items.map((it) => (
                  <li key={it} className="text-xs leading-relaxed text-muted-foreground">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "statement":
      return (
        <div className="flex flex-col gap-3">
          {visual.lines.map((l) => (
            <p
              key={l}
              className="font-display text-[clamp(1.1rem,3.6vw,1.9rem)] leading-tight tracking-[0.12em] text-foreground uppercase"
            >
              {l}
            </p>
          ))}
        </div>
      );

    case "sources":
      return (
        <ul className="flex flex-col gap-px bg-border/60">
          {visual.items.map((s) => (
            <li key={s.org} className="bg-ink/70 px-4 py-4">
              <p className={`${label} text-foreground/90`}>{s.org}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.note}</p>
            </li>
          ))}
        </ul>
      );
  }
}
