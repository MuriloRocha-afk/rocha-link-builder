import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import Calhas from "@/pages/catalogo/Calhas";

const TITLE = "Calhas, Rufos e Condutores | Rocha Telhas";
const DESCRIPTION =
  "Calha galvanizada, rufos, condutores e acessórios de captação de água. Monte seu orçamento e cote direto no WhatsApp.";

export const Route = createFileRoute("/catalogo/calhas/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CalhasRoute,
});

function CalhasRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <Calhas />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
