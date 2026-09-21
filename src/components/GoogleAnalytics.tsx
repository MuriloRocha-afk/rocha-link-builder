import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Carrega o gtag.js uma única vez e dispara um page_view a cada troca de rota
 * (o site é uma SPA, então o GA4 não detecta as navegações internas sozinho).
 */
export function GoogleAnalytics({ measurementId }: { measurementId: string | null }) {
  const location = useRouterState({
    select: (state) => state.location.pathname + state.location.searchStr,
  });

  useEffect(() => {
    if (!measurementId) return;
    if (document.getElementById("ga4-script")) return;

    window.dataLayer = window.dataLayer || [];
    // O gtag.js só processa o objeto `arguments` — não um array.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    // page_view manual: evitamos duplicar com o disparo automático.
    window.gtag("config", measurementId, { send_page_view: false });

    const script = document.createElement("script");
    script.id = "ga4-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }, [measurementId]);

  useEffect(() => {
    if (!measurementId || typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [measurementId, location]);

  return null;
}
