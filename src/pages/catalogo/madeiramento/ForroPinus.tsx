import { useState } from "react";
import { ChevronRight, ShoppingCart, Check, MessageCircle, Plus } from "lucide-react";
import { useOrcamento } from "../../../context/OrcamentoContext";
import ModalCotarWhatsApp from "../../../components/ModalCotarWhatsApp";
import GaleriaProduto from "../../../components/GaleriaProduto";
import ProdutoLayout from "../../../components/site/ProdutoLayout";
import BlocoAcessorios from "@/components/site/BlocoAcessorios";
import { acessoriosForroMadeira } from "@/data/acessoriosForro";
import { imagensForroPinus } from "../../../data/imagensProduto";

const MODELOS = [
  {
    id: "macho-femea-10",
    nome: "Forro Pinus Macho-Fêmea — 1cm × 10cm",
    desc: "Encaixe macho-fêmea. O mais pedido para forro interno.",
    lider: true,
  },
  {
    id: "frisado-10",
    nome: "Forro Pinus Frisado — 1cm × 10cm",
    desc: "Friso central que disfarça as emendas entre réguas.",
    lider: false,
  },
  {
    id: "macho-femea-20",
    nome: "Forro Pinus Macho-Fêmea — 1cm × 20cm",
    desc: "Régua larga: instalação mais rápida em áreas grandes.",
    lider: false,
  },
];

const COMPRIMENTOS = ["2,0m", "2,5m", "3,0m", "3,5m", "4,0m"];

const ACESSORIOS = [
  {
    id: "meia-cana-pinus",
    nome: "Meia Cana Pinus — por metro",
    descricao: "Arremate perimetral entre o forro e a parede.",
    emoji: "📐",
    unidade: "m",
    categoria: "Madeiramento",
    fator: 1.4,
  },
  {
    id: "sarrafo-pinus-apoio",
    nome: "Sarrafo Pinus 2cm × 5cm — por metro",
    descricao: "Ripas de apoio para fixar o forro no teto.",
    emoji: "🪚",
    unidade: "m",
    categoria: "Madeiramento",
    fator: 2.5,
  },
  {
    id: "prego-polido-15x15",
    nome: "Prego Polido 15×15 sem Cabeça — Kg",
    descricao: "Fixação discreta das réguas de pinus.",
    emoji: "🔨",
    unidade: "Kg",
    categoria: "Fixadores",
    fator: 0.05,
  },
  {
    id: "anjo-verniz-pinus",
    nome: "Anjo Verniz Dura Mais — Natural 3,6L",
    descricao: "Protege o pinus contra umidade e amarelamento.",
    emoji: "✨",
    unidade: "un",
    categoria: "Tintas",
    fator: 0.05,
  },
];

export default function ForroPinus() {
  const { adicionar } = useOrcamento();
  const [modeloId, setModeloId] = useState<string>("macho-femea-10");
  const [comprimento, setComprimento] = useState<string>("3,0m");
  const [area, setArea] = useState<number>(20);
  const [adicionado, setAdicionado] = useState(false);
  const [addAcessorio, setAddAcessorio] = useState<string | null>(null);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const modelo = MODELOS.find((m) => m.id === modeloId)!;
  const areaComPerda = Math.ceil(area * 1.1 * 10) / 10;

  const corpoMsg =
    `🌲 *Forro de Pinus*\n` +
    `• Modelo: ${modelo.nome}\n` +
    `• Comprimento da régua: ${comprimento}\n` +
    `• Área: ${area} m²\n` +
    `• Área c/ 10% de perda: ${areaComPerda} m²`;

  const handleAdicionar = () => {
    adicionar({
      id: `forro-pinus-${modeloId}-${comprimento}`,
      nome: "Forro de Pinus",
      variacao: `${modelo.nome} · régua ${comprimento} · ${area} m²`,
      quantidade: areaComPerda,
      unidade: "m²",
      categoria: "Madeiramento",
    });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 800);
  };

  const handleAcessorio = (a: (typeof ACESSORIOS)[number]) => {
    const qtd = Math.max(1, Math.ceil(areaComPerda * a.fator));
    adicionar({
      id: a.id,
      nome: a.nome,
      variacao: `Para ${areaComPerda} m² de forro de pinus`,
      quantidade: qtd,
      unidade: a.unidade,
      categoria: a.categoria,
    });
    setAddAcessorio(a.id);
    setTimeout(() => setAddAcessorio(null), 1200);
  };

  return (
    <ProdutoLayout
      produtoKey="forro-pinus"
      breadcrumb={
        <div className="bg-white border-b px-4 py-3">
          <div className="max-w-3xl mx-auto flex items-center gap-1 text-xs text-gray-500">
            <a href="/catalogo" className="hover:text-orange-500">
              Catálogo
            </a>
            <ChevronRight size={12} />
            <a href="/catalogo/madeiramento" className="hover:text-orange-500">
              Madeiramento
            </a>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-medium">Forro Pinus</span>
          </div>
        </div>
      }
      cabecalho={
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🌲 Forro de Pinus</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Réguas de pinus claro para forros internos. Vendido por m², com 10% de perda já
            calculado.
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {["Macho-fêmea", "1cm de espessura", "Aceita verniz e stain", "Pronta entrega"].map(
              (t) => (
                <span
                  key={t}
                  className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      }
      tituloAcessorios="Acessórios de Forro de Madeira"
      acessorios={
        <BlocoAcessorios itens={acessoriosForroMadeira(areaComPerda)} contexto={"Forro de Pinus"} />
      }
      galeria={
        <GaleriaProduto
          titulo="Forro de Pinus"
          subtitulo="1cm × 10cm · Foto em breve"
          imagens={imagensForroPinus}
        />
      }
    >
      <>
        {/* Modelo */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
              1
            </span>
            Modelo
          </h2>
          <div className="space-y-2">
            {MODELOS.map((m) => (
              <button
                key={m.id}
                onClick={() => setModeloId(m.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all relative ${modeloId === m.id ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}
              >
                {m.lider && (
                  <span className="absolute top-2 right-2 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    ★ Mais Vendido
                  </span>
                )}
                <p className="font-semibold text-gray-900 text-sm pr-20">{m.nome}</p>
                <p className="text-gray-500 text-xs mt-0.5">{m.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Comprimento */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
              2
            </span>
            Comprimento da régua
          </h2>
          <div className="flex flex-wrap gap-2">
            {COMPRIMENTOS.map((c) => (
              <button
                key={c}
                onClick={() => setComprimento(c)}
                className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${comprimento === c ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200 text-orange-700" : "border-gray-200 hover:border-orange-300 text-gray-700"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* Área */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
              3
            </span>
            Área a cobrir (m²)
          </h2>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setArea((a) => Math.max(1, a - 5))}
                className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600"
              >
                −
              </button>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(Math.max(1, Number(e.target.value)))}
                className="w-24 py-2 text-center font-bold text-gray-900 border-x border-gray-200 focus:outline-none"
              />
              <button
                onClick={() => setArea((a) => a + 5)}
                className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600"
              >
                +
              </button>
            </div>
            <span className="text-sm text-gray-500">m²</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-sm text-amber-800">
              📐 <strong>Área com 10% de perda: {areaComPerda} m²</strong>
              <span className="text-amber-600 text-xs ml-1">
                (já inclusa a margem de corte recomendada)
              </span>
            </p>
          </div>
        </section>

        {/* Resumo + Botões */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="bg-gray-50 rounded-xl p-4 mb-5">
            <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
            <p className="font-bold text-gray-900">Forro de Pinus</p>
            <p className="text-gray-600 text-sm">
              {modelo.nome} · régua {comprimento}
            </p>
            <p className="text-orange-600 font-semibold text-sm mt-1">
              {area} m² solicitados → {areaComPerda} m² com perda
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={handleAdicionar}
              className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm ${adicionado ? "bg-green-600 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"}`}
            >
              {adicionado ? (
                <>
                  <Check size={18} /> Adicionado! Veja os acessórios...
                </>
              ) : (
                <>
                  <ShoppingCart size={18} /> Adicionar ao Orçamento
                </>
              )}
            </button>
            <button
              onClick={() => setModalWppAberto(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
            >
              <MessageCircle size={18} />
              Cotar no WhatsApp
            </button>
          </div>
        </section>

        {/* Acessórios */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-1">Acessórios para o Forro de Pinus</h2>
          <p className="text-xs text-gray-500 mb-4">
            Quantidades sugeridas para {areaComPerda} m² de forro.
          </p>
          <div className="space-y-2">
            {ACESSORIOS.map((a) => {
              const qtd = Math.max(1, Math.ceil(areaComPerda * a.fator));
              const ok = addAcessorio === a.id;
              return (
                <div
                  key={a.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-200"
                >
                  <span className="text-xl">{a.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{a.nome}</p>
                    <p className="text-gray-500 text-xs">{a.descricao}</p>
                    <p className="text-orange-600 text-xs font-semibold mt-0.5">
                      Sugerido: {qtd} {a.unidade}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAcessorio(a)}
                    className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold flex items-center gap-1 transition-colors ${ok ? "bg-green-600 text-white" : "bg-orange-50 text-orange-600 hover:bg-orange-100"}`}
                  >
                    {ok ? (
                      <>
                        <Check size={14} /> Ok
                      </>
                    ) : (
                      <>
                        <Plus size={14} /> Add
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Especificações */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3">Especificações Técnicas</h2>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100">
              {[
                ["Espécie", "Pinus (reflorestamento)"],
                ["Espessura", "1 cm"],
                ["Larguras", "10 cm e 20 cm"],
                ["Comprimentos", "2,0m a 4,0m"],
                ["Encaixe", "Macho-fêmea / frisado"],
                ["Unidade de venda", "m²"],
                ["Acabamento", "Aceita verniz, stain e esmalte"],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td className="py-2.5 text-gray-500">{k}</td>
                  <td className="py-2.5 text-gray-900 font-medium text-right">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <ModalCotarWhatsApp
          aberto={modalWppAberto}
          onFechar={() => setModalWppAberto(false)}
          nomeProduto="Forro de Pinus"
          corpoMensagem={corpoMsg}
        />
      </>
    </ProdutoLayout>
  );
}
