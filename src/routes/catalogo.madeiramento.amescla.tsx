import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_AMESCLA } from "@/data/configs/madeiramento";

const TITLE = "Amescla — Sarrafos e Tábuas em Bruto | Rocha Telhas";
const DESCRIPTION = "Amescla em sarrafos e tábuas brutas, opção econômica para estruturas secundárias. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/madeiramento/amescla")({
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
  component: MadeiramentoAmesclaRoute,
});

function MadeiramentoAmesclaRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_AMESCLA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
