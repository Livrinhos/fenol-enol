/**
 * MoleculeStage — sequência visual didática (SVG + CSS) para Fenol, Enol e
 * tautomeria ceto-enólica. Zoom/foco por etapa, sem bibliotecas 3D.
 */
import { useEffect, useMemo, useState } from "react";

export type MoleculeScene = "fenol" | "enol" | "tautomeria";

type Focus = { x: number; y: number; k: number };

type Step = {
  label: string;
  caption: string;
  focus: Focus;
  highlight: string;
};

const W = 320;
const H = 220;

const CYAN = "var(--color-crimson)";
const DEEP = "var(--color-blood)";
const GREEN = "var(--color-gold)";

const SCENES: Record<MoleculeScene, { title: string; steps: Step[] }> = {
  fenol: {
    title: "Fenol",
    steps: [
      {
        label: "Estrutura",
        caption: "Fenol: anel aromático + hidroxila.",
        focus: { x: 160, y: 110, k: 1 },
        highlight: "none",
      },
      {
        label: "Anel aromático",
        caption: "Seis carbonos em ressonância — o anel benzênico.",
        focus: { x: 122, y: 112, k: 1.75 },
        highlight: "ring",
      },
      {
        label: "OH no anel",
        caption: "A hidroxila está ligada DIRETAMENTE a um carbono do anel.",
        focus: { x: 214, y: 108, k: 2.3 },
        highlight: "oh",
      },
    ],
  },
  enol: {
    title: "Enol",
    steps: [
      {
        label: "Estrutura",
        caption: "Enol: dupla ligação C=C com hidroxila.",
        focus: { x: 160, y: 110, k: 1 },
        highlight: "none",
      },
      {
        label: "Ligação C=C",
        caption: "A dupla ligação entre carbonos define o 'en'.",
        focus: { x: 150, y: 120, k: 1.8 },
        highlight: "cc",
      },
      {
        label: "OH na dupla",
        caption: "O OH está ligado a um carbono da própria dupla — o 'ol'.",
        focus: { x: 120, y: 78, k: 2.2 },
        highlight: "oh",
      },
    ],
  },
  tautomeria: {
    title: "Tautomeria ceto-enólica",
    steps: [
      {
        label: "Forma enol",
        caption: "Forma enol: C=C com OH no carbono da dupla.",
        focus: { x: 92, y: 112, k: 1.5 },
        highlight: "enol",
      },
      {
        label: "Equilíbrio",
        caption: "O hidrogênio migra: as duas formas coexistem em equilíbrio.",
        focus: { x: 160, y: 110, k: 1 },
        highlight: "eq",
      },
      {
        label: "Forma cetônica",
        caption: "Forma ceto: carbonila C=O, geralmente mais estável.",
        focus: { x: 236, y: 112, k: 1.5 },
        highlight: "keto",
      },
    ],
  },
};

export function sceneForChapter(chapter: number): MoleculeScene | null {
  if (chapter === 6 || chapter === 7) return "fenol";
  if (chapter === 11 || chapter === 12) return "enol";
  if (chapter === 13) return "tautomeria";
  return null;
}

function Hex({ cx, cy, r, stroke, width = 1.8 }: { cx: number; cy: number; r: number; stroke: string; width?: number }) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
  return <polygon points={pts} fill="none" stroke={stroke} strokeWidth={width} strokeLinejoin="round" />;
}

export function MoleculeStage({
  scene,
  className = "",
  step: controlled,
  onStepChange,
}: {
  scene: MoleculeScene;
  className?: string;
  step?: number;
  onStepChange?: (s: number) => void;
}) {
  const data = SCENES[scene];
  const [inner, setInner] = useState(0);
  const step = Math.min(controlled ?? inner, data.steps.length - 1);
  const current = data.steps[step]!;

  useEffect(() => {
    setInner(0);
  }, [scene]);

  const setStep = (s: number) => {
    const clamped = Math.min(Math.max(s, 0), data.steps.length - 1);
    setInner(clamped);
    onStepChange?.(clamped);
  };

  const transform = useMemo(() => {
    const { x, y, k } = current.focus;
    return `translate(${W / 2 - x * k} ${H / 2 - y * k}) scale(${k})`;
  }, [current]);

  const dim = (on: boolean) => (on ? 1 : 0.28);

  return (
    <div className={`flex w-full flex-col gap-3 ${className}`}>
      <div className="relative w-full overflow-hidden border border-border bg-ink/60">
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label={`${data.title} — ${current.caption}`}>
          <g stroke="currentColor" opacity="0.1">
            {Array.from({ length: 9 }, (_, i) => (
              <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2={H} strokeWidth="0.5" />
            ))}
            {Array.from({ length: 6 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 40} x2={W} y2={i * 40} strokeWidth="0.5" />
            ))}
          </g>

          <g style={{ transform, transformBox: "view-box", transition: "transform 900ms cubic-bezier(0.16,1,0.3,1)" }}>
            {scene === "fenol" && (
              <>
                <g style={{ opacity: dim(current.highlight !== "oh"), transition: "opacity 600ms ease" }}>
                  <Hex cx={122} cy={112} r={44} stroke={current.highlight === "ring" ? CYAN : DEEP} />
                  <circle
                    cx={122}
                    cy={112}
                    r={26}
                    fill="none"
                    stroke={current.highlight === "ring" ? CYAN : DEEP}
                    strokeWidth="1.4"
                    opacity="0.8"
                  />
                </g>
                <g style={{ opacity: dim(current.highlight !== "ring"), transition: "opacity 600ms ease" }}>
                  <line
                    x1={166}
                    y1={112}
                    x2={202}
                    y2={108}
                    stroke={current.highlight === "oh" ? CYAN : DEEP}
                    strokeWidth="2"
                  />
                  <text x={208} y={114} fill={current.highlight === "oh" ? CYAN : "currentColor"} fontSize="20" fontFamily="var(--font-sans)">
                    OH
                  </text>
                </g>
              </>
            )}

            {scene === "enol" && (
              <>
                <g style={{ opacity: dim(current.highlight !== "oh"), transition: "opacity 600ms ease" }}>
                  <line x1={70} y1={140} x2={120} y2={110} stroke={DEEP} strokeWidth="2" />
                  <g stroke={current.highlight === "cc" ? CYAN : DEEP} strokeWidth="2">
                    <line x1={120} y1={110} x2={180} y2={140} />
                    <line x1={125} y1={101} x2={185} y2={131} />
                  </g>
                  <line x1={180} y1={140} x2={230} y2={112} stroke={DEEP} strokeWidth="2" />
                </g>
                <g style={{ opacity: dim(current.highlight !== "cc"), transition: "opacity 600ms ease" }}>
                  <line x1={120} y1={110} x2={120} y2={74} stroke={current.highlight === "oh" ? CYAN : DEEP} strokeWidth="2" />
                  <text
                    x={106}
                    y={64}
                    fill={current.highlight === "oh" ? CYAN : "currentColor"}
                    fontSize="20"
                    fontFamily="var(--font-sans)"
                  >
                    OH
                  </text>
                </g>
              </>
            )}

            {scene === "tautomeria" && (
              <>
                {/* enol */}
                <g style={{ opacity: dim(current.highlight !== "keto"), transition: "opacity 600ms ease" }}>
                  <g stroke={current.highlight === "enol" ? CYAN : DEEP} strokeWidth="2">
                    <line x1={44} y1={140} x2={86} y2={114} />
                    <line x1={49} y1={148} x2={91} y2={122} />
                    <line x1={86} y1={114} x2={126} y2={140} />
                    <line x1={44} y1={140} x2={44} y2={104} />
                  </g>
                  <text x={30} y={96} fill={current.highlight === "enol" ? CYAN : "currentColor"} fontSize="16" fontFamily="var(--font-sans)">
                    OH
                  </text>
                  <text x={54} y={172} fill={GREEN} fontSize="10" fontFamily="var(--font-sans)" letterSpacing="2">
                    ENOL
                  </text>
                </g>

                {/* equilíbrio */}
                <g
                  stroke={current.highlight === "eq" ? CYAN : DEEP}
                  strokeWidth="1.6"
                  fill="none"
                  style={{ opacity: dim(current.highlight === "eq" || true), transition: "opacity 600ms ease" }}
                >
                  <path d="M142 104 H186" />
                  <path d="M186 104 l-7 -4" />
                  <path d="M186 122 H142" />
                  <path d="M142 122 l7 4" />
                </g>

                {/* ceto */}
                <g style={{ opacity: dim(current.highlight !== "enol"), transition: "opacity 600ms ease" }}>
                  <g stroke={current.highlight === "keto" ? CYAN : DEEP} strokeWidth="2">
                    <line x1={202} y1={140} x2={240} y2={114} />
                    <line x1={240} y1={114} x2={280} y2={140} />
                    <line x1={236} y1={114} x2={236} y2={78} />
                    <line x1={244} y1={114} x2={244} y2={78} />
                  </g>
                  <text x={230} y={70} fill={current.highlight === "keto" ? CYAN : "currentColor"} fontSize="16" fontFamily="var(--font-sans)">
                    O
                  </text>
                  <text x={210} y={172} fill={GREEN} fontSize="10" fontFamily="var(--font-sans)" letterSpacing="2">
                    CETO
                  </text>
                </g>
              </>
            )}
          </g>
        </svg>
      </div>

      <p aria-live="polite" className="min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground">
        {current.caption}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {data.steps.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setStep(i)}
            aria-current={i === step}
            className={`border px-3 py-1.5 text-[0.55rem] tracking-[0.22em] uppercase transition-colors ${
              i === step
                ? "border-crimson bg-crimson/15 text-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {i + 1}. {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
