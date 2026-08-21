export type ProdutoRelacionado = {
  id: string;
  nome: string;
  descricao: string;
  emoji: string;
  unidade: string;
  quantidadeSugerida: number;
  categoria: string;
};

type Regra = {
  /** termos que devem aparecer no nome/categoria do produto adicionado */
  match: RegExp;
  itens: (qtd: number, detail?: string) => ProdutoRelacionado[];
};

/** Extrai a cor da telha PVC a partir do detalhe do item adicionado. */
function corTelhaPvc(detail?: string) {
  const d = detail ?? "";
  if (/transl[úu]cida|transparente/i.test(d)) return "Transparente";
  if (/marfim/i.test(d)) return "Marfim";
  if (/cinza/i.test(d)) return "Cinza";
  if (/cer[âa]mica/i.test(d)) return "Cerâmica";
  return "mesma cor da telha";
}

const REGRAS: Regra[] = [
  {
    match: /fibrocimento/i,
    itens: (qtd) => [
      {
        id: "parafuso-vedacao-110mm",
        nome: "Parafuso com Vedação 110mm",
        descricao: "Necessário para fixação — ~2 por telha",
        emoji: "🔩",
        unidade: "un",
        quantidadeSugerida: Math.max(20, Math.round(qtd * 2)),
        categoria: "Fixadores",
      },
      {
        id: "manta-termica-1f-10m2",
        nome: "Manta Térmica Aluminizada 1F × 10m²",
        descricao: "Reduz até 70% do calor. Recomendada para fibrocimento",
        emoji: "🌡️",
        unidade: "un",
        quantidadeSugerida: 1,
        categoria: "Calhas",
      },
      {
        id: "cumeeira-fibrocimento-articulada",
        nome: "Cumeeira Fibrocimento — Articulada",
        descricao: "Para o arremate do cumeamento",
        emoji: "🔺",
        unidade: "un",
        quantidadeSugerida: 3,
        categoria: "Telhas",
      },
      {
        id: "espigao-120cm",
        nome: "Espigão 120cm — Sequencial",
        descricao: "Vedação lateral entre chapas",
        emoji: "📌",
        unidade: "un",
        quantidadeSugerida: 4,
        categoria: "Fixadores",
      },
    ],
  },
  {
    match: /colonial|pvc.*telha|telha.*pvc/i,
    itens: (_qtd, detail) => {
      const cor = corTelhaPvc(detail);
      return [
        {
          id: `kit-fixacao-vedacao-${cor}`,
          nome: `Kit Fixação e Vedação — ${cor}`,
          descricao: "Parafusos coloridos na cor da telha. Necessário para fixação correta.",
          emoji: "🧰",
          unidade: "kit",
          quantidadeSugerida: 2,
          categoria: "Fixadores",
        },
        {
          id: `cumeeira-pvc-central-fixa-${cor}`,
          nome: `Cumeeira PVC Central Fixa — ${cor}`,
          descricao: "Arremate do cumeamento na cor da telha.",
          emoji: "🔺",
          unidade: "un",
          quantidadeSugerida: 3,
          categoria: "Telhas",
        },
        {
          id: "manta-termica-1f-10m2",
          nome: "Manta Térmica Aluminizada 1F × 10m²",
          descricao: "Reduz até 70% do calor. Recomendada sob telha PVC.",
          emoji: "🌡️",
          unidade: "un",
          quantidadeSugerida: 1,
          categoria: "Calhas",
        },
        {
          id: "calha-aquapluv-cinza",
          nome: "Calha Aquapluv — Cinza",
          descricao: "Sistema de captação de água pluvial.",
          emoji: "🌧️",
          unidade: "un",
          quantidadeSugerida: 2,
          categoria: "Calhas",
        },
      ];
    },
  },
  {
    match: /cer[âa]mica|portuguesa|romana|barro/i,
    itens: () => [
      {
        id: "prego-telheiro-500g",
        nome: "Prego Telheiro 18×27 — 500g",
        descricao: "Fixação da telha cerâmica — 1,5 prego por m²",
        emoji: "🔨",
        unidade: "emb",
        quantidadeSugerida: 2,
        categoria: "Fixadores",
      },
      {
        id: "cumeeira-barro-resinada",
        nome: "Cumeeira Barro — Larga Resinada",
        descricao: "Arremate de cumeamento em cerâmica resinada",
        emoji: "🔺",
        unidade: "un",
        quantidadeSugerida: 5,
        categoria: "Telhas",
      },
      {
        id: "manta-asfaltica-10x10m",
        nome: "Manta Asfáltica Aluminizada 10cm × 10m",
        descricao: "Impermeabilização em calhas e rufos",
        emoji: "🛡️",
        unidade: "un",
        quantidadeSugerida: 1,
        categoria: "Calhas",
      },
    ],
  },
  {
    match: /cambar[áa]/i,
    itens: () => [
      {
        id: "prego-polido-18x27",
        nome: "Prego Polido 18×27 com Cabeça — Kg",
        descricao: "O mais usado em estruturas de cambará",
        emoji: "🔨",
        unidade: "Kg",
        quantidadeSugerida: 2,
        categoria: "Fixadores",
      },
      {
        id: "anjo-stain-ipe-3-6",
        nome: "Anjo Stain Casa — Ipê — 3,6L",
        descricao: "Proteção e cor para cambará aparelhado",
        emoji: "🎨",
        unidade: "un",
        quantidadeSugerida: 1,
        categoria: "Tintas",
      },
      {
        id: "prego-polido-17x21",
        nome: "Prego Polido 17×21 com Cabeça — Kg",
        descricao: "Para caibros e ripas mais finos",
        emoji: "🔨",
        unidade: "Kg",
        quantidadeSugerida: 1,
        categoria: "Fixadores",
      },
      {
        id: "apus-cupim-5l",
        nome: "Apus Química — Exterminador de Cupim 5L",
        descricao: "Proteção preventiva para estrutura de madeira",
        emoji: "🌿",
        unidade: "un",
        quantidadeSugerida: 1,
        categoria: "Tintas",
      },
    ],
  },
  {
    match: /eucalipto|pontalete/i,
    itens: () => [
      {
        id: "prego-polido-18x27",
        nome: "Prego Polido 18×27 com Cabeça — Kg",
        descricao: "Para fixação de estruturas de eucalipto",
        emoji: "🔨",
        unidade: "Kg",
        quantidadeSugerida: 1,
        categoria: "Fixadores",
      },
      {
        id: "arame-galvanizado-bwg14",
        nome: "Arame Galvanizado BWG14",
        descricao: "Amarração de pontaletes e estruturas",
        emoji: "〰️",
        unidade: "un",
        quantidadeSugerida: 1,
        categoria: "Fixadores",
      },
    ],
  },
  {
    match: /forro\s*pvc|pvc\s*forro/i,
    itens: () => [
      {
        id: "emenda-h-pvc-3m",
        nome: "Emenda H PVC Branco — 3,0m",
        descricao: "União entre réguas. ~1 emenda por fileira",
        emoji: "➕",
        unidade: "un",
        quantidadeSugerida: 4,
        categoria: "Madeiramento",
      },
      {
        id: "canto-meia-cana-externo",
        nome: "Canto Meia Cana PVC — Externo",
        descricao: "Acabamento nos cantos externos do forro",
        emoji: "📐",
        unidade: "un",
        quantidadeSugerida: 4,
        categoria: "Madeiramento",
      },
      {
        id: "moldura-pvc-3m",
        nome: "Moldura PVC Branca — 3,0m",
        descricao: "Arremate perimetral do forro nas paredes",
        emoji: "🖼️",
        unidade: "un",
        quantidadeSugerida: 6,
        categoria: "Madeiramento",
      },
    ],
  },
  {
    match: /forro\s*(de\s*)?pinus|pinus\s*forro/i,
    itens: () => [
      {
        id: "meia-cana-pinus",
        nome: "Meia Cana Pinus — por metro",
        descricao: "Arremate perimetral do forro de pinus",
        emoji: "📐",
        unidade: "m",
        quantidadeSugerida: 10,
        categoria: "Madeiramento",
      },
      {
        id: "sarrafo-pinus-apoio",
        nome: "Sarrafo Pinus 2cm × 5cm — por metro",
        descricao: "Ripas de apoio para fixar o forro",
        emoji: "🪚",
        unidade: "m",
        quantidadeSugerida: 20,
        categoria: "Madeiramento",
      },
      {
        id: "prego-polido-15x15",
        nome: "Prego Polido 15×15 sem Cabeça — Kg",
        descricao: "Fixação discreta das réguas de pinus",
        emoji: "🔨",
        unidade: "Kg",
        quantidadeSugerida: 1,
        categoria: "Fixadores",
      },
      {
        id: "anjo-verniz-dura-mais",
        nome: "Anjo Verniz Dura Mais — Natural 3,6L",
        descricao: "Protege o pinus contra umidade e amarelamento",
        emoji: "✨",
        unidade: "un",
        quantidadeSugerida: 1,
        categoria: "Tintas",
      },
    ],
  },
  {
    match: /forro\s*cedrinho|cedrinho\s*forro/i,
    itens: () => [
      {
        id: "meia-cana-cedrinho",
        nome: "Meia Cana Cedrinho — por metro",
        descricao: "Acabamento nas arestas do forro",
        emoji: "📐",
        unidade: "m",
        quantidadeSugerida: 8,
        categoria: "Madeiramento",
      },
      {
        id: "anjo-verniz-dura-mais",
        nome: "Anjo Verniz Dura Mais — Natural 3,6L",
        descricao: "Proteção e acabamento para forro cedrinho",
        emoji: "✨",
        unidade: "un",
        quantidadeSugerida: 1,
        categoria: "Tintas",
      },
      {
        id: "prego-polido-17x21",
        nome: "Prego Polido 17×21 com Cabeça — Kg",
        descricao: "Fixação das réguas de forro cedrinho",
        emoji: "🔨",
        unidade: "Kg",
        quantidadeSugerida: 1,
        categoria: "Fixadores",
      },
    ],
  },
];

const GENERICOS: ProdutoRelacionado[] = [
  {
    id: "generico-fixadores",
    nome: "Parafusos e Fixadores",
    descricao: "Veja nossa linha completa de fixação",
    emoji: "🔩",
    unidade: "un",
    quantidadeSugerida: 1,
    categoria: "Fixadores",
  },
  {
    id: "generico-tintas",
    nome: "Tintas e Vernizes Anjo",
    descricao: "Proteção e acabamento para sua obra",
    emoji: "🎨",
    unidade: "un",
    quantidadeSugerida: 1,
    categoria: "Tintas",
  },
  {
    id: "generico-calhas",
    nome: "Calhas e Rufos Alge",
    descricao: "Sistema completo de captação de água",
    emoji: "🌧️",
    unidade: "un",
    quantidadeSugerida: 1,
    categoria: "Calhas",
  },
];

/** Retorna no máximo 4 produtos relacionados ao item adicionado. */
export function getRelacionados(
  nomeProduto: string,
  qtd = 1,
  detail?: string,
): ProdutoRelacionado[] {
  const alvo = nomeProduto ?? "";
  // forro cedrinho / forro pvc precisam ter prioridade sobre regras mais amplas
  const ordenadas = [...REGRAS].sort((a, b) => b.match.source.length - a.match.source.length);
  const regra = ordenadas.find((r) => r.match.test(alvo));
  const itens = regra ? regra.itens(qtd, detail) : GENERICOS;
  return itens.slice(0, 4);
}
