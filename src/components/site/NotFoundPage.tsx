import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Home, LayoutGrid } from "lucide-react";
import { RochaLogoHorizontal } from "./shared";

export function NotFoundPage() {
  useEffect(() => {
    document.title = "Página não encontrada | Rocha Telhas & Madeiras";
    return () => {
      document.title = "Rocha Telhas & Madeiras — Telhas, Madeiramento e Acessórios";
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center">
          <RochaLogoHorizontal className="h-20 w-auto sm:h-24" />
        </div>

        <p className="mt-10 text-[clamp(4rem,16vw,7rem)] font-black leading-none tracking-tight text-primary">
          404
        </p>
        <h1 className="mt-3 font-display text-2xl font-extrabold text-foreground sm:text-3xl">
          Página não encontrada
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground sm:text-base">
          O endereço que você acessou não existe ou foi movido. Confira o link
          ou continue navegando pelas opções abaixo.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90 sm:w-auto"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Voltar à Home
          </Link>
          <Link
            to="/catalogo"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:w-auto"
          >
            <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            Ver Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
