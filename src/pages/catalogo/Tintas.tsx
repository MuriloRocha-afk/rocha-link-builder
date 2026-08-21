import { CategoriaSubcardPage, type EmojiSubcard } from "@/components/site/EmojiSubcards";

const CARDS: EmojiSubcard[] = [
  {
    slug: "verniz",
    name: "Verniz para Madeira",
    emoji: "✨",
    tags: ["Anjo", "Sayerlack", "Irajá"],
    description:
      "Anjo Verniz Dura Mais, Marítimo Premium, Sayerlack Polisten e Sayermar. Para madeira interna e externa.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "stain",
    name: "Stain para Madeira",
    emoji: "🪵",
    tags: ["Anjo Tintas", "4 cores"],
    description:
      "Anjo Stain Casa nas cores Imbuia, Ipê, Mogno e Incolor. Penetra na fibra, realça o veio natural da madeira.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "tinta-acrilica",
    name: "Tinta Acrílica",
    emoji: "🎨",
    tags: ["Anjo", "Base A/B/C"],
    description:
      "Anjo Emborrachada e AnjoMais Premium. Para telhados, fachadas e superfícies externas.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "esmalte",
    name: "Esmalte Sintético",
    emoji: "🖌️",
    tags: ["Anjo Tomplus", "Várias cores"],
    description:
      "Anjo Tomplus em várias cores brilhantes. Acabamento duro e lavável para madeira e ferro.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "seladora",
    name: "Seladora, Primer & Impermeabilização",
    emoji: "🛡️",
    tags: ["Anjo", "Vedacit"],
    description:
      "Anjo Selador Acrílico, Primer Base Água, Vedacit Penetrol e Vedalit. Base para qualquer acabamento.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "cupicida",
    name: "Proteção contra Cupim",
    emoji: "🌿",
    tags: ["Apus", "Ecol"],
    description:
      "Apus Química e Ecol Exterminador de Cupim em 900ml e 5L. Proteção preventiva e curativa para estruturas de madeira.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "thinner",
    name: "Thinner & Diluentes",
    emoji: "🧪",
    tags: ["Anjo", "Eucatex"],
    description:
      "Anjo Thinner, Aguarraz Mineral e Diluente Premium. Para limpeza e diluição de tintas e vernizes.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "aguarras",
    name: "Aguarrás",
    emoji: "🧴",
    tags: ["Mineral", "Vegetal"],
    description:
      "Aguarrás mineral e vegetal para diluir esmaltes e vernizes e limpar ferramentas de pintura.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "acessorios-pintura",
    name: "Acessórios de Aplicação",
    emoji: "🖌️",
    tags: ["Rolos", "Pincéis", "Extensores"],
    description:
      "Rolos de lã e espuma, pincéis, trinchas, brochas, extensores telescópicos, bandejas e fitas.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "lixas",
    name: "Lixas para Madeira",
    emoji: "🧽",
    tags: ["Grãos 50 a 600", "Rolo e folha"],
    description:
      "Lixas para madeira, lixa d'água, lixa de massa e esponja abrasiva em todos os grãos.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "cola",
    name: "Colas & Adesivos",
    emoji: "🧷",
    tags: ["PVA", "Contato", "PU"],
    description:
      "Cola branca PVA, cola de madeira extra, cola de contato, cola PU, super cola e cola para PVC.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "pu-calha",
    name: "PU para Calha",
    emoji: "🛠️",
    tags: ["Selante", "4 cores"],
    description:
      "Selante poliuretano para emendas de calhas, rufos e água furtada. Alta aderência e resistência a UV.",
    cta: "Ver produtos e cotar",
  },
];

export default function Tintas() {
  return (
    <CategoriaSubcardPage
      titulo="🎨 Tintas, Vernizes & Proteção"
      subtitulo="Linha completa Anjo, Sayerlack, Vedacit e mais. Escolha o tipo de produto para ver as opções e cotar."
      breadcrumb="Tintas, Vernizes & Proteção"
      eyebrow="Escolha o tipo de produto"
      cards={CARDS}
      categoriaSlug="tintas"
      tagTone="purple"
    />
  );
}
