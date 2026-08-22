import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import ConfiguradorGenerico from "@/components/site/ConfiguradorGenerico";
import { CONFIG_CALHA_PVC } from "@/data/configs/calhas";

const TITLE = "Calha PVC Aquapluv e Style | Rocha Telhas";
const DESCRIPTION = "Configure sua calha PVC: linhas Aquapluv Beira e Style, cores bege e cinza, saídas central e lateral, suportes e selante.";

export const Route = createFileRoute("/catalogo/calhas/pvc")({
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
  component: Page,
});

function Page() {
  return (
    <>
      <Header />
      <div className="pt-24">
        <ConfiguradorGenerico config={CONFIG_CALHA_PVC} />
      </div>
      <Footer />
      <FloatingWhats />
    </>
  );
}
