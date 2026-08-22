import { useState } from "react";
import { ChevronRight, MessageCircle, ShoppingCart, Check } from "lucide-react";
import { useOrcamento } from "../../../context/OrcamentoContext";
import ModalCotarWhatsApp from "../../../components/ModalCotarWhatsApp";
import GaleriaProduto from "../../../components/GaleriaProduto";
import ProdutoLayout from "../../../components/site/ProdutoLayout";
import TipoCard from "../../../components/site/TipoCard";
import { imagensEucalipto } from "../../../data/imagensProduto";

const TIPOS = [
  {
    id: "Tratado em Autoclave",
    icone: "🛡️",
    desc: "CCA Tipo C · contato com solo e uso prolongado",
    badge: "★ Mais vendido",
  },
  {
    id: "In Natura",
    icone: "🌱",
    desc: "Sem tratamento químico · escoramento temporário",
  },
];

const BITOLAS = [
  "6cm a 8cm",
  "8cm a 10cm",
  "10cm a 12cm",
  "12cm a 14cm",
  "14cm a 16cm",
  "16cm a 18cm",
];

const COMPRIMENTOS = ["2,0m", "2,5m", "3,0m", "4,0m", "5,0m", "6,0m"];

const ESPECIFICACOES: [string, string][] = [
  ["Espécie", "Eucalipto (reflorestamento)"],
  ["Formato", "Roliço descascado"],
  ["Tratamento", "Autoclave — CCA Tipo C"],
  ["Uso", "Escoramento, pontaletes de obra e estruturas"],
];

export default function PontaleteEucalipto() {
  const { adicionar } = useOrcamento();
  const [tipo, setTipo] = useState<string | null>(null);
  const [bitola, setBitola] = useState<string | null>(null);
  const [comprimento, setComprimento] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(10);
  const [adicionado, setAdicionado] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const pronto = Boolean(tipo && bitola && comprimento && quantidade >= 1);
  const variacao = pronto ? `Ø ${bitola} · ${comprimento} · ${tipo}` : "";
  const corpoMsgWpp = pronto
    ? `🪵 *Pontalete de Eucalipto*\n• Tipo: ${tipo}\n• Bitola/Diâmetro: ${bitola}\n• Comprimento: ${comprimento}\n• Quantidade: ${quantidade} peças`
    : "";

  const handleAdicionar = () => {
    if (!pronto) return;
    adicionar({
      id: `pontalete-eucalipto-${tipo}-${bitola}-${comprimento}`,
      nome: "Pontalete de Eucalipto Tratado",
      variacao,
      quantidade,
      unidade: "peças",
      categoria: "Madeiramento",
    });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 800);
  };

  return (
    <ProdutoLayout
      produtoKey="eucalipto"
      especificacoes={ESPECIFICACOES}
      breadcrumb={
        <div className="bg-white border-b px-4 py-3">
          <div className="max-w-3xl mx-auto flex items-center gap-1 text-xs text-gray-500">
            <a href="/catalogo" className="hover:text-orange-500">Catálogo</a>
            <ChevronRight size={12} />
            <a href="/catalogo/madeiramento" className="hover:text-orange-500">Madeiramento</a>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-medium">Pontalete de Eucalipto</span>
          </div>
        </div>
      }
      cabecalho={
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🪵 Pontalete de Eucalipto</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Pontalete roliço tratado em autoclave. Escolha a bitola (diâmetro) e o comprimento.
          </p>
        </div>
      }
      galeria={
        <GaleriaProduto
          titulo="Pontalete de Eucalipto"
          subtitulo="Foto em breve"
          imagens={imagensEucalipto["pontalete-eucalipto"] ?? []}
        />
      }
    >
      <>
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
            Tipo de Pontalete
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {TIPOS.map((t) => (
              <TipoCard
                key={t.id}
                icone={t.icone}
                nome={t.id}
                descricao={t.desc}
                badge={t.badge}
                selected={tipo === t.id}
                onClick={() => { setTipo(t.id); setBitola(null); setComprimento(null); }}
              />
            ))}
          </div>
        </section>

        {tipo && (
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
            Bitola / Diâmetro
          </h2>
          <div className="flex flex-wrap gap-2">
            {BITOLAS.map((b) => (
              <button key={b} onClick={() => setBitola(b)}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${bitola === b ? "border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-200" : "border-gray-200 text-gray-700 hover:border-orange-300"}`}>
                {b}
              </button>
            ))}
          </div>
        </section>
        )}

        {tipo && bitola && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">3</span>
              Comprimento
            </h2>
            <div className="flex flex-wrap gap-2">
              {COMPRIMENTOS.map((c) => (
                <button key={c} onClick={() => setComprimento(c)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${comprimento === c ? "border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-200" : "border-gray-200 text-gray-700 hover:border-orange-300"}`}>
                  {c}
                </button>
              ))}
            </div>
          </section>
        )}

        {pronto && (
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
              <span className="text-sm text-gray-500">peças</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
              <p className="font-bold text-gray-900">Pontalete de Eucalipto Tratado</p>
              <p className="text-gray-600 text-sm">{variacao}</p>
              <p className="text-orange-600 font-semibold text-sm mt-1">{quantidade} peças</p>
            </div>
            <div className="space-y-3">
              <button onClick={handleAdicionar} className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm ${adicionado ? "bg-green-600 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"}`}>
                {adicionado ? <><Check size={18} /> Adicionado!</> : <><ShoppingCart size={18} /> Adicionar ao Orçamento</>}
              </button>
              <button onClick={() => setModalWppAberto(true)} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
                <MessageCircle size={18} /> Cotar no WhatsApp
              </button>
            </div>
          </section>
        )}

        <ModalCotarWhatsApp
          aberto={modalWppAberto}
          onFechar={() => setModalWppAberto(false)}
          nomeProduto="Pontalete de Eucalipto"
          corpoMensagem={corpoMsgWpp}
        />
      </>
    </ProdutoLayout>
  );
}
