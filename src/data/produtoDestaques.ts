export type DestaqueBadge = { icone: string; texto: string };
export type MotivoProduto = { titulo: string; descricao: string };

export type DestaquesProdutoInfo = {
  badges: DestaqueBadge[];
  motivos: MotivoProduto[];
  /** usado apenas quando a página ainda não possui tabela de especificações */
  especificacoes?: [string, string][];
};

export const DESTAQUES_PRODUTO: Record<string, DestaquesProdutoInfo> = {
  "colonial-pvc": {
    badges: [
      { icone: "🚫", texto: "Não enferruja" },
      { icone: "🎨", texto: "4 cores" },
      { icone: "📐", texto: "6 comprimentos" },
      { icone: "⚡", texto: "Fácil instalação" },
    ],
    motivos: [
      {
        titulo: "Leveza e resistência",
        descricao:
          "Muito mais leve que cerâmica, ideal para estruturas simples sem reforço.",
      },
      {
        titulo: "Sem manutenção",
        descricao: "Não enferruja, não precisa de pintura e mantém a cor por décadas.",
      },
      {
        titulo: "Conforto térmico",
        descricao: "Reduz até 30% do calor interno comparado ao fibrocimento sem manta.",
      },
      {
        titulo: "Compatível com manta",
        descricao: "Aceita manta térmica aluminizada para desempenho ainda melhor.",
      },
    ],
  },
  "plan-pvc": {
    badges: [
      { icone: "🚫", texto: "Não enferruja" },
      { icone: "🎨", texto: "4 cores" },
      { icone: "📐", texto: "3 comprimentos" },
      { icone: "⚡", texto: "Fácil instalação" },
    ],
    motivos: [
      {
        titulo: "Perfil plano e moderno",
        descricao: "Encaixe reto, ideal para projetos de linhas contemporâneas.",
      },
      {
        titulo: "Sem manutenção",
        descricao: "Não enferruja, não precisa de pintura e mantém a cor por décadas.",
      },
      {
        titulo: "Conforto térmico",
        descricao: "Reduz o calor interno comparado ao fibrocimento sem manta.",
      },
    ],
  },
  fibrocimento: {
    badges: [
      { icone: "⭐", texto: "Mais vendida" },
      { icone: "📏", texto: "6 tamanhos" },
      { icone: "💪", texto: "Alta resistência" },
      { icone: "✅", texto: "DOF/IBAMA" },
    ],
    motivos: [
      {
        titulo: "Resistência comprovada",
        descricao:
          "Suporta carga de vento e chuva pesada, durabilidade de mais de 20 anos.",
      },
      {
        titulo: "Maior variedade",
        descricao:
          "Disponível em 6 comprimentos de 153cm a 366cm e 3 espessuras (5, 6 e 8mm).",
      },
      {
        titulo: "Pronta entrega",
        descricao: "Estoque permanente em todos os tamanhos no pátio da Rocha Telhas.",
      },
      {
        titulo: "Custo-benefício",
        descricao:
          "A melhor relação custo/m² coberto entre todos os tipos de cobertura.",
      },
    ],
  },
  ceramica: {
    badges: [
      { icone: "🏛️", texto: "Tradicional" },
      { icone: "♾️", texto: "50+ anos" },
      { icone: "🌡️", texto: "Térmico" },
      { icone: "🔒", texto: "Encaixe preciso" },
    ],
    motivos: [
      {
        titulo: "Durabilidade máxima",
        descricao:
          "A telha cerâmica tem vida útil superior a 50 anos quando bem instalada.",
      },
      {
        titulo: "Isolamento térmico natural",
        descricao:
          "A argila é o melhor isolante natural, mantendo o ambiente fresco no verão.",
      },
      {
        titulo: "Valoriza o imóvel",
        descricao: "Acabamento nobre e atemporal que aumenta o valor do imóvel.",
      },
      {
        titulo: "Sem pintura necessária",
        descricao: "Mantém a cor natural da argila por toda a vida útil.",
      },
    ],
  },
  policarbonato: {
    badges: [
      { icone: "☀️", texto: "Translúcida" },
      { icone: "🪶", texto: "Muito leve" },
      { icone: "🛡️", texto: "Bloqueia UV" },
      { icone: "🔗", texto: "Compatível fibrocimento" },
    ],
    motivos: [
      {
        titulo: "Iluminação natural",
        descricao: "Translucidez de até 82%, traz luz natural sem calor excessivo.",
      },
      {
        titulo: "Proteção UV",
        descricao:
          "Filtro UV incorporado protege o interior e evita desbotamento dos materiais.",
      },
      {
        titulo: "Instalação simples",
        descricao:
          "Compatível com a mesma estrutura das telhas de fibrocimento INFIBRA.",
      },
      {
        titulo: "Ultraleve",
        descricao: "~5 kg/m², ideal para estruturas existentes sem necessidade de reforço.",
      },
    ],
  },
  concreto: {
    badges: [
      { icone: "🏗️", texto: "Extra resistente" },
      { icone: "🎨", texto: "3 cores" },
      { icone: "🔇", texto: "Isolamento acústico" },
      { icone: "⏳", texto: "Longa vida" },
    ],
    motivos: [
      {
        titulo: "Resistência superior",
        descricao: "Suporta alto volume de chuva e granizo sem trincas ou danos.",
      },
      {
        titulo: "Isolamento acústico",
        descricao:
          "Reduz significativamente o ruído de chuva forte comparado ao metal.",
      },
      {
        titulo: "Acabamento premium",
        descricao: "Cores Areia, Cinza e Grafite com pigmentação que não desbota.",
      },
      {
        titulo: "Baixa manutenção",
        descricao: "Não precisa de pintura ou tratamentos periódicos ao longo dos anos.",
      },
    ],
  },
  cambara: {
    badges: [
      { icone: "✅", texto: "DOF/IBAMA" },
      { icone: "⚙️", texto: "Aparelhado em plaina" },
      { icone: "🌳", texto: "Madeira nativa" },
      { icone: "🚚", texto: "Entrega SP" },
    ],
    motivos: [
      {
        titulo: "A madeira mais resistente do pátio",
        descricao:
          "Alta densidade e dureza natural, ideal para estruturas de telhado.",
      },
      {
        titulo: "Aparelhada em plaina industrial",
        descricao:
          "Superfície lisa e padronizada, pronta para envernizar na obra.",
      },
      {
        titulo: "Origem legal certificada",
        descricao: "DOF/IBAMA em todas as peças, com rastreabilidade de origem.",
      },
      {
        titulo: "Bitolas exatas",
        descricao: "Cortada na medida aqui no pátio, sem surpresas na hora do encaixe.",
      },
    ],
    especificacoes: [
      ["Espécie", "Cambará Rosa"],
      ["Uso", "Estrutural"],
      ["Acabamentos", "Bruto e Aparelhado"],
      ["Origem", "DOF/IBAMA"],
      ["NCM", "44079990"],
    ],
  },
  eucalipto: {
    badges: [
      { icone: "🌱", texto: "Reflorestamento" },
      { icone: "⚗️", texto: "Tratado autoclave" },
      { icone: "🔒", texto: "Alta resistência" },
      { icone: "✅", texto: "Certificado" },
    ],
    motivos: [
      {
        titulo: "Tratado em autoclave CCA",
        descricao:
          "Proteção profunda contra cupins, fungos e apodrecimento por décadas.",
      },
      {
        titulo: "Reflorestamento certificado",
        descricao: "Produto sustentável com rastreabilidade de origem.",
      },
      {
        titulo: "Alta resistência mecânica",
        descricao:
          "Ideal para pontaletes, escoramentos e estruturas provisórias.",
      },
      {
        titulo: "Melhor custo-benefício",
        descricao:
          "Durabilidade superior ao pinus não tratado com preço competitivo.",
      },
    ],
    especificacoes: [
      ["Espécie", "Eucalipto Citriodora/Grandis"],
      ["Tratamento", "Autoclave CCA Tipo C"],
      ["Uso", "Estrutural e rural"],
      ["NCM", "44039800"],
    ],
  },
  cedrinho: {
    badges: [
      { icone: "🪶", texto: "Muito leve" },
      { icone: "✂️", texto: "Fácil trabalhar" },
      { icone: "🎨", texto: "Aceita acabamento" },
      { icone: "📐", texto: "Bitolas variadas" },
    ],
    motivos: [
      {
        titulo: "Madeira mais fácil de trabalhar",
        descricao: "Leve, macia e fácil de cortar, pregar e lixar na obra.",
      },
      {
        titulo: "Ideal para forros",
        descricao:
          "A preferida de marceneiros para forros internos pelo acabamento natural nobre.",
      },
      {
        titulo: "Aceita qualquer acabamento",
        descricao:
          "Verniz, stain, esmalte e tinta aderem perfeitamente na superfície.",
      },
      {
        titulo: "Disponível bruta ou aparelhada",
        descricao: "Escolha o nível de beneficiamento conforme sua necessidade.",
      },
    ],
    especificacoes: [
      ["Espécie", "Cedrinho Mesclado"],
      ["Uso", "Forro e estrutura interna"],
      ["Acabamentos", "Bruto e Aparelhado"],
      ["NCM", "44072910"],
    ],
  },
  pinus: {
    badges: [
      { icone: "🌲", texto: "Reflorestamento" },
      { icone: "💰", texto: "Econômico" },
      { icone: "✂️", texto: "Fácil trabalhar" },
      { icone: "📦", texto: "Pronta entrega" },
    ],
    motivos: [
      {
        titulo: "Melhor custo-benefício da categoria",
        descricao:
          "Opção econômica para caixaria, escoramentos e estruturas secundárias.",
      },
      {
        titulo: "Reflorestamento",
        descricao:
          "Madeira sustentável com reposição garantida da floresta plantada.",
      },
      {
        titulo: "Versatilidade",
        descricao:
          "Usado em sarrafos, tábuas, pontaletes e peças de acabamento interno.",
      },
      {
        titulo: "Fácil de trabalhar",
        descricao: "Aceita cola, prego, parafuso e acabamentos com facilidade.",
      },
    ],
    especificacoes: [
      ["Espécie", "Pinus Elliottii/Taeda"],
      ["Reflorestamento", "Sim"],
      ["Uso", "Caixaria e estrutura secundária"],
      ["NCM", "44071100"],
    ],
  },
  esmaltada: {
    badges: [
      { icone: "✨", texto: "Esmalte vitrificado" },
      { icone: "🎨", texto: "6 cores" },
      { icone: "💧", texto: "Impermeável" },
      { icone: "🧹", texto: "Fácil de limpar" },
    ],
    motivos: [
      {
        titulo: "Cor que não desbota",
        descricao: "O esmalte é queimado junto à peça: a cor é permanente, sem pintura.",
      },
      {
        titulo: "Superfície impermeável",
        descricao: "Praticamente não absorve água, evitando limo, musgo e infiltração.",
      },
      {
        titulo: "Acabamento de alto padrão",
        descricao: "Brilho uniforme que valoriza projetos arquitetônicos.",
      },
      {
        titulo: "Manutenção mínima",
        descricao: "Basta lavar com água para recuperar o brilho original.",
      },
    ],
    especificacoes: [
      ["Material", "Cerâmica esmaltada"],
      ["Peças por m²", "~17"],
      ["Inclinação mínima", "30%"],
      ["Acabamento", "Brilhante"],
    ],
  },
  "forro-pvc": {
    badges: [
      { icone: "💧", texto: "Impermeável" },
      { icone: "🧹", texto: "Fácil limpar" },
      { icone: "🔇", texto: "Isolamento acústico" },
      { icone: "⚡", texto: "Instalação rápida" },
    ],
    motivos: [
      {
        titulo: "Impermeável e lavável",
        descricao: "Não absorve umidade, pode ser limpo com água e sabão sem danos.",
      },
      {
        titulo: "Durabilidade garantida",
        descricao: "Não apodrece, não mancha e mantém a cor branca por décadas.",
      },
      {
        titulo: "Instalação simples",
        descricao:
          "Sistema de encaixe macho-fêmea que qualquer pedreiro instala rapidamente.",
      },
      {
        titulo: "Preço acessível",
        descricao:
          "A solução de forro mais econômica com excelente acabamento final.",
      },
    ],
    especificacoes: [
      ["Material", "PVC rígido"],
      ["Largura da régua", "20 cm"],
      ["Largura útil", "~17,5 cm"],
      ["Comprimentos", "1,0m a 7,0m"],
      ["Cor", "Branco"],
      ["NCM", "39162000"],
    ],
  },
  "forro-pinus": {
    badges: [
      { icone: "🌲", texto: "Reflorestamento" },
      { icone: "🪶", texto: "Leve" },
      { icone: "🎨", texto: "Aceita verniz e stain" },
      { icone: "📐", texto: "Vendido em m²" },
    ],
    motivos: [
      {
        titulo: "Custo-benefício em madeira",
        descricao:
          "O forro de madeira mais acessível, com aparência clara e uniforme.",
      },
      {
        titulo: "Encaixe macho-fêmea",
        descricao: "Instalação rápida, sem frestas e com acabamento limpo.",
      },
      {
        titulo: "Aceita qualquer acabamento",
        descricao: "Verniz, stain ou esmalte aderem bem à superfície do pinus.",
      },
      {
        titulo: "Leve para a estrutura",
        descricao: "Baixa carga sobre o madeiramento e o teto existente.",
      },
    ],
    especificacoes: [
      ["Espécie", "Pinus (reflorestamento)"],
      ["Espessura", "1 cm"],
      ["Larguras", "10 cm e 20 cm"],
      ["Comprimentos", "2,0m a 4,0m"],
      ["Unidade de venda", "m²"],
      ["NCM", "44071000"],
    ],
  },
  "forro-cedrinho": {
    badges: [
      { icone: "🌳", texto: "Madeira nobre" },
      { icone: "✨", texto: "Acabamento natural" },
      { icone: "🏆", texto: "Premium" },
      { icone: "📐", texto: "Vendido em m²" },
    ],
    motivos: [
      {
        titulo: "Acabamento nobre e atemporal",
        descricao:
          "O forro mais valorizado do mercado, associado a construções de alto padrão.",
      },
      {
        titulo: "Cada peça é única",
        descricao:
          "As variações naturais do veio criam um acabamento exclusivo e autêntico.",
      },
      {
        titulo: "Aceita envernizamento em obra",
        descricao: "Aplique o verniz da cor desejada após a instalação.",
      },
      {
        titulo: "Valoriza o imóvel",
        descricao: "Forro cedrinho é um diferencial real na avaliação do imóvel.",
      },
    ],
    especificacoes: [
      ["Espécie", "Cedrinho Mesclado"],
      ["Dimensão", "1cm × 10cm"],
      ["Unidade de venda", "m²"],
      ["Acabamento", "Natural"],
      ["NCM", "44072910"],
    ],
  },
  madeirit: {
    badges: [
      { icone: "📐", texto: "Várias espessuras" },
      { icone: "🏗️", texto: "Alta carga" },
      { icone: "🔁", texto: "Reutilizável" },
      { icone: "✅", texto: "Certificado" },
    ],
    motivos: [
      {
        titulo: "Superfície plastificada",
        descricao:
          "O madeirit preto aguenta múltiplas concretagens sem perder a forma.",
      },
      {
        titulo: "Alta resistência à compressão",
        descricao: "Indicado para formas de pilares, vigas e lajes de concreto.",
      },
      {
        titulo: "Bordas seladas",
        descricao:
          "Evita infiltração de água durante a concretagem, preservando a rigidez.",
      },
      {
        titulo: "Reutilizável",
        descricao: "Pode ser usado em várias obras se manuseado com cuidado.",
      },
    ],
    especificacoes: [
      ["Espessuras", "10 a 20mm"],
      ["Dimensão", "220×110cm"],
      ["Faces", "Plastificadas"],
      ["Uso", "Formas de concreto"],
      ["NCM", "44123900"],
    ],
  },
  mourao: {
    badges: [
      { icone: "⚗️", texto: "Autoclave CCA" },
      { icone: "♾️", texto: "15-25 anos" },
      { icone: "🌳", texto: "Reflorestamento" },
      { icone: "🐜", texto: "Anti-cupim" },
    ],
    motivos: [
      {
        titulo: "Tratamento autoclave CCA tipo C",
        descricao:
          "O mais resistente disponível, indicado para contato direto com o solo.",
      },
      {
        titulo: "Vida útil de 15 a 25 anos no solo",
        descricao:
          "Muito superior ao mourão sem tratamento que dura 2 a 3 anos.",
      },
      {
        titulo: "Anti-cupim e anti-fungo",
        descricao:
          "Protegido contra todos os principais agentes de deterioração da madeira.",
      },
      {
        titulo: "Padrão rural e agrícola",
        descricao:
          "Usado em cercas, currais, estábulos e divisões de propriedades rurais.",
      },
    ],
    especificacoes: [
      ["Tratamento", "Autoclave CCA Tipo C"],
      ["Diâmetros", "4cm a 20cm"],
      ["Comprimentos", "2,2m a 10m"],
      ["Vida útil no solo", "15 a 25 anos"],
      ["NCM", "44039900"],
    ],
  },
  "calha-alge": {
    badges: [
      { icone: "🌧️", texto: "Galvanizada" },
      { icone: "📏", texto: "2m a 6m" },
      { icone: "🏠", texto: "Moldura e Platibanda" },
      { icone: "🔧", texto: "Fácil instalar" },
    ],
    motivos: [
      {
        titulo: "Galvanização de alta qualidade",
        descricao: "Proteção contra ferrugem mesmo em regiões com muita chuva.",
      },
      {
        titulo: "Dois cortes disponíveis",
        descricao:
          "Moldura para telhados com beira e Platibanda para acabamento moderno.",
      },
      {
        titulo: "Comprimentos de 2m a 6m",
        descricao:
          "Menos emendas, instalação mais rápida e acabamento mais limpo.",
      },
      {
        titulo: "Compatível com todos os acessórios de calha",
        descricao:
          "Suportes, cabeceiras, saídas e emendas disponíveis na Rocha.",
      },
    ],
    especificacoes: [
      ["Material", "Aço galvanizado"],
      ["Cortes", "Moldura 28/33 e Platibanda 28/33"],
      ["Comprimentos", "2m a 6m"],
      ["NCM", "73269090"],
    ],
  },
  "manta-termica": {
    badges: [
      { icone: "🌡️", texto: "Reduz 70% calor" },
      { icone: "🪶", texto: "Muito leve" },
      { icone: "📐", texto: "1F e 2F" },
      { icone: "⚡", texto: "Instalação rápida" },
    ],
    motivos: [
      {
        titulo: "Reduz até 70% do calor radiante",
        descricao:
          "A solução mais eficiente para conforto térmico em coberturas.",
      },
      {
        titulo: "1 ou 2 faces aluminizadas",
        descricao:
          "Escolha conforme o nível de isolamento necessário para sua obra.",
      },
      {
        titulo: "Aplicação universal",
        descricao:
          "Funciona sob qualquer tipo de telha: fibrocimento, PVC, cerâmica ou metálica.",
      },
      {
        titulo: "Investimento com retorno",
        descricao: "Reduz o consumo de ar condicionado de forma significativa.",
      },
    ],
    especificacoes: [
      ["Material", "Alumínio + espuma PE"],
      ["Versões", "1 face e 2 faces"],
      ["Espessura", "~4mm"],
      ["Tamanhos", "10m², 25m², 50m²"],
      ["NCM", "68071000"],
    ],
  },
};

export function getDestaques(chave?: string): DestaquesProdutoInfo | undefined {
  return chave ? DESTAQUES_PRODUTO[chave] : undefined;
}
