import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_RUFO } from "@/data/configs/calhas";

const TITLE = "Rufos Galvanizados de 2m a 6m | Rocha Telhas";
const DESCRIPTION = "Rufos galvanizados para arremate entre telhado e parede. Escolha o comprimento e cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/calhas/rufo")({
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
  component: CalhasRufoRoute,
});

function CalhasRufoRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_RUFO} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
