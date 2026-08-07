import { createFileRoute } from "@tanstack/react-router";
import { EmBreveProduto } from "@/components/site/EmBreveProduto";

export const Route = createFileRoute("/catalogo/tintas/$produtoSlug")({
  head: () => ({
    meta: [
      { title: "Tintas e Vernizes — em breve | Rocha Telhas" },
      { name: "description", content: "Configurador em preparação. Cote tintas, vernizes e impermeabilizantes direto no WhatsApp com a Rocha Telhas." },
      { property: "og:title", content: "Tintas e Vernizes — em breve | Rocha Telhas" },
      { property: "og:description", content: "Configurador em preparação. Cote tintas e vernizes direto no WhatsApp." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => {
    const { produtoSlug } = Route.useParams();
    return (
      <EmBreveProduto categoriaSlug="tintas" categoriaNome="Tintas & Proteção" produtoSlug={produtoSlug} />
    );
  },
});
