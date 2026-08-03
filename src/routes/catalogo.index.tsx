import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { waLink } from "@/components/site/shared";
import { CATEGORIES } from "@/components/site/catalog-data";
import { AddToQuoteButton } from "@/components/site/quote-cart";


export const Route = createFileRoute("/catalogo/")({
  head: () => ({
    meta: [
      { title: "Catálogo de Telhas e Madeiramento | Rocha Telhas" },
      {
        name: "description",
        content:
          "Fichas técnicas de telhas cerâmicas, PVC, fibrocimento, madeiramento em cambará e cedrinho, tintas, vernizes e fixadores. Cote pelo WhatsApp.",
      },
      { property: "og:title", content: "Catálogo completo — Rocha Telhas" },
      {
        property: "og:description",
        content:
          "Telhas, madeiramento aparelhado, tintas e fixadores com ficha técnica e cotação direta no WhatsApp.",
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
              Ficha técnica direta de cada linha que mantemos em estoque. Escolha o produto e receba
              a cotação na hora pelo WhatsApp — sem preços no site, sempre a melhor condição para a
              sua obra.
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

        {visible.map((cat) => (
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

              <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((item) => (
                  <article
                    key={item.name}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        width={1024}
                        height={768}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1 text-[11px] font-bold tracking-wider text-accent-foreground uppercase">
                        {cat.short}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-extrabold text-primary">{item.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.summary}
                      </p>

                      <dl className="mt-5 space-y-2 border-t border-border pt-5 text-sm">
                        {item.specs.map((s) => (
                          <div key={s.label} className="grid grid-cols-[auto_1fr] gap-3">
                            <dt className="font-bold text-primary/80">{s.label}</dt>
                            <dd className="text-right text-muted-foreground">{s.value}</dd>
                          </div>
                        ))}
                      </dl>

                      {item.badges?.length ? (
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {item.badges.map((b) => (
                            <li
                              key={b}
                              className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-bold text-accent"
                            >
                              <Check className="h-3 w-3" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <div className="mt-6 flex flex-col gap-3">
                        <Button asChild variant="cta" className="h-12 w-full">
                          <Link
                            to="/catalogo/$produtoSlug"
                            params={{ produtoSlug: item.slug }}
                          >
                            Visualizar Detalhes
                            <ArrowRight />
                          </Link>
                        </Button>
                        <AddToQuoteButton
                          id={item.slug}
                          name={item.name}
                          detail={cat.short}
                          className="h-12 w-full"
                        />
                        <Button asChild variant="whats" className="h-12 w-full">
                          <a
                            href={waLink(
                              `Olá, gostaria de pedir um orçamento sobre ${item.name}.`,
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageCircle />
                            {item.cta ?? "Cotar no WhatsApp"}
                          </a>
                        </Button>
                      </div>

                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      <Footer />
      <FloatingWhats />
    </div>
  );
}
