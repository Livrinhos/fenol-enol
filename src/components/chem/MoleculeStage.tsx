/**
 * MoleculeStage — sequência visual didática (SVG + CSS) para Fenol, Enol e
 * tautomeria ceto-enólica. Câmera com zoom/foco por etapa, halo, glow e
 * chamada visual do elemento ativo. Sem bibliotecas 3D.
 */
import { useEffect, useId, useMemo, useState } from "react";

export type MoleculeScene = "fenol" | "enol" | "tautomeria";

type Focus = { x: number; y: number; k: number };

type Step = {
  label: string;
  caption: string;
  /** chamada curta sobreposta ao palco */
  callout: string;
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
        callout: "Estrutura completa",
        focus: { x: 160, y: 110, k: 1 },
        highlight: "none",
      },
      {
        label: "Anel aromático",
        caption: "Seis carbonos em ressonância — o anel benzênico.",
        callout: "Anel aromático · ressonância",
        focus: { x: 122, y: 112, k: 1.75 },
        highlight: "ring",
      },
      {
        label: "OH no anel",
        caption: "A hidroxila está ligada DIRETAMENTE a um carbono do anel.",
        callout: "Hidroxila ligada ao anel",
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
        callout: "Estrutura completa",
        focus: { x: 160, y: 110, k: 1 },
        highlight: "none",
      },
      {
        label: "Ligação C=C",
        caption: "A dupla ligação entre carbonos define o 'en'.",
        callout: "Dupla ligação C=C",
        focus: { x: 150, y: 120, k: 1.8 },
        highlight: "cc",
      },
      {
        label: "OH na dupla",
        caption: "O OH está ligado a um carbono da própria dupla — o 'ol'.",
        callout: "OH no carbono da dupla",
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
        callout: "Forma enol",
        focus: { x: 92, y: 112, k: 1.5 },
        highlight: "enol",
      },
      {
        label: "Equilíbrio",
        caption: "O hidrogênio migra: as duas formas coexistem em equilíbrio.",
        callout: "Equilíbrio dinâmico",
        focus: { x: 160, y: 110, k: 1 },
        highlight: "eq",
      },
      {
        label: "Forma cetônica",
        caption: "Forma ceto: carbonila C=O, geralmente mais estável.",
        callout: "Forma cetônica (C=O)",
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

function Hex({
  cx,
  cy,
  r,
  stroke,
  width = 1.8,
}: {
  cx: number;
  cy: number;
  r: number;
  stroke: string;
  width?: number;
}) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <polygon points={pts} fill="none" stroke={stroke} strokeWidth={width} strokeLinejoin="round" />
  );
}

/** anéis abstratos gigantes, baixa opacidade — profundidade de fundo */
function BackdropMolecules() {
  return (
    <g opacity="0.14" stroke="currentColor" fill="none">
      <Hex cx={40} cy={40} r={62} stroke="currentColor" width={0.7} />
      <Hex cx={290} cy={186} r={78} stroke="currentColor" width={0.7} />
      <circle cx={40} cy={40} r={34} strokeWidth="0.6" />
      <circle cx={290} cy={186} r={44} strokeWidth="0.6" />
      <path d="M-20 178 L40 142 L100 178 L160 142 L220 178" strokeWidth="0.6" />
    </g>
  );
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
  const uid = useId().replace(/[:]/g, "");

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

  const dim = (on: boolean) => (on ? 1 : 0.16);
  const glow = `url(#glow-${uid})`;

  return (
    <div className={`flex w-full flex-col gap-4 ${className}`}>
      <div className="relative w-full">
        {/* halo de profundidade atrás da molécula */}
        <div
          aria-hidden="true"
          className="stage-halo animate-glow-breathe pointer-events-none absolute inset-[-14%] -z-0"
        />

        <div className="lab-field relative overflow-hidden rounded-sm border border-border/70 shadow-[0_40px_90px_-50px_oklch(0_0_0/90%)]">
          <div
            aria-hidden="true"
            className="tech-grid animate-lab-drift pointer-events-none absolute inset-0"
          />

          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="relative block w-full"
            role="img"
            aria-label={`${data.title} — ${current.caption}`}
          >
            <defs>
              <filter id={`glow-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3.2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g className="text-foreground">
              <BackdropMolecules />
            </g>

            <g
              style={{
                transform,
                transformBox: "view-box",
                transition: "transform 1200ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {scene === "fenol" && (
                <>
                  <g
                    style={{
                      opacity: dim(current.highlight !== "oh"),
                      transition: "opacity 800ms ease",
                    }}
                    filter={current.highlight === "ring" ? glow : undefined}
                  >
                    <Hex
                      cx={122}
                      cy={112}
                      r={44}
                      stroke={current.highlight === "ring" ? CYAN : DEEP}
                      width={2.2}
                    />
                    <circle
                      cx={122}
                      cy={112}
                      r={26}
                      fill="none"
                      stroke={current.highlight === "ring" ? CYAN : DEEP}
                      strokeWidth="1.6"
                      opacity="0.85"
                    />
                  </g>
                  <g
                    style={{
                      opacity: dim(current.highlight !== "ring"),
                      transition: "opacity 800ms ease",
                    }}
                    filter={current.highlight === "oh" ? glow : undefined}
                  >
                    <line
                      x1={166}
                      y1={112}
                      x2={202}
                      y2={108}
                      stroke={current.highlight === "oh" ? CYAN : DEEP}
                      strokeWidth="2.2"
                    />
                    <text
                      x={208}
                      y={114}
                      fill={current.highlight === "oh" ? CYAN : "currentColor"}
                      fontSize="20"
                      fontFamily="var(--font-sans)"
                    >
                      OH
                    </text>
                  </g>
                </>
              )}

              {scene === "enol" && (
                <>
                  <g
                    style={{
                      opacity: dim(current.highlight !== "oh"),
                      transition: "opacity 800ms ease",
                    }}
                  >
                    <line x1={70} y1={140} x2={120} y2={110} stroke={DEEP} strokeWidth="2.2" />
                    <g
                      stroke={current.highlight === "cc" ? CYAN : DEEP}
                      strokeWidth="2.4"
                      filter={current.highlight === "cc" ? glow : undefined}
                    >
                      <line x1={120} y1={110} x2={180} y2={140} />
                      <line x1={125} y1={101} x2={185} y2={131} />
                    </g>
                    <line x1={180} y1={140} x2={230} y2={112} stroke={DEEP} strokeWidth="2.2" />
                  </g>
                  <g
                    style={{
                      opacity: dim(current.highlight !== "cc"),
                      transition: "opacity 800ms ease",
                    }}
                    filter={current.highlight === "oh" ? glow : undefined}
                  >
                    <line
                      x1={120}
                      y1={110}
                      x2={120}
                      y2={74}
                      stroke={current.highlight === "oh" ? CYAN : DEEP}
                      strokeWidth="2.2"
                    />
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
                  <g
                    style={{
                      opacity: dim(current.highlight !== "keto"),
                      transition: "opacity 800ms ease",
                    }}
                    filter={current.highlight === "enol" ? glow : undefined}
                  >
                    <g stroke={current.highlight === "enol" ? CYAN : DEEP} strokeWidth="2.2">
                      <line x1={44} y1={140} x2={86} y2={114} />
                      <line x1={49} y1={148} x2={91} y2={122} />
                      <line x1={86} y1={114} x2={126} y2={140} />
                      <line x1={44} y1={140} x2={44} y2={104} />
                    </g>
                    <text
                      x={30}
                      y={96}
                      fill={current.highlight === "enol" ? CYAN : "currentColor"}
                      fontSize="16"
                      fontFamily="var(--font-sans)"
                    >
                      OH
                    </text>
                    <text
                      x={54}
                      y={172}
                      fill={GREEN}
                      fontSize="10"
                      fontFamily="var(--font-sans)"
                      letterSpacing="2"
                    >
                      ENOL
                    </text>
                  </g>

                  {/* equilíbrio */}
                  <g
                    stroke={current.highlight === "eq" ? CYAN : DEEP}
                    strokeWidth="1.8"
                    fill="none"
                    filter={current.highlight === "eq" ? glow : undefined}
                    style={{ transition: "opacity 800ms ease" }}
                  >
                    <path d="M142 104 H186" />
                    <path d="M186 104 l-7 -4" />
                    <path d="M186 122 H142" />
                    <path d="M142 122 l7 4" />
                  </g>

                  {/* ceto */}
                  <g
                    style={{
                      opacity: dim(current.highlight !== "enol"),
                      transition: "opacity 800ms ease",
                    }}
                    filter={current.highlight === "keto" ? glow : undefined}
                  >
                    <g stroke={current.highlight === "keto" ? CYAN : DEEP} strokeWidth="2.2">
                      <line x1={202} y1={140} x2={240} y2={114} />
                      <line x1={240} y1={114} x2={280} y2={140} />
                      <line x1={236} y1={114} x2={236} y2={78} />
                      <line x1={244} y1={114} x2={244} y2={78} />
                    </g>
                    <text
                      x={230}
                      y={70}
                      fill={current.highlight === "keto" ? CYAN : "currentColor"}
                      fontSize="16"
                      fontFamily="var(--font-sans)"
                    >
                      O
                    </text>
                    <text
                      x={210}
                      y={172}
                      fill={GREEN}
                      fontSize="10"
                      fontFamily="var(--font-sans)"
                      letterSpacing="2"
                    >
                      CETO
                    </text>
                  </g>
                </>
              )}
            </g>
          </svg>

          {/* chamada visual do elemento ativo */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-4">
            <div key={current.label} className="reveal reveal-1 glass-panel px-3 py-2">
              <p className="text-[0.5rem] tracking-[0.3em] text-crimson uppercase">{data.title}</p>
              <p className="mt-1 text-[0.68rem] tracking-[0.14em] text-foreground uppercase">
                {current.callout}
              </p>
            </div>
            <p className="font-display text-[0.62rem] tracking-[0.3em] text-muted-foreground">
              {String(step + 1).padStart(2, "0")} / {String(data.steps.length).padStart(2, "0")}
            </p>
          </div>

          {/* barra de progresso da câmera */}
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-border">
            <div
              className="h-px bg-crimson transition-[width] duration-700 ease-out"
              style={{ width: `${((step + 1) / data.steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <p
        key={current.caption}
        aria-live="polite"
        className="reveal reveal-2 min-h-[3rem] text-sm leading-relaxed text-foreground/85"
      >
        {current.caption}
      </p>

      <div className="glass-panel flex flex-wrap items-center gap-1.5 p-1.5">
        {data.steps.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setStep(i)}
            aria-current={i === step}
            className={`flex-1 border px-3 py-2 text-[0.55rem] tracking-[0.2em] uppercase transition-all duration-300 ${
              i === step
                ? "border-crimson/70 bg-crimson/20 text-foreground shadow-[0_0_24px_-8px_var(--color-crimson)]"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            <span className="font-display text-crimson">{String(i + 1).padStart(2, "0")}</span>{" "}
            <span className="hidden sm:inline">{s.label}</span>
            <span className="sm:hidden">{s.label.split(" ")[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
