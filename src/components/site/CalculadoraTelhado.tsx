import { useState } from "react";
import { Calculator, MessageCircle, AlertTriangle } from "lucide-react";
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
};

const TELHAS: Telha[] = [
  { id: "fib-153", label: "Fibrocimento 1,53 m", grupo: "Fibrocimento INFIBRA", rendimento: 0.67, min: 10, familia: "fibrocimento" },
  { id: "fib-183", label: "Fibrocimento 1,83 m", grupo: "Fibrocimento INFIBRA", rendimento: 0.56, min: 10, familia: "fibrocimento" },
  { id: "fib-244", label: "Fibrocimento 2,44 m ★", grupo: "Fibrocimento INFIBRA", rendimento: 0.42, min: 10, familia: "fibrocimento" },
  { id: "fib-305", label: "Fibrocimento 3,05 m", grupo: "Fibrocimento INFIBRA", rendimento: 0.34, min: 10, familia: "fibrocimento" },
  { id: "fib-366", label: "Fibrocimento 3,66 m", grupo: "Fibrocimento INFIBRA", rendimento: 0.28, min: 10, familia: "fibrocimento" },

  { id: "pvc-230", label: "Colonial PVC 2,30 m", grupo: "Colonial PVC", rendimento: 0.58, min: 15, familia: "pvc" },
  { id: "pvc-328", label: "Colonial PVC 3,28 m", grupo: "Colonial PVC", rendimento: 0.41, min: 15, familia: "pvc" },
  { id: "pvc-459", label: "Colonial PVC 4,59 m", grupo: "Colonial PVC", rendimento: 0.3, min: 15, familia: "pvc" },
  { id: "pvc-525", label: "Colonial PVC 5,25 m", grupo: "Colonial PVC", rendimento: 0.26, min: 15, familia: "pvc" },

  { id: "cer-port", label: "Portuguesa Resinada (Isotec)", grupo: "Cerâmica", rendimento: 17, min: 30, familia: "ceramica" },
  { id: "cer-romana", label: "Romana", grupo: "Cerâmica", rendimento: 16, min: 30, familia: "ceramica" },
  { id: "cer-amer", label: "Americana", grupo: "Cerâmica", rendimento: 12.5, min: 30, familia: "ceramica" },

  { id: "pol-183", label: "Policarbonato 1,83 m", grupo: "Policarbonato", rendimento: 0.56, min: 10, familia: "policarbonato" },
  { id: "pol-244", label: "Policarbonato 2,44 m", grupo: "Policarbonato", rendimento: 0.42, min: 10, familia: "policarbonato" },
  { id: "pol-305", label: "Policarbonato 3,05 m", grupo: "Policarbonato", rendimento: 0.34, min: 10, familia: "policarbonato" },
  { id: "pol-366", label: "Policarbonato 3,66 m", grupo: "Policarbonato", rendimento: 0.28, min: 10, familia: "policarbonato" },

  { id: "con-euro", label: "Concreto Eurotop", grupo: "Concreto", rendimento: 10.5, min: 30, familia: "concreto" },

  { id: "tra-244", label: "Translúcida Polipropileno 2,44 m", grupo: "Translúcida", rendimento: 0.42, min: 10, familia: "translucida" },
  { id: "tra-366", label: "Translúcida Polipropileno 3,66 m", grupo: "Translúcida", rendimento: 0.28, min: 10, familia: "translucida" },
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

export function CalculadoraTelhado() {
  const [tipo, setTipo] = useState<Tipo>("2aguas");
  const [comprimento, setComprimento] = useState("");
  const [largura, setLargura] = useState("");
  const [incl, setIncl] = useState(30);
  const [telhaId, setTelhaId] = useState("fib-244");
  const [comEstrutura, setComEstrutura] = useState(false);
  const [especie, setEspecie] = useState("cambara");
  const [espacamento, setEspacamento] = useState("0.50");
  const [res, setRes] = useState<null | {
    areaBase: number;
    areaIncl: number;
    telhas: number;
    alturaCumeeira: number;
    caibro: number;
    itens: Item[];
    estrutura: Item[];
    telha: Telha;
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
      const mRipa = (areaIncl / 0.35);
      const kgPregos = areaIncl * 0.12;
      estrutura.push({ nome: `Caibro 5x7 cm — ${nomeEsp}`, qtd: `${Math.ceil(mCaibro)} m lineares` });
      estrutura.push({ nome: `Viga 5x15 cm — ${nomeEsp}`, qtd: `${Math.ceil(mViga)} m lineares` });
      estrutura.push({ nome: `Ripa 1,5x5 cm — ${nomeEsp}`, qtd: `${Math.ceil(mRipa)} m lineares` });
      estrutura.push({ nome: "Prego polido 18x27", qtd: `${kgPregos.toFixed(1)} kg` });
    }

    setRes({ areaBase, areaIncl, telhas, alturaCumeeira, caibro, itens, estrutura, telha });
  };

  const fmt = (n: number, d = 2) => n.toLocaleString("pt-BR", { maximumFractionDigits: d });

  const mensagem = res
    ? [
        `🏠 *Cálculo de telhado — Rocha Telhas*`,
        `• Tipo: ${TIPOS.find((t) => t.id === tipo)!.label} · inclinação ${incl}%`,
        `• Área da base: ${fmt(res.areaBase)} m² · área inclinada: ${fmt(res.areaIncl)} m²`,
        ``,
        `*Materiais:*`,
        `• ${res.telhas} un — ${res.telha.label} (${res.telha.grupo})`,
        ...res.itens.map((i) => `• ${i.qtd} — ${i.nome}`),
        ...(res.estrutura.length ? ["", "*Estrutura de madeira:*", ...res.estrutura.map((i) => `• ${i.qtd} — ${i.nome}`)] : []),
      ].join("\n")
    : "";

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
          <span className="rounded-lg bg-orange-100 px-2.5 py-1 text-sm font-extrabold text-orange-600">{incl}%</span>
        </div>
        <input
          type="range"
          min={10}
          max={60}
          step={5}
          value={incl}
          onChange={(e) => setIncl(Number(e.target.value))}
          className="mt-3 w-full accent-orange-600"
          aria-label="Inclinação do telhado"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {["Cerâmica mín. 30%", "Fibrocimento mín. 10%", "PVC Colonial mín. 15%"].map((c) => (
            <span key={c} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
              {c}
            </span>
          ))}
        </div>
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
        {avisoIncl && (
          <div className="mt-3 flex gap-2 rounded-lg border border-yellow-300 bg-yellow-50 p-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600" />
            <p className="text-xs font-medium text-yellow-800">
              A inclinação de {incl}% está abaixo do mínimo de {telha.min}% recomendado para {telha.label}. Aumente a
              inclinação ou escolha outro modelo para evitar infiltrações.
            </p>
          </div>
        )}
      </div>

      {/* Passo 5 */}
      <div className={card}>
        <div className="flex items-center justify-between gap-3">
          <p className={passo}>Passo 5 · Calcular estrutura de madeira também?</p>
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

          <p className="mt-4 text-[11px] text-gray-500">
            Estimativa de referência. Nossa equipe técnica confere as quantidades na cotação final.
          </p>

          <button
            type="button"
            onClick={() => setModal(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-700"
          >
            <MessageCircle size={18} />
            Enviar lista para cotação no WhatsApp
          </button>
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
