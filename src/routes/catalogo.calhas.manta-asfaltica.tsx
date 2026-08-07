import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_MANTA_ASFALTICA } from "@/data/configs/calhas";

const TITLE = "Manta Asfáltica Aluminizada Terracota | Rocha Telhas";
const DESCRIPTION = "Manta asfáltica aluminizada terracota em 10cm e 20cm × 10m para impermeabilizar calhas e rufos. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/calhas/manta-asfaltica")({
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
  component: CalhasMantaAsfalticaRoute,
});

function CalhasMantaAsfalticaRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_MANTA_ASFALTICA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
