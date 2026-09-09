import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_LONA } from "@/data/configs/tintas";

const TITLE = "Lona Plástica Preta | Rocha Telhas";
const DESCRIPTION = "Lona plástica preta vendida por metro linear, rolo de 4 m de largura, nas espessuras de 09 a 40 kg. Proteção de obra e transporte. Cote no WhatsApp.";

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
