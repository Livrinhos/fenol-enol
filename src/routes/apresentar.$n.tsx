import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ChemVisual } from "@/components/chem/ChemVisual";
import { MoleculeStage, sceneForChapter } from "@/components/chem/MoleculeStage";
import { tryFullscreen } from "@/lib/fullscreen";
import {
  TOTAL_CHAPTERS,
  chapters,
  findPart,
  findPresentationChapter,
} from "@/lib/presentationContent";

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
  const [started, setStarted] = useState(num !== 1);
  const scene = sceneForChapter(chapter.number);

  const prev = chapter.number > 1 ? chapter.number - 1 : null;
  const next = chapter.number < TOTAL_CHAPTERS ? chapter.number + 1 : null;

  const go = (target: number) => {
    void navigate({ to: "/apresentar/$n", params: { n: String(target) } });
  };
  const exit = () => {
    if (typeof document !== "undefined" && document.fullscreenElement)
      void document.exitFullscreen?.();
    void navigate({ to: "/capitulo/$n", params: { n: String(chapter.number) } });
  };

  useEffect(() => {
    tryFullscreen();
  }, []);

  useEffect(() => {
    document.title = `EP. ${String(chapter.number).padStart(2, "0")}/${TOTAL_CHAPTERS} — ${chapter.title}`;
    setShowScript(false);
    setStarted(chapter.number !== 1);
  }, [chapter]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        exit();
        return;
      }
      if (!started && chapter.number === 1 && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        setStarted(true);
        return;
      }
      if ((e.key === "ArrowRight" || e.key === " ") && next !== null) go(next);
      else if (e.key === "ArrowLeft" && prev !== null) go(prev);
      else if (e.key.toLowerCase() === "r") setShowScript((s) => !s);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chapter.number, started, next, prev]);

  if (!started && chapter.number === 1) {
    return (
      <div className="relative flex min-h-svh flex-col overflow-hidden bg-[#02090c] text-foreground">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_47%,rgba(14,180,210,0.16),transparent_33%),radial-gradient(circle_at_82%_48%,rgba(16,105,120,0.18),transparent_30%),linear-gradient(180deg,#021116_0%,#02080b_72%,#010406_100%)]" />
          <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_20%_30%,rgba(80,210,230,0.08)_0_1px,transparent_1px),radial-gradient(circle_at_70%_65%,rgba(80,210,230,0.06)_0_1px,transparent_1px)] [background-size:90px_90px,140px_140px]" />
          <div className="absolute -right-[8%] top-[8%] h-[78vh] w-[56vw] opacity-70 blur-[0.2px]">
            <ChemVisual
              chapter={1}
              className="h-full w-full text-cyan-300"
            />
          </div>
          <div className="absolute left-[50%] top-[22%] h-[56vh] w-[32vw] -translate-x-1/2 rounded-full border border-cyan-400/15 shadow-[0_0_100px_rgba(14,190,220,0.08)_inset]" />
          <div className="absolute inset-y-0 left-0 w-[68%] bg-[linear-gradient(90deg,rgba(1,6,8,0.96)_0%,rgba(1,6,8,0.88)_46%,rgba(1,6,8,0.34)_82%,transparent_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#010406] to-transparent" />
        </div>

        <header className="relative z-10 flex items-center justify-between px-8 py-7 lg:px-12">
          <div className="font-display text-sm tracking-[0.42em] text-foreground uppercase sm:text-base">
            Química <span className="text-cyan-300">Orgânica</span>
          </div>
          <div className="flex items-center gap-5 text-xs tracking-[0.28em] text-muted-foreground uppercase">
            <span>01 / 20</span>
            <button
              type="button"
              onClick={exit}
              className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 transition hover:border-cyan-300/50 hover:text-foreground"
            >
              <X className="size-3.5" aria-hidden="true" />
              Sair
            </button>
          </div>
        </header>

        <main className="relative z-10 flex flex-1 items-center px-8 pb-10 lg:px-16">
          <div className="w-full max-w-3xl lg:max-w-[58rem]">
            <p className="mb-5 text-xs tracking-[0.42em] text-cyan-300 uppercase">
              EP. 01 / 20
            </p>
            <p className="text-sm tracking-[0.46em] text-white/55 uppercase sm:text-base">
              Fundamentos
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-[3.4rem] leading-[0.9] tracking-[0.035em] text-white sm:text-[5.7rem] lg:text-[7rem]">
              FUNÇÕES
              <br />
              ORGÂNICAS
            </h1>
            <div className="mt-7 h-px w-28 bg-cyan-300/60" />
            <p className="mt-6 max-w-2xl text-sm leading-relaxed tracking-[0.18em] text-white/70 uppercase sm:text-base">
              Conceitos · classificação · grupos funcionais e aplicações
            </p>
            <button
              type="button"
              onClick={() => setStarted(true)}
              className="mt-10 inline-flex items-center gap-4 border border-cyan-300/80 bg-cyan-300/10 px-8 py-4 text-sm font-medium tracking-[0.26em] text-white uppercase shadow-[0_0_40px_rgba(14,190,220,0.08)] transition hover:bg-cyan-300/20 hover:shadow-[0_0_55px_rgba(14,190,220,0.14)]"
            >
              <span className="grid size-8 place-items-center rounded-full border border-cyan-300/70 text-cyan-200">▶</span>
              Iniciar apresentação
            </button>
          </div>
        </main>

        <footer className="relative z-10 flex items-center justify-between px-8 pb-7 text-xs tracking-[0.28em] text-white/45 uppercase lg:px-16">
          <span>Química Orgânica · Documentário interativo</span>
          <div className="flex items-center gap-3">
            <span className="text-cyan-300">●</span>
            <span>EP. 01</span>
          </div>
        </footer>
      </div>
    );
  }

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

      <main
        key={chapter.number}
        className="animate-archive-in relative flex flex-1 items-center px-5 sm:px-10"
      >
        <div
          className={
            scene
              ? "grid w-full gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center"
              : "w-full max-w-5xl"
          }
        >
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
