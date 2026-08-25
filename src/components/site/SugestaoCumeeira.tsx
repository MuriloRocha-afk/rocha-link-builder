import { ArrowRight, Triangle } from "lucide-react";
import { cumeeiraCompativel, linkCumeeira } from "@/data/configs/cumeeiras";

type Props = {
  /** material da telha: PVC, Fibrocimento, Concreto, Esmaltada, Barro */
  material: string;
  /** cor selecionada da telha, quando houver */
  cor?: string | null;
  peca?: string;
  titulo?: string;
};

/** Cartão "Complete sua cobertura" com link para a cumeeira do mesmo material. */
export default function SugestaoCumeeira({ material, cor, peca = "Cumeeira", titulo }: Props) {
  const compat = cumeeiraCompativel(material, cor ?? undefined);
  if (!compat) return null;

  const href = linkCumeeira({ peca, material: compat.material, cor: compat.cor });
  const descricao = compat.cor
    ? `Cumeeira ${compat.material} na mesma cor (${compat.cor}) para arrematar o cumeamento.`
    : `Cumeeira ${compat.material} compatível para arrematar o cumeamento.`;

  return (
    <section className="rounded-2xl border border-orange-200 bg-orange-50 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
          <Triangle size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold tracking-widest text-orange-600 uppercase">
            {titulo ?? "Complete sua cobertura"}
          </p>
          <h3 className="mt-0.5 text-sm font-bold text-gray-900">
            Você também vai precisar de cumeeira
          </h3>
          <p className="mt-1 text-xs text-gray-600">{descricao}</p>
          <a
            href={href}
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-orange-600"
          >
            Ver cumeeiras {compat.material}
            {compat.cor ? ` — ${compat.cor}` : ""} <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
