import { Play, Check } from "lucide-react";
import { episodes as allEpisodes, TOTAL_EPISODES, type Episode } from "@/lib/episodes";
import type { WatchState } from "@/lib/watch-state";

type Props = {
  state: WatchState;
  onSelect: (episodeNumber: number) => void;
  items?: Episode[] | undefined;
  heading?: string | undefined;
  note?: string | undefined;
  hideHeader?: boolean | undefined;
};

function progressFor(state: WatchState, n: number) {
  if (state.currentEpisode === n) return Math.round(state.progress * 100);
  if (state.completed.includes(n)) return 100;
  return 0;
}

export function EpisodeList({ state, onSelect, items, heading, note, hideHeader }: Props) {
  const episodes = items ?? allEpisodes;
  return (
    <section aria-labelledby="episodios-title" id="episodios" className="scroll-mt-[calc(var(--header-h)+var(--section-nav-h)+1rem)]">
      <div className="mx-auto w-full max-w-[110rem] px-5 sm:px-8">
        <h2
          id="episodios-title"
          className={`font-display text-2xl leading-none tracking-[0.2em] text-foreground uppercase sm:text-3xl ${
            hideHeader ? "sr-only" : ""
          }`}
        >
          {heading ?? "Episódios"}
        </h2>
        {!hideHeader && (
          <p className="mt-3 text-[0.58rem] tracking-[0.3em] text-muted-foreground uppercase">
            {note ?? `Temporada 01 · ${TOTAL_EPISODES} episódios`}
          </p>
        )}


        {episodes.length === 0 && (
          <p className="mt-10 max-w-md text-sm leading-relaxed text-muted-foreground">
            Nenhum episódio corresponde a esse recorte. Ajuste a busca ou volte para “Todas”.
          </p>
        )}

        <ol className={hideHeader ? "flex flex-col" : "mt-10 flex flex-col"}>
          {episodes.map((ep) => {
            const pct = progressFor(state, ep.number);
            const isCurrent = state.currentEpisode === ep.number;
            const done = state.completed.includes(ep.number);
            return (
              <li key={ep.number} className="border-t border-border last:border-b">
                <button
                  type="button"
                  onClick={() => onSelect(ep.number)}
                  aria-current={isCurrent ? "true" : undefined}
                  className="group grid w-full grid-cols-1 gap-5 py-8 text-left transition-colors duration-300 hover:bg-surface/50 sm:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] sm:gap-10 sm:px-2 motion-reduce:transition-none"
                >
                  <span className="relative block aspect-video overflow-clip bg-surface">

                    <img
                      src={ep.image}
                      alt={ep.alt}
                      width={1024}
                      height={576}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center bg-ink/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                    >
                      <Play className="size-7 text-foreground" />
                    </span>
                    {pct > 0 && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-px bg-[color-mix(in_oklab,var(--color-foreground)_16%,transparent)]"
                      >
                        <span className="block h-full bg-crimson" style={{ width: `${pct}%` }} />
                      </span>
                    )}
                  </span>

                  <span className="block min-w-0 sm:pt-1">
                    <span className="flex flex-wrap items-center gap-x-5 gap-y-1">
                      <span className="font-display text-sm tracking-[0.3em] text-gold/85">
                        {String(ep.number).padStart(2, "0")}
                      </span>
                      <span className="text-[0.56rem] tracking-[0.3em] text-muted-foreground uppercase">
                        {ep.duration}
                      </span>
                      {done && !isCurrent && (
                        <span className="inline-flex items-center gap-1.5 text-[0.56rem] tracking-[0.3em] text-muted-foreground uppercase">
                          <Check className="size-3 text-gold" aria-hidden="true" /> Concluído
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-[0.56rem] tracking-[0.3em] text-crimson uppercase">
                          Em curso · {pct}%
                        </span>
                      )}
                    </span>

                    <span className="mt-4 block font-display text-lg leading-tight tracking-[0.14em] text-foreground uppercase sm:text-2xl">
                      {ep.title}
                    </span>

                    <span className="mt-3.5 block max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
                      {ep.description}
                    </span>
                  </span>

                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
