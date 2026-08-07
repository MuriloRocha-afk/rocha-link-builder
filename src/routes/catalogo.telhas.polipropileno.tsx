import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_POLIPROPILENO } from "@/data/configs/telhas";

const TITLE = "Telha Translúcida Polipropileno 153 a 366cm | Rocha Telhas";
const DESCRIPTION = "Telha translúcida de polipropileno Onda Alta, 100% compatível com fibrocimento. Calcule a cobertura e cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/telhas/polipropileno")({
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
  component: TelhasPolipropilenoRoute,
});

function TelhasPolipropilenoRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_POLIPROPILENO} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
