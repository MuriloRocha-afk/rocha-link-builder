import type { ConfiguradorConfig } from "@/components/site/ConfiguradorGenerico";

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
  subtitulo:
    "Areia, Cinza e Grafite — linha Eurotop. Durabilidade máxima e acabamento premium.",
  galeriaTitulo: "Telha de Concreto Eurotop",
  galeriaPlaceholder: "Selecione uma cor para ver as fotos",
  imagens: (s) =>
    s.cor ? [{ src: "", alt: `Telha de Concreto ${s.cor} Eurotop` }] : [],
  categoria: "Telhas",
  passos: [
    { chave: "cor", titulo: "Cor / Acabamento", tipo: "grid3", opcoes: CORES_CONCRETO },
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
  mensagem: (s, q) =>
    `🏗️ *Telha de Concreto Eurotop*\n• Cor: ${s.cor}\n• Quantidade: ${q.qtd ?? 100} peças\n• Cobertura estimada: ~${(((q.qtd ?? 100) as number) * 0.063).toFixed(1)} m²`,
};

const COMPRIMENTOS_PP = [
  { valor: "153 × 110 cm" },
  { valor: "183 × 110 cm" },
  { valor: "213 × 110 cm" },
  { valor: "244 × 110 cm", badge: "★ Compatível com Fibro 244cm" },
  { valor: "305 × 110 cm" },
  { valor: "366 × 110 cm" },
];

const coberturaPP = (comp: string, q: number) => {
  const metros = parseFloat(comp) / 100;
  return Math.round((metros - 0.14) * 1.05 * q * 10) / 10;
};

export const CONFIG_POLIPROPILENO: ConfiguradorConfig = {
  breadcrumb: BC("Telha Translúcida Polipropileno"),
  titulo: "💡 Telha Translúcida Polipropileno",
  subtitulo:
    "Onda Alta 177/51 Translúcida de 153cm a 366cm. 100% compatível com telha de fibrocimento.",
  galeriaTitulo: "Telha Translúcida Polipropileno",
  galeriaPlaceholder: "Selecione um comprimento para ver as fotos",
  imagens: (s) =>
    s.comprimento
      ? [{ src: "", alt: `Telha Translúcida Polipropileno ${s.comprimento}` }]
      : [],
  categoria: "Telhas",
  passos: [
    { chave: "comprimento", titulo: "Comprimento", tipo: "lista", opcoes: COMPRIMENTOS_PP },
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
    ["Inclinação mínima", "10%"],
    ["Sobreposição", "14 cm (igual ao fibrocimento)"],
    ["Largura útil", "1,05 m"],
    ["Fixação", "Parafuso com vedação 110mm"],
    ["Compatibilidade", "100% com telha fibrocimento INFIBRA"],
  ],
  resumoNome: () => "Telha Translúcida Polipropileno",
  resumoDetalhe: (s, q) =>
    `${s.comprimento} · ${q.qtd ?? 5} peças · ~${coberturaPP(s.comprimento, (q.qtd as number) ?? 5)} m²`,
  unidadeResumo: () => "peças",
  idItem: (s) => `polipropileno-${s.comprimento}`,
  mensagem: (s, q) =>
    `💡 *Telha Translúcida Polipropileno*\n• Comprimento: ${s.comprimento}\n• Quantidade: ${q.qtd ?? 5} peças\n• Cobertura estimada: ~${coberturaPP(s.comprimento, (q.qtd as number) ?? 5)} m²`,
};

const TIPOS_CUMEEIRA = [
  { valor: "Barro Resinada", emoji: "🪨", sub: "Mesclada ou Larga Resinada" },
  { valor: "Concreto", emoji: "🏗️", sub: "3 Vias, Inicial, Cinza, Cores, Tabaco" },
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
  return [];
};

export const CONFIG_CUMEEIRAS: ConfiguradorConfig = {
  breadcrumb: BC("Cumeeiras & Acessórios"),
  titulo: "🔺 Cumeeiras & Acessórios de Cobertura",
  subtitulo:
    "Barro, concreto, PVC e fibrocimento. Tudo para fechar e arrematar qualquer cobertura.",
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
