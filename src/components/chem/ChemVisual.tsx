import type { ChemVisualKind } from "@/lib/curriculum";

/** Estruturas químicas discretas, desenhadas em SVG (identidade editorial científica). */
function Ring({ label = "OH" }: { label?: string }) {
  return (
    <svg viewBox="0 0 120 100" className="size-full" role="img" aria-label={`Anel aromático com ${label}`}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <polygon points="40,20 68,20 82,45 68,70 40,70 26,45" />
        <circle cx="54" cy="45" r="14" opacity="0.5" />
        <line x1="82" y1="45" x2="102" y2="33" />
      </g>
      <text x="104" y="30" fill="currentColor" fontSize="11" fontFamily="var(--font-sans)">
        {label}
      </text>
    </svg>
  );
}

function EnolMark() {
  return (
    <svg viewBox="0 0 140 100" className="size-full" role="img" aria-label="Hidroxila em carbono de dupla ligação">
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <line x1="16" y1="62" x2="56" y2="40" />
        <line x1="18" y1="68" x2="58" y2="46" />
        <line x1="58" y1="43" x2="96" y2="62" />
        <line x1="96" y1="62" x2="118" y2="48" />
      </g>
      <text x="118" y="44" fill="currentColor" fontSize="11">OH</text>
      <text x="46" y="32" fill="currentColor" fontSize="10" opacity="0.7">C=C</text>
    </svg>
  );
}

function Tautomer() {
  return (
    <svg viewBox="0 0 200 100" className="size-full" role="img" aria-label="Equilíbrio ceto-enólico">
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <line x1="14" y1="60" x2="46" y2="42" />
        <line x1="16" y1="66" x2="48" y2="48" />
        <line x1="48" y1="45" x2="72" y2="60" />
        <line x1="86" y1="44" x2="114" y2="44" />
        <line x1="86" y1="56" x2="114" y2="56" />
        <line x1="128" y1="60" x2="156" y2="44" />
        <line x1="156" y1="44" x2="184" y2="60" />
        <line x1="152" y1="42" x2="152" y2="22" />
        <line x1="158" y1="42" x2="158" y2="22" />
      </g>
      <text x="66" y="36" fill="currentColor" fontSize="10">OH</text>
      <text x="150" y="18" fill="currentColor" fontSize="10">O</text>
      <text x="88" y="76" fill="currentColor" fontSize="9" opacity="0.7">equilíbrio</text>
    </svg>
  );
}

function Families() {
  return (
    <svg viewBox="0 0 180 100" className="size-full" role="img" aria-label="Famílias de funções orgânicas">
      <g fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="90" cy="50" r="18" />
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const r = (a * Math.PI) / 180;
          return (
            <g key={a}>
              <line x1={90 + 18 * Math.cos(r)} y1={50 + 18 * Math.sin(r)} x2={90 + 40 * Math.cos(r)} y2={50 + 40 * Math.sin(r)} />
              <circle cx={90 + 44 * Math.cos(r)} cy={50 + 44 * Math.sin(r)} r="5" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function Compare() {
  return (
    <svg viewBox="0 0 200 100" className="size-full" role="img" aria-label="Comparação entre fenol e enol">
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <polygon points="26,26 52,26 65,50 52,74 26,74 13,50" />
        <circle cx="39" cy="50" r="12" opacity="0.5" />
        <line x1="65" y1="50" x2="80" y2="42" />
        <line x1="100" y1="18" x2="100" y2="82" opacity="0.35" />
        <line x1="124" y1="62" x2="152" y2="44" />
        <line x1="126" y1="68" x2="154" y2="50" />
        <line x1="154" y1="47" x2="180" y2="62" />
      </g>
      <text x="80" y="38" fill="currentColor" fontSize="10">OH</text>
      <text x="176" y="40" fill="currentColor" fontSize="10">OH</text>
    </svg>
  );
}

function Nodes({ n }: { n: number }) {
  return (
    <svg viewBox="0 0 180 100" className="size-full" role="img" aria-label="Diagrama de conceitos">
      <g fill="none" stroke="currentColor" strokeWidth="1.3">
        {Array.from({ length: n }).map((_, i) => (
          <g key={i}>
            <circle cx={24 + i * (130 / Math.max(1, n - 1))} cy={i % 2 ? 68 : 32} r="7" />
            {i > 0 && (
              <line
                x1={24 + (i - 1) * (130 / Math.max(1, n - 1))}
                y1={(i - 1) % 2 ? 68 : 32}
                x2={24 + i * (130 / Math.max(1, n - 1))}
                y2={i % 2 ? 68 : 32}
              />
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}

export function ChemVisual({ kind, className = "" }: { kind: ChemVisualKind; className?: string }) {
  const content = (() => {
    switch (kind) {
      case "phenol":
      case "phenol-props":
      case "nomenclature":
      case "phenol-examples":
        return <Ring />;
      case "enol":
      case "enol-name":
      case "enol-examples":
        return <EnolMark />;
      case "tautomer":
      case "mechanism":
        return <Tautomer />;
      case "compare":
      case "mistakes":
        return <Compare />;
      case "families":
      case "map":
      case "mindmap":
        return <Families />;
      default:
        return <Nodes n={5} />;
    }
  })();

  return (
    <div aria-hidden={false} className={`text-cyan/70 ${className}`}>
      {content}
    </div>
  );
}
