import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChevronRight, Crown, Star } from "lucide-react";

export type EmojiSubcard = {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  badge?: string;
  tags?: string[];
  cta: string;
};

const TAG_TONES = {
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  gray: "bg-primary/5 text-primary/70 border-border",
} as const;

export type TagTone = keyof typeof TAG_TONES;

export function EmojiSubcardGrid({
  cards,
  categoriaSlug,
  tagTone = "gray",
}: {
  cards: EmojiSubcard[];
  categoriaSlug: string;
  tagTone?: TagTone;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      {cards.map((card) => (
        <Link
          key={card.slug}
          to="/catalogo/$categoriaSlug/$produtoSlug"
          params={{ categoriaSlug, produtoSlug: card.slug }}
          className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
        >
          <div className="relative flex aspect-[4/3] w-full items-center justify-center bg-secondary">
            <span className="text-5xl transition-transform duration-500 group-hover:scale-110 sm:text-6xl">
              {card.emoji}
            </span>
            {card.badge ? (
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-[#F97316] px-3 py-1 text-[10px] font-extrabold tracking-wider text-white uppercase shadow-sm">
                <Star className="h-3 w-3 fill-current" />
                {card.badge}
              </span>
            ) : null}
          </div>

          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-base leading-snug font-extrabold text-primary sm:text-lg">
              {card.name}
            </h3>
            {card.tags?.length ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${TAG_TONES[tagTone]}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {card.description}
            </p>
            <span className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] px-4 py-3 text-center text-xs font-extrabold text-white transition-all group-hover:bg-[#EA580C] sm:text-sm">
              {card.cta}
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
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
}: {
  titulo: string;
  subtitulo: string;
  breadcrumb: string;
  eyebrow: string;
  cards: EmojiSubcard[];
  categoriaSlug: string;
  tagTone?: TagTone;
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
