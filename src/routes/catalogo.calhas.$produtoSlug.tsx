import { createFileRoute } from "@tanstack/react-router";
import { EmBreveProduto } from "@/components/site/EmBreveProduto";

export const Route = createFileRoute("/catalogo/calhas/$produtoSlug")({
  head: () => ({
    meta: [
      { title: "Calhas e Rufos — em breve | Rocha Telhas" },
      { name: "description", content: "Configurador em preparação. Cote calhas Alge, Aquapluv, rufos e mantas direto no WhatsApp com a Rocha Telhas." },
      { property: "og:title", content: "Calhas e Rufos — em breve | Rocha Telhas" },
      { property: "og:description", content: "Configurador em preparação. Cote calhas, rufos e mantas direto no WhatsApp." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => {
    const { produtoSlug } = Route.useParams();
    return (
      <EmBreveProduto categoriaSlug="calhas" categoriaNome="Calhas & Funilaria" produtoSlug={produtoSlug} />
    );
  },
});
