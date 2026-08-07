import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_GARAPEIRA } from "@/data/configs/madeiramento";

const TITLE = "Garapeira — Sarrafos, Tábuas e Vigas | Rocha Telhas";
const DESCRIPTION = "Garapeira, madeira dura nativa em sarrafos e tábuas, bruta ou aparelhada. Cote por metro linear no WhatsApp.";

export const Route = createFileRoute("/catalogo/madeiramento/garapeira")({
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
  component: MadeiramentoGarapeiraRoute,
});

function MadeiramentoGarapeiraRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_GARAPEIRA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
