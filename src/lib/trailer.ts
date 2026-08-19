import shinjuku from "@/assets/cat-shinjuku-alley.jpg";
import osaka from "@/assets/cat-osaka-canal.jpg";
import kobe from "@/assets/cat-kobe-port.jpg";
import rooftops from "@/assets/cat-tokyo-rooftops.jpg";
import rain from "@/assets/cat-rain-umbrellas.jpg";
import documents from "@/assets/cat-documents.jpg";
import money from "@/assets/cat-money-yen.jpg";
import courthouse from "@/assets/cat-courthouse.jpg";
import hero from "@/assets/hero-tokyo-night.jpg";

export type TrailerScene = {
  id: string;
  title: string;
  line: string;
  image: string;
  alt: string;
  /** duration in ms */
  ms: number;
};

/** ~27s cinematic sequence built from existing photography. */
export const trailerScenes: TrailerScene[] = [
  {
    id: "tokyo",
    title: "TÓQUIO",
    line: "Uma cidade que aprendeu a conviver com o que não se nomeia.",
    image: hero,
    alt: "Rua de Tóquio à noite sob chuva com letreiros japoneses refletidos no asfalto",
    ms: 3200,
  },
  {
    id: "yakuza",
    title: "YAKUZA",
    line: "Oficialmente, bōryokudan. Registrados. Designados. Vigiados.",
    image: shinjuku,
    alt: "Beco estreito de Shinjuku com lanternas acesas",
    ms: 3000,
  },
  {
    id: "origens",
    title: "ORIGENS",
    line: "Bakuto e tekiya — o jogo e a feira, à margem da lei.",
    image: rooftops,
    alt: "Telhados de Tóquio ao amanhecer enevoado",
    ms: 3000,
  },
  {
    id: "hierarquia",
    title: "HIERARQUIA",
    line: "Oyabun e kobun: parentesco imposto, obrigação vitalícia.",
    image: rain,
    alt: "Pessoas com guarda-chuvas em rua japonesa sob chuva",
    ms: 3000,
  },
  {
    id: "dinheiro",
    title: "DINHEIRO",
    line: "De onde vem, para onde vai — e o que nunca aparece nos livros.",
    image: money,
    alt: "Notas de iene japonês sobre superfície escura",
    ms: 3000,
  },
  {
    id: "mapa",
    title: "MAPA",
    line: "Tóquio. Osaka. Kobe. Presença registrada, não território.",
    image: osaka,
    alt: "Canal de Osaka à noite com reflexos de luzes",
    ms: 3000,
  },
  {
    id: "combate",
    title: "COMBATE",
    line: "Três décadas de leis antiexclusão e pressão policial.",
    image: courthouse,
    alt: "Fachada de tribunal japonês em concreto",
    ms: 3000,
  },
  {
    id: "declinio",
    title: "DECLÍNIO",
    line: "18.800 membros — o menor número já registrado.",
    image: documents,
    alt: "Documentos policiais e relatórios sobre mesa",
    ms: 3200,
  },
  {
    id: "final",
    title: "YAKUZA",
    line: "Documentário interativo · 20 episódios",
    image: kobe,
    alt: "Porto de Kobe à noite com guindastes e névoa",
    ms: 3600,
  },
];

export const trailerTotalMs = trailerScenes.reduce((sum, s) => sum + s.ms, 0);
