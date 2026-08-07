import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Home, Paintbrush } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { CalculadoraTelhado } from "@/components/site/CalculadoraTelhado";
import { CalculadoraTinta } from "@/components/site/CalculadoraTinta";

export const Route = createFileRoute("/calculadora")({
  head: () => ({
    meta: [
      { title: "Calculadora de Telhado, Tinta e Verniz | Rocha Telhas" },
      {
        name: "description",
        content:
          "Calcule telhas, estrutura de madeira, tintas e vernizes para a sua obra em segundos e envie a lista pronta para cotação no WhatsApp.",
      },
      { property: "og:title", content: "Calculadora de Telhado, Tinta e Verniz — Rocha Telhas" },
      {
        property: "og:description",
        content:
          "Informe as medidas do telhado ou a área a pintar e receba a lista completa de materiais estimados.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CalculadoraPage,
});

function CalculadoraPage() {
  const [aba, setAba] = useState<"telhado" | "tinta">("telhado");

  const tab = (ativo: boolean) =>
    `flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-3 text-xs font-bold transition-all sm:text-sm ${
      ativo ? "bg-orange-600 text-white shadow-sm" : "text-gray-600 hover:text-orange-600"
    }`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="surface-dark pt-32 pb-14 md:pt-40 md:pb-16">
          <div className="mx-auto max-w-7xl px-5">
            <h1 className="max-w-3xl text-3xl leading-tight font-extrabold text-primary-foreground md:text-5xl">
              Calculadoras <span className="text-gradient-accent">Rocha Telhas</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-primary-foreground/75 md:text-lg">
              Estime telhas, estrutura de madeira, tintas e vernizes da sua obra e envie a lista pronta
              para o nosso comercial em um clique.
            </p>
          </div>
        </section>

        <section className="bg-gray-50 py-10 md:py-14">
          <div className="mx-auto max-w-3xl px-4">
            <div className="flex gap-1 rounded-xl border border-gray-200 bg-white p-1">
              <button type="button" onClick={() => setAba("telhado")} className={tab(aba === "telhado")}>
                <Home size={16} />
                Calculadora de Telhado
              </button>
              <button type="button" onClick={() => setAba("tinta")} className={tab(aba === "tinta")}>
                <Paintbrush size={16} />
                Calculadora de Tinta &amp; Verniz
              </button>
            </div>

            <div className="mt-6">{aba === "telhado" ? <CalculadoraTelhado /> : <CalculadoraTinta />}</div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhats />
    </div>
  );
}

