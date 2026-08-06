import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import Cedrinho from "@/pages/catalogo/madeiramento/Cedrinho";

const TITLE = "Cedrinho — Sarrafos e Tábuas | Rocha Telhas";
const DESCRIPTION =
  "Cedrinho em sarrafos e tábuas, bruto ou aparelhado. Escolha bitola, comprimento e quantidade e cote direto no WhatsApp com a Rocha Telhas.";

export const Route = createFileRoute("/catalogo/madeiramento/cedrinho")({
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
  component: CedrinhoRoute,
});

function CedrinhoRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <Cedrinho />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
