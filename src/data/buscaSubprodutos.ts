/**
 * Indexação automática de produtos individuais (nível 4) a partir dos
 * configuradores do catálogo.
 *
 * Objetivo: quando o cliente busca por uma MARCA (Bestfer, Sayerlack, Isotec,
 * Cejatel, Eurotop, Brazilian Color, Roloflex...) ou por um item específico, o
 * resultado deve levar direto ao produto — e não apenas à página genérica da
 * categoria.
 */

import type {
  ConfiguradorConfig,
  OpcaoConfig,
  PassoConfig,
  Selecao,
} from "@/components/site/ConfiguradorGenerico";
import * as calhas from "@/data/configs/calhas";
import * as cumeeiras from "@/data/configs/cumeeiras";
import * as fixadores from "@/data/configs/fixadores";
import * as madeiramento from "@/data/configs/madeiramento";
import * as telhas from "@/data/configs/telhas";
import * as tintas from "@/data/configs/tintas";

export type SubprodutoBusca = {
  id: string;
  nome: string;
  especie?: string;
  categoria: string;
  material?: string;
  rota: string;
  termos: string[];
};

const MODULOS = [calhas, cumeeiras, fixadores, madeiramento, telhas, tintas];

function ehConfig(valor: unknown): valor is ConfiguradorConfig {
  const c = valor as ConfiguradorConfig | undefined;
  return Boolean(c && Array.isArray(c.passos) && typeof c.resumoNome === "function" && c.breadcrumb);
}

const CONFIGS: ConfiguradorConfig[] = MODULOS.flatMap((m) =>
  Object.values(m as Record<string, unknown>).filter(ehConfig),
);

/** remove emojis e espaços extras de títulos usados como texto de busca */
function limpar(texto: string) {
  return texto
    .replace(/[\p{Extended_Pictographic}\u2190-\u2BFF\uFE0F]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** produtoKey que não corresponde ao slug real da rota */
const SLUG_ROTA: Record<string, string> = {
  deck: "tabeiras-deck",
};

function rotaBase(config: ConfiguradorConfig): string | null {
  const hrefs = config.breadcrumb.filter((b) => b.href).map((b) => b.href as string);
  const categoria = hrefs[hrefs.length - 1];
  if (!categoria || !config.produtoKey) return null;
  const slug = SLUG_ROTA[config.produtoKey] ?? config.produtoKey;
  return `${categoria}/${slug}`;
}

function opcoesDo(passo: PassoConfig, sel: Selecao): OpcaoConfig[] {
  if (!passo.opcoes) return [];
  try {
    const lista = typeof passo.opcoes === "function" ? passo.opcoes(sel) : passo.opcoes;
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

function nomeDe(config: ConfiguradorConfig, sel: Selecao, valor: string): string {
  let base = "";
  try {
    base = limpar(config.resumoNome(sel) ?? "");
  } catch {
    base = "";
  }
  if (!base) base = limpar(config.galeriaTitulo || config.titulo);
  const b = base.toLowerCase();
  const v = valor.toLowerCase();
  if (b.includes(v) || v.includes(b)) return base.length >= valor.length ? base : valor;
  return `${base} — ${valor}`;
}

function gerar(config: ConfiguradorConfig): SubprodutoBusca[] {
  const base = rotaBase(config);
  if (!base) return [];

  const contexto = [
    limpar(config.titulo),
    limpar(config.subtitulo),
    limpar(config.galeriaTitulo),
    config.categoria,
  ];

  const passos = config.passos.filter((p) => p.tipo !== "quantidade");
  const vistos = new Set<string>();
  const porNivel: SubprodutoBusca[][] = [];
  let baseRaiz = "";
  try {
    baseRaiz = limpar(config.resumoNome({}) ?? "");
  } catch {
    baseRaiz = "";
  }

  let selecoes: { sel: Selecao; subs: string[]; base: string }[] = [
    { sel: {}, subs: [], base: baseRaiz },
  ];

  for (const [nivel, passo] of passos.slice(0, 2).entries()) {
    const proximas: { sel: Selecao; subs: string[]; base: string }[] = [];
    for (const atual of selecoes) {
      if (passo.visivel && !passo.visivel(atual.sel)) continue;
      for (const opcao of opcoesDo(passo, atual.sel)) {
        const sel = { ...atual.sel, [passo.chave]: opcao.valor };
        let nomeProduto = "";
        try {
          nomeProduto = limpar(config.resumoNome(sel) ?? "");
        } catch {
          nomeProduto = "";
        }
        // A partir do 2º nível só indexamos quando a escolha muda o nome do
        // produto (ex.: "Bestfer — Serrote"); variações como volume ou cor não
        // viram entradas separadas.
        if (nivel > 0 && nomeProduto === atual.base) continue;
        proximas.push({
          sel,
          subs: [...atual.subs, opcao.sub ?? "", opcao.label ?? ""],
          base: nomeProduto,
        });
      }
    }
    if (proximas.length === 0 || proximas.length > 28) break;

    const doNivel: SubprodutoBusca[] = [];
    for (const { sel, subs } of proximas) {
      const valor = sel[passo.chave] as string;
      const nome = nomeDe(config, sel, valor);
      const chaveUnica = nome.toLowerCase();
      if (vistos.has(chaveUnica)) continue;
      vistos.add(chaveUnica);

      const query = new URLSearchParams(sel).toString();
      doNivel.push({
        id: `sub-${config.produtoKey}-${Object.values(sel).join("-")}`,
        nome,
        categoria: config.categoria,
        rota: `${base}?${query}`,
        termos: [...Object.values(sel), ...subs, ...contexto].filter(Boolean) as string[],
      });
    }
    porNivel.push(doNivel);
    selecoes = proximas;
  }

  // Quando o 2º nível traz os produtos de verdade (caso das ferramentas), as
  // entradas genéricas do 1º nível (famílias) são descartadas.
  if (porNivel.length === 2 && porNivel[1].length > 0) {
    return [...porNivel[0].filter((i) => !i.nome.includes(`${baseRaiz} —`)), ...porNivel[1]];
  }
  return porNivel.flat();
}

export const SUBPRODUTOS_BUSCA: SubprodutoBusca[] = CONFIGS.flatMap(gerar);
