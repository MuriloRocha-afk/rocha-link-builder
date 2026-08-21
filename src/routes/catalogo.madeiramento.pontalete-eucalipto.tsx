import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import PontaleteEucalipto from "@/pages/catalogo/madeiramento/PontaleteEucalipto";

const TITLE = "Pontalete de Eucalipto Tratado | Rocha Telhas";
const DESCRIPTION =
  "Pontalete roliço de eucalipto tratado em autoclave: escolha bitola (diâmetro) de 6cm a 18cm e comprimento de 2m a 6m. Cotação direta no WhatsApp.";

export const Route = createFileRoute("/catalogo/madeiramento/pontalete-eucalipto")({
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
  component: PontaleteEucaliptoRoute,
});

function PontaleteEucaliptoRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <PontaleteEucalipto />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
