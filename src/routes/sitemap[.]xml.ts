import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import {
  isSitemapRouteIncluded,
  sitemapPathForLocation,
  sitemapStaticPaths,
  sitemapXML,
  type SitemapEntry,
} from "@/lib/sitemap";
import { CATEGORIES } from "@/components/site/catalog-data";
import { GUIAS } from "@/data/guias";

const BASE_URL = "https://rochatelhas.com.br";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));

        const add = (routeId: string, to: string, params: Record<string, string>) => {
          if (!isSitemapRouteIncluded(router.routesById[routeId])) return;
          const location = router.buildLocation({ to, params, search: () => ({}), hash: "" } as never);
          const path = sitemapPathForLocation(router, location, routeId);
          if (path) entries.push({ path });
        };

        for (const c of CATEGORIES) {
          add("/catalogo/$categoriaSlug/", "/catalogo/$categoriaSlug", { categoriaSlug: c.id });
          for (const item of c.items) {
            add("/catalogo/$categoriaSlug/$produtoSlug", "/catalogo/$categoriaSlug/$produtoSlug", {
              categoriaSlug: c.id,
              produtoSlug: item.slug,
            });
          }
        }
        for (const g of GUIAS) add("/guias/$slug", "/guias/$slug", { slug: g.slug });

        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
