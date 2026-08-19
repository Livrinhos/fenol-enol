import { Play } from "lucide-react";
import money from "@/assets/cat-money-yen.jpg";
import type { WatchState } from "@/lib/watch-state";

const TITLES: Record<number, string> = {
  8: "De onde vem o dinheiro?",
};

type Props = {
  state: WatchState;
  onResume: () => void;
};

export function ContinueWatching({ state, onResume }: Props) {
  const ep = state.currentEpisode;
  const pct = Math.round(state.progress * 100);
  const title = TITLES[ep] ?? "Episódio em curso";
  const last = state.lastWatchedAt
    ? new Date(state.lastWatchedAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })
    : null;

  return (
    <section
      aria-labelledby="continue-title"
      className="mx-auto w-full max-w-[110rem] px-5 pt-16 sm:px-8 sm:pt-24"
    >
      <div className="rule-faint" />
      <h2 id="continue-title" className="kicker mt-6">
        Continuar assistindo
      </h2>

      <div className="mt-7 grid gap-7 lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] lg:items-end lg:gap-14">
        <button
          type="button"
          onClick={onResume}
          aria-label={`Retomar EP. ${String(ep).padStart(2, "0")} em ${pct}%`}
          className="group relative block aspect-video w-full overflow-clip"
        >
          <img
            src={money}
            alt="Notas de iene e livro-caixa sobre mesa escura"
            width={1024}
            height={576}
            loading="lazy"
            decoding="async"
            className="size-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--color-ink)_70%,transparent),transparent_55%)]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px bg-[color-mix(in_oklab,var(--color-foreground)_18%,transparent)]"
          >
            <span className="block h-full bg-crimson" style={{ width: `${pct}%` }} />
          </span>
        </button>

        <div className="min-w-0 pb-1">
          <p className="text-[0.6rem] tracking-[0.32em] text-gold/85 uppercase">
            EP. {String(ep).padStart(2, "0")} — {title.toUpperCase()}
          </p>
          <p className="mt-5 font-display text-3xl leading-none tracking-[0.14em] text-foreground sm:text-4xl">
            {String(ep).padStart(2, "0")}
            <span className="text-muted-foreground/70"> / {String(state.totalEpisodes).padStart(2, "0")}</span>
          </p>
          <p className="mt-5 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
            Proteção, construção civil e mercados cinzentos: a engrenagem financeira que sustentou
            os clãs por décadas.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              type="button"
              onClick={onResume}
              className="inline-flex items-center gap-3 border border-crimson bg-crimson px-6 py-3 text-[0.64rem] tracking-[0.3em] text-primary-foreground uppercase transition-colors duration-300 hover:bg-blood motion-reduce:transition-none"
            >
              <Play className="size-3.5" aria-hidden="true" />
              Retomar em {pct}%
            </button>
            <p className="text-[0.6rem] tracking-[0.26em] text-muted-foreground uppercase">
              {state.completed.length} concluídos
              {last ? ` · ${last}` : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

