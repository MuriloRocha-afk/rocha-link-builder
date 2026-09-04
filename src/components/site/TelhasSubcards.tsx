import { SubcardTile } from "@/components/site/SubcardTile";
import { Reveal } from "@/components/site/Reveal";
import ceramicaAsset from "@/assets/produtos/capas/01_capa_ceramica.jpeg.asset.json";
import pvc from "@/assets/prod-pvc.jpg";
import fibro from "@/assets/prod-fibro.jpg";
import concretoAsset from "@/assets/produtos/capas/02_capa_concreto.jpeg.asset.json";
import petAsset from "@/assets/produtos/capas/03_capa_pet.jpeg.asset.json";
import policarbonatoAsset from "@/assets/produtos/capas/04_capa_policarbonato.jpeg.asset.json";
import polipropilenoAsset from "@/assets/produtos/capas/05_capa_polipropileno.jpeg.asset.json";
import translucida from "@/assets/prod-translucida.jpg";

const ceramica = ceramicaAsset.url;
const concreto = concretoAsset.url;
const pet = petAsset.url;
const policarbonato = policarbonatoAsset.url;
const polipropileno = polipropilenoAsset.url;

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
    name: "Telha Colonial PVC",
    image: pvc,
    description:
      "Perfil ondulado de 5 ondas com visual de barro. Cores Terracota, Marfim e Cinza.",
    badge: "Top Venda #2",
    cta: "Escolher Modelo e Cor",
  },
  {
    slug: "plan-pvc",
    name: "Telha Plan PVC",
    image: pvc,
    description:
      "Perfil plano de 6 ondas com encaixe reto. Cores Terracota, Marfim, Cinza e Branca.",
    cta: "Escolher Modelo e Cor",
  },
  {
    slug: "ceramica",
    name: "Telha\u00a0 Cerâmica de Barro\u00a0",
    image: ceramica,
    description:
      "As mais vendidas de barro. Romana e Portuguesa Resinada — natural ou esmaltada também disponível.",
    badge: "Top Venda #3",
    cta: "Escolher Formato e Cotar",
  },
  {
    slug: "polipropileno",
    name: "Telha Translúcida Polipropileno",
    image: polipropileno,
    description: "Onda Alta 177/51 Translúcida de 153cm a 366cm. Compatível com fibrocimento.",
    cta: "Ver Comprimentos",
  },
  {
    slug: "concreto",
    name: "Telha de Concreto",
    image: concreto,
    description: "Areia, Cinza, Grafite e Transparente — linha Eurotop. Durabilidade e acabamento premium.",
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
    image: policarbonato,
    description:
      "Translúcida cristal em 183cm, 244cm, 305cm e 366cm. Para iluminação natural em galpões.",
    cta: "Escolher Dimensão",
  },
  {
    slug: "pet",
    name: "Telha PET Translúcida",
    image: pet,
    description:
      "Ponto de luz em PET transparente 100% reciclado, com filtro UV. Formatos Portuguesa, Romana e Mediterrânea.",
    cta: "Escolher Formato",
  },
  {
    slug: "vidro",
    name: "Telha de Vidro",
    image: ceramica,
    description:
      "Vidro real com textura que suaviza os raios UV. Formatos Portuguesa, Romana, Francesa e Mediterrânea.",
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
      {TELHAS_SUBCARDS.map((card, i) => (
        <Reveal key={card.slug} delay={(i % 3) * 90} className="flex">
        <SubcardTile
          categoriaSlug="telhas"
          produtoSlug={card.slug}
          name={card.name}
          description={card.description}
          image={card.image}
          badge={card.badge}
          cta={card.cta}
        />
        </Reveal>
      ))}
    </div>
  );
}
