import { useState } from "react";
import { ChevronRight, MessageCircle, ShoppingCart, Check } from "lucide-react";
import { useOrcamento } from "../../../context/OrcamentoContext";

const WHATSAPP = "5511971761003";

const PRODUTOS = [
  {
    id: "pontalete-eucalipto",
    nome: "Pontalete Roliço Eucalipto Tratado",
    descricao: "Tratado em autoclave. Reflorestamento certificado.",
    badge: "★ Campeão de Vendas",
    comprimentos: ["3,0m", "4,0m", "5,0m", "6,0m"],
    liderComprimento: "6,0m",
    unidade: "peças",
    acabamentos: null,
  },
  {
    id: "viga-eucalipto",
    nome: "Eucalipto Viga Serrada",
    descricao: "Viga estrutural serrada.",
    badge: null,
    comprimentos: ["4,0m", "5,0m", "6,0m"],
    liderComprimento: null,
    bitolas: ["5x10cm", "5x15cm"],
    unidade: "peças",
    acabamentos: null,
  },
];

export default function Eucalipto() {
  const { adicionar } = useOrcamento();
  const [produtoId, setProdutoId] = useState<string>("pontalete-eucalipto");
  const [comprimento, setComprimento] = useState<string | null>(null);
  const [bitola, setBitola] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);

  const produto = PRODUTOS.find((p) => p.id === produtoId)!;
  const pronto = comprimento && quantidade >= 1 &&
    (!("bitolas" in produto && produto.bitolas) || bitola);

  const variacaoTexto = [
    "bitolas" in produto && produto.bitolas && bitola ? bitola : null,
    comprimento,
    "Tratado em Autoclave",
  ].filter(Boolean).join(" · ");

  const msgWhatsApp = pronto
    ? encodeURIComponent(
        `Olá! Gostaria de um orçamento:\n\n` +
        `🌿 *${produto.nome}*\n` +
        ("bitolas" in produto && produto.bitolas && bitola ? `• Bitola: ${bitola}\n` : "") +
        `• Comprimento: ${comprimento}\n` +
        `• Quantidade: ${quantidade} peças\n\n` +
        `Poderia verificar disponibilidade e frete?`
      )
    : "";

  const handleAdicionar = () => {
    if (!pronto) return;
    adicionar({
      id: `${produtoId}-${comprimento}-${bitola ?? ""}`,
      nome: produto.nome,
      variacao: variacaoTexto,
      quantidade,
      unidade: "peças",
      categoria: "Madeiramento",
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
          <a href="/catalogo/madeiramento" className="hover:text-orange-500">Madeiramento</a>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">Eucalipto & Pontaletes</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🌿 Eucalipto & Pontaletes</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Pontaletes roliços tratados e vigas serradas. Reflorestamento certificado.
          </p>
        </div>

        {/* Seleção do produto */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
            Produto
          </h2>
          <div className="space-y-2">
            {PRODUTOS.map((p) => (
              <button
                key={p.id}
                onClick={() => { setProdutoId(p.id); setComprimento(null); setBitola(null); }}
                className={`w-full text-left p-4 rounded-xl border transition-all relative
                  ${produtoId === p.id ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}
              >
                {p.badge && (
                  <span className="absolute top-2 right-2 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {p.badge}
                  </span>
                )}
                <p className="font-semibold text-gray-900 text-sm pr-24">{p.nome}</p>
                <p className="text-gray-500 text-xs mt-0.5">{p.descricao}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Bitola (se aplicável) */}
        {"bitolas" in produto && produto.bitolas && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
              Bitola
            </h2>
            <div className="flex flex-wrap gap-2">
              {produto.bitolas.map((b) => (
                <button
                  key={b}
                  onClick={() => setBitola(b)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all
                    ${bitola === b ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200 text-orange-700" : "border-gray-200 hover:border-orange-300"}`}
                >
                  {b}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Comprimento */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
              {"bitolas" in produto && produto.bitolas ? "3" : "2"}
            </span>
            Comprimento
          </h2>
          <div className="flex flex-wrap gap-2">
            {produto.comprimentos.map((c) => (
              <button
                key={c}
                onClick={() => setComprimento(c)}
                className={`relative px-4 py-2 rounded-lg border text-sm font-medium transition-all
                  ${comprimento === c ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200 text-orange-700" : "border-gray-200 hover:border-orange-300"}`}
              >
                {c}
                {c === produto.liderComprimento && (
                  <span className="absolute -top-2 -right-1 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    ★ Líder
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Quantidade + Resumo + Botões */}
        {comprimento && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
                {"bitolas" in produto && produto.bitolas ? "4" : "3"}
              </span>
              Quantidade
            </h2>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-sm text-gray-700 font-medium">Nº de peças:</span>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setQuantidade(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">−</button>
                <span className="px-4 py-2 font-bold text-gray-900 min-w-[48px] text-center">{quantidade}</span>
                <button onClick={() => setQuantidade(q => q + 1)} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">+</button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
              <p className="font-bold text-gray-900">{produto.nome}</p>
              <p className="text-gray-600 text-sm">{variacaoTexto}</p>
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
      </div>
    </div>
  );
}
