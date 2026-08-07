import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_PREGOS } from "@/data/configs/fixadores";

const TITLE = "Pregos Telheiro e Polidos por Kg ou 100un | Rocha Telhas";
const DESCRIPTION = "Pregos telheiro, polidos com e sem cabeça em diversas bitolas, vendidos por Kg ou embalagem. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/fixadores/pregos")({
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
  component: FixadoresPregosRoute,
});

function FixadoresPregosRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_PREGOS} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
