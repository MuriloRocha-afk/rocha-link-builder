import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Truck, TreePine, CreditCard, ArrowRight, Handshake, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { Categorias } from "@/components/site/Categorias";
import { Acao, Depoimentos, Faq, Unidades } from "@/components/site/Sections";
import { Tecnologia, CtaFinal } from "@/components/site/Tecnologia";
import { AvisoEntrega } from "@/components/site/AvisoEntrega";
import { Ferramentas } from "@/components/site/Ferramentas";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { GuiasHome } from "@/components/site/GuiasHome";
import { WhatsAppButton } from "@/components/site/shared";
import { Reveal, CountUp } from "@/components/site/Reveal";
import heroAsset from "@/assets/IMG_1476.jpg.asset.json";

const hero = heroAsset.url;


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
  { icon: Award, title: "Referência", text: "de tradição e confiança na região" },
  { icon: Truck, title: "Frota Própria", text: "entrega rápida em toda São Paulo" },
  { icon: TreePine, title: "Madeiras Selecionadas", text: "certificadas e conferidas peça a peça" },
  { icon: CreditCard, title: "Até 12x no Cartão", text: "consulte nossas condições de parcelamento" },
];

const STATS = [
  { icon: Truck, value: 30000, label: "entregas realizadas" },
  { icon: Handshake, value: 50000, label: "clientes com problemas resolvidos" },
  { icon: Star, value: 100, label: "avaliações 5 estrelas no Google" },
];

function useParallax() {
  const ref = React.useRef<HTMLImageElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = Math.min(window.scrollY, 900) * 0.18;
        el.style.transform = `translate3d(0, ${y}px, 0) scale(1.12)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}

function Index() {
  const heroRef = useParallax();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section id="inicio" className="relative flex min-h-[92vh] items-center overflow-hidden pt-24">
          <img
            ref={heroRef}
            src={hero}
            alt="Pátio logístico da Rocha Telhas com caminhões carregando madeira e telhas"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover object-[center_20%] will-change-transform"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--primary-deep)_18%,color-mix(in_oklab,var(--primary-deep)_78%,transparent)_55%,color-mix(in_oklab,var(--primary-deep)_45%,transparent)_100%)]" />

          <div className="relative mx-auto w-full max-w-7xl px-5 py-20">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/15 px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-accent uppercase">
                Franco da Rocha · SP
              </span>
              <h1 className="mt-6 text-4xl leading-[1.05] font-black text-primary-foreground md:text-6xl lg:text-7xl">
                <span className="hero-line" style={{ animationDelay: "80ms" }}>
                  A Maior Variedade em
                </span>
                <span
                  className="hero-line text-gradient-accent-deep"
                  style={{ animationDelay: "260ms" }}
                >
                  Telhas e Madeiramento Nobre
                </span>
                <span className="hero-line" style={{ animationDelay: "440ms" }}>
                  da Região
                </span>
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

        <section className="soft-blob relative z-10 bg-card">
          <span className="blob-layer -top-10 -left-24 h-80 w-80" />
          <span className="blob-layer-primary -right-20 bottom-0 h-72 w-72" />
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid gap-4 md:-mt-14 md:grid-cols-2 lg:grid-cols-4">
              {KPIS.map((k, i) => (
                <Reveal
                  key={k.title}
                  delay={i * 90}
                  className="group glass-card flex items-start gap-4 rounded-2xl p-7 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-200 hover:-translate-y-2.5 hover:shadow-[0_36px_70px_-24px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent transition-transform duration-200 group-hover:scale-110">
                    <k.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-base font-extrabold text-primary">{k.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{k.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="h-14" />
        </section>

        <Categorias />

        <section className="stat-band relative overflow-hidden py-16">
          <div className="relative mx-auto max-w-7xl px-5">
            <div className="grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-accent-foreground/20">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 110} className="px-4 text-center">
                  <s.icon className="mx-auto h-7 w-7 text-accent-foreground/85" />
                  <p className="mt-3 text-4xl font-black text-accent-foreground md:text-6xl">
                    <CountUp value={s.value} prefix="+" />
                  </p>
                  <p className="mt-3 text-xs font-bold tracking-[0.18em] text-accent-foreground/80 uppercase md:text-sm">
                    {s.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Tecnologia />

        <Acao />
        <AvisoEntrega />
        <section id="calculadora" className="scroll-mt-24">
          <Ferramentas />
        </section>

        <Depoimentos />
        <Faq />
        <Unidades />
        <CtaFinal />
        <GuiasHome />
      </main>

      <Footer />
      <FloatingWhats />
    </div>
  );
}
