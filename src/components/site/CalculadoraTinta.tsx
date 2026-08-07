import { useMemo, useState } from "react";
import { Calculator, MessageCircle } from "lucide-react";
import ModalCotarWhatsApp from "@/components/ModalCotarWhatsApp";

type Produto = { nome: string; rendimento: number; volume: number };

type Acabamento = {
  id: string;
  label: string;
  produtos: Produto[];
  primer?: Produto[];
};

const ACABAMENTOS: Record<string, Acabamento> = {
  verniz: {
    id: "verniz",
    label: "Verniz",
    produtos: [
      { nome: "Anjo Verniz Dura Mais 3,6L", rendimento: 10, volume: 3.6 },
      { nome: "Anjo Verniz Marítimo Premium 3,6L", rendimento: 10, volume: 3.6 },
    ],
    primer: [{ nome: "Anjo Selador Acrílico 3,6L", rendimento: 10, volume: 3.6 }],
  },
  stain: {
    id: "stain",
    label: "Stain",
    produtos: [
      { nome: "Anjo Stain Casa Ipê 3,6L ★", rendimento: 12, volume: 3.6 },
      { nome: "Anjo Stain Imbuia 3,6L", rendimento: 12, volume: 3.6 },
      { nome: "Anjo Stain Incolor 3,6L", rendimento: 12, volume: 3.6 },
    ],
  },
  esmalte: {
    id: "esmalte",
    label: "Esmalte",
    produtos: [{ nome: "Anjo Esmalte Tomplus 3,6L", rendimento: 14, volume: 3.6 }],
    primer: [{ nome: "Primer Base Água 3,6L", rendimento: 10, volume: 3.6 }],
  },
  cupicida: {
    id: "cupicida",
    label: "Cupicida preventivo",
    produtos: [
      { nome: "Cupicida Apus Química 5L", rendimento: 8, volume: 5 },
      { nome: "Cupicida Ecol 5L", rendimento: 8, volume: 5 },
    ],
  },
  acrilica: {
    id: "acrilica",
    label: "Tinta acrílica emborrachada",
    produtos: [
      { nome: "Anjo Acrílica Emborrachada 18L", rendimento: 12, volume: 18 },
      { nome: "AnjoMais Premium 16,2L", rendimento: 12, volume: 16.2 },
    ],
    primer: [{ nome: "Anjo Selador Acrílico 3,6L", rendimento: 10, volume: 3.6 }],
  },
  impermeabilizante: {
    id: "impermeabilizante",
    label: "Impermeabilizante",
    produtos: [
      { nome: "Vedacit Vedalit 18L", rendimento: 8, volume: 18 },
      { nome: "Vedacit Penetrol 3,6L", rendimento: 8, volume: 3.6 },
    ],
    primer: [{ nome: "Vedacit Penetrol 3,6L", rendimento: 8, volume: 3.6 }],
  },
  acrilicaParede: {
    id: "acrilicaParede",
    label: "Tinta acrílica",
    produtos: [
      { nome: "Anjo Acrílica Emborrachada 18L", rendimento: 12, volume: 18 },
      { nome: "AnjoMais Premium 16,2L", rendimento: 12, volume: 16.2 },
    ],
    primer: [{ nome: "Anjo Selador Acrílico 3,6L", rendimento: 10, volume: 3.6 }],
  },
  seladora: {
    id: "seladora",
    label: "Seladora + tinta",
    produtos: [
      { nome: "Anjo Selador Acrílico 3,6L", rendimento: 10, volume: 3.6 },
      { nome: "Vedacit Penetrol 3,6L", rendimento: 8, volume: 3.6 },
    ],
    primer: [{ nome: "Anjo Selador Acrílico 3,6L", rendimento: 10, volume: 3.6 }],
  },
  esmalteSintetico: {
    id: "esmalteSintetico",
    label: "Esmalte sintético",
    produtos: [{ nome: "Anjo Esmalte Tomplus 3,6L", rendimento: 14, volume: 3.6 }],
  },
  primerEsmalte: {
    id: "primerEsmalte",
    label: "Primer + esmalte",
    produtos: [{ nome: "Anjo Esmalte Tomplus 3,6L", rendimento: 14, volume: 3.6 }],
    primer: [{ nome: "Primer Base Água 3,6L", rendimento: 10, volume: 3.6 }],
  },
};

const ALVOS: { id: string; label: string; acabamentos: string[] }[] = [
  { id: "mad-ext", label: "Madeira externa", acabamentos: ["verniz", "stain", "esmalte", "cupicida"] },
  { id: "mad-int", label: "Madeira interna", acabamentos: ["verniz", "stain", "esmalte"] },
  { id: "telhado", label: "Telhado / laje", acabamentos: ["acrilica", "impermeabilizante"] },
  { id: "parede", label: "Parede / fachada", acabamentos: ["acrilicaParede", "seladora"] },
  { id: "ferro", label: "Ferro / metal", acabamentos: ["esmalteSintetico", "primerEsmalte"] },
];

const SEM_PRIMER = ["stain", "cupicida"];

export function CalculadoraTinta() {
  const [alvoId, setAlvoId] = useState("mad-ext");
  const [acabId, setAcabId] = useState("verniz");
  const [modo, setModo] = useState<"area" | "medidas">("area");
  const [area, setArea] = useState("");
  const [larg, setLarg] = useState("");
  const [comp, setComp] = useState("");
  const [demaos, setDemaos] = useState(2);
  const [modal, setModal] = useState(false);
  const [res, setRes] = useState<null | {
    m2: number;
    demaos: number;
    acab: Acabamento;
    preparo: { nome: string; emb: number; litros: number; rend: number }[];
    acabamento: { nome: string; emb: number; litros: number; rend: number }[];
  }>(null);

  const alvo = ALVOS.find((a) => a.id === alvoId)!;
  const num = (v: string) => Number(v.replace(",", ".")) || 0;

  const m2 = useMemo(
    () => (modo === "area" ? num(area) : num(larg) * num(comp)),
    [modo, area, larg, comp],
  );

  const escolherAlvo = (id: string) => {
    setAlvoId(id);
    setAcabId(ALVOS.find((a) => a.id === id)!.acabamentos[0]);
    setRes(null);
  };

  const calcular = () => {
    if (m2 <= 0) return;
    const acab = ACABAMENTOS[acabId];
    const calc = (p: Produto, dem: number) => {
      const litros = (m2 * dem) / p.rendimento;
      return { nome: p.nome, litros, rend: p.rendimento, emb: Math.ceil(litros / p.volume) };
    };
    const preparo = !SEM_PRIMER.includes(acabId) && acab.primer ? acab.primer.map((p) => calc(p, 1)) : [];
    setRes({ m2, demaos, acab, preparo, acabamento: acab.produtos.map((p) => calc(p, demaos)) });
  };

  const fmt = (n: number, d = 1) => n.toLocaleString("pt-BR", { maximumFractionDigits: d });

  const mensagem = res
    ? [
        `🎨 *Cálculo de tinta & verniz — Rocha Telhas*`,
        `• Superfície: ${alvo.label} · ${res.acab.label}`,
        `• Área: ${fmt(res.m2)} m² · ${res.demaos} demão(s)`,
        ...(res.preparo.length
          ? ["", "*Preparação:*", ...res.preparo.map((p) => `• ${p.emb} embalagem(ns) — ${p.nome}`)]
          : []),
        "",
        "*Acabamento (opções):*",
        ...res.acabamento.map((p) => `• ${p.emb} embalagem(ns) — ${p.nome}`),
      ].join("\n")
    : "";

  const card = "rounded-xl border border-gray-200 bg-white p-5";
  const passo = "text-xs font-bold uppercase tracking-wider text-orange-600";
  const chip = (ativo: boolean) =>
    `rounded-full px-4 py-2 text-sm font-bold transition-all ${
      ativo ? "bg-orange-600 text-white" : "border border-gray-200 bg-white text-gray-600 hover:border-orange-300"
    }`;

  const Lista = ({ itens }: { itens: { nome: string; emb: number; litros: number; rend: number }[] }) => (
    <ul className="mt-2 divide-y divide-orange-100 rounded-lg border border-orange-100 bg-white">
      {itens.map((p) => (
        <li key={p.nome} className="flex items-center justify-between gap-3 p-3">
          <span className="text-sm text-gray-700">
            {p.nome}
            <span className="block text-[11px] text-gray-400">
              {fmt(p.litros)} L necessários · rendimento ~{p.rend} m²/L
            </span>
          </span>
          <span className="shrink-0 text-sm font-bold text-orange-600">
            {p.emb} {p.emb > 1 ? "embalagens" : "embalagem"}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="space-y-4">
      <div className={card}>
        <p className={passo}>Passo 1 · O que quer proteger?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {ALVOS.map((a) => (
            <button key={a.id} type="button" onClick={() => escolherAlvo(a.id)} className={chip(alvoId === a.id)}>
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className={card}>
        <p className={passo}>Passo 2 · Tipo de acabamento</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {alvo.acabamentos.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setAcabId(id);
                setRes(null);
              }}
              className={chip(acabId === id)}
            >
              {ACABAMENTOS[id].label}
            </button>
          ))}
        </div>
      </div>

      <div className={card}>
        <p className={passo}>Passo 3 · Área a pintar</p>
        <div className="mt-3 flex gap-2">
          {(
            [
              { id: "area", label: "Área em m²" },
              { id: "medidas", label: "Comprimento × Largura" },
            ] as const
          ).map((o) => (
            <button key={o.id} type="button" onClick={() => setModo(o.id)} className={chip(modo === o.id)}>
              {o.label}
            </button>
          ))}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {modo === "area" ? (
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-gray-700">Área (m²)</label>
              <input
                inputMode="decimal"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Ex.: 60"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">Comprimento (m)</label>
                <input
                  inputMode="decimal"
                  value={comp}
                  onChange={(e) => setComp(e.target.value)}
                  placeholder="Ex.: 10"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">Largura / altura (m)</label>
                <input
                  inputMode="decimal"
                  value={larg}
                  onChange={(e) => setLarg(e.target.value)}
                  placeholder="Ex.: 3"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className={card}>
        <p className={passo}>Passo 4 · Número de demãos</p>
        <div className="mt-3 flex gap-2">
          {[1, 2, 3].map((d) => (
            <button key={d} type="button" onClick={() => setDemaos(d)} className={chip(demaos === d)}>
              {d} demão{d > 1 ? "s" : ""}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-500">Madeira nova ou porosa: recomendamos 2–3 demãos.</p>
      </div>

      <button
        type="button"
        onClick={calcular}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 py-4 text-sm font-bold text-white transition-colors hover:bg-orange-700"
      >
        <Calculator size={18} />
        Calcular tintas
      </button>

      {res && (
        <div className="rounded-xl border border-[#fed7aa] bg-[#fff7ed] p-5">
          <p className="text-xs font-bold tracking-wider text-orange-600 uppercase">Resultado estimado</p>

          {res.preparo.length > 0 && (
            <>
              <p className="mt-3 text-sm font-extrabold text-gray-900">1º passo — Preparação</p>
              <Lista itens={res.preparo} />
            </>
          )}

          <p className="mt-5 text-sm font-extrabold text-gray-900">
            {res.preparo.length > 0 ? "2º passo — Acabamento" : "Acabamento"}
          </p>
          <Lista itens={res.acabamento} />

          <p className="mt-4 text-[11px] text-gray-500">
            {fmt(res.m2)} m² × {res.demaos} demão{res.demaos > 1 ? "s" : ""} = {fmt(res.m2 * res.demaos)} m² de tinta ·
            rendimento ~{res.acabamento[0].rend} m²/L
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
        nomeProduto="Cálculo de tinta & verniz"
      />
    </div>
  );
}
