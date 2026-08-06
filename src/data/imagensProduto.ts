import { ImagemProduto } from "../components/GaleriaProduto";

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
    { src: "", alt: "Telha Portuguesa Resinada Isotec", legenda: "Telha Portuguesa Resinada — Marca Isotec" },
    { src: "", alt: "Detalhe do encaixe da telha portuguesa Isotec", legenda: "Encaixe de precisão" },
  ],
  "portuguesa-rodrigues": [
    { src: "", alt: "Telha Portuguesa Rodrigues", legenda: "Telha Portuguesa Mesclada Resinada — Rodrigues" },
  ],
  "portuguesa-mesclada": [
    { src: "", alt: "Telha Portuguesa Mesclada", legenda: "Mesclada Resinada" },
  ],
  "romana-resinada": [
    { src: "", alt: "Telha Romana Resinada Laranjal", legenda: "Telha Romana Resinada — Laranjal" },
  ],
  "romana-top": [
    { src: "", alt: "Telha Romana Top Telha Terracota Prime", legenda: "Romana Top Telha — Terracota Prime" },
  ],
  "americana-resinada": [
    { src: "", alt: "Telha Americana Resinada Cerâmica", legenda: "Telha Americana — Cerâmica Resinada" },
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
  Cerâmica: [
    { src: "/assets/prod-pvc-BAaVR7pV.jpg", alt: "Telha Colonial PVC Cerâmica", legenda: "Colonial PVC — Cor Cerâmica" },
  ],
  Cinza: [
    { src: "", alt: "Telha Colonial PVC Cinza", legenda: "Colonial PVC — Cor Cinza" },
  ],
  Marfim: [
    { src: "", alt: "Telha Colonial PVC Marfim", legenda: "Colonial PVC — Cor Marfim" },
  ],
  Translúcida: [
    { src: "", alt: "Telha Colonial PVC Translúcida", legenda: "Colonial PVC — Translúcida" },
  ],
};

// CAMBARÁ — por tipo
export const imagensCambara: Record<string, ImagemProduto[]> = {
  Viga: [
    { src: "", alt: "Viga de Cambará Rosa no pátio", legenda: "Vigas de Cambará Rosa — Aparelhadas em Plaina" },
    { src: "", alt: "Detalhe da seção transversal da viga Cambará" },
  ],
  Caibro: [
    { src: "", alt: "Caibros de Cambará Rosa", legenda: "Caibros Cambará — 5×5cm e 5×7cm" },
  ],
  Ripa: [
    { src: "", alt: "Ripas de Cambará Rosa", legenda: "Ripas Cambará — 1,5×5cm" },
  ],
  Ripão: [
    { src: "", alt: "Ripões de Cambará Rosa", legenda: "Ripões Cambará — 2×5cm" },
  ],
  Dormente: [
    { src: "", alt: "Dormentes de Cambará Rosa", legenda: "Dormentes Cambará" },
  ],
};

// PONTALETES EUCALIPTO
export const imagensEucalipto: Record<string, ImagemProduto[]> = {
  "pontalete-eucalipto": [
    { src: "", alt: "Pontalete roliço eucalipto tratado", legenda: "Pontalete Roliço Eucalipto — Autoclave" },
    { src: "", alt: "Pilha de pontaletes de eucalipto no pátio" },
  ],
  "viga-eucalipto": [
    { src: "", alt: "Viga serrada eucalipto", legenda: "Viga Serrada Eucalipto" },
  ],
};

// FORRO PVC
export const imagensForroPVC: Record<string, ImagemProduto[]> = {
  default: [
    { src: "", alt: "Forro PVC Branco instalado", legenda: "Forro PVC Branco — Régua 20cm" },
    { src: "", alt: "Detalhe do encaixe das réguas PVC" },
  ],
};

// FORRO CEDRINHO
export const imagensForroCedrinho: ImagemProduto[] = [
  { src: "", alt: "Forro cedrinho mesclado instalado", legenda: "Forro Cedrinho Mesclado — 1cm × 10cm" },
  { src: "", alt: "Detalhe do forro cedrinho antes da instalação" },
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
