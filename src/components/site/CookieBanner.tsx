import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const CONSENT_KEY = "rocha-cookie-consent";

/**
 * Banner de consentimento de cookies (LGPD).
 * Aparece apenas na primeira visita; ao aceitar, grava a preferência no
 * localStorage e não é mais exibido. Enquanto está visível, marca
 * `data-cookie-banner="1"` no <html> para que o botão flutuante de WhatsApp
 * suba e não fique coberto no mobile.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(CONSENT_KEY) !== "accepted") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      document.documentElement.dataset.cookieBanner = "1";
      return () => {
        delete document.documentElement.dataset.cookieBanner;
      };
    }
  }, [visible]);

  if (!visible) return null;

  const aceitar = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {
      /* navegador sem localStorage: apenas fecha o banner */
    }
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-[55] px-3 pb-3 md:bottom-4 md:px-5 md:pb-0"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-2xl border border-border bg-card/98 p-4 shadow-[var(--shadow-lift)] backdrop-blur sm:flex-row sm:gap-4">
        <p className="flex-1 text-center text-[13px] leading-snug text-foreground sm:text-left">
          Usamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com
          nossa{" "}
          <Link
            to="/politica-de-cookies"
            className="font-bold text-accent underline underline-offset-2"
          >
            Política de Cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={aceitar}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Aceitar
          </button>
          <Link
            to="/politica-de-cookies"
            className="text-sm font-semibold text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            Saiba mais
          </Link>
        </div>
      </div>
    </div>
  );
}
