import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_CALHA_AQUAPLUV } from "@/data/configs/calhas";

const TITLE = "Calha Aquapluv e Aquapluv Style em PVC | Rocha Telhas";
const DESCRIPTION = "Calhas Aquapluv em PVC, linha clássica e Style retangular. Não enferruja e é fácil de instalar. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/calhas/calha-aquapluv")({
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
  component: CalhasCalhaAquapluvRoute,
});

function CalhasCalhaAquapluvRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_CALHA_AQUAPLUV} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
