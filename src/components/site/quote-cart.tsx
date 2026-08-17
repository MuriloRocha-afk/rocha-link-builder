import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AlertCircle, CheckCircle2, Minus, Plus, ShoppingCart, Trash2, MessageCircle } from "lucide-react";
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
import { useServerFn } from "@tanstack/react-start";
import { enviarPedidoTiny } from "@/lib/tiny.functions";
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
  addItem: (item: Omit<QuoteItem, "qty"> & { qty?: number }, opts?: { silent?: boolean }) => void;
  crossSell: { nome: string; qtd: number; detail?: string } | null;
  closeCrossSell: () => void;
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
  const [crossSell, setCrossSell] = useState<{ nome: string; qtd: number; detail?: string } | null>(null);

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

  const addItem = useCallback<QuoteCartContext["addItem"]>((item, opts) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + (item.qty ?? 1) } : i,
        );
      }
      return [...prev, { ...item, qty: item.qty ?? 1 }];
    });
    if (opts?.silent) return;
    // pop-up de produtos relacionados 800ms após adicionar
    setTimeout(() => setCrossSell({ nome: item.name, qtd: item.qty ?? 1, detail: item.detail }), 800);
  }, []);

  const closeCrossSell = useCallback(() => setCrossSell(null), []);

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
      crossSell,
      closeCrossSell,
      updateQty,
      removeItem,
      clear,
    }),
    [items, open, crossSell, closeCrossSell, addItem, updateQty, removeItem, clear],
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


function buildMessage(items: QuoteItem[], nome: string, local: string) {
  const linhas = items
    .map(
      (i) =>
        `- ${i.name}${i.detail ? ` — ${i.detail}` : ""} — Qtd: ${i.qty} ${i.unit ?? "un"}`,
    )
    .join("\n");

  return [
    "Olá, equipe Rocha Telhas!",
    `Meu nome é ${nome.trim() || "[nome]"} e estou em ${local.trim() || "[cidade/bairro]"}.`,
    "Gostaria de solicitar uma cotação para os itens abaixo:",
    "",
    "📋 *LISTA DE MATERIAIS*",
    linhas,
    "",
    "📍 *LOCAL DE ENTREGA*",
    local.trim() || "[cidade/bairro]",
    "",
    "💬 *Informações adicionais*",
    "Poderia verificar a disponibilidade em estoque, o prazo de entrega e o valor do frete para minha região?",
    "",
    "Aguardo retorno. Obrigado!",
  ].join("\n");
}

function QuoteDrawer() {
  const { items, open, setOpen, updateQty, removeItem, clear, count } = useQuoteCart();
  const [nome, setNome] = useState("");
  const [local, setLocal] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<{ numero: string } | null>(null);
  const enviarPedido = useServerFn(enviarPedidoTiny);
  const pronto = nome.trim().length >= 2 && local.trim().length >= 2;

  const handleEnviar = async () => {
    if (!pronto || items.length === 0 || enviando) return;
    setEnviando(true);
    setErro(null);
    try {
      const res = await enviarPedido({
        data: {
          nome: nome.trim(),
          telefone: telefone.trim(),
          endereco: endereco.trim(),
          cidade: local.trim(),
          observacoes: "Orçamento solicitado pelo site Rocha Telhas",
          itens: items.map((i) => ({
            descricao: `${i.name}${i.detail ? ` — ${i.detail}` : ""}`,
            quantidade: i.qty,
            unidade: (i.unit ?? "un").slice(0, 10),
          })),
        },
      });
      if (res.ok) {
        setSucesso({ numero: res.numeroPedido });
        clear();
      } else {
        setErro(res.erro);
      }
    } catch {
      setErro("Não foi possível enviar agora. Tente novamente ou fale no WhatsApp.");
    } finally {
      setEnviando(false);
    }
  };


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
                Seu nome <span className="text-accent">*</span>
              </Label>
              <Input
                id="quote-nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex.: João Silva"
                maxLength={80}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="quote-local" className="text-xs font-bold text-primary/80">
                Bairro / cidade de entrega <span className="text-accent">*</span>
              </Label>
              <Input
                id="quote-local"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                placeholder="Ex.: Centro, Franco da Rocha"
                maxLength={80}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="quote-tel" className="text-xs font-bold text-primary/80">
                Telefone / WhatsApp
              </Label>
              <Input
                id="quote-tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(11) 90000-0000"
                maxLength={40}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="quote-email" className="text-xs font-bold text-primary/80">
                E-mail
              </Label>
              <Input
                id="quote-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                maxLength={160}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="quote-end" className="text-xs font-bold text-primary/80">
                Endereço de entrega
              </Label>
              <Input
                id="quote-end"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="Rua, número"
                maxLength={120}
                className="mt-1.5"
              />
            </div>
          </div>

          {items.length > 0 && !pronto ? (
            <p className="mt-3 flex items-start gap-2 rounded-xl border border-accent/40 bg-accent/8 px-4 py-2.5 text-xs font-semibold text-primary/80">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              Informe seu nome e o bairro/cidade de entrega para enviar a cotação.
            </p>
          ) : null}

          {erro ? (
            <p className="mt-3 flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-2.5 text-xs font-semibold text-destructive">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {erro}
            </p>
          ) : null}

          <Button
            type="button"
            size="xl"
            onClick={handleEnviar}
            disabled={items.length === 0 || !pronto || enviando}
            className="mt-4 w-full"
          >
            {enviando ? "ENVIANDO..." : "SOLICITAR ORÇAMENTO"}
          </Button>

          <Button
            asChild
            variant="whats"
            size="xl"
            className={`mt-2 w-full ${items.length === 0 || !pronto ? "pointer-events-none opacity-50" : ""}`}
          >
            <a
              href={waLink(buildMessage(items, nome, local))}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={items.length === 0 || !pronto}
            >
              <MessageCircle />
              ENVIAR COTAÇÃO VIA WHATSAPP
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

        {sucesso ? (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background/97 px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-extrabold text-primary">
              Orçamento enviado com sucesso!
            </h3>
            <p className="text-sm text-muted-foreground">
              Em breve nossa equipe entrará em contato.
              {sucesso.numero ? (
                <>
                  {" "}
                  Número do pedido: <strong className="text-primary">{sucesso.numero}</strong>
                </>
              ) : null}
            </p>
            <Button asChild variant="whats" size="xl" className="w-full">
              <a
                href={waLink(
                  `Olá, equipe Rocha Telhas! Sou ${nome.trim()} e acabei de enviar um orçamento pelo site${sucesso.numero ? ` (pedido nº ${sucesso.numero})` : ""}. Poderiam dar andamento?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle />
                CHAMAR NO WHATSAPP
              </a>
            </Button>
            <button
              type="button"
              onClick={() => {
                setSucesso(null);
                setOpen(false);
              }}
              className="text-xs font-semibold text-muted-foreground hover:text-primary"
            >
              Fechar
            </button>
          </div>
        ) : null}
      </SheetContent>

    </Sheet>
  );
}
