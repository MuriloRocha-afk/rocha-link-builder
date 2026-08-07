import { useState } from "react";
import { ChevronRight, ShoppingCart, Check, MessageCircle } from "lucide-react";
import { useOrcamento } from "../../../context/OrcamentoContext";
import CrossSellModal from "../../../components/CrossSellModal";
import ModalCotarWhatsApp from "../../../components/ModalCotarWhatsApp";
import GaleriaProduto from "../../../components/GaleriaProduto";
import { imagensPinus } from "../../../data/imagensProduto";

const PRODUTOS = [
  { id: "sarrafo-5cm", nome: "Sarrafo 05cm × 3,0m", tipo: "Sarrafo", bitola: "05cm", comp: "3,0m", unidade: "Pc" },
  { id: "sarrafo-7cm", nome: "Sarrafo 07cm × 3,0m", tipo: "Sarrafo", bitola: "07cm", comp: "3,0m", unidade: "Pc" },
  { id: "sarrafo-10cm", nome: "Sarrafo 10cm × 3,0m", tipo: "Sarrafo", bitola: "10cm", comp: "3,0m", unidade: "Pc" },
  { id: "sarrafo-15cm", nome: "Sarrafo 15cm × 3,0m", tipo: "Sarrafo", bitola: "15cm", comp: "3,0m", unidade: "Pc" },
  { id: "tabua-20cm", nome: "Tábua 20cm × 3,0m", tipo: "Tábua", bitola: "20cm", comp: "3,0m", unidade: "Pc" },
  { id: "tabua-25cm", nome: "Tábua 25cm × 3,0m", tipo: "Tábua", bitola: "25cm", comp: "3,0m", unidade: "Pc" },
  { id: "tabua-28cm", nome: "Tábua 28cm × 3,0m", tipo: "Tábua", bitola: "28cm", comp: "3,0m", unidade: "Pc" },
  { id: "tabua-30cm", nome: "Tábua 30cm × 3,0m", tipo: "Tábua", bitola: "30cm", comp: "3,0m", unidade: "Pc", lider: true },
  { id: "pontalete-6x6-3m", nome: "Pontalete 6cm × 6cm × 3,0m", tipo: "Pontalete", bitola: "6×6cm", comp: "3,0m", unidade: "Pc" },
  { id: "pontalete-7x7-3m", nome: "Pontalete 7cm × 7cm × 3,0m", tipo: "Pontalete", bitola: "7×7cm", comp: "3,0m", unidade: "Pc" },
];

const ABAS = ["Todos", "Sarrafo", "Tábua", "Pontalete"];

const CROSS_PINUS = [
  { id: "prego-18x27-kg", nome: "Prego Polido 18×27 com Cabeça", descricao: "O mais usado em caixaria e estruturas de pinus.", emoji: "🔨", unidade: "Kg", quantidadeSugerida: 2, categoria: "Fixadores" },
  { id: "lona-preta-4x1-12kg", nome: "Lona Preta 4m × 1m — 12kg", descricao: "Proteção da madeira durante obra e transporte.", emoji: "🛡️", unidade: "Mt", quantidadeSugerida: 10, categoria: "Fixadores" },
];

export default function Pinus() {
  const { adicionar } = useOrcamento();
  const [aba, setAba] = useState("Todos");
  const [produtoId, setProdutoId] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(10);
  const [adicionado, setAdicionado] = useState(false);
  const [crossSellAberto, setCrossSellAberto] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const filtrados = aba === "Todos" ? PRODUTOS : PRODUTOS.filter((p) => p.tipo === aba);
  const produto = PRODUTOS.find((p) => p.id === produtoId);
  const pronto = produtoId && quantidade >= 1;
  const corpoMsgWpp = pronto && produto ? `🌲 *Pinus — ${produto.nome}*\n• Quantidade: ${quantidade} ${produto.unidade}` : "";

  const handleAdicionar = () => {
    if (!pronto || !produto) return;
    adicionar({ id: `pinus-${produtoId}`, nome: `Pinus — ${produto.nome}`, variacao: `${produto.bitola} · ${produto.comp} · Bruto`, quantidade, unidade: produto.unidade, categoria: "Madeiramento" });
    setAdicionado(true);
    setTimeout(() => { setAdicionado(false); setCrossSellAberto(true); }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-1 text-xs text-gray-500">
          <a href="/catalogo" className="hover:text-orange-500">Catálogo</a>
          <ChevronRight size={12} />
          <a href="/catalogo/madeiramento" className="hover:text-orange-500">Madeiramento</a>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">Pinus</span>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🌲 Pinus</h1>
          <p className="text-gray-500 mt-1 text-sm">Sarrafos, tábuas e pontaletes de reflorestamento. Custo-benefício para caixaria e estruturas secundárias.</p>
        </div>
        {/* GALERIA */}
        <GaleriaProduto
          titulo={produto ? `Pinus — ${produto.tipo}` : aba !== "Todos" ? `Pinus — ${aba}` : "Pinus"}
          subtitulo={produto || aba !== "Todos" ? "Foto em breve" : "Selecione o produto para ver as fotos"}
          imagens={imagensPinus[produto ? produto.tipo : aba] ?? []}
        />
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
            Selecione o Produto
          </h2>
          {/* Abas de filtro */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {ABAS.map((a) => (
              <button key={a} onClick={() => { setAba(a); setProdutoId(null); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${aba === a ? "bg-orange-500 text-white border-orange-500" : "border-gray-200 text-gray-600 hover:border-orange-300"}`}>
                {a}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {filtrados.map((p) => (
              <button key={p.id} onClick={() => setProdutoId(p.id)}
                className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all relative ${produtoId === p.id ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}>
                <div>
                  <span className="font-semibold text-gray-900 text-sm">{p.nome}</span>
                  <span className="text-xs text-gray-400 ml-2">por {p.unidade}</span>
                </div>
                {p.lider && <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">★ Campeão</span>}
              </button>
            ))}
          </div>
        </section>
        {produtoId && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
              Quantidade
            </h2>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setQuantidade(q => Math.max(1, q - 5))} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">−</button>
                <input type="number" value={quantidade} onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))} className="w-20 py-2 text-center font-bold text-gray-900 border-x border-gray-200 focus:outline-none" />
                <button onClick={() => setQuantidade(q => q + 5)} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">+</button>
              </div>
              <span className="text-sm text-gray-500">{produto?.unidade}</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
              <p className="font-bold text-gray-900">Pinus — {produto?.nome}</p>
              <p className="text-orange-600 font-semibold text-sm mt-1">{quantidade} {produto?.unidade}</p>
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
      </div>
      <CrossSellModal aberto={crossSellAberto} onFechar={() => setCrossSellAberto(false)} produtoPrincipal="Pinus" relacionados={CROSS_PINUS} />
      <ModalCotarWhatsApp aberto={modalWppAberto} onFechar={() => setModalWppAberto(false)} nomeProduto="Pinus" corpoMensagem={corpoMsgWpp} />
    </div>
  );
}
