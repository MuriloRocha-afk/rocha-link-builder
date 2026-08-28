import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { GuiaCard } from "@/components/site/GuiaCard";
import { GUIAS } from "@/data/guias";

export const Route = createFileRoute("/guias/")({
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
        </div>
      </main>
      <Footer />
      <FloatingWhats />
    </div>
  );
}
