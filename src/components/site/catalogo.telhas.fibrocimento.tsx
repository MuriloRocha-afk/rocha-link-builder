import { useMemo, useState } from "react";
import { ChevronRight, ShoppingCart, Check, Star } from "lucide-react";
import { useOrcamento } from "@/context/OrcamentoContext";
import { BotaoCotarWhatsApp } from "@/components/site/BotaoCotarWhatsApp";
import { Button } from "@/components/ui/button";
import GaleriaProduto, { type ImagemProduto } from "@/components/GaleriaProduto";
import ProdutoLayout from "@/components/site/ProdutoLayout";

export type Selecao = Record<string, string>;
export type Quantidades = Record<string, number>;

export type OpcaoConfig = {
  valor: string;
  label?: string;
  sub?: string;
  badge?: string;
  emoji?: string;
  cor?: string;
};

export type PassoConfig = {
  chave: string;
  titulo: string;
  tipo: "lista" | "grid2" | "grid3" | "chips" | "quantidade";
  opcoes?: OpcaoConfig[] | ((sel: Selecao) => OpcaoConfig[]);
  visivel?: (sel: Selecao) => boolean;
  /** para tipo "quantidade" */
  unidade?: string;
  padrao?: number;
  passo?: number;
  decimal?: boolean;
  nota?: (sel: Selecao, qtd: number) => string | null;
  aviso?: string;
};

export type ConfiguradorConfig = {
  breadcrumb: { label: string; href?: string }[];
  titulo: string;
  subtitulo: string;
  badge?: string;
  galeriaTitulo: string;
  galeriaPlaceholder: string;
  imagens: (sel: Selecao) => ImagemProduto[];
  passos: PassoConfig[];
  especificacoes?: [string, string][];
  produtoKey?: string;
  tagInfo?: string;
  categoria: string;
  unidadeResumo: (sel: Selecao, qtds: Quantidades) => string;
  resumoNome: (sel: Selecao) => string;
  resumoDetalhe: (sel: Selecao, qtds: Quantidades) => string;
  mensagem: (sel: Selecao, qtds: Quantidades) => string;
  idItem: (sel: Selecao) => string;
};

function resolverOpcoes(passo: PassoConfig, sel: Selecao): OpcaoConfig[] {
  if (!passo.opcoes) return [];
  return typeof passo.opcoes === "function" ? passo.opcoes(sel) : passo.opcoes;
}

export default function ConfiguradorGenerico({ config }: { config: ConfiguradorConfig }) {
  const { adicionar, setAberto } = useOrcamento();
  const [sel, setSel] = useState<Selecao>({});
  const [qtds, setQtds] = useState<Quantidades>({});
  const [adicionado, setAdicionado] = useState(false);

  const passosVisiveis = useMemo(
    () => config.passos.filter((p) => !p.visivel || p.visivel(sel)),
    [config.passos, sel],
  );

  const getQtd = (p: PassoConfig) => qtds[p.chave] ?? p.padrao ?? 1;

  const preenchido = (p: PassoConfig) =>
    p.tipo === "quantidade" ? getQtd(p) >= (p.decimal ? 0.1 : 1) : Boolean(sel[p.chave]);

  const pronto = passosVisiveis.every(preenchido);

  const escolher = (chave: string, valor: string) => {
    setSel((prev) => {
      const proximo: Selecao = { ...prev, [chave]: valor };
      // limpa seleções de passos posteriores
      const idx = config.passos.findIndex((p) => p.chave === chave);
      config.passos.slice(idx + 1).forEach((p) => {
        if (p.tipo !== "quantidade") delete proximo[p.chave];
      });
      return proximo;
    });
  };

  const imagens = config.imagens(sel);
  const temSelecao = passosVisiveis.some((p) => p.tipo !== "quantidade" && sel[p.chave]);

  const corpoMsgWpp = pronto ? config.mensagem(sel, qtds) : "";

  const handleAdicionar = () => {
    if (!pronto) return;
    const ultimaQtd = [...passosVisiveis].reverse().find((p) => p.tipo === "quantidade");
    adicionar({
      id: config.idItem(sel),
      nome: config.resumoNome(sel),
      variacao: config.resumoDetalhe(sel, qtds),
      quantidade: ultimaQtd ? getQtd(ultimaQtd) : 1,
      unidade: config.unidadeResumo(sel, qtds),
      categoria: config.categoria,
    });
    setAdicionado(true);
    setAberto(true);
    setTimeout(() => setAdicionado(false), 1500);
  };

  const baseBtn = (ativo: boolean) =>
    `transition-all ${ativo ? "border-accent bg-accent/10 ring-1 ring-accent/40" : "border-border bg-background hover:border-accent/60"}`;

  let numero = 0;
  let bloqueado = false;

  return (
    <ProdutoLayout
      produtoKey={config.produtoKey}
      especificacoes={config.especificacoes}
      breadcrumb={
        <div className="bg-white border-b px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center gap-1 text-xs text-gray-500 flex-wrap">
            {config.breadcrumb.map((b, i) => (
              <span key={b.label} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={12} />}
                {b.href ? (
                  <a href={b.href} className="hover:text-orange-500">
                    {b.label}
                  </a>
                ) : (
                  <span className="text-gray-900 font-medium">{b.label}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      }
      cabecalho={
        <div>
          {config.badge && (
            <span className="text-xs font-bold text-accent uppercase tracking-widest">
              {config.badge}
            </span>
          )}
          <h1 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">{config.titulo}</h1>
          <p className="mt-2 text-sm text-gray-500">{config.subtitulo}</p>
          {config.tagInfo && (
            <span className="mt-3 inline-flex rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              {config.tagInfo}
            </span>
          )}
        </div>
      }
      galeria={
        <GaleriaProduto
          titulo={config.galeriaTitulo}
          subtitulo={temSelecao ? "Foto em breve" : config.galeriaPlaceholder}
          imagens={imagens}
        />
      }
    >
      <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <div className="space-y-10">
          {passosVisiveis.map((p) => {
            if (bloqueado) return null;
            numero += 1;
            const n = numero;
            if (!preenchido(p)) bloqueado = true;
            const opcoes = resolverOpcoes(p, sel);

            return (
              <div key={p.chave}>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-accent-foreground">
                    {n}
                  </span>
                  <h3 className="text-base font-extrabold text-primary md:text-lg">{p.titulo}</h3>
                </div>

                <div className="mt-4">
                  {p.tipo === "quantidade" ? (
                    <>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setQtds((q) => ({
                              ...q,
                              [p.chave]: Math.max(p.decimal ? 0.5 : 1, getQtd(p) - (p.passo ?? 1)),
                            }))
                          }
                          aria-label="Diminuir quantidade"
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-primary hover:border-accent hover:text-accent"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={getQtd(p)}
                          onChange={(e) =>
                            setQtds((q) => ({
                              ...q,
                              [p.chave]: Math.max(p.decimal ? 0 : 1, Number(e.target.value)),
                            }))
                          }
                          aria-label={p.unidade}
                          className="h-10 w-24 rounded-lg border border-border bg-background text-center text-sm font-bold text-primary"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setQtds((q) => ({ ...q, [p.chave]: getQtd(p) + (p.passo ?? 1) }))
                          }
                          aria-label="Aumentar quantidade"
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-primary hover:border-accent hover:text-accent"
                        >
                          +
                        </button>
                        <span className="text-sm font-medium text-muted-foreground">
                          {p.unidade}
                        </span>
                      </div>
                      {p.nota?.(sel, getQtd(p)) && (
                        <p className="mt-3 rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-primary">
                          {p.nota(sel, getQtd(p))}
                        </p>
                      )}
                      {p.aviso && (
                        <p className="mt-3 text-xs text-muted-foreground">{p.aviso}</p>
                      )}
                    </>
                  ) : p.tipo === "chips" ? (
                    <div className="flex flex-wrap gap-2">
                      {opcoes.map((o) => (
                        <button
                          key={o.valor}
                          type="button"
                          onClick={() => escolher(p.chave, o.valor)}
                          aria-pressed={sel[p.chave] === o.valor}
                          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-primary ${baseBtn(sel[p.chave] === o.valor)}`}
                        >
                          {o.cor && (
                            <span
                              className="h-4 w-4 rounded-full border border-black/10"
                              style={{ background: o.cor }}
                            />
                          )}
                          {o.label ?? o.valor}
                        </button>
                      ))}
                    </div>
                  ) : p.tipo === "lista" ? (
                    <div className="space-y-2">
                      {opcoes.map((o) => {
                        const active = sel[p.chave] === o.valor;
                        return (
                          <button
                            key={o.valor}
                            type="button"
                            onClick={() => escolher(p.chave, o.valor)}
                            aria-pressed={active}
                            className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left ${baseBtn(active)}`}
                          >
                            <span className="flex items-center gap-3">
                              {o.emoji && <span className="text-xl">{o.emoji}</span>}
                              {o.cor && (
                                <span
                                  className="h-5 w-5 rounded-full border border-black/10"
                                  style={{ background: o.cor }}
                                />
                              )}
                              <span>
                                <span className="block text-base font-extrabold text-primary">
                                  {o.label ?? o.valor}
                                </span>
                                {o.sub && (
                                  <span className="mt-1 block text-xs text-muted-foreground">
                                    {o.sub}
                                  </span>
                                )}
                              </span>
                            </span>
                            <span className="flex shrink-0 items-center gap-2">
                              {o.badge && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-accent-foreground">
                                  <Star className="h-3 w-3" />
                                  {o.badge}
                                </span>
                              )}
                              {active ? <Check className="h-5 w-5 text-accent" /> : null}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className={`grid gap-3 ${p.tipo === "grid3" ? "grid-cols-3" : "grid-cols-2"}`}>
                      {opcoes.map((o) => {
                        const active = sel[p.chave] === o.valor;
                        return (
                          <button
                            key={o.valor}
                            type="button"
                            onClick={() => escolher(p.chave, o.valor)}
                            aria-pressed={active}
                            className={`relative rounded-2xl border p-3 text-center ${baseBtn(active)}`}
                          >
                            {o.badge && (
                              <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-accent-foreground">
                                {o.badge}
                              </span>
                            )}
                            {o.emoji && <p className="mt-1 text-2xl">{o.emoji}</p>}
                            {o.cor && (
                              <span
                                className="mx-auto mt-1 block h-8 w-8 rounded-full border border-black/10"
                                style={{ background: o.cor }}
                              />
                            )}
                            <p className="mt-1 text-sm font-bold text-primary">{o.label ?? o.valor}</p>
                            {o.sub && (
                              <p className="mt-0.5 text-xs text-muted-foreground">{o.sub}</p>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {pronto && (
            <div className="rounded-2xl border border-accent/40 bg-accent/5 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Resumo</p>
              <p className="mt-2 text-lg font-extrabold text-primary">{config.resumoNome(sel)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{config.resumoDetalhe(sel, qtds)}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Button type="button" variant="cta" size="xl" onClick={handleAdicionar}>
                  {adicionado ? (
                    <>
                      <Check /> Adicionado!
                    </>
                  ) : (
                    <>
                      <ShoppingCart /> Adicionar ao Orçamento
                    </>
                  )}
                </Button>
                <BotaoCotarWhatsApp nomeProduto={config.resumoNome(sel)} corpoMensagem={corpoMsgWpp}>
                  Cotar no WhatsApp
                </BotaoCotarWhatsApp>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProdutoLayout>
  );
}

