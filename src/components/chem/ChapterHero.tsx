import type { ReactNode } from "react";
import { ChapterArt } from "@/components/chem/ChapterArt";
import { MoleculeStage, sceneForChapter } from "@/components/chem/MoleculeStage";
import { TOTAL_CHAPTERS } from "@/lib/presentationContent";
import type { PresentationChapter, PresentationPart } from "@/lib/presentationContent";

type Props = {
  chapter: PresentationChapter;
  part: PresentationPart;
  /** ações (apresentar/anterior/próximo) renderizadas dentro da composição */
  actions?: ReactNode;
  /** modo apresentação: sem CTA, tipografia maior, sem padding de header */
  mode?: "page" | "present";
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Camadas de atmosfera: profundidade, luz e grão — idênticas nos 20 capítulos */
function Atmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="lab-field absolute inset-0" />
      <div className="tech-grid animate-lab-drift absolute inset-0" />
      <div className="stage-light absolute inset-0" />
      <div className="wave-marks absolute inset-0 opacity-50" />
      <div className="stage-vignette absolute inset-0" />
    </div>
  );
}

/** bloco visual central: cena molecular quando existe, senão a arte do bloco */
function Visual({
  chapter,
  part,
  className,
  poster,
}: {
  chapter: number;
  part: 1 | 2 | 3 | 4;
  className?: string;
  poster?: boolean;
}) {
  const scene = sceneForChapter(chapter);
  if (scene) return <MoleculeStage scene={scene} className={className} />;
  return (
    <div className={`relative ${className ?? ""}`}>
      <div aria-hidden="true" className="stage-halo animate-glow-breathe absolute inset-[-12%]" />
      <ChapterArt
        chapter={chapter}
        part={part}
        variant={poster ? "poster" : "stage"}
        className="relative w-full text-foreground"
      />
    </div>
  );
}

function Meta({ chapter, part }: { chapter: PresentationChapter; part: PresentationPart }) {
  return (
    <p className="kicker reveal reveal-1">
      EP. {pad(chapter.number)} / {TOTAL_CHAPTERS} · PARTE {part.number} — {part.title} ·{" "}
      {part.presenter}
    </p>
  );
}

function Subtitle({ text }: { text: string }) {
  return (
    <div className="reveal reveal-3 mt-5 flex items-center gap-3">
      <span className="h-px w-8 bg-crimson" />
      <p className="text-[0.62rem] tracking-[0.3em] text-crimson uppercase sm:text-xs">{text}</p>
    </div>
  );
}

function Bullets({ items, layout }: { items: string[]; layout: "inline" | "columns" | "stack" }) {
  if (items.length === 0) return null;
  if (layout === "inline")
    return (
      <ul className="reveal reveal-5 mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {items.map((b) => (
          <li
            key={b}
            className="flex items-center gap-3 text-[0.68rem] tracking-[0.14em] text-muted-foreground uppercase"
          >
            <span className="size-1 rounded-full bg-crimson" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>
    );
  if (layout === "columns")
    return (
      <ul className="reveal reveal-5 mt-10 grid gap-px overflow-hidden border border-border sm:grid-cols-2 lg:grid-cols-4">
        {items.map((b, i) => (
          <li key={b} className="bg-surface/40 px-4 py-5 backdrop-blur-sm">
            <span className="font-display text-xs tracking-[0.2em] text-crimson">{pad(i + 1)}</span>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{b}</p>
          </li>
        ))}
      </ul>
    );
  return (
    <ul className="reveal reveal-5 mt-8 grid gap-2.5">
      {items.map((b) => (
        <li
          key={b}
          className="border-l border-crimson/60 pl-3 text-xs leading-relaxed text-muted-foreground sm:text-sm"
        >
          {b}
        </li>
      ))}
    </ul>
  );
}

export function ChapterHero({ chapter, part, actions, mode = "page" }: Props) {
  const bullets = chapter.bullets ?? [];
  const topPad = mode === "present" ? "pt-8 sm:pt-10" : "pt-28 sm:pt-32";
  const minH = mode === "present" ? "min-h-[calc(100svh-9rem)]" : "min-h-[84svh] lg:min-h-[92svh]";
  const titleSize =
    mode === "present"
      ? "text-[2.1rem] sm:text-6xl lg:text-[4.6rem]"
      : "text-3xl sm:text-5xl lg:text-[4rem]";

  const shell = `relative mx-auto w-full max-w-[100rem] px-5 pb-14 sm:px-10 ${topPad} ${minH}`;

  /* ── PARTE 1 · centrado, diagrama de fundo, espaço negativo ─────── */
  if (part.number === 1) {
    return (
      <section className="relative overflow-hidden border-b border-border">
        <Atmosphere />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Visual
            chapter={chapter.number}
            part={part.number}
            poster
            className="h-full w-[min(96%,72rem)] opacity-80"
          />
        </div>
        <div className={`${shell} flex flex-col items-center justify-center text-center`}>
          <Meta chapter={chapter} part={part} />
          <h1
            className={`reveal reveal-2 mt-7 max-w-4xl font-display leading-[1.04] tracking-[0.06em] text-foreground [text-shadow:0_20px_60px_oklch(0_0_0/70%)] ${titleSize}`}
          >
            {chapter.title}
          </h1>
          <div className="flex justify-center">
            <Subtitle text={chapter.subtitle} />
          </div>
          <p className="reveal reveal-4 mt-7 max-w-2xl text-sm leading-relaxed text-foreground/85 sm:text-base">
            {chapter.summary}
          </p>
          <Bullets items={bullets} layout="inline" />
          {actions && (
            <div className="reveal reveal-5 mt-10 flex flex-wrap items-center justify-center gap-3">
              {actions}
            </div>
          )}
        </div>
      </section>
    );
  }

  /* ── PARTE 2 · molécula protagonista, texto em rodapé sobreposto ── */
  if (part.number === 2) {
    return (
      <section className="relative overflow-hidden border-b border-border">
        <Atmosphere />
        <div className={`${shell} grid content-between gap-10`}>
          <div className="flex items-start justify-between gap-6">
            <Meta chapter={chapter} part={part} />
            <span
              aria-hidden="true"
              className="numeral-ghost hidden text-[7rem] tracking-tight sm:block lg:text-[10rem]"
            >
              {pad(chapter.number)}
            </span>
          </div>
          <div className="frame-ticks mx-auto w-full max-w-3xl px-6 py-2">
            <Visual chapter={chapter.number} part={part.number} className="w-full" />
          </div>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
            <div>
              <h1
                className={`reveal reveal-2 font-display leading-[1.04] tracking-[0.06em] text-foreground [text-shadow:0_20px_60px_oklch(0_0_0/70%)] ${titleSize}`}
              >
                {chapter.title}
              </h1>
              <Subtitle text={chapter.subtitle} />
              {actions && (
                <div className="reveal reveal-5 mt-8 flex flex-wrap items-center gap-3">
                  {actions}
                </div>
              )}
            </div>
            <div>
              <p className="reveal reveal-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
                {chapter.summary}
              </p>
              <Bullets items={bullets} layout="stack" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── PARTE 3 · transformação: arte no topo, tipografia abaixo ───── */
  if (part.number === 3) {
    return (
      <section className="relative overflow-hidden border-b border-border">
        <Atmosphere />
        <div className={`${shell} flex flex-col justify-center`}>
          <Meta chapter={chapter} part={part} />
          <div className="reveal reveal-3 mt-8 w-full">
            <Visual
              chapter={chapter.number}
              part={part.number}
              className="mx-auto w-full max-w-4xl"
            />
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <div>
              <h1
                className={`reveal reveal-2 font-display leading-[1.04] tracking-[0.06em] text-foreground [text-shadow:0_20px_60px_oklch(0_0_0/70%)] ${titleSize}`}
              >
                {chapter.title}
              </h1>
              <Subtitle text={chapter.subtitle} />
            </div>
            <div>
              <p className="reveal reveal-4 max-w-2xl text-sm leading-relaxed text-foreground/85 sm:text-base">
                {chapter.summary}
              </p>
              <Bullets items={bullets} layout="stack" />
              {actions && (
                <div className="reveal reveal-5 mt-8 flex flex-wrap items-center gap-3">
                  {actions}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── PARTE 4 · editorial de síntese: numeral, comparativo, grade ── */
  return (
    <section className="relative overflow-hidden border-b border-border">
      <Atmosphere />
      <div className={`${shell} flex flex-col justify-center`}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
          <div>
            <Meta chapter={chapter} part={part} />
            <div className="mt-6 flex items-start gap-5">
              <span
                aria-hidden="true"
                className="numeral-ghost shrink-0 text-[3.5rem] sm:text-[5.5rem] lg:text-[7rem]"
              >
                {pad(chapter.number)}
              </span>
              <div>
                <h1
                  className={`reveal reveal-2 font-display leading-[1.04] tracking-[0.06em] text-foreground [text-shadow:0_20px_60px_oklch(0_0_0/70%)] ${titleSize}`}
                >
                  {chapter.title}
                </h1>
                <Subtitle text={chapter.subtitle} />
              </div>
            </div>
            <p className="reveal reveal-4 mt-7 max-w-2xl text-sm leading-relaxed text-foreground/85 sm:text-base">
              {chapter.summary}
            </p>
            {actions && (
              <div className="reveal reveal-5 mt-9 flex flex-wrap items-center gap-3">
                {actions}
              </div>
            )}
          </div>
          <div className="frame-ticks px-6 py-4">
            <Visual chapter={chapter.number} part={part.number} className="w-full" />
          </div>
        </div>
        <Bullets items={bullets} layout="columns" />
      </div>
    </section>
  );
}
