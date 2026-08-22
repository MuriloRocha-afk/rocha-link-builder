import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BotaoCotarWhatsApp } from "@/components/site/BotaoCotarWhatsApp";

type Forro = {
  id: string;
  label: string;
  slug: string;
  /** largura útil da régua em metros */
  largura: number;
  /** comprimentos comerciais disponíveis (m) */
  comprimentos: number[];
  unidade: string;
  nota: string;
};

const FORROS: Forro[] = [
  {
    id: "pvc",
    label: "Forro PVC",
    slug: "forro-pvc",
    largura: 0.2,
    comprimentos: [3, 4, 5, 6],
    unidade: "régua",
    nota: "Régua de 20 cm útil, lavável e pronta para uso.",
  },
  {
    id: "cedrinho",
    label: "Forro Cedrinho",
    slug: "forro-cedrinho",
    largura: 0.1,
    comprimentos: [2, 2.5, 3, 3.5, 4],
    unidade: "régua",
    nota: "Régua macho-fêmea de 10 cm útil em madeira.",
  },
  {
    id: "pinus",
    label: "Forro Pinus",
    slug: "forro-pinus",
    largura: 0.1,
    comprimentos: [2, 2.5, 3, 3.5, 4],
    unidade: "régua",
    nota: "Régua de Pinus de 10 cm útil, aceita verniz e stain.",
  },
];

export function CalculadoraForro() {
  const [forroId, setForroId] = useState("pvc");
  const [largura, setLargura] = useState(3);
  const [comprimento, setComprimento] = useState(4);
  const [perda, setPerda] = useState(10);

  const forro = FORROS.find((f) => f.id === forroId) ?? FORROS[0]!;
  const [tamanho, setTamanho] = useState<number | null>(null);
  const tamanhoAtivo = forro.comprimentos.includes(tamanho ?? 0)
    ? tamanho!
    : forro.comprimentos[forro.comprimentos.length - 1]!;

  const r = useMemo(() => {
    const area = Math.max(0, (largura || 0) * (comprimento || 0));
    const fator = 1 + Math.max(0, perda || 0) / 100;
    const areaComPerda = area * fator;
    const areaRegua = forro.largura * tamanhoAtivo;
    const pecas = areaRegua > 0 ? Math.ceil(areaComPerda / areaRegua) : 0;
    const perimetro = 2 * ((largura || 0) + (comprimento || 0));
    return {
      area,
      areaComPerda,
      pecas,
      metrosLineares: Math.ceil(pecas * tamanhoAtivo),
      acabamento: Math.ceil(perimetro * fator),
    };
  }, [largura, comprimento, perda, forro, tamanhoAtivo]);

  const chip = (ativo: boolean) =>
    `rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
      ativo ? "bg-orange-600 text-white" : "border border-gray-200 bg-white text-gray-600"
    }`;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
      <h3 className="text-lg font-extrabold text-primary">Calculadora de Forro</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Informe o ambiente e descubra quantas réguas de forro você precisa, já com perda de recorte.
      </p>

      <div className="mt-6">
        <span className="text-xs font-bold text-gray-600 uppercase">Tipo de forro</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {FORROS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                setForroId(f.id);
                setTamanho(null);
              }}
              className={chip(forroId === f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{forro.nota}</p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Largura do ambiente", v: largura, set: setLargura, s: "m" },
          { label: "Comprimento do ambiente", v: comprimento, set: setComprimento, s: "m" },
          { label: "Perda / recorte", v: perda, set: setPerda, s: "%" },
        ].map((c) => (
          <label key={c.label} className="block">
            <span className="text-xs font-bold text-gray-600 uppercase">{c.label}</span>
            <div className="mt-1 flex items-center rounded-xl border border-gray-200 bg-white">
              <input
                type="number"
                min={0}
                step={c.s === "%" ? 1 : 0.1}
                value={Number.isFinite(c.v) ? c.v : ""}
                onChange={(e) => c.set(parseFloat(e.target.value))}
                className="w-full rounded-xl bg-transparent px-3 py-2.5 text-sm font-semibold text-primary outline-none"
              />
              <span className="pr-3 text-xs font-bold text-gray-400">{c.s}</span>
            </div>
          </label>
        ))}
      </div>

      <div className="mt-5">
        <span className="text-xs font-bold text-gray-600 uppercase">Comprimento da régua</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {forro.comprimentos.map((c) => (
            <button key={c} type="button" onClick={() => setTamanho(c)} className={chip(tamanhoAtivo === c)}>
              {c.toString().replace(".", ",")} m
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-gray-50 p-5">
        <p className="text-xs font-bold text-gray-600 uppercase">Resultado estimado</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {[
            { t: "Área do ambiente", v: `${r.area.toFixed(1)} m²` },
            { t: `${forro.unidade}s de ${tamanhoAtivo.toString().replace(".", ",")} m`, v: `${r.pecas} pçs` },
            { t: "Acabamento perimetral", v: `${r.acabamento} m` },
          ].map((k) => (
            <div key={k.t} className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-[11px] font-bold text-gray-500 uppercase">{k.t}</p>
              <p className="mt-1 text-xl font-extrabold text-primary">{k.v}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Cálculo com {perda || 0}% de perda ({r.areaComPerda.toFixed(1)} m² de forro), equivalente a{" "}
          {r.metrosLineares} m lineares de régua. Considere também meia-cana e pregos sem cabeça.
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Link
            to="/catalogo/$categoriaSlug/$produtoSlug"
            params={{ categoriaSlug: "madeiramento", produtoSlug: forro.slug }}
            className="flex items-center justify-center gap-2 rounded-xl border border-orange-300 bg-white py-3.5 text-sm font-bold text-orange-700 transition-colors hover:bg-orange-50"
          >
            Ver {forro.label} no catálogo
            <ArrowRight size={16} />
          </Link>
          <BotaoCotarWhatsApp
            nomeProduto="Calculadora de Forro"
            tipo="calculadora"
            corpoMensagem={[
              "*ORÇAMENTO — FORRO*",
              "",
              `Produto: ${forro.label}`,
              `Ambiente: ${largura} × ${comprimento} m (${r.area.toFixed(1)} m²)`,
              "",
              "*MATERIAIS ESTIMADOS:*",
              `• ${r.pecas} ${forro.unidade}s de ${tamanhoAtivo.toString().replace(".", ",")} m`,
              `• ${r.acabamento} m de acabamento / meia-cana`,
              "",
              `(inclui ${perda || 0}% de perda)`,
            ].join("\n")}
          >
            Cotar forro no WhatsApp
          </BotaoCotarWhatsApp>
        </div>
      </div>
    </div>
  );
}

export default CalculadoraForro;
