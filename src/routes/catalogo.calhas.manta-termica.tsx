import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_MANTA_TERMICA } from "@/data/configs/calhas";

const TITLE = "Manta Térmica Aluminizada 1F e 2F | Rocha Telhas";
const DESCRIPTION = "Manta térmica aluminizada de 1 e 2 faces em rolos de 10, 25 e 50 m². Reduz até 70% do calor. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/calhas/manta-termica")({
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
  component: CalhasMantaTermicaRoute,
});

function CalhasMantaTermicaRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_MANTA_TERMICA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
