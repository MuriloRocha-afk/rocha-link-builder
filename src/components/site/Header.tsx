import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo, WhatsAppButton } from "./shared";
import { SobreModal } from "./SobreModal";

type NavItem = { label: string; hash?: string; to?: string };

const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Estrutura & Pátio", hash: "tecnologia" },
  { label: "Catálogo", to: "/catalogo" },
  { label: "Depoimentos", hash: "depoimentos" },
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
  const [sobre, setSobre] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "bg-card/95 shadow-[var(--shadow-card)] backdrop-blur"
          : "bg-card/80 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5">
        <Link to="/" aria-label="Rocha Telhas — início">
          <Logo size="lg" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              className="text-sm font-semibold text-primary/80 transition-colors hover:text-accent"
            />
          ))}
          <button
            type="button"
            onClick={() => setSobre(true)}
            className="text-sm font-semibold text-primary/80 transition-colors hover:text-accent"
          >
            Sobre Nós
          </button>
        </nav>

        <div className="hidden lg:block">
          <WhatsAppButton
            size="lg"
            message="Olá! Gostaria de solicitar um orçamento na Rocha Telhas."
          >
            Solicitar Orçamento
          </WhatsAppButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-primary lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

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
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setSobre(true);
              }}
              className="text-left text-base font-semibold text-primary"
            >
              Sobre Nós
            </button>
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

      <SobreModal open={sobre} onOpenChange={setSobre} />
    </header>
  );
}
