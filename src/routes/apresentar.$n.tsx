import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ChemVisual } from "@/components/chem/ChemVisual";
import { MoleculeStage, sceneForChapter } from "@/components/chem/MoleculeStage";
import { tryFullscreen } from "@/lib/fullscreen";
import { TOTAL_CHAPTERS, chapters, findPart, findPresentationChapter } from "@/lib/presentationContent";

export const Route = createFileRoute("/apresentar/$n")({
  head: () => ({
    meta: [
      { title: "Modo apresentação — Química Orgânica" },
      {
        name: "description",
        content: "Modo apresentação em tela cheia dos 20 capítulos de Química Orgânica.",
      },
      { property: "og:title", content: "Modo apresentação — Química Orgânica" },
      { property: "og:description", content: "Fenol, enol e funções orgânicas em tela cheia." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PresentMode,
});

function PresentMode() {
  const { n } = Route.useParams();
  const navigate = useNavigate();
  const num = Math.min(Math.max(Number.parseInt(n, 10) || 1, 1), TOTAL_CHAPTERS);
  const chapter = findPresentationChapter(num) ?? chapters[0]!;
  const part = findPart(chapter.part)!;
  const [showScript, setShowScript] = useState(false);
  const scene = sceneForChapter(chapter.number);

  const prev = chapter.number > 1 ? chapter.number - 1 : null;
  const next = chapter.number < TOTAL_CHAPTERS ? chapter.number + 1 : null;

  const go = (target: number) => {
    void navigate({ to: "/apresentar/$n", params: { n: String(target) } });
  };
  const exit = () => {
    if (typeof document !== "undefined" && document.fullscreenElement) void document.exitFullscreen?.();
    void navigate({ to: "/capitulo/$n", params: { n: String(chapter.number) } });
  };

  useEffect(() => {
    tryFullscreen();
  }, []);

  useEffect(() => {
    document.title = `EP. ${String(chapter.number).padStart(2, "0")}/${TOTAL_CHAPTERS} — ${chapter.title}`;
    setShowScript(false);
  }, [chapter]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "ArrowRight" || e.key === " ") && next !== null) go(next);
      else if (e.key === "ArrowLeft" && prev !== null) go(prev);
      else if (e.key === "Escape") exit();
      else if (e.key.toLowerCase() === "r") setShowScript((s) => !s);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="paper-grain relative flex min-h-svh flex-col overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-0">
        <div className="lab-field absolute inset-0" />
        <div className="tech-grid animate-lab-drift absolute inset-0" />
        {!scene && (
          <ChemVisual
            chapter={chapter.number}
            className="absolute right-0 top-1/2 h-[120%] w-[75%] -translate-y-1/2 text-foreground"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-ink)_14%,color-mix(in_oklab,var(--color-ink)_72%,transparent)_55%,transparent)]" />
      </div>

      <header className="relative flex items-center justify-between px-5 py-5 sm:px-10">
        <p className="kicker">
          Química Orgânica · Parte {part.number} — {part.title} · {part.presenter}
        </p>
        <button
          type="button"
          onClick={exit}
          className="inline-flex items-center gap-2 border border-border px-4 py-2 text-[0.58rem] tracking-[0.28em] text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          <X className="size-3.5" aria-hidden="true" />
          Sair
        </button>
      </header>

      <main key={chapter.number} className="animate-archive-in relative flex flex-1 items-center px-5 sm:px-10">
        <div className={scene ? "grid w-full gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center" : "w-full max-w-5xl"}>
        <div className="w-full max-w-5xl">
          <p className="reveal reveal-1 font-display text-sm tracking-[0.36em] text-crimson">
            EP. {String(chapter.number).padStart(2, "0")} / {TOTAL_CHAPTERS}
          </p>
          <h1 className="reveal reveal-2 mt-6 font-display text-[2rem] leading-[1.05] tracking-[0.06em] text-foreground sm:text-6xl lg:text-7xl [text-shadow:0_18px_50px_oklch(0_0_0/60%)]">
            {chapter.title}
          </h1>
          <p className="reveal reveal-3 mt-5 text-xs tracking-[0.3em] text-crimson uppercase sm:text-base">
            {chapter.subtitle}
          </p>
          <p className="reveal reveal-4 mt-7 max-w-3xl text-base leading-relaxed text-foreground/90 sm:text-xl">
            {chapter.summary}
          </p>
          {chapter.bullets && chapter.bullets.length > 0 && (
            <ul className="reveal reveal-5 mt-8 grid gap-3 sm:grid-cols-2">
              {chapter.bullets.map((b) => (
                <li
                  key={b}
                  className="border-l-2 border-crimson/70 pl-4 text-sm leading-relaxed text-muted-foreground sm:text-base"
                >
                  {b}
                </li>
              ))}
            </ul>
          )}

          {showScript && (
            <p className="mt-8 max-w-4xl border border-border bg-ink/70 p-5 text-sm leading-relaxed text-muted-foreground backdrop-blur-sm glass-panel">
              {chapter.script}
            </p>
          )}
        </div>
          {scene && (
            <div className="reveal reveal-3 w-full max-w-xl">
              <MoleculeStage scene={scene} />
            </div>
          )}
        </div>
      </main>

      <footer className="relative flex items-center justify-between gap-3 px-5 py-6 sm:px-10">
        <button
          type="button"
          onClick={() => setShowScript((s) => !s)}
          className="text-[0.58rem] tracking-[0.28em] text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          {showScript ? "Ocultar roteiro" : "Mostrar roteiro"}
        </button>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Capítulo anterior"
            disabled={prev === null}
            onClick={() => prev !== null && go(prev)}
            className="border border-border p-3 text-foreground transition-colors hover:border-crimson/60 disabled:opacity-40"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Próximo capítulo"
            disabled={next === null}
            onClick={() => next !== null && go(next)}
            className="border border-crimson bg-crimson p-3 text-primary-foreground transition-colors hover:bg-blood disabled:opacity-40"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </footer>
    </div>
  );
}
