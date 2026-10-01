import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { GuiaCard } from "@/components/site/GuiaCard";
import { GUIAS } from "@/data/guias";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GuiaTelha } from "@/components/site/ferramentas/GuiaTelha";
import { TabelaComparativa } from "@/components/site/ferramentas/TabelaComparativa";
import { Glossario } from "@/components/site/ferramentas/Glossario";
import { SosTelhado } from "@/components/site/ferramentas/SosTelhado";
import { ConsultaEntrega } from "@/components/site/ferramentas/ConsultaEntrega";

export const Route = createFileRoute("/guias/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Guias de Telhado e Obra | Rocha Telhas" },
      {
        name: "description",
        content:
          "Guias práticos sobre telhas, madeiramento e cálculo de telhado escritos por quem vive de obra todo dia na Rocha Telhas.",
      },
      { property: "og:title", content: "Guias de Telhado e Obra — Rocha Telhas" },
      {
        property: "og:description",
        content:
          "Conteúdo prático para calcular telhas, escolher o modelo certo e planejar seu telhado sem desperdício.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuiasIndex,
});

function GuiasIndex() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-5">
          <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-bold tracking-[0.18em] text-accent uppercase">
            Guias
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold text-primary md:text-5xl">
            Guias práticos de telhado e obra
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Conteúdo direto ao ponto para você calcular material, escolher a telha certa e evitar
            desperdício na obra.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {GUIAS.map((g) => (
              <GuiaCard key={g.slug} guia={g} />
            ))}
          </div>

          <section className="mt-20" aria-labelledby="ferramentas-titulo">
            <h2 id="ferramentas-titulo" className="text-3xl font-extrabold text-primary md:text-4xl">
              Ferramentas para a sua obra
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Descubra a telha ideal, compare modelos e entenda os termos técnicos do telhado.
            </p>
            <Tabs defaultValue="quiz" className="mt-8">
              <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 sm:w-auto">
                <TabsTrigger value="quiz">Qual telha escolher</TabsTrigger>
                <TabsTrigger value="comparativo">Comparativo</TabsTrigger>
                <TabsTrigger value="glossario">Glossário</TabsTrigger>
                <TabsTrigger value="sos">SOS Telhado</TabsTrigger>
                <TabsTrigger value="entrega">Entrega</TabsTrigger>
              </TabsList>
              <TabsContent value="quiz" className="mt-6"><GuiaTelha /></TabsContent>
              <TabsContent value="comparativo" className="mt-6"><TabelaComparativa /></TabsContent>
              <TabsContent value="glossario" className="mt-6"><Glossario /></TabsContent>
              <TabsContent value="sos" className="mt-6"><SosTelhado /></TabsContent>
              <TabsContent value="entrega" className="mt-6"><ConsultaEntrega /></TabsContent>
            </Tabs>
          </section>

          <section className="mt-20 border-t border-border pt-8" aria-labelledby="fontes-titulo">
            <h2 id="fontes-titulo" className="text-sm font-bold tracking-[0.14em] text-muted-foreground uppercase">
              Fontes e referências
            </h2>
            <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
              As informações técnicas deste guia têm caráter orientativo, baseadas em práticas usuais
              do setor de construção civil e normas da ABNT (Associação Brasileira de Normas Técnicas)
              aplicáveis a coberturas. Valores de inclinação, peso e durabilidade podem variar conforme
              o fabricante — consulte sempre a ficha técnica do produto ou fale com nossa equipe para
              orientação específica da sua obra.
            </p>
          </section>
        </div>
      </main>
      <Footer />
      <FloatingWhats />
    </div>
  );
}
