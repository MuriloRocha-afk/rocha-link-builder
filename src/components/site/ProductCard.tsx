import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowRight, Check, ChevronDown, Crown, MessageCircle, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink } from "./shared";
import { useQuoteCart } from "./quote-cart";
import type { CatalogItem } from "./catalog-data";

function BestsellerBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-[11px] font-extrabold tracking-wider text-accent-foreground uppercase shadow-[var(--shadow-lift)]">
      <Crown className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

/** Card enxuto do catálogo: capa, título, selo, descrição e link para a ficha técnica. */
export function ProductCatalogCard({
  item,
  categoryShort,
  categoryId,
  expansive = false,
}: {
  item: CatalogItem;
  categoryShort: string;
  categoryId: string;
  expansive?: boolean;
}) {
  const productLink = { to: "/catalogo/$categoriaSlug/$produtoSlug" as const, params: { categoriaSlug: categoryId, produtoSlug: item.slug } };

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${
        item.bestseller ? "border-accent/60 ring-1 ring-accent/25" : "border-border"
      } ${expansive ? "lg:flex-row" : ""}`}
    >
      <Link
        to={productLink.to}
        params={productLink.params}
        aria-label={`Ver ficha técnica de ${item.name}`}
        className="absolute inset-0 z-10"
      />
      <div
        className={`relative overflow-hidden ${expansive ? "aspect-[4/3] lg:aspect-auto lg:w-[45%] lg:shrink-0" : "aspect-[4/3]"}`}
      >
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-primary/85 px-3 py-1 text-[11px] font-bold tracking-wider text-primary-foreground uppercase backdrop-blur">
          {categoryShort}
        </span>
        {item.bestseller ? (
          <span className="absolute right-4 bottom-4">
            <BestsellerBadge label={item.bestseller} />
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className={`font-extrabold text-primary ${expansive ? "text-2xl" : "text-lg"}`}>
          {item.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>

        {item.badges?.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {item.badges.slice(0, 2).map((b) => (
              <li
                key={b}
                className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-bold text-accent"
              >
                <Check className="h-3 w-3" />
                {b}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="relative z-20 mt-auto pt-6">
          <Button
            asChild
            variant={item.bestseller ? "cta" : "outlineAccent"}
            className="h-12 w-full"
          >
            <Link to={productLink.to} params={productLink.params}>
              Ver Ficha Técnica Completa
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

/** Configurador da página do produto: seletores obrigatórios + quantidade + validação. */
export function ProductConfigurator({
  item,
  categoryShort,
}: {
  item: CatalogItem;
  categoryShort: string;
}) {
  const { addItem } = useQuoteCart();
  const selectors = item.selectors ?? [];
  const [selection, setSelection] = useState<Record<string, string>>({});
  const [qty, setQty] = useState(1);
  const [erro, setErro] = useState(false);
  const [acessoriosAbertos, setAcessoriosAbertos] = useState(false);
  const produtoTelha = /telha|fibrocimento|pvc|cerâmica/i.test(`${item.name} ${categoryShort}`);
  const kitsRecomendados = Math.max(1, Math.ceil(qty / 15));
  const cumeeirasRecomendadas = Math.max(1, Math.ceil(qty / 10));

  const faltando = useMemo(
    () => selectors.filter((s) => !selection[s.key]).map((s) => s.label),
    [selectors, selection],
  );

  const activeOptions = selectors
    .map((s) => ({ selector: s, option: s.options.find((o) => o.value === selection[s.key]) }))
    .filter((a) => a.option) as {
    selector: (typeof selectors)[number];
    option: NonNullable<(typeof selectors)[number]["options"][number]>;
  }[];

  const image = activeOptions.find((a) => a.option.image)?.option.image ?? item.image;
  const notes = activeOptions.map((a) => a.option.note).filter(Boolean) as string[];
  const detail = [
    categoryShort,
    ...activeOptions.map((a) => `${a.selector.key}: ${a.option.value}`),
  ].join(" · ");
  const variantId = `${item.slug}${activeOptions.length ? `--${activeOptions.map((a) => a.option.value).join("|")}` : ""}`;

  const handleAdd = () => {
    if (faltando.length > 0) {
      setErro(true);
      return;
    }
    setErro(false);
    addItem({ id: variantId, name: item.name, detail, qty });
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-start gap-4">
        <img
          src={image}
          alt={item.name}
          loading="lazy"
          width={200}
          height={150}
          className="hidden h-24 w-32 shrink-0 rounded-xl object-cover sm:block"
        />
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
            Configure seu item
          </p>
          <h2 className="mt-1 text-xl font-extrabold text-primary">
            Especificações obrigatórias
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Selecione todas as opções abaixo para adicionar o item ao orçamento.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {selectors.map((s) => {
          const pendente = erro && !selection[s.key];
          return (
            <div key={s.key}>
              <p
                className={`text-[11px] font-bold tracking-[0.14em] uppercase ${pendente ? "text-destructive" : "text-primary/60"}`}
              >
                {s.label} <span className="text-accent">*</span>
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {s.options.map((o) => {
                  const active = selection[s.key] === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => {
                        setSelection((prev) => ({ ...prev, [s.key]: o.value }));
                        setErro(false);
                      }}
                      aria-pressed={active}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all ${
                        active
                          ? "border-accent bg-accent text-accent-foreground"
                          : pendente
                            ? "border-destructive/50 bg-card text-primary/70 hover:border-accent hover:text-accent"
                            : "border-border bg-card text-primary/70 hover:border-accent hover:text-accent"
                      }`}
                    >
                      {o.label}
                      {o.highlight ? (
                        <span
                          className={`ml-1.5 text-[10px] font-extrabold ${active ? "text-accent-foreground/80" : "text-accent"}`}
                        >
                          ★ {o.highlight}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {notes.length ? (
          <p className="rounded-xl bg-secondary px-4 py-3 text-xs leading-relaxed text-muted-foreground">
            {notes.join(" · ")}
          </p>
        ) : null}

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-[0.14em] text-primary/60 uppercase">
            Qtde. de peças <span className="text-accent">*</span>
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Diminuir quantidade"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-primary hover:border-accent hover:text-accent"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            aria-label={`Quantidade de ${item.name}`}
            className="h-9 w-20 rounded-lg border border-border bg-background text-center text-sm font-bold text-primary"
          />
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Aumentar quantidade"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-primary hover:border-accent hover:text-accent"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        {erro && faltando.length ? (
          <p role="alert" className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/8 px-4 py-3 text-sm font-semibold text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            Preencha as especificações antes de adicionar: {faltando.join(", ")}.
          </p>
        ) : null}

        {produtoTelha ? (
          <div className="overflow-hidden rounded-xl border border-accent/35 bg-accent/5">
            <button type="button" onClick={() => setAcessoriosAbertos((v) => !v)} aria-expanded={acessoriosAbertos} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-extrabold text-primary">
              Sugestão de Acessórios Relacionados
              <ChevronDown className={`h-4 w-4 shrink-0 text-accent transition-transform ${acessoriosAbertos ? "rotate-180" : ""}`} />
            </button>
            {acessoriosAbertos ? (
              <div className="border-t border-accent/20 px-4 py-4">
                <p className="text-xs text-muted-foreground">Proporção recomendada para {qty} telha(s):</p>
                <ul className="mt-3 grid gap-2 text-sm font-semibold text-primary sm:grid-cols-2">
                  <li className="rounded-lg bg-card px-3 py-2">{kitsRecomendados} kit(s) de vedação/parafusos</li>
                  <li className="rounded-lg bg-card px-3 py-2">{cumeeirasRecomendadas} cumeeira(s)</li>
                </ul>
                <Button type="button" variant="cta" size="lg" className="mt-4 w-full" onClick={() => {
                  if (faltando.length > 0) { setErro(true); return; }
                  setErro(false);
                  addItem({ id: variantId, name: item.name, detail, qty });
                  addItem({ id: `${variantId}-kit-vedacao`, name: "Kit de vedação e parafusos", detail: `Recomendado para ${qty} telha(s) de ${item.name}`, qty: kitsRecomendados, unit: "kits" });
                  addItem({ id: `${variantId}-cumeeira`, name: "Cumeeira compatível", detail: `Recomendada para ${item.name}`, qty: cumeeirasRecomendadas, unit: "peças" });
                }}><Plus />Adicionar Telhas e Acessórios Recomendados</Button>
              </div>
            ) : null}
          </div>
        ) : null}

        <Button type="button" variant="cta" size="xl" className="w-full" onClick={handleAdd}>
          <Plus />Adicionar ao Orçamento
        </Button>

        <Button asChild variant="whats" size="xl" className="w-full">
          <a
            href={waLink(
              `Olá, gostaria de um orçamento sobre ${item.name}${
                activeOptions.length
                  ? ` (${activeOptions.map((a) => `${a.selector.key}: ${a.option.value}`).join(", ")})`
                  : ""
              }.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle />
            {item.cta ?? "Cotar no WhatsApp"}
          </a>
        </Button>
      </div>
    </div>
  );
}
