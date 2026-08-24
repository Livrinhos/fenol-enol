import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
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
      { name: "description", content: "Modo apresentação em tela cheia dos 20 capítulos de Química Orgânica." },
      { property: "og:title", content: "Modo apresentação — Química Orgânica" },
      { property: "og:description", content: "Fenol, enol e funções orgânicas em tela cheia." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PresentMode,
});

const pad = (n: number) => String(n).padStart(2, "0");

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

  const layout = useMemo(() => {
    const title = chapter.title.toUpperCase();
    if (/ÁLCOOL|COMPAR|DIFEREN|ERROS|CONCLUS|APLICA|RESUMO/.test(title)) return "compare";
    if (scene) return "molecule";
    if (chapter.part === 1) return "fundamentals";
    return "editorial";
  }, [chapter, scene]);

  const go = (target: number) => void navigate({ to: "/apresentar/$n", params: { n: String(target) } });
  const exit = () => {
    if (typeof document !== "undefined" && document.fullscreenElement) void document.exitFullscreen?.();
    void navigate({ to: "/capitulo/$n", params: { n: String(chapter.number) } });
  };

  useEffect(() => { tryFullscreen(); }, []);
  useEffect(() => {
    document.title = `EP. ${pad(chapter.number)}/${TOTAL_CHAPTERS} — ${chapter.title}`;
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

  const visual = (
    <div className="relative h-full min-h-[16rem] overflow-hidden border border-white/10 bg-[#031116]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(15,187,215,0.12),transparent_34%),linear-gradient(180deg,rgba(3,17,22,0.15),rgba(1,6,8,0.92))]" />
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(83,199,216,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(83,199,216,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />
      {scene ? (
        <div className="relative z-10 flex h-full items-center justify-center p-5 sm:p-8">
          <MoleculeStage scene={scene} className="w-full max-w-2xl" />
        </div>
      ) : (
        <div className="relative z-10 flex h-full items-center justify-center p-6 sm:p-10">
          <ChemVisual chapter={chapter.number} variant="hero" className="h-full w-full max-h-[24rem] text-cyan-200" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-5 bottom-4 flex items-center justify-between text-[0.48rem] tracking-[0.28em] text-white/35 uppercase sm:inset-x-7">
        <span>{chapter.part === 1 ? "Estrutura · classificação" : part.title}</span>
        <span>Registro de cena · {pad(chapter.number)}</span>
      </div>
    </div>
  );

  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-[#010609] text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_44%,rgba(8,128,155,0.11),transparent_30%),linear-gradient(180deg,#021116_0%,#010609_70%,#010406_100%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(73,178,195,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(73,178,195,0.035)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <header className="relative z-20 flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-8 lg:px-10">
        <div className="font-display text-[0.78rem] tracking-[0.42em] text-white uppercase sm:text-sm">Química <span className="text-cyan-300">Orgânica</span></div>
        <div className="flex items-center gap-5 text-[0.53rem] tracking-[0.28em] text-white/50 uppercase sm:text-[0.6rem]">
          <span>EP. {pad(chapter.number)} / {TOTAL_CHAPTERS}</span>
          <button type="button" onClick={exit} className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-white/60 transition hover:border-cyan-300/40 hover:text-white">
            <X className="size-3" aria-hidden="true" /> Sair
          </button>
        </div>
      </header>

      <main key={chapter.number} className="relative z-10 flex flex-1 items-center px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="mx-auto grid w-full max-w-[118rem] gap-8 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:items-center lg:gap-10">
          <section className="flex min-h-[30rem] flex-col justify-center lg:min-h-[36rem]">
            <p className="font-mono text-[0.58rem] tracking-[0.32em] text-cyan-200/70 uppercase sm:text-[0.68rem]">Parte {part.number} — {part.title} · {part.presenter}</p>
            <div className="mt-7 flex items-start gap-4">
              <span className="font-display text-[3.2rem] leading-none tracking-tight text-cyan-300/70 sm:text-[4.6rem]">{pad(chapter.number)}</span>
              <div className="pt-1">
                <p className="text-[0.56rem] tracking-[0.38em] text-white/45 uppercase">EPISÓDIO / {TOTAL_CHAPTERS}</p>
                <h1 className="mt-4 max-w-4xl font-display text-[2.6rem] leading-[0.94] tracking-[0.035em] text-white sm:text-[4.4rem] lg:text-[5rem]">{chapter.title}</h1>
              </div>
            </div>
            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-10 bg-cyan-300/70" />
              <p className="text-[0.58rem] tracking-[0.32em] text-cyan-200/75 uppercase sm:text-[0.68rem]">{chapter.subtitle}</p>
            </div>
            <p className="mt-7 max-w-2xl text-sm leading-[1.8] text-white/72 sm:text-base">{chapter.summary}</p>
            {chapter.bullets && chapter.bullets.length > 0 && (
              <div className={`mt-8 ${layout === "compare" ? "grid gap-3 sm:grid-cols-2" : "flex flex-wrap gap-x-7 gap-y-3"}`}>
                {chapter.bullets.map((bullet, index) => (
                  <div key={bullet} className={`border-l border-cyan-300/45 pl-3 ${layout === "compare" ? "bg-white/[0.025] py-3 pr-3" : "py-1"}`}>
                    {layout === "compare" && <span className="font-mono text-[0.5rem] tracking-[0.22em] text-cyan-300/70">0{index + 1}</span>}
                    <p className="mt-1 text-[0.65rem] leading-relaxed tracking-[0.04em] text-white/58 sm:text-xs">{bullet}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-auto pt-10">
              <button type="button" onClick={() => setShowScript((s) => !s)} className="text-[0.56rem] tracking-[0.28em] text-white/45 uppercase transition-colors hover:text-cyan-200">{showScript ? "Ocultar roteiro" : "Mostrar roteiro"}</button>
              {showScript && <p className="mt-4 max-w-3xl border border-white/10 bg-black/25 p-4 text-sm leading-relaxed text-white/58 backdrop-blur-sm">{chapter.script}</p>}
            </div>
          </section>
          <section className="min-h-[30rem] lg:min-h-[36rem]">{visual}</section>
        </div>
      </main>

      <footer className="relative z-20 flex items-center justify-between border-t border-white/10 px-5 py-3.5 sm:px-8 lg:px-10">
        <div className="flex items-center gap-3 text-[0.5rem] tracking-[0.28em] text-white/30 uppercase"><span>Documentário científico</span><span className="text-cyan-300/70">●</span><span>{part.title}</span></div>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Capítulo anterior" disabled={prev === null} onClick={() => prev !== null && go(prev)} className="border border-white/10 p-2.5 text-white/70 transition hover:border-cyan-300/40 hover:text-white disabled:opacity-25"><ChevronLeft className="size-4" aria-hidden="true" /></button>
          <button type="button" aria-label="Próximo capítulo" disabled={next === null} onClick={() => next !== null && go(next)} className="border border-cyan-300/60 bg-cyan-300/90 p-2.5 text-[#021116] transition hover:bg-cyan-200 disabled:opacity-25"><ChevronRight className="size-4" aria-hidden="true" /></button>
        </div>
      </footer>
    </div>
  );
}
