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

function Visual({ chapter, part }: { chapter: number; part: 1 | 2 | 3 | 4 }) {
  const scene = sceneForChapter(chapter);
  if (scene) return <MoleculeStage scene={scene} className="h-full w-full" />;
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
    <p className="eyebrow flex flex-wrap items-center gap-x-2 gap-y-1 text-cyan-200/75">
      <span className="numeral text-cyan-200">
        EP. {pad(chapter.number)} / {TOTAL_CHAPTERS}
      </span>
      <span className="text-white/25" aria-hidden="true">
        ·
      </span>
      <span className="text-white/55">
        PARTE {part.number} — {part.title}
      </span>
      <span className="text-white/25" aria-hidden="true">
        ·
      </span>
      <span className="text-white/55">{part.presenter}</span>
    </p>
  );
}

function Subtitle({ text }: { text: string }) {
  return (
    <div className="mt-7 flex items-baseline gap-3">
      <span className="mt-2 h-px w-10 shrink-0 translate-y-[-0.35em] bg-cyan-300/70" aria-hidden="true" />
      <p className="subtitle-line measure text-cyan-100/85">{text}</p>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3.5">
      {items.map((item) => (
        <li key={item} className="bullet-item flex items-baseline gap-2.5 text-white/60">
          <span className="mt-[0.45em] size-1 shrink-0 rounded-full bg-cyan-300" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ChapterHero({ chapter, part, actions, mode = "page" }: Props) {
  const minHeight = mode === "present" ? "min-h-[calc(100svh-6rem)]" : "min-h-[calc(100svh-5rem)]";


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

      <div className="relative z-10 mx-auto flex w-full max-w-[110rem] flex-col justify-between px-6 pb-20 pt-28 sm:px-10 sm:pt-32 lg:px-14 lg:pb-24">
        <div className="max-w-5xl">
          <Meta chapter={chapter} part={part} />
          <div className="mt-10 max-w-5xl">
            <h1 className="display-2 max-w-[22ch] text-white [text-shadow:0_18px_55px_rgba(0,0,0,0.8)]">
              {chapter.title}
            </h1>
            <Subtitle text={chapter.subtitle} />
            <p className="body-lede measure mt-7 text-white/72">{chapter.summary}</p>
            <Bullets items={chapter.bullets ?? []} />
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-3">{actions}</div>
      </div>

      <div className="micro-label pointer-events-none absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between gap-4 border-t border-white/10 px-6 py-3.5 text-white/35 sm:px-10">
        <span className="truncate">Documentário científico · Química Orgânica</span>
        <span className="numeral shrink-0">
          {pad(chapter.number)} / {TOTAL_CHAPTERS}
        </span>
      </div>
    </section>
  );
}
