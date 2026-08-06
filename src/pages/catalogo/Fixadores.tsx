import { ArrowRight, ChevronRight } from "lucide-react";

const SUBCARDS = [
  {
    slug: "parafusos-telha",
    titulo: "Parafusos para Telha",
    descricao: "Parafusos com vedação 110mm, 150mm e 200mm para fibrocimento. Kits de fixação para Colonial PVC. Avulso ou em embalagens.",
    emoji: "🔩",
    tags: ["Fibrocimento", "Colonial PVC"],
    badge: "★ Mais vendido",
  },
  {
    slug: "espigoes",
    titulo: "Espigões para Telha Fibrocimento",
    descricao: "Espigão 120cm Inicial e Sequencial, Espigão 180cm Confibra. Vedação lateral entre chapas.",
    emoji: "📌",
    tags: ["120cm", "180cm"],
    badge: null,
  },
  {
    slug: "pregos",
    titulo: "Pregos",
    descricao: "Prego polido com e sem cabeça, Telheiro e Aço com cabeça. Vendidos por Kg ou embalagem de 100 unidades.",
    emoji: "🔨",
    tags: ["Por Kg", "Por embalagem"],
    badge: null,
  },
  {
    slug: "arames",
    titulo: "Arames",
    descricao: "Arame Galvanizado BWG14, 16 e 18. Arame Recozido Liso e Torcido. Para amarrações e cercas.",
    emoji: "〰️",
    tags: ["Galvanizado", "Recozido"],
    badge: null,
  },
  {
    slug: "buchas-arruelas",
    titulo: "Buchas, Arruelas & Barras Roscadas",
    descricao: "Buchas plásticas e com anel, arruelas lisas zincadas e barras roscadas de 1/4 a 1/2 polegada.",
    emoji: "⚙️",
    tags: ["Barras Roscadas", "Arruelas"],
    badge: null,
  },
  {
    slug: "parafusos-madeira",
    titulo: "Parafusos para Madeira",
    descricao: "Parafuso Chipboard, Autobrocante e Frances Completo em diversas bitolas. Para estruturas e caixaria.",
    emoji: "🪛",
    tags: ["Chipboard", "Frances"],
    badge: null,
  },
];

export default function Fixadores() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-1 text-xs text-gray-500">
          <a href="/catalogo" className="hover:text-orange-500 transition-colors">Catálogo</a>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">Fixadores & Acessórios</span>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">🔩 Fixadores & Acessórios</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Parafusos, pregos, espigões, arames e tudo para fixação de telhas e estruturas. Escolha a categoria.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBCARDS.map((card) => (
            <a key={card.slug} href={`/catalogo/fixadores/${card.slug}`}
              className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all duration-200 flex flex-col relative overflow-hidden">
              {card.badge && (
                <span className="absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">{card.badge}</span>
              )}
              <span className="text-3xl mb-3">{card.emoji}</span>
              <h2 className="font-bold text-gray-900 text-sm mb-1 leading-snug pr-20">{card.titulo}</h2>
              <p className="text-gray-500 text-sm flex-1 leading-relaxed">{card.descricao}</p>
              {card.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {card.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center gap-1 text-orange-500 font-semibold text-sm group-hover:gap-2 transition-all">
                Escolher e cotar <ArrowRight size={16} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
