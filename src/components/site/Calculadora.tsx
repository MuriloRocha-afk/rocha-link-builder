import { useMemo, useState } from "react";
import { Calculator, MessageCircle, Plus } from "lucide-react";
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
import { waLink } from "./shared";


type Dimensao = {
  id: string;
  label: string;
  /** peças por m² de telhado */
  rendimento: number;
};

type Modelo = {
  id: string;
  name: string;
  nota: string;
  unit: string;
  dimensoes: Dimensao[];
};

const MODELOS: Modelo[] = [
  {
    id: "fibrocimento",
    name: "Telha Fibrocimento Ondulada Infibra",
    nota: "Líder de vendas · inclinação mínima 10%",
    unit: "peças",
    dimensoes: [
      { id: "244", label: "2,44 x 1,10 m (5 mm)", rendimento: 0.42 },
      { id: "305", label: "3,05 x 1,10 m", rendimento: 0.34 },
      { id: "366", label: "3,66 x 1,10 m", rendimento: 0.28 },
      { id: "183", label: "1,83 x 1,10 m", rendimento: 0.56 },
      { id: "153", label: "1,53 x 1,10 m", rendimento: 0.67 },
    ],
  },
  {
    id: "pvc",
    name: "Telha Colonial PVC",
    nota: "Inclinação mínima 15% · largura útil 0,86 m",
    unit: "peças",
    dimensoes: [
      { id: "230", label: "2,30 x 0,86 m", rendimento: 0.58 },
      { id: "328", label: "3,28 x 0,86 m", rendimento: 0.41 },
      { id: "420", label: "4,20 x 0,86 m", rendimento: 0.32 },
      { id: "525", label: "5,25 x 0,86 m", rendimento: 0.26 },
    ],
  },
  {
    id: "ceramica",
    name: "Telhas Cerâmicas Tradicionais",
    nota: "Inclinação mínima 30%",
    unit: "peças",
    dimensoes: [
      { id: "romana", label: "Romana (41 x 24 cm)", rendimento: 16 },
      { id: "portuguesa", label: "Portuguesa (46 x 24 cm)", rendimento: 17 },
      { id: "americana", label: "Americana", rendimento: 12.5 },
      { id: "mediterranea", label: "Mediterrânea", rendimento: 12 },
    ],
  },
  {
    id: "concreto",
    name: "Telha de Concreto",
    nota: "Inclinação mínima 30%",
    unit: "peças",
    dimensoes: [{ id: "42x33", label: "42 x 33 cm", rendimento: 10.5 }],
  },
  {
    id: "galvanizada",
    name: "Telha Galvanizada / Trapezoidal",
    nota: "Largura útil 0,98 m",
    unit: "peças",
    dimensoes: [
      { id: "3", label: "3,00 m de comprimento", rendimento: 0.36 },
      { id: "4", label: "4,00 m de comprimento", rendimento: 0.27 },
      { id: "5", label: "5,00 m de comprimento", rendimento: 0.22 },
      { id: "6", label: "6,00 m de comprimento", rendimento: 0.18 },
    ],
  },
  {
    id: "termoacustica",
    name: "Telha Termoacústica Sanduíche",
    nota: "Miolo EPS/PU · largura útil 1,00 m",
    unit: "peças",
    dimensoes: [
      { id: "3", label: "3,00 m (miolo 30 mm)", rendimento: 0.34 },
      { id: "4", label: "4,00 m (miolo 40 mm)", rendimento: 0.26 },
      { id: "5", label: "5,00 m (miolo 50 mm)", rendimento: 0.21 },
    ],
  },
  {
    id: "translucida",
    name: "Telha Translúcida Polipropileno",
    nota: "Compatível com perfis ondulado e colonial",
    unit: "peças",
    dimensoes: [
      { id: "244-ond", label: "2,44 x 1,10 m (ondulada)", rendimento: 0.42 },
      { id: "230-col", label: "2,30 x 0,86 m (colonial)", rendimento: 0.58 },
    ],
  },
];

export function CalculadoraTelhas({ modeloPadrao }: { modeloPadrao?: string }) {
  const { addItem } = useQuoteCart();
  const [modo, setModo] = useState<"area" | "medidas">("area");
  const [area, setArea] = useState("");
  const [largura, setLargura] = useState("");
  const [comprimento, setComprimento] = useState("");
  const [modeloId, setModeloId] = useState<string>(modeloPadrao ?? "");
  const [dimensaoId, setDimensaoId] = useState<string>("");

  const modelo = MODELOS.find((m) => m.id === modeloId);
  const dimensao = modelo?.dimensoes.find((d) => d.id === dimensaoId);

  const metros = useMemo(() => {
    if (modo === "area") return Number(area.replace(",", ".")) || 0;
    return (Number(largura.replace(",", ".")) || 0) * (Number(comprimento.replace(",", ".")) || 0);
  }, [modo, area, largura, comprimento]);

  const base = dimensao ? metros * dimensao.rendimento : 0;
  const total = base > 0 ? Math.ceil(base * 1.05) : 0;

  // Acessórios estimados a partir da área
  const acessorios = useMemo(() => {
    if (metros <= 0) return null;
    const lado = Math.sqrt(metros);
    const cumeeiraM = lado;
    const perimetro = 4 * lado;
    return {
      cumeeiras: Math.ceil(cumeeiraM / 0.9),
      kitsVedacao: Math.ceil((metros * 4) / 50),
      parafusos: Math.ceil(metros * 4),
      mantas: Math.ceil(metros / 30),
      calhas: Math.ceil(perimetro),
    };
  }, [metros]);

  const listaWhats = () => {
    const linhas = [
      "*Orçamento calculado no site — Rocha Telhas*",
      `Área do telhado: ${metros.toLocaleString("pt-BR", { maximumFractionDigits: 2 })} m²`,
      modelo && dimensao ? `• ${total} ${modelo.unit} — ${modelo.name} (${dimensao.label})` : "",
      acessorios ? `• ${acessorios.cumeeiras} cumeeiras` : "",
      acessorios ? `• ${acessorios.kitsVedacao} kit(s) de vedação (~${acessorios.parafusos} parafusos autobrocantes)` : "",
      acessorios ? `• ${acessorios.mantas} rolo(s) de manta térmica aluminizada` : "",
      acessorios ? `• ${acessorios.calhas} m lineares de calhas e rufos` : "",
      "",
      "Podem confirmar as quantidades e enviar a cotação?",
    ].filter(Boolean);
    return linhas.join("\n");
  };


  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] md:p-9">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/12 text-accent">
          <Calculator className="h-6 w-6" />
        </span>
        <div>
          <h3 className="text-xl font-extrabold text-primary">Calculadora Inteligente de Telhas</h3>
          <p className="text-sm text-muted-foreground">
            Escolha o modelo, a dimensão exata e a área — já com 5% de margem para perdas.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <div>
          <Label className="text-xs font-bold text-primary/80">
            Passo 1 · Modelo da telha
          </Label>
          <Select
            value={modeloId}
            onValueChange={(v) => {
              setModeloId(v);
              setDimensaoId("");
            }}
          >
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

        <div>
          <Label className="text-xs font-bold text-primary/80">
            Passo 2 · Dimensão / comprimento
          </Label>
          <Select value={dimensaoId} onValueChange={setDimensaoId} disabled={!modelo}>
            <SelectTrigger className="mt-2 h-11">
              <SelectValue
                placeholder={modelo ? "Selecione a dimensão" : "Escolha o modelo primeiro"}
              />
            </SelectTrigger>
            <SelectContent>
              {(modelo?.dimensoes ?? []).map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <Label className="text-xs font-bold text-primary/80">
            Passo 3 · Como quer informar a área?
          </Label>
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
          <span className="text-lg font-bold text-primary/70">peças</span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {!modelo
            ? "Passo 1: escolha o modelo da telha."
            : !dimensao
              ? "Passo 2: escolha a dimensão disponível para esse modelo."
              : metros > 0
                ? `${metros.toLocaleString("pt-BR", { maximumFractionDigits: 2 })} m² · ${modelo.name} · ${dimensao.label} · ${modelo.nota} · inclui 5% de margem.`
                : "Passo 3: informe a área ou as medidas do telhado."}
        </p>

        <Button
          type="button"
          variant="cta"
          size="xl"
          className="mt-5 w-full"
          disabled={total === 0}
          onClick={() =>
            modelo && dimensao
              ? addItem({
                  id: `calc-${modelo.id}-${dimensao.id}`,
                  name: `${modelo.name} — ${dimensao.label}`,
                  detail: `Cálculo para ${metros.toLocaleString("pt-BR", { maximumFractionDigits: 2 })} m² (com 5% de margem)`,
                  unit: modelo.unit,
                  qty: total,
                })
              : undefined
          }
        >
          <Plus />
          Adicionar Resultado Exato ao Orçamento
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">
          Estimativa de referência. A equipe técnica confere as quantidades na cotação final.
        </p>
      </div>

      {acessorios ? (
        <div className="mt-7">
          <p className="text-xs font-bold tracking-[0.18em] text-primary/70 uppercase">
            Acessórios estimados para a cobertura
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Cumeeiras", value: `${acessorios.cumeeiras} peças` },
              {
                label: "Kits de vedação / parafusos autobrocantes",
                value: `${acessorios.kitsVedacao} kit(s) · ~${acessorios.parafusos} parafusos`,
              },
              { label: "Manta térmica aluminizada", value: `${acessorios.mantas} rolo(s)` },
              { label: "Calhas e rufos", value: `${acessorios.calhas} m lineares` },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-border bg-secondary/60 p-4">
                <p className="text-xs font-semibold text-muted-foreground">{c.label}</p>
                <p className="mt-1 text-lg font-extrabold text-primary">{c.value}</p>
              </div>
            ))}
          </div>

          <Button asChild variant="whats" size="xl" className="mt-5 w-full">
            <a href={waLink(listaWhats())} target="_blank" rel="noopener noreferrer">
              <MessageCircle />
              Enviar lista calculada para orçamento no WhatsApp
            </a>
          </Button>
        </div>
      ) : null}
    </div>

  );
}
