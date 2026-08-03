import { useMemo, useState } from "react";
import { Calculator, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuoteCart } from "./quote-cart";

type Modelo = {
  id: string;
  name: string;
  rendimento: number;
  unit: string;
  nota: string;
};

const MODELOS: Modelo[] = [
  { id: "romana", name: "Telha Romana (cerâmica)", rendimento: 16, unit: "peças", nota: "Inclinação mínima 30%" },
  { id: "portuguesa", name: "Telha Portuguesa (cerâmica)", rendimento: 17, unit: "peças", nota: "Inclinação mínima 30%" },
  { id: "americana", name: "Telha Americana (cerâmica)", rendimento: 12.5, unit: "peças", nota: "Inclinação mínima 30%" },
  { id: "pvc", name: "Telha PVC Colonial", rendimento: 0.45, unit: "peças", nota: "Base perfil 1,06 m x 2,20 m" },
  { id: "fibrocimento", name: "Telha Fibrocimento Ondulada", rendimento: 0.42, unit: "peças", nota: "Base perfil 1,10 m x 2,44 m" },
];

export function CalculadoraTelhas({ modeloPadrao }: { modeloPadrao?: string }) {
  const { addItem } = useQuoteCart();
  const [modo, setModo] = useState<"area" | "medidas">("area");
  const [area, setArea] = useState("");
  const [largura, setLargura] = useState("");
  const [comprimento, setComprimento] = useState("");
  const [modeloId, setModeloId] = useState(modeloPadrao ?? MODELOS[0].id);

  const modelo = MODELOS.find((m) => m.id === modeloId) ?? MODELOS[0];

  const metros = useMemo(() => {
    if (modo === "area") return Number(area.replace(",", ".")) || 0;
    return (Number(largura.replace(",", ".")) || 0) * (Number(comprimento.replace(",", ".")) || 0);
  }, [modo, area, largura, comprimento]);

  const base = metros * modelo.rendimento;
  const total = base > 0 ? Math.ceil(base * 1.05) : 0;

  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] md:p-9">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/12 text-accent">
          <Calculator className="h-6 w-6" />
        </span>
        <div>
          <h3 className="text-xl font-extrabold text-primary">Calculadora de Telhas</h3>
          <p className="text-sm text-muted-foreground">
            Estimativa de peças já com 5% de margem para perdas e cortes.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <div>
          <Label className="text-xs font-bold text-primary/80">Como quer calcular?</Label>
          <div className="mt-2 flex gap-2">
            {(
              [
                { id: "area", label: "Área em m²" },
                { id: "medidas", label: "Largura x Comprimento" },
              ] as const
            ).map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setModo(o.id)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                  modo === o.id
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-primary/70 hover:border-accent hover:text-accent"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-xs font-bold text-primary/80">Modelo da telha</Label>
          <Select value={modeloId} onValueChange={setModeloId}>
            <SelectTrigger className="mt-2 h-11">
              <SelectValue placeholder="Selecione o modelo" />
            </SelectTrigger>
            <SelectContent>
              {MODELOS.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {modo === "area" ? (
          <div>
            <Label htmlFor="calc-area" className="text-xs font-bold text-primary/80">
              Área do telhado (m²)
            </Label>
            <Input
              id="calc-area"
              inputMode="decimal"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Ex.: 120"
              className="mt-2 h-11"
            />
          </div>
        ) : (
          <>
            <div>
              <Label htmlFor="calc-larg" className="text-xs font-bold text-primary/80">
                Largura (m)
              </Label>
              <Input
                id="calc-larg"
                inputMode="decimal"
                value={largura}
                onChange={(e) => setLargura(e.target.value)}
                placeholder="Ex.: 8"
                className="mt-2 h-11"
              />
            </div>
            <div>
              <Label htmlFor="calc-comp" className="text-xs font-bold text-primary/80">
                Comprimento (m)
              </Label>
              <Input
                id="calc-comp"
                inputMode="decimal"
                value={comprimento}
                onChange={(e) => setComprimento(e.target.value)}
                placeholder="Ex.: 15"
                className="mt-2 h-11"
              />
            </div>
          </>
        )}
      </div>

      <div className="mt-7 rounded-2xl border-2 border-accent bg-accent/8 p-6">
        <p className="text-xs font-bold tracking-[0.18em] text-accent uppercase">
          Quantidade estimada
        </p>
        <p className="mt-2 text-4xl font-extrabold text-primary">
          {total > 0 ? total.toLocaleString("pt-BR") : "—"}{" "}
          <span className="text-lg font-bold text-primary/70">{modelo.unit}</span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {metros > 0
            ? `${metros.toLocaleString("pt-BR", { maximumFractionDigits: 2 })} m² · ${modelo.name} · ${modelo.nota} · inclui 5% de margem de segurança.`
            : "Informe a área ou as medidas do telhado para ver a estimativa."}
        </p>

        <Button
          type="button"
          variant="cta"
          size="xl"
          className="mt-5 w-full"
          disabled={total === 0}
          onClick={() =>
            addItem({
              id: `calc-${modelo.id}`,
              name: modelo.name,
              detail: `Cálculo para ${metros.toLocaleString("pt-BR", { maximumFractionDigits: 2 })} m² (com 5% de margem)`,
              unit: modelo.unit,
              qty: total,
            })
          }
        >
          <Plus />
          Adicionar Resultado ao Orçamento
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">
          Estimativa de referência. A equipe técnica confere as quantidades na cotação final.
        </p>
      </div>
    </div>
  );
}
