import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_ESPIGOES } from "@/data/configs/fixadores";

const TITLE = "Espigões para Telha Fibrocimento 120 e 180cm | Rocha Telhas";
const DESCRIPTION = "Espigões inicial e sequencial de 120cm e 180cm para vedação lateral de telhas de fibrocimento. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/fixadores/espigoes")({
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
  component: FixadoresEspigoesRoute,
});

function FixadoresEspigoesRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_ESPIGOES} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
