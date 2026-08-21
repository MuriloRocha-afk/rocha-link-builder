import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_ESMALTADA } from "@/data/configs/telhas";

const TITLE = "Telha Esmaltada — 6 Cores Vitrificadas | Rocha Telhas";
const DESCRIPTION =
  "Telha cerâmica esmaltada em vermelho, branco, preto, azul, verde e marrom, com cumeeiras e acessórios na mesma cor. Cote direto no WhatsApp.";

export const Route = createFileRoute("/catalogo/telhas/esmaltada")({
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
  component: TelhasEsmaltadaRoute,
});

function TelhasEsmaltadaRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_ESMALTADA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
