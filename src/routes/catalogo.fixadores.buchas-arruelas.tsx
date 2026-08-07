import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_BUCHAS_ARRUELAS } from "@/data/configs/fixadores";

const TITLE = "Buchas, Arruelas e Barras Roscadas | Rocha Telhas";
const DESCRIPTION = "Buchas plásticas, arruelas lisas zincadas e barras roscadas de 1/4 a 1/2 × 1,0m. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/fixadores/buchas-arruelas")({
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
  component: FixadoresBuchasArruelasRoute,
});

function FixadoresBuchasArruelasRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_BUCHAS_ARRUELAS} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
