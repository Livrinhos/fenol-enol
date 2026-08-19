import shinjuku from "@/assets/cat-shinjuku-alley.jpg";
import osaka from "@/assets/cat-osaka-canal.jpg";
import kobe from "@/assets/cat-kobe-port.jpg";
import rooftops from "@/assets/cat-tokyo-rooftops.jpg";
import rain from "@/assets/cat-rain-umbrellas.jpg";
import documents from "@/assets/cat-documents.jpg";
import money from "@/assets/cat-money-yen.jpg";
import architecture from "@/assets/cat-architecture.jpg";
import festival from "@/assets/cat-festival.jpg";
import courthouse from "@/assets/cat-courthouse.jpg";

export type Episode = {
  number: number;
  title: string;
  description: string;
  duration: string;
  image: string;
  alt: string;
};

export const TOTAL_EPISODES = 20;

export const episodes: Episode[] = [
  {
    number: 1,
    title: "O QUE É A YAKUZA?",
    description:
      "Definições, termos e o que separa o mito da organização real reconhecida pelas autoridades japonesas.",
    duration: "08 min",
    image: shinjuku,
    alt: "Beco estreito de Tóquio à noite com lanternas acesas",
  },
  {
    number: 2,
    title: "ORIGENS",
    description:
      "Jogadores errantes, vendedores ambulantes e as comunidades marginais que antecedem os clãs modernos.",
    duration: "09 min",
    image: festival,
    alt: "Festival japonês noturno com lanternas de papel",
  },
  {
    number: 3,
    title: "EVOLUÇÃO",
    description:
      "Do pós-guerra à bolha econômica: como grupos locais se tornaram estruturas nacionais.",
    duration: "10 min",
    image: rooftops,
    alt: "Telhados de Tóquio ao amanhecer enevoado",
  },
  {
    number: 4,
    title: "PRINCIPAIS ORGANIZAÇÕES",
    description:
      "Os grupos designados pelas autoridades japonesas e o que se sabe publicamente sobre cada um.",
    duration: "09 min",
    image: architecture,
    alt: "Fachada de concreto de edifício em Tóquio à noite",
  },
  {
    number: 5,
    title: "HIERARQUIA",
    description:
      "Oyabun e kobun: a lógica de parentesco imposta que organiza obrigação, lealdade e punição.",
    duration: "08 min",
    image: documents,
    alt: "Documentos com carimbos vermelhos sob lâmpada",
  },
  {
    number: 6,
    title: "MAPA DE ATUAÇÃO",
    description:
      "Presença registrada por região, segundo relatórios oficiais — sem atribuir territórios sem evidência.",
    duration: "10 min",
    image: osaka,
    alt: "Canal de Osaka à noite com reflexos de letreiros",
  },
  {
    number: 7,
    title: "ATUAÇÃO INTERNACIONAL",
    description:
      "Casos documentados fora do Japão e os limites do que investigações internacionais conseguiram provar.",
    duration: "09 min",
    image: kobe,
    alt: "Guindastes do porto de Kobe no crepúsculo",
  },
  {
    number: 8,
    title: "DE ONDE VEM O DINHEIRO?",
    description:
      "Proteção, construção civil e mercados cinzentos: a engrenagem financeira que sustentou os clãs por décadas.",
    duration: "11 min",
    image: money,
    alt: "Notas de iene e livro-caixa sobre mesa escura",
  },
  {
    number: 9,
    title: "PRINCIPAIS ATIVIDADES",
    description:
      "Extorsão, jogo, agiotagem e intermediação: o repertório recorrente nos registros policiais.",
    duration: "09 min",
    image: rain,
    alt: "Multidão com guarda-chuvas pretos na chuva",
  },
  {
    number: 10,
    title: "ECONOMIA LEGAL E ILEGAL",
    description:
      "A zona cinzenta onde empresas de fachada, contratos e serviços legítimos se encontram.",
    duration: "10 min",
    image: architecture,
    alt: "Edifício corporativo austero à noite",
  },
  {
    number: 11,
    title: "LAVAGEM DE DINHEIRO",
    description:
      "Como o valor circula e reaparece — e o papel das unidades de inteligência financeira.",
    duration: "10 min",
    image: money,
    alt: "Notas e planilhas sobre mesa escura",
  },
  {
    number: 12,
    title: "COMBATE DO ESTADO",
    description:
      "Leis antigangue, exclusão econômica e a estratégia de sufocar em vez de confrontar.",
    duration: "11 min",
    image: courthouse,
    alt: "Corredor vazio de tribunal japonês",
  },
  {
    number: 13,
    title: "O DECLÍNIO",
    description:
      "Envelhecimento, cisões internas e a queda contínua no número de membros registrados.",
    duration: "09 min",
    image: rooftops,
    alt: "Skyline de Tóquio em tom frio",
  },
  {
    number: 14,
    title: "DADOS E EVIDÊNCIAS",
    description:
      "O que as estatísticas oficiais medem — e o que, por definição, elas não conseguem medir.",
    duration: "08 min",
    image: documents,
    alt: "Pasta de provas com carimbos vermelhos",
  },
  {
    number: 15,
    title: "POR QUE ESTÁ DIMINUINDO?",
    description:
      "Pressão legal, mudança geracional e custo social de pertencer a um grupo designado.",
    duration: "10 min",
    image: rain,
    alt: "Rua japonesa sob chuva forte",
  },
  {
    number: 16,
    title: "O NOVO CRIME ORGANIZADO",
    description:
      "Grupos difusos, recrutamento on-line e estruturas sem hierarquia visível.",
    duration: "10 min",
    image: shinjuku,
    alt: "Beco noturno com letreiros japoneses",
  },
  {
    number: 17,
    title: "IMPACTO SOCIAL",
    description:
      "Comércio local, vítimas, famílias e o custo cotidiano de conviver com um poder paralelo.",
    duration: "09 min",
    image: festival,
    alt: "Rua de bairro japonês durante festival",
  },
  {
    number: 18,
    title: "REALIDADE VS. FICÇÃO",
    description:
      "Cinema, mangá e imprensa: como a representação moldou a percepção pública.",
    duration: "09 min",
    image: osaka,
    alt: "Canal de Osaka refletindo luzes da cidade",
  },
  {
    number: 19,
    title: "CONCLUSÃO",
    description:
      "O que sobrou de um século de códigos e o que provavelmente vem depois.",
    duration: "08 min",
    image: kobe,
    alt: "Porto de Kobe com névoa",
  },
  {
    number: 20,
    title: "FONTES",
    description:
      "Documentos, relatórios e bibliografia utilizados na construção da série.",
    duration: "06 min",
    image: courthouse,
    alt: "Corredor institucional iluminado por fluorescentes",
  },
];

export function findEpisode(n: number): Episode | undefined {
  return episodes.find((e) => e.number === n);
}

export const sources = [
  {
    org: "National Police Agency (NPA)",
    note: "Relatórios anuais sobre grupos designados e criminalidade organizada.",
  },
  {
    org: "Ministry of Justice (MOJ)",
    note: "White Paper on Crime — processos, condenações e reincidência.",
  },
  {
    org: "UNODC",
    note: "Estudos sobre crime organizado transnacional e fluxos ilícitos.",
  },
  {
    org: "JAFIC",
    note: "Inteligência financeira: comunicações de operações suspeitas.",
  },
  {
    org: "Pesquisa acadêmica",
    note: "Estudos revisados por pares em criminologia e sociologia japonesa.",
  },
];

export const CATEGORIES = [
  "HISTÓRIA",
  "ESTRUTURA",
  "GEOGRAFIA",
  "DINHEIRO",
  "CRIME",
  "ESTADO",
  "DADOS",
  "CULTURA",
] as const;

export type Category = (typeof CATEGORIES)[number];

const CATEGORY_MAP: Record<number, Category[]> = {
  1: ["HISTÓRIA", "ESTRUTURA"],
  2: ["HISTÓRIA", "CULTURA"],
  3: ["HISTÓRIA", "ESTRUTURA"],
  4: ["ESTRUTURA", "DADOS"],
  5: ["ESTRUTURA", "CULTURA"],
  6: ["GEOGRAFIA", "DADOS"],
  7: ["GEOGRAFIA", "CRIME"],
  8: ["DINHEIRO", "CRIME"],
  9: ["CRIME", "ESTRUTURA"],
  10: ["DINHEIRO", "CRIME"],
  11: ["DINHEIRO", "ESTADO"],
  12: ["ESTADO", "CRIME"],
  13: ["HISTÓRIA", "DADOS"],
  14: ["DADOS", "ESTADO"],
  15: ["DADOS", "ESTADO"],
  16: ["CRIME", "ESTRUTURA"],
  17: ["CULTURA", "GEOGRAFIA"],
  18: ["CULTURA"],
  19: ["HISTÓRIA", "DADOS"],
  20: ["DADOS", "ESTADO"],
};

export function categoriesOf(n: number): Category[] {
  return CATEGORY_MAP[n] ?? [];
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function searchEpisodes(query: string, category?: string): Episode[] {
  const q = normalize(query.trim());
  const cat = category && category !== "TODAS" ? category : null;
  return episodes.filter((ep) => {
    if (cat && !categoriesOf(ep.number).includes(cat as Category)) return false;
    if (!q) return true;
    const haystack = normalize(
      [
        ep.title,
        ep.description,
        `ep ${ep.number}`,
        String(ep.number).padStart(2, "0"),
        categoriesOf(ep.number).join(" "),
      ].join(" "),
    );
    return haystack.includes(q);
  });
}
