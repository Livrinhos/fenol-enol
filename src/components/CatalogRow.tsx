import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Check } from "lucide-react";
import type { CatalogItem } from "@/lib/catalog";

type Props = {
  id: string;
  title: string;
  note?: string | undefined;
  items: CatalogItem[];
  myList: string[];
  onToggleList: (item: CatalogItem) => void;
  onOpen: (item: CatalogItem) => void;
};

export function CatalogRow({ id, title, note, items, myList, onToggleList, onOpen }: Props) {
  const scroller = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<string | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section aria-labelledby={`row-${id}`} className="py-10 sm:py-14">
      <header className="mx-auto grid w-full max-w-[110rem] grid-cols-[minmax(0,1fr)_auto] items-end gap-4 px-5 sm:px-8">
        <div className="min-w-0">
          <h2
            id={`row-${id}`}
            className="truncate font-display text-lg leading-none tracking-[0.2em] text-foreground uppercase sm:text-xl"
          >
            {title}
          </h2>
          {note && (
            <p className="mt-2 truncate text-[0.58rem] tracking-[0.3em] text-muted-foreground uppercase">
              {note}
            </p>
          )}
        </div>
        <div className="hidden shrink-0 gap-1 lg:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label={`Rolar ${title} para a esquerda`}
            className="p-2 text-muted-foreground transition-colors duration-300 hover:text-gold motion-reduce:transition-none"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label={`Rolar ${title} para a direita`}
            className="p-2 text-muted-foreground transition-colors duration-300 hover:text-gold motion-reduce:transition-none"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="mx-auto mt-4 w-full max-w-[110rem] px-5 sm:px-8">
        <div className="rule-faint" />
      </div>

      <ul
        ref={scroller}
        onMouseLeave={() => setActive(null)}
        className="row-scroller mt-7 flex snap-x gap-5 overflow-x-auto scroll-smooth px-5 pb-5 sm:gap-7 sm:px-8"
      >
        {items.map((it) => {
          const dimmed = active !== null && active !== it.id;
          const inList = myList.includes(it.id);
          return (
            <li
              key={`${id}-${it.id}`}
              className="w-[16rem] shrink-0 snap-start sm:w-[21rem]"
              onMouseEnter={() => setActive(it.id)}
              onFocus={() => setActive(it.id)}
              onBlur={() => setActive(null)}
            >
              <article
                className={`group relative transition-opacity duration-500 motion-reduce:transition-none ${
                  dimmed ? "opacity-40" : "opacity-100"
                }`}
              >
                <button type="button" onClick={() => onOpen(it)} className="block w-full text-left">
                  <span className="relative block aspect-video overflow-clip bg-surface">
                    <img
                      src={it.image}
                      alt={it.alt}
                      width={1024}
                      height={576}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px bg-[color-mix(in_oklab,var(--color-foreground)_14%,transparent)] transition-colors duration-500 group-hover:bg-crimson motion-reduce:transition-none"
                    />
                  </span>
                  <span className="mt-4 block text-[0.56rem] tracking-[0.32em] text-gold/80 uppercase">
                    {it.episode}
                  </span>
                  <span className="mt-2.5 block font-display text-base leading-snug tracking-[0.1em] text-foreground">
                    {it.title}
                  </span>
                  <span className="mt-2 block max-w-[38ch] text-xs leading-relaxed text-muted-foreground">
                    {it.description}
                  </span>
                </button>

                <button
                  type="button"
                  aria-pressed={inList}
                  aria-label={inList ? `Remover ${it.title} da Minha Lista` : `Adicionar ${it.title} à Minha Lista`}
                  onClick={() => onToggleList(it)}
                  className="mt-3.5 inline-flex items-center gap-2 text-[0.56rem] tracking-[0.3em] text-muted-foreground uppercase transition-colors duration-300 hover:text-gold motion-reduce:transition-none"
                >
                  {inList ? (
                    <Check className="size-3 text-gold" aria-hidden="true" />
                  ) : (
                    <Plus className="size-3" aria-hidden="true" />
                  )}
                  Lista
                </button>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

