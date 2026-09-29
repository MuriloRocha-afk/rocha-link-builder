import { createFileRoute, redirect } from "@tanstack/react-router";

/** Produto descontinuado — redirect permanente para a categoria. */
export const Route = createFileRoute("/catalogo/fixadores/buchas-arruelas")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/catalogo/fixadores", statusCode: 301 });
  },
});
