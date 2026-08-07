import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_TINTA_ACRILICA } from "@/data/configs/tintas";

const TITLE = "Tinta Acrílica Anjo Emborrachada e Premium | Rocha Telhas";
const DESCRIPTION = "Tinta acrílica Anjo Emborrachada e AnjoMais Premium para telhados e fachadas. Escolha base e volume e cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/tintas/tinta-acrilica")({
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
  component: TintasTintaAcrilicaRoute,
});

function TintasTintaAcrilicaRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_TINTA_ACRILICA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
