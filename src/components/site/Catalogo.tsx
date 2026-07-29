import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading, waLink } from "./shared";
import isotec from "@/assets/prod-isotec.jpg";
import pvc from "@/assets/prod-pvc.jpg";
import fibro from "@/assets/prod-fibro.jpg";
import cambara from "@/assets/prod-cambara.jpg";
import eucalipto from "@/assets/prod-eucalipto.jpg";
import acessorios from "@/assets/prod-acessorios.jpg";
import madeirite from "@/assets/prod-madeirite.jpg";
import rufos from "@/assets/prod-rufos.jpg";

const TABS = [
  "Todas",
  "Telhas",
  "Madeiras Nativas",
  "Madeiras & Chapas",
  "Ecológicas e PVC",
  "Acabamento & Proteção",
  "Outros",
] as const;
type Tab = (typeof TABS)[number];

const PRODUCTS: {
  name: string;
  tag: Exclude<Tab, "Todas">;
  image: string;
  description: string;
}[] = [
  {
    name: "Telha de Barro Isotec",
    tag: "Telhas",
    image: isotec,
    description:
      "Resinada e impermeável, com altíssima resistência mecânica e encaixe perfeito para menor consumo de madeiramento.",
  },
  {
    name: "Telha Colonial em PVC",
    tag: "Ecológicas e PVC",
    image: pvc,
    description:
      "Leve, moderna e econômica. Não absorve água, não mofa e reduz drasticamente a carga sobre a estrutura.",
  },
  {
    name: "Fibrocimento & Termoacústica",
    tag: "Telhas",
    image: fibro,
    description:
      "Cobertura de alto desempenho para galpões, indústrias e residências, com isolamento térmico e acústico superior.",
  },
  {
    name: "Cambará Rosa & Cedrinho",
    tag: "Madeiras Nativas",
    image: cambara,
    description:
      "Vigas, caibros, pranchas e sarrafos nobres, bitolas conferidas peça a peça para estruturas de longa durabilidade.",
  },
  {
    name: "Eucalipto Tratado e Pinus",
    tag: "Ecológicas e PVC",
    image: eucalipto,
    description:
      "Autoclavado em estufa para escoramento, caixaria, galpões e estruturas expostas ao tempo. Madeira de reflorestamento.",
  },
  {
    name: "Madeirites (Chapas de Madeira)",
    tag: "Madeiras & Chapas",
    image: madeirite,
    description:
      "Chapas de Madeiririte Resinado e Plastificado de alta resistência. Ideais para caixaria, fôrmas de concreto, tapumes e estruturas de obra.",
  },
  {
    name: "Rufos, Calhas e Pingadeiras",
    tag: "Acabamento & Proteção",
    image: rufos,
    description:
      "Rufos externos, pingadeiras e calhas galvanizadas sob medida para vedação perfeita do telhado, protegendo paredes e alvenaria contra infiltrações.",
  },
  {
    name: "Acessórios para Telhado",
    tag: "Outros",
    image: acessorios,
    description:
      "Mantas térmicas, parafusos, cumeeiras, rufos e calhas: tudo para fechar sua cobertura em uma única compra.",
  },
];

export function Catalogo() {
  const [tab, setTab] = useState<Tab>("Todas");
  const list = tab === "Todas" ? PRODUCTS : PRODUCTS.filter((p) => p.tag === tab);

  return (
    <section id="produtos" className="scroll-mt-24 bg-background py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          kicker="Catálogo"
          title="Nossos carros-chefe"
          subtitle="Estoque permanente das linhas mais procuradas por construtoras, mestres de obra e arquitetos da região."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                tab === t
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-card)]"
                  : "border border-border bg-card text-primary/70 hover:border-accent hover:text-accent"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <article
              key={p.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1 text-[11px] font-bold tracking-wider text-accent-foreground uppercase">
                  {p.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-extrabold text-primary">{p.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <Button asChild variant="whats" className="mt-6 h-12 w-full">
                  <a
                    href={waLink(`Olá! Quero consultar a disponibilidade de: ${p.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle />
                    Consultar Disponibilidade
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
