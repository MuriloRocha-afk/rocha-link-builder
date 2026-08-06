import { useState } from "react";
import { ChevronRight, ShoppingCart, Check, MessageCircle } from "lucide-react";
import { useOrcamento } from "../../context/OrcamentoContext";
import ModalCotarWhatsApp from "../../components/ModalCotarWhatsApp";

const SECOES = [
  {
    titulo: "Verniz para Madeira",
    emoji: "✨",
    produtos: [
      { id: "anjo-verniz-3-6", nome: "Anjo Verniz Dura Mais — Natural Brilhante 3,6L", unidade: "Un" },
      { id: "anjo-verniz-18l", nome: "Anjo Verniz Dura Mais — Natural Brilhante 18L", unidade: "Un" },
      { id: "anjo-maritimo-3-6", nome: "Anjo Verniz Marítimo Premium — Natural 3,6L", unidade: "Un" },
      { id: "sayerlack-polisten-imbuia", nome: "Sayerlack Polisten — Imbuia 3,6L", unidade: "Un" },
      { id: "sayerlack-polisten-mogno", nome: "Sayerlack Polisten — Mogno Inglês 3,6L", unidade: "Un" },
      { id: "sayerlack-polisten-transp", nome: "Sayerlack Polisten — Transparente 3,6L", unidade: "Un" },
      { id: "sayerlack-sayermar-3l", nome: "Sayerlack Sayermar Verniz Marítimo 3L", unidade: "Un" },
      { id: "iraja-verniz-cerejeira", nome: "Irajá Verniz — Cerejeira 3,6L", unidade: "Un" },
      { id: "iraja-verniz-imbuia", nome: "Irajá Verniz — Imbuia 3,6L", unidade: "Un" },
    ],
  },
  {
    titulo: "Stain para Madeira",
    emoji: "🪵",
    produtos: [
      { id: "anjo-stain-imbuia-3-6", nome: "Anjo Stain Casa — Imbuia Acetinado 3,6L", unidade: "Un" },
      { id: "anjo-stain-incolor-3-6", nome: "Anjo Stain Casa — Incolor Acetinado 3,6L", unidade: "Un" },
      { id: "anjo-stain-ipe-3-6", nome: "Anjo Stain Casa — Ipê Acetinado 3,6L", unidade: "Un" },
      { id: "anjo-stain-mogno-3-6", nome: "Anjo Stain Casa — Mogno Acetinado 3,6L", unidade: "Un" },
    ],
  },
  {
    titulo: "Tinta Acrílica",
    emoji: "🎨",
    produtos: [
      { id: "anjo-emborrachada-3-6", nome: "Anjo Emborrachada 3,6L", unidade: "Un" },
      { id: "anjo-emborrachada-18l", nome: "Anjo Emborrachada 18L", unidade: "Un" },
      { id: "anjomais-basea-3-24", nome: "AnjoMais Premium — Base A Fosca 3,24L", unidade: "Un" },
      { id: "anjomais-baseb-3-24", nome: "AnjoMais Premium — Base B Fosca 3,24L", unidade: "Un" },
    ],
  },
  {
    titulo: "Esmalte Sintético",
    emoji: "🖌️",
    produtos: [
      { id: "esm-preto-3-6", nome: "Anjo Esmalte Tomplus — Preto Brilhante 3,6L", unidade: "Un" },
      { id: "esm-cinza-3-6", nome: "Anjo Esmalte Tomplus — Cinza Médio Brilhante 3,6L", unidade: "Un" },
      { id: "esm-branco-3-6", nome: "Anjo E.S Fluence 3,6L", unidade: "Un" },
      { id: "esm-vermelho-900", nome: "Anjo Esmalte Tomplus — Vermelho Brilhante 900ml", unidade: "Un" },
    ],
  },
  {
    titulo: "Seladora, Primer & Impermeabilização",
    emoji: "🛡️",
    produtos: [
      { id: "anjo-selador-acril-3-6", nome: "Anjo Selador Acrílico Pigmentado 3,6L", unidade: "Un" },
      { id: "anjo-primer-agua-18l", nome: "Primer Base Água 18L", unidade: "Un" },
      { id: "vedacit-penetrol-3-6", nome: "Vedacit Penetrol 3,6L", unidade: "Un" },
      { id: "vedacit-vedalit-1l", nome: "Vedacit Vedalit 1L", unidade: "Un" },
    ],
  },
  {
    titulo: "Proteção de Madeira / Cupicida",
    emoji: "🌿",
    produtos: [
      { id: "apus-5l", nome: "Apus Química — Exterminador de Cupim 5L", unidade: "Un" },
      { id: "ecol-5l", nome: "Ecol — Exterminador de Cupim 5L", unidade: "Un" },
      { id: "sayerlack-extermcupim-900", nome: "Sayerlack — Exterminador de Cupim 900ml", unidade: "Un" },
    ],
  },
  {
    titulo: "Thinner & Diluentes",
    emoji: "🧪",
    produtos: [
      { id: "anjo-thinner-900", nome: "Anjo Thinner — Limpeza e Diluição 900ml", unidade: "Un" },
      { id: "anjo-diluente-900", nome: "Anjo Diluente Premium 900ml", unidade: "Un" },
      { id: "sayerlack-thinner-900", nome: "Sayerlack Thinner Profissional 900ml", unidade: "Un" },
      { id: "aguarraz-900", nome: "Aguarraz 900ml", unidade: "Un" },
    ],
  },
];

export default function Tintas() {
  const { adicionar } = useOrcamento();
  const [secaoId, setSecaoId] = useState<number | null>(null);
  const [produtoId, setProdutoId] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const secao = secaoId !== null ? SECOES[secaoId] : null;
  const produto = secao?.produtos.find((p) => p.id === produtoId);
  const pronto = produtoId && quantidade >= 1;
  const corpoMsgWpp = pronto && produto ? `🎨 *${produto.nome}*\n• Quantidade: ${quantidade} ${produto.unidade}` : "";

  const handleAdicionar = () => {
    if (!pronto || !produto) return;
    adicionar({ id: produtoId!, nome: produto.nome, variacao: `${quantidade} ${produto.unidade}`, quantidade, unidade: produto.unidade, categoria: "Tintas" });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-1 text-xs text-gray-500">
          <a href="/catalogo" className="hover:text-orange-500">Catálogo</a>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">Tintas, Vernizes & Proteção</span>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🎨 Tintas, Vernizes & Proteção</h1>
          <p className="text-gray-500 mt-1 text-sm">Anjo, Sayerlack, Vedacit e mais — linha completa para proteger madeira, telha e alvenaria.</p>
        </div>
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
            Tipo de Produto
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
      <ModalCotarWhatsApp aberto={modalWppAberto} onFechar={() => setModalWppAberto(false)} nomeProduto={produto?.nome ?? "Tinta"} corpoMensagem={corpoMsgWpp} />
    </div>
  );
}
