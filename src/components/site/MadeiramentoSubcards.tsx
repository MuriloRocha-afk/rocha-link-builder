import { Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import cambaraAsset from "@/assets/IMG_1500.jpeg.asset.json";
import eucalipto from "@/assets/prod-eucalipto.jpg";
import cedrinho from "@/assets/prod-cedrinho.jpg";
import pinus from "@/assets/prod-pinus.jpg";
import garapeira from "@/assets/prod-garapeira.jpg";
import amescla from "@/assets/prod-amescla.jpg";
import forroPvc from "@/assets/prod-forro-pvc.jpg";
import forroCedrinho from "@/assets/prod-forro-cedrinho.jpg";
import madeirite from "@/assets/prod-madeirite.jpg";
import tabeira from "@/assets/prod-tabeira.jpg";
import mourao from "@/assets/prod-mourao.jpg";

const cambara = cambaraAsset.url;

type Subcard = {
  slug: string;
  name: string;
  image: string;
  description: string;
  badge?: string;
  tag?: string;
  cta: string;
};

export const MADEIRAMENTO_SUBCARDS: Subcard[] = [
  {
    slug: "cambara",
    name: "Cambará Rosa",
    image: cambara,
    description:
      "Viga, caibro, caibrão, ripa, ripão, sarrafo, tábua e dormente — bruto ou aparelhado.",
    badge: "★ Campeão de Vendas",
    tag: "DOF/IBAMA · Aparelhado em Plaina",
    cta: "Configurar Bitola e Comprimento",
  },
  {
    slug: "eucalipto",
    name: "Eucalipto",
    image: eucalipto,
    description:
      "Eucalipto in natura e tratado em autoclave, de 2m a 6m. Reflorestamento certificado.",
    badge: "★ Campeão de Vendas",
    cta: "Escolher Comprimento",
  },
  {
    slug: "pontalete-eucalipto",
    name: "Pontalete de Eucalipto",
    image: eucalipto,
    description:
      "Pontalete roliço tratado em autoclave, bitolas de 6cm a 18cm e 2m a 6m de comprimento.",
    cta: "Configurar Bitola",
  },
  {
    slug: "cedrinho",
    name: "Cedrinho",
    image: cedrinho,
    description:
      "Sarrafos e tábuas em bruto ou aparelhado. Leve e ideal para forros e estruturas internas.",
    cta: "Ver Bitolas",
  },
  {
    slug: "pinus",
    name: "Pinus",
    image: pinus,
    description: "Sarrafo, tábua e pontalete com largura, espessura e comprimento próprios.",
    cta: "Ver Produtos",
  },
  {
    slug: "peroba",
    name: "Peroba do Norte / D'Água",
    image: garapeira,
    description:
      "Viga, caibro, caibrão, ripa, ripão, sarrafo e tábua — bruta ou aparelhada em plaina.",
    tag: "DOF/IBAMA · Madeira de Lei",
    cta: "Ver Bitolas",
  },
  {
    slug: "garapeira",
    name: "Garapeira",
    image: garapeira,
    description: "Madeira dura nativa: barrotes, caibros, vigas e dormentes para alta resistência.",
    cta: "Ver Bitolas",
  },
  {
    slug: "amescla",
    name: "Amescla",
    image: amescla,
    description: "Sarrafos e tábuas em bruto. Opção econômica para estruturas secundárias.",
    cta: "Ver Bitolas",
  },
  {
    slug: "forro-pvc",
    name: "Forro PVC",
    image: forroPvc,
    description: "Réguas brancas de 20cm de largura, do 1m ao 7m de comprimento. Pronta entrega.",
    badge: "★ Campeão de Vendas",
    cta: "Escolher Comprimento",
  },
  {
    slug: "forro-cedrinho",
    name: "Forro Cedrinho",
    image: forroCedrinho,
    description: "Forro de cedrinho mesclado 1cm x 10cm, vendido por m². Acabamento natural nobre.",
    badge: "★ Campeão de Vendas",
    cta: "Cotar em m²",
  },
  {
    slug: "forro-pinus",
    name: "Forro Pinus",
    image: forroCedrinho,
    description:
      "Réguas de pinus macho-fêmea 1cm x 10cm, vendido por m². Claro e fácil de envernizar.",
    cta: "Cotar em m²",
  },
  {
    slug: "madeirit",
    name: "Madeirit & Compensado",
    image: madeirite,
    description: "Madeirit plastificado e resinado/vermelho, OSB e compensado 9mm a 15mm.",
    cta: "Ver Espessuras",
  },
  {
    slug: "tabeiras-deck",
    name: "Tabeiras & Deck",
    image: tabeira,
    description: "Tabeiras desenhadas de 15cm a 30cm e deck de cumaru, garapeia e pinus tratado.",
    cta: "Ver Modelos",
  },
  {
    slug: "mourao",
    name: "Mourão Tratado",
    image: mourao,
    description: "Mourão autoclave de 4cm a 20cm de diâmetro e 2,20m a 10m de comprimento.",
    cta: "Configurar Mourão",
  },
];

export function MadeiramentoSubcardGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      {MADEIRAMENTO_SUBCARDS.map((card) => (
        <Link
          key={card.slug}
          to="/catalogo/$categoriaSlug/$produtoSlug"
          params={{ categoriaSlug: "madeiramento", produtoSlug: card.slug }}
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
            {card.tag ? (
              <span className="mt-2 inline-flex w-fit rounded-full bg-primary/5 px-3 py-1 text-[10px] font-bold tracking-wide text-primary/70 uppercase">
                {card.tag}
              </span>
            ) : null}
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {card.description}
            </p>
            <span className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] px-4 py-3 text-center text-xs font-extrabold text-white transition-all group-hover:bg-[#EA580C] sm:text-sm">
              {card.cta}
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
