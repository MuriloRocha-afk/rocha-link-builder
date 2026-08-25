/**
 * Registro técnico único das telhas do catálogo (/catalogo/telhas).
 *
 * Esta é a fonte de dados usada pela calculadora de telhado: qualquer telha
 * nova cadastrada aqui aparece automaticamente na etapa de escolha de telha,
 * na ficha técnica, na inclinação mínima sugerida e no comparativo — sem
 * precisar alterar o código da calculadora.
 */

export type FamiliaTelha =
  | "fibrocimento"
  | "pvc"
  | "ceramica"
  | "policarbonato"
  | "concreto"
  | "translucida"
  | "vidro";

export type TelhaCatalogo = {
  id: string;
  label: string;
  /** grupo de exibição (agrupa no select) */
  grupo: string;
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
};

const FIBRO = "/catalogo/telhas/fibrocimento";
const COLONIAL = "/catalogo/telhas/colonial-pvc";
const PLAN = "/catalogo/telhas/plan-pvc";
const CERAMICA = "/catalogo/telhas/ceramica";
const POLI = "/catalogo/telhas/policarbonato";
const PP = "/catalogo/telhas/polipropileno";
const CONCRETO = "/catalogo/telhas/concreto";
const ESMALTADA = "/catalogo/telhas/esmaltada";
const VIDRO = "/catalogo/telhas/vidro";

export const TELHAS_CATALOGO: TelhaCatalogo[] = [
  // ---------- Fibrocimento ----------
  { id: "fib-153", label: "Fibrocimento 1,53 m", grupo: "Fibrocimento INFIBRA", href: FIBRO, rendimento: 0.67, min: 10, familia: "fibrocimento", pesoM2: 18, pesoPeca: 18, galga: null, chavePreco: "telha.fib-153" },
  { id: "fib-183", label: "Fibrocimento 1,83 m", grupo: "Fibrocimento INFIBRA", href: FIBRO, rendimento: 0.56, min: 10, familia: "fibrocimento", pesoM2: 18, pesoPeca: 21.5, galga: null, chavePreco: "telha.fib-183" },
  { id: "fib-244", label: "Fibrocimento 2,44 m ★", grupo: "Fibrocimento INFIBRA", href: FIBRO, rendimento: 0.42, min: 10, familia: "fibrocimento", pesoM2: 18, pesoPeca: 28.5, galga: null, chavePreco: "telha.fib-244" },
  { id: "fib-305", label: "Fibrocimento 3,05 m", grupo: "Fibrocimento INFIBRA", href: FIBRO, rendimento: 0.34, min: 10, familia: "fibrocimento", pesoM2: 18, pesoPeca: 35.5, galga: null, chavePreco: "telha.fib-305" },
  { id: "fib-366", label: "Fibrocimento 3,66 m", grupo: "Fibrocimento INFIBRA", href: FIBRO, rendimento: 0.28, min: 10, familia: "fibrocimento", pesoM2: 18, pesoPeca: 42.5, galga: null, chavePreco: "telha.fib-366" },

  // ---------- Colonial PVC ----------
  { id: "pvc-230", label: "Colonial PVC 2,30 m", grupo: "Colonial PVC", href: COLONIAL, rendimento: 0.58, min: 15, familia: "pvc", pesoM2: 9, pesoPeca: 6.5, galga: null, chavePreco: "telha.pvc-230" },
  { id: "pvc-328", label: "Colonial PVC 3,28 m", grupo: "Colonial PVC", href: COLONIAL, rendimento: 0.41, min: 15, familia: "pvc", pesoM2: 9, pesoPeca: 9.2, galga: null, chavePreco: "telha.pvc-328" },
  { id: "pvc-459", label: "Colonial PVC 4,59 m", grupo: "Colonial PVC", href: COLONIAL, rendimento: 0.3, min: 15, familia: "pvc", pesoM2: 9, pesoPeca: 12.9, galga: null, chavePreco: "telha.pvc-459" },
  { id: "pvc-525", label: "Colonial PVC 5,25 m", grupo: "Colonial PVC", href: COLONIAL, rendimento: 0.26, min: 15, familia: "pvc", pesoM2: 9, pesoPeca: 14.8, galga: null, chavePreco: "telha.pvc-525" },

  // ---------- Plan PVC ----------
  { id: "plan-198", label: "Plan PVC 1,98 m", grupo: "Plan PVC", href: PLAN, rendimento: 0.66, min: 15, familia: "pvc", pesoM2: 8.5, pesoPeca: 5.4, galga: null, chavePreco: "telha.pvc-230" },
  { id: "plan-242", label: "Plan PVC 2,42 m", grupo: "Plan PVC", href: PLAN, rendimento: 0.55, min: 15, familia: "pvc", pesoM2: 8.5, pesoPeca: 6.6, galga: null, chavePreco: "telha.pvc-230" },
  { id: "plan-330", label: "Plan PVC 3,30 m", grupo: "Plan PVC", href: PLAN, rendimento: 0.4, min: 15, familia: "pvc", pesoM2: 8.5, pesoPeca: 9, galga: null, chavePreco: "telha.pvc-328" },

  // ---------- Cerâmica de barro ----------
  { id: "cer-port", label: "Portuguesa Resinada", grupo: "Cerâmica de Barro", href: CERAMICA, rendimento: 17, min: 30, familia: "ceramica", pesoM2: 45, pesoPeca: 2.6, galga: "33 a 35 cm", chavePreco: "telha.cer-port" },
  { id: "cer-romana", label: "Romana", grupo: "Cerâmica de Barro", href: CERAMICA, rendimento: 16, min: 30, familia: "ceramica", pesoM2: 45, pesoPeca: 2.8, galga: "34 a 36 cm", chavePreco: "telha.cer-romana" },
  { id: "cer-amer", label: "Americana", grupo: "Cerâmica de Barro", href: CERAMICA, rendimento: 12.5, min: 30, familia: "ceramica", pesoM2: 42, pesoPeca: 3.3, galga: "38 a 40 cm", chavePreco: "telha.cer-amer" },
  { id: "cer-francesa", label: "Francesa (Marselha)", grupo: "Cerâmica de Barro", href: CERAMICA, rendimento: 16, min: 30, familia: "ceramica", pesoM2: 44, pesoPeca: 2.7, galga: "33 a 35 cm", chavePreco: "telha.cer-romana" },
  { id: "cer-medit", label: "Mediterrânea", grupo: "Cerâmica de Barro", href: CERAMICA, rendimento: 12, min: 30, familia: "ceramica", pesoM2: 42, pesoPeca: 3.4, galga: "38 a 40 cm", chavePreco: "telha.cer-amer" },

  // ---------- Esmaltada ----------
  { id: "esm-port", label: "Esmaltada Portuguesa", grupo: "Esmaltada (vitrificada)", href: ESMALTADA, rendimento: 17, min: 30, familia: "ceramica", pesoM2: 46, pesoPeca: 2.7, galga: "33 a 35 cm", chavePreco: null },
  { id: "esm-romana", label: "Esmaltada Romana", grupo: "Esmaltada (vitrificada)", href: ESMALTADA, rendimento: 16, min: 30, familia: "ceramica", pesoM2: 46, pesoPeca: 2.9, galga: "34 a 36 cm", chavePreco: null },

  // ---------- Concreto ----------
  { id: "con-euro", label: "Concreto Eurotop", grupo: "Concreto", href: CONCRETO, rendimento: 10.5, min: 30, familia: "concreto", pesoM2: 48, pesoPeca: 4.5, galga: "32 a 34 cm", chavePreco: "telha.con-euro" },

  // ---------- Policarbonato ----------
  { id: "pol-183", label: "Policarbonato 1,83 m", grupo: "Policarbonato", href: POLI, rendimento: 0.56, min: 10, familia: "policarbonato", pesoM2: 3.5, pesoPeca: 2.6, galga: null, chavePreco: "telha.pol-183" },
  { id: "pol-244", label: "Policarbonato 2,44 m", grupo: "Policarbonato", href: POLI, rendimento: 0.42, min: 10, familia: "policarbonato", pesoM2: 3.5, pesoPeca: 3.4, galga: null, chavePreco: "telha.pol-244" },
  { id: "pol-305", label: "Policarbonato 3,05 m", grupo: "Policarbonato", href: POLI, rendimento: 0.34, min: 10, familia: "policarbonato", pesoM2: 3.5, pesoPeca: 4.3, galga: null, chavePreco: "telha.pol-305" },
  { id: "pol-366", label: "Policarbonato 3,66 m", grupo: "Policarbonato", href: POLI, rendimento: 0.28, min: 10, familia: "policarbonato", pesoM2: 3.5, pesoPeca: 5.1, galga: null, chavePreco: "telha.pol-366" },

  // ---------- Translúcida polipropileno ----------
  { id: "tra-122", label: "Translúcida PP 1,22 m", grupo: "Translúcida Polipropileno", href: PP, rendimento: 0.85, min: 10, familia: "translucida", pesoM2: 3, pesoPeca: 1.1, galga: null, chavePreco: null },
  { id: "tra-183", label: "Translúcida PP 1,83 m", grupo: "Translúcida Polipropileno", href: PP, rendimento: 0.56, min: 10, familia: "translucida", pesoM2: 3, pesoPeca: 1.7, galga: null, chavePreco: null },
  { id: "tra-244", label: "Translúcida PP 2,44 m", grupo: "Translúcida Polipropileno", href: PP, rendimento: 0.42, min: 10, familia: "translucida", pesoM2: 3, pesoPeca: 2.2, galga: null, chavePreco: null },
  { id: "tra-305", label: "Translúcida PP 3,05 m", grupo: "Translúcida Polipropileno", href: PP, rendimento: 0.34, min: 10, familia: "translucida", pesoM2: 3, pesoPeca: 2.8, galga: null, chavePreco: null },
  { id: "tra-366", label: "Translúcida PP 3,66 m", grupo: "Translúcida Polipropileno", href: PP, rendimento: 0.28, min: 10, familia: "translucida", pesoM2: 3, pesoPeca: 3.3, galga: null, chavePreco: null },

  // ---------- Vidro ----------
  { id: "vid-port", label: "Vidro Portuguesa", grupo: "Vidro", href: VIDRO, rendimento: 17, min: 30, familia: "vidro", pesoM2: 48, pesoPeca: 2.8, galga: "33 a 35 cm", chavePreco: null },
  { id: "vid-romana", label: "Vidro Romana", grupo: "Vidro", href: VIDRO, rendimento: 16, min: 30, familia: "vidro", pesoM2: 48, pesoPeca: 3, galga: "34 a 36 cm", chavePreco: null },
  { id: "vid-medit", label: "Vidro Mediterrânea", grupo: "Vidro", href: VIDRO, rendimento: 12, min: 30, familia: "vidro", pesoM2: 46, pesoPeca: 3.5, galga: "38 a 40 cm", chavePreco: null },
];

export const GRUPOS_TELHAS = Array.from(new Set(TELHAS_CATALOGO.map((t) => t.grupo)));

export const acharTelha = (id: string) =>
  TELHAS_CATALOGO.find((t) => t.id === id) ?? TELHAS_CATALOGO[0];
