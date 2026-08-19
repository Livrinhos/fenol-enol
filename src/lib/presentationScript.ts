export type PresenterPart = {
  id: 1 | 2 | 3 | 4;
  presenter: string;
  chapters: string;
  duration: string;
  script: string;
};

export type MoleculeExtra = {
  title: string;
  purpose: string;
  fenolSequence: string[];
  enolSequence: string[];
  challenge: string;
};

export const presentationScript: PresenterPart[] = [
  {
    id: 1,
    presenter: "Henrique",
    chapters: "01–05",
    duration: "aprox. 5 minutos",
    script: `EP. 01 — O QUE SÃO FUNÇÕES ORGÂNICAS?\n\nPara começar, precisamos entender o que são funções orgânicas. Elas são formas de classificar os compostos orgânicos de acordo com determinadas características estruturais e químicas. Em vez de estudar cada molécula separadamente, a Química organiza os compostos em famílias, como álcoois, fenóis, aldeídos, cetonas, ácidos carboxílicos e ésteres. Essa classificação facilita o estudo porque compostos de uma mesma função costumam apresentar propriedades químicas semelhantes. E é essa organização que vai nos ajudar a entender o fenol e o enol.\n\nEP. 02 — GRUPOS FUNCIONAIS\n\nDentro dessas funções existe um conceito muito importante: o grupo funcional. Ele é um átomo ou conjunto de átomos responsável por características químicas de uma função. Por exemplo, nos álcoois encontramos a hidroxila, representada por OH. Em outras funções aparecem grupos diferentes, como a carbonila. Podemos pensar no grupo funcional como uma assinatura da molécula. Também precisamos observar a posição desse grupo, porque um OH pode pertencer a contextos diferentes.\n\nEP. 03 — PRINCIPAIS FUNÇÕES\n\nEntre as funções orgânicas mais conhecidas estão os álcoois, fenóis, aldeídos, cetonas e ácidos carboxílicos. Duas moléculas podem conter o mesmo elemento e ainda assim pertencer a funções diferentes. Por isso, precisamos analisar exatamente onde cada grupo está localizado na estrutura. Esse detalhe será fundamental para distinguir fenol de enol.\n\nEP. 04 — COMO RECONHECER UMA FUNÇÃO\n\nUma forma prática de identificar uma função é observar primeiro a estrutura. Procuramos átomos como oxigênio e nitrogênio e também ligações duplas ou triplas. Depois analisamos a que tipo de carbono o grupo está ligado. No álcool, o OH está ligado a carbono saturado. No fenol, o OH está ligado diretamente a um carbono aromático. No enol, o OH está ligado a um carbono de uma ligação dupla. Então não basta encontrar um OH: precisamos olhar o contexto da molécula.\n\nEP. 05 — FENOL E ENOL NO MAPA DA QUÍMICA\n\nFenol e enol possuem o grupo OH, mas estão em contextos estruturais diferentes. No fenol, a hidroxila está ligada diretamente ao sistema aromático. No enol, ela está ligada a um carbono de uma dupla ligação carbono-carbono. A partir daqui vamos aprofundar cada uma dessas funções.`,
  },
  {
    id: 2,
    presenter: "Integrante 2",
    chapters: "06–10",
    duration: "aprox. 5 minutos",
    script: `EP. 06 — O QUE É UM FENOL?\n\nFenol é uma função orgânica caracterizada pela presença de uma hidroxila, o OH, ligada diretamente a um carbono de um sistema aromático. O exemplo mais simples é o próprio fenol, cuja fórmula molecular é C6H6O e que também pode ser representado como C6H5OH. É importante não confundir fenol com álcool. Quando a hidroxila está ligada a um carbono saturado, temos um álcool; quando está diretamente ligada ao anel aromático, temos um fenol.\n\nEP. 07 — ESTRUTURA E PROPRIEDADES\n\nOs fenóis são mais ácidos que os álcoois comuns. Isso acontece porque, quando o fenol perde o hidrogênio da hidroxila, forma-se o íon fenóxido, cuja carga negativa pode ser estabilizada por ressonância com o sistema aromático. Essa estabilização ajuda a explicar sua maior acidez em comparação com álcoois. Além disso, o grupo OH confere polaridade e permite ligações de hidrogênio.\n\nEP. 08 — NOMENCLATURA\n\nNa nomenclatura, o composto mais simples é chamado de fenol. Quando existem outros grupos ligados ao anel, começamos a numeração pelo carbono que possui a hidroxila e escolhemos a direção que produz os menores números para os substituintes. Em alguns casos aparecem os termos orto, meta e para. Exemplos simples incluem 2-metilfenol e 4-clorofenol.\n\nEP. 09 — EXEMPLOS DE FENÓIS\n\nAlém do fenol, temos vários derivados. Os cresóis são metilfenóis. O catecol e a hidroquinona possuem duas hidroxilas ligadas ao anel aromático. O timol é outro exemplo de composto fenólico encontrado em plantas como o tomilho. Esses exemplos mostram que pequenas mudanças na estrutura geram compostos com propriedades e aplicações diferentes.\n\nEP. 10 — APLICAÇÕES DOS FENÓIS\n\nOs fenóis e seus derivados possuem aplicações em resinas fenólicas, materiais poliméricos, alguns produtos desinfetantes e como intermediários na fabricação de outras substâncias. Alguns derivados também aparecem em contextos farmacêuticos. Ao mesmo tempo, muitos fenóis exigem cuidado porque podem ser irritantes ou tóxicos dependendo da substância e da concentração. Por isso, seu uso exige controle adequado.`,
  },
  {
    id: 3,
    presenter: "Integrante 3",
    chapters: "11–15",
    duration: "aprox. 5 minutos",
    script: `EP. 11 — O QUE É UM ENOL?\n\nEnol é uma função orgânica em que a hidroxila está ligada a um carbono que participa de uma dupla ligação carbono-carbono. O nome vem da combinação de características de alceno e álcool. Podemos reconhecer um enol procurando duas coisas ao mesmo tempo: uma ligação C=C e uma hidroxila ligada a um dos carbonos dessa ligação.\n\nEP. 12 — ESTRUTURA E NOMENCLATURA\n\nPara identificar um enol, localizamos a cadeia principal, a dupla ligação e o grupo OH. A nomenclatura segue as regras da cadeia principal, indicando as posições relevantes. O ponto mais importante para esta apresentação é reconhecer a estrutura: se o OH estiver ligado a um carbono da dupla C=C, estamos diante de um enol.\n\nEP. 13 — TAUTOMERIA CETO-ENÓLICA\n\nA tautomeria ceto-enólica é um equilíbrio entre uma forma enol e uma forma carbonílica, normalmente uma cetona ou um aldeído. Durante a transformação, um hidrogênio muda de posição e a ligação dupla também muda de posição. Em muitos casos simples, a forma carbonílica é mais estável e predomina. Mesmo assim, a forma enol é importante porque participa do equilíbrio e ajuda a explicar várias reações.\n\nEP. 14 — EXEMPLOS DE ENÓIS\n\nUm exemplo clássico é a relação entre etenol e etanal. Outro exemplo é o prop-1-en-2-ol, relacionado à propanona. Em compostos como a pentano-2,4-diona, uma forma enol pode ser especialmente estabilizada. Esses exemplos ajudam a visualizar a diferença entre a estrutura enol e a estrutura carbonílica correspondente.\n\nEP. 15 — ONDE OS ENÓIS APARECEM?\n\nMesmo quando aparecem em menor quantidade, os enóis podem atuar como intermediários em transformações envolvendo compostos carbonílicos. Também aparecem em processos bioquímicos e em mecanismos de reações orgânicas. Para o ensino médio, o essencial é reconhecer a estrutura, compreender a ideia de tautomeria e saber que o enol pode participar do processo mesmo quando não é a forma predominante.`,
  },
  {
    id: 4,
    presenter: "Integrante 4",
    chapters: "16–20",
    duration: "aprox. 5 minutos",
    script: `EP. 16 — APLICAÇÕES E IMPORTÂNCIA\n\nFenóis possuem aplicações diretamente relacionadas a materiais e produtos, como resinas, polímeros e determinados agentes químicos. Já o enol é especialmente importante como conceito e como espécie que participa de equilíbrios e transformações. Podemos dizer que o fenol está muito ligado às propriedades e aplicações de certos compostos, enquanto o enol ajuda a explicar o comportamento químico de compostos carbonílicos.\n\nEP. 17 — FENOL × ENOL\n\nNo fenol, o OH está ligado diretamente ao sistema aromático. No enol, o OH está ligado a um carbono que participa de uma ligação dupla carbono-carbono. O fenol é uma classe de compostos aromáticos relativamente estáveis. O enol, em muitos casos, é uma forma menos estável e participa de um equilíbrio com uma estrutura carbonílica. Portanto, embora ambos tenham OH, são funções diferentes. A posição do grupo funcional é a chave para diferenciá-los.\n\nEP. 18 — ERROS COMUNS\n\nUm erro comum é chamar qualquer molécula com OH de álcool. Precisamos observar a qual carbono esse OH está ligado. Outro erro é confundir fenol com enol: no fenol temos o contexto aromático; no enol temos uma dupla ligação carbono-carbono não aromática envolvendo o carbono da hidroxila. Também é importante não imaginar que a forma enol é sempre a predominante.\n\nEP. 19 — RESUMO FINAL\n\nAs funções orgânicas organizam os compostos de acordo com suas características. Os grupos funcionais ajudam a identificar essas funções e a prever propriedades. No fenol, o OH está ligado diretamente ao sistema aromático. No enol, o OH está ligado a um carbono de uma dupla ligação. A tautomeria ceto-enólica explica o equilíbrio entre a forma enol e uma forma carbonílica.\n\nEP. 20 — CONCLUSÃO + FONTES\n\nPara concluir, pequenas diferenças na estrutura de uma molécula podem provocar diferenças importantes em suas propriedades. Fenol e enol possuem o grupo OH, mas pertencem a contextos estruturais diferentes e apresentam comportamentos diferentes. O estudo dessas funções relaciona estrutura, propriedades, nomenclatura e aplicações. Para a pesquisa, utilizamos materiais didáticos de química orgânica e referências de nomenclatura química, incluindo materiais baseados nas recomendações da IUPAC. Obrigado pela atenção.`,
  },
];

export const moleculeExtra: MoleculeExtra = {
  title: "LABORATÓRIO INTERATIVO — A MOLÉCULA POR DENTRO",
  purpose: "Experiência bônus, fora dos 20 minutos obrigatórios, para demonstrar visualmente como identificar fenol e enol.",
  fenolSequence: [
    "Mostrar a molécula inteira.",
    "Aproximar lentamente do anel aromático.",
    "Destacar o carbono que recebe a hidroxila.",
    "Aproximar até o grupo OH.",
    "Exibir: OH ligado diretamente ao anel aromático → FENOL.",
    "Afastar e mostrar novamente a estrutura completa.",
  ],
  enolSequence: [
    "Mostrar a molécula inteira.",
    "Aproximar da ligação C=C.",
    "Destacar o carbono da dupla que recebe o OH.",
    "Exibir: C=C + OH no carbono da dupla → ENOL.",
    "Mostrar uma transição visual ENOL ⇄ CETONA.",
    "Exibir: TAUTOMERIA CETO-ENÓLICA.",
  ],
  challenge: "Mostrar uma estrutura e perguntar: É FENOL ou ENOL? Após a resposta, revelar o grupo estrutural que determina a classificação.",
};

export const presentationSources = [
  "IUPAC — princípios e recomendações de nomenclatura química.",
  "Livros didáticos de Química Orgânica utilizados no Ensino Médio.",
  "Materiais universitários sobre funções orgânicas oxigenadas, fenóis e tautomeria ceto-enólica.",
];
