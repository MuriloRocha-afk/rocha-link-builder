import { Calculator, Grid2X2, Home, ShoppingCart } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useQuoteCart } from "./quote-cart";

const linkBase =
  "relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 self-stretch px-1 text-[10px] font-bold transition-colors";

export function MobileBottomNav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { count, open, setOpen } = useQuoteCart();
  const catalogoAtivo = pathname.startsWith("/catalogo");
  const calculadoraAtiva = pathname.startsWith("/calculadora");

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-[60] grid h-[calc(4.5rem+env(safe-area-inset-bottom))] grid-cols-4 border-t border-border bg-card/98 px-1 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_-18px_color-mix(in_oklab,var(--primary)_45%,transparent)] backdrop-blur md:hidden"
    >
      <Link
        to="/"
        activeOptions={{ exact: true }}
        aria-label="Início"
        className={`${linkBase} ${pathname === "/" ? "text-primary after:absolute after:inset-x-5 after:top-0 after:h-0.5 after:bg-primary" : "text-muted-foreground"}`}
      >
        <Home className="h-5 w-5" />
        <span className="truncate">Início</span>
      </Link>

      <Link
        to="/catalogo"
        aria-label="Catálogo"
        className={`${linkBase} ${catalogoAtivo ? "text-primary after:absolute after:inset-x-5 after:top-0 after:h-0.5 after:bg-primary" : "text-muted-foreground"}`}
      >
        <Grid2X2 className="h-5 w-5" />
        <span className="truncate">Catálogo</span>
      </Link>

      <Link
        to="/calculadora"
        aria-label="Calculadora"
        className={`${linkBase} text-accent ${calculadoraAtiva ? "after:absolute after:inset-x-5 after:top-0 after:h-0.5 after:bg-accent" : ""}`}
      >
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/12">
          <Calculator className="h-5 w-5" />
        </span>
        <span className="truncate">Calculadora</span>
      </Link>

      <Button
        type="button"
        variant="ghost"
        onClick={() => setOpen(true)}
        aria-label={`Abrir orçamento com ${count} itens`}
        className={`${linkBase} h-auto rounded-none hover:bg-muted ${open ? "text-primary after:absolute after:inset-x-5 after:top-0 after:h-0.5 after:bg-primary" : "text-muted-foreground"}`}
      >
        <span className="relative">
          <ShoppingCart className="h-5 w-5" />
          {count > 0 ? (
            <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-extrabold text-accent-foreground">
              {count > 99 ? "99+" : count}
            </span>
          ) : null}
        </span>
        <span className="truncate">Orçamento</span>
      </Button>
    </nav>
  );
}