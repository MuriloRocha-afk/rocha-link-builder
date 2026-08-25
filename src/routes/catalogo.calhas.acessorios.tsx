import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_ACESSORIOS_CALHA } from "@/data/configs/calhas";

const TITLE = "Acessórios de Calha Galvanizada | Rocha Telhas";
const DESCRIPTION = "Suportes, cabeceiras, saídas, água furtada e pingadeira para calha galvanizada. Escolha o acessório e cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/calhas/acessorios")({
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
  component: CalhasAcessoriosRoute,
});

function CalhasAcessoriosRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_ACESSORIOS_CALHA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
