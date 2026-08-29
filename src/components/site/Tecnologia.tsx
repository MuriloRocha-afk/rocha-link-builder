import { Cog, ShieldCheck } from "lucide-react";
import { SectionHeading, WhatsAppButton } from "./shared";
import serraAsset from "@/assets/IMG_1499.jpg.asset.json";
import plainaAsset from "@/assets/IMG_1496.jpg.asset.json";

const serra = serraAsset.url;
const plaina = plainaAsset.url;

const ITEMS = [
  {
    icon: Cog,
    title: "Serras Automáticas de Alta Precisão",
    text: "Cortes rápidos e milimétricos em vigas, caibros e ripas, garantindo encaixe perfeito e menos desperdício na obra.",
  },
  {
    icon: Cog,
    title: "Plaina Dupla Face Industrial ",
    text: "Aparelhamento simultâneo das duas faces: madeira lisa, padronizada e pronta para envernizar direto no seu telhado.",
  },
  {
    icon: ShieldCheck,
    title: "Padronização e Segurança Industrial",
    text: "Processamento automatizado, sem imperfeições, com controle de bitola peça a peça e operação em ambiente industrial seguro.",
  },
];

export function Tecnologia() {
  return (
    <section id="tecnologia" className="surface-dark scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          invert
          kicker="Tecnologia & Precisão no Pátio"
          title="Tecnologia de Ponta e Precisão em Madeiramento"
          subtitle="Maquinário industrial moderno operando todos os dias para entregar madeira aparelhada com padrão de fábrica."
        />

        <div className="mt-14 grid w-full max-w-full items-center gap-10 lg:grid-cols-2">
          <div className="grid w-full max-w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <figure className="overflow-hidden rounded-3xl border border-primary-foreground/15 shadow-[var(--shadow-lift)]">
              <img
                src={serra}
                alt="Serra automática de alta precisão cortando madeira no pátio da Rocha Telhas"
                loading="lazy"
                width={1024}
                height={768}
                className="aspect-[4/3] w-full object-cover"
              />
            </figure>
            <figure className="overflow-hidden rounded-3xl border border-primary-foreground/15 shadow-[var(--shadow-lift)]">
              <img
                src={plaina}
                alt="Plaina dupla face industrial aparelhando pranchas de madeira"
                loading="lazy"
                width={1024}
                height={768}
                className="aspect-[4/3] w-full object-cover"
              />
            </figure>
          </div>

          <div>
            <ul className="space-y-5">
              {ITEMS.map((i) => (
                <li
                  key={i.title}
                  className="flex gap-4 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <i.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold text-primary-foreground">{i.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                      {i.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <WhatsAppButton
                className="w-full sm:w-auto"
                message="Olá! Gostaria de solicitar madeira aparelhada sob medida na Rocha Telhas."
              >
                Solicitar Madeira Aparelhada Sob Medida
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CtaFinal() {
  return (
    <section id="contato" className="scroll-mt-24 bg-background py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="relative overflow-hidden rounded-3xl surface-dark px-6 py-16 text-center shadow-[var(--shadow-lift)] md:px-16">
          <span className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-accent/25 blur-3xl" />
          <h2 className="relative text-3xl font-extrabold text-primary-foreground md:text-5xl">
            Faça seu orçamento sem sair de casa!
          </h2>
          <p className="relative mx-auto mt-5 max-w-2xl text-base text-primary-foreground/80 md:text-lg">
            Envie sua lista de materiais ou projeto da cobertura e receba a cotação detalhada direto
            no seu WhatsApp.
          </p>
          <div className="relative mt-9 flex justify-center">
            <WhatsAppButton message="Olá! Quero solicitar um orçamento sem sair de casa. Vou enviar a minha lista de materiais.">
              Solicitar Orçamento sem Sair de Casa
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
