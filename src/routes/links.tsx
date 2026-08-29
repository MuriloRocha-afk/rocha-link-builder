import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calculator,
  Facebook,
  Globe,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  ShoppingBag,
  Star,
  Store,
} from "lucide-react";

import { RochaLogoStacked } from "@/components/site/RochaLogoMark";
import { CONTATO } from "@/components/site/shared";

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: "Rocha Telhas & Madeiras — Links" },
      {
        name: "description",
        content:
          "Fale no WhatsApp, calcule seu telhado, veja o catálogo completo ou avalie a Rocha Telhas no Google.",
      },
      {
        property: "og:title",
        content: "Rocha Telhas & Madeiras — Links",
      },
      {
        property: "og:description",
        content:
          "Fale no WhatsApp, calcule seu telhado, veja o catálogo completo ou avalie a Rocha Telhas no Google.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LinksPage,
});

const WHATSAPP_BIO_NUMBER = "5511985714231";
const WHATSAPP_BIO_MESSAGE =
  "Olá, vim pelo Instagram da Rocha Telhas e gostaria de falar com o comercial.";

const GOOGLE_REVIEW_URL = "https://g.page/r/CZRu6Jx_e0XyEBE/review";
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=R.+Dr.+Hamilton+Prado,+856+-+Centro,+Franco+da+Rocha+-+SP,+07849-070";
const INSTAGRAM_URL = "https://instagram.com/rochatelhas";
const FACEBOOK_URL = "https://facebook.com/rochatelhas";

function LinksPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-white to-[#FFF8F3] px-4 py-8 font-sans text-foreground sm:px-6">
      <div className="mx-auto w-full max-w-md flex-1">
        {/* Cabeçalho */}
        <header className="flex flex-col items-center text-center">
          <RochaLogoStacked className="h-28 w-auto sm:h-32" />
          <h1 className="mt-4 text-xl font-extrabold tracking-tight text-primary sm:text-2xl">
            Rocha Telhas & Madeiras
          </h1>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A maior variedade em telhas e madeiramento nobre da região.
          </p>
        </header>

        {/* Lista de links */}
        <nav className="mt-8 flex w-full flex-col gap-3" aria-label="Links rápidos">
          <PrimaryButton
            href={`https://wa.me/${WHATSAPP_BIO_NUMBER}?text=${encodeURIComponent(WHATSAPP_BIO_MESSAGE)}`}
            icon={<MessageCircle size={22} />}
            label="Falar no WhatsApp"
          />

          <ExternalButton
            href="tel:+551144446403"
            icon={<Phone size={22} />}
            label="Ligar para a loja"
          />

          <HighlightButton
            to="/calculadora"
            icon={<Calculator size={22} />}
            label="Calcular meu telhado agora"
          />

          <LinkButton
            to="/catalogo"
            icon={<ShoppingBag size={22} />}
            label="Ver catálogo completo"
          />

          <LinkButton
            to="/"
            icon={<Globe size={22} />}
            label="Visitar o site"
          />

          <ExternalButton
            href={GOOGLE_REVIEW_URL}
            icon={<Star size={22} />}
            label="Avaliar no Google"
          />

          <ExternalButton
            href={GOOGLE_MAPS_URL}
            icon={<MapPin size={22} />}
            label="Como chegar / localização"
          />
        </nav>

        {/* Dica de guias — expansão futura, mantida discreta */}
        <div className="mt-5 text-center">
          <Link
            to="/guias"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
          >
            <Store size={14} />
            Dicas e guias grátis
          </Link>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="mx-auto mt-10 w-full max-w-md border-t border-accent/10 pt-6 text-center">
        <p className="text-sm font-semibold text-primary">{CONTATO.address}</p>
        <p className="mt-1 text-xs text-muted-foreground">{CONTATO.hours}</p>

        <div className="mt-4 flex items-center justify-center gap-4">
          <SocialIcon href={INSTAGRAM_URL} icon={<Instagram size={22} />} label="Instagram" />
          <SocialIcon href={FACEBOOK_URL} icon={<Facebook size={22} />} label="Facebook" />
        </div>

        <p className="mt-5 text-[10px] text-muted-foreground/70">
          © {new Date().getFullYear()} Rocha Telhas & Madeiras. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}

function PrimaryButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-4 text-base font-bold text-white shadow-lg shadow-[#E8622E]/25 transition-all active:scale-[0.98] sm:py-5 sm:text-lg"
      style={{ backgroundColor: "#E8622E" }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#D45424")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E8622E")}
      onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {icon}
      {label}
    </a>
  );
}

function HighlightButton({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="group flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-accent bg-accent/5 px-5 py-4 text-base font-bold text-accent shadow-sm transition-all hover:bg-accent hover:text-white active:scale-[0.98] sm:py-4 sm:text-lg"
    >
      {icon}
      {label}
    </Link>
  );
}

function LinkButton({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-white px-5 py-4 text-base font-semibold text-foreground shadow-sm transition-all hover:border-accent hover:text-accent active:scale-[0.98] sm:py-4"
    >
      {icon}
      {label}
    </Link>
  );
}

function ExternalButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-white px-5 py-4 text-base font-semibold text-foreground shadow-sm transition-all hover:border-accent hover:text-accent active:scale-[0.98] sm:py-4"
    >
      {icon}
      {label}
    </a>
  );
}

function SocialIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition-all hover:border-accent hover:text-accent active:scale-95"
    >
      {icon}
    </a>
  );
}
