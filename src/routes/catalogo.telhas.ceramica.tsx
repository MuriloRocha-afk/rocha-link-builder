import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { CeramicaConfigurator } from "@/components/site/catalogo.telhas.policarbonato";

const TITLE = "Telha Cerâmica — Portuguesa e Romana | Rocha Telhas";
const DESCRIPTION =
  "Telha cerâmica Portuguesa, Romana, Francesa e Mediterrânea — natural ou resinada. Escolha o modelo, informe a quantidade e cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/telhas/ceramica")({
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
  component: CeramicaRoute,
});

function CeramicaRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <CeramicaConfigurator />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
