import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_ACESSORIOS_PINTURA } from "@/data/configs/tintas";

const TITLE = "Rolos, Pincéis, Trinchas e Extensores | Rocha Telhas";
const DESCRIPTION = "Acessórios de aplicação: rolos, pincéis, trinchas, brochas, extensores e bandejas. Cote no WhatsApp.";

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
