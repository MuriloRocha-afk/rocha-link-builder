import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink, WHATSAPP_NUMBER } from "@/constants/whatsapp";
import { RochaLogoMark } from "./RochaLogoMark";

export { waLink, WHATSAPP_NUMBER };

export const CONTATO = {
  address: "R. Dr. Hamilton Prado, 856 — Centro, Franco da Rocha / SP · CEP 07849-070",
  hours: "Segunda a Sexta: 08h00 às 18h00 · Sábado: 08h00 às 13h00",
  phone: "(11) 97176-1003 — WhatsApp comercial",
  map: "https://www.google.com/maps?q=R.+Dr.+Hamilton+Prado,+856+-+Centro,+Franco+da+Rocha+-+SP,+07849-070&output=embed",
};

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

export function Logo({
  size = "lg",
  invert = false,
}: {
  size?: "md" | "lg";
  invert?: boolean;
}) {
  const heightClass = size === "lg" ? "h-16 md:h-20" : "h-12 md:h-14";
  return (
    <RochaLogoMark invert={invert} className={`w-auto ${heightClass}`} />
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
