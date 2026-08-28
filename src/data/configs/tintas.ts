import type { ConfiguradorConfig } from "@/components/site/ConfiguradorGenerico";

const BC = (nome: string) => [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Tintas", href: "/catalogo/tintas" },
  { label: nome },
];

/* ---------------- Verniz Sayerlack ---------------- */

type LinhaVerniz = {
  nome: string;
  sub: string;
  cores: string[];
  acabamentos: string[];
  volumes: string[];
};

const LINHAS_VERNIZ: LinhaVerniz[] = [
  {
    nome: "Sayerlack Poliulack",
    sub: "Verniz incolor — Brilhante ou Acetinado",
    cores: ["Incolor"],
    acabamentos: ["Brilhante", "Acetinado"],
    volumes: ["900ml", "3,6L", "18L"],
  },
  {
    nome: "Sayerlack Poliulack Eco",
    sub: "Base água, sem cheiro — Acetinado",
    cores: ["Incolor"],
    acabamentos: ["Acetinado"],
    volumes: ["900ml", "3,6L"],
  },
  {
    nome: "Sayerlack Polikol",
    sub: "Verniz colorido — Canela, Mogno, Imbuia e Cristal",
    cores: ["Canela", "Mogno", "Imbuia", "Cristal"],
    acabamentos: ["Brilhante", "Acetinado"],
    volumes: ["900ml", "3,6L", "18L"],
  },
  {
    nome: "Sayerlack Polirex",
    sub: "Verniz restaurador — Mogno e Imbuia",
    cores: ["Mogno", "Imbuia"],
    acabamentos: [],
    volumes: ["900ml", "3,6L"],
  },
  {
    nome: "Sayerlack Polideck",
    sub: "Verniz para deck e piso — Natural e Ipê",
    cores: ["Natural", "Ipê"],
    acabamentos: [],
    volumes: ["900ml", "3,6L"],
  },
];

const linhaVerniz = (nome: string) => LINHAS_VERNIZ.find((l) => l.nome === nome);

export const CONFIG_VERNIZ: ConfiguradorConfig = {
  breadcrumb: BC("Verniz para Madeira"),
  titulo: "✨ Verniz para Madeira — Sayerlack",
  subtitulo:
    "Linha Sayerlack completa: Poliulack, Poliulack Eco, Polikol, Polirex e Polideck. Proteção e beleza para madeira.",
  galeriaTitulo: "Verniz Sayerlack",
  galeriaPlaceholder: "Selecione a linha para ver as fotos",
  imagens: (s) => (s.linha ? [{ src: "", alt: s.linha }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "linha",
      titulo: "Linha Sayerlack",
      tipo: "lista",
      opcoes: LINHAS_VERNIZ.map((l) => ({ valor: l.nome, sub: l.sub })),
    },
    {
      chave: "cor",
      titulo: "Cor",
      tipo: "chips",
      visivel: (s) => (linhaVerniz(s.linha)?.cores.length ?? 0) > 0,
      opcoes: (s) => (linhaVerniz(s.linha)?.cores ?? []).map((v) => ({ valor: v })),
    },
    {
      chave: "acabamento",
      titulo: "Acabamento",
      tipo: "chips",
      visivel: (s) => (linhaVerniz(s.linha)?.acabamentos.length ?? 0) > 0,
      opcoes: (s) => (linhaVerniz(s.linha)?.acabamentos ?? []).map((v) => ({ valor: v })),
    },
    {
      chave: "volume",
      titulo: "Volume",
      tipo: "grid3",
      opcoes: (s) => (linhaVerniz(s.linha)?.volumes ?? []).map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: (s) => s.linha ?? "Verniz Sayerlack",
  resumoDetalhe: (s, q) =>
    `${s.cor ? `${s.cor} · ` : ""}${s.acabamento ? `${s.acabamento} · ` : ""}${s.volume} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `verniz-${s.linha}-${s.cor ?? ""}-${s.acabamento ?? ""}-${s.volume}`,
  mensagem: (s, q) =>
    `✨ *${s.linha}${s.cor ? ` — ${s.cor}` : ""}*${s.acabamento ? `\n• Acabamento: ${s.acabamento}` : ""}\n• Volume: ${s.volume}\n• Quantidade: ${q.qtd ?? 1} un`,
};

/* ---------------- Stain Sayerlack Polisten ---------------- */

type LinhaStain = { nome: string; sub: string; cores: string[]; volumes: string[] };

const LINHAS_STAIN: LinhaStain[] = [
  {
    nome: "Sayerlack Polisten",
    sub: "Stain impregnante premium · durabilidade até 3 anos",
    cores: [
      "Natural",
      "Clear",
      "Transparente",
      "Cerejeira",
      "Mogno Inglês",
      "Canela",
      "Castanheira",
      "Imbuia",
      "Nogueira",
      "Ipê",
      "Branco",
    ],
    volumes: ["900ml", "3,6L", "18L"],
  },
  {
    nome: "Sayerlack Polisten ECO",
    sub: "Base água, sem cheiro · durabilidade até 3 anos",
    cores: ["Natural", "Castanheira", "Mogno Inglês", "Imbuia"],
    volumes: ["900ml", "3,6L"],
  },
  {
    nome: "Sayerlack Polisten Deck",
    sub: "Altíssima durabilidade · até 4 anos",
    cores: ["Natural", "Castanho"],
    volumes: ["900ml", "3,6L"],
  },
];

const linhaStain = (nome: string) => LINHAS_STAIN.find((l) => l.nome === nome);

export const CONFIG_STAIN: ConfiguradorConfig = {
  breadcrumb: BC("Stain para Madeira"),
  titulo: "🪵 Stain para Madeira — Sayerlack Polisten",
  subtitulo:
    "Linhas Polisten, Polisten ECO e Polisten Deck. Penetra na fibra, realça o veio e protege contra UV e umidade.",
  galeriaTitulo: "Sayerlack Polisten",
  galeriaPlaceholder: "Selecione a linha para ver as fotos",
  imagens: (s) => (s.linha ? [{ src: "", alt: s.linha }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "linha",
      titulo: "Linha Polisten",
      tipo: "lista",
      opcoes: LINHAS_STAIN.map((l) => ({ valor: l.nome, sub: l.sub })),
    },
    {
      chave: "cor",
      titulo: "Cor",
      tipo: "chips",
      opcoes: (s) => (linhaStain(s.linha)?.cores ?? []).map((v) => ({ valor: v })),
    },
    {
      chave: "volume",
      titulo: "Volume",
      tipo: "grid3",
      opcoes: (s) => (linhaStain(s.linha)?.volumes ?? []).map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: (s) => s.linha ?? "Sayerlack Polisten",
  resumoDetalhe: (s, q) => `${s.cor} · ${s.volume} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `stain-${s.linha}-${s.cor}-${s.volume}`,
  mensagem: (s, q) =>
    `🪵 *${s.linha}*\n• Cor: ${s.cor}\n• Volume: ${s.volume}\n• Quantidade: ${q.qtd ?? 1} un`,
};

/* ---------------- Tinta Emborrachada ---------------- */

const CORES_EMBORRACHADA = [
  "Branco",
  "Cerâmica",
  "Concreto",
  "Cinza",
  "Grafite",
  "Terracota",
  "Verde",
];

export const CONFIG_EMBORRACHADA: ConfiguradorConfig = {
  breadcrumb: BC("Tinta Emborrachada"),
  titulo: "🎨 Tinta Emborrachada",
  subtitulo:
    "Tinta acrílica emborrachada para telhado, laje e fachada. Filme elástico, impermeável e resistente ao sol e à chuva.",
  galeriaTitulo: "Tinta Emborrachada",
  galeriaPlaceholder: "Selecione a cor para ver as fotos",
  imagens: (s) => (s.cor ? [{ src: "", alt: `Tinta Emborrachada ${s.cor}` }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "cor",
      titulo: "Cor",
      tipo: "chips",
      opcoes: CORES_EMBORRACHADA.map((v) => ({ valor: v })),
    },
    {
      chave: "volume",
      titulo: "Volume",
      tipo: "grid2",
      opcoes: ["3,6L", "18L"].map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: () => "Tinta Emborrachada",
  resumoDetalhe: (s, q) => `${s.cor} · ${s.volume} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `emborrachada-${s.cor}-${s.volume}`,
  mensagem: (s, q) =>
    `🎨 *Tinta Emborrachada*\n• Cor: ${s.cor}\n• Volume: ${s.volume}\n• Quantidade: ${q.qtd ?? 1} un`,
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

/* ---------------- Aguarrás ---------------- */

const AGUARRAS: { nome: string; volumes: string[] }[] = [
  { nome: "Anjo Aguarrás Mineral", volumes: ["500ml", "900ml", "5L", "18L"] },
  { nome: "Aguarrás Vegetal", volumes: ["900ml", "5L"] },
  { nome: "Aguarrás Eucatex", volumes: ["900ml", "5L"] },
];

export const CONFIG_AGUARRAS: ConfiguradorConfig = {
  breadcrumb: BC("Aguarrás"),
  titulo: "🧴 Aguarrás",
  subtitulo:
    "Aguarrás mineral e vegetal para diluição de esmaltes, vernizes e limpeza de ferramentas.",
  galeriaTitulo: "Aguarrás",
  galeriaPlaceholder: "Selecione o produto para ver as fotos",
  imagens: (s) => (s.produto ? [{ src: "", alt: s.produto }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "produto",
      titulo: "Produto",
      tipo: "lista",
      opcoes: AGUARRAS.map((p) => ({ valor: p.nome, sub: p.volumes.join(" · ") })),
    },
    {
      chave: "volume",
      titulo: "Volume",
      tipo: "grid3",
      opcoes: (s) =>
        (AGUARRAS.find((p) => p.nome === s.produto)?.volumes ?? []).map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: (s) => s.produto ?? "Aguarrás",
  resumoDetalhe: (s, q) => `${s.volume} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `aguarras-${s.produto}-${s.volume}`,
  mensagem: (s, q) => `🧴 *${s.produto} ${s.volume}*\n• Quantidade: ${q.qtd ?? 1} un`,
};

/* ---------------- Acessórios de aplicação ---------------- */

const ACESSORIOS_PINTURA: { nome: string; opcoes: string[] }[] = [
  { nome: "Rolo de Lã (com cabo)", opcoes: ['9"', '15"', '23"'] },
  { nome: "Rolo de Espuma", opcoes: ['5"', '9"', '15"'] },
  { nome: "Rolo Anti-Gota / Antirrespingo", opcoes: ['9"', '23"'] },
  { nome: "Refil / Capa de Rolo", opcoes: ['9"', '15"', '23"'] },
  { nome: "Pincel (Trincha Chata)", opcoes: ['1"', '1.1/2"', '2"', '2.1/2"', '3"', '4"'] },
  { nome: "Trincha para Verniz", opcoes: ['2"', '3"', '4"'] },
  { nome: "Brocha Retangular", opcoes: ["Pequena", "Média", "Grande"] },
  { nome: "Extensor / Cabo Telescópico", opcoes: ["1,0 m", "1,5 m a 3,0 m", "2,0 m a 4,0 m"] },
  { nome: "Bandeja para Pintura", opcoes: ["Plástica", "Metálica"] },
  { nome: "Fita Crepe", opcoes: ["18mm", "24mm", "48mm"] },
  { nome: "Lona / Plástico Protetor", opcoes: ["4x5 m", "8x10 m"] },
];

export const CONFIG_ACESSORIOS_PINTURA: ConfiguradorConfig = {
  breadcrumb: BC("Acessórios de Aplicação"),
  titulo: "🖌️ Acessórios de Aplicação",
  subtitulo:
    "Rolos, pincéis, trinchas, brochas, extensores e itens de proteção para pintura e envernizamento.",
  galeriaTitulo: "Acessórios de Aplicação",
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
  { nome: "Lixa para Madeira (folha)", graos: ["50", "80", "100", "120", "150", "180", "220"] },
  { nome: "Lixa d'Água (folha)", graos: ["120", "180", "220", "320", "400", "600"] },
  { nome: "Lixa para Massa/Parede (folha)", graos: ["80", "100", "120", "150", "180"] },
  { nome: "Lixa em Rolo", graos: ["80", "100", "120", "150"] },
  { nome: "Esponja Abrasiva", graos: ["Média", "Fina"] },
];

export const CONFIG_LIXAS: ConfiguradorConfig = {
  breadcrumb: BC("Lixas"),
  titulo: "🧽 Lixas para Madeira",
  subtitulo: "Lixas de madeira, d'água e massa em vários grãos. Preparo perfeito antes do acabamento.",
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

/* ---------------- Colas ---------------- */

const COLAS: { nome: string; volumes: string[] }[] = [
  { nome: "Cola Branca PVA para Madeira", volumes: ["500g", "1kg", "5kg"] },
  { nome: "Cola de Madeira Extra (Cascola/Similar)", volumes: ["250g", "500g", "1kg"] },
  { nome: "Cola de Contato", volumes: ["200g", "750g", "2,8kg"] },
  { nome: "Cola PU Poliuretano para Madeira", volumes: ["250g", "1kg"] },
  { nome: "Adesivo Instantâneo (Super Cola)", volumes: ["20g", "100g"] },
  { nome: "Cola para PVC", volumes: ["75g", "175g", "850g"] },
];

export const CONFIG_COLA: ConfiguradorConfig = {
  breadcrumb: BC("Colas & Adesivos"),
  titulo: "🧴 Colas & Adesivos",
  subtitulo: "Cola branca PVA, cola de contato, cola PU e adesivos para madeira e PVC.",
  galeriaTitulo: "Colas & Adesivos",
  galeriaPlaceholder: "Selecione o produto para ver as fotos",
  imagens: (s) => (s.produto ? [{ src: "", alt: s.produto }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "produto",
      titulo: "Produto",
      tipo: "lista",
      opcoes: COLAS.map((p) => ({ valor: p.nome, sub: p.volumes.join(" · ") })),
    },
    {
      chave: "volume",
      titulo: "Embalagem",
      tipo: "grid3",
      opcoes: (s) =>
        (COLAS.find((p) => p.nome === s.produto)?.volumes ?? []).map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: (s) => s.produto ?? "Cola",
  resumoDetalhe: (s, q) => `${s.volume} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `cola-${s.produto}-${s.volume}`,
  mensagem: (s, q) => `🧴 *${s.produto} ${s.volume}*\n• Quantidade: ${q.qtd ?? 1} un`,
};

/* ---------------- PU para Calha ---------------- */

const CORES_PU = ["Branco", "Cinza", "Preto", "Alumínio"];

export const CONFIG_PU_CALHA: ConfiguradorConfig = {
  breadcrumb: BC("PU para Calha"),
  titulo: "🛠️ PU para Calha (Vedação)",
  subtitulo:
    "Selante poliuretano de alta aderência para emendas de calhas, rufos e água furtada. Resistente a chuva e UV.",
  galeriaTitulo: "PU para Calha",
  galeriaPlaceholder: "Selecione o produto para ver as fotos",
  imagens: (s) => (s.produto ? [{ src: "", alt: s.produto }] : []),
  categoria: "Tintas",
  passos: [
    {
      chave: "produto",
      titulo: "Produto",
      tipo: "lista",
      opcoes: [
        { valor: "Selante PU — Cartucho 280g/310ml", sub: "Uso com pistola aplicadora" },
        { valor: "Selante PU — Bisnaga 400ml", sub: "Alto rendimento" },
        { valor: "Silicone Neutro para Calha — 280g", sub: "Vedação complementar" },
        { valor: "Pistola Aplicadora para Cartucho", sub: "Acessório de aplicação" },
      ],
    },
    {
      chave: "cor",
      titulo: "Cor",
      tipo: "chips",
      visivel: (s) => Boolean(s.produto) && !s.produto.startsWith("Pistola"),
      opcoes: CORES_PU.map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: (s) => s.produto ?? "PU para Calha",
  resumoDetalhe: (s, q) => `${s.cor ? `${s.cor} · ` : ""}${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `pu-calha-${s.produto}-${s.cor ?? ""}`,
  mensagem: (s, q) =>
    `🛠️ *${s.produto}*${s.cor ? `\n• Cor: ${s.cor}` : ""}\n• Quantidade: ${q.qtd ?? 1} un`,
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
