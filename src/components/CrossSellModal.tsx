import { X, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ProdutoRelacionado } from "../data/crossSell";

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
  if (!aberto) return null;

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
            return (
              <div
                key={produto.id}
                className="rounded-xl border border-gray-100 bg-gray-50 p-3"
              >
                <p className="truncate text-sm font-bold text-gray-900">{produto.nome}</p>
                <p className="mt-0.5 text-xs text-gray-500">{produto.descricao}</p>

                <Link
                  to={produto.url}
                  className="mt-3 inline-flex items-center gap-1 rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold text-white transition-all hover:bg-orange-600"
                >
                  Ver página
                </Link>
              </div>
            );
          })}
        </div>

        {/* footer */}
        <div className="space-y-2 border-t p-5 pt-3">
          <button
            onClick={onFechar}
            className="w-full rounded-xl bg-gray-900 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800"
          >
            Não, obrigado
          </button>
          <p className="text-center text-xs text-gray-400">
            Você pode adicionar depois pelo catálogo
          </p>
        </div>
      </div>
    </div>
  );
}
