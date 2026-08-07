import { useState } from "react";
import { Check, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { BotaoCotarWhatsApp } from "@/components/site/BotaoCotarWhatsApp";
import { Button } from "@/components/ui/button";
import { waLink } from "./shared";
import { useQuoteCart } from "./quote-cart";
import GaleriaProduto from "@/components/GaleriaProduto";
import ProdutoLayout from "@/components/site/ProdutoLayout";
import { imagensColonialPVC } from "@/data/imagensProduto";

const CORES = [
  { value: "Cerâmica", hex: "#C1440E", badge: "Mais vendida" },
  { value: "Cinza", hex: "#808080" },
  { value: "Marfim", hex: "#F5F0DC" },
  { value: "Translúcida", hex: "transparent", translucida: true },
];

const COMPRIMENTOS = [
  { value: "230 x 86 cm", metros: 2.3 },
  { value: "262 x 86 cm", metros: 2.62 },
  { value: "328 x 86 cm", metros: 3.28, badge: "Líder" },
  { value: "394 x 86 cm", metros: 3.94 },
  { value: "459 x 86 cm", metros: 4.59, badge: "Líder" },
  { value: "525 x 86 cm", metros: 5.25, badge: "Líder de Vendas" },
];

const SPECS = [
  { label: "Espessura", value: "1,6 mm" },
  { label: "Inclinação mínima", value: "15%" },
  { label: "Sobreposição", value: "8 cm" },
  { label: "Largura útil", value: "0,79 m" },
  { label: "Peso", value: "~2,2 kg/m²" },
  { label: "Fixação", value: "Kit parafuso + vedação" },
];

const LARGURA_UTIL = 0.79;

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

export function ColonialPvcConfigurator() {
  const { addItem } = useQuoteCart();
  const [cor, setCor] = useState(CORES[0].value);
  const [dimensao, setDimensao] = useState(COMPRIMENTOS[5].value);
  const [qty, setQty] = useState(10);

  const selecionado = COMPRIMENTOS.find((c) => c.value === dimensao)!;
  const areaPorPeca = Math.max(0, (selecionado.metros - 0.08) * LARGURA_UTIL);
  const cobertura = Math.round(areaPorPeca * qty * 10) / 10;

  const detail = `Colonial PVC · ${cor} · ${dimensao} · cobertura ~${cobertura} m²`;

  const mensagem = `Olá! Gostaria de um orçamento:

🧱 *Telha Colonial PVC*
- Cor: ${cor}
- Comprimento: ${dimensao}
- Quantidade: ${qty} peças

Poderia verificar estoque e frete?`;

  return (
    <ProdutoLayout
      produtoKey="colonial-pvc"
      especificacoes={SPECS.map((s) => [s.label, s.value] as [string, string])}
      cabecalho={
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Telha Colonial PVC</h1>
          <p className="mt-2 text-sm text-gray-500">
            Leveza, conforto térmico e instalação rápida. Não enferruja, não precisa de pintura.
          </p>
        </div>
      }
      galeria={
        <GaleriaProduto
          titulo={cor ? `Telha Colonial PVC — ${cor}` : "Telha Colonial PVC"}
          subtitulo={cor ? "Foto em breve" : "Selecione uma cor para ver as fotos"}
          imagens={cor ? (imagensColonialPVC[cor] ?? []) : []}
        />
      }
    >
      <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <div className="space-y-10">

          <Passo n={1} title="Cor / Acabamento">
            <div className="grid gap-3 sm:grid-cols-2">
              {CORES.map((c) => {
                const active = cor === c.value;
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setCor(c.value)}
                    aria-pressed={active}
                    className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all ${
                      active
                        ? "border-accent bg-accent/10 ring-1 ring-accent/40"
                        : "border-border bg-background hover:border-accent/60"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`h-10 w-10 shrink-0 rounded-full border border-border ${
                        c.translucida
                          ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(180,210,220,0.5))]"
                          : ""
                      }`}
                      style={c.translucida ? undefined : { backgroundColor: c.hex }}
                    />
                    <span className="flex-1">
                      <span className="block text-base font-extrabold text-primary">{c.value}</span>
                      {c.badge ? (
                        <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider text-accent-foreground uppercase">
                          <Star className="h-3 w-3" />
                          {c.badge}
                        </span>
                      ) : null}
                    </span>
                    {active ? <Check className="h-5 w-5 text-accent" /> : null}
                  </button>
                );
              })}
            </div>
          </Passo>

          <Passo n={2} title={`Comprimento disponível em ${cor}`}>
            <div className="grid gap-3">
              {COMPRIMENTOS.map((c) => {
                const active = dimensao === c.value;
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setDimensao(c.value)}
                    aria-pressed={active}
                    className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left transition-all ${
                      active
                        ? "border-accent bg-accent/10 ring-1 ring-accent/40"
                        : "border-border bg-background hover:border-accent/60"
                    }`}
                  >
                    <span>
                      <span className="block text-base font-extrabold text-primary">{c.value}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        Largura útil 0,79 m · sobreposição 8 cm
                      </span>
                    </span>
                    <span className="flex items-center gap-2">
                      {c.badge ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-extrabold tracking-wider text-accent-foreground uppercase">
                          <Star className="h-3 w-3" />
                          {c.badge}
                        </span>
                      ) : null}
                      {active ? <Check className="h-5 w-5 text-accent" /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </Passo>

          <Passo n={3} title="Quantidade">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-[0.14em] text-primary/60 uppercase">
                Nº de peças
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Diminuir quantidade"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-primary hover:border-accent hover:text-accent"
              >
                <Minus className="h-4 w-4" />
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
                onClick={() => setQty((q) => q + 1)}
                aria-label="Aumentar quantidade"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-primary hover:border-accent hover:text-accent"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-primary">
              Cobertura estimada: {cobertura} m²{" "}
              <span className="font-normal text-muted-foreground">
                (largura útil 0,79 m e sobreposição de 8 cm)
              </span>
            </p>
          </Passo>

          <div className="rounded-2xl border border-accent/40 bg-accent/5 p-6">
            <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Resumo</p>
            <p className="mt-2 text-lg font-extrabold text-primary">
              Telha Colonial PVC · {cor} · {dimensao}
            </p>
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
                    id: `colonial-pvc--${cor}--${dimensao}`,
                    name: "Telha Colonial PVC",
                    detail,
                    qty,
                    unit: "peças",
                  });
                }}
              >
                <ShoppingCart />
                Adicionar ao Orçamento
              </Button>
              <BotaoCotarWhatsApp nomeProduto="Telha Colonial PVC" corpoMensagem={mensagem}>
                Cotar no WhatsApp
              </BotaoCotarWhatsApp>
            </div>
          </div>
        </div>
      </div>
    </ProdutoLayout>
  );
}

