import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import {
  TOTAL_CHAPTERS,
  chapters,
  chaptersOfPart,
  findPart,
  findPresentationChapter,
  parts,
  sources,
} from "@/lib/presentationContent";

type Search = { cap: number };

export const Route = createFileRoute("/conteudo")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const raw = Number(search["cap"]);
    const cap = Number.isFinite(raw) ? Math.min(Math.max(Math.trunc(raw), 1), TOTAL_CHAPTERS) : 1;
    return { cap };
  },
  head: () => ({
    meta: [
      { title: "Conteúdo da apresentação — Química Orgânica" },
      {
        name: "description",
        content:
          "Os 20 capítulos da apresentação de Química Orgânica: funções orgânicas, grupos funcionais, nomenclatura, fenol, enol e aplicações.",
      },
      { property: "og:title", content: "Conteúdo da apresentação — Química Orgânica" },
      {
        property: "og:description",
        content: "20 capítulos divididos em 4 partes de ~5 minutos: fundamentos, fenol, enol e aplicações.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Conteudo,
});

function Conteudo() {
  const { cap } = Route.useSearch();
  const navigate = useNavigate();
  const chapter = findPresentationChapter(cap) ?? chapters[0]!;
  const part = findPart(chapter.part)!;

  const go = (n: number) => {
    void navigate({ to: "/conteudo", search: { cap: n } });
  };

  const prev = chapter.number > 1 ? chapter.number - 1 : null;
  const next = chapter.number < TOTAL_CHAPTERS ? chapter.number + 1 : null;

  return (
    <div className="paper-grain min-h-svh bg-ink">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[80rem] px-5 pb-20 pt-28 sm:px-8 sm:pt-32">
        <header>
          <p className="kicker">Apresentação interativa · 20 capítulos · ~20 min</p>
          <h1 className="mt-5 font-display text-3xl tracking-[0.14em] text-foreground sm:text-5xl">
            QUÍMICA ORGÂNICA
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Funções orgânicas, grupos funcionais, nomenclatura, aplicações, fenol e enol — divididos em
            quatro partes de aproximadamente cinco minutos.
          </p>
          <div className="hairline my-8" />
        </header>

        {/* Partes */}
        <section aria-labelledby="partes-title">
          <h2 id="partes-title" className="kicker">
            Apresentação em 4 partes
          </h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {parts.map((p) => {
              const active = p.number === chapter.part;
              return (
                <li
                  key={p.number}
                  className={`border p-5 transition-colors ${
                    active ? "border-crimson bg-surface/5" : "border-border"
                  }`}
                >
                  <p className="kicker text-[0.55rem]">
                    EP. {String(p.chapterRange[0]).padStart(2, "0")}–
                    {String(p.chapterRange[1]).padStart(2, "0")} · {p.duration}
                  </p>
                  <h3 className="mt-3 font-display text-lg tracking-[0.12em] text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs tracking-[0.16em] text-crimson uppercase">{p.presenter}</p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{p.focus}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {chaptersOfPart(p.number).map((c) => (
                      <li key={c.number}>
                        <button
                          type="button"
                          onClick={() => go(c.number)}
                          aria-current={c.number === chapter.number ? "true" : undefined}
                          className={`border px-2.5 py-1.5 text-[0.6rem] tracking-[0.2em] transition-colors ${
                            c.number === chapter.number
                              ? "border-crimson bg-crimson text-primary-foreground"
                              : "border-border text-muted-foreground hover:border-crimson/60 hover:text-foreground"
                          }`}
                        >
                          {String(c.number).padStart(2, "0")}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Capítulo atual */}
        <section aria-labelledby="cap-title" className="mt-14 border border-border bg-ink/40 p-6 sm:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="kicker">
              Capítulo {String(chapter.number).padStart(2, "0")} de {TOTAL_CHAPTERS} · Parte{" "}
              {part.number} — {part.title}
            </p>
            <p className="text-[0.6rem] tracking-[0.24em] text-muted-foreground uppercase">
              {part.presenter} · {chapter.duration}
            </p>
          </div>

          <h2
            id="cap-title"
            className="mt-5 font-display text-2xl leading-tight tracking-[0.1em] text-foreground sm:text-4xl"
          >
            {chapter.title}
          </h2>
          <p className="mt-3 text-sm tracking-[0.18em] text-crimson uppercase">{chapter.subtitle}</p>

          <div className="hairline my-7 max-w-sm" />

          <p className="max-w-3xl text-sm leading-relaxed text-foreground/90 sm:text-base">
            {chapter.summary}
          </p>

          {chapter.bullets && chapter.bullets.length > 0 && (
            <ul className="mt-7 grid gap-2 sm:grid-cols-2">
              {chapter.bullets.map((b) => (
                <li
                  key={b}
                  className="border-l border-crimson/60 pl-3 text-xs leading-relaxed text-muted-foreground"
                >
                  {b}
                </li>
              ))}
            </ul>
          )}

          <details className="group mt-8 border border-border">
            <summary className="cursor-pointer list-none px-4 py-3 text-[0.62rem] tracking-[0.28em] text-muted-foreground uppercase transition-colors hover:text-foreground">
              Roteiro da fala (~1 min)
            </summary>
            <p className="border-t border-border px-4 py-4 text-sm leading-relaxed text-muted-foreground">
              {chapter.script}
            </p>
          </details>

          <nav aria-label="Navegação entre capítulos" className="mt-9 flex items-center justify-between gap-4">
            <button
              type="button"
              disabled={prev === null}
              onClick={() => prev !== null && go(prev)}
              className="inline-flex items-center gap-2 border border-border px-5 py-3 text-[0.62rem] tracking-[0.28em] text-foreground uppercase transition-colors hover:border-crimson/60 disabled:opacity-40"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
              Anterior
            </button>
            <span className="text-[0.62rem] tracking-[0.28em] text-muted-foreground uppercase">
              {String(chapter.number).padStart(2, "0")} / {TOTAL_CHAPTERS}
            </span>
            <button
              type="button"
              disabled={next === null}
              onClick={() => next !== null && go(next)}
              className="inline-flex items-center gap-2 border border-crimson bg-crimson px-5 py-3 text-[0.62rem] tracking-[0.28em] text-primary-foreground uppercase transition-colors hover:bg-blood disabled:opacity-40"
            >
              Próximo
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </nav>
        </section>

        {/* Fontes */}
        <section aria-labelledby="fontes-title" className="mt-14">
          <h2 id="fontes-title" className="kicker">
            Fontes
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {sources.map((s) => (
              <li key={s.org} className="border border-border p-4">
                <p className="text-xs tracking-[0.2em] text-foreground uppercase">{s.org}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12">
          <Link
            to="/"
            className="text-[0.62rem] tracking-[0.28em] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            ← Trocar participante
          </Link>
        </div>
      </main>

      <footer className="border-t border-border px-5 py-10 text-center sm:px-8">
        <p className="kicker">Química Orgânica · Apresentação escolar · 2026</p>
      </footer>
    </div>
  );
}
