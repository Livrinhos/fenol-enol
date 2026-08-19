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
import hero from "@/assets/hero-tokyo-night.jpg";

export type CatalogItem = {
  id: string;
  title: string;
  episode: string;
  episodeNumber: number;
  description: string;
  image: string;
  alt: string;
};

export type CatalogSection = {
  id: string;
  title: string;
  note?: string;
  items: CatalogItem[];
};

const item = (
  id: string,
  title: string,
  episodeNumber: number,
  description: string,
  image: string,
  alt: string,
): CatalogItem => ({
  id,
  title,
  episodeNumber,
  episode: `EP. ${String(episodeNumber).padStart(2, "0")}`,
  description,
  image,
  alt,
});

export const YAKUZA_ITEM: CatalogItem = item(
  "yakuza",
  "YAKUZA",
  1,
  "A série completa: um século de códigos, rituais e silêncio no submundo japonês.",
  hero,
  "Rua de Tóquio à noite sob chuva com letreiros japoneses",
);

export const catalogSections: CatalogSection[] = [
  {
    id: "destaque",
    title: "Em destaque",
    note: "Seleção do arquivo",
    items: [
      item("d1", "Tóquio, hora zero", 1, "A cidade onde tudo começa e nada é dito em voz alta.", shinjuku, "Beco iluminado por lanternas em Tóquio à noite"),
      item("d2", "O canal de Osaka", 3, "Comércio, dívida e proteção às margens da água.", osaka, "Canal de Osaka à noite com reflexos de letreiros"),
      item("d3", "Porto de Kobe", 5, "Contêineres, rotas e o que atravessa o mar sem registro.", kobe, "Guindastes do porto de Kobe no crepúsculo"),
      item("d4", "Chuva sobre a cidade", 9, "Testemunhos anônimos sob guarda-chuvas negros.", rain, "Multidão com guarda-chuvas pretos na chuva"),
      item("d5", "Arquivo aberto", 12, "Documentos que ficaram trinta anos fechados.", documents, "Documentos policiais japoneses com carimbos vermelhos"),
    ],
  },
  {
    id: "historia",
    title: "História",
    items: [
      item("h1", "Origens e códigos", 1, "Dos jogadores errantes aos primeiros clãs urbanos.", festival, "Festival japonês noturno com lanternas de papel"),
      item("h2", "Pós-guerra", 2, "Mercados negros e o vácuo de poder de 1945.", rooftops, "Telhados de Tóquio ao amanhecer enevoado"),
      item("h3", "Anos de expansão", 4, "A bolha econômica e o dinheiro fácil.", money, "Notas de iene e livro-caixa sobre mesa escura"),
      item("h4", "O lento apagamento", 20, "Leis antigangue e o fim de uma era.", courthouse, "Corredor vazio de tribunal japonês"),
    ],
  },
  {
    id: "estrutura",
    title: "Estrutura",
    items: [
      item("e1", "Hierarquia", 6, "Oyabun, kobun e a lógica de família imposta.", architecture, "Fachada de concreto de edifício em Tóquio à noite"),
      item("e2", "Rituais", 7, "Cerimônias, selos e juramentos de silêncio.", documents, "Documentos com carimbos vermelhos sob lâmpada"),
      item("e3", "Territórios internos", 10, "Como um clã divide uma cidade inteira.", rooftops, "Vista aérea de telhados densos em Tóquio"),
    ],
  },
  {
    id: "geografia",
    title: "Geografia",
    items: [
      item("g1", "Tóquio", 11, "Kabukicho e a economia noturna.", shinjuku, "Beco estreito em Tóquio com lanternas acesas"),
      item("g2", "Osaka", 13, "A raiz mais antiga do mapa.", osaka, "Canal de Osaka refletindo luzes"),
      item("g3", "Kobe", 14, "O porto como artéria.", kobe, "Porto de Kobe com névoa"),
    ],
  },
  {
    id: "dinheiro",
    title: "Dinheiro",
    items: [
      item("m1", "De onde vem o dinheiro?", 8, "Proteção, construção civil e mercados cinzentos.", money, "Pilhas de notas de iene sobre mesa escura"),
      item("m2", "Fachadas legais", 15, "Empresas, imóveis e contratos públicos.", architecture, "Edifício corporativo austero à noite"),
      item("m3", "A rota do porto", 16, "Logística, importação e desvios.", kobe, "Contêineres e guindastes ao entardecer"),
    ],
  },
  {
    id: "investigacao",
    title: "Investigação",
    items: [
      item("i1", "A polícia de Osaka", 17, "Décadas de vigilância e paciência.", courthouse, "Corredor institucional iluminado por fluorescentes"),
      item("i2", "Provas e carimbos", 18, "O que um documento consegue provar.", documents, "Pasta de provas com carimbos vermelhos"),
      item("i3", "Sob chuva", 19, "Entrevistas gravadas em ruas abertas.", rain, "Rua japonesa sob chuva forte"),
    ],
  },
  {
    id: "dados",
    title: "Dados",
    items: [
      item("t1", "Números do declínio", 12, "Membros registrados de 1963 a 2026.", rooftops, "Skyline de Tóquio em tom frio"),
      item("t2", "Mapa de clãs", 13, "Distribuição por prefeitura.", architecture, "Arquitetura urbana geométrica à noite"),
      item("t3", "Economia paralela", 15, "Estimativas de receita por setor.", money, "Notas e planilhas sobre mesa"),
    ],
  },
  {
    id: "cultura",
    title: "Cultura",
    items: [
      item("c1", "Selos e ukiyo-e", 2, "A imagem pública de um mundo fechado.", festival, "Lanternas de papel e torii em festival noturno"),
      item("c2", "Cinema e mito", 6, "Como a ficção construiu a lenda.", shinjuku, "Beco noturno com letreiros japoneses"),
      item("c3", "O bairro e a rua", 9, "Vida cotidiana ao lado do poder invisível.", rain, "Pedestres com guarda-chuvas em rua japonesa"),
    ],
  },
];

export const allItems: CatalogItem[] = [
  YAKUZA_ITEM,
  ...catalogSections.flatMap((s) => s.items),
];

export function findItem(id: string): CatalogItem | undefined {
  return allItems.find((i) => i.id === id);
}
