import type { ConfiguradorConfig } from "@/components/site/ConfiguradorGenerico";


const BC = (nome: string) => [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Calhas", href: "/catalogo/calhas" },
  { label: nome },
];

const COMPRIMENTOS = ["2,0m", "3,0m", "4,0m", "5,0m", "6,0m"];

export const CONFIG_CALHA_ALGE: ConfiguradorConfig = {
  produtoKey: "calha-alge",
  breadcrumb: BC("Calha Galvanizada"),
  titulo: "Calha Galvanizada — Moldura e Platibanda",
  badge: "★ Campeão de Vendas",
  subtitulo: "Calha galvanizada nos cortes Moldura e Platibanda de 2,0m a 6,0m.",
  galeriaTitulo: "Calha Galvanizada",
  galeriaPlaceholder: "Selecione o corte para ver as fotos",
  imagens: (s) =>
    s.corte
      ? [
          {
            src: "",
            alt:
              s.corte === "Moldura Corte 33"
                ? "Calha galvanizada Moldura"
                : "Calha galvanizada Platibanda",
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
        { valor: "Moldura Corte 33", sub: "Encaixe em telhados com beira" },
        { valor: "Platibanda Corte 33", sub: "Para telhados com platibanda" },
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
  resumoNome: () => "Calha Galvanizada",
  resumoDetalhe: (s, q) => `${s.corte} · ${s.comprimento} · ${q.qtd ?? 4} peças`,
  unidadeResumo: () => "peças",
  idItem: (s) => `calha-galvanizada-${s.corte}-${s.comprimento}`,
  mensagem: (s, q) =>
    `🌧️ *Calha Galvanizada*\n• Corte: ${s.corte}\n• Comprimento: ${s.comprimento}\n• Quantidade: ${q.qtd ?? 4} peças`,
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

const ACESSORIOS_MOLDURA = [
  "Suporte Calha Moldura 28/33",
  "Cabeceira Moldura 28/33 — Direita",
  "Cabeceira Moldura 28/33 — Esquerda",
  "Saída Central Moldura 28/33",
  "Saída Lateral Moldura 28/33 — Direita",
  "Saída Lateral Moldura 28/33 — Esquerda",
  "Água Furtada 28/33",
  "Pingadeira 28/33",
];

const ACESSORIOS_PLATIBANDA = [
  "Suporte Calha Platibanda 28/33",
  "Cabeceira Platibanda 28/33 — Direita",
  "Cabeceira Platibanda 28/33 — Esquerda",
  "Saída Central Platibanda 28/33",
  "Saída Lateral Platibanda 28/33",
  "Água Furtada 28/33",
  "Pingadeira 28/33",
];

export const CONFIG_ACESSORIOS_CALHA: ConfiguradorConfig = {
  breadcrumb: BC("Acessórios de Calha"),
  titulo: "Acessórios de Calha",
  subtitulo:
    "Suportes, cabeceiras, saídas, água furtada e pingadeira para calha galvanizada Moldura e Platibanda.",
  galeriaTitulo: "Acessórios de Calha",
  galeriaPlaceholder: "Selecione o corte para ver as fotos",
  imagens: (s) => (s.sistema ? [{ src: "", alt: `Acessórios ${s.sistema}` }] : []),
  categoria: "Calhas",
  passos: [
    {
      chave: "sistema",
      titulo: "Corte da Calha",
      tipo: "grid2",
      opcoes: [
        { valor: "Moldura", sub: "Calha aparente na beira do telhado" },
        { valor: "Platibanda", sub: "Calha embutida atrás da platibanda" },
      ],
    },
    {
      chave: "acessorio",
      titulo: "Acessório",
      tipo: "lista",
      opcoes: (s) =>
        (s.sistema === "Moldura" ? ACESSORIOS_MOLDURA : ACESSORIOS_PLATIBANDA).map((v) => ({
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
    `🔧 *Acessório de Calha*\n• Corte: ${s.sistema}\n• Produto: ${s.acessorio}\n• Quantidade: ${q.qtd ?? 4} peças`,
};
