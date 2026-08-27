import type { ConfiguradorConfig } from "@/components/site/ConfiguradorGenerico";

const BC = (nome: string) => [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Fixadores", href: "/catalogo/fixadores" },
  { label: nome },
];

const ehParafusoVedacao = (s: Record<string, string>) => s.tipo === "Parafuso com Vedação";
const ehKitPvc = (s: Record<string, string>) => s.tipo === "Kit de Fixação e Vedação";

export const CONFIG_PARAFUSOS_TELHA: ConfiguradorConfig = {
  breadcrumb: BC("Parafusos para Telha"),
  titulo: "🔩 Parafusos para Telha",
  produtoKey: "parafusos-telha",
  badge: "★ Campeão de Vendas",
  subtitulo: "Parafusos com vedação para fibrocimento e kits coloridos para Colonial PVC.",
  galeriaTitulo: "Parafusos para Telha",
  galeriaPlaceholder: "Selecione o tipo para ver as fotos",
  imagens: (s) => (s.tipo ? [{ src: "", alt: s.tipo }] : []),
  categoria: "Fixadores",
  passos: [
    {
      chave: "tipo",
      titulo: "Tipo",
      tipo: "grid2",
      opcoes: [
        { valor: "Parafuso com Vedação", emoji: "🔩", sub: "Para telha fibrocimento" },
        { valor: "Kit de Fixação e Vedação", emoji: "🧰", sub: "Para telha Colonial PVC" },
      ],
    },
    {
      chave: "tamanho",
      titulo: "Tamanho",
      tipo: "grid3",
      visivel: ehParafusoVedacao,
      opcoes: ["110mm", "150mm", "200mm"].map((v) => ({ valor: v })),
    },
    {
      chave: "embalagem",
      titulo: "Embalagem",
      tipo: "grid3",
      visivel: ehParafusoVedacao,
      opcoes: ["Avulso", "10 un", "20 un", "30 un", "40 un", "50 un"].map((v) => ({ valor: v })),
    },
    {
      chave: "cor",
      titulo: "Cor",
      tipo: "grid3",
      visivel: ehKitPvc,
      opcoes: [
        { valor: "Cerâmica", cor: "#B4552F" },
        { valor: "Cinza", cor: "#8B9095" },
        { valor: "Marfim", cor: "#EADFC8" },
      ],
    },
    {
      chave: "kitTipo",
      titulo: "Tipo do Kit",
      tipo: "grid2",
      visivel: ehKitPvc,
      opcoes: [
        { valor: "Com Parafuso" },
        { valor: "Sem Parafuso", sub: "apenas vedação" },
      ],
    },
    {
      chave: "kitEmbalagem",
      titulo: "Embalagem",
      tipo: "grid2",
      visivel: ehKitPvc,
      opcoes: [{ valor: "Kit/20 un" }],
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "embalagens", padrao: 1 },
  ],
  resumoNome: (s) =>
    ehKitPvc(s) ? "Kit Fixação e Vedação — Colonial PVC" : "Parafuso com Vedação",
  resumoDetalhe: (s, q) =>
    ehKitPvc(s)
      ? `${s.cor} · ${s.kitTipo} · ${q.qtd ?? 1} kits/20un`
      : `${s.tamanho} · ${s.embalagem} · ${q.qtd ?? 1} embalagens`,
  unidadeResumo: (s) => (ehKitPvc(s) ? "kits" : "embalagens"),
  idItem: (s) => `parafuso-telha-${s.tipo}-${s.tamanho ?? s.cor}-${s.embalagem ?? s.kitTipo}`,
  mensagem: (s, q) =>
    ehKitPvc(s)
      ? `🧰 *Kit Fixação e Vedação — Colonial PVC*\n• Cor: ${s.cor}\n• Tipo: ${s.kitTipo}\n• Quantidade: ${q.qtd ?? 1} kits/20un`
      : `🔩 *Parafuso com Vedação*\n• Tamanho: ${s.tamanho}\n• Embalagem: ${s.embalagem}\n• Quantidade: ${q.qtd ?? 1} embalagens`,
};

const ehAco = (s: Record<string, string>) => s.tipo === "Prego de Aço";
const ehComCabeca = (s: Record<string, string>) => s.tipo === "Polido com Cabeça";
const ehSemCabeca = (s: Record<string, string>) => s.tipo === "Polido sem Cabeça";
const emGramas = (s: Record<string, string>) => ehComCabeca(s) || ehSemCabeca(s);

const bitolaPrego = (s: Record<string, string>) =>
  s.bitolaAco ?? s.bitolaCom ?? s.bitolaSem ?? "";

export const CONFIG_PREGOS: ConfiguradorConfig = {
  breadcrumb: BC("Pregos"),
  titulo: "🔨 Pregos",
  produtoKey: "pregos",
  subtitulo:
    "Prego de aço em pacote de 100 unidades e pregos polidos com e sem cabeça em pacote fechado de 1kg.",
  galeriaTitulo: "Pregos",
  galeriaPlaceholder: "Selecione o tipo para ver as fotos",
  imagens: (s) => (s.tipo ? [{ src: "", alt: `Prego ${s.tipo}` }] : []),
  categoria: "Fixadores",
  passos: [
    {
      chave: "tipo",
      titulo: "Tipo",
      tipo: "grid3",
      opcoes: ["Prego de Aço", "Polido com Cabeça", "Polido sem Cabeça"].map((v) => ({ valor: v })),
    },
    {
      chave: "bitolaAco",
      titulo: "Tamanho",
      tipo: "grid3",
      visivel: ehAco,
      opcoes: ["10×10", "12×12", "15×15", "17×21", "18×27"].map((v) => ({ valor: v })),
      aviso: "Prego de aço vendido apenas em pacote de 100 unidades.",
    },
    {
      chave: "bitolaCom",
      titulo: "Bitola",
      tipo: "grid3",
      visivel: ehComCabeca,
      opcoes: [
        "10×10",
        "12×12",
        "15×15",
        "15×21",
        "17×21",
        "18×27",
        "19×36",
        "20×48",
        "22×48",
        "25×72",
      ].map((v) => ({ valor: v })),
    },
    {
      chave: "bitolaSem",
      titulo: "Bitola",
      tipo: "grid2",
      visivel: ehSemCabeca,
      opcoes: ["10×10", "12×12"].map((v) => ({ valor: v })),
    },
    {
      chave: "qtdAco",
      titulo: "Quantidade",
      tipo: "quantidade",
      visivel: ehAco,
      unidade: "pacotes de 100 un",
      padrao: 1,
    },
    {
      chave: "qtdKg",
      titulo: "Quantidade",
      tipo: "quantidade",
      visivel: emGramas,
      unidade: "pacotes de 1kg",
      padrao: 1,
      aviso: "Venda exclusivamente em pacote fechado de 1kg.",
    },
  ],
  resumoNome: (s) => (ehAco(s) ? "Prego de Aço" : `Prego ${s.tipo ?? ""}`),
  resumoDetalhe: (s, q) =>
    ehAco(s)
      ? `${s.bitolaAco} · ${q.qtdAco ?? 1} pacotes de 100 un`
      : `${bitolaPrego(s)} · ${q.qtdKg ?? 1} pacotes de 1kg`,
  unidadeResumo: (s) => (ehAco(s) ? "pacotes de 100 un" : "pacotes de 1kg"),
  idItem: (s) => `prego-${s.tipo}-${bitolaPrego(s)}`,
  mensagem: (s, q) =>
    ehAco(s)
      ? `🔨 *Prego de Aço ${s.bitolaAco}*\n• Embalagem: pacote de 100 unidades\n• Quantidade: ${q.qtdAco ?? 1} pacotes`
      : `🔨 *Prego ${s.tipo} ${bitolaPrego(s)}*\n• Embalagem: pacote fechado de 1kg\n• Quantidade: ${q.qtdKg ?? 1} pacotes`,
};


export const CONFIG_ARAMES: ConfiguradorConfig = {
  breadcrumb: BC("Arames"),
  titulo: "〰️ Arames",
  produtoKey: "arames",
  subtitulo: "Galvanizado BWG14, 16 e 18. Recozido Liso e Torcido. Para amarrações e cercas.",
  galeriaTitulo: "Arames",
  galeriaPlaceholder: "Selecione o tipo para ver as fotos",
  imagens: (s) => (s.tipo ? [{ src: "", alt: `Arame ${s.tipo}` }] : []),
  categoria: "Fixadores",
  passos: [
    {
      chave: "tipo",
      titulo: "Tipo",
      tipo: "grid2",
      opcoes: [
        { valor: "Galvanizado", emoji: "〰️", sub: "Para cercas e amarrações gerais" },
        { valor: "Recozido", emoji: "🌀", sub: "Para amarração de ferragem" },
      ],
    },
    {
      chave: "bitola",
      titulo: "Bitola / Modelo",
      tipo: "grid3",
      opcoes: (s) =>
        (s.tipo === "Galvanizado"
          ? ["BWG14", "BWG16", "BWG18"]
          : ["N12 Liso", "N18 Torcido"]
        ).map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "rolos", padrao: 1 },
  ],
  resumoNome: (s) => `Arame ${s.tipo ?? ""}`,
  resumoDetalhe: (s, q) => `${s.bitola} · ${q.qtd ?? 1} rolos`,
  unidadeResumo: () => "rolos",
  idItem: (s) => `arame-${s.tipo}-${s.bitola}`,
  mensagem: (s, q) =>
    `〰️ *Arame ${s.tipo}*\n• Bitola/Modelo: ${s.bitola}\n• Quantidade: ${q.qtd ?? 1} rolos`,
};

const PRODUTOS_FIXACAO: Record<string, string[]> = {
  Buchas: [
    "Bucha nº06",
    "Bucha nº08",
    "Bucha nº10",
    "Bucha nº12",
    "Bucha Fix. com Anel nº06",
    "Bucha Fix. com Anel nº08",
    "Bucha Fix. com Anel nº10",
  ],
  Arruelas: [
    "Arruela Lisa Zincada 1/4",
    "Arruela Lisa Zincada 3/8",
    "Arruela Lisa Zincada 5/16",
    "Arruela Lisa Zincada 1/2",
  ],
  "Barras Roscadas": [
    "Barra Roscada 1/4 × 1,0m",
    "Barra Roscada 3/8 × 1,0m",
    "Barra Roscada 1/2 × 1,0m",
    "Barra Roscada 5/16 × 1,0m",
  ],
};

export const CONFIG_BUCHAS_ARRUELAS: ConfiguradorConfig = {
  breadcrumb: BC("Buchas, Arruelas & Barras"),
  titulo: "⚙️ Buchas, Arruelas & Barras Roscadas",
  produtoKey: "buchas-arruelas",
  subtitulo: "Buchas plásticas, arruelas zincadas e barras roscadas de 1/4 a 1/2 por 1,0m.",
  galeriaTitulo: "Fixadores",
  galeriaPlaceholder: "Selecione uma categoria para ver as fotos",
  imagens: (s) => (s.categoria ? [{ src: "", alt: s.categoria }] : []),
  categoria: "Fixadores",
  passos: [
    {
      chave: "categoria",
      titulo: "Categoria",
      tipo: "grid3",
      opcoes: [
        { valor: "Buchas", emoji: "🔵", sub: "Plásticas e com anel" },
        { valor: "Arruelas", emoji: "⭕", sub: "Lisas zincadas" },
        { valor: "Barras Roscadas", emoji: "〰️", sub: "1/4, 3/8, 1/2 e 5/16 × 1,0m" },
      ],
    },
    {
      chave: "produto",
      titulo: "Produto",
      tipo: "lista",
      opcoes: (s) => (PRODUTOS_FIXACAO[s.categoria] ?? []).map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 10 },
  ],
  resumoNome: (s) =>
    s.categoria === "Buchas" ? "Bucha" : s.categoria === "Arruelas" ? "Arruela" : "Barra Roscada",
  resumoDetalhe: (s, q) => `${s.produto} · ${q.qtd ?? 10} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `fixacao-${s.produto}`,
  mensagem: (s, q) =>
    `⚙️ *${s.categoria === "Buchas" ? "Bucha" : s.categoria === "Arruelas" ? "Arruela" : "Barra Roscada"}*\n• Produto: ${s.produto}\n• Quantidade: ${q.qtd ?? 10} un`,
};

const BITOLAS_MADEIRA: Record<string, string[]> = {
  "Parafuso Chipboard Chata Phs": [
    "3,5×20",
    "4,0×40",
    "4,0×50",
    "5,0×50",
    "5,0×60",
    "6,0×60",
    "6,0×65",
  ],
  "Parafuso Autobrocante": ['12"×2,5"', '12"×3"', '12"×4"'],
  "Parafuso Frances Completo": [
    "1/4×3.1/2",
    "3/8×5.1/2",
    "5/16×4.1/2",
    "5/16×8",
    "5/16×9",
    "8cm",
    "1/2×6.1/2",
  ],
  "Parafuso Sextavado Rosca Soberba": ["1/4×50", "1/4×65", "1/4×75"],
};

export const CONFIG_PARAFUSOS_MADEIRA: ConfiguradorConfig = {
  breadcrumb: BC("Parafusos para Madeira"),
  titulo: "🪛 Parafusos para Madeira",
  produtoKey: "parafusos-madeira",
  subtitulo:
    "Chipboard, Autobrocante e Frances Completo em diversas bitolas para estruturas e caixaria.",
  galeriaTitulo: "Parafusos para Madeira",
  galeriaPlaceholder: "Selecione o tipo para ver as fotos",
  imagens: (s) => (s.tipo ? [{ src: "", alt: s.tipo }] : []),
  categoria: "Fixadores",
  passos: [
    {
      chave: "tipo",
      titulo: "Tipo",
      tipo: "lista",
      opcoes: [
        { valor: "Parafuso Chipboard Chata Phs", sub: "Para MDF e compensado" },
        { valor: "Parafuso Autobrocante", sub: "Para metal e madeira" },
        { valor: "Parafuso Frances Completo", sub: "Estruturas pesadas" },
        { valor: "Parafuso Sextavado Rosca Soberba" },
      ],
    },
    {
      chave: "bitola",
      titulo: "Bitola",
      tipo: "grid3",
      opcoes: (s) => (BITOLAS_MADEIRA[s.tipo] ?? []).map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 20 },
  ],
  resumoNome: (s) => s.tipo ?? "Parafuso para Madeira",
  resumoDetalhe: (s, q) => `${s.bitola} · ${q.qtd ?? 20} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `parafuso-madeira-${s.tipo}-${s.bitola}`,
  mensagem: (s, q) =>
    `🪛 *${s.tipo} ${s.bitola}*\n• Quantidade: ${q.qtd ?? 20} un`,
};

/* ---------------- Ferramentas Bestfer ---------------- */

const FERRAMENTAS: { nome: string; opcoes: string[] }[] = [
  {
    nome: "Serra / Serrote",
    opcoes: ['Serrote 20"', 'Serrote 24"', "Serra Copo", "Arco de Serra", "Serra Tico-Tico"],
  },
  {
    nome: "Disco de Serra",
    opcoes: [
      '4.3/8" 24 dentes',
      '7.1/4" 24 dentes',
      '7.1/4" 40 dentes',
      '10" 60 dentes',
      '12" 80 dentes',
    ],
  },
  {
    nome: "Martelo",
    opcoes: ["Unha 25mm", "Unha 27mm", "Unha 29mm", "Bola 500g", "Marreta 1kg", "Marreta 3kg"],
  },
  { nome: "Trena", opcoes: ["3 m", "5 m", "7,5 m", "10 m", "30 m (fita)"] },
  { nome: "Esquadro", opcoes: ['8"', '12"', "Esquadro de Combinação"] },
  {
    nome: "Furadeira / Parafusadeira",
    opcoes: ["Furadeira de Impacto 1/2", "Parafusadeira a Bateria 12V", "Parafusadeira 20V"],
  },
  {
    nome: "Brocas",
    opcoes: [
      "Jogo p/ Madeira",
      "Jogo p/ Concreto",
      "Jogo p/ Metal",
      "Broca Chata p/ Madeira",
      "Broca SDS",
    ],
  },
  { nome: "Nível", opcoes: ['9"', '12"', '18"', '24"', "Nível de Mangueira", "Nível a Laser"] },
  {
    nome: "Chaves",
    opcoes: [
      "Jogo Chave de Fenda/Phillips",
      "Chave Inglesa 8-12",
      "Jogo Chave Combinada",
      "Chave Catraca",
      "Jogo Chave Allen",
    ],
  },
  {
    nome: "Alicate",
    opcoes: ["Universal 8", "Bico Meia-Cana", "Corte Diagonal", "Pressão 10", "Rebitador"],
  },
  { nome: "Formão / Talhadeira", opcoes: ['1/2"', '3/4"', '1"', "Talhadeira 12"] },
  { nome: "Prumo, Linha e Riscador", opcoes: ["Prumo de Face", "Linha de Pedreiro", "Lápis de Carpinteiro"] },
];

export const CONFIG_FERRAMENTAS: ConfiguradorConfig = {
  breadcrumb: BC("Ferramentas Bestfer"),
  titulo: "🧰 Ferramentas Bestfer",
  subtitulo:
    "Linha Bestfer para carpintaria e obra: serras, martelos, trenas, esquadros, furadeiras e brocas, níveis, chaves e alicates.",
  galeriaTitulo: "Ferramentas Bestfer",
  galeriaPlaceholder: "Selecione a ferramenta para ver as fotos",
  imagens: (s) => (s.ferramenta ? [{ src: "", alt: `Bestfer ${s.ferramenta}` }] : []),
  categoria: "Fixadores",
  passos: [
    {
      chave: "ferramenta",
      titulo: "Ferramenta",
      tipo: "lista",
      opcoes: FERRAMENTAS.map((f) => ({ valor: f.nome, sub: f.opcoes.join(" · ") })),
    },
    {
      chave: "modelo",
      titulo: "Modelo / Medida",
      tipo: "chips",
      opcoes: (s) =>
        (FERRAMENTAS.find((f) => f.nome === s.ferramenta)?.opcoes ?? []).map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "un", padrao: 1 },
  ],
  resumoNome: (s) => `Bestfer — ${s.ferramenta ?? "Ferramenta"}`,
  resumoDetalhe: (s, q) => `${s.modelo} · ${q.qtd ?? 1} un`,
  unidadeResumo: () => "un",
  idItem: (s) => `ferramenta-${s.ferramenta}-${s.modelo}`,
  mensagem: (s, q) =>
    `🧰 *Bestfer — ${s.ferramenta}*\n• Modelo: ${s.modelo}\n• Quantidade: ${q.qtd ?? 1} un`,
};
