import { useState } from "react";
import { Home } from "lucide-react";
import { WhatsAppButton } from "./shared";

const PAREDES = [
  { id: "branco", label: "Branco", color: "#F5F5F2", shade: "#E2E1DC" },
  { id: "bege", label: "Bege", color: "#E4D3B8", shade: "#CDBB9E" },
  { id: "cinza", label: "Cinza", color: "#C6C9CC", shade: "#ADB1B5" },
  { id: "grafite", label: "Grafite", color: "#4A4F55", shade: "#3A3E43" },
];

const TELHADOS = [
  { id: "barro", label: "Barro Natural", color: "#B45A32", dark: "#8E4324", texture: "onda" },
  { id: "resinada", label: "Barro Resinada", color: "#8C2F1E", dark: "#6B2214", texture: "onda" },
  { id: "pvc-marfim", label: "PVC Marfim", color: "#EDE4D0", dark: "#D3C7AD", texture: "onda" },
  { id: "pvc-ceramica", label: "PVC Cerâmica", color: "#C1583A", dark: "#9B412A", texture: "onda" },
  { id: "fibrocimento", label: "Fibrocimento", color: "#B9BDBE", dark: "#9AA0A1", texture: "reta" },
];

export function SimuladorVisual() {
  const [parede, setParede] = useState(PAREDES[0]);
  const [telhado, setTelhado] = useState(TELHADOS[0]);

  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] md:p-9">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
          <Home className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <h3 className="text-xl font-extrabold text-primary">Simulador Visual de Telhados</h3>
          <p className="text-sm text-muted-foreground">
            Teste combinações de fachada e cobertura antes de decidir a sua compra.
          </p>
        </div>
      </div>

      <div className="mt-7 overflow-hidden rounded-2xl border border-border bg-secondary">
        <svg viewBox="0 0 400 240" className="h-auto w-full" role="img"
          aria-label={`Casa com parede ${parede.label} e telhado ${telhado.label}`}>
          <defs>
            <pattern id="sim-onda" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M0 8 Q2.5 2 5 8 T10 8" fill="none" stroke={telhado.dark} strokeWidth="1.4" />
            </pattern>
            <pattern id="sim-reta" width="12" height="12" patternUnits="userSpaceOnUse">
              <path d="M0 0 V12" stroke={telhado.dark} strokeWidth="1.6" />
            </pattern>
          </defs>

          <rect x="0" y="0" width="400" height="240" fill="#DCE7F0" />
          <rect x="0" y="196" width="400" height="44" fill="#C7CBBF" />

          {/* corpo da casa */}
          <rect x="70" y="110" width="260" height="90" fill={parede.color} />
          <rect x="70" y="110" width="14" height="90" fill={parede.shade} />

          {/* telhado */}
          <polygon points="200,40 350,112 50,112" fill={telhado.color} />
          <polygon points="200,40 350,112 50,112" fill={`url(#sim-${telhado.texture})`} opacity="0.55" />
          <polygon points="200,40 210,44 60,116 50,112" fill={telhado.dark} opacity="0.5" />
          <rect x="46" y="110" width="308" height="7" rx="3" fill={telhado.dark} />

          {/* porta e janelas */}
          <rect x="180" y="150" width="40" height="50" fill={telhado.dark} opacity="0.85" rx="2" />
          <rect x="108" y="140" width="46" height="34" fill="#7FA8C4" rx="2" />
          <rect x="246" y="140" width="46" height="34" fill="#7FA8C4" rx="2" />
        </svg>
      </div>

      <div className="mt-7 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-primary/70 uppercase">
            Cor da parede / fachada
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PAREDES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setParede(p)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all ${
                  parede.id === p.id
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-card text-primary/70 hover:border-accent hover:text-accent"
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full border border-border"
                  style={{ background: p.color }}
                />
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-primary/70 uppercase">
            Tipo / cor do telhado
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {TELHADOS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTelhado(t)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all ${
                  telhado.id === t.id
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-card text-primary/70 hover:border-accent hover:text-accent"
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full border border-border"
                  style={{ background: t.color }}
                />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-7 rounded-2xl border-2 border-accent bg-accent/8 p-6">
        <p className="text-sm font-bold text-primary">
          Combinação escolhida: fachada {parede.label} + telhado {telhado.label}
        </p>
        <WhatsAppButton
          className="mt-4 w-full"
          message={`Olá! Simulei no site a combinação: fachada ${parede.label} com telhado ${telhado.label}. Podem me enviar um orçamento?`}
        >
          Quero esta combinação — cotar no WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  );
}
