import { useState } from "react";
import { ChevronRight, MessageCircle, ShoppingCart, Check } from "lucide-react";
import { useOrcamento } from "../../../context/OrcamentoContext";
import ModalCotarWhatsApp from "../../../components/ModalCotarWhatsApp";
import GaleriaProduto from "../../../components/GaleriaProduto";
import ProdutoLayout from "../../../components/site/ProdutoLayout";
import { imagensEucalipto } from "../../../data/imagensProduto";

type Ficha = {
  id: string;
  nome: string;
  descricao: string;
  badge?: string;
  comprimentos: string[];
  espessuras?: string[];
};

const FICHAS: Ficha[] = [
  {
    id: "eucalipto-in-natura",
    nome: "Eucalipto In Natura",
    descricao: "Roliço sem tratamento químico. Uso temporário e escoramentos.",
    comprimentos: ["2,0m", "2,5m", "3,0m", "4,0m", "5,0m", "6,0m"],
  },
  {
    id: "eucalipto-tratado",
    nome: "Eucalipto Tratado",
    descricao: "Tratado em autoclave CCA. Reflorestamento certificado.",
    badge: "★ Campeão de Vendas",
    comprimentos: ["2,0m", "2,5m", "3,0m", "4,0m", "5,0m", "6,0m"],
    espessuras: ["6cm", "8cm", "10cm", "12cm", "14cm", "16cm"],
  },
];

export default function Eucalipto() {
  const { adicionar } = useOrcamento();
  const [fichaId, setFichaId] = useState<string>("eucalipto-tratado");
  const [comprimento, setComprimento] = useState<string | null>(null);
  const [espessura, setEspessura] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const ficha = FICHAS.find((f) => f.id === fichaId)!;
  const pronto = Boolean(comprimento && quantidade >= 1 && (!ficha.espessuras || espessura));

  const variacao = [espessura ? `Espessura ${espessura}` : null, comprimento]
    .filter(Boolean)
    .join(" · ");

  const corpoMsgWpp = pronto
    ? `🌿 *${ficha.nome}*\n` +
      (espessura ? `• Espessura: ${espessura}\n` : "") +
      `• Comprimento: ${comprimento}\n• Quantidade: ${quantidade} peças`
    : "";

  const handleAdicionar = () => {
    if (!pronto) return;
    adicionar({
      id: `${ficha.id}-${espessura ?? ""}-${comprimento}`,
      nome: ficha.nome,
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
      breadcrumb={
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-1 text-xs text-gray-500">
          <a href="/catalogo" className="hover:text-orange-500">Catálogo</a>
          <ChevronRight size={12} />
          <a href="/catalogo/madeiramento" className="hover:text-orange-500">Madeiramento</a>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">Eucalipto</span>
        </div>
      </div>
      }
      cabecalho={
          <div>
            <h1 className="text-2xl font-bold text-gray-900">🌿 Eucalipto</h1>
            <p className="text-gray-500 mt-1 text-sm">
              Eucalipto in natura e tratado em autoclave. Reflorestamento certificado.
            </p>
          </div>
      }
      galeria={
        <GaleriaProduto
          titulo={`Eucalipto — ${ficha.nome}`}
          subtitulo="Foto em breve"
          imagens={imagensEucalipto[ficha.id] ?? []}
        />
      }
    >
      <>
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
              Tipo de Eucalipto
            </h2>
            <div className="space-y-2">
              {FICHAS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => { setFichaId(f.id); setComprimento(null); setEspessura(null); }}
                  className={`w-full text-left p-4 rounded-xl border transition-all relative
                    ${fichaId === f.id ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}
                >
                  {f.badge && (
                    <span className="absolute top-2 right-2 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      {f.badge}
                    </span>
                  )}
                  <p className="font-semibold text-gray-900 text-sm pr-24">{f.nome}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{f.descricao}</p>
                </button>
              ))}
            </div>
          </section>

          {ficha.espessuras && (
            <section className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
                Espessura
              </h2>
              <div className="flex flex-wrap gap-2">
                {ficha.espessuras.map((e) => (
                  <button key={e} onClick={() => setEspessura(e)}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${espessura === e ? "border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-200" : "border-gray-200 text-gray-700 hover:border-orange-300"}`}>
                    {e}
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">{ficha.espessuras ? 3 : 2}</span>
              Comprimento
            </h2>
            <div className="flex flex-wrap gap-2">
              {ficha.comprimentos.map((c) => (
                <button key={c} onClick={() => setComprimento(c)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${comprimento === c ? "border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-200" : "border-gray-200 text-gray-700 hover:border-orange-300"}`}>
                  {c}
                </button>
              ))}
            </div>
          </section>

          {pronto && (
            <section className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">{ficha.espessuras ? 4 : 3}</span>
                Quantidade
              </h2>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => setQuantidade(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">−</button>
                  <input type="number" value={quantidade} onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))} className="w-20 py-2 text-center font-bold text-gray-900 border-x border-gray-200 focus:outline-none" />
                  <button onClick={() => setQuantidade(q => q + 1)} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">+</button>
                </div>
                <span className="text-sm text-gray-500">peças</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-5">
                <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
                <p className="font-bold text-gray-900">{ficha.nome}</p>
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

          <ModalCotarWhatsApp aberto={modalWppAberto} onFechar={() => setModalWppAberto(false)} nomeProduto={ficha.nome} corpoMensagem={corpoMsgWpp} />
      </>
    </ProdutoLayout>
  );
}
