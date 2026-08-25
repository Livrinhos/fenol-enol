import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { ChemVisual } from "@/components/chem/ChemVisual";
import { SiteHeader } from "@/components/SiteHeader";
import { ProfileGate } from "@/components/ProfileGate";
import type { Profile } from "@/lib/profiles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fenol & Enol — Química Orgânica" },
      { name: "description", content: "Documentário científico interativo sobre funções orgânicas, fenol e enol." },
      { property: "og:title", content: "Fenol & Enol — Química Orgânica" },
      { property: "og:description", content: "Documentário científico interativo em 20 episódios." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Start,
});

function Start() {
  const [profile, setProfile] = useState<Profile | null>(null);

  if (!profile) {
    return <ProfileGate onSelect={setProfile} />;
  }

  return <Cover profile={profile} />;
}

function Cover({ profile }: { profile: Profile }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-svh overflow-hidden bg-[#010609] text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_48%,rgba(14,190,220,0.13),transparent_27%),radial-gradient(circle_at_84%_46%,rgba(14,115,132,0.14),transparent_33%),linear-gradient(180deg,#021116_0%,#010609_70%,#010406_100%)]" />
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(78,190,208,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(78,190,208,0.035)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_19%_30%,rgba(60,195,220,0.08)_0_1px,transparent_1px),radial-gradient(circle_at_67%_75%,rgba(60,195,220,0.06)_0_1px,transparent_1px)] [background-size:90px_90px,150px_150px]" />
        <div className="absolute right-[-4%] top-[2%] h-[92%] w-[64%] opacity-70 sm:right-[1%] sm:w-[58%]">
          <ChemVisual chapter={1} variant="hero" className="h-full w-full text-cyan-200" />
        </div>
        <div className="absolute left-[22%] top-[18%] h-[60vh] w-[38vw] -translate-x-1/2 rounded-full border border-cyan-300/12 shadow-[0_0_120px_rgba(14,190,220,0.07),inset_0_0_100px_rgba(14,190,220,0.04)]" />
        <div className="absolute inset-y-0 left-0 w-[76%] bg-[linear-gradient(90deg,rgba(1,6,8,0.98)_0%,rgba(1,6,8,0.93)_42%,rgba(1,6,8,0.58)_70%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#010406] to-transparent" />
      </div>

      <SiteHeader />

      <section className={`relative z-10 flex min-h-svh items-center px-6 pb-14 pt-28 transition-all duration-1000 sm:px-10 lg:px-16 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
        <div className="mx-auto w-full max-w-[110rem]">
          <div className="max-w-4xl">
            <div className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-cyan-200/80">
              <span>Química Orgânica · Documentário científico · 20 episódios</span>
              <span className="text-white/25" aria-hidden="true">
                ·
              </span>
              <span className="text-white/60">{profile.name}</span>
            </div>

            <h1 className="display-1 mt-8 text-white">
              FENOL
              <br />
              <span className="text-cyan-200">&amp; ENOL</span>
            </h1>

            <div className="mt-8 h-px w-28 bg-cyan-300/70" />

            <p className="subtitle-line measure-narrow mt-8 text-cyan-100/85">
              Uma exploração visual da Química Orgânica
            </p>
            <p className="body-lede measure mt-5 text-white/60">
              Conceitos, classificação, grupos funcionais, fenol, enol e suas aplicações.
            </p>

            <button
              type="button"
              onClick={() => void navigate({ to: "/apresentar/$n", params: { n: "1" } })}
              className="micro-label mt-11 inline-flex items-center gap-4 border border-cyan-300/80 bg-cyan-300/10 px-7 py-4 text-white shadow-[0_0_55px_rgba(14,190,220,0.07)] transition hover:bg-cyan-300/18 hover:shadow-[0_0_65px_rgba(14,190,220,0.12)]"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-cyan-300/70 text-cyan-200">
                <Play className="size-4 fill-current" aria-hidden="true" />
              </span>
              Iniciar apresentação
            </button>

            <div className="micro-label mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/45">
              <span>20 episódios</span>
              <span className="text-cyan-300/60" aria-hidden="true">
                ●
              </span>
              <span>4 partes</span>
              <span className="text-cyan-300/60" aria-hidden="true">
                ●
              </span>
              <span>Apresentando: {profile.name}</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="micro-label absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 px-6 pb-5 text-white/35 sm:px-10 lg:px-16">
        <span>FENOL &amp; ENOL · EXPERIÊNCIA CIENTÍFICA INTERATIVA</span>
        <span>CAPA</span>
      </footer>
    </main>
  );
}
