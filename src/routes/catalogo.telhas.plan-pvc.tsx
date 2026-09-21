import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { ColonialPvcConfigurator } from "@/components/site/ColonialPvcConfigurator";

const TITLE = "Telha Plan PVC | Rocha Telhas";
const DESCRIPTION =
  "Configure sua Telha Plan PVC Lux Telhas: perfil plano de 6 ondas, cores terracota, marfim e cinza, comprimentos de 198 a 330 cm e cotação no WhatsApp.";

export const Route = createFileRoute("/catalogo/telhas/plan-pvc")({
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
  component: PlanPvcPage,
});

function PlanPvcPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24">
        <ColonialPvcConfigurator varianteInicial="Plan" />
      </main>

      <Footer />
      <FloatingWhats />
    </div>
  );
}
