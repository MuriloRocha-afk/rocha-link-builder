import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acesso interno — Rocha Telhas" },
      { name: "description", content: "Área restrita da equipe Rocha Telhas." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Acesso interno — Rocha Telhas" },
      { property: "og:description", content: "Área restrita da equipe Rocha Telhas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    setCarregando(false);
    if (error) {
      setErro("E-mail ou senha inválidos.");
      return;
    }
    void navigate({ to: "/admin/avaliacoes" });
  };

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <h1 className="text-2xl font-extrabold text-primary">Acesso interno</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Área restrita à equipe Rocha Telhas.
      </p>
      <form onSubmit={entrar} className="mt-6 space-y-4">
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="senha">Senha</Label>
          <Input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="mt-1.5"
          />
        </div>
        {erro ? <p className="text-sm font-semibold text-destructive">{erro}</p> : null}
        <Button type="submit" size="lg" className="w-full" disabled={carregando}>
          {carregando ? "ENTRANDO..." : "ENTRAR"}
        </Button>
      </form>
    </main>
  );
}
