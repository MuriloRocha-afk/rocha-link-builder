import { useState } from "react";

const TERMOS: { termo: string; def: string }[] = [
  { termo: "Água (do telhado)", def: "cada um dos planos inclinados que formam o telhado. Um telhado \"2 águas\" tem dois planos; \"4 águas\", quatro." },
  { termo: "Água-furtada", def: "encontro interno entre duas águas do telhado, formando um \"V\" por onde a água escoa — ponto que exige atenção redobrada contra infiltração." },
  { termo: "Beiral", def: "parte do telhado que se projeta para fora das paredes, protegendo a fachada da chuva." },
  { termo: "Caibro", def: "peça de madeira que fica apoiada sobre as terças e recebe as ripas (ou a telha diretamente), formando a base da cobertura." },
  { termo: "Caibrão", def: "caibro de bitola maior, usado em vãos mais largos ou estruturas que exigem mais resistência." },
  { termo: "Calha", def: "canaleta instalada na borda do telhado para captar e escoar a água da chuva." },
  { termo: "Cumeeira", def: "peça usada no ponto mais alto do telhado, onde duas águas se encontram, fechando e impermeabilizando essa junção." },
  { termo: "Espigão", def: "encontro externo entre duas águas do telhado (o oposto da água-furtada), comum em telhados de 4 águas." },
  { termo: "Forro", def: "revestimento instalado por baixo da estrutura do telhado, fechando o teto internamente." },
  { termo: "Inclinação do telhado", def: "ângulo do plano do telhado em relação à horizontal; cada tipo de telha exige uma inclinação mínima para funcionar corretamente." },
  { termo: "Manta térmica/subcobertura", def: "camada instalada sob as telhas para melhorar o conforto térmico e dar proteção extra contra infiltração." },
  { termo: "Ripão", def: "ripa de madeira de maior espessura, usada em estruturas mais robustas." },
  { termo: "Rufo", def: "peça metálica usada para vedar o encontro entre o telhado e paredes, chaminés ou outras estruturas verticais." },
  { termo: "Terça", def: "viga horizontal que sustenta os caibros, apoiada sobre a estrutura principal do telhado." },
  { termo: "Vão livre", def: "distância entre dois pontos de apoio (postes, paredes, pilares), usada para calcular a bitola necessária das vigas." },
];

export function Glossario() {
  const [busca, setBusca] = useState("");
  const q = busca.trim().toLowerCase();
  const lista = q
    ? TERMOS.filter((t) => t.termo.toLowerCase().includes(q) || t.def.toLowerCase().includes(q))
    : TERMOS;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
      <h3 className="text-lg font-extrabold text-primary">Glossário técnico</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Os termos que aparecem no catálogo, explicados em linguagem simples.
      </p>

      <input
        type="search"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar termo (ex.: cumeeira, rufo, terça)"
        className="mt-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-primary outline-none focus:border-orange-400"
      />

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        {lista.map((t) => (
          <div key={t.termo} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <dt className="text-sm font-extrabold text-primary">{t.termo}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.def}</dd>
          </div>
        ))}
      </dl>

      {lista.length === 0 ? (
        <p className="mt-5 text-sm text-muted-foreground">Nenhum termo encontrado para “{busca}”.</p>
      ) : null}
    </div>
  );
}

export default Glossario;
