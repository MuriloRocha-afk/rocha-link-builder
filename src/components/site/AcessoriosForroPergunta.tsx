import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useOrcamento } from "@/context/OrcamentoContext";

export type GrupoAcessorioForro = {
  id: string;
  nome: string;
  descricao: string;
  unidade: string;
  categoria?: string;
  /** opções de tamanho/variação selecionáveis */
  opcoes: string[];
};

/** Meia-cana em tamanhos de 0,5 em 0,5 metro (0,5m a 6,0m) */
export const opcoesMeiaCanaMeioMetro = Array.from(
  { length: 12 },
  (_, i) => `${((i + 1) * 0.5).toFixed(1).replace(".", ",")}m`,
);

export default function AcessoriosForroPergunta({
  grupos,
  passo,
  contexto,
}: {
  grupos: GrupoAcessorioForro[];
  /** número exibido no marcador da etapa */
  passo: number;
  /** texto curto do produto principal, usado na variação do orçamento */
  contexto: string;
}) {
  const { adicionar } = useOrcamento();
  const [quer, setQuer] = useState<boolean | null>(null);
  const [selecao, setSelecao] = useState<Record<string, string>>({});
  const [qtd, setQtd] = useState<Record<string, number>>({});
  const [addId, setAddId] = useState<string | null>(null);

  return (
    <section className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
          {passo}
        </span>
        Acessórios de forro?
      </h2>

      <div className="flex gap-3 mb-4">
        {[
          { label: "Sim, quero acessórios", v: true },
          { label: "Não, obrigado", v: false },
        ].map((o) => (
          <button
            key={String(o.v)}
            type="button"
            onClick={() => setQuer(o.v)}
            className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
              quer === o.v
                ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200 text-orange-700"
                : "border-gray-200 hover:border-orange-300 text-gray-700"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {quer === true && (
        <div className="space-y-4">
          {grupos.map((g) => {
            const sel = selecao[g.id] ?? (g.opcoes.length === 1 ? g.opcoes[0] : undefined);
            const quantidade = qtd[g.id] ?? 1;
            const ok = addId === g.id;
            return (
              <div key={g.id} className="rounded-xl border border-gray-200 p-4">
                <p className="text-sm font-semibold text-gray-900">{g.nome}</p>
                <p className="text-xs text-gray-500 mb-3">{g.descricao}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {g.opcoes.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setSelecao((s) => ({ ...s, [g.id]: o }))}
                      className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                        sel === o
                          ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200 text-orange-700"
                          : "border-gray-200 hover:border-orange-300 text-gray-700"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        setQtd((q) => ({ ...q, [g.id]: Math.max(1, (q[g.id] ?? 1) - 1) }))
                      }
                      className="px-3 py-1.5 hover:bg-gray-100 font-bold text-gray-600"
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-gray-900">
                      {quantidade}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQtd((q) => ({ ...q, [g.id]: (q[g.id] ?? 1) + 1 }))}
                      className="px-3 py-1.5 hover:bg-gray-100 font-bold text-gray-600"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-gray-500">{g.unidade}</span>
                  <button
                    type="button"
                    disabled={!sel}
                    onClick={() => {
                      if (!sel) return;
                      adicionar({
                        id: `${g.id}-${sel}`,
                        nome: g.nome,
                        variacao: `${sel} · ${contexto}`,
                        quantidade,
                        unidade: g.unidade,
                        categoria: g.categoria ?? "Madeiramento",
                      });
                      setAddId(g.id);
                      setTimeout(() => setAddId(null), 1200);
                    }}
                    className={`ml-auto flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold transition-colors disabled:bg-gray-100 disabled:text-gray-400 ${
                      ok ? "bg-green-600 text-white" : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                    }`}
                  >
                    {ok ? (
                      <>
                        <Check size={14} /> Adicionado
                      </>
                    ) : (
                      <>
                        <Plus size={14} /> Adicionar
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
