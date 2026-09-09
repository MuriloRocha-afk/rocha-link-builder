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
    name: "Thinner Profissional",
    emoji: "🧴",
    tags: ["Sayerlack", "900ml e 5L", "Diluição"],
    description:
      "Sayerlack Thinner Profissional em 900ml e 5L. Dilui tintas e vernizes e limpa pincéis, rolos e equipamentos.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "massa-madeira",
    name: "Massa para Madeira",
    emoji: "🪵",
    tags: ["Sayerlack", "Sayermassa", "4 cores"],
    description:
      "Massa Sayerlack Sayermassa nas cores Eucalipto, Imbuia Tabaco, Mogno e Pinus. Preenche rachaduras, furos e imperfeições antes do acabamento.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "sayerraz",
    name: "Aguarrás Sayerraz",
    emoji: "🪣",
    tags: ["Sayerlack", "900ml e 5L", "Aguarrás"],
    description:
      "Aguarrás Sayerlack Sayerraz em 900ml e 5L. Dilui tintas e vernizes à base de óleo e limpa pincéis, rolos e ferramentas.",
    cta: "Ver produtos e cotar",
  },
  {
    slug: "tinta-emborrachada",
    name: "Tinta Emborrachada",
    emoji: "🎨",
    tags: ["Brazilian Color", "Cinza Espacial", "3,6L e 18L"],
    description:
      "Tinta emborrachada Brazilian Color Super Proteção na cor Cinza Espacial, em 3,6L e 18L. Filme elástico e impermeável para laje, telhado e fachada.",
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
    slug: "pu-calha",
    name: "PU para Calha",
    emoji: "🛠️",
    tags: ["PU40 Cinza", "Bisnaga 400g"],
    description:
      "Selante poliuretano PU40 Cinza em bisnaga de 400g para emendas de calhas, rufos e água furtada.",
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
    slugs: ["stain", "verniz", "massa-madeira", "cupicida", "lixas", "acessorios-pintura"],
  },
  {
    id: "construcao",
    label: "Tintas & Vedação para Construção",
    descricao:
      "Tinta emborrachada, thinner, selante PU para calha e lona plástica de obra.",
    slugs: ["tinta-emborrachada", "aguarras", "sayerraz", "pu-calha", "lona-plastica"],
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

