import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import Eucalipto from "@/pages/catalogo/madeiramento/Eucalipto";

const TITLE = "Pontalete de Eucalipto — 3m a 6m | Rocha Telhas";
const DESCRIPTION =
  "Pontalete roliço de eucalipto in natura de 3m a 6m, reflorestamento certificado. Escolha o comprimento e a quantidade e cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/madeiramento/eucalipto")({
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
  component: EucaliptoRoute,
});

function EucaliptoRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <Eucalipto />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
