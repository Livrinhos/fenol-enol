import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Play, Film, Plus, Check, ChevronDown } from "lucide-react";

import heroImage from "@/assets/hero-tokyo-night.jpg";
import { resumeEpisode, toggleMyList } from "@/lib/watch-state";
import { tryFullscreen } from "@/lib/fullscreen";
import { useWatchState } from "@/hooks/use-watch-state";

export function Hero() {
  const navigate = useNavigate();
  const { state } = useWatchState();
  const inList = state.myList.includes("yakuza");
  const [notice, setNotice] = useState<string | null>(null);

  const announce = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice((n) => (n === message ? null : n)), 3200);
  };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[38rem] flex-col justify-end overflow-clip"
      style={{ minHeight: "min(100svh, 62rem)" }}
    >
      <img
        src={heroImage}
        alt="Rua estreita de Tóquio à noite sob chuva, com letreiros japoneses refletidos no asfalto molhado"
        width={1920}
        height={1088}
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover object-center opacity-90"
      />
      {/* legibility only — subtle editorial veils */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-ink)_4%,color-mix(in_oklab,var(--color-ink)_72%,transparent)_28%,transparent_62%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--color-ink)_78%,transparent),transparent_58%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[110rem] px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:pb-24">
        <div className="max-w-2xl">
          <p className="kicker text-foreground/70">Documentário · 20 episódios · Japão</p>

          <h1
            id="hero-title"
            className="mt-6 font-display text-6xl leading-[0.9] tracking-[0.12em] text-foreground sm:text-7xl lg:text-8xl"
          >
            YAKUZA
          </h1>

          <p className="mt-6 max-w-xl font-display text-base leading-relaxed tracking-[0.14em] text-foreground/90 uppercase sm:text-lg">
            A história por trás do crime organizado japonês
          </p>

          <div className="hairline my-7 max-w-sm" />

          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Um século de códigos, rituais e silêncio. De Osaka a Tóquio, arquivos raros e
            testemunhos reconstroem a ascensão — e o lento apagamento — dos clãs que moldaram o
            submundo japonês.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => {
                const next = resumeEpisode(state.currentEpisode, state.progress);
                tryFullscreen();
                void navigate({ to: "/cinema", search: { ep: next.currentEpisode } });
              }}
              className="inline-flex items-center gap-3 border border-crimson bg-crimson px-7 py-3.5 text-[0.68rem] tracking-[0.3em] text-primary-foreground uppercase transition-colors hover:bg-blood"
            >
              <Play className="size-4" aria-hidden="true" />
              Assistir
            </button>

            <button
              type="button"
              onClick={() => void navigate({ to: "/trailer" })}
              className="inline-flex items-center gap-3 border border-border bg-ink/50 px-7 py-3.5 text-[0.68rem] tracking-[0.3em] text-foreground uppercase backdrop-blur-sm transition-colors hover:border-gold/60"
            >
              <Film className="size-4" aria-hidden="true" />
              Trailer
            </button>


            <button
              type="button"
              aria-pressed={inList}
              onClick={() => {
                const added = toggleMyList("yakuza");
                announce(added ? "Adicionado à Minha Lista." : "Removido da Minha Lista.");
              }}
              className="inline-flex items-center gap-3 border border-border px-7 py-3.5 text-[0.68rem] tracking-[0.3em] text-muted-foreground uppercase transition-colors hover:border-gold/60 hover:text-foreground"
            >
              {inList ? (
                <Check className="size-4 text-gold" aria-hidden="true" />
              ) : (
                <Plus className="size-4" aria-hidden="true" />
              )}
              Minha Lista
            </button>
          </div>

          <p aria-live="polite" className="mt-5 min-h-5 text-xs tracking-[0.2em] text-gold/90">
            {notice}
          </p>
        </div>
      </div>

      <a
        href="#catalogo"
        className="relative z-10 mx-auto mb-8 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="text-[0.6rem] tracking-[0.34em] uppercase">Arquivo abaixo</span>
        <ChevronDown className="size-4 motion-safe:animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
