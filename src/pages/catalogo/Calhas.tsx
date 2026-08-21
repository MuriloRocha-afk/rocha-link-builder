import { CategoriaSubcardPage, type EmojiSubcard } from "@/components/site/EmojiSubcards";

const CARDS: EmojiSubcard[] = [
  {
    slug: "calha-alge",
    name: "Calha Alge — Moldura e Platibanda",
    emoji: "🌧️",
    badge: "Campeão de Vendas",
    tags: ["Galvanizada", "2m a 6m"],
    description:
      "Calha galvanizada nos cortes Moldura e Platibanda de 2,0m a 6,0m. A mais vendida para telhados residenciais.",
    cta: "Escolher e cotar",
  },
  {
    slug: "calha-aquapluv",
    name: "Calha Aquapluv & Style",
    emoji: "🔵",
    tags: ["PVC", "Bege e Cinza"],
    description:
      "Calhas PVC Bege e Cinza da linha Aquapluv e Aquapluv Style Retangular. Não enferruja, fácil instalação.",
    cta: "Escolher e cotar",
  },
  {
    slug: "rufo",
    name: "Rufos Galvanizados",
    emoji: "🏠",
    tags: ["Galvanizado", "2m a 6m"],
    description:
      "Rufo Alge galvanizado de 2,0m a 6,0m. Arremate entre telhado e parede, impermeabilização definitiva.",
    cta: "Escolher e cotar",
  },
  {
    slug: "agua-furtada",
    name: "Água Furtada Galvanizada",
    emoji: "💧",
    tags: ["Galvanizada", "Corte 33 e 50"],
    description:
      "Calha de rincão para o encontro entre duas águas do telhado. Galvanizada, de 2,0m a 6,0m nos cortes 33 e 50.",
    cta: "Escolher e cotar",
  },
  {
    slug: "manta-termica",
    name: "Manta Térmica Aluminizada",
    emoji: "🌡️",
    tags: ["1F e 2F", "10 a 50m²"],
    description:
      "1 face e 2 faces, de 10m² a 50m². Reduz até 70% do calor radiante. Essencial sob telhas metálicas e fibrocimento.",
    cta: "Escolher e cotar",
  },
  {
    slug: "manta-asfaltica",
    name: "Manta Asfáltica",
    emoji: "🛡️",
    tags: ["Impermeabilização", "Terracota"],
    description:
      "Aluminizada Terracota em 10cm e 20cm de largura por 10m. Impermeabilização de calhas, rufos e junções.",
    cta: "Escolher e cotar",
  },
  {
    slug: "acessorios-calha",
    name: "Acessórios de Calha",
    emoji: "🔧",
    tags: ["Alge", "Aquapluv"],
    description:
      "Suportes, cabeceiras, saídas centrais, emendas e bocais para calhas Alge e Aquapluv. Tudo para fechar o sistema.",
    cta: "Escolher e cotar",
  },
];

export default function Calhas() {
  return (
    <CategoriaSubcardPage
      titulo="🌧️ Calhas, Rufos & Funilaria"
      subtitulo="Calhas Alge e Aquapluv, rufos galvanizados, mantas térmicas e asfálticas. Escolha o produto."
      breadcrumb="Calhas, Rufos & Funilaria"
      eyebrow="Escolha o produto"
      cards={CARDS}
      categoriaSlug="calhas"
      tagTone="blue"
    />
  );
}
