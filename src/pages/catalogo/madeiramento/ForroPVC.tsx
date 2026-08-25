import { useState } from "react";
import { ChevronRight, ShoppingCart, Check, MessageCircle } from "lucide-react";
import { useOrcamento } from "../../../context/OrcamentoContext";
import ModalCotarWhatsApp from "../../../components/ModalCotarWhatsApp";
import GaleriaProduto from "../../../components/GaleriaProduto";
import ProdutoLayout from "../../../components/site/ProdutoLayout";
import BlocoAcessorios from "@/components/site/BlocoAcessorios";
import AcessoriosForroPergunta from "@/components/site/AcessoriosForroPergunta";
import { acessoriosForroMadeira } from "@/data/acessoriosForro";
import { imagensForroPVC } from "../../../data/imagensProduto";

const LARGURAS = [
  { id: "20cm", util: 0.175, desc: "Régua padrão — a mais pedida" },
  { id: "25cm", util: 0.225, desc: "Régua larga — instalação mais rápida" },
];

const COMPRIMENTOS = [
  "1,0m",
  "1,5m",
  "2,0m",
  "2,5m",
  "3,0m",
  "3,5m",
  "4,0m",
  "4,5m",
  "5,0m",
  "5,5m",
  "6,0m",
  "6,5m",
  "7,0m",
];

function calcularArea(comprimento: string, quantidade: number, util: number): number {
  const m = parseFloat(comprimento.replace(",", ".").replace("m", ""));
  return Math.round(m * util * quantidade * 10) / 10;
}

export default function ForroPVC() {
  const { adicionar } = useOrcamento();
  const [larguraId, setLarguraId] = useState<string>("20cm");
  const [comprimento, setComprimento] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(20);
  const [adicionado, setAdicionado] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const largura = LARGURAS.find((l) => l.id === larguraId)!;
  const pronto = Boolean(comprimento) && quantidade >= 1;
  const area = comprimento ? calcularArea(comprimento, quantidade, largura.util) : 0;

  const corpoMsgWpp = pronto
    ? `🏠 *Forro PVC Branco Frisado*\n` +
      `• Largura da régua: ${largura.id}\n` +
      `• Comprimento: ${comprimento}\n` +
      `• Quantidade: ${quantidade} réguas\n` +
      `• Área estimada: ~${area} m²`
    : "";

  const handleAdicionar = () => {
    if (!pronto) return;
    adicionar({
      id: `forro-pvc-${larguraId}-${comprimento}`,
      nome: "Forro PVC Branco Frisado",
      variacao: `Régua ${largura.id} × ${comprimento}`,
      quantidade,
      unidade: "réguas",
      categoria: "Madeiramento",
    });
    setAdicionado(true);
    setTimeout(() => {
      setAdicionado(false);
    }, 800);
  };

  return (
    <ProdutoLayout
      produtoKey="forro-pvc"
      breadcrumb={
        <div className="bg-white border-b px-4 py-3">
          <div className="max-w-3xl mx-auto flex items-center gap-1 text-xs text-gray-500">
            <a href="/catalogo" className="hover:text-orange-500">
              Catálogo
            </a>
            <ChevronRight size={12} />
            <a href="/catalogo/madeiramento" className="hover:text-orange-500">
              Madeiramento
            </a>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-medium">Forro PVC</span>
          </div>
        </div>
      }
      cabecalho={
        <div>
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
            ★ Campeão de Vendas
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">Forro PVC Branco Frisado</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Réguas brancas frisadas. Fácil instalação, sem manutenção, pronta entrega.
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {["Modelo frisado", "1,0m a 7,0m de comprimento", "Pronta Entrega"].map((t) => (
              <span
                key={t}
                className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      }
      tituloAcessorios="Acessórios de Forro de Madeira"
      acessorios={
        <BlocoAcessorios itens={acessoriosForroMadeira(area)} contexto={"Forro PVC Branco"} />
      }
      galeria={
        <GaleriaProduto
          titulo="Forro PVC Branco Frisado"
          subtitulo="Réguas brancas · Foto em breve"
          imagens={imagensForroPVC}
        />
      }
    >
      <>
        {/* Largura */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
              1
            </span>
            Largura da régua
          </h2>
          <div className="flex flex-wrap gap-2">
            {LARGURAS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLarguraId(l.id)}
                className={`px-4 py-3 rounded-xl border text-left transition-all ${larguraId === l.id ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`}
              >
                <p className="text-sm font-semibold text-gray-900">{l.id}</p>
                <p className="text-xs text-gray-500">{l.desc}</p>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            * Largura útil após o encaixe: ~{(largura.util * 100).toFixed(1).replace(".", ",")} cm
          </p>
        </section>

        {/* Comprimento */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
              2
            </span>
            Comprimento da régua
          </h2>
          <div className="flex flex-wrap gap-2">
            {COMPRIMENTOS.map((c) => (
              <button
                key={c}
                onClick={() => setComprimento(c)}
                className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all
                    ${comprimento === c ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200 text-orange-700" : "border-gray-200 hover:border-orange-300 text-gray-700"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* Quantidade */}
        {comprimento && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
                3
              </span>
              Quantidade de réguas
            </h2>

            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantidade((q) => Math.max(1, q - 5))}
                  className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantidade}
                  onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))}
                  className="w-20 py-2 text-center font-bold text-gray-900 border-x border-gray-200 focus:outline-none"
                />
                <button
                  onClick={() => setQuantidade((q) => q + 5)}
                  className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">réguas</span>
            </div>

            {area > 0 && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-5">
                <p className="text-sm text-blue-800">
                  <strong>Área coberta estimada: ~{area} m²</strong>
                </p>
              </div>
            )}

            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
              <p className="font-bold text-gray-900">Forro PVC Branco Frisado</p>
              <p className="text-gray-600 text-sm">
                Régua {largura.id} × {comprimento}
              </p>
              <p className="text-orange-600 font-semibold text-sm mt-1">
                {quantidade} réguas · ~{area} m²
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAdicionar}
                className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm
                    ${adicionado ? "bg-green-600 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"}`}
              >
                {adicionado ? (
                  <>
                    <Check size={18} /> Adicionado! Veja os acessórios...
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Adicionar ao Orçamento
                  </>
                )}
              </button>
              <button
                onClick={() => pronto && setModalWppAberto(true)}
                disabled={!pronto}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <MessageCircle size={18} />
                Cotar no WhatsApp
              </button>
            </div>
          </section>
        )}

        {/* Acessórios de forro */}
        <AcessoriosForroPergunta
          passo={4}
          contexto="Forro PVC Branco Frisado"
          grupos={[
            {
              id: "canto-pvc",
              nome: "Canto PVC",
              descricao: "Acabamento de canto do forro.",
              unidade: "peça",
              opcoes: ["Interno", "Externo"],
            },
            {
              id: "emenda-h-pvc",
              nome: "Emenda H",
              descricao: "União entre réguas no sentido do comprimento.",
              unidade: "peça",
              opcoes: ["3m", "6m"],
            },
            {
              id: "moldura-pvc",
              nome: "Moldura PVC",
              descricao: "Arremate perimetral entre o forro e a parede.",
              unidade: "peça",
              opcoes: ["2m", "3m", "4m", "5m", "6m"],
            },
            {
              id: "roda-forro-u-pvc",
              nome: "Roda-forro tipo U",
              descricao: "Perfil U de acabamento perimetral.",
              unidade: "peça",
              opcoes: ["6m"],
            },
          ]}
        />

        {/* Especificações */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3">Especificações Técnicas</h2>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100">
              {[
                ["Modelo", "Frisado"],
                ["Larguras disponíveis", "20 cm e 25 cm"],
                ["Comprimentos disponíveis", "1,0m a 7,0m"],
                ["Cor", "Branco"],
                ["Acessórios", "Canto, Emenda H, Moldura, Roda-forro U"],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td className="py-2.5 text-gray-500">{k}</td>
                  <td className="py-2.5 text-gray-900 font-medium text-right">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <ModalCotarWhatsApp
          aberto={modalWppAberto}
          onFechar={() => setModalWppAberto(false)}
          nomeProduto="Forro PVC Branco Frisado"
          corpoMensagem={corpoMsgWpp}
        />
      </>
    </ProdutoLayout>
  );
}
