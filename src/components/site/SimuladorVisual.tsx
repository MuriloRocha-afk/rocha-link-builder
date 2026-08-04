import { useState } from "react";
import { Check, Home, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink } from "@/constants/whatsapp";

import brancoBarro from "@/assets/sim/base-branco-barro.jpg";
import begeBarro from "@/assets/sim/base-bege-barro.jpg";
import cinzaBarro from "@/assets/sim/base-cinza-barro.jpg";
import grafiteBarro from "@/assets/sim/base-grafite-barro.jpg";
import brancoPvcCeramica from "@/assets/sim/base-branco-pvcceramica.jpg";
import begePvcCeramica from "@/assets/sim/base-bege-pvcceramica.jpg";
import cinzaPvcCeramica from "@/assets/sim/base-cinza-pvcceramica.jpg";
import grafitePvcCeramica from "@/assets/sim/base-grafite-pvcceramica.jpg";
import brancoPvcMarfim from "@/assets/sim/base-branco-pvcmarfim.jpg";
import begePvcMarfim from "@/assets/sim/base-bege-pvcmarfim.jpg";
import cinzaPvcMarfim from "@/assets/sim/base-cinza-pvcmarfim.jpg";
import grafitePvcMarfim from "@/assets/sim/base-grafite-pvcmarfim.jpg";
import brancoFibro from "@/assets/sim/base-branco-fibrocimento.jpg";
import begeFibro from "@/assets/sim/base-bege-fibrocimento.jpg";
import cinzaFibro from "@/assets/sim/base-cinza-fibrocimento.jpg";
import grafiteFibro from "@/assets/sim/base-grafite-fibrocimento.jpg";

const PAREDES = [
  { id: "branco", label: "Branco", color: "#F5F5F2" },
  { id: "bege", label: "Bege", color: "#D8C3A5" },
  { id: "cinza", label: "Cinza", color: "#AEB3B7" },
  { id: "grafite", label: "Grafite", color: "#41464B" },
] as const;

const TELHADOS = [
  { id: "barro", label: "Barro Natural", color: "#B45A32" },
  { id: "pvc-ceramica", label: "PVC Cerâmica", color: "#C1583A" },
  { id: "pvc-marfim", label: "PVC Marfim", color: "#E8DFC9" },
  { id: "fibrocimento", label: "Fibrocimento", color: "#92989B" },
] as const;

const IMAGENS: Record<string, string> = {
  "branco-barro": brancoBarro, "bege-barro": begeBarro, "cinza-barro": cinzaBarro, "grafite-barro": grafiteBarro,
  "branco-pvc-ceramica": brancoPvcCeramica, "bege-pvc-ceramica": begePvcCeramica, "cinza-pvc-ceramica": cinzaPvcCeramica, "grafite-pvc-ceramica": grafitePvcCeramica,
  "branco-pvc-marfim": brancoPvcMarfim, "bege-pvc-marfim": begePvcMarfim, "cinza-pvc-marfim": cinzaPvcMarfim, "grafite-pvc-marfim": grafitePvcMarfim,
  "branco-fibrocimento": brancoFibro, "bege-fibrocimento": begeFibro, "cinza-fibrocimento": cinzaFibro, "grafite-fibrocimento": grafiteFibro,
};

export function SimuladorVisual() {
  const [parede, setParede] = useState<(typeof PAREDES)[number]>(PAREDES[0]);
  const [telhado, setTelhado] = useState<(typeof TELHADOS)[number]>(TELHADOS[0]);
  const imagem = IMAGENS[`${parede.id}-${telhado.id}`] ?? brancoBarro;
  const mensagem = `Olá, Rocha Telhas! Fiz uma simulação no Provador Visual e escolhi fachada ${parede.label} com telhado ${telhado.label}. Gostaria de receber orientação e orçamento para esta combinação.`;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent"><Home className="h-6 w-6" /></span>
          <div>
            <h3 className="text-xl font-extrabold text-primary">Provador Visual de Telhados</h3>
            <p className="text-sm text-muted-foreground">Combine acabamentos em uma maquete arquitetônica realista.</p>
          </div>
        </div>

        <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-xl bg-secondary">
          <img key={imagem} src={imagem} alt={`Fachada ${parede.label} com telhado ${telhado.label}`} loading="lazy" width={1280} height={800} className="h-full w-full object-cover transition-opacity duration-500" />
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-primary/85 px-3 py-1.5 text-xs font-bold text-primary-foreground backdrop-blur"><Check className="h-3.5 w-3.5" /> Visualização realista</span>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <fieldset>
            <legend className="text-xs font-bold tracking-[0.14em] text-primary/70 uppercase">Cor da fachada</legend>
            <div className="mt-3 flex flex-wrap gap-2">{PAREDES.map((p) => <button key={p.id} type="button" onClick={() => setParede(p)} aria-pressed={parede.id === p.id} className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-bold transition ${parede.id === p.id ? "border-accent bg-accent/10 text-accent" : "border-border text-primary/70 hover:border-accent"}`}><span className="h-4 w-4 rounded-full border border-border" style={{ backgroundColor: p.color }} />{p.label}</button>)}</div>
          </fieldset>
          <fieldset>
            <legend className="text-xs font-bold tracking-[0.14em] text-primary/70 uppercase">Tipo e textura da telha</legend>
            <div className="mt-3 flex flex-wrap gap-2">{TELHADOS.map((t) => <button key={t.id} type="button" onClick={() => setTelhado(t)} aria-pressed={telhado.id === t.id} className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-bold transition ${telhado.id === t.id ? "border-accent bg-accent/10 text-accent" : "border-border text-primary/70 hover:border-accent"}`}><span className="h-4 w-4 rounded-full border border-border" style={{ backgroundColor: t.color }} />{t.label}</button>)}</div>
          </fieldset>
        </div>
      </div>

      <footer className="border-t border-border bg-secondary/60 p-6 md:flex md:items-center md:justify-between md:gap-6 md:px-8">
        <div><p className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Resolução do Estilo</p><p className="mt-1 font-extrabold text-primary">Fachada {parede.label} + Telhado {telhado.label}</p></div>
        <Button asChild variant="whats" size="lg" className="mt-4 w-full md:mt-0 md:w-auto"><a href={waLink(mensagem)} target="_blank" rel="noopener noreferrer"><MessageCircle />Enviar Combinação Escolhida para o WhatsApp</a></Button>
      </footer>
    </div>
  );
}
