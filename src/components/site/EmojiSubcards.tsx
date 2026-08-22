import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, Crown } from "lucide-react";
import { SubcardTile } from "@/components/site/SubcardTile";

export type EmojiSubcard = {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  badge?: string;
  tags?: string[];
  cta: string;
};

export type TagTone = "purple" | "blue" | "gray";

export function EmojiSubcardGrid({
  cards,
  categoriaSlug,
}: {
  cards: EmojiSubcard[];
  categoriaSlug: string;
  tagTone?: TagTone;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      {cards.map((card) => (
        <SubcardTile
          key={card.slug}
          categoriaSlug={categoriaSlug}
          produtoSlug={card.slug}
          name={card.name}
          description={card.description}
          emoji={card.emoji}
          badge={card.badge}
          tags={card.tags}
          cta={card.cta}
        />
      ))}
    </div>
  );
}

export type SubcardGrupo = {
  id: string;
  label: string;
  descricao: string;
  slugs: string[];
};

function GruposTabs({
  grupos,
  cards,
  categoriaSlug,
  tagTone,
}: {
  grupos: SubcardGrupo[];
  cards: EmojiSubcard[];
  categoriaSlug: string;
  tagTone?: TagTone;
}) {
  const [aba, setAba] = useState(grupos[0]?.id);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Grupos de produtos"
        className="flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-card)]"
      >
        {grupos.map((g) => (
          <button
            key={g.id}
            type="button"
            role="tab"
            aria-selected={aba === g.id}
            aria-controls={`painel-${g.id}`}
            onClick={() => setAba(g.id)}
            className={`flex-1 rounded-xl px-4 py-3 text-xs font-extrabold tracking-wide uppercase transition-colors sm:text-sm ${
              aba === g.id ? "bg-[#F97316] text-white shadow-sm" : "text-primary/70 hover:bg-primary/5"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {grupos.map((g) => (
        <section
          key={g.id}
          id={`painel-${g.id}`}
          role="tabpanel"
          aria-label={g.label}
          className={aba === g.id ? "mt-6" : "hidden"}
        >
          <h2 className="sr-only">{g.label}</h2>
          <p className="mb-6 text-sm text-muted-foreground">{g.descricao}</p>
          <EmojiSubcardGrid
            cards={g.slugs.map((s) => cards.find((c) => c.slug === s)!).filter(Boolean)}
            categoriaSlug={categoriaSlug}
            tagTone={tagTone}
          />
        </section>
      ))}
    </div>
  );
}

export function CategoriaSubcardPage({
  titulo,
  subtitulo,
  breadcrumb,
  eyebrow,
  cards,
  categoriaSlug,
  tagTone,
  grupos,
}: {
  titulo: string;
  subtitulo: string;
  breadcrumb: string;
  eyebrow: string;
  cards: EmojiSubcard[];
  categoriaSlug: string;
  tagTone?: TagTone;
  grupos?: SubcardGrupo[];
}) {

  return (
    <div className="min-h-screen bg-background">
      <section className="surface-dark pt-16 pb-16">
        <div className="mx-auto max-w-7xl px-5">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm font-semibold text-primary-foreground/70"
          >
            <Link to="/catalogo" className="transition-colors hover:text-accent">
              Catálogo
            </Link>
            <ChevronRight className="h-4 w-4 opacity-60" />
            <span className="text-accent">{breadcrumb}</span>
          </nav>
          <Link
            to="/catalogo"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/70 transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao catálogo
          </Link>
          <h1 className="mt-6 max-w-3xl text-4xl leading-tight font-extrabold text-primary-foreground md:text-6xl">
            {titulo}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-primary-foreground/75 md:text-lg">
            {subtitulo}
          </p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex items-center gap-2 text-sm font-extrabold tracking-[0.14em] text-accent uppercase">
            <Crown className="h-4 w-4" />
            {eyebrow}
          </div>
          <div className="mt-6">
            <EmojiSubcardGrid cards={cards} categoriaSlug={categoriaSlug} tagTone={tagTone} />
          </div>
        </div>
      </section>
    </div>
  );
}
