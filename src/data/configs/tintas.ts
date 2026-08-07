import type { ConfiguradorConfig } from "@/components/site/ConfiguradorGenerico";

const BC = (nome: string) => [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Tintas", href: "/catalogo/tintas" },
  { label: nome },
];

const VOLUMES_VERNIZ: Record<string, string[]> = {
  "Anjo Verniz Dura Mais — Natural Brilhante": ["900ml", "3,6L", "18L"],
  "Anjo Verniz Marítimo Premium — Natural": ["3,6L", "18L"],
  "Sayerlack Polisten": ["900ml", "3,6L"],
  "Sayerlack Sayermar Verniz Marítimo": ["750ml", "3L"],
  "Irajá Verniz": ["3,6L"],
};

const CORES_VERNIZ: Record<string, string[]> = {
  "Sayerlack Polisten": ["Imbuia", "Mogno Inglês", "Transparente"],
  "Irajá Verniz": ["Cerejeira", "Imbuia", "Incolor"],
};

export const CONFIG_VERNIZ: ConfiguradorConfig = {
  breadcrumb: BC("Verniz para Madeira"),
  titulo: "✨ Verniz para Madeira",
  subtitulo:
    "Anjo Dura Mais, Marítimo Premium, Sayerlack Polisten e Sayermar. Proteção e beleza para madeira.",
  galeriaTitulo: "Verniz para Madeira",
  galeriaPlaceholder: "Selecione a marca para ver as fotos",
  imagens: (s) => (s.marca ? [{ src: "", alt: s.marca }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "marca",
      titulo: "Marca",
      tipo: "lista",
      opcoes: Object.keys(VOLUMES_VERNIZ).map((v) => ({ valor: v })),
    },
    {
      chave: "cor",
      titulo: "Cor",
      tipo: "chips",
      visivel: (s) => Boolean(CORES_VERNIZ[s.marca]),
      opcoes: (s) => (CORES_VERNIZ[s.marca] ?? []).map((v) => ({ valor: v })),
    },
    {
      chave: "volume",
      titulo: "Volume",
      tipo: "grid3",
      opcoes: (s) => (VOLUMES_VERNIZ[s.marca] ?? []).map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: (s) => s.marca ?? "Verniz para Madeira",
  resumoDetalhe: (s, q) =>
    `${s.cor ? `${s.cor} · ` : ""}${s.volume} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `verniz-${s.marca}-${s.cor ?? ""}-${s.volume}`,
  mensagem: (s, q) =>
    `✨ *${s.marca}${s.cor ? ` — ${s.cor}` : ""}*\n• Volume: ${s.volume}\n• Quantidade: ${q.qtd ?? 1} un`,
};

export const CONFIG_STAIN: ConfiguradorConfig = {
  breadcrumb: BC("Stain para Madeira"),
  titulo: "🪵 Stain para Madeira",
  subtitulo:
    "Anjo Stain Casa em 4 cores. Penetra na fibra, realça o veio e protege contra UV e umidade.",
  galeriaTitulo: "Anjo Stain Casa",
  galeriaPlaceholder: "Selecione a cor para ver as fotos",
  imagens: (s) => (s.cor ? [{ src: "", alt: `Anjo Stain Casa ${s.cor}` }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "cor",
      titulo: "Cor",
      tipo: "chips",
      opcoes: [
        { valor: "Imbuia", cor: "#8B5A2B" },
        { valor: "Ipê", cor: "#4B3621" },
        { valor: "Mogno", cor: "#8B3A2A" },
        { valor: "Incolor", cor: "#EFE7DA" },
      ],
    },
    {
      chave: "volume",
      titulo: "Volume",
      tipo: "grid3",
      opcoes: ["900ml", "3,6L", "18L"].map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: () => "Anjo Stain Casa",
  resumoDetalhe: (s, q) => `${s.cor} Acetinado · ${s.volume} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `stain-${s.cor}-${s.volume}`,
  mensagem: (s, q) =>
    `🪵 *Anjo Stain Casa*\n• Cor: ${s.cor} Acetinado\n• Volume: ${s.volume}\n• Quantidade: ${q.qtd ?? 1} un`,
};

export const CONFIG_TINTA_ACRILICA: ConfiguradorConfig = {
  breadcrumb: BC("Tinta Acrílica"),
  titulo: "🎨 Tinta Acrílica",
  subtitulo:
    "Anjo Emborrachada e AnjoMais Premium. Para telhados, fachadas e superfícies externas.",
  galeriaTitulo: "Tinta Acrílica",
  galeriaPlaceholder: "Selecione a linha para ver as fotos",
  imagens: (s) => (s.linha ? [{ src: "", alt: s.linha }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "linha",
      titulo: "Linha",
      tipo: "grid2",
      opcoes: [
        { valor: "Anjo Emborrachada", sub: "Tinta acrílica clássica" },
        { valor: "AnjoMais Premium", sub: "Alta cobertura", badge: "★ Recomendada" },
      ],
    },
    {
      chave: "base",
      titulo: "Base",
      tipo: "grid3",
      visivel: (s) => s.linha === "AnjoMais Premium",
      opcoes: ["Base A", "Base B", "Base C"].map((v) => ({ valor: v })),
    },
    {
      chave: "volume",
      titulo: "Volume",
      tipo: "grid2",
      opcoes: (s) =>
        (s.linha === "AnjoMais Premium" ? ["3,24L", "16,2L"] : ["3,6L", "18L"]).map((v) => ({
          valor: v,
        })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: (s) => s.linha ?? "Tinta Acrílica",
  resumoDetalhe: (s, q) => `${s.base ? `${s.base} · ` : ""}${s.volume} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `acrilica-${s.linha}-${s.base ?? ""}-${s.volume}`,
  mensagem: (s, q) =>
    `🎨 *${s.linha}*\n• Volume/Base: ${s.base ? `${s.base} · ` : ""}${s.volume}\n• Quantidade: ${q.qtd ?? 1} un`,
};

const CORES_TOMPLUS = [
  "Preto",
  "Cinza Escuro",
  "Cinza Médio",
  "Conhaque",
  "Tabaco",
  "Vermelho",
  "Verde Folha",
  "Gelo",
  "Platina",
  "Amarelo",
];

export const CONFIG_ESMALTE: ConfiguradorConfig = {
  breadcrumb: BC("Esmalte Sintético"),
  titulo: "🖌️ Esmalte Sintético",
  subtitulo:
    "Anjo Tomplus e E.S Fluence em várias cores. Acabamento duro, brilhante e lavável.",
  galeriaTitulo: "Esmalte Sintético",
  galeriaPlaceholder: "Selecione a linha para ver as fotos",
  imagens: (s) => (s.linha ? [{ src: "", alt: s.linha }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "linha",
      titulo: "Linha",
      tipo: "grid2",
      opcoes: [
        { valor: "Anjo Esmalte Tomplus", sub: "Várias cores vibrantes" },
        { valor: "Anjo E.S Fluence", sub: "Branco e cores neutras" },
      ],
    },
    {
      chave: "cor",
      titulo: "Cor",
      tipo: "chips",
      visivel: (s) => s.linha === "Anjo Esmalte Tomplus",
      opcoes: CORES_TOMPLUS.map((v) => ({ valor: v })),
    },
    {
      chave: "volume",
      titulo: "Volume",
      tipo: "grid2",
      opcoes: ["900ml", "3,6L"].map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: (s) => s.linha ?? "Esmalte Sintético",
  resumoDetalhe: (s, q) => `${s.cor ? `${s.cor} · ` : ""}${s.volume} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `esmalte-${s.linha}-${s.cor ?? ""}-${s.volume}`,
  mensagem: (s, q) =>
    `🖌️ *Esmalte Sintético ${s.linha}*${s.cor ? `\n• Cor: ${s.cor}` : ""}\n• Volume: ${s.volume}\n• Quantidade: ${q.qtd ?? 1} un`,
};

const SELADORAS: { nome: string; volumes: string[] }[] = [
  { nome: "Anjo Selador Acrílico Pigmentado", volumes: ["3,6L"] },
  { nome: "Anjo Seladora Para Madeiras e Móveis", volumes: ["900ml", "3,6L", "18L"] },
  { nome: "Anjo Fundo Preparador de Paredes — Branco Fosco", volumes: ["18L"] },
  { nome: "Primer Base Água", volumes: ["3,6L", "18L"] },
  { nome: "Vedacit Penetrol", volumes: ["900ml", "3,6L"] },
  { nome: "Vedacit Vedalit", volumes: ["1L", "3,6L", "18L"] },
  { nome: "Vedacit Primer Base Água", volumes: ["1L"] },
  { nome: "Vedapren Parede Branco", volumes: ["3,6L"] },
];

export const CONFIG_SELADORA: ConfiguradorConfig = {
  breadcrumb: BC("Seladora, Primer & Impermeabilização"),
  titulo: "🛡️ Seladora, Primer & Impermeabilização",
  subtitulo: "Anjo, Vedacit e mais. Base perfeita para qualquer tipo de acabamento.",
  galeriaTitulo: "Seladora / Primer",
  galeriaPlaceholder: "Selecione o produto para ver as fotos",
  imagens: (s) => (s.produto ? [{ src: "", alt: s.produto }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "produto",
      titulo: "Produto",
      tipo: "lista",
      opcoes: SELADORAS.map((p) => ({ valor: p.nome, sub: p.volumes.join(" · ") })),
    },
    {
      chave: "volume",
      titulo: "Volume",
      tipo: "grid3",
      opcoes: (s) =>
        (SELADORAS.find((p) => p.nome === s.produto)?.volumes ?? []).map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: (s) => s.produto ?? "Seladora / Primer",
  resumoDetalhe: (s, q) => `${s.volume} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `seladora-${s.produto}-${s.volume}`,
  mensagem: (s, q) =>
    `🛡️ *${s.produto} ${s.volume}*\n• Quantidade: ${q.qtd ?? 1} un`,
};

const VOLUMES_CUPIM: Record<string, string[]> = {
  "Apus Química": ["900ml", "5L"],
  Ecol: ["900ml", "5L", "18L"],
  "Sayerlack Exterminador": ["900ml"],
};

export const CONFIG_CUPICIDA: ConfiguradorConfig = {
  breadcrumb: BC("Proteção contra Cupim"),
  titulo: "🌿 Proteção contra Cupim",
  subtitulo: "Apus Química e Ecol. Preventivo e curativo para estruturas de madeira.",
  galeriaTitulo: "Exterminador de Cupim",
  galeriaPlaceholder: "Selecione a marca para ver as fotos",
  imagens: (s) => (s.marca ? [{ src: "", alt: `Exterminador de Cupim ${s.marca}` }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "marca",
      titulo: "Marca",
      tipo: "lista",
      opcoes: [
        { valor: "Apus Química", sub: "Exterminador de Cupim" },
        { valor: "Ecol", sub: "Exterminador de Cupim" },
        { valor: "Sayerlack Exterminador", sub: "900ml" },
      ],
    },
    {
      chave: "volume",
      titulo: "Volume",
      tipo: "grid3",
      opcoes: (s) => (VOLUMES_CUPIM[s.marca] ?? []).map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: (s) => `Exterminador de Cupim — ${s.marca ?? ""}`,
  resumoDetalhe: (s, q) => `${s.volume} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `cupicida-${s.marca}-${s.volume}`,
  mensagem: (s, q) =>
    `🌿 *Exterminador de Cupim — ${s.marca}*\n• Volume: ${s.volume}\n• Quantidade: ${q.qtd ?? 1} un`,
};

const THINNERS = [
  "Anjo Thinner — Limpeza e Diluição 900ml",
  "Anjo Thinner — Limpeza e Diluição 5L",
  "Anjo Diluente Premium — 900ml",
  "Anjo Diluente Seladora Madeiras e Móveis — 900ml",
  "Anjo Diluente Seladora Madeiras e Móveis — 5L",
  "Anjo Diluente Seladora Madeiras e Móveis — 18L",
  "Aguarraz Mineral — 900ml",
  "Anjo Aguarras Mineral — 5L",
  "Sayerlack Thinner Profissional — 900ml",
  "Thinner Eucatex — 900ml",
  "Anjo Diluente para Tinta — 900ml",
];

export const CONFIG_THINNER: ConfiguradorConfig = {
  breadcrumb: BC("Thinner & Diluentes"),
  titulo: "🧪 Thinner & Diluentes",
  subtitulo: "Anjo Thinner, Aguarraz e Diluentes. Para limpeza e diluição de tintas e vernizes.",
  galeriaTitulo: "Thinner & Diluentes",
  galeriaPlaceholder: "Foto em breve",
  imagens: () => [{ src: "", alt: "Linha de thinners e diluentes Anjo" }],
  categoria: "Tintas",
  passos: [
    {
      chave: "produto",
      titulo: "Produto",
      tipo: "lista",
      opcoes: THINNERS.map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: (s) => s.produto ?? "Thinner & Diluentes",
  resumoDetalhe: (_s, q) => `${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `thinner-${s.produto}`,
  mensagem: (s, q) => `🧪 *${s.produto}*\n• Quantidade: ${q.qtd ?? 1} un`,
};
