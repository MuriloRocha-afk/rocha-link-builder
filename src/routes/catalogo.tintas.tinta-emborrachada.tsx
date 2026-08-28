import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_EMBORRACHADA } from "@/data/configs/tintas";

const TITLE = "Tinta Emborrachada para Telhado e Fachada | Rocha Telhas";
const DESCRIPTION =
  "Tinta acrílica emborrachada impermeabilizante para telhado, laje e fachada. Escolha cor e volume e cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/tintas/tinta-emborrachada")({
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
  component: TintaEmborrachadaRoute,
});

function TintaEmborrachadaRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_EMBORRACHADA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
