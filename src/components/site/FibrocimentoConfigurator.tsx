import { useState } from "react";
import { Check, MessageCircle, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { BotaoCotarWhatsApp } from "@/components/site/BotaoCotarWhatsApp";
import { Button } from "@/components/ui/button";
import { useQuoteCart } from "./quote-cart";
import GaleriaProduto from "@/components/GaleriaProduto";
import ProdutoLayout from "@/components/site/ProdutoLayout";
import { imagensFibrocimento } from "@/data/imagensProduto";
import BlocoAcessorios from "@/components/site/BlocoAcessorios";
import { acessoriosFibrocimento } from "@/data/acessoriosTelhas";

const COMPRIMENTOS = [
  { value: "153 x 110 cm", comprimento: "1,53 m", area: 1.53 * 1.05 },
  { value: "183 x 110 cm", comprimento: "1,83 m", area: 1.83 * 1.05 },
  { value: "213 x 110 cm", comprimento: "2,13 m", area: 2.13 * 1.05 },
  { value: "244 x 110 cm", comprimento: "2,44 m", area: 2.44 * 1.05, badge: "Líder de Vendas" },
  { value: "305 x 110 cm", comprimento: "3,05 m", area: 3.05 * 1.05 },
  { value: "366 x 110 cm", comprimento: "3,66 m", area: 3.66 * 1.05 },
];

const ESPESSURAS = [
  { value: "5 mm", badge: "Mais vendida" },
  { value: "6 mm" },
  { value: "8 mm", label: "Maior resistência" },
];

const SPECS = [
  { label: "Inclinação mínima", value: "10%" },
  { label: "Sobreposição lateral", value: "1 onda" },
  { label: "Sobreposição longitudinal", value: "14 cm" },
  { label: "Largura útil", value: "1,05 m" },
  { label: "Fixação", value: "Parafuso com vedação 110mm" },
];

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

export function FibrocimentoConfigurator() {
  const { addItem, setOpen } = useQuoteCart();
  const [dimensao, setDimensao] = useState(COMPRIMENTOS[3].value);
  const [espessura, setEspessura] = useState(ESPESSURAS[0].value);
  const [qty, setQty] = useState(10);

  const selecionado = COMPRIMENTOS.find((c) => c.value === dimensao)!;
  // Área útil por peça: largura útil 1,05 m x (comprimento - 0,14 m de sobreposição)
  const areaPorPeca = Math.max(0, (selecionado.area / 1.05 - 0.14) * 1.05);
  const cobertura = Math.round(areaPorPeca * qty * 10) / 10;

  const detail = `Fibrocimento INFIBRA · ${dimensao} · ${espessura} · cobertura ~${cobertura} m²`;

  const mensagem = `Olá! Gostaria de um orçamento:

🧱 *Telha Fibrocimento Ondulada INFIBRA*
- Dimensão: ${dimensao}
- Espessura: ${espessura}
- Quantidade: ${qty} peças
- Cobertura estimada: ~${cobertura} m²

Poderia verificar estoque e frete para minha região?`;

  return (
    <ProdutoLayout
      produtoKey="fibrocimento"
      especificacoes={SPECS.map((s) => [s.label, s.value] as [string, string])}
      cabecalho={
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Telha Fibrocimento Ondulada INFIBRA
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Telha ondulada em fibrocimento com alta resistência. Escolha o comprimento, a espessura
            e a quantidade para estimar a cobertura.
          </p>
        </div>
      }
      galeria={
        <GaleriaProduto
          titulo={`Telha Fibrocimento INFIBRA — ${dimensao}`}
          subtitulo="Foto em breve"
          imagens={imagensFibrocimento[dimensao] ?? []}
        />
      }
      tituloAcessorios="Acessórios para Telha de Fibrocimento"
      acessorios={
        <BlocoAcessorios itens={acessoriosFibrocimento(qty)} contexto={detail} />
      }
    >
      <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
        <div className="space-y-10">
          <Passo n={1} title="Comprimento da chapa">
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
                        Comprimento {c.comprimento} · Largura útil 1,05 m · Largura total 1,10 m
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

          <Passo n={2} title="Espessura">
            <div className="grid gap-3 sm:grid-cols-3">
              {ESPESSURAS.map((e) => {
                const active = espessura === e.value;
                return (
                  <button
                    key={e.value}
                    type="button"
                    onClick={() => setEspessura(e.value)}
                    aria-pressed={active}
                    className={`rounded-2xl border px-4 py-4 text-center transition-all ${
                      active
                        ? "border-accent bg-accent/10 ring-1 ring-accent/40"
                        : "border-border bg-background hover:border-accent/60"
                    }`}
                  >
                    <span className="block text-lg font-extrabold text-primary">{e.value}</span>
                    {e.badge ? (
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider text-accent-foreground uppercase">
                        <Star className="h-3 w-3" />
                        {e.badge}
                      </span>
                    ) : null}
                    {e.label ? (
                      <span className="mt-2 block text-xs font-semibold text-muted-foreground">
                        {e.label}
                      </span>
                    ) : null}
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
                (considerando sobreposição padrão de 14 cm)
              </span>
            </p>
          </Passo>

          <div className="rounded-2xl border border-accent/40 bg-accent/5 p-6">
            <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Resumo</p>
            <p className="mt-2 text-lg font-extrabold text-primary">
              Telha Fibrocimento INFIBRA · {dimensao} · {espessura}
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
                    id: `fibrocimento-infibra--${dimensao}--${espessura}`,
                    name: "Telha Fibrocimento Ondulada INFIBRA",
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
              <BotaoCotarWhatsApp nomeProduto="Telha Fibrocimento" corpoMensagem={mensagem}>
                Cotar no WhatsApp
              </BotaoCotarWhatsApp>
            </div>
          </div>
        </div>
      </div>
    </ProdutoLayout>
  );
}
