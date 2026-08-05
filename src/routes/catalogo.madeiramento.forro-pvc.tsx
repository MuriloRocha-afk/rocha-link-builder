import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ForroPVC from "@/pages/catalogo/madeiramento/ForroPVC";

const TITLE = "Forro de PVC — Réguas e Acabamentos | Rocha Telhas";
const DESCRIPTION =
  "Forro de PVC em réguas: largura, comprimento e acabamentos. Calcule a área, monte seu orçamento e cote direto no WhatsApp com a Rocha Telhas.";

export const Route = createFileRoute("/catalogo/madeiramento/forro-pvc")({
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
  component: ForroPvcRoute,
});

function ForroPvcRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ForroPVC />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
