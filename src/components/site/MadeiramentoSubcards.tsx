import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Star } from "lucide-react";
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
  grupo: "nobres" | "gerais";
};

export const MADEIRAMENTO_SUBCARDS: Subcard[] = [
  {
    slug: "cambara",
    name: "Cambará Rosa",
    image: cambara,
    description:
      "Ripão, viga, caibro, caibrão, ripa, sarrafo, tábua e dormente — bruto ou aparelhado. Ripão e viga são os formatos mais vendidos.",
    badge: "Mais Vendido",
    tag: "DOF/IBAMA · Aparelhado em Plaina",
    cta: "Configurar Bitola e Comprimento",
    grupo: "nobres",
  },
  {
    slug: "pinus",
    name: "Pinus",
    image: pinus,
    description:
      "Sarrafo, tábua e pontalete com largura, espessura e comprimento próprios. Pinus tábua é um dos mais procurados.",
    badge: "Mais Vendido",
    cta: "Ver Produtos",
    grupo: "gerais",
  },
  {
    slug: "garapeira",
    name: "Garapeira",
    image: garapeira,
    description: "Madeira dura nativa: barrotes, caibros, vigas e dormentes para alta resistência.",
    cta: "Ver Bitolas",
    grupo: "nobres",
  },
  {
    slug: "eucalipto",
    name: "Eucalipto",
    image: eucalipto,
    description:
      "Eucalipto in natura e tratado em autoclave, de 2m a 6m. Reflorestamento certificado.",
    cta: "Escolher Comprimento",
    grupo: "gerais",
  },
  {
    slug: "pontalete-eucalipto",
    name: "Pontalete de Eucalipto",
    image: eucalipto,
    description:
      "Pontalete roliço tratado em autoclave, bitolas de 6cm a 18cm e 2m a 6m de comprimento. Roliço é o mais vendido.",
    badge: "Mais Vendido",
    cta: "Configurar Bitola",
    grupo: "gerais",
  },
  {
    slug: "cedrinho",
    name: "Cedrinho",
    image: cedrinho,
    description:
      "Sarrafos e tábuas em bruto ou aparelhado. Leve e ideal para forros e estruturas internas.",
    cta: "Ver Bitolas",
    grupo: "gerais",
  },
  {
    slug: "amescla",
    name: "Amescla",
    image: amescla,
    description: "Sarrafos e tábuas em bruto. Opção econômica para estruturas secundárias.",
    cta: "Ver Bitolas",
    grupo: "gerais",
  },
  {
    slug: "forro-cedrinho",
    name: "Forro Cedrinho",
    image: forroCedrinho,
    description: "Forro de cedrinho mesclado 1cm x 10cm, vendido por m². Acabamento natural nobre.",
    badge: "Mais Vendido",
    cta: "Cotar em m²",
    grupo: "gerais",
  },
  {
    slug: "forro-pinus",
    name: "Forro Pinus",
    image: forroCedrinho,
    description:
      "Réguas de pinus macho-fêmea 1cm x 10cm, vendido por m². Claro e fácil de envernizar.",
    cta: "Cotar em m²",
    grupo: "gerais",
  },
  {
    slug: "forro-pvc",
    name: "Forro PVC",
    image: forroPvc,
    description: "Réguas brancas de 20cm de largura, do 1m ao 7m de comprimento. Pronta entrega.",
    cta: "Escolher Comprimento",
    grupo: "gerais",
  },
  {
    slug: "madeirit",
    name: "Madeirit & Compensado",
    image: madeirite,
    description: "Madeirit plastificado e resinado/vermelho, OSB e compensado 9mm a 15mm.",
    cta: "Ver Espessuras",
    grupo: "gerais",
  },
  {
    slug: "tabeiras-deck",
    name: "Tabeiras & Deck",
    image: tabeira,
    description: "Tabeiras desenhadas de 15cm a 30cm e deck de cumaru, garapeia e pinus tratado.",
    cta: "Ver Modelos",
    grupo: "gerais",
  },
  {
    slug: "mourao",
    name: "Mourão Tratado",
    image: mourao,
    description: "Mourão autoclave de 4cm a 20cm de diâmetro e 2,20m a 10m de comprimento.",
    cta: "Configurar Mourão",
    grupo: "gerais",
  },
  {
    slug: "peroba",
    name: "Peroba do Norte / D'Água",
    image: garapeira,
    description:
      "Viga, caibro, caibrão, ripa, ripão, sarrafo e tábua — bruta ou aparelhada em plaina. Sob consulta.",
    tag: "Sob Consulta · DOF/IBAMA · Madeira de Lei",
    cta: "Ver Bitolas",
    grupo: "nobres",
  },
  {
    slug: "jatoba",
    name: "Jatobá",
    image: garapeira,
    description:
      "Madeira de lei de altíssima densidade: viga, caibro, caibrão, ripa, ripão, sarrafo e tábua — bruta ou aparelhada. Sob consulta.",
    tag: "Sob Consulta · DOF/IBAMA · Madeira de Lei",
    cta: "Ver Bitolas",
    grupo: "nobres",
  },
];

function SubcardGrid({ cards }: { cards: Subcard[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      {cards.map((card) => (
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
                {card.badge === "Mais Vendido" ? (
                  <Flame className="h-3 w-3 fill-current" />
                ) : (
                  <Star className="h-3 w-3 fill-current" />
                )}
                {card.badge.replace("\u2605 ", "")}
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

const ORDEM_NOBRES = ["cambara", "garapeira", "peroba", "jatoba"];

const NOBRES = ORDEM_NOBRES.map(
  (slug) => MADEIRAMENTO_SUBCARDS.find((c) => c.slug === slug)!,
).filter(Boolean);
const GERAIS = MADEIRAMENTO_SUBCARDS.filter((c) => c.grupo === "gerais");

const ABAS = [
  {
    id: "nobres" as const,
    label: "Madeiras Nobres",
    descricao:
      "Espécies nativas de alta densidade para estrutura de acabamento e alta resistência.",
    cards: NOBRES,
  },
  {
    id: "gerais" as const,
    label: "Madeiras & Beneficiados",
    descricao:
      "Reflorestamento, forros, chapas e tratados para o dia a dia da obra.",
    cards: GERAIS,
  },
];

export function MadeiramentoSubcardGrid() {
  const [aba, setAba] = useState<"nobres" | "gerais">("nobres");

  return (
    <div>
      <div
        role="tablist"
        aria-label="Grupos de madeiramento"
        className="flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-card)]"
      >
        {ABAS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={aba === t.id}
            aria-controls={`painel-${t.id}`}
            onClick={() => setAba(t.id)}
            className={`flex-1 rounded-xl px-4 py-3 text-xs font-extrabold tracking-wide uppercase transition-colors sm:text-sm ${
              aba === t.id
                ? "bg-[#F97316] text-white shadow-sm"
                : "text-primary/70 hover:bg-primary/5"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {ABAS.map((t) => (
        <section
          key={t.id}
          id={`painel-${t.id}`}
          role="tabpanel"
          aria-label={t.label}
          className={aba === t.id ? "mt-6" : "hidden"}
        >
          <h2 className="sr-only">{t.label}</h2>
          <p className="mb-6 text-sm text-muted-foreground">{t.descricao}</p>
          <SubcardGrid cards={t.cards} />
        </section>
      ))}
    </div>
  );
}
