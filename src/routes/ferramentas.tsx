import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Compass, Hammer, PanelTop, Table2 } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer, FloatingWhats } from "@/components/site/Footer";
import { GuiaTelha } from "@/components/site/ferramentas/GuiaTelha";
import { CalculadoraMadeiramento } from "@/components/site/ferramentas/CalculadoraMadeiramento";
import { CalculadoraForro } from "@/components/site/ferramentas/CalculadoraForro";
import { TabelaComparativa } from "@/components/site/ferramentas/TabelaComparativa";
import { Glossario } from "@/components/site/ferramentas/Glossario";

export const Route = createFileRoute("/ferramentas")({
  head: () => ({
    meta: [
      { title: "Ferramentas & Utilidades para Telhado | Rocha Telhas" },
      {
        name: "description",
        content:
          "Guia qual telha escolher, calculadora de madeiramento e de forro, tabela comparativa de telhas e glossário técnico da Rocha Telhas.",
      },
      { property: "og:title", content: "Ferramentas & Utilidades — Rocha Telhas" },
      {
        property: "og:description",
        content:
          "Quiz de escolha de telha, cálculo de vigas, caibros e ripas, quantidade de forro, comparativo técnico e glossário de obra.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FerramentasPage,
});

const ABAS = [
  { id: "guia", label: "Qual telha escolher", icon: Compass },
  { id: "madeiramento", label: "Madeiramento", icon: Hammer },
  { id: "forro", label: "Forro", icon: PanelTop },
  { id: "comparativo", label: "Comparativo", icon: Table2 },
  { id: "glossario", label: "Glossário", icon: BookOpen },
] as const;

type AbaId = (typeof ABAS)[number]["id"];

function FerramentasPage() {
  const [aba, setAba] = useState<AbaId>("guia");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="surface-dark pt-32 pb-14 md:pt-40 md:pb-16">
          <div className="mx-auto max-w-7xl px-5">
            <h1 className="max-w-3xl text-3xl leading-tight font-extrabold text-primary-foreground md:text-5xl">
              Ferramentas &amp; <span className="text-gradient-accent">Utilidades</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-primary-foreground/75 md:text-lg">
              Muito além de um catálogo: descubra qual telha combina com a sua obra, calcule
              madeiramento e forro, compare tipos de telha e entenda os termos técnicos.
            </p>
          </div>
        </section>

        <section className="bg-gray-50 py-10 md:py-14">
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex gap-1 overflow-x-auto rounded-xl border border-gray-200 bg-white p-1">
              {ABAS.map((a) => {
                const ativo = aba === a.id;
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAba(a.id)}
                    className={`flex flex-1 shrink-0 items-center justify-center gap-2 rounded-lg px-3 py-3 text-xs font-bold whitespace-nowrap transition-all sm:text-sm ${
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
              {aba === "guia" ? <GuiaTelha /> : null}
              {aba === "madeiramento" ? <CalculadoraMadeiramento /> : null}
              {aba === "forro" ? <CalculadoraForro /> : null}
              {aba === "comparativo" ? <TabelaComparativa /> : null}
              {aba === "glossario" ? <Glossario /> : null}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhats />
    </div>
  );
}
