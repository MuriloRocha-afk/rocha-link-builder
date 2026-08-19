import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { FibrocimentoConfigurator } from "@/components/site/FibrocimentoConfigurator";

const TITLE = "Telha Fibrocimento Ondulada INFIBRA | Rocha Telhas";
const DESCRIPTION =
  "Configure sua telha de fibrocimento ondulada INFIBRA: comprimentos de 1,53 m a 3,66 m, espessuras 5, 6 e 8 mm, com cobertura estimada em tempo real e cotação no WhatsApp.";

export const Route = createFileRoute("/catalogo/telhas/fibrocimento")({
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
  component: FibrocimentoRoute,
});

function FibrocimentoRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <FibrocimentoConfigurator />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
