import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Crown } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { CATEGORIES } from "@/components/site/catalog-data";
import { ProductCatalogCard } from "@/components/site/ProductCard";
import { CalculadoraTelhas } from "@/components/site/Calculadora";

export const Route = createFileRoute("/catalogo/")({
  head: () => ({
    meta: [
      { title: "Catálogo de Telhas e Madeiramento | Rocha Telhas" },
      {
        name: "description",
        content:
          "Campeões de venda em telhas de fibrocimento, PVC e madeira cambará, com seletores de bitola, cor e dimensão. Monte seu orçamento e cote pelo WhatsApp.",
      },
      { property: "og:title", content: "Catálogo completo — Rocha Telhas" },
      {
        property: "og:description",
        content:
          "Telhas, madeiramento aparelhado, tintas e funilaria com seletores de variação e cotação direta no WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CatalogoPage,
});

function CatalogoPage() {
  const [filtro, setFiltro] = useState<string>("todas");
  const visible = filtro === "todas" ? CATEGORIES : CATEGORIES.filter((c) => c.id === filtro);

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
              Catálogo <span className="text-gradient-accent">completo</span> de telhas,
              madeiramento e acabamentos
            </h1>
            <p className="mt-5 max-w-2xl text-base text-primary-foreground/75 md:text-lg">
              Os campeões de venda vêm primeiro, com seletor de dimensão, cor e bitola. Escolha a
              variação exata, adicione ao orçamento e receba a cotação no WhatsApp — sem preços no
              site, sempre a melhor condição para a sua obra.
            </p>
          </div>
        </section>

        <div className="sticky top-24 z-30 border-b border-border bg-card/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-5 py-4">
            {[{ id: "todas", short: "Todas as Categorias" }, ...CATEGORIES].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setFiltro(c.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                  filtro === c.id
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-card)]"
                    : "border border-border bg-card text-primary/70 hover:border-accent hover:text-accent"
                }`}
              >
                {c.short}
              </button>
            ))}
          </div>
        </div>

        {visible.map((cat) => {
          const destaques = cat.items.filter((i) => i.featured);
          const demais = cat.items.filter((i) => !i.featured);

          return (
            <section
              key={cat.id}
              id={cat.id}
              className="scroll-mt-44 border-b border-border bg-background py-20 last:border-b-0"
            >
              <div className="mx-auto max-w-7xl px-5">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-bold tracking-[0.18em] text-accent uppercase">
                    Categoria
                  </span>
                  <h2 className="mt-4 text-3xl font-extrabold text-primary md:text-4xl">
                    {cat.title}
                  </h2>
                  <p className="mt-3 text-base text-muted-foreground">{cat.description}</p>
                </div>

                {destaques.length ? (
                  <>
                    <div className="mt-10 flex items-center gap-2 text-sm font-extrabold tracking-[0.14em] text-accent uppercase">
                      <Crown className="h-4 w-4" />
                      Destaques e campeões de venda
                    </div>
                    <div className="mt-5 grid gap-7 xl:grid-cols-2">
                      {destaques.map((item) => (
                        <ProductCatalogCard
                          key={item.slug}
                          item={item}
                          categoryShort={cat.short}
                          expansive
                        />
                      ))}
                    </div>
                  </>
                ) : null}

                {demais.length ? (
                  <>
                    <div className="mt-14 text-sm font-extrabold tracking-[0.14em] text-primary/60 uppercase">
                      Demais opções da categoria
                    </div>
                    <div className="mt-5 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                      {demais.map((item) => (
                        <ProductCatalogCard
                          key={item.slug}
                          item={item}
                          categoryShort={cat.short}
                        />
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </section>
          );
        })}

        {filtro === "todas" || filtro === "telhas" ? (
          <section className="bg-secondary py-20">
            <div className="mx-auto max-w-3xl px-5">
              <CalculadoraTelhas />
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
      <FloatingWhats />
    </div>
  );
}
