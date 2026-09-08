import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_ACESSORIOS_PINTURA } from "@/data/configs/tintas";

const TITLE = "Rolos Roloflex, Pincéis Bestfer e Espátulas | Rocha Telhas";
const DESCRIPTION =
  "Acessórios para fixação e aplicação: rolos Roloflex, broxas, pincéis Bestfer, suporte para rolo e espátulas de aço. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/tintas/acessorios-pintura")({
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
        <ConfiguradorGenerico config={CONFIG_ACESSORIOS_PINTURA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
