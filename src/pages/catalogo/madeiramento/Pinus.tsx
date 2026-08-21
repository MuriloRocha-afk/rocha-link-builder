import { useState } from "react";
import { ChevronRight, ShoppingCart, Check, MessageCircle } from "lucide-react";
import { useOrcamento } from "../../../context/OrcamentoContext";
import ModalCotarWhatsApp from "../../../components/ModalCotarWhatsApp";
import GaleriaProduto from "../../../components/GaleriaProduto";
import ProdutoLayout from "../../../components/site/ProdutoLayout";
import { imagensPinus } from "../../../data/imagensProduto";

type Produto = {
  id: string;
  nome: string;
  tipo: "Sarrafo" | "Tábua" | "Pontalete";
  largura: string;
  espessura: string;
  comprimentos: string[];
  unidade: string;
  lider?: boolean;
};

const PRODUTOS: Produto[] = [
  { id: "sarrafo-5cm", nome: "Sarrafo 05cm", tipo: "Sarrafo", largura: "5cm", espessura: "2,0cm", comprimentos: ["2,0m", "2,5m", "3,0m", "4,0m"], unidade: "Pc" },
  { id: "sarrafo-7cm", nome: "Sarrafo 07cm", tipo: "Sarrafo", largura: "7cm", espessura: "2,0cm", comprimentos: ["2,0m", "2,5m", "3,0m", "4,0m"], unidade: "Pc" },
  { id: "sarrafo-10cm", nome: "Sarrafo 10cm", tipo: "Sarrafo", largura: "10cm", espessura: "2,0cm", comprimentos: ["2,0m", "2,5m", "3,0m", "4,0m"], unidade: "Pc" },
  { id: "sarrafo-15cm", nome: "Sarrafo 15cm", tipo: "Sarrafo", largura: "15cm", espessura: "2,0cm", comprimentos: ["2,5m", "3,0m", "4,0m"], unidade: "Pc" },
  { id: "tabua-20cm", nome: "Tábua 20cm", tipo: "Tábua", largura: "20cm", espessura: "2,5cm", comprimentos: ["2,5m", "3,0m", "4,0m"], unidade: "Pc" },
  { id: "tabua-25cm", nome: "Tábua 25cm", tipo: "Tábua", largura: "25cm", espessura: "2,5cm", comprimentos: ["2,5m", "3,0m", "4,0m"], unidade: "Pc" },
  { id: "tabua-28cm", nome: "Tábua 28cm", tipo: "Tábua", largura: "28cm", espessura: "2,5cm", comprimentos: ["2,5m", "3,0m", "4,0m"], unidade: "Pc" },
  { id: "tabua-30cm", nome: "Tábua 30cm", tipo: "Tábua", largura: "30cm", espessura: "2,5cm", comprimentos: ["2,5m", "3,0m", "4,0m"], unidade: "Pc", lider: true },
  { id: "pontalete-6x6", nome: "Pontalete 6cm × 6cm", tipo: "Pontalete", largura: "6cm", espessura: "6cm", comprimentos: ["2,5m", "3,0m", "4,0m"], unidade: "Pc" },
  { id: "pontalete-7x7", nome: "Pontalete 7cm × 7cm", tipo: "Pontalete", largura: "7cm", espessura: "7cm", comprimentos: ["2,5m", "3,0m", "4,0m"], unidade: "Pc" },
];

const ABAS = ["Todos", "Sarrafo", "Tábua", "Pontalete"];
const ACABAMENTOS = ["Bruto", "Aparelhado em Plaina"] as const;
type Acabamento = typeof ACABAMENTOS[number];

export default function Pinus() {
  const { adicionar } = useOrcamento();
  const [aba, setAba] = useState("Todos");
  const [produtoId, setProdutoId] = useState<string | null>(null);
  const [comprimento, setComprimento] = useState<string | null>(null);
  const [acabamento, setAcabamento] = useState<Acabamento | null>(null);
  const [quantidade, setQuantidade] = useState(10);
  const [adicionado, setAdicionado] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const filtrados = aba === "Todos" ? PRODUTOS : PRODUTOS.filter((p) => p.tipo === aba);
  const produto = PRODUTOS.find((p) => p.id === produtoId);
  const pronto = Boolean(produto && comprimento && acabamento && quantidade >= 1);
  const variacao = produto && comprimento && acabamento
    ? `${produto.largura} × ${produto.espessura} · ${comprimento} · ${acabamento}`
    : "";
  const corpoMsgWpp = pronto && produto
    ? `🌲 *Pinus — ${produto.nome}*\n• Largura: ${produto.largura}\n• Espessura: ${produto.espessura}\n• Comprimento: ${comprimento}\n• Acabamento: ${acabamento}\n• Quantidade: ${quantidade} ${produto.unidade}`
    : "";

  const selecionarProduto = (p: Produto) => {
    setProdutoId(p.id);
    setComprimento(null);
    setAcabamento(null);
  };

  const handleAdicionar = () => {
    if (!pronto || !produto) return;
    adicionar({
      id: `pinus-${produto.id}-${comprimento}-${acabamento}`,
      nome: `Pinus — ${produto.nome}`,
      variacao,
      quantidade,
      unidade: produto.unidade,
      categoria: "Madeiramento",
    });
    setAdicionado(true);
    setTimeout(() => { setAdicionado(false); }, 800);
  };

  return (
    <ProdutoLayout
      produtoKey="pinus"
      breadcrumb={
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-1 text-xs text-gray-500">
          <a href="/catalogo" className="hover:text-orange-500">Catálogo</a>
          <ChevronRight size={12} />
          <a href="/catalogo/madeiramento" className="hover:text-orange-500">Madeiramento</a>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">Pinus</span>
        </div>
      </div>
      }
      cabecalho={
          <div>
            <h1 className="text-2xl font-bold text-gray-900">🌲 Pinus</h1>
            <p className="text-gray-500 mt-1 text-sm">Sarrafos, tábuas e pontaletes de reflorestamento. Cada peça com largura, espessura e comprimento próprios.</p>
          </div>
      }
      galeria={
        <GaleriaProduto
          titulo={produto ? `Pinus — ${produto.tipo}` : aba !== "Todos" ? `Pinus — ${aba}` : "Pinus"}
          subtitulo={produto || aba !== "Todos" ? "Foto em breve" : "Selecione o produto para ver as fotos"}
          imagens={imagensPinus[produto ? produto.tipo : aba] ?? []}
        />
      }
    >
      <>
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
              Selecione a Peça
            </h2>
            {/* Abas de filtro */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {ABAS.map((a) => (
                <button key={a} onClick={() => { setAba(a); setProdutoId(null); setComprimento(null); setAcabamento(null); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${aba === a ? "bg-orange-500 text-white border-orange-500" : "border-gray-200 text-gray-600 hover:border-orange-300"}`}>
                  {a}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {filtrados.map((p) => (
                <button key={p.id} onClick={() => selecionarProduto(p)}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all relative ${produtoId === p.id ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}>
                  <div>
                    <span className="font-semibold text-gray-900 text-sm">{p.nome}</span>
                    <span className="text-xs text-gray-400 ml-2">por {p.unidade}</span>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Largura {p.largura} · Espessura {p.espessura} · {p.comprimentos[0]} a {p.comprimentos[p.comprimentos.length - 1]}
                    </p>
                  </div>
                  {p.lider && <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">★ Campeão</span>}
                </button>
              ))}
            </div>
          </section>

          {produto && (
            <section className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
                Comprimento
              </h2>
              <div className="flex flex-wrap gap-2">
                {produto.comprimentos.map((c) => (
                  <button key={c} onClick={() => setComprimento(c)}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${comprimento === c ? "border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-200" : "border-gray-200 text-gray-700 hover:border-orange-300"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </section>
          )}

          {produto && comprimento && (
            <section className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">3</span>
                Serviço de Aparelhagem
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ACABAMENTOS.map((a) => (
                  <button key={a} onClick={() => setAcabamento(a)}
                    className={`text-left p-4 rounded-xl border transition-all ${acabamento === a ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}>
                    <p className="font-semibold text-gray-900 text-sm">{a}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {a === "Bruto" ? "Direto da serra · opção mais econômica" : "Superfície lisa e padronizada na plaina"}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {produto && comprimento && acabamento && (
            <section className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">4</span>
                Quantidade
              </h2>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => setQuantidade(q => Math.max(1, q - 5))} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">−</button>
                  <input type="number" value={quantidade} onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))} className="w-20 py-2 text-center font-bold text-gray-900 border-x border-gray-200 focus:outline-none" />
                  <button onClick={() => setQuantidade(q => q + 5)} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">+</button>
                </div>
                <span className="text-sm text-gray-500">{produto.unidade}</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-5">
                <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
                <p className="font-bold text-gray-900">Pinus — {produto.nome}</p>
                <p className="text-gray-600 text-sm">{variacao}</p>
                <p className="text-orange-600 font-semibold text-sm mt-1">{quantidade} {produto.unidade}</p>
              </div>
              <div className="space-y-3">
                <button onClick={handleAdicionar} className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm ${adicionado ? "bg-green-600 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"}`}>
                  {adicionado ? <><Check size={18} /> Adicionado!</> : <><ShoppingCart size={18} /> Adicionar ao Orçamento</>}
                </button>
                <button onClick={() => pronto && setModalWppAberto(true)} disabled={!pronto} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
                  <MessageCircle size={18} /> Cotar no WhatsApp
                </button>
              </div>
            </section>
          )}
              <ModalCotarWhatsApp aberto={modalWppAberto} onFechar={() => setModalWppAberto(false)} nomeProduto="Pinus" corpoMensagem={corpoMsgWpp} />
      </>
    </ProdutoLayout>
  );
}
