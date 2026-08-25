import { useState } from "react";
import { ChevronRight, ShoppingCart, Check, MessageCircle } from "lucide-react";
import { useOrcamento } from "../../../context/OrcamentoContext";
import ModalCotarWhatsApp from "../../../components/ModalCotarWhatsApp";
import GaleriaProduto from "../../../components/GaleriaProduto";
import ProdutoLayout from "../../../components/site/ProdutoLayout";
import TipoCard from "../../../components/site/TipoCard";
import { imagensPinus } from "../../../data/imagensProduto";

type Produto = {
  id: string;
  nome: string;
  tipo: "Sarrafo" | "Tábua" | "Pontalete";
  largura: string;
  espessuraFixa?: string;
  comprimentos: string[];
  unidade: string;
  lider?: boolean;
};

const PRODUTOS: Produto[] = [
  { id: "sarrafo-5cm", nome: "Sarrafo 05cm", tipo: "Sarrafo", largura: "5cm", comprimentos: ["3,0m"], unidade: "Pc" },
  { id: "sarrafo-7cm", nome: "Sarrafo 07cm", tipo: "Sarrafo", largura: "7cm", comprimentos: ["3,0m"], unidade: "Pc" },
  { id: "sarrafo-10cm", nome: "Sarrafo 10cm", tipo: "Sarrafo", largura: "10cm", comprimentos: ["3,0m"], unidade: "Pc" },
  { id: "sarrafo-15cm", nome: "Sarrafo 15cm", tipo: "Sarrafo", largura: "15cm", comprimentos: ["3,0m"], unidade: "Pc" },
  { id: "tabua-20cm", nome: "Tábua 20cm", tipo: "Tábua", largura: "20cm", comprimentos: ["3,0m"], unidade: "Pc" },
  { id: "tabua-25cm", nome: "Tábua 25cm", tipo: "Tábua", largura: "25cm", comprimentos: ["3,0m"], unidade: "Pc" },
  { id: "tabua-28cm", nome: "Tábua 28cm", tipo: "Tábua", largura: "28cm", comprimentos: ["3,0m"], unidade: "Pc" },
  { id: "tabua-30cm", nome: "Tábua 30cm", tipo: "Tábua", largura: "30cm", comprimentos: ["3,0m"], unidade: "Pc", lider: true },
  { id: "pontalete-6x6", nome: "Pontalete 6cm × 6cm", tipo: "Pontalete", largura: "6cm", espessuraFixa: "6cm", comprimentos: ["3,0m"], unidade: "Pc" },
  { id: "pontalete-7x7", nome: "Pontalete 7cm × 7cm", tipo: "Pontalete", largura: "7cm", espessuraFixa: "7cm", comprimentos: ["3,0m"], unidade: "Pc" },
];

const TIPOS = [
  { id: "Sarrafo", desc: "5cm a 15cm · travamento e forro" },
  { id: "Tábua", desc: "20cm a 30cm · fechamento e tabeira" },
  { id: "Pontalete", desc: "6×6 e 7×7 · escoras e pilaretes" },
];
const ESPESSURAS = [
  { valor: "1,8mm", nota: "Padrão · pronta entrega" },
  { valor: "2,3mm", nota: "Verificar disponibilidade" },
];
const ACABAMENTOS = ["Bruto", "Aparelhado em Plaina"] as const;
type Acabamento = typeof ACABAMENTOS[number];

export default function Pinus() {
  const { adicionar } = useOrcamento();
  const [aba, setAba] = useState<string | null>(null);
  const [produtoId, setProdutoId] = useState<string | null>(null);
  const [espessura, setEspessura] = useState<string>("1,8mm");
  const [comprimento, setComprimento] = useState<string | null>(null);
  const [acabamento, setAcabamento] = useState<Acabamento | null>(null);
  const [quantidade, setQuantidade] = useState(10);
  const [adicionado, setAdicionado] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const filtrados = aba ? PRODUTOS.filter((p) => p.tipo === aba) : [];
  const produto = PRODUTOS.find((p) => p.id === produtoId);
  const espessuraFinal = produto?.espessuraFixa ?? espessura;
  const sobConsulta = !produto?.espessuraFixa && espessura === "2,3mm";
  const pronto = Boolean(produto && comprimento && acabamento && quantidade >= 1);
  const variacao = produto && comprimento && acabamento
    ? `${produto.largura} × ${espessuraFinal} · ${comprimento} · ${acabamento}${sobConsulta ? " · Verificar disponibilidade" : ""}`
    : "";
  const corpoMsgWpp = pronto && produto
    ? `*Pinus — ${produto.nome}*\n• Largura: ${produto.largura}\n• Espessura: ${espessuraFinal}${sobConsulta ? " (verificar disponibilidade)" : ""}\n• Comprimento: ${comprimento}\n• Acabamento: ${acabamento}\n• Quantidade: ${quantidade} ${produto.unidade}`
    : "";

  const selecionarProduto = (p: Produto) => {
    setProdutoId(p.id);
    setComprimento(null);
    setAcabamento(null);
  };

  const handleAdicionar = () => {
    if (!pronto || !produto) return;
    adicionar({
      id: `pinus-${produto.id}-${comprimento}-${acabamento}`,
      nome: `Pinus — ${produto.nome}`,
      variacao,
      quantidade,
      unidade: produto.unidade,
      categoria: "Madeiramento",
    });
    setAdicionado(true);
    setTimeout(() => { setAdicionado(false); }, 800);
  };

  return (
    <ProdutoLayout
      produtoKey="pinus"
      breadcrumb={
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-1 text-xs text-gray-500">
          <a href="/catalogo" className="hover:text-orange-500">Catálogo</a>
          <ChevronRight size={12} />
          <a href="/catalogo/madeiramento" className="hover:text-orange-500">Madeiramento</a>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">Pinus</span>
        </div>
      </div>
      }
      cabecalho={
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pinus</h1>
            <p className="text-gray-500 mt-1 text-sm">Sarrafos, tábuas e pontaletes de reflorestamento. Cada peça com largura, espessura e comprimento próprios.</p>
          </div>
      }
      galeria={
        <GaleriaProduto
          titulo={produto ? `Pinus — ${produto.tipo}` : aba ? `Pinus — ${aba}` : "Pinus"}
          subtitulo={produto || aba ? "Foto em breve" : "Selecione o tipo de peça para ver as fotos"}
          imagens={imagensPinus[produto ? produto.tipo : (aba ?? "")] ?? []}
        />
      }
    >
      <>
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
              Tipo de Peça
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {TIPOS.map((t) => (
                <TipoCard
                  key={t.id}
                  nome={t.id}
                  descricao={t.desc}
                  selected={aba === t.id}
                  onClick={() => { setAba(t.id); setProdutoId(null); setComprimento(null); setAcabamento(null); }}
                />
              ))}
            </div>
          </section>

          {aba && aba !== "Pontalete" && (
            <section className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
                Espessura
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {ESPESSURAS.map((e) => (
                  <button key={e.valor} onClick={() => setEspessura(e.valor)}
                    className={`text-left p-4 rounded-xl border transition-all ${espessura === e.valor ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}>
                    <p className="font-semibold text-gray-900 text-sm">{e.valor}</p>
                    <p className="text-gray-500 text-xs mt-1">{e.nota}</p>
                  </button>
                ))}
              </div>
              {espessura === "2,3mm" && (
                <p className="mt-3 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800">
                  Peças de 2,3mm não são pronta entrega — verificar disponibilidade.
                </p>
              )}
            </section>
          )}

          {aba && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">{aba === "Pontalete" ? 2 : 3}</span>
              Bitola — {aba}
            </h2>
            <div className="space-y-2">
              {filtrados.map((p) => (
                <button key={p.id} onClick={() => selecionarProduto(p)}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all relative ${produtoId === p.id ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}>
                  <div>
                    <span className="font-semibold text-gray-900 text-sm">{p.nome}</span>
                    <span className="text-xs text-gray-400 ml-2">por {p.unidade}</span>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Largura {p.largura} · Espessura {p.espessuraFixa ?? espessura} · {p.comprimentos.join(" / ")}
                      {!p.espessuraFixa && espessura === "2,3mm" ? " · verificar disponibilidade" : ""}
                    </p>
                  </div>
                  {p.lider && <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">★ Campeão</span>}
                </button>
              ))}
            </div>
          </section>
          )}

          {produto && (
            <section className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">{aba === "Pontalete" ? 3 : 4}</span>
                Comprimento
              </h2>
              <div className="flex flex-wrap gap-2">
                {produto.comprimentos.map((c) => (
                  <button key={c} onClick={() => setComprimento(c)}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${comprimento === c ? "border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-200" : "border-gray-200 text-gray-700 hover:border-orange-300"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </section>
          )}

          {produto && comprimento && (
            <section className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">{aba === "Pontalete" ? 4 : 5}</span>
                Serviço de Aparelhagem
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ACABAMENTOS.map((a) => (
                  <button key={a} onClick={() => setAcabamento(a)}
                    className={`text-left p-4 rounded-xl border transition-all ${acabamento === a ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}>
                    <p className="font-semibold text-gray-900 text-sm">{a}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {a === "Bruto" ? "Direto da serra · opção mais econômica" : "Superfície lisa e padronizada na plaina"}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {produto && comprimento && acabamento && (
            <section className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">{aba === "Pontalete" ? 5 : 6}</span>
                Quantidade
              </h2>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => setQuantidade(q => Math.max(1, q - 5))} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">−</button>
                  <input type="number" value={quantidade} onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))} className="w-20 py-2 text-center font-bold text-gray-900 border-x border-gray-200 focus:outline-none" />
                  <button onClick={() => setQuantidade(q => q + 5)} className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600">+</button>
                </div>
                <span className="text-sm text-gray-500">{produto.unidade}</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-5">
                <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
                <p className="font-bold text-gray-900">Pinus — {produto.nome}</p>
                <p className="text-gray-600 text-sm">{variacao}</p>
                <p className="text-orange-600 font-semibold text-sm mt-1">{quantidade} {produto.unidade}</p>
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
              <ModalCotarWhatsApp aberto={modalWppAberto} onFechar={() => setModalWppAberto(false)} nomeProduto="Pinus" corpoMensagem={corpoMsgWpp} />
      </>
    </ProdutoLayout>
  );
}
