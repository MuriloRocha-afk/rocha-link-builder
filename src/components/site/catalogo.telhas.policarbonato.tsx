import { useState } from "react";
import { Check, ShoppingCart, Star } from "lucide-react";
import { BotaoCotarWhatsApp } from "@/components/site/BotaoCotarWhatsApp";
import { Button } from "@/components/ui/button";
import { useQuoteCart } from "./quote-cart";
import GaleriaProduto from "@/components/GaleriaProduto";
import ProdutoLayout from "@/components/site/ProdutoLayout";
import { imagensCeramica } from "@/data/imagensProduto";

const MODELOS = [
  { value: "portuguesa-isotec", nome: "Portuguesa Resinada — Isotec", badge: "Campeão #1", marca: "Isotec" },
  { value: "portuguesa-rodrigues", nome: "Portuguesa Resinada — Rodrigues", badge: "Campeão", marca: "Rodrigues" },
  { value: "portuguesa-mesclada", nome: "Portuguesa Mesclada Resinada", marca: "Rodrigues" },
  { value: "romana-resinada", nome: "Romana Resinada — Laranjal" },
  { value: "romana-top", nome: "Romana Top Telha — Terracota Prime", marca: "Top Telha" },
  { value: "americana-resinada", nome: "Americana Resinada — Cerâmica" },
];

const SPECS = [
  { label: "Inclinação mínima", value: "30%" },
  { label: "Cobertura por peça", value: "~0,042 m²" },
  { label: "Fixação", value: "Prego telheiro ou arame" },
  { label: "Acabamento", value: "Natural, Resinada, Esmaltada" },
];

const COBERTURA_POR_PECA = 0.042;

function Passo({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-accent-foreground">
          {n}
        </span>
        <h3 className="text-base font-extrabold text-primary md:text-lg">{title}</h3>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function CeramicaConfigurator() {
  const { addItem, setOpen } = useQuoteCart();
  const [modeloId, setModeloId] = useState(MODELOS[0].value);
  const [qty, setQty] = useState(100);

  const modelo = MODELOS.find((m) => m.value === modeloId)!;
  const cobertura = Math.round(qty * COBERTURA_POR_PECA * 10) / 10;

  const detail = `Telha Cerâmica · ${modelo.nome} · cobertura ~${cobertura} m²`;

  const mensagem = `Olá! Gostaria de um orçamento:

🪨 *Telha Cerâmica*
- Modelo: ${modelo.nome}
- Quantidade: ${qty} peças
- Cobertura estimada: ~${cobertura} m²

Poderia verificar estoque e frete?`;

  return (
    <ProdutoLayout
      produtoKey="ceramica"
      especificacoes={SPECS.map((s) => [s.label, s.value] as [string, string])}
      cabecalho={
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Telha Cerâmica</h1>
          <p className="mt-2 text-sm text-gray-500">
            Portuguesa e Romana com encaixe preciso. Resinada ou natural — escolha o modelo e a
            galeria atualiza.
          </p>
        </div>
      }
      galeria={
        <GaleriaProduto
          titulo={modelo.nome}
          subtitulo="Foto em breve"
          imagens={imagensCeramica[modeloId] ?? []}
        />
      }
    >
      <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <div className="space-y-10">
          <Passo n={1} title="Modelo da telha">
            <div className="space-y-2">
              {MODELOS.map((m) => {
                const active = modeloId === m.value;
                return (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setModeloId(m.value)}
                    aria-pressed={active}
                    className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left transition-all ${
                      active
                        ? "border-accent bg-accent/10 ring-1 ring-accent/40"
                        : "border-border bg-background hover:border-accent/60"
                    }`}
                  >
                    <span>
                      <span className="block text-base font-extrabold text-primary">{m.nome}</span>
                      {m.marca ? (
                        <span className="mt-1 block text-xs text-muted-foreground">
                          Marca: {m.marca}
                        </span>
                      ) : null}
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      {m.badge ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-extrabold tracking-wider text-accent-foreground uppercase">
                          <Star className="h-3 w-3" />
                          {m.badge}
                        </span>
                      ) : null}
                      {active ? <Check className="h-5 w-5 text-accent" /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </Passo>

          <Passo n={2} title="Quantidade">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-[0.14em] text-primary/60 uppercase">
                Nº de peças
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 10))}
                aria-label="Diminuir quantidade"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-primary hover:border-accent hover:text-accent"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                aria-label="Número de peças"
                className="h-10 w-24 rounded-lg border border-border bg-background text-center text-sm font-bold text-primary"
              />
              <button
                type="button"
                onClick={() => setQty((q) => q + 10)}
                aria-label="Aumentar quantidade"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-primary hover:border-accent hover:text-accent"
              >
                +
              </button>
            </div>
            <p className="mt-3 rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-primary">
              Cobertura estimada: {cobertura} m²{" "}
              <span className="font-normal text-muted-foreground">(~0,042 m² por peça)</span>
            </p>
          </Passo>

          <div className="rounded-2xl border border-accent/40 bg-accent/5 p-6">
            <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Resumo</p>
            <p className="mt-2 text-lg font-extrabold text-primary">Telha Cerâmica · {modelo.nome}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Quantidade: {qty} peças · Cobertura: ~{cobertura} m²
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                variant="cta"
                size="xl"
                onClick={() => {
                  addItem({
                    id: `ceramica--${modeloId}`,
                    name: "Telha Cerâmica",
                    detail,
                    qty,
                    unit: "peças",
                  });
                  setOpen(true);
                }}
              >
                <ShoppingCart />
                Adicionar ao Orçamento
              </Button>
              <BotaoCotarWhatsApp nomeProduto="Telha Cerâmica" corpoMensagem={mensagem}>
                Cotar no WhatsApp
              </BotaoCotarWhatsApp>
            </div>
          </div>
        </div>
      </div>
    </ProdutoLayout>
  );
}
