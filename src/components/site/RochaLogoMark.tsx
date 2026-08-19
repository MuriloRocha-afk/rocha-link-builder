type RochaLogoMarkProps = {
  className?: string;
  invert?: boolean;
};

export function RochaLogoMark({ className, invert = false }: RochaLogoMarkProps) {
  const textColor = invert ? "text-primary-foreground" : "text-primary";
  const accentColor = invert ? "text-accent" : "text-accent";

  return (
    <div className={`inline-flex items-center gap-2 md:gap-3 ${className}`}>
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="16"
          width="38"
          height="24"
          rx="4"
          fill="var(--primary)"
        />
        <path
          d="M3 18L22 5L41 18"
          fill="var(--accent)"
        />
        <path
          d="M8 28H18M8 34H18M26 28H36M26 34H36"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>

      <div className="flex flex-col leading-[0.92]">
        <span
          className={`font-display text-[0.58em] font-extrabold tracking-tight ${textColor}`}
        >
          ROCHA
        </span>
        <span
          className={`font-body text-[0.40em] font-bold tracking-[0.10em] uppercase ${accentColor}`}
        >
          Telhas & Madeiras
        </span>
      </div>
    </div>
  );
}

export default RochaLogoMark;
