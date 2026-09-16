import { CategoriaSubcardPage, type EmojiSubcard } from "@/components/site/EmojiSubcards";
import { capaParafusosTelha, capaPregos, capaArames, capaFerramentas } from "@/data/imagensProduto";

export const CARDS: EmojiSubcard[] = [
  {
    slug: "parafusos-telha",
    name: "Parafusos para Telha",
    emoji: "🔩",
    image: capaParafusosTelha.src,
    badge: "Campeão de Vendas",
    tags: ["Fibrocimento", "Colonial PVC"],
    description:
      "Parafusos com vedação 110mm, 150mm e 200mm para fibrocimento. Kits de fixação coloridos para Colonial PVC.",
    cta: "Escolher e cotar",
  },
  {
    slug: "pregos",
    name: "Pregos",
    emoji: "🔨",
    image: capaPregos.src,
    tags: ["Pacote 1kg", "Pacote 100 un"],
    description:
      "Prego de aço em pacote de 100 unidades e pregos polidos com e sem cabeça em pacote fechado de 1kg.",
    cta: "Escolher e cotar",
  },
  {
    slug: "arames",
    name: "Arames",
    emoji: "〰️",
    image: capaArames.src,
    tags: ["Galvanizado", "Recozido"],
    description:
      "Arame Galvanizado BWG14, 16 e 18. Arame Recozido Liso e Torcido. Para amarrações, cercas e estruturas rurais.",
    cta: "Escolher e cotar",
  },
  {
    slug: "buchas-arruelas",
    name: "Buchas, Arruelas & Barras Roscadas",
    emoji: "⚙️",
    tags: ["Barras Roscadas", "Arruelas"],
    description:
      "Buchas plásticas e com anel, arruelas lisas zincadas e barras roscadas de 1/4 a 1/2 polegada por 1,0m.",
    cta: "Escolher e cotar",
  },
  {
    slug: "parafusos-madeira",
    name: "Parafusos para Madeira",
    emoji: "🪛",
    tags: ["Chipboard", "Frances", "Autobrocante"],
    description:
      "Parafuso Chipboard, Autobrocante e Frances Completo em diversas bitolas para estruturas e caixaria.",
    cta: "Escolher e cotar",
  },
  {
    slug: "ferramentas",
    name: "Ferramentas Bestfer",
    emoji: "🧰",
    image: capaFerramentas.src,
    tags: ["Bestfer", "Serras", "Furadeiras"],
    description:
      "Serrotes, martelos, trenas, esquadros, furadeiras e brocas, níveis, chaves, alicates e formões da linha Bestfer.",
    cta: "Escolher e cotar",
  },
];

const GRUPOS = [
  {
    id: "fixacao",
    label: "Fixação & Ferragens",
    descricao:
      "Parafusos, pregos, arames, buchas, arruelas e barras roscadas para telhas e estruturas.",
    slugs: [
      "parafusos-telha",
      "pregos",
      "arames",
      "buchas-arruelas",
      "parafusos-madeira",
    ],
  },
  {
    id: "ferramentas",
    label: "Ferramentas & Utilidades de Obra",
    descricao:
      "Linha Bestfer: serrotes, martelos, trenas, esquadros, furadeiras e brocas, níveis, chaves, alicates e formões.",
    slugs: ["ferramentas"],
  },
];

export default function Fixadores() {
  return (
    <CategoriaSubcardPage
      titulo="🔩 Fixadores & Acessórios de Instalação"
      subtitulo="Parafusos, pregos, arames e tudo para fixação de telhas e estruturas de madeira."
      breadcrumb="Fixadores & Acessórios"
      eyebrow="Escolha a categoria"
      cards={CARDS}
      grupos={GRUPOS}
      categoriaSlug="fixadores"
      tagTone="gray"
    />
  );
}

