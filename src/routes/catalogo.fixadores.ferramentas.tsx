import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_FERRAMENTAS } from "@/data/configs/fixadores";

const TITLE = "Ferramentas Bestfer — Serras, Martelos e Trenas | Rocha Telhas";
const DESCRIPTION = "Ferramentas Bestfer: serras e discos, martelos, trenas, esquadros, furadeiras, brocas, níveis, chaves e alicates. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/fixadores/ferramentas")({
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
        <ConfiguradorGenerico config={CONFIG_FERRAMENTAS} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
