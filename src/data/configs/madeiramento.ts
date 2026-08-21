import type { ConfiguradorConfig } from "@/components/site/ConfiguradorGenerico";

const BC = (nome: string) => [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Madeiramento", href: "/catalogo/madeiramento" },
  { label: nome },
];

const BITOLAS_PEROBA: Record<string, string[]> = {
  Viga: ["5x11cm", "5x15cm", "5x20cm", "6x12cm", "8x16cm", "8x20cm"],
  Caibro: ["5x5cm", "5x6cm", "5x7cm"],
  Caibrão: ["6x8cm", "7x9cm", "8x8cm"],
  Ripa: ["1,5x5cm"],
  Ripão: ["2x5cm", "2x7cm"],
  Sarrafo: ["2,5x5cm", "2,5x7cm", "2,5x10cm"],
  Tábua: ["2,5x20cm", "2,5x25cm", "2,5x30cm"],
};

const COMPRIMENTOS_PEROBA = [
  "1,0m",
  "1,5m",
  "2,0m",
  "2,5m",
  "3,0m",
  "3,5m",
  "4,0m",
  "4,5m",
  "5,0m",
  "5,5m",
  "6,0m",
];

export const CONFIG_PEROBA: ConfiguradorConfig = {
  breadcrumb: BC("Peroba do Norte / D'Água"),
  titulo: "🌳 Peroba do Norte / D'Água",
  subtitulo:
    "Madeira nativa de alta resistência para estruturas de telhado. Bruta ou aparelhada em plaina no nosso pátio.",
  galeriaTitulo: "Peroba do Norte / D'Água",
  galeriaPlaceholder: "Selecione o tipo de peça para ver as fotos",
  imagens: (s) => (s.peca ? [{ src: "", alt: `Peroba do Norte — ${s.peca}` }] : []),
  categoria: "Madeiramento",
  passos: [
    {
      chave: "peca",
      titulo: "Tipo de Peça",
      tipo: "lista",
      opcoes: Object.keys(BITOLAS_PEROBA).map((v) => ({ valor: v })),
    },
    {
      chave: "bitola",
      titulo: "Bitola (Espessura × Largura)",
      tipo: "chips",
      visivel: (s) => Boolean(s.peca),
      opcoes: (s) => (BITOLAS_PEROBA[s.peca] ?? []).map((v) => ({ valor: v })),
    },
    {
      chave: "comprimento",
      titulo: "Comprimento",
      tipo: "chips",
      opcoes: COMPRIMENTOS_PEROBA.map((v) => ({ valor: v })),
    },
    {
      chave: "acabamento",
      titulo: "Aparelhagem",
      tipo: "grid2",
      opcoes: [
        { valor: "Bruto", sub: "Superfície natural da serra · mais econômico" },
        { valor: "Aparelhado", sub: "Aparelhado em plaina industrial", badge: "★ Recomendado" },
      ],
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "peças", padrao: 10 },
  ],
  especificacoes: [
    ["Espécie", "Peroba do Norte / Peroba d'Água"],
    ["Peças", "Viga, Caibro, Caibrão, Ripa, Ripão, Sarrafo e Tábua"],
    ["Comprimentos", "1,0m a 6,0m"],
    ["Aparelhagem", "Bruto ou aparelhado em plaina"],
    ["Origem", "DOF/IBAMA legalizado"],
  ],
  resumoNome: () => "Peroba do Norte / D'Água",
  resumoDetalhe: (s, q) =>
    `${s.peca} ${s.bitola ?? ""} · ${s.comprimento} · ${s.acabamento} · ${q.qtd ?? 10} peças`,
  unidadeResumo: () => "peças",
  idItem: (s) => `peroba-${s.peca}-${s.bitola}-${s.comprimento}-${s.acabamento}`,
  mensagem: (s, q) =>
    `🌳 *Peroba do Norte / D'Água*\n• Tipo: ${s.peca}\n• Bitola: ${s.bitola}\n• Comprimento: ${s.comprimento}\n• Aparelhagem: ${s.acabamento}\n• Quantidade: ${q.qtd ?? 10} peças`,
};

const PECAS_GARAPEIRA = [
  "Sarrafo 05cm × 2,3cm",
  "Sarrafo 07cm × 2,3cm",
  "Sarrafo 10cm × 2,3cm",
  "Sarrafo 15cm × 2,3cm",
  "Tábua 2,3cm × 20cm",
  "Tábua 2,3cm × 25cm",
  "Tábua 2,3cm × 30cm",
];

export const CONFIG_GARAPEIRA: ConfiguradorConfig = {
  breadcrumb: BC("Garapeira"),
  titulo: "💪 Garapeira",
  subtitulo:
    "Madeira dura nativa. Barrotes, caibros, vigas e dormentes para estruturas de alta resistência.",
  galeriaTitulo: "Garapeira",
  galeriaPlaceholder: "Selecione o tipo para ver as fotos",
  imagens: (s) => (s.peca ? [{ src: "", alt: `Garapeira — ${s.peca}` }] : []),
  categoria: "Madeiramento",
  passos: [
    {
      chave: "peca",
      titulo: "Tipo de Peça",
      tipo: "lista",
      opcoes: PECAS_GARAPEIRA.map((v) => ({ valor: v })),
    },
    {
      chave: "acabamento",
      titulo: "Acabamento",
      tipo: "grid2",
      opcoes: [
        { valor: "Bruto", sub: "mais econômico" },
        { valor: "Aparelhado", badge: "★ Recomendado" },
      ],
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "Mt", padrao: 10 },
  ],
  resumoNome: () => "Garapeira",
  resumoDetalhe: (s, q) => `${s.peca} · ${s.acabamento} · ${q.qtd ?? 10} Mt`,
  unidadeResumo: () => "Mt",
  idItem: (s) => `garapeira-${s.peca}-${s.acabamento}`,
  mensagem: (s, q) =>
    `💪 *Garapeira*\n• Peça: ${s.peca}\n• Acabamento: ${s.acabamento}\n• Quantidade: ${q.qtd ?? 10} Mt`,
};

const PECAS_AMESCLA = [
  "Sarrafo 05cm × 2,3cm",
  "Sarrafo 10cm × 2,3cm",
  "Sarrafo 15cm × 2,3cm",
  "Tábua 2,3cm × 20cm",
  "Tábua 2,3cm × 25cm",
  "Tábua 2,3cm × 30cm",
];

export const CONFIG_AMESCLA: ConfiguradorConfig = {
  breadcrumb: BC("Amescla"),
  titulo: "📦 Amescla",
  subtitulo: "Sarrafos e tábuas em bruto. Opção econômica para estruturas secundárias.",
  galeriaTitulo: "Amescla",
  galeriaPlaceholder: "Selecione o tipo para ver as fotos",
  imagens: (s) => (s.peca ? [{ src: "", alt: `Amescla — ${s.peca}` }] : []),
  categoria: "Madeiramento",
  passos: [
    {
      chave: "peca",
      titulo: "Tipo de Peça",
      tipo: "lista",
      opcoes: PECAS_AMESCLA.map((v) => ({ valor: v })),
    },
    {
      chave: "qtd",
      titulo: "Quantidade",
      tipo: "quantidade",
      unidade: "Mt",
      padrao: 10,
      aviso: "Vendido em bruto — sem beneficiamento",
    },
  ],
  resumoNome: () => "Amescla",
  resumoDetalhe: (s, q) => `${s.peca} · ${q.qtd ?? 10} Mt`,
  unidadeResumo: () => "Mt",
  idItem: (s) => `amescla-${s.peca}`,
  mensagem: (s, q) => `📦 *Amescla*\n• Peça: ${s.peca}\n• Quantidade: ${q.qtd ?? 10} Mt`,
};

const CAT_TABEIRAS = [
  { valor: "Tabeiras Desenhadas", emoji: "🎨", sub: "15cm, 20cm, 25cm e 30cm" },
  { valor: "Deck Cumaru Mesclado", emoji: "🟤", sub: "10cm × 2cm por m²" },
  { valor: "Deck Garapeia", emoji: "🟫", sub: "8cm × 2cm por m²" },
  { valor: "Deck Pinus Tratado", emoji: "🌲", sub: "10cm × 2cm por m²" },
];

const altTabeiras = (cat: string) =>
  cat === "Tabeiras Desenhadas"
    ? "Tabeira desenhada instalada"
    : cat === "Deck Cumaru Mesclado"
      ? "Deck de Cumaru Mesclado"
      : cat === "Deck Garapeia"
        ? "Deck Garapeia 8cm"
        : "Deck Pinus Tratado";

const ehTabeira = (s: Record<string, string>) => s.categoria === "Tabeiras Desenhadas";
const ehDeck = (s: Record<string, string>) =>
  Boolean(s.categoria) && s.categoria !== "Tabeiras Desenhadas";
const especieDeck = (cat: string) => cat.replace("Deck ", "");

export const CONFIG_TABEIRAS_DECK: ConfiguradorConfig = {
  breadcrumb: BC("Tabeiras & Deck"),
  titulo: "🎨 Tabeiras & Deck",
  subtitulo:
    "Tabeiras desenhadas de 15cm a 30cm em 6 modelos e deck de cumaru, garapeia e pinus tratado.",
  galeriaTitulo: "Tabeiras & Deck",
  galeriaPlaceholder: "Selecione uma categoria para ver as fotos",
  imagens: (s) => (s.categoria ? [{ src: "", alt: altTabeiras(s.categoria) }] : []),
  categoria: "Madeiramento",
  passos: [
    { chave: "categoria", titulo: "Categoria", tipo: "grid2", opcoes: CAT_TABEIRAS },
    {
      chave: "largura",
      titulo: "Largura da Tabeira",
      tipo: "grid2",
      visivel: ehTabeira,
      opcoes: ["15cm", "20cm", "25cm", "30cm"].map((v) => ({ valor: v })),
    },
    {
      chave: "modelo",
      titulo: "Modelo",
      tipo: "grid3",
      visivel: ehTabeira,
      opcoes: [1, 2, 3, 4, 5, 6].map((n) => ({ valor: `Modelo ${n}` })),
    },
    {
      chave: "qtdTabeira",
      titulo: "Quantidade",
      tipo: "quantidade",
      unidade: "Mt",
      padrao: 10,
      visivel: ehTabeira,
    },
    {
      chave: "area",
      titulo: "Área em m²",
      tipo: "quantidade",
      unidade: "m²",
      padrao: 10,
      decimal: true,
      visivel: ehDeck,
      nota: (_s, q) => `+15% sugerido para perdas → ${(q * 1.15).toFixed(1)} m² total`,
    },
  ],
  resumoNome: (s) =>
    ehTabeira(s) ? "Tabeira Desenhada" : `Deck ${especieDeck(s.categoria ?? "")}`,
  resumoDetalhe: (s, q) =>
    ehTabeira(s)
      ? `${s.largura} · ${s.modelo} · ${q.qtdTabeira ?? 10} Mt`
      : `${(((q.area as number) ?? 10) * 1.15).toFixed(1)} m² (inclui 15% de perda)`,
  unidadeResumo: (s) => (ehTabeira(s) ? "Mt" : "m²"),
  idItem: (s) => `tabeiras-deck-${s.categoria}-${s.largura ?? ""}-${s.modelo ?? ""}`,
  mensagem: (s, q) =>
    ehTabeira(s)
      ? `🎨 *Tabeira Desenhada*\n• Largura: ${s.largura} · ${s.modelo?.replace("Modelo ", "Modelo nº ")}\n• Quantidade: ${q.qtdTabeira ?? 10} Mt`
      : `🟤 *Deck ${especieDeck(s.categoria ?? "")}*\n• Área: ${(((q.area as number) ?? 10) * 1.15).toFixed(1)} m² (inclui 15% de perda)\n• Espécie: ${especieDeck(s.categoria ?? "")}`,
};

const DIAMETROS = [
  "4cm × 6cm",
  "6cm × 8cm",
  "8cm × 10cm",
  "10cm × 12cm",
  "12cm × 14cm",
  "14cm × 16cm",
  "16cm × 18cm",
  "18cm × 20cm",
];
const COMPRIMENTOS_MOURAO = [
  "2,20m",
  "2,50m",
  "3,00m",
  "4,00m",
  "5,00m",
  "6,00m",
  "7,00m",
  "8,00m",
  "9,00m",
  "10,00m",
];

export const CONFIG_MOURAO: ConfiguradorConfig = {
  produtoKey: "mourao",
  breadcrumb: BC("Mourão Tratado"),
  titulo: "🌾 Mourão Tratado",
  subtitulo:
    "Autoclave de 4cm a 20cm de diâmetro e 2,20m a 10m de comprimento. Cercas e estruturas rurais.",
  tagInfo: "✓ Tratado em Autoclave · Reflorestamento",
  galeriaTitulo: "Mourão Tratado",
  galeriaPlaceholder: "Selecione o diâmetro para ver as fotos",
  imagens: (s) => (s.diametro ? [{ src: "", alt: `Mourão Tratado ${s.diametro}` }] : []),
  categoria: "Madeiramento",
  passos: [
    {
      chave: "diametro",
      titulo: "Diâmetro",
      tipo: "chips",
      opcoes: DIAMETROS.map((v) => ({ valor: v })),
    },
    {
      chave: "comprimento",
      titulo: "Comprimento",
      tipo: "grid3",
      opcoes: COMPRIMENTOS_MOURAO.map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "peças", padrao: 10 },
  ],
  especificacoes: [
    ["Tratamento", "Autoclave — CCA Tipo C"],
    ["Uso", "Cercas, estruturas rurais, fundações"],
    ["Durabilidade", "10 a 25 anos no solo"],
  ],
  resumoNome: () => "Mourão Tratado",
  resumoDetalhe: (s, q) => `${s.diametro} · ${s.comprimento} · ${q.qtd ?? 10} peças`,
  unidadeResumo: () => "peças",
  idItem: (s) => `mourao-${s.diametro}-${s.comprimento}`,
  mensagem: (s, q) =>
    `🌾 *Mourão Tratado*\n• Diâmetro: ${s.diametro}\n• Comprimento: ${s.comprimento}\n• Quantidade: ${q.qtd ?? 10} peças`,
};
