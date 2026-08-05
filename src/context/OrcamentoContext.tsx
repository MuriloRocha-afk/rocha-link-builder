import { type ReactNode } from "react";
import { useQuoteCart } from "@/components/site/quote-cart";

export type ItemOrcamento = {
  id: string;
  nome: string;
  variacao: string;
  quantidade: number;
  unidade: string;
  categoria: string;
};

/**
 * Adaptador: expõe a API em português (`useOrcamento`) sobre o carrinho de
 * orçamento já existente no projeto (QuoteCartProvider), evitando dois
 * carrinhos concorrentes.
 */
export function OrcamentoProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useOrcamento() {
  const cart = useQuoteCart();

  return {
    itens: cart.items.map((i) => ({
      id: i.id,
      nome: i.name,
      variacao: i.detail ?? "",
      quantidade: i.qty,
      unidade: i.unit ?? "un",
      categoria: "",
    })) as ItemOrcamento[],
    adicionar: (item: ItemOrcamento) =>
      cart.addItem({
        id: item.id,
        name: item.nome,
        detail: item.variacao,
        qty: item.quantidade,
        unit: item.unidade,
      }),
    remover: cart.removeItem,
    limpar: cart.clear,
    total: cart.count,
    aberto: cart.open,
    setAberto: cart.setOpen,
  };
}
