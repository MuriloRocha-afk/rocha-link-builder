import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WHATSAPP_NUMBER = "5511999999999";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function WhatsAppButton({
  message,
  children,
  size = "xl",
  className,
}: {
  message: string;
  children: React.ReactNode;
  size?: "default" | "sm" | "lg" | "xl";
  className?: string;
}) {
  return (
    <Button asChild variant="whats" size={size} className={className}>
      <a href={waLink(message)} target="_blank" rel="noopener noreferrer">
        <MessageCircle />
        {children}
      </a>
    </Button>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-[var(--shadow-card)]">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <path
            d="M2 11 12 4l10 7"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.5 13.5 12 8.5l7.5 5M4.5 17.5 12 12.5l7.5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.75"
          />
        </svg>
      </span>
      <span className="font-display text-xl leading-none font-extrabold tracking-tight">
        <span className="text-accent">ROCHA</span>
        <span className={compact ? "text-primary-foreground" : "text-primary"}> TELHAS</span>
        <span className="mt-0.5 block text-[10px] font-semibold tracking-[0.22em] text-muted-foreground">
          DESDE 1998
        </span>
      </span>
    </span>
  );
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  invert = false,
}: {
  kicker: string;
  title: React.ReactNode;
  subtitle?: string;
  invert?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-bold tracking-[0.18em] text-accent uppercase">
        {kicker}
      </span>
      <h2
        className={`mt-5 text-3xl font-extrabold md:text-5xl ${invert ? "text-primary-foreground" : "text-primary"}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-base md:text-lg ${invert ? "text-primary-foreground/75" : "text-muted-foreground"}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
