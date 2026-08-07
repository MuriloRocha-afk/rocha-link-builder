import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_ARAMES } from "@/data/configs/fixadores";

const TITLE = "Arame Galvanizado BWG e Recozido | Rocha Telhas";
const DESCRIPTION = "Arame galvanizado BWG14, 16 e 18 e recozido liso ou torcido para amarrações e cercas. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/fixadores/arames")({
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
  component: FixadoresAramesRoute,
});

function FixadoresAramesRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_ARAMES} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
