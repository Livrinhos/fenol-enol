import type { ReactNode } from "react";
import { ChapterArt } from "@/components/chem/ChapterArt";
import { MoleculeStage, sceneForChapter } from "@/components/chem/MoleculeStage";
import { TOTAL_CHAPTERS } from "@/lib/presentationContent";
import type { PresentationChapter, PresentationPart } from "@/lib/presentationContent";

type Props = {
  chapter: PresentationChapter;
  part: PresentationPart;
  actions?: ReactNode;
  mode?: "page" | "present";
};
const pad = (n: number) => String(n).padStart(2, "0");

function Visual({
  chapter,
  part,
  mode,
}: {
  chapter: number;
  part: 1 | 2 | 3 | 4;
  mode?: "page" | "present";
}) {
  const scene = sceneForChapter(chapter);
  if (scene) return <MoleculeStage scene={scene} className="h-full min-h-80 w-full" />;
  return (
    <ChapterArt
      chapter={chapter}
      part={part}
      variant={mode === "present" ? "stage" : "poster"}
      className="h-full w-full text-foreground"
    />
  );
}

export function ChapterHero({ chapter, part, actions, mode = "page" }: Props) {
  const bullets = chapter.bullets ?? [];
  return (
    <section
      className={`documentary-hero relative overflow-hidden ${mode === "present" ? "min-h-[calc(100svh-8rem)]" : "min-h-[78svh]"}`}
    >
      <div className="documentary-photo absolute inset-0" aria-hidden="true" />
      <div className="documentary-wash absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[78svh] w-full max-w-[100rem] items-end px-5 pb-12 pt-32 sm:px-10 sm:pb-16">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.55fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="kicker reveal reveal-1">
              EP. {pad(chapter.number)} / {TOTAL_CHAPTERS} · PARTE {part.number} — {part.title}
            </p>
            <h1 className="reveal reveal-2 mt-5 max-w-3xl font-display text-[2.7rem] leading-[.94] tracking-[.025em] text-foreground sm:text-6xl lg:text-8xl">
              {chapter.title}
            </h1>
            <p className="reveal reveal-3 mt-5 max-w-xl text-xs tracking-[.28em] text-crimson uppercase sm:text-sm">
              {chapter.subtitle}
            </p>
            <p className="reveal reveal-4 mt-7 max-w-2xl text-sm leading-relaxed text-foreground/85 sm:text-base">
              {chapter.summary}
            </p>
            {actions && (
              <div className="reveal reveal-5 mt-8 flex flex-wrap items-center gap-3">
                {actions}
              </div>
            )}
          </div>
          <aside className="documentary-inset reveal reveal-3 self-end">
            <div className="mb-4 flex items-center justify-between border-b border-border/70 pb-3">
              <span className="kicker">Registro de cena</span>
              <span className="font-mono text-xs text-crimson">{pad(chapter.number)}</span>
            </div>
            <div className="h-48 overflow-hidden sm:h-60">
              <Visual chapter={chapter.number} part={part.number} mode={mode} />
            </div>
            {bullets.length > 0 && (
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{bullets[0]}</p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
