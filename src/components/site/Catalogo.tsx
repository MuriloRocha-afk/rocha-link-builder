import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading, waLink } from "./shared";
import ceramica from "@/assets/prod-ceramica.jpg";
import isotec from "@/assets/prod-isotec.jpg";
import pvc from "@/assets/prod-pvc.jpg";
import fibro from "@/assets/prod-fibro.jpg";
import cambara from "@/assets/prod-cambara.jpg";
import tabeira from "@/assets/prod-tabeira.jpg";
import madeirite from "@/assets/prod-madeirite.jpg";
import eucalipto from "@/assets/prod-eucalipto.jpg";
import rufos from "@/assets/prod-rufos.jpg";
import vedacao from "@/assets/prod-vedacao.jpg";
import tintas from "@/assets/prod-tintas.jpg";
import acessorios from "@/assets/prod-acessorios.jpg";

const TABS = ["Todas as Categorias", "Telhas", "Madeiras & Chapas", "Acabamento & Proteção"] as const;
type Tab = (typeof TABS)[number];
type Categoria = Exclude<Tab, "Todas as Categorias">;

type Produto = {
  name: string;
  tag: Categoria;
  image: string;
  description: string;
  /** Itens extras só aparecem quando a categoria é filtrada */
  extra?: boolean;
};

const PRODUCTS: Produto[] = [
  {
    name: "Telha Cerâmica Romana e Portuguesa",
    tag: "Telhas",
    image: ceramica,
    description: "A tradição e o excelente encaixe para coberturas residenciais.",
  },
  {
    name: "Telha Colonial em PVC\u00a0",
    tag: "Telhas",
    image: pvc,
    description: "Solução leve, econômica, moderna e de instalação rápida.",
  },
  {
    name: "Telha de Fibrocimento Ondulada",
    tag: "Telhas",
    image: fibro,
    description: "Alta durabilidade e excelente custo-benefício para coberturas de grandes áreas.",
  },
  {
    name: "Madeiras Nativas Selecionadas — Cambará, Cedrinho e Outras Essências",
    tag: "Madeiras & Chapas",
    image: cambara,
    description:
      "Vigas, caibros, pranchas e sarrafos em Cambará, Cedrinho, Itaúba e ampla variedade de madeiras nobres.",
  },
  {
    name: "Tabeiras em Madeira Nobre Aparelhada",
    tag: "Madeiras & Chapas",
    image: tabeira,
    description:
      "Acabamento periférico de alta precisão que protege e valoriza as bordas do telhado.",
  },
  {
    name: "Madeiririte Resinado e Plastificado",
    tag: "Madeiras & Chapas",
    image: madeirite,
    description: "Chapas de alta resistência para caixarias de concreto, fôrmas e tapumes de obra.",
  },
  {
    name: "Rufos, Calhas Galvanizadas e Pingadeiras Sob Medida",
    tag: "Acabamento & Proteção",
    image: rufos,
    description:
      "Vedação completa e proteção contra infiltrações para as paredes e estruturas do telhado.",
  },
  {
    name: "Kit de Vedação para Pregos & Mantas Térmicas",
    tag: "Acabamento & Proteção",
    image: vedacao,
    description:
      "Garantia de estanqueidade contra goteiras e isolamento térmico de alta performance.",
  },
  {
    name: "Tintas, Vernizes Marítimos, Cupinicidas & Seladores",
    tag: "Acabamento & Proteção",
    image: tintas,
    description:
      "Proteção contra intempéries, cupins e acabamento brilhante ou fosco de alto padrão para madeiramentos.",
  },

  // Itens adicionais revelados ao filtrar a categoria
  {
    name: "Telha Termoacústica e Fibrocimento Industrial",
    tag: "Telhas",
    image: fibro,
    description:
      "Cobertura de alto desempenho para galpões e indústrias, com isolamento térmico e acústico superior.",
    extra: true,
  },
  {
    name: "Eucalipto Autoclavado e Pinus Tratado",
    tag: "Madeiras & Chapas",
    image: eucalipto,
    description:
      "Madeira de reflorestamento tratada em estufa para escoramento, caixaria, pergolados e estruturas expostas.",
    extra: true,
  },
  {
    name: "Cumeeiras, Parafusos e Acessórios de Telhado",
    tag: "Acabamento & Proteção",
    image: acessorios,
    description:
      "Cumeeiras, fixadores, mantas e complementos para fechar toda a sua cobertura em uma única compra.",
    extra: true,
  },
];

export function Catalogo() {
  const [tab, setTab] = useState<Tab>("Todas as Categorias");
  const list =
    tab === "Todas as Categorias"
      ? PRODUCTS.filter((p) => !p.extra)
      : PRODUCTS.filter((p) => p.tag === tab);

  return (
    <section id="produtos" className="scroll-mt-24 bg-background py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          kicker="Catálogo"
          title="Tudo para a sua cobertura em um só lugar"
          subtitle="Estoque permanente das linhas mais procuradas por construtoras, mestres de obra e arquitetos da região. Filtre por categoria para ver ainda mais opções."
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
                <h3 className="text-lg font-extrabold text-primary">{p.name}</h3>
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
