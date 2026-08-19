import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import { chapters, findChapter } from "@/lib/chapters";
import { ChapterVisual } from "@/components/cinema/ChapterVisual";
import { TOTAL_EPISODES } from "@/lib/episodes";
import { loadWatchState, updateWatchState } from "@/lib/watch-state";

type Search = { ep?: number };

export const Route = createFileRoute("/cinema")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const raw = Number(search["ep"]);
    return Number.isFinite(raw) && raw >= 1 && raw <= TOTAL_EPISODES
      ? { ep: Math.trunc(raw) }
      : {};
  },
  head: () => ({
    meta: [
      { title: "Modo Cinema — YAKUZA ARCHIVE" },
      {
        name: "description",
        content:
          "Experiência documental em tela cheia: 20 capítulos sobre a história do crime organizado japonês.",
      },
      { property: "og:title", content: "Modo Cinema — YAKUZA ARCHIVE" },
      {
        property: "og:description",
        content: "Vinte capítulos em tela cheia sobre a história do crime organizado japonês.",
      },
      { property: "og:type", content: "video.episode" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CinemaMode,
});

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function CinemaMode() {
  const navigate = useNavigate();
  const { ep } = Route.useSearch();

  const [current, setCurrent] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [uiVisible, setUiVisible] = useState(true);
  const hideTimer = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  // resolve initial chapter from deep link or saved profile state
  useEffect(() => {
    const saved = loadWatchState();
    const initial = ep ?? saved.currentEpisode ?? 8;
    setCurrent(Math.min(TOTAL_EPISODES, Math.max(1, initial)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep deep link in sync + persist progress per profile
  useEffect(() => {
    if (current == null) return;
    void navigate({ to: "/cinema", search: { ep: current }, replace: true });

    const state = loadWatchState();
    const completed = new Set(state.completed);
    for (let i = 1; i < current; i += 1) completed.add(i);
    updateWatchState({
      currentEpisode: current,
      progress: Math.min(0.99, current / TOTAL_EPISODES),
      lastWatchedAt: new Date().toISOString(),
      completed: [...completed].sort((a, b) => a - b),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const revealUi = useCallback(() => {
    setUiVisible(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setUiVisible(false), 3200);
  }, []);

  useEffect(() => {
    revealUi();
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, [revealUi, current]);

  const exit = useCallback(() => {
    if (typeof document !== "undefined" && document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined);
    }
    void navigate({ to: "/home" });
  }, [navigate]);

  const next = useCallback(() => {
    setCurrent((c) => {
      if (c == null) return c;
      if (c >= TOTAL_EPISODES) {
        const state = loadWatchState();
        const completed = new Set(state.completed);
        for (let i = 1; i <= TOTAL_EPISODES; i += 1) completed.add(i);
        updateWatchState({
          completed: [...completed].sort((a, b) => a - b),
          progress: 1,
          lastWatchedAt: new Date().toISOString(),
        });
        setFinished(true);
        return c;
      }
      return c + 1;
    });
    revealUi();
  }, [revealUi]);

  const prev = useCallback(() => {
    if (finished) {
      setFinished(false);
      revealUi();
      return;
    }
    setCurrent((c) => (c == null ? c : Math.max(1, c - 1)));
    revealUi();
  }, [finished, revealUi]);

  const restart = () => {
    updateWatchState({
      currentEpisode: 1,
      progress: 0.02,
      completed: [],
      lastWatchedAt: new Date().toISOString(),
    });
    setFinished(false);
    setCurrent(1);
  };

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (typing) return;

      if (e.key === "Escape") {
        e.preventDefault();
        exit();
      } else if (["ArrowRight", "ArrowDown", " ", "Spacebar", "PageDown"].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [exit, next, prev]);

  // pointer gestures: swipe any direction + tap halves
  const pointer = useRef<{ id: number; x: number; y: number; t: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    pointer.current = { id: e.pointerId, x: e.clientX, y: e.clientY, t: Date.now() };
    revealUi();
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const start = pointer.current;
    pointer.current = null;
    if (!start || start.id !== e.pointerId) return;
    if ((e.target as HTMLElement).closest("button,a")) return;

    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    const dist = Math.hypot(dx, dy);
    const elapsed = Date.now() - start.t;

    if (dist > 56) {
      if (Math.abs(dx) > Math.abs(dy)) {
        dx < 0 ? next() : prev();
      } else {
        dy < 0 ? next() : prev();
      }
      return;
    }

    if (dist < 12 && elapsed < 600 && e.pointerType !== "mouse") {
      const rect = stageRef.current?.getBoundingClientRect();
      if (!rect) return;
      e.clientX - rect.left > rect.width / 2 ? next() : prev();
    }
  };

  if (current == null) {
    return <div className="min-h-[100dvh] bg-ink" aria-hidden="true" />;
  }

  const chapter = findChapter(current);

  return (
    <main
      ref={stageRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (pointer.current = null)}
      onMouseMove={revealUi}
      className="relative min-h-[100dvh] touch-pan-y bg-ink text-foreground select-none"
      aria-label="Modo cinema"
    >
      {finished ? (
        <FinishScreen onRestart={restart} onExit={exit} />
      ) : (
        <article
          key={chapter.number}
          aria-live="polite"
          className="relative flex min-h-[100dvh] flex-col justify-end motion-safe:animate-[chapter-in_700ms_ease-out]"
        >
          <img
            src={chapter.image}
            alt={chapter.alt}
            width={1920}
            height={1088}
            loading={chapter.number === current ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 size-full object-cover opacity-70"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-ink)_10%,color-mix(in_oklab,var(--color-ink)_78%,transparent)_44%,color-mix(in_oklab,var(--color-ink)_35%,transparent)_100%)]"
          />

          <div
            className="relative z-10 mx-auto grid w-full max-w-[110rem] gap-8 px-5 sm:px-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16"
            style={{
              paddingTop: "calc(env(safe-area-inset-top, 0px) + 5rem)",
              paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 6.5rem)",
            }}
          >
            <div className="min-w-0">
              <p className="font-display text-sm tracking-[0.4em] text-gold/85">
                Capítulo {pad(chapter.number)}
              </p>
              <h1 className="mt-4 font-display text-[clamp(2rem,7vw,4.2rem)] leading-[0.95] tracking-[0.06em] text-foreground uppercase">
                {chapter.title}
              </h1>
              {chapter.subtitle && (
                <p className="mt-4 text-[0.68rem] tracking-[0.3em] text-muted-foreground uppercase">
                  {chapter.subtitle}
                </p>
              )}
              <div className="hairline my-7 max-w-sm" />
              <p className="max-w-2xl text-sm leading-relaxed text-foreground/85 sm:text-base">
                {chapter.narrative}
              </p>
              {chapter.source && (
                <p className="mt-6 text-[0.6rem] tracking-[0.22em] text-muted-foreground uppercase">
                  Fonte · {chapter.source}
                </p>
              )}
            </div>

            <div className="min-w-0">
              <ChapterVisual visual={chapter.visual} />
            </div>
          </div>
        </article>
      )}

      {/* discrete controls */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-20 transition-opacity duration-500 motion-reduce:transition-none ${
          uiVisible ? "opacity-100" : "opacity-0 focus-within:opacity-100"
        }`}
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)" }}
      >
        <div className="pointer-events-auto mx-auto flex w-full max-w-[110rem] items-center justify-between px-5 sm:px-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              disabled={!finished && current === 1}
              aria-label="Capítulo anterior"
              className="inline-flex size-10 items-center justify-center border border-border/70 bg-ink/70 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground disabled:opacity-30"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <p className="font-display text-xs tracking-[0.3em] text-foreground/85 tabular-nums">
              {finished ? "20 / 20" : `${pad(current)} / ${TOTAL_EPISODES}`}
            </p>
            <button
              type="button"
              onClick={next}
              aria-label="Próximo capítulo"
              className="inline-flex size-10 items-center justify-center border border-border/70 bg-ink/70 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            onClick={exit}
            className="inline-flex items-center gap-2 border border-border/70 bg-ink/70 px-4 py-2.5 text-[0.62rem] tracking-[0.3em] text-muted-foreground uppercase backdrop-blur-sm transition-colors hover:text-foreground"
          >
            <X className="size-3.5" aria-hidden="true" />
            Sair
          </button>
        </div>

        <div
          aria-hidden="true"
          className="mx-auto mt-4 h-px w-full max-w-[110rem] bg-[color-mix(in_oklab,var(--color-foreground)_12%,transparent)]"
        >
          <div
            className="h-px bg-crimson"
            style={{ width: `${((finished ? TOTAL_EPISODES : current) / TOTAL_EPISODES) * 100}%` }}
          />
        </div>
      </div>
    </main>
  );
}

function FinishScreen({ onRestart, onExit }: { onRestart: () => void; onExit: () => void }) {
  return (
    <section
      className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center motion-safe:animate-[chapter-in_700ms_ease-out]"
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 5rem)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 7rem)",
      }}
    >
      <p className="text-[0.62rem] tracking-[0.36em] text-muted-foreground uppercase">
        Você terminou o documentário.
      </p>
      <h1 className="mt-8 font-display text-[clamp(3rem,12vw,7rem)] leading-none tracking-[0.1em] text-foreground">
        YAKUZA
      </h1>
      <p className="mt-6 font-display text-sm tracking-[0.34em] text-gold/85 uppercase">
        20 episódios
      </p>
      <p className="mt-3 text-[0.62rem] tracking-[0.3em] text-muted-foreground uppercase">
        Japão · Crime organizado · História
      </p>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="border border-crimson bg-crimson px-6 py-3.5 text-[0.62rem] tracking-[0.3em] text-primary-foreground uppercase transition-colors hover:bg-blood"
        >
          Assistir novamente
        </button>
        <button
          type="button"
          onClick={onExit}
          className="border border-border px-6 py-3.5 text-[0.62rem] tracking-[0.3em] text-foreground uppercase transition-colors hover:border-gold/60"
        >
          Voltar ao catálogo
        </button>
        <Link
          to="/arquivo"
          hash="fontes"
          className="border border-border px-6 py-3.5 text-[0.62rem] tracking-[0.3em] text-muted-foreground uppercase transition-colors hover:border-gold/60 hover:text-foreground"
        >
          Ver fontes
        </Link>
      </div>

      <p className="mt-10 text-[0.6rem] tracking-[0.22em] text-muted-foreground/70 uppercase">
        {chapters.length} capítulos · fontes públicas
      </p>
    </section>
  );
}
