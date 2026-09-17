import type { ConfiguradorConfig } from "@/components/site/ConfiguradorGenerico";
import { galeriaParafusosTelha, galeriaPregos, galeriaArames, galeriaFerramentas } from "@/data/imagensProduto";

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
  imagens: (s) => galeriaParafusosTelha(s.tipo, s.tamanho, s.embalagem, s.cor),
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
      visivel: (s) => ehParafusoVedacao(s) && Boolean(s.tamanho),
      opcoes: (s) =>
        s.tamanho === "110mm"
          ? ["10 un", "20 un", "30 un", "40 un", "50 un"].map((v) => ({ valor: v }))
          : [{ valor: "Avulso", sub: "quantidade livre" }],
      aviso:
        "Somente o 110mm é vendido em kit fechado. Os tamanhos 150mm e 200mm são vendidos avulsos, na quantidade que você precisar.",
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
  imagens: (s) => galeriaPregos(s.tipo, s.bitolaAco ?? s.bitolaCom ?? s.bitolaSem),
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
        "24×60",
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
  imagens: (s) => galeriaArames(s.tipo, s.bitola),
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
    opcoes: ['Serrote cabo plástico 18"', "Arco de Serra"],
  },
  {
    nome: "Martelo",
    opcoes: ["Martelo 21mm", "Martelo 23mm", "Martelo 25mm", "Martelo 27mm", "Martelo 29mm", "Marreta de Borracha 60mm"],
  },
  {
    nome: "Disco de Serra",
    opcoes: [
      "Serra Circular para Madeira Bestfer, 24 dentes, 110mm",
      "Serra Circular para Madeira Bestfer, 36 dentes, 180mm",
      "Disco Diamantado Samafer Linha Prata, contínuo, 110x20mm",
    ],
  },
  {
    nome: "Trena",
    opcoes: ["Trena Transparente 3m x 16mm", "Trena Transparente 5m x 25mm", "Trena Transparente 8m x 25mm"],
  },
  { nome: "Esquadro", opcoes: ["Esquadro Metálico 35cm"] },
  {
    nome: "Furadeira",
    opcoes: ["Furadeira de Impacto 1/2"],
  },
  {
    nome: "Broca",
    opcoes: [
      'Kit Broca Chata para Madeira, 6 peças (3/8" a 1")',
      "Broca para Mourão",
      "Kit Broca para Madeira, 3 pontas, 6 peças (3mm a 8mm)",
    ],
  },
  { nome: "Nível", opcoes: ["Nível de Madeira", "Nível de Alumínio"] },
  {
    nome: "Chaves",
    opcoes: [
      "Chave Philips 3x16",
      "Chave Philips 1/4",
      'Chave de Fenda Stanley 1/8"x5" (3mm x 125mm)',
    ],
  },
  {
    nome: "Alicate",
    opcoes: ["Alicate Bico Meia-Cana Liso"],
  },
  {
    nome: "Formão / Talhadeira",
    opcoes: [
      'Formão 1/4"',
      'Formão 1/2"',
      'Formão 5/8"',
      'Formão 3/4"',
      'Formão 1"',
      "Talhadeira Curvada SDS Plus 16mm x 265mm",
      "Talhadeira SDS Plus 250mm x 40mm",
      "Talhadeira SDS Plus 14mm x 250mm x 20mm",
    ],
  },
];

const FAMILIAS: { nome: string; emoji: string; tipos: string[] }[] = [
  { nome: "Corte", emoji: "🪚", tipos: ["Serra / Serrote", "Disco de Serra"] },
  { nome: "Furação", emoji: "🛠️", tipos: ["Furadeira", "Broca"] },
  {
    nome: "Marcenaria & Acabamento",
    emoji: "🪵",
    tipos: ["Formão / Talhadeira", "Esquadro"],
  },
  { nome: "Medição", emoji: "📏", tipos: ["Trena", "Nível"] },
  { nome: "Fixação & Aperto", emoji: "🔧", tipos: ["Chaves", "Alicate"] },
  { nome: "Impacto", emoji: "🔨", tipos: ["Martelo"] },
];

export const CONFIG_FERRAMENTAS: ConfiguradorConfig = {
  breadcrumb: BC("Ferramentas Bestfer"),
  titulo: "🧰 Ferramentas Bestfer",
  produtoKey: "ferramentas",
  subtitulo:
    "Linha Bestfer para carpintaria e obra: serrotes, martelos, trenas, esquadros, furadeiras e brocas, níveis, chaves, alicates e formões.",
  galeriaTitulo: "Ferramentas Bestfer",
  galeriaPlaceholder: "Selecione a ferramenta para ver as fotos",
  imagens: (s) => galeriaFerramentas(s.ferramenta, s.modelo),
  categoria: "Fixadores",
  passos: [
    {
      chave: "familia",
      titulo: "Família",
      tipo: "grid3",
      opcoes: FAMILIAS.map((f) => ({
        valor: f.nome,
        emoji: f.emoji,
        sub: f.tipos.join(" · "),
      })),
    },
    {
      chave: "ferramenta",
      titulo: "Ferramenta",
      tipo: "lista",
      visivel: (s) => Boolean(s.familia),
      opcoes: (s) => {
        const tipos = FAMILIAS.find((f) => f.nome === s.familia)?.tipos ?? [];
        return FERRAMENTAS.filter((f) => tipos.includes(f.nome)).map((f) => ({
          valor: f.nome,
          sub: f.opcoes.join(" · "),
        }));
      },
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
