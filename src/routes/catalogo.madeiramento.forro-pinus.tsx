import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ForroPinus from "@/pages/catalogo/madeiramento/ForroPinus";

const TITLE = "Forro de Pinus — Réguas Macho-Fêmea | Rocha Telhas";
const DESCRIPTION =
  "Forro de pinus macho-fêmea vendido por m², com meia cana, sarrafos e verniz. Calcule a área e cote direto no WhatsApp com a Rocha Telhas.";

export const Route = createFileRoute("/catalogo/madeiramento/forro-pinus")({
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
  component: ForroPinusRoute,
});

function ForroPinusRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ForroPinus />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
