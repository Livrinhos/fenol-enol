import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SiteHeader } from "@/components/SiteHeader";
import { EpisodeList } from "@/components/EpisodeList";
import { useWatchState } from "@/hooks/use-watch-state";
import { resumeEpisode } from "@/lib/watch-state";
import { findEpisode, searchEpisodes, TOTAL_EPISODES } from "@/lib/episodes";

type EpisodesSearch = { q: string; cat: string };

export const Route = createFileRoute("/episodios")({
  validateSearch: (search: Record<string, unknown>): EpisodesSearch => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
    cat: typeof search["cat"] === "string" ? search["cat"] : "TODAS",
  }),
  head: () => ({
    meta: [
      { title: "Episódios — Temporada 01 | Yakuza Archive" },
      {
        name: "description",
        content:
          "Os 20 episódios da temporada 01 de YAKUZA, com descrição, duração estimada e progresso salvo por perfil.",
      },
      { property: "og:title", content: "Episódios — Temporada 01 | Yakuza Archive" },
      {
        property: "og:description",
        content: "Lista completa dos 20 episódios do documentário YAKUZA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EpisodesPage,
});

function EpisodesPage() {
  const { state } = useWatchState();
  const { q, cat } = Route.useSearch();
  const navigate = useNavigate();
  const [notice, setNotice] = useState<string | null>(null);

  const filtered = useMemo(() => searchEpisodes(q, cat), [q, cat]);

  const setSearch = (next: Partial<EpisodesSearch>) => {
    void navigate({
      to: "/episodios",
      search: { q, cat, ...next },
      replace: true,
    });
  };

  const onSelect = (n: number) => {
    const ep = findEpisode(n);
    const next = resumeEpisode(n, 0.02);
    const message = `EP. ${String(next.currentEpisode).padStart(2, "0")} — ${ep?.title ?? ""} selecionado (${Math.round(
      next.progress * 100,
    )}%).`;
    setNotice(message);
    window.setTimeout(() => setNotice((c) => (c === message ? null : c)), 3600);
  };

  return (
    <div className="min-h-svh bg-ink">
      <SiteHeader />
      <main className="pt-32 pb-24 sm:pt-40">
        <div className="mx-auto w-full max-w-[110rem] px-5 sm:px-8">
          <p className="kicker">
            Yakuza · Temporada 01 · {TOTAL_EPISODES} episódios
          </p>
          <h1 className="mt-6 font-display text-4xl leading-none tracking-[0.16em] text-foreground uppercase sm:text-6xl">
            Episódios
          </h1>
          <div className="hairline my-8 max-w-xs" />
          <p className="max-w-[54ch] text-sm leading-relaxed text-muted-foreground">
            Selecione um episódio para marcar sua posição. O progresso é salvo no perfil ativo.{" "}
            <Link
              to="/documentario"
              className="text-gold underline decoration-gold/30 underline-offset-4 transition-colors hover:decoration-gold"
            >
              Ver a página do documentário
            </Link>
            .
          </p>

          <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-end lg:gap-14">
            <div className="min-w-0">
              <label htmlFor="ep-search" className="kicker block">

                Buscar
              </label>
              <input
                id="ep-search"
                type="search"
                value={q}
                onChange={(e) => setSearch({ q: e.target.value })}
                placeholder="Ex.: dinheiro"
                className="mt-3 w-full border-b border-border bg-transparent py-2 font-display text-base tracking-[0.1em] text-foreground outline-none transition-colors duration-300 placeholder:font-sans placeholder:text-sm placeholder:tracking-[0.14em] placeholder:text-muted-foreground/70 focus-visible:border-gold/70 motion-reduce:transition-none"
              />
            </div>

            <CategoryFilter value={cat} onChange={(v) => setSearch({ cat: v })} count={filtered.length} />
          </div>

          <p aria-live="polite" className="mt-6 min-h-5 text-[0.6rem] tracking-[0.26em] text-gold/90 uppercase">
            {notice}
          </p>
        </div>

        <div className="mt-12">
          <EpisodeList
            state={state}
            onSelect={onSelect}
            items={filtered}
            hideHeader
          />
        </div>
      </main>
      <footer className="mt-8 border-t border-border px-5 py-12 text-center sm:px-8">
        <p className="kicker">Yakuza Archive — Japan / Archive / 2026</p>
      </footer>
    </div>
  );
}

