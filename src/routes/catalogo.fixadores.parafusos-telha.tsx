import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_PARAFUSOS_TELHA } from "@/data/configs/fixadores";

const TITLE = "Parafusos e Kits de Vedação para Telha | Rocha Telhas";
const DESCRIPTION = "Parafusos com vedação 110, 150 e 200mm para fibrocimento e kits coloridos para Colonial PVC. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/fixadores/parafusos-telha")({
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
  component: FixadoresParafusosTelhaRoute,
});

function FixadoresParafusosTelhaRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_PARAFUSOS_TELHA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
