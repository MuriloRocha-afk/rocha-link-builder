import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_VERNIZ } from "@/data/configs/tintas";

const TITLE = "Verniz Sayerlack Polirex para Madeira | Rocha Telhas";
const DESCRIPTION = "Verniz restaurador Sayerlack Polirex nas cores Imbuia e Mogno. Tamanhos 230ml, 900ml e 3,6L. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/tintas/verniz")({
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
  component: TintasVernizRoute,
});

function TintasVernizRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_VERNIZ} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
