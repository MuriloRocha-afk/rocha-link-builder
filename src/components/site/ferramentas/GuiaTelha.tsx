import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, RotateCcw } from "lucide-react";
import { BotaoCotarWhatsApp } from "@/components/site/BotaoCotarWhatsApp";

type Peso = Partial<Record<TelhaId, number>>;
type TelhaId =
  | "fibrocimento"
  | "colonial-pvc"
  | "ceramica"
  | "concreto"
  | "esmaltada"
  | "policarbonato";

type Opcao = { value: string; label: string; hint?: string; pesos: Peso };
type Pergunta = { id: string; titulo: string; ajuda: string; opcoes: Opcao[] };

const TELHAS: Record<
  TelhaId,
  { nome: string; slug: string; resumo: string; destaque: string }
> = {
  fibrocimento: {
    nome: "Telha de Fibrocimento",
    slug: "fibrocimento",
    resumo:
      "Custo-benefício imbatível, cobre grandes vãos com pouca estrutura e instalação rápida.",
    destaque: "Campeã de vendas",
  },
  "colonial-pvc": {
    nome: "Telha Colonial PVC",
    slug: "colonial-pvc",
    resumo:
      "Leve, não absorve água, não desbota fácil e tem o visual de cerâmica com muito menos peso.",
    destaque: "Estética + leveza",
  },
  ceramica: {
    nome: "Telha Cerâmica (Barro)",
    slug: "ceramica",
    resumo:
      "Visual tradicional, ótimo conforto térmico e altíssima durabilidade — pede estrutura reforçada.",
    destaque: "Clássica",
  },
  concreto: {
    nome: "Telha de Concreto",
    slug: "concreto",
    resumo:
      "Muito resistente a vento e granizo, encaixe preciso e acabamento uniforme em telhados grandes.",
    destaque: "Robustez",
  },
  esmaltada: {
    nome: "Telha Esmaltada",
    slug: "esmaltada",
    resumo:
      "Vitrificada, com cores vivas e superfície impermeável — o acabamento mais sofisticado da linha.",
    destaque: "Premium",
  },
  policarbonato: {
    nome: "Telha de Policarbonato",
    slug: "policarbonato",
    resumo:
      "Translúcida, ideal para iluminar áreas externas, corredores e coberturas de garagem.",
    destaque: "Área externa",
  },
};

const PERGUNTAS: Pergunta[] = [
  {
    id: "uso",
    titulo: "Qual é o uso do imóvel?",
    ajuda: "Cada tipo de obra pede um comportamento diferente da cobertura.",
    opcoes: [
      {
        value: "residencia",
        label: "Casa / residência",
        hint: "Moradia, sobrado, edícula",
        pesos: { ceramica: 3, "colonial-pvc": 3, concreto: 2, fibrocimento: 1, esmaltada: 2 },
      },
      {
        value: "galpao",
        label: "Galpão / comercial",
        hint: "Grandes vãos, depósito, oficina",
        pesos: { fibrocimento: 4, concreto: 1, policarbonato: 1 },
      },
      {
        value: "area-externa",
        label: "Área externa / garagem",
        hint: "Varanda, quintal, corredor lateral",
        pesos: { policarbonato: 4, "colonial-pvc": 2, fibrocimento: 2 },
      },
      {
        value: "reforma",
        label: "Reforma de telhado antigo",
        hint: "Troca sobre estrutura já existente",
        pesos: { "colonial-pvc": 3, fibrocimento: 3, esmaltada: 1 },
      },
    ],
  },
  {
    id: "orcamento",
    titulo: "Qual é a prioridade de orçamento?",
    ajuda: "Isso pesa bastante na escolha entre telha leve e telha cerâmica.",
    opcoes: [
      {
        value: "economico",
        label: "O mais econômico possível",
        pesos: { fibrocimento: 4, "colonial-pvc": 1 },
      },
      {
        value: "equilibrado",
        label: "Equilíbrio entre preço e acabamento",
        pesos: { "colonial-pvc": 3, ceramica: 2, concreto: 2, fibrocimento: 1 },
      },
      {
        value: "acabamento",
        label: "Quero o melhor acabamento",
        pesos: { esmaltada: 4, ceramica: 3, "colonial-pvc": 2, concreto: 1 },
      },
    ],
  },
  {
    id: "clima",
    titulo: "Como é o clima / exposição da região?",
    ajuda: "Chuva forte, sol intenso e maresia mudam a recomendação.",
    opcoes: [
      {
        value: "chuva",
        label: "Chuva e vento fortes",
        pesos: { concreto: 3, ceramica: 2, fibrocimento: 2, esmaltada: 1 },
      },
      {
        value: "calor",
        label: "Sol e calor intensos",
        hint: "Prioridade em conforto térmico",
        pesos: { ceramica: 3, "colonial-pvc": 3, concreto: 1 },
      },
      {
        value: "litoral",
        label: "Litoral / maresia",
        pesos: { "colonial-pvc": 4, esmaltada: 2, ceramica: 1 },
      },
      {
        value: "ameno",
        label: "Clima ameno, sem extremos",
        pesos: { fibrocimento: 2, "colonial-pvc": 2, ceramica: 2 },
      },
    ],
  },
  {
    id: "estetica",
    titulo: "O que você espera na aparência?",
    ajuda: "A telha aparece de rua? Isso muda muito a escolha.",
    opcoes: [
      {
        value: "aparente",
        label: "Telhado aparente, precisa ser bonito",
        pesos: { ceramica: 3, "colonial-pvc": 3, esmaltada: 3, concreto: 2 },
      },
      {
        value: "discreto",
        label: "Discreto, escondido por platibanda",
        pesos: { fibrocimento: 4, "colonial-pvc": 1 },
      },
      {
        value: "luz",
        label: "Preciso de entrada de luz natural",
        pesos: { policarbonato: 5 },
      },
      {
        value: "indiferente",
        label: "Tanto faz, quero o mais funcional",
        pesos: { fibrocimento: 2, concreto: 1, "colonial-pvc": 1 },
      },
    ],
  },
];

export function GuiaTelha() {
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, string>>({});

  const finalizado = passo >= PERGUNTAS.length;

  const ranking = useMemo(() => {
    const scores: Record<string, number> = {};
    for (const p of PERGUNTAS) {
      const escolha = respostas[p.id];
      const op = p.opcoes.find((o) => o.value === escolha);
      if (!op) continue;
      for (const [id, peso] of Object.entries(op.pesos)) {
        scores[id] = (scores[id] ?? 0) + (peso ?? 0);
      }
    }
    return (Object.entries(scores) as [TelhaId, number][])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);
  }, [respostas]);

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
              ? "Com base nas suas respostas, essas são as melhores opções do nosso catálogo."
              : `Pergunta ${passo + 1} de ${PERGUNTAS.length} — leva menos de 1 minuto.`}
          </p>
        </div>
        {Object.keys(respostas).length > 0 ? (
          <button
            type="button"
            onClick={reiniciar}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-600 hover:text-orange-600"
          >
            <RotateCcw size={14} />
            Refazer
          </button>
        ) : null}
      </div>

      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-orange-500 transition-all"
          style={{ width: `${(Math.min(passo, PERGUNTAS.length) / PERGUNTAS.length) * 100}%` }}
        />
      </div>

      {!finalizado && pergunta ? (
        <div>
          <p className="text-base font-bold text-primary">{pergunta.titulo}</p>
          <p className="mt-1 text-xs text-muted-foreground">{pergunta.ajuda}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {pergunta.opcoes.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => responder(pergunta.id, o.value)}
                className="rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-orange-400 hover:shadow-sm"
              >
                <span className="block text-sm font-bold text-primary">{o.label}</span>
                {o.hint ? (
                  <span className="mt-1 block text-xs text-muted-foreground">{o.hint}</span>
                ) : null}
              </button>
            ))}
          </div>
          {passo > 0 ? (
            <button
              type="button"
              onClick={() => setPasso((p) => p - 1)}
              className="mt-4 text-xs font-bold text-gray-500 hover:text-orange-600"
            >
              ← Voltar
            </button>
          ) : null}
        </div>
      ) : null}

      {finalizado ? (
        <div className="grid gap-3">
          {ranking.map(([id], i) => {
            const t = TELHAS[id];
            if (!t) return null;
            return (
              <div
                key={id}
                className={`rounded-2xl border p-5 ${
                  i === 0 ? "border-orange-300 bg-orange-50" : "border-gray-200 bg-white"
                }`}
              >
                <span className="inline-flex rounded-full bg-orange-600 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-white uppercase">
                  {i === 0 ? "Melhor escolha" : "Alternativa"}
                </span>
                <p className="mt-3 text-lg font-extrabold text-primary">{t.nome}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.resumo}</p>
                <Link
                  to="/catalogo/$categoriaSlug/$produtoSlug"
                  params={{ categoriaSlug: "telhas", produtoSlug: t.slug }}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white transition-colors hover:bg-orange-700"
                >
                  Ver ficha da {t.nome}
                  <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}

          <div className="mt-2">
            <BotaoCotarWhatsApp
              nomeProduto="Guia: qual telha escolher"
              tipo="calculadora"
              corpoMensagem={[
                "*GUIA — QUAL TELHA ESCOLHER*",
                "",
                "*Minhas respostas:*",
                ...PERGUNTAS.map((p) => {
                  const op = p.opcoes.find((o) => o.value === respostas[p.id]);
                  return `• ${p.titulo} ${op?.label ?? "-"}`;
                }),
                "",
                "*Recomendação do site:*",
                ...ranking.map(([id], i) => `${i + 1}. ${TELHAS[id]?.nome ?? id}`),
                "",
                "Gostaria de confirmar com um vendedor a melhor opção para a minha obra.",
              ].join("\n")}
            >
              Confirmar com um vendedor
            </BotaoCotarWhatsApp>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default GuiaTelha;
