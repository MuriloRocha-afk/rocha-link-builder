import { useRouterState } from "@tanstack/react-router";

/**
 * Lê os parâmetros da URL (ex.: ?peca=Caibro&modelo=Romana) usados pela
 * busca global para já abrir o configurador na etapa filtrada.
 */
export function useBuscaSelecao(): Record<string, string> {
  const search = useRouterState({ select: (s) => s.location.search }) as Record<string, unknown>;
  const saida: Record<string, string> = {};
  Object.entries(search ?? {}).forEach(([k, v]) => {
    if (typeof v === "string" && v) saida[k] = v;
  });
  return saida;
}
