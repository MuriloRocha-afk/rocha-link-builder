import { useState } from "react";
import { Check, Copy, ExternalLink, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const GOOGLE_REVIEW_URL = "https://g.page/r/CZRu6Jx_e0XyEBE/review";

const SUGESTOES = [
  "Gostei da funcionalidade do site.",
  "Recebi meu orçamento de forma rápida.",
  "Calculadora super útil.",
];

function Estrelas({
  nota,
  onSelect,
}: {
  nota: number;
  onSelect: (n: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center justify-center gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const ativa = n <= (hover || nota);
        return (
          <button
            key={n}
            type="button"
            aria-label={`${n} estrela${n > 1 ? "s" : ""}`}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onSelect(n)}
            className="p-1 transition-transform hover:scale-110"
          >
            <Star
              className={`h-8 w-8 ${ativa ? "fill-accent text-accent" : "text-muted-foreground/40"}`}
            />
          </button>
        );
      })}
    </div>
  );
}

function Sugestoes({ onUse }: { onUse: (texto: string) => void }) {
  const [copiada, setCopiada] = useState<string | null>(null);
  return (
    <div className="mt-3 space-y-2">
      <p className="text-xs font-semibold text-muted-foreground">
        Clique para copiar e usar uma mensagem pronta:
      </p>
      {SUGESTOES.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => {
            onUse(s);
            navigator.clipboard?.writeText(s).catch(() => undefined);
            setCopiada(s);
            setTimeout(() => setCopiada(null), 1800);
          }}
          className="flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-card px-3 py-2 text-left text-xs font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
        >
          <span>{s}</span>
          {copiada === s ? (
            <Check className="h-3.5 w-3.5 shrink-0 text-green-600" />
          ) : (
            <Copy className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          )}
        </button>
      ))}
    </div>
  );
}

export function AvaliacaoModal({ onClose }: { onClose: () => void }) {
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [mostrarTexto, setMostrarTexto] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [avaliacaoId, setAvaliacaoId] = useState<string | null>(null);

  const salvar = async (novaNota: number, texto: string) => {
    setSalvando(true);
    try {
      if (avaliacaoId) {
        await supabase
          .from("avaliacoes")
          .update({ nota: novaNota, comentario: texto.trim() || null })
          .eq("id", avaliacaoId);
      } else {
        const { data } = await supabase
          .from("avaliacoes")
          .insert({ nota: novaNota, comentario: texto.trim() || null, origem: "carrinho" })
          .select("id")
          .maybeSingle();
        if (data?.id) setAvaliacaoId(data.id);
      }
    } catch {
      /* ignore */
    } finally {
      setSalvando(false);
    }
  };

  const escolherNota = (n: number) => {
    setNota(n);
    void salvar(n, comentario);
  };

  const enviarComentario = async () => {
    if (!nota) return;
    await salvar(nota, comentario);
    setEnviado(true);
  };

  const positiva = nota >= 4;

  return (
    <div className="absolute inset-0 z-[60] flex flex-col overflow-y-auto bg-background/98 px-6 py-8">
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar avaliação"
        className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-primary"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="my-auto text-center">
        <h3 className="text-lg font-extrabold text-primary">
          Orçamento enviado! Como foi sua experiência?
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Sua nota leva 5 segundos e nos ajuda muito.
        </p>

        <div className="mt-5">
          <Estrelas nota={nota} onSelect={escolherNota} />
        </div>

        {nota === 0 ? (
          <button
            type="button"
            onClick={onClose}
            className="mt-6 text-xs font-semibold text-muted-foreground underline-offset-2 hover:text-primary hover:underline"
          >
            Deixar para depois
          </button>
        ) : null}

        {nota > 0 && !enviado ? (
          <div className="mt-5 text-left">
            {positiva ? (
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-bold text-primary">
                  Obrigado pela nota {nota} de 5!
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Que tal repetir essa avaliação no Google? Leva menos de um minuto e fortalece
                  muito a nossa loja.
                </p>
                <Button asChild size="lg" className="mt-3 w-full">
                  <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
                    <ExternalLink />
                    AVALIAR NO GOOGLE
                  </a>
                </Button>
                <Sugestoes onUse={(t) => setComentario((c) => (c ? c : t))} />
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-bold text-primary">O que podemos melhorar?</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Sua resposta vai direto para a nossa equipe (opcional).
                </p>
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  maxLength={2000}
                  rows={4}
                  placeholder="Conte o que não funcionou bem..."
                  className="mt-3 w-full rounded-lg border border-border bg-background p-3 text-sm text-primary"
                />
                <Button
                  type="button"
                  size="lg"
                  className="mt-3 w-full"
                  disabled={salvando}
                  onClick={enviarComentario}
                >
                  ENVIAR RESPOSTA
                </Button>
              </div>
            )}

            {positiva ? (
              <div className="mt-4">
                {mostrarTexto ? (
                  <>
                    <textarea
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      maxLength={2000}
                      rows={4}
                      placeholder="Conte como foi sua experiência..."
                      className="w-full rounded-lg border border-border bg-background p-3 text-sm text-primary"
                    />
                    <Sugestoes onUse={(t) => setComentario(t)} />
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="mt-3 w-full"
                      disabled={salvando}
                      onClick={enviarComentario}
                    >
                      ENVIAR AVALIAÇÃO
                    </Button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setMostrarTexto(true)}
                    className="text-xs font-semibold text-muted-foreground underline-offset-2 hover:text-primary hover:underline"
                  >
                    Quer contar mais?
                  </button>
                )}
              </div>
            ) : null}

            <button
              type="button"
              onClick={onClose}
              className="mt-4 block w-full text-center text-xs font-semibold text-muted-foreground hover:text-primary"
            >
              Fechar
            </button>
          </div>
        ) : null}

        {enviado ? (
          <div className="mt-6">
            <p className="text-sm font-bold text-primary">Avaliação registrada. Obrigado!</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 text-xs font-semibold text-muted-foreground hover:text-primary"
            >
              Fechar
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
