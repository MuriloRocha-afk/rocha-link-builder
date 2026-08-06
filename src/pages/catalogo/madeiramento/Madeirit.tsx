import { useState } from "react";
import { ChevronRight, ShoppingCart, Check, MessageCircle } from "lucide-react";
import { useOrcamento } from "../../../context/OrcamentoContext";
import ModalCotarWhatsApp from "../../../components/ModalCotarWhatsApp";

const PRODUTOS = [
  { id: "madeirit-preto-10mm", nome: "Madeirit Plastificado Preto 10mm", desc: "220cm × 110cm", badge: "★ Mais vendido", cor: "Preto" },
  { id: "madeirit-preto-12mm", nome: "Madeirit Plastificado Preto 12mm", desc: "220cm × 110cm", badge: null, cor: "Preto" },
  { id: "madeirit-preto-14mm", nome: "Madeirit Plastificado Preto 14mm", desc: "220cm × 110cm", badge: null, cor: "Preto" },
  { id: "madeirit-preto-16mm", nome: "Madeirit Plastificado Preto 16mm", desc: "220cm × 110cm", badge: null, cor: "Preto" },
  { id: "madeirit-preto-18mm", nome: "Madeirit Plastificado Preto 18mm", desc: "220cm × 110cm", badge: null, cor: "Preto" },
  { id: "madeirit-preto-20mm", nome: "Madeirit Plastificado Preto 20mm", desc: "220cm × 110cm", badge: null, cor: "Preto" },
  { id: "madeirit-rosa-5mm", nome: "Madeirit Rosa 5mm", desc: "220cm × 110cm", badge: null, cor: "Rosa" },
  { id: "madeirit-rosa-9mm", nome: "Madeirit Rosa 9mm", desc: "220cm × 110cm", badge: null, cor: "Rosa" },
  { id: "madeirit-rosa-12mm", nome: "Madeirit Rosa 12mm", desc: "220cm × 110cm", badge: null, cor: "Rosa" },
  { id: "osb-10mm", nome: "OSB Multiplac 10mm", desc: "220cm × 122cm", badge: null, cor: "OSB" },
  { id: "compensado-9mm", nome: "Compensado 9mm", desc: "220cm × 160cm", badge: null, cor: "Compensado" },
  { id: "compensado-11mm", nome: "Compensado 11mm", desc: "220cm × 160cm", badge: null, cor: "Compensado" },
  { id: "compensado-15mm", nome: "Compensado 15mm", desc: "220cm × 160cm", badge: null, cor: "Compensado" },
];

const FILTROS = ["Todos", "Preto", "Rosa", "OSB", "Compensado"];

export default function Madeirit() {
  const { adicionar } = useOrcamento();
  const [filtro, setFiltro] = useState("Todos");
  const [produtoId, setProdutoId] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(5);
  const [adicionado, setAdicionado] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const filtrados = filtro === "Todos" ? PRODUTOS : PRODUTOS.filter((p) => p.cor === filtro);
  const produto = PRODUTOS.find((p) => p.id === produtoId);
  const pronto = produtoId && quantidade >= 1;
  const corpoMsgWpp = pronto && produto ? `📋 *${produto.nome}*\n• Dimensão: ${produto.desc}\n• Quantidade: ${quantidade} chapas` : "";

  const handleAdicionar = () => {
    if (!pronto || !produto) return;
    adicionar({ id: `madeirit-${produtoId}`, nome: produto.nome, variacao: produto.desc, quantidade, unidade: "chapas", categoria: "Madeiramento" });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-1 text-xs text-gray-500">
          <a href="/catalogo" className="hover:text-orange-500">Catálogo</a>
          <ChevronRight size={12} />
          <a href="/catalogo/madeiramento" className="hover:text-orange-500">Madeiramento</a>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">Madeirit & Compensado</span>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📋 Madeirit & Compensado</h1>
          <p className="text-gray-500 mt-1 text-sm">Chapas estruturais para formas, forros e revestimentos. Madeirit preto e rosa, OSB e compensado em várias espessuras.</p>
        </div>
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
            Selecione o Produto
          </h2>
          <div className="flex gap-2 mb-4 flex-wrap">
            {FILTROS.map((f) => (
              <button key={f} onClick={() => { setFiltro(f); setProdutoId(null); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${filtro === f ? "bg-orange-500 text-white border-orange-500" : "border-gray-200 text-gray-600 hover:border-orange-300"}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {filtrados.map((p) => (
              <button key={p.id} onClick={() => setProdutoId(p.id)}
                className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${produtoId === p.id ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}>
                <div>
                  <span className="font-semibold text-gray-900 text-sm">{p.nome}</span>
                  <span className="text-xs text-gray-400 ml-2">{p.desc}</span>
                </div>
                {p.badge && <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">{p.badge}</span>}
              </button>
            ))}
          </div>
        </section>
        {produtoId && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
              Quantidade de chapas
            </h2>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setQuantidade(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">−</button>
                <input type="number" value={quantidade} onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))} className="w-20 py-2 text-center font-bold text-gray-900 border-x border-gray-200 focus:outline-none" />
                <button onClick={() => setQuantidade(q => q + 1)} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">+</button>
              </div>
              <span className="text-sm text-gray-500">chapas</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
              <p className="font-bold text-gray-900">{produto?.nome}</p>
              <p className="text-gray-600 text-sm">{produto?.desc}</p>
              <p className="text-orange-600 font-semibold text-sm mt-1">{quantidade} chapas</p>
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
      <ModalCotarWhatsApp aberto={modalWppAberto} onFechar={() => setModalWppAberto(false)} nomeProduto={produto?.nome ?? "Madeirit"} corpoMensagem={corpoMsgWpp} />
    </div>
  );
}
