import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_THINNER } from "@/data/configs/tintas";

const TITLE = "Thinner, Aguarrás e Diluentes Anjo | Rocha Telhas";
const DESCRIPTION = "Thinner Anjo, aguarrás mineral e diluentes para limpeza e diluição de tintas e vernizes. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/tintas/thinner")({
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
  component: TintasThinnerRoute,
});

function TintasThinnerRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_THINNER} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
