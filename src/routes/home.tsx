import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Catalog } from "@/components/Catalog";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — YAKUZA ARCHIVE" },
      {
        name: "description",
        content:
          "A história por trás do crime organizado japonês: documentário em 20 episódios, arquivos e material inédito do Japão.",
      },
      { property: "og:title", content: "Home — YAKUZA ARCHIVE" },
      {
        property: "og:description",
        content: "Documentário em 20 episódios sobre o crime organizado japonês.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-svh bg-ink">
      <SiteHeader />
      <main>
        <Hero />
        <Catalog />
      </main>
      <footer className="border-t border-border px-5 py-10 text-center sm:px-8">
        <p className="kicker">Yakuza Archive — Japan / Archive / 2026</p>
      </footer>
    </div>
  );
}
