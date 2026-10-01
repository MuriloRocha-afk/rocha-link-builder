import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ferramentas")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: () => {
        // Redirect permanente (301): /ferramentas foi unificada em /guias
        return new Response(null, {
          status: 301,
          headers: { Location: "/guias" },
        });
      },
    },
  },
  // Navegação interna (SPA) também redireciona
  beforeLoad: () => {
    throw redirect({ to: "/guias", statusCode: 301 });
  },
});
