import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CatalogRow } from "@/components/CatalogRow";
import { ContinueWatching } from "@/components/ContinueWatching";
import { catalogSections, findItem, type CatalogItem } from "@/lib/catalog";
import { resumeEpisode, toggleMyList } from "@/lib/watch-state";
import { tryFullscreen } from "@/lib/fullscreen";
import { useWatchState } from "@/hooks/use-watch-state";


export function Catalog() {
  const { state, ready } = useWatchState();
  const navigate = useNavigate();
  const [notice, setNotice] = useState<string | null>(null);

  const announce = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice((n) => (n === message ? null : n)), 3600);
  };

  const onToggleList = (item: CatalogItem) => {
    const added = toggleMyList(item.id);
    announce(added ? `${item.title} adicionado à Minha Lista.` : `${item.title} removido da Minha Lista.`);
  };

  const onOpen = (item: CatalogItem) => {
    resumeEpisode(item.episodeNumber, 0.02);
    navigate({ to: "/documentario", hash: "episodios" });
  };

  const onResume = () => {
    const next = resumeEpisode(state.currentEpisode, state.progress);
    tryFullscreen();
    void navigate({ to: "/cinema", search: { ep: next.currentEpisode } });
  };


  const listItems = state.myList.map(findItem).filter(Boolean) as CatalogItem[];

  return (
    <div id="catalogo">
      <ContinueWatching state={state} onResume={onResume} />

      <p
        aria-live="polite"
        className="mx-auto mt-4 min-h-5 w-full max-w-[110rem] px-5 text-xs tracking-[0.2em] text-gold/90 sm:px-8"
      >
        {notice}
      </p>

      <div className="hairline mx-auto my-6 max-w-[110rem]" />

      {ready && listItems.length > 0 && (
        <CatalogRow
          id="minha-lista"
          title="Minha Lista"
          note={`${listItems.length} ${listItems.length === 1 ? "título" : "títulos"}`}
          items={listItems}
          myList={state.myList}
          onToggleList={onToggleList}
          onOpen={onOpen}
        />
      )}

      {catalogSections.map((section) => (
        <CatalogRow
          key={section.id}
          id={section.id}
          title={section.title}
          note={section.note}
          items={section.items}
          myList={state.myList}
          onToggleList={onToggleList}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
