import { useQuoteCart } from "@/components/site/quote-cart";
import CrossSellModal from "@/components/CrossSellModal";
import { getRelacionados } from "@/data/crossSell";

/** Exibe o pop-up de produtos relacionados sempre que um item é adicionado ao orçamento. */
export default function CrossSellHost() {
  const { crossSell, closeCrossSell } = useQuoteCart();
  if (!crossSell) return null;
  const relacionados = getRelacionados(crossSell.nome, crossSell.qtd, crossSell.detail);
  return (
    <CrossSellModal
      key={`${crossSell.nome}-${crossSell.qtd}-${crossSell.detail ?? ""}`}
      aberto
      onFechar={closeCrossSell}
      produtoPrincipal={crossSell.nome}
      relacionados={relacionados}
    />
  );
}
