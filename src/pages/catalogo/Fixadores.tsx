import { useState } from "react";
import { ChevronRight, ShoppingCart, Check, MessageCircle } from "lucide-react";
import { useOrcamento } from "../../context/OrcamentoContext";
import ModalCotarWhatsApp from "../../components/ModalCotarWhatsApp";

const SECOES = [
  {
    titulo: "Parafusos para Telha Fibrocimento",
    emoji: "🔩",
    produtos: [
      { id: "par-110mm-avulso", nome: "Parafuso Vedação 110mm — Avulso", unidade: "Un" },
      { id: "par-110mm-10un", nome: "Parafuso Vedação 110mm — 10 Un", unidade: "Emb" },
      { id: "par-110mm-20un", nome: "Parafuso Vedação 110mm — 20 Un", unidade: "Emb" },
      { id: "par-110mm-30un", nome: "Parafuso Vedação 110mm — 30 Un", unidade: "Emb" },
      { id: "par-110mm-40un", nome: "Parafuso Vedação 110mm — 40 Un", unidade: "Emb" },
      { id: "par-110mm-50un", nome: "Parafuso Vedação 110mm — 50 Un", unidade: "Emb" },
      { id: "par-150mm-avulso", nome: "Parafuso Vedação 150mm — Avulso", unidade: "Un" },
      { id: "par-200mm-avulso", nome: "Parafuso Vedação 200mm — Avulso", unidade: "Un" },
    ],
  },
  {
    titulo: "Kits Fixação Telha Colonial PVC",
    emoji: "🧰",
    produtos: [
      { id: "kit-ceramica-20un", nome: "Kit Fixação e Vedação — Cerâmica · 20 Un", unidade: "Emb" },
      { id: "kit-cinza-20un", nome: "Kit Fixação e Vedação — Cinza · 20 Un", unidade: "Emb" },
      { id: "kit-marfim-20un", nome: "Kit Fixação e Vedação — Marfim · 20 Un", unidade: "Emb" },
      { id: "kit-cores-sem-par", nome: "Kit Fixação e Vedação — Cores (sem parafuso)", unidade: "Un" },
    ],
  },
  {
    titulo: "Espigões para Telha Fibrocimento",
    emoji: "📌",
    produtos: [
      { id: "espigao-120-inicial", nome: "Espigão 120cm × 6mm — Inicial", unidade: "Un" },
      { id: "espigao-120-sequencial", nome: "Espigão 120cm × 6mm — Sequencial", unidade: "Un" },
      { id: "espigao-180-sequencial", nome: "Espigão 180cm × 6mm — Confibra — Sequencial", unidade: "Un" },
    ],
  },
  {
    titulo: "Pregos",
    emoji: "🔨",
    produtos: [
      { id: "prego-telheiro-500g", nome: "Prego Telheiro 18×27 — 500g", unidade: "Emb" },
      { id: "prego-polido-17x21-kg", nome: "Prego Polido com Cabeça 17×21 — Kg", unidade: "Kg" },
      { id: "prego-polido-18x27-kg", nome: "Prego Polido com Cabeça 18×27 — Kg", unidade: "Kg" },
      { id: "prego-polido-19x36-kg", nome: "Prego Polido com Cabeça 19×36 — Kg", unidade: "Kg" },
      { id: "prego-polido-20x48-kg", nome: "Prego Polido com Cabeça 20×48 — Kg", unidade: "Kg" },
      { id: "prego-polido-sem-cab-10x10", nome: "Prego Polido sem Cabeça 10×10 — Kg", unidade: "Kg" },
    ],
  },
  {
    titulo: "Arames",
    emoji: "〰️",
    produtos: [
      { id: "arame-galv-bwg14", nome: "Arame Galvanizado BWG14", unidade: "Un" },
      { id: "arame-galv-bwg16", nome: "Arame Galvanizado BWG16", unidade: "Un" },
      { id: "arame-galv-bwg18", nome: "Arame Galvanizado BWG18", unidade: "Un" },
      { id: "arame-recozido-n12", nome: "Arame Recozido N12 — Liso", unidade: "Un" },
      { id: "arame-recozido-n18", nome: "Arame Recozido N18 — Torcido", unidade: "Un" },
    ],
  },
  {
    titulo: "Outros Fixadores",
    emoji: "⚙️",
    produtos: [
      { id: "barra-roscada-14-1m", nome: "Barra Roscada 1/4 × 1,0m", unidade: "Un" },
      { id: "barra-roscada-38-1m", nome: "Barra Roscada 3/8 × 1,0m", unidade: "Un" },
      { id: "barra-roscada-12-1m", nome: "Barra Roscada 1/2 × 1,0m", unidade: "Un" },
      { id: "arruela-lisa-14", nome: "Arruela Lisa Zincada 1/4", unidade: "Un" },
      { id: "arruela-lisa-38", nome: "Arruela Lisa Zincada 3/8", unidade: "Un" },
      { id: "parafuso-chipboard-3-5x20", nome: "Parafuso Chipboard 3,5 × 20", unidade: "Un" },
      { id: "parafuso-chipboard-5x50", nome: "Parafuso Chipboard 5,0 × 50", unidade: "Un" },
    ],
  },
];

export default function Fixadores() {
  const { adicionar } = useOrcamento();
  const [secaoId, setSecaoId] = useState<number | null>(null);
  const [produtoId, setProdutoId] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(10);
  const [adicionado, setAdicionado] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const secao = secaoId !== null ? SECOES[secaoId] : null;
  const produto = secao?.produtos.find((p) => p.id === produtoId);
  const pronto = produtoId && quantidade >= 1;
  const corpoMsgWpp = pronto && produto ? `🔩 *${produto.nome}*\n• Quantidade: ${quantidade} ${produto.unidade}` : "";

  const handleAdicionar = () => {
    if (!pronto || !produto) return;
    adicionar({ id: produtoId!, nome: produto.nome, variacao: `${quantidade} ${produto.unidade}`, quantidade, unidade: produto.unidade, categoria: "Fixadores" });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-1 text-xs text-gray-500">
          <a href="/catalogo" className="hover:text-orange-500">Catálogo</a>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">Fixadores & Acessórios</span>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🔩 Fixadores & Acessórios</h1>
          <p className="text-gray-500 mt-1 text-sm">Parafusos para telha, pregos, espigões, kits de fixação e tudo para a instalação de coberturas e estruturas.</p>
        </div>
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
            Categoria
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SECOES.map((s, i) => (
              <button key={i} onClick={() => { setSecaoId(i); setProdutoId(null); }}
                className={`p-3 rounded-xl border text-center transition-all ${secaoId === i ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}>
                <span className="text-xl">{s.emoji}</span>
                <p className="font-semibold text-gray-900 text-xs mt-1 leading-tight">{s.titulo}</p>
              </button>
            ))}
          </div>
        </section>
        {secao && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
              {secao.titulo}
            </h2>
            <div className="space-y-2">
              {secao.produtos.map((p) => (
                <button key={p.id} onClick={() => setProdutoId(p.id)}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${produtoId === p.id ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}>
                  <span className="font-semibold text-gray-900 text-sm">{p.nome}</span>
                  <span className="text-xs text-gray-400">{p.unidade}</span>
                </button>
              ))}
            </div>
          </section>
        )}
        {produtoId && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">3</span>
              Quantidade
            </h2>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setQuantidade(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">−</button>
                <input type="number" value={quantidade} onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))} className="w-20 py-2 text-center font-bold text-gray-900 border-x border-gray-200 focus:outline-none" />
                <button onClick={() => setQuantidade(q => q + 1)} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">+</button>
              </div>
              <span className="text-sm text-gray-500">{produto?.unidade}</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
              <p className="font-bold text-gray-900">{produto?.nome}</p>
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
      <ModalCotarWhatsApp aberto={modalWppAberto} onFechar={() => setModalWppAberto(false)} nomeProduto={produto?.nome ?? "Fixador"} corpoMensagem={corpoMsgWpp} />
    </div>
  );
}
