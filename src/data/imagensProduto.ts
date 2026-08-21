import { ImagemProduto } from "../components/GaleriaProduto";
import imgCeramicaAmericana from "@/assets/produtos/telha_ceramica_americana.webp.asset.json";
import imgCeramicaMesclada from "@/assets/produtos/telha_ceramica_mesclada.jpg.asset.json";
import imgColonialPvc from "@/assets/produtos/Telha_Colonial_PVC.png.asset.json";
import imgPvcCinzaTelhado from "@/assets/produtos/telha_colonial_pvc_cinza_telhado.webp.asset.json";
import imgPvcMarfim from "@/assets/produtos/telha_colonial_pvc_marfim.webp.asset.json";
import imgPvcMarfimTelhado from "@/assets/produtos/telha_colonial_pvc_marfim_telhado.webp.asset.json";
import imgPvcMarfimTelhado2 from "@/assets/produtos/telha_colonial_pvc_marfim_telhado_2.webp.asset.json";
import imgConcretoGrafiteTelhado from "@/assets/produtos/telha_concreto_grafite_telhado.jfif.asset.json";
import imgCaibroCambara from "@/assets/produtos/caibro_de_cambara.webp.asset.json";

export const IMG = {
  ceramicaAmericana: imgCeramicaAmericana.url,
  ceramicaMesclada: imgCeramicaMesclada.url,
  colonialPvc: imgColonialPvc.url,
  pvcCinzaTelhado: imgPvcCinzaTelhado.url,
  pvcMarfim: imgPvcMarfim.url,
  pvcMarfimTelhado: imgPvcMarfimTelhado.url,
  pvcMarfimTelhado2: imgPvcMarfimTelhado2.url,
  concretoGrafiteTelhado: imgConcretoGrafiteTelhado.url,
  caibroCambara: imgCaibroCambara.url,
};


// ─────────────────────────────────────────────────────────────
// COMO USAR:
// 1. Tire a foto do produto (horizontal, boa iluminação)
// 2. Suba para o Lovable (arraste na aba de assets) ou use
//    serviço como Cloudinary / ImgBB
// 3. Cole a URL no array correspondente abaixo
// 4. Se não tiver foto ainda, deixe o array vazio []
//    — o componente mostra placeholder automático
// ─────────────────────────────────────────────────────────────

// TELHAS CERÂMICA
export const imagensCeramica: Record<string, ImagemProduto[]> = {
  "portuguesa-isotec": [
    { src: "", alt: "Telha Portuguesa Resinada Isotec" },
    { src: "", alt: "Detalhe do encaixe — Portuguesa Isotec" },
  ],
  "portuguesa-rodrigues": [
    { src: "", alt: "Telha Portuguesa Resinada Rodrigues" },
  ],
  "portuguesa-mesclada": [
    { src: imgCeramicaMesclada.url, alt: "Telha Cerâmica Mesclada", legenda: "Telhado colonial mesclado" },
  ],
  "romana-resinada": [
    { src: "", alt: "Telha Romana Resinada Laranjal" },
  ],
  "romana-top": [
    { src: "", alt: "Telha Romana Top Telha Terracota Prime" },
  ],
  "americana-resinada": [
    { src: imgCeramicaAmericana.url, alt: "Telha Cerâmica Americana Resinada" },
    { src: imgColonialPvc.url, alt: "Telhado com telha cerâmica americana", legenda: "Aplicação em telhado" },
  ],
};

// TELHA FIBROCIMENTO
export const imagensFibrocimento: Record<string, ImagemProduto[]> = {
  "153 × 110 cm": [
    { src: "", alt: "Telha Fibrocimento INFIBRA 153cm", legenda: "Telha Fibrocimento 153 × 110cm — INFIBRA" },
  ],
  "183 × 110 cm": [
    { src: "", alt: "Telha Fibrocimento INFIBRA 183cm", legenda: "183 × 110cm" },
  ],
  "244 × 110 cm": [
    { src: "", alt: "Telha Fibrocimento INFIBRA 244cm — Líder de vendas", legenda: "244 × 110cm — A mais vendida" },
    { src: "", alt: "Detalhe sobreposição fibrocimento 244cm" },
  ],
  "305 × 110 cm": [
    { src: "", alt: "Telha Fibrocimento INFIBRA 305cm", legenda: "305 × 110cm" },
  ],
  "366 × 110 cm": [
    { src: "", alt: "Telha Fibrocimento INFIBRA 366cm", legenda: "366 × 110cm" },
  ],
};

// TELHA COLONIAL PVC
export const imagensColonialPVC: Record<string, ImagemProduto[]> = {
  "Cerâmica": [
    { src: "", alt: "Telha Colonial PVC Cerâmica" },
    { src: "", alt: "Detalhe do encaixe — Colonial PVC Cerâmica" },
  ],
  Cinza: [
    { src: imgColonialPvc.url, alt: "Telha Colonial PVC" },
    { src: imgPvcCinzaTelhado.url, alt: "Telhado com Telha Colonial PVC Cinza", legenda: "Aplicação em telhado" },
  ],
  Marfim: [
    { src: imgPvcMarfim.url, alt: "Telha Colonial PVC Marfim" },
    { src: imgPvcMarfimTelhado.url, alt: "Telhado com Telha Colonial PVC Marfim", legenda: "Aplicação em telhado" },
    { src: imgPvcMarfimTelhado2.url, alt: "Telhado com Telha Colonial PVC Marfim — obra", legenda: "Instalação em estrutura metálica" },
  ],
  "Translúcida": [
    { src: "", alt: "Telha Colonial PVC Translúcida" },
  ],
};

// CAMBARÁ — por tipo
export const imagensCambara: Record<string, ImagemProduto[]> = {
  Viga: [
    { src: "", alt: "Viga Cambará Rosa no pátio" },
    { src: "", alt: "Detalhe seção transversal — Viga Cambará" },
  ],
  Caibro: [
    { src: imgCaibroCambara.url, alt: "Caibros Cambará Rosa 5x5cm e 5x7cm" },
  ],
  Ripa: [
    { src: "", alt: "Ripas Cambará Rosa 1,5x5cm" },
  ],
  "Ripão": [
    { src: "", alt: "Ripões Cambará Rosa 2x5cm" },
  ],
  Dormente: [
    { src: "", alt: "Dormentes Cambará Rosa" },
  ],
};

// PONTALETES EUCALIPTO
export const imagensEucalipto: Record<string, ImagemProduto[]> = {
  "pontalete-eucalipto": [
    { src: "", alt: "Pontalete Roliço Eucalipto Tratado" },
    { src: "", alt: "Pilha de pontaletes no pátio" },
  ],
  "eucalipto-in-natura": [
    { src: "", alt: "Eucalipto roliço in natura" },
  ],
  "eucalipto-tratado": [
    { src: "", alt: "Eucalipto tratado em autoclave" },
  ],
};

// FORRO PVC
export const imagensForroPVC: ImagemProduto[] = [
  { src: "", alt: "Forro PVC Branco instalado" },
];

// FORRO CEDRINHO
export const imagensForroCedrinho: ImagemProduto[] = [
  { src: "", alt: "Forro Cedrinho Mesclado instalado" },
  { src: "", alt: "Detalhe régua Forro Cedrinho" },
];

// TINTAS — por subcategoria
export const imagensTintas: Record<string, ImagemProduto[]> = {
  verniz: [
    { src: "", alt: "Linha Anjo Verniz e Sayerlack Polisten", legenda: "Vernizes Anjo e Sayerlack" },
  ],
  stain: [
    { src: "", alt: "Anjo Stain Casa nas 4 cores", legenda: "Anjo Stain Casa — Ipê, Imbuia, Mogno, Incolor" },
  ],
  "tinta-acrilica": [
    { src: "", alt: "Anjo Emborrachada e AnjoMais Premium", legenda: "Tinta Acrílica — Linha Anjo" },
  ],
  esmalte: [
    { src: "", alt: "Anjo Esmalte Tomplus cores variadas", legenda: "Esmalte Sintético Tomplus" },
  ],
  seladora: [
    { src: "", alt: "Vedacit Penetrol e Anjo Selador", legenda: "Seladora e Impermeabilização" },
  ],
  cupicida: [
    { src: "", alt: "Apus e Ecol Exterminador de Cupim", legenda: "Proteção contra Cupim" },
  ],
  thinner: [
    { src: "", alt: "Linha de diluentes e thinners", legenda: "Thinner e Diluentes" },
  ],
};

// CALHAS — por subcategoria
export const imagensCalhas: Record<string, ImagemProduto[]> = {
  "calha-alge": [
    { src: "", alt: "Calha Alge galvanizada no pátio", legenda: "Calha Alge — Moldura Galvanizada" },
  ],
  "calha-aquapluv": [
    { src: "", alt: "Calha Aquapluv PVC bege", legenda: "Calha Aquapluv — PVC Bege" },
  ],
  rufo: [
    { src: "", alt: "Rufo galvanizado Alge", legenda: "Rufo Galvanizado — Alge" },
  ],
  "manta-termica": [
    { src: "", alt: "Manta térmica aluminizada instalada", legenda: "Manta Térmica Aluminizada 2F" },
  ],
  "manta-asfaltica": [
    { src: "", alt: "Manta asfáltica terracota", legenda: "Manta Asfáltica Aluminizada" },
  ],
  "acessorios-calha": [
    { src: "", alt: "Acessórios para calha Alge e Aquapluv", legenda: "Acessórios — Suportes, Cabeceiras e Saídas" },
  ],
};


// TELHA POLICARBONATO — por versão
export const imagensPolicarbonato: Record<string, ImagemProduto[]> = {
  cristal: [
    { src: "", alt: "Telha Policarbonato Cristal" },
    { src: "", alt: "Detalhe da transparência — Policarbonato Cristal" },
  ],
  "bronze-grecca": [
    { src: "", alt: "Telha Policarbonato Bronze Grecca 244cm" },
  ],
};

// CEDRINHO — por tipo
export const imagensCedrinho: Record<string, ImagemProduto[]> = {
  sarrafo: [{ src: "", alt: "Sarrafo Cedrinho no pátio" }],
  tabua: [{ src: "", alt: "Tábua Cedrinho bruto e aparelhado" }],
};

// PINUS — por tipo de peça
export const imagensPinus: Record<string, ImagemProduto[]> = {
  Sarrafo: [{ src: "", alt: "Sarrafo Pinus no pátio" }],
  "Tábua": [{ src: "", alt: "Tábua Pinus bruto 30cm" }],
  Pontalete: [{ src: "", alt: "Pontalete Pinus 6x6cm" }],
};

// MADEIRIT & COMPENSADO — por categoria
export const imagensMadeirit: Record<string, ImagemProduto[]> = {
  Preto: [
    { src: "", alt: "Madeirit Plastificado Preto" },
    { src: "", alt: "Detalhe superfície plastificada preta" },
  ],
  Rosa: [{ src: "", alt: "Madeirit Rosa" }],
  OSB: [{ src: "", alt: "OSB Multiplac" }],
  Compensado: [{ src: "", alt: "Compensado estrutural" }],
};

// TELHA DE CONCRETO — por cor
export const imagensConcreto: Record<string, ImagemProduto[]> = {
  Grafite: [
    { src: imgConcretoGrafiteTelhado.url, alt: "Telhado com Telha de Concreto Grafite", legenda: "Aplicação em telhado" },
  ],
};
