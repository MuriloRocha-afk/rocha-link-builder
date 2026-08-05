import { useState } from "react";
import { Minus, Plus, MessageCircle, ShoppingCart, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink } from "@/constants/whatsapp";
import { useQuoteCart } from "@/components/site/quote-cart";
import { toast } from "sonner";

const TIPOS = [
  { id: "viga", label: "Viga", icon: "🪵" },
  { id: "caibro", label: "Caibro", icon: "📏" },
  { id: "ripa", label: "Ripa", icon: "➖" },
  { id: "ripao", label: "Ripão", icon: "📐" },
  { id: "dormente", label: "Dormente", icon: "🧱" },
] as const;

type TipoId = (typeof TIPOS)[number]["id"];

const BITOLAS: Record<TipoId, string[]> = {
  viga: [
    "5x11cm", "5x15cm", "5x20cm", "5x25cm", "5x30cm",
    "8x10cm", "8x15cm", "8x20cm", "8x25cm", "8x30cm", "8x40cm", "8x50cm",
    "10x20cm", "10x30cm", "10x40cm",
  ],
  caibro: ["5x5cm", "5x7cm"],
  ripa: ["1,5x5cm"],
  ripao: ["2x5cm"],
  dormente: ["8x8cm", "10x10cm", "15x15cm", "20x20cm"],
};

const COMPRIMENTOS = [
  "1,0m", "1,5m", "2,0m", "2,5m", "3,0m", "3,5m", "4,0m",
  "4,5m", "5,0m", "5,5m", "6,0m", "6,5m", "7,0m", "7,5m", "8,0m", "8,5m",
];

const ACABAMENTOS = [
  {
    id: "Bruto",
    title: "Bruto",
    subtitle: "Sem beneficiamento",
    bullets: ["Superfície natural da serra", "Preço mais econômico"],
    recommended: false,
  },
  {
    id: "Aparelhado em Plaina",
    title: "Aparelhado em Plaina",
    subtitle: "Superfície lisa e padronizada",
    bullets: ["Pronto para envernizar", "Melhor encaixe na estrutura"],
    recommended: true,
  },
];

function StepHeader({ n, title, done }: { n: number; title: string; done?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
          done ? "bg-[#25D366] text-white" : "bg-[#F97316] text-white"
        }`}
      >
        {done ? <Check className="h-4 w-4" /> : n}
      </span>
      <h2 className="text-lg font-extrabold text-primary sm:text-xl">{title}</h2>
    </div>
  );
}

function OptionButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border-2 px-3 py-3 text-sm font-bold transition-all ${
        active
          ? "border-[#F97316] bg-[#F97316] text-white shadow-[var(--shadow-card)]"
          : "border-border bg-card text-primary hover:border-[#F97316]/60 hover:-translate-y-0.5"
      }`}
    >
      {children}
    </button>
  );
}

export function CambaraConfigurator() {
  const { addItem, setOpen } = useQuoteCart();
  const [tipo, setTipo] = useState<TipoId | null>(null);
  const [bitola, setBitola] = useState<string | null>(null);
  const [comprimento, setComprimento] = useState<string | null>(null);
  const [acabamento, setAcabamento] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  const tipoLabel = TIPOS.find((t) => t.id === tipo)?.label ?? null;
  const completo = Boolean(tipo && bitola && comprimento && acabamento);

  const detail = [tipoLabel, bitola, comprimento, acabamento].filter(Boolean).join(" · ");

  const mensagem = `Olá! Gostaria de um orçamento:

*Cambará Rosa*
- Tipo: ${tipoLabel ?? "-"}
- Bitola: ${bitola ?? "-"}
- Comprimento: ${comprimento ?? "-"}
- Acabamento: ${acabamento ?? "-"}
- Quantidade: ${qty} peças

Poderia verificar disponibilidade e frete?`;

  function handleAdd() {
    if (!completo) {
      toast.error("Complete todas as etapas do configurador antes de adicionar.");
      return;
    }
    addItem({
      id: `cambara-${tipo}-${bitola}-${comprimento}-${acabamento}`.toLowerCase().replace(/\s+/g, "-"),
      name: "Cambará Rosa",
      detail,
      qty,
      unit: "peças",
    });
    toast.success("Adicionado ao orçamento!");
    setOpen(true);
  }

  return (
    <div className="space-y-10">
      {/* Etapa 1 */}
      <div>
        <StepHeader n={1} title="Tipo de Peça" done={Boolean(tipo)} />
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {TIPOS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTipo(t.id);
                setBitola(null);
              }}
              className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-4 py-6 font-extrabold transition-all ${
                tipo === t.id
                  ? "border-[#F97316] bg-[#F97316] text-white shadow-[var(--shadow-lift)]"
                  : "border-border bg-card text-primary hover:-translate-y-1 hover:border-[#F97316]/60"
              }`}
            >
              <span className="text-2xl" aria-hidden>
                {t.icon}
              </span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Etapa 2 */}
      {tipo ? (
        <div>
          <StepHeader n={2} title="Bitola" done={Boolean(bitola)} />
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {BITOLAS[tipo].map((b) => (
              <OptionButton key={b} active={bitola === b} onClick={() => setBitola(b)}>
                {b}
              </OptionButton>
            ))}
          </div>
        </div>
      ) : null}

      {/* Etapa 3 */}
      {bitola ? (
        <div>
          <StepHeader n={3} title="Comprimento" done={Boolean(comprimento)} />
          <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
            {COMPRIMENTOS.map((c) => (
              <OptionButton key={c} active={comprimento === c} onClick={() => setComprimento(c)}>
                {c}
              </OptionButton>
            ))}
          </div>
        </div>
      ) : null}

      {/* Etapa 4 */}
      {comprimento ? (
        <div>
          <StepHeader n={4} title="Acabamento" done={Boolean(acabamento)} />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {ACABAMENTOS.map((a) => {
              const active = acabamento === a.id;
              return (
                <div
                  key={a.id}
                  className={`relative flex flex-col rounded-2xl border-2 p-6 transition-all ${
                    active ? "border-[#F97316] bg-[#F97316]/5" : "border-border bg-card"
                  }`}
                >
                  {a.recommended ? (
                    <span className="absolute -top-3 right-5 inline-flex items-center gap-1 rounded-full bg-[#F97316] px-3 py-1 text-[10px] font-extrabold tracking-wider text-white uppercase">
                      <Star className="h-3 w-3 fill-current" /> Recomendado
                    </span>
                  ) : null}
                  <h3 className="text-lg font-extrabold text-primary uppercase">{a.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-muted-foreground">{a.subtitle}</p>
                  <ul className="mt-3 flex-1 space-y-2">
                    {a.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-foreground/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#25D366]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Button
                    type="button"
                    variant={active ? "cta" : "outline"}
                    className="mt-5 w-full"
                    onClick={() => setAcabamento(a.id)}
                  >
                    {active ? "Selecionado" : "Selecionar"}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Etapa 5 */}
      {acabamento ? (
        <div>
          <StepHeader n={5} title="Quantidade" done />
          <div className="mt-4 max-w-xs">
            <label htmlFor="qtd-cambara" className="text-sm font-bold text-primary">
              Quantidade de peças
            </label>
            <div className="mt-2 flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Diminuir quantidade"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <input
                id="qtd-cambara"
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                className="h-11 w-24 rounded-xl border border-border bg-card text-center text-lg font-extrabold text-primary"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Aumentar quantidade"
                onClick={() => setQty((q) => q + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Resumo */}
      <div className="rounded-2xl border border-border bg-secondary p-6">
        <h3 className="text-sm font-extrabold tracking-[0.14em] text-primary/60 uppercase">
          Resumo do pedido
        </h3>
        <p className="mt-3 text-base font-extrabold text-primary sm:text-lg">
          Cambará Rosa
          {tipoLabel ? ` · ${tipoLabel}` : ""}
          {bitola ? ` · ${bitola}` : ""}
          {comprimento ? ` · ${comprimento}` : ""}
          {acabamento ? ` · ${acabamento}` : ""}
        </p>
        <p className="mt-1 text-sm font-semibold text-muted-foreground">
          Quantidade: {qty} peças
        </p>
        {!completo ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Complete as etapas acima para liberar o envio da cotação.
          </p>
        ) : null}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button type="button" variant="cta" size="xl" onClick={handleAdd} disabled={!completo}>
            <ShoppingCart className="h-5 w-5" />
            Adicionar ao Orçamento
          </Button>
          <Button asChild variant="whats" size="xl" disabled={!completo}>
            <a
              href={completo ? waLink(mensagem) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!completo}
              onClick={(e) => {
                if (!completo) {
                  e.preventDefault();
                  toast.error("Complete todas as etapas do configurador.");
                }
              }}
            >
              <MessageCircle className="h-5 w-5" />
              Cotar agora no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
