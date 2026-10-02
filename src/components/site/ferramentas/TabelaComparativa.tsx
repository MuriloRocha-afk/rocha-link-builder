import { Link } from "@tanstack/react-router";

const TELHAS = ["Fibrocimento", "Cerâmica", "PVC", "Concreto (Eurotop)", "Esmaltada"];

const LINKS: Record<string, string> = {
  Fibrocimento: "/catalogo/telhas/fibrocimento",
  "Cerâmica": "/catalogo/telhas/ceramica",
  "PVC": "/catalogo/telhas/colonial-pvc",
  "Concreto (Eurotop)": "/catalogo/telhas/concreto",
  "Esmaltada": "/catalogo/telhas/esmaltada",
};

const LINHAS: { criterio: string; valores: string[] }[] = [
  { criterio: "Peso aproximado", valores: ["Médio", "Alto", "Muito baixo", "Alto", "Alto"] },
  { criterio: "Custo-benefício", valores: ["Alto", "Médio", "Alto", "Médio", "Médio-baixo"] },
  { criterio: "Durabilidade", valores: ["Alta", "Muito alta", "Média-alta", "Alta", "Muito alta"] },
  { criterio: "Inclinação mínima recomendada", valores: ["Baixa-média", "Alta", "Baixa", "Alta", "Alta"] },
  { criterio: "Conforto térmico", valores: ["Baixo-médio (recomendado usar manta)", "Alto", "Médio", "Médio-alto", "Alto"] },
  { criterio: "Manutenção", valores: ["Baixa-média", "Média (pode trincar)", "Baixa", "Baixa", "Baixa (acabamento resiste à sujeira)"] },
];

export function TabelaComparativa() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
      <h3 className="text-lg font-extrabold text-primary">Comparativo de telhas</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Referência rápida e qualitativa dos principais tipos de telha lado a lado.
      </p>

      {/* Desktop/tablet: tabela */}
      <div className="mt-5 hidden overflow-x-auto rounded-xl border border-gray-200 md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="px-4 py-3 text-xs font-extrabold tracking-wide uppercase">Critério</th>
              {TELHAS.map((t) => (
                <th key={t} className="px-4 py-3 text-xs font-extrabold tracking-wide uppercase">
                  <Link to={LINKS[t]} className="hover:underline">{t}</Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LINHAS.map((l, i) => (
              <tr key={l.criterio} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                <td className="px-4 py-3 font-bold text-primary">{l.criterio}</td>
                {l.valores.map((v, j) => (
                  <td key={j} className="px-4 py-3 text-muted-foreground">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: cards por telha */}
      <div className="mt-5 grid gap-3 md:hidden">
        {TELHAS.map((t, j) => (
          <div key={t} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-base font-extrabold text-primary">
              <Link to={LINKS[t]} className="hover:underline">{t}</Link>
            </p>
            <dl className="mt-2 grid gap-1.5">
              {LINHAS.map((l) => (
                <div key={l.criterio} className="flex justify-between gap-3 text-sm">
                  <dt className="text-muted-foreground">{l.criterio}</dt>
                  <dd className="text-right font-bold text-primary">{l.valores[j]}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TabelaComparativa;
