import { useState } from "react";
import { ChevronRight, ShoppingCart, Check, MessageCircle } from "lucide-react";
import { useOrcamento } from "../../../context/OrcamentoContext";
import ModalCotarWhatsApp from "../../../components/ModalCotarWhatsApp";
import GaleriaProduto from "../../../components/GaleriaProduto";
import ProdutoLayout from "../../../components/site/ProdutoLayout";
import TipoCard from "../../../components/site/TipoCard";
import { imagensMadeirit } from "../../../data/imagensProduto";

type Tipo = "Plastificado" | "Rosa" | "OSB" | "Compensado";

const TIPOS: { id: Tipo; nome: string; descricao: string; icone: string; badge?: string }[] = [
  { id: "Plastificado", nome: "Plastificado", descricao: "Chapas pretas revestidas para formas e revestimentos", icone: "⬛", badge: "★ Mais vendido" },
  { id: "Rosa", nome: "Rosa", descricao: "Chapas resinadas rosa para construção civil e formas", icone: "🟥" },
  { id: "OSB", nome: "OSB", descricao: "Oriented Strand Board para estruturas e revestimentos", icone: "🪵" },
  { id: "Compensado", nome: "Compensado", descricao: "Compensado naval/multilaminado para diversos usos", icone: "📐" },
];

const ESPESSURAS: Record<Tipo, string[]> = {
  Plastificado: ["10mm", "12mm", "14mm", "16mm", "18mm", "20mm", "22mm"],
  Rosa: ["5mm", "9mm", "12mm", "17mm", "20mm"],
  OSB: ["10mm"],
  Compensado: ["9mm", "11mm", "15mm", "25mm"],
};

const DIMENSOES: Record<Tipo, string> = {
  Plastificado: "220cm × 110cm",
  Rosa: "220cm × 110cm",
  OSB: "220cm × 122cm",
  Compensado: "220cm × 160cm",
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

export default function Madeirit() {
  const { adicionar } = useOrcamento();
  const [tipo, setTipo] = useState<Tipo | null>(null);
  const [espessura, setEspessura] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(5);
  const [adicionado, setAdicionado] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const tipoSelecionado = TIPOS.find((t) => t.id === tipo);
  const pronto = tipo && espessura && quantidade >= 1;

  const nomeProduto = pronto
    ? `Madeirit ${tipoSelecionado?.nome} ${espessura}`
    : "Madeirit & Compensado";

  const variacaoTexto = pronto
    ? `${tipoSelecionado?.nome} ${espessura} · ${DIMENSOES[tipo]}`
    : "";

  const corpoMsgWpp = pronto
    ? `📋 *${nomeProduto}*\n• Tipo: ${tipoSelecionado?.nome}\n• Espessura: ${espessura}\n• Dimensão: ${DIMENSOES[tipo]}\n• Quantidade: ${quantidade} chapas`
    : "";

  const handleAdicionar = () => {
    if (!pronto || !tipo || !espessura) return;
    adicionar({
      id: `madeirit-${tipo}-${espessura}`,
      nome: nomeProduto,
      variacao: variacaoTexto,
      quantidade,
      unidade: "chapas",
      categoria: "Madeiramento",
    });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  };

  return (
    <ProdutoLayout
      produtoKey="madeirit"
      breadcrumb={
        <div className="bg-white border-b px-4 py-3">
          <div className="max-w-3xl mx-auto flex items-center gap-1 text-xs text-gray-500">
            <a href="/catalogo" className="hover:text-orange-500 transition-colors">Catálogo</a>
            <ChevronRight size={12} />
            <a href="/catalogo/madeiramento" className="hover:text-orange-500 transition-colors">Madeiramento</a>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-medium">Madeirit & Compensado</span>
          </div>
        </div>
      }
      cabecalho={
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Madeirit & Compensado</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Chapas estruturais para formas, forros e revestimentos. Selecione o tipo, espessura e quantidade.
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {["Plastificado Preto", "Rosa", "OSB Multiplac", "Compensado"].map((tag) => (
              <span key={tag} className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-full">
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>
      }
      galeria={
        <GaleriaProduto
          titulo={tipo ? `Madeirit & Compensado — ${tipo}` : "Madeirit & Compensado"}
          subtitulo={tipo ? "Foto em breve" : "Selecione um tipo para ver as fotos"}
          imagens={tipo ? (imagensMadeirit[tipo] ?? []) : []}
        />
      }
    >
      <>
        {/* ETAPA 1 — Tipo visual */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
            Tipo de Chapa
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {TIPOS.map((t) => (
              <TipoCard
                key={t.id}
                icone={t.icone}
                nome={t.nome}
                descricao={t.descricao}
                badge={t.badge}
                selected={tipo === t.id}
                onClick={() => { setTipo(t.id); setEspessura(null); }}
              />
            ))}
          </div>
        </section>

        {/* ETAPA 2 — Espessura */}
        {tipo && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
              Espessura — {tipoSelecionado?.nome}
            </h2>
            <div className="flex flex-wrap gap-2">
              {ESPESSURAS[tipo].map((e) => (
                <Chip
                  key={e}
                  label={e}
                  selected={espessura === e}
                  onClick={() => setEspessura(e)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ETAPA 3 — Quantidade + Resumo */}
        {espessura && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">3</span>
              Quantidade de chapas
            </h2>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setQuantidade((q) => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">−</button>
                <input
                  type="number"
                  value={quantidade}
                  onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))}
                  className="w-20 py-2 text-center font-bold text-gray-900 border-x border-gray-200 focus:outline-none"
                />
                <button onClick={() => setQuantidade((q) => q + 1)} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">+</button>
              </div>
              <span className="text-sm text-gray-500">chapas</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
              <p className="font-bold text-gray-900">{nomeProduto}</p>
              <p className="text-gray-600 text-sm">{variacaoTexto}</p>
              <p className="text-orange-600 font-semibold text-sm mt-1">{quantidade} chapas</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleAdicionar}
                className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm ${adicionado ? "bg-green-600 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"}`}
              >
                {adicionado ? <><Check size={18} /> Adicionado!</> : <><ShoppingCart size={18} /> Adicionar ao Orçamento</>}
              </button>
              <button
                onClick={() => pronto && setModalWppAberto(true)}
                disabled={!pronto}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <MessageCircle size={18} /> Cotar no WhatsApp
              </button>
            </div>
          </section>
        )}

        <ModalCotarWhatsApp
          aberto={modalWppAberto}
          onFechar={() => setModalWppAberto(false)}
          nomeProduto={nomeProduto}
          corpoMensagem={corpoMsgWpp}
        />
      </>
    </ProdutoLayout>
  );
}
