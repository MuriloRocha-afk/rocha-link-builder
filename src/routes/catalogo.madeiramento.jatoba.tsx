import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_JATOBA } from "@/data/configs/madeiramento";

const TITLE = "Jatobá — Vigas, Caibros e Tábuas de Madeira de Lei | Rocha Telhas";
const DESCRIPTION =
  "Jatobá em viga, caibro, caibrão, ripa, ripão, sarrafo e tábua. Escolha bitola, comprimento e aparelhagem e cote no WhatsApp. Item com verificar disponibilidade.";

export const Route = createFileRoute("/catalogo/madeiramento/jatoba")({
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
  component: MadeiramentoJatobaRoute,
});

function MadeiramentoJatobaRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_JATOBA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
