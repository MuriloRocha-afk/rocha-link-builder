import { Link } from "@tanstack/react-router";
import { ArrowLeft, Hammer, MessageCircle } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { waLink } from "@/components/site/shared";

export function EmBreveProduto({
  categoriaSlug,
  categoriaNome,
  produtoSlug,
}: {
  categoriaSlug: string;
  categoriaNome: string;
  produtoSlug: string;
}) {
  const nome = produtoSlug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-5 pt-40 pb-28 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-extrabold tracking-wider text-primary/70 uppercase">
          <Hammer className="h-4 w-4" />
          Página em construção
        </span>
        <h1 className="mt-6 text-3xl font-extrabold text-primary md:text-4xl">{nome}</h1>
        <p className="mt-4 text-muted-foreground">
          O configurador deste produto está sendo preparado. Enquanto isso, fale com nosso time no
          WhatsApp que montamos seu orçamento na hora.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={waLink(`Olá! Quero cotar ${nome} (${categoriaNome}).`)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#EA580C]"
          >
            <MessageCircle className="h-4 w-4" />
            Cotar no WhatsApp
          </a>
          <Link
            to="/catalogo/$categoriaSlug"
            params={{ categoriaSlug }}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-extrabold text-primary transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para {categoriaNome}
          </Link>
        </div>
      </main>
      <Footer />
      <FloatingWhats />
    </div>
  );
}
