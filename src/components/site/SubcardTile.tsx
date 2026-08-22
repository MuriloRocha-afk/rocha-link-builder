import { Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Star } from "lucide-react";

export type SubcardTileProps = {
  categoriaSlug: string;
  produtoSlug: string;
  name: string;
  description: string;
  /** Foto de fundo do card. Sem imagem, usa o emoji sobre fundo texturizado. */
  image?: string;
  emoji?: string;
  badge?: string;
  tags?: string[];
  cta: string;
};

/** Card padrão do catálogo: foto de fundo, overlay, selo e hover premium. */
export function SubcardTile({
  categoriaSlug,
  produtoSlug,
  name,
  description,
  image,
  emoji,
  badge,
  tags,
  cta,
}: SubcardTileProps) {
  const destaque = Boolean(badge && /vend/i.test(badge));

  return (
    <Link
      to="/catalogo/$categoriaSlug/$produtoSlug"
      params={{ categoriaSlug, produtoSlug }}
      className="group relative flex min-h-[19rem] flex-col overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
    >
      {image ? (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-start justify-center bg-secondary pt-10"
        >
          <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
            {emoji}
          </span>
        </div>
      )}

      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-t ${
          image
            ? "from-primary via-primary/80 to-primary/20"
            : "from-primary via-primary/85 to-transparent"
        }`}
      />

      {badge ? (
        <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#F97316] px-3 py-1.5 text-[10px] font-extrabold tracking-wider text-white uppercase shadow-lg ring-2 ring-white/25">
          {destaque ? (
            <Flame className="h-3 w-3 fill-current" />
          ) : (
            <Star className="h-3 w-3 fill-current" />
          )}
          {badge.replace("★ ", "")}
        </span>
      ) : null}

      <div className="relative z-10 mt-auto flex flex-col p-5">
        <h3 className="text-base leading-snug font-extrabold text-primary-foreground sm:text-lg">
          {name}
        </h3>

        {tags?.length ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex rounded-full bg-white/12 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-primary-foreground/90 uppercase backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">{description}</p>

        <span className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] px-4 py-3 text-center text-xs font-extrabold text-white transition-all duration-300 group-hover:bg-[#EA580C] sm:text-sm">
          {cta}
          <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
