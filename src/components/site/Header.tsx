import { useEffect, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo, WhatsAppButton } from "./shared";
import { QuoteCartButton } from "./quote-cart";
import { BuscaGlobal } from "./BuscaGlobal";


type NavItem = { label: string; hash?: string; to?: string };

const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Catálogo", to: "/catalogo" },
  { label: "Nossa Estrutura", hash: "tecnologia" },
  { label: "Calculadora", to: "/calculadora" },
  { label: "Guias", to: "/ferramentas" },
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-card/95 shadow-[var(--shadow-card)] backdrop-blur transition-all"
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5">
        <Link to="/" aria-label="Rocha Telhas — início">
          <Logo size="lg" />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              className="text-sm font-semibold text-primary/80 transition-colors hover:text-accent"
            />
          ))}
        </nav>

        <BuscaGlobal className="mx-4 hidden w-64 lg:block xl:w-72" />

        <div className="hidden items-center gap-3 lg:flex">
          <QuoteCartButton />
          <WhatsAppButton
            size="lg"
            message="Olá! Gostaria de solicitar um orçamento na Rocha Telhas."
          >
            Falar no WhatsApp
          </WhatsAppButton>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => {
              setBuscaAberta((v) => !v);
              setOpen(false);
            }}
            aria-label="Buscar produtos"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-primary"
          >
            <Search className="h-5 w-5" />
          </button>
          <QuoteCartButton />
          <button
            type="button"
            onClick={() => {
              setOpen((v) => !v);
              setBuscaAberta(false);
            }}
            aria-label="Abrir menu"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-primary"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {buscaAberta ? (
        <div className="border-t border-border bg-card px-5 py-4 lg:hidden">
          <BuscaGlobal />
        </div>
      ) : null}

      {open ? (
        <div className="border-t border-border bg-card px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                onClick={() => setOpen(false)}
                className="text-base font-semibold text-primary"
              />
            ))}
          </nav>
          <div className="mt-5">
            <WhatsAppButton
              size="lg"
              className="w-full"
              message="Olá! Gostaria de solicitar um orçamento na Rocha Telhas."
            >
              Solicitar Orçamento
            </WhatsAppButton>
          </div>
        </div>
      ) : null}

    </header>
  );
}
