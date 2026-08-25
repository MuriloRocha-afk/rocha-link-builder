import { useState } from "react";
import { Check, ShoppingCart, Star } from "lucide-react";
import { BotaoCotarWhatsApp } from "@/components/site/BotaoCotarWhatsApp";
import { Button } from "@/components/ui/button";
import { useQuoteCart } from "./quote-cart";
import GaleriaProduto from "@/components/GaleriaProduto";
import ProdutoLayout from "@/components/site/ProdutoLayout";
import { imagensPolicarbonato } from "@/data/imagensProduto";
import BlocoAcessorios from "@/components/site/BlocoAcessorios";
import { acessoriosPlastico } from "@/data/acessoriosTelhas";

const VERSOES = [
  {
    value: "cristal",
    nome: "Cristal",
    descricao: "Transparente. Máxima luminosidade natural.",
    emoji: "☀️",
  },
  {
    value: "bronze-grecca",
    nome: "Bronze — Grecca 244cm",
    descricao: "Acabamento bronze. Reduz ofuscamento e filtra UV.",
    emoji: "🟫",
  },
];

type Comprimento = { value: string; area: number; badge?: string; somenteCristal?: boolean };

const COMPRIMENTOS: Comprimento[] = [
  { value: "183 × 110 cm", area: 1.83 * 0.98 },
  { value: "244 × 110 cm", area: 2.44 * 0.98, badge: "Líder" },
  { value: "244 × 50 cm", area: 2.44 * 0.45, somenteCristal: true },
  { value: "305 × 110 cm", area: 3.05 * 0.98 },
  { value: "366 × 110 cm", area: 3.66 * 0.98 },
];

const SPECS = [
  { label: "Inclinação mínima", value: "5%" },
  { label: "Espessura", value: "4mm e 6mm" },
  { label: "Largura total", value: "1,10m (244cm também em 0,50m, só no Cristal)" },
  { label: "Fixação", value: "Parafuso c/ vedação + perfil H" },
  { label: "Proteção UV", value: "Sim (face superior)" },
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

export function PolicarbonatoConfigurator() {
  const { addItem, setOpen } = useQuoteCart();
  const [versaoId, setVersaoId] = useState(VERSOES[0].value);
  const [dimensao, setDimensao] = useState(COMPRIMENTOS[1].value);
  const [qty, setQty] = useState(5);

  const versao = VERSOES.find((v) => v.value === versaoId)!;
  const comprimentos = COMPRIMENTOS.filter((c) => !c.somenteCristal || versaoId === "cristal");
  const comprimento = comprimentos.find((c) => c.value === dimensao) ?? comprimentos[1];
  const area = Math.round(comprimento.area * qty * 10) / 10;
  const dimensaoAtiva = comprimento.value;

  const detail = `Policarbonato · ${versao.nome} · ${dimensaoAtiva} · área ~${area} m²`;

  const mensagem = `Olá! Gostaria de um orçamento:

☀️ *Telha Policarbonato*
- Versão: ${versao.nome}
- Comprimento: ${dimensaoAtiva}
- Quantidade: ${qty} chapas
- Área estimada: ~${area} m²

Poderia verificar estoque e frete?`;

  return (
    <ProdutoLayout
      produtoKey="policarbonato"
      especificacoes={SPECS.map((s) => [s.label, s.value] as [string, string])}
      cabecalho={
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Telha Policarbonato</h1>
          <p className="mt-2 text-sm text-gray-500">
            Translúcida, leve e resistente. Iluminação natural para galpões, áreas de serviço e
            garagens.
          </p>
        </div>
      }
      galeria={
        <GaleriaProduto
          titulo={`Telha Policarbonato — ${versao.nome}`}
          subtitulo="Foto em breve"
          imagens={imagensPolicarbonato[versaoId] ?? []}
        />
      }
      tituloAcessorios="Acessórios para Telha Plástica"
      acessorios={<BlocoAcessorios itens={acessoriosPlastico(qty)} contexto={detail} />}
    >
      <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <div className="space-y-10">
          <Passo n={1} title="Versão">
            <div className="grid gap-3 sm:grid-cols-2">
              {VERSOES.map((v) => {
                const active = versaoId === v.value;
                return (
                  <button
                    key={v.value}
                    type="button"
                    onClick={() => {
                      setVersaoId(v.value);
                      setDimensao((d) => {
                        const alvo = COMPRIMENTOS.find((c) => c.value === d);
                        return alvo?.somenteCristal && v.value !== "cristal"
                          ? COMPRIMENTOS[1].value
                          : d;
                      });
                    }}
                    aria-pressed={active}
                    className={`rounded-2xl border px-5 py-4 text-left transition-all ${
                      active
                        ? "border-accent bg-accent/10 ring-1 ring-accent/40"
                        : "border-border bg-background hover:border-accent/60"
                    }`}
                  >
                    <span className="text-2xl">{v.emoji}</span>
                    <p className="mt-2 text-base font-extrabold text-primary">{v.nome}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{v.descricao}</p>
                  </button>
                );
              })}
            </div>
          </Passo>

          <Passo n={2} title="Comprimento">
            <div className="grid gap-3">
              {comprimentos.map((c) => {
                const active = dimensaoAtiva === c.value;
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setDimensao(c.value)}
                    aria-pressed={active}
                    className={`flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left transition-all ${
                      active
                        ? "border-accent bg-accent/10 ring-1 ring-accent/40"
                        : "border-border bg-background hover:border-accent/60"
                    }`}
                  >
                    <span className="text-base font-extrabold text-primary">{c.value}</span>
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
                Nº de chapas
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
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
                aria-label="Número de chapas"
                className="h-10 w-24 rounded-lg border border-border bg-background text-center text-sm font-bold text-primary"
              />
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Aumentar quantidade"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-primary hover:border-accent hover:text-accent"
              >
                +
              </button>
            </div>
            <p className="mt-3 rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-primary">
              Área estimada: {area} m²
            </p>
          </Passo>

          <div className="rounded-2xl border border-accent/40 bg-accent/5 p-6">
            <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Resumo</p>
            <p className="mt-2 text-lg font-extrabold text-primary">
              Telha Policarbonato · {versao.nome} · {dimensaoAtiva}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Quantidade: {qty} chapas · Área: ~{area} m²
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                variant="cta"
                size="xl"
                onClick={() => {
                  addItem({
                    id: `policarbonato--${versaoId}--${dimensaoAtiva}`,
                    name: "Telha Policarbonato",
                    detail,
                    qty,
                    unit: "chapas",
                  });
                  setOpen(true);
                }}
              >
                <ShoppingCart />
                Adicionar ao Orçamento
              </Button>
              <BotaoCotarWhatsApp nomeProduto="Telha Policarbonato" corpoMensagem={mensagem}>
                Cotar no WhatsApp
              </BotaoCotarWhatsApp>
            </div>
          </div>
        </div>
      </div>
    </ProdutoLayout>
  );
}
