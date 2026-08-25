import { useState } from "react";
import { SubcardTile } from "@/components/site/SubcardTile";
import cambaraAsset from "@/assets/IMG_1500.jpeg.asset.json";
import eucalipto from "@/assets/prod-eucalipto.jpg";
import cedrinho from "@/assets/prod-cedrinho.jpg";
import pinus from "@/assets/prod-pinus.jpg";
import garapeira from "@/assets/prod-garapeira.jpg";
import amescla from "@/assets/prod-amescla.jpg";
import forroPvc from "@/assets/prod-forro-pvc.jpg";
import forroCedrinho from "@/assets/prod-forro-cedrinho.jpg";
import madeirite from "@/assets/prod-madeirite.jpg";
import tabeira from "@/assets/prod-tabeira.jpg";
import mourao from "@/assets/prod-mourao.jpg";

const cambara = cambaraAsset.url;

type Subcard = {
  slug: string;
  name: string;
  image: string;
  description: string;
  badge?: string;
  tag?: string;
  cta: string;
  grupo: "nobres" | "gerais";
};

export const MADEIRAMENTO_SUBCARDS: Subcard[] = [
  {
    slug: "cambara",
    name: "Cambará Rosa",
    image: cambara,
    description:
      "Ripão, viga, caibro, caibrão, ripa, sarrafo, tábua e dormente — bruto ou aparelhado. Ripão e viga são os formatos mais vendidos.",
    badge: "Mais Vendido",
    tag: "DOF/IBAMA · Aparelhado em Plaina",
    cta: "Configurar Bitola e Comprimento",
    grupo: "nobres",
  },
  {
    slug: "pinus",
    name: "Pinus",
    image: pinus,
    description:
      "Sarrafo, tábua e pontalete com largura, espessura e comprimento próprios. Pinus tábua é um dos mais procurados.",
    badge: "Mais Vendido",
    cta: "Ver Produtos",
    grupo: "gerais",
  },
  {
    slug: "garapeira",
    name: "Garapeira",
    image: garapeira,
    description: "Madeira dura nativa: barrotes, caibros, vigas e dormentes para alta resistência.",
    cta: "Ver Bitolas",
    grupo: "nobres",
  },
  {
    slug: "eucalipto",
    name: "Pontalete de Eucalipto",
    image: eucalipto,
    description:
      "Pontalete roliço de eucalipto in natura, de 3m a 6m. Reflorestamento certificado.",
    badge: "Mais Vendido",
    cta: "Escolher Comprimento",
    grupo: "gerais",
  },
  {
    slug: "cedrinho",
    name: "Cedrinho",
    image: cedrinho,
    description:
      "Sarrafos e tábuas em bruto ou aparelhado. Leve e ideal para forros e estruturas internas.",
    cta: "Ver Bitolas",
    grupo: "gerais",
  },
  {
    slug: "amescla",
    name: "Amescla",
    image: amescla,
    description: "Sarrafos e tábuas em bruto. Opção econômica para estruturas secundárias.",
    cta: "Ver Bitolas",
    grupo: "gerais",
  },
  {
    slug: "forro-cedrinho",
    name: "Forro Cedrinho",
    image: forroCedrinho,
    description: "Forro de cedrinho mesclado 1cm x 10cm, vendido por m². Acabamento natural nobre.",
    badge: "Mais Vendido",
    cta: "Cotar em m²",
    grupo: "gerais",
  },
  {
    slug: "forro-pinus",
    name: "Forro Pinus",
    image: forroCedrinho,
    description:
      "Réguas de pinus macho-fêmea 1cm x 10cm, vendido por m². Claro e fácil de envernizar.",
    cta: "Cotar em m²",
    grupo: "gerais",
  },
  {
    slug: "forro-pvc",
    name: "Forro PVC",
    image: forroPvc,
    description: "Réguas brancas de 20cm de largura, do 1m ao 7m de comprimento. Pronta entrega.",
    cta: "Escolher Comprimento",
    grupo: "gerais",
  },
  {
    slug: "madeirit",
    name: "Madeirit & Compensado",
    image: madeirite,
    description: "Madeirit plastificado e rosa, OSB e compensado de 9mm a 25mm.",
    cta: "Ver Espessuras",
    grupo: "gerais",
  },
  {
    slug: "tabeira",
    name: "Tabeira",
    image: tabeira,
    description: "Tabeira lisa (boleada) ou desenhada de 15cm a 30cm, com 6 modelos de desenho.",
    cta: "Ver Modelos",
    grupo: "gerais",
  },
  {
    slug: "tabeiras-deck",
    name: "Deck",
    image: tabeira,
    description: "Deck de cumaru mesclado, garapeia e pinus tratado, calculado por m².",
    cta: "Calcular m²",
    grupo: "gerais",
  },
  {
    slug: "mourao-tratado",
    name: "Mourão Tratado",
    image: mourao,
    description: "Mourão autoclave de 4cm a 20cm de diâmetro e 2,20m a 10m de comprimento.",
    cta: "Configurar Mourão",
    grupo: "gerais",
  },
  {
    slug: "peroba",
    name: "Peroba do Norte / D'Água",
    image: garapeira,
    description:
      "Viga, caibro, caibrão, ripa, ripão, sarrafo e tábua — bruta ou aparelhada em plaina. Sob consulta.",
    tag: "Verificar disponibilidade · DOF/IBAMA · Madeira de Lei",
    cta: "Ver Bitolas",
    grupo: "nobres",
  },
  {
    slug: "jatoba",
    name: "Jatobá",
    image: garapeira,
    description:
      "Madeira de lei de altíssima densidade: viga, caibro, caibrão, ripa, ripão, sarrafo e tábua — bruta ou aparelhada. Sob consulta.",
    tag: "Verificar disponibilidade · DOF/IBAMA · Madeira de Lei",
    cta: "Ver Bitolas",
    grupo: "nobres",
  },
];

function SubcardGrid({ cards }: { cards: Subcard[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      {cards.map((card) => (
        <SubcardTile
          key={card.slug}
          categoriaSlug="madeiramento"
          produtoSlug={card.slug}
          name={card.name}
          description={card.description}
          image={card.image}
          badge={card.badge}
          tags={card.tag ? [card.tag] : undefined}
          cta={card.cta}
        />
      ))}
    </div>
  );
}

const ORDEM_NOBRES = ["cambara", "garapeira", "peroba", "jatoba"];

const NOBRES = ORDEM_NOBRES.map(
  (slug) => MADEIRAMENTO_SUBCARDS.find((c) => c.slug === slug)!,
).filter(Boolean);
const GERAIS = MADEIRAMENTO_SUBCARDS.filter((c) => c.grupo === "gerais");

const ABAS = [
  {
    id: "nobres" as const,
    label: "Madeiras Nobres",
    descricao:
      "Espécies nativas de alta densidade para estrutura de acabamento e alta resistência.",
    cards: NOBRES,
  },
  {
    id: "gerais" as const,
    label: "Madeiras & Beneficiados",
    descricao: "Reflorestamento, forros, chapas e tratados para o dia a dia da obra.",
    cards: GERAIS,
  },
];

export function MadeiramentoSubcardGrid() {
  const [aba, setAba] = useState<"nobres" | "gerais">("nobres");

  return (
    <div>
      <div
        role="tablist"
        aria-label="Grupos de madeiramento"
        className="flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-card)]"
      >
        {ABAS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={aba === t.id}
            aria-controls={`painel-${t.id}`}
            onClick={() => setAba(t.id)}
            className={`flex-1 rounded-xl px-4 py-3 text-xs font-extrabold tracking-wide uppercase transition-colors sm:text-sm ${
              aba === t.id
                ? "bg-[#F97316] text-white shadow-sm"
                : "text-primary/70 hover:bg-primary/5"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {ABAS.map((t) => (
        <section
          key={t.id}
          id={`painel-${t.id}`}
          role="tabpanel"
          aria-label={t.label}
          className={aba === t.id ? "mt-6" : "hidden"}
        >
          <h2 className="sr-only">{t.label}</h2>
          <p className="mb-6 text-sm text-muted-foreground">{t.descricao}</p>
          <SubcardGrid cards={t.cards} />
        </section>
      ))}
    </div>
  );
}
