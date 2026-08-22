import { createFileRoute, redirect } from "@tanstack/react-router";

/** URL antiga — mantida com redirect permanente para o slug padronizado. */
export const Route = createFileRoute("/catalogo/madeiramento/mourao")({
  beforeLoad: () => {
    throw redirect({ to: "/catalogo/madeiramento/mourao-tratado", statusCode: 301 });
  },
});
