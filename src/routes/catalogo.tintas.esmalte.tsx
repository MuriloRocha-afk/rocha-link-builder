import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_ESMALTE } from "@/data/configs/tintas";

const TITLE = "Esmalte Sintético Anjo Tomplus e Fluence | Rocha Telhas";
const DESCRIPTION = "Esmalte sintético Anjo Tomplus e E.S Fluence em várias cores, 900ml e 3,6L. Cote direto no WhatsApp.";

export const Route = createFileRoute("/catalogo/tintas/esmalte")({
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
  component: TintasEsmalteRoute,
});

function TintasEsmalteRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_ESMALTE} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
