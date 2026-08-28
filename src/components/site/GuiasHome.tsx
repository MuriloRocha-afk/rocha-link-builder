import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { CapaGuia } from "./GuiaCard";
import { GUIAS } from "@/data/guias";

export function GuiasHome() {
  const guias = GUIAS.slice(0, 3);
  if (!guias.length) return null;

  return (
    <section id="guias" className="surface-dark scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-bold tracking-[0.18em] text-accent uppercase">
              Guias
            </span>
            <h2 className="mt-5 text-3xl font-extrabold text-primary-foreground md:text-4xl">
              Aprenda antes de comprar
            </h2>
            <p className="mt-4 text-base text-primary-foreground/75">
              Conteúdo prático de quem vive de obra: cálculo de material, escolha de telha e dicas
              que economizam dinheiro.
            </p>
          </div>
          <Link
            to="/guias"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-extrabold text-accent-foreground transition-colors hover:brightness-95"
          >
            Ver todos os guias
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 space-y-5">
          {guias.map((g) => (
            <Link
              key={g.slug}
              to="/guias/$slug"
              params={{ slug: g.slug }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 transition-colors hover:bg-primary-foreground/10 sm:flex-row"
            >
              <div className="h-44 w-full shrink-0 overflow-hidden sm:h-auto sm:w-64">
                <CapaGuia
                  guia={g}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center gap-3 p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-accent/15 px-3 py-1 text-[10px] font-extrabold tracking-wider text-accent uppercase">
                    {g.categoria}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary-foreground/60">
                    <Clock className="h-3 w-3" />
                    {g.tempoLeitura}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-primary-foreground">{g.titulo}</h3>
                <p className="text-sm text-primary-foreground/70">{g.resumo}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
