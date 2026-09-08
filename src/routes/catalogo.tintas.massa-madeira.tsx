import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_MASSA_MADEIRA } from "@/data/configs/tintas";

const TITLE = "Massa para Madeira Sayerlack Sayermassa — 4 cores | Rocha Telhas";
const DESCRIPTION =
  "Massa para madeira Sayerlack Sayermassa nas cores Eucalipto, Imbuia Tabaco, Mogno e Pinus. Repara rachaduras, furos e imperfeições. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/tintas/massa-madeira")({
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
        <ConfiguradorGenerico config={CONFIG_MASSA_MADEIRA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
