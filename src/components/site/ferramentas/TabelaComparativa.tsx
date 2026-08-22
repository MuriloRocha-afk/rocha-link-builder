import { Link } from "@tanstack/react-router";

type Linha = {
  slug: string;
  tipo: string;
  peso: string;
  preco: string;
  durabilidade: string;
  inclinacao: string;
  uso: string;
};

const LINHAS: Linha[] = [
  {
    slug: "fibrocimento",
    tipo: "Fibrocimento",
    peso: "11 – 18 kg/m²",
    preco: "$",
    durabilidade: "20 – 30 anos",
    inclinacao: "10% (5%*)",
    uso: "Galpão, área de serviço, obra econômica",
  },
  {
    slug: "colonial-pvc",
    tipo: "Colonial PVC",
    peso: "5 – 8 kg/m²",
    preco: "$$",
    durabilidade: "20 – 25 anos",
    inclinacao: "15%",
    uso: "Residência, reforma, litoral",
  },
  {
    slug: "ceramica",
    tipo: "Cerâmica (barro)",
    peso: "40 – 55 kg/m²",
    preco: "$$",
    durabilidade: "30 – 50 anos",
    inclinacao: "30% – 40%",
    uso: "Residencial de telhado aparente",
  },
  {
    slug: "concreto",
    tipo: "Concreto",
    peso: "45 – 50 kg/m²",
    preco: "$$$",
    durabilidade: "40 – 50 anos",
    inclinacao: "30%",
    uso: "Residência exposta a vento e granizo",
  },
  {
    slug: "esmaltada",
    tipo: "Esmaltada",
    peso: "40 – 50 kg/m²",
    preco: "$$$",
    durabilidade: "40 – 50 anos",
    inclinacao: "30% – 40%",
    uso: "Projeto de alto padrão, telhado aparente",
  },
  {
    slug: "policarbonato",
    tipo: "Policarbonato",
    peso: "1,5 – 3 kg/m²",
    preco: "$$$",
    durabilidade: "10 – 15 anos",
    inclinacao: "15%",
    uso: "Área externa, garagem, iluminação natural",
  },
];

export function TabelaComparativa() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
      <h3 className="text-lg font-extrabold text-primary">Tabela comparativa de telhas</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Referência rápida dos principais tipos em linha na Rocha Telhas — peso, durabilidade,
        inclinação mínima e melhor uso lado a lado.
      </p>

      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              {["Tipo de telha", "Peso por m²", "Faixa de preço", "Durabilidade", "Inclinação mín.", "Melhor uso"].map(
                (h) => (
                  <th key={h} className="px-4 py-3 text-xs font-extrabold tracking-wide uppercase">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {LINHAS.map((l, i) => (
              <tr key={l.slug} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                <td className="px-4 py-3 font-bold text-primary">
                  <Link
                    to="/catalogo/$categoriaSlug/$produtoSlug"
                    params={{ categoriaSlug: "telhas", produtoSlug: l.slug }}
                    className="hover:text-orange-600 hover:underline"
                  >
                    {l.tipo}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{l.peso}</td>
                <td className="px-4 py-3 font-extrabold text-orange-600">{l.preco}</td>
                <td className="px-4 py-3 text-muted-foreground">{l.durabilidade}</td>
                <td className="px-4 py-3 text-muted-foreground">{l.inclinacao}</td>
                <td className="px-4 py-3 text-muted-foreground">{l.uso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground">
        *Fibrocimento pode ir a 5% em telhas de maior comprimento com recobrimento reforçado. Valores
        de referência: confirme a inclinação com o fabricante e o seu projeto.
      </p>
    </div>
  );
}

export default TabelaComparativa;
