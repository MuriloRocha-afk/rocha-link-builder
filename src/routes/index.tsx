import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Truck, TreePine, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { Categorias } from "@/components/site/Categorias";
import { Acao, Depoimentos, Faq, Unidades } from "@/components/site/Sections";
import { Tecnologia, CtaFinal } from "@/components/site/Tecnologia";
import { AvisoEntrega } from "@/components/site/AvisoEntrega";
import { CalculadoraTelhas } from "@/components/site/Calculadora";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/shared";
import hero from "@/assets/hero-patio.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rocha Telhas | Telhas e Madeiramento em Franco da Rocha" },
      {
        name: "description",
        content:
          "Distribuidora e madeireira com +25 anos: telhas, madeiramento estrutural, madeirites e acessórios com frota própria em Franco da Rocha. Cote pelo WhatsApp.",
      },
      { property: "og:title", content: "Rocha Telhas | Telhas e Madeiramento Estrutural" },
      {
        property: "og:description",
        content:
          "Tradição de mais de 25 anos em telhas e madeiras. Frota própria, entrega rápida em toda SP e orçamento na hora pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const KPIS = [
  { icon: Award, title: "+25 Anos", text: "de tradição e confiança na região" },
  { icon: Truck, title: "Frota Própria", text: "entrega rápida em toda São Paulo" },
  { icon: TreePine, title: "Madeiras Selecionadas", text: "certificadas e conferidas peça a peça" },
  { icon: CreditCard, title: "Até 6x no Cartão", text: "parcelamento e condições para obras" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section id="inicio" className="relative flex min-h-[92vh] items-center pt-24">
          <img
            src={hero}
            alt="Pátio logístico da Rocha Telhas com caminhões carregando madeira e telhas"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--primary-deep)_18%,color-mix(in_oklab,var(--primary-deep)_78%,transparent)_55%,color-mix(in_oklab,var(--primary-deep)_45%,transparent)_100%)]" />

          <div className="relative mx-auto w-full max-w-7xl px-5 py-20">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/15 px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-accent uppercase">
                Franco da Rocha · SP
              </span>
              <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold text-primary-foreground md:text-6xl lg:text-7xl">
                A Maior Variedade em{" "}
                <span className="text-gradient-accent">Telhas e Madeiramento Nobre</span> da Região
              </h1>
              <p className="mt-6 max-w-2xl text-base text-primary-foreground/80 md:text-xl">
                Entrega rápida com frota própria e madeira aparelhada em plaina industrial de alta
                precisão.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild variant="outlineAccent" size="xl">
                  <Link to="/catalogo">
                    Ver Catálogo Completo
                    <ArrowRight />
                  </Link>
                </Button>
                <WhatsAppButton message="Olá! Quero falar com um vendedor da Rocha Telhas.">
                  Falar com um Vendedor
                </WhatsAppButton>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 bg-card">
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-[var(--shadow-lift)] md:-mt-14 md:grid-cols-2 lg:grid-cols-4">
              {KPIS.map((k) => (
                <div key={k.title} className="flex items-start gap-4 bg-card p-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
                    <k.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-base font-extrabold text-primary">{k.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{k.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-14" />
        </section>

        <Categorias />
        <Tecnologia />
        <Acao />
        <AvisoEntrega />
        <section id="calculadora" className="scroll-mt-24 bg-secondary py-24">
          <div className="mx-auto max-w-3xl px-5">
            <CalculadoraTelhas />
          </div>
        </section>
        <Depoimentos />
        <Faq />
        <Unidades />
        <CtaFinal />
      </main>

      <Footer />
      <FloatingWhats />
    </div>
  );
}
