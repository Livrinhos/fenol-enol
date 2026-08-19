import { episodes, type Episode } from "@/lib/episodes";

export type ChapterVisual =
  | { kind: "none" }
  | { kind: "timeline"; steps: string[] }
  | { kind: "flow"; steps: string[] }
  | { kind: "orbit"; center: string; centerNote?: string; around: string[] }
  | { kind: "grid"; items: string[] }
  | { kind: "stat"; value: string; label: string; bars?: { label: string; value: number }[] }
  | { kind: "axis"; top: string; bottom: string; note?: string }
  | { kind: "map"; cities: { name: string; note: string }[] }
  | { kind: "vs"; left: { title: string; items: string[] }; right: { title: string; items: string[] } }
  | { kind: "statement"; lines: string[] }
  | { kind: "sources"; items: { org: string; note: string }[] };

export type Chapter = Episode & {
  subtitle: string;
  narrative: string;
  visual: ChapterVisual;
  source?: string;
};

const content: Record<
  number,
  { subtitle: string; narrative: string; visual: ChapterVisual; source?: string }
> = {
  1: {
    subtitle: "Conceito, termo e contexto",
    narrative:
      "No Japão, os grupos que o mundo chama de Yakuza são oficialmente designados bōryokudan — “grupos violentos”. Não são sociedades secretas: têm sede, emblema e nome registrados pelas autoridades. O que muda, ao longo de um século, é o quanto o Estado tolera essa visibilidade.",
    visual: {
      kind: "grid",
      items: ["Bōryokudan", "Grupos designados", "Registro oficial", "Contexto histórico"],
    },
    source: "National Police Agency — relatórios anuais",
  },
  2: {
    subtitle: "Antes dos clãs modernos",
    narrative:
      "Duas linhagens aparecem nos relatos históricos: os bakuto, ligados ao jogo, e os tekiya, vendedores ambulantes de feiras e festivais. Comunidades à margem, com regras próprias, que forneceram vocabulário, ritual e estrutura às organizações posteriores.",
    visual: { kind: "timeline", steps: ["Bakuto", "Tekiya", "Organizações modernas"] },
  },
  3: {
    subtitle: "Um século em seis tempos",
    narrative:
      "O caminho não é linear. Da margem social ao vácuo do pós-guerra, da expansão econômica à repressão legal dos anos 1990, cada fase redefine o que o grupo pode fazer em público — e o que passa a fazer fora de vista.",
    visual: {
      kind: "timeline",
      steps: ["Origens", "Século XX", "Pós-guerra", "Expansão", "Repressão", "Século XXI"],
    },
  },
  4: {
    subtitle: "Os grupos designados",
    narrative:
      "As autoridades japonesas publicam a lista dos grupos designados. Três nomes se repetem há décadas nos relatórios oficiais, com sedes historicamente associadas à região de Kansai e à área metropolitana de Tóquio.",
    visual: { kind: "grid", items: ["Yamaguchi-gumi", "Sumiyoshi-kai", "Inagawa-kai"] },
    source: "National Police Agency",
  },
  5: {
    subtitle: "Parentesco imposto",
    narrative:
      "A estrutura imita a família: oyabun, o “papel de pai”, e kobun, os “filhos”. Não é afeto — é obrigação. A hierarquia define quem responde por quem, quem paga a quem e quem carrega a culpa quando algo dá errado.",
    visual: { kind: "flow", steps: ["Oyabun", "Lideranças", "Grupos", "Membros"] },
  },
  6: {
    subtitle: "Presença registrada, não território",
    narrative:
      "Relatórios oficiais registram concentração de membros por província. Isso indica presença — não posse. Nenhum mapa sério atribui territórios sem evidência documental, e este documentário não vai inventá-los.",
    visual: {
      kind: "map",
      cities: [
        { name: "Tóquio", note: "Área metropolitana" },
        { name: "Osaka", note: "Região de Kansai" },
        { name: "Kobe", note: "Hyōgo" },
      ],
    },
    source: "National Police Agency — distribuição por província",
  },
  7: {
    subtitle: "Conexões, com cautela",
    narrative:
      "Existem casos documentados de atividade ligada a membros fora do Japão — sobretudo em investigações financeiras e de tráfico. Casos não equivalem a domínio: presença pontual e controle territorial são coisas diferentes, e só a primeira está provada.",
    visual: { kind: "grid", items: ["Casos judiciais", "Fluxos financeiros", "Cooperação policial", "Limites da evidência"] },
    source: "UNODC · relatórios de cooperação internacional",
  },
  8: {
    subtitle: "A engrenagem financeira",
    narrative:
      "O dinheiro é o que sustenta a estrutura. Os registros policiais descrevem um repertório amplo, que vai da cobrança por “proteção” a esquemas financeiros sofisticados — e é ele, mais do que a violência, que define a longevidade de um grupo.",
    visual: {
      kind: "orbit",
      center: "Dinheiro",
      centerNote: "Economia criminal",
      around: ["Extorsão", "Fraudes", "Drogas", "Jogos ilegais", "Contrabando", "Exploração"],
    },
    source: "Ministry of Justice — White Paper on Crime",
  },
  9: {
    subtitle: "O repertório recorrente",
    narrative:
      "As mesmas categorias reaparecem década após década nos registros. Mudam os métodos e a escala; a lista, em essência, permanece.",
    visual: {
      kind: "grid",
      items: ["Extorsão", "Drogas", "Jogos ilegais", "Fraudes", "Contrabando", "Exploração"],
    },
  },
  10: {
    subtitle: "A zona cinzenta",
    narrative:
      "Construção civil, entretenimento, imobiliário, serviços. A fronteira entre economia legal e ilegal raramente é uma linha — é um degradê onde empresas de fachada e contratos legítimos convivem.",
    visual: {
      kind: "axis",
      top: "Legal",
      bottom: "Ilegal",
      note: "Empresas de fachada, contratos e intermediação ocupam o meio.",
    },
  },
  11: {
    subtitle: "Explicação conceitual",
    narrative:
      "Lavagem de dinheiro é, conceitualmente, transformar recurso ilícito em recurso de aparência legítima. As unidades de inteligência financeira acompanham o percurso. Aqui só descrevemos o conceito — nenhum passo operacional.",
    visual: {
      kind: "flow",
      steps: ["Recursos ilícitos", "Ocultação", "Movimentação", "Integração", "Aparência de legitimidade"],
    },
    source: "JAFIC — inteligência financeira",
  },
  12: {
    subtitle: "Sufocar, não confrontar",
    narrative:
      "A estratégia japonesa foi menos o confronto armado e mais o cerco: leis antigangue, exclusão bancária, cláusulas contratuais e cooperação entre órgãos. Tornar caro e inviável pertencer.",
    visual: { kind: "grid", items: ["Polícia", "Leis", "Finanças", "Restrições", "Cooperação"] },
    source: "National Police Agency · Ministry of Justice",
  },
  13: {
    subtitle: "A curva descendente",
    narrative:
      "O número de membros registrados cai de forma contínua há mais de vinte anos. É o dado mais citado sobre o tema — e também o que exige mais cuidado: ele mede o que é registrado, não o que existe.",
    visual: {
      kind: "stat",
      value: "18.800",
      label: "Membros e associados registrados (ordem de grandeza recente)",
      bars: [
        { label: "Pico histórico", value: 100 },
        { label: "Anos 2000", value: 62 },
        { label: "Anos 2010", value: 34 },
        { label: "Recente", value: 16 },
      ],
    },
    source: "Dado a confirmar com o relatório anual da NPA na versão final",
  },
  14: {
    subtitle: "O que os números medem",
    narrative:
      "Toda estatística tem um recorte. Contagens oficiais registram filiação declarada, prisões e denúncias — não a totalidade da atividade. Ler o dado é também ler o que ele deixa de fora.",
    visual: {
      kind: "grid",
      items: ["Filiação registrada", "Prisões", "Denúncias", "Zona não medida"],
    },
    source: "NPA · MOJ · UNODC",
  },
  15: {
    subtitle: "Quatro pressões simultâneas",
    narrative:
      "Nenhum fator explica sozinho o declínio. Leis mais duras, policiamento constante, exclusão do sistema financeiro e uma rejeição social crescente atuaram juntos por três décadas.",
    visual: {
      kind: "grid",
      items: ["Leis", "Pressão policial", "Restrições financeiras", "Rejeição social"],
    },
  },
  16: {
    subtitle: "Redes no lugar de clãs",
    narrative:
      "Ao lado do modelo tradicional surgem grupos difusos, montados por recrutamento on-line, sem emblema nem hierarquia estável. Não são a Yakuza sob outro nome — são outra coisa, e as autoridades os tratam separadamente.",
    visual: {
      kind: "vs",
      left: { title: "Modelo tradicional", items: ["Hierarquia visível", "Emblema e sede", "Vínculo duradouro"] },
      right: { title: "Redes flexíveis", items: ["Estrutura difusa", "Recrutamento on-line", "Vínculo temporário"] },
    },
  },
  17: {
    subtitle: "O custo cotidiano",
    narrative:
      "O impacto não se resume ao crime registrado: aparece no comércio pequeno, na sensação de segurança, na confiança institucional e no custo público de fiscalizar.",
    visual: { kind: "grid", items: ["Economia", "Segurança", "Sociedade", "Estado"] },
  },
  18: {
    subtitle: "O que a ficção fez com o tema",
    narrative:
      "Filmes, séries, mangás, animes e jogos criaram uma imagem estável — e frequentemente romântica. Ela é útil para entender a percepção pública, não para descrever a realidade documentada.",
    visual: {
      kind: "statement",
      lines: ["Filmes · Séries · Mangás", "Animes · Jogos", "Representação ≠ documento"],
    },
  },
  19: {
    subtitle: "O que fica",
    narrative:
      "Um século de códigos termina em números decrescentes e estruturas envelhecidas. O que substitui não é necessariamente menor — é apenas menos visível.",
    visual: { kind: "statement", lines: ["A Yakuza mudou.", "Mas o crime organizado também."] },
  },
  20: {
    subtitle: "Referências",
    narrative:
      "Todo o material desta série parte de fontes públicas. Números sem fonte não entram; onde a evidência é parcial, o episódio diz que é parcial.",
    visual: {
      kind: "sources",
      items: [
        { org: "National Police Agency (NPA)", note: "Relatórios anuais sobre grupos designados." },
        { org: "Ministry of Justice (MOJ)", note: "White Paper on Crime." },
        { org: "UNODC", note: "Crime organizado transnacional e fluxos ilícitos." },
        { org: "JAFIC", note: "Inteligência financeira e operações suspeitas." },
        { org: "Pesquisa acadêmica", note: "Criminologia e sociologia japonesa revisadas por pares." },
      ],
    },
  },
};

export const chapters: Chapter[] = episodes.map((ep) => ({
  ...ep,
  ...(content[ep.number] ?? {
    subtitle: "",
    narrative: ep.description,
    visual: { kind: "none" } as ChapterVisual,
  }),
}));

export function findChapter(n: number): Chapter {
  return chapters.find((c) => c.number === n) ?? chapters[7]!;
}
