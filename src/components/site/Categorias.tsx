import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./shared";
import { CATEGORIES } from "./catalog-data";

const EMOJI: Record<string, string> = {
  telhas: "",
  madeiramento: "",
  tintas: "",
  calhas: "",
  fixadores: "",
};

export function Categorias() {
  return (
    <section id="produtos" className="scroll-mt-24 bg-background py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          kicker="Nossas Categorias"
          title="Tudo para a sua cobertura em um só lugar"
          subtitle="Escolha uma categoria e veja as fichas técnicas completas no nosso catálogo."
        />

        <div className="mt-14 grid gap-6 grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to="/catalogo/$categoriaSlug"
              params={{ categoriaSlug: c.id }}
              className="group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                width={1024}
                height={768}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="relative p-6">
                <span className="text-3xl">{EMOJI[c.id]}</span>
                <h3 className="mt-3 text-xl font-extrabold text-primary-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">
                  {c.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent">
                  Ver no catálogo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
