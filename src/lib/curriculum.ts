/**
 * QUÍMICA ORGÂNICA — estrutura reutilizável da apresentação.
 * 20 capítulos, 4 integrantes (~5 min cada). Base para as próximas fases.
 */

export type ChemVisualKind =
  | "families"
  | "functional-group"
  | "recognize"
  | "map"
  | "phenol"
  | "phenol-props"
  | "nomenclature"
  | "phenol-examples"
  | "applications"
  | "enol"
  | "enol-name"
  | "tautomer"
  | "enol-examples"
  | "mechanism"
  | "compare"
  | "mistakes"
  | "mindmap"
  | "sources";

export type Chapter = {
  number: number;
  /** 1..4 — integrante responsável */
  part: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  /** frase-chave exibida no card */
  key: string;
  /** roteiro oral, disponível ao abrir a parte */
  script: string;
  visual: ChemVisualKind;
  /** ~ minuto de fala */
  duration: string;
};

export type PresentationPart = {
  id: 1 | 2 | 3 | 4;
  slug: "fundamentos" | "fenol" | "enol" | "aplicacoes";
  label: string;
  theme: string;
  presenter: string;
  focus: string;
  duration: string;
  range: string;
};

export const parts: PresentationPart[] = [
  {
    id: 1,
    slug: "fundamentos",
    label: "Integrante 1",
    theme: "FUNDAMENTOS",
    presenter: "Henrique",
    focus: "Funções orgânicas, grupos funcionais e como reconhecê-los em estruturas.",
    duration: "~5 min",
    range: "01 – 05",
  },
  {
    id: 2,
    slug: "fenol",
    label: "Integrante 2",
    theme: "FENOL",
    presenter: "Integrante 2",
    focus: "OH ligado ao anel aromático: estrutura, propriedades, nomenclatura e usos.",
    duration: "~5 min",
    range: "06 – 10",
  },
  {
    id: 3,
    slug: "enol",
    label: "Integrante 3",
    theme: "ENOL",
    presenter: "Integrante 3",
    focus: "OH em carbono de dupla ligação, nomenclatura e tautomeria ceto-enólica.",
    duration: "~5 min",
    range: "11 – 15",
  },
  {
    id: 4,
    slug: "aplicacoes",
    label: "Integrante 4",
    theme: "APLICAÇÕES & COMPARAÇÃO",
    presenter: "Integrante 4",
    focus: "Importância prática, fenol × enol, erros comuns, resumo e fontes.",
    duration: "~5 min",
    range: "16 – 20",
  },
];

export const chapters: Chapter[] = [
  {
    number: 1,
    part: 1,
    title: "O QUE SÃO FUNÇÕES ORGÂNICAS?",
    subtitle: "Conceito e classificação",
    key: "Funções agrupam compostos que se comportam de forma parecida.",
    script:
      "Função orgânica é o conjunto de compostos que compartilham um mesmo arranjo de átomos e, por isso, apresentam comportamento químico semelhante. Em vez de estudar milhões de moléculas isoladas, a química orgânica as organiza em famílias: hidrocarbonetos, álcoois, fenóis, aldeídos, cetonas, ácidos carboxílicos, ésteres, aminas e outras. Essa classificação é o mapa que usamos durante toda a apresentação.",
    visual: "families",
    duration: "1 min",
  },
  {
    number: 2,
    part: 1,
    title: "GRUPOS FUNCIONAIS",
    subtitle: "A assinatura da molécula",
    key: "O grupo funcional decide as propriedades do composto.",
    script:
      "O grupo funcional é o átomo ou conjunto de átomos responsável pelo comportamento característico da função. Ele concentra a reatividade: define polaridade, solubilidade, ponto de ebulição, acidez e o tipo de reação que a molécula faz. Trocar o grupo funcional muda a identidade química, mesmo mantendo a cadeia carbônica.",
    visual: "functional-group",
    duration: "1 min",
  },
  {
    number: 3,
    part: 1,
    title: "PRINCIPAIS FUNÇÕES",
    subtitle: "Visão geral comparativa",
    key: "Mesmo OH, contextos diferentes: álcool, fenol e enol.",
    script:
      "Comparando as famílias mais comuns: álcool tem OH em carbono saturado; fenol tem OH ligado diretamente ao anel aromático; enol tem OH em carbono de dupla ligação; aldeído e cetona têm carbonila em posições distintas; ácido carboxílico reúne carbonila e hidroxila. A comparação mostra que a posição do mesmo grupo já cria funções diferentes.",
    visual: "recognize",
    duration: "1 min",
  },
  {
    number: 4,
    part: 1,
    title: "COMO RECONHECER UMA FUNÇÃO",
    subtitle: "Leitura de estruturas",
    key: "Ache o heteroátomo, depois o carbono vizinho.",
    script:
      "Roteiro prático de leitura: primeiro localize o heteroátomo ou a insaturação (O, N, dupla ligação); depois observe a que tipo de carbono ele está ligado — saturado, aromático ou de dupla ligação; por último confirme a vizinhança para separar casos parecidos. Esse método é o que vamos aplicar em fenol e enol.",
    visual: "recognize",
    duration: "1 min",
  },
  {
    number: 5,
    part: 1,
    title: "FENOL E ENOL NO MAPA DA QUÍMICA",
    subtitle: "Onde nossa apresentação se encaixa",
    key: "Dois vizinhos do álcool, com comportamentos distintos.",
    script:
      "Fenol e enol ocupam posições vizinhas ao álcool nesse mapa, mas com comportamento próprio: o fenol é mais ácido por causa da estabilização do anel aromático; o enol é geralmente instável e tende a converter-se na forma cetônica. A partir daqui, cada integrante aprofunda uma dessas frentes.",
    visual: "map",
    duration: "1 min",
  },

  {
    number: 6,
    part: 2,
    title: "O QUE É UM FENOL?",
    subtitle: "OH no anel aromático",
    key: "Hidroxila ligada direto ao carbono do anel benzênico.",
    script:
      "Fenol é a função em que a hidroxila (OH) está ligada diretamente a um carbono do anel aromático. Se o OH estiver ligado a um carbono saturado fora do anel, o composto é álcool aromático, não fenol. O composto mais simples da família é o próprio fenol, C6H5OH.",
    visual: "phenol",
    duration: "1 min",
  },
  {
    number: 7,
    part: 2,
    title: "ESTRUTURA E PROPRIEDADES",
    subtitle: "Polaridade e acidez relativa",
    key: "Mais ácido que álcool, menos que ácido carboxílico.",
    script:
      "A ligação entre o OH e o anel permite que a carga negativa do ânion formado se distribua pelo sistema aromático, o que estabiliza esse ânion e torna o fenol mais ácido que os álcoois — porém menos que os ácidos carboxílicos. São compostos polares, com sólida ligação de hidrogênio, alto ponto de ebulição e solubilidade parcial em água.",
    visual: "phenol-props",
    duration: "1 min",
  },
  {
    number: 8,
    part: 2,
    title: "NOMENCLATURA DOS FENÓIS",
    subtitle: "Regras básicas e exemplos",
    key: "Anel numerado a partir do carbono que carrega o OH.",
    script:
      "A nomenclatura usa o nome fenol como base e numera o anel começando pelo carbono ligado ao OH, seguindo a direção que dê os menores números aos substituintes. Também são aceitas as marcações orto, meta e para para dissubstituídos. Exemplos: 2-metilfenol, 4-clorofenol, 1,2-benzenodiol.",
    visual: "nomenclature",
    duration: "1 min",
  },
  {
    number: 9,
    part: 2,
    title: "EXEMPLOS DE FENÓIS",
    subtitle: "Da molécula simples aos derivados",
    key: "Fenol, cresóis, catecol, hidroquinona e timol.",
    script:
      "Além do fenol comum, os cresóis (metilfenóis) aparecem em desinfetantes; o catecol e a hidroquinona são difenóis usados em processos industriais e fotográficos; o timol, presente no óleo essencial de tomilho, é um fenol natural com ação antisséptica. São exemplos que mostram a variedade da família.",
    visual: "phenol-examples",
    duration: "1 min",
  },
  {
    number: 10,
    part: 2,
    title: "APLICAÇÕES DOS FENÓIS",
    subtitle: "Indústria, saúde e cuidados",
    key: "Resinas, desinfetantes e intermediários — com cautela.",
    script:
      "Os fenóis são matéria-prima de resinas fenólicas, base de desinfetantes e antissépticos, e intermediários na produção de medicamentos, polímeros e antioxidantes. São também compostos irritantes e tóxicos por contato e inalação, motivo pelo qual seu uso é restrito a formulações controladas e manuseio profissional — aqui tratamos apenas do conceito, sem detalhes operacionais.",
    visual: "applications",
    duration: "1 min",
  },

  {
    number: 11,
    part: 3,
    title: "O QUE É UM ENOL?",
    subtitle: "OH em carbono de dupla ligação",
    key: "Hidroxila presa a um carbono da ligação C=C.",
    script:
      "Enol é a função em que a hidroxila está ligada a um carbono que participa de uma dupla ligação carbono-carbono. O nome vem de en (alceno) + ol (álcool). Essa combinação é geralmente instável e se reorganiza rapidamente para a forma cetônica ou aldeídica.",
    visual: "enol",
    duration: "1 min",
  },
  {
    number: 12,
    part: 3,
    title: "ESTRUTURA E NOMENCLATURA",
    subtitle: "Identificar C=C e OH",
    key: "Numere a cadeia dando prioridade ao OH.",
    script:
      "Para nomear, identifique a cadeia principal, marque a posição da dupla ligação e a posição do OH, usando a numeração que dê o menor valor à hidroxila. Assim surgem nomes como etenol e prop-1-en-2-ol. Na leitura da estrutura, o sinal é sempre o mesmo: o OH tocando um carbono da dupla.",
    visual: "enol-name",
    duration: "1 min",
  },
  {
    number: 13,
    part: 3,
    title: "TAUTOMERIA CETO-ENÓLICA",
    subtitle: "Equilíbrio entre duas formas",
    key: "Forma ceto e forma enol convivem em equilíbrio.",
    script:
      "A tautomeria ceto-enólica é um equilíbrio dinâmico: um hidrogênio migra e a dupla ligação se desloca, convertendo a forma enol na forma cetônica e vice-versa. Na maioria dos casos simples o equilíbrio está fortemente deslocado para a forma ceto, mais estável. Não são isômeros diferentes de mistura: são formas que se interconvertem.",
    visual: "tautomer",
    duration: "1 min",
  },
  {
    number: 14,
    part: 3,
    title: "EXEMPLOS DE ENÓIS",
    subtitle: "Leitura de estruturas didáticas",
    key: "Etenol vira etanal; o enol é o intermediário.",
    script:
      "O exemplo clássico é o etenol (CH2=CH–OH), que se converte em etanal. O prop-1-en-2-ol corresponde à propanona. Em compostos com dois grupos carbonila, como a pentano-2,4-diona, a forma enol é bem mais presente por estabilização adicional. Ler esses pares ceto/enol é o exercício central do tema.",
    visual: "enol-examples",
    duration: "1 min",
  },
  {
    number: 15,
    part: 3,
    title: "ONDE OS ENÓIS APARECEM?",
    subtitle: "Papel em transformações químicas",
    key: "Intermediários que explicam muitas reações.",
    script:
      "Mesmo pouco estáveis, os enóis são importantes como intermediários: aparecem em reações de compostos carbonílicos, em processos bioquímicos e em etapas de rotas industriais. Para o ensino médio, o essencial é reconhecer a estrutura, entender o equilíbrio ceto-enólico e saber que essa forma explica o comportamento de muitas moléculas.",
    visual: "mechanism",
    duration: "1 min",
  },

  {
    number: 16,
    part: 4,
    title: "APLICAÇÕES E IMPORTÂNCIA",
    subtitle: "Do laboratório ao cotidiano",
    key: "Fenóis no produto final; enóis no caminho da reação.",
    script:
      "Fenóis estão em produtos concretos: resinas, adesivos, desinfetantes, conservantes, antioxidantes e medicamentos. O conceito de enol tem outra importância: ele explica etapas de reações e o comportamento de compostos carbonílicos. Um aparece no produto, o outro no percurso — os dois sustentam a química orgânica aplicada.",
    visual: "applications",
    duration: "1 min",
  },
  {
    number: 17,
    part: 4,
    title: "FENOL × ENOL",
    subtitle: "Comparação direta",
    key: "Aromático e estável × insaturado e transitório.",
    script:
      "Fenol: OH ligado a carbono do anel aromático, composto estável, acidez apreciável, presente em produtos comerciais. Enol: OH ligado a carbono de dupla ligação não aromática, geralmente instável, tende ao equilíbrio ceto-enólico, atua como intermediário. A diferença está na natureza do carbono que sustenta a hidroxila.",
    visual: "compare",
    duration: "1 min",
  },
  {
    number: 18,
    part: 4,
    title: "ERROS COMUNS",
    subtitle: "O que a prova costuma cobrar",
    key: "O carbono do OH define a função.",
    script:
      "Erro um: chamar fenol de álcool. Em álcool o OH está em carbono saturado; em fenol, no carbono do anel. Erro dois: confundir fenol com enol, já que ambos têm OH em carbono insaturado — a diferença é que no fenol a insaturação faz parte do sistema aromático. Erro três: achar que a forma enol é estável isoladamente.",
    visual: "mistakes",
    duration: "1 min",
  },
  {
    number: 19,
    part: 4,
    title: "RESUMO FINAL",
    subtitle: "Mapa mental dos conceitos",
    key: "Grupo funcional → função → propriedade → aplicação.",
    script:
      "Resumindo o percurso: funções orgânicas organizam os compostos; o grupo funcional define propriedades; o fenol traz o OH aromático, mais ácido e industrialmente relevante; o enol traz o OH em dupla ligação e o equilíbrio ceto-enólico; a comparação entre eles fecha o raciocínio de identificação de estruturas.",
    visual: "mindmap",
    duration: "1 min",
  },
  {
    number: 20,
    part: 4,
    title: "CONCLUSÃO + FONTES",
    subtitle: "Síntese e referências",
    key: "Ler a estrutura é entender a química.",
    script:
      "Conclusão: identificar corretamente o grupo funcional permite prever propriedades e aplicações — é o que diferencia álcool, fenol e enol. Fontes consultadas: livros didáticos de química orgânica do ensino médio, materiais da IUPAC sobre nomenclatura, e publicações acadêmicas de universidades brasileiras sobre funções oxigenadas.",
    visual: "sources",
    duration: "1 min",
  },
];

export const TOTAL_CHAPTERS = chapters.length;

export function chaptersByPart(part: 1 | 2 | 3 | 4): Chapter[] {
  return chapters.filter((c) => c.part === part);
}

export function findChapter(n: number): Chapter | undefined {
  return chapters.find((c) => c.number === n);
}

export const pad = (n: number) => String(n).padStart(2, "0");
