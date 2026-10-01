import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ferramentas")({
  staticData: { sitemap: false },
  // /ferramentas foi unificada em /guias — redirect permanente (301)
  beforeLoad: () => {
    throw redirect({ to: "/guias", statusCode: 301 });
  },
});
