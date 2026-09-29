import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __gaInitialPath?: string;
  }
}

/**
 * A tag gtag.js é inserida no <head> pelo servidor (com page_view automático
 * no carregamento). Aqui só disparamos page_view nas navegações internas da SPA.
 */
export function GoogleAnalytics({ measurementId }: { measurementId: string | null }) {
  const location = useRouterState({
    select: (state) => state.location.pathname + state.location.searchStr,
  });
  const first = useRef(true);

  useEffect(() => {
    if (!measurementId || typeof window.gtag !== "function") return;
    if (first.current) {
      first.current = false;
      if (window.__gaInitialPath === location) return;
    }
    window.gtag("event", "page_view", {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [measurementId, location]);

  return null;
}
