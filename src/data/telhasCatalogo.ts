/**
 * Registro técnico único das telhas do catálogo (/catalogo/telhas).
 *
 * FONTE DE VERDADE: planilha "Ficha Técnica Mestre" (Rocha Telhas), com os
 * dados de ficha técnica de fabricante (Afort, Infibra, Isotec, TopTelha,
 * Pereira Rodrigues, Eurotop, Premier).
 *
 * `confirmado: false` = dado ainda NÃO confirmado em ficha oficial (marcado em
 * vermelho itálico na planilha). A calculadora exibe esse aviso ao cliente.
 */

export type FamiliaTelha =
  | "fibrocimento"
  | "pvc"
  | "ceramica"
  | "policarbonato"
  | "concreto"
  | "translucida"
  | "pet"
  | "vidro";


/** peça de acabamento (cumeeira ou espigão) com o comprimento útil real da peça */
export type PecaAcabamento = {
  nome: string;
  /** metros cobertos por peça (comprimento útil, já com sobreposição) */
  util: number;
  chave: string | null;
  confirmado: boolean;
};

export type TelhaCatalogo = {
  id: string;
  label: string;
  /** grupo de exibição (agrupa no select) */
  grupo: string;
  /** fabricante / marca da ficha técnica usada */
  fabricante: string;
  /** rota do produto no catálogo */
  href: string;
  /** peças por m² de telhado inclinado */
  rendimento: number;
  /** inclinação mínima em % */
  min: number;
  familia: FamiliaTelha;
  /** peso aproximado da cobertura em kg por m² */
  pesoM2: number;
  /** peso aproximado de uma peça, em kg */
  pesoPeca: number;
  /** galga (distância entre ripas) — só para telhas de encaixe */
  galga: string | null;
  /** chave na tabela interna de preços (usada só para o comparativo percentual) */
  chavePreco: string | null;
  /** true quando rendimento/peso/inclinação vêm de ficha técnica oficial */
  confirmado: boolean;
  /** observação exibida quando o dado ainda precisa de confirmação */
  notaDados?: string;
  cumeeira: PecaAcabamento;
  espigao: PecaAcabamento;
  /**
   * false = produto pontual (ponto de luz natural), não é usado para cobrir o
   * telhado inteiro; fica fora do seletor principal da calculadora.
   */
  usoCobertura: boolean;
  /** comprimento nominal da peça (m) — usado no cálculo dinâmico do fibrocimento */
  comprimentoPeca?: number;
  /** largura útil da peça (m) — 0,87 (nominal 0,92) ou 1,05 (nominal 1,10) */
  larguraUtil?: number;
  /** espessura nominal (fibrocimento) */
  espessura?: string;
};

/**
 * Recobrimento longitudinal adotado (m) conforme a inclinação da cobertura —
 * tabela Infibra (aba "Fibrocimento (Infibra)" da planilha mestre):
 *  15° (26,8%) ou mais → 14 cm · 10°–15° (17,6%–26,8%) → 20 cm ·
 *  5°–10° (9%–17,6%, só telhas de 6 e 8 mm) → 25 cm.
 */
export const recobrimentoFibro = (inclPct: number) =>
  inclPct >= 26.8 ? 0.14 : inclPct >= 17.6 ? 0.2 : 0.25;

/** Área útil real de uma telha de fibrocimento na inclinação informada (m²) */
export const areaUtilFibro = (t: TelhaCatalogo, inclPct: number) =>
  (t.larguraUtil ?? 1.05) * ((t.comprimentoPeca ?? 2.44) - recobrimentoFibro(inclPct));

/**
 * Rendimento (telhas/m²) usado no cálculo. Para o fibrocimento o valor é
 * dinâmico: 1 ÷ área útil por telha, que muda com a inclinação. Para as demais
 * famílias vale o rendimento de ficha técnica do fabricante.
 */
export const rendimentoTelha = (t: TelhaCatalogo, inclPct: number) =>
  t.familia === "fibrocimento" && t.comprimentoPeca ? 1 / areaUtilFibro(t, inclPct) : t.rendimento;

/** Peso aproximado da cobertura (kg/m²) coerente com o rendimento aplicado */
export const pesoM2Telha = (t: TelhaCatalogo, inclPct: number) =>
  t.familia === "fibrocimento" && t.comprimentoPeca
    ? rendimentoTelha(t, inclPct) * t.pesoPeca
    : t.pesoM2;

const FIBRO = "/catalogo/telhas/fibrocimento";
const COLONIAL = "/catalogo/telhas/colonial-pvc";
const PLAN = "/catalogo/telhas/plan-pvc";
const CERAMICA = "/catalogo/telhas/ceramica";
const POLI = "/catalogo/telhas/policarbonato";
const PP = "/catalogo/telhas/polipropileno";
const CONCRETO = "/catalogo/telhas/concreto";
const ESMALTADA = "/catalogo/telhas/esmaltada";
const VIDRO = "/catalogo/telhas/vidro";
const PET = "/catalogo/telhas/pet";

/* ---------------- peças de acabamento ---------------- */

// Cerâmica TopTelha: cumeeira 45 cm — consumo 2,4 pç/m (planilha, aba "Cerâmica - Peças Especiais")
const CUM_BARRO: PecaAcabamento = {
  nome: "Cumeeira de barro 45 cm (2,4 pç/m)",
  util: 1 / 2.4,
  chave: "cumeeira.barro",
  confirmado: true,
};
const ESP_BARRO: PecaAcabamento = {
  nome: "Espigão de barro 45 cm (2,4 pç/m)",
  util: 1 / 2.4,
  chave: "cumeeira.barro",
  confirmado: true,
};

const CUM_FIBRO: PecaAcabamento = {
  nome: "Cumeeira normal fibrocimento",
  util: 0.9,
  chave: "cumeeira.fibrocimento",
  confirmado: false,
};
const ESP_FIBRO: PecaAcabamento = {
  nome: "Espigão fibrocimento",
  util: 0.9,
  chave: "cumeeira.fibrocimento",
  confirmado: false,
};

const CUM_PVC: PecaAcabamento = {
  nome: "Cumeeira central articulada PVC",
  util: 0.86,
  chave: "cumeeira.pvc",
  confirmado: false,
};
const ESP_PVC: PecaAcabamento = {
  nome: "Cumeeira espigão articulada PVC",
  util: 0.86,
  chave: "cumeeira.pvc",
  confirmado: false,
};

const NOTA_CONFIRMAR = "Rendimento/peso ainda não confirmados em ficha técnica oficial do fabricante.";

export const TELHAS_CATALOGO: TelhaCatalogo[] = [
  // ---------- Fibrocimento (Infibra — manual de instalação rev. mai/2025) ----------
  // O rendimento NÃO é fixo: a calculadora aplica
  // área útil = largura útil × (comprimento − recobrimento longitudinal),
  // com o recobrimento definido pela inclinação (14/20/25 cm — tabela Infibra).
  // O campo `rendimento` abaixo é só o valor de referência a 15° (recobrimento 14 cm).
  { id: "fib-122", label: "Fibrocimento 1,22 m", grupo: "Fibrocimento INFIBRA", fabricante: "Infibra", href: FIBRO, rendimento: 1 / (1.05 * (1.22 - 0.14)), min: 9, familia: "fibrocimento", pesoM2: 13.2, pesoPeca: 14.3, galga: null, chavePreco: "telha.fib-153", confirmado: true, comprimentoPeca: 1.22, larguraUtil: 1.05, espessura: "6 mm", usoCobertura: true, cumeeira: CUM_FIBRO, espigao: ESP_FIBRO },
  { id: "fib-153", label: "Fibrocimento 1,53 m", grupo: "Fibrocimento INFIBRA", fabricante: "Infibra", href: FIBRO, rendimento: 1 / (1.05 * (1.53 - 0.14)), min: 9, familia: "fibrocimento", pesoM2: 12.9, pesoPeca: 17.9, galga: null, chavePreco: "telha.fib-153", confirmado: true, comprimentoPeca: 1.53, larguraUtil: 1.05, espessura: "6 mm", usoCobertura: true, cumeeira: CUM_FIBRO, espigao: ESP_FIBRO },
  { id: "fib-183", label: "Fibrocimento 1,83 m", grupo: "Fibrocimento INFIBRA", fabricante: "Infibra", href: FIBRO, rendimento: 1 / (1.05 * (1.83 - 0.14)), min: 9, familia: "fibrocimento", pesoM2: 12.1, pesoPeca: 21.4, galga: null, chavePreco: "telha.fib-183", confirmado: true, comprimentoPeca: 1.83, larguraUtil: 1.05, espessura: "6 mm", usoCobertura: true, cumeeira: CUM_FIBRO, espigao: ESP_FIBRO },
  { id: "fib-213", label: "Fibrocimento 2,13 m", grupo: "Fibrocimento INFIBRA", fabricante: "Infibra", href: FIBRO, rendimento: 1 / (1.05 * (2.13 - 0.14)), min: 9, familia: "fibrocimento", pesoM2: 12, pesoPeca: 25, galga: null, chavePreco: "telha.fib-183", confirmado: true, comprimentoPeca: 2.13, larguraUtil: 1.05, espessura: "6 mm", usoCobertura: true, cumeeira: CUM_FIBRO, espigao: ESP_FIBRO },
  { id: "fib-244", label: "Fibrocimento 2,44 m ★", grupo: "Fibrocimento INFIBRA", fabricante: "Infibra", href: FIBRO, rendimento: 1 / (1.05 * (2.44 - 0.14)), min: 9, familia: "fibrocimento", pesoM2: 11.8, pesoPeca: 28.6, galga: null, chavePreco: "telha.fib-244", confirmado: true, comprimentoPeca: 2.44, larguraUtil: 1.05, espessura: "6 mm", usoCobertura: true, cumeeira: CUM_FIBRO, espigao: ESP_FIBRO },
  { id: "fib-305", label: "Fibrocimento 3,05 m", grupo: "Fibrocimento INFIBRA", fabricante: "Infibra", href: FIBRO, rendimento: 1 / (1.05 * (3.05 - 0.14)), min: 9, familia: "fibrocimento", pesoM2: 14.1, pesoPeca: 43, galga: null, chavePreco: "telha.fib-305", confirmado: true, comprimentoPeca: 3.05, larguraUtil: 1.05, espessura: "6 mm", usoCobertura: true, cumeeira: CUM_FIBRO, espigao: ESP_FIBRO },
  { id: "fib-366", label: "Fibrocimento 3,66 m", grupo: "Fibrocimento INFIBRA", fabricante: "Infibra", href: FIBRO, rendimento: 1 / (1.05 * (3.66 - 0.14)), min: 9, familia: "fibrocimento", pesoM2: 14.6, pesoPeca: 51.6, galga: null, chavePreco: "telha.fib-366", confirmado: true, comprimentoPeca: 3.66, larguraUtil: 1.05, espessura: "6 mm", usoCobertura: true, cumeeira: CUM_FIBRO, espigao: ESP_FIBRO },
  { id: "fib-244-92", label: "Fibrocimento 2,44 m × 0,92 m (5 mm)", grupo: "Fibrocimento INFIBRA", fabricante: "Infibra", href: FIBRO, rendimento: 1 / (0.87 * (2.44 - 0.14)), min: 17.6, familia: "fibrocimento", pesoM2: 12.1, pesoPeca: 24.2, galga: null, chavePreco: "telha.fib-244", confirmado: true, comprimentoPeca: 2.44, larguraUtil: 0.87, espessura: "5 mm", notaDados: "Telha de 5 mm exige inclinação mínima de 10° (17,6%), conforme manual Infibra.", usoCobertura: true, cumeeira: CUM_FIBRO, espigao: ESP_FIBRO },

  // ---------- Colonial PVC (Lux Telhas — 5 ondas; dados técnicos ref. Afort) ----------
  { id: "pvc-230", label: "Colonial PVC 2,30 m", grupo: "Colonial PVC", fabricante: "Lux Telhas", href: COLONIAL, rendimento: 1 / 1.53, min: 15, familia: "pvc", pesoM2: 4.4, pesoPeca: 6.7, galga: null, chavePreco: "telha.pvc-230", confirmado: true, usoCobertura: true, cumeeira: CUM_PVC, espigao: ESP_PVC },
  { id: "pvc-262", label: "Colonial PVC 2,62 m", grupo: "Colonial PVC", fabricante: "Lux Telhas", href: COLONIAL, rendimento: 1 / 1.77, min: 15, familia: "pvc", pesoM2: 4.3, pesoPeca: 7.63, galga: null, chavePreco: "telha.pvc-230", confirmado: true, usoCobertura: true, cumeeira: CUM_PVC, espigao: ESP_PVC },
  { id: "pvc-328", label: "Colonial PVC 3,28 m", grupo: "Colonial PVC", fabricante: "Lux Telhas", href: COLONIAL, rendimento: 1 / 2.28, min: 15, familia: "pvc", pesoM2: 4.2, pesoPeca: 9.55, galga: null, chavePreco: "telha.pvc-328", confirmado: true, usoCobertura: true, cumeeira: CUM_PVC, espigao: ESP_PVC },
  { id: "pvc-394", label: "Colonial PVC 3,94 m", grupo: "Colonial PVC", fabricante: "Lux Telhas", href: COLONIAL, rendimento: 1 / 2.78, min: 15, familia: "pvc", pesoM2: 4.1, pesoPeca: 11.47, galga: null, chavePreco: "telha.pvc-328", confirmado: true, usoCobertura: true, cumeeira: CUM_PVC, espigao: ESP_PVC },
  { id: "pvc-459", label: "Colonial PVC 4,59 m", grupo: "Colonial PVC", fabricante: "Lux Telhas", href: COLONIAL, rendimento: 1 / 3.28, min: 15, familia: "pvc", pesoM2: 4.1, pesoPeca: 13.37, galga: null, chavePreco: "telha.pvc-459", confirmado: true, usoCobertura: true, cumeeira: CUM_PVC, espigao: ESP_PVC },
  { id: "pvc-525", label: "Colonial PVC 5,25 m", grupo: "Colonial PVC", fabricante: "Lux Telhas", href: COLONIAL, rendimento: 1 / 3.79, min: 15, familia: "pvc", pesoM2: 4, pesoPeca: 15.29, galga: null, chavePreco: "telha.pvc-525", confirmado: true, usoCobertura: true, cumeeira: CUM_PVC, espigao: ESP_PVC },

  // ---------- Plan PVC (Lux Telhas — 6 ondas; dados técnicos ref. Afort) ----------
  { id: "plan-198", label: "Plan PVC 1,98 m", grupo: "Plan PVC", fabricante: "Lux Telhas", href: PLAN, rendimento: 1 / 1.4, min: 15, familia: "pvc", pesoM2: 3.5, pesoPeca: 4.9, galga: null, chavePreco: "telha.pvc-230", confirmado: true, usoCobertura: true, cumeeira: CUM_PVC, espigao: ESP_PVC },
  { id: "plan-242", label: "Plan PVC 2,42 m", grupo: "Plan PVC", fabricante: "Lux Telhas", href: PLAN, rendimento: 1 / 1.75, min: 15, familia: "pvc", pesoM2: 3.4, pesoPeca: 6, galga: null, chavePreco: "telha.pvc-230", confirmado: true, usoCobertura: true, cumeeira: CUM_PVC, espigao: ESP_PVC },
  { id: "plan-330", label: "Plan PVC 3,30 m", grupo: "Plan PVC", fabricante: "Lux Telhas", href: PLAN, rendimento: 1 / 2.46, min: 15, familia: "pvc", pesoM2: 3.2, pesoPeca: 7.91, galga: null, chavePreco: "telha.pvc-328", confirmado: true, usoCobertura: true, cumeeira: CUM_PVC, espigao: ESP_PVC },

  // ---------- Cerâmica de barro ----------
  { id: "cer-romana-17", label: "Romana R17 (Isotec) — 17 pç/m²", grupo: "Cerâmica de Barro", fabricante: "Isotec", href: CERAMICA, rendimento: 17, min: 35, familia: "ceramica", pesoM2: 39.1, pesoPeca: 2.3, galga: "36,5 cm (LP)", chavePreco: "telha.cer-romana", confirmado: true, usoCobertura: true, cumeeira: CUM_BARRO, espigao: ESP_BARRO },
  { id: "cer-romana-13", label: "Romana R13 (TopTelha) — 13 pç/m²", grupo: "Cerâmica de Barro", fabricante: "TopTelha", href: CERAMICA, rendimento: 13, min: 30, familia: "ceramica", pesoM2: 39, pesoPeca: 3, galga: "37,7 cm", chavePreco: "telha.cer-romana", confirmado: true, notaDados: "Inclinação de 30% vale para água de até 3 m — acima disso, ver tabela TopTelha.", usoCobertura: true, cumeeira: CUM_BARRO, espigao: ESP_BARRO },
  { id: "cer-port", label: "Portuguesa (Isotec)", grupo: "Cerâmica de Barro", fabricante: "Isotec", href: CERAMICA, rendimento: 17, min: 35, familia: "ceramica", pesoM2: 39.1, pesoPeca: 2.3, galga: "37,2 cm (LP)", chavePreco: "telha.cer-port", confirmado: true, usoCobertura: true, cumeeira: CUM_BARRO, espigao: ESP_BARRO },
  { id: "cer-amer", label: "Americana (Pereira Rodrigues)", grupo: "Cerâmica de Barro", fabricante: "Pereira Rodrigues", href: CERAMICA, rendimento: 12, min: 30, familia: "ceramica", pesoM2: 40, pesoPeca: 3.3, galga: "38 a 40 cm", chavePreco: "telha.cer-amer", confirmado: false, notaDados: "Rendimento (12 pç/m²) confirmado em ficha Pereira Rodrigues. Peso por peça e inclinação mínima pendentes de confirmação.", usoCobertura: true, cumeeira: CUM_BARRO, espigao: ESP_BARRO },
  { id: "cer-medit", label: "Mediterrânea (TopTelha)", grupo: "Cerâmica de Barro", fabricante: "TopTelha", href: CERAMICA, rendimento: 13, min: 30, familia: "ceramica", pesoM2: 39, pesoPeca: 3, galga: "35,6 cm", chavePreco: "telha.cer-amer", confirmado: true, notaDados: "Inclinação de 30% vale para água de até 3 m — acima disso, ver tabela TopTelha.", usoCobertura: true, cumeeira: CUM_BARRO, espigao: ESP_BARRO },
  { id: "cer-colonial", label: "Colonial cerâmica (TopTelha)", grupo: "Cerâmica de Barro", fabricante: "TopTelha", href: CERAMICA, rendimento: 17, min: 35, familia: "ceramica", pesoM2: 61.2, pesoPeca: 3.6, galga: "47,8 cm", chavePreco: "telha.cer-port", confirmado: true, usoCobertura: true, cumeeira: CUM_BARRO, espigao: ESP_BARRO },
  { id: "cer-francesa", label: "Francesa (Marselha)", grupo: "Cerâmica de Barro", fabricante: "A confirmar", href: CERAMICA, rendimento: 16, min: 30, familia: "ceramica", pesoM2: 44, pesoPeca: 2.7, galga: "33 a 35 cm", chavePreco: "telha.cer-romana", confirmado: false, notaDados: NOTA_CONFIRMAR, usoCobertura: true, cumeeira: CUM_BARRO, espigao: ESP_BARRO },

  // ---------- Esmaltada (Premier) ----------
  { id: "esm-premier", label: "Esmaltada Premier (grês)", grupo: "Esmaltada (vitrificada)", fabricante: "Premier", href: ESMALTADA, rendimento: 9.4, min: 35, familia: "ceramica", pesoM2: 23.5, pesoPeca: 2.5, galga: "peça 30 × 44 cm", chavePreco: null, confirmado: true, usoCobertura: true, cumeeira: CUM_BARRO, espigao: ESP_BARRO },
  { id: "esm-port", label: "Esmaltada Portuguesa", grupo: "Esmaltada (vitrificada)", fabricante: "A confirmar", href: ESMALTADA, rendimento: 17, min: 35, familia: "ceramica", pesoM2: 46, pesoPeca: 2.7, galga: "33 a 35 cm", chavePreco: null, confirmado: false, notaDados: NOTA_CONFIRMAR, usoCobertura: true, cumeeira: CUM_BARRO, espigao: ESP_BARRO },
  { id: "esm-romana", label: "Esmaltada Romana", grupo: "Esmaltada (vitrificada)", fabricante: "A confirmar", href: ESMALTADA, rendimento: 16, min: 35, familia: "ceramica", pesoM2: 46, pesoPeca: 2.9, galga: "34 a 36 cm", chavePreco: null, confirmado: false, notaDados: NOTA_CONFIRMAR, usoCobertura: true, cumeeira: CUM_BARRO, espigao: ESP_BARRO },

  // ---------- Concreto (Eurotop — Linha Clássica) ----------
  { id: "con-euro", label: "Concreto Eurotop", grupo: "Concreto", fabricante: "Eurotop", href: CONCRETO, rendimento: 10.4, min: 30, familia: "concreto", pesoM2: 46.8, pesoPeca: 4.5, galga: "32 a 34 cm", chavePreco: "telha.con-euro", confirmado: false, notaDados: "Rendimento (10,4 pç/m²) e peso confirmados no catálogo Eurotop. Inclinação mínima não é especificada na NBR 13858-2 — confirmar com o fabricante.", usoCobertura: true, cumeeira: CUM_BARRO, espigao: ESP_BARRO },

  // ---------- Policarbonato (Ajover) ----------
  { id: "pol-183", label: "Policarbonato 1,83 m", grupo: "Policarbonato", fabricante: "Ajover", href: POLI, rendimento: 0.56, min: 26.8, familia: "policarbonato", pesoM2: 2, pesoPeca: 2.6, galga: null, chavePreco: "telha.pol-183", confirmado: false, notaDados: "Ficha oficial Ajover não localizada — rendimento e peso pendentes de confirmação (inclinação 15° ≈ 26,8%).", usoCobertura: false, cumeeira: CUM_FIBRO, espigao: ESP_FIBRO },
  { id: "pol-244", label: "Policarbonato 2,44 m", grupo: "Policarbonato", fabricante: "Ajover", href: POLI, rendimento: 0.42, min: 26.8, familia: "policarbonato", pesoM2: 1.5, pesoPeca: 3.6, galga: null, chavePreco: "telha.pol-244", confirmado: false, notaDados: "Peso 3,6 kg (peça 244 × 110 cm) de fonte de revenda; rendimento pendente de confirmação.", usoCobertura: false, cumeeira: CUM_FIBRO, espigao: ESP_FIBRO },
  { id: "pol-305", label: "Policarbonato 3,05 m", grupo: "Policarbonato", fabricante: "Ajover", href: POLI, rendimento: 0.34, min: 26.8, familia: "policarbonato", pesoM2: 1.5, pesoPeca: 4.3, galga: null, chavePreco: "telha.pol-305", confirmado: false, notaDados: NOTA_CONFIRMAR, usoCobertura: false, cumeeira: CUM_FIBRO, espigao: ESP_FIBRO },
  { id: "pol-366", label: "Policarbonato 3,66 m", grupo: "Policarbonato", fabricante: "Ajover", href: POLI, rendimento: 0.28, min: 26.8, familia: "policarbonato", pesoM2: 1.4, pesoPeca: 5.1, galga: null, chavePreco: "telha.pol-366", confirmado: false, notaDados: NOTA_CONFIRMAR, usoCobertura: false, cumeeira: CUM_FIBRO, espigao: ESP_FIBRO },

  // ---------- Translúcida polipropileno (Luxtelhas/Fibrarte) ----------
  { id: "tra-122", label: "Translúcida PP 1,22 m", grupo: "Translúcida Polipropileno", fabricante: "Luxtelhas/Fibrarte", href: PP, rendimento: 0.85, min: 26.8, familia: "translucida", pesoM2: 3, pesoPeca: 1.1, galga: null, chavePreco: null, confirmado: false, notaDados: "Fabricante não disponibiliza ficha técnica — rendimento e peso pendentes de confirmação.", usoCobertura: false, cumeeira: CUM_FIBRO, espigao: ESP_FIBRO },
  { id: "tra-183", label: "Translúcida PP 1,83 m", grupo: "Translúcida Polipropileno", fabricante: "Luxtelhas/Fibrarte", href: PP, rendimento: 0.56, min: 26.8, familia: "translucida", pesoM2: 3, pesoPeca: 1.7, galga: null, chavePreco: null, confirmado: false, notaDados: NOTA_CONFIRMAR, usoCobertura: false, cumeeira: CUM_FIBRO, espigao: ESP_FIBRO },
  { id: "tra-244", label: "Translúcida PP 2,44 m", grupo: "Translúcida Polipropileno", fabricante: "Luxtelhas/Fibrarte", href: PP, rendimento: 0.42, min: 26.8, familia: "translucida", pesoM2: 3, pesoPeca: 2.2, galga: null, chavePreco: null, confirmado: false, notaDados: NOTA_CONFIRMAR, usoCobertura: false, cumeeira: CUM_FIBRO, espigao: ESP_FIBRO },
  { id: "tra-305", label: "Translúcida PP 3,05 m", grupo: "Translúcida Polipropileno", fabricante: "Luxtelhas/Fibrarte", href: PP, rendimento: 0.34, min: 26.8, familia: "translucida", pesoM2: 3, pesoPeca: 2.8, galga: null, chavePreco: null, confirmado: false, notaDados: NOTA_CONFIRMAR, usoCobertura: false, cumeeira: CUM_FIBRO, espigao: ESP_FIBRO },
  { id: "tra-366", label: "Translúcida PP 3,66 m", grupo: "Translúcida Polipropileno", fabricante: "Luxtelhas/Fibrarte", href: PP, rendimento: 0.28, min: 26.8, familia: "translucida", pesoM2: 3, pesoPeca: 3.3, galga: null, chavePreco: null, confirmado: false, notaDados: NOTA_CONFIRMAR, usoCobertura: false, cumeeira: CUM_FIBRO, espigao: ESP_FIBRO },

  // ---------- Vidro (dados aproximados de pesquisa — não é ficha oficial) ----------
  { id: "vid-romana", label: "Vidro Romana", grupo: "Vidro", fabricante: "Genérico", href: VIDRO, rendimento: 16, min: 30, familia: "vidro", pesoM2: 33, pesoPeca: 2.05, galga: "34 a 36 cm", chavePreco: null, confirmado: false, notaDados: "Dados aproximados de pesquisa (13 a 16 pç/m²) — não é ficha técnica oficial.", usoCobertura: false, cumeeira: CUM_BARRO, espigao: ESP_BARRO },
  { id: "vid-port", label: "Vidro Portuguesa", grupo: "Vidro", fabricante: "Genérico", href: VIDRO, rendimento: 16, min: 30, familia: "vidro", pesoM2: 29.6, pesoPeca: 1.85, galga: "33 a 35 cm", chavePreco: null, confirmado: false, notaDados: "Dados aproximados de pesquisa — não é ficha técnica oficial.", usoCobertura: false, cumeeira: CUM_BARRO, espigao: ESP_BARRO },
  { id: "vid-francesa", label: "Vidro Francesa", grupo: "Vidro", fabricante: "Genérico", href: VIDRO, rendimento: 16, min: 30, familia: "vidro", pesoM2: 35.2, pesoPeca: 2.2, galga: "33 a 35 cm", chavePreco: null, confirmado: false, notaDados: "Dados aproximados de pesquisa — não é ficha técnica oficial.", usoCobertura: false, cumeeira: CUM_BARRO, espigao: ESP_BARRO },
  { id: "vid-medit", label: "Vidro Mediterrânea", grupo: "Vidro", fabricante: "Genérico", href: VIDRO, rendimento: 13, min: 30, familia: "vidro", pesoM2: 26, pesoPeca: 2, galga: "35 a 37 cm", chavePreco: null, confirmado: false, notaDados: "Dados aproximados — não é ficha técnica oficial.", usoCobertura: false, cumeeira: CUM_BARRO, espigao: ESP_BARRO },

  // ---------- PET transparente (peça plástica no formato da telha cerâmica) ----------
  { id: "pet-romana", label: "PET Transparente Romana", grupo: "PET transparente", fabricante: "Cejatel/Vilhena", href: PET, rendimento: 16, min: 30, familia: "pet", pesoM2: 6.4, pesoPeca: 0.4, galga: "34 a 36 cm", chavePreco: null, confirmado: false, notaDados: "Peça de PET plástico transparente injetado (não é vidro) — dados aproximados.", usoCobertura: false, cumeeira: CUM_BARRO, espigao: ESP_BARRO },
  { id: "pet-port", label: "PET Transparente Portuguesa", grupo: "PET transparente", fabricante: "Cejatel/Vilhena", href: PET, rendimento: 16, min: 30, familia: "pet", pesoM2: 6.4, pesoPeca: 0.4, galga: "33 a 35 cm", chavePreco: null, confirmado: false, notaDados: "Peça de PET plástico transparente injetado (não é vidro) — dados aproximados.", usoCobertura: false, cumeeira: CUM_BARRO, espigao: ESP_BARRO },
  { id: "pet-medit", label: "PET Transparente Mediterrânea", grupo: "PET transparente", fabricante: "Cejatel/Vilhena", href: PET, rendimento: 13, min: 30, familia: "pet", pesoM2: 5.2, pesoPeca: 0.4, galga: "35 a 37 cm", chavePreco: null, confirmado: false, notaDados: "Peça de PET plástico transparente injetado (não é vidro) — dados aproximados.", usoCobertura: false, cumeeira: CUM_BARRO, espigao: ESP_BARRO },

  // ---------- Versões transparentes das linhas de PVC (ponto de luz da própria linha) ----------
  { id: "pvc-colonial-transp", label: "Colonial PVC Transparente", grupo: "Colonial PVC Transparente", fabricante: "Lux Telhas", href: COLONIAL, rendimento: 1 / 2.28, min: 15, familia: "pvc", pesoM2: 4.2, pesoPeca: 9.55, galga: null, chavePreco: null, confirmado: false, notaDados: "Peça transparente da própria linha Colonial — usar o mesmo comprimento da telha principal.", usoCobertura: false, cumeeira: CUM_PVC, espigao: ESP_PVC },
  { id: "pvc-plan-transp", label: "Plan PVC Transparente", grupo: "Plan PVC Transparente", fabricante: "Lux Telhas", href: PLAN, rendimento: 1 / 2.46, min: 15, familia: "pvc", pesoM2: 3.2, pesoPeca: 7.91, galga: null, chavePreco: null, confirmado: false, notaDados: "Peça transparente da própria linha Plan — usar o mesmo comprimento da telha principal.", usoCobertura: false, cumeeira: CUM_PVC, espigao: ESP_PVC },
];


export const GRUPOS_TELHAS = Array.from(new Set(TELHAS_CATALOGO.map((t) => t.grupo)));

/** Telhas usadas para cobrir o telhado inteiro (seletor principal da calculadora) */
export const TELHAS_COBERTURA = TELHAS_CATALOGO.filter((t) => t.usoCobertura);
export const GRUPOS_COBERTURA = Array.from(new Set(TELHAS_COBERTURA.map((t) => t.grupo)));

/**
 * Telhas translúcidas / de vidro: pontos de luz natural instalados misturados à
 * telha principal. Entram na calculadora só como quantidade de peças informada
 * pelo cliente — sem cálculo de rendimento por m².
 */
export const TELHAS_LUZ = TELHAS_CATALOGO.filter((t) => !t.usoCobertura);
export const GRUPOS_LUZ = Array.from(new Set(TELHAS_LUZ.map((t) => t.grupo)));

export const acharTelha = (id: string) =>
  TELHAS_CATALOGO.find((t) => t.id === id) ?? TELHAS_CATALOGO[0];

/**
 * Pontos de luz natural compatíveis com a telha principal escolhida:
 *  - Fibrocimento → polipropileno (translúcida) ou policarbonato;
 *  - Colonial / Plan PVC → apenas a transparente da própria linha;
 *  - Barro, Concreto e Esmaltada → telha de Vidro ou de PET transparente;
 *  - demais casos → sem opção compatível (a etapa é ocultada).
 */
export const telhasLuzCompativeis = (t: TelhaCatalogo): TelhaCatalogo[] => {
  if (t.familia === "fibrocimento")
    return TELHAS_LUZ.filter((l) => l.familia === "translucida" || l.familia === "policarbonato");
  if (t.familia === "pvc") {
    const id = t.grupo.startsWith("Plan") ? "pvc-plan-transp" : "pvc-colonial-transp";
    return TELHAS_LUZ.filter((l) => l.id === id);
  }
  if (t.familia === "ceramica" || t.familia === "concreto")
    return TELHAS_LUZ.filter((l) => l.familia === "vidro" || l.familia === "pet");
  return [];
};


/* ============================================================
 * Estrutura de madeira por tipo de telha
 * ============================================================ */

/**
 * "ripa"  → Barro, Concreto, Esmaltada e Vidro: ripa/ripão (galga da telha),
 *            caibro/caibrão (50 cm) e viga (1,5 m).
 * "apoio" → Fibrocimento, Policarbonato e Translúcida: só viga, apoio no
 *            começo/meio/fim de cada telha (apoio compartilhado entre fiadas).
 * "pvc"   → Colonial e Plan PVC: apoio fixo a cada 66 cm, viga 11 cm.
 */
export type SistemaEstrutura = "ripa" | "apoio" | "pvc";

export const sistemaEstrutura = (t: TelhaCatalogo): SistemaEstrutura =>
  t.familia === "pvc"
    ? "pvc"
    : t.familia === "fibrocimento" || t.familia === "policarbonato" || t.familia === "translucida"
      ? "apoio"
      : "ripa";

/**
 * Galga (m) = distância do topo de uma ripa ao topo da próxima, por modelo de
 * telha (ficha técnica mestre da loja). Telhas de vidro não têm galga própria:
 * usam a galga da cerâmica equivalente.
 */
const GALGA_POR_TELHA: Record<string, number> = {
  "cer-romana-17": 0.328, // Romana Isotec
  "cer-romana-13": 0.33, // Romana TopTelha
  "cer-port": 0.332, // Portuguesa Isotec
  "cer-amer": 0.358, // Americana Pereira Rodrigues
  "cer-medit": 0.28, // Mediterrânea TopTelha
  "cer-francesa": 0.365, // Francesa (ref. Cejatel linha Wave)
  "cer-colonial": 0.33, // Colonial cerâmica TopTelha (ref. Romana)
  "con-euro": 0.32, // Concreto Eurotop (distância máxima entre ripas)
  "esm-premier": 0.375, // Esmaltada Premier
  "esm-port": 0.375,
  "esm-romana": 0.375,
  "vid-romana": 0.328, // = Romana cerâmica
  "vid-port": 0.332, // = Portuguesa cerâmica
  "vid-francesa": 0.365, // = Francesa cerâmica
  "vid-medit": 0.28, // = Mediterrânea cerâmica
};

/** Galga em metros do modelo (null quando a telha não usa ripa) */
export const galgaTelha = (t: TelhaCatalogo): number | null =>
  sistemaEstrutura(t) === "ripa" ? (GALGA_POR_TELHA[t.id] ?? 0.33) : null;

/* ============================================================
 * Estrutura de madeira em Cambará — apoios em 3 etapas
 * (Barro, Concreto e Esmaltada)
 * ============================================================ */

/** Espécie única calculável na estrutura */
export const ESPECIE_ESTRUTURA = "Cambará";

/** Rendimento da madeira aparelhada: 15% menor que a bruta */
export const FATOR_APARELHADO = 0.85;

export type Apoio1 = "ripa" | "ripao";
export type Apoio2 = "caibro" | "caibrao" | "viga11";

/** Etapa 1 — peça, bitola de catálogo e espaçamento base (m) até o 2º apoio */
export const PECAS_APOIO1: Record<Apoio1, { label: string; bitola: string; esp: number }> = {
  ripa: { label: "Ripa", bitola: "1,5x5 cm", esp: 0.4 },
  ripao: { label: "Ripão", bitola: "2x5 cm", esp: 0.5 },
};

/** Etapa 2 — peça, bitola de catálogo e espaçamento base (m) até o 3º apoio */
export const PECAS_APOIO2: Record<Apoio2, { label: string; bitola: string; esp: number }> = {
  caibro: { label: "Caibro", bitola: "5x5 cm", esp: 1.5 },
  caibrao: { label: "Caibrão", bitola: "5x7 cm", esp: 2.5 },
  viga11: { label: "Viga de 11", bitola: "5x11 cm", esp: 4 },
};

/** Espaçamento fixo de apoio das telhas de PVC (m) */
export const APOIO_PVC = 0.66;
/** Espaçamento padrão de caibro/caibrão (m) */
export const ESP_CAIBRO_PADRAO = 0.5;
/** Espaçamento padrão do terceiro apoio (m) */
export const ESP_VIGA_PADRAO = 1.5;


