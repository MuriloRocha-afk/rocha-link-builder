import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type Avaliacao = {
  id: string;
  nota: number;
  comentario: string | null;
  created_at: string;
};

type Filtro = "todas" | "baixas" | "altas";

export const Route = createFileRoute("/_authenticated/admin/avaliacoes")({
  head: () => ({
    meta: [
      { title: "Avaliações recebidas — Rocha Telhas" },
      { name: "description", content: "Painel interno de avaliações dos clientes." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Avaliações recebidas — Rocha Telhas" },
      { property: "og:description", content: "Painel interno de avaliações dos clientes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminAvaliacoes,
});

function AdminAvaliacoes() {
  const [itens, setItens] = useState<Avaliacao[]>([]);
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    supabase
      .from("avaliacoes")
      .select("id, nota, comentario, created_at")
      .order("created_at", { ascending: false })
      .limit(500)
      .then(({ data, error }) => {
        if (!ativo) return;
        if (error) setErro("Não foi possível carregar as avaliações (acesso restrito a administradores).");
        else setItens((data ?? []) as Avaliacao[]);
        setCarregando(false);
      });
    return () => {
      ativo = false;
    };
  }, []);

  const visiveis = itens.filter((a) =>
    filtro === "todas" ? true : filtro === "baixas" ? a.nota <= 3 : a.nota >= 4,
  );

  const media =
    itens.length > 0 ? (itens.reduce((s, a) => s + a.nota, 0) / itens.length).toFixed(1) : "—";

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-extrabold text-primary">Avaliações recebidas</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {itens.length} avaliação(ões) · média {media}
      </p>

      <div className="mt-5 flex gap-2">
        {([
          ["todas", "Todas"],
          ["baixas", "Baixas (1–3)"],
          ["altas", "Altas (4–5)"],
        ] as const).map(([v, label]) => (
          <Button
            key={v}
            type="button"
            variant={filtro === v ? "default" : "outline"}
            size="sm"
            onClick={() => setFiltro(v)}
          >
            {label}
          </Button>
        ))}
      </div>

      {carregando ? (
        <p className="mt-8 text-sm text-muted-foreground">Carregando...</p>
      ) : erro ? (
        <p className="mt-8 text-sm font-semibold text-destructive">{erro}</p>
      ) : visiveis.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">Nenhuma avaliação nesta faixa.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {visiveis.map((a) => (
            <li key={a.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      className={`h-4 w-4 ${n <= a.nota ? "fill-accent text-accent" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(a.created_at).toLocaleString("pt-BR")}
                </span>
              </div>
              {a.comentario ? (
                <p className="mt-2 text-sm text-primary">{a.comentario}</p>
              ) : (
                <p className="mt-2 text-xs italic text-muted-foreground">Sem comentário</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
