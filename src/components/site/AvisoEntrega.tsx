import { Truck } from "lucide-react";

export function AvisoEntrega() {
  return (
    <section className="bg-background pb-24">
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex flex-col gap-5 rounded-2xl border-2 border-accent bg-accent/8 p-7 shadow-[var(--shadow-card)] md:flex-row md:p-9">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Truck className="h-7 w-7" />
          </span>
          <div>
            <h2 className="text-xl font-extrabold text-primary md:text-2xl">
              📦 Informação Importante sobre Entregas
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80 md:text-base">
              Para a segurança da nossa equipe e eficiência nas entregas, informamos que o
              descarregamento é realizado exclusivamente na frente do imóvel/endereço acordado
              (nível do solo / térreo). Nossos colaboradores não realizam transporte manual interno,
              subida de escadas, elevadores ou rampas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
