/**
 * ChapterArt — direção de arte por bloco da apresentação.
 * 4 linguagens visuais distintas (fundamentos, fenol, enol, aplicações),
 * em SVG leve com microanimações. Nenhum dado científico novo é inventado:
 * apenas estruturas/rótulos já presentes no conteúdo (OH, C=O, C=C, anel).
 */
type Props = {
  chapter: number;
  part: 1 | 2 | 3 | 4;
  className?: string;
  /** intensidade: "stage" = protagonista, "poster" = discreto/fundo */
  variant?: "stage" | "poster";
};

const CYAN = "var(--color-crimson)";
const DEEP = "var(--color-blood)";
const GREEN = "var(--color-gold)";

function hex(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

function Label({
  x,
  y,
  text,
  fill = CYAN,
  size = 15,
}: {
  x: number;
  y: number;
  text: string;
  fill?: string;
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      stroke="none"
      fontSize={size}
      letterSpacing="1.5"
      fontFamily="var(--font-sans)"
    >
      {text}
    </text>
  );
}

/* ── EP 01–05 · diagrama de relações e classificação ─────────────── */
function FundamentosArt({ chapter }: { chapter: number }) {
  const nodes = [
    { x: 110, y: 90, label: "ÁLCOOL" },
    { x: 240, y: 60, label: "FENOL" },
    { x: 250, y: 170, label: "ENOL" },
  ];
  const rot = (chapter - 1) * 12;
  return (
    <g fill="none">
      <g stroke={DEEP} opacity="0.7" className="art-draw">
        <circle cx="180" cy="120" r="96" strokeWidth="0.8" strokeDasharray="2 7" />
        <circle cx="180" cy="120" r="132" strokeWidth="0.6" strokeDasharray="2 12" />
      </g>
      <g style={{ transformOrigin: "180px 120px", transform: `rotate(${rot}deg)` }}>
        {nodes.map((n) => (
          <line
            key={n.label}
            x1="180"
            y1="120"
            x2={n.x}
            y2={n.y}
            stroke={CYAN}
            strokeWidth="1"
            opacity="0.55"
          />
        ))}
      </g>
      <g className="art-float">
        <circle cx="180" cy="120" r="30" stroke={CYAN} strokeWidth="1.6" />
        <circle cx="180" cy="120" r="12" fill={CYAN} opacity="0.25" stroke="none" />
        <Label x={158} y={125} text="OH" size={16} />
      </g>
      {nodes.map((n, i) => (
        <g key={n.label} className="art-fade" style={{ animationDelay: `${300 + i * 220}ms` }}>
          <polygon
            points={hex(n.x, n.y, 22)}
            stroke={i === 1 ? CYAN : i === 2 ? GREEN : DEEP}
            strokeWidth="1.3"
          />
          <Label x={n.x - 26} y={n.y + 42} text={n.label} fill="currentColor" size={10} />
        </g>
      ))}
      <g stroke="currentColor" opacity="0.25">
        <path d="M20 232 L120 232" strokeWidth="0.8" />
        <path d="M20 232 L20 226 M120 232 L120 226" strokeWidth="0.8" />
      </g>
    </g>
  );
}

/* ── EP 06–10 · anel aromático em foco ──────────────────────────── */
function FenolArt({ chapter }: { chapter: number }) {
  const subs = chapter >= 8 ? [2, 4] : [];
  const positions = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return { x: 150 + 62 * Math.cos(a), y: 120 + 62 * Math.sin(a), n: i + 1 };
  });
  return (
    <g fill="none">
      <g opacity="0.35" stroke={DEEP} className="art-pulse">
        <circle cx="150" cy="120" r="112" strokeWidth="0.7" />
        <circle cx="150" cy="120" r="146" strokeWidth="0.5" strokeDasharray="3 10" />
      </g>
      <g className="art-float">
        <polygon points={hex(150, 120, 62)} stroke={CYAN} strokeWidth="2" strokeLinejoin="round" />
        <circle cx="150" cy="120" r="36" stroke={CYAN} strokeWidth="1.3" opacity="0.75" />
        <line
          x1="212"
          y1="120"
          x2="256"
          y2="120"
          stroke={CYAN}
          strokeWidth="2"
          className="art-draw"
        />
        <Label x={262} y={126} text="OH" size={20} />
        {positions.map((p) => (
          <circle key={p.n} cx={p.x} cy={p.y} r="3" fill={CYAN} stroke="none" opacity="0.8" />
        ))}
      </g>
      {subs.map((s, i) => {
        const p = positions[s - 1]!;
        return (
          <g key={s} className="art-fade" style={{ animationDelay: `${400 + i * 260}ms` }}>
            <line x1={p.x} y1={p.y} x2={p.x - 30} y2={p.y - 18} stroke={GREEN} strokeWidth="1.4" />
            <Label x={p.x - 60} y={p.y - 22} text={`C${s}`} fill={GREEN} size={12} />
          </g>
        );
      })}
    </g>
  );
}

/* ── EP 11–15 · C=C, OH e equilíbrio ────────────────────────────── */
function EnolArt({ chapter }: { chapter: number }) {
  const showEq = chapter >= 13;
  return (
    <g fill="none">
      <g stroke={GREEN} opacity="0.3" className="art-pulse">
        <ellipse cx="150" cy="130" rx="130" ry="86" strokeWidth="0.7" />
        <ellipse cx="150" cy="130" rx="96" ry="58" strokeWidth="0.5" strokeDasharray="3 9" />
      </g>
      <g className="art-float" stroke={GREEN}>
        <path d="M60 168 L120 128 L180 168" strokeWidth="2" />
        <path d="M66 156 L126 116" strokeWidth="2" />
        <line x1="120" y1="128" x2="120" y2="74" strokeWidth="2" className="art-draw" />
        <Label x={106} y={64} text="OH" fill={GREEN} size={19} />
        <Label x={132} y={150} text="C=C" fill={CYAN} size={13} />
      </g>
      {showEq && (
        <g className="art-fade" style={{ animationDelay: "420ms" }} stroke={CYAN}>
          <path d="M198 118 L238 118" strokeWidth="1.3" />
          <path d="M238 118 l-8 -5 M238 118 l-8 5" strokeWidth="1.3" />
          <path d="M238 140 L198 140" strokeWidth="1.3" />
          <path d="M198 140 l8 -5 M198 140 l8 5" strokeWidth="1.3" />
          <g className="art-breathe">
            <path d="M254 168 L286 148" strokeWidth="2" />
            <line x1="286" y1="148" x2="286" y2="104" strokeWidth="2" />
            <line x1="292" y1="148" x2="292" y2="104" strokeWidth="2" />
            <Label x={276} y={94} text="O" size={17} />
          </g>
        </g>
      )}
    </g>
  );
}

/* ── EP 16–20 · comparativo e síntese editorial ─────────────────── */
function AplicacoesArt({ chapter }: { chapter: number }) {
  const steps = Math.min(4, Math.max(2, chapter - 15));
  return (
    <g fill="none">
      <line
        x1="150"
        y1="20"
        x2="150"
        y2="220"
        stroke="currentColor"
        opacity="0.16"
        strokeWidth="0.8"
      />
      <g className="art-float">
        <polygon points={hex(80, 110, 42)} stroke={CYAN} strokeWidth="1.8" />
        <circle cx="80" cy="110" r="24" stroke={CYAN} strokeWidth="1.1" opacity="0.7" />
        <line x1="122" y1="110" x2="146" y2="110" stroke={CYAN} strokeWidth="1.6" />
        <Label x={104} y={172} text="FENOL" fill={CYAN} size={11} />
      </g>
      <g className="art-fade" style={{ animationDelay: "320ms" }} stroke={GREEN}>
        <path d="M186 132 L224 106 L262 132" strokeWidth="1.8" />
        <path d="M191 122 L229 96" strokeWidth="1.8" />
        <line x1="224" y1="106" x2="224" y2="66" strokeWidth="1.8" />
        <Label x={212} y={58} text="OH" fill={GREEN} size={15} />
        <Label x={206} y={172} text="ENOL" fill={GREEN} size={11} />
      </g>
      <g className="art-fade" style={{ animationDelay: "520ms" }}>
        {Array.from({ length: steps }, (_, i) => (
          <g key={i}>
            <line
              x1={40 + i * 70}
              y1="228"
              x2={40 + i * 70}
              y2="238"
              stroke={i === steps - 1 ? CYAN : "currentColor"}
              strokeWidth="1.2"
              opacity={i === steps - 1 ? 1 : 0.4}
            />
          </g>
        ))}
        <line x1="40" y1="238" x2={40 + (steps - 1) * 70} y2="238" stroke={DEEP} strokeWidth="1" />
      </g>
    </g>
  );
}

export function ChapterArt({ chapter, part, className = "", variant = "stage" }: Props) {
  return (
    <svg
      viewBox="0 0 320 250"
      role="img"
      aria-label={`Composição visual do capítulo ${chapter}`}
      className={className}
      style={{ opacity: variant === "poster" ? 0.45 : 0.95 }}
    >
      <g stroke="currentColor" opacity={variant === "poster" ? 0.07 : 0.1}>
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="250" strokeWidth="0.4" />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="320" y2={i * 40} strokeWidth="0.4" />
        ))}
      </g>
      {part === 1 && <FundamentosArt chapter={chapter} />}
      {part === 2 && <FenolArt chapter={chapter} />}
      {part === 3 && <EnolArt chapter={chapter} />}
      {part === 4 && <AplicacoesArt chapter={chapter} />}
    </svg>
  );
}
