import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
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
        <div className="border-b bg-white px-4 py-3">
          <nav
            aria-label="Breadcrumb"
            className="mx-auto flex max-w-6xl flex-wrap items-center gap-1 text-xs text-gray-500"
          >
            <Link to="/catalogo" className="hover:text-orange-500">
              Catálogo
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              to="/catalogo/$categoriaSlug"
              params={{ categoriaSlug: "telhas" }}
              className="hover:text-orange-500"
            >
              Telhas
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-gray-900">Colonial PVC</span>
          </nav>
        </div>

        <ColonialPvcConfigurator />
      </main>

      <Footer />
      <FloatingWhats />
    </div>
  );
}

