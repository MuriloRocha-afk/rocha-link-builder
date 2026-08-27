import type { ConfiguradorConfig } from "@/components/site/ConfiguradorGenerico";
import { imagensConcreto, imagensEsmaltada } from "@/data/imagensProduto";
import type { AcessorioItem } from "@/components/site/BlocoAcessorios";
import { acessoriosPlastico, chumbador } from "@/data/acessoriosTelhas";

const BC = (nome: string) => [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Telhas", href: "/catalogo/telhas" },
  { label: nome },
];

const CORES_CONCRETO = [
  { valor: "Areia", cor: "#D9C7A3" },
  { valor: "Cinza", cor: "#9AA0A6" },
  { valor: "Grafite", cor: "#3A3F45" },
  { valor: "Marfim", cor: "#EFE3C8" },
  { valor: "Tabaco", cor: "#7A4B2A" },
];

export const CONFIG_CONCRETO: ConfiguradorConfig = {
  sugestaoCumeeira: (s) => (s.cor ? { material: "Concreto", cor: s.cor } : null),
  produtoKey: "concreto",
  breadcrumb: BC("Telha de Concreto"),
  titulo: "🏗️ Telha de Concreto",
  subtitulo: "Areia, Cinza e Grafite — linha Eurotop. Durabilidade máxima e acabamento premium.",
  galeriaTitulo: "Telha de Concreto Eurotop",
  galeriaPlaceholder: "Selecione uma cor para ver as fotos",
  imagens: (s) =>
    s.cor
      ? (imagensConcreto[s.cor] ?? [{ src: "", alt: `Telha de Concreto ${s.cor} Eurotop` }])
      : [],
  categoria: "Telhas",
  passos: [
    {
      chave: "cor",
      titulo: "Cor / Acabamento",
      tipo: "grid3",
      opcoes: CORES_CONCRETO.map((c) => ({ ...c, sub: "Linha Eurotop" })),
    },
    {
      chave: "qtd",
      titulo: "Quantidade",
      tipo: "quantidade",
      unidade: "peças",
      padrao: 100,
      passo: 10,
      nota: (_s, q) =>
        `Cobertura estimada: ~${(q * 0.063).toFixed(1)} m² (cada telha cobre ~0,063 m²)`,
    },
  ],
  especificacoes: [
    ["Inclinação mínima", "30%"],
    ["Cobertura por peça", "~0,063 m²"],
    ["Espessura", "~12mm"],
    ["Fixação", "Prego telheiro ou arame"],
    ["Marca", "Eurotop"],
  ],
  resumoNome: () => "Telha de Concreto Eurotop",
  resumoDetalhe: (s, q) =>
    `${s.cor} · ${q.qtd ?? 100} peças · ~${(((q.qtd ?? 100) as number) * 0.063).toFixed(1)} m²`,
  unidadeResumo: () => "peças",
  idItem: (s) => `concreto-${s.cor}`,
  tituloAcessorios: "Acessórios para Telha de Concreto",
  acessorios: (s, q) => acessoriosConcreto(s.cor ?? "Areia", (q.qtd as number) ?? 100),
  mensagem: (s, q) =>
    `🏗️ *Telha de Concreto Eurotop*\n• Cor: ${s.cor}\n• Quantidade: ${q.qtd ?? 100} peças\n• Cobertura estimada: ~${(((q.qtd ?? 100) as number) * 0.063).toFixed(1)} m²`,
};

const acessoriosConcreto = (cor: string, qtd: number): AcessorioItem[] => [
  {
    id: `cumeeira-concreto-${cor}`,
    nome: `Cumeeira de Concreto — ${cor}`,
    descricao: "Arremate do cumeamento na mesma cor da telha.",
    emoji: "🔺",
    unidade: "un",
    categoria: "Telhas",
    quantidadeSugerida: Math.max(3, Math.ceil(qtd * 0.05)),
  },
  {
    id: "prego-telheiro-500g",
    nome: "Prego Telheiro 18×27 — 500g",
    descricao: "Fixação das telhas nas ripas.",
    emoji: "🔨",
    unidade: "emb",
    categoria: "Fixadores",
    quantidadeSugerida: Math.max(1, Math.ceil(qtd / 150)),
  },
  {
    id: "manta-termica-1f-10m2",
    nome: "Manta Térmica Aluminizada 1F × 10m²",
    descricao: "Reduz o calor sob a cobertura.",
    emoji: "🌡️",
    unidade: "un",
    categoria: "Calhas",
    quantidadeSugerida: Math.max(1, Math.ceil((qtd * 0.063) / 10)),
  },
  {
    id: "calha-aquapluv-cinza",
    nome: "Calha Aquapluv — Cinza",
    descricao: "Sistema de captação de água pluvial.",
    emoji: "🌧️",
    unidade: "un",
    categoria: "Calhas",
    quantidadeSugerida: 2,
  },
];

const CORES_ESMALTADA = [
  { valor: "Vermelho", cor: "#B4372A" },
  { valor: "Branco", cor: "#F2F2EF" },
  { valor: "Preto", cor: "#2B2B2B", badge: "Verificar disponibilidade" },
  { valor: "Azul", cor: "#2E5D8C", badge: "Verificar disponibilidade" },
  { valor: "Verde", cor: "#2F6B4F", badge: "Verificar disponibilidade" },
  { valor: "Marrom", cor: "#6B4530", badge: "Verificar disponibilidade" },
];

const acessoriosEsmaltada = (cor: string, qtd: number): AcessorioItem[] => [
  {
    id: `cumeeira-esmaltada-${cor}`,
    nome: `Cumeeira Esmaltada — ${cor}`,
    descricao: "Cumeeira no mesmo esmalte e cor da telha.",
    emoji: "🔺",
    unidade: "un",
    categoria: "Telhas",
    quantidadeSugerida: Math.max(3, Math.ceil(qtd * 0.05)),
  },
  {
    id: `arremate-esmaltado-${cor}`,
    nome: `Arremate / Espigão Esmaltado — ${cor}`,
    descricao: "Acabamento de espigão e rincão da cobertura.",
    emoji: "📐",
    unidade: "un",
    categoria: "Telhas",
    quantidadeSugerida: Math.max(2, Math.ceil(qtd * 0.02)),
  },
  {
    id: "prego-telheiro-500g",
    nome: "Prego Telheiro 18×27 — 500g",
    descricao: "Fixação das telhas esmaltadas nas ripas.",
    emoji: "🔨",
    unidade: "emb",
    categoria: "Fixadores",
    quantidadeSugerida: Math.max(1, Math.ceil(qtd / 150)),
  },
  {
    id: "ver-cumeeiras-esmaltadas",
    nome: "Ver todas as Cumeeiras Esmaltadas",
    descricao: "Bloco completo de cumeeiras: barro, concreto, esmaltada, PVC e fibrocimento.",
    emoji: "🔺",
    unidade: "un",
    categoria: "Telhas",
    quantidadeSugerida: 0,
    href: "/catalogo/telhas/cumeeiras",
  },
  chumbador(qtd),
];

export const CONFIG_ESMALTADA: ConfiguradorConfig = {
  sugestaoCumeeira: (s) => (s.cor ? { material: "Esmaltada", cor: s.cor } : null),
  produtoKey: "esmaltada",
  breadcrumb: BC("Telha Esmaltada"),
  titulo: "✨ Telha Esmaltada",
  subtitulo:
    "Telha cerâmica com esmalte vitrificado: cor viva e permanente, superfície impermeável e fácil de limpar.",
  galeriaTitulo: "Telha Esmaltada",
  galeriaPlaceholder: "Selecione uma cor para ver as fotos",
  imagens: (s) =>
    s.cor ? (imagensEsmaltada[s.cor] ?? [{ src: "", alt: `Telha Esmaltada ${s.cor}` }]) : [],
  categoria: "Telhas",
  passos: [
    { chave: "cor", titulo: "Cor do Esmalte", tipo: "grid3", opcoes: CORES_ESMALTADA },
    {
      chave: "qtd",
      titulo: "Quantidade",
      tipo: "quantidade",
      unidade: "peças",
      padrao: 100,
      passo: 10,
      nota: (_s, q) => `Cobertura estimada: ~${(q * 0.058).toFixed(1)} m² (~17 telhas por m²)`,
    },
  ],
  especificacoes: [
    ["Material", "Cerâmica esmaltada (vitrificada)"],
    ["Peças por m²", "~17 peças"],
    ["Inclinação mínima", "30%"],
    ["Absorção de água", "Muito baixa (esmalte impermeável)"],
    ["Acabamento", "Brilhante"],
    ["Fixação", "Prego telheiro ou arame"],
  ],
  tituloAcessorios: "Acessórios para Telha Esmaltada",
  acessorios: (s, q) => acessoriosEsmaltada(s.cor ?? "Vermelho", (q.qtd as number) ?? 100),
  resumoNome: () => "Telha Esmaltada",
  resumoDetalhe: (s, q) =>
    `${s.cor} · ${q.qtd ?? 100} peças · ~${(((q.qtd ?? 100) as number) * 0.058).toFixed(1)} m²`,
  unidadeResumo: () => "peças",
  idItem: (s) => `esmaltada-${s.cor}`,
  mensagem: (s, q) =>
    `✨ *Telha Esmaltada*\n• Cor: ${s.cor}\n• Quantidade: ${q.qtd ?? 100} peças\n• Cobertura estimada: ~${(((q.qtd ?? 100) as number) * 0.058).toFixed(1)} m²`,
};

const COMPRIMENTOS_PP = [
  { valor: "122 × 110 cm" },
  { valor: "153 × 110 cm" },
  { valor: "183 × 110 cm" },
  { valor: "213 × 110 cm" },
  { valor: "244 × 110 cm", badge: "★ Compatível com Fibro 244cm" },
  { valor: "244 × 92 cm" },
  { valor: "244 × 50 cm" },
  { valor: "305 × 110 cm" },
  { valor: "366 × 110 cm" },
];

const UTIL_PP: Record<string, number> = { "110": 1.05, "92": 0.87, "50": 0.45 };

const coberturaPP = (comp: string, q: number) => {
  if (!comp) return 0;
  const [c, l] = comp.replace(/\s|cm/g, "").split("×");
  const metros = parseFloat(c) / 100;
  const util = UTIL_PP[l] ?? 1.05;
  return Math.round((metros - 0.14) * util * q * 10) / 10;
};

export const CONFIG_POLIPROPILENO: ConfiguradorConfig = {
  breadcrumb: BC("Telha Translúcida Polipropileno"),
  titulo: "💡 Telha Translúcida Polipropileno",
  subtitulo:
    "Onda Alta 177/51 Translúcida de 122cm a 366cm, espessura única de 1,2mm. 100% compatível com telha de fibrocimento.",
  galeriaTitulo: "Telha Translúcida Polipropileno",
  galeriaPlaceholder: "Selecione um tamanho para ver as fotos",
  imagens: (s) =>
    s.comprimento ? [{ src: "", alt: `Telha Translúcida Polipropileno ${s.comprimento}` }] : [],
  categoria: "Telhas",
  produtoKey: "polipropileno",
  passos: [
    {
      chave: "comprimento",
      titulo: "Tamanho da Telha (comprimento × largura)",
      tipo: "chips",
      opcoes: COMPRIMENTOS_PP,
    },
    {
      chave: "qtd",
      titulo: "Quantidade",
      tipo: "quantidade",
      unidade: "peças",
      padrao: 5,
      nota: (s, q) =>
        `Cobertura estimada: ~${coberturaPP(s.comprimento, q)} m² (largura útil 1,05m, sobreposição 14cm)`,
    },
  ],
  especificacoes: [
    ["Marca", "Luxtelhas / Fibrarte"],
    ["Material", "Polipropileno translúcido leitoso"],
    ["Espessura", "1,2 mm (única)"],
    ["Inclinação mínima", "10%"],
    ["Sobreposição", "14 cm (igual ao fibrocimento)"],
    ["Larguras", "110 cm · 92 cm e 50 cm (apenas no comprimento 244 cm)"],
    ["Fixação", "Parafuso com vedação 110mm · apoios a cada 1,0 m"],
    ["Compatibilidade", "100% com telha fibrocimento INFIBRA"],
    ["Peso por peça", "Consultar disponibilidade"],
  ],
  informacoes: [
    {
      titulo: "Transmissão de luz",
      texto:
        "Acabamento translúcido leitoso, com alta transmissão de luz natural e claridade difusa. O fabricante não publica ficha técnica com o percentual exato de transmissão — por isso não informamos número fechado.",
    },
  ],

  tituloAcessorios: "Acessórios para Telha Plástica",
  acessorios: (_s, q) => acessoriosPlastico((q.qtd as number) ?? 5),
  resumoNome: () => "Telha Translúcida Polipropileno",
  resumoDetalhe: (s, q) =>
    `${s.comprimento} · ${q.qtd ?? 5} peças · ~${coberturaPP(s.comprimento, (q.qtd as number) ?? 5)} m²`,
  unidadeResumo: () => "peças",
  idItem: (s) => `polipropileno-${s.comprimento}`,
  mensagem: (s, q) =>
    `💡 *Telha Translúcida Polipropileno*\n• Comprimento: ${s.comprimento}\n• Quantidade: ${q.qtd ?? 5} peças\n• Cobertura estimada: ~${coberturaPP(s.comprimento, (q.qtd as number) ?? 5)} m²`,
};

const FORMATOS_VIDRO = [
  { valor: "Portuguesa", emoji: "🔷", sub: "Encaixe compatível com telha cerâmica portuguesa" },
  { valor: "Romana", emoji: "🔷", sub: "Encaixe compatível com telha cerâmica romana" },
  { valor: "Mediterrânea", emoji: "🔷", sub: "Encaixe compatível com telha cerâmica mediterrânea" },
];

export const CONFIG_VIDRO: ConfiguradorConfig = {
  breadcrumb: BC("Telha de Vidro"),
  titulo: "🔷 Telha de Vidro",
  subtitulo:
    "Iluminação natural ponto a ponto. Formatos Portuguesa, Romana e Mediterrânea, com encaixe idêntico ao da telha cerâmica.",
  galeriaTitulo: "Telha de Vidro",
  galeriaPlaceholder: "Selecione um formato para ver as fotos",
  imagens: (s) => (s.formato ? [{ src: "", alt: `Telha de Vidro ${s.formato}` }] : []),
  categoria: "Telhas",
  passos: [
    { chave: "formato", titulo: "Formato", tipo: "grid2", opcoes: FORMATOS_VIDRO },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "peças", padrao: 6 },
  ],
  especificacoes: [
    ["Material", "Vidro temperado transparente"],
    ["Formatos", "Portuguesa, Romana e Mediterrânea"],
    ["Compatibilidade", "Encaixe igual ao da telha cerâmica do mesmo formato"],
    ["Uso indicado", "Pontos de luz natural na cobertura"],
    ["Recomendação", "1 a 2 telhas de vidro a cada 4 m² de ambiente"],
  ],
  resumoNome: () => "Telha de Vidro",
  resumoDetalhe: (s, q) => `${s.formato} · ${q.qtd ?? 6} peças`,
  unidadeResumo: () => "peças",
  idItem: (s) => `vidro-${s.formato}`,
  mensagem: (s, q) =>
    `🔷 *Telha de Vidro*\n• Formato: ${s.formato}\n• Quantidade: ${q.qtd ?? 6} peças`,
};
