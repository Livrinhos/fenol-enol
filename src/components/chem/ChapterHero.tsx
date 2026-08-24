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
}: {
  chapter: number;
  part: 1 | 2 | 3 | 4;
}) {
  const scene = sceneForChapter(chapter);
  if (scene) {
    return <MoleculeStage scene={scene} className="h-full w-full" />;
  }

  return (
    <ChapterArt
      chapter={chapter}
      part={part}
      variant="poster"
      className="h-full w-full text-foreground"
    />
  );
}

function Meta({ chapter, part }: { chapter: PresentationChapter; part: PresentationPart }) {
  return (
    <p className="font-mono text-[0.58rem] tracking-[0.34em] text-cyan-200/70 uppercase sm:text-[0.65rem]">
      EP. {pad(chapter.number)} / {TOTAL_CHAPTERS} · PARTE {part.number} — {part.title} · {part.presenter}
    </p>
  );
}

function Subtitle({ text }: { text: string }) {
  return (
    <div className="mt-6 flex items-center gap-3">
      <span className="h-px w-10 bg-cyan-300/70" />
      <p className="text-[0.62rem] tracking-[0.3em] text-cyan-200/80 uppercase sm:text-xs">
        {text}
      </p>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-2 text-[0.62rem] tracking-[0.13em] text-white/55 uppercase"
        >
          <span className="size-1 rounded-full bg-cyan-300" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ChapterHero({ chapter, part, actions, mode = "page" }: Props) {
  const minHeight = mode === "present" ? "min-h-[calc(100svh-6rem)]" : "min-h-[calc(100svh-5rem)]";
  const titleSize =
    mode === "present"
      ? "text-[2.8rem] sm:text-6xl lg:text-[5.2rem]"
      : "text-[2.7rem] sm:text-6xl lg:text-[5.4rem]";

  return (
    <section className={`relative isolate overflow-hidden border-b border-white/10 bg-[#020a0d] ${minHeight}`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_48%,rgba(11,184,215,0.13),transparent_28%),radial-gradient(circle_at_82%_45%,rgba(17,102,118,0.2),transparent_32%),linear-gradient(180deg,#031116_0%,#020a0d_62%,#010507_100%)]" />
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(90,210,225,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(90,210,225,0.045)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute right-[-9%] top-[7%] h-[86%] w-[62%] opacity-65 sm:right-[-3%] sm:w-[57%]">
          <Visual chapter={chapter.number} part={part.number} />
        </div>
        <div className="absolute inset-y-0 left-0 w-[78%] bg-[linear-gradient(90deg,rgba(1,7,9,0.98)_0%,rgba(1,7,9,0.94)_38%,rgba(1,7,9,0.62)_67%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#010507] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-inherit w-full max-w-[110rem] flex-col justify-between px-6 pb-10 pt-28 sm:px-10 sm:pt-32 lg:px-14 lg:pb-12">
        <div className="max-w-5xl">
          <Meta chapter={chapter} part={part} />

          <div className="mt-10 max-w-5xl">
            <p className="text-xs tracking-[0.42em] text-cyan-300 uppercase sm:text-sm">
              {part.title}
            </p>
            <h1
              className={`mt-5 max-w-5xl font-display leading-[0.92] tracking-[0.035em] text-white [text-shadow:0_18px_55px_rgba(0,0,0,0.8)] ${titleSize}`}
            >
              {chapter.title}
            </h1>
            <Subtitle text={chapter.subtitle} />
            <p className="mt-7 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base lg:text-lg">
              {chapter.summary}
            </p>
            <Bullets items={chapter.bullets ?? []} />
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          {actions}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between border-t border-white/10 px-6 py-3 text-[0.52rem] tracking-[0.28em] text-white/35 uppercase sm:px-10">
        <span>Documentário científico · Química Orgânica</span>
        <span>{pad(chapter.number)} / {TOTAL_CHAPTERS}</span>
      </div>
    </section>
  );
}
