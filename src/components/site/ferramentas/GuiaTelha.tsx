import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, RotateCcw } from "lucide-react";
import { waLink } from "@/constants/whatsapp";

type Opcao = { value: string; label: string; hint?: string };
type Pergunta = { id: "uso" | "prioridade" | "inclinacao" | "clima"; titulo: string; ajuda: string; opcoes: Opcao[] };
type Resultado = { nome: string; porque: string; to: string; params?: Record<string, string> };

const PERGUNTAS: Pergunta[] = [
  {
    id: "uso",
    titulo: "Qual é o uso do imóvel?",
    ajuda: "Cada tipo de obra pede um comportamento diferente da cobertura.",
    opcoes: [
      { value: "residencia", label: "Casa / residência", hint: "Moradia, sobrado, edícula" },
      { value: "galpao", label: "Galpão / comercial", hint: "Grandes vãos, depósito, oficina" },
      { value: "area-externa", label: "Área externa / garagem", hint: "Varanda, quintal, corredor lateral" },
      { value: "reforma", label: "Reforma de telhado antigo", hint: "Troca sobre estrutura já existente" },
    ],
  },
  {
    id: "prioridade",
    titulo: "Qual sua prioridade?",
    ajuda: "O que mais pesa na sua decisão.",
    opcoes: [
      { value: "economia", label: "Economia", hint: "Menor custo possível" },
      { value: "durabilidade", label: "Durabilidade", hint: "Quero que dure décadas" },
      { value: "estetica", label: "Estética", hint: "Aparência é importante" },
      { value: "leveza", label: "Leveza", hint: "Estrutura não aguenta peso extra" },
    ],
  },
  {
    id: "inclinacao",
    titulo: "Qual a inclinação do telhado?",
    ajuda: "Cada telha exige uma inclinação mínima para funcionar bem.",
    opcoes: [
      { value: "nao-sei", label: "Ainda não sei", hint: "Telhado será construído do zero" },
      { value: "baixa", label: "Inclinação baixa", hint: "Telhado mais \"deitado\"" },
      { value: "alta", label: "Inclinação alta", hint: "Telhado mais \"em pé\"" },
    ],
  },
  {
    id: "clima",
    titulo: "Como é a região/clima do local?",
    ajuda: "Ajuda a ajustar a recomendação de conforto e vedação.",
    opcoes: [
      { value: "chuva", label: "Chuva forte e frequente" },
      { value: "sol", label: "Muito sol/calor na maior parte do ano" },
      { value: "ameno", label: "Clima ameno, sem extremos" },
    ],
  },
];

const FIBRO: Resultado = {
  nome: "Telha de Fibrocimento",
  porque: "Ótimo custo-benefício, é leve para a estrutura e cobre grandes vãos com instalação rápida.",
  to: "/catalogo/$categoriaSlug/$produtoSlug",
  params: { categoriaSlug: "telhas", produtoSlug: "telha-fibrocimento-infibra" },
};
const PVC: Resultado = {
  nome: "Telha PVC (Colonial ou Plan)",
  porque: "Muito leve, de baixa manutenção e funciona em inclinações baixas — econômica sem sobrecarregar a estrutura.",
  to: "/catalogo/$categoriaSlug/$produtoSlug",
  params: { categoriaSlug: "telhas", produtoSlug: "telha-pvc-colonial" },
};
const CERAMICA: Resultado = {
  nome: "Telha Cerâmica ou Esmaltada",
  porque: "Visual bonito e altíssima durabilidade, com ótimo conforto térmico em telhados mais inclinados.",
  to: "/catalogo/$categoriaSlug/$produtoSlug",
  params: { categoriaSlug: "telhas", produtoSlug: "telhas-ceramicas-tradicionais" },
};
const CONCRETO: Resultado = {
  nome: "Telha de Concreto (Eurotop)",
  porque: "Robusta e durável por décadas, com encaixe preciso e baixa manutenção.",
  to: "/catalogo/telhas/concreto",
};

function recomendar(r: Record<string, string>): Resultado {
  const { uso, prioridade, inclinacao } = r;
  if (uso === "reforma") {
    const base = prioridade === "economia" || prioridade === "durabilidade" ? FIBRO : PVC;
    return { ...base, porque: `${base.porque} Por ser leve, é mais fácil de instalar sobre a estrutura existente.` };
  }
  if (uso === "galpao") return FIBRO;
  if (prioridade === "estetica" || prioridade === "durabilidade") {
    if (inclinacao === "alta") return CERAMICA;
    if (prioridade === "durabilidade") return CONCRETO;
    return inclinacao === "baixa" ? PVC : CERAMICA;
  }
  return PVC;
}

const DICA_CLIMA: Record<string, string> = {
  chuva: "Com chuva forte, capriche no recobrimento, nas cumeeiras e nos rufos.",
  sol: "Com muito sol, uma manta térmica sob as telhas melhora bastante o conforto.",
  ameno: "",
};

export function GuiaTelha() {
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const finalizado = passo >= PERGUNTAS.length;
  const resultado = useMemo(() => (finalizado ? recomendar(respostas) : null), [finalizado, respostas]);
  const label = (id: string) =>
    PERGUNTAS.find((p) => p.id === id)?.opcoes.find((o) => o.value === respostas[id])?.label.toLowerCase() ?? "-";

  function responder(perguntaId: string, valor: string) {
    setRespostas((r) => ({ ...r, [perguntaId]: valor }));
    setPasso((p) => p + 1);
  }
  function reiniciar() {
    setRespostas({});
    setPasso(0);
  }
  const pergunta = PERGUNTAS[passo];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold text-primary">Qual telha escolher?</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {finalizado
              ? "Com base nas suas respostas, esta é a nossa recomendação."
              : `Pergunta ${passo + 1} de ${PERGUNTAS.length} — leva menos de 1 minuto.`}
          </p>
        </div>
        {Object.keys(respostas).length > 0 ? (
          <button type="button" onClick={reiniciar} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-600 hover:text-orange-600">
            <RotateCcw size={14} />
            Refazer
          </button>
        ) : null}
      </div>

      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div className="h-full rounded-full bg-orange-500 transition-all" style={{ width: `${(Math.min(passo, PERGUNTAS.length) / PERGUNTAS.length) * 100}%` }} />
      </div>

      {!finalizado && pergunta ? (
        <div>
          <p className="text-base font-bold text-primary">{pergunta.titulo}</p>
          <p className="mt-1 text-xs text-muted-foreground">{pergunta.ajuda}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {pergunta.opcoes.map((o) => (
              <button key={o.value} type="button" onClick={() => responder(pergunta.id, o.value)} className="rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-orange-400 hover:shadow-sm">
                <span className="block text-sm font-bold text-primary">{o.label}</span>
                {o.hint ? <span className="mt-1 block text-xs text-muted-foreground">{o.hint}</span> : null}
              </button>
            ))}
          </div>
          {passo > 0 ? (
            <button type="button" onClick={() => setPasso((p) => p - 1)} className="mt-4 text-xs font-bold text-gray-500 hover:text-orange-600">
              ← Voltar
            </button>
          ) : null}
        </div>
      ) : null}

      {finalizado && resultado ? (
        <div className="rounded-2xl border border-orange-300 bg-orange-50 p-5">
          <span className="inline-flex rounded-full bg-orange-600 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-white uppercase">Recomendada para você</span>
          <p className="mt-3 text-xl font-extrabold text-primary">{resultado.nome}</p>
          <p className="mt-1 text-sm text-muted-foreground">{resultado.porque}</p>
          {DICA_CLIMA[respostas.clima] ? <p className="mt-2 text-xs text-muted-foreground">💡 {DICA_CLIMA[respostas.clima]}</p> : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to={resultado.to} params={resultado.params} className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-orange-700">
              Ver no catálogo <ArrowRight size={16} />
            </Link>
            <a href={waLink(`Olá! Fiz o quiz do site: preciso de telha para ${label("uso")}, prioridade ${label("prioridade")}, gostaria de orçamento. (Recomendação: ${resultado.nome})`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-extrabold text-white hover:opacity-90">
              <MessageCircle size={16} /> Falar no WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default GuiaTelha;
