import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_CUMEEIRAS } from "@/data/configs/telhas";

const TITLE = "Cumeeiras & Acessórios de Cobertura | Rocha Telhas";
const DESCRIPTION = "Cumeeiras de barro, concreto, esmaltada, PVC e fibrocimento. Escolha o tipo, a variação e cote direto no WhatsApp.";

export const Route = createFileRoute("/catalogo/telhas/cumeeiras")({
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
  component: TelhasCumeeirasRoute,
});

function TelhasCumeeirasRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_CUMEEIRAS} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
