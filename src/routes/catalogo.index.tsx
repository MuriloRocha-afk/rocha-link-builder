import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  CloudRain,
  Layers,
  Paintbrush,
  Trophy,
  TreePine,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/shared";
import { Reveal } from "@/components/site/Reveal";
import { CATEGORIES } from "@/components/site/catalog-data";

const ICONS: Record<string, LucideIcon> = {
  telhas: Layers,
  madeiramento: TreePine,
  tintas: Paintbrush,
  calhas: CloudRain,
  fixadores: Wrench,
};

/** Ordem real de faturamento (maior para o menor). */
const ORDEM = ["telhas", "madeiramento", "calhas", "fixadores", "tintas"];

/** Contagem real de subcategorias de cada página de categoria. */
const VARIEDADE: Record<string, string> = {
  telhas: "10 tipos de telha em linha",
  madeiramento: "15 espécies e beneficiados no pátio",
  calhas: "7 linhas de calha, rufo e manta",
  fixadores: "7 famílias de fixação e ferramentas",
  tintas: "13 produtos de pintura e proteção",
};

const MAIS_VENDIDOS: Record<string, string> = {
  telhas: "Fibrocimento é o nosso mais vendido — Ondulada 244x110cm x 5mm.",
  madeiramento: "Cambará é a madeira mais vendida do pátio, seguida do Pinus.",
  calhas: "Calha galvanizada e rufos são os campeões da funilaria.",
  fixadores: "Parafuso com vedação e prego telheiro saem todos os dias.",
  tintas: "Stain e verniz para madeira são os mais procurados.",
};

function CategoriaCard({
  categoria,
  hero = false,
}: {
  categoria: (typeof CATEGORIES)[number];
  hero?: boolean;
}) {
  const Icon = ICONS[categoria.id] ?? Layers;

  return (
    <Link
      to="/catalogo/$categoriaSlug"
      params={{ categoriaSlug: categoria.id }}
      className={`group relative flex overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${
        hero ? "min-h-[22rem] w-full" : "min-h-[19rem] w-full"
      }`}
    >
      <img
        src={categoria.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/25"
      />

      {categoria.bestseller ? (
        <span className="absolute top-5 right-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#F97316] px-3.5 py-1.5 text-[11px] font-extrabold tracking-wider text-white uppercase shadow-lg ring-2 ring-white/25">
          <Trophy className="h-3.5 w-3.5 fill-current" />
          {categoria.bestseller}
        </span>
      ) : null}

      <div className="relative z-10 flex w-full flex-col justify-end p-6 sm:p-8">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F97316] text-white shadow-lg ring-4 ring-white/15">
          <Icon className="h-7 w-7" />
        </span>

        <h2
          className={`mt-5 font-extrabold text-primary-foreground ${hero ? "text-3xl md:text-4xl" : "text-2xl"}`}
        >
          {categoria.title}
        </h2>
        <p
          className={`mt-2 text-sm leading-relaxed text-primary-foreground/80 ${hero ? "max-w-xl md:text-base" : ""}`}
        >
          {categoria.description}
        </p>

        <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/12 px-3 py-1 text-[11px] font-bold tracking-wide text-primary-foreground/90 uppercase backdrop-blur-sm">
          <Boxes className="h-3.5 w-3.5" />
          {VARIEDADE[categoria.id]}
        </span>

        {MAIS_VENDIDOS[categoria.id] ? (
          <p className="mt-3 text-xs leading-snug font-semibold text-accent">
            ★ {MAIS_VENDIDOS[categoria.id]}
          </p>
        ) : null}

        <span className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 text-sm font-extrabold text-white transition-all duration-300 group-hover:bg-[#EA580C] sm:w-fit sm:px-7">
          {categoria.ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export const Route = createFileRoute("/catalogo/")({
  head: () => ({
    meta: [
      { title: "Catálogo de Telhas e Madeiramento | Rocha Telhas" },
      {
        name: "description",
        content:
          "Navegue pelas categorias da Rocha Telhas: telhas, madeiramento, tintas, calhas e fixadores. Escolha a categoria e monte seu orçamento via WhatsApp.",
      },
      { property: "og:title", content: "Catálogo — Rocha Telhas" },
      {
        property: "og:description",
        content:
          "Telhas, madeiramento aparelhado, tintas, calhas e fixadores com cotação direta no WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CatalogoPage,
});

function CatalogoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="surface-dark pt-40 pb-16">
          <div className="mx-auto max-w-7xl px-5">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/70 transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para a home
            </Link>
            <h1 className="mt-6 max-w-3xl text-4xl leading-tight font-extrabold text-primary-foreground md:text-6xl">
              Catálogo <span className="text-gradient-accent">Rocha Telhas</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base text-primary-foreground/75 md:text-lg">
              Escolha uma categoria e encontre a ficha técnica completa de cada produto. Selecione
              bitola, cor e dimensão e envie seu orçamento pelo WhatsApp — sem preços no site,
              sempre a melhor condição para a sua obra.
            </p>
          </div>
        </section>

        <section className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-5">
            <SectionHeading
              kicker="Navegue por Categoria"
              title="O que você precisa para sua obra?"
              subtitle="Clique em uma categoria para ver todos os produtos, variações e especificações técnicas."
            />

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...CATEGORIES]
                .sort((a, b) => ORDEM.indexOf(a.id) - ORDEM.indexOf(b.id))
                .map((c, i) => (
                  <Reveal
                    key={c.id}
                    delay={i * 100}
                    className={`flex ${c.id === "telhas" ? "sm:col-span-2 lg:col-span-2" : ""}`}
                  >
                    <CategoriaCard categoria={c} hero={c.id === "telhas"} />
                  </Reveal>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhats />
    </div>
  );
}
