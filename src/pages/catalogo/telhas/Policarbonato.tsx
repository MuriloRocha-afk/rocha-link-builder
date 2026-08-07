import { useState } from "react";
import { ChevronRight, ShoppingCart, Check, MessageCircle } from "lucide-react";
import { useOrcamento } from "../../../context/OrcamentoContext";
import ModalCotarWhatsApp from "../../../components/ModalCotarWhatsApp";
import GaleriaProduto from "../../../components/GaleriaProduto";
import { imagensPolicarbonato } from "../../../data/imagensProduto";

const COMPRIMENTOS = [
  { valor: "183 × 110 cm", area: 1.83 * 0.98 },
  { valor: "244 × 110 cm", area: 2.44 * 0.98, lider: true },
  { valor: "305 × 110 cm", area: 3.05 * 0.98 },
  { valor: "366 × 110 cm", area: 3.66 * 0.98 },
];

const VERSOES = [
  {
    id: "cristal",
    nome: "Cristal",
    descricao: "Transparente. Máxima luminosidade natural.",
    emoji: "☀️",
  },
  {
    id: "bronze-grecca",
    nome: "Bronze — Grecca 244cm",
    descricao: "Acabamento bronze. Reduz ofuscamento e filtra UV.",
    emoji: "🟫",
  },
];

export default function Policarbonato() {
  const { adicionar } = useOrcamento();
  const [comprimento, setComprimento] = useState<string | null>(null);
  const [versao, setVersao] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(5);
  const [adicionado, setAdicionado] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const pronto = comprimento && versao && quantidade >= 1;
  const comp = COMPRIMENTOS.find((c) => c.valor === comprimento);
  const area = comp ? Math.round(comp.area * quantidade * 10) / 10 : 0;
  const versaoObj = VERSOES.find((v) => v.id === versao);

  const corpoMsgWpp = pronto
    ? `☀️ *Telha Policarbonato*\n` +
      `• Versão: ${versaoObj?.nome}\n` +
      `• Comprimento: ${comprimento}\n` +
      `• Quantidade: ${quantidade} chapas\n` +
      `• Área estimada: ~${area} m²`
    : "";

  const handleAdicionar = () => {
    if (!pronto) return;
    adicionar({
      id: `policarb-${comprimento}-${versao}`,
      nome: "Telha Policarbonato",
      variacao: `${versaoObj?.nome} · ${comprimento}`,
      quantidade,
      unidade: "chapas",
      categoria: "Telhas",
    });
    setAdicionado(true);
    setTimeout(() => {
      setAdicionado(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-1 text-xs text-gray-500">
          <a href="/catalogo" className="hover:text-orange-500">Catálogo</a>
          <ChevronRight size={12} />
          <a href="/catalogo/telhas" className="hover:text-orange-500">Telhas</a>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">Policarbonato</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">☀️ Telha Policarbonato</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Translúcida, leve e resistente. Iluminação natural para galpões, áreas de serviço e garagens.
          </p>
        </div>
        {/* GALERIA */}
        <GaleriaProduto
          titulo={versaoObj ? `Telha Policarbonato — ${versaoObj.nome}` : "Telha Policarbonato"}
          subtitulo={versaoObj ? "Foto em breve" : "Selecione uma versão para ver as fotos"}
          imagens={versao ? (imagensPolicarbonato[versao] ?? []) : []}
        />

        {/* Versão */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
            Versão
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {VERSOES.map((v) => (
              <button
                key={v.id}
                onClick={() => setVersao(v.id)}
                className={`text-left p-4 rounded-xl border transition-all
                  ${versao === v.id ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}
              >
                <span className="text-2xl">{v.emoji}</span>
                <p className="font-semibold text-gray-900 text-sm mt-2">{v.nome}</p>
                <p className="text-gray-500 text-xs mt-0.5">{v.descricao}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Comprimento */}
        {versao && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
              Comprimento
            </h2>
            <div className="space-y-2">
              {COMPRIMENTOS.map((c) => (
                <button
                  key={c.valor}
                  onClick={() => setComprimento(c.valor)}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all
                    ${comprimento === c.valor ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}
                >
                  <span className="font-semibold text-gray-900 text-sm">{c.valor}</span>
                  {c.lider && <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">★ Líder</span>}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Quantidade */}
        {comprimento && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">3</span>
              Quantidade
            </h2>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setQuantidade(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">−</button>
                <input type="number" value={quantidade} onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))} className="w-20 py-2 text-center font-bold text-gray-900 border-x border-gray-200 focus:outline-none" />
                <button onClick={() => setQuantidade(q => q + 1)} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">+</button>
              </div>
              <span className="text-sm text-gray-500">chapas</span>
            </div>
            {area > 0 && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-5">
                <p className="text-sm text-blue-800"><strong>Área estimada: ~{area} m²</strong></p>
              </div>
            )}
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
              <p className="font-bold text-gray-900">Telha Policarbonato {versaoObj?.nome}</p>
              <p className="text-gray-600 text-sm">{comprimento}</p>
              <p className="text-orange-600 font-semibold text-sm mt-1">{quantidade} chapas · ~{area} m²</p>
            </div>
            <div className="space-y-3">
              <button onClick={handleAdicionar} className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm ${adicionado ? "bg-green-600 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"}`}>
                {adicionado ? <><Check size={18} /> Adicionado! Veja os acessórios...</> : <><ShoppingCart size={18} /> Adicionar ao Orçamento</>}
              </button>
              <button onClick={() => pronto && setModalWppAberto(true)} disabled={!pronto} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
                <MessageCircle size={18} />Cotar no WhatsApp
              </button>
            </div>
          </section>
        )}

        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3">Especificações Técnicas</h2>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100">
              {[["Inclinação mínima","5%"],["Espessura","4mm e 6mm"],["Largura total","1,10m"],["Fixação","Parafuso c/ vedação + perfil H"],["Proteção UV","Sim (face superior)"]].map(([k,v])=>(
                <tr key={k}><td className="py-2.5 text-gray-500">{k}</td><td className="py-2.5 text-gray-900 font-medium text-right">{v}</td></tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

            <ModalCotarWhatsApp aberto={modalWppAberto} onFechar={() => setModalWppAberto(false)} nomeProduto="Telha Policarbonato" corpoMensagem={corpoMsgWpp} />
    </div>
  );
}
