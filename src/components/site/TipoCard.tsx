interface TipoCardProps {
  icone?: string;
  nome: string;
  descricao?: string;
  badge?: string;
  selected: boolean;
  onClick: () => void;
}

/**
 * Card reutilizável de seleção visual de tipo (Tipo de Chapa / Tipo de Peça).
 * Títulos quebram linha normalmente e o card tem altura mínima estável.
 */
export default function TipoCard({
  icone,
  nome,
  descricao,
  badge,
  selected,
  onClick,
}: TipoCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative flex min-h-[9.5rem] w-full min-w-0 flex-col items-center justify-start gap-2 overflow-hidden rounded-xl border p-4 pt-6 text-center transition-all duration-150
        ${selected
          ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200"
          : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50"
        }`}
    >
      {badge && (
        <span className="absolute left-1/2 top-1 max-w-[calc(100%-1rem)] -translate-x-1/2 truncate rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-bold leading-none text-white">
          {badge}
        </span>
      )}
      {icone && <span className="text-3xl leading-none">{icone}</span>}
      <span className="w-full min-w-0 whitespace-normal break-words text-sm font-semibold leading-snug text-gray-900">
        {nome}
      </span>
      {descricao && (
        <span className="w-full min-w-0 whitespace-normal break-words text-xs leading-tight text-gray-500">
          {descricao}
        </span>
      )}
    </button>
  );
}
