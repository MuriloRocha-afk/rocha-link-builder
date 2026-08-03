import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Crown, MessageCircle, Minus, Plus } from "lucide-react";
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

export function ProductCatalogCard({
  item,
  categoryShort,
  expansive = false,
}: {
  item: CatalogItem;
  categoryShort: string;
  expansive?: boolean;
}) {
  const { addItem } = useQuoteCart();
  const [selection, setSelection] = useState<Record<string, string>>(() =>
    Object.fromEntries((item.selectors ?? []).map((s) => [s.key, s.options[0].value])),
  );
  const [qty, setQty] = useState(1);

  const selectors = item.selectors ?? [];

  const activeOptions = useMemo(
    () =>
      selectors.map((s) => ({
        selector: s,
        option: s.options.find((o) => o.value === selection[s.key]) ?? s.options[0],
      })),
    [selectors, selection],
  );

  const image = activeOptions.find((a) => a.option.image)?.option.image ?? item.image;
  const notes = activeOptions.map((a) => a.option.note).filter(Boolean) as string[];
  const detail = [
    categoryShort,
    ...activeOptions.map((a) => `${a.selector.key}: ${a.option.value}`),
  ].join(" · ");
  const variantId = `${item.slug}${activeOptions.length ? `--${activeOptions.map((a) => a.option.value).join("|")}` : ""}`;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${
        item.bestseller ? "border-accent/60 ring-1 ring-accent/25" : "border-border"
      } ${expansive ? "lg:flex-row" : ""}`}
    >
      <div
        className={`relative overflow-hidden ${expansive ? "aspect-[4/3] lg:aspect-auto lg:w-[42%] lg:shrink-0" : "aspect-[4/3]"}`}
      >
        <img
          src={image}
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

        {selectors.length ? (
          <div className="mt-5 space-y-4 border-t border-border pt-5">
            {selectors.map((s) => (
              <div key={s.key}>
                <p className="text-[11px] font-bold tracking-[0.14em] text-primary/60 uppercase">
                  {s.label}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {s.options.map((o) => {
                    const active = selection[s.key] === o.value;
                    return (
                      <button
                        key={o.value}
                        type="button"
                        onClick={() => setSelection((prev) => ({ ...prev, [s.key]: o.value }))}
                        aria-pressed={active}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all ${
                          active
                            ? "border-accent bg-accent text-accent-foreground"
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
            ))}
            {notes.length ? (
              <p className="rounded-xl bg-secondary px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                {notes.join(" · ")}
              </p>
            ) : null}
          </div>
        ) : (
          <dl className="mt-5 space-y-2 border-t border-border pt-5 text-sm">
            {item.specs.map((s) => (
              <div key={s.label} className="grid grid-cols-[auto_1fr] gap-3">
                <dt className="font-bold text-primary/80">{s.label}</dt>
                <dd className="text-right text-muted-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {item.badges?.length ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {item.badges.map((b) => (
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

        <div className="mt-6 flex flex-col gap-3">
          {item.showQty ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-[0.14em] text-primary/60 uppercase">
                Qtde.
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
          ) : null}

          <Button
            type="button"
            variant={item.bestseller ? "cta" : "outlineAccent"}
            className="h-12 w-full"
            onClick={() =>
              addItem({ id: variantId, name: item.name, detail, qty: item.showQty ? qty : 1 })
            }
          >
            <Plus />
            Adicionar ao Orçamento
          </Button>

          <Button asChild variant="whats" className="h-12 w-full">
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

          <Button asChild variant="ghost" className="h-10 w-full text-sm font-bold text-primary/70">
            <Link to="/catalogo/$produtoSlug" params={{ produtoSlug: item.slug }}>
              Ficha técnica completa
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
