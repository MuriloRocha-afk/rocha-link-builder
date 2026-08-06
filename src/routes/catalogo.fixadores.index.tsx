import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import Fixadores from "@/pages/catalogo/Fixadores";

const TITLE = "Parafusos, Kits de Fixação e Pregos | Rocha Telhas";
const DESCRIPTION =
  "Parafusos com vedação para fibrocimento, kits de fixação para telha PVC, pregos e acessórios. Cote direto no WhatsApp com a Rocha Telhas.";

export const Route = createFileRoute("/catalogo/fixadores/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FixadoresRoute,
});

function FixadoresRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <Fixadores />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
