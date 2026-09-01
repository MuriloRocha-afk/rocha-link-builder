import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_PET } from "@/data/configs/telhas";

const TITLE = "Telha PET Translúcida — Portuguesa, Romana e Mediterrânea | Rocha Telhas";
const DESCRIPTION =
  "Telha PET translúcida em plástico transparente 100% reciclado, com filtro UV e encaixe igual ao da telha cerâmica. Escolha o formato e cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/telhas/pet")({
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
  component: TelhaPetRoute,
});

function TelhaPetRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_PET} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
