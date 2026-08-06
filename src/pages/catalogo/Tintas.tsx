import { ArrowRight, ChevronRight } from "lucide-react";

const SUBCARDS = [
  {
    slug: "verniz",
    titulo: "Verniz para Madeira",
    descricao: "Anjo Verniz Dura Mais, Marítimo Premium, Sayerlack Polisten e Sayermar. Para madeira interna e externa.",
    emoji: "✨",
    tags: ["Anjo", "Sayerlack", "Irajá"],
    badge: null,
  },
  {
    slug: "stain",
    titulo: "Stain para Madeira",
    descricao: "Anjo Stain Casa nas cores Imbuia, Ipê, Mogno e Incolor. Penetra na fibra, realça o veio natural.",
    emoji: "🪵",
    tags: ["Anjo Tintas", "4 cores"],
    badge: null,
  },
  {
    slug: "tinta-acrilica",
    titulo: "Tinta Acrílica",
    descricao: "Anjo Emborrachada e AnjoMais Premium. Para telhados, fachadas e superfícies externas.",
    emoji: "🎨",
    tags: ["Anjo", "Base A/B/C"],
    badge: null,
  },
  {
    slug: "esmalte",
    titulo: "Esmalte Sintético",
    descricao: "Anjo Tomplus em várias cores brilhantes. Acabamento duro e lavável para madeira e ferro.",
    emoji: "🖌️",
    tags: ["Anjo Tomplus", "Várias cores"],
    badge: null,
  },
  {
    slug: "seladora",
    titulo: "Seladora, Primer & Impermeabilização",
    descricao: "Anjo Selador Acrílico, Primer Base Água, Vedacit Penetrol e Vedalit. Base para qualquer acabamento.",
    emoji: "🛡️",
    tags: ["Anjo", "Vedacit"],
    badge: null,
  },
  {
    slug: "cupicida",
    titulo: "Proteção contra Cupim",
    descricao: "Apus Química e Ecol Exterminador de Cupim em 900ml e 5L. Proteção preventiva e curativa.",
    emoji: "🌿",
    tags: ["Apus", "Ecol"],
    badge: null,
  },
  {
    slug: "thinner",
    titulo: "Thinner & Diluentes",
    descricao: "Anjo Thinner, Aguarraz Mineral e Diluente Premium. Para limpeza e diluição de tintas e vernizes.",
    emoji: "🧪",
    tags: ["Anjo", "Eucatex"],
    badge: null,
  },
];

export default function Tintas() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-1 text-xs text-gray-500">
          <a href="/catalogo" className="hover:text-orange-500 transition-colors">Catálogo</a>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">Tintas, Vernizes & Proteção</span>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">🎨 Tintas, Vernizes & Proteção</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Linha completa Anjo, Sayerlack, Vedacit e mais. Escolha o tipo de produto para ver as opções e cotar.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBCARDS.map((card) => (
            <a key={card.slug} href={`/catalogo/tintas/${card.slug}`}
              className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all duration-200 flex flex-col relative overflow-hidden">
              {card.badge && (
                <span className="absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">{card.badge}</span>
              )}
              <span className="text-3xl mb-3">{card.emoji}</span>
              <h2 className="font-bold text-gray-900 text-sm mb-1 leading-snug">{card.titulo}</h2>
              <p className="text-gray-500 text-sm flex-1 leading-relaxed">{card.descricao}</p>
              {card.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {card.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center gap-1 text-orange-500 font-semibold text-sm group-hover:gap-2 transition-all">
                Ver produtos e cotar <ArrowRight size={16} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
