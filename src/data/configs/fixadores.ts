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

export const CONFIG_ESPIGOES: ConfiguradorConfig = {
  breadcrumb: BC("Espigões"),
  titulo: "📌 Espigões para Telha Fibrocimento",
  subtitulo: "Vedação lateral entre chapas. 120cm e 180cm, modelos Inicial e Sequencial.",
  galeriaTitulo: "Espigão para Telha Fibrocimento",
  galeriaPlaceholder: "Foto em breve",
  imagens: () => [{ src: "", alt: "Espigão para telha fibrocimento instalado" }],
  categoria: "Fixadores",
  passos: [
    {
      chave: "modelo",
      titulo: "Modelo",
      tipo: "lista",
      opcoes: [
        { valor: "Espigão 120cm × 6mm — Inicial" },
        { valor: "Espigão 120cm × 6mm — Sequencial", badge: "★ Mais usado" },
        { valor: "Espigão 180cm × 6mm — Confibra — Sequencial" },
      ],
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "peças", padrao: 5 },
  ],
  resumoNome: () => "Espigão Telha Fibrocimento",
  resumoDetalhe: (s, q) => `${s.modelo} · ${q.qtd ?? 5} peças`,
  unidadeResumo: () => "peças",
  idItem: (s) => `espigao-${s.modelo}`,
  mensagem: (s, q) =>
    `📌 *Espigão Telha Fibrocimento*\n• Modelo: ${s.modelo}\n• Quantidade: ${q.qtd ?? 5} peças`,
};

const ehTelheiro = (s: Record<string, string>) => s.tipo === "Telheiro";
const ehComCabeca = (s: Record<string, string>) => s.tipo === "Polido com Cabeça";
const ehSemCabeca = (s: Record<string, string>) => s.tipo === "Polido sem Cabeça";

export const CONFIG_PREGOS: ConfiguradorConfig = {
  breadcrumb: BC("Pregos"),
  titulo: "🔨 Pregos",
  subtitulo:
    "Polido com e sem cabeça, Telheiro e Aço. Vendidos por Kg ou embalagem de 100 unidades.",
  galeriaTitulo: "Pregos",
  galeriaPlaceholder: "Selecione o tipo para ver as fotos",
  imagens: (s) => (s.tipo ? [{ src: "", alt: `Prego ${s.tipo}` }] : []),
  categoria: "Fixadores",
  passos: [
    {
      chave: "tipo",
      titulo: "Tipo",
      tipo: "grid3",
      opcoes: ["Telheiro", "Polido com Cabeça", "Polido sem Cabeça"].map((v) => ({ valor: v })),
    },
    {
      chave: "produto",
      titulo: "Produto",
      tipo: "lista",
      visivel: ehTelheiro,
      opcoes: [{ valor: "Prego Telheiro 18×27 — 500g" }],
    },
    {
      chave: "bitolaCom",
      titulo: "Bitola",
      tipo: "grid3",
      visivel: ehComCabeca,
      opcoes: ["10×10", "17×21", "18×27", "19×36", "20×48", "22×48", "25×72"].map((v) => ({
        valor: v,
      })),
    },
    {
      chave: "bitolaSem",
      titulo: "Bitola",
      tipo: "grid2",
      visivel: ehSemCabeca,
      opcoes: ["10×10", "12×12"].map((v) => ({ valor: v })),
    },
    {
      chave: "embalagem",
      titulo: "Embalagem",
      tipo: "grid2",
      visivel: (s) => ehComCabeca(s) || ehSemCabeca(s),
      opcoes: [{ valor: "Por Kg" }, { valor: "Por 100 un" }],
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "embalagens", padrao: 1 },
  ],
  resumoNome: (s) => (ehTelheiro(s) ? "Prego Telheiro" : `Prego ${s.tipo ?? ""}`),
  resumoDetalhe: (s, q) =>
    ehTelheiro(s)
      ? `${s.produto} · ${q.qtd ?? 1} embalagens`
      : `${s.bitolaCom ?? s.bitolaSem} · ${s.embalagem} · ${q.qtd ?? 1}`,
  unidadeResumo: () => "embalagens",
  idItem: (s) => `prego-${s.tipo}-${s.bitolaCom ?? s.bitolaSem ?? s.produto}`,
  mensagem: (s, q) =>
    ehTelheiro(s)
      ? `🔨 *Prego Telheiro 18×27*\n• Embalagem: 500g\n• Quantidade: ${q.qtd ?? 1}`
      : `🔨 *Prego ${s.tipo} ${s.bitolaCom ?? s.bitolaSem}*\n• Embalagem: ${s.embalagem?.replace("Por ", "")}\n• Quantidade: ${q.qtd ?? 1}`,
};

export const CONFIG_ARAMES: ConfiguradorConfig = {
  breadcrumb: BC("Arames"),
  titulo: "〰️ Arames",
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
