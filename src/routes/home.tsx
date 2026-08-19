import { createFileRoute, Link } from "@tanstack/react-router";
import { ChemHeader } from "@/components/chem/ChemHeader";
import { ChemVisual } from "@/components/chem/ChemVisual";
import { parts, chapters } from "@/lib/curriculum";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Química Orgânica — Fenol & Enol" },
      {
        name: "description",
        content:
          "Apresentação interativa sobre funções orgânicas, grupos funcionais, nomenclatura, aplicações, fenol e enol.",
      },
      { property: "og:title", content: "Química Orgânica — Fenol & Enol" },
      {
        property: "og:description",
        content:
          "20 capítulos, 4 integrantes e uma experiência visual sobre fenol, enol e tautomeria ceto-enólica.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ChemistryHome,
});

function ChemistryHome() {
  return (
    <div className="min-h-svh bg-ink text-foreground">
      <ChemHeader />

      <main>
        <section className="relative overflow-clip px-5 pb-16 pt-36 sm:px-8 sm:pt-44 lg:min-h-[78svh] lg:px-12 lg:pt-52">
          <div className="absolute inset-0 opacity-25 paper-grain" aria-hidden="true" />
          <div className="relative mx-auto grid w-full max-w-[110rem] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="kicker text-cyan">Química Orgânica / 2026</p>
              <h1 className="mt-6 max-w-4xl font-display text-[clamp(3rem,9vw,7rem)] leading-[0.9] tracking-[0.04em]">
                FENOL <span className="text-cyan">&</span> ENOL
              </h1>
              <div className="hairline my-8 max-w-xl" />
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Funções orgânicas, grupo funcional, nomenclatura e aplicações — explicados em uma apresentação interativa para quatro integrantes.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/conteudo"
                  className="border border-cyan bg-cyan px-6 py-3 text-[0.62rem] tracking-[0.28em] text-ink uppercase transition-colors hover:bg-paper"
                >
                  Começar apresentação
                </Link>
                <Link
                  to="/conteudo"
                  hash="fenol"
                  className="border border-border px-6 py-3 text-[0.62rem] tracking-[0.28em] text-foreground uppercase transition-colors hover:border-cyan"
                >
                  Ver Fenol
                </Link>
                <Link
                  to="/conteudo"
                  hash="enol"
                  className="border border-border px-6 py-3 text-[0.62rem] tracking-[0.28em] text-foreground uppercase transition-colors hover:border-cyan"
                >
                  Ver Enol
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-xl border border-border/70 bg-surface/50 p-8 lg:p-12">
              <div className="aspect-[1.4] text-cyan/80">
                <ChemVisual kind="compare" />
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <p className="kicker">Estrutura → função</p>
                <p className="kicker text-muted-foreground">20 capítulos</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto w-full max-w-[110rem]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="kicker text-cyan">Estrutura da apresentação</p>
                <h2 className="mt-3 font-display text-3xl tracking-[0.08em] sm:text-4xl">
                  4 PARTES / 20 CAPÍTULOS
                </h2>
              </div>
              <p className="kicker text-muted-foreground">~5 min por integrante</p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {parts.map((part) => (
                <article key={part.id} className="border border-border bg-surface/40 p-6 transition-colors hover:border-cyan/50">
                  <p className="kicker text-cyan">{part.range}</p>
                  <h3 className="mt-4 font-display text-xl tracking-[0.08em]">{part.theme}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">{part.presenter}</p>
                  <p className="mt-5 text-sm leading-relaxed text-foreground/80">{part.focus}</p>
                  <Link
                    to="/conteudo"
                    hash={part.slug}
                    className="mt-6 inline-flex text-[0.6rem] tracking-[0.26em] text-cyan uppercase hover:text-paper"
                  >
                    Abrir parte →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto w-full max-w-[110rem]">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="kicker text-cyan">Mapa do conteúdo</p>
                <h2 className="mt-3 font-display text-3xl tracking-[0.08em] sm:text-4xl">20 CAPÍTULOS</h2>
              </div>
              <Link to="/conteudo" className="kicker text-muted-foreground hover:text-foreground">Ver todos</Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {chapters.slice(0, 8).map((chapter) => (
                <Link
                  key={chapter.number}
                  to="/conteudo"
                  hash={`ep-${chapter.number}`}
                  className="group border border-border/70 bg-surface/20 p-5 transition-colors hover:border-cyan/50"
                >
                  <p className="kicker text-muted-foreground">EP. {String(chapter.number).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-sm tracking-[0.08em] group-hover:text-cyan">{chapter.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{chapter.key}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-10 text-center sm:px-8">
        <p className="kicker">Química Orgânica — Fenol & Enol / 2026</p>
      </footer>
    </div>
  );
}
