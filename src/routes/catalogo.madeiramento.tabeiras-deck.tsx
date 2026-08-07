import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_TABEIRAS_DECK } from "@/data/configs/madeiramento";

const TITLE = "Tabeiras Desenhadas & Deck de Madeira | Rocha Telhas";
const DESCRIPTION = "Tabeiras desenhadas de 15cm a 30cm e deck de cumaru, garapeia e pinus tratado por m². Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/madeiramento/tabeiras-deck")({
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
  component: MadeiramentoTabeirasDeckRoute,
});

function MadeiramentoTabeirasDeckRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_TABEIRAS_DECK} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
