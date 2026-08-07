import { createFileRoute } from "@tanstack/react-router";
import { EmBreveProduto } from "@/components/site/EmBreveProduto";

export const Route = createFileRoute("/catalogo/fixadores/$produtoSlug")({
  head: () => ({
    meta: [
      { title: "Fixadores — em breve | Rocha Telhas" },
      { name: "description", content: "Configurador em preparação. Cote parafusos, pregos, espigões e arames direto no WhatsApp com a Rocha Telhas." },
      { property: "og:title", content: "Fixadores — em breve | Rocha Telhas" },
      { property: "og:description", content: "Configurador em preparação. Cote parafusos, pregos e arames direto no WhatsApp." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => {
    const { produtoSlug } = Route.useParams();
    return (
      <EmBreveProduto categoriaSlug="fixadores" categoriaNome="Fixadores" produtoSlug={produtoSlug} />
    );
  },
});
