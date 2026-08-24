import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { ChemVisual } from "@/components/chem/ChemVisual";
import { loadProfiles, type Profile } from "@/lib/profiles";
import {
  TOTAL_CHAPTERS,
  chapters,
  chaptersOfPart,
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
      { title: "Catálogo da apresentação — Química Orgânica" },
      {
        name: "description",
        content:
          "Catálogo dos 20 capítulos da apresentação de Química Orgânica: funções orgânicas, grupos funcionais, nomenclatura, fenol, enol e aplicações.",
      },
      { property: "og:title", content: "Catálogo da apresentação — Química Orgânica" },
      {
        property: "og:description",
        content: "20 capítulos em 4 partes de ~5 minutos: fundamentos, fenol, enol e aplicações.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Catalogo,
});

function Catalogo() {
  const { cap } = Route.useSearch();
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    setProfiles(loadProfiles());
  }, []);

  const presenterName = (partNumber: number) =>
    profiles[partNumber - 1]?.name ?? parts[partNumber - 1]?.presenter ?? "";

  return (
    <div className="paper-grain min-h-svh overflow-x-hidden bg-ink">
      <SiteHeader />

      {/* Hero de catálogo */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 opacity-75">
          <ChemVisual
            chapter={cap}
            className="absolute -right-16 top-1/2 h-[130%] w-[70%] -translate-y-1/2 text-foreground"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-ink)_20%,color-mix(in_oklab,var(--color-ink)_82%,transparent)_58%,transparent)]" />
        </div>

        <div className="relative mx-auto flex min-h-[68svh] w-full max-w-[100rem] flex-col justify-end px-5 pb-12 pt-32 sm:px-10 sm:pb-16">
          <p className="kicker">Apresentação interativa · 20 capítulos · ~20 min</p>
          <h1 className="mt-6 max-w-4xl font-display text-3xl leading-[1.05] tracking-[0.1em] text-foreground sm:text-6xl">
            FUNÇÕES ORGÂNICAS
          </h1>
          <p className="mt-5 text-xs tracking-[0.26em] text-crimson uppercase sm:text-sm">
            Grupo funcional · Nomenclatura · Aplicações · Fenol &amp; Enol
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Quatro participantes, cinco minutos cada, vinte capítulos encadeados como episódios.
            Escolha um capítulo abaixo ou comece pelo primeiro.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/capitulo/$n"
              params={{ n: String(cap) }}
              className="inline-flex items-center gap-2 border border-crimson bg-crimson px-6 py-3.5 text-[0.62rem] tracking-[0.32em] text-primary-foreground uppercase transition-colors hover:bg-blood"
            >
              <Play className="size-4" aria-hidden="true" />
              Continuar EP. {String(cap).padStart(2, "0")}
            </Link>
            <Link
              to="/apresentar/$n"
              params={{ n: String(cap) }}
              className="inline-flex items-center gap-2 border border-border px-6 py-3.5 text-[0.62rem] tracking-[0.32em] text-foreground uppercase transition-colors hover:border-crimson/60"
            >
              Apresentar
            </Link>
            <span className="text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase">
              4 participantes · ~5 min cada · 20 partes
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[100rem] px-5 pb-20 pt-14 sm:px-10">
        {/* Fileiras por parte */}
        {parts.map((p) => (
          <section key={p.number} aria-labelledby={`parte-${p.number}`} className="mb-16">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2
                id={`parte-${p.number}`}
                className="font-display text-lg tracking-[0.16em] text-foreground sm:text-2xl"
              >
                PARTE {p.number} — {p.title}
              </h2>
              <p className="text-[0.6rem] tracking-[0.26em] text-muted-foreground uppercase">
                {presenterName(p.number)} · EP. {String(p.chapterRange[0]).padStart(2, "0")}–
                {String(p.chapterRange[1]).padStart(2, "0")} · {p.duration}
              </p>
            </div>
            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-muted-foreground">
              {p.focus}
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {chaptersOfPart(p.number).map((c) => (
                <li key={c.number} className="min-w-0">
                  <Link
                    to="/capitulo/$n"
                    params={{ n: String(c.number) }}
                    className={`group flex h-full flex-col border transition-colors ${
                      c.number === cap
                        ? "border-crimson bg-surface/10"
                        : "border-border hover:border-crimson/60"
                    }`}
                  >
                    <span className="relative block aspect-[3/4] overflow-hidden bg-ink">
                      <ChemVisual
                        chapter={c.number}
                        className="absolute inset-0 size-full text-foreground opacity-70 transition-transform duration-700 group-hover:scale-[1.06] motion-reduce:transition-none"
                      />
                      <span className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,var(--color-ink),transparent)]" />
                      <span className="absolute left-3 top-3 font-display text-xs tracking-[0.2em] text-crimson">
                        EP. {String(c.number).padStart(2, "0")}
                      </span>
                    </span>
                    <span className="flex flex-1 flex-col gap-2 p-3">
                      <span className="text-[0.68rem] leading-snug tracking-[0.1em] text-foreground uppercase">
                        {c.title}
                      </span>
                      <span className="text-[0.62rem] leading-relaxed text-muted-foreground">
                        {c.subtitle}
                      </span>
                      <span className="mt-auto text-[0.55rem] tracking-[0.24em] text-muted-foreground uppercase">
                        {c.duration}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Fontes */}
        <section aria-labelledby="fontes-title" className="mt-4">
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
        <p className="mt-6 text-[0.6rem] tracking-[0.24em] text-muted-foreground uppercase">
          {chapters.length} capítulos disponíveis
        </p>
      </main>

      <footer className="border-t border-border px-5 py-10 text-center sm:px-8">
        <p className="kicker">Química Orgânica · Apresentação escolar · 2026</p>
      </footer>
    </div>
  );
}
