import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BotaoCotarWhatsApp } from "@/components/site/BotaoCotarWhatsApp";

type Familia = "forro" | "deck";

type Produto = {
  id: string;
  familia: Familia;
  label: string;
  slug: string;
  categoriaSlug: string;
  /** largura útil da peça em metros (já descontado o encaixe) */
  largura: number;
  /** largura nominal em cm (rótulo comercial) */
  larguraNominal: number;
  /** comprimentos comerciais disponíveis no catálogo (m) */
  comprimentos: number[];
  unidade: string;
  acabamento: string;
  /** espaçamento padrão entre apoios, em cm */
  apoioPadrao: number;
  apoioNome: string;
  fixador: string;
  /** fixadores por metro linear de apoio */
  fixadorPorMetro: number;
  nota: string;
};

const PRODUTOS: Produto[] = [
  {
    id: "forro-pvc",
    familia: "forro",
    label: "Forro de PVC",
    slug: "forro-pvc",
    categoriaSlug: "madeiramento",
    largura: 0.175,
    larguraNominal: 20,
    comprimentos: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
    unidade: "régua",
    acabamento: "Rodateto / moldura de acabamento",
    apoioPadrao: 50,
    apoioNome: "Sarrafo",
    fixador: "Parafuso ponta broca",
    fixadorPorMetro: 2,
    nota: "Régua branca frisada de 20 cm (17,5 cm úteis), de 1,0 m até 7,0 m.",
  },
  {
    id: "forro-pinus",
    familia: "forro",
    label: "Forro de Pinus",
    slug: "forro-pinus",
    categoriaSlug: "madeiramento",
    largura: 0.09,
    larguraNominal: 10,
    comprimentos: [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
    unidade: "régua",
    acabamento: "Meia-cana / moldura de acabamento",
    apoioPadrao: 50,
    apoioNome: "Sarrafo",
    fixador: "Prego 12×12 sem cabeça",
    fixadorPorMetro: 3,
    nota: "Régua macho-fêmea de 10 cm (9 cm úteis), de 2,0 m até 6,0 m.",
  },
  {
    id: "forro-cedrinho",
    familia: "forro",
    label: "Forro de Cedrinho",
    slug: "forro-cedrinho",
    categoriaSlug: "madeiramento",
    largura: 0.09,
    larguraNominal: 10,
    comprimentos: [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
    unidade: "régua",
    acabamento: "Meia-cana / moldura de acabamento",
    apoioPadrao: 50,
    apoioNome: "Sarrafo",
    fixador: "Prego 12×12 sem cabeça",
    fixadorPorMetro: 3,
    nota: "Régua macho-fêmea de 10 cm (9 cm úteis), cerne ou mesclado, de 2,0 m até 6,0 m.",
  },
  {
    id: "deck-cumaru",
    familia: "deck",
    label: "Deck de Cumaru",
    slug: "tabeiras-deck",
    categoriaSlug: "madeiramento",
    largura: 0.104, // 10 cm + 4 mm de junta de dilatação
    larguraNominal: 10,
    comprimentos: [1, 1.5, 2, 2.5, 3, 3.5, 4],
    unidade: "régua",
    acabamento: "Acabamento / borda perimetral",
    apoioPadrao: 40,
    apoioNome: "Viga de apoio",
    fixador: "Parafuso inox 4,5 × 50 mm",
    fixadorPorMetro: 5,
    nota: "Régua de cumaru mesclado 10 cm × 2 cm, com junta de 4 mm entre peças.",
  },
  {
    id: "deck-garapeira",
    familia: "deck",
    label: "Deck de Garapeira",
    slug: "tabeiras-deck",
    categoriaSlug: "madeiramento",
    largura: 0.084, // 8 cm + 4 mm de junta
    larguraNominal: 8,
    comprimentos: [1, 1.5, 2, 2.5, 3, 3.5, 4],
    unidade: "régua",
    acabamento: "Acabamento / borda perimetral",
    apoioPadrao: 40,
    apoioNome: "Viga de apoio",
    fixador: "Parafuso inox 4,5 × 50 mm",
    fixadorPorMetro: 5,
    nota: "Régua de garapeia 8 cm × 2 cm, com junta de 4 mm entre peças.",
  },
  {
    id: "deck-pinus-tratado",
    familia: "deck",
    label: "Deck de Pinus Tratado",
    slug: "tabeiras-deck",
    categoriaSlug: "madeiramento",
    largura: 0.104,
    larguraNominal: 10,
    comprimentos: [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
    unidade: "régua",
    acabamento: "Acabamento / borda perimetral",
    apoioPadrao: 50,
    apoioNome: "Viga de apoio",
    fixador: "Parafuso inox 4,5 × 50 mm",
    fixadorPorMetro: 4,
    nota: "Régua de pinus autoclavado 10 cm × 2 cm, de 2,0 m até 6,0 m.",
  },
];

type Sentido = "maior" | "menor";

export function CalculadoraForro() {
  const [familia, setFamilia] = useState<Familia>("forro");
  const [produtoId, setProdutoId] = useState("forro-pvc");
  const [largura, setLargura] = useState(3);
  const [comprimento, setComprimento] = useState(4);
  const [sentido, setSentido] = useState<Sentido>("maior");
  /** preferência de comprimento (deck) — null = automático */
  const [compPreferido, setCompPreferido] = useState<number | null>(null);
  /** espaçamento de apoio informado (forro) — null = padrão do produto */
  const [espacamento, setEspacamento] = useState<number | null>(null);

  const daFamilia = PRODUTOS.filter((p) => p.familia === familia);
  const produto = daFamilia.find((p) => p.id === produtoId) ?? daFamilia[0]!;

  const trocarFamilia = (f: Familia) => {
    setFamilia(f);
    const primeiro = PRODUTOS.find((p) => p.familia === f)!;
    setProdutoId(primeiro.id);
    setCompPreferido(null);
    setEspacamento(null);
  };

  const espacamentoCm = espacamento ?? produto.apoioPadrao;

  const r = useMemo(() => {
    const l = Math.max(0, largura || 0);
    const c = Math.max(0, comprimento || 0);
    const menor = Math.min(l, c);
    const maior = Math.max(l, c);

    // medida coberta pelo comprimento das peças
    const paralelo = sentido === "maior" ? maior : menor;
    // medida coberta pelas peças lado a lado
    const perpendicular = sentido === "maior" ? menor : maior;

    const disponiveis = [...produto.comprimentos].sort((a, b) => a - b);
    const cabe = disponiveis.filter((x) => x <= paralelo);
    const automatico = cabe.length ? cabe[cabe.length - 1]! : disponiveis[0]!;
    const reguaComp =
      produto.familia === "deck" && compPreferido && disponiveis.includes(compPreferido)
        ? compPreferido
        : automatico;

    const linhas = perpendicular > 0 ? Math.ceil(perpendicular / produto.largura) : 0;
    // emenda: só existe quando a peça escolhida não cobre o vão inteiro
    const emendaPorLinha = Math.max(0, paralelo - reguaComp);
    const emendaTotal = emendaPorLinha * linhas;
    const pecasPorLinha = reguaComp > 0 ? Math.ceil(paralelo / reguaComp) : 0;
    const pecas = linhas * pecasPorLinha;

    const area = l * c;
    const perimetro = 2 * (l + c);

    const passo = Math.max(0.1, espacamentoCm / 100);
    const qtdApoios = perpendicular > 0 ? Math.ceil(perpendicular / passo) + 1 : 0;
    const tamanhoApoio = paralelo;
    const mLinearApoio = qtdApoios * tamanhoApoio;
    const fixadores = Math.ceil(mLinearApoio * produto.fixadorPorMetro);

    return {
      area,
      perimetro: Math.ceil(perimetro),
      reguaComp,
      linhas,
      pecas,
      pecasPorLinha,
      emendaPorLinha,
      emendaTotal,
      qtdApoios,
      tamanhoApoio,
      mLinearApoio,
      fixadores,
      paralelo,
      perpendicular,
      automatico,
    };
  }, [largura, comprimento, sentido, produto, compPreferido, espacamentoCm]);

  const n = (v: number) => v.toFixed(2).replace(/\.?0+$/, "").replace(".", ",");

  const chip = (ativo: boolean) =>
    `rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
      ativo ? "bg-orange-600 text-white" : "border border-gray-200 bg-white text-gray-600"
    }`;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
      <h3 className="text-lg font-extrabold text-primary">Calculadora de Forro & Deck</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Escolha o produto, informe as medidas do ambiente e o sentido de instalação das peças.
      </p>

      <div className="mt-6">
        <span className="text-xs font-bold text-gray-600 uppercase">1. Forro ou Deck?</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["forro", "deck"] as Familia[]).map((f) => (
            <button key={f} type="button" onClick={() => trocarFamilia(f)} className={chip(familia === f)}>
              {f === "forro" ? "Forro" : "Deck"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <span className="text-xs font-bold text-gray-600 uppercase">
          2. Material {familia === "forro" ? "do forro" : "do deck"}
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          {daFamilia.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setProdutoId(p.id);
                setCompPreferido(null);
                setEspacamento(null);
              }}
              className={chip(produto.id === p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{produto.nota}</p>
      </div>

      <div className="mt-5">
        <span className="text-xs font-bold text-gray-600 uppercase">3. Medidas do ambiente</span>
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
        <span className="text-xs font-bold text-gray-600 uppercase">4. Sentido de instalação</span>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {[
            { id: "maior" as const, t: "Em direção ao maior lado", s: "Deixa o ambiente com aparência mais ampla." },
            { id: "menor" as const, t: "Em direção ao menor lado", s: "Peças mais curtas, menos emendas." },
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

      {familia === "deck" ? (
        <div className="mt-5">
          <span className="text-xs font-bold text-gray-600 uppercase">
            5. Preferência de comprimento da régua
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" onClick={() => setCompPreferido(null)} className={chip(compPreferido === null)}>
              Automático ({n(r.automatico)} m)
            </button>
            {produto.comprimentos.map((c) => (
              <button key={c} type="button" onClick={() => setCompPreferido(c)} className={chip(compPreferido === c)}>
                {n(c)} m
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Comprimentos menores facilitam transporte e manuseio, mas podem gerar mais emendas.
          </p>
        </div>
      ) : (
        <div className="mt-5">
          <span className="text-xs font-bold text-gray-600 uppercase">
            5. Espaçamento entre os sarrafos de apoio
          </span>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex w-40 items-center rounded-xl border border-gray-200 bg-white">
              <input
                type="number"
                min={10}
                step={5}
                value={espacamentoCm}
                onChange={(e) => setEspacamento(Math.max(10, parseFloat(e.target.value) || 0))}
                className="w-full rounded-xl bg-transparent px-3 py-2.5 text-sm font-semibold text-primary outline-none"
              />
              <span className="pr-3 text-xs font-bold text-gray-400">cm</span>
            </div>
            <button type="button" onClick={() => setEspacamento(null)} className={chip(espacamento === null)}>
              Padrão {produto.apoioPadrao} cm
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-2xl bg-gray-50 p-5">
        <p className="text-xs font-bold text-gray-600 uppercase">Resultado estimado</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {[
            { t: "Comprimento de peça", v: `${n(r.reguaComp)} m` },
            { t: `${produto.label} (área)`, v: `${r.area.toFixed(1)} m²` },
            { t: `${produto.unidade}s necessárias`, v: `${r.pecas} pçs` },
            {
              t: "Emenda",
              v: r.emendaTotal > 0 ? `${n(r.emendaTotal)} m` : "Não é necessário",
            },
            { t: produto.acabamento, v: `${r.perimetro} m` },
            { t: `${produto.apoioNome}s (a cada ${espacamentoCm} cm)`, v: `${r.qtdApoios} × ${n(r.tamanhoApoio)} m` },
            { t: `Metros de ${produto.apoioNome.toLowerCase()}`, v: `${Math.ceil(r.mLinearApoio)} m` },
            { t: produto.fixador, v: `${r.fixadores} un` },
          ].map((k) => (
            <div key={k.t} className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-[11px] font-bold text-gray-500 uppercase">{k.t}</p>
              <p className="mt-1 text-xl font-extrabold text-primary">{k.v}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Peças de {produto.larguraNominal} cm ({n(produto.largura * 100)} cm úteis) instaladas no
          sentido de {n(r.paralelo)} m, com {r.linhas} fileiras cobrindo {n(r.perpendicular)} m.{" "}
          {r.emendaTotal > 0
            ? `Como o ambiente tem ${n(r.paralelo)} m e a peça usada é de ${n(r.reguaComp)} m, cada fileira precisa de ${n(r.emendaPorLinha)} m de emenda (${r.pecasPorLinha} peças por fileira).`
            : "A peça escolhida cobre o vão inteiro, sem emenda."}{" "}
          {produto.apoioNome}s a cada {espacamentoCm} cm, perpendiculares às peças.
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
              `Sentido: peças em direção ao ${sentido} lado`,
              "",
              "*MATERIAIS ESTIMADOS:*",
              `• ${r.pecas} ${produto.unidade}s de ${n(r.reguaComp)} m`,
              `• Emenda: ${r.emendaTotal > 0 ? `${n(r.emendaTotal)} m` : "não é necessário"}`,
              `• ${r.perimetro} m de ${produto.acabamento.toLowerCase()}`,
              `• ${r.qtdApoios} ${produto.apoioNome.toLowerCase()}s de ${n(r.tamanhoApoio)} m (${Math.ceil(r.mLinearApoio)} m lineares, a cada ${espacamentoCm} cm)`,
              `• ${r.fixadores} ${produto.fixador.toLowerCase()}`,
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
