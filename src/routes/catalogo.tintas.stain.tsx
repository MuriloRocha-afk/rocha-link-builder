import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_STAIN } from "@/data/configs/tintas";

const TITLE = "Stain Sayerlack Polisten para Madeira | Rocha Telhas";
const DESCRIPTION = "Sayerlack Polisten, Polisten ECO e Polisten Deck em até 11 cores. Protege a madeira contra UV e umidade. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/tintas/stain")({
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
  component: TintasStainRoute,
});

function TintasStainRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_STAIN} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
