/**
 * Índice de busca global do site.
 * Cada entrada leva direto para a página de nível 3 (wizard/configurador),
 * quando possível já com a etapa filtrada via query string (?peca=...).
 */

export type ItemBusca = {
  id: string;
  /** nome exibido no dropdown */
  nome: string;
  /** espécie, marca ou linha (mostrado ao lado do nome) */
  especie?: string;
  /** categoria usada para agrupar os resultados */
  categoria: string;
  /** material / tipo, também pesquisável */
  material?: string;
  rota: string;
  /** termos extras de busca (sinônimos, apelidos, grafias populares) */
  termos?: string[];
};

/* ------------------------------------------------------------------ */
/* Madeiramento — peça × espécie                                       */
/* ------------------------------------------------------------------ */

type EspecieMadeira = {
  especie: string;
  slug: string;
  material: string;
  pecas: string[];
  termos?: string[];
};

const PECAS_NATIVAS = [
  "Viga",
  "Caibro",
  "Caibrão",
  "Ripa",
  "Ripão",
  "Sarrafo",
  "Tábua",
  "Dormente",
];

const ESPECIES: EspecieMadeira[] = [
  {
    especie: "Cambará",
    slug: "cambara",
    material: "Madeira nativa",
    pecas: PECAS_NATIVAS,
    termos: ["cambara rosa", "madeira pra telhado", "madeira de telhado"],
  },
  {
    especie: "Peroba",
    slug: "peroba",
    material: "Madeira nativa",
    pecas: PECAS_NATIVAS,
    termos: ["peroba do norte", "peroba d'agua", "peroba dagua", "madeira pra telhado"],
  },
  {
    especie: "Garapeira",
    slug: "garapeira",
    material: "Madeira nativa",
    pecas: PECAS_NATIVAS,
    termos: ["garapa", "garapeia", "madeira pra telhado"],
  },
  {
    especie: "Jatobá",
    slug: "jatoba",
    material: "Madeira de lei",
    pecas: PECAS_NATIVAS,
    termos: ["jatoba", "madeira de lei", "madeira pra telhado"],
  },
  {
    especie: "Pinus",
    slug: "pinus",
    material: "Madeira de reflorestamento",
    pecas: ["Sarrafo", "Tábua", "Pontalete"],
    termos: ["pinos", "pinho", "madeira pra telhado", "madeira de obra"],
  },
  {
    especie: "Cedrinho",
    slug: "cedrinho",
    material: "Madeira de reflorestamento",
    pecas: ["Sarrafo", "Tábua"],
    termos: ["cedro", "cedrinho forro"],
  },
];

const madeiramentoPecas: ItemBusca[] = ESPECIES.flatMap((e) =>
  e.pecas.map((peca) => ({
    id: `${e.slug}-${peca}`,
    nome: `${peca} de ${e.especie}`,
    especie: e.especie,
    categoria: "Madeiramento",
    material: e.material,
    rota: `/catalogo/madeiramento/${e.slug}?peca=${encodeURIComponent(peca)}`,
    termos: [peca, e.especie, ...(e.termos ?? [])],
  })),
);

const madeiramentoProdutos: ItemBusca[] = [
  ...ESPECIES.map((e) => ({
    id: `especie-${e.slug}`,
    nome: e.especie,
    categoria: "Madeiramento",
    material: e.material,
    rota: `/catalogo/madeiramento/${e.slug}`,
    termos: [...(e.termos ?? []), "madeira", "madeiramento", "estrutura de telhado"],
  })),
  {
    id: "amescla",
    nome: "Amescla",
    categoria: "Madeiramento",
    material: "Madeira bruta",
    rota: "/catalogo/madeiramento/amescla",
    termos: ["amescla", "sarrafo barato", "tabua economica", "madeira de obra"],
  },
  {
    id: "eucalipto",
    nome: "Eucalipto Tratado",
    categoria: "Madeiramento",
    material: "Autoclave",
    rota: "/catalogo/madeiramento/eucalipto",
    termos: ["eucalipto", "madeira tratada", "autoclave", "roliço", "rolico"],
  },
  {
    id: "pontalete-eucalipto",
    nome: "Pontalete de Eucalipto",
    categoria: "Madeiramento",
    material: "Autoclave",
    rota: "/catalogo/madeiramento/pontalete-eucalipto",
    termos: ["pontalete", "escora", "escoramento", "pilarete"],
  },
  {
    id: "mourao",
    nome: "Mourão Tratado",
    categoria: "Madeiramento",
    material: "Autoclave",
    rota: "/catalogo/madeiramento/mourao-tratado",
    termos: ["mourao", "moirão", "moirao", "poste de cerca", "estaca", "cerca"],
  },
  {
    id: "madeirit",
    nome: "Madeirit / Compensado",
    categoria: "Madeiramento",
    material: "Compensado",
    rota: "/catalogo/madeiramento/madeirit",
    termos: ["madeirite", "madeirit", "compensado", "chapa de madeira", "plastificado"],
  },
  {
    id: "tabeira",
    nome: "Tabeira",
    categoria: "Madeiramento",
    material: "Acabamento",
    rota: "/catalogo/madeiramento/tabeira",
    termos: ["tabeira", "testeira", "acabamento de beiral", "boleada", "desenhada"],
  },
  {
    id: "deck",
    nome: "Deck de Madeira",
    categoria: "Madeiramento",
    material: "Cumaru, Garapeia e Pinus",
    rota: "/catalogo/madeiramento/tabeiras-deck",
    termos: ["deck", "deck de piscina", "cumaru", "garapeia", "piso externo"],
  },
  {
    id: "forro-pvc",
    nome: "Forro de PVC",
    categoria: "Forro",
    material: "PVC",
    rota: "/catalogo/madeiramento/forro-pvc",
    termos: ["forro pvc", "forro de plastico", "forro branco", "rodaforro"],
  },
  {
    id: "forro-pinus",
    nome: "Forro de Pinus",
    categoria: "Forro",
    material: "Madeira",
    rota: "/catalogo/madeiramento/forro-pinus",
    termos: ["forro de madeira", "forro pinus", "lambri"],
  },
  {
    id: "forro-cedrinho",
    nome: "Forro de Cedrinho",
    categoria: "Forro",
    material: "Madeira",
    rota: "/catalogo/madeiramento/forro-cedrinho",
    termos: ["forro de madeira", "forro cedrinho", "lambri de cedrinho"],
  },
];

/* ------------------------------------------------------------------ */
/* Telhas                                                              */
/* ------------------------------------------------------------------ */

const MODELOS_CERAMICA = [
  { modelo: "Portuguesa", termos: ["portuguesa"] },
  { modelo: "Romana", termos: ["romana", "r13", "r17"] },
  { modelo: "Francesa (Marselha)", termos: ["francesa", "marselha"] },
  { modelo: "Mediterrânea", termos: ["mediterranea", "mediterrânea", "prime"] },
];

const telhasCeramica: ItemBusca[] = MODELOS_CERAMICA.map((m) => ({
  id: `ceramica-${m.modelo}`,
  nome: `Telha ${m.modelo}`,
  especie: "Cerâmica (barro)",
  categoria: "Telhas",
  material: "Cerâmica",
  rota: `/catalogo/telhas/ceramica?modelo=${encodeURIComponent(m.modelo)}`,
  termos: [...m.termos, "telha de barro", "ceramica", "cerâmica", "telha de ceramica"],
}));

const telhas: ItemBusca[] = [
  ...telhasCeramica,
  {
    id: "colonial-pvc",
    nome: "Telha Colonial de PVC",
    especie: "Isotec / TopTelha",
    categoria: "Telhas",
    material: "PVC",
    rota: "/catalogo/telhas/colonial-pvc",
    termos: ["colonial", "pvc", "telha de plastico", "isotec", "toptelha", "romana pvc"],
  },
  {
    id: "plan-pvc",
    nome: "Telha Plan de PVC",
    especie: "Isotec / TopTelha",
    categoria: "Telhas",
    material: "PVC",
    rota: "/catalogo/telhas/plan-pvc",
    termos: ["plan", "pvc", "telha plana", "isotec", "toptelha", "romana pvc"],
  },
  {
    id: "fibrocimento",
    nome: "Telha de Fibrocimento",
    categoria: "Telhas",
    material: "Fibrocimento",
    rota: "/catalogo/telhas/fibrocimento",
    termos: [
      "fibrocimento",
      "telha de amianto",
      "amianto",
      "brasilit",
      "eternit",
      "ondulada",
      "telha de cimento",
    ],
  },
  {
    id: "concreto",
    nome: "Telha de Concreto",
    especie: "Eurotop",
    categoria: "Telhas",
    material: "Concreto",
    rota: "/catalogo/telhas/concreto",
    termos: ["concreto", "eurotop", "telha de cimento"],
  },
  {
    id: "esmaltada",
    nome: "Telha Esmaltada",
    categoria: "Telhas",
    material: "Cerâmica esmaltada",
    rota: "/catalogo/telhas/esmaltada",
    termos: ["esmaltada", "telha colorida", "telha vitrificada"],
  },
  {
    id: "policarbonato",
    nome: "Telha de Policarbonato",
    categoria: "Telhas",
    material: "Policarbonato",
    rota: "/catalogo/telhas/policarbonato",
    termos: ["policarbonato", "translucida", "translúcida", "telha transparente", "alveolar"],
  },
  {
    id: "polipropileno",
    nome: "Telha de Polipropileno",
    especie: "Luxtelhas / Fibrarte",
    categoria: "Telhas",
    material: "Polipropileno",
    rota: "/catalogo/telhas/polipropileno",
    termos: [
      "polipropileno",
      "translucida",
      "luxtelhas",
      "fibrarte",
      "telha transparente",
      "romana translucida",
    ],
  },
  {
    id: "pet",
    nome: "Telha PET Translúcida",
    categoria: "Telhas",
    material: "PET transparente reciclado",
    rota: "/catalogo/telhas/pet",
    termos: [
      "pet",
      "telha pet",
      "telha plastica transparente",
      "lubian",
      "cejatel",
      "vilhena",
      "telha transparente",
      "ponto de luz",
    ],
  },
  {
    id: "vidro",
    nome: "Telha de Vidro",
    categoria: "Telhas",
    material: "Vidro",
    rota: "/catalogo/telhas/vidro",
    termos: [
      "vidro",
      "telha de vidro",
      "telha francesa de vidro",
      "romana de vidro",
      "portuguesa de vidro",
      "mediterranea de vidro",
      "ponto de luz",
    ],
  },

  {
    id: "cumeeiras",
    nome: "Cumeeiras e Espigões",
    categoria: "Telhas",
    material: "Barro, PVC, Fibrocimento e Concreto",
    rota: "/catalogo/telhas/cumeeiras",
    termos: ["cumeeira", "espigao", "espigão", "capa", "arremate de telhado"],
  },
];

/* ------------------------------------------------------------------ */
/* Calhas, Fixadores e Tintas                                          */
/* ------------------------------------------------------------------ */

const calhas: ItemBusca[] = [
  {
    id: "calha-alge",
    nome: "Calha Alge / Aquapluv",
    categoria: "Calhas",
    material: "PVC",
    rota: "/catalogo/calhas/calha-alge",
    termos: ["calha", "aquapluv", "agua de chuva", "condutor", "algeco"],
  },
  {
    id: "rufo",
    nome: "Rufo Galvanizado",
    categoria: "Calhas",
    material: "Aço galvanizado",
    rota: "/catalogo/calhas/rufo",
    termos: ["rufo", "rufo de parede", "corte 33", "pingadeira", "acabamento de parede"],
  },
  {
    id: "acessorios-calha",
    nome: "Acessórios de Calha (moldura e platibanda)",
    categoria: "Calhas",
    rota: "/catalogo/calhas/acessorios",
    termos: ["moldura", "platibanda", "bocal", "cabeceira", "suporte de calha"],
  },
  {
    id: "manta-termica",
    nome: "Manta Térmica Aluminizada",
    categoria: "Calhas",
    material: "Alumínio",
    rota: "/catalogo/calhas/manta-termica",
    termos: ["manta termica", "manta aluminizada", "isolamento", "subcobertura", "calor"],
  },
  {
    id: "manta-asfaltica",
    nome: "Manta Asfáltica",
    categoria: "Calhas",
    material: "Asfalto",
    rota: "/catalogo/calhas/manta-asfaltica",
    termos: ["manta asfaltica", "impermeabilizacao", "infiltracao", "laje"],
  },
];

const fixadores: ItemBusca[] = [
  {
    id: "parafusos-telha",
    nome: "Parafusos para Telha",
    categoria: "Fixadores",
    rota: "/catalogo/fixadores/parafusos-telha",
    termos: ["parafuso de telha", "parafuso com vedacao", "kit de fixacao", "gancho"],
  },
  {
    id: "parafusos-madeira",
    nome: "Parafusos para Madeira",
    categoria: "Fixadores",
    rota: "/catalogo/fixadores/parafusos-madeira",
    termos: ["parafuso de madeira", "chipboard", "cabeca chata"],
  },
  {
    id: "pregos",
    nome: "Pregos",
    categoria: "Fixadores",
    rota: "/catalogo/fixadores/pregos",
    termos: ["prego", "prego telheiro", "prego polido", "prego com cabeca", "prego sem cabeca"],
  },
  {
    id: "arames",
    nome: "Arame",
    categoria: "Fixadores",
    rota: "/catalogo/fixadores/arames",
    termos: ["arame", "arame recozido", "amarracao de telha", "arame galvanizado"],
  },
  {
    id: "buchas-arruelas",
    nome: "Buchas e Arruelas",
    categoria: "Fixadores",
    rota: "/catalogo/fixadores/buchas-arruelas",
    termos: ["bucha", "arruela", "vedacao", "chumbador"],
  },
  {
    id: "ferramentas",
    nome: "Ferramentas",
    categoria: "Fixadores",
    rota: "/catalogo/fixadores/ferramentas",
    termos: ["ferramenta", "broca", "serra", "martelo"],
  },
];

const tintas: ItemBusca[] = [
  {
    id: "tinta-emborrachada",
    nome: "Tinta Emborrachada",
    categoria: "Tintas",
    rota: "/catalogo/tintas/tinta-emborrachada",
    termos: ["tinta", "emborrachada", "acrilica", "tinta de telha", "impermeabilizante", "pintura"],
  },
  {
    id: "verniz",
    nome: "Verniz Sayerlack",
    categoria: "Tintas",
    rota: "/catalogo/tintas/verniz",
    termos: ["verniz", "sayerlack", "poliulack", "polikol", "polideck", "acabamento de madeira"],
  },
  {
    id: "stain",
    nome: "Stain para Madeira (Polisten)",
    categoria: "Tintas",
    rota: "/catalogo/tintas/stain",
    termos: ["stain", "polisten", "sayerlack", "protecao de madeira", "deck"],
  },
  {
    id: "cupicida",
    nome: "Exterminador de Cupim",
    categoria: "Tintas",
    rota: "/catalogo/tintas/cupicida",
    termos: ["cupim", "cupinicida", "cupicida", "inseticida de madeira"],
  },
  {
    id: "pu-calha",
    nome: "PU para Calha",
    categoria: "Tintas",
    rota: "/catalogo/tintas/pu-calha",
    termos: ["pu", "poliuretano", "vedacao de calha", "cola de calha", "silicone"],
  },
  {
    id: "cola",
    nome: "Cola",
    categoria: "Tintas",
    rota: "/catalogo/tintas/cola",
    termos: ["cola", "adesivo", "cola de pvc"],
  },
  {
    id: "aguarras",
    nome: "Aguarrás / Thinner",
    categoria: "Tintas",
    rota: "/catalogo/tintas/aguarras",
    termos: ["aguarras", "thinner", "solvente", "diluente"],
  },
  {
    id: "lixas",
    nome: "Lixas",
    categoria: "Tintas",
    rota: "/catalogo/tintas/lixas",
    termos: ["lixa", "lixamento"],
  },
  {
    id: "lona-plastica",
    nome: "Lona Plástica",
    categoria: "Tintas",
    rota: "/catalogo/tintas/lona-plastica",
    termos: ["lona", "lona preta", "protecao de obra"],
  },
  {
    id: "acessorios-pintura",
    nome: "Acessórios de Pintura",
    categoria: "Tintas",
    rota: "/catalogo/tintas/acessorios-pintura",
    termos: ["rolo", "pincel", "bandeja", "fita crepe"],
  },
];

const ferramentasSite: ItemBusca[] = [
  {
    id: "calculadora",
    nome: "Calculadora de Telhado",
    categoria: "Ferramentas",
    rota: "/calculadora",
    termos: ["calculadora", "calcular telhas", "quantas telhas", "m2", "area de telhado"],
  },
  {
    id: "guias",
    nome: "Guias e Glossário",
    categoria: "Ferramentas",
    rota: "/ferramentas",
    termos: ["guia", "glossario", "comparativo", "duvidas"],
  },
];

export const ITENS_BUSCA: ItemBusca[] = [
  ...telhas,
  ...madeiramentoPecas,
  ...madeiramentoProdutos,
  ...calhas,
  ...fixadores,
  ...tintas,
  ...ferramentasSite,
];

/**
 * Sinônimos e apelidos populares → termos oficiais.
 * A lista pode crescer com o tempo sem alterar o componente de busca.
 */
export const SINONIMOS: Record<string, string[]> = {
  "telha de amianto": ["fibrocimento"],
  amianto: ["fibrocimento"],
  brasilit: ["fibrocimento"],
  eternit: ["fibrocimento"],
  "telha de barro": ["ceramica"],
  "telha de ceramica": ["ceramica"],
  "telha de plastico": ["pvc"],
  "telha transparente": ["policarbonato", "polipropileno", "vidro"],
  translucida: ["policarbonato", "polipropileno", "vidro"],
  "telha francesa de vidro": ["vidro francesa"],
  "madeira pra telhado": ["cambara", "pinus", "garapeira"],
  "madeira para telhado": ["cambara", "pinus", "garapeira"],
  "estrutura de telhado": ["cambara", "pinus", "garapeira", "caibro", "ripa", "viga"],
  "madeira de obra": ["pinus", "amescla", "pontalete"],
  moirao: ["mourao"],
  madeirite: ["madeirit"],
  testeira: ["tabeira"],
  "agua de chuva": ["calha"],
  goteira: ["calha", "manta"],
  infiltracao: ["manta asfaltica", "vedacao"],
  cupim: ["cupicida"],
  "telha de cimento": ["fibrocimento", "concreto"],
};

/** Categorias sugeridas quando a busca não encontra nada. */
export const CATEGORIAS_SUGERIDAS = [
  { nome: "Telhas", rota: "/catalogo/telhas" },
  { nome: "Madeiramento", rota: "/catalogo/madeiramento" },
  { nome: "Calhas e Rufos", rota: "/catalogo/calhas" },
  { nome: "Fixadores", rota: "/catalogo/fixadores" },
  { nome: "Tintas e Vernizes", rota: "/catalogo/tintas" },
];

export function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function alvoBusca(item: ItemBusca) {
  return normalizar(
    [item.nome, item.especie, item.categoria, item.material, ...(item.termos ?? [])]
      .filter(Boolean)
      .join(" "),
  );
}

const ALVOS = new Map(ITENS_BUSCA.map((i) => [i.id, alvoBusca(i)]));

/** Expande a consulta com sinônimos conhecidos. */
function expandir(consulta: string): string[] {
  const q = normalizar(consulta);
  const extras = new Set<string>();
  for (const [apelido, oficiais] of Object.entries(SINONIMOS)) {
    if (q.includes(normalizar(apelido))) oficiais.forEach((o) => extras.add(normalizar(o)));
  }
  return [q, ...extras];
}

export function buscar(consulta: string, limite = 12): ItemBusca[] {
  const termo = normalizar(consulta);
  if (termo.length < 2) return [];
  const consultas = expandir(consulta);

  const pontuados = ITENS_BUSCA.map((item) => {
    const alvo = ALVOS.get(item.id) ?? "";
    const nome = normalizar(item.nome);
    let pontos = 0;

    for (const q of consultas) {
      const palavras = q.split(" ").filter((p) => p.length > 1);
      const todas = palavras.every((p) => alvo.includes(p));
      if (!todas) continue;
      const principal = q === termo;
      pontos = Math.max(
        pontos,
        (nome.startsWith(q) ? 100 : nome.includes(q) ? 70 : 40) + (principal ? 10 : 0),
      );
    }
    return { item, pontos };
  })
    .filter((p) => p.pontos > 0)
    .sort((a, b) => b.pontos - a.pontos || a.item.nome.localeCompare(b.item.nome));

  return pontuados.slice(0, limite).map((p) => p.item);
}

export function agrupar(itens: ItemBusca[]) {
  const grupos = new Map<string, ItemBusca[]>();
  itens.forEach((i) => {
    const lista = grupos.get(i.categoria) ?? [];
    lista.push(i);
    grupos.set(i.categoria, lista);
  });
  return [...grupos.entries()].map(([categoria, itens]) => ({ categoria, itens }));
}
