import { useState } from "react";
import { ChevronRight, ShoppingCart, Check } from "lucide-react";
import { useOrcamento } from "../../../context/OrcamentoContext";
import ModalCotarWhatsApp from "../../../components/ModalCotarWhatsApp";
import GaleriaProduto from "../../../components/GaleriaProduto";
import ProdutoLayout from "../../../components/site/ProdutoLayout";
import { imagensCambara } from "../../../data/imagensProduto";


const TIPOS = ["Viga", "Caibro", "Ripa", "Ripão", "Dormente"] as const;
type Tipo = typeof TIPOS[number];

const BITOLAS: Record<Tipo, string[]> = {
  Viga: [
    "5x11cm","5x15cm","5x20cm","5x25cm","5x30cm",
    "8x10cm","8x15cm","8x20cm","8x25cm","8x30cm","8x40cm","8x50cm",
    "10x20cm","10x30cm","10x40cm",
  ],
  Caibro: ["5x5cm","5x7cm"],
  Ripa: ["1,5x5cm"],
  Ripão: ["2x5cm"],
  Dormente: ["8x8cm","10x10cm","15x15cm","20x20cm"],
};

const COMPRIMENTOS = [
  "1,0m","1,5m","2,0m","2,5m","3,0m","3,5m","4,0m",
  "4,5m","5,0m","5,5m","6,0m","6,5m","7,0m","7,5m","8,0m","8,5m",
];

const ICONES: Record<Tipo, string> = {
  Viga: "🏗️",
  Caibro: "📐",
  Ripa: "〰️",
  Ripão: "〰️",
  Dormente: "🪨",
};

function Chip({
  label,
  selected,
  badge,
  onClick,
}: {
  label: string;
  selected: boolean;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-150 text-left
        ${selected
          ? "border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-200"
          : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50/50"
        }`}
    >
      {label}
      {badge && (
        <span className="absolute -top-2 -right-1 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
          {badge}
        </span>
      )}
    </button>
  );
}

export default function Cambara() {
  const { adicionar } = useOrcamento();
  const [tipo, setTipo] = useState<Tipo | null>(null);
  const [bitola, setBitola] = useState<string | null>(null);
  const [comprimento, setComprimento] = useState<string | null>(null);
  const [acabamento, setAcabamento] = useState<"Bruto" | "Aparelhado" | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const resetar = (etapa: number) => {
    if (etapa <= 1) setBitola(null);
    if (etapa <= 2) setComprimento(null);
    if (etapa <= 3) setAcabamento(null);
  };

  const pronto = tipo && bitola && comprimento && acabamento && quantidade >= 1;

  const variacaoTexto = pronto
    ? `${tipo} ${bitola} · ${comprimento} · ${acabamento}`
    : "";

  const msgWhatsApp = pronto
    ? encodeURIComponent(
        `Olá! Gostaria de um orçamento:\n\n` +
        `🪵 *Cambará Rosa*\n` +
        `• Tipo: ${tipo}\n` +
        `• Bitola: ${bitola}\n` +
        `• Comprimento: ${comprimento}\n` +
        `• Acabamento: ${acabamento}\n` +
        `• Quantidade: ${quantidade} peças\n\n` +
        `Poderia verificar disponibilidade e frete?`
      )
    : "";

  const handleAdicionar = () => {
    if (!pronto) return;
    adicionar({
      id: `cambara-${tipo}-${bitola}-${comprimento}-${acabamento}`,
      nome: "Cambará Rosa",
      variacao: variacaoTexto,
      quantidade,
      unidade: "peças",
      categoria: "Madeiramento",
    });
    setAdicionado(true);
    setTimeout(() => {
      setAdicionado(false);
    }, 800);
  };

  return (
    <>
    <ProdutoLayout
      produtoKey="cambara"
      breadcrumb={
      {/* Breadcrumb */}
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-1 text-xs text-gray-500">
          <a href="/catalogo" className="hover:text-orange-500 transition-colors">Catálogo</a>
          <ChevronRight size={12} />
          <a href="/catalogo/madeiramento" className="hover:text-orange-500 transition-colors">Madeiramento</a>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">Cambará Rosa</span>
        </div>
      </div>
      }
      cabecalho={
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cambará Rosa</h1>
            <p className="text-gray-500 mt-1 text-sm">
              Madeira nativa cortada e aparelhada no nosso pátio. Selecione a bitola,
              comprimento e acabamento.
            </p>
            <div className="flex gap-2 mt-3 flex-wrap">
              {["DOF/IBAMA Legalizado", "Aparelhado em Plaina Industrial", "Frota Própria"].map((tag) => (
                <span key={tag} className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-full">
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>
      }
      galeria={
        <GaleriaProduto
          titulo={tipo ? `Cambará Rosa — ${tipo}` : "Cambará Rosa"}
          subtitulo={tipo ? "Foto em breve" : "Selecione o tipo de peça para ver as fotos"}
          imagens={(tipo && imagensCambara[tipo]) || []}
        />
      }
    >
      <>



          {/* ETAPA 1 — Tipo */}
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
              Tipo de Peça
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {TIPOS.map((t) => (
                <button
                  key={t}
                  onClick={() => { setTipo(t); resetar(1); }}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-150
                    ${tipo === t
                      ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200"
                      : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50"
                    }`}
                >
                  <span className="text-2xl">{ICONES[t]}</span>
                  <span className="text-xs font-medium text-gray-800">{t}</span>
                </button>
              ))}
            </div>
          </section>

          {/* ETAPA 2 — Bitola */}
          {tipo && (
            <section className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
                Bitola — {tipo}
              </h2>
              <div className="flex flex-wrap gap-2">
                {BITOLAS[tipo].map((b) => (
                  <Chip
                    key={b}
                    label={b}
                    selected={bitola === b}
                    onClick={() => { setBitola(b); resetar(2); }}
                  />
                ))}
              </div>
            </section>
          )}

          {/* ETAPA 3 — Comprimento */}
          {bitola && (
            <section className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">3</span>
                Comprimento
              </h2>
              <div className="flex flex-wrap gap-2">
                {COMPRIMENTOS.map((c) => (
                  <Chip
                    key={c}
                    label={c}
                    selected={comprimento === c}
                    onClick={() => { setComprimento(c); resetar(3); }}
                  />
                ))}
              </div>
            </section>
          )}

          {/* ETAPA 4 — Acabamento */}
          {comprimento && (
            <section className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">4</span>
                Acabamento
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Bruto */}
                <button
                  onClick={() => setAcabamento("Bruto")}
                  className={`text-left p-4 rounded-xl border transition-all duration-150
                    ${acabamento === "Bruto"
                      ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200"
                      : "border-gray-200 hover:border-orange-300"
                    }`}
                >
                  <p className="font-semibold text-gray-900 text-sm">Bruto</p>
                  <p className="text-gray-500 text-xs mt-1">Sem beneficiamento · Superfície natural da serra · Preço mais econômico</p>
                </button>
                {/* Aparelhado */}
                <button
                  onClick={() => setAcabamento("Aparelhado")}
                  className={`text-left p-4 rounded-xl border transition-all duration-150 relative
                    ${acabamento === "Aparelhado"
                      ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200"
                      : "border-gray-200 hover:border-orange-300"
                    }`}
                >
                  <span className="absolute top-2 right-2 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    ★ Recomendado
                  </span>
                  <p className="font-semibold text-gray-900 text-sm">Aparelhado em Plaina</p>
                  <p className="text-gray-500 text-xs mt-1">Superfície lisa e padronizada · Pronto para envernizar · Melhor encaixe</p>
                </button>
              </div>
            </section>
          )}

          {/* ETAPA 5 — Quantidade + Resumo */}
          {acabamento && (
            <section className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">5</span>
                Quantidade
              </h2>

              <div className="flex items-center gap-3 mb-6">
                <label className="text-sm text-gray-700 font-medium">Número de peças:</label>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors text-lg font-bold"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-bold text-gray-900 min-w-[48px] text-center">
                    {quantidade}
                  </span>
                  <button
                    onClick={() => setQuantidade((q) => q + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Resumo */}
              <div className="bg-gray-50 rounded-xl p-4 mb-5">
                <p className="text-xs text-gray-500 font-medium mb-1">RESUMO DO PEDIDO</p>
                <p className="font-bold text-gray-900">Cambará Rosa — {tipo}</p>
                <p className="text-gray-600 text-sm">{bitola} · {comprimento} · {acabamento}</p>
                <p className="text-orange-600 font-semibold text-sm mt-1">{quantidade} peças</p>
              </div>

              {/* Botões */}
              <div className="space-y-3">
                <button
                  onClick={handleAdicionar}
                  className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm
                    ${adicionado
                      ? "bg-green-600 text-white"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                    }`}
                >
                  {adicionado ? (
                    <><Check size={18} /> Adicionado ao Orçamento!</>
                  ) : (
                    <><ShoppingCart size={18} /> Adicionar ao Orçamento</>
                  )}
                </button>

                <button
                  onClick={() => pronto && setModalWppAberto(true)}
                  disabled={!pronto}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
                >
                  💬 Cotar agora no WhatsApp
                </button>
              </div>
            </section>
          )}

          {/* Por que Cambará da Rocha */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "🌿", titulo: "DOF/IBAMA", desc: "Origem legal certificada" },
              { icon: "⚙️", titulo: "Plaina Industrial", desc: "Aparelhada no pátio com precisão" },
              { icon: "🚚", titulo: "Frota Própria", desc: "Entrega em toda São Paulo" },
            ].map((item) => (
              <div key={item.titulo} className="bg-white rounded-xl p-4 shadow-sm text-center">
                <span className="text-3xl">{item.icon}</span>
                <p className="font-bold text-gray-900 text-sm mt-2">{item.titulo}</p>
                <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </section>
      </div>

              <ModalCotarWhatsApp
          aberto={modalWppAberto}
          onFechar={() => setModalWppAberto(false)}
          nomeProduto="Cambará Rosa"
          corpoMensagem={
            pronto
              ? `🪵 *Cambará Rosa*\n• Tipo: ${tipo}\n• Bitola: ${bitola}\n• Comprimento: ${comprimento}\n• Acabamento: ${acabamento}\n• Quantidade: ${quantidade} peças`
              : ""
          }
        />
      </>
    </ProdutoLayout>
  );
}
