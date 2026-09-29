import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/catalogo/$categoriaSlug")({
  staticData: { sitemap: false },
  component: CategoriaLayout,
});

function CategoriaLayout() {
  return <Outlet />;
}
