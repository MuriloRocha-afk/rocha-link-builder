import { CategoriaSubcardPage, type EmojiSubcard } from "@/components/site/EmojiSubcards";
import capaCalhaCardAsset from "@/assets/produtos/cards-calhas/capa_card_calha_galvanizada.jpg.asset.json";
import capaRufoCardAsset from "@/assets/produtos/cards-calhas/capa_card_rufo_galvanizado.jpg.asset.json";
import capaAcessoriosCardAsset from "@/assets/produtos/cards-calhas/capa_card_acessorios_calha.jpg.asset.json";
import capaMantaTermicaAsset from "@/assets/produtos/manta-termica/01_capa_foto_prateleira.jpg.asset.json";

export const CARDS: EmojiSubcard[] = [
  {
    slug: "calha-alge",
    name: "Calha Galvanizada",
    emoji: "🌧️",
    image: capaCalhaCardAsset.url,
    badge: "Campeão de Vendas",
    tags: ["Galvanizada", "Moldura e Platibanda", "2m a 6m"],
    description:
      "Calha galvanizada nos cortes Moldura e Platibanda de 2,0m a 6,0m. A mais vendida para telhados residenciais.",
    cta: "Escolher e cotar",
  },
  {
    slug: "rufo",
    name: "Rufo Galvanizado",
    emoji: "🏠",
    image: capaRufoCardAsset.url,
    tags: ["Galvanizado", "Corte 25 e 33", "2m a 6m"],
    description:
      "Rufo galvanizado nos cortes 25 e 33, de 2,0m a 6,0m. Arremate entre telhado e parede, impermeabilização definitiva.",
    cta: "Escolher e cotar",
  },
  {
    slug: "manta-termica",
    name: "Manta Térmica Aluminizada",
    emoji: "🌡️",
    image: capaMantaTermicaAsset.url,
    tags: ["1F e 2F", "10 a 50m²"],
    description:
      "1 face e 2 faces, de 10m² a 50m². Reduz até 70% do calor radiante. Essencial sob telhas metálicas e fibrocimento.",
    cta: "Escolher e cotar",
  },
  {
    slug: "acessorios",
    name: "Acessórios de Calha",
    emoji: "🔧",
    image: capaAcessoriosCardAsset.url,
    tags: ["Moldura", "Platibanda"],
    description:
      "Suporte, cabeceira e saída para calha galvanizada Moldura e Platibanda.",
    cta: "Escolher e cotar",
  },
];

const GRUPOS = [
  {
    id: "calhas",
    label: "Calhas & Rufos",
    descricao:
      "Calha galvanizada nos cortes Moldura e Platibanda, rufos e todos os acessórios para fechar o sistema de captação.",
    slugs: ["calha-alge", "rufo", "acessorios"],
  },
  {
    id: "mantas",
    label: "Mantas & Impermeabilização",
    descricao:
      "Manta térmica aluminizada para conforto térmico sob telhas metálicas, fibrocimento, PVC e cerâmica.",
    slugs: ["manta-termica"],
  },
];

export default function Calhas() {
  return (
    <CategoriaSubcardPage
      titulo=" Calhas, Rufos & Funilaria"
      subtitulo="Calha galvanizada, rufos, manta térmica e acessórios. Escolha o produto."
      breadcrumb="Calhas, Rufos & Funilaria"
      eyebrow="Escolha o produto"
      cards={CARDS}
      grupos={GRUPOS}
      categoriaSlug="calhas"
      tagTone="blue"
    />
  );
}

