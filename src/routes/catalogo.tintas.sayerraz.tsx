import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_SAYERRAZ } from "@/data/configs/tintas";

const TITLE = "Aguarrás Sayerlack Sayerraz 900ml e 5L | Rocha Telhas";
const DESCRIPTION =
  "Aguarrás Sayerlack Sayerraz em 900ml e 5L para diluir tintas e vernizes à base de óleo e limpar pincéis, rolos e ferramentas. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/tintas/sayerraz")({
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
        <ConfiguradorGenerico config={CONFIG_SAYERRAZ} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
