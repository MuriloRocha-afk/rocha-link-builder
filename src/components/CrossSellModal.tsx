import { X, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { ProdutoRelacionado } from "../data/crossSell";
import { useOrcamento } from "../context/OrcamentoContext";

type Props = {
  aberto: boolean;
  onFechar: () => void;
  produtoPrincipal: string; // nome do produto que acabou de ser adicionado
  relacionados: ProdutoRelacionado[];
};

export default function CrossSellModal({ aberto, onFechar, produtoPrincipal, relacionados }: Props) {
  const { adicionar } = useOrcamento();
  const [adicionados, setAdicionados] = useState<Record<string, boolean>>({});
  const [quantidades, setQuantidades] = useState<Record<string, number>>(
    Object.fromEntries(relacionados.map((r) => [r.id, r.quantidadeSugerida]))
  );

  if (!aberto) return null;

  const handleAdicionar = (produto: ProdutoRelacionado) => {
    adicionar({
      id: produto.id,
      nome: produto.nome,
      variacao: `Qtd sugerida: ${quantidades[produto.id]} ${produto.unidade}`,
      quantidade: quantidades[produto.id],
      unidade: produto.unidade,
      categoria: produto.categoria,
    });
    setAdicionados((prev) => ({ ...prev, [produto.id]: true }));
  };

  const algumAdicionado = Object.values(adicionados).some(Boolean);

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onFechar} />

      {/* modal */}
      <div className="relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300 max-h-[85vh] flex flex-col">
        {/* handle mobile */}
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3 sm:hidden" />

        {/* header */}
        <div className="flex items-start justify-between p-5 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <Check size={12} className="text-green-600" />
              </div>
              <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                Adicionado ao orçamento
              </span>
            </div>
            <h2 className="font-bold text-gray-900 text-base leading-tight">
              Quem compra <span className="text-orange-500">{produtoPrincipal}</span>
              <br />também leva:
            </h2>
          </div>
          <button
            onClick={onFechar}
            className="text-gray-300 hover:text-gray-600 transition-colors mt-0.5 flex-shrink-0 ml-3"
          >
            <X size={20} />
          </button>
        </div>

        {/* lista de relacionados */}
        <div className="overflow-y-auto flex-1 px-5 pb-2 space-y-3">
          {relacionados.map((produto) => {
            const foiAdicionado = adicionados[produto.id];
            return (
              <div
                key={produto.id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all
                  ${foiAdicionado ? "border-green-200 bg-green-50" : "border-gray-100 bg-gray-50"}`}
              >
                <span className="text-2xl flex-shrink-0">{produto.emoji}</span>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm leading-tight">
                    {produto.nome}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-tight">
                    {produto.descricao}
                  </p>
                  {/* contador de quantidade */}
                  {!foiAdicionado && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">Qtd:</span>
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() =>
                            setQuantidades((q) => ({
                              ...q,
                              [produto.id]: Math.max(1, q[produto.id] - 1),
                            }))
                          }
                          className="px-2 py-1 text-gray-500 hover:bg-gray-100 text-sm font-bold"
                        >
                          −
                        </button>
                        <span className="px-2 py-1 text-xs font-bold text-gray-800 min-w-[28px] text-center">
                          {quantidades[produto.id]}
                        </span>
                        <button
                          onClick={() =>
                            setQuantidades((q) => ({
                              ...q,
                              [produto.id]: q[produto.id] + 1,
                            }))
                          }
                          className="px-2 py-1 text-gray-500 hover:bg-gray-100 text-sm font-bold"
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
                  className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1
                    ${foiAdicionado
                      ? "bg-green-100 text-green-700 cursor-default"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                    }`}
                >
                  {foiAdicionado ? (
                    <><Check size={12} /> Ok</>
                  ) : (
                    <><ShoppingCart size={12} /> Adicionar</>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* footer */}
        <div className="p-5 pt-3 border-t space-y-2">
          <button
            onClick={onFechar}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-xl text-sm transition-colors"
          >
            {algumAdicionado ? "Perfeito! Ver meu orçamento →" : "Não, obrigado"}
          </button>
          {!algumAdicionado && (
            <p className="text-center text-xs text-gray-400">
              Você pode adicionar depois pelo catálogo
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
