import { useState } from "react";
import { MessageCircle, RotateCcw } from "lucide-react";
import { waLink } from "@/constants/whatsapp";

type Problema = { id: string; emoji: string; label: string; causa: string; solucao: string[] };

const PROBLEMAS: Problema[] = [
  {
    id: "goteira",
    emoji: "💧",
    label: "Goteira / Infiltração",
    causa:
      "Geralmente vem de rufo mal vedado, cumeeira ou água-furtada com vedação comprometida, ou telha instalada com inclinação abaixo do mínimo recomendado.",
    solucao: ["Manta Asfáltica Autoadesiva", "PU para calha/rufo", "Revisão da vedação nos encontros do telhado"],
  },
  {
    id: "calor",
    emoji: "🔥",
    label: "Calor excessivo no ambiente",
    causa:
      "Normalmente é falta de manta térmica/subcobertura, ou telha de baixo conforto térmico sem isolamento complementar.",
    solucao: ["Manta Térmica/Subcobertura", "Ventilação de cumeeira (se aplicável)"],
  },
  {
    id: "trincada",
    emoji: "🔨",
    label: "Telha trincada ou quebrada",
    causa:
      "Costuma ser impacto, pisoteio incorreto durante manutenção, ou telha com vida útil vencida.",
    solucao: [
      "Reposição pontual das telhas afetadas (mesma linha/modelo, se possível)",
      "Orientação de como pisar corretamente na manutenção",
    ],
  },
  {
    id: "cupim",
    emoji: "🐛",
    label: "Madeira com cupim ou empenada",
    causa:
      "Pode ser falta de tratamento preventivo, umidade excessiva na estrutura, ou madeira não apropriada para a aplicação.",
    solucao: ["Cupicida (tipo Sayerlack)", "Avaliação da peça para troca se o dano for estrutural"],
  },
];

export function SosTelhado() {
  const [sel, setSel] = useState<Problema | null>(null);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold text-primary">SOS Telhado</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {sel ? "Passo 2 de 2 — diagnóstico e solução sugerida." : "Passo 1 de 2 — qual é o problema?"}
          </p>
        </div>
        {sel ? (
          <button type="button" onClick={() => setSel(null)} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-600 hover:text-orange-600">
            <RotateCcw size={14} /> Trocar problema
          </button>
        ) : null}
      </div>

      {!sel ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {PROBLEMAS.map((p) => (
            <button key={p.id} type="button" onClick={() => setSel(p)} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-orange-400 hover:shadow-sm">
              <span className="text-2xl" aria-hidden>{p.emoji}</span>
              <span className="text-sm font-bold text-primary">{p.label}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-orange-300 bg-orange-50 p-5">
          <p className="text-xl font-extrabold text-primary">{sel.emoji} {sel.label}</p>
          <p className="mt-4 text-xs font-extrabold tracking-wider text-orange-700 uppercase">Causa provável</p>
          <p className="mt-1 text-sm text-muted-foreground">{sel.causa}</p>
          <p className="mt-4 text-xs font-extrabold tracking-wider text-orange-700 uppercase">Solução sugerida</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-primary">
            {sel.solucao.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <a
            href={waLink(`Olá! Usei o SOS Telhado do site e identifiquei:\n\n${sel.emoji} ${sel.label}\n\nGostaria de um orçamento para o reparo.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-extrabold text-white hover:opacity-90"
          >
            <MessageCircle size={16} /> Cotar esse reparo no WhatsApp
          </a>
        </div>
      )}

      <p className="mt-4 text-[11px] text-muted-foreground">
        Diagnóstico orientativo. A causa exata é confirmada pela nossa equipe na visita/avaliação.
      </p>
    </div>
  );
}

export default SosTelhado;
