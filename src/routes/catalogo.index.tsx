import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/shared";
import { CATEGORIES } from "@/components/site/catalog-data";

const EMOJI: Record<string, string> = {
  telhas: "🧱",
  madeiramento: "🪵",
  tintas: "🎨",
  calhas: "🌧️",
  fixadores: "🔩",
};

/** Ordem real de faturamento (maior para o menor). */
const ORDEM = ["telhas", "madeiramento", "calhas", "fixadores", "tintas"];

const MAIS_VENDIDOS: Record<string, string> = {
  telhas: "Fibrocimento é o nosso mais vendido — Ondulada 244x110cm x 5mm.",
  madeiramento: "Cambará é a madeira mais vendida do pátio, seguida do Pinus.",
  calhas: "Calha Alge galvanizada e rufos são os campeões da funilaria.",
  fixadores: "Parafuso com vedação e prego telheiro saem todos os dias.",
  tintas: "Stain e verniz para madeira são os mais procurados.",
};

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
              {CATEGORIES.map((c) => (
                <Link
                  key={c.id}
                  to="/catalogo/$categoriaSlug"
                  params={{ categoriaSlug: c.id }}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  {c.bestseller ? (
                    <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-[#F97316] px-3 py-1 text-[10px] font-extrabold tracking-wider text-white uppercase shadow-sm">
                      {c.bestseller}
                    </span>
                  ) : null}

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-3xl">
                    {EMOJI[c.id]}
                  </div>

                  <h2 className="mt-5 text-2xl font-extrabold text-primary">{c.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {c.description}
                  </p>

                  <span className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 text-sm font-extrabold text-white transition-all group-hover:bg-[#EA580C]">
                    {c.ctaLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
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
