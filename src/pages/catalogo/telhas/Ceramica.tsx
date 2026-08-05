import { useState } from "react";
import { ChevronRight, MessageCircle, ShoppingCart, Check } from "lucide-react";
import { useOrcamento } from "../../../context/OrcamentoContext";

const WHATSAPP = "5511971761003";

const MODELOS = [
  { id: "portuguesa-isotec", nome: "Portuguesa Resinada — Isotec", badge: "★ Campeão #1", marca: "Isotec" },
  { id: "portuguesa-rodrigues", nome: "Portuguesa Resinada — Rodrigues", badge: "★ Campeão", marca: "Rodrigues" },
  { id: "portuguesa-mesclada", nome: "Portuguesa Mesclada Resinada", badge: null, marca: "Rodrigues" },
  { id: "romana-resinada", nome: "Romana Resinada — Laranjal", badge: null, marca: null },
  { id: "romana-top", nome: "Romana Top Telha — Terracota Prime", badge: null, marca: "Top Telha" },
  { id: "americana-resinada", nome: "Americana Resinada — Cerâmica", badge: null, marca: null },
];

export default function Ceramica() {
  const { adicionar } = useOrcamento();
  const [modeloId, setModeloId] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(100);
  const [adicionado, setAdicionado] = useState(false);

  const modelo = MODELOS.find((m) => m.id === modeloId);
  const pronto = modeloId && quantidade >= 1;

  const msgWhatsApp = pronto && modelo
    ? encodeURIComponent(
        `Olá! Gostaria de um orçamento:\n\n` +
        `🪨 *Telha Cerâmica*\n` +
        `• Modelo: ${modelo.nome}\n` +
        `• Quantidade: ${quantidade} peças\n\n` +
        `Poderia verificar estoque e frete para minha região?`
      )
    : "";

  const handleAdicionar = () => {
    if (!pronto || !modelo) return;
    adicionar({
      id: `ceramica-${modeloId}`,
      nome: "Telha Cerâmica",
      variacao: modelo.nome,
      quantidade,
      unidade: "peças",
      categoria: "Telhas",
    });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-1 text-xs text-gray-500">
          <a href="/catalogo" className="hover:text-orange-500">Catálogo</a>
          <ChevronRight size={12} />
          <a href="/catalogo/telhas" className="hover:text-orange-500">Telhas</a>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">Cerâmica</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🪨 Telha Cerâmica</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Portuguesa e Romana com encaixe preciso. Natural, resinada ou esmaltada — escolha o modelo ideal.
          </p>
        </div>

        {/* Modelo */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
            Modelo da Telha
          </h2>
          <div className="space-y-2">
            {MODELOS.map((m) => (
              <button
                key={m.id}
                onClick={() => setModeloId(m.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all relative
                  ${modeloId === m.id ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}
              >
                {m.badge && (
                  <span className="absolute top-2 right-2 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {m.badge}
                  </span>
                )}
                <p className="font-semibold text-gray-900 text-sm pr-20">{m.nome}</p>
                {m.marca && <p className="text-gray-400 text-xs mt-0.5">Marca: {m.marca}</p>}
              </button>
            ))}
          </div>
        </section>

        {/* Quantidade */}
        {modeloId && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
              Quantidade
            </h2>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm text-gray-700 font-medium">Nº de peças:</span>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setQuantidade(q => Math.max(1, q - 10))} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">−</button>
                <input
                  type="number"
                  value={quantidade}
                  onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))}
                  className="w-20 py-2 text-center font-bold text-gray-900 border-x border-gray-200 focus:outline-none"
                />
                <button onClick={() => setQuantidade(q => q + 10)} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">+</button>
              </div>
            </div>
            <p className="text-xs text-gray-400">Cobertura estimada: ~{Math.round(quantidade * 0.042)} m² (telha portuguesa padrão)</p>

            <div className="bg-gray-50 rounded-xl p-4 my-5">
              <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
              <p className="font-bold text-gray-900">Telha Cerâmica</p>
              <p className="text-gray-600 text-sm">{modelo?.nome}</p>
              <p className="text-orange-600 font-semibold text-sm mt-1">{quantidade} peças</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAdicionar}
                className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm
                  ${adicionado ? "bg-green-600 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"}`}
              >
                {adicionado ? <><Check size={18} /> Adicionado!</> : <><ShoppingCart size={18} /> Adicionar ao Orçamento</>}
              </button>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${msgWhatsApp}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <MessageCircle size={18} />
                Cotar agora no WhatsApp
              </a>
            </div>
          </section>
        )}

        {/* Especificações */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3">Especificações Técnicas</h2>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100">
              {[
                ["Inclinação mínima", "30%"],
                ["Cobertura por peça", "~0,042 m²"],
                ["Fixação", "Prego telheiro ou arame"],
                ["Acabamento disponível", "Natural, Resinada, Esmaltada"],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td className="py-2.5 text-gray-500 w-1/2">{k}</td>
                  <td className="py-2.5 text-gray-900 font-medium">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
