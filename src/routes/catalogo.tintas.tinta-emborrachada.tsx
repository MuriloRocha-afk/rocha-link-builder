import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_EMBORRACHADA } from "@/data/configs/tintas";

const TITLE = "Tinta Emborrachada Brazilian Color Cinza Espacial | Rocha Telhas";
const DESCRIPTION =
  "Tinta emborrachada Brazilian Color Super Proteção, Cinza Espacial, em 3,6L e 18L. Impermeável para laje, telhado e fachada. Cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/tintas/tinta-emborrachada")({
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
  component: TintaEmborrachadaRoute,
});

function TintaEmborrachadaRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_EMBORRACHADA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
