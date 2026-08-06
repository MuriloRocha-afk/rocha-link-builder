import { useState } from "react";
import { ChevronRight, ShoppingCart, Check, MessageCircle } from "lucide-react";
import { useOrcamento } from "../../context/OrcamentoContext";
import CrossSellModal from "../../components/CrossSellModal";
import ModalCotarWhatsApp from "../../components/ModalCotarWhatsApp";

const SECOES = [
  {
    titulo: "Calhas",
    emoji: "🌧️",
    produtos: [
      { id: "calha-alge-moldura-2m", nome: "Calha Alge — Moldura Corte 33 · 2,0m", unidade: "Pc" },
      { id: "calha-alge-moldura-3m", nome: "Calha Alge — Moldura Corte 33 · 3,0m", unidade: "Pc" },
      { id: "calha-alge-moldura-4m", nome: "Calha Alge — Moldura Corte 33 · 4,0m", unidade: "Pc" },
      { id: "calha-alge-moldura-5m", nome: "Calha Alge — Moldura Corte 33 · 5,0m", unidade: "Pc" },
      { id: "calha-alge-moldura-6m", nome: "Calha Alge — Moldura Corte 33 · 6,0m", unidade: "Pc" },
      { id: "calha-alge-platibanda-2m", nome: "Calha Alge — Platibanda Corte 33 · 2,0m", unidade: "Pc" },
      { id: "calha-alge-platibanda-3m", nome: "Calha Alge — Platibanda Corte 33 · 3,0m", unidade: "Pc" },
      { id: "calha-alge-platibanda-4m", nome: "Calha Alge — Platibanda Corte 33 · 4,0m", unidade: "Pc" },
      { id: "calha-alge-platibanda-5m", nome: "Calha Alge — Platibanda Corte 33 · 5,0m", unidade: "Pc" },
      { id: "calha-alge-platibanda-6m", nome: "Calha Alge — Platibanda Corte 33 · 6,0m", unidade: "Pc" },
      { id: "calha-aquapluv-cinza", nome: "Calha Aquapluv — Cinza", unidade: "Un" },
      { id: "calha-aquapluv-style", nome: "Calha Aquapluv Style — Retangular", unidade: "Un" },
    ],
  },
  {
    titulo: "Rufos",
    emoji: "🏠",
    produtos: [
      { id: "rufo-alge-2m", nome: "Rufo Alge — Corte 33 · 2,0m", unidade: "Pc" },
      { id: "rufo-alge-3m", nome: "Rufo Alge — Corte 33 · 3,0m", unidade: "Pc" },
      { id: "rufo-alge-4m", nome: "Rufo Alge — Corte 33 · 4,0m", unidade: "Pc" },
      { id: "rufo-alge-5m", nome: "Rufo Alge — Corte 33 · 5,0m", unidade: "Pc" },
      { id: "rufo-alge-6m", nome: "Rufo Alge — Corte 33 · 6,0m", unidade: "Pc" },
    ],
  },
  {
    titulo: "Manta Térmica",
    emoji: "🌡️",
    produtos: [
      { id: "manta-1f-10m2", nome: "Manta Térmica Aluminizada 1F × 10m²", unidade: "Un" },
      { id: "manta-1f-25m2", nome: "Manta Térmica Aluminizada 1F × 25m²", unidade: "Un" },
      { id: "manta-1f-50m2", nome: "Manta Térmica Aluminizada 1F × 50m²", unidade: "Un" },
      { id: "manta-2f-10m2", nome: "Manta Térmica Aluminizada 2F × 10m²", unidade: "Un" },
      { id: "manta-2f-25m2", nome: "Manta Térmica Aluminizada 2F × 25m²", unidade: "Un" },
      { id: "manta-2f-50m2", nome: "Manta Térmica Aluminizada 2F × 50m²", unidade: "Un" },
    ],
  },
  {
    titulo: "Manta Asfáltica",
    emoji: "🛡️",
    produtos: [
      { id: "manta-asf-10x10", nome: "Manta Asfáltica Aluminizada — Terracota 10cm × 10m", unidade: "Un" },
      { id: "manta-asf-20x10", nome: "Manta Asfáltica Aluminizada — Terracota 20cm × 10m", unidade: "Un" },
    ],
  },
];

const CROSS_CALHAS = [
  { id: "suporte-calha-moldura", nome: "Suporte Calha Moldura 28/33", descricao: "Fixação da calha na estrutura. 1 suporte a cada 60cm.", emoji: "🔩", unidade: "Un", quantidadeSugerida: 6, categoria: "Calhas" },
  { id: "saida-central-moldura", nome: "Saída Central Moldura 28/33", descricao: "Saída d'água central da calha.", emoji: "🔽", unidade: "Un", quantidadeSugerida: 1, categoria: "Calhas" },
  { id: "cabeceira-moldura-d", nome: "Cabeceira Moldura 28/33 — Direita", descricao: "Tampa lateral direita da calha.", emoji: "➡️", unidade: "Un", quantidadeSugerida: 1, categoria: "Calhas" },
  { id: "cabeceira-moldura-e", nome: "Cabeceira Moldura 28/33 — Esquerda", descricao: "Tampa lateral esquerda da calha.", emoji: "⬅️", unidade: "Un", quantidadeSugerida: 1, categoria: "Calhas" },
];

export default function Calhas() {
  const { adicionar } = useOrcamento();
  const [secaoId, setSecaoId] = useState<number | null>(null);
  const [produtoId, setProdutoId] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(3);
  const [adicionado, setAdicionado] = useState(false);
  const [crossSellAberto, setCrossSellAberto] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const secao = secaoId !== null ? SECOES[secaoId] : null;
  const produto = secao?.produtos.find((p) => p.id === produtoId);
  const pronto = produtoId && quantidade >= 1;
  const corpoMsgWpp = pronto && produto ? `🌧️ *${produto.nome}*\n• Quantidade: ${quantidade} ${produto.unidade}` : "";

  const handleAdicionar = () => {
    if (!pronto || !produto) return;
    adicionar({ id: produtoId!, nome: produto.nome, variacao: `${quantidade} ${produto.unidade}`, quantidade, unidade: produto.unidade, categoria: "Calhas" });
    setAdicionado(true);
    setTimeout(() => {
      setAdicionado(false);
      if (secaoId === 0) setCrossSellAberto(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-1 text-xs text-gray-500">
          <a href="/catalogo" className="hover:text-orange-500">Catálogo</a>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">Calhas, Rufos & Funilaria</span>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🌧️ Calhas, Rufos & Funilaria</h1>
          <p className="text-gray-500 mt-1 text-sm">Calhas Alge e Aquapluv, rufos galvanizados, mantas térmicas e asfálticas para qualquer cobertura.</p>
        </div>
        {/* Seleção de seção */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
            Categoria de Produto
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {SECOES.map((s, i) => (
              <button key={i} onClick={() => { setSecaoId(i); setProdutoId(null); }}
                className={`p-4 rounded-xl border text-center transition-all ${secaoId === i ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}>
                <span className="text-2xl">{s.emoji}</span>
                <p className="font-semibold text-gray-900 text-sm mt-1">{s.titulo}</p>
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
      <CrossSellModal aberto={crossSellAberto} onFechar={() => setCrossSellAberto(false)} produtoPrincipal="Calha" relacionados={CROSS_CALHAS} />
      <ModalCotarWhatsApp aberto={modalWppAberto} onFechar={() => setModalWppAberto(false)} nomeProduto={produto?.nome ?? "Calha"} corpoMensagem={corpoMsgWpp} />
    </div>
  );
}
