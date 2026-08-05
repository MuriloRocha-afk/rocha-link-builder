import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/catalogo/$categoriaSlug")({
  component: CategoriaLayout,
});

function CategoriaLayout() {
  return <Outlet />;
}
