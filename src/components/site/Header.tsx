import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo, WhatsAppButton } from "./shared";

const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Produtos", href: "#produtos" },
  { label: "A Rocha em Ação", href: "#acao" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Localização", href: "#unidades" },
];

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
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "bg-card/95 shadow-[var(--shadow-card)] backdrop-blur" : "bg-card/80 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <a href="#inicio" aria-label="Rocha Telhas — início">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-primary/80 transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
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
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-semibold text-primary"
              >
                {item.label}
              </a>
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
