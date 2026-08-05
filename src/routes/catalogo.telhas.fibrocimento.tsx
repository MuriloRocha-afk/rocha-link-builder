import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { FibrocimentoConfigurator } from "@/components/site/FibrocimentoConfigurator";
import fibroImg from "@/assets/prod-fibro.jpg";

const TITLE = "Telha Fibrocimento Ondulada INFIBRA | Rocha Telhas";
const DESCRIPTION =
  "Configure sua telha de fibrocimento ondulada INFIBRA: comprimentos de 1,53 m a 3,66 m, espessuras 5, 6 e 8 mm, com cobertura estimada em tempo real e cotação no WhatsApp.";

export const Route = createFileRoute("/catalogo/telhas/fibrocimento")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FibrocimentoPage,
});

function FibrocimentoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="surface-dark pt-40 pb-14">
          <div className="mx-auto max-w-7xl px-5">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-sm font-semibold text-primary-foreground/70"
            >
              <Link to="/catalogo" className="transition-colors hover:text-accent">
                Catálogo
              </Link>
              <ChevronRight className="h-4 w-4 opacity-60" />
              <Link
                to="/catalogo/$categoriaSlug"
                params={{ categoriaSlug: "telhas" }}
                className="transition-colors hover:text-accent"
              >
                Telhas
              </Link>
              <ChevronRight className="h-4 w-4 opacity-60" />
              <span className="text-accent">Fibrocimento INFIBRA</span>
            </nav>

            <Link
              to="/catalogo/$categoriaSlug"
              params={{ categoriaSlug: "telhas" }}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/70 transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para Telhas
            </Link>

            <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <h1 className="max-w-3xl text-3xl leading-tight font-extrabold text-primary-foreground md:text-5xl">
                  Telha Fibrocimento Ondulada — INFIBRA
                </h1>
                <p className="mt-4 max-w-2xl text-base text-primary-foreground/75 md:text-lg">
                  A mais vendida do pátio. Pronta entrega em todos os comprimentos.
                </p>
              </div>
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[var(--shadow-lift)]">
                <img
                  src={fibroImg}
                  alt="Telhas de fibrocimento onduladas INFIBRA estocadas no pátio da Rocha Telhas"
                  width={1024}
                  height={768}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="mx-auto max-w-5xl px-5">
            <FibrocimentoConfigurator />
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhats />
    </div>
  );
}
