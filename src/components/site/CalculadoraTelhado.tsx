import { useEffect, useState } from "react";
import { useCalcDims } from "@/components/site/calc-dims";
import { Calculator, MessageCircle, AlertTriangle, Download, Scale, Wallet } from "lucide-react";
import ModalCotarWhatsApp from "@/components/ModalCotarWhatsApp";

type Telha = {
  id: string;
  label: string;
  grupo: string;
  /** peças por m² de telhado inclinado */
  rendimento: number;
  /** inclinação mínima em % */
  min: number;
  familia: "fibrocimento" | "pvc" | "ceramica" | "policarbonato" | "concreto" | "translucida";
  /** peso aproximado da cobertura em kg por m² */
  pesoM2: number;
  /** faixa aproximada de investimento em R$ por m² (somente telha) */
  precoMin: number;
  precoMax: number;
};

const TELHAS: Telha[] = [
  { id: "fib-153", label: "Fibrocimento 1,53 m", grupo: "Fibrocimento INFIBRA", rendimento: 0.67, min: 10, familia: "fibrocimento", pesoM2: 18, precoMin: 35, precoMax: 55 },
  { id: "fib-183", label: "Fibrocimento 1,83 m", grupo: "Fibrocimento INFIBRA", rendimento: 0.56, min: 10, familia: "fibrocimento", pesoM2: 18, precoMin: 35, precoMax: 55 },
  { id: "fib-244", label: "Fibrocimento 2,44 m ★", grupo: "Fibrocimento INFIBRA", rendimento: 0.42, min: 10, familia: "fibrocimento", pesoM2: 18, precoMin: 35, precoMax: 55 },
  { id: "fib-305", label: "Fibrocimento 3,05 m", grupo: "Fibrocimento INFIBRA", rendimento: 0.34, min: 10, familia: "fibrocimento", pesoM2: 18, precoMin: 35, precoMax: 55 },
  { id: "fib-366", label: "Fibrocimento 3,66 m", grupo: "Fibrocimento INFIBRA", rendimento: 0.28, min: 10, familia: "fibrocimento", pesoM2: 18, precoMin: 35, precoMax: 55 },

  { id: "pvc-230", label: "Colonial PVC 2,30 m", grupo: "Colonial PVC", rendimento: 0.58, min: 15, familia: "pvc", pesoM2: 9, precoMin: 75, precoMax: 110 },
  { id: "pvc-328", label: "Colonial PVC 3,28 m", grupo: "Colonial PVC", rendimento: 0.41, min: 15, familia: "pvc", pesoM2: 9, precoMin: 75, precoMax: 110 },
  { id: "pvc-459", label: "Colonial PVC 4,59 m", grupo: "Colonial PVC", rendimento: 0.3, min: 15, familia: "pvc", pesoM2: 9, precoMin: 75, precoMax: 110 },
  { id: "pvc-525", label: "Colonial PVC 5,25 m", grupo: "Colonial PVC", rendimento: 0.26, min: 15, familia: "pvc", pesoM2: 9, precoMin: 75, precoMax: 110 },

  { id: "cer-port", label: "Portuguesa Resinada (Isotec)", grupo: "Cerâmica", rendimento: 17, min: 30, familia: "ceramica", pesoM2: 45, precoMin: 45, precoMax: 75 },
  { id: "cer-romana", label: "Romana", grupo: "Cerâmica", rendimento: 16, min: 30, familia: "ceramica", pesoM2: 45, precoMin: 45, precoMax: 75 },
  { id: "cer-amer", label: "Americana", grupo: "Cerâmica", rendimento: 12.5, min: 30, familia: "ceramica", pesoM2: 42, precoMin: 45, precoMax: 75 },

  { id: "pol-183", label: "Policarbonato 1,83 m", grupo: "Policarbonato", rendimento: 0.56, min: 10, familia: "policarbonato", pesoM2: 3.5, precoMin: 120, precoMax: 190 },
  { id: "pol-244", label: "Policarbonato 2,44 m", grupo: "Policarbonato", rendimento: 0.42, min: 10, familia: "policarbonato", pesoM2: 3.5, precoMin: 120, precoMax: 190 },
  { id: "pol-305", label: "Policarbonato 3,05 m", grupo: "Policarbonato", rendimento: 0.34, min: 10, familia: "policarbonato", pesoM2: 3.5, precoMin: 120, precoMax: 190 },
  { id: "pol-366", label: "Policarbonato 3,66 m", grupo: "Policarbonato", rendimento: 0.28, min: 10, familia: "policarbonato", pesoM2: 3.5, precoMin: 120, precoMax: 190 },

  { id: "con-euro", label: "Concreto Eurotop", grupo: "Concreto", rendimento: 10.5, min: 30, familia: "concreto", pesoM2: 48, precoMin: 55, precoMax: 85 },

  { id: "tra-244", label: "Translúcida Polipropileno 2,44 m", grupo: "Translúcida", rendimento: 0.42, min: 10, familia: "translucida", pesoM2: 3, precoMin: 90, precoMax: 140 },
  { id: "tra-366", label: "Translúcida Polipropileno 3,66 m", grupo: "Translúcida", rendimento: 0.28, min: 10, familia: "translucida", pesoM2: 3, precoMin: 90, precoMax: 140 },
];

const GRUPOS = Array.from(new Set(TELHAS.map((t) => t.grupo)));

const ESPECIES = [
  { id: "cambara", label: "Cambará Rosa ★" },
  { id: "eucalipto", label: "Eucalipto Tratado" },
  { id: "pinus", label: "Pinus Tratado" },
];

type Tipo = "1agua" | "2aguas" | "4aguas";

function IconTelhado({ tipo, ativo }: { tipo: Tipo; ativo: boolean }) {
  const stroke = ativo ? "#ea580c" : "#94a3b8";
  return (
    <svg viewBox="0 0 80 48" className="h-12 w-full" fill="none" aria-hidden="true">
      {tipo === "1agua" && (
        <>
          <path d="M8 36 L72 14" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M8 36 L8 44 M72 14 L72 44" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" opacity=".5" />
        </>
      )}
      {tipo === "2aguas" && (
        <>
          <path d="M6 36 L40 12 L74 36" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 36 L6 44 M74 36 L74 44" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" opacity=".5" />
        </>
      )}
      {tipo === "4aguas" && (
        <>
          <path d="M6 36 L22 14 L58 14 L74 36 Z" stroke={stroke} strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M22 14 L58 14" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M6 36 L74 36" stroke={stroke} strokeWidth="2" opacity=".5" />
        </>
      )}
    </svg>
  );
}

const TIPOS: { id: Tipo; label: string }[] = [
  { id: "1agua", label: "1 água" },
  { id: "2aguas", label: "2 águas" },
  { id: "4aguas", label: "4 águas" },
];

type Item = { nome: string; qtd: string };

type Comparativo = {
  telha: Telha;
  pecas: number;
  peso: number;
  custoMin: number;
  custoMax: number;
};

export function CalculadoraTelhado() {
  const { setDims } = useCalcDims();
  const [tipo, setTipo] = useState<Tipo>("2aguas");
  const [comprimento, setComprimento] = useState("");
  const [largura, setLargura] = useState("");
  const [incl, setIncl] = useState(30);
  const [telhaId, setTelhaId] = useState("fib-244");
  const [comEstrutura, setComEstrutura] = useState(false);
  const [comCalhas, setComCalhas] = useState(true);
  const [especie, setEspecie] = useState("cambara");
  const [espacamento, setEspacamento] = useState("0.50");
  const [res, setRes] = useState<null | {
    areaBase: number;
    areaIncl: number;
    perimetro: number;
    telhas: number;
    alturaCumeeira: number;
    caibro: number;
    itens: Item[];
    estrutura: Item[];
    calhas: Item[];
    telha: Telha;
    peso: number;
    custoMin: number;
    custoMax: number;
    comparativo: Comparativo[];
  }>(null);
  const [modal, setModal] = useState(false);

  const telha = TELHAS.find((t) => t.id === telhaId)!;
  const avisoIncl = incl < telha.min;

  const num = (v: string) => Number(v.replace(",", ".")) || 0;

  const calcular = () => {
    const c = num(comprimento);
    const l = num(largura);
    if (c <= 0 || l <= 0) return;

    const areaBase = c * l;
    const perimetro = 2 * (c + l);
    const fator = Math.sqrt(1 + Math.pow(incl / 100, 2));
    const areaIncl = areaBase * fator * (tipo === "4aguas" ? 1.08 : 1);
    const telhas = Math.ceil(areaIncl * telha.rendimento * 1.1);
    const alturaCumeeira = (l / 2) * (incl / 100);
    const caibro = Math.sqrt(Math.pow(l / 2, 2) + Math.pow(alturaCumeeira, 2));

    const itens: Item[] = [];
    if (telha.familia === "fibrocimento" || telha.familia === "policarbonato" || telha.familia === "translucida") {
      itens.push({ nome: "Parafuso 8x110mm com vedação", qtd: `${Math.ceil(telhas * 2.2)} un` });
      itens.push({ nome: "Manta térmica aluminizada", qtd: `${Math.ceil(areaIncl)} m²` });
      itens.push({ nome: "Cumeeira normal fibrocimento", qtd: `${Math.ceil(c / 0.9)} un` });
    } else if (telha.familia === "pvc") {
      itens.push({ nome: "Kit de fixação PVC (parafuso + vedação)", qtd: `${Math.ceil(telhas / 20)} kit(s)` });
      itens.push({ nome: "Cumeeira Colonial PVC", qtd: `${Math.ceil(c / 0.86)} un` });
    } else {
      itens.push({ nome: "Prego telheiro / arame de amarração", qtd: `${Math.ceil(areaIncl * 1.5)} un` });
      itens.push({ nome: "Cumeeira de barro", qtd: `${Math.ceil(c / 0.33)} un` });
    }

    const estrutura: Item[] = [];
    if (comEstrutura) {
      const esp = Number(espacamento);
      const nomeEsp = ESPECIES.find((e) => e.id === especie)!.label.replace(" ★", "");
      const linhasCaibro = Math.ceil(c / esp) + 1;
      const aguas = tipo === "1agua" ? 1 : 2;
      const mCaibro = linhasCaibro * caibro * aguas;
      const mViga = c * (tipo === "1agua" ? 2 : 3);
      const mRipa = areaIncl / 0.35;
      const kgPregos = areaIncl * 0.12;
      estrutura.push({ nome: `Caibro 5x7 cm — ${nomeEsp}`, qtd: `${Math.ceil(mCaibro)} m lineares` });
      estrutura.push({ nome: `Viga 5x15 cm — ${nomeEsp}`, qtd: `${Math.ceil(mViga)} m lineares` });
      estrutura.push({ nome: `Ripa 1,5x5 cm — ${nomeEsp}`, qtd: `${Math.ceil(mRipa)} m lineares` });
      estrutura.push({ nome: "Prego polido 18x27", qtd: `${kgPregos.toFixed(1)} kg` });
    }

    // ---- Calhas e rufos ----
    const calhas: Item[] = [];
    if (comCalhas) {
      // beirais que recebem calha e oitões/encontros que recebem rufo
      const mCalha = tipo === "1agua" ? c : tipo === "2aguas" ? c * 2 : perimetro;
      const mRufo = tipo === "1agua" ? c + 2 * l : tipo === "2aguas" ? 2 * l : 0;
      const lances = Math.ceil(mCalha / 6); // barras/lances de ~6 m
      const suportes = Math.ceil(mCalha / 0.8);
      const saidas = Math.max(1, Math.ceil(mCalha / 10));
      const cabeceiras = tipo === "4aguas" ? 0 : lances * 2;
      const condutor = Math.ceil(saidas * 3);

      calhas.push({ nome: "Calha (metro linear)", qtd: `${Math.ceil(mCalha)} m` });
      if (mRufo > 0) calhas.push({ nome: "Rufo / testeira (metro linear)", qtd: `${Math.ceil(mRufo)} m` });
      if (tipo === "4aguas") calhas.push({ nome: "Água furtada (encontro de águas)", qtd: `${Math.ceil(l)} m` });
      calhas.push({ nome: "Suporte de calha (a cada 80 cm)", qtd: `${suportes} un` });
      calhas.push({ nome: "Saída / bocal de calha", qtd: `${saidas} un` });
      if (cabeceiras > 0) calhas.push({ nome: "Cabeceira (tampa de extremidade)", qtd: `${cabeceiras} un` });
      calhas.push({ nome: "Tubo condutor de descida", qtd: `${condutor} m` });
      calhas.push({ nome: "Veda calha PU / silicone", qtd: `${Math.max(1, Math.ceil(lances / 2))} un` });
    }

    const peso = areaIncl * telha.pesoM2;
    const custoMin = areaIncl * telha.precoMin;
    const custoMax = areaIncl * telha.precoMax * (comEstrutura ? 1.45 : 1.15);

    const baseComparacao = ["fib-244", "pvc-328", "cer-port"];
    const idsComp = baseComparacao.includes(telha.id)
      ? baseComparacao
      : [telha.id, ...baseComparacao].slice(0, 3);
    const comparativo: Comparativo[] = idsComp.map((id) => {
      const t = TELHAS.find((x) => x.id === id)!;
      return {
        telha: t,
        pecas: Math.ceil(areaIncl * t.rendimento * 1.1),
        peso: areaIncl * t.pesoM2,
        custoMin: areaIncl * t.precoMin,
        custoMax: areaIncl * t.precoMax,
      };
    });

    setRes({
      areaBase,
      areaIncl,
      perimetro,
      telhas,
      alturaCumeeira,
      caibro,
      itens,
      estrutura,
      calhas,
      telha,
      peso,
      custoMin,
      custoMax,
      comparativo,
    });
  };

  const fmt = (n: number, d = 2) => n.toLocaleString("pt-BR", { maximumFractionDigits: d });
  const brl = (n: number) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

  const mensagem = res
    ? [
        `Telhado`,
        `- Área da base: ${fmt(res.areaBase)} m²`,
        `- Área inclinada: ${fmt(res.areaIncl)} m²`,
        `- Perímetro: ${fmt(res.perimetro)} m`,
        `- Tipo: ${TIPOS.find((t) => t.id === tipo)!.label} — Inclinação ${incl}%`,
        `- Telha escolhida: ${res.telha.label} (${res.telha.grupo})`,
        `- Peso estimado da cobertura: ${fmt(res.peso, 0)} kg`,
        `- Faixa estimada de investimento: ${brl(res.custoMin)} a ${brl(res.custoMax)}`,
        ``,
        `📋 *MATERIAIS ESTIMADOS*`,
        `- ${res.telha.label} — Qtd: ${res.telhas} un`,
        ...res.itens.map((i) => `- ${i.nome} — Qtd: ${i.qtd}`),
        ...(res.calhas.length
          ? ["", "*Calhas e rufos:*", ...res.calhas.map((i) => `- ${i.nome} — Qtd: ${i.qtd}`)]
          : []),
        ...(res.estrutura.length
          ? ["", "*Estrutura de madeira:*", ...res.estrutura.map((i) => `- ${i.nome} — Qtd: ${i.qtd}`)]
          : []),
      ].join("\n")
    : "";

  const baixarPdf = () => {
    if (!res) return;
    const linha = (i: Item) => `<tr><td>${i.nome}</td><td class="q">${i.qtd}</td></tr>`;
    const bloco = (titulo: string, itens: Item[]) =>
      itens.length
        ? `<h2>${titulo}</h2><table>${itens.map(linha).join("")}</table>`
        : "";
    const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<title>Calculo de telhado - Rocha Telhas</title>
<style>
  body{font-family:Arial,Helvetica,sans-serif;color:#111;margin:32px;font-size:13px}
  h1{color:#ea580c;font-size:20px;margin:0 0 4px}
  h2{font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:#6b7280;margin:22px 0 6px}
  table{width:100%;border-collapse:collapse}
  td{border-bottom:1px solid #eee;padding:6px 4px}
  td.q{text-align:right;font-weight:bold;color:#ea580c;white-space:nowrap}
  .grid{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
  .box{border:1px solid #eee;border-radius:8px;padding:8px 12px;min-width:150px}
  .box b{display:block;font-size:15px}
  .small{color:#6b7280;font-size:11px;margin-top:18px}
</style></head><body>
<h1>Rocha Telhas — Cálculo de telhado</h1>
<div>${TIPOS.find((t) => t.id === tipo)!.label} · inclinação ${incl}% · ${res.telha.label}</div>
<div class="grid">
  <div class="box"><span>Área da base</span><b>${fmt(res.areaBase)} m²</b></div>
  <div class="box"><span>Área inclinada</span><b>${fmt(res.areaIncl)} m²</b></div>
  <div class="box"><span>Perímetro</span><b>${fmt(res.perimetro)} m</b></div>
  <div class="box"><span>Peso da cobertura</span><b>${fmt(res.peso, 0)} kg</b></div>
  <div class="box"><span>Investimento estimado</span><b>${brl(res.custoMin)} – ${brl(res.custoMax)}</b></div>
</div>
${bloco("Cobertura", [{ nome: res.telha.label, qtd: `${res.telhas} un` }, ...res.itens])}
${bloco("Calhas e rufos", res.calhas)}
${bloco("Estrutura de madeira", res.estrutura)}
<p class="small">Estimativa de referência gerada automaticamente. Valores e quantidades são conferidos pela equipe técnica na cotação final.</p>
</body></html>`;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  };

  const card = "rounded-xl border border-gray-200 bg-white p-5";
  const passo = "text-xs font-bold uppercase tracking-wider text-orange-600";

  return (
    <div className="space-y-4">
      {/* Passo 1 */}
      <div className={card}>
        <p className={passo}>Passo 1 · Tipo de telhado</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {TIPOS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTipo(t.id)}
              className={`rounded-xl border-2 p-2 transition-all ${
                tipo === t.id ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"
              }`}
            >
              <IconTelhado tipo={t.id} ativo={tipo === t.id} />
              <span className={`mt-1 block text-xs font-bold ${tipo === t.id ? "text-orange-600" : "text-gray-600"}`}>
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Passo 2 */}
      <div className={card}>
        <p className={passo}>Passo 2 · Dimensões da base</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">Comprimento (m)</label>
            <input
              inputMode="decimal"
              value={comprimento}
              onChange={(e) => setComprimento(e.target.value)}
              placeholder="Ex.: 12"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">Largura (m)</label>
            <input
              inputMode="decimal"
              value={largura}
              onChange={(e) => setLargura(e.target.value)}
              placeholder="Ex.: 8"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Passo 3 */}
      <div className={card}>
        <div className="flex items-center justify-between">
          <p className={passo}>Passo 3 · Inclinação</p>
          <span
            className={`rounded-lg px-2.5 py-1 text-sm font-extrabold ${
              avisoIncl ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
            }`}
          >
            {incl}%
          </span>
        </div>
        <input
          type="range"
          min={10}
          max={60}
          step={5}
          value={incl}
          onChange={(e) => setIncl(Number(e.target.value))}
          className={`mt-3 w-full ${avisoIncl ? "accent-red-600" : "accent-orange-600"}`}
          aria-label="Inclinação do telhado"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {["Cerâmica mín. 30%", "Fibrocimento mín. 10%", "PVC Colonial mín. 15%"].map((c) => (
            <span key={c} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
              {c}
            </span>
          ))}
        </div>

        {/* Validação ativa em tempo real */}
        {avisoIncl && (
          <div className="mt-3 flex gap-2 rounded-lg border border-red-300 bg-red-50 p-3" role="alert">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
            <div className="text-xs text-red-800">
              <p className="font-bold">Inclinação abaixo do mínimo técnico</p>
              <p className="mt-0.5 font-medium">
                {telha.label} exige no mínimo <b>{telha.min}%</b> de caimento. Com {incl}% há risco real de retorno de
                água e infiltração nas emendas.
              </p>
              <button
                type="button"
                onClick={() => setIncl(Math.ceil(telha.min / 5) * 5)}
                className="mt-2 rounded-lg bg-red-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-red-700"
              >
                Ajustar para {Math.ceil(telha.min / 5) * 5}%
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Passo 4 */}
      <div className={card}>
        <p className={passo}>Passo 4 · Tipo de telha</p>
        <select
          value={telhaId}
          onChange={(e) => setTelhaId(e.target.value)}
          className="mt-3 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none"
        >
          {GRUPOS.map((g) => (
            <optgroup key={g} label={g}>
              {TELHAS.filter((t) => t.grupo === g).map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <p className="mt-3 text-xs text-gray-500">
          Inclinação mínima desta telha: <b className="text-gray-700">{telha.min}%</b> · peso aproximado{" "}
          <b className="text-gray-700">{telha.pesoM2} kg/m²</b> · a partir de{" "}
          <b className="text-gray-700">{brl(telha.precoMin)}/m²</b>
        </p>
      </div>

      {/* Passo 5 */}
      <div className={card}>
        <div className="flex items-center justify-between gap-3">
          <p className={passo}>Passo 5 · Incluir calhas, rufos e acessórios?</p>
          <button
            type="button"
            role="switch"
            aria-checked={comCalhas}
            onClick={() => setComCalhas((v) => !v)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${comCalhas ? "bg-orange-600" : "bg-gray-300"}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${comCalhas ? "left-5.5" : "left-0.5"}`}
            />
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Calculamos o metro linear de calha e rufo pelo perímetro do telhado e sugerimos suportes, saídas e cabeceiras
          na proporção correta.
        </p>
      </div>

      {/* Passo 6 */}
      <div className={card}>
        <div className="flex items-center justify-between gap-3">
          <p className={passo}>Passo 6 · Calcular estrutura de madeira também?</p>
          <button
            type="button"
            role="switch"
            aria-checked={comEstrutura}
            onClick={() => setComEstrutura((v) => !v)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${comEstrutura ? "bg-orange-600" : "bg-gray-300"}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${comEstrutura ? "left-5.5" : "left-0.5"}`}
            />
          </button>
        </div>
        {comEstrutura && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">Espécie da madeira</label>
              <select
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none"
              >
                {ESPECIES.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">Espaçamento entre caibros</label>
              <select
                value={espacamento}
                onChange={(e) => setEspacamento(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none"
              >
                <option value="0.40">0,40 m</option>
                <option value="0.50">0,50 m</option>
                <option value="0.60">0,60 m</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={calcular}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 py-4 text-sm font-bold text-white transition-colors hover:bg-orange-700"
      >
        <Calculator size={18} />
        Calcular materiais
      </button>

      {res && (
        <div className="rounded-xl border border-[#fed7aa] bg-[#fff7ed] p-5">
          <p className="text-xs font-bold tracking-wider text-orange-600 uppercase">Resultado estimado</p>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {[
              { l: "Área da base", v: `${fmt(res.areaBase)} m²` },
              { l: "Área inclinada real", v: `${fmt(res.areaIncl)} m²` },
              { l: "Perímetro do telhado", v: `${fmt(res.perimetro)} m` },
              { l: "Telhas (+10% perda)", v: `${res.telhas} un` },
              { l: "Altura da cumeeira", v: `${fmt(res.alturaCumeeira)} m` },
              { l: "Comprimento do caibro", v: `${fmt(res.caibro)} m` },
            ].map((b) => (
              <div key={b.l} className="rounded-lg border border-orange-100 bg-white p-3">
                <p className="text-[11px] font-semibold text-gray-500">{b.l}</p>
                <p className="mt-0.5 text-lg font-extrabold text-gray-900">{b.v}</p>
              </div>
            ))}
          </div>

          {/* Faixa de investimento */}
          <div className="mt-4 rounded-xl border border-orange-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <Wallet size={16} className="text-orange-600" />
              <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">Faixa estimada de investimento</p>
            </div>
            <p className="mt-2 text-2xl font-extrabold text-gray-900">
              {brl(res.custoMin)} <span className="text-base font-bold text-gray-400">a</span> {brl(res.custoMax)}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
              <Scale size={13} /> Peso estimado da cobertura: <b className="text-gray-700">{fmt(res.peso, 0)} kg</b>
            </p>
            <p className="mt-2 text-[11px] text-gray-500">
              Valor de referência “a partir de”, considerando telha{comCalhas ? ", calhas" : ""}
              {comEstrutura ? " e estrutura" : " e acessórios básicos"}. Não é preço fechado — o valor final sai na
              cotação.
            </p>
          </div>

          <p className="mt-5 text-xs font-bold tracking-wider text-gray-500 uppercase">Lista sugerida</p>
          <ul className="mt-2 divide-y divide-orange-100 rounded-lg border border-orange-100 bg-white">
            <li className="flex items-center justify-between gap-3 p-3">
              <span className="text-sm text-gray-700">{res.telha.label}</span>
              <span className="shrink-0 text-sm font-bold text-orange-600">{res.telhas} un</span>
            </li>
            {res.itens.map((i) => (
              <li key={i.nome} className="flex items-center justify-between gap-3 p-3">
                <span className="text-sm text-gray-700">{i.nome}</span>
                <span className="shrink-0 text-sm font-bold text-orange-600">{i.qtd}</span>
              </li>
            ))}
          </ul>

          {res.calhas.length > 0 && (
            <>
              <p className="mt-5 text-xs font-bold tracking-wider text-gray-500 uppercase">Calhas, rufos e acessórios</p>
              <ul className="mt-2 divide-y divide-orange-100 rounded-lg border border-orange-100 bg-white">
                {res.calhas.map((i) => (
                  <li key={i.nome} className="flex items-center justify-between gap-3 p-3">
                    <span className="text-sm text-gray-700">{i.nome}</span>
                    <span className="shrink-0 text-sm font-bold text-orange-600">{i.qtd}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/catalogo/calhas"
                className="mt-2 inline-block text-xs font-bold text-orange-600 hover:underline"
              >
                Ver linha completa de calhas e rufos →
              </a>
            </>
          )}

          {res.estrutura.length > 0 && (
            <>
              <p className="mt-5 text-xs font-bold tracking-wider text-gray-500 uppercase">Estrutura de madeira</p>
              <ul className="mt-2 divide-y divide-orange-100 rounded-lg border border-orange-100 bg-white">
                {res.estrutura.map((i) => (
                  <li key={i.nome} className="flex items-center justify-between gap-3 p-3">
                    <span className="text-sm text-gray-700">{i.nome}</span>
                    <span className="shrink-0 text-sm font-bold text-orange-600">{i.qtd}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Comparador */}
          <p className="mt-5 text-xs font-bold tracking-wider text-gray-500 uppercase">
            Comparativo para este mesmo telhado
          </p>
          <div className="mt-2 overflow-x-auto rounded-lg border border-orange-100 bg-white">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead>
                <tr className="border-b border-orange-100 text-[11px] tracking-wider text-gray-500 uppercase">
                  <th className="p-3 font-semibold">Telha</th>
                  <th className="p-3 font-semibold">Peças</th>
                  <th className="p-3 font-semibold">Peso total</th>
                  <th className="p-3 font-semibold">Custo estimado</th>
                </tr>
              </thead>
              <tbody>
                {res.comparativo.map((c) => {
                  const atual = c.telha.id === res.telha.id;
                  return (
                    <tr key={c.telha.id} className={`border-b border-orange-50 last:border-0 ${atual ? "bg-orange-50" : ""}`}>
                      <td className="p-3">
                        <span className="font-bold text-gray-900">{c.telha.grupo}</span>
                        <span className="block text-[11px] text-gray-500">
                          {c.telha.label.replace(" ★", "")} · mín. {c.telha.min}%
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-gray-700">{c.pecas} un</td>
                      <td className="p-3 font-semibold text-gray-700">{fmt(c.peso, 0)} kg</td>
                      <td className="p-3 font-bold whitespace-nowrap text-orange-600">
                        {brl(c.custoMin)} – {brl(c.custoMax)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] text-gray-500">
            Coberturas mais leves (PVC e policarbonato) exigem menos madeira; cerâmica e concreto pedem estrutura
            reforçada.
          </p>

          <p className="mt-4 text-[11px] text-gray-500">
            Estimativa de referência. Nossa equipe técnica confere as quantidades na cotação final.
          </p>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setModal(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-700"
            >
              <MessageCircle size={18} />
              Enviar lista no WhatsApp
            </button>
            <button
              type="button"
              onClick={baixarPdf}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-orange-600 bg-white py-3.5 text-sm font-bold text-orange-600 transition-colors hover:bg-orange-50"
            >
              <Download size={18} />
              Baixar resultado em PDF
            </button>
          </div>
        </div>
      )}

      <ModalCotarWhatsApp
        aberto={modal}
        onFechar={() => setModal(false)}
        corpoMensagem={mensagem}
        tipo="calculadora"
        nomeProduto="Cálculo de telhado"
      />
    </div>
  );
}
