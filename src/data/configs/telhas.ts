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
  { valor: "Transparente", cor: "#DCE7EF", sub: "Ponto de luz natural" },
];

export const CONFIG_CONCRETO: ConfiguradorConfig = {
  sugestaoCumeeira: (s) => (s.cor ? { material: "Concreto", cor: s.cor } : null),
  produtoKey: "concreto",
  breadcrumb: BC("Telha de Concreto"),
  titulo: "🏗️ Telha de Concreto",
  subtitulo: "Areia, Cinza, Grafite e Transparente — linha Eurotop. Durabilidade máxima e acabamento premium.",
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

const FORMATOS_PET = [
  { valor: "Portuguesa", emoji: "💠", sub: "Encaixe compatível com telha cerâmica portuguesa" },
  { valor: "Romana", emoji: "💠", sub: "Encaixe compatível com telha cerâmica romana" },
  { valor: "Mediterrânea", emoji: "💠", sub: "Encaixe compatível com telha cerâmica mediterrânea" },
];

export const CONFIG_PET: ConfiguradorConfig = {
  breadcrumb: BC("Telha PET Translúcida"),
  titulo: "💠 Telha PET Translúcida",
  subtitulo:
    "Ponto de luz natural em plástico PET transparente 100% reciclado, com encaixe idêntico ao da telha cerâmica. Formatos Portuguesa, Romana e Mediterrânea.",
  galeriaTitulo: "Telha PET Translúcida",
  galeriaPlaceholder: "Selecione um formato para ver as fotos",
  imagens: (s) => (s.formato ? [{ src: "", alt: `Telha PET Translúcida ${s.formato}` }] : []),
  categoria: "Telhas",
  produtoKey: "pet",
  avisoDestaque:
    "A telha PET deve ser do mesmo formato/modelo da telha cerâmica já usada no telhado (ex.: PET Portuguesa com Cerâmica Portuguesa), para garantir o encaixe correto.",
  passos: [
    { chave: "formato", titulo: "Formato", tipo: "grid2", opcoes: FORMATOS_PET },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "peças", padrao: 6 },
  ],
  especificacoes: [
    ["Marca", "Lubian / Cejatel / Vilhena"],
    ["Material", "Plástico PET transparente injetado, 100% reciclado"],
    ["Formatos", "Portuguesa, Romana e Mediterrânea"],
    ["Proteção", "Aditivo com filtro UV (antiamarelamento)"],
    ["Compatibilidade", "Encaixe igual ao da telha cerâmica do mesmo formato"],
    ["Uso indicado", "Pontos de luz natural na cobertura"],
    ["Recomendação", "1 a 2 telhas a cada 4 m² de ambiente"],
    ["Peso por peça", "Consultar disponibilidade"],
  ],
  informacoes: [
    {
      titulo: "Por que escolher a Telha PET",
      texto:
        "É produzida com PET 100% reciclado (opção sustentável), resiste a impactos muito acima do vidro comum, tem aditivo com filtro UV que evita amarelamento e reduz a transmissão de calor, não propaga chamas e suporta bem a variação de temperatura em uso externo.",
    },
    {
      titulo: "Não substitui a cobertura",
      texto:
        "É usada como ponto de iluminação natural, distribuída em peças avulsas no pano do telhado — não como cobertura completa.",
    },
    {
      titulo: "PET x Vidro real",
      texto:
        "A PET é mais leve, mais resistente a impacto e mais barata. A Telha de Vidro real é mais nobre esteticamente e tem textura que suaviza melhor luz e calor, mas é mais pesada e mais frágil a impacto.",
    },
  ],
  resumoNome: () => "Telha PET Translúcida",
  resumoDetalhe: (s, q) => `${s.formato} · ${q.qtd ?? 6} peças`,
  unidadeResumo: () => "peças",
  idItem: (s) => `pet-${s.formato}`,
  mensagem: (s, q) =>
    `💠 *Telha PET Translúcida*\n• Formato: ${s.formato}\n• Quantidade: ${q.qtd ?? 6} peças`,
};

const FORMATOS_VIDRO = [
  { valor: "Portuguesa", emoji: "🔷", sub: "Encaixe compatível com telha cerâmica portuguesa" },
  { valor: "Romana", emoji: "🔷", sub: "Encaixe compatível com telha cerâmica romana" },
  { valor: "Francesa", emoji: "🔷", sub: "Encaixe compatível com telha cerâmica francesa" },
  { valor: "Mediterrânea", emoji: "🔷", sub: "Encaixe compatível com telha cerâmica mediterrânea" },
];

export const CONFIG_VIDRO: ConfiguradorConfig = {
  breadcrumb: BC("Telha de Vidro"),
  titulo: "🔷 Telha de Vidro",
  subtitulo:
    "Telha de ponto de luz em vidro de verdade, com textura exclusiva que suaviza a incidência de raios UV e mantém o mesmo encaixe da telha cerâmica correspondente.",
  galeriaTitulo: "Telha de Vidro",
  galeriaPlaceholder: "Selecione um formato para ver as fotos",
  imagens: (s) => (s.formato ? [{ src: "", alt: `Telha de Vidro ${s.formato}` }] : []),
  categoria: "Telhas",
  produtoKey: "vidro",
  avisoDestaque:
    "Formatos, preço e disponibilidade em estoque devem ser confirmados com a loja antes do fechamento do pedido.",
  passos: [
    { chave: "formato", titulo: "Formato", tipo: "grid2", opcoes: FORMATOS_VIDRO },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "peças", padrao: 6 },
  ],
  especificacoes: [
    ["Material", "Vidro real com textura difusora"],
    ["Formatos", "Portuguesa, Romana, Francesa e Mediterrânea"],
    ["Compatibilidade", "Encaixe igual ao da telha cerâmica do mesmo formato"],
    ["Uso indicado", "Pontos de luz natural na cobertura"],
    ["Recomendação", "1 a 2 telhas a cada 4 m² de ambiente"],
    ["Compatível com placas solares", "Sim — pode conviver com o sistema no telhado"],
    ["Peso por peça", "Consultar disponibilidade"],
  ],
  informacoes: [
    {
      titulo: "Por que escolher a Telha de Vidro",
      texto:
        "Proteção térmica no ambiente sob o ponto de luz; textura especial que suaviza os raios UV e protege móveis e acabamentos; ângulo de entrada de luz ampliado em relação a uma abertura simples; economia de energia durante o dia; convivência com sistemas de placas solares; e durabilidade de material rígido e nobre.",
    },
    {
      titulo: "Vidro real x Telha PET",
      texto:
        "O vidro é mais nobre esteticamente, com textura que suaviza melhor luz e calor, porém é mais pesado e mais frágil a impacto. A Telha PET é mais leve, mais resistente a quebra no dia a dia e mais barata.",
    },
    {
      titulo: "Não substitui a cobertura",
      texto:
        "É usada como ponto de iluminação natural, distribuída em peças avulsas no pano do telhado — não como cobertura completa.",
    },
  ],
  resumoNome: () => "Telha de Vidro",
  resumoDetalhe: (s, q) => `${s.formato} · ${q.qtd ?? 6} peças`,
  unidadeResumo: () => "peças",
  idItem: (s) => `vidro-${s.formato}`,
  mensagem: (s, q) =>
    `🔷 *Telha de Vidro*\n• Formato: ${s.formato}\n• Quantidade: ${q.qtd ?? 6} peças`,
};

