import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { X, Play } from "lucide-react";

import { trailerScenes, trailerTotalMs } from "@/lib/trailer";
import { loadWatchState } from "@/lib/watch-state";
import { tryFullscreen } from "@/lib/fullscreen";

export const Route = createFileRoute("/trailer")({
  head: () => ({
    meta: [
      { title: "Trailer — YAKUZA ARCHIVE" },
      {
        name: "description",
        content:
          "Trailer interativo de 30 segundos do documentário YAKUZA: Tóquio, origens, hierarquia, dinheiro e declínio.",
      },
      { property: "og:title", content: "Trailer — YAKUZA ARCHIVE" },
      {
        property: "og:description",
        content: "Sequência cinematográfica de abertura do documentário YAKUZA.",
      },
      { property: "og:type", content: "video.other" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TrailerPage,
});

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

function TrailerPage() {
  const navigate = useNavigate();
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const timer = useRef<number | null>(null);
  const startedAt = useRef<number>(0);

  const scene = trailerScenes[index]!;
  const seconds = Math.round(trailerTotalMs / 1000);

  // advance scenes
  useEffect(() => {
    if (done) return;
    timer.current = window.setTimeout(() => {
      if (index >= trailerScenes.length - 1) setDone(true);
      else setIndex((i) => i + 1);
    }, scene.ms);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [index, done, scene.ms]);

  // progress ticker
  useEffect(() => {
    if (done) return;
    startedAt.current = performance.now() - elapsed;
    let raf = 0;
    const tick = () => {
      setElapsed(Math.min(trailerTotalMs, performance.now() - startedAt.current));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const exit = useMemo(
    () => () => {
      void navigate({ to: "/home" });
    },
    [navigate],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") exit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [exit]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced) return;
    const px = e.clientX / window.innerWidth - 0.5;
    const py = e.clientY / window.innerHeight - 0.5;
    setParallax({ x: px * -18, y: py * -12 });
  };

  const pct = Math.min(100, (elapsed / trailerTotalMs) * 100);

  const startCinema = () => {
    const saved = loadWatchState();
    tryFullscreen();
    void navigate({ to: "/cinema", search: { ep: saved.currentEpisode ?? 1 } });
  };

  if (done) {
    return (
      <main className="relative flex min-h-svh flex-col items-center justify-center bg-ink px-6 text-center">
        <p className="kicker">Fim do trailer</p>
        <h1 className="mt-6 font-display text-5xl tracking-[0.16em] text-foreground sm:text-7xl">
          YAKUZA
        </h1>
        <div className="hairline my-8 w-full max-w-sm" />
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Vinte capítulos sobre códigos, dinheiro e silêncio — construídos a partir de fontes
          públicas japonesas.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={startCinema}
            className="inline-flex items-center gap-3 border border-crimson bg-crimson px-6 py-3.5 text-[0.62rem] tracking-[0.3em] text-primary-foreground uppercase transition-colors hover:bg-blood"
          >
            <Play className="size-4" aria-hidden="true" />
            Entrar no modo cinema
          </button>
          <button
            type="button"
            onClick={() => {
              setIndex(0);
              setElapsed(0);
              setDone(false);
            }}
            className="border border-border px-6 py-3.5 text-[0.62rem] tracking-[0.3em] text-foreground uppercase transition-colors hover:border-gold/60"
          >
            Ver novamente
          </button>
          <Link
            to="/home"
            className="border border-border px-6 py-3.5 text-[0.62rem] tracking-[0.3em] text-muted-foreground uppercase transition-colors hover:border-gold/60 hover:text-foreground"
          >
            Voltar
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      onPointerMove={onPointerMove}
      aria-label="Trailer do documentário YAKUZA"
      className="relative min-h-svh bg-ink"
      style={{ minHeight: "100svh" }}
    >
      <div className="absolute inset-0 overflow-clip">
        {trailerScenes.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== index}
            className="absolute inset-0 transition-opacity duration-[900ms] ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <img
              src={s.image}
              alt={i === index ? s.alt : ""}
              loading={i <= 1 ? "eager" : "lazy"}
              decoding="async"
              className="size-full object-cover"
              style={{
                transform: reduced
                  ? undefined
                  : `scale(${i === index ? 1.08 : 1.02}) translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
                transition: reduced
                  ? undefined
                  : "transform 4200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 900ms ease-out",
                filter: "grayscale(0.25) contrast(1.05)",
              }}
            />
          </div>
        ))}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-ink)_6%,color-mix(in_oklab,var(--color-ink)_62%,transparent)_38%,color-mix(in_oklab,var(--color-ink)_38%,transparent)_100%)]"
        />
      </div>

      <div className="relative z-10 flex min-h-svh flex-col justify-between px-5 py-6 sm:px-10 sm:py-8">
        <div className="flex items-start justify-between gap-4">
          <p className="kicker hidden text-foreground/60 sm:block">Japan / Archive / 2026</p>
          <button
            type="button"
            onClick={exit}
            className="ml-auto inline-flex shrink-0 items-center gap-2 whitespace-nowrap border border-border bg-ink/50 px-4 py-2.5 text-[0.6rem] tracking-[0.28em] text-foreground uppercase backdrop-blur-sm transition-colors hover:border-gold/60"
          >
            <X className="size-3.5" aria-hidden="true" />
            Pular trailer
          </button>
        </div>

        <div key={scene.id} className="max-w-3xl motion-safe:animate-archive-in">
          <h1 className="font-display text-5xl leading-[0.92] tracking-[0.14em] text-foreground sm:text-7xl lg:text-8xl">
            {scene.title}
          </h1>
          <div className="hairline my-6 max-w-xs" />
          <p className="max-w-xl text-sm leading-relaxed text-foreground/85 sm:text-base">
            {scene.line}
          </p>
        </div>

        <div>
          <div
            role="progressbar"
            aria-label="Progresso do trailer"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pct)}
            className="h-px w-full bg-border"
          >
            <div className="h-px bg-crimson" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-3 flex items-center justify-between text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase">
            <span>
              {String(index + 1).padStart(2, "0")} / {String(trailerScenes.length).padStart(2, "0")}
            </span>
            <span aria-live="polite">{scene.title}</span>
            <span>{seconds}s</span>
          </div>
        </div>
      </div>
    </main>
  );
}
