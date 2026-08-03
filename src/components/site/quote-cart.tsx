import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Minus, Plus, ShoppingCart, Trash2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { waLink, CONTATO } from "./shared";

export type QuoteItem = {
  id: string;
  name: string;
  detail?: string;
  qty: number;
  unit?: string;
};

type QuoteCartContext = {
  items: QuoteItem[];
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  addItem: (item: Omit<QuoteItem, "qty"> & { qty?: number }) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const Ctx = createContext<QuoteCartContext | null>(null);

const STORAGE_KEY = "rocha-telhas-orcamento";

export function useQuoteCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useQuoteCart precisa estar dentro de QuoteCartProvider");
  return ctx;
}

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as QuoteItem[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const addItem = useCallback<QuoteCartContext["addItem"]>((item) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + (item.qty ?? 1) } : i,
        );
      }
      return [...prev, { ...item, qty: item.qty ?? 1 }];
    });
    setOpen(true);
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev.flatMap((i) => (i.id === id ? (qty <= 0 ? [] : [{ ...i, qty }]) : [i])),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((acc, i) => acc + i.qty, 0),
      open,
      setOpen,
      addItem,
      updateQty,
      removeItem,
      clear,
    }),
    [items, open, addItem, updateQty, removeItem, clear],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <QuoteDrawer />
    </Ctx.Provider>
  );
}

export function QuoteCartButton({ className }: { className?: string }) {
  const { count, setOpen } = useQuoteCart();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Abrir carrinho de cotação com ${count} itens`}
      className={`relative flex h-11 w-11 items-center justify-center rounded-lg border border-border text-primary transition-colors hover:border-accent hover:text-accent ${className ?? ""}`}
    >
      <ShoppingCart className="h-5 w-5" />
      {count > 0 ? (
        <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-extrabold text-accent-foreground">
          {count}
        </span>
      ) : null}
    </button>
  );
}

export function AddToQuoteButton({
  id,
  name,
  detail,
  unit,
  className,
  variant = "outlineAccent",
}: {
  id: string;
  name: string;
  detail?: string;
  unit?: string;
  className?: string;
  variant?: "outlineAccent" | "cta";
}) {
  const { addItem } = useQuoteCart();
  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={() => addItem({ id, name, detail, unit })}
    >
      <Plus />
      Adicionar ao Orçamento
    </Button>
  );
}

function buildMessage(items: QuoteItem[], nome: string, local: string) {
  const linhas = items
    .map((i) => `• ${i.qty}${i.unit ? ` ${i.unit}` : "x"} — ${i.name}${i.detail ? ` (${i.detail})` : ""}`)
    .join("\n");
  const extras = [
    nome.trim() ? `Nome: ${nome.trim()}` : "",
    local.trim() ? `Bairro / Cidade de entrega: ${local.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  return [
    "Olá, Rocha Telhas! Gostaria de uma cotação dos itens abaixo:",
    "",
    linhas,
    extras ? `\n${extras}` : "",
  ]
    .join("\n")
    .trim();
}

function QuoteDrawer() {
  const { items, open, setOpen, updateQty, removeItem, clear, count } = useQuoteCart();
  const [nome, setNome] = useState("");
  const [local, setLocal] = useState("");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="text-xl font-extrabold text-primary">
            Carrinho de Cotação
          </SheetTitle>
          <SheetDescription>
            Monte sua lista e envie para o nosso comercial. Sem cadastro, sem senha.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingCart className="h-10 w-10 text-muted-foreground/50" />
              <p className="mt-4 text-sm text-muted-foreground">
                Seu orçamento está vazio. Adicione produtos pelo catálogo ou pela calculadora de
                telhas.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((i) => (
                <li
                  key={i.id}
                  className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-extrabold text-primary">{i.name}</p>
                      {i.detail ? (
                        <p className="mt-1 text-xs text-muted-foreground">{i.detail}</p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(i.id)}
                      aria-label={`Remover ${i.name}`}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQty(i.id, i.qty - 1)}
                      aria-label="Diminuir quantidade"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-primary hover:border-accent hover:text-accent"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={i.qty}
                      onChange={(e) => updateQty(i.id, Number(e.target.value))}
                      aria-label={`Quantidade de ${i.name}`}
                      className="h-8 w-16 rounded-lg border border-border bg-background text-center text-sm font-bold text-primary"
                    />
                    <button
                      type="button"
                      onClick={() => updateQty(i.id, i.qty + 1)}
                      aria-label="Aumentar quantidade"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-primary hover:border-accent hover:text-accent"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-xs text-muted-foreground">{i.unit ?? "peças / un."}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border bg-secondary/50 px-6 py-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="quote-nome" className="text-xs font-bold text-primary/80">
                Seu nome (opcional)
              </Label>
              <Input
                id="quote-nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex.: João Silva"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="quote-local" className="text-xs font-bold text-primary/80">
                Bairro / cidade (opcional)
              </Label>
              <Input
                id="quote-local"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                placeholder="Ex.: Centro, Franco da Rocha"
                className="mt-1.5"
              />
            </div>
          </div>

          <Button
            asChild
            variant="whats"
            size="xl"
            className={`mt-4 w-full ${items.length === 0 ? "pointer-events-none opacity-50" : ""}`}
          >
            <a
              href={waLink(buildMessage(items, nome, local))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle />
              Enviar cotação via WhatsApp
            </a>
          </Button>

          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{count} item(ns) na lista</span>
            {items.length > 0 ? (
              <button
                type="button"
                onClick={clear}
                className="font-semibold transition-colors hover:text-destructive"
              >
                Limpar lista
              </button>
            ) : (
              <span>{CONTATO.hours.split("·")[0]}</span>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
