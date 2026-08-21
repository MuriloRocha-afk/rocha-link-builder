import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_AGUARRAS } from "@/data/configs/tintas";

const TITLE = "Aguarrás Mineral e Vegetal | Rocha Telhas";
const DESCRIPTION = "Aguarrás mineral e vegetal para diluição de esmaltes e vernizes e limpeza de ferramentas. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/tintas/aguarras")({
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
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_AGUARRAS} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
