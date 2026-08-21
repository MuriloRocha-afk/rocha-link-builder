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

const VARIANTES: { value: Variante; sub: string; badge?: string }[] = [
  { value: "Colonial", sub: "Onda tradicional, visual de telha de barro", badge: "Mais vendida" },
  { value: "Plan", sub: "Perfil plano e moderno, encaixe reto" },
];

const CORES = [
  { value: "Cerâmica", hex: "#C1440E", badge: "Mais vendida" },
  { value: "Marfim", hex: "#F5F0DC" },
  { value: "Cinza", hex: "#808080" },
  { value: "Translúcida", hex: "transparent", translucida: true, apenas: "Colonial" as Variante },
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
    { value: "230 cm", metros: 2.3 },
    { value: "262 cm", metros: 2.62 },
    { value: "328 cm", metros: 3.28, badge: "Líder" },
    { value: "394 cm", metros: 3.94 },
    { value: "459 cm", metros: 4.59 },
    { value: "525 cm", metros: 5.25, badge: "Líder de Vendas" },
  ],
};

const LARGURAS: Record<Variante, { value: string; util: number }[]> = {
  Colonial: [
    { value: "86 cm", util: 0.79 },
    { value: "110 cm", util: 1.02 },
  ],
  Plan: [
    { value: "88 cm", util: 0.8 },
    { value: "110 cm", util: 1.02 },
  ],
};

const ESPESSURAS: Record<Variante, { value: string; sub: string }[]> = {
  Colonial: [
    { value: "1,6 mm", sub: "Padrão residencial" },
    { value: "2,0 mm", sub: "Reforçada" },
    { value: "2,4 mm", sub: "Uso intenso / vãos maiores" },
  ],
  Plan: [
    { value: "1,6 mm", sub: "Padrão residencial" },
    { value: "2,0 mm", sub: "Reforçada" },
    { value: "2,4 mm", sub: "Uso intenso / vãos maiores" },
  ],
};

const SOBREPOSICAO = 0.08;

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
  const [variante, setVariante] = useState<Variante>("Colonial");
  const [cor, setCor] = useState(CORES[0].value);
  const [dimensao, setDimensao] = useState("525 cm");
  const [largura, setLargura] = useState(LARGURAS.Colonial[0].value);
  const [espessura, setEspessura] = useState("1,6 mm");
  const [qty, setQty] = useState(10);

  const coresDisponiveis = CORES.filter((c) => !c.apenas || c.apenas === variante);
  const comprimentos = COMPRIMENTOS[variante];
  const larguras = LARGURAS[variante];
  const espessuras = ESPESSURAS[variante];

  const trocarVariante = (v: Variante) => {
    setVariante(v);
    setLargura(LARGURAS[v][0].value);
    if (!CORES.some((c) => c.value === cor && (!c.apenas || c.apenas === v))) {
      setCor(CORES[0].value);
    }
  };

  const selecionado = comprimentos.find((c) => c.value === dimensao) ?? comprimentos[0];
  const larguraSel = larguras.find((l) => l.value === largura) ?? larguras[0];
  const areaPorPeca = Math.max(0, (selecionado.metros - SOBREPOSICAO) * larguraSel.util);
  const cobertura = Math.round(areaPorPeca * qty * 10) / 10;

  const nomeProduto = `Telha ${variante} PVC`;
  const detail = `${variante} PVC · ${cor} · ${dimensao} × ${largura} · ${espessura} · cobertura ~${cobertura} m²`;

  const mensagem = `Olá! Gostaria de um orçamento:

🧱 *${nomeProduto}*
- Cor: ${cor}
- Comprimento: ${dimensao}
- Largura: ${largura}
- Espessura: ${espessura}
- Quantidade: ${qty} peças
- Cobertura estimada: ~${cobertura} m²

Poderia verificar estoque e frete?`;

  const btn = (active: boolean) =>
    active
      ? "border-accent bg-accent/10 ring-1 ring-accent/40"
      : "border-border bg-background hover:border-accent/60";

  return (
    <ProdutoLayout
      produtoKey="colonial-pvc"
      especificacoes={[
        ["Modelos", "Colonial (ondulada) e Plan (plana)"],
        ["Espessuras", "1,6 mm · 2,0 mm · 2,4 mm"],
        ["Larguras", "86/88 cm e 110 cm"],
        ["Comprimentos", "230 cm a 525 cm"],
        ["Inclinação mínima", "15%"],
        ["Sobreposição", "8 cm"],
        ["Cores", "Cerâmica, Marfim e Cinza"],
        ["Fixação", "Kit parafuso + vedação na cor"],
      ]}
      tituloAcessorios={`Acessórios de PVC ${variante} — ${cor === "Translúcida" ? "Cerâmica" : cor}`}
      acessorios={<BlocoAcessorios itens={acessoriosPvc(variante, cor, qty)} contexto={detail} />}
      cabecalho={
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Telha PVC — Colonial e Plan
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Leveza, conforto térmico e instalação rápida. Não enferruja, não precisa de pintura.
          </p>
        </div>
      }
      galeria={
        <GaleriaProduto
          titulo={`${nomeProduto} — ${cor}`}
          subtitulo="Foto em breve"
          imagens={imagensColonialPVC[cor] ?? []}
        />
      }
    >
      <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <div className="space-y-10">
          <Passo n={1} title="Modelo do perfil">
            <div className="grid gap-3 sm:grid-cols-2">
              {VARIANTES.map((v) => {
                const active = variante === v.value;
                return (
                  <button
                    key={v.value}
                    type="button"
                    onClick={() => trocarVariante(v.value)}
                    aria-pressed={active}
                    className={`rounded-2xl border px-5 py-4 text-left transition-all ${btn(active)}`}
                  >
                    <span className="block text-base font-extrabold text-primary">
                      Telha {v.value} PVC
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">{v.sub}</span>
                    {v.badge ? (
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider text-accent-foreground uppercase">
                        <Star className="h-3 w-3" />
                        {v.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </Passo>

          <Passo n={2} title="Cor / Acabamento">
            <div className="grid gap-3 sm:grid-cols-2">
              {coresDisponiveis.map((c) => {
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
                    </span>
                    {active ? <Check className="h-5 w-5 text-accent" /> : null}
                  </button>
                );
              })}
            </div>
          </Passo>

          <Passo n={3} title={`Comprimento disponível em ${cor}`}>
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
                      <span className="block text-base font-extrabold text-primary">{c.value}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        Sobreposição de 8 cm entre peças
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

          <Passo n={4} title="Largura da telha">
            <div className="flex flex-wrap gap-3">
              {larguras.map((l) => {
                const active = largura === l.value;
                return (
                  <button
                    key={l.value}
                    type="button"
                    onClick={() => setLargura(l.value)}
                    aria-pressed={active}
                    className={`rounded-2xl border px-5 py-3 text-left transition-all ${btn(active)}`}
                  >
                    <span className="block text-sm font-extrabold text-primary">{l.value}</span>
                    <span className="block text-xs text-muted-foreground">
                      Largura útil {l.util.toString().replace(".", ",")} m
                    </span>
                  </button>
                );
              })}
            </div>
          </Passo>

          <Passo n={5} title="Espessura">
            <div className="flex flex-wrap gap-3">
              {espessuras.map((e) => {
                const active = espessura === e.value;
                return (
                  <button
                    key={e.value}
                    type="button"
                    onClick={() => setEspessura(e.value)}
                    aria-pressed={active}
                    className={`rounded-2xl border px-5 py-3 text-left transition-all ${btn(active)}`}
                  >
                    <span className="block text-sm font-extrabold text-primary">{e.value}</span>
                    <span className="block text-xs text-muted-foreground">{e.sub}</span>
                  </button>
                );
              })}
            </div>
          </Passo>

          <Passo n={6} title="Quantidade">
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
                (largura útil {larguraSel.util.toString().replace(".", ",")} m e sobreposição de 8
                cm)
              </span>
            </p>
          </Passo>

          <div className="rounded-2xl border border-accent/40 bg-accent/5 p-6">
            <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Resumo</p>
            <p className="mt-2 text-lg font-extrabold text-primary">
              {nomeProduto} · {cor} · {dimensao} × {largura}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Espessura {espessura} · {qty} peças · Cobertura: ~{cobertura} m²
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                variant="cta"
                size="xl"
                onClick={() => {
                  addItem({
                    id: `${variante.toLowerCase()}-pvc--${cor}--${dimensao}--${largura}--${espessura}`,
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
        </div>
      </div>
    </ProdutoLayout>
  );
}
