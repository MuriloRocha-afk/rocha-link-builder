import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  Calculator,
  ChevronRight,
  Clock,
  Link2,
  MessageCircle,
  Share2,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { CapaGuia, GuiaCard } from "@/components/site/GuiaCard";
import { getGuia, guiasRelacionados } from "@/data/guias";
import { waLink } from "@/constants/whatsapp";
import { toast } from "sonner";

export const Route = createFileRoute("/guias/$slug")({
  loader: ({ params }) => {
    const guia = getGuia(params.slug);
    if (!guia) throw notFound();
    return { guia, relacionados: guiasRelacionados(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Guia não encontrado | Rocha Telhas" }, { name: "robots", content: "noindex" }] };
    }
    const { guia } = loaderData;
    return {
      meta: [
        { title: `${guia.titulo} | Guias Rocha Telhas` },
        { name: "description", content: guia.resumo },
        { property: "og:title", content: guia.titulo },
        { property: "og:description", content: guia.resumo },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: GuiaPost,
});

function GuiaPost() {
  const { guia, relacionados } = Route.useLoaderData();

  const compartilhar = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: guia.titulo, text: guia.resumo, url });
        return;
      } catch {
        /* usuário cancelou */
      }
    }
    await navigator.clipboard?.writeText(url);
    toast.success("Link copiado!");
  };

  const copiarLink = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    toast.success("Link copiado!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-24">
        <article className="mx-auto max-w-3xl px-5">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1 text-xs font-semibold text-muted-foreground"
          >
            <Link to="/" className="hover:text-accent">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/guias" className="hover:text-accent">
              Guias
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary">{guia.titulo}</span>
          </nav>

          <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border">
            <CapaGuia guia={guia} />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-accent/12 px-3 py-1 text-[10px] font-extrabold tracking-wider text-accent uppercase">
              {guia.categoria}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {guia.tempoLeitura}
            </span>
          </div>

          <h1 className="mt-4 text-3xl leading-tight font-extrabold text-primary md:text-4xl">
            {guia.titulo}
          </h1>

          <div className="mt-8 space-y-5">
            {guia.corpo.map((bloco, i) => {
              if (bloco.tipo === "h2") {
                return (
                  <h2 key={i} className="pt-4 text-xl font-extrabold text-primary md:text-2xl">
                    {bloco.texto}
                  </h2>
                );
              }
              if (bloco.tipo === "lista") {
                return (
                  <ul key={i} className="space-y-2 pl-1">
                    {bloco.itens.map((item) => (
                      <li key={item} className="flex gap-3 text-base leading-relaxed text-foreground/80">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-base leading-relaxed text-foreground/80">
                  {bloco.texto}
                </p>
              );
            })}
          </div>

          <div className="surface-dark mt-12 rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-extrabold text-primary-foreground">
              Quer o número exato para a sua obra?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/75">
              Use a calculadora do site ou fale direto com um vendedor pelo WhatsApp.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/calculadora"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-extrabold text-accent-foreground transition-colors hover:brightness-95"
              >
                <Calculator className="h-4 w-4" />
                Calcular meu telhado
              </Link>
              <a
                href={waLink(
                  `Olá! Li o guia "${guia.titulo}" no site e quero ajuda com o meu telhado.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-green-700"
              >
                <MessageCircle className="h-4 w-4" />
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border pt-6">
            <span className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
              Compartilhar
            </span>
            <button
              type="button"
              onClick={compartilhar}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-muted"
            >
              <Share2 className="h-4 w-4" />
              Compartilhar
            </button>
            <button
              type="button"
              onClick={copiarLink}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-muted"
            >
              <Link2 className="h-4 w-4" />
              Copiar link
            </button>
            <a
              href={waLink(`Olha esse guia da Rocha Telhas: ${guia.titulo}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-muted"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </article>

        {relacionados.length ? (
          <section className="mx-auto mt-20 max-w-7xl px-5">
            <h2 className="text-2xl font-extrabold text-primary">Veja também</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relacionados.map((g) => (
                <GuiaCard key={g.slug} guia={g} compacto />
              ))}
            </div>
          </section>
        ) : (
          <section className="mx-auto mt-20 max-w-3xl px-5">
            <Link
              to="/guias"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-accent uppercase"
            >
              Ver todos os guias
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        )}
      </main>
      <Footer />
      <FloatingWhats />
    </div>
  );
}
