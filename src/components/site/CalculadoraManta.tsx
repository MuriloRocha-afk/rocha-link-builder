import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Layers } from "lucide-react";
import { BotaoCotarWhatsApp } from "@/components/site/BotaoCotarWhatsApp";
import { useCalcDims } from "@/components/site/calc-dims";

type Manta = {
  id: string;
  label: string;
  slug: string;
  /** largura útil do rolo em metros */
  largura: number;
  /** metros lineares por rolo */
  rolo: number;
  nota: string;
};

const MANTAS: Manta[] = [
  {
    id: "termica",
    label: "Manta térmica aluminizada",
    slug: "manta-termica",
    largura: 1.2,
    rolo: 50,
    nota: "Reduz a temperatura sob o telhado. Aplicada sobre caibros/terças.",
  },
  {
    id: "asfaltica",
    label: "Manta asfáltica",
    slug: "manta-asfaltica",
    largura: 1,
    rolo: 10,
    nota: "Impermeabilização de lajes, calhas e rufos.",
  },
];

function Campo({
  label,
  valor,
  onChange,
  sufixo,
  passo = 0.1,
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

export function CalculadoraManta() {
  const { dims } = useCalcDims();
  const [area, setArea] = useState(0);
  const [sobreposicao, setSobreposicao] = useState(10);
  const [mantaId, setMantaId] = useState("termica");

  const manta = MANTAS.find((m) => m.id === mantaId) ?? MANTAS[0]!;

  const areaTelhado = useMemo(() => {
    if (area > 0) return area;
    if (!dims) return 0;
    const fator = Math.sqrt(1 + Math.pow((dims.inclinacao || 0) / 100, 2));
    return (dims.largura || 0) * (dims.comprimento || 0) * fator;
  }, [area, dims]);

  const r = useMemo(() => {
    const a = Math.max(0, areaTelhado);
    const f = 1 + Math.max(0, sobreposicao || 0) / 100;
    const areaTotal = a * f;
    const metrosLineares = areaTotal / manta.largura;
    const rolos = metrosLineares > 0 ? Math.ceil(metrosLineares / manta.rolo) : 0;
    const fitas = rolos > 0 ? Math.ceil(metrosLineares / 45) : 0;
    return { areaTotal, metrosLineares, rolos, fitas };
  }, [areaTelhado, sobreposicao, manta]);

  const chip = (ativo: boolean) =>
    `rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
      ativo ? "bg-orange-600 text-white" : "border border-gray-200 bg-white text-gray-600"
    }`;

  const fmt = (n: number, d = 2) => n.toLocaleString("pt-BR", { maximumFractionDigits: d });

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          <Layers size={20} />
        </span>
        <div>
          <h3 className="text-lg font-extrabold text-primary">Manta &amp; Impermeabilização</h3>
          <p className="text-sm text-muted-foreground">
            Área do telhado + margem de sobreposição → metros de manta e quantidade de rolos.
          </p>
        </div>
      </div>

      {dims && area <= 0 ? (
        <p className="mt-4 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-xs font-semibold text-orange-700">
          Usando a área calculada na aba Telhado: {fmt(areaTelhado)} m². Informe um valor abaixo para
          sobrescrever.
        </p>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <span className="text-xs font-bold text-gray-600 uppercase">Tipo de manta</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {MANTAS.map((m) => (
              <button key={m.id} type="button" onClick={() => setMantaId(m.id)} className={chip(mantaId === m.id)}>
                {m.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{manta.nota}</p>
        </div>

        <Campo label="Área a cobrir" valor={area} onChange={setArea} sufixo="m²" />
        <Campo
          label="Margem de sobreposição"
          valor={sobreposicao}
          onChange={setSobreposicao}
          sufixo="%"
          passo={1}
        />
      </div>

      <div className="mt-6 rounded-2xl border-2 border-orange-500 bg-orange-50/60 p-5">
        <p className="text-xs font-bold tracking-[0.18em] text-orange-600 uppercase">
          Estimativa de material
        </p>
        <p className="mt-2 text-3xl font-extrabold text-primary">
          {r.rolos > 0 ? r.rolos : "—"}{" "}
          <span className="text-base font-bold text-primary/70">
            rolo(s) de {manta.rolo} m ({manta.largura.toFixed(2)} m de largura)
          </span>
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { l: "Área com sobreposição", v: `${fmt(r.areaTotal)} m²` },
            { l: "Metros lineares", v: `${fmt(r.metrosLineares)} m` },
            { l: "Fita aluminizada", v: `${r.fitas} rolo(s)` },
          ].map((c) => (
            <div key={c.l} className="rounded-xl border border-gray-200 bg-white p-3">
              <p className="text-xs font-semibold text-muted-foreground">{c.l}</p>
              <p className="mt-1 text-lg font-extrabold text-primary">{c.v}</p>
            </div>
          ))}
        </div>
      </div>

      {r.rolos > 0 ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <BotaoCotarWhatsApp
            tipo="calculadora"
            nomeProduto={manta.label}
            corpoMensagem={`Impermeabilização\n- Produto: ${manta.label}\n- Área com sobreposição: ${fmt(
              r.areaTotal,
            )} m²\n\n📋 *MATERIAIS ESTIMADOS*\n- ${manta.label} — Qtd: ${r.rolos} rolo(s) de ${manta.rolo} m\n- Fita aluminizada — Qtd: ${r.fitas} rolo(s)`}
          >
            Cotar no WhatsApp
          </BotaoCotarWhatsApp>
          <Link
            to="/catalogo/calhas/$produtoSlug"
            params={{ produtoSlug: manta.slug }}
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-orange-500 px-4 py-3 text-sm font-extrabold text-orange-600 transition-colors hover:bg-orange-50"
          >
            Ver {manta.label} no catálogo <ArrowRight size={16} />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
