import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BotaoCotarWhatsApp } from "@/components/site/BotaoCotarWhatsApp";

type Produto = {
  id: string;
  label: string;
  slug: string;
  categoriaSlug: string;
  /** largura útil da régua em metros */
  largura: number;
  /** comprimentos comerciais disponíveis no catálogo (m) */
  comprimentos: number[];
  unidade: string;
  acabamento: string;
  nota: string;
};

const PRODUTOS: Produto[] = [
  {
    id: "forro-pvc",
    label: "Forro de PVC",
    slug: "forro-pvc",
    categoriaSlug: "madeiramento",
    largura: 0.2,
    comprimentos: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
    unidade: "régua",
    acabamento: "Rodateto / moldura de acabamento",
    nota: "Régua branca frisada de 20 cm, de 1,0 m até 7,0 m de comprimento.",
  },
  {
    id: "deck",
    label: "Deck de Madeira",
    slug: "tabeiras-deck",
    categoriaSlug: "madeiramento",
    largura: 0.1,
    comprimentos: [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
    unidade: "régua",
    acabamento: "Acabamento / borda perimetral",
    nota: "Réguas de cumaru, garapeia ou pinus tratado — 10 cm de largura × 2 cm.",
  },
];

type Sentido = "maior" | "menor";

export function CalculadoraForro() {
  const [produtoId, setProdutoId] = useState("forro-pvc");
  const [largura, setLargura] = useState(3);
  const [comprimento, setComprimento] = useState(4);
  const [sentido, setSentido] = useState<Sentido>("maior");

  const produto = PRODUTOS.find((p) => p.id === produtoId) ?? PRODUTOS[0]!;

  const r = useMemo(() => {
    const l = Math.max(0, largura || 0);
    const c = Math.max(0, comprimento || 0);
    const menor = Math.min(l, c);
    const maior = Math.max(l, c);

    // medida coberta pelo comprimento das réguas
    const paralelo = sentido === "maior" ? maior : menor;
    // medida coberta pelas réguas lado a lado
    const perpendicular = sentido === "maior" ? menor : maior;

    const disponiveis = [...produto.comprimentos].sort((a, b) => a - b);
    const cabe = disponiveis.filter((x) => x <= paralelo);
    const reguaComp = cabe.length ? cabe[cabe.length - 1]! : disponiveis[0]!;

    const linhas = reguaComp > 0 ? Math.ceil(perpendicular / produto.largura) : 0;
    const emendaPorLinha = Math.max(0, paralelo - reguaComp);
    const emendaTotal = emendaPorLinha * linhas;
    // se precisa emendar, cada linha recebe peça(s) extra(s)
    const pecasExtras = emendaPorLinha > 0 ? Math.ceil(emendaPorLinha / reguaComp) * linhas : 0;
    const pecas = linhas + pecasExtras;

    const area = l * c;
    const perimetro = 2 * (l + c);

    // sarrafos: a cada 50 cm, perpendiculares às réguas
    const qtdSarrafos = Math.max(0, Math.ceil(perpendicular / 0.5));
    const tamanhoSarrafo = paralelo;
    const mLinearSarrafo = qtdSarrafos * tamanhoSarrafo;
    const parafusos = Math.ceil(mLinearSarrafo / 0.5);

    return {
      area,
      perimetro: Math.ceil(perimetro),
      reguaComp,
      linhas,
      pecas,
      emendaPorLinha,
      emendaTotal,
      qtdSarrafos,
      tamanhoSarrafo,
      mLinearSarrafo,
      parafusos,
      paralelo,
      perpendicular,
    };
  }, [largura, comprimento, sentido, produto]);

  const n = (v: number) => v.toFixed(2).replace(/\.?0+$/, "").replace(".", ",");

  const chip = (ativo: boolean) =>
    `rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
      ativo ? "bg-orange-600 text-white" : "border border-gray-200 bg-white text-gray-600"
    }`;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
      <h3 className="text-lg font-extrabold text-primary">Calculadora de Forro & Deck</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Escolha o produto, informe as medidas do ambiente e o sentido de instalação das réguas.
      </p>

      <div className="mt-6">
        <span className="text-xs font-bold text-gray-600 uppercase">1. Forro de PVC ou Deck?</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRODUTOS.map((p) => (
            <button key={p.id} type="button" onClick={() => setProdutoId(p.id)} className={chip(produtoId === p.id)}>
              {p.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{produto.nota}</p>
      </div>

      <div className="mt-5">
        <span className="text-xs font-bold text-gray-600 uppercase">2. Medidas do ambiente</span>
        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          {[
            { label: "Largura (lado menor)", v: largura, set: setLargura },
            { label: "Comprimento (lado maior)", v: comprimento, set: setComprimento },
          ].map((c) => (
            <label key={c.label} className="block">
              <span className="text-xs font-bold text-gray-600 uppercase">{c.label}</span>
              <div className="mt-1 flex items-center rounded-xl border border-gray-200 bg-white">
                <input
                  type="number"
                  min={0}
                  step={0.1}
                  value={Number.isFinite(c.v) ? c.v : ""}
                  onChange={(e) => c.set(parseFloat(e.target.value))}
                  className="w-full rounded-xl bg-transparent px-3 py-2.5 text-sm font-semibold text-primary outline-none"
                />
                <span className="pr-3 text-xs font-bold text-gray-400">m</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <span className="text-xs font-bold text-gray-600 uppercase">3. Sentido de instalação</span>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {[
            { id: "maior" as const, t: "Em direção ao maior lado", s: "Deixa o ambiente com aparência mais ampla." },
            { id: "menor" as const, t: "Em direção ao menor lado", s: "Réguas mais curtas, menos emendas." },
          ].map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setSentido(o.id)}
              className={`rounded-xl border p-3 text-left transition-colors ${
                sentido === o.id ? "border-orange-600 bg-orange-50" : "border-gray-200 bg-white"
              }`}
            >
              <p className="text-sm font-bold text-primary">{o.t}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{o.s}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-gray-50 p-5">
        <p className="text-xs font-bold text-gray-600 uppercase">Resultado estimado</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {[
            { t: "Comprimento de régua", v: `${n(r.reguaComp)} m` },
            { t: `${produto.label} (área)`, v: `${r.area.toFixed(1)} m²` },
            { t: `${produto.unidade}s necessárias`, v: `${r.pecas} pçs` },
            {
              t: "Emenda",
              v: r.emendaTotal > 0 ? `${n(r.emendaTotal)} m` : "Não é necessário",
            },
            { t: produto.acabamento, v: `${r.perimetro} m` },
            { t: "Sarrafos", v: `${r.qtdSarrafos} × ${n(r.tamanhoSarrafo)} m` },
            { t: "Metros de sarrafo", v: `${Math.ceil(r.mLinearSarrafo)} m` },
            { t: "Parafusos", v: `${r.parafusos} un` },
          ].map((k) => (
            <div key={k.t} className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-[11px] font-bold text-gray-500 uppercase">{k.t}</p>
              <p className="mt-1 text-xl font-extrabold text-primary">{k.v}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Réguas de {n(produto.largura * 100)} cm instaladas no sentido de {n(r.paralelo)} m, com{" "}
          {r.linhas} fileiras cobrindo {n(r.perpendicular)} m.{" "}
          {r.emendaTotal > 0
            ? `Como o ambiente tem ${n(r.paralelo)} m e a maior régua do catálogo é de ${n(r.reguaComp)} m, cada fileira precisa de ${n(r.emendaPorLinha)} m de emenda.`
            : "A régua escolhida cobre o vão inteiro, sem emenda."}{" "}
          Sarrafos a cada 50 cm, perpendiculares às réguas.
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Link
            to="/catalogo/$categoriaSlug/$produtoSlug"
            params={{ categoriaSlug: produto.categoriaSlug, produtoSlug: produto.slug }}
            className="flex items-center justify-center gap-2 rounded-xl border border-orange-300 bg-white py-3.5 text-sm font-bold text-orange-700 transition-colors hover:bg-orange-50"
          >
            Ver {produto.label} no catálogo
            <ArrowRight size={16} />
          </Link>
          <BotaoCotarWhatsApp
            nomeProduto="Calculadora de Forro & Deck"
            tipo="calculadora"
            corpoMensagem={[
              `*ORÇAMENTO — ${produto.label.toUpperCase()}*`,
              "",
              `Ambiente: ${n(largura || 0)} × ${n(comprimento || 0)} m (${r.area.toFixed(1)} m²)`,
              `Sentido: réguas em direção ao ${sentido} lado`,
              "",
              "*MATERIAIS ESTIMADOS:*",
              `• ${r.pecas} ${produto.unidade}s de ${n(r.reguaComp)} m`,
              `• Emenda: ${r.emendaTotal > 0 ? `${n(r.emendaTotal)} m` : "não é necessário"}`,
              `• ${r.perimetro} m de ${produto.acabamento.toLowerCase()}`,
              `• ${r.qtdSarrafos} sarrafos de ${n(r.tamanhoSarrafo)} m (${Math.ceil(r.mLinearSarrafo)} m lineares)`,
              `• ${r.parafusos} parafusos`,
            ].join("\n")}
          >
            Cotar no WhatsApp
          </BotaoCotarWhatsApp>
        </div>
      </div>
    </div>
  );
}

export default CalculadoraForro;
