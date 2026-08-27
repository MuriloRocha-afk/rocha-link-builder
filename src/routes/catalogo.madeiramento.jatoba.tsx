import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import MadeiraNativaConfigurator from "@/components/site/MadeiraNativaConfigurator";
import jatobaImg from "@/assets/prod-garapeira.jpg";

const TITLE = "Jatobá — Vigas, Caibros e Tábuas de Madeira de Lei | Rocha Telhas";
const DESCRIPTION =
  "Jatobá em viga, caibro, caibrão, ripa, ripão, sarrafo e tábua. Escolha bitola, comprimento e aparelhagem e cote no WhatsApp. Verificar disponibilidade.";

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
        <MadeiraNativaConfigurator
          nome="Jatobá"
          slug="jatoba"
          produtoKey="jatoba"
          subtitulo="Madeira de lei de altíssima densidade para projetos de longa duração. Bruta ou aparelhada em plaina. Sob consulta."
          tags={["DOF/IBAMA Legalizado", "Madeira de Lei", "Sob consulta"]}
          imagem={jatobaImg}
        />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
