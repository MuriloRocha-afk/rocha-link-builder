import { useState } from "react";

const TERMOS: { termo: string; def: string }[] = [
  {
    termo: "Água (do telhado)",
    def: "Cada plano inclinado da cobertura. Um telhado de 2 águas tem dois planos que se encontram na cumeeira.",
  },
  {
    termo: "Água furtada",
    def: "Canal em V formado no encontro de duas águas do telhado; recebe a água da chuva e precisa ser impermeabilizado com calha própria.",
  },
  {
    termo: "Cumeeira",
    def: "Peça que cobre a linha mais alta do telhado, onde duas águas se encontram, impedindo entrada de água e vento.",
  },
  {
    termo: "Espigão",
    def: "Aresta inclinada que sai da cumeeira até o canto do telhado, comum em coberturas de 4 águas.",
  },
  {
    termo: "Rufo",
    def: "Chapa metálica dobrada usada no encontro do telhado com paredes ou platibandas, para impedir infiltração.",
  },
  {
    termo: "Calha",
    def: "Canal instalado na borda do telhado que recolhe a água da chuva e conduz até o condutor/descida.",
  },
  {
    termo: "Platibanda",
    def: "Mureta que sobe além do nível do telhado, escondendo a cobertura vista da rua.",
  },
  {
    termo: "Terça",
    def: "Viga horizontal apoiada na estrutura, paralela à cumeeira, que sustenta os caibros.",
  },
  {
    termo: "Caibro",
    def: "Peça de madeira apoiada sobre as terças, no sentido da inclinação, que recebe o ripamento.",
  },
  {
    termo: "Ripa",
    def: "Sarrafo fino pregado sobre os caibros onde as telhas cerâmicas, de concreto ou PVC se encaixam.",
  },
  {
    termo: "Cavalete",
    def: "Estrutura triangular de madeira que dá o formato e a inclinação do telhado, também chamada de tesoura.",
  },
  {
    termo: "Frontão / oitão",
    def: "Parede triangular na extremidade de um telhado de duas águas.",
  },
  {
    termo: "Madeira aparelhada",
    def: "Peça que passou pela plaina industrial, ficando com faces lisas, esquadro correto e bitola uniforme.",
  },
  {
    termo: "Cambará aparelhado",
    def: "Madeira nobre de boa resistência e estabilidade, beneficiada na plaina — muito usada em estrutura de telhado aparente.",
  },
  {
    termo: "Bitola",
    def: "Medida da seção da peça de madeira (ex.: 5×6 cm para caibro, 6×12 cm para terça).",
  },
  {
    termo: "Autoclavado",
    def: "Madeira tratada sob pressão com produtos que a protegem de cupim, fungos e umidade.",
  },
  {
    termo: "Recobrimento",
    def: "Sobreposição de uma telha sobre a outra; quanto menor a inclinação, maior precisa ser o recobrimento.",
  },
  {
    termo: "Inclinação (caimento)",
    def: "Relação entre altura e vão do telhado, expressa em % — cada tipo de telha tem uma inclinação mínima.",
  },
  {
    termo: "Beiral",
    def: "Parte do telhado que avança além da parede, protegendo a fachada da chuva.",
  },
  {
    termo: "Testeira / tabeira",
    def: "Tábua instalada na ponta do beiral, dando acabamento e servindo de apoio para a calha.",
  },
  {
    termo: "Stain",
    def: "Acabamento que penetra na madeira realçando os veios, com proteção UV — alternativa ao verniz na área externa.",
  },
  {
    termo: "Seladora",
    def: "Produto aplicado antes do verniz ou da tinta para fechar os poros da madeira e reduzir o consumo de acabamento.",
  },
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
        placeholder="Buscar termo (ex.: cumeeira, rufo, bitola)"
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
