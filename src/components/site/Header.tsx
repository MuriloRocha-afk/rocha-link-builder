import { useEffect, useRef, useState } from "react";
import { Menu, X, Search, MoreHorizontal } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo, WhatsAppButton } from "./shared";
import { QuoteCartButton } from "./quote-cart";
import { BuscaGlobal } from "./BuscaGlobal";

type NavItem = { label: string; hash?: string; to?: string };

const NAV_PRIMARY: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Catálogo", to: "/catalogo" },
  { label: "Calculadora", to: "/calculadora" },
];

const NAV_MORE: NavItem[] = [
  { label: "Nossa Estrutura", hash: "tecnologia" },
  { label: "Guias", to: "/guias" },
  { label: "Ferramentas", to: "/ferramentas" },
  { label: "FAQ", hash: "faq" },
  { label: "Contato", hash: "contato" },
];

function NavLink({
  item,
  onClick,
  className,
}: {
  item: NavItem;
  onClick?: () => void;
  className: string;
}) {
  if (item.to) {
    return (
      <Link to={item.to} onClick={onClick} className={className}>
        {item.label}
      </Link>
    );
  }
  return (
    <Link to="/" hash={item.hash} onClick={onClick} className={className}>
      {item.label}
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);
  const [maisAberto, setMaisAberto] = useState(false);
  const maisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!maisRef.current?.contains(e.target as Node)) setMaisAberto(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-card/95 shadow-[var(--shadow-card)] backdrop-blur transition-all"
    >
      <div className="mx-auto grid h-24 w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 sm:gap-4 sm:px-5 lg:flex lg:justify-between">
        <Link to="/" aria-label="Rocha Telhas — início" className="flex min-w-0 items-center overflow-hidden lg:shrink-0">
          <Logo size="lg" />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex shrink-0">
          {NAV_PRIMARY.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              className="text-sm font-semibold text-primary/80 transition-colors hover:text-accent"
            />
          ))}
        </nav>

        <BuscaGlobal
          className="hidden w-full max-w-md lg:block xl:max-w-lg"
          placeholder="Buscar produto..."
        />

        <div className="hidden items-center gap-3 xl:flex shrink-0">
          <QuoteCartButton />
          <WhatsAppButton
            size="lg"
            hint={false}
            message="Olá! Vim pelo site da Rocha Telhas e gostaria de solicitar um orçamento."
          >
            Falar no WhatsApp
          </WhatsAppButton>

          <div ref={maisRef} className="relative">
            <button
              type="button"
              onClick={() => setMaisAberto((v) => !v)}
              aria-label="Mais opções"
              aria-expanded={maisAberto}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-primary transition-colors hover:bg-muted"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>

            {maisAberto ? (
              <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-border bg-card py-2 shadow-xl">
                {NAV_MORE.map((item) => (
                  <NavLink
                    key={item.label}
                    item={item}
                    onClick={() => setMaisAberto(false)}
                    className="block px-4 py-2.5 text-sm font-semibold text-primary/80 transition-colors hover:bg-accent/10 hover:text-accent"
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => {
              setBuscaAberta((v) => !v);
              setOpen(false);
            }}
            aria-label="Buscar produtos"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-primary transition-colors hover:bg-muted sm:h-11 sm:w-11"
          >
            <Search className="h-5 w-5" />
          </button>
          <QuoteCartButton className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
          <button
            type="button"
            onClick={() => {
              setOpen((v) => !v);
              setBuscaAberta(false);
            }}
            aria-label="Abrir menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-primary transition-colors hover:bg-muted sm:h-11 sm:w-11"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {buscaAberta ? (
        <div className="min-w-0 overflow-x-clip border-t border-border bg-card px-4 py-4 sm:px-5 lg:hidden">
          <BuscaGlobal className="min-w-0 max-w-full" placeholder="Buscar produto..." />
        </div>
      ) : null}

      {open ? (
        <div className="border-t border-border bg-card px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-2">
            {/* Em tablets (>=768px) a barra inferior não aparece; manter os links principais aqui */}
            <div className="mb-3 hidden flex-col gap-2 border-b border-border pb-3 md:flex">
              {NAV_PRIMARY.map((item) => (
                <NavLink
                  key={item.label}
                  item={item}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base font-semibold text-primary transition-colors hover:bg-muted"
                />
              ))}
            </div>
            <p className="px-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Mais
            </p>
            {NAV_MORE.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-semibold text-primary/80 transition-colors hover:bg-muted"
              />
            ))}
          </nav>
          <div className="mt-5">
            <WhatsAppButton
              size="lg"
              className="w-full"
              message="Olá! Vim pelo site da Rocha Telhas e gostaria de solicitar um orçamento."
            >
              Solicitar Orçamento
            </WhatsAppButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}
