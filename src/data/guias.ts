export type BlocoGuia =
  | { tipo: "h2"; texto: string }
  | { tipo: "p"; texto: string }
  | { tipo: "lista"; itens: string[] };

export type Guia = {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  tempoLeitura: string;
  /** URL da imagem de capa. Vazio = placeholder até a foto real ser anexada. */
  imagem?: string;
  /** Texto do botão de calculadora no bloco de destaque final. */
  ctaCalculadora?: string;
  /** Texto do botão de WhatsApp no bloco de destaque final. */
  ctaWhatsApp?: string;
  corpo: BlocoGuia[];
};

export const GUIAS: Guia[] = [
  {
    slug: "fibrocimento-ceramica-ou-pvc",
    titulo: "Fibrocimento, cerâmica ou PVC: qual telha escolher para a sua obra?",
    resumo:
      "Fibrocimento, telha cerâmica ou PVC: entenda o peso, a inclinação mínima e o custo real de cada opção antes de fechar o orçamento do seu telhado.",
    categoria: "Telhas",
    tempoLeitura: "6 min de leitura",
    ctaCalculadora: "Calcular meu telhado agora",
    ctaWhatsApp: "Falar no WhatsApp",
    corpo: [
      {
        tipo: "p",
        texto:
          "Toda reforma ou obra nova passa pela mesma dúvida: qual telha escolher? A resposta quase nunca é \"a mais barata\" — porque o preço da telha sozinho não conta a história toda. Peso, inclinação mínima do telhado e estrutura de madeira necessária mudam junto, e isso pode custar mais na estrutura do que você economizou na telha. Neste guia comparamos as três opções mais vendidas na loja: Fibrocimento, Cerâmica (barro) e PVC.",
      },
      { tipo: "h2", texto: "Telha Cerâmica (barro)" },
      {
        tipo: "p",
        texto:
          "É a opção mais tradicional e, apesar do preço unitário mais alto, costuma ser a mais econômica no orçamento fechado. Um exemplo real: em um telhado de 50 m² de área de base (70,17 m² de área inclinada, 2 águas, inclinação de 35%), a Romana R17 usa 1.217 peças e pesa cerca de 2.744 kg.",
      },
      {
        tipo: "lista",
        itens: [
          "Inclinação mínima: normalmente 35%, o que já é o padrão da maioria dos telhados residenciais na região.",
          "Peso: é a mais pesada das três — exige estrutura de madeira dimensionada corretamente (ripas, caibros e vigas na medida certa, não menor).",
          "Durabilidade: décadas de vida útil, praticamente sem manutenção além da limpeza de calhas.",
          "Isolamento térmico: bom custo-benefício térmico mesmo sem reforço — dá pra melhorar ainda mais com manta térmica sob a telha, se o telhado tiver forro.",
          "Estética: o acabamento mais valorizado em construções residenciais, com opções de cor, textura e resinado.",
        ],
      },
      { tipo: "h2", texto: "Telha de Fibrocimento" },
      {
        tipo: "p",
        texto:
          "No mesmo telhado de 50 m², a telha Fibrocimento 1,22 m usa só 64 peças e pesa cerca de 885 kg — bem mais leve. Só que o preço final costuma ficar cerca de 13% mais caro que a cerâmica nesse comparativo, porque cada peça custa mais e o rendimento por m² é diferente. O material é leve o suficiente pra permitir maiores vãos entre apoios e reduzir o reforço estrutural necessário, e a instalação é conhecida por ser rápida e de manuseio simples — o que gera economia de mão de obra. O ponto de atenção fica no conforto: o desempenho térmico é mais limitado em regiões quentes ou com bastante sol direto (normalmente pede isolamento complementar), e o isolamento acústico também é baixo, por ser um material mais leve.",
      },
      {
        tipo: "lista",
        itens: [
          "Inclinação mínima: a partir de 9% — permite telhados bem mais baixos, útil em galpões, garagens e coberturas de fundo de quintal.",
          "Peso: muito mais leve, o que reduz a exigência sobre a estrutura de madeira (menos madeira, peças mais finas, vãos maiores entre apoios).",
          "Uso mais comum: área de serviço, garagem, galpão, cobertura industrial — onde a estética pesa menos que custo e agilidade de instalação.",
        ],
      },
      { tipo: "h2", texto: "Telha Colonial PVC" },
      {
        tipo: "p",
        texto:
          "Ainda no mesmo exemplo de 50 m², a Colonial PVC 2,30 m usa 47 peças e pesa apenas 309 kg — a mais leve das três, de longe. Só que no comparativo ela aparece como a opção mais cara: cerca de 67% acima da cerâmica de referência. Em compensação, é a que menos exige da estrutura: por ser até 85% mais leve que uma telha cerâmica tradicional, permite economizar até 30% no custo da estrutura de suporte — o que ajuda a equilibrar o preço mais alto da peça em obras onde a madeira também pesa no orçamento. É resistente a impacto (inclusive granizo), não racha no transporte e não absorve água, mas dilata e contrai com a temperatura — por isso a instalação exige folga de dilatação e fixação reforçada em regiões de vento forte.",
      },
      {
        tipo: "lista",
        itens: [
          "Inclinação mínima: a partir de 15%.",
          "Peso: extremamente leve, ideal para reformas onde a estrutura existente não suporta carga extra, ou pra quem quer evitar reforço de madeiramento.",
          "Vantagem prática: instalação rápida, boa opção pra quem está ampliando um telhado já existente e não quer mexer na estrutura.",
        ],
      },
      { tipo: "h2", texto: "Então, qual vale mais a pena?" },
      {
        tipo: "p",
        texto:
          "Depende do que pesa mais no seu caso: se o orçamento total é o fator decisivo e a estrutura já está prevista pra suportar peso, a cerâmica costuma vencer no fechamento de conta. Se o telhado precisa de uma inclinação bem baixa, ou a estrutura existente não aguenta peso extra, Fibrocimento ou PVC resolvem — e o próprio peso mais leve dessas duas opções pode compensar parte da diferença de preço, já que a estrutura de madeira sai mais barata.",
      },
      {
        tipo: "p",
        texto:
          "A forma mais segura de decidir não é comparar preço da telha isolado, e sim simular o orçamento completo (telha + estrutura + acabamento) para o tamanho exato do seu telhado.",
      },
    ],
  },
  {
    slug: "erros-comuns-reforma-telhado",
    titulo: "Erros comuns na hora de comprar material pra reforma de telhado",
    resumo:
      "Os erros mais comuns na hora de comprar material para reformar o telhado — e como evitar retrabalho, sobra de material e obra parada esperando reposição.",
    categoria: "Reforma",
    tempoLeitura: "6 min de leitura",
    ctaCalculadora: "Calcular meu telhado completo agora",
    ctaWhatsApp: "Tire suas dúvidas no WhatsApp",
    corpo: [
      {
        tipo: "p",
        texto:
          "É sexta-feira, a obra está no meio do telhado, e falta material. Essa cena se repete o tempo todo — e quase sempre por um erro que dava pra evitar antes de fechar a compra. Reunimos os erros mais comuns que vemos no dia a dia da loja, pra você não passar por eles.",
      },
      { tipo: "h2", texto: "1. Calcular a área da construção, não a área real do telhado" },
      {
        tipo: "p",
        texto:
          "Esse é o erro número um. A área do telhado não é igual à área da casa — ela precisa somar o beiral (a parte que passa da parede pra fora, protegendo contra chuva) e, em telhados inclinados, considerar a área inclinada, que é maior que a área \"vista de cima\". Ignorar isso costuma gerar falta de telha bem no fim da obra.",
      },
      { tipo: "h2", texto: "2. Não separar cumeeira e espigão do cálculo da telha" },
      {
        tipo: "p",
        texto:
          "Cumeeira (a peça que fecha o encontro das duas águas do telhado) e espigão (o encontro de águas em telhados com quatro ou mais águas) são itens à parte — vendidos e calculados pelo metro linear, não por metro quadrado como a telha comum. Quem esquece esse item chega no fim da obra sem a peça de acabamento certa.",
      },
      { tipo: "h2", texto: "3. Comprar madeira sem considerar a bitola certa pra cada peça" },
      {
        tipo: "p",
        texto:
          "Ripa, ripão, caibro, caibrão e viga não são a mesma coisa, e cada um tem uma função e um espaçamento correto — que muda conforme a galga (distância entre encaixes) da telha escolhida. Comprar a bitola errada, ou menor pra \"economizar\", compromete a resistência da estrutura e pode empenar com o tempo.",
      },
      { tipo: "h2", texto: "4. Não considerar a margem de reposição" },
      {
        tipo: "p",
        texto:
          "Corte, quebra no transporte, ajuste na obra — sempre existe uma perda natural de material. O ideal é considerar uma margem de 1,5% a 2% para telhas e cerca de 5% para madeira. Comprar exatamente a quantidade \"cravada\" do cálculo é reduzir a margem de manobra a zero. É comum o mercado recomendar uma margem ampla, de até 10%, como regra geral \"de olho\" — a Rocha usa uma margem mais precisa porque a calculadora do site já calcula a área real do telhado com beiral e inclinação, então sobra menos incerteza pra cobrir.",
      },
      { tipo: "h2", texto: "5. Ignorar a inclinação mínima da telha escolhida" },
      {
        tipo: "p",
        texto:
          "Cada tipo de telha tem uma inclinação mínima recomendada pelo fabricante (a cerâmica geralmente pede pelo menos 35%; fibrocimento pode ir a partir de 9%; PVC Colonial a partir de 15%). Escolher uma telha incompatível com a inclinação do projeto é o tipo de erro que só aparece — e é caro de corrigir — depois que a chuva encontra o telhado pronto.",
      },
      { tipo: "h2", texto: "6. Deixar pra comprar prego, arame e acessórios \"depois\"" },
      {
        tipo: "p",
        texto:
          "Prego telheiro, arame de amarração, calha, suporte de calha, veda calha — são itens pequenos que custam pouco individualmente, mas que sem eles a obra simplesmente não anda. É comum a compra principal (telha e madeira) ser bem planejada, e esses itens ficarem de última hora, gerando idas extras à loja no meio da obra.",
      },
      { tipo: "h2", texto: "7. Não considerar o peso da telha na estrutura já existente" },
      {
        tipo: "p",
        texto:
          "Em reformas, é comum reaproveitar a estrutura de madeira que já está lá — e nesse caso o peso da telha nova importa tanto quanto a estética. Trocar uma telha leve por uma cerâmica bem mais pesada, sem checar se a estrutura aguenta, é receita pra empenar madeira ou até comprometer a segurança do telhado. Se a estrutura antiga é limitada, telhas mais leves como fibrocimento ou PVC (que podem pesar até 85% menos que a cerâmica equivalente) evitam a necessidade de reforçar tudo.",
      },
      { tipo: "h2", texto: "8. Misturar telhas de lotes diferentes" },
      {
        tipo: "p",
        texto:
          "Telha cerâmica é um produto natural — a cor pode variar levemente de um lote de queima pra outro. Comprar parte do material numa data e completar depois, com outro lote, é a receita mais comum pra acabar com um telhado com \"manchas\" de tonalidade visíveis à distância. O ideal é fechar a quantidade total (com a margem de reposição já incluída) numa única compra, do mesmo lote.",
      },
      { tipo: "h2", texto: "9. Ignorar a procedência e a certificação do material" },
      {
        tipo: "p",
        texto:
          "Telha sem procedência confiável ou sem selo de conformidade (como as certificações do Centro Cerâmico do Brasil, no caso de peças cerâmicas) tem mais risco de vir empenada, porosa ou fora da medida padrão — problemas que só aparecem na hora da instalação, quando já é tarde pra trocar sem atrasar a obra.",
      },
      { tipo: "h2", texto: "Como evitar todos esses erros de uma vez" },
      {
        tipo: "p",
        texto:
          "O jeito mais direto é simular o orçamento completo antes de comprar: telha, estrutura de madeira, cumeeira/espigão, pregos e acessórios — tudo calculado junto, na medida certa do seu telhado, sem depender de estimativa \"de olho\".",
      },
    ],
  },
  {
    slug: "telhado-2-aguas-x-4-aguas",
    titulo: "Telhado de 2 águas x 4 águas: o que muda no orçamento",
    resumo:
      "Telhado de 2 águas ou 4 águas: entenda a diferença de estrutura, acabamento e custo entre os dois formatos antes de decidir o projeto da sua obra.",
    categoria: "Telhas",
    tempoLeitura: "5 min de leitura",
    ctaCalculadora: "Simule seu telhado de 2 ou 4 águas na calculadora",
    ctaWhatsApp: "Falar com a gente no WhatsApp",
    corpo: [
      {
        tipo: "p",
        texto:
          "Na hora de fechar o projeto do telhado, uma decisão que parece só estética — 2 águas ou 4 águas — na verdade muda o orçamento inteiro: mais peças de acabamento, mais complexidade de estrutura, e um cálculo de área diferente. Veja o que muda de verdade entre os dois formatos.",
      },
      { tipo: "h2", texto: "O que é cada um" },
      {
        tipo: "lista",
        itens: [
          "Telhado de 2 águas: o formato mais simples e mais comum — duas superfícies inclinadas que se encontram numa linha reta no topo (a cumeeira). É o modelo clássico de \"casinha\", com as duas pontas fechadas em formato de triângulo (os oitões). É o formato com melhor custo-benefício entre os dois, com escoamento eficiente em duas direções e espaço extra pra sótão sob o telhado.",
          "Telhado de 4 águas: quatro superfícies inclinadas (duas trapezoidais e duas triangulares), que se encontram em linhas diagonais (os espigões) além da cumeeira central. Não tem oitão triangular — todas as bordas superiores são inclinadas, o que dá a ele uma distribuição aerodinâmica de pressão e resistência a ventos fortes bem superior à do 2 águas.",
        ],
      },
      {
        tipo: "p",
        texto:
          "Existem outros dois formatos comuns fora do escopo deste post: telhado de uma água, mais simples e econômico, comum em edículas e garagens; e telhado embutido/platibanda, de baixa inclinação e visual \"clean\", que exige impermeabilização impecável.",
      },
      { tipo: "h2", texto: "1. Acabamento: cumeeira sozinha x cumeeira + espigão" },
      {
        tipo: "p",
        texto:
          "No 2 águas, o único acabamento de encontro é a cumeeira, no topo. No 4 águas, além da cumeeira, entram os espigões — um item a mais de metro linear, com sua própria peça e seu próprio consumo por metro. Isso significa mais um grupo de peças no orçamento que o 2 águas simplesmente não tem.",
      },
      { tipo: "h2", texto: "2. Estrutura de madeira: mais complexa no 4 águas" },
      {
        tipo: "p",
        texto:
          "A estrutura do 4 águas exige mais pontos de apoio e um travamento mais elaborado nos encontros diagonais (onde ficam os espigões), porque a carga do telhado se distribui de um jeito diferente — não é só apoiar nas duas paredes laterais como no 2 águas. Isso normalmente significa mais peças de madeira e mais mão de obra na montagem da tesoura.",
      },
      { tipo: "h2", texto: "3. Área de telha: nem sempre é maior, mas é mais fracionada" },
      {
        tipo: "p",
        texto:
          "A área total de telha entre os dois formatos pode ficar parecida pra uma mesma área de construção — a diferença real está em como essa área se divide. No 4 águas, você tem quatro planos menores em vez de dois planos maiores, o que gera mais recortes e emendas nas bordas (mais desperdício proporcional de telha nos cortes das quinas).",
      },
      { tipo: "h2", texto: "4. Resistência ao vento e à chuva forte" },
      {
        tipo: "p",
        texto:
          "Essa é uma diferença técnica que pouca gente considera na hora de decidir: o formato de 4 águas tem inclinação pra dentro nos quatro lados, o que cria um desenho autotravado — mais estável em situações de vento forte e acúmulo de chuva intensa. Já o 2 águas tem duas paredes verticais nas pontas (os oitões) que ficam mais expostas: em regiões com ventos fortes, um oitão mal estruturado pode ser o ponto fraco do telhado. Em compensação, o 2 águas escoa água e detritos com bastante eficiência por causa da simplicidade do desenho.",
      },
      { tipo: "h2", texto: "5. Espaço de forro/sótão e ventilação" },
      {
        tipo: "p",
        texto:
          "O 2 águas, por ter duas superfícies mais altas e os oitões triangulares, costuma sobrar mais espaço de forro/sótão e permite mais ventilação natural nesse vão. O 4 águas, por inclinar em todos os lados, reduz esse espaço livre — é um detalhe que pesa se você planeja usar o forro como área técnica ou depósito.",
      },
      { tipo: "h2", texto: "6. Manutenção a longo prazo" },
      {
        tipo: "p",
        texto:
          "O 2 águas tende a exigir menos manutenção ao longo dos anos, justamente por ter menos encontros de água (só a cumeeira). O 4 águas, com mais encontros de água em espigões, tem mais pontos onde infiltração pode aparecer se a execução não for cuidadosa — o que reforça a importância de um bom projeto e mão de obra qualificada nesse formato.",
      },
      { tipo: "h2", texto: "7. Estética" },
      {
        tipo: "p",
        texto:
          "O 4 águas costuma ser escolhido por estética (é o formato mais usado em casas de padrão mais alto). O 2 águas, por sua vez, é a opção mais econômica e mais rápida de executar — e segue sendo maioria absoluta em obras residenciais e comerciais mais simples.",
      },
      { tipo: "h2", texto: "Qual formato compensa mais no seu caso?" },
      {
        tipo: "p",
        texto:
          "Se o orçamento é a prioridade e a estética não exige quatro águas, o 2 águas segue sendo a opção mais simples de calcular, comprar e executar, além de pedir menos manutenção com o tempo. Se o projeto já prevê 4 águas por design — ou a região tem ventos fortes e você quer o formato mais estável nesse quesito — vale simular o orçamento completo antes, porque a diferença de custo não está só na telha, está na soma de espigão + estrutura mais elaborada + mão de obra mais especializada.",
      },
    ],
  },
  {
    slug: "quantas-telhas-voce-precisa",
    titulo: "Quantas telhas você precisa para o seu telhado?",
    resumo:
      "Aprenda a calcular a quantidade certa de telhas por m², entender a inclinação e evitar sobra ou falta de material na obra.",
    categoria: "Cálculo de obra",
    tempoLeitura: "6 min de leitura",
    corpo: [
      {
        tipo: "p",
        texto:
          "Comprar telha a mais custa dinheiro parado; comprar a menos para a obra e ainda arrisca diferença de lote e tonalidade. A boa notícia é que o cálculo é simples quando você separa duas coisas: a área real do telhado (que não é a área da casa) e o consumo por metro quadrado de cada modelo de telha.",
      },
      { tipo: "h2", texto: "1. A área do telhado não é a área da planta" },
      {
        tipo: "p",
        texto:
          "A planta baixa mostra a projeção horizontal. O telhado é inclinado, então ele sempre tem mais área do que a planta. Além disso, entra o beiral — aquele avanço da telha para fora da parede, normalmente entre 40 cm e 80 cm de cada lado. Some o beiral à projeção e depois aplique o fator de inclinação.",
      },
      {
        tipo: "lista",
        itens: [
          "Inclinação 30% (cerâmica): multiplique a área projetada por 1,05",
          "Inclinação 40%: multiplique por 1,08",
          "Fibrocimento com 10% a 15%: multiplique por 1,01 a 1,02",
        ],
      },
      { tipo: "h2", texto: "2. Consumo médio por metro quadrado" },
      {
        tipo: "p",
        texto:
          "Cada modelo tem um rendimento diferente. Use estes números como referência e confirme sempre com a ficha do fabricante do lote que você vai comprar:",
      },
      {
        tipo: "lista",
        itens: [
          "Cerâmica portuguesa / romana: 16 a 17 peças por m²",
          "Cerâmica colonial (capa e canal): 24 a 26 peças por m²",
          "Concreto: 10 a 11 peças por m²",
          "PVC colonial: vendida por peça de comprimento fixo — calcule por metro linear",
          "Fibrocimento: vendida por chapa, calcule pelo comprimento útil com sobreposição",
        ],
      },
      { tipo: "h2", texto: "3. Sobreposição e perdas" },
      {
        tipo: "p",
        texto:
          "Telhas se encaixam umas sobre as outras, e essa sobreposição já está embutida no consumo por m² das cerâmicas. No fibrocimento e no PVC ela precisa ser descontada do comprimento da peça. Sobre o total, trabalhe com uma margem de segurança de 2% para quebras no transporte e no assentamento — em telhados com muitos recortes, água furtada ou rincão, suba para 5%.",
      },
      { tipo: "h2", texto: "4. Não esqueça a cumeeira e os acessórios" },
      {
        tipo: "p",
        texto:
          "A cumeeira é calculada em metros lineares da linha de topo do telhado, com cerca de 3 peças por metro no modelo cerâmico. Além dela, entram parafusos ou pregos de fixação, rufos, calhas e, no madeiramento, ripas, caibros e terças dimensionados conforme o peso da telha escolhida.",
      },
      { tipo: "h2", texto: "5. O jeito rápido: use a calculadora" },
      {
        tipo: "p",
        texto:
          "Nossa calculadora de telhado faz todas essas contas de uma vez: você informa as medidas de cada água, o beiral, o modelo da telha e a inclinação, e ela devolve a quantidade de telhas, cumeeiras, madeiramento e fixadores — com margem já aplicada e pronta para enviar como orçamento pelo WhatsApp.",
      },
    ],
  },
];

export function getGuia(slug: string) {
  return GUIAS.find((g) => g.slug === slug);
}

export function guiasRelacionados(slug: string, limite = 3) {
  return GUIAS.filter((g) => g.slug !== slug).slice(0, limite);
}
