import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import Pinus from "@/pages/catalogo/madeiramento/Pinus";

const TITLE = "Pinus — Sarrafos, Tábuas e Pontaletes | Rocha Telhas";
const DESCRIPTION =
  "Pinus em sarrafos, tábuas e pontaletes para formas e estruturas provisórias. Monte seu orçamento e cote no WhatsApp com a Rocha Telhas.";

export const Route = createFileRoute("/catalogo/madeiramento/pinus")({
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
  component: PinusRoute,
});

function PinusRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <Pinus />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
