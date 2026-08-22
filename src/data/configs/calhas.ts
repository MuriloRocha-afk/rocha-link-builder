import type { ConfiguradorConfig } from "@/components/site/ConfiguradorGenerico";
import type { AcessorioItem } from "@/components/site/BlocoAcessorios";

const BC = (nome: string) => [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Calhas", href: "/catalogo/calhas" },
  { label: nome },
];

const COMPRIMENTOS = ["2,0m", "3,0m", "4,0m", "5,0m", "6,0m"];

export const CONFIG_CALHA_ALGE: ConfiguradorConfig = {
  produtoKey: "calha-alge",
  breadcrumb: BC("Calha Alge"),
  titulo: "🌧️ Calha Alge — Moldura e Platibanda",
  badge: "★ Campeão de Vendas",
  subtitulo: "Calha galvanizada nos cortes Moldura e Platibanda de 2,0m a 6,0m.",
  galeriaTitulo: "Calha Alge",
  galeriaPlaceholder: "Selecione o corte para ver as fotos",
  imagens: (s) =>
    s.corte
      ? [
          {
            src: "",
            alt:
              s.corte === "Moldura Corte 33"
                ? "Calha Alge Moldura galvanizada"
                : "Calha Alge Platibanda",
          },
        ]
      : [],
  categoria: "Calhas",
  passos: [
    {
      chave: "corte",
      titulo: "Corte",
      tipo: "grid2",
      opcoes: [
        { valor: "Moldura Corte 33", emoji: "📐", sub: "Encaixe em telhados com beira" },
        { valor: "Platibanda Corte 33", emoji: "📏", sub: "Para telhados com platibanda" },
      ],
    },
    {
      chave: "comprimento",
      titulo: "Comprimento",
      tipo: "grid3",
      opcoes: COMPRIMENTOS.map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "peças", padrao: 4 },
  ],
  resumoNome: () => "Calha Alge",
  resumoDetalhe: (s, q) => `${s.corte} · ${s.comprimento} · ${q.qtd ?? 4} peças`,
  unidadeResumo: () => "peças",
  idItem: (s) => `calha-alge-${s.corte}-${s.comprimento}`,
  mensagem: (s, q) =>
    `🌧️ *Calha Alge*\n• Corte: ${s.corte}\n• Comprimento: ${s.comprimento}\n• Quantidade: ${q.qtd ?? 4} peças`,
};

export const CONFIG_CALHA_AQUAPLUV: ConfiguradorConfig = {
  breadcrumb: BC("Calha Aquapluv"),
  titulo: "🔵 Calha Aquapluv & Style",
  subtitulo:
    "Calhas PVC Bege e Cinza. Não enferruja, fácil instalação, sistema completo de acessórios.",
  galeriaTitulo: "Calha Aquapluv",
  galeriaPlaceholder: "Selecione a linha para ver as fotos",
  imagens: (s) => (s.linha ? [{ src: "", alt: `${s.linha}` }] : []),
  categoria: "Calhas",
  passos: [
    {
      chave: "linha",
      titulo: "Linha",
      tipo: "grid2",
      opcoes: [
        { valor: "Aquapluv Calha — Cinza", emoji: "🔵", sub: "Calha redonda clássica" },
        { valor: "Aquapluv Style — Retangular", emoji: "⬛", sub: "Design moderno" },
      ],
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "peças", padrao: 4 },
  ],
  resumoNome: () => "Calha Aquapluv",
  resumoDetalhe: (s, q) => `${s.linha} · ${q.qtd ?? 4} peças`,
  unidadeResumo: () => "peças",
  idItem: (s) => `aquapluv-${s.linha}`,
  mensagem: (s, q) =>
    `🔵 *Calha Aquapluv*\n• Linha: ${s.linha}\n• Quantidade: ${q.qtd ?? 4} peças`,
};

export const CONFIG_RUFO: ConfiguradorConfig = {
  breadcrumb: BC("Rufos Galvanizados"),
  titulo: "🏠 Rufos Galvanizados — Alge",
  subtitulo:
    "Arremate entre telhado e parede. Impermeabilização definitiva em qualquer cobertura.",
  galeriaTitulo: "Rufo Galvanizado Alge",
  galeriaPlaceholder: "Foto em breve",
  imagens: () => [{ src: "", alt: "Rufo galvanizado Alge instalado" }],
  categoria: "Calhas",
  passos: [
    {
      chave: "comprimento",
      titulo: "Comprimento",
      tipo: "grid3",
      opcoes: COMPRIMENTOS.map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "peças", padrao: 4 },
  ],
  resumoNome: () => "Rufo Galvanizado Alge",
  resumoDetalhe: (s, q) => `${s.comprimento} · ${q.qtd ?? 4} peças`,
  unidadeResumo: () => "peças",
  idItem: (s) => `rufo-${s.comprimento}`,
  mensagem: (s, q) =>
    `🏠 *Rufo Galvanizado Alge*\n• Comprimento: ${s.comprimento}\n• Quantidade: ${q.qtd ?? 4} peças`,
};

export const CONFIG_AGUA_FURTADA: ConfiguradorConfig = {
  breadcrumb: BC("Água Furtada"),
  titulo: "💧 Água Furtada Galvanizada",
  subtitulo:
    "Calha de encontro entre duas águas do telhado (rincão). Galvanizada, de 2,0m a 6,0m, nos cortes 33 e 50.",
  galeriaTitulo: "Água Furtada Galvanizada",
  galeriaPlaceholder: "Selecione o corte para ver as fotos",
  imagens: (s) =>
    s.corte ? [{ src: "", alt: `Água Furtada Galvanizada ${s.corte}` }] : [],
  categoria: "Calhas",
  passos: [
    {
      chave: "corte",
      titulo: "Corte / Desenvolvimento",
      tipo: "grid2",
      opcoes: [
        { valor: "Corte 33", emoji: "📐", sub: "Telhados residenciais padrão" },
        { valor: "Corte 50", emoji: "📏", sub: "Maior vazão, telhados grandes" },
      ],
    },
    {
      chave: "comprimento",
      titulo: "Comprimento",
      tipo: "grid3",
      opcoes: COMPRIMENTOS.map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "peças", padrao: 2 },
  ],
  especificacoes: [
    ["Material", "Chapa galvanizada"],
    ["Cortes", "33 e 50"],
    ["Comprimentos", "2,0m a 6,0m"],
    ["Aplicação", "Rincão — encontro entre duas águas do telhado"],
    ["Sobreposição", "~10 cm entre peças"],
  ],
  resumoNome: () => "Água Furtada Galvanizada",
  resumoDetalhe: (s, q) => `${s.corte} · ${s.comprimento} · ${q.qtd ?? 2} peças`,
  unidadeResumo: () => "peças",
  idItem: (s) => `agua-furtada-${s.corte}-${s.comprimento}`,
  mensagem: (s, q) =>
    `💧 *Água Furtada Galvanizada*\n• Corte: ${s.corte}\n• Comprimento: ${s.comprimento}\n• Quantidade: ${q.qtd ?? 2} peças`,
};

export const CONFIG_MANTA_TERMICA: ConfiguradorConfig = {
  produtoKey: "manta-termica",
  breadcrumb: BC("Manta Térmica"),
  titulo: "🌡️ Manta Térmica Aluminizada",
  subtitulo: "Reduz até 70% do calor radiante. 1 face e 2 faces, de 10m² a 50m².",
  galeriaTitulo: "Manta Térmica Aluminizada",
  galeriaPlaceholder: "Selecione o tipo para ver as fotos",
  imagens: (s) =>
    s.faces
      ? [{ src: "", alt: `Manta Térmica Aluminizada ${s.faces === "1F" ? "1 Face" : "2 Faces"}` }]
      : [],
  categoria: "Calhas",
  passos: [
    {
      chave: "faces",
      titulo: "Faces",
      tipo: "grid2",
      opcoes: [
        { valor: "1F", sub: "Uma face aluminizada (econômica)" },
        { valor: "2F", sub: "Isolamento térmico superior", badge: "★ Mais eficiente" },
      ],
    },
    {
      chave: "tamanho",
      titulo: "Tamanho do rolo",
      tipo: "grid3",
      opcoes: ["10 m²", "25 m²", "50 m²"].map((v) => ({ valor: v })),
    },
    {
      chave: "qtd",
      titulo: "Quantidade",
      tipo: "quantidade",
      unidade: "rolos",
      padrao: 1,
      nota: (s, q) =>
        `Cobertura total com ${q} rolos: ~${q * parseFloat(s.tamanho)} m²`,
    },
  ],
  resumoNome: () => "Manta Térmica Aluminizada",
  resumoDetalhe: (s, q) =>
    `${s.faces} · rolo ${s.tamanho} · ${q.qtd ?? 1} rolos · ~${((q.qtd as number) ?? 1) * parseFloat(s.tamanho)} m²`,
  unidadeResumo: () => "rolos",
  idItem: (s) => `manta-termica-${s.faces}-${s.tamanho}`,
  mensagem: (s, q) =>
    `🌡️ *Manta Térmica Aluminizada*\n• Tipo: ${s.faces}\n• Tamanho do rolo: ${s.tamanho}\n• Quantidade: ${q.qtd ?? 1} rolos\n• Cobertura total: ~${((q.qtd as number) ?? 1) * parseFloat(s.tamanho)} m²`,
};

export const CONFIG_MANTA_ASFALTICA: ConfiguradorConfig = {
  breadcrumb: BC("Manta Asfáltica"),
  titulo: "🛡️ Manta Asfáltica Aluminizada",
  subtitulo:
    "Terracota em 10cm e 20cm de largura × 10m. Impermeabilização de calhas, rufos e junções.",
  galeriaTitulo: "Manta Asfáltica Aluminizada",
  galeriaPlaceholder: "Foto em breve",
  imagens: () => [{ src: "", alt: "Manta Asfáltica Aluminizada Terracota" }],
  categoria: "Calhas",
  passos: [
    {
      chave: "largura",
      titulo: "Largura",
      tipo: "grid2",
      opcoes: [{ valor: "10 cm" }, { valor: "20 cm" }],
    },
    {
      chave: "qtd",
      titulo: "Quantidade",
      tipo: "quantidade",
      unidade: "rolos de 10m",
      padrao: 1,
    },
  ],
  resumoNome: () => "Manta Asfáltica Aluminizada — Terracota",
  resumoDetalhe: (s, q) => `${s.largura} × 10m · ${q.qtd ?? 1} rolos`,
  unidadeResumo: () => "rolos de 10m",
  idItem: (s) => `manta-asfaltica-${s.largura}`,
  mensagem: (s, q) =>
    `🛡️ *Manta Asfáltica Aluminizada — Terracota*\n• Largura: ${s.largura}\n• Comprimento por rolo: 10m\n• Quantidade: ${q.qtd ?? 1} rolos`,
};

const ACESSORIOS_ALGE = [
  "Suporte Calha Moldura 28/33",
  "Suporte Calha Platibanda 28/33",
  "Cabeceira Moldura 28/33 — Direita",
  "Cabeceira Moldura 28/33 — Esquerda",
  "Cabeceira Platibanda 28/33",
  "Saída Central Moldura 28/33",
  "Saída Central Platibanda 28/33",
  "Saída Lateral Moldura 28/33 — Direita",
  "Saída Lateral Moldura 28/33 — Esquerda",
  "Saída Lateral Platibanda 28/33",
];

const ACESSORIOS_AQUAPLUV = [
  "Aquapluv — Bocal Cinza",
  "Aquapluv — Cabeceira Direita/Esquerda Bege",
  "Aquapluv — Calha Cinza",
  "Aquapluv Style — Emenda",
  "Aquapluv Style — Joelho 45° Retangular",
  "Aquapluv Style — Joelho 90° Retangular",
  "Aquapluv Style — Suporte PVC",
  "Aquapluv Style — Condutor Retangular",
  "Aquapluv — Condutor Circular Bege",
];

export const CONFIG_ACESSORIOS_CALHA: ConfiguradorConfig = {
  breadcrumb: BC("Acessórios de Calha"),
  titulo: "🔧 Acessórios de Calha",
  subtitulo: "Suportes, cabeceiras, saídas, emendas e bocais para calhas Alge e Aquapluv.",
  galeriaTitulo: "Acessórios de Calha",
  galeriaPlaceholder: "Selecione o sistema para ver as fotos",
  imagens: (s) => (s.sistema ? [{ src: "", alt: `Acessórios ${s.sistema}` }] : []),
  categoria: "Calhas",
  passos: [
    {
      chave: "sistema",
      titulo: "Sistema",
      tipo: "grid2",
      opcoes: [
        { valor: "Sistema Alge", emoji: "📐", sub: "Moldura e Platibanda" },
        { valor: "Sistema Aquapluv", emoji: "🔵", sub: "Calha redonda e Style" },
      ],
    },
    {
      chave: "acessorio",
      titulo: "Acessório",
      tipo: "lista",
      opcoes: (s) =>
        (s.sistema === "Sistema Alge" ? ACESSORIOS_ALGE : ACESSORIOS_AQUAPLUV).map((v) => ({
          valor: v,
        })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "peças", padrao: 4 },
  ],
  resumoNome: () => "Acessório de Calha",
  resumoDetalhe: (s, q) => `${s.sistema} · ${s.acessorio} · ${q.qtd ?? 4} peças`,
  unidadeResumo: () => "peças",
  idItem: (s) => `acessorio-calha-${s.acessorio}`,
  mensagem: (s, q) =>
    `🔧 *Acessório de Calha*\n• Sistema: ${s.sistema?.replace("Sistema ", "")}\n• Produto: ${s.acessorio}\n• Quantidade: ${q.qtd ?? 4} peças`,
};

/* ------------------------------------------------------------------ */
/* Platibanda · Moldura · Calha PVC — fichas próprias                   */
/* ------------------------------------------------------------------ */

const acessoriosCalha = (
  prefixo: string,
  material: string,
  qtdPecas: number,
): AcessorioItem[] => [
  {
    id: `${prefixo}-saida-central`,
    nome: `Saída Central ${material}`,
    descricao: "Bocal de descida no meio da calha. Escoamento equilibrado dos dois lados.",
    emoji: "⬇️",
    unidade: "un",
    categoria: "Calhas",
    quantidadeSugerida: Math.max(1, Math.ceil(qtdPecas / 4)),
  },
  {
    id: `${prefixo}-saida-lateral`,
    nome: `Saída Lateral ${material}`,
    descricao: "Bocal de descida na extremidade da calha, junto à cabeceira.",
    emoji: "↘️",
    unidade: "un",
    categoria: "Calhas",
    quantidadeSugerida: Math.max(1, Math.ceil(qtdPecas / 6)),
  },
  {
    id: `${prefixo}-suporte`,
    nome: `Suporte / Braçadeira ${material}`,
    descricao: "Sustentação da calha a cada 60cm a 80cm. Evita barriga e desnível.",
    emoji: "🔩",
    unidade: "un",
    categoria: "Calhas",
    quantidadeSugerida: Math.max(4, Math.ceil(qtdPecas * 4)),
  },
  {
    id: `${prefixo}-selante`,
    nome: "Selante PU para Calha",
    descricao: "Veda emendas, cabeceiras e saídas. Cura flexível, resistente a chuva e sol.",
    emoji: "🧴",
    unidade: "un",
    categoria: "Calhas",
    quantidadeSugerida: Math.max(1, Math.ceil(qtdPecas / 5)),
    href: "/catalogo/tintas/pu-calha",
  },
];

const CORTES_PLATIBANDA = [
  { valor: "Corte 25", emoji: "📏", sub: "Platibandas estreitas e telhados menores" },
  { valor: "Corte 33", emoji: "📐", sub: "Padrão residencial — o mais pedido", badge: "★ Mais vendida" },
  { valor: "Corte 50", emoji: "🧱", sub: "Grandes áreas e alto volume de chuva" },
];

export const CONFIG_PLATIBANDA: ConfiguradorConfig = {
  produtoKey: "calha-alge",
  breadcrumb: BC("Calha Platibanda"),
  titulo: "🧱 Calha Platibanda Galvanizada",
  subtitulo:
    "Calha embutida atrás da platibanda, com aba alta para conter a água. Chapa galvanizada de 2,0m a 6,0m.",
  tagInfo: "✓ Chapa galvanizada · Cortes 25, 33 e 50",
  galeriaTitulo: "Calha Platibanda",
  galeriaPlaceholder: "Selecione o corte para ver as fotos",
  imagens: (s) => (s.corte ? [{ src: "", alt: `Calha Platibanda galvanizada ${s.corte}` }] : []),
  categoria: "Calhas",
  passos: [
    { chave: "corte", titulo: "Corte da Chapa", tipo: "grid3", opcoes: CORTES_PLATIBANDA },
    {
      chave: "comprimento",
      titulo: "Comprimento da Peça",
      tipo: "grid3",
      opcoes: COMPRIMENTOS.map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "peças", padrao: 4 },
  ],
  especificacoes: [
    ["Material", "Chapa galvanizada"],
    ["Cortes", "25, 33 e 50"],
    ["Comprimentos", "2,0m a 6,0m"],
    ["Aplicação", "Calha embutida atrás da platibanda"],
    ["Emendas", "Rebite + selante PU"],
    ["Suportes", "A cada 60cm a 80cm"],
  ],
  tituloAcessorios: "Complemente sua Calha Platibanda",
  acessorios: (_s, q) => acessoriosCalha("platibanda", "Galvanizada", (q.qtd as number) ?? 4),
  resumoNome: () => "Calha Platibanda Galvanizada",
  resumoDetalhe: (s, q) => `${s.corte} · ${s.comprimento} · ${q.qtd ?? 4} peças`,
  unidadeResumo: () => "peças",
  idItem: (s) => `platibanda-${s.corte}-${s.comprimento}`,
  mensagem: (s, q) =>
    `🧱 *Calha Platibanda Galvanizada*\n• Corte: ${s.corte}\n• Comprimento: ${s.comprimento}\n• Quantidade: ${q.qtd ?? 4} peças`,
};

const CORTES_MOLDURA = [
  { valor: "Corte 25", emoji: "📏", sub: "Beirais curtos e coberturas pequenas" },
  { valor: "Corte 33", emoji: "📐", sub: "Padrão residencial — o mais pedido", badge: "★ Mais vendida" },
  { valor: "Corte 50", emoji: "🏠", sub: "Telhados amplos e galpões" },
];

export const CONFIG_MOLDURA: ConfiguradorConfig = {
  produtoKey: "calha-alge",
  breadcrumb: BC("Calha Moldura"),
  titulo: "🏠 Calha Moldura Galvanizada",
  subtitulo:
    "Calha aparente fixada na beira do telhado, com dobra frontal de acabamento. Galvanizada de 2,0m a 6,0m.",
  tagInfo: "✓ Chapa galvanizada · Cortes 25, 33 e 50",
  galeriaTitulo: "Calha Moldura",
  galeriaPlaceholder: "Selecione o corte para ver as fotos",
  imagens: (s) => (s.corte ? [{ src: "", alt: `Calha Moldura galvanizada ${s.corte}` }] : []),
  categoria: "Calhas",
  passos: [
    { chave: "corte", titulo: "Corte da Chapa", tipo: "grid3", opcoes: CORTES_MOLDURA },
    {
      chave: "comprimento",
      titulo: "Comprimento da Peça",
      tipo: "grid3",
      opcoes: COMPRIMENTOS.map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "peças", padrao: 4 },
  ],
  especificacoes: [
    ["Material", "Chapa galvanizada"],
    ["Cortes", "25, 33 e 50"],
    ["Comprimentos", "2,0m a 6,0m"],
    ["Aplicação", "Calha aparente na beira do telhado"],
    ["Acabamento", "Dobra frontal de moldura"],
    ["Suportes", "A cada 60cm a 80cm"],
  ],
  tituloAcessorios: "Complemente sua Calha Moldura",
  acessorios: (_s, q) => acessoriosCalha("moldura", "Galvanizada", (q.qtd as number) ?? 4),
  resumoNome: () => "Calha Moldura Galvanizada",
  resumoDetalhe: (s, q) => `${s.corte} · ${s.comprimento} · ${q.qtd ?? 4} peças`,
  unidadeResumo: () => "peças",
  idItem: (s) => `moldura-${s.corte}-${s.comprimento}`,
  mensagem: (s, q) =>
    `🏠 *Calha Moldura Galvanizada*\n• Corte: ${s.corte}\n• Comprimento: ${s.comprimento}\n• Quantidade: ${q.qtd ?? 4} peças`,
};

const LINHAS_PVC = [
  {
    valor: "Aquapluv Beira",
    emoji: "🔵",
    sub: "Perfil arredondado tradicional — Bege ou Cinza",
    badge: "★ Mais vendida",
  },
  { valor: "Aquapluv Style", emoji: "⬜", sub: "Perfil retangular moderno — Bege ou Cinza" },
];

export const CONFIG_CALHA_PVC: ConfiguradorConfig = {
  produtoKey: "calha-aquapluv",
  breadcrumb: BC("Calha PVC"),
  titulo: "💧 Calha PVC",
  subtitulo:
    "Calha em PVC que não enferruja e dispensa pintura. Linhas Aquapluv Beira e Aquapluv Style, nas cores Bege e Cinza.",
  tagInfo: "✓ Não enferruja · Encaixe sem solda",
  galeriaTitulo: "Calha PVC",
  galeriaPlaceholder: "Selecione a linha para ver as fotos",
  imagens: (s) => (s.linha ? [{ src: "", alt: `Calha PVC ${s.linha} ${s.cor ?? ""}` }] : []),
  categoria: "Calhas",
  passos: [
    { chave: "linha", titulo: "Linha do Perfil", tipo: "grid2", opcoes: LINHAS_PVC },
    {
      chave: "cor",
      titulo: "Cor",
      tipo: "grid2",
      opcoes: [
        { valor: "Bege", cor: "#E4D5B7" },
        { valor: "Cinza", cor: "#9AA0A6" },
      ],
    },
    {
      chave: "comprimento",
      titulo: "Comprimento da Peça",
      tipo: "grid3",
      opcoes: ["2,0m", "3,0m", "4,0m"].map((v) => ({ valor: v })),
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "peças", padrao: 4 },
  ],
  especificacoes: [
    ["Material", "PVC rígido"],
    ["Linhas", "Aquapluv Beira e Aquapluv Style"],
    ["Cores", "Bege e Cinza"],
    ["Comprimentos", "2,0m · 3,0m · 4,0m"],
    ["Montagem", "Encaixe com anel de vedação"],
    ["Manutenção", "Não enferruja e não precisa de pintura"],
  ],
  tituloAcessorios: "Complemente sua Calha PVC",
  acessorios: (_s, q) => acessoriosCalha("calha-pvc", "PVC", (q.qtd as number) ?? 4),
  resumoNome: (s) => `Calha PVC ${s.linha ?? ""}`.trim(),
  resumoDetalhe: (s, q) => `${s.linha} · ${s.cor} · ${s.comprimento} · ${q.qtd ?? 4} peças`,
  unidadeResumo: () => "peças",
  idItem: (s) => `calha-pvc-${s.linha}-${s.cor}-${s.comprimento}`,
  mensagem: (s, q) =>
    `💧 *Calha PVC*\n• Linha: ${s.linha}\n• Cor: ${s.cor}\n• Comprimento: ${s.comprimento}\n• Quantidade: ${q.qtd ?? 4} peças`,
};
