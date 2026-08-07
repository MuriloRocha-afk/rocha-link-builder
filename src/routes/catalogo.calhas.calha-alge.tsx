import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_CALHA_ALGE } from "@/data/configs/calhas";

const TITLE = "Calha Alge Moldura e Platibanda Galvanizada | Rocha Telhas";
const DESCRIPTION = "Calha Alge galvanizada nos cortes Moldura e Platibanda, de 2,0m a 6,0m. Monte seu pedido e cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/calhas/calha-alge")({
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
  component: CalhasCalhaAlgeRoute,
});

function CalhasCalhaAlgeRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_CALHA_ALGE} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
