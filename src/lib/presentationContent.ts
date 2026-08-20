// Fonte única de conteúdo da apresentação interativa de Química Orgânica.
// 4 integrantes · 20 capítulos · ~1 min por capítulo (~5 min por integrante).

export type PresentationPart = {
  number: 1 | 2 | 3 | 4;
  presenter: string;
  title: string;
  focus: string;
  chapterRange: [number, number];
  duration: string;
};

export type PresentationChapter = {
  number: number;
  part: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  summary: string;
  script: string;
  duration: string;
  bullets?: string[];
};

export type PresentationSource = {
  org: string;
  note: string;
};

export const parts: PresentationPart[] = [
  {
    number: 1,
    presenter: "Henrique",
    title: "FUNDAMENTOS",
    focus: "Funções orgânicas, grupos funcionais e como reconhecê-los.",
    chapterRange: [1, 5],
    duration: "~5 min",
  },
  {
    number: 2,
    presenter: "Integrante 2",
    title: "FENOL",
    focus: "Estrutura, propriedades, nomenclatura, exemplos e aplicações dos fenóis.",
    chapterRange: [6, 10],
    duration: "~5 min",
  },
  {
    number: 3,
    presenter: "Integrante 3",
    title: "ENOL",
    focus: "Definição, nomenclatura, tautomeria ceto-enólica e exemplos.",
    chapterRange: [11, 15],
    duration: "~5 min",
  },
  {
    number: 4,
    presenter: "Integrante 4",
    title: "APLICAÇÕES & COMPARAÇÃO",
    focus: "Importância prática, comparação fenol × enol, erros comuns e fechamento.",
    chapterRange: [16, 20],
    duration: "~5 min",
  },
];

export const chapters: PresentationChapter[] = [
  {
    number: 1,
    part: 1,
    title: "O QUE SÃO FUNÇÕES ORGÂNICAS?",
    subtitle: "Conceito e classificação",
    summary:
      "Função orgânica é um conjunto de compostos que compartilham a mesma parte reativa e, por isso, se comportam de forma parecida.",
    script:
      "Quando a gente estuda química orgânica, percebe que existem milhões de compostos diferentes — e seria impossível decorar um por um. Por isso os químicos organizaram tudo em funções orgânicas. Função orgânica é simplesmente um grupo de compostos que têm a mesma parte reativa na molécula e, por causa disso, apresentam propriedades e comportamentos parecidos. É como separar as pessoas por profissão: o detalhe pessoal muda, mas o papel é o mesmo. Assim conseguimos prever, por exemplo, que todos os álcoois vão reagir de um jeito semelhante, mesmo que a cadeia de carbono seja maior ou menor. Hoje vamos usar essa lógica de classificação para chegar em dois casos que costumam confundir bastante: o fenol e o enol.",
    duration: "~1 min",
    bullets: ["Milhões de compostos, poucas categorias", "Mesma parte reativa = comportamento parecido", "Classificar para prever"],
  },
  {
    number: 2,
    part: 1,
    title: "GRUPOS FUNCIONAIS",
    subtitle: "A assinatura química da molécula",
    summary:
      "O grupo funcional é o átomo ou conjunto de átomos que define a função e concentra a reatividade da molécula.",
    script:
      "O grupo funcional é a assinatura da molécula. É aquele átomo ou conjunto de átomos que define a que função o composto pertence e onde a reatividade se concentra. O exemplo mais conhecido é a hidroxila, o grupo OH, que aparece nos álcoois, nos fenóis e nos enóis. Outro muito comum é a carbonila, a ligação C=O, presente em aldeídos e cetonas. Também temos o grupo carboxila, que junta carbonila e hidroxila, típico dos ácidos carboxílicos, além dos grupos com nitrogênio, como as aminas. A cadeia de carbono é o esqueleto; o grupo funcional é o que dá identidade. Se você aprende a enxergar o grupo funcional primeiro, o resto da molécula deixa de assustar.",
    duration: "~1 min",
    bullets: ["OH — hidroxila", "C=O — carbonila", "COOH — carboxila", "NH₂ — amina"],
  },
  {
    number: 3,
    part: 1,
    title: "PRINCIPAIS FUNÇÕES",
    subtitle: "Álcool, fenol e enol lado a lado",
    summary:
      "Três funções diferentes podem ter o mesmo grupo OH: o que muda é o carbono ao qual ele está ligado.",
    script:
      "Existem várias funções orgânicas: hidrocarbonetos, álcoois, fenóis, enóis, aldeídos, cetonas, ácidos carboxílicos, ésteres, éteres, aminas e amidas. Mas repare numa coisa curiosa: álcool, fenol e enol têm exatamente o mesmo grupo OH. Então por que são funções diferentes? Porque o que decide não é só o grupo funcional, é o carbono em que ele está ligado. No álcool, o OH está preso a um carbono saturado, ou seja, um carbono que só faz ligações simples. No fenol, o OH está ligado diretamente a um carbono de um anel aromático, como o benzeno. No enol, o OH está ligado a um carbono que participa de uma dupla ligação entre carbonos. Mesmo grupo, três contextos, três comportamentos.",
    duration: "~1 min",
    bullets: ["Álcool: OH em carbono saturado", "Fenol: OH em carbono aromático", "Enol: OH em carbono de C=C"],
  },
  {
    number: 4,
    part: 1,
    title: "COMO RECONHECER UMA FUNÇÃO",
    subtitle: "Um método simples de leitura da estrutura",
    summary:
      "Procure heteroátomos e insaturações e depois observe o carbono vizinho ao grupo funcional.",
    script:
      "Existe um caminho prático para identificar a função olhando a estrutura. Primeiro, procure heteroátomos, ou seja, átomos diferentes de carbono e hidrogênio: oxigênio, nitrogênio, halogênios. Eles quase sempre marcam onde está o grupo funcional. Segundo, procure insaturações: duplas e triplas ligações, e também anéis aromáticos. Terceiro — e essa é a parte que mais cai em prova — olhe o carbono ao qual o grupo está ligado. Se o OH está num carbono saturado, é álcool. Se está no anel aromático, é fenol. Se está no carbono da dupla, é enol. Sempre nessa ordem: acha o grupo, depois investiga a vizinhança. Esse método evita a maior parte dos erros de classificação.",
    duration: "~1 min",
    bullets: ["1. Achar heteroátomos", "2. Achar insaturações", "3. Analisar o carbono ligado ao grupo"],
  },
  {
    number: 5,
    part: 1,
    title: "FENOL E ENOL NO MAPA DA QUÍMICA",
    subtitle: "Introdução à diferença estrutural",
    summary:
      "Fenol e enol têm nomes parecidos e o mesmo OH, mas ocupam posições estruturais distintas.",
    script:
      "Para fechar a primeira parte, vamos posicionar nossos dois personagens principais no mapa. Fenol e enol têm nomes parecidos e o mesmo grupo OH, mas são coisas diferentes. No fenol, o OH está preso a um anel aromático, uma estrutura fechada e muito estável, e essa vizinhança muda bastante o comportamento da hidroxila. No enol, o OH está num carbono que faz parte de uma dupla ligação carbono-carbono, uma situação normalmente instável, que tende a se transformar em outra forma. Ou seja: um é estável e tem uso industrial direto; o outro é, na maioria dos casos, uma forma passageira, importante para explicar como as reações acontecem. Nas próximas partes, meus colegas vão detalhar cada um deles.",
    duration: "~1 min",
    bullets: ["Fenol: anel aromático, estável", "Enol: dupla C=C, geralmente passageiro"],
  },
  {
    number: 6,
    part: 2,
    title: "O QUE É UM FENOL?",
    subtitle: "OH ligado diretamente ao anel aromático",
    summary:
      "Fenol é a função em que a hidroxila está ligada diretamente a um carbono de anel aromático; o composto mais simples é o C₆H₅OH.",
    script:
      "Fenol é a função orgânica em que o grupo hidroxila está ligado diretamente a um carbono de um anel aromático. Esse detalhe do 'diretamente' é essencial: se houver um carbono no meio, entre o anel e o OH, o composto volta a ser um álcool, chamado álcool aromático. O representante mais simples da função dá nome a ela: o fenol, de fórmula C₆H₅OH, que é um anel de benzeno com uma hidroxila substituindo um hidrogênio. Ele é sólido em temperatura ambiente e tem cheiro característico. A partir dessa estrutura básica, a família cresce: basta trocar outros hidrogênios do anel por grupos diferentes para obter dezenas de fenóis usados na indústria e presentes na natureza.",
    duration: "~1 min",
    bullets: ["OH direto no carbono aromático", "Fenol simples: C₆H₅OH", "Com carbono intermediário = álcool aromático"],
  },
  {
    number: 7,
    part: 2,
    title: "ESTRUTURA E PROPRIEDADES",
    subtitle: "Polaridade, ligações de hidrogênio e acidez",
    summary:
      "A hidroxila torna o fenol polar e capaz de fazer ligações de hidrogênio; o anel aromático o deixa mais ácido que os álcoois.",
    script:
      "A presença da hidroxila deixa o fenol polar, o que permite fazer ligações de hidrogênio. Por isso os fenóis têm pontos de fusão e ebulição mais altos do que compostos parecidos sem OH, e apresentam alguma solubilidade em água. A propriedade mais marcante, porém, é a acidez: os fenóis são mais ácidos do que os álcoois comuns. A explicação conceitual é a ressonância. Quando o fenol perde o hidrogênio da hidroxila, a carga negativa que sobra no oxigênio não fica presa num lugar só: ela se distribui pelo anel aromático. Quanto mais espalhada a carga, mais estável fica a espécie formada — e quanto mais estável o produto, mais fácil é liberar o hidrogênio. Nos álcoois isso não acontece, porque não existe anel para dividir a carga.",
    duration: "~1 min",
    bullets: ["Polar, faz ligações de hidrogênio", "Mais ácido que álcoois", "Ressonância estabiliza a carga no anel"],
  },
  {
    number: 8,
    part: 2,
    title: "NOMENCLATURA DOS FENÓIS",
    subtitle: "Numerar a partir do carbono da hidroxila",
    summary:
      "O carbono ligado ao OH é sempre o número 1; os substituintes recebem os menores números possíveis.",
    script:
      "A nomenclatura dos fenóis é bem direta. O nome de base é 'fenol', e o carbono do anel que está ligado à hidroxila é sempre o carbono número um. A partir dele, numeramos o anel no sentido que dá os menores números possíveis para os substituintes. Se houver um grupo metil no carbono dois, o nome é 2-metilfenol. Se tiver um cloro no carbono quatro, é 4-clorofenol. Existe ainda a nomenclatura antiga, que ainda aparece bastante: quando o substituinte está no carbono dois, dizemos orto; no carbono três, meta; no carbono quatro, para. Então 2-metilfenol também pode ser chamado de orto-metilfenol, ou orto-cresol. Vale conhecer as duas formas, mas a recomendada pela IUPAC é a numerada.",
    duration: "~1 min",
    bullets: ["Carbono do OH = C1", "2-metilfenol · 4-clorofenol", "orto (2) · meta (3) · para (4)"],
  },
  {
    number: 9,
    part: 2,
    title: "EXEMPLOS DE FENÓIS",
    subtitle: "A família na prática",
    summary:
      "Fenol, cresóis, catecol, hidroquinona e timol mostram a variedade da função.",
    script:
      "Vamos ver alguns membros conhecidos da família. O fenol comum é o mais simples, com um único OH no anel. Os cresóis são os metilfenóis, ou seja, fenol com um grupo metil no anel, e existem nas versões orto, meta e para. O catecol é um benzeno com duas hidroxilas em carbonos vizinhos, e a hidroquinona também tem duas hidroxilas, mas em posições opostas do anel; ela aparece em formulações cosméticas e em processos fotográficos. Já o timol é um fenol de origem natural, encontrado no óleo essencial do tomilho, e é conhecido por seu uso em produtos de higiene bucal. Repare que todos seguem a mesma regra: pelo menos uma hidroxila ligada diretamente ao anel aromático.",
    duration: "~1 min",
    bullets: ["Fenol", "Cresóis (metilfenóis)", "Catecol e hidroquinona", "Timol (natural)"],
  },
  {
    number: 10,
    part: 2,
    title: "APLICAÇÕES DOS FENÓIS",
    subtitle: "Do laboratório à indústria",
    summary:
      "Os fenóis são matéria-prima de resinas e polímeros, além de intermediários químicos e componentes de desinfetantes.",
    script:
      "Os fenóis têm forte presença industrial. A aplicação mais clássica são as resinas fenólicas, formadas na reação do fenol com aldeídos, usadas em laminados, adesivos, revestimentos e peças moldadas. O fenol também é intermediário na produção de outros materiais, incluindo matérias-primas de polímeros e de medicamentos. Alguns compostos fenólicos aparecem em desinfetantes e antissépticos, por causa da ação sobre microrganismos. Além disso, muitos fenóis naturais estão nos alimentos e têm ação antioxidante. Um ponto importante de segurança: o fenol puro é corrosivo e tóxico, então seu manuseio é restrito a ambientes controlados, com equipamentos e procedimentos próprios. Aqui a gente estuda o conceito e as aplicações, sem qualquer procedimento prático.",
    duration: "~1 min",
    bullets: ["Resinas fenólicas e polímeros", "Intermediários químicos", "Desinfetantes e antissépticos", "Manuseio restrito e controlado"],
  },
  {
    number: 11,
    part: 3,
    title: "O QUE É UM ENOL?",
    subtitle: "OH em carbono de dupla ligação",
    summary:
      "Enol é a função em que a hidroxila está ligada a um carbono que participa de uma dupla ligação C=C.",
    script:
      "Enol é a função orgânica em que o grupo hidroxila está ligado a um carbono que faz parte de uma dupla ligação entre carbonos. O próprio nome explica a estrutura: 'en' vem de alceno, que indica a dupla ligação, e 'ol' vem de álcool, que indica a hidroxila. Junta os dois e temos en + ol, enol. Então, sempre que você vir um C=C com um OH preso a um dos carbonos dessa dupla, está diante de um enol. A diferença para o fenol é que, no fenol, a dupla faz parte de um anel aromático estável; no enol, é uma dupla comum, aberta. E é justamente por isso que os enóis costumam ser instáveis e tendem a se transformar em outra coisa, como veremos daqui a pouco.",
    duration: "~1 min",
    bullets: ["en (alceno) + ol (álcool)", "OH no carbono da dupla C=C", "Estrutura geralmente instável"],
  },
  {
    number: 12,
    part: 3,
    title: "ESTRUTURA E NOMENCLATURA",
    subtitle: "Identificar a dupla e a hidroxila",
    summary:
      "O nome indica a posição da dupla e a posição do OH na mesma cadeia, com o sufixo -enol.",
    script:
      "Para reconhecer um enol, procure dois sinais ao mesmo tempo: a dupla ligação entre carbonos e a hidroxila num dos carbonos dessa dupla. Se os dois estiverem presentes e conectados assim, é enol. Na nomenclatura, a lógica é a mesma dos outros compostos: escolhemos a cadeia principal, numeramos dando prioridade ao grupo OH, e o nome traz a posição da dupla e a posição da hidroxila, terminando em -enol. Por exemplo, prop-1-en-2-ol indica uma cadeia de três carbonos com dupla começando no carbono um e hidroxila no carbono dois. O caso mais simples de todos é o etenol, com dois carbonos, uma dupla e uma hidroxila. No ensino médio, o mais importante é reconhecer a estrutura; o nome vem em seguida.",
    duration: "~1 min",
    bullets: ["Dupla C=C + OH no mesmo carbono da dupla", "Sufixo -enol", "Etenol · prop-1-en-2-ol"],
  },
  {
    number: 13,
    part: 3,
    title: "TAUTOMERIA CETO-ENÓLICA",
    subtitle: "O equilíbrio entre duas formas",
    summary:
      "A forma enol e a forma carbonílica se interconvertem pela migração de um hidrogênio e mudança da posição da dupla.",
    script:
      "Aqui está o conceito central desta parte: a tautomeria ceto-enólica. Trata-se de um equilíbrio entre duas formas da mesma substância. Na forma enol, temos OH e dupla entre carbonos. Na forma ceto, ou carbonílica, temos uma dupla entre carbono e oxigênio, isto é, um aldeído ou uma cetona. A passagem de uma para a outra acontece por dois movimentos combinados: um hidrogênio migra de posição e a dupla ligação muda de lugar. Não são substâncias diferentes convivendo, são formas que se convertem uma na outra. Em compostos simples, o equilíbrio fica bem deslocado para a forma ceto, porque ela é mais estável. Por isso, na prática, quase sempre encontramos o composto na forma de aldeído ou cetona, e o enol aparece em quantidade muito pequena.",
    duration: "~1 min",
    bullets: ["Enol ⇌ forma ceto (carbonílica)", "Migração de H + deslocamento da dupla", "Forma ceto costuma predominar"],
  },
  {
    number: 14,
    part: 3,
    title: "EXEMPLOS DE ENÓIS",
    subtitle: "Pares clássicos do equilíbrio",
    summary:
      "Etenol/etanal e prop-1-en-2-ol/propanona são os exemplos didáticos; a pentano-2,4-diona tem forma enol mais estabilizada.",
    script:
      "Vamos aos exemplos clássicos. O primeiro é o etenol, o enol mais simples, com dois carbonos: ele se converte no etanal, que é um aldeído. É o par didático mais usado para mostrar a tautomeria. O segundo é o prop-1-en-2-ol, que corresponde à propanona, a acetona, uma cetona bastante conhecida. Nos dois casos, a forma carbonílica é a que predomina, e o enol aparece só em proporção muito pequena. Existe, porém, uma exceção interessante: a pentano-2,4-diona. Nela, a forma enol é bem mais estabilizada do que o normal, porque a estrutura permite uma interação interna que segura essa forma. Isso mostra que a regra 'a forma ceto predomina' vale para os casos simples, mas depende da estrutura da molécula.",
    duration: "~1 min",
    bullets: ["Etenol ⇌ etanal", "Prop-1-en-2-ol ⇌ propanona", "Pentano-2,4-diona: enol mais estabilizado"],
  },
  {
    number: 15,
    part: 3,
    title: "ONDE OS ENÓIS APARECEM?",
    subtitle: "Intermediários que explicam reações",
    summary:
      "Os enóis funcionam como etapas intermediárias em transformações de compostos carbonílicos e em processos bioquímicos.",
    script:
      "Se os enóis quase sempre se convertem em aldeídos e cetonas, para que estudá-los? Porque eles são intermediários. Em muitas transformações de compostos carbonílicos, a molécula passa pela forma enol antes de chegar ao produto final. Sem esse conceito, várias reações ficariam sem explicação: é o enol que mostra por onde a molécula passou e por que o produto tem aquela estrutura. Além disso, formas enólicas aparecem em processos bioquímicos, em etapas do metabolismo mediadas por enzimas. Então o enol não é um erro nem uma curiosidade: é uma peça conceitual que conecta estrutura e mecanismo. Enquanto o fenol tem valor prático e industrial, o enol tem valor explicativo — ele ajuda a entender como a química acontece.",
    duration: "~1 min",
    bullets: ["Intermediário em reações de carbonilados", "Presente em rotas bioquímicas", "Valor conceitual e mecanístico"],
  },
  {
    number: 16,
    part: 4,
    title: "APLICAÇÕES E IMPORTÂNCIA",
    subtitle: "Papel prático × papel conceitual",
    summary:
      "Os fenóis importam pelo uso material e industrial; os enóis importam por explicar mecanismos de reação.",
    script:
      "Chegando à última parte, vale comparar por que cada um desses compostos é importante. Os fenóis têm importância prática e material: aparecem em resinas, polímeros, adesivos, desinfetantes, cosméticos e como intermediários na produção de outros compostos. São substâncias que a gente isola, armazena e usa. Já os enóis têm importância conceitual: eles raramente são o produto que se guarda num frasco, mas são fundamentais para entender como as reações de aldeídos e cetonas acontecem, e aparecem em etapas de processos biológicos. Ou seja, um é protagonista na indústria, o outro é protagonista na explicação. As duas importâncias são reais, só que de naturezas diferentes — e reconhecer isso ajuda a não comparar as duas funções de forma errada.",
    duration: "~1 min",
    bullets: ["Fenol: aplicação industrial concreta", "Enol: chave para mecanismos", "Importâncias diferentes, ambas reais"],
  },
  {
    number: 17,
    part: 4,
    title: "FENOL × ENOL",
    subtitle: "Comparação direta",
    summary:
      "Mesmo grupo OH, contextos opostos: anel aromático estável contra dupla C=C reativa.",
    script:
      "Agora a comparação direta. Os dois têm hidroxila, mas o contexto muda tudo. No fenol, o OH está ligado a um carbono de anel aromático; no enol, a um carbono de dupla ligação comum. Quanto à estabilidade, o fenol é estável e pode ser isolado e armazenado; o enol, em geral, é instável e se converte na forma ceto. Quanto ao comportamento, o fenol se destaca pela acidez maior que a dos álcoois, resultado da ressonância no anel; o enol se destaca pela tendência à tautomeria. E quanto ao uso, o fenol tem aplicações industriais diretas, enquanto o enol aparece como intermediário. A frase que resume: no fenol o anel estabiliza o OH; no enol a dupla o torna passageiro.",
    duration: "~1 min",
    bullets: ["Fenol: OH aromático · estável · ácido", "Enol: OH em C=C · instável · tautomeriza"],
  },
  {
    number: 18,
    part: 4,
    title: "ERROS COMUNS",
    subtitle: "O que costuma derrubar em prova",
    summary:
      "Nem todo OH é álcool, fenol não é enol, e a forma enol nem sempre é minoritária.",
    script:
      "Três erros aparecem com frequência. O primeiro é chamar qualquer OH de álcool. Não dá: é preciso olhar o carbono ligado à hidroxila. Se for carbono aromático, é fenol; se for carbono de dupla, é enol; só se for carbono saturado é álcool. O segundo erro é confundir fenol com enol por causa do nome parecido. Eles são estruturalmente diferentes: um tem anel aromático, o outro tem dupla ligação simples entre carbonos. O terceiro é achar que a forma enol nunca importa, ou o contrário, que ela sempre predomina. Em casos simples a forma ceto predomina, mas há estruturas, como a pentano-2,4-diona, em que o enol é bem mais estabilizado. Regra final: sempre olhe a estrutura antes de responder.",
    duration: "~1 min",
    bullets: ["Nem todo OH é álcool", "Fenol ≠ enol", "Forma enol nem sempre é desprezível"],
  },
  {
    number: 19,
    part: 4,
    title: "RESUMO FINAL",
    subtitle: "Grupo funcional → função → propriedades → aplicações",
    summary:
      "Uma linha lógica conecta tudo o que foi apresentado nas quatro partes.",
    script:
      "Vamos amarrar tudo numa linha só: grupo funcional, função, propriedades, aplicações. Primeiro identificamos o grupo funcional, a assinatura da molécula. A partir dele e do carbono a que está ligado, definimos a função. Da função vêm as propriedades: polaridade, ligações de hidrogênio, acidez, estabilidade. E das propriedades vêm as aplicações ou a importância do composto. Aplicando isso aos nossos casos: hidroxila em carbono aromático dá fenol, que é estável e mais ácido, e por isso serve para resinas, polímeros e desinfetantes. Hidroxila em carbono de dupla dá enol, que é instável e tautomeriza, e por isso funciona como intermediário de reações. Mesma lógica, dois destinos diferentes.",
    duration: "~1 min",
    bullets: ["Grupo funcional define a função", "Função define as propriedades", "Propriedades definem o uso"],
  },
  {
    number: 20,
    part: 4,
    title: "CONCLUSÃO + FONTES",
    subtitle: "Fechamento e referências",
    summary:
      "A química orgânica se organiza por padrões; fenol e enol mostram como um detalhe estrutural muda tudo.",
    script:
      "Para concluir: a química orgânica não é uma lista infinita de nomes, é um sistema de padrões. Quando entendemos o grupo funcional e o ambiente em que ele está, conseguimos prever comportamento sem decorar. Fenol e enol são a melhor prova disso: mesmo grupo OH, resultados completamente diferentes só por causa do carbono vizinho. Um vira material de uso industrial, o outro vira peça-chave para explicar reações. Nossas referências foram a nomenclatura recomendada pela IUPAC e livros didáticos de química orgânica adotados no ensino médio e em cursos introdutórios de graduação, além de materiais de apoio escolares. Obrigado pela atenção — e ficamos abertos para perguntas.",
    duration: "~1 min",
    bullets: ["Padrões acima da memorização", "Um detalhe estrutural muda tudo"],
  },
];

export const sources: PresentationSource[] = [
  {
    org: "IUPAC",
    note: "Recomendações de nomenclatura de compostos orgânicos.",
  },
  {
    org: "Livros didáticos de Química Orgânica",
    note: "Obras introdutórias de graduação usadas como referência conceitual.",
  },
  {
    org: "Livros didáticos do Ensino Médio",
    note: "Volumes de química com capítulos de funções orgânicas e nomenclatura.",
  },
  {
    org: "Material de apoio escolar",
    note: "Apostilas e roteiros de aula sobre grupos funcionais, fenóis e enóis.",
  },
];

export const TOTAL_CHAPTERS = chapters.length;

export function chaptersOfPart(part: number): PresentationChapter[] {
  return chapters.filter((c) => c.part === part);
}

export function findPresentationChapter(n: number): PresentationChapter | undefined {
  return chapters.find((c) => c.number === n);
}

export function findPart(n: number): PresentationPart | undefined {
  return parts.find((p) => p.number === n);
}
