import { useState } from "react";
import { ChevronRight, ShoppingCart, Check, MessageCircle } from "lucide-react";
import { useOrcamento } from "../../../context/OrcamentoContext";
import ModalCotarWhatsApp from "../../../components/ModalCotarWhatsApp";
import GaleriaProduto from "../../../components/GaleriaProduto";
import ProdutoLayout from "../../../components/site/ProdutoLayout";
import BlocoAcessorios from "@/components/site/BlocoAcessorios";
import AcessoriosForroPergunta from "@/components/site/AcessoriosForroPergunta";
import { acessoriosForroMadeira } from "@/data/acessoriosForro";
import { imagensForroPinus } from "../../../data/imagensProduto";

export default function ForroPinus() {
  const { adicionar } = useOrcamento();
  const [area, setArea] = useState<number>(20);
  const [adicionado, setAdicionado] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const areaComPerda = Math.ceil(area * 1.1 * 10) / 10;

  const corpoMsg =
    `🌲 *Forro de Pinus*\n` +
    `• Área: ${area} m²\n` +
    `• Área c/ 10% de perda: ${areaComPerda} m²`;

  const handleAdicionar = () => {
    adicionar({
      id: "forro-pinus",
      nome: "Forro de Pinus",
      variacao: `${area} m²`,
      quantidade: areaComPerda,
      unidade: "m²",
      categoria: "Madeiramento",
    });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 800);
  };

  return (
    <ProdutoLayout
      produtoKey="forro-pinus"
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
            <span className="text-gray-900 font-medium">Forro Pinus</span>
          </div>
        </div>
      }
      cabecalho={
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Forro de Pinus</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Réguas de pinus claro para forros internos. Vendido por m², com 10% de perda já
            calculado.
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {["Modelo único", "Venda por m²", "Aceita verniz e stain", "Pronta entrega"].map((t) => (
              <span
                key={t}
                className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      }
      tituloAcessorios="Acessórios de Forro de Madeira"
      acessorios={
        <BlocoAcessorios itens={acessoriosForroMadeira(areaComPerda)} contexto={"Forro de Pinus"} />
      }
      galeria={
        <GaleriaProduto
          titulo="Forro de Pinus"
          subtitulo="Venda por m² · Foto em breve"
          imagens={imagensForroPinus}
        />
      }
    >
      <>
        {/* Área */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
              1
            </span>
            Área a cobrir (m²)
          </h2>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setArea((a) => Math.max(1, a - 5))}
                className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600"
              >
                −
              </button>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(Math.max(1, Number(e.target.value)))}
                className="w-24 py-2 text-center font-bold text-gray-900 border-x border-gray-200 focus:outline-none"
              />
              <button
                onClick={() => setArea((a) => a + 5)}
                className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600"
              >
                +
              </button>
            </div>
            <span className="text-sm text-gray-500">m²</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-sm text-amber-800">
              📐 <strong>Área com 10% de perda: {areaComPerda} m²</strong>
              <span className="text-amber-600 text-xs ml-1">
                (já inclusa a margem de corte recomendada)
              </span>
            </p>
          </div>
        </section>

        {/* Acessórios de forro */}
        <AcessoriosForroPergunta
          passo={2}
          contexto="Forro de Pinus"
          grupos={[
            {
              id: "meia-cana-pinus",
              nome: "Meia-Cana Pinus",
              descricao: "Acabamento perimetral entre o forro e a parede.",
              unidade: "peça",
              opcoes: ["3,0m"],
            },
          ]}
        />

        {/* Resumo + Botões */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="bg-gray-50 rounded-xl p-4 mb-5">
            <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
            <p className="font-bold text-gray-900">Forro de Pinus</p>
            <p className="text-orange-600 font-semibold text-sm mt-1">
              {area} m² solicitados → {areaComPerda} m² com perda
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={handleAdicionar}
              className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm ${adicionado ? "bg-green-600 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"}`}
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
              onClick={() => setModalWppAberto(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
            >
              <MessageCircle size={18} />
              Cotar no WhatsApp
            </button>
          </div>
        </section>

        {/* Especificações */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3">Especificações Técnicas</h2>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100">
              {[
                ["Espécie", "Pinus (reflorestamento)"],
                ["Unidade de venda", "m²"],
                ["Acabamento", "Aceita verniz, stain e esmalte"],
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
          nomeProduto="Forro de Pinus"
          corpoMensagem={corpoMsg}
        />
      </>
    </ProdutoLayout>
  );
}
