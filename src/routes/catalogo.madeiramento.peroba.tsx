import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_PEROBA } from "@/data/configs/madeiramento";

const TITLE = "Peroba do Norte / D'Água — Vigas, Caibros e Ripas | Rocha Telhas";
const DESCRIPTION =
  "Peroba do Norte / d'Água em viga, caibro, caibrão, ripa, ripão, sarrafo e tábua. Escolha bitola, comprimento e aparelhagem e cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/madeiramento/peroba")({
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
  component: MadeiramentoPerobaRoute,
});

function MadeiramentoPerobaRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_PEROBA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
