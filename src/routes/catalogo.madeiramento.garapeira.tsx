import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import MadeiraNativaConfigurator from "@/components/site/MadeiraNativaConfigurator";
import capaGarapeira from "@/assets/produtos/madeiras-nativas/01-garapeira-capa.jpg.asset.json";
import fotoAdicionalGarapeira from "@/assets/produtos/madeiras-nativas/02-garapeira-adicional.jpg.asset.json";


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
        <MadeiraNativaConfigurator
          nome="Garapeira"
          slug="garapeira"
          produtoKey="garapeira"
          subtitulo="Madeira dura nativa para estruturas de alta resistência. Bruta ou aparelhada em plaina no nosso pátio."
          tags={["DOF/IBAMA Legalizado", "Madeira de Lei", "Frota Própria"]}
          imagem={capaGarapeira.url}
          imagensAdicionais={[
            { src: fotoAdicionalGarapeira.url, alt: "Garapeira — detalhe das peças no pátio" },
          ]}
        />

      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
