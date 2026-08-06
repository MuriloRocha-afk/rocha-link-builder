import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import Madeirit from "@/pages/catalogo/madeiramento/Madeirit";

const TITLE = "Madeirit, OSB e Compensados | Rocha Telhas";
const DESCRIPTION =
  "Madeirit plastificado preto e rosa, OSB e compensados em várias espessuras. Escolha a chapa ideal e cote direto no WhatsApp.";

export const Route = createFileRoute("/catalogo/madeiramento/madeirit")({
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
  component: MadeiritRoute,
});

function MadeiritRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <Madeirit />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
