import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { ColonialPvcConfigurator } from "@/components/site/ColonialPvcConfigurator";

const TITLE = "Telha Colonial PVC | Rocha Telhas";
const DESCRIPTION =
  "Configure sua Telha Colonial PVC Lux Telhas: 5 ondas, cores terracota, marfim e cinza, comprimentos de 230 a 525 cm, cobertura em m² em tempo real e cotação no WhatsApp.";

export const Route = createFileRoute("/catalogo/telhas/colonial-pvc")({
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
  component: ColonialPvcPage,
});

function ColonialPvcPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24">
        <ColonialPvcConfigurator />
      </main>

      <Footer />
      <FloatingWhats />
    </div>
  );
}

