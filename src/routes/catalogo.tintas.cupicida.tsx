import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_CUPICIDA } from "@/data/configs/tintas";

const TITLE = "Exterminador de Cupim Sayerlack | Rocha Telhas";
const DESCRIPTION = "Cupicida preventivo e curativo Sayerlack nos tamanhos 900ml, 5L e 18L. Proteção para madeira. Cote direto no WhatsApp.";

export const Route = createFileRoute("/catalogo/tintas/cupicida")({
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
  component: TintasCupicidaRoute,
});

function TintasCupicidaRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_CUPICIDA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
