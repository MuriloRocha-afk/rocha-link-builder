import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import MadeiraNativaConfigurator from "@/components/site/MadeiraNativaConfigurator";
import garapeiraImg from "@/assets/prod-garapeira.jpg";


const TITLE = "Garapeira — Sarrafos, Tábuas e Vigas | Rocha Telhas";
const DESCRIPTION = "Garapeira em viga, caibro, caibrão, ripa, ripão, sarrafo, tábua e dormente, bruta ou aparelhada. Verificar disponibilidade.";

export const Route = createFileRoute("/catalogo/madeiramento/garapeira")({
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
  component: MadeiramentoGarapeiraRoute,
});

function MadeiramentoGarapeiraRoute() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_GARAPEIRA} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
