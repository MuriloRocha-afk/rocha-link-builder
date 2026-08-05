import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import Policarbonato from "@/pages/catalogo/telhas/Policarbonato";

const TITLE = "Telha de Policarbonato Alveolar e Compacta | Rocha Telhas";
const DESCRIPTION =
  "Policarbonato alveolar e compacto para cobertura translúcida: espessuras, cores e comprimentos disponíveis. Monte seu orçamento e cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/telhas/policarbonato")({
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
  component: PolicarbonatoRoute,
});

function PolicarbonatoRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <Policarbonato />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
