import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_MOLDURA } from "@/data/configs/calhas";

const TITLE = "Calha Moldura Galvanizada | Rocha Telhas";
const DESCRIPTION = "Configure sua calha moldura galvanizada: cortes 25, 33 e 50, comprimentos de 2m a 6m, saídas, suportes e selante. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/calhas/moldura")({
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
  component: Page,
});

function Page() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_MOLDURA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
