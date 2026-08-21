import { Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
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
    description:
      "A mais vendida do pátio. Disponível de 153cm a 366cm, espessura 5mm, 6mm e 8mm.",
    badge: "★ Campeão de Vendas #1",
    cta: "Escolher Dimensão e Cotar",
  },
  {
    slug: "colonial-pvc",
    name: "Telha PVC — Colonial e Plan",
    image: pvc,
    description:
      "Modelos Colonial e Plan. Comprimento, largura e espessura nas cores Cerâmica, Marfim e Cinza.",
    badge: "★ Campeão de Vendas #3",
    cta: "Escolher Modelo e Cor",
  },
  {
    slug: "ceramica",
    name: "Telha Cerâmica — 5 Formatos",
    image: ceramica,
    description:
      "Portuguesa, Romana, Americana, Francesa e Mediterrânea — natural ou resinada. Marcas Isotec, Rodrigues, Laranjal e Top Telha.",
    badge: "★ Campeão de Vendas",
    cta: "Escolher Formato e Cotar",
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
    slug: "policarbonato",
    name: "Telha Policarbonato",
    image: translucida,
    description:
      "Translúcida cristal em 183cm, 244cm, 305cm e 366cm. Para iluminação natural em galpões.",
    cta: "Escolher Dimensão",
  },
  {
    slug: "polipropileno",
    name: "Telha Translúcida Polipropileno",
    image: translucida,
    description:
      "Onda Alta 177/51 Translúcida de 153cm a 366cm. Compatível com fibrocimento.",
    cta: "Ver Comprimentos",
  },
  {
    slug: "concreto",
    name: "Telha de Concreto",
    image: concreto,
    description:
      "Areia, Cinza e Grafite — linha Eurotop. Durabilidade e acabamento premium.",
    cta: "Escolher Modelo",
  },
  {
    slug: "esmaltada",
    name: "Telha Esmaltada",
    image: ceramica,
    description:
      "Cerâmica vitrificada em 6 cores. Cor permanente, impermeável e fácil de limpar.",
    cta: "Escolher Cor",
  },
  {
    slug: "cumeeiras",
    name: "Cumeeiras & Acessórios de Cobertura",
    image: fibro,
    description:
      "Cumeeiras de barro, concreto, PVC e fibrocimento. Tudo para fechar a cobertura.",
    cta: "Ver Cumeeiras",
  },
];

export function TelhasSubcardGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      {TELHAS_SUBCARDS.map((card) => (
        <Link
          key={card.slug}
          to="/catalogo/$categoriaSlug/$produtoSlug"
          params={{ categoriaSlug: "telhas", produtoSlug: card.slug }}
          className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
        >
          <div className="relative overflow-hidden">
            <img
              src={card.image}
              alt={card.name}
              loading="lazy"
              width={1024}
              height={768}
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {card.badge ? (
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-[#F97316] px-3 py-1 text-[10px] font-extrabold tracking-wider text-white uppercase shadow-sm">
                <Star className="h-3 w-3 fill-current" />
                {card.badge.replace("★ ", "")}
              </span>
            ) : null}
          </div>

          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-base leading-snug font-extrabold text-primary sm:text-lg">
              {card.name}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {card.description}
            </p>
            <span className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] px-4 py-3 text-xs font-extrabold text-white transition-all group-hover:bg-[#EA580C] sm:text-sm">
              {card.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
