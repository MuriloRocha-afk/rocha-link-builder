import { useState } from "react";
import { Check, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { BotaoCotarWhatsApp } from "@/components/site/BotaoCotarWhatsApp";
import { Button } from "@/components/ui/button";
import { useQuoteCart } from "./quote-cart";
import GaleriaProduto from "@/components/GaleriaProduto";
import ProdutoLayout from "@/components/site/ProdutoLayout";
import BlocoAcessorios from "@/components/site/BlocoAcessorios";
import { acessoriosPvc } from "@/data/acessoriosTelhas";
import { imagensColonialPVC } from "@/data/imagensProduto";

type Variante = "Colonial" | "Plan";

const CORES = [
  { value: "Cerâmica", hex: "#C1440E", badge: "Pronta entrega" },
  { value: "Marfim", hex: "#F5F0DC", nota: "Verificar disponibilidade" },
  { value: "Cinza", hex: "#808080", nota: "Verificar disponibilidade" },
  {
    value: "Translúcida",
    hex: "transparent",
    translucida: true,
    nota: "Verificar disponibilidade",
  },
];

const COMPRIMENTOS: Record<Variante, { value: string; metros: number; badge?: string }[]> = {
  Colonial: [
    { value: "230 cm", metros: 2.3 },
    { value: "262 cm", metros: 2.62 },
    { value: "328 cm", metros: 3.28, badge: "Líder" },
    { value: "394 cm", metros: 3.94 },
    { value: "459 cm", metros: 4.59, badge: "Líder" },
    { value: "525 cm", metros: 5.25, badge: "Líder de Vendas" },
  ],
  Plan: [
    { value: "198 cm", metros: 1.98 },
    { value: "242 cm", metros: 2.42, badge: "Líder" },
    { value: "330 cm", metros: 3.3, badge: "Líder de Vendas" },
  ],
};

const LARGURA: Record<Variante, { value: string; util: number }> = {
  Colonial: { value: "86 cm", util: 0.79 },
  Plan: { value: "88 cm", util: 0.8 },
};

const ESPESSURA_NOTA: Record<Variante, string> = {
  Colonial: "2 mm (variação natural do processo, podendo variar até 10%)",
  Plan: "1,6 mm (variação natural do processo, podendo variar até 10%)",
};

const SOBREPOSICAO = 0.08;

function Passo({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-in">
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

export function ColonialPvcConfigurator({
  varianteInicial = "Colonial",
}: {
  varianteInicial?: Variante;
} = {}) {
  const variante = varianteInicial;
  const { addItem } = useQuoteCart();
  const [cor, setCor] = useState<string | null>(null);
  const [dimensao, setDimensao] = useState<string | null>(null);
  const [qty, setQty] = useState(10);

  const comprimentos = COMPRIMENTOS[variante];
  const largura = LARGURA[variante];
  const espessuraNota = ESPESSURA_NOTA[variante];

  const selecionado = comprimentos.find((c) => c.value === dimensao) ?? comprimentos[0];
  const areaPorPeca = Math.max(0, (selecionado.metros - SOBREPOSICAO) * largura.util);
  const cobertura = Math.round(areaPorPeca * qty * 10) / 10;

  const nomeProduto = `Telha ${variante} PVC`;
  const espessuraLabel = variante === "Colonial" ? "2 mm" : "1,6 mm";
  const detail = `${variante} PVC · ${cor ?? "-"} · ${dimensao ?? "-"} × ${largura.value} · ${espessuraLabel} · cobertura ~${cobertura} m²`;

  const mensagem = `Olá! Gostaria de um orçamento:

🧱 *${nomeProduto}*
- Cor: ${cor}
- Comprimento: ${dimensao}
- Largura: ${largura.value}
- Espessura: ${espessuraLabel} (variação natural de até 10%)
- Quantidade: ${qty} peças
- Cobertura estimada: ~${cobertura} m²

Poderia verificar estoque e frete?`;

  const btn = (active: boolean) =>
    active
      ? "border-accent bg-accent/10 ring-1 ring-accent/40"
      : "border-border bg-background hover:border-accent/60";

  return (
    <ProdutoLayout
      produtoKey={variante === "Colonial" ? "colonial-pvc" : "plan-pvc"}
      especificacoes={[
        ["Modelo", variante === "Colonial" ? "Colonial (ondulada)" : "Plan (plana)"],
        ["Espessura", espessuraNota],
        ["Largura", largura.value],
        [
          "Comprimentos",
          comprimentos.map((c) => c.value).join(" · "),
        ],
        ["Inclinação mínima", "15%"],
        ["Sobreposição", "8 cm"],
        ["Cores", "Cerâmica (pronta entrega), Marfim, Cinza e Translúcida"],
        ["Fixação", "Kit parafuso + vedação na cor"],
      ]}
      tituloAcessorios={`Acessórios de PVC ${variante} — ${!cor || cor === "Translúcida" ? "Cerâmica" : cor}`}
      acessorios={
        <BlocoAcessorios itens={acessoriosPvc(variante, cor ?? "Cerâmica", qty)} contexto={detail} />
      }
      cabecalho={
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{nomeProduto}</h1>
          <p className="mt-2 text-sm text-gray-500">
            {variante === "Colonial"
              ? "Perfil ondulado com visual de telha de barro. Leveza, conforto térmico e instalação rápida."
              : "Perfil plano e moderno de encaixe reto. Leveza, conforto térmico e instalação rápida."}
          </p>
        </div>
      }
      galeria={
        <GaleriaProduto
          titulo={`${nomeProduto} — ${cor ?? "Cerâmica"}`}
          subtitulo="Foto em breve"
          imagens={imagensColonialPVC[cor ?? "Cerâmica"] ?? []}
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
                    className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all ${btn(active)}`}
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
                      {c.nota ? (
                        <span className="mt-1 block text-xs font-semibold text-muted-foreground">
                          {c.nota}
                        </span>
                      ) : null}
                    </span>
                    {active ? <Check className="h-5 w-5 text-accent" /> : null}
                  </button>
                );
              })}
            </div>
          </Passo>

          {cor ? (
            <Passo n={2} title={`Comprimento disponível em ${cor}`}>
              <div className="grid gap-3">
                {comprimentos.map((c) => {
                  const active = dimensao === c.value;
                  return (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setDimensao(c.value)}
                      aria-pressed={active}
                      className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left transition-all ${btn(active)}`}
                    >
                      <span>
                        <span className="block text-base font-extrabold text-primary">
                          {c.value} × {largura.value}
                        </span>
                        <span className="mt-1 block text-xs text-muted-foreground">
                          Largura útil {largura.util.toString().replace(".", ",")} m · sobreposição
                          de 8 cm
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
          ) : null}

          {cor && dimensao ? (
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
                  (largura útil {largura.util.toString().replace(".", ",")} m e sobreposição de 8 cm)
                </span>
              </p>
            </Passo>
          ) : null}

          {cor && dimensao ? (
            <div className="animate-fade-in rounded-2xl border border-accent/40 bg-accent/5 p-6">
              <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Resumo</p>
              <p className="mt-2 text-lg font-extrabold text-primary">
                {nomeProduto} · {cor} · {dimensao} × {largura.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {qty} peças · Cobertura: ~{cobertura} m²
              </p>
              <p className="mt-2 text-xs text-muted-foreground">Espessura {espessuraNota}.</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Button
                  type="button"
                  variant="cta"
                  size="xl"
                  onClick={() => {
                    addItem({
                      id: `${variante.toLowerCase()}-pvc--${cor}--${dimensao}--${largura.value}`,
                      name: nomeProduto,
                      detail,
                      qty,
                      unit: "peças",
                    });
                  }}
                >
                  <ShoppingCart />
                  Adicionar ao Orçamento
                </Button>
                <BotaoCotarWhatsApp nomeProduto={nomeProduto} corpoMensagem={mensagem}>
                  Cotar no WhatsApp
                </BotaoCotarWhatsApp>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </ProdutoLayout>
  );
}
