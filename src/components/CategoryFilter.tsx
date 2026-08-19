import { CATEGORIES } from "@/lib/episodes";

type Props = {
  value: string;
  onChange: (value: string) => void;
  count: number;
};

const OPTIONS = ["TODAS", ...CATEGORIES];

export function CategoryFilter({ value, onChange, count }: Props) {
  return (
    <div className="min-w-0">
      <div
        role="group"
        aria-label="Filtrar episódios por categoria"
        className="row-scroller -mx-5 flex snap-x gap-7 overflow-x-auto px-5 pb-3 sm:mx-0 sm:flex-wrap sm:gap-x-8 sm:gap-y-3 sm:px-0"
      >
        {OPTIONS.map((option) => {
          const active = option === value;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={active}
              className={`shrink-0 snap-start border-b pb-2 text-[0.58rem] tracking-[0.3em] uppercase transition-colors duration-300 motion-reduce:transition-none ${
                active
                  ? "border-crimson text-foreground"
                  : "border-transparent text-muted-foreground hover:border-gold/40 hover:text-foreground"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-5 text-[0.58rem] tracking-[0.3em] text-muted-foreground uppercase">
        {count} {count === 1 ? "episódio" : "episódios"}
      </p>
    </div>
  );
}
