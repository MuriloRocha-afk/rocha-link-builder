import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_VERNIZ } from "@/data/configs/tintas";

const TITLE = "Verniz para Madeira Anjo e Sayerlack | Rocha Telhas";
const DESCRIPTION = "Verniz Anjo Dura Mais, Marítimo Premium, Sayerlack Polisten e Sayermar. Escolha o volume e cote no WhatsApp.";

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
