import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BotaoCotarWhatsApp } from "@/components/site/BotaoCotarWhatsApp";

const TELHADOS = [
  { id: "1", label: "1 água", fator: 1 },
  { id: "2", label: "2 águas", fator: 2 },
  { id: "4", label: "4 águas", fator: 4 },
] as const;

const TELHAS = [
  { id: "fibrocimento", label: "Fibrocimento", ripa: false, terca: 1.6 },
  { id: "ceramica", label: "Cerâmica / Barro", ripa: true, terca: 1.5 },
  { id: "concreto", label: "Concreto", ripa: true, terca: 1.4 },
  { id: "colonial-pvc", label: "Colonial PVC", ripa: true, terca: 1.5 },
  { id: "esmaltada", label: "Esmaltada", ripa: true, terca: 1.5 },
] as const;

const MADEIRAS = [
  { id: "cambara", label: "Cambará aparelhado", slug: "cambara" },
  { id: "pinus", label: "Pinus", slug: "pinus" },
  { id: "eucalipto", label: "Eucalipto autoclavado", slug: "eucalipto" },
  { id: "garapeira", label: "Garapeira", slug: "garapeira" },
  { id: "peroba", label: "Peroba do Norte", slug: "peroba" },
] as const;

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

export function CalculadoraMadeiramento() {
  const [aguas, setAguas] = useState<string>("2");
  const [largura, setLargura] = useState(8);
  const [comprimento, setComprimento] = useState(10);
  const [inclinacao, setInclinacao] = useState(30);
  const [telha, setTelha] = useState<string>("ceramica");
  const [madeira, setMadeira] = useState<string>("cambara");

  // espaçamentos configuráveis (m)
  const [espTerca, setEspTerca] = useState(1.5);
  const [espCaibro, setEspCaibro] = useState(0.5);
  const [espRipa, setEspRipa] = useState(0.33);
  const [perda, setPerda] = useState(10);

  const telhaSel = TELHAS.find((t) => t.id === telha) ?? TELHAS[0];
  const madeiraSel = MADEIRAS.find((m) => m.id === madeira) ?? MADEIRAS[0];

  const r = useMemo(() => {
    const L = Math.max(0, largura || 0);
    const C = Math.max(0, comprimento || 0);
    const incl = Math.max(0, inclinacao || 0);
    const fatorIncl = Math.sqrt(1 + Math.pow(incl / 100, 2));
    const areaBase = L * C;
    const areaTelhado = areaBase * fatorIncl;

    // vão coberto por água
    const nAguas = aguas === "1" ? 1 : aguas === "2" ? 2 : 4;
    const larguraAgua = nAguas === 1 ? L : L / 2;
    const rampa = larguraAgua * fatorIncl;

    const et = Math.max(0.5, espTerca || telhaSel.terca);
    const ec = Math.max(0.3, espCaibro || 0.5);
    const er = Math.max(0.15, espRipa || 0.33);

    // Terças (vigas): linhas paralelas à cumeeira, por água
    const linhasTerca = Math.ceil(rampa / et) + 1;
    const mlTerca = linhasTerca * C * (nAguas >= 2 ? 2 : 1);

    // Caibros: perpendiculares às terças, ao longo do comprimento
    const linhasCaibro = Math.ceil(C / ec) + 1;
    const mlCaibro = linhasCaibro * rampa * (nAguas >= 2 ? 2 : 1);

    // Ripas: só para telhas que exigem ripamento
    const linhasRipa = telhaSel.ripa ? Math.ceil(rampa / er) + 1 : 0;
    const mlRipa = linhasRipa * C * (nAguas >= 2 ? 2 : 1);

    // Cumeeira / cavalete estrutural
    const mlCumeeira = nAguas >= 2 ? C : 0;

    const f = 1 + Math.max(0, perda || 0) / 100;
    const round = (n: number) => Math.ceil(n * f);

    return {
      areaBase,
      areaTelhado,
      itens: [
        {
          nome: `Terça / viga 6×12 — ${madeiraSel.label}`,
          detalhe: `Espaçamento ${et.toFixed(2)} m · ${linhasTerca} linhas por água`,
          ml: round(mlTerca),
        },
        {
          nome: `Caibro 5×6 — ${madeiraSel.label}`,
          detalhe: `Espaçamento ${ec.toFixed(2)} m · ${linhasCaibro} peças`,
          ml: round(mlCaibro),
        },
        ...(telhaSel.ripa
          ? [
              {
                nome: `Ripa 1,5×5 — ${madeiraSel.label}`,
                detalhe: `Espaçamento ${er.toFixed(2)} m · ${linhasRipa} linhas por água`,
                ml: round(mlRipa),
              },
            ]
          : []),
        ...(mlCumeeira
          ? [
              {
                nome: `Cavalete / peça de cumeeira — ${madeiraSel.label}`,
                detalhe: "Linha de topo entre as águas",
                ml: round(mlCumeeira),
              },
            ]
          : []),
      ],
    };
  }, [
    largura,
    comprimento,
    inclinacao,
    aguas,
    espTerca,
    espCaibro,
    espRipa,
    perda,
    telhaSel,
    madeiraSel,
  ]);

  const chip = (ativo: boolean) =>
    `rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
      ativo ? "bg-orange-600 text-white" : "border border-gray-200 bg-white text-gray-600"
    }`;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
      <h3 className="text-lg font-extrabold text-primary">Calculadora de Madeiramento</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Estime terças, caibros e ripas do seu telhado com espaçamento configurável e conecte direto
        com o catálogo de madeiramento.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <span className="text-xs font-bold text-gray-600 uppercase">Tipo de telhado</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {TELHADOS.map((t) => (
              <button key={t.id} type="button" onClick={() => setAguas(t.id)} className={chip(aguas === t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <Campo label="Largura da base" valor={largura} onChange={setLargura} sufixo="m" />
        <Campo label="Comprimento da base" valor={comprimento} onChange={setComprimento} sufixo="m" />
        <Campo label="Inclinação" valor={inclinacao} onChange={setInclinacao} sufixo="%" passo={1} />
        <Campo label="Perda / recorte" valor={perda} onChange={setPerda} sufixo="%" passo={1} />

        <div className="sm:col-span-2">
          <span className="text-xs font-bold text-gray-600 uppercase">Tipo de telha</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {TELHAS.map((t) => (
              <button key={t.id} type="button" onClick={() => setTelha(t.id)} className={chip(telha === t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <span className="text-xs font-bold text-gray-600 uppercase">Madeira desejada</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {MADEIRAS.map((m) => (
              <button key={m.id} type="button" onClick={() => setMadeira(m.id)} className={chip(madeira === m.id)}>
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <details className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
        <summary className="cursor-pointer text-xs font-extrabold text-gray-700 uppercase">
          Espaçamentos avançados
        </summary>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Campo label="Entre terças" valor={espTerca} onChange={setEspTerca} sufixo="m" />
          <Campo label="Entre caibros" valor={espCaibro} onChange={setEspCaibro} sufixo="m" />
          <Campo label="Entre ripas" valor={espRipa} onChange={setEspRipa} sufixo="m" />
        </div>
      </details>

      <div className="mt-6 rounded-2xl bg-gray-50 p-5">
        <p className="text-xs font-bold text-gray-600 uppercase">Resultado estimado</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Área de base {r.areaBase.toFixed(1)} m² · área real do telhado{" "}
          <strong className="text-primary">{r.areaTelhado.toFixed(1)} m²</strong>
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
          {r.itens.map((i, idx) => (
            <div
              key={i.nome}
              className={`flex items-center justify-between gap-3 p-3.5 ${idx % 2 ? "bg-gray-50" : "bg-white"}`}
            >
              <div>
                <p className="text-sm font-bold text-primary">{i.nome}</p>
                <p className="text-xs text-muted-foreground">{i.detalhe}</p>
              </div>
              <span className="shrink-0 rounded-lg bg-orange-100 px-3 py-1.5 text-sm font-extrabold text-orange-700">
                {i.ml} m
              </span>
            </div>
          ))}
        </div>

        <p className="mt-3 text-[11px] text-muted-foreground">
          Valores estimados em metro linear, já com {perda || 0}% de perda. A conferência final é
          feita pelo nosso comercial conforme o projeto.
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Link
            to="/catalogo/$categoriaSlug/$produtoSlug"
            params={{ categoriaSlug: "madeiramento", produtoSlug: madeiraSel.slug }}
            className="flex items-center justify-center gap-2 rounded-xl border border-orange-300 bg-white py-3.5 text-sm font-bold text-orange-700 transition-colors hover:bg-orange-50"
          >
            Ver {madeiraSel.label} no catálogo
            <ArrowRight size={16} />
          </Link>
          <BotaoCotarWhatsApp
            nomeProduto="Calculadora de Madeiramento"
            tipo="calculadora"
            corpoMensagem={[
              "*ORÇAMENTO — MADEIRAMENTO DE TELHADO*",
              "",
              `Telhado: ${TELHADOS.find((t) => t.id === aguas)?.label} · ${largura} × ${comprimento} m · ${inclinacao}% de inclinação`,
              `Telha prevista: ${telhaSel.label}`,
              `Madeira: ${madeiraSel.label}`,
              `Área real do telhado: ${r.areaTelhado.toFixed(1)} m²`,
              "",
              "*MATERIAIS ESTIMADOS:*",
              ...r.itens.map((i) => `• ${i.nome} — ${i.ml} m`),
              "",
              `(inclui ${perda || 0}% de perda)`,
            ].join("\n")}
          >
            Cotar madeiramento no WhatsApp
          </BotaoCotarWhatsApp>
        </div>
      </div>
    </div>
  );
}

export default CalculadoraMadeiramento;
