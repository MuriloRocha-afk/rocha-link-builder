import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_SELADORA } from "@/data/configs/tintas";

const TITLE = "Seladora, Primer e Impermeabilizantes | Rocha Telhas";
const DESCRIPTION = "Seladoras Anjo, Vedacit Penetrol, Vedalit e Vedapren para preparar e impermeabilizar superfícies. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/tintas/seladora")({
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
  component: TintasSeladoraRoute,
});

function TintasSeladoraRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_SELADORA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
