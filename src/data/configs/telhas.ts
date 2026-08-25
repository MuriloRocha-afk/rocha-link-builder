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
];

export const CONFIG_CONCRETO: ConfiguradorConfig = {
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
  { valor: "Preto", cor: "#2B2B2B" },
  { valor: "Azul", cor: "#2E5D8C" },
  { valor: "Verde", cor: "#2F6B4F" },
  { valor: "Marrom", cor: "#6B4530" },
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
    "Onda Alta 177/51 Translúcida de 153cm a 366cm. 100% compatível com telha de fibrocimento.",
  galeriaTitulo: "Telha Translúcida Polipropileno",
  galeriaPlaceholder: "Selecione um comprimento para ver as fotos",
  imagens: (s) =>
    s.comprimento ? [{ src: "", alt: `Telha Translúcida Polipropileno ${s.comprimento}` }] : [],
  categoria: "Telhas",
  passos: [
    {
      chave: "comprimento",
      titulo: "Comprimento da Telha",
      tipo: "grid2",
      opcoes: COMPRIMENTOS_PP.map((o) => ({ ...o, emoji: "📏" })),
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
    ["Espessura", "1,2 mm (única)"],
    ["Inclinação mínima", "10%"],
    ["Sobreposição", "14 cm (igual ao fibrocimento)"],
    ["Larguras", "110 cm · 92 cm e 50 cm (apenas no comprimento 244 cm)"],
    ["Fixação", "Parafuso com vedação 110mm"],
    ["Compatibilidade", "100% com telha fibrocimento INFIBRA"],
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
  { valor: "Americana", emoji: "🔷", sub: "Encaixe compatível com telha cerâmica americana" },
];

export const CONFIG_VIDRO: ConfiguradorConfig = {
  breadcrumb: BC("Telha de Vidro"),
  titulo: "🔷 Telha de Vidro",
  subtitulo:
    "Iluminação natural ponto a ponto. Formatos Portuguesa, Romana e Americana, com encaixe idêntico ao da telha cerâmica.",
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
    ["Formatos", "Portuguesa, Romana e Americana"],
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

const TIPOS_CUMEEIRA = [
  { valor: "Barro Resinada", emoji: "🪨", sub: "Mesclada ou Larga Resinada" },
  { valor: "Concreto", emoji: "🏗️", sub: "3 Vias, Inicial, Cinza, Cores, Tabaco" },
  {
    valor: "Esmaltada",
    emoji: "✨",
    sub: "Vitrificada · Vermelho, Branco, Preto, Azul, Verde ou Marrom",
  },
  { valor: "PVC Central Fixa", emoji: "🟧", sub: "53cm × 86cm · Cerâmica, Cinza ou Marfim" },
  { valor: "PVC Central Articulada", emoji: "🟧", sub: "53cm × 86cm · Cerâmica, Cinza ou Marfim" },
  { valor: "PVC Lateral Articulada", emoji: "🟧", sub: "53cm × 103cm · Cerâmica, Cinza ou Marfim" },
  { valor: "PVC Triangular 3 Vias", emoji: "🟧", sub: "Cerâmica, Cinza ou Marfim" },
  { valor: "Fibrocimento 90°", emoji: "⬛", sub: "Shed · 110cm × 6cm" },
  { valor: "Fibrocimento Articulada", emoji: "⬛", sub: "110cm × 6mm" },
  { valor: "Fibrocimento Normal 15°", emoji: "⬛", sub: "092cm e 110cm × 60cm × 6mm" },
  { valor: "Fibrocimento Universal 45° a 75°", emoji: "⬛" },
];

const variacoesCumeeira = (tipo: string) => {
  if (tipo?.startsWith("PVC")) return ["Cerâmica", "Cinza", "Marfim"];
  if (tipo === "Concreto") return ["3 Vias", "Inicial", "Cinza", "Cores", "Tabaco"];
  if (tipo === "Barro Resinada") return ["Mesclada", "Larga Resinada"];
  if (tipo === "Esmaltada") return ["Vermelho", "Branco", "Preto", "Azul", "Verde", "Marrom"];
  return [];
};

export const CONFIG_CUMEEIRAS: ConfiguradorConfig = {
  breadcrumb: BC("Cumeeiras & Acessórios"),
  titulo: "🔺 Cumeeiras & Acessórios de Cobertura",
  subtitulo:
    "Barro, concreto, esmaltada, PVC e fibrocimento. Tudo para fechar e arrematar qualquer cobertura.",
  galeriaTitulo: "Cumeeiras",
  galeriaPlaceholder: "Selecione um tipo para ver as fotos",
  imagens: (s) => (s.tipo ? [{ src: "", alt: `Cumeeira ${s.tipo}` }] : []),
  categoria: "Telhas",
  passos: [
    { chave: "tipo", titulo: "Tipo de Cumeeira", tipo: "lista", opcoes: TIPOS_CUMEEIRA },
    {
      chave: "variacao",
      titulo: "Cor / Variação",
      tipo: "chips",
      visivel: (s) => variacoesCumeeira(s.tipo).length > 0,
      opcoes: (s) => variacoesCumeeira(s.tipo).map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "peças", padrao: 10 },
  ],
  resumoNome: () => "Cumeeira",
  resumoDetalhe: (s, q) =>
    `${s.tipo}${s.variacao ? ` · ${s.variacao}` : ""} · ${q.qtd ?? 10} peças`,
  unidadeResumo: () => "peças",
  idItem: (s) => `cumeeira-${s.tipo}-${s.variacao ?? ""}`,
  mensagem: (s, q) =>
    `🔺 *Cumeeira*\n• Tipo: ${s.tipo}${s.variacao ? `\n• Variação: ${s.variacao}` : ""}\n• Quantidade: ${q.qtd ?? 10} peças`,
};
