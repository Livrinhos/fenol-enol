import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

import documents from "@/assets/cat-documents.jpg";
import osaka from "@/assets/cat-osaka-canal.jpg";
import kobe from "@/assets/cat-kobe-port.jpg";
import rooftops from "@/assets/cat-tokyo-rooftops.jpg";

export const Route = createFileRoute("/arquivo")({
  head: () => ({
    meta: [
      { title: "Arquivo — YAKUZA ARCHIVE" },
      {
        name: "description",
        content:
          "Arquivo documental: cronologia, pontos de referência em Tóquio, Osaka e Kobe, organizações designadas, dados e fontes públicas japonesas.",
      },
      { property: "og:title", content: "Arquivo — YAKUZA ARCHIVE" },
      {
        property: "og:description",
        content: "Cronologia, mapa de referência, organizações, dados e fontes do documentário.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArquivoPage,
});

const SECTIONS = [
  { id: "cronologia", label: "Cronologia" },
  { id: "mapa", label: "Mapa" },
  { id: "organizacoes", label: "Organizações" },
  { id: "dados", label: "Dados" },
  { id: "fontes", label: "Fontes" },
] as const;

const TIMELINE = [
  { mark: "Bakuto", note: "Comunidades ligadas ao jogo, à margem da ordem social." },
  { mark: "Tekiya", note: "Vendedores ambulantes de feiras e festivais, com regras próprias." },
  { mark: "Organizações modernas", note: "Estruturas nomeadas, com emblema, sede e hierarquia." },
  { mark: "Século XX", note: "Consolidação urbana e aproximação com setores econômicos." },
  { mark: "Pós-guerra", note: "Vácuo institucional, mercados paralelos e crescimento rápido." },
  { mark: "Expansão", note: "Presença nacional durante o ciclo econômico ascendente." },
  { mark: "Repressão", note: "Leis antiexclusão e pressão policial contínua desde os anos 1990." },
  { mark: "Século XXI", note: "Redução sustentada do número de membros registrados." },
];

const CITIES = [
  {
    name: "Tóquio",
    note: "Área metropolitana — ponto de referência de presença registrada.",
    image: rooftops,
    alt: "Telhados de Tóquio ao amanhecer enevoado",
  },
  {
    name: "Osaka",
    note: "Região de Kansai — ponto de referência de presença registrada.",
    image: osaka,
    alt: "Canal de Osaka à noite com reflexos de luzes",
  },
  {
    name: "Kobe",
    note: "Hyōgo — ponto de referência de presença registrada.",
    image: kobe,
    alt: "Porto de Kobe à noite com guindastes e névoa",
  },
];

const ORGS = [
  {
    name: "Yamaguchi-gumi",
    note: "Grupo designado pelas autoridades japonesas, historicamente associado à região de Kansai.",
  },
  {
    name: "Sumiyoshi-kai",
    note: "Grupo designado, com presença historicamente associada à área metropolitana de Tóquio.",
  },
  {
    name: "Inagawa-kai",
    note: "Grupo designado, também associado publicamente à região da capital.",
  },
];

const SOURCES = [
  { org: "National Police Agency", note: "Relatórios anuais e estatísticas de bōryokudan." },
  { org: "Ministry of Justice", note: "Publicações sobre legislação e persecução penal." },
  { org: "UNODC", note: "Estudos comparados sobre crime organizado transnacional." },
  { org: "JAFIC", note: "Inteligência financeira e relatórios de movimentações suspeitas." },
  { org: "Pesquisa acadêmica", note: "Literatura revisada por pares sobre história e sociologia." },
];

const scrollMt = "scroll-mt-[calc(var(--header-h)+var(--section-nav-h)+1rem)]";

function ArquivoPage() {
  return (
    <div className="min-h-svh bg-ink">
      <SiteHeader />

      <main>
        <section
          aria-labelledby="arquivo-title"
          className="relative overflow-clip border-b border-border"
        >
          <img
            src={documents}
            alt="Documentos e relatórios policiais japoneses sobre uma mesa escura"
            loading="eager"
            className="absolute inset-0 size-full object-cover opacity-35"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-ink)_10%,color-mix(in_oklab,var(--color-ink)_70%,transparent)_60%,color-mix(in_oklab,var(--color-ink)_50%,transparent))]"
          />
          <div className="relative mx-auto w-full max-w-[110rem] px-5 pb-16 sm:px-8"
            style={{ paddingTop: "calc(var(--header-h) + 4rem)" }}
          >
            <p className="kicker">Arquivo · fontes públicas</p>
            <h1
              id="arquivo-title"
              className="mt-6 font-display text-5xl leading-[0.92] tracking-[0.14em] text-foreground sm:text-6xl lg:text-7xl"
            >
              ARQUIVO
            </h1>
            <div className="hairline my-7 max-w-sm" />
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Material de apoio do documentário: marcos históricos, pontos de referência
              geográfica, organizações designadas e os dados citados em tela — sempre com a fonte
              indicada.
            </p>
          </div>
        </section>

        <nav
          aria-label="Seções do arquivo"
          className="sticky z-40 border-b border-border bg-ink/92 backdrop-blur-md"
          style={{ top: "var(--header-h)", height: "var(--section-nav-h)" }}
        >
          <ul className="mx-auto flex h-full w-full max-w-[110rem] items-center gap-6 overflow-x-auto px-5 sm:px-8">
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

        <div className="mx-auto w-full max-w-[110rem] px-5 sm:px-8">
          {/* CRONOLOGIA */}
          <section id="cronologia" aria-labelledby="cronologia-title" className={`py-16 ${scrollMt}`}>
            <p className="kicker">01</p>
            <h2
              id="cronologia-title"
              className="mt-4 font-display text-3xl tracking-[0.14em] text-foreground sm:text-4xl"
            >
              CRONOLOGIA
            </h2>
            <ol className="mt-10 border-l border-border pl-6 sm:pl-10">
              {TIMELINE.map((t, i) => (
                <li key={t.mark} className="relative pb-10 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.72rem] top-2 size-1.5 bg-crimson sm:-left-[2.72rem]"
                  />
                  <p className="text-[0.6rem] tracking-[0.3em] text-gold/80 uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-xl tracking-[0.16em] text-foreground uppercase sm:text-2xl">
                    {t.mark}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {t.note}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <div className="hairline" />

          {/* MAPA */}
          <section id="mapa" aria-labelledby="mapa-title" className={`py-16 ${scrollMt}`}>
            <p className="kicker">02</p>
            <h2
              id="mapa-title"
              className="mt-4 font-display text-3xl tracking-[0.14em] text-foreground sm:text-4xl"
            >
              MAPA
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Tóquio, Osaka e Kobe aparecem como pontos de referência de presença registrada em
              relatórios oficiais. Não são territórios atribuídos: nenhum limite geográfico é
              inventado neste arquivo.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CITIES.map((c) => (
                <figure key={c.name} className="border border-border bg-surface">
                  <img
                    src={c.image}
                    alt={c.alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover grayscale-[0.4]"
                  />
                  <figcaption className="p-5">
                    <h3 className="font-display text-lg tracking-[0.18em] text-foreground uppercase">
                      {c.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.note}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <div className="hairline" />

          {/* ORGANIZAÇÕES */}
          <section
            id="organizacoes"
            aria-labelledby="organizacoes-title"
            className={`py-16 ${scrollMt}`}
          >
            <p className="kicker">03</p>
            <h2
              id="organizacoes-title"
              className="mt-4 font-display text-3xl tracking-[0.14em] text-foreground sm:text-4xl"
            >
              ORGANIZAÇÕES
            </h2>
            <ul className="mt-10 grid gap-px bg-border sm:grid-cols-3">
              {ORGS.map((o) => (
                <li key={o.name} className="bg-ink p-6">
                  <h3 className="font-display text-lg tracking-[0.16em] text-foreground uppercase">
                    {o.name}
                  </h3>
                  <div className="hairline my-4 max-w-[8rem]" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{o.note}</p>
                </li>
              ))}
            </ul>
          </section>

          <div className="hairline" />

          {/* DADOS */}
          <section id="dados" aria-labelledby="dados-title" className={`py-16 ${scrollMt}`}>
            <p className="kicker">04</p>
            <h2
              id="dados-title"
              className="mt-4 font-display text-3xl tracking-[0.14em] text-foreground sm:text-4xl"
            >
              DADOS
            </h2>
            <div className="mt-10 grid items-center gap-10 border border-border bg-surface p-8 sm:p-12 lg:grid-cols-[auto_minmax(0,1fr)]">
              <p className="font-display text-6xl leading-none tracking-[0.06em] text-crimson sm:text-7xl lg:text-8xl">
                18.800
              </p>
              <div>
                <p className="text-[0.62rem] tracking-[0.3em] text-gold/80 uppercase">
                  Membros registrados
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Número de referência usado no documentário para ilustrar a queda sustentada de
                  membros ao longo das últimas décadas.
                </p>
                <p className="mt-6 border-l-2 border-crimson pl-4 text-xs leading-relaxed text-muted-foreground">
                  Aviso editorial: na versão final, este número deve citar explicitamente o
                  relatório da National Police Agency (NPA), com ano e página de referência.
                </p>
              </div>
            </div>
          </section>

          <div className="hairline" />

          {/* FONTES */}
          <section id="fontes" aria-labelledby="fontes-title" className={`py-16 pb-24 ${scrollMt}`}>
            <p className="kicker">05</p>
            <h2
              id="fontes-title"
              className="mt-4 font-display text-3xl tracking-[0.14em] text-foreground sm:text-4xl"
            >
              FONTES
            </h2>
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {SOURCES.map((s) => (
                <li key={s.org} className="grid gap-2 py-6 sm:grid-cols-[16rem_minmax(0,1fr)]">
                  <p className="font-display text-base tracking-[0.16em] text-foreground uppercase">
                    {s.org}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.note}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="border-t border-border px-5 py-10 text-center sm:px-8">
        <p className="kicker">Yakuza Archive — Japan / Archive / 2026</p>
      </footer>
    </div>
  );
}
