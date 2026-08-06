import { useState } from "react";
import { ChevronRight, ShoppingCart, Check, MessageCircle } from "lucide-react";
import { useOrcamento } from "../../../context/OrcamentoContext";
import CrossSellModal from "../../../components/CrossSellModal";
import ModalCotarWhatsApp from "../../../components/ModalCotarWhatsApp";
import GaleriaProduto from "../../../components/GaleriaProduto";

const TIPOS = [
  { id: "sarrafo", nome: "Sarrafo", unidade: "Mt" },
  { id: "tabua", nome: "Tábua", unidade: "Mt" },
];
const BITOLAS: Record<string, string[]> = {
  sarrafo: ["5cm × 2,3cm", "7cm × 2,3cm", "10cm × 2,3cm", "15cm × 2,3cm"],
  tabua: ["2,3cm × 20cm", "2,3cm × 25cm", "2,3cm × 30cm"],
};
const ACABAMENTOS = [
  { id: "bruto", nome: "Bruto", desc: "Superfície natural da serra · Mais econômico" },
  { id: "aparelhado", nome: "Aparelhado", desc: "Superfície lisa e padronizada · Pronto para envernizar", recomendado: true },
];
const CROSS_CEDRINHO = [
  { id: "anjo-stain-ipe", nome: "Anjo Stain Casa — Ipê 3,6L", descricao: "Proteção e cor para madeira. Alta penetração.", emoji: "🎨", unidade: "un", quantidadeSugerida: 1, categoria: "Tintas" },
  { id: "prego-17x21", nome: "Prego Polido 17×21 com Cabeça", descricao: "Fixação de sarrafos e tábuas.", emoji: "🔨", unidade: "Kg", quantidadeSugerida: 1, categoria: "Fixadores" },
  { id: "anjo-verniz-3-6", nome: "Anjo Verniz Dura Mais — Natural 3,6L", descricao: "Verniz brilhante para acabamento.", emoji: "✨", unidade: "un", quantidadeSugerida: 1, categoria: "Tintas" },
];

export default function Cedrinho() {
  const { adicionar } = useOrcamento();
  const [tipo, setTipo] = useState<string | null>(null);
  const [bitola, setBitola] = useState<string | null>(null);
  const [acabamento, setAcabamento] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(10);
  const [adicionado, setAdicionado] = useState(false);
  const [crossSellAberto, setCrossSellAberto] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const pronto = tipo && bitola && acabamento && quantidade >= 1;
  const tipoObj = TIPOS.find((t) => t.id === tipo);
  const variacaoTexto = pronto ? `${bitola} · ${acabamento === "bruto" ? "Bruto" : "Aparelhado"}` : "";
  const corpoMsgWpp = pronto ? `🪚 *Cedrinho*\n• Tipo: ${tipoObj?.nome}\n• Bitola: ${bitola}\n• Acabamento: ${acabamento === "bruto" ? "Bruto" : "Aparelhado"}\n• Quantidade: ${quantidade} ${tipoObj?.unidade}` : "";

  const handleAdicionar = () => {
    if (!pronto) return;
    adicionar({ id: `cedrinho-${tipo}-${bitola}-${acabamento}`, nome: `Cedrinho — ${tipoObj?.nome}`, variacao: variacaoTexto, quantidade, unidade: tipoObj?.unidade ?? "Mt", categoria: "Madeiramento" });
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
          <span className="text-gray-900 font-medium">Cedrinho</span>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🪚 Cedrinho</h1>
          <p className="text-gray-500 mt-1 text-sm">Sarrafos e tábuas em bruto ou aparelhado. Leve e ideal para forros e estruturas internas.</p>
        </div>
        {/* GALERIA */}
        <GaleriaProduto titulo="Cedrinho — Sarrafos e Tábuas" imagens={[{ src: "", alt: "Sarrafos e tábuas de cedrinho" }]} />
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
            Tipo de Peça
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {TIPOS.map((t) => (
              <button key={t.id} onClick={() => { setTipo(t.id); setBitola(null); setAcabamento(null); }}
                className={`p-4 rounded-xl border text-center transition-all ${tipo === t.id ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}>
                <p className="font-semibold text-gray-900">{t.nome}</p>
                <p className="text-xs text-gray-500 mt-0.5">por {t.unidade}</p>
              </button>
            ))}
          </div>
        </section>
        {tipo && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
              Bitola
            </h2>
            <div className="flex flex-wrap gap-2">
              {BITOLAS[tipo].map((b) => (
                <button key={b} onClick={() => setBitola(b)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${bitola === b ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200 text-orange-700" : "border-gray-200 hover:border-orange-300 text-gray-700"}`}>
                  {b}
                </button>
              ))}
            </div>
          </section>
        )}
        {bitola && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">3</span>
              Acabamento
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ACABAMENTOS.map((a) => (
                <button key={a.id} onClick={() => setAcabamento(a.id)}
                  className={`text-left p-4 rounded-xl border transition-all relative ${acabamento === a.id ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}>
                  {a.recomendado && <span className="absolute top-2 right-2 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">★ Recomendado</span>}
                  <p className="font-semibold text-gray-900 text-sm">{a.nome}</p>
                  <p className="text-gray-500 text-xs mt-1">{a.desc}</p>
                </button>
              ))}
            </div>
          </section>
        )}
        {acabamento && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">4</span>
              Quantidade (metros lineares)
            </h2>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setQuantidade(q => Math.max(1, q - 5))} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">−</button>
                <input type="number" value={quantidade} onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))} className="w-20 py-2 text-center font-bold text-gray-900 border-x border-gray-200 focus:outline-none" />
                <button onClick={() => setQuantidade(q => q + 5)} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">+</button>
              </div>
              <span className="text-sm text-gray-500">{tipoObj?.unidade}</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
              <p className="font-bold text-gray-900">Cedrinho — {tipoObj?.nome}</p>
              <p className="text-gray-600 text-sm">{variacaoTexto}</p>
              <p className="text-orange-600 font-semibold text-sm mt-1">{quantidade} {tipoObj?.unidade}</p>
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
      <CrossSellModal aberto={crossSellAberto} onFechar={() => setCrossSellAberto(false)} produtoPrincipal="Cedrinho" relacionados={CROSS_CEDRINHO} />
      <ModalCotarWhatsApp aberto={modalWppAberto} onFechar={() => setModalWppAberto(false)} nomeProduto="Cedrinho" corpoMensagem={corpoMsgWpp} />
    </div>
  );
}
