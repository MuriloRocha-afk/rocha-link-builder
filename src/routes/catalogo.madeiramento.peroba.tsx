import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import MadeiraNativaConfigurator from "@/components/site/MadeiraNativaConfigurator";
import perobaImg from "@/assets/prod-garapeira.jpg";

const TITLE = "Peroba do Norte / D'Água — Vigas, Caibros e Ripas | Rocha Telhas";
const DESCRIPTION =
  "Peroba do Norte / d'Água em viga, caibro, caibrão, ripa, ripão, sarrafo e tábua. Escolha bitola, comprimento e aparelhagem e cote no WhatsApp.";

export const Route = createFileRoute("/catalogo/madeiramento/peroba")({
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
  component: MadeiramentoPerobaRoute,
});

function MadeiramentoPerobaRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <MadeiraNativaConfigurator
          nome="Peroba do Norte / D'Água"
          slug="peroba"
          produtoKey="peroba"
          subtitulo="Madeira nativa estável e de acabamento nobre para estruturas de telhado. Bruta ou aparelhada em plaina."
          tags={["DOF/IBAMA Legalizado", "Madeira de Lei", "Frota Própria"]}
          imagem={perobaImg}
        />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
