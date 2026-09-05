/**
 * Monta o "Catálogo Completo" (versão PDF) a partir dos dados que já existem
 * nas fichas de produto do site — nada é cadastrado duas vezes.
 * Qualquer foto/opção nova numa ficha aparece automaticamente aqui.
 */
import type { ConfiguradorConfig, Selecao } from "@/components/site/ConfiguradorGenerico";
import { TELHAS_SUBCARDS } from "@/components/site/TelhasSubcards";
import { MADEIRAMENTO_SUBCARDS } from "@/components/site/MadeiramentoSubcards";
import { CARDS as CARDS_CALHAS } from "@/pages/catalogo/Calhas";
import { CARDS as CARDS_TINTAS } from "@/pages/catalogo/Tintas";
import { CARDS as CARDS_FIXADORES } from "@/pages/catalogo/Fixadores";
import {
  CONFIG_CONCRETO,
  CONFIG_ESMALTADA,
  CONFIG_POLIPROPILENO,
  CONFIG_PET,
  CONFIG_VIDRO,
} from "@/data/configs/telhas";
import { CONFIG_CUMEEIRAS } from "@/data/configs/cumeeiras";
import {
  CONFIG_PEROBA,
  CONFIG_GARAPEIRA,
  CONFIG_AMESCLA,
  CONFIG_TABEIRA,
  CONFIG_TABEIRAS_DECK,
  CONFIG_MOURAO,
  CONFIG_JATOBA,
} from "@/data/configs/madeiramento";
import {
  CONFIG_CALHA_ALGE,
  CONFIG_RUFO,
  CONFIG_MANTA_TERMICA,
  CONFIG_MANTA_ASFALTICA,
  CONFIG_ACESSORIOS_CALHA,
} from "@/data/configs/calhas";
import {
  CONFIG_PARAFUSOS_TELHA,
  CONFIG_PREGOS,
  CONFIG_ARAMES,
  CONFIG_BUCHAS_ARRUELAS,
  CONFIG_PARAFUSOS_MADEIRA,
  CONFIG_FERRAMENTAS,
} from "@/data/configs/fixadores";
import {
  CONFIG_VERNIZ,
  CONFIG_STAIN,
  CONFIG_EMBORRACHADA,
  CONFIG_CUPICIDA,
  CONFIG_AGUARRAS,
  CONFIG_ACESSORIOS_PINTURA,
  CONFIG_LIXAS,
  CONFIG_COLA,
  CONFIG_PU_CALHA,
  CONFIG_LONA,
} from "@/data/configs/tintas";
import {
  imagensCeramica,
  imagensFibrocimento,
  imagensColonialPVC,
  imagensPolicarbonato,
  imagensCambara,
  imagensCedrinho,
  imagensPinus,
  imagensEucalipto,
  imagensMadeirit,
  imagensForroPVC,
  imagensForroCedrinho,
  imagensForroPinus,
  imagensTintas,
  imagensCalhas,
  galeriaPlanPVC,
} from "@/data/imagensProduto";
import type { ImagemProduto } from "@/components/GaleriaProduto";

export type ProdutoPdf = {
  slug: string;
  nome: string;
  descricao: string;
  fotos: { src: string; alt: string }[];
  opcoes: { label: string; valores: string[] }[];
  href: string;
};

export type SecaoPdf = {
  id: string;
  titulo: string;
  descricao: string;
  produtos: ProdutoPdf[];
};

const MAX_FOTOS = 3;

/** remove emojis e espaços duplicados dos títulos das fichas */
function limpar(texto: string) {
  return texto
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function juntarFotos(...listas: (ImagemProduto[] | undefined)[]) {
  const out: { src: string; alt: string }[] = [];
  const vistos = new Set<string>();
  for (const lista of listas) {
    for (const img of lista ?? []) {
      if (!img?.src || vistos.has(img.src)) continue;
      vistos.add(img.src);
      out.push({ src: img.src, alt: img.alt ?? "" });
      if (out.length >= MAX_FOTOS) return out;
    }
  }
  return out;
}

function todasDoMapa(mapa: Record<string, ImagemProduto[]>) {
  return Object.values(mapa).flat();
}

/** Opções (cor, formato, acabamento, tipo) lidas direto dos passos da ficha. */
function opcoesDaConfig(cfg: ConfiguradorConfig) {
  const base: Selecao = {};
  return cfg.passos
    .filter((p) => p.tipo !== "quantidade")
    .map((p) => {
      const ops = typeof p.opcoes === "function" ? p.opcoes(base) : (p.opcoes ?? []);
      return {
        label: limpar(p.titulo),
        valores: ops.map((o) => o.label ?? o.valor).filter(Boolean),
      };
    })
    .filter((g) => g.valores.length > 0);
}

/** Fotos da ficha: varre as opções do 1º passo visual e junta as galerias. */
function fotosDaConfig(cfg: ConfiguradorConfig) {
  const listas: ImagemProduto[][] = [];
  try {
    listas.push(cfg.imagens({}));
  } catch {
    /* ignora */
  }
  const passo = cfg.passos.find((p) => p.tipo !== "quantidade");
  if (passo) {
    const ops = typeof passo.opcoes === "function" ? passo.opcoes({}) : (passo.opcoes ?? []);
    for (const o of ops.slice(0, 6)) {
      try {
        listas.push(cfg.imagens({ [passo.chave]: o.valor }));
      } catch {
        /* ignora */
      }
    }
  }
  return juntarFotos(...listas);
}

type Grupo = { label: string; valores: string[] };
type Extra = { fotos?: ImagemProduto[]; config?: ConfiguradorConfig; opcoes?: Grupo[] };

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Opções derivadas das chaves das galerias já cadastradas. */
function chaves(mapa: Record<string, unknown>, label: string, prefixo = false): Grupo {
  const brutas = Object.keys(mapa).map((k) => (prefixo ? k.split("-")[0] : k));
  return { label, valores: Array.from(new Set(brutas)).map(cap) };
}

const OPCOES_MADEIRA: Grupo[] = [
  { label: "Tipos", valores: [...TIPOS_MADEIRA] },
  { label: "Acabamento", valores: ["Bruto", "Aparelhado em plaina"] },
  { label: "Comprimentos", valores: [COMPRIMENTOS_MADEIRA[0], "…", COMPRIMENTOS_MADEIRA.at(-1)!] },
];

const EXTRAS: Record<string, Extra> = {
  // Telhas
  fibrocimento: {
    fotos: todasDoMapa(imagensFibrocimento),
    opcoes: [
      chaves(imagensFibrocimento, "Dimensões"),
      { label: "Espessuras", valores: ["5mm", "6mm", "8mm"] },
    ],
  },
  "colonial-pvc": {
    fotos: todasDoMapa(imagensColonialPVC),
    opcoes: [chaves(imagensColonialPVC, "Cores")],
  },
  "plan-pvc": {
    fotos: [...galeriaPlanPVC("Terracota"), ...galeriaPlanPVC("Marfim"), ...galeriaPlanPVC("Cinza")],
    opcoes: [{ label: "Cores", valores: ["Terracota", "Marfim", "Cinza"] }],
  },
  ceramica: {
    fotos: todasDoMapa(imagensCeramica),
    opcoes: [
      chaves(imagensCeramica, "Formatos", true),
      { label: "Acabamento", valores: ["Natural", "Resinado", "Esmaltado"] },
    ],
  },
  policarbonato: {
    fotos: todasDoMapa(imagensPolicarbonato),
    opcoes: [chaves(imagensPolicarbonato, "Perfis")],
  },
  concreto: { config: CONFIG_CONCRETO },
  esmaltada: { config: CONFIG_ESMALTADA },
  polipropileno: { config: CONFIG_POLIPROPILENO },
  pet: { config: CONFIG_PET },
  vidro: { config: CONFIG_VIDRO },
  cumeeiras: { config: CONFIG_CUMEEIRAS },

  // Madeiramento
  cambara: { fotos: todasDoMapa(imagensCambara), opcoes: OPCOES_MADEIRA },
  cedrinho: { fotos: todasDoMapa(imagensCedrinho), opcoes: [chaves(imagensCedrinho, "Tipos")] },
  pinus: { fotos: todasDoMapa(imagensPinus), opcoes: [chaves(imagensPinus, "Tipos")] },
  eucalipto: { fotos: todasDoMapa(imagensEucalipto) },
  madeirit: { fotos: todasDoMapa(imagensMadeirit), opcoes: [chaves(imagensMadeirit, "Linhas")] },
  "forro-pvc": { fotos: imagensForroPVC },
  "forro-cedrinho": { fotos: imagensForroCedrinho },
  "forro-pinus": { fotos: imagensForroPinus },
  peroba: { config: CONFIG_PEROBA },
  garapeira: { config: CONFIG_GARAPEIRA },
  jatoba: { config: CONFIG_JATOBA },
  amescla: { config: CONFIG_AMESCLA },
  tabeira: { config: CONFIG_TABEIRA },
  "tabeiras-deck": { config: CONFIG_TABEIRAS_DECK },
  "mourao-tratado": { config: CONFIG_MOURAO },


  // Calhas
  "calha-alge": { config: CONFIG_CALHA_ALGE, fotos: todasDoMapa(imagensCalhas) },
  rufo: { config: CONFIG_RUFO },
  "manta-termica": { config: CONFIG_MANTA_TERMICA },
  "manta-asfaltica": { config: CONFIG_MANTA_ASFALTICA },
  acessorios: { config: CONFIG_ACESSORIOS_CALHA },

  // Fixadores
  "parafusos-telha": { config: CONFIG_PARAFUSOS_TELHA },
  pregos: { config: CONFIG_PREGOS },
  arames: { config: CONFIG_ARAMES },
  "buchas-arruelas": { config: CONFIG_BUCHAS_ARRUELAS },
  "parafusos-madeira": { config: CONFIG_PARAFUSOS_MADEIRA },
  ferramentas: { config: CONFIG_FERRAMENTAS },

  // Tintas
  verniz: { config: CONFIG_VERNIZ, fotos: todasDoMapa(imagensTintas) },
  stain: { config: CONFIG_STAIN },
  "tinta-emborrachada": { config: CONFIG_EMBORRACHADA },
  cupicida: { config: CONFIG_CUPICIDA },
  aguarras: { config: CONFIG_AGUARRAS },
  "acessorios-pintura": { config: CONFIG_ACESSORIOS_PINTURA },
  lixas: { config: CONFIG_LIXAS },
  cola: { config: CONFIG_COLA },
  "pu-calha": { config: CONFIG_PU_CALHA },
  "lona-plastica": { config: CONFIG_LONA },
};

type Entrada = {
  slug: string;
  name: string;
  description: string;
  image?: string;
  tags?: string[];
};

function montar(categoriaSlug: string, entradas: Entrada[]): ProdutoPdf[] {
  return entradas.map((e) => {
    const extra = EXTRAS[e.slug] ?? {};
    const daConfig = extra.config ? fotosDaConfig(extra.config) : [];
    const fotos = juntarFotos(
      daConfig,
      extra.fotos,
      e.image ? [{ src: e.image, alt: e.name }] : [],
    );
    const opcoes = extra.config
      ? opcoesDaConfig(extra.config)
      : e.tags?.length
        ? [{ label: "Opções disponíveis", valores: e.tags }]
        : [];
    return {
      slug: e.slug,
      nome: limpar(e.name),
      descricao: e.description,
      fotos,
      opcoes,
      href: `/catalogo/${categoriaSlug}/${e.slug}`,
    };
  });
}

export const SECOES_PDF: SecaoPdf[] = [
  {
    id: "telhas",
    titulo: "Telhas e Cobertura",
    descricao:
      "Fibrocimento, cerâmica, concreto, PVC, translúcidas e cumeeiras — cobertura completa para a sua obra.",
    produtos: montar("telhas", TELHAS_SUBCARDS),
  },
  {
    id: "madeiramento",
    titulo: "Madeiras e Estruturas",
    descricao:
      "Madeira de lei e reflorestamento, bruta ou aparelhada em plaina, forros, decks e compensados.",
    produtos: montar("madeiramento", MADEIRAMENTO_SUBCARDS),
  },
  {
    id: "calhas",
    titulo: "Calhas, Rufos e Funilaria",
    descricao:
      "Calhas e rufos galvanizados, mantas térmicas e asfálticas e todos os acessórios de captação.",
    produtos: montar("calhas", CARDS_CALHAS),
  },
  {
    id: "tintas",
    titulo: "Tintas, Vernizes e Acabamentos",
    descricao:
      "Linha Sayerlack completa, tintas emborrachadas, colas, selantes e acessórios de pintura.",
    produtos: montar("tintas", CARDS_TINTAS),
  },
  {
    id: "fixadores",
    titulo: "Ferramentas, Ferragens e Materiais de Fixação",
    descricao:
      "Parafusos, pregos, arames, buchas, barras roscadas e a linha de ferramentas Bestfer.",
    produtos: montar("fixadores", CARDS_FIXADORES),
  },
];
