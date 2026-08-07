import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_PARAFUSOS_MADEIRA } from "@/data/configs/fixadores";

const TITLE = "Parafusos para Madeira — Chipboard e Frances | Rocha Telhas";
const DESCRIPTION = "Parafusos chipboard, autobrocante, frances completo e sextavado soberba em várias bitolas. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/fixadores/parafusos-madeira")({
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
  component: FixadoresParafusosMadeiraRoute,
});

function FixadoresParafusosMadeiraRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_PARAFUSOS_MADEIRA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
