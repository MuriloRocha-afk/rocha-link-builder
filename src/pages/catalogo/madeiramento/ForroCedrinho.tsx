import { useState } from "react";
import { ChevronRight, ShoppingCart, Check, MessageCircle } from "lucide-react";
import { useOrcamento } from "../../../context/OrcamentoContext";
import ModalCotarWhatsApp from "../../../components/ModalCotarWhatsApp";
import GaleriaProduto from "../../../components/GaleriaProduto";
import ProdutoLayout from "../../../components/site/ProdutoLayout";
import TipoCard from "../../../components/site/TipoCard";
import BlocoAcessorios from "@/components/site/BlocoAcessorios";
import AcessoriosForroPergunta, {
  opcoesMeiaCanaMeioMetro,
} from "@/components/site/AcessoriosForroPergunta";
import { acessoriosForroMadeira } from "@/data/acessoriosForro";
import { imagensForroCedrinho } from "../../../data/imagensProduto";

const CATEGORIAS = [
  {
    id: "cerne",
    nome: "Cedrinho Cerne",
    desc: "Tom uniforme, sem variação entre as réguas.",
    lider: false,
  },
  {
    id: "mesclado",
    nome: "Cedrinho Mesclado",
    desc: "Variação natural de tons claros e escuros.",
    lider: true,
  },
];

export default function ForroCedrinho() {
  const { adicionar } = useOrcamento();
  const [categoriaId, setCategoriaId] = useState<string>("mesclado");
  const [area, setArea] = useState<number>(20);
  const [adicionado, setAdicionado] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

  const categoria = CATEGORIAS.find((c) => c.id === categoriaId)!;
  // 10% de perda embutido
  const areaComPerda = Math.ceil(area * 1.1 * 10) / 10;

  const corpoMsg = `✨ *Forro Cedrinho*\n• Categoria: ${categoria.nome}\n• Área: ${area} m²\n• Área c/ 10% de perda: ${areaComPerda} m²`;

  const handleAdicionar = () => {
    adicionar({
      id: `forro-cedrinho-${categoriaId}`,
      nome: "Forro Cedrinho",
      variacao: `${categoria.nome} · ${area} m²`,
      quantidade: areaComPerda,
      unidade: "m²",
      categoria: "Madeiramento",
    });
    setAdicionado(true);
    setTimeout(() => {
      setAdicionado(false);
    }, 800);
  };

  return (
    <ProdutoLayout
      produtoKey="forro-cedrinho"
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
            <span className="text-gray-900 font-medium">Forro Cedrinho</span>
          </div>
        </div>
      }
      cabecalho={
        <div>
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
            ★ Campeão de Vendas
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">Forro Cedrinho</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Acabamento natural nobre para tetos e ambientes internos. Vendido por m², com 10% de
            perda já calculado.
          </p>
        </div>
      }
      tituloAcessorios="Acessórios de Forro de Madeira"
      acessorios={
        <BlocoAcessorios itens={acessoriosForroMadeira(areaComPerda)} contexto={"Forro Cedrinho"} />
      }
      galeria={
        <GaleriaProduto
          titulo="Forro Cedrinho"
          subtitulo="Venda por m² · Foto em breve"
          imagens={imagensForroCedrinho}
        />
      }
    >
      <>
        {/* Categoria */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
              1
            </span>
            Categoria
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {CATEGORIAS.map((c) => (
              <TipoCard
                key={c.id}
                nome={c.nome}
                descricao={c.desc}
                badge={c.lider ? "★ Mais Vendido" : undefined}
                selected={categoriaId === c.id}
                onClick={() => setCategoriaId(c.id)}
              />
            ))}
          </div>
        </section>

        {/* Área */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
              2
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
          passo={3}
          contexto={`Forro Cedrinho ${categoria.nome}`}
          grupos={[
            {
              id: "meia-cana-cedrinho",
              nome: "Meia-Cana Cedrinho",
              descricao: "Acabamento perimetral entre o forro e a parede.",
              unidade: "peça",
              opcoes: opcoesMeiaCanaMeioMetro,
            },
          ]}
        />

        {/* Resumo + Botões */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="bg-gray-50 rounded-xl p-4 mb-5">
            <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
            <p className="font-bold text-gray-900">Forro Cedrinho</p>
            <p className="text-gray-600 text-sm">{categoria.nome}</p>
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

        <ModalCotarWhatsApp
          aberto={modalWppAberto}
          onFechar={() => setModalWppAberto(false)}
          nomeProduto="Forro Cedrinho"
          corpoMensagem={corpoMsg}
        />
      </>
    </ProdutoLayout>
  );
}
