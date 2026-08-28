import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, ImageIcon } from "lucide-react";
import type { Guia } from "@/data/guias";

export function CapaGuia({ guia, className }: { guia: Guia; className?: string }) {
  if (guia.imagem) {
    return (
      <img
        src={guia.imagem}
        alt={guia.titulo}
        loading="lazy"
        className={className ?? "h-full w-full object-cover"}
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full flex-col items-center justify-center gap-2 bg-secondary text-muted-foreground"
    >
      <ImageIcon className="h-8 w-8" />
      <span className="px-4 text-center text-[11px] font-bold tracking-wide uppercase">
        Imagem em breve
      </span>
    </div>
  );
}

export function GuiaCard({ guia, compacto = false }: { guia: Guia; compacto?: boolean }) {
  return (
    <Link
      to="/guias/$slug"
      params={{ slug: guia.slug }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="aspect-[16/9] w-full overflow-hidden">
        <CapaGuia
          guia={guia}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent/12 px-3 py-1 text-[10px] font-extrabold tracking-wider text-accent uppercase">
            {guia.categoria}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
            <Clock className="h-3 w-3" />
            {guia.tempoLeitura}
          </span>
        </div>
        <h3
          className={`mt-3 font-extrabold text-primary ${compacto ? "text-base" : "text-lg md:text-xl"}`}
        >
          {guia.titulo}
        </h3>
        {!compacto ? (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{guia.resumo}</p>
        ) : null}
        <span className="mt-auto inline-flex items-center gap-2 pt-4 text-xs font-extrabold text-accent uppercase">
          Ler guia
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
