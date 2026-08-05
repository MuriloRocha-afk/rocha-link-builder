import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import Cambara from "@/pages/catalogo/madeiramento/Cambara";

const TITLE = "Cambará Rosa — Configure sua peça | Rocha Telhas";
const DESCRIPTION =
  "Configure vigas, caibros, ripas, ripões e dormentes de Cambará Rosa: bitola, comprimento e acabamento bruto ou aparelhado em plaina. Cotação direta no WhatsApp.";

export const Route = createFileRoute("/catalogo/madeiramento/cambara")({
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
  component: CambaraRoute,
});

function CambaraRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <Cambara />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
