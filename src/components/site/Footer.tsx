import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CONTATO, Logo, WhatsAppButton, waLink } from "./shared";

export function Footer() {
  return (
    <footer className="surface-dark pt-20 pb-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <div className="inline-block rounded-2xl bg-primary-foreground/95 p-4">
              <Logo size="md" />
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Distribuidora e madeireira símbolo de  tradição na Região. Atendemos Franco da
              Rocha, Caieiras, Francisco Morato, Mairiporã, Perus e toda a região da Grande São
              Paulo com frota própria.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-primary-foreground/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {CONTATO.address}
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {CONTATO.hours}
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {CONTATO.phone}
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a
                href={waLink("Olá! Vim pelo site da Rocha Telhas.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary-foreground/20 text-primary-foreground transition-colors hover:bg-whats hover:text-primary-deep"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav>
            <h3 className="text-sm font-bold tracking-[0.18em] text-accent uppercase">
              Links rápidos
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/70">
              {[
                ["Início", "#inicio"],
                ["Catálogo completo", "/catalogo"],
                ["Produtos", "#produtos"],
                ["Nossa Estrutura", "#tecnologia"],
                ["A Rocha em Ação", "#acao"],
                ["Depoimentos", "#depoimentos"],
                ["Localização", "#unidades"],
                ["Contato", "#contato"],
              ].map(([label, href]) => (
                <li key={href}>
                  {href.startsWith("#") ? (
                    <Link to="/" hash={href.slice(1)} className="transition-colors hover:text-accent">
                      {label}
                    </Link>
                  ) : (
                    <Link to={href} className="transition-colors hover:text-accent">
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-7">
            <h3 className="text-xl font-extrabold text-primary-foreground">
              Peça sua cotação agora
            </h3>
            <p className="mt-3 text-sm text-primary-foreground/70">
              Envie sua lista de materiais e receba o orçamento completo em minutos.
            </p>
            <div className="mt-6">
              <WhatsAppButton
                className="w-full"
                message="Olá! Quero um orçamento completo com a Rocha Telhas."
              >
                Cotar pelo WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} Rocha Telhas. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhats() {
  return (
    <a
      href={waLink("Olá! Vim pelo site e gostaria de falar com o comercial.")}
      target="_blank"
      rel="noopener noreferrer"
      className="pulse-whats fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-whats px-5 py-4 text-sm font-bold text-primary-deep shadow-[var(--shadow-lift)] transition-transform hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
      Fale Conosco
    </a>
  );
}
