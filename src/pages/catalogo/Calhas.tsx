import { ArrowRight, ChevronRight } from "lucide-react";

const SUBCARDS = [
  {
    slug: "calha-alge",
    titulo: "Calha Alge — Moldura e Platibanda",
    descricao: "Calha galvanizada nos cortes Moldura e Platibanda de 2,0m a 6,0m. A mais vendida para telhados residenciais.",
    emoji: "🌧️",
    tags: ["Galvanizada", "2m a 6m"],
    badge: "★ Mais vendida",
  },
  {
    slug: "calha-aquapluv",
    titulo: "Calha Aquapluv & Style",
    descricao: "Calhas PVC Bege e Cinza da linha Aquapluv e Aquapluv Style Retangular. Não enferruja, fácil instalação.",
    emoji: "🔵",
    tags: ["PVC", "Bege e Cinza"],
    badge: null,
  },
  {
    slug: "rufo",
    titulo: "Rufos Galvanizados",
    descricao: "Rufo Alge galvanizado de 2,0m a 6,0m. Arremate entre telhado e parede, impermeabilização definitiva.",
    emoji: "🏠",
    tags: ["Galvanizado", "2m a 6m"],
    badge: null,
  },
  {
    slug: "manta-termica",
    titulo: "Manta Térmica Aluminizada",
    descricao: "1 face e 2 faces, de 10m² a 50m². Reduz até 70% do calor radiante. Essencial sob telhas metálicas e fibrocimento.",
    emoji: "🌡️",
    tags: ["1F e 2F", "10 a 50m²"],
    badge: null,
  },
  {
    slug: "manta-asfaltica",
    titulo: "Manta Asfáltica",
    descricao: "Aluminizada Terracota em 10cm e 20cm de largura por 10m. Impermeabilização de calhas, rufos e junções.",
    emoji: "🛡️",
    tags: ["Impermeabilização"],
    badge: null,
  },
  {
    slug: "acessorios-calha",
    titulo: "Acessórios de Calha",
    descricao: "Suportes, cabeceiras, saídas centrais, emendas e bocais para calhas Alge e Aquapluv.",
    emoji: "🔧",
    tags: ["Alge", "Aquapluv"],
    badge: null,
  },
];

export default function Calhas() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-1 text-xs text-gray-500">
          <a href="/catalogo" className="hover:text-orange-500 transition-colors">Catálogo</a>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">Calhas, Rufos & Funilaria</span>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">🌧️ Calhas, Rufos & Funilaria</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Calhas Alge e Aquapluv, rufos galvanizados, mantas térmicas e asfálticas. Escolha o produto para configurar.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBCARDS.map((card) => (
            <a key={card.slug} href={`/catalogo/calhas/${card.slug}`}
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
                    <span key={tag} className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">{tag}</span>
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
