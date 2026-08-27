import type { ConfiguradorConfig, Selecao, OpcaoConfig } from "@/components/site/ConfiguradorGenerico";

const VERIFICAR = "Verificar disponibilidade";

export const PECAS_CUMEEIRA: OpcaoConfig[] = [
  { valor: "Cumeeira", emoji: "🔺", sub: "Arremate do topo (espinha) do telhado" },
  { valor: "Espigão", emoji: "📐", sub: "Arremate das arestas inclinadas (quatro águas)" },
  { valor: "Paulistinha", label: "Paulistinha (Capa Lateral)", emoji: "🧱", sub: "Capa lateral / arremate de borda" },
];

type MaterialDef = {
  valor: string;
  sub: string;
  pecas: string[];
  formatos?: string[];
  formatosIndisponiveis?: boolean;
  cores?: { valor: string; cor?: string; disponivel?: boolean }[];
};

export const MATERIAIS_CUMEEIRA: MaterialDef[] = [
  {
    valor: "PVC",
    sub: "53cm × 86cm · leve, não trinca e não desbota",
    pecas: ["Cumeeira", "Espigão", "Paulistinha"],
    formatos: ["Central Fixa", "Central Articulada", "Lateral Articulada", "Triangular 3 Vias"],
    cores: [
      { valor: "Cerâmica", cor: "#B4532A", disponivel: true },
      { valor: "Marfim", cor: "#EFE3C8", disponivel: false },
      { valor: "Cinza", cor: "#9AA0A6", disponivel: false },
    ],
  },
  {
    valor: "Fibrocimento",
    sub: "Normal 15°, Articulada, Shed 90° e Universal 45° a 75°",
    pecas: ["Cumeeira", "Espigão"],
    formatos: ["Normal 15°", "Articulada", "Shed 90°", "Universal 45° a 75°"],
  },
  {
    valor: "Concreto",
    sub: "Linha Eurotop · todas as cores verificar disponibilidade",
    pecas: ["Cumeeira", "Espigão"],
    formatos: ["Normal", "Inicial", "Triangular 3 Vias"],
    cores: [
      { valor: "Areia", cor: "#D9C7A3", disponivel: false },
      { valor: "Cinza", cor: "#9AA0A6", disponivel: false },
      { valor: "Grafite", cor: "#3A3F45", disponivel: false },
      { valor: "Marfim", cor: "#EFE3C8", disponivel: false },
      { valor: "Tabaco", cor: "#7A4B2A", disponivel: false },
    ],
  },
  {
    valor: "Esmaltada",
    sub: "Vitrificada · todas as cores verificar disponibilidade",
    pecas: ["Cumeeira", "Espigão"],
    formatos: ["Central Articulada", "Central Fixa", "Triangular 3 Vias"],
    formatosIndisponiveis: true,
    cores: [
      { valor: "Vermelho", cor: "#A62B1F", disponivel: false },
      { valor: "Branco", cor: "#F3F3F0", disponivel: false },
      { valor: "Preto", cor: "#1F2124", disponivel: false },
      { valor: "Azul", cor: "#1F4E8C", disponivel: false },
      { valor: "Verde", cor: "#1F6B3B", disponivel: false },
      { valor: "Marrom", cor: "#5A3A25", disponivel: false },
    ],
  },
  {
    valor: "Barro",
    sub: "Natural, Mesclada ou Larga Resinada",
    pecas: ["Cumeeira", "Espigão", "Paulistinha"],
    formatos: ["Normal", "Larga"],
    cores: [
      { valor: "Natural", cor: "#B4532A", disponivel: true },
      { valor: "Mesclada", cor: "#8C6A4F", disponivel: true },
      { valor: "Resinada", cor: "#9C4A2A", disponivel: true },
    ],
  },
];

const norm = (v?: string) =>
  (v ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

function materialDef(material?: string) {
  return MATERIAIS_CUMEEIRA.find((m) => m.valor === material);
}

function materiaisDaPeca(peca?: string): OpcaoConfig[] {
  return MATERIAIS_CUMEEIRA.filter((m) => !peca || m.pecas.includes(peca)).map((m) => ({
    valor: m.valor,
    sub: m.sub,
  }));
}

function formatosOpcoes(sel: Selecao): OpcaoConfig[] {
  const def = materialDef(sel.material);
  if (!def?.formatos) return [];
  return def.formatos.map((f) => ({
    valor: f,
    badge: def.formatosIndisponiveis ? VERIFICAR : undefined,
  }));
}

function coresOpcoes(sel: Selecao): OpcaoConfig[] {
  const def = materialDef(sel.material);
  if (!def?.cores) return [];
  return def.cores.map((c) => ({
    valor: c.valor,
    cor: c.cor,
    badge: c.disponivel ? undefined : VERIFICAR,
    sub: c.disponivel ? "Pronta entrega" : undefined,
  }));
}

/** Traduz parâmetros de URL (?peca=cumeeira&material=pvc&cor=ceramica) em seleção inicial. */
export function selecaoInicialCumeeira(search: Record<string, unknown>): Selecao {
  const sel: Selecao = {};
  const peca = PECAS_CUMEEIRA.find((p) => norm(p.valor) === norm(String(search.peca ?? "")));
  if (peca) sel.peca = peca.valor;

  const mat = MATERIAIS_CUMEEIRA.find((m) => norm(m.valor) === norm(String(search.material ?? "")));
  if (mat && (!sel.peca || mat.pecas.includes(sel.peca))) {
    sel.material = mat.valor;

    const formato = mat.formatos?.find((f) => norm(f) === norm(String(search.formato ?? "")));
    if (formato) sel.formato = formato;

    const cor = mat.cores?.find((c) => norm(c.valor) === norm(String(search.cor ?? "")));
    if (cor) sel.cor = cor.valor;
  }
  return sel;
}

/** Monta o link da página de cumeeira já filtrada. */
export function linkCumeeira(params: { peca?: string; material: string; cor?: string }) {
  const qs = new URLSearchParams();
  qs.set("peca", norm(params.peca ?? "Cumeeira"));
  qs.set("material", norm(params.material));
  if (params.cor) qs.set("cor", norm(params.cor));
  return `/catalogo/telhas/cumeeiras?${qs.toString()}`;
}

/** Existe cumeeira no mesmo material? E a cor da telha existe nesse material? */
export function cumeeiraCompativel(material: string, corTelha?: string) {
  const def = materialDef(material);
  if (!def) return null;
  const cor = def.cores?.find((c) => norm(c.valor) === norm(corTelha));
  return { material: def.valor, cor: cor?.valor, disponivel: cor?.disponivel ?? true };
}

export const CONFIG_CUMEEIRAS: ConfiguradorConfig = {
  breadcrumb: [
    { label: "Catálogo", href: "/catalogo" },
    { label: "Telhas", href: "/catalogo/telhas" },
    { label: "Cumeeira, Espigão & Paulistinha" },
  ],
  titulo: "Cumeeira, Espigão & Paulistinha",
  subtitulo:
    "Escolha o tipo de peça e o material — PVC, fibrocimento, concreto, esmaltada ou barro.",
  galeriaTitulo: "Arremates de Cobertura",
  galeriaPlaceholder: "Selecione o tipo de peça para ver as fotos",
  imagens: (s) =>
    s.material ? [{ src: "", alt: `${s.peca ?? "Cumeeira"} ${s.material} ${s.cor ?? ""}`.trim() }] : [],
  categoria: "Telhas",
  produtoKey: "cumeeiras",
  especificacoes: [
    ["Barro · TopTelha — Cumeeira", "45 cm · 2,9 kg/pç · 2,4 pç/m · absorção <13%"],
    ["Barro · TopTelha — Peça Colonial (cumeeira alternativa)", "54,8 cm · 3,6 kg/pç · 2,1 pç/m · absorção <13%"],
    ["Barro · TopTelha — Final de espigão", "40,5 cm · 2,8 kg/pç · peça de arremate"],
    ["Barro · TopTelha — Triangular 3 vias", "40 cm · 3,4 kg/pç · peça de encontro"],
    ["Barro · Linha Isotec", "Consultar disponibilidade"],
    ["PVC · Afort", "86 cm de comprimento × 53 cm · ~1,2 pç/m útil · peso por peça: consultar disponibilidade"],
    ["Fibrocimento · Infibra", "Normal 15°, Articulada, Shed 90° e Universal 45°–75° · consumo conforme largura útil da peça · peso: consultar disponibilidade"],
    ["Concreto · Eurotop", "Consultar disponibilidade"],
    ["Esmaltada (vitrificada)", "Consultar disponibilidade"],
  ],
  informacoes: [
    {
      titulo: "Como calcular a quantidade",
      texto:
        "Meça o comprimento total da linha de cumeeira e de cada espigão, em metros, e multiplique pelo consumo por metro da peça escolhida (ex.: cumeeira de barro TopTelha, 2,4 peças por metro). Em telhados de quatro águas, some cumeeira e espigões separadamente.",
    },
    {
      titulo: "Peças especiais de cerâmica (TopTelha)",
      texto:
        "Além da cumeeira, a linha oferece final de espigão (40,5 cm · 2,8 kg), triangular 3 vias (40 cm · 3,4 kg), passarinheira (12,7 cm · 0,2 kg · 4 pç/m) e telha de ventilação (42,4 cm · 3,2 kg · 3 pç a cada 10 m²). Absorção de água inferior a 13%.",
    },
    {
      titulo: "Dados ainda em confirmação",
      texto:
        "Cumeeira compatível com a linha Isotec, peças de concreto Eurotop e esmaltadas ainda não têm ficha oficial do fabricante liberada — nesses casos, indicamos “consultar disponibilidade” e confirmamos medidas e peso antes de fechar o pedido.",
    },
    {
      titulo: "Combine com a telha",
      texto:
        "Use sempre a peça do mesmo material e da mesma cor/linha da telha instalada, para garantir encaixe e acabamento uniforme.",
    },
  ],

  passos: [
    { chave: "peca", titulo: "Tipo de peça", tipo: "grid3", opcoes: PECAS_CUMEEIRA },
    {
      chave: "material",
      titulo: "Material",
      tipo: "lista",
      opcoes: (s) => materiaisDaPeca(s.peca),
    },
    {
      chave: "cor",
      titulo: "Cor / Acabamento",
      tipo: "chips",
      visivel: (s) => coresOpcoes(s).length > 0,
      opcoes: coresOpcoes,
    },
    {
      chave: "formato",
      titulo: "Formato",
      tipo: "chips",
      visivel: (s) => formatosOpcoes(s).length > 0,
      opcoes: formatosOpcoes,
    },
    { chave: "qtd", titulo: "Quantidade", tipo: "quantidade", unidade: "peças", padrao: 10 },
  ],
  resumoNome: (s) => `${s.peca ?? "Cumeeira"} ${s.material ?? ""}`.trim(),
  resumoDetalhe: (s, q) =>
    [s.cor, s.formato, `${q.qtd ?? 10} peças`].filter(Boolean).join(" · "),
  unidadeResumo: () => "peças",
  idItem: (s) => `${norm(s.peca)}-${norm(s.material)}-${norm(s.formato)}-${norm(s.cor)}`,
  mensagem: (s, q) =>
    `🔺 *${s.peca ?? "Cumeeira"} ${s.material ?? ""}*\n• Material: ${s.material}${s.formato ? `\n• Formato: ${s.formato}` : ""}${s.cor ? `\n• Cor: ${s.cor}` : ""}\n• Quantidade: ${q.qtd ?? 10} peças`,
};
