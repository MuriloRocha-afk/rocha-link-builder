import { SubcardTile } from "@/components/site/SubcardTile";
import ceramica from "@/assets/prod-ceramica.jpg";
import pvc from "@/assets/prod-pvc.jpg";
import fibro from "@/assets/prod-fibro.jpg";
import concreto from "@/assets/prod-concreto.jpg";
import translucida from "@/assets/prod-translucida.jpg";

type Subcard = {
  slug: string;
  name: string;
  image: string;
  description: string;
  badge?: string;
  cta: string;
};

export const TELHAS_SUBCARDS: Subcard[] = [
  {
    slug: "fibrocimento",
    name: "Telha Fibrocimento Ondulada — INFIBRA",
    image: fibro,
    description: "A mais vendida do pátio. Disponível de 153cm a 366cm, espessura 5mm, 6mm e 8mm.",
    badge: "Top Venda #1",
    cta: "Escolher Dimensão e Cotar",
  },
  {
    slug: "colonial-pvc",
    name: "Telha PVC — Colonial e Plan",
    image: pvc,
    description:
      "Modelos Colonial e Plan. Comprimento, largura e espessura nas cores Cerâmica, Marfim e Cinza.",
    badge: "Top Venda #2",
    cta: "Escolher Modelo e Cor",
  },
  {
    slug: "ceramica",
    name: "Telha de Barro — Romana e Portuguesa Resinada",
    image: ceramica,
    description:
      "As mais vendidas de barro. Romana e Portuguesa Resinada — natural ou esmaltada também disponível.",
    badge: "Top Venda #3",
    cta: "Escolher Formato e Cotar",
  },
  {
    slug: "polipropileno",
    name: "Telha Translúcida Polipropileno",
    image: translucida,
    description: "Onda Alta 177/51 Translúcida de 153cm a 366cm. Compatível com fibrocimento.",
    cta: "Ver Comprimentos",
  },
  {
    slug: "concreto",
    name: "Telha de Concreto",
    image: concreto,
    description: "Areia, Cinza e Grafite — linha Eurotop. Durabilidade e acabamento premium.",
    cta: "Escolher Modelo",
  },
  {
    slug: "esmaltada",
    name: "Telha Esmaltada",
    image: ceramica,
    description: "Cerâmica vitrificada em 6 cores. Cor permanente, impermeável e fácil de limpar.",
    cta: "Escolher Cor",
  },
  {
    slug: "policarbonato",
    name: "Telha Policarbonato",
    image: translucida,
    description:
      "Translúcida cristal em 183cm, 244cm, 305cm e 366cm. Para iluminação natural em galpões.",
    cta: "Escolher Dimensão",
  },
  {
    slug: "vidro",
    name: "Telha de Vidro",
    image: ceramica,
    description:
      "Formatos Portuguesa, Romana e Americana. Ponto de luz natural com encaixe igual ao da telha cerâmica.",
    cta: "Escolher Formato",
  },
  {
    slug: "cumeeiras",
    name: "Cumeeiras & Acessórios de Cobertura",
    image: fibro,
    description:
      "Cumeeiras de barro, concreto, esmaltada, PVC e fibrocimento. Tudo para fechar a cobertura.",
    cta: "Ver Cumeeiras",
  },
];

export function TelhasSubcardGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      {TELHAS_SUBCARDS.map((card) => (
        <SubcardTile
          key={card.slug}
          categoriaSlug="telhas"
          produtoSlug={card.slug}
          name={card.name}
          description={card.description}
          image={card.image}
          badge={card.badge}
          cta={card.cta}
        />
      ))}
    </div>
  );
}
