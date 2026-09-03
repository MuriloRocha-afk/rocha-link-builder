import { useState } from "react";
import { Check, ShoppingCart, Star } from "lucide-react";
import { BotaoCotarWhatsApp } from "@/components/site/BotaoCotarWhatsApp";
import { Button } from "@/components/ui/button";
import { useQuoteCart } from "./quote-cart";
import GaleriaProduto from "@/components/GaleriaProduto";
import ProdutoLayout from "@/components/site/ProdutoLayout";
import SugestaoCumeeira from "@/components/site/SugestaoCumeeira";
import { imagensCeramica, galeriaPortuguesa, galeriaRomana } from "@/data/imagensProduto";

type Opcao = { nome: string; verificar?: boolean };

type Rendimento = { nome: string; pecasPorM2: number; descricao: string };

type Formato = {
  value: string;
  nome: string;
  badge?: string;
  marcas?: string;
  cores: Opcao[];
  acabamentos: Opcao[];
  rendimentos?: Rendimento[];
  pecasPorM2: number;
  imagemKey: string;
  descricao: string;
};

const FORMATOS: Formato[] = [
  {
    value: "portuguesa",
    nome: "Portuguesa",
    badge: "Campeão #1",
    marcas: "Isotec e Rodrigues",
    cores: [{ nome: "Barro Vermelho" }, { nome: "Barro Branco" }, { nome: "Mesclada" }],
    acabamentos: [{ nome: "Natural" }, { nome: "Resinado" }],
    pecasPorM2: 24,
    imagemKey: "portuguesa-isotec",
    descricao: "Encaixe clássico, a mais pedida do pátio.",
  },
  {
    value: "romana",
    nome: "Romana",
    badge: "Campeão",
    marcas: "Laranjal e Top Telha",
    cores: [{ nome: "Terracota" }],
    acabamentos: [{ nome: "Natural" }, { nome: "Resinada" }],
    rendimentos: [
      { nome: "R13", pecasPorM2: 13, descricao: "13 telhas por m² — peça maior" },
      { nome: "R17", pecasPorM2: 17, descricao: "17 telhas por m² — peça menor" },
    ],
    pecasPorM2: 13,
    imagemKey: "romana-resinada",
    descricao: "Linhas retas e onda suave, visual contemporâneo.",
  },

  {
    value: "francesa",
    nome: "Francesa (Marselha)",
    cores: [{ nome: "Barro Vermelho" }],
    acabamentos: [{ nome: "Natural" }],
    pecasPorM2: 16,
    imagemKey: "portuguesa-mesclada",
    descricao: "Tradicional, com friso marcado e ótima vedação.",
  },
  {
    value: "mediterranea",
    nome: "Mediterrânea",
    cores: [
      { nome: "Marfim" },
      { nome: "Viga", verificar: true },
      { nome: "Grená", verificar: true },
      { nome: "Pérola", verificar: true },
      { nome: "Café", verificar: true },
      { nome: "Royal", verificar: true },
    ],
    acabamentos: [{ nome: "Prime (Resinado)" }],
    pecasPorM2: 13,
    imagemKey: "romana-top",
    descricao: "Onda ampla, cobertura maior por peça.",
  },
];

const SPECS = [
  { label: "Formatos", value: "Portuguesa, Romana, Francesa e Mediterrânea" },
  { label: "Acabamentos", value: "Natural, Resinada e Prime (Resinado)" },
  { label: "Rendimento Romana", value: "R13 (13 pçs/m²) e R17 (17 pçs/m²)" },
  { label: "Marcas", value: "Isotec, Rodrigues, Laranjal e Top Telha" },
  { label: "Inclinação mínima", value: "30%" },
  { label: "Fixação", value: "Prego telheiro ou arame" },
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

export function CeramicaConfigurator() {
  const { addItem, setOpen } = useQuoteCart();
  const [formatoId, setFormatoId] = useState(FORMATOS[0].value);
  const [cor, setCor] = useState(FORMATOS[0].cores[0].nome);
  const [acabamento, setAcabamento] = useState(FORMATOS[0].acabamentos[0].nome);
  const [rendimento, setRendimento] = useState<string | null>(null);
  const [qty, setQty] = useState(100);

  const formato = FORMATOS.find((f) => f.value === formatoId)!;
  const corAtiva = formato.cores.find((c) => c.nome === cor) ?? formato.cores[0];
  const acabamentoAtivo =
    formato.acabamentos.find((a) => a.nome === acabamento) ?? formato.acabamentos[0];
  const rendimentoAtivo =
    formato.rendimentos?.find((r) => r.nome === rendimento) ?? formato.rendimentos?.[0] ?? null;
  const pecasPorM2 = rendimentoAtivo?.pecasPorM2 ?? formato.pecasPorM2;
  const cobertura = Math.round((qty / pecasPorM2) * 10) / 10;
  const nomeCompleto = `${formato.nome} ${acabamentoAtivo.nome} · ${corAtiva.nome}${
    rendimentoAtivo ? ` · ${rendimentoAtivo.nome}` : ""
  }`;
  const ehPortuguesa = formatoId === "portuguesa";
  const sobEncomenda =
    ehPortuguesa && !(corAtiva.nome === "Barro Vermelho" && acabamentoAtivo.nome === "Natural");
  const precisaVerificar = corAtiva.verificar || acabamentoAtivo.verificar || sobEncomenda;
  const imagensAtivas = ehPortuguesa
    ? galeriaPortuguesa(corAtiva.nome, acabamentoAtivo.nome)
    : (imagensCeramica[formato.imagemKey] ?? []);

  const detail = `Telha Cerâmica · ${nomeCompleto} · cobertura ~${cobertura} m²`;

  const mensagem = `Olá! Gostaria de um orçamento:

🪨 *Telha Cerâmica*
- Formato: ${formato.nome}
- Cor: ${corAtiva.nome}
- Acabamento: ${acabamentoAtivo.nome}${sobEncomenda ? " (sob encomenda)" : " (pronta entrega)"}${rendimentoAtivo ? `\n- Rendimento: ${rendimentoAtivo.nome} (${rendimentoAtivo.pecasPorM2} pçs/m²)` : ""}${formato.marcas ? `\n- Marcas: ${formato.marcas}` : ""}
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
            Portuguesa, Romana, Francesa e Mediterrânea — natural ou resinada. Escolha o
            formato e a galeria atualiza.
          </p>
        </div>
      }
      galeria={
        <GaleriaProduto
          titulo={`Telha Cerâmica ${nomeCompleto}`}
          subtitulo="Foto em breve"
          imagens={imagensAtivas}
        />
      }
    >
      <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <div className="space-y-10">
          <Passo n={1} title="Formato da telha">
            <div className="space-y-2">
              {FORMATOS.map((f) => {
                const active = formatoId === f.value;
                return (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => {
                      setFormatoId(f.value);
                      setCor(f.cores[0].nome);
                      setAcabamento(f.acabamentos[0].nome);
                      setRendimento(f.rendimentos?.[0].nome ?? null);
                    }}
                    aria-pressed={active}
                    className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left transition-all ${
                      active
                        ? "border-accent bg-accent/10 ring-1 ring-accent/40"
                        : "border-border bg-background hover:border-accent/60"
                    }`}
                  >
                    <span>
                      <span className="block text-base font-extrabold text-primary">{f.nome}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {f.descricao} · ~{f.pecasPorM2} peças/m²
                      </span>
                      {f.marcas ? (
                        <span className="mt-1 block text-xs text-muted-foreground">
                          Marcas: {f.marcas}
                        </span>
                      ) : null}
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      {f.badge ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-extrabold tracking-wider text-accent-foreground uppercase">
                          <Star className="h-3 w-3" />
                          {f.badge}
                        </span>
                      ) : null}
                      {active ? <Check className="h-5 w-5 text-accent" /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </Passo>

          <Passo n={2} title="Cor / Tonalidade">
            <div className="flex flex-wrap gap-2">
              {formato.cores.map((c) => {
                const active = corAtiva.nome === c.nome;
                return (
                  <button
                    key={c.nome}
                    type="button"
                    onClick={() => setCor(c.nome)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 text-left text-sm font-bold transition-all ${
                      active
                        ? "border-accent bg-accent/10 text-primary ring-1 ring-accent/40"
                        : "border-border bg-background text-muted-foreground hover:border-accent/60"
                    }`}
                  >
                    {c.nome}
                    {ehPortuguesa && c.nome !== "Barro Vermelho" ? (
                      <span className="mt-0.5 block text-[10px] font-semibold tracking-wide uppercase opacity-70">
                        sob encomenda
                      </span>
                    ) : c.verificar ? (
                      <span className="mt-0.5 block text-[10px] font-semibold tracking-wide uppercase opacity-70">
                        verificar disponibilidade
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </Passo>

          <Passo n={3} title="Acabamento">
            <div className="flex flex-wrap gap-2">
              {formato.acabamentos.map((a) => {
                const active = acabamentoAtivo.nome === a.nome;
                return (
                  <button
                    key={a.nome}
                    type="button"
                    onClick={() => setAcabamento(a.nome)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 text-left text-sm font-bold transition-all ${
                      active
                        ? "border-accent bg-accent/10 text-primary ring-1 ring-accent/40"
                        : "border-border bg-background text-muted-foreground hover:border-accent/60"
                    }`}
                  >
                    {a.nome}
                    {ehPortuguesa && a.nome !== "Natural" ? (
                      <span className="mt-0.5 block text-[10px] font-semibold tracking-wide uppercase opacity-70">
                        sob encomenda
                      </span>
                    ) : a.verificar ? (
                      <span className="mt-0.5 block text-[10px] font-semibold tracking-wide uppercase opacity-70">
                        verificar disponibilidade
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </Passo>

          {formato.rendimentos ? (
            <Passo n={4} title="Rendimento (telhas por m²)">
              <div className="grid gap-3 sm:grid-cols-2">
                {formato.rendimentos.map((r) => {
                  const active = rendimentoAtivo?.nome === r.nome;
                  return (
                    <button
                      key={r.nome}
                      type="button"
                      onClick={() => setRendimento(r.nome)}
                      aria-pressed={active}
                      className={`rounded-2xl border px-5 py-4 text-left transition-all ${
                        active
                          ? "border-accent bg-accent/10 ring-1 ring-accent/40"
                          : "border-border bg-background hover:border-accent/60"
                      }`}
                    >
                      <span className="block text-base font-extrabold text-primary">{r.nome}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {r.descricao}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Passo>
          ) : null}

          <Passo n={formato.rendimentos ? 5 : 4} title="Quantidade">
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
              <span className="font-normal text-muted-foreground">
                (~{pecasPorM2} peças por m²)
              </span>
            </p>
          </Passo>

          <SugestaoCumeeira material="Barro" cor={corAtiva.nome} />

          <div className="rounded-2xl border border-accent/40 bg-accent/5 p-6">
            <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Resumo</p>
            <p className="mt-2 text-lg font-extrabold text-primary">
              Telha Cerâmica · {nomeCompleto}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Quantidade: {qty} peças · Cobertura: ~{cobertura} m²
              {formato.marcas ? ` · Marcas: ${formato.marcas}` : ""}
            </p>
            {sobEncomenda ? (
              <p className="mt-2 text-xs font-bold text-primary/70 uppercase">
                Esta combinação: sob encomenda (mostruário)
              </p>
            ) : ehPortuguesa ? (
              <p className="mt-2 text-xs font-bold text-primary/70 uppercase">
                Pronta entrega
              </p>
            ) : precisaVerificar ? (
              <p className="mt-2 text-xs font-bold text-primary/70 uppercase">
                Esta combinação: verificar disponibilidade
              </p>
            ) : null}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                variant="cta"
                size="xl"
                onClick={() => {
                  addItem({
                    id: `ceramica--${formatoId}--${corAtiva.nome}--${acabamentoAtivo.nome}${rendimentoAtivo ? `--${rendimentoAtivo.nome}` : ""}`,
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
