import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_AGUA_FURTADA } from "@/data/configs/calhas";

const TITLE = "Água Furtada Galvanizada 2m a 6m | Rocha Telhas";
const DESCRIPTION =
  "Água furtada (calha de rincão) galvanizada nos cortes 33 e 50, de 2,0m a 6,0m. Escolha o corte, o comprimento e cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/calhas/agua-furtada")({
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
  component: AguaFurtadaRoute,
});

function AguaFurtadaRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_AGUA_FURTADA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
