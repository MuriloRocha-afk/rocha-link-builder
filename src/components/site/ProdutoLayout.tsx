import type { ReactNode } from "react";
import { getDestaques } from "@/data/produtoDestaques";

type Props = {
  /** chave em DESTAQUES_PRODUTO — habilita badges e "Por que escolher?" */
  produtoKey?: string;
  breadcrumb?: ReactNode;
  cabecalho: ReactNode;
  galeria: ReactNode;
  /** configurador em passos + resumo (coluna direita) */
  children: ReactNode;
  especificacoes?: [string, string][];
  acessorios?: ReactNode;
  tituloAcessorios?: string;
  /** desativa o comportamento sticky da coluna da galeria */
  galeriaSticky?: boolean;
};

export default function ProdutoLayout({
  produtoKey,
  breadcrumb,
  cabecalho,
  galeria,
  children,
  especificacoes,
  acessorios,
  tituloAcessorios = "Complemente seu pedido",
  galeriaSticky = false,
}: Props) {
  const destaques = getDestaques(produtoKey);
  const specs = especificacoes?.length ? especificacoes : destaques?.especificacoes;

  return (
    <div className="min-h-screen bg-gray-50">
      {breadcrumb}

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:items-start">
          {/* COLUNA ESQUERDA — galeria + badges (sticky no desktop) */}
          <div className={`space-y-5 md:col-span-3 md:row-start-1 ${galeriaSticky ? "md:sticky md:top-20" : ""}`}>
            {galeria}

            {destaques?.badges?.length ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {destaques.badges.map((b) => (
                  <div
                    key={b.texto}
                    className="flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2.5 text-center"
                  >
                    <span aria-hidden className="text-lg leading-none">
                      {b.icone}
                    </span>
                    <span className="text-[11px] font-semibold leading-tight text-gray-700">
                      {b.texto}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* COLUNA DIREITA — nome + configurador */}
          <div className="space-y-6 md:col-span-2 md:row-span-2 md:row-start-1">
            {cabecalho}
            {children}
          </div>

          {/* POR QUE ESCOLHER — abaixo da galeria no desktop, após o configurador no mobile */}
          {destaques?.motivos?.length ? (
            <section className="rounded-2xl bg-white p-5 shadow-sm md:col-span-3 md:row-start-2">
              <h2 className="mb-4 font-bold text-gray-900">Por que escolher este produto?</h2>
              <ul className="space-y-4">
                {destaques.motivos.map((m) => (
                  <li key={m.titulo} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[11px] font-bold text-orange-600"
                    >
                      ✓
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-gray-900">{m.titulo}</span>
                      <span className="block text-sm leading-snug text-gray-600">
                        {m.descricao}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        {/* DADOS TÉCNICOS — largura total */}
        {specs?.length ? (
          <section className="mt-10 rounded-2xl bg-white p-5 shadow-sm md:p-6">
            <h2 className="border-b border-gray-200 pb-3 text-lg font-bold text-gray-900">
              Especificações Técnicas
            </h2>
            <table className="mt-2 w-full text-sm">
              <tbody>
                {specs.map(([k, v], i) => (
                  <tr key={k} className={i % 2 === 0 ? "bg-gray-50" : undefined}>
                    <td className="rounded-l-lg px-3 py-3 text-gray-500">{k}</td>
                    <td className="rounded-r-lg px-3 py-3 text-right font-bold text-gray-900">
                      {v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}

        {/* ACESSÓRIOS RELACIONADOS */}
        {acessorios ? (
          <section className="mt-10">
            <h2 className="border-b border-gray-200 pb-3 text-lg font-bold text-gray-900">
              {tituloAcessorios}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">{acessorios}</div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
