import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { OpeningSequence } from "@/components/OpeningSequence";
import { ProfileGate } from "@/components/ProfileGate";
import { INTRO_KEY } from "@/lib/profiles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YAKUZA ARCHIVE — Documentário interativo" },
      {
        name: "description",
        content:
          "Documentário interativo sobre a história por trás do crime organizado japonês. Escolha seu perfil e comece o arquivo.",
      },
      { property: "og:title", content: "YAKUZA ARCHIVE — Documentário interativo" },
      {
        property: "og:description",
        content: "A história por trás do crime organizado japonês, em formato de arquivo interativo.",
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
