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
import imgTerraCapa from "@/assets/produtos/pvc-terracota/capa_patio.jpg.asset.json";
import imgTerraAngulo from "@/assets/produtos/pvc-terracota/angulo.jpg.asset.json";
import imgTerra230 from "@/assets/produtos/pvc-terracota/t230.png.asset.json";
import imgTerra262 from "@/assets/produtos/pvc-terracota/t262.png.asset.json";
import imgTerra328 from "@/assets/produtos/pvc-terracota/t328.png.asset.json";
import imgTerra394 from "@/assets/produtos/pvc-terracota/t394.png.asset.json";
import imgTerra459 from "@/assets/produtos/pvc-terracota/t459.png.asset.json";
import imgTerra525 from "@/assets/produtos/pvc-terracota/t525.png.asset.json";
import imgTerraAplic1 from "@/assets/produtos/pvc-terracota/aplic1.png.asset.json";
import imgTerraAplic2 from "@/assets/produtos/pvc-terracota/aplic2.png.asset.json";

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
  Terracota: [
    { src: imgTerraCapa.url, alt: "Telha Colonial PVC Terracota no pátio da loja", legenda: "Estoque na loja — Terracota" },
    { src: imgTerraAngulo.url, alt: "Telha Colonial PVC Terracota em ângulo" },
    { src: imgTerraAplic1.url, alt: "Telhado com Telha Colonial PVC Terracota", legenda: "Exemplo de aplicação" },
    { src: imgTerraAplic2.url, alt: "Telhado com Telha Colonial PVC Terracota e calha", legenda: "Exemplo de aplicação" },
  ],
  Branca: [
    { src: "", alt: "Telha PVC Branca" },
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
};

// Fotos por comprimento — apenas Terracota (Marfim e Cinza aguardando fornecedor)
const fotosTerracotaPorTamanho: Record<string, { url: string }> = {
  "230 cm": imgTerra230,
  "262 cm": imgTerra262,
  "328 cm": imgTerra328,
  "394 cm": imgTerra394,
  "459 cm": imgTerra459,
  "525 cm": imgTerra525,
};

/** Galeria da Telha Colonial PVC considerando cor e comprimento selecionado. */
export function galeriaColonialPVC(cor: string, comprimento?: string | null): ImagemProduto[] {
  const base = imagensColonialPVC[cor] ?? [];
  if (cor !== "Terracota" || !comprimento) return base;
  const foto = fotosTerracotaPorTamanho[comprimento];
  if (!foto) return base;
  return [
    { src: foto.url, alt: `Telha Colonial PVC Terracota ${comprimento}`, legenda: `Comprimento ${comprimento}` },
    { src: imgTerraCapa.url, alt: "Telha Colonial PVC Terracota no pátio da loja", legenda: "Estoque na loja" },
    { src: imgTerraAngulo.url, alt: "Telha Colonial PVC Terracota em ângulo" },
    { src: imgTerraAplic1.url, alt: "Telhado com Telha Colonial PVC Terracota", legenda: "Exemplo de aplicação" },
    { src: imgTerraAplic2.url, alt: "Telhado com Telha Colonial PVC Terracota e calha", legenda: "Exemplo de aplicação" },
  ];
}

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

// FORRO PINUS
export const imagensForroPinus: ImagemProduto[] = [
  { src: "", alt: "Forro de Pinus instalado" },
  { src: "", alt: "Detalhe régua macho-fêmea de Pinus" },
];

// TINTAS — por subcategoria
export const imagensTintas: Record<string, ImagemProduto[]> = {
  verniz: [
    { src: "", alt: "Linha Sayerlack de vernizes", legenda: "Vernizes Sayerlack — Poliulack, Polikol e Polideck" },
  ],
  stain: [
    { src: "", alt: "Sayerlack Polisten nas cores disponíveis", legenda: "Sayerlack Polisten — Stain para madeira" },
  ],
  "tinta-emborrachada": [
    { src: "", alt: "Tinta emborrachada para telhado e fachada", legenda: "Tinta Emborrachada" },
  ],
  cupicida: [
    { src: "", alt: "Apus e Ecol Exterminador de Cupim", legenda: "Proteção contra Cupim" },
  ],
  aguarras: [
    { src: "", alt: "Aguarrás, thinner e diluentes Sayerlack", legenda: "Aguarrás / Thinner" },
  ],
};

// CALHAS — por subcategoria
export const imagensCalhas: Record<string, ImagemProduto[]> = {
  "calha-alge": [
    { src: "", alt: "Calha galvanizada no pátio", legenda: "Calha Galvanizada — Moldura" },
  ],
  rufo: [
    { src: "", alt: "Rufo galvanizado instalado", legenda: "Rufo Galvanizado" },
  ],
  "manta-termica": [
    { src: "", alt: "Manta térmica aluminizada instalada", legenda: "Manta Térmica Aluminizada 2F" },
  ],
  "manta-asfaltica": [
    { src: "", alt: "Manta asfáltica terracota", legenda: "Manta Asfáltica Aluminizada" },
  ],
  "acessorios": [
    { src: "", alt: "Acessórios para calha galvanizada Moldura e Platibanda", legenda: "Acessórios — Suportes, Cabeceiras e Saídas" },
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
  Plastificado: [
    { src: "", alt: "Madeirit Plastificado" },
    { src: "", alt: "Detalhe superfície plastificada" },
  ],
  Rosa: [{ src: "", alt: "Madeirit Rosa" }],
  OSB: [{ src: "", alt: "OSB Multiplac" }],
  Compensado: [{ src: "", alt: "Compensado estrutural" }],
};

// TELHA ESMALTADA — por cor
export const imagensEsmaltada: Record<string, ImagemProduto[]> = {
  Vermelho: [{ src: "", alt: "Telha Esmaltada Vermelha" }],
  Branco: [{ src: "", alt: "Telha Esmaltada Branca" }],
  Preto: [{ src: "", alt: "Telha Esmaltada Preta" }],
  Azul: [{ src: "", alt: "Telha Esmaltada Azul" }],
  Verde: [{ src: "", alt: "Telha Esmaltada Verde" }],
  Marrom: [{ src: "", alt: "Telha Esmaltada Marrom" }],
};

// TELHA DE CONCRETO — por cor
export const imagensConcreto: Record<string, ImagemProduto[]> = {
  Grafite: [
    { src: imgConcretoGrafiteTelhado.url, alt: "Telhado com Telha de Concreto Grafite", legenda: "Aplicação em telhado" },
  ],
};
