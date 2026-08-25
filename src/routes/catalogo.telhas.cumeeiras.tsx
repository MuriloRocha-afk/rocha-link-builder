import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_CUMEEIRAS, selecaoInicialCumeeira } from "@/data/configs/cumeeiras";

const TITLE = "Cumeeira, Espigão e Paulistinha | Rocha Telhas";
const DESCRIPTION =
  "Cumeeira, espigão e paulistinha em PVC, fibrocimento, concreto, esmaltada e barro. Escolha a peça, o material e cote direto no WhatsApp.";

type CumeeiraSearch = { peca?: string; material?: string; formato?: string; cor?: string };

export const Route = createFileRoute("/catalogo/telhas/cumeeiras")({
  validateSearch: (search: Record<string, unknown>): CumeeiraSearch => ({
    peca: typeof search.peca === "string" ? search.peca : undefined,
    material: typeof search.material === "string" ? search.material : undefined,
    formato: typeof search.formato === "string" ? search.formato : undefined,
    cor: typeof search.cor === "string" ? search.cor : undefined,
  }),
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
  component: TelhasCumeeirasRoute,
});

function TelhasCumeeirasRoute() {
  const search = Route.useSearch();
  const inicial = selecaoInicialCumeeira(search as Record<string, unknown>);
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico
          key={JSON.stringify(inicial)}
          config={CONFIG_CUMEEIRAS}
          inicial={inicial}
        />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
