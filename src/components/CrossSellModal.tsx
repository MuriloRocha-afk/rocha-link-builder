import { X, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import type { ProdutoRelacionado } from "../data/crossSell";
import { useQuoteCart } from "@/components/site/quote-cart";

type Props = {
  aberto: boolean;
  onFechar: () => void;
  produtoPrincipal: string;
  relacionados: ProdutoRelacionado[];
};

export default function CrossSellModal({
  aberto,
  onFechar,
  produtoPrincipal,
  relacionados,
}: Props) {
  const { addItem, setOpen } = useQuoteCart();
  const [adicionados, setAdicionados] = useState<Record<string, boolean>>({});
  const [quantidades, setQuantidades] = useState<Record<string, number>>(
    Object.fromEntries(relacionados.map((r) => [r.id, r.quantidadeSugerida])),
  );

  if (!aberto) return null;

  const handleAdicionar = (produto: ProdutoRelacionado) => {
    addItem(
      {
        id: produto.id,
        name: produto.nome,
        detail: produto.descricao,
        qty: quantidades[produto.id] ?? produto.quantidadeSugerida,
        unit: produto.unidade,
      },
      { silent: true },
    );
    setAdicionados((prev) => ({ ...prev, [produto.id]: true }));
  };

  const algumAdicionado = Object.values(adicionados).some(Boolean);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onFechar} />

      <div className="animate-in slide-in-from-bottom sm:zoom-in-95 relative flex max-h-[85vh] w-full flex-col rounded-t-3xl bg-white shadow-2xl duration-300 sm:max-w-lg sm:rounded-2xl">
        {/* handle mobile */}
        <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-gray-200 sm:hidden" />

        {/* header */}
        <div className="flex items-start justify-between p-5 pb-3">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                <Check size={12} className="text-green-600" />
              </div>
              <span className="text-xs font-semibold tracking-wide text-green-600 uppercase">
                Adicionado ao orçamento
              </span>
            </div>
            <h2 className="text-base leading-tight font-bold text-gray-900">
              Quem compra <span className="text-orange-500">{produtoPrincipal}</span>
              <br />
              também leva:
            </h2>
          </div>
          <button
            onClick={onFechar}
            aria-label="Fechar"
            className="mt-0.5 ml-3 flex-shrink-0 text-gray-300 transition-colors hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* lista de relacionados */}
        <div className="flex-1 space-y-3 overflow-y-auto px-5 pb-2">
          {relacionados.map((produto) => {
            const foiAdicionado = adicionados[produto.id];
            const qtd = quantidades[produto.id] ?? produto.quantidadeSugerida;
            return (
              <div
                key={produto.id}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3"
              >
                <span className="text-2xl leading-none">{produto.emoji}</span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-gray-900">{produto.nome}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{produto.descricao}</p>

                  {!foiAdicionado && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center overflow-hidden rounded-lg border border-gray-200 bg-white">
                        <button
                          onClick={() =>
                            setQuantidades((q) => ({
                              ...q,
                              [produto.id]: Math.max(1, (q[produto.id] ?? qtd) - 1),
                            }))
                          }
                          aria-label="Diminuir quantidade"
                          className="px-2 py-1 text-sm font-bold text-gray-500 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="min-w-[28px] px-2 py-1 text-center text-xs font-bold text-gray-800">
                          {qtd}
                        </span>
                        <button
                          onClick={() =>
                            setQuantidades((q) => ({
                              ...q,
                              [produto.id]: (q[produto.id] ?? qtd) + 1,
                            }))
                          }
                          aria-label="Aumentar quantidade"
                          className="px-2 py-1 text-sm font-bold text-gray-500 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs text-gray-400">{produto.unidade}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => !foiAdicionado && handleAdicionar(produto)}
                  disabled={foiAdicionado}
                  className={`flex flex-shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                    foiAdicionado
                      ? "cursor-default bg-green-500 text-white"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  {foiAdicionado ? (
                    <>
                      <Check size={12} /> Adicionado
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={12} /> Adicionar
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* footer */}
        <div className="space-y-2 border-t p-5 pt-3">
          {algumAdicionado ? (
            <button
              onClick={() => {
                onFechar();
                setOpen(true);
              }}
              className="w-full rounded-xl bg-orange-500 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-600"
            >
              Ver meu orçamento →
            </button>
          ) : (
            <>
              <button
                onClick={onFechar}
                className="w-full rounded-xl bg-gray-900 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800"
              >
                Não, obrigado
              </button>
              <p className="text-center text-xs text-gray-400">
                Você pode adicionar depois pelo catálogo
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
