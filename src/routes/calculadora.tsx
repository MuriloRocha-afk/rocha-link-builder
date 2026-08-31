import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Home, Layers, PanelTop, Paintbrush, Ruler } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { CalculadoraTelhado } from "@/components/site/CalculadoraTelhado";
import { CalculadoraTinta } from "@/components/site/CalculadoraTinta";
import { CalculadoraForro } from "@/components/site/CalculadoraForro";
import { CalculadoraManta } from "@/components/site/CalculadoraManta";
import { ConversorMedidas } from "@/components/site/ConversorMedidas";
import { CalcDimsProvider } from "@/components/site/calc-dims";

export const Route = createFileRoute("/calculadora")({
  head: () => ({
    meta: [
      { title: "Calculadoras de Telhado, Forro, Manta e Tinta | Rocha Telhas" },
      {
        name: "description",
        content:
          "Calcule telhas, forro, manta de impermeabilização, tintas e converta medidas em segundos e envie a lista pronta para cotação no WhatsApp.",
      },
      {
        property: "og:title",
        content: "Calculadoras Rocha Telhas — telhado, forro, manta e tinta",
      },
      {
        property: "og:description",
        content:
          "Informe as medidas do telhado uma vez e estime telhas, estrutura de madeira, forro, manta e tinta da sua obra.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CalculadoraPage,
});

const ABAS = [
  { id: "telhado", label: "Telhado", icon: Home },
  { id: "forro", label: "Forro & Deck", icon: PanelTop },
  { id: "manta", label: "Manta / Impermeabilização", icon: Layers },
  { id: "tinta", label: "Tinta & Verniz", icon: Paintbrush },
  { id: "conversor", label: "Conversor de Medidas", icon: Ruler },
] as const;

type AbaId = (typeof ABAS)[number]["id"];

function CalculadoraPage() {
  const [aba, setAba] = useState<AbaId>("telhado");

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
              Estime telhas, forro, manta, tintas e converta medidas da sua obra — e envie a lista
              pronta para o nosso comercial em um clique.
            </p>
          </div>
        </section>

        <section className="bg-gray-50 py-10 md:py-14">
          <div className="mx-auto max-w-4xl px-4">
            <CalcDimsProvider>
              <div className="flex gap-1 overflow-x-auto rounded-xl border border-gray-200 bg-white p-1">
                {ABAS.map((a) => {
                  const ativo = aba === a.id;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setAba(a.id)}
                      className={`flex shrink-0 flex-1 items-center justify-center gap-2 rounded-lg px-3 py-3 text-xs font-bold whitespace-nowrap transition-all sm:text-sm ${
                        ativo ? "bg-orange-600 text-white shadow-sm" : "text-gray-600 hover:text-orange-600"
                      }`}
                    >
                      <a.icon size={16} />
                      {a.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6">
                {aba === "telhado" ? <CalculadoraTelhado /> : null}
                {aba === "forro" ? <CalculadoraForro /> : null}
                {aba === "manta" ? <CalculadoraManta /> : null}
                {aba === "tinta" ? <CalculadoraTinta /> : null}
                {aba === "conversor" ? <ConversorMedidas /> : null}
              </div>
            </CalcDimsProvider>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhats />
    </div>
  );
}
