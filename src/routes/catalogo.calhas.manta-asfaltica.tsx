import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/catalogo/calhas/manta-asfaltica")({
  beforeLoad: () => {
    throw redirect({ to: "/catalogo/calhas", statusCode: 301 });
  },
});
