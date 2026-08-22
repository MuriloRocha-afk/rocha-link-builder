import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, Crown } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { CATEGORIES, type CatalogItem } from "@/components/site/catalog-data";
import { ProductCatalogCard } from "@/components/site/ProductCard";
import { TelhasSubcardGrid } from "@/components/site/TelhasSubcards";
import { MadeiramentoSubcardGrid } from "@/components/site/MadeiramentoSubcards";

export const Route = createFileRoute("/catalogo/$categoriaSlug/")({
  loader: ({ params }) => {
    const category = CATEGORIES.find((c) => c.id === params.categoriaSlug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Categoria não encontrada | Rocha Telhas" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.category.title} | Rocha Telhas`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.category.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.category.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoriaPage,
  notFoundComponent: CategoriaNotFound,
});

function CategoriaNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-5 pt-44 pb-28 text-center">
        <h1 className="text-3xl font-extrabold text-primary md:text-4xl">Categoria não encontrada</h1>
        <p className="mt-4 text-muted-foreground">
          A categoria que você procura não existe. Veja todas as opções no catálogo.
        </p>
        <Link
          to="/catalogo"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#F97316] px-6 py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#EA580C]"
        >
          Ver catálogo completo
        </Link>
      </main>
      <Footer />
      <FloatingWhats />
    </div>
  );
}

function CategoriaPage() {
  const { category } = Route.useLoaderData();
  const destaques = category.items.filter((i: CatalogItem) => i.featured || i.bestseller);
  const demais = category.items.filter((i: CatalogItem) => !i.featured && !i.bestseller);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="surface-dark pt-40 pb-16">
          <div className="mx-auto max-w-7xl px-5">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-semibold text-primary-foreground/70">
              <Link to="/catalogo" className="transition-colors hover:text-accent">
                Catálogo
              </Link>
              <ChevronRight className="h-4 w-4 opacity-60" />
              <span className="text-accent">{category.title}</span>
            </nav>
            <Link
              to="/catalogo"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/70 transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao catálogo
            </Link>
            <h1 className="mt-6 max-w-3xl text-4xl leading-tight font-extrabold text-primary-foreground md:text-6xl">
              {category.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base text-primary-foreground/75 md:text-lg">
              {category.description}
            </p>
          </div>
        </section>

        <section className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-5">
            {category.id === "telhas" || category.id === "madeiramento" ? (
              <>
                <div className="flex items-center gap-2 text-sm font-extrabold tracking-[0.14em] text-accent uppercase">
                  <Crown className="h-4 w-4" />
                  {category.id === "telhas" ? "Escolha o tipo de telha" : "Escolha o tipo de madeira"}
                </div>
                <div className="mt-6">
                  {category.id === "telhas" ? <TelhasSubcardGrid /> : <MadeiramentoSubcardGrid />}
                </div>
              </>
            ) : (
              <>
                {destaques.length ? (
                  <>
                    <div className="flex items-center gap-2 text-sm font-extrabold tracking-[0.14em] text-accent uppercase">
                      <Crown className="h-4 w-4" />
                      Destaques e campeões de venda
                    </div>
                    <div className="mt-5 grid gap-7 xl:grid-cols-2">
                      {destaques.map((item: CatalogItem) => (
                        <ProductCatalogCard
                          key={item.slug}
                          item={item}
                          categoryShort={category.short}
                          categoryId={category.id}
                          expansive
                        />
                      ))}
                    </div>
                  </>
                ) : null}

                {demais.length ? (
                  <>
                    <div className={`${destaques.length ? "mt-14" : ""} text-sm font-extrabold tracking-[0.14em] text-primary/60 uppercase`}>
                      Demais opções da categoria
                    </div>
                    <div className="mt-5 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                      {demais.map((item: CatalogItem) => (
                        <ProductCatalogCard
                          key={item.slug}
                          item={item}
                          categoryShort={category.short}
                          categoryId={category.id}
                        />
                      ))}
                    </div>
                  </>
                ) : null}
              </>
            )}
          </div>
        </section>


        {category.id === "telhas" ? (
          <section className="surface-dark py-16">
            <div className="mx-auto max-w-4xl px-5 text-center">
              <h2 className="text-2xl leading-tight font-extrabold text-primary-foreground md:text-3xl">
                Calcule telhas, madeira e inclinação em um só lugar
              </h2>
              <p className="mt-3 text-sm text-primary-foreground/75 md:text-base">
                Nossa calculadora completa estima a quantidade de telhas, estrutura de madeira, tintas e vernizes com base nas medidas reais do seu telhado.
              </p>
              <Link
                to="/calculadora"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#EA580C]"
              >
                <Calculator className="h-4 w-4" />
                Calcular meu telhado
              </Link>
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
      <FloatingWhats />
    </div>
  );
}
