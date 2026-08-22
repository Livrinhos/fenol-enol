import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { ChemVisual } from "@/components/chem/ChemVisual";
import { MoleculeStage, sceneForChapter } from "@/components/chem/MoleculeStage";
import {
  TOTAL_CHAPTERS,
  chapters,
  chaptersOfPart,
  findPart,
  findPresentationChapter,
} from "@/lib/presentationContent";

export const Route = createFileRoute("/capitulo/$n")({
  head: () => ({
    meta: [
      { title: "Capítulo — Química Orgânica" },
      {
        name: "description",
        content:
          "Tela de capítulo da apresentação de Química Orgânica: título, resumo, diagrama e modo apresentar.",
      },
      { property: "og:title", content: "Capítulo — Química Orgânica" },
      {
        property: "og:description",
        content: "Navegue pelos 20 capítulos sobre funções orgânicas, fenol e enol em tela grande.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChapterScreen,
});

function clamp(n: number) {
  return Math.min(Math.max(n, 1), TOTAL_CHAPTERS);
}

function ChapterScreen() {
  const { n } = Route.useParams();
  const navigate = useNavigate();
  const num = clamp(Number.parseInt(n, 10) || 1);
  const chapter = findPresentationChapter(num) ?? chapters[0]!;
  const part = findPart(chapter.part)!;

  const prev = chapter.number > 1 ? chapter.number - 1 : null;
  const next = chapter.number < TOTAL_CHAPTERS ? chapter.number + 1 : null;

  const go = (target: number) => {
    void navigate({ to: "/capitulo/$n", params: { n: String(target) } });
  };

  useEffect(() => {
    document.title = `EP. ${String(chapter.number).padStart(2, "0")}/${TOTAL_CHAPTERS} — ${chapter.title}`;
  }, [chapter]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && next !== null) go(next);
      if (e.key === "ArrowLeft" && prev !== null) go(prev);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="paper-grain min-h-svh bg-ink">
      <SiteHeader />

      {/* Palco do capítulo */}
      <main key={chapter.number} className="animate-archive-in">
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute inset-0 wave-marks" />
            <ChemVisual
              chapter={chapter.number}
              className="absolute -right-10 top-1/2 h-[130%] w-[70%] -translate-y-1/2 text-foreground"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-ink)_18%,color-mix(in_oklab,var(--color-ink)_82%,transparent)_55%,transparent)]" />
          </div>

          <div className="relative mx-auto flex min-h-[78svh] w-full max-w-[100rem] flex-col justify-end px-5 pb-12 pt-32 sm:px-10 sm:pb-16 lg:min-h-[88svh]">
            <p className="kicker">
              EP. {String(chapter.number).padStart(2, "0")} / {TOTAL_CHAPTERS} · PARTE {part.number} —{" "}
              {part.title} · {part.presenter}
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-3xl leading-[1.05] tracking-[0.08em] text-foreground sm:text-6xl lg:text-7xl">
              {chapter.title}
            </h1>
            <p className="mt-5 text-xs tracking-[0.28em] text-crimson uppercase sm:text-sm">
              {chapter.subtitle}
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-foreground/85 sm:text-base">
              {chapter.summary}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/apresentar/$n"
                params={{ n: String(chapter.number) }}
                className="inline-flex items-center gap-2 border border-crimson bg-crimson px-6 py-3.5 text-[0.62rem] tracking-[0.32em] text-primary-foreground uppercase transition-colors hover:bg-blood"
              >
                <Play className="size-4" aria-hidden="true" />
                Apresentar
              </Link>
              <button
                type="button"
                disabled={prev === null}
                onClick={() => prev !== null && go(prev)}
                className="inline-flex items-center gap-2 border border-border px-5 py-3.5 text-[0.62rem] tracking-[0.32em] text-foreground uppercase transition-colors hover:border-crimson/60 disabled:opacity-40"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
                Anterior
              </button>
              <button
                type="button"
                disabled={next === null}
                onClick={() => next !== null && go(next)}
                className="inline-flex items-center gap-2 border border-border px-5 py-3.5 text-[0.62rem] tracking-[0.32em] text-foreground uppercase transition-colors hover:border-crimson/60 disabled:opacity-40"
              >
                Próximo
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
              <Link
                to="/conteudo"
                search={{ cap: chapter.number } as never}
                className="px-2 text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase transition-colors hover:text-foreground"
              >
                Todos os capítulos
              </Link>
            </div>
          </div>
        </section>

        {/* Conteúdo do capítulo */}
        <section className="mx-auto w-full max-w-[100rem] px-5 py-14 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <h2 className="kicker">Pontos-chave</h2>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {(chapter.bullets ?? []).map((b) => (
                  <li
                    key={b}
                    className="border-l border-crimson/60 pl-3 text-xs leading-relaxed text-muted-foreground"
                  >
                    {b}
                  </li>
                ))}
              </ul>

              <details className="group mt-9 border border-border">
                <summary className="cursor-pointer list-none px-4 py-3 text-[0.62rem] tracking-[0.28em] text-muted-foreground uppercase transition-colors hover:text-foreground">
                  Roteiro da fala ({chapter.duration})
                </summary>
                <p className="border-t border-border px-4 py-4 text-sm leading-relaxed text-muted-foreground">
                  {chapter.script}
                </p>
              </details>
            </div>

            <div>
              <h2 className="kicker">Nesta parte · {part.title}</h2>
              <ol className="mt-5 divide-y divide-border border border-border">
                {chaptersOfPart(part.number).map((c) => (
                  <li key={c.number}>
                    <Link
                      to="/capitulo/$n"
                      params={{ n: String(c.number) }}
                      className={`flex items-baseline gap-4 px-4 py-3.5 transition-colors ${
                        c.number === chapter.number
                          ? "bg-surface/60 text-foreground"
                          : "text-muted-foreground hover:bg-surface/30 hover:text-foreground"
                      }`}
                    >
                      <span className="font-display text-sm tracking-[0.2em] text-crimson">
                        {String(c.number).padStart(2, "0")}
                      </span>
                      <span className="text-xs leading-relaxed tracking-[0.08em] uppercase">{c.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
