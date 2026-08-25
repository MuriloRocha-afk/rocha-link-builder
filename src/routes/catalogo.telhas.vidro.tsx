import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_VIDRO } from "@/data/configs/telhas";

const TITLE = "Telha de Vidro — Portuguesa, Romana e Mediterrânea | Rocha Telhas";
const DESCRIPTION =
  "Telha de vidro nos formatos Portuguesa, Romana e Mediterrânea, com encaixe compatível com a telha cerâmica. Escolha o formato e cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/telhas/vidro")({
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
  component: TelhaVidroRoute,
});

function TelhaVidroRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_VIDRO} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
