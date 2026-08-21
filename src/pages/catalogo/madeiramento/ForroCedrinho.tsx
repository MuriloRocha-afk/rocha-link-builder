import { useState } from "react";
import { ChevronRight, ShoppingCart, Check, MessageCircle } from "lucide-react";
import { useOrcamento } from "../../../context/OrcamentoContext";
import ModalCotarWhatsApp from "../../../components/ModalCotarWhatsApp";
import GaleriaProduto from "../../../components/GaleriaProduto";
import ProdutoLayout from "../../../components/site/ProdutoLayout";
import BlocoAcessorios from "@/components/site/BlocoAcessorios";
import { acessoriosForroMadeira } from "@/data/acessoriosForro";
import { imagensForroCedrinho } from "../../../data/imagensProduto";

const MODELOS = [
  { id: "mesclado-curto", nome: "Cedrinho Mesclado — 1cm × 10cm", desc: "Peças curtas encaixadas. Venda por m². O mais vendido.", lider: true },
  { id: "mesclado-m2", nome: "Cedrinho Mesclado — m²", desc: "Calculado por área total. Corte sob medida no pátio.", lider: false },
];

const RELACIONADOS_FORRO_CED = [
  { id: "meia-cana-cedrinho", nome: "Meia Cana Cedrinho — por metro", descricao: "Acabamento perimetral do forro de cedrinho.", emoji: "📐", unidade: "mt", quantidadeSugerida: 10, categoria: "Madeiramento" },
  { id: "prego-telheiro", nome: "Prego Telheiro 18×27 — 500g", descricao: "Para fixação do forro nas ripas de apoio.", emoji: "🔨", unidade: "emb", quantidadeSugerida: 1, categoria: "Fixadores" },
  { id: "anjo-verniz-natural", nome: "Anjo Verniz Dura Mais — Natural — 3,6L", descricao: "Verniz brilhante para realçar o forro de cedrinho.", emoji: "✨", unidade: "un", quantidadeSugerida: 1, categoria: "Tintas" },
  { id: "cedrinho-sarrafo", nome: "Cedrinho Sarrafo — 5cm × 2,3cm", descricao: "Ripas de apoio para instalar o forro.", emoji: "🪚", unidade: "mt", quantidadeSugerida: 20, categoria: "Madeiramento" },
];

export default function ForroCedrinho() {
  const { adicionar } = useOrcamento();
  const [modeloId, setModeloId] = useState<string>("mesclado-curto");
  const [area, setArea] = useState<number>(20);
  const [adicionado, setAdicionado] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const modelo = MODELOS.find(m => m.id === modeloId)!;
  // 10% de perda embutido
  const areaComPerda = Math.ceil(area * 1.1 * 10) / 10;

  const corpoMsg = `✨ *Forro Cedrinho Mesclado*\n• Modelo: ${modelo.nome}\n• Área: ${area} m²\n• Área c/ 10% de perda: ${areaComPerda} m²`;

  const handleAdicionar = () => {
    adicionar({ id: `forro-cedrinho-${modeloId}`, nome: "Forro Cedrinho Mesclado", variacao: `${modelo.nome} · ${area} m²`, quantidade: areaComPerda, unidade: "m²", categoria: "Madeiramento" });
    setAdicionado(true);
    setTimeout(() => { setAdicionado(false); }, 800);
  };

  return (
    <ProdutoLayout
      produtoKey="forro-cedrinho"
      breadcrumb={
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-1 text-xs text-gray-500">
          <a href="/catalogo" className="hover:text-orange-500">Catálogo</a>
          <ChevronRight size={12} />
          <a href="/catalogo/madeiramento" className="hover:text-orange-500">Madeiramento</a>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">Forro Cedrinho</span>
        </div>
      </div>
      }
      cabecalho={
          <div>
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">★ Campeão de Vendas</span>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">✨ Forro Cedrinho Mesclado</h1>
            <p className="text-gray-500 mt-1 text-sm">Acabamento natural nobre para tetos e ambientes internos. Vendido por m², com 10% de perda já calculado.</p>
          </div>
      }
      tituloAcessorios="Acessórios de Forro de Madeira"
      acessorios={
        <BlocoAcessorios itens={acessoriosForroMadeira(areaComPerda)} contexto={"Forro Cedrinho Mesclado"} />
      }
      galeria={
        <GaleriaProduto
          titulo="Forro Cedrinho Mesclado"
          subtitulo="1cm × 10cm · Foto em breve"
          imagens={imagensForroCedrinho}
        />
      }
    >
      <>

          {/* Modelo */}
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
              Modelo
            </h2>
            <div className="space-y-2">
              {MODELOS.map(m => (
                <button key={m.id} onClick={() => setModeloId(m.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all relative ${modeloId === m.id ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}>
                  {m.lider && <span className="absolute top-2 right-2 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">★ Mais Vendido</span>}
                  <p className="font-semibold text-gray-900 text-sm pr-20">{m.nome}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{m.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Área */}
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
              Área a cobrir (m²)
            </h2>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setArea(a => Math.max(1, a - 5))} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">−</button>
                <input type="number" value={area} onChange={e => setArea(Math.max(1, Number(e.target.value)))} className="w-24 py-2 text-center font-bold text-gray-900 border-x border-gray-200 focus:outline-none" />
                <button onClick={() => setArea(a => a + 5)} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">+</button>
              </div>
              <span className="text-sm text-gray-500">m²</span>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="text-sm text-amber-800">
                📐 <strong>Área com 10% de perda: {areaComPerda} m²</strong>
                <span className="text-amber-600 text-xs ml-1">(já inclusa a margem de corte recomendada)</span>
              </p>
            </div>
          </section>

          {/* Resumo + Botões */}
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
              <p className="font-bold text-gray-900">Forro Cedrinho Mesclado</p>
              <p className="text-gray-600 text-sm">{modelo.nome}</p>
              <p className="text-orange-600 font-semibold text-sm mt-1">
                {area} m² solicitados → {areaComPerda} m² com perda
              </p>
            </div>
            <div className="space-y-3">
              <button onClick={handleAdicionar} className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm ${adicionado ? "bg-green-600 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"}`}>
                {adicionado ? <><Check size={18} /> Adicionado! Veja os acessórios...</> : <><ShoppingCart size={18} /> Adicionar ao Orçamento</>}
              </button>
              <button onClick={() => setModalWppAberto(true)} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
                <MessageCircle size={18} />Cotar no WhatsApp
              </button>
            </div>
          </section>

              <ModalCotarWhatsApp aberto={modalWppAberto} onFechar={() => setModalWppAberto(false)} nomeProduto="Forro Cedrinho Mesclado" corpoMensagem={corpoMsg} />
      </>
    </ProdutoLayout>
  );
}
