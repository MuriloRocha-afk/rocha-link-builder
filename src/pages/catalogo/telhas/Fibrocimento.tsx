// Mesma lógica do Fibrocimento.tsx, mas com galeria dinâmica por comprimento
// Cole este arquivo no lugar do Fibrocimento.tsx no Lovable

import { useState } from "react";
import { ChevronRight, ShoppingCart, Check, MessageCircle } from "lucide-react";
import { useOrcamento } from "../../../context/OrcamentoContext";
import CrossSellModal from "../../../components/CrossSellModal";
import ModalCotarWhatsApp from "../../../components/ModalCotarWhatsApp";
import GaleriaProduto from "../../../components/GaleriaProduto";
import { imagensFibrocimento } from "../../../data/imagensProduto";
import { CROSS_SELL } from "../../../data/crossSell";

const COMPRIMENTOS = [
  { valor: "153 × 110 cm", larguraUtil: 1.05, sobreposicao: 0.14 },
  { valor: "183 × 110 cm", larguraUtil: 1.05, sobreposicao: 0.14 },
  { valor: "213 × 110 cm", larguraUtil: 1.05, sobreposicao: 0.14 },
  { valor: "244 × 110 cm", larguraUtil: 1.05, sobreposicao: 0.14, lider: true },
  { valor: "305 × 110 cm", larguraUtil: 1.05, sobreposicao: 0.14 },
  { valor: "366 × 110 cm", larguraUtil: 1.05, sobreposicao: 0.14 },
];
const ESPESSURAS = [
  { valor: "5 mm", lider: true },
  { valor: "6 mm" },
  { valor: "8 mm", label: "Maior resistência" },
];

function calcularCobertura(comprimento: string, quantidade: number): number {
  const comp = COMPRIMENTOS.find((c) => c.valor === comprimento);
  if (!comp) return 0;
  const metros = parseFloat(comprimento.split(" ")[0]) / 100;
  return Math.round((metros - comp.sobreposicao) * comp.larguraUtil * quantidade * 10) / 10;
}

export default function Fibrocimento() {
  const { adicionar } = useOrcamento();
  const [comprimento, setComprimento] = useState<string | null>(null);
  const [espessura, setEspessura] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(50);
  const [adicionado, setAdicionado] = useState(false);
  const [crossSellAberto, setCrossSellAberto] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const pronto = comprimento && espessura && quantidade >= 1;
  const cobertura = comprimento ? calcularCobertura(comprimento, quantidade) : 0;

  // Galeria troca conforme comprimento selecionado
  const imagens = comprimento ? (imagensFibrocimento[comprimento] ?? []) : [];

  const corpoMsgWpp = pronto
    ? `🧱 *Telha Fibrocimento Ondulada INFIBRA*\n• Dimensão: ${comprimento}\n• Espessura: ${espessura}\n• Quantidade: ${quantidade} peças\n• Cobertura estimada: ~${cobertura} m²`
    : "";

  const handleAdicionar = () => {
    if (!pronto) return;
    adicionar({ id: `fibro-${comprimento}-${espessura}`, nome: "Telha Fibrocimento INFIBRA", variacao: `${comprimento} · ${espessura}`, quantidade, unidade: "peças", categoria: "Telhas" });
    setAdicionado(true);
    setTimeout(() => { setAdicionado(false); setCrossSellAberto(true); }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-1 text-xs text-gray-500">
          <a href="/catalogo" className="hover:text-orange-500">Catálogo</a>
          <ChevronRight size={12} />
          <a href="/catalogo/telhas" className="hover:text-orange-500">Telhas</a>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">Fibrocimento INFIBRA</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">★ Campeão de Vendas #1</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">Telha Fibrocimento Ondulada — INFIBRA</h1>
          <p className="text-gray-500 mt-1 text-sm">Selecione o comprimento para ver a foto e configurar seu pedido.</p>
        </div>

        {/* GALERIA — troca ao mudar comprimento */}
        <GaleriaProduto
          titulo={comprimento ? `Fibrocimento INFIBRA ${comprimento}` : "Selecione um comprimento para ver as fotos"}
          imagens={imagens}
        />

        {/* Comprimento */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
            Comprimento da chapa
          </h2>
          <div className="space-y-2">
            {COMPRIMENTOS.map((c) => (
              <button key={c.valor} onClick={() => setComprimento(c.valor)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between relative ${comprimento === c.valor ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}>
                <div>
                  <span className="font-semibold text-gray-900 text-sm">{c.valor}</span>
                  <span className="text-gray-400 text-xs ml-2">largura útil {c.larguraUtil}m</span>
                </div>
                {c.lider && <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">★ Líder</span>}
              </button>
            ))}
          </div>
        </section>

        {/* Espessura */}
        {comprimento && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
              Espessura
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {ESPESSURAS.map((e) => (
                <button key={e.valor} onClick={() => setEspessura(e.valor)}
                  className={`p-3 rounded-xl border text-center transition-all relative ${espessura === e.valor ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}>
                  {e.lider && <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">★ Mais vendida</span>}
                  <p className="font-bold text-gray-900 text-sm mt-1">{e.valor}</p>
                  {e.label && <p className="text-xs text-gray-500 mt-0.5">{e.label}</p>}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Quantidade */}
        {espessura && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">3</span>
              Quantidade
            </h2>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setQuantidade(q => Math.max(1, q - 5))} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">−</button>
                <input type="number" value={quantidade} onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))} className="w-20 py-2 text-center font-bold text-gray-900 border-x border-gray-200 focus:outline-none" />
                <button onClick={() => setQuantidade(q => q + 5)} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">+</button>
              </div>
            </div>
            {cobertura > 0 && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-5">
                <p className="text-sm text-blue-800"><strong>Cobertura estimada: ~{cobertura} m²</strong> <span className="text-blue-600 text-xs">(sobreposição 14cm)</span></p>
              </div>
            )}
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
              <p className="font-bold text-gray-900">Telha Fibrocimento INFIBRA</p>
              <p className="text-gray-600 text-sm">{comprimento} · {espessura}</p>
              <p className="text-orange-600 font-semibold text-sm mt-1">{quantidade} peças · ~{cobertura} m²</p>
            </div>
            <div className="space-y-3">
              <button onClick={handleAdicionar}
                className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm ${adicionado ? "bg-green-600 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"}`}>
                {adicionado ? <><Check size={18} /> Adicionado!</> : <><ShoppingCart size={18} /> Adicionar ao Orçamento</>}
              </button>
              <button onClick={() => pronto && setModalWppAberto(true)} disabled={!pronto}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
                <MessageCircle size={18} /> Cotar no WhatsApp
              </button>
            </div>
          </section>
        )}

        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3">Especificações Técnicas</h2>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100">
              {[["Inclinação mínima","10%"],["Sobreposição lateral","1 onda"],["Sobreposição longitudinal","14 cm"],["Largura útil","1,05 m (total 1,10 m)"],["Fixação","Parafuso com vedação 110mm"]].map(([k,v])=>(
                <tr key={k}><td className="py-2.5 text-gray-500">{k}</td><td className="py-2.5 text-gray-900 font-medium text-right">{v}</td></tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <CrossSellModal aberto={crossSellAberto} onFechar={() => setCrossSellAberto(false)} produtoPrincipal="Telha Fibrocimento INFIBRA" relacionados={CROSS_SELL["fibrocimento"]} />
      <ModalCotarWhatsApp aberto={modalWppAberto} onFechar={() => setModalWppAberto(false)} nomeProduto="Telha Fibrocimento INFIBRA" corpoMensagem={corpoMsgWpp} />
    </div>
  );
}
