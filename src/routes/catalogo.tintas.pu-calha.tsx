import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_PU_CALHA } from "@/data/configs/tintas";

const TITLE = "PU para Calha — Selante Poliuretano | Rocha Telhas";
const DESCRIPTION = "Selante PU para vedação de calhas, rufos e água furtada, em várias cores. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/tintas/pu-calha")({
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
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_PU_CALHA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
