import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { Ferramentas } from "@/components/site/Ferramentas";

export const Route = createFileRoute("/calculadora")({
  head: () => ({
    meta: [
      { title: "Calculadora de Telhas por m² | Rocha Telhas" },
      {
        name: "description",
        content:
          "Calcule quantas telhas romanas, portuguesas, PVC ou fibrocimento sua obra precisa, já com 5% de margem, e envie o resultado direto para cotação.",
      },
      { property: "og:title", content: "Calculadora de Telhas — Rocha Telhas" },
      {
        property: "og:description",
        content:
          "Informe a área do telhado, escolha o modelo e receba a quantidade estimada de peças com margem de segurança.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CalculadoraPage,
});

function CalculadoraPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="surface-dark pt-40 pb-16">
          <div className="mx-auto max-w-7xl px-5">
            <h1 className="max-w-3xl text-4xl leading-tight font-extrabold text-primary-foreground md:text-5xl">
              Calculadora de <span className="text-gradient-accent">Telhas</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base text-primary-foreground/75 md:text-lg">
              Descubra rapidamente a quantidade estimada de peças para a sua cobertura e envie o
              resultado para o nosso comercial em um clique.
            </p>
          </div>
        </section>

        <Ferramentas />

      </main>
      <Footer />
      <FloatingWhats />
    </div>
  );
}
