import { useMemo, useState } from "react";
import { ChevronRight, ShoppingCart, Check, MessageCircle } from "lucide-react";
import { useOrcamento } from "@/context/OrcamentoContext";
import ModalCotarWhatsApp from "@/components/ModalCotarWhatsApp";
import GaleriaProduto, { type ImagemProduto } from "@/components/GaleriaProduto";
import ProdutoLayout from "@/components/site/ProdutoLayout";
import BlocoAcessorios, { type AcessorioItem } from "@/components/site/BlocoAcessorios";
import TipoCard from "@/components/site/TipoCard";
import SugestaoCumeeira from "@/components/site/SugestaoCumeeira";

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
  /** força a quantidade a ser múltipla deste valor (ex.: 0.5) */
  multiplo?: number;
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
  informacoes?: { titulo: string; texto: string }[];
  produtoKey?: string;
  tagInfo?: string;
  /** aviso em destaque exibido acima dos passos */
  avisoDestaque?: string;

  categoria: string;
  unidadeResumo: (sel: Selecao, qtds: Quantidades) => string;
  resumoNome: (sel: Selecao) => string;
  resumoDetalhe: (sel: Selecao, qtds: Quantidades) => string;
  mensagem: (sel: Selecao, qtds: Quantidades) => string;
  idItem: (sel: Selecao) => string;
  /** sugestão de cumeeira do mesmo material (cross-sell) */
  sugestaoCumeeira?: (sel: Selecao) => { material: string; cor?: string; peca?: string } | null;
  /** bloco de acessórios exibido no fim da ficha */
  acessorios?: (sel: Selecao, qtds: Quantidades) => AcessorioItem[];
  tituloAcessorios?: string;
};

function ajustarQtd(passo: PassoConfig, valor: number): number {
  const passoMin = passo.multiplo ?? (passo.decimal ? 0.5 : 1);
  const minimo = passo.multiplo ?? (passo.decimal ? 0.5 : 1);
  const bruto = Number.isFinite(valor) ? valor : minimo;
  const arredondado = passo.multiplo
    ? Math.round(bruto / passo.multiplo) * passo.multiplo
    : passo.decimal
      ? bruto
      : Math.round(bruto);
  return Math.max(minimo, Number((arredondado || passoMin).toFixed(2)));
}

function resolverOpcoes(passo: PassoConfig, sel: Selecao): OpcaoConfig[] {
  if (!passo.opcoes) return [];
  return typeof passo.opcoes === "function" ? passo.opcoes(sel) : passo.opcoes;
}

const EMOJI_INICIAL_RE = /^[\s]*(?:[\u{1F000}-\u{1FAFF}\u2600-\u27BF\u2B00-\u2BFF\u3030]\uFE0F?\s*)+/u;

function tituloSemEmojiDecorativo(titulo: string) {
  return titulo.replace(EMOJI_INICIAL_RE, "").trim() || titulo;
}

function deveMostrarEmojiNasOpcoes(opcoes: OpcaoConfig[]) {
  const emojis = opcoes.map((opcao) => opcao.emoji).filter(Boolean);
  return emojis.length > 0 && new Set(emojis).size > 1;
}

export default function ConfiguradorGenerico({
  config,
  inicial,
}: {
  config: ConfiguradorConfig;
  inicial?: Selecao;
}) {
  const { adicionar } = useOrcamento();
  const buscaSel = useBuscaSelecao();
  const [sel, setSel] = useState<Selecao>(() => {
    const base: Selecao = { ...(inicial ?? {}) };
    config.passos.forEach((p) => {
      if (p.tipo !== "quantidade" && buscaSel[p.chave]) base[p.chave] = buscaSel[p.chave];
    });
    return base;
  });

  const [qtds, setQtds] = useState<Quantidades>({});
  const [adicionado, setAdicionado] = useState(false);
  const [modalWppAberto, setModalWppAberto] = useState(false);

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
    setTimeout(() => setAdicionado(false), 1500);
  };

  const baseBtn = (ativo: boolean) =>
    `transition-all ${ativo ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200" : "border-gray-200 hover:border-orange-300"}`;

  const acessorios = config.acessorios ? config.acessorios(sel, qtds) : [];
  const sugestaoCumeeira = config.sugestaoCumeeira ? config.sugestaoCumeeira(sel) : null;

  let numero = 0;
  let bloqueado = false;

  return (
    <ProdutoLayout
      produtoKey={config.produtoKey}
      especificacoes={config.especificacoes}
      informacoes={config.informacoes}
      tituloAcessorios={config.tituloAcessorios ?? "Complemente seu pedido"}
      acessorios={
        acessorios.length ? (
          <BlocoAcessorios itens={acessorios} contexto={config.resumoDetalhe(sel, qtds)} />
        ) : undefined
      }
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
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
              {config.badge}
            </span>
          )}
          <h1 className="text-2xl font-bold text-gray-900 mt-1">
            {tituloSemEmojiDecorativo(config.titulo)}
          </h1>
          <p className="text-gray-500 mt-1 text-sm">{config.subtitulo}</p>
          {config.tagInfo && (
            <span className="inline-flex mt-3 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1">
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
      <>
        {config.avisoDestaque && (
          <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4">
            <p className="text-sm font-semibold leading-snug text-amber-900">
              ⚠️ {config.avisoDestaque}
            </p>
          </div>
        )}

        {passosVisiveis.map((p) => {

          if (bloqueado) return null;
          numero += 1;
          const n = numero;
          if (!preenchido(p)) bloqueado = true;
          const opcoes = resolverOpcoes(p, sel);

          return (
            <section key={p.chave} className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
                  {n}
                </span>
                {p.titulo}
              </h2>

              {p.tipo === "quantidade" ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          setQtds((q) => ({
                            ...q,
                            [p.chave]: ajustarQtd(p, getQtd(p) - (p.passo ?? p.multiplo ?? 1)),
                          }))
                        }
                        className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        step={p.multiplo ?? (p.decimal ? 0.5 : 1)}
                        value={getQtd(p)}
                        onChange={(e) =>
                          setQtds((q) => ({
                            ...q,
                            [p.chave]: ajustarQtd(p, Number(e.target.value)),
                          }))
                        }
                        className="w-24 py-2 text-center font-bold text-gray-900 border-x border-gray-200 focus:outline-none"
                      />
                      <button
                        onClick={() =>
                          setQtds((q) => ({
                            ...q,
                            [p.chave]: ajustarQtd(p, getQtd(p) + (p.passo ?? p.multiplo ?? 1)),
                          }))
                        }
                        className="px-3 py-2 hover:bg-gray-100 text-lg font-bold text-gray-600"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{p.unidade}</span>
                  </div>
                  {p.nota?.(sel, getQtd(p)) && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mt-3">
                      <p className="text-sm text-blue-800 font-medium">{p.nota(sel, getQtd(p))}</p>
                    </div>
                  )}
                  {p.aviso && <p className="text-xs text-gray-500 mt-3">{p.aviso}</p>}
                </>
              ) : p.tipo === "chips" ? (
                <div className="flex flex-wrap gap-2">
                  {opcoes.map((o) => (
                    <button
                      key={o.valor}
                      onClick={() => escolher(p.chave, o.valor)}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-gray-900 ${baseBtn(sel[p.chave] === o.valor)}`}
                    >
                      {o.cor && (
                        <span
                          className="w-4 h-4 rounded-full border border-black/10"
                          style={{ background: o.cor }}
                        />
                      )}
                      {o.label ?? o.valor}
                      {o.badge && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                          {o.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              ) : p.tipo === "lista" ? (
                <div className="space-y-2">
                  {opcoes.map((o) => (
                    <button
                      key={o.valor}
                      onClick={() => escolher(p.chave, o.valor)}
                      className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between gap-3 ${baseBtn(sel[p.chave] === o.valor)}`}
                    >
                      <span className="flex items-center gap-3">
                        {deveMostrarEmojiNasOpcoes(opcoes) && o.emoji && (
                          <span className="text-xl">{o.emoji}</span>
                        )}
                        {o.cor && (
                          <span
                            className="w-5 h-5 rounded-full border border-black/10"
                            style={{ background: o.cor }}
                          />
                        )}
                        <span>
                          <span className="block font-semibold text-gray-900 text-sm">
                            {o.label ?? o.valor}
                          </span>
                          {o.sub && <span className="block text-xs text-gray-500">{o.sub}</span>}
                        </span>
                      </span>
                      {o.badge && (
                        <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                          {o.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div
                  className={`grid gap-3 ${p.tipo === "grid3" ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"}`}
                >
                  {opcoes.map((o) => (
                    <TipoCard
                      key={o.valor}
                      icone={deveMostrarEmojiNasOpcoes(opcoes) ? o.emoji : undefined}
                      cor={o.cor}
                      nome={o.label ?? o.valor}
                      descricao={o.sub}
                      badge={o.badge}
                      selected={sel[p.chave] === o.valor}
                      onClick={() => escolher(p.chave, o.valor)}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {sugestaoCumeeira && (
          <SugestaoCumeeira
            material={sugestaoCumeeira.material}
            cor={sugestaoCumeeira.cor}
            peca={sugestaoCumeeira.peca}
          />
        )}

        {pronto && (
          <section className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <p className="text-xs text-gray-500 font-medium mb-1">RESUMO</p>
              <p className="font-bold text-gray-900">{config.resumoNome(sel)}</p>
              <p className="text-gray-600 text-sm">{config.resumoDetalhe(sel, qtds)}</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleAdicionar}
                className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm ${adicionado ? "bg-green-600 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"}`}
              >
                {adicionado ? (
                  <>
                    <Check size={18} /> Adicionado!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Adicionar ao Orçamento
                  </>
                )}
              </button>
              <button
                onClick={() => setModalWppAberto(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <MessageCircle size={18} /> Cotar no WhatsApp
              </button>
            </div>
          </section>
        )}

        <ModalCotarWhatsApp
          aberto={modalWppAberto}
          onFechar={() => setModalWppAberto(false)}
          nomeProduto={config.resumoNome(sel)}
          corpoMensagem={corpoMsgWpp}
        />
      </>
    </ProdutoLayout>
  );
}

