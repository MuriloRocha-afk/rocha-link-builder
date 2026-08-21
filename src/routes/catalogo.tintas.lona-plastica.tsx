import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_LONA } from "@/data/configs/tintas";

const TITLE = "Lona Plástica Preta, Leitosa e Encerada | Rocha Telhas";
const DESCRIPTION = "Lona plástica preta, leitosa, azul e encerada em várias medidas e espessuras para proteção de obra. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/tintas/lona-plastica")({
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
        <ConfiguradorGenerico config={CONFIG_LONA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
