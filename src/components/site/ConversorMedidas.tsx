import { useMemo, useState } from "react";
import { Ruler } from "lucide-react";

function Campo({
  label,
  valor,
  onChange,
  sufixo,
  passo = 0.01,
}: {
  label: string;
  valor: number;
  onChange: (n: number) => void;
  sufixo: string;
  passo?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-gray-600 uppercase">{label}</span>
      <div className="mt-1 flex items-center rounded-xl border border-gray-200 bg-white">
        <input
          type="number"
          min={0}
          step={passo}
          value={Number.isFinite(valor) ? valor : ""}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full rounded-xl bg-transparent px-3 py-2.5 text-sm font-semibold text-primary outline-none"
        />
        <span className="pr-3 text-xs font-bold text-gray-400">{sufixo}</span>
      </div>
    </label>
  );
}

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5">
      <p className="text-xs font-bold tracking-[0.14em] text-orange-600 uppercase">{titulo}</p>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function Resultado({ valor }: { valor: string }) {
  return (
    <div className="rounded-xl border-2 border-orange-500 bg-white p-4">
      <p className="text-xl font-extrabold text-primary">{valor}</p>
    </div>
  );
}

const fmt = (n: number, d = 2) =>
  Number.isFinite(n) ? n.toLocaleString("pt-BR", { maximumFractionDigits: d }) : "—";

export function ConversorMedidas() {
  // m² <-> m linear
  const [areaM2, setAreaM2] = useState(10);
  const [larguraUtil, setLarguraUtil] = useState(1.1);
  const [mLinear, setMLinear] = useState(10);

  // polegada <-> cm
  const [pol, setPol] = useState(1);
  const [cm, setCm] = useState(2.54);

  // m³ <-> embalagem / peças
  const [m3, setM3] = useState(1);
  const [espessura, setEspessura] = useState(0.05);
  const [larguraPeca, setLarguraPeca] = useState(0.12);
  const [compPeca, setCompPeca] = useState(3);

  const linearDeArea = useMemo(
    () => (larguraUtil > 0 ? areaM2 / larguraUtil : 0),
    [areaM2, larguraUtil],
  );
  const areaDeLinear = useMemo(() => mLinear * larguraUtil, [mLinear, larguraUtil]);
  const volumePeca = useMemo(
    () => Math.max(0, espessura) * Math.max(0, larguraPeca) * Math.max(0, compPeca),
    [espessura, larguraPeca, compPeca],
  );
  const pecas = volumePeca > 0 ? Math.ceil(m3 / volumePeca) : 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          <Ruler size={20} />
        </span>
        <div>
          <h3 className="text-lg font-extrabold text-primary">Conversor de Medidas</h3>
          <p className="text-sm text-muted-foreground">
            m² ↔ metro linear, polegada ↔ centímetro e m³ ↔ quantidade de peças.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Bloco titulo="m² ↔ metro linear">
          <Campo label="Largura útil da peça" valor={larguraUtil} onChange={setLarguraUtil} sufixo="m" />
          <Campo label="Área" valor={areaM2} onChange={setAreaM2} sufixo="m²" passo={0.5} />
          <Resultado valor={`${fmt(linearDeArea)} m lineares`} />
          <Campo label="Metros lineares" valor={mLinear} onChange={setMLinear} sufixo="m" passo={0.5} />
          <Resultado valor={`${fmt(areaDeLinear)} m²`} />
        </Bloco>

        <Bloco titulo="Polegada ↔ centímetro">
          <Campo
            label="Polegadas"
            valor={pol}
            onChange={(n) => {
              setPol(n);
              setCm(Number.isFinite(n) ? n * 2.54 : 0);
            }}
            sufixo="pol"
            passo={0.25}
          />
          <Resultado valor={`${fmt(pol * 2.54)} cm`} />
          <Campo
            label="Centímetros"
            valor={cm}
            onChange={(n) => {
              setCm(n);
              setPol(Number.isFinite(n) ? n / 2.54 : 0);
            }}
            sufixo="cm"
            passo={0.5}
          />
          <Resultado valor={`${fmt(cm / 2.54, 3)} pol`} />
        </Bloco>

        <Bloco titulo="m³ ↔ peças de madeira">
          <Campo label="Volume" valor={m3} onChange={setM3} sufixo="m³" />
          <div className="grid grid-cols-3 gap-2">
            <Campo label="Esp." valor={espessura} onChange={setEspessura} sufixo="m" />
            <Campo label="Larg." valor={larguraPeca} onChange={setLarguraPeca} sufixo="m" />
            <Campo label="Comp." valor={compPeca} onChange={setCompPeca} sufixo="m" passo={0.5} />
          </div>
          <Resultado valor={`${pecas} peça(s) · ${fmt(volumePeca, 4)} m³ cada`} />
        </Bloco>
      </div>

      <p className="mt-5 text-xs text-muted-foreground">
        Valores de referência. A equipe técnica confere as medidas na cotação final.
      </p>
    </div>
  );
}
