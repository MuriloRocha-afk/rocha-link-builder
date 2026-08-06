import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import Tintas from "@/pages/catalogo/Tintas";

const TITLE = "Tintas, Vernizes e Impermeabilizantes | Rocha Telhas";
const DESCRIPTION =
  "Tintas, stains, vernizes e impermeabilizantes para telhado e madeira. Monte seu orçamento e cote direto no WhatsApp com a Rocha Telhas.";

export const Route = createFileRoute("/catalogo/tintas/")({
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
  component: TintasRoute,
});

function TintasRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <Tintas />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
