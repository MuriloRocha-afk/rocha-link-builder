import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Plus } from "lucide-react";
import { useOrcamento } from "@/context/OrcamentoContext";

export type AcessorioItem = {
  id: string;
  nome: string;
  descricao: string;
  emoji: string;
  unidade: string;
  categoria: string;
  quantidadeSugerida: number;
  /** quando definido, o item vira um link para outra ficha em vez de botão "Add" */
  href?: string;
};

export default function BlocoAcessorios({
  itens,
  contexto,
}: {
  itens: AcessorioItem[];
  /** texto curto que descreve para qual configuração os acessórios foram calculados */
  contexto?: string;
}) {
  const { adicionar } = useOrcamento();
  const [addId, setAddId] = useState<string | null>(null);

  if (!itens.length) return null;

  return (
    <div className="mt-4 grid gap-2 sm:grid-cols-2">
      {itens.map((a) => {
        const ok = addId === a.id;
        return (
          <div
            key={a.id}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3"
          >
            <span aria-hidden className="text-xl">
              {a.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">{a.nome}</p>
              <p className="text-xs text-gray-500">{a.descricao}</p>
              <p className="mt-0.5 text-xs font-semibold text-orange-600">
                Sugerido: {a.quantidadeSugerida} {a.unidade}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                adicionar({
                  id: a.id,
                  nome: a.nome,
                  variacao: contexto ?? a.descricao,
                  quantidade: a.quantidadeSugerida,
                  unidade: a.unidade,
                  categoria: a.categoria,
                });
                setAddId(a.id);
                setTimeout(() => setAddId(null), 1200);
              }}
              className={`flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
                ok ? "bg-green-600 text-white" : "bg-orange-50 text-orange-600 hover:bg-orange-100"
              }`}
            >
              {ok ? (
                <>
                  <Check size={14} /> Ok
                </>
              ) : (
                <>
                  <Plus size={14} /> Add
                </>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
