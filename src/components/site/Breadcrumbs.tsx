import { ChevronRight } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { CATEGORIES } from "@/components/site/catalog-data";

type Crumb = { label: string; href?: string };

const prettify = (slug: string) =>
  slug
    .split("-")
    .map((p) => (p.length > 2 ? p.charAt(0).toUpperCase() + p.slice(1) : p))
    .join(" ");

/**
 * Trilha de navegação automática a partir da URL atual:
 * Início > Catálogo > Categoria > Página atual
 */
export function useBreadcrumbTrail(atual?: string): Crumb[] {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const partes = pathname.split("/").filter(Boolean);

  const trilha: Crumb[] = [{ label: "Início", href: "/" }];
  if (partes[0] !== "catalogo") {
    if (partes.length) trilha.push({ label: atual ?? prettify(partes[partes.length - 1]) });
    return trilha;
  }

  trilha.push({ label: "Catálogo", href: partes.length > 1 ? "/catalogo" : undefined });

  const catSlug = partes[1];
  if (catSlug) {
    const categoria = CATEGORIES.find((c) => c.id === catSlug);
    const label = categoria?.title ?? prettify(catSlug);
    const ehUltimo = partes.length === 2;
    trilha.push({ label, href: ehUltimo ? undefined : `/catalogo/${catSlug}` });
  }

  if (partes.length > 2) {
    trilha.push({ label: atual ?? prettify(partes[partes.length - 1]) });
  }

  return trilha;
}

/** Barra clara de breadcrumbs usada no topo das páginas do catálogo. */
export function Breadcrumbs({ atual, className = "" }: { atual?: string; className?: string }) {
  const trilha = useBreadcrumbTrail(atual);

  return (
    <div className={`border-b bg-white px-4 py-3 ${className}`}>
      <nav
        aria-label="Breadcrumb"
        className="mx-auto flex max-w-6xl flex-wrap items-center gap-1 text-xs text-gray-500"
      >
        {trilha.map((c, i) => (
          <span key={`${c.label}-${i}`} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3 shrink-0 opacity-70" aria-hidden />}
            {c.href ? (
              <Link to={c.href} className="transition-colors hover:text-orange-500">
                {c.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-900">{c.label}</span>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}

export default Breadcrumbs;
