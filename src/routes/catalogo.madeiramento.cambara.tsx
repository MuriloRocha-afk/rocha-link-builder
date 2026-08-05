import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, ArrowLeft, Leaf, Settings, Truck } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { CambaraConfigurator } from "@/components/site/CambaraConfigurator";
import cambaraImg from "@/assets/prod-cambara.jpg";

const TITLE = "Cambará Rosa — Configure sua peça | Rocha Telhas";
const DESCRIPTION =
  "Configure vigas, caibros, ripas, ripões e dormentes de Cambará Rosa: bitola, comprimento e acabamento bruto ou aparelhado em plaina. Cotação direta no WhatsApp.";

export const Route = createFileRoute("/catalogo/madeiramento/cambara")({
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
  component: CambaraPage,
});

const DIFERENCIAIS = [
  {
    icon: Leaf,
    title: "DOF/IBAMA",
    text: "Origem legal certificada em toda madeira nativa comercializada.",
  },
  {
    icon: Settings,
    title: "Aparelhado em plaina",
    text: "Plaina industrial no próprio pátio, com acabamento liso e padronizado.",
  },
  {
    icon: Truck,
    title: "Frota própria",
    text: "Entrega em toda São Paulo, com carga conferida antes de sair do pátio.",
  },
];

function CambaraPage() {
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
                params={{ categoriaSlug: "madeiramento" }}
                className="transition-colors hover:text-accent"
              >
                Madeiramento
              </Link>
              <ChevronRight className="h-4 w-4 opacity-60" />
              <span className="text-accent">Cambará Rosa</span>
            </nav>

            <Link
              to="/catalogo/$categoriaSlug"
              params={{ categoriaSlug: "madeiramento" }}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/70 transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para Madeiramento
            </Link>

            <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <h1 className="max-w-3xl text-3xl leading-tight font-extrabold text-primary-foreground md:text-5xl">
                  Cambará Rosa — Configure sua peça
                </h1>
                <p className="mt-4 max-w-2xl text-base text-primary-foreground/75 md:text-lg">
                  Madeira nativa cortada e aparelhada no nosso pátio. Selecione a bitola,
                  comprimento e acabamento.
                </p>
              </div>
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[var(--shadow-lift)]">
                <img
                  src={cambaraImg}
                  alt="Peças de Cambará Rosa estocadas no pátio da Rocha Telhas"
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
            <CambaraConfigurator />
          </div>
        </section>

        <section className="bg-secondary py-16">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-2xl font-extrabold text-primary md:text-3xl">
              Por que Cambará da Rocha?
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {DIFERENCIAIS.map((d) => (
                <div
                  key={d.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F97316]/10 text-[#F97316]">
                    <d.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold text-primary">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
                </div>
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
