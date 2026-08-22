import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_MOURAO } from "@/data/configs/madeiramento";

const TITLE = "Mourão Tratado em Autoclave | Rocha Telhas";
const DESCRIPTION = "Mourão tratado em autoclave de 4cm a 20cm e até 10m. Ideal para cercas e estruturas rurais. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/madeiramento/mourao-tratado")({
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
  component: MadeiramentoMouraoTratadoRoute,
});

function MadeiramentoMouraoTratadoRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_MOURAO} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
