import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, MessageCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { waLink } from "@/components/site/shared";
import { findProduct } from "@/components/site/catalog-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddToQuoteButton } from "@/components/site/quote-cart";
import { CalculadoraTelhas } from "@/components/site/Calculadora";

const INSTRUCOES_PADRAO = [
  "Confira a inclinação mínima do modelo antes do galgamento das ripas e mantenha o espaçamento uniforme em todo o pano do telhado.",
  "Armazene as peças sobre calços nivelados, em pilhas baixas e afastadas do trânsito da obra, evitando trincas e quebras.",
  "Inicie o assentamento sempre do beiral para a cumeeira e do lado oposto aos ventos dominantes.",
  "Use fitas de vedação e kits de parafuso/prego com arruela nas fixações para garantir estanqueidade contra goteiras.",
  "Preveja de 3% a 5% de peças extras para cortes, arremates e reposições futuras.",
];

function SpecTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((s) => (
            <tr key={s.label} className="border-b border-border last:border-b-0">
              <th className="w-1/2 px-5 py-3.5 text-left font-bold text-primary/80">{s.label}</th>
              <td className="px-5 py-3.5 text-right text-muted-foreground">{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export const Route = createFileRoute("/catalogo/$produtoSlug")({
  loader: ({ params }) => {
    const found = findProduct(params.produtoSlug);
    if (!found) throw notFound();
    return { name: found.item.name, summary: found.item.summary };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Produto não encontrado | Rocha Telhas" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.name} | Rocha Telhas`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.summary },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProdutoPage,
  errorComponent: ProdutoNotFound,
  notFoundComponent: ProdutoNotFound,
});

function ProdutoNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-5 pt-44 pb-28 text-center">
        <h1 className="text-3xl font-extrabold text-primary md:text-4xl">Produto não encontrado</h1>
        <p className="mt-4 text-muted-foreground">
          O item que você procura pode ter mudado de nome. Veja o catálogo completo.
        </p>
        <Button asChild variant="cta" size="xl" className="mt-8">
          <Link to="/catalogo">Ver catálogo completo</Link>
        </Button>
      </main>
      <Footer />
      <FloatingWhats />
    </div>
  );
}

function ProdutoPage() {
  const { produtoSlug } = Route.useParams();
  const found = findProduct(produtoSlug);
  if (!found) return <ProdutoNotFound />;
  const { category, item } = found;
  const gallery = item.gallery?.length ? item.gallery : [item.image, category.image];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="surface-dark pt-40 pb-14">
          <div className="mx-auto max-w-7xl px-5">
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/70 transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao catálogo
            </Link>
            <span className="mt-6 inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-bold tracking-[0.18em] text-accent uppercase">
              {category.short}
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl leading-tight font-extrabold text-primary-foreground md:text-5xl">
              {item.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-primary-foreground/75 md:text-lg">
              {item.summary}
            </p>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2">
            <div className="space-y-5">
              <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
                <img
                  src={gallery[0]}
                  alt={item.name}
                  width={1024}
                  height={768}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                {gallery.slice(1).map((src) => (
                  <div
                    key={src}
                    className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]"
                  >
                    <img
                      src={src}
                      alt={`${item.name} aplicado`}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              {item.badges?.length ? (
                <ul className="flex flex-wrap gap-2">
                  {item.badges.map((b) => (
                    <li
                      key={b}
                      className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent"
                    >
                      <Check className="h-3.5 w-3.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}

              <Tabs defaultValue="tecnicas" className="mt-8">
                <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-secondary p-1">
                  <TabsTrigger value="tecnicas" className="text-xs font-bold sm:text-sm">
                    Especificações
                  </TabsTrigger>
                  <TabsTrigger value="bitolas" className="text-xs font-bold sm:text-sm">
                    Bitolas & Comprimentos
                  </TabsTrigger>
                  <TabsTrigger value="uso" className="text-xs font-bold sm:text-sm">
                    Instruções de Uso
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="tecnicas">
                  <SpecTable rows={item.specs} />
                </TabsContent>

                <TabsContent value="bitolas">
                  {item.bitolas?.length ? (
                    <SpecTable rows={item.bitolas} />
                  ) : (
                    <div className="mt-4">
                      <SpecTable rows={item.specs} />
                      <p className="mt-3 text-sm text-muted-foreground">
                        Trabalhamos com medidas complementares e peças sob medida. Consulte o
                        comercial para a disponibilidade da sua obra.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="uso">
                  <ul className="mt-4 space-y-3 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                    {(item.instrucoes ?? INSTRUCOES_PADRAO).map((tip) => (
                      <li key={tip} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>

              {item.note ? (
                <p className="mt-4 flex items-start gap-2 rounded-xl border border-accent/40 bg-accent/8 p-4 text-sm text-primary/80">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {item.note}
                </p>
              ) : null}

              <div className="mt-8 flex flex-col gap-3">
                <AddToQuoteButton
                  id={item.slug}
                  name={item.name}
                  detail={category.short}
                  variant="cta"
                  className="h-14 w-full text-base"
                />
                <Button asChild variant="whats" size="xl" className="w-full">
                  <a
                    href={waLink(
                      `Olá, gostaria de um orçamento sobre ${item.name} (${category.short}).`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle />
                    Solicitar Cotação deste Produto no WhatsApp
                  </a>
                </Button>
              </div>
            </div>

          </div>
        </section>

        {category.id === "telhas" ? (
          <section className="bg-secondary py-16">
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
