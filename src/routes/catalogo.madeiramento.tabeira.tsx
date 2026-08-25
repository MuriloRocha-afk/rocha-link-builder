import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_TABEIRA } from "@/data/configs/madeiramento";

const TITLE = "Tabeira Lisa e Desenhada 15cm a 30cm | Rocha Telhas";
const DESCRIPTION =
  "Tabeiras lisas (boleadas) e desenhadas de 15cm a 30cm em 6 modelos. Escolha acabamento, tamanho e modelo e cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/madeiramento/tabeira")({
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
  component: MadeiramentoTabeiraRoute,
});

function MadeiramentoTabeiraRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_TABEIRA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
