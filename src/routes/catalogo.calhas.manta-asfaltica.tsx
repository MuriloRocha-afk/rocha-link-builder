import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/catalogo/calhas/manta-asfaltica")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/catalogo/calhas", statusCode: 301 });
  },
});
