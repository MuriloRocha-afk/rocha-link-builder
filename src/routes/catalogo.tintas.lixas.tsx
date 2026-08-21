import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_LIXAS } from "@/data/configs/tintas";

const TITLE = "Lixas para Madeira e Massa | Rocha Telhas";
const DESCRIPTION = "Lixas para madeira, lixa d\u2019água e lixa de massa em vários grãos. Cote no WhatsApp com a Rocha Telhas.";

export const Route = createFileRoute("/catalogo/tintas/lixas")({
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
        <ConfiguradorGenerico config={CONFIG_LIXAS} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
