export type ProdutoRelacionado = {
  id: string;
  nome: string;
  descricao: string;
  emoji: string;
  unidade: string;
  quantidadeSugerida: number;
  categoria: string;
};

// Mapa: id do produto principal → lista de relacionados sugeridos
export const CROSS_SELL: Record<string, ProdutoRelacionado[]> = {
  // Fibrocimento
  "fibrocimento": [
    {
      id: "parafuso-vedacao-110mm",
      nome: "Parafuso com Vedação 110mm",
      descricao: "Necessário para fixação da telha fibrocimento. 1 parafuso a cada 2 ondas.",
      emoji: "🔩",
      unidade: "un",
      quantidadeSugerida: 50,
      categoria: "Fixadores",
    },
    {
      id: "manta-termica-1f-10m2",
      nome: "Manta Térmica Aluminizada 1F × 10m²",
      descricao: "Reduz até 70% do calor radiante. Muito recomendada sob fibrocimento.",
      emoji: "🌡️",
      unidade: "un",
      quantidadeSugerida: 1,
      categoria: "Fixadores",
    },
    {
      id: "cumeeira-fibrocimento-110cm",
      nome: "Cumeeira Fibrocimento 110cm × 6mm",
      descricao: "Arremate do cumeamento. 1 cumeeira para cada metro linear de cumeamento.",
      emoji: "🔺",
      unidade: "un",
      quantidadeSugerida: 5,
      categoria: "Telhas",
    },
    {
      id: "espigao-120cm",
      nome: "Espigão 120cm × 6mm — Sequencial",
      descricao: "Vedação lateral entre telhas. Recomendado para todas as instalações.",
      emoji: "📌",
      unidade: "un",
      quantidadeSugerida: 4,
      categoria: "Fixadores",
    },
  ],

  // Colonial PVC
  "colonial-pvc": [
    {
      id: "kit-fixacao-ceramica",
      nome: "Kit Fixação e Vedação — Cerâmica",
      descricao: "Parafusos com vedação na cor da telha. Incluso na embalagem de 20 un.",
      emoji: "🔩",
      unidade: "emb/20",
      quantidadeSugerida: 2,
      categoria: "Fixadores",
    },
    {
      id: "cumeeira-pvc-central-fixa",
      nome: "Cumeeira PVC Central Fixa",
      descricao: "Arremate do cumeamento na mesma cor da telha selecionada.",
      emoji: "🔺",
      unidade: "un",
      quantidadeSugerida: 3,
      categoria: "Telhas",
    },
    {
      id: "calha-aquapluv-cinza",
      nome: "Calha Aquapluv — Cinza",
      descricao: "Sistema de captação de água pluvial. Recomendado para toda cobertura.",
      emoji: "🌧️",
      unidade: "un",
      quantidadeSugerida: 2,
      categoria: "Calhas",
    },
    {
      id: "manta-termica-1f-10m2",
      nome: "Manta Térmica Aluminizada 1F × 10m²",
      descricao: "Conforto térmico extra sob a telha PVC.",
      emoji: "🌡️",
      unidade: "un",
      quantidadeSugerida: 1,
      categoria: "Fixadores",
    },
  ],

  // Cerâmica
  "ceramica": [
    {
      id: "prego-telheiro-500g",
      nome: "Prego Telheiro 18×27 — 500g",
      descricao: "Fixação da telha cerâmica. Galvanizado para maior durabilidade.",
      emoji: "🔨",
      unidade: "emb",
      quantidadeSugerida: 2,
      categoria: "Fixadores",
    },
    {
      id: "cumeeira-barro-resinada",
      nome: "Cumeeira Barro — Larga Resinada",
      descricao: "Arremate de cumeamento em cerâmica resinada. Encaixe perfeito.",
      emoji: "🔺",
      unidade: "un",
      quantidadeSugerida: 10,
      categoria: "Telhas",
    },
    {
      id: "manta-asfaltica-10x10m",
      nome: "Manta Asfáltica Aluminizada 10×10m",
      descricao: "Impermeabilização em calhas e rufos. Essencial em coberturas cerâmicas.",
      emoji: "🛡️",
      unidade: "un",
      quantidadeSugerida: 1,
      categoria: "Fixadores",
    },
  ],

  // Cambará
  "cambara": [
    {
      id: "prego-polido-18x27",
      nome: "Prego Polido com Cabeça 18×27",
      descricao: "O mais usado em estruturas de madeiramento. Venda por Kg.",
      emoji: "🔨",
      unidade: "Kg",
      quantidadeSugerida: 2,
      categoria: "Fixadores",
    },
    {
      id: "prego-polido-17x27",
      nome: "Prego Polido com Cabeça 17×21",
      descricao: "Para caibros e ripas mais finos. Venda por Kg.",
      emoji: "🔨",
      unidade: "Kg",
      quantidadeSugerida: 1,
      categoria: "Fixadores",
    },
    {
      id: "vergalhao-38-12m",
      nome: "Vergalhão CA50 3/8\" — 12m",
      descricao: "Para fundação e amarrações da estrutura.",
      emoji: "⚙️",
      unidade: "barra",
      quantidadeSugerida: 2,
      categoria: "Ferragem",
    },
    {
      id: "anjo-stain-ipe-3-6",
      nome: "Anjo Stain Casa — Ipê — 3,6L",
      descricao: "Proteção e beleza para madeira aparelhada. Alta penetração.",
      emoji: "🎨",
      unidade: "un",
      quantidadeSugerida: 1,
      categoria: "Tintas",
    },
  ],

  // Eucalipto
  "eucalipto": [
    {
      id: "prego-polido-18x27",
      nome: "Prego Polido com Cabeça 18×27",
      descricao: "Para fixação de pontaletes e estruturas de eucalipto.",
      emoji: "🔨",
      unidade: "Kg",
      quantidadeSugerida: 1,
      categoria: "Fixadores",
    },
    {
      id: "arame-galvanizado-bwg14",
      nome: "Arame Galvanizado BWG14",
      descricao: "Amarração de pontaletes e estruturas rurais.",
      emoji: "〰️",
      unidade: "un",
      quantidadeSugerida: 1,
      categoria: "Fixadores",
    },
  ],

  // Forro PVC
  "forro-pvc": [
    {
      id: "emenda-h-pvc-3m",
      nome: "Emenda H PVC — Branco 3,0m",
      descricao: "União entre réguas de forro PVC. 1 emenda por fileira.",
      emoji: "➕",
      unidade: "un",
      quantidadeSugerida: 4,
      categoria: "Madeiramento",
    },
    {
      id: "canto-meia-cana-externo",
      nome: "Canto Meia Cana PVC — Externo",
      descricao: "Acabamento nos cantos externos do forro.",
      emoji: "📐",
      unidade: "un",
      quantidadeSugerida: 4,
      categoria: "Madeiramento",
    },
    {
      id: "moldura-pvc-3m",
      nome: "Moldura PVC Branca — 3,0m",
      descricao: "Arremate perimetral do forro nas paredes.",
      emoji: "🖼️",
      unidade: "un",
      quantidadeSugerida: 6,
      categoria: "Madeiramento",
    },
  ],

  // Policarbonato
  "policarbonato": [
    {
      id: "perfil-h-policarbonato",
      nome: "Perfil H Policarbonato — 11,8m",
      descricao: "Emenda entre chapas de policarbonato. Essencial na instalação.",
      emoji: "➕",
      unidade: "un",
      quantidadeSugerida: 2,
      categoria: "Fixadores",
    },
    {
      id: "perfil-u-policarbonato",
      nome: "Perfil U Policarbonato — 2,1m",
      descricao: "Arremate nas extremidades das chapas.",
      emoji: "📐",
      unidade: "un",
      quantidadeSugerida: 4,
      categoria: "Fixadores",
    },
    {
      id: "parafuso-vedacao-110mm",
      nome: "Parafuso com Vedação 110mm",
      descricao: "Fixação das chapas na estrutura de apoio.",
      emoji: "🔩",
      unidade: "un",
      quantidadeSugerida: 30,
      categoria: "Fixadores",
    },
  ],
};
