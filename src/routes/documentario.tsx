import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Play, Film, Plus, Check } from "lucide-react";
import heroImage from "@/assets/hero-tokyo-night.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { EpisodeList } from "@/components/EpisodeList";
import { useWatchState } from "@/hooks/use-watch-state";
import { resumeEpisode, toggleMyList } from "@/lib/watch-state";
import { tryFullscreen } from "@/lib/fullscreen";
import { CATEGORIES, episodes, findEpisode, sources, TOTAL_EPISODES } from "@/lib/episodes";

export const Route = createFileRoute("/documentario")({
  head: () => ({
    meta: [
      { title: "YAKUZA — Documentário em 20 episódios | Yakuza Archive" },
      {
        name: "description",
        content:
          "Página do documentário YAKUZA: sinopse, temporada 01 com 20 episódios, progresso por perfil e fontes oficiais japonesas.",
      },
      { property: "og:title", content: "YAKUZA — Documentário em 20 episódios" },
      {
        property: "og:description",
        content: "Sobre o documentário, temporada 01, episódios e fontes de referência.",
      },
      { property: "og:type", content: "video.tv_show" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DocumentaryPage,
});

const SECTIONS = [
  { id: "sobre", label: "Sobre o documentário" },
  { id: "temporada", label: "Temporada 01" },
  { id: "episodios", label: "Episódios" },
  { id: "fontes", label: "Fontes" },
] as const;

function DocumentaryPage() {
  const navigate = useNavigate();
  const { state } = useWatchState();
  const [notice, setNotice] = useState<string | null>(null);
  const inList = state.myList.includes("yakuza");

  const announce = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice((n) => (n === message ? null : n)), 3600);
  };

  const current = findEpisode(state.currentEpisode) ?? episodes[0]!;

  const onWatch = () => {
    const next = resumeEpisode(state.currentEpisode, state.progress);
    tryFullscreen();
    void navigate({ to: "/cinema", search: { ep: next.currentEpisode } });
  };

  const onSelectEpisode = (n: number) => {
    const ep = findEpisode(n);
    const next = resumeEpisode(n, 0.02);
    announce(
      `EP. ${String(next.currentEpisode).padStart(2, "0")} — ${ep?.title ?? ""} selecionado (${Math.round(
        next.progress * 100,
      )}%).`,
    );
  };

  return (
    <div className="min-h-svh bg-ink">
      <SiteHeader />
      <main>
        <section
          aria-labelledby="doc-title"
          className="relative flex min-h-[34rem] flex-col justify-end overflow-clip"
          style={{ minHeight: "min(92svh, 56rem)" }}
        >
          <img
            src={heroImage}
            alt="Rua estreita de Tóquio à noite sob chuva, com letreiros japoneses refletidos no asfalto"
            width={1920}
            height={1088}
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover object-center opacity-90"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-ink)_4%,color-mix(in_oklab,var(--color-ink)_70%,transparent)_30%,transparent_64%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--color-ink)_76%,transparent),transparent_58%)]"
          />

          <div className="relative z-10 mx-auto w-full max-w-[110rem] px-5 pb-16 pt-32 sm:px-8 sm:pb-20">
            <div className="max-w-2xl">
              <p className="kicker text-foreground/70">
                Documentário · {TOTAL_EPISODES} episódios · Japão
              </p>
              <h1
                id="doc-title"
                className="mt-6 font-display text-6xl leading-[0.9] tracking-[0.12em] text-foreground sm:text-7xl"
              >
                YAKUZA
              </h1>
              <p className="mt-6 max-w-xl font-display text-base leading-relaxed tracking-[0.14em] text-foreground/90 uppercase sm:text-lg">
                A história por trás do crime organizado japonês
              </p>

              <div className="hairline my-7 max-w-sm" />

              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Vinte episódios sobre códigos, dinheiro e silêncio — da origem dos clãs ao lento
                apagamento provocado por três décadas de pressão legal.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={onWatch}
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

              <p aria-live="polite" className="mt-5 min-h-10 text-xs leading-relaxed tracking-[0.2em] text-gold/90">
                {notice}
              </p>
            </div>
          </div>
        </section>

        <nav
          aria-label="Seções do documentário"
          className="sticky z-30 border-y border-border bg-ink/92 backdrop-blur-md"
          style={{ top: "var(--header-h)" }}
        >
          <ul className="mx-auto flex w-full max-w-[110rem] gap-6 overflow-x-auto px-5 py-4 sm:gap-10 sm:px-8 [scrollbar-width:none]">
            {SECTIONS.map((s) => (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  className="text-[0.62rem] tracking-[0.28em] text-muted-foreground uppercase transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section id="sobre" aria-labelledby="sobre-title" className="py-16 scroll-mt-[calc(var(--header-h)+var(--section-nav-h)+1rem)] sm:py-20">
          <div className="mx-auto grid w-full max-w-[110rem] gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <h2
                id="sobre-title"
                className="font-display text-2xl tracking-[0.18em] text-foreground uppercase sm:text-3xl"
              >
                Sobre o documentário
              </h2>
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                De Osaka a Tóquio, a série reconstrói como grupos locais se tornaram organizações
                reconhecidas pelo Estado japonês — e como o mesmo Estado passou a sufocá-las por via
                econômica e legal. Cada episódio parte de material público: relatórios policiais,
                registros judiciais e pesquisa acadêmica.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                O tom é documental e sóbrio. Onde não há evidência pública, o episódio diz que não
                há: nenhum número, território ou vínculo é afirmado sem fonte.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-6 self-start border border-border bg-surface p-6">
              <div>
                <dt className="text-[0.58rem] tracking-[0.28em] text-muted-foreground uppercase">Episódios</dt>
                <dd className="mt-2 font-display text-2xl text-foreground">{TOTAL_EPISODES}</dd>
              </div>
              <div>
                <dt className="text-[0.58rem] tracking-[0.28em] text-muted-foreground uppercase">Temporada</dt>
                <dd className="mt-2 font-display text-2xl text-foreground">01</dd>
              </div>
              <div>
                <dt className="text-[0.58rem] tracking-[0.28em] text-muted-foreground uppercase">Origem</dt>
                <dd className="mt-2 font-display text-2xl text-foreground">Japão</dd>
              </div>
              <div>
                <dt className="text-[0.58rem] tracking-[0.28em] text-muted-foreground uppercase">Ano</dt>
                <dd className="mt-2 font-display text-2xl text-foreground">2026</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="temporada" aria-labelledby="temporada-title" className="pb-16 scroll-mt-[calc(var(--header-h)+var(--section-nav-h)+1rem)] sm:pb-20">
          <div className="mx-auto w-full max-w-[110rem] px-5 sm:px-8">
            <h2
              id="temporada-title"
              className="font-display text-2xl tracking-[0.18em] text-foreground uppercase sm:text-3xl"
            >
              Temporada 01
            </h2>
            <div className="mt-6 grid gap-6 border border-border bg-surface p-5 sm:p-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:items-center lg:gap-10">
              <div className="relative aspect-video overflow-clip border border-border">
                <img
                  src={current.image}
                  alt={current.alt}
                  width={1024}
                  height={576}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover opacity-85"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1 bg-[color-mix(in_oklab,var(--color-foreground)_20%,transparent)]"
                >
                  <div className="h-full bg-crimson" style={{ width: `${Math.round(state.progress * 100)}%` }} />
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-[0.62rem] tracking-[0.3em] text-gold/85 uppercase">
                  Você está em · EP. {String(current.number).padStart(2, "0")}
                </p>
                <p className="mt-4 font-display text-xl tracking-[0.12em] text-foreground uppercase sm:text-2xl">
                  {current.title}
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {current.description}
                </p>
                <p className="mt-5 text-[0.62rem] tracking-[0.26em] text-muted-foreground uppercase">
                  {String(current.number).padStart(2, "0")} / {String(TOTAL_EPISODES).padStart(2, "0")} ·{" "}
                  {state.completed.length} concluídos · {current.duration}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-[110rem] px-5 pb-2 pt-4 sm:px-8">
          <p className="kicker text-muted-foreground">Explorar por categoria</p>
          <div className="-mx-5 mt-4 flex snap-x gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {["TODAS", ...CATEGORIES].map((c) => (
              <Link
                key={c}
                to="/episodios"
                search={{ q: "", cat: c }}
                className="shrink-0 snap-start border border-border px-4 py-2 text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase transition-colors hover:border-gold/50 hover:text-foreground motion-reduce:transition-none"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>

        <div className="pb-16 sm:pb-20">
          <EpisodeList state={state} onSelect={onSelectEpisode} />
        </div>

        <section id="fontes" aria-labelledby="fontes-title" className="pb-20 scroll-mt-[calc(var(--header-h)+var(--section-nav-h)+1rem)]">
          <div className="mx-auto w-full max-w-[110rem] px-5 sm:px-8">
            <h2
              id="fontes-title"
              className="font-display text-2xl tracking-[0.18em] text-foreground uppercase sm:text-3xl"
            >
              Fontes
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Referências principais consultadas na pesquisa. O arquivo completo, com documentos e
              citações por episódio, chega em uma etapa posterior.
            </p>
            <ul className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {sources.map((s) => (
                <li key={s.org} className="bg-ink p-6">
                  <p className="font-display text-sm tracking-[0.16em] text-foreground uppercase">{s.org}</p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{s.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-10 text-center sm:px-8">
        <p className="kicker">Yakuza Archive — Japan / Archive / 2026</p>
      </footer>
    </div>
  );
}
