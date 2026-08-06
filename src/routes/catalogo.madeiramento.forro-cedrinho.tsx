import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ForroCedrinho from "@/pages/catalogo/madeiramento/ForroCedrinho";

const TITLE = "Forro de Cedrinho Mesclado | Rocha Telhas";
const DESCRIPTION =
  "Forro de cedrinho mesclado vendido por m², com meia cana e acabamentos. Calcule a área e cote direto no WhatsApp com a Rocha Telhas.";

export const Route = createFileRoute("/catalogo/madeiramento/forro-cedrinho")({
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
  component: ForroCedrinhoRoute,
});

function ForroCedrinhoRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ForroCedrinho />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
