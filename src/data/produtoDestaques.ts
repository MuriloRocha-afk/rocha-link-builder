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
  "manta-asfaltica": {
    badges: [
      { icone: "💧", texto: "100% impermeável" },
      { icone: "☀️", texto: "Face aluminizada" },
      { icone: "📐", texto: "10cm e 20cm" },
      { icone: "🔥", texto: "Aplicação a quente" },
    ],
    motivos: [
      {
        titulo: "Veda emendas e junções",
        descricao:
          "Ideal para emendas de calha, rufos, encontros de parede e pequenos reparos no telhado.",
      },
      {
        titulo: "Alumínio reflete o calor",
        descricao: "A face aluminizada terracota protege o asfalto do sol e aumenta a durabilidade.",
      },
      {
        titulo: "Adesão imediata",
        descricao: "Autoadesiva com aquecimento leve, cola em metal, alvenaria, fibrocimento e PVC.",
      },
      {
        titulo: "Rolo prático de 10m",
        descricao: "Duas larguras para escolher conforme o tamanho da junção a impermeabilizar.",
      },
    ],
    especificacoes: [
      ["Material", "Asfalto elastomérico + alumínio"],
      ["Cor", "Terracota"],
      ["Larguras", "10cm e 20cm"],
      ["Comprimento", "10m por rolo"],
      ["Aplicação", "Calhas, rufos e junções"],
    ],
  },
  rufo: {
    badges: [
      { icone: "🛡️", texto: "Aço galvanizado" },
      { icone: "💧", texto: "Veda infiltração" },
      { icone: "📐", texto: "Corte 25 e 33" },
      { icone: "🔧", texto: "Fácil adaptar" },
    ],
    motivos: [
      {
        titulo: "Fabricado em aço galvanizado",
        descricao:
          "Resistente à corrosão, ideal para regiões com alta pluviosidade e telhados expostos.",
      },
      {
        titulo: "Corte 33 disponível",
        descricao:
          "Aba maior para telhados com mais volume de água ou quando se deseja maior sobreposição na parede.",
      },
      {
        titulo: "Essencial contra infiltração",
        descricao:
          "Veda o encontro entre telhado, parede e platibanda, impedindo que a água escorra pela alvenaria.",
      },
      {
        titulo: "Fácil de cortar e ajustar",
        descricao:
          "Peças de 2m a 6m que podem ser cortadas na obra para encaixe perfeito em cada trecho.",
      },
    ],
  },
  acessorios: {
    badges: [
      { icone: "🔧", texto: "Linha completa" },
      { icone: "🏠", texto: "Moldura e Platibanda" },
      { icone: "💧", texto: "Instalação vedada" },
      { icone: "🚫", texto: "Sem improviso" },
    ],
    motivos: [
      {
        titulo: "Compatível com Moldura e Platibanda",
        descricao:
          "Peças projetadas para os dois sistemas de calha galvanizada da Rocha Telhas.",
      },
      {
        titulo: "Acessório para cada ponto crítico",
        descricao:
          "Suporte, cabeceira, saída, água furtada e pingadeira cobrem todos os pontos de escoamento e arremate.",
      },
      {
        titulo: "Instalação completa e vedada",
        descricao:
          "Usar os acessórios certos evita gotejamentos, vazamentos e acúmulo de água no telhado.",
      },
      {
        titulo: "Evita improviso na obra",
        descricao:
          "Peças específicas de fábrica garantem encaixe correto e acabamento profissional.",
      },
    ],
  },
  pregos: {
    badges: [
      { icone: "🔨", texto: "3 tipos" },
      { icone: "⚖️", texto: "A partir de 100g" },
      { icone: "📦", texto: "Aço em pacote 100un" },
      { icone: "🏗️", texto: "Uso em obra" },
    ],
    motivos: [
      {
        titulo: "Compre só o que precisa",
        descricao: "Pregos polidos vendidos em múltiplos de 100g, sem sobra e sem desperdício.",
      },
      {
        titulo: "Prego de aço para concreto",
        descricao:
          "Alta resistência para fixar em concreto e alvenaria, em pacote fechado de 100 unidades.",
      },
      {
        titulo: "Bitolas para cada serviço",
        descricao: "De 10×10 a 25×72, cobrindo caixaria, ripa, forro e madeiramento.",
      },
      {
        titulo: "Com e sem cabeça",
        descricao: "Sem cabeça para acabamento discreto; com cabeça para máxima fixação.",
      },
    ],
    especificacoes: [
      ["Tipos", "Aço, Polido com cabeça, Polido sem cabeça"],
      ["Bitolas", "10×10 a 25×72"],
      ["Embalagem polido", "Múltiplos de 100g"],
      ["Embalagem aço", "Pacote de 100 unidades"],
      ["Material", "Aço carbono / aço polido"],
    ],
  },
  polipropileno: {
    badges: [
      { icone: "💡", texto: "Alta luz natural" },
      { icone: "🪶", texto: "Muito leve" },
      { icone: "🛡️", texto: "Resiste a impacto" },
      { icone: "🔗", texto: "Encaixa no fibrocimento" },
    ],
    motivos: [
      {
        titulo: "Iluminação natural sem furar o telhado",
        descricao:
          "Acabamento translúcido leitoso da linha Luxtelhas/Fibrarte: alta transmissão de luz natural com claridade difusa, sem ofuscamento direto.",
      },
      {
        titulo: "Muito mais leve que telhas rígidas",
        descricao:
          "Bem mais leve que fibrocimento, cerâmica ou vidro no mesmo vão — manuseio simples e menos carga sobre o madeiramento.",
      },
      {
        titulo: "Boa resistência a impacto",
        descricao:
          "O polipropileno é flexível e absorve impactos que trincariam uma peça rígida, reduzindo quebras no transporte e na instalação.",
      },
      {
        titulo: "Perfil compatível com o telhado existente",
        descricao:
          "Perfil Onda Alta 177/51 que casa com a telha ondulada de fibrocimento, permitindo substituir peças pontuais do pano.",
      },
    ],
  },
  pet: {
    badges: [
      { icone: "☀️", texto: "Ponto de luz" },
      { icone: "♻️", texto: "PET 100% reciclado" },
      { icone: "🛡️", texto: "Mais resistente que vidro" },
      { icone: "🧩", texto: "Mesmo formato da cerâmica" },
    ],
    motivos: [
      {
        titulo: "Plástico PET transparente, 100% reciclado",
        descricao:
          "A peça (Lubian/Cejatel/Vilhena) é de PET transparente injetado a partir de material reciclado — opção sustentável com a mesma função de iluminar.",
      },
      {
        titulo: "Resistência a impacto muito superior ao vidro comum",
        descricao:
          "O PET absorve impactos que estilhaçariam uma telha de vidro, reduzindo risco de quebra na obra e na manutenção.",
      },
      {
        titulo: "Filtro UV e menos calor",
        descricao:
          "Aditivo com filtro UV evita o amarelamento com o tempo e reduz a transmissão de calor para o ambiente. Não propaga chamas e suporta bem a variação de temperatura.",
      },
      {
        titulo: "Uso como ponto de luz, não como cobertura",
        descricao:
          "Indicada em peças avulsas distribuídas no telhado (1 a 2 a cada 4 m²) — não é feita para cobrir o telhado inteiro.",
      },
    ],
  },
  vidro: {
    badges: [
      { icone: "☀️", texto: "Ponto de luz" },
      { icone: "🔷", texto: "Vidro real" },
      { icone: "🛡️", texto: "Textura filtra UV" },
      { icone: "🧩", texto: "Mesmo formato da cerâmica" },
    ],
    motivos: [
      {
        titulo: "Proteção térmica e de móveis",
        descricao:
          "A textura exclusiva do vidro suaviza a incidência de raios UV, reduzindo o desconforto térmico sob o ponto de luz e protegendo móveis e acabamentos.",
      },
      {
        titulo: "Iluminação ampliada e economia de energia",
        descricao:
          "O formato e a textura ampliam o ângulo de entrada da luz natural, reduzindo a necessidade de luz artificial durante o dia.",
      },
      {
        titulo: "Compatível com energia solar",
        descricao:
          "Pode ser usada em conjunto com sistemas de placas solares no telhado, sem conflito de instalação.",
      },
      {
        titulo: "Material rígido e nobre",
        descricao:
          "Alternativa mais robusta e de acabamento diferenciado em relação ao plástico. Em contrapartida é mais pesada e mais frágil a impacto que a Telha PET.",
      },
    ],
  },

  cumeeiras: {
    badges: [
      { icone: "🔺", texto: "Arremate do topo" },
      { icone: "🧱", texto: "5 materiais" },
      { icone: "💧", texto: "Veda contra chuva" },
      { icone: "🎨", texto: "Cores da telha" },
    ],
    motivos: [
      {
        titulo: "Fecha a cumeeira e o espigão contra a chuva",
        descricao:
          "É a peça que veda o encontro das águas do telhado — sem ela, chuva com vento entra direto pela espinha da cobertura.",
      },
      {
        titulo: "Mesma linha e cor da sua telha",
        descricao:
          "Trabalhamos com peças em barro, PVC, fibrocimento, concreto e esmaltada, para manter o acabamento uniforme com o pano do telhado.",
      },
      {
        titulo: "Consumo previsível por metro",
        descricao:
          "As fichas abaixo trazem comprimento, peso e consumo por metro, o que permite fechar a quantidade exata da sua obra.",
      },
      {
        titulo: "Formatos para cada encontro",
        descricao:
          "Central, articulada, triangular 3 vias e capa lateral (paulistinha) cobrem cumeeira, espigão e arremates de borda.",
      },
    ],
  },
  garapeira: {
    badges: [
      { icone: "🪵", texto: "Alta densidade" },
      { icone: "🏗️", texto: "Uso estrutural nobre" },
      { icone: "🛡️", texto: "Resistente a cupim" },
      { icone: "📋", texto: "Verificar disponibilidade" },
    ],
    motivos: [
      {
        titulo: "Durabilidade de madeira de lei",
        descricao:
          "Espécie nativa densa, que mantém desempenho estrutural por décadas mesmo em telhados de grande vão.",
      },
      {
        titulo: "Resistência natural a cupim",
        descricao:
          "A densidade e os extrativos da garapeira dificultam o ataque de cupins e outros xilófagos.",
      },
      {
        titulo: "Indicada para estrutura aparente",
        descricao:
          "Aparelhada em plaina, entrega superfície uniforme e tom fechado, ideal para telhado com estrutura à vista.",
      },
      {
        titulo: "Origem legalizada",
        descricao:
          "Madeira nativa com DOF/IBAMA. Bitolas e comprimentos sujeitos a verificação de disponibilidade.",
      },
    ],
  },
  peroba: {
    badges: [
      { icone: "📐", texto: "Estabilidade dimensional" },
      { icone: "✨", texto: "Acabamento nobre" },
      { icone: "🔨", texto: "Boa trabalhabilidade" },
      { icone: "📋", texto: "Verificar disponibilidade" },
    ],
    motivos: [
      {
        titulo: "Baixa propensão a empenar",
        descricao:
          "Comportamento estável com a variação de umidade, mantendo o alinhamento das peças no madeiramento.",
      },
      {
        titulo: "Boa trabalhabilidade",
        descricao:
          "Aceita bem corte, furação e aparelhamento em plaina, facilitando encaixes e ajustes na obra.",
      },
      {
        titulo: "Acabamento valorizado",
        descricao:
          "Fibra fechada e tom uniforme, excelente para receber verniz ou stain em estruturas aparentes.",
      },
      {
        titulo: "Tradicional em telhados de alto padrão",
        descricao:
          "Espécie clássica em coberturas residenciais nobres. Itens sujeitos a verificação de disponibilidade.",
      },
    ],
  },
  jatoba: {
    badges: [
      { icone: "💎", texto: "Altíssima dureza" },
      { icone: "🛡️", texto: "Máxima resistência" },
      { icone: "⏳", texto: "Longa durabilidade" },
      { icone: "📞", texto: "Sob consulta" },
    ],
    motivos: [
      {
        titulo: "Uma das madeiras mais duras do mercado",
        descricao:
          "Densidade elevada que suporta cargas altas e reduz deformação em vigas e caibros de grande seção.",
      },
      {
        titulo: "Altíssima durabilidade",
        descricao:
          "Resistência natural a apodrecimento e ataque de insetos, indicada para estruturas de vida longa.",
      },
      {
        titulo: "Resistência a intempéries",
        descricao:
          "Comporta-se bem em áreas expostas a sol e chuva quando protegida com stain ou verniz adequado.",
      },
      {
        titulo: "Sob consulta",
        descricao:
          "Item de baixíssimo giro na loja: bitolas e comprimentos são cotados caso a caso, sob consulta.",
      },
    ],
  },
  amescla: {
    badges: [
      { icone: "⚖️", texto: "Média densidade" },
      { icone: "💰", texto: "Custo-benefício" },
      { icone: "🪚", texto: "Sarrafo e tábua" },
      { icone: "📞", texto: "Verificar disponibilidade" },
    ],
    motivos: [
      {
        titulo: "Madeira de média densidade",
        descricao:
          "Fácil de cortar e pregar, com peso equilibrado para peças de acabamento e caixaria.",
      },
      {
        titulo: "Boa relação custo-benefício",
        descricao:
          "Alternativa econômica quando a peça não exige a resistência de uma madeira de lei.",
      },
      {
        titulo: "Uso comum em sarrafo e tábua",
        descricao:
          "Muito usada em caixaria, formas, travamentos e acabamentos secundários da obra.",
      },
      {
        titulo: "Disponibilidade a confirmar",
        descricao:
          "Bitolas e comprimentos variam conforme o lote — confirmamos estoque e prazo por WhatsApp.",
      },
    ],
  },
  tabeira: {
    badges: [
      { icone: "✨", texto: "Acabamento do beiral" },
      { icone: "🪵", texto: "Lisa ou desenhada" },
      { icone: "🔢", texto: "6 modelos" },
      { icone: "📏", texto: "15cm a 30cm" },
    ],
    motivos: [
      {
        titulo: "Acabamento estético do telhado",
        descricao:
          "Fecha visualmente o beiral ou a platibanda, escondendo as pontas dos caibros e ripas.",
      },
      {
        titulo: "Lisa (boleada) ou desenhada",
        descricao:
          "Escolha entre o perfil liso com borda boleada ou o recorte decorativo desenhado.",
      },
      {
        titulo: "6 modelos numerados",
        descricao:
          "Os desenhos vão do modelo 1 ao 6, permitindo combinar com o estilo da fachada.",
      },
      {
        titulo: "Fechamento visual do telhado",
        descricao:
          "Vendida por metro linear em peças de 15cm, 20cm, 25cm e 30cm de largura.",
      },
    ],
  },
  deck: {
    badges: [
      { icone: "🌤️", texto: "Área externa" },
      { icone: "💧", texto: "Resiste à umidade" },
      { icone: "🦶", texto: "Conforto térmico" },
      { icone: "🏡", texto: "Valoriza o espaço" },
    ],
    motivos: [
      {
        titulo: "Feito para áreas externas",
        descricao:
          "Indicado para borda de piscina, varanda, jardim e áreas de lazer descobertas.",
      },
      {
        titulo: "Resistência à umidade e intempérie",
        descricao:
          "Espécies densas e o pinus tratado suportam sol e chuva com manutenção simples.",
      },
      {
        titulo: "Conforto ao pisar descalço",
        descricao:
          "A madeira aquece muito menos que piso cerâmico ou pedra sob sol forte.",
      },
      {
        titulo: "Valorização estética",
        descricao:
          "Acabamento natural que valoriza a área externa e combina com qualquer paisagismo.",
      },
    ],
  },
  "parafusos-telha": {
    badges: [
      { icone: "🧰", texto: "Kit completo" },
      { icone: "💧", texto: "Com vedação" },
      { icone: "🏠", texto: "PVC, fibro e policarbonato" },
      { icone: "⚡", texto: "Instalação rápida" },
    ],
    motivos: [
      {
        titulo: "Kit completo com vedação",
        descricao:
          "Parafuso, arruela e vedação no mesmo conjunto, sem precisar comprar peças separadas.",
      },
      {
        titulo: "Evita infiltração no ponto de fixação",
        descricao:
          "A vedação fecha o furo da telha, que é justamente onde a água costuma entrar.",
      },
      {
        titulo: "Compatível com os principais tipos de telha",
        descricao: "Usado em telha de PVC, fibrocimento e policarbonato.",
      },
      {
        titulo: "Instalação rápida",
        descricao:
          "Fixação direta com parafusadeira, agilizando a montagem da cobertura.",
      },
    ],
  },
  arames: {
    badges: [
      { icone: "🪢", texto: "Amarração de telha" },
      { icone: "🛡️", texto: "Galvanizado" },
      { icone: "🧱", texto: "Estrutura de madeira" },
      { icone: "🏺", texto: "Telhado de barro" },
    ],
    motivos: [
      {
        titulo: "Amarração de telha cerâmica",
        descricao:
          "Prende a telha de barro na ripa ou na estrutura, evitando deslocamento com vento.",
      },
      {
        titulo: "Resistente à corrosão",
        descricao:
          "A versão galvanizada tem proteção contra ferrugem, indicada para uso exposto.",
      },
      {
        titulo: "Uso em estrutura de madeira",
        descricao:
          "Serve para amarrações e travamentos auxiliares no madeiramento do telhado.",
      },
      {
        titulo: "Fixação tradicional",
        descricao:
          "Método consagrado e econômico para telhado de barro em todo o país.",
      },
    ],
  },
  "buchas-arruelas": {
    badges: [
      { icone: "📏", texto: "Várias medidas" },
      { icone: "🔩", texto: "Complemento do parafuso" },
      { icone: "🔒", texto: "Evita folga" },
      { icone: "⚙️", texto: "Uso geral" },
    ],
    motivos: [
      {
        titulo: "Variedade de medidas",
        descricao:
          "Buchas, arruelas e barras roscadas em diferentes bitolas para cada aplicação.",
      },
      {
        titulo: "Complemento essencial da fixação",
        descricao:
          "Praticamente toda fixação com parafuso pede bucha ou arruela correspondente.",
      },
      {
        titulo: "Evita folga e garante firmeza",
        descricao:
          "A arruela distribui o aperto e a bucha fixa o parafuso na alvenaria sem folga.",
      },
    ],
  },
  "parafusos-madeira": {
    badges: [
      { icone: "🪵", texto: "Estrutura de telhado" },
      { icone: "🪛", texto: "Bruta ou aparelhada" },
      { icone: "📐", texto: "Várias bitolas" },
      { icone: "🔒", texto: "Boa fixação" },
    ],
    motivos: [
      {
        titulo: "Indicado para estrutura de telhado",
        descricao: "Usado na fixação de caibro, ripa, viga e demais peças do madeiramento.",
      },
      {
        titulo: "Boa fixação em madeira",
        descricao:
          "Rosca própria para madeira bruta ou aparelhada, com bom travamento.",
      },
      {
        titulo: "Diferentes bitolas",
        descricao:
          "Opções de diâmetro e comprimento para cada espessura de peça e tipo de serviço.",
      },
    ],
  },
};




export function getDestaques(chave?: string): DestaquesProdutoInfo | undefined {
  return chave ? DESTAQUES_PRODUTO[chave] : undefined;
}
