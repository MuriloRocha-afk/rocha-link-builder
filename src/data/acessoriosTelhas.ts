import type { AcessorioItem } from "@/components/site/BlocoAcessorios";

/** Fixador geral — disponível a partir de qualquer tipo de telha. */
export const chumbador = (qtd: number): AcessorioItem => ({
  id: "chumbador-parabolt",
  nome: "Chumbador (Parabolt)",
  descricao: "Fixação geral de estrutura e perfis em alvenaria ou concreto. Serve para qualquer tipo de telha.",
  emoji: "🔩",
  unidade: "un",
  categoria: "Fixadores",
  quantidadeSugerida: Math.max(4, Math.ceil(qtd / 5)),
});

/** Telha PVC (Colonial e Plan): espigão, calço, kit de fixação e vedação. */
export const acessoriosPvc = (
  variante: string,
  cor: string,
  qtd: number,
): AcessorioItem[] => {
  const c = cor === "Translúcida" ? "Cerâmica" : cor;
  return [
    {
      id: `espigao-pvc-${c}`,
      nome: `Espigão PVC — ${c}`,
      descricao: `Arremate de espigão e rincão no perfil ${variante}.`,
      emoji: "📐",
      unidade: "un",
      categoria: "Telhas",
      quantidadeSugerida: Math.max(2, Math.ceil(qtd * 0.08)),
    },
    {
      id: `calco-pvc-${variante}`,
      nome: `Calço de Encaixe PVC — ${variante}`,
      descricao: "Preenche a onda da telha no beiral e sob a cumeeira.",
      emoji: "🧩",
      unidade: "un",
      categoria: "Telhas",
      quantidadeSugerida: Math.max(4, Math.ceil(qtd * 0.5)),
    },
    {
      id: `kit-fixacao-vedacao-${c}`,
      nome: `Kit de Fixação e Vedação — ${c}`,
      descricao: "Parafuso, arruela e vedação na cor da telha.",
      emoji: "🧰",
      unidade: "kit",
      categoria: "Fixadores",
      quantidadeSugerida: Math.max(1, Math.ceil(qtd / 5)),
    },
    chumbador(qtd),
  ];
};

/** Telha fibrocimento: espigão, parafuso com vedação, prego telheiro. */
export const acessoriosFibrocimento = (qtd: number): AcessorioItem[] => [
  {
    id: "espigao-fibrocimento-120",
    nome: "Espigão Fibrocimento 120cm",
    descricao: "Arremate e vedação lateral da cobertura.",
    emoji: "📐",
    unidade: "un",
    categoria: "Telhas",
    quantidadeSugerida: Math.max(2, Math.ceil(qtd * 0.1)),
  },
  {
    id: "parafuso-vedacao-110",
    nome: "Parafuso de Fixação com Vedação 110mm",
    descricao: "Conjunto parafuso + arruela + vedação para fibrocimento.",
    emoji: "🔩",
    unidade: "un",
    categoria: "Fixadores",
    quantidadeSugerida: Math.max(8, qtd * 4),
  },
  {
    id: "prego-telheiro-500g",
    nome: "Prego Telheiro 18×27 — 500g",
    descricao: "Fixação em estrutura de madeira.",
    emoji: "🔨",
    unidade: "emb",
    categoria: "Fixadores",
    quantidadeSugerida: Math.max(1, Math.ceil(qtd / 20)),
  },
  chumbador(qtd),
];

/** Telhas plásticas (policarbonato / polipropileno): parafuso com vedação e calço. */
export const acessoriosPlastico = (qtd: number): AcessorioItem[] => [
  {
    id: "parafuso-vedacao-110",
    nome: "Parafuso de Fixação com Vedação 110mm",
    descricao: "Fixação sem infiltração em telha translúcida.",
    emoji: "🔩",
    unidade: "un",
    categoria: "Fixadores",
    quantidadeSugerida: Math.max(8, qtd * 4),
  },
  {
    id: "calco-onda-translucida",
    nome: "Calço de Onda para Telha Translúcida",
    descricao: "Apoio e vedação da onda no beiral e nas emendas.",
    emoji: "🧩",
    unidade: "un",
    categoria: "Telhas",
    quantidadeSugerida: Math.max(4, qtd * 2),
  },
  chumbador(qtd),
];
