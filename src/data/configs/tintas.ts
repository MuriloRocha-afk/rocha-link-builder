import type { ConfiguradorConfig } from "@/components/site/ConfiguradorGenerico";

const BC = (nome: string) => [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Tintas", href: "/catalogo/tintas" },
  { label: nome },
];

/* ---------------- Verniz Sayerlack Polirex ---------------- */

const CORES_VERNIZ: Record<string, string[]> = {
  Imbuia: ["230ml", "900ml", "3,6L"],
  Mogno: ["900ml", "3,6L"],
};

export const CONFIG_VERNIZ: ConfiguradorConfig = {
  produtoKey: "verniz",
  breadcrumb: BC("Verniz para Madeira"),
  titulo: "✨ Verniz para Madeira — Sayerlack Polirex",
  subtitulo:
    "Verniz restaurador Sayerlack Polirex. Recupera e protege madeiras já envernizadas, sem remover o acabamento antigo.",
  galeriaTitulo: "Verniz Sayerlack Polirex",
  galeriaPlaceholder: "Selecione a cor para ver as fotos",
  imagens: (s) => (s.cor ? [{ src: "", alt: `Sayerlack Polirex ${s.cor}` }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "cor",
      titulo: "Cor",
      tipo: "chips",
      opcoes: Object.keys(CORES_VERNIZ).map((v) => ({ valor: v })),
    },
    {
      chave: "volume",
      titulo: "Volume",
      tipo: "grid3",
      opcoes: (s) => (CORES_VERNIZ[s.cor] ?? []).map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: () => "Sayerlack Polirex",
  resumoDetalhe: (s, q) => `${s.cor} · ${s.volume} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `verniz-polirex-${s.cor}-${s.volume}`,
  mensagem: (s, q) =>
    `✨ *Sayerlack Polirex*\n• Cor: ${s.cor}\n• Volume: ${s.volume}\n• Quantidade: ${q.qtd ?? 1} un`,
};

/* ---------------- Stain Sayerlack Polisten ---------------- */

const CORES_STAIN = [
  { valor: "Imbuia", sub: "Tom marrom médio amadeirado" },
  { valor: "Mogno Inglês", sub: "Tom avermelhado clássico" },
  { valor: "Transparente", sub: "Realça a cor natural da madeira" },
];

const VOLUMES_STAIN = ["900ml", "3,6L"];

export const CONFIG_STAIN: ConfiguradorConfig = {
  produtoKey: "stain",
  breadcrumb: BC("Stain para Madeira"),
  titulo: "🪵 Stain para Madeira — Sayerlack Polisten",
  subtitulo:
    "Linha Polisten em 3 cores (Imbuia, Mogno Inglês e Transparente), nos tamanhos 900ml e 3,6L. Penetra na fibra, realça o veio e protege contra UV e umidade.",
  galeriaTitulo: "Sayerlack Polisten",
  galeriaPlaceholder: "Selecione a cor para ver as fotos",
  imagens: (s) => (s.cor ? [{ src: "", alt: `Sayerlack Polisten ${s.cor}` }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "cor",
      titulo: "Cor",
      tipo: "lista",
      opcoes: CORES_STAIN,
    },
    {
      chave: "volume",
      titulo: "Volume",
      tipo: "grid3",
      opcoes: VOLUMES_STAIN.map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: () => "Sayerlack Polisten",
  resumoDetalhe: (s, q) => `${s.cor} · ${s.volume} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `stain-polisten-${s.cor}-${s.volume}`,
  mensagem: (s, q) =>
    `🪵 *Sayerlack Polisten*\n• Cor: ${s.cor}\n• Volume: ${s.volume}\n• Quantidade: ${q.qtd ?? 1} un`,
};

/* ---------------- Tinta Emborrachada ---------------- */

const CORES_EMBORRACHADA = ["Cinza Espacial"];

export const CONFIG_EMBORRACHADA: ConfiguradorConfig = {
  produtoKey: "tinta-emborrachada",
  breadcrumb: BC("Tinta Emborrachada"),
  titulo: "🎨 Tinta Emborrachada — Brazilian Color",
  subtitulo:
    "Tinta emborrachada Brazilian Color, linha Super Proteção, na cor Cinza Espacial (3,6L e 18L). Filme elástico e impermeável para laje, telhado e fachada.",
  galeriaTitulo: "Tinta Emborrachada Brazilian Color",
  galeriaPlaceholder: "Selecione a cor para ver as fotos",
  imagens: (s) =>
    s.cor ? [{ src: "", alt: `Tinta Emborrachada Brazilian Color ${s.cor}` }] : [],
  categoria: "Tintas",
  passos: [
    {
      chave: "cor",
      titulo: "Cor",
      tipo: "lista",
      opcoes: CORES_EMBORRACHADA.map((v) => ({ valor: v, sub: "Linha Super Proteção" })),
    },
    {
      chave: "volume",
      titulo: "Volume",
      tipo: "grid2",
      opcoes: ["3,6L", "18L"].map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: () => "Tinta Emborrachada Brazilian Color",
  resumoDetalhe: (s, q) => `${s.cor} · ${s.volume} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `emborrachada-brazilian-color-${s.cor}-${s.volume}`,
  mensagem: (s, q) =>
    `🎨 *Tinta Emborrachada Brazilian Color — Super Proteção*\n• Cor: ${s.cor}\n• Volume: ${s.volume}\n• Quantidade: ${q.qtd ?? 1} un`,
};


const VOLUMES_CUPIM = ["900ml", "5L", "18L"];

export const CONFIG_CUPICIDA: ConfiguradorConfig = {
  produtoKey: "cupicida",
  breadcrumb: BC("Proteção contra Cupim"),
  titulo: "🌿 Exterminador de Cupim — Sayerlack",
  subtitulo:
    "Exterminador de cupim Sayerlack. Preventivo e curativo para estruturas de madeira, incolor e de alta eficácia.",
  galeriaTitulo: "Exterminador de Cupim Sayerlack",
  galeriaPlaceholder: "Selecione o tamanho para ver as fotos",
  imagens: (s) => (s.volume ? [{ src: "", alt: `Exterminador de Cupim Sayerlack ${s.volume}` }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "volume",
      titulo: "Volume",
      tipo: "grid3",
      opcoes: VOLUMES_CUPIM.map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: () => "Exterminador de Cupim — Sayerlack",
  resumoDetalhe: (s, q) => `${s.volume} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `cupicida-sayerlack-${s.volume}`,
  mensagem: (s, q) =>
    `🌿 *Exterminador de Cupim — Sayerlack*\n• Volume: ${s.volume}\n• Quantidade: ${q.qtd ?? 1} un`,
};

/* ---------------- Thinner Profissional (Sayerlack) ---------------- */

const VOLUMES_THINNER = ["900ml", "5L"];

export const CONFIG_AGUARRAS: ConfiguradorConfig = {
  produtoKey: "aguarras",
  breadcrumb: BC("Thinner Profissional"),
  titulo: "🧴 Thinner Profissional — Sayerlack",
  subtitulo:
    "Sayerlack Thinner Profissional nos tamanhos 900ml e 5L. Para diluição de tintas e vernizes e limpeza de pincéis, rolos e equipamentos.",
  galeriaTitulo: "Sayerlack Thinner Profissional",
  galeriaPlaceholder: "Selecione o tamanho para ver as fotos",
  imagens: (s) =>
    s.volume ? [{ src: "", alt: `Sayerlack Thinner Profissional ${s.volume}` }] : [],
  categoria: "Tintas",
  passos: [
    {
      chave: "volume",
      titulo: "Volume",
      tipo: "grid2",
      opcoes: VOLUMES_THINNER.map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: () => "Sayerlack Thinner Profissional",
  resumoDetalhe: (s, q) => `${s.volume} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `thinner-sayerlack-${s.volume}`,
  mensagem: (s, q) =>
    `🧴 *Sayerlack Thinner Profissional*\n• Volume: ${s.volume}\n• Quantidade: ${q.qtd ?? 1} un`,
};


/* ---------------- Aguarrás Sayerlack (Sayerraz) ---------------- */

const VOLUMES_SAYERRAZ = ["900ml", "5L"];

export const CONFIG_SAYERRAZ: ConfiguradorConfig = {
  produtoKey: "sayerraz",
  breadcrumb: BC("Aguarrás Sayerraz"),
  titulo: "🪣 Aguarrás — Sayerlack Sayerraz",
  subtitulo:
    "Aguarrás Sayerlack Sayerraz nos tamanhos 900ml e 5L. Diluição de tintas e vernizes à base de óleo e limpeza de pincéis, rolos e ferramentas.",
  galeriaTitulo: "Sayerlack Sayerraz",
  galeriaPlaceholder: "Selecione o tamanho para ver as fotos",
  imagens: (s) => (s.volume ? [{ src: "", alt: `Sayerlack Sayerraz ${s.volume}` }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "volume",
      titulo: "Volume",
      tipo: "grid2",
      opcoes: VOLUMES_SAYERRAZ.map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: () => "Sayerlack Sayerraz (Aguarrás)",
  resumoDetalhe: (s, q) => `${s.volume} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `sayerraz-aguarras-${s.volume}`,
  mensagem: (s, q) =>
    `🪣 *Sayerlack Sayerraz (Aguarrás)*\n• Volume: ${s.volume}\n• Quantidade: ${q.qtd ?? 1} un`,
};

/* ---------------- Acessórios de aplicação ---------------- */

const ACESSORIOS_PINTURA: { nome: string; opcoes: string[] }[] = [
  { nome: "Roloflex Resistance com Capa", opcoes: ["15cm", "9cm"] },
  { nome: "Roloflex Rolo Espuma sem Capa", opcoes: ["5cm"] },
  { nome: "Broxa Retangular Sintética (Roloflex)", opcoes: ["Média", "Grande"] },
  { nome: "Jogo de Pincéis Bestfer", opcoes: ["Jogo com 3 unidades"] },
  {
    nome: "Pincel com Cerdas Bestfer",
    opcoes: [
      'Nº 4 — Plástico Laranja 4"',
      'Nº 3 — Plástico Laranja 3"',
      '2.1/2" / 65mm — Cabo Plástico',
      '2" / 50mm — Cabo Plástico',
    ],
  },
  { nome: "Roloflex Suporte para Rolo", opcoes: ["23cm"] },
  { nome: "Espátula de Aço Polido Bestfer", opcoes: ["4P / 10cm", "5P / 12,5cm"] },
];

export const CONFIG_ACESSORIOS_PINTURA: ConfiguradorConfig = {
  produtoKey: "acessorios-pintura",
  breadcrumb: BC("Acessórios para Fixação"),
  titulo: "🖌️ Acessórios para Fixação",
  subtitulo:
    "Rolos Roloflex, broxas, pincéis e jogos Bestfer, suporte para rolo e espátulas de aço — só o que temos em estoque.",
  galeriaTitulo: "Acessórios para Fixação",
  galeriaPlaceholder: "Selecione o item para ver as fotos",
  imagens: (s) => (s.item ? [{ src: "", alt: s.item }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "item",
      titulo: "Item",
      tipo: "lista",
      opcoes: ACESSORIOS_PINTURA.map((p) => ({ valor: p.nome, sub: p.opcoes.join(" · ") })),
    },
    {
      chave: "medida",
      titulo: "Tamanho / Tipo",
      tipo: "chips",
      opcoes: (s) =>
        (ACESSORIOS_PINTURA.find((p) => p.nome === s.item)?.opcoes ?? []).map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: (s) => s.item ?? "Acessório de Aplicação",
  resumoDetalhe: (s, q) => `${s.medida} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `acess-pintura-${s.item}-${s.medida}`,
  mensagem: (s, q) => `🖌️ *${s.item}*\n• Tamanho: ${s.medida}\n• Quantidade: ${q.qtd ?? 1} un`,
};

/* ---------------- Lixas ---------------- */

const LIXAS: { nome: string; graos: string[] }[] = [
  {
    nome: "Disco de Lixa 180mm x 22,23mm x 0,6mm (Bestfer — 10 peças)",
    graos: ["36", "60", "100"],
  },
  { nome: "Lixa Madeira/Massa (folha avulsa)", graos: ["60", "100", "120", "150", "180", "220"] },
];

export const CONFIG_LIXAS: ConfiguradorConfig = {
  produtoKey: "lixas",
  breadcrumb: BC("Lixas"),
  titulo: "🧽 Lixas para Madeira",
  subtitulo:
    "Disco de lixa 180mm Bestfer (embalagem com 10 peças) e lixa de madeira/massa em folha avulsa, nos grãos reais de estoque.",
  galeriaTitulo: "Lixas",
  galeriaPlaceholder: "Selecione o tipo para ver as fotos",
  imagens: (s) => (s.tipo ? [{ src: "", alt: s.tipo }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "tipo",
      titulo: "Tipo de lixa",
      tipo: "lista",
      opcoes: LIXAS.map((p) => ({ valor: p.nome, sub: `Grãos ${p.graos.join(" · ")}` })),
    },
    {
      chave: "grao",
      titulo: "Grão",
      tipo: "chips",
      opcoes: (s) => (LIXAS.find((p) => p.nome === s.tipo)?.graos ?? []).map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 5 },
  ],
  resumoNome: (s) => s.tipo ?? "Lixa",
  resumoDetalhe: (s, q) => `Grão ${s.grao} · ${q.qtd ?? 5} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `lixa-${s.tipo}-${s.grao}`,
  mensagem: (s, q) => `🧽 *${s.tipo}*\n• Grão: ${s.grao}\n• Quantidade: ${q.qtd ?? 5} un`,
};

/* ---------------- PU para Calha ---------------- */

export const CONFIG_PU_CALHA: ConfiguradorConfig = {
  produtoKey: "pu-calha",
  breadcrumb: BC("PU para Calha"),
  titulo: "🛠️ PU40 Cinza para Calha (Vedação)",
  subtitulo:
    "Selante poliuretano PU40 Cinza em bisnaga de 400g. Alta aderência para emendas de calhas, rufos e água furtada.",
  galeriaTitulo: "PU40 Cinza — Bisnaga 400g",
  galeriaPlaceholder: "Foto em breve",
  imagens: () => [{ src: "", alt: "PU40 Cinza bisnaga 400g para vedação de calha" }],
  categoria: "Tintas",
  passos: [
    {
      chave: "produto",
      titulo: "Produto",
      tipo: "lista",
      opcoes: [{ valor: "PU40 Cinza — Bisnaga 400g", sub: "Vedação de calhas e rufos" }],
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "bisnagas", padrao: 1 },
  ],
  resumoNome: () => "PU40 Cinza — Bisnaga 400g",
  resumoDetalhe: (s, q) => `Cinza · 400g · ${q.qtd ?? 1} bisnagas`,
  unidadeResumo: () => "bisnagas",
  idItem: () => "pu-calha-pu40-cinza-400g",
  mensagem: (s, q) =>
    `🛠️ *PU40 Cinza — Bisnaga 400g*\n• Cor: Cinza\n• Quantidade: ${q.qtd ?? 1} bisnagas`,
};

/* ---------------- Lona Plástica ---------------- */

const LONAS: { nome: string; medidas: string[] }[] = [
  { nome: "Lona Plástica Preta", medidas: ["4x5 m", "6x8 m", "8x10 m", "Metro linear (4 m larg.)"] },
  { nome: "Lona Plástica Branca/Leitosa", medidas: ["4x5 m", "6x8 m", "Metro linear (4 m larg.)"] },
  { nome: "Lona Plástica Azul", medidas: ["3x4 m", "5x6 m", "8x10 m"] },
  { nome: "Lona Encerada / Reforçada", medidas: ["4x5 m", "5x8 m", "8x10 m"] },
];

export const CONFIG_LONA: ConfiguradorConfig = {
  breadcrumb: BC("Lona Plástica"),
  titulo: "🟦 Lona Plástica",
  subtitulo:
    "Lona preta, leitosa, azul e encerada para proteção de obra, cobertura provisória e pintura.",
  galeriaTitulo: "Lona Plástica",
  galeriaPlaceholder: "Selecione o tipo para ver as fotos",
  imagens: (s) => (s.tipo ? [{ src: "", alt: s.tipo }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "tipo",
      titulo: "Tipo de lona",
      tipo: "lista",
      opcoes: LONAS.map((l) => ({ valor: l.nome, sub: l.medidas.join(" · ") })),
    },
    {
      chave: "espessura",
      titulo: "Espessura",
      tipo: "chips",
      opcoes: ["Leve (100 micras)", "Média (150 micras)", "Reforçada (200 micras)"].map((v) => ({
        valor: v,
      })),
    },
    {
      chave: "medida",
      titulo: "Medida",
      tipo: "grid2",
      opcoes: (s) => (LONAS.find((l) => l.nome === s.tipo)?.medidas ?? []).map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: (s) => s.tipo ?? "Lona Plástica",
  resumoDetalhe: (s, q) => `${s.espessura} · ${s.medida} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `lona-${s.tipo}-${s.espessura}-${s.medida}`,
  mensagem: (s, q) =>
    `🟦 *${s.tipo}*\n• Espessura: ${s.espessura}\n• Medida: ${s.medida}\n• Quantidade: ${q.qtd ?? 1} un`,
};

/* ---------------- Massa para Madeira (Sayermassa) ---------------- */

const CORES_MASSA = [
  { valor: "Eucalipto", sub: "Tom claro acinzentado" },
  { valor: "Imbuia Tabaco", sub: "Tom marrom médio" },
  { valor: "Mogno", sub: "Tom avermelhado" },
  { valor: "Pinus", sub: "Tom claro amadeirado" },
];

export const CONFIG_MASSA_MADEIRA: ConfiguradorConfig = {
  produtoKey: "massa-madeira",
  breadcrumb: BC("Massa para Madeira"),
  titulo: "🪵 Massa para Madeira — Sayerlack Sayermassa",
  subtitulo:
    "Massa para reparos em madeira Sayerlack Sayermassa em 4 cores: Eucalipto, Imbuia Tabaco, Mogno e Pinus. Preenche rachaduras, furos e imperfeições antes do acabamento.",
  galeriaTitulo: "Sayerlack Sayermassa",
  galeriaPlaceholder: "Selecione a cor para ver as fotos",
  imagens: (s) => (s.cor ? [{ src: "", alt: `Sayerlack Sayermassa ${s.cor}` }] : []),
  categoria: "Tintas",
  passos: [
    { chave: "cor", titulo: "Cor", tipo: "lista", opcoes: CORES_MASSA },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: () => "Sayerlack Sayermassa (Massa para Madeira)",
  resumoDetalhe: (s, q) => `${s.cor} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `sayermassa-${s.cor}`,
  mensagem: (s, q) =>
    `🪵 *Sayerlack Sayermassa (Massa para Madeira)*\n• Cor: ${s.cor}\n• Quantidade: ${q.qtd ?? 1} un`,
};
