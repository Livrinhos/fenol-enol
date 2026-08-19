import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { searchEpisodes, categoriesOf } from "@/lib/episodes";
import { resumeEpisode } from "@/lib/watch-state";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => (query.trim() ? searchEpisodes(query) : []), [query]);

  if (!open) return null;

  const openEpisode = (n: number) => {
    const next = resumeEpisode(n, 0.02);
    onClose();
    setQuery("");
    void navigate({ to: "/cinema", search: { ep: next.currentEpisode } });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pesquisar episódios"
      className="fixed inset-0 z-[60] bg-ink/97 backdrop-blur-sm"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex h-full w-full max-w-[70rem] flex-col px-5 pb-8 pt-8 sm:px-8 sm:pt-12">
        <div className="flex items-center gap-5 border-b border-border pb-4">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar episódios, temas, categorias…"
            aria-label="Buscar episódios"
            className="min-w-0 flex-1 bg-transparent py-2 font-display text-lg tracking-[0.14em] text-foreground uppercase outline-none placeholder:font-sans placeholder:text-sm placeholder:normal-case placeholder:tracking-[0.18em] placeholder:text-muted-foreground/70 sm:text-2xl"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar busca"
            className="shrink-0 p-1 text-muted-foreground transition-colors duration-300 hover:text-foreground motion-reduce:transition-none"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <p aria-live="polite" className="mt-5 text-[0.58rem] tracking-[0.3em] text-muted-foreground uppercase">
          {query.trim()
            ? `${results.length} ${results.length === 1 ? "resultado" : "resultados"}`
            : "Digite para pesquisar · ESC para sair"}
        </p>


        <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <p className="max-w-md py-10 text-sm leading-relaxed text-muted-foreground">
              Nada no arquivo corresponde a “{query.trim()}”. Tente outro termo — dinheiro, origens,
              hierarquia ou fontes.
            </p>
          )}

          <ul className="flex flex-col">
            {results.map((ep) => (
              <li key={ep.number} className="border-b border-border/70">
                <button
                  type="button"
                  onClick={() => openEpisode(ep.number)}
                  className="group grid w-full grid-cols-[minmax(0,7rem)_minmax(0,1fr)] items-center gap-4 py-4 text-left transition-colors hover:bg-surface/60 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] sm:gap-6 motion-reduce:transition-none"
                >
                  <img
                    src={ep.image}
                    alt={ep.alt}
                    width={320}
                    height={180}
                    loading="lazy"
                    decoding="async"
                    className="aspect-video w-full border border-border object-cover opacity-80 transition-opacity group-hover:opacity-100 motion-reduce:transition-none"
                  />
                  <span className="block min-w-0">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-display text-xs tracking-[0.28em] text-gold/85">
                        EP. {String(ep.number).padStart(2, "0")}
                      </span>
                      <span className="text-[0.58rem] tracking-[0.26em] text-muted-foreground uppercase">
                        {categoriesOf(ep.number).join(" · ")}
                      </span>
                    </span>
                    <span className="mt-2 block truncate font-display text-sm tracking-[0.12em] text-foreground uppercase sm:text-base">
                      {ep.title}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">
                      {ep.description}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
