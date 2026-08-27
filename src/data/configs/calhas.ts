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
  produtoKey: "rufo",
  breadcrumb: BC("Rufo Galvanizado"),
  titulo: "Rufo Galvanizado",
  subtitulo:
    "Arremate entre telhado e parede. Impermeabilização definitiva em qualquer cobertura.",
  galeriaTitulo: "Rufo Galvanizado",
  galeriaPlaceholder: "Selecione o corte para ver as fotos",
  imagens: (s) => (s.corte ? [{ src: "", alt: `Rufo Galvanizado ${s.corte}` }] : []),
  categoria: "Calhas",
  passos: [
    {
      chave: "corte",
      titulo: "Corte / Desenvolvimento",
      tipo: "grid2",
      opcoes: [
        { valor: "Corte 25", sub: "Arremates padrão em paredes" },
        { valor: "Corte 33", sub: "Maior aba, telhados com mais volume de água" },
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
  especificacoes: [
    ["Material", "Chapa galvanizada"],
    ["Cortes", "25 e 33"],
    ["Comprimentos", "2,0m a 6,0m"],
    ["Aplicação", "Encontro entre telhado e parede / alvenaria"],
    ["Sobreposição", "~10 cm entre peças"],
  ],
  informacoes: [
    {
      titulo: "Para que serve o rufo",
      texto:
        "O rufo é a peça de arremate instalada no encontro do telhado com paredes, muros e platibandas. Ele impede que a água escorra pela alvenaria e entre por trás das telhas, eliminando infiltrações nesses pontos críticos.",
    },
    {
      titulo: "O que é o corte 33",
      texto:
        "O corte (ou desenvolvimento) é a largura da chapa galvanizada antes da dobra. No corte 33, a chapa tem 33 cm de desenvolvimento, o que resulta em abas maiores — uma sobre o telhado e outra encostada na parede. É indicado para telhados com maior volume de água ou quando se deseja uma sobreposição mais generosa sobre a telha. O corte 25 atende arremates residenciais padrão.",
    },
    {
      titulo: "Instalação",
      texto:
        "A aba superior é fixada na parede e recebe vedação (manta asfáltica ou selante) na linha de topo; a aba inferior fica sobre a telha, no sentido do escoamento. Entre peças, mantenha sobreposição de aproximadamente 10 cm, sempre no sentido da descida da água.",
    },
    {
      titulo: "Disponibilidade",
      texto:
        "Comprimentos de 2,0m a 6,0m. Alguns cortes e comprimentos podem exigir verificar disponibilidade no momento da cotação.",
    },
  ],
  resumoNome: () => "Rufo Galvanizado",
  resumoDetalhe: (s, q) => `${s.corte} · ${s.comprimento} · ${q.qtd ?? 4} peças`,
  unidadeResumo: () => "peças",
  idItem: (s) => `rufo-${s.corte}-${s.comprimento}`,
  mensagem: (s, q) =>
    `🏠 *Rufo Galvanizado*\n• Corte: ${s.corte}\n• Comprimento: ${s.comprimento}\n• Quantidade: ${q.qtd ?? 4} peças`,
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
  produtoKey: "manta-asfaltica",

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

const TIPOS_ACESSORIO = [
  { valor: "Suporte", sub: "Sustenta a calha na estrutura" },
  { valor: "Cabeceira", sub: "Fecha a ponta da calha" },
  { valor: "Saída", sub: "Ponto de descida para o condutor" },
  { valor: "Água Furtada", sub: "Rincão — encontro entre duas águas" },
  { valor: "Pingadeira", sub: "Arremate de borda, direciona o gotejamento" },
];

const posicaoAcessorio = (s: Record<string, string>) => {
  if (s.acessorio === "Cabeceira" && s.tipoCalha === "Moldura") return s.ladoCabeceira;
  if (s.acessorio === "Saída" && s.tipoCalha === "Moldura") return s.posicaoSaidaMoldura;
  if (s.acessorio === "Saída" && s.tipoCalha === "Platibanda") return s.posicaoSaidaPlatibanda;
  return null;
};

export const CONFIG_ACESSORIOS_CALHA: ConfiguradorConfig = {
  breadcrumb: BC("Acessórios de Calha"),
  titulo: "Acessórios de Calha",
  subtitulo:
    "Suporte, cabeceira, saída, água furtada e pingadeira para calha galvanizada Moldura e Platibanda.",
  galeriaTitulo: "Acessórios de Calha",
  galeriaPlaceholder: "Selecione o tipo de calha para ver as fotos",
  produtoKey: "acessorios",
  imagens: (s) =>
    s.acessorio
      ? [{ src: "", alt: `${s.acessorio} para calha ${s.tipoCalha}` }]
      : s.tipoCalha
        ? [{ src: "", alt: `Acessórios para calha ${s.tipoCalha}` }]
        : [],
  categoria: "Calhas",
  passos: [
    {
      chave: "tipoCalha",
      titulo: "Tipo de calha",
      tipo: "grid2",
      opcoes: [
        { valor: "Moldura", sub: "Calha aparente na beira do telhado" },
        { valor: "Platibanda", sub: "Calha embutida atrás da platibanda" },
      ],
    },
    {
      chave: "acessorio",
      titulo: "Tipo de acessório",
      tipo: "lista",
      opcoes: TIPOS_ACESSORIO,
    },
    {
      chave: "ladoCabeceira",
      titulo: "Lado da cabeceira",
      tipo: "grid2",
      visivel: (s) => s.acessorio === "Cabeceira" && s.tipoCalha === "Moldura",
      opcoes: [{ valor: "Esquerda" }, { valor: "Direita" }],
    },
    {
      chave: "posicaoSaidaMoldura",
      titulo: "Posição da saída",
      tipo: "grid3",
      visivel: (s) => s.acessorio === "Saída" && s.tipoCalha === "Moldura",
      opcoes: [
        { valor: "Central" },
        { valor: "Lateral Esquerda" },
        { valor: "Lateral Direita" },
      ],
    },
    {
      chave: "posicaoSaidaPlatibanda",
      titulo: "Posição da saída",
      tipo: "grid2",
      visivel: (s) => s.acessorio === "Saída" && s.tipoCalha === "Platibanda",
      opcoes: [{ valor: "Central" }, { valor: "Lateral" }],
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "peças", padrao: 4 },
  ],
  especificacoes: [
    ["Material", "Chapa galvanizada"],
    ["Sistemas", "Moldura e Platibanda"],
    ["Acessórios", "Suporte, cabeceira, saída, água furtada e pingadeira"],
    ["Bitola", "28/33"],
  ],
  resumoNome: (s) => `${s.acessorio ?? "Acessório"} de Calha`,
  resumoDetalhe: (s, q) =>
    [s.tipoCalha, s.acessorio, posicaoAcessorio(s), `${q.qtd ?? 4} peças`]
      .filter(Boolean)
      .join(" · "),
  unidadeResumo: () => "peças",
  idItem: (s) =>
    `acessorio-calha-${s.tipoCalha}-${s.acessorio}${posicaoAcessorio(s) ? `-${posicaoAcessorio(s)}` : ""}`,
  mensagem: (s, q) =>
    `🔧 *Acessório de Calha*\n• Tipo de calha: ${s.tipoCalha}\n• Acessório: ${s.acessorio}${
      posicaoAcessorio(s) ? `\n• Posição: ${posicaoAcessorio(s)}` : ""
    }\n• Quantidade: ${q.qtd ?? 4} peças`,
};
