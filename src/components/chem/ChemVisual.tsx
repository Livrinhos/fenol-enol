/**
 * Visual científico por capítulo — desenhos SVG leves (anéis aromáticos,
 * hidroxilas, carbonilas, tautomeria) usados como "capa" de cada capítulo.
 */
type Props = {
  chapter: number;
  className?: string;
  /** intensidade do traço; poster = mais discreto */
  variant?: "hero" | "poster";
};

const CYAN = "var(--color-crimson)";
const DEEP = "var(--color-blood)";
const GREEN = "var(--color-gold)";

function Ring({
  x,
  y,
  r,
  stroke,
  double,
}: {
  x: number;
  y: number;
  r: number;
  stroke: string;
  double?: boolean;
}) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${x + r * Math.cos(a)},${y + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <g>
      <polygon points={pts} fill="none" stroke={stroke} strokeWidth="1.5" />
      {double && (
        <circle
          cx={x}
          cy={y}
          r={r * 0.58}
          fill="none"
          stroke={stroke}
          strokeWidth="1.2"
          opacity="0.7"
        />
      )}
    </g>
  );
}

export function ChemVisual({ chapter, className = "", variant = "hero" }: Props) {
  const kind = chapter <= 5 ? "fund" : chapter <= 10 ? "fenol" : chapter <= 15 ? "enol" : "aplic";
  const accent = kind === "fenol" ? CYAN : kind === "enol" ? GREEN : kind === "aplic" ? CYAN : DEEP;
  const opacity = variant === "poster" ? 0.5 : 0.85;

  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-label={`Diagrama químico do capítulo ${chapter}`}
      className={className}
      style={{ opacity }}
    >
      {/* grid científico */}
      <g stroke="currentColor" opacity="0.12">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="200" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="320" y2={i * 40} strokeWidth="0.5" />
        ))}
      </g>

      {kind === "fund" && (
        <g stroke={accent} fill="none">
          <path d="M40 140 L80 110 L120 140 L160 110 L200 140" strokeWidth="1.6" />
          <path d="M200 140 L232 118" strokeWidth="1.6" />
          <text
            x="238"
            y="116"
            fill={CYAN}
            stroke="none"
            fontSize="16"
            fontFamily="var(--font-sans)"
          >
            OH
          </text>
          <circle cx="80" cy="110" r="3" fill={accent} />
          <circle cx="160" cy="110" r="3" fill={accent} />
        </g>
      )}

      {kind === "fenol" && (
        <g>
          <Ring x={130} y={110} r={48} stroke={accent} double />
          <line x1="178" y1="110" x2="216" y2="110" stroke={accent} strokeWidth="1.6" />
          <text x="222" y="116" fill={CYAN} fontSize="18" fontFamily="var(--font-sans)">
            OH
          </text>
        </g>
      )}

      {kind === "enol" && (
        <g stroke={accent} fill="none">
          <path d="M50 130 L100 100" strokeWidth="1.6" />
          <path d="M100 100 L150 130" strokeWidth="1.6" />
          <path d="M104 92 L154 122" strokeWidth="1.6" />
          <line x1="100" y1="100" x2="100" y2="60" strokeWidth="1.6" />
          <text
            x="90"
            y="52"
            fill={GREEN}
            stroke="none"
            fontSize="18"
            fontFamily="var(--font-sans)"
          >
            OH
          </text>
          <path d="M190 95 L215 95" strokeWidth="1.2" />
          <path d="M215 95 l-6 -4 M215 95 l-6 4" strokeWidth="1.2" />
          <path d="M215 112 L190 112" strokeWidth="1.2" />
          <path d="M190 112 l6 -4 M190 112 l6 4" strokeWidth="1.2" />
          <text
            x="240"
            y="110"
            fill={CYAN}
            stroke="none"
            fontSize="16"
            fontFamily="var(--font-sans)"
          >
            C=O
          </text>
        </g>
      )}

      {kind === "aplic" && (
        <g>
          <Ring x={90} y={110} r={40} stroke={CYAN} double />
          <line x1="130" y1="110" x2="158" y2="110" stroke={CYAN} strokeWidth="1.5" />
          <text x="162" y="116" fill={CYAN} fontSize="15" fontFamily="var(--font-sans)">
            OH
          </text>
          <g stroke={GREEN} fill="none">
            <path d="M215 130 L245 105 L275 130" strokeWidth="1.5" />
            <path d="M219 122 L249 97" strokeWidth="1.5" />
            <line x1="245" y1="105" x2="245" y2="70" strokeWidth="1.5" />
            <text
              x="236"
              y="62"
              fill={GREEN}
              stroke="none"
              fontSize="15"
              fontFamily="var(--font-sans)"
            >
              OH
            </text>
          </g>
        </g>
      )}
    </svg>
  );
}
