import { CategoriaSubcardPage, type EmojiSubcard } from "@/components/site/EmojiSubcards";

export const CARDS: EmojiSubcard[] = [
  {
    slug: "cupicida",
    name: "Exterminador de Cupim",
    emoji: "🌿",
    tags: ["Sayerlack", "3 tamanhos", "Cupim"],
    description:
      "Exterminador de cupim Sayerlack em 900ml, 5L e 18L. Proteção preventiva e curativa para estruturas de madeira.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "verniz",
    name: "Verniz para Madeira",
    emoji: "✨",
    tags: ["Sayerlack", "Polirex", "Restaurador"],
    description:
      "Verniz restaurador Sayerlack Polirex nas cores Imbuia e Mogno. Recupera e protege madeira já envernizada.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "stain",
    name: "Stain para Madeira",
    emoji: "🪵",
    tags: ["Sayerlack", "Polisten"],
    description:
      "Sayerlack Polisten em Imbuia, Mogno Inglês e Transparente, nos tamanhos 900ml e 3,6L. Penetra na fibra e realça o veio natural.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "aguarras",
    name: "Aguarrás / Thinner",
    emoji: "🧴",
    tags: ["Sayerlack", "Mineral", "Vegetal"],
    description:
      "Aguarrás mineral e vegetal, thinner profissional e diluentes Sayerlack para vernizes, stains e limpeza.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "tinta-emborrachada",
    name: "Tinta Emborrachada",
    emoji: "🎨",
    tags: ["Telhado", "Fachada", "Laje"],
    description:
      "Tinta acrílica emborrachada com filme elástico e impermeável para telhados, lajes e fachadas.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "acessorios-pintura",
    name: "Acessórios para Fixação",
    emoji: "🖌️",
    tags: ["Roloflex", "Bestfer", "Espátulas"],
    description:
      "Rolos Roloflex com e sem capa, broxas, pincéis e jogos Bestfer, suporte para rolo e espátulas de aço.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "lixas",
    name: "Lixas para Madeira",
    emoji: "🧽",
    tags: ["Disco 180mm", "Folha avulsa", "Grãos 36 a 220"],
    description:
      "Disco de lixa 180mm Bestfer (10 peças) nos grãos 36, 60 e 100 e lixa madeira/massa em folha avulsa dos grãos 60 ao 220.",
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
  {
    slug: "lona-plastica",
    name: "Lona Plástica",
    emoji: "🟦",
    tags: ["Preta", "Leitosa", "Encerada"],
    description:
      "Lona preta, leitosa, azul e encerada em várias medidas e espessuras. Proteção de obra, pintura e cobertura provisória.",
    cta: "Ver produtos e cotar",
  },
];

const GRUPOS = [
  {
    id: "madeira",
    label: "Acabamento & Proteção de Madeira",
    descricao:
      "Stain e verniz Sayerlack, exterminador de cupim, lixas e acessórios de aplicação para tratar e acabar madeira.",
    slugs: ["stain", "verniz", "cupicida", "lixas", "acessorios-pintura"],
  },
  {
    id: "construcao",
    label: "Tintas & Vedação para Construção",
    descricao:
      "Tinta emborrachada, aguarrás e thinner, colas, selante PU para calha e lona plástica de obra.",
    slugs: ["tinta-emborrachada", "aguarras", "cola", "pu-calha", "lona-plastica"],
  },
];


export default function Tintas() {
  return (
    <CategoriaSubcardPage
      titulo="🎨 Tintas, Vernizes & Proteção"
      subtitulo="Linha Sayerlack completa e itens de obra. Escolha o tipo de produto para ver as opções e cotar."
      breadcrumb="Tintas, Vernizes & Proteção"
      eyebrow="Escolha o tipo de produto"
      cards={CARDS}
      grupos={GRUPOS}
      categoriaSlug="tintas"
      tagTone="purple"
    />
  );
}

