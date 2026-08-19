import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { OpeningSequence } from "@/components/OpeningSequence";
import { ProfileGate } from "@/components/ProfileGate";
import { INTRO_KEY } from "@/lib/profiles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Química Orgânica — Apresentação interativa" },
      {
        name: "description",
        content:
          "Funções orgânicas, grupo funcional, nomenclatura, aplicações, fenol e enol. Escolha o integrante e inicie a apresentação.",
      },
      { property: "og:title", content: "Química Orgânica — Apresentação interativa" },
      {
        property: "og:description",
        content:
          "Apresentação escolar interativa de química orgânica: funções, grupos funcionais, nomenclatura, fenol e enol.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [showIntro, setShowIntro] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {
      seen = false;
    }
    setShowIntro(!seen);
    setReady(true);
  }, []);

  const finishIntro = () => {
    try {
      window.sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* storage unavailable */
    }
    setShowIntro(false);
  };

  if (!ready) return <div className="min-h-screen bg-ink" />;

  return showIntro ? <OpeningSequence onFinish={finishIntro} /> : <ProfileGate />;
}
