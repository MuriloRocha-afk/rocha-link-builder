import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_CONCRETO } from "@/data/configs/telhas";

const TITLE = "Telha de Concreto Eurotop — Areia, Cinza e Grafite | Rocha Telhas";
const DESCRIPTION = "Telha de concreto Eurotop nas cores Areia, Cinza e Grafite. Monte seu pedido e cote direto no WhatsApp com a Rocha Telhas.";

export const Route = createFileRoute("/catalogo/telhas/concreto")({
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
  component: TelhasConcretoRoute,
});

function TelhasConcretoRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_CONCRETO} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
