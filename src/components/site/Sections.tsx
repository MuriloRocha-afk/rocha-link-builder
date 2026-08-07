import Autoplay from "embla-carousel-autoplay";
import { Star, MapPin, Clock, Phone, Play } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CONTATO, SectionHeading, WhatsAppButton } from "./shared";
import acao1 from "@/assets/acao-1.jpg";
import acao2 from "@/assets/acao-2.jpg";
import acao3 from "@/assets/acao-3.jpg";
import acao4 from "@/assets/acao-4.jpg";

const GALLERY = [
  {
    src: acao1,
    alt: "Carregamento de madeira no pátio da Rocha Telhas",
    label: "Pátio logístico",
    tag: "Bastidores",
  },
  {
    src: acao2,
    alt: "Telhado residencial finalizado com telha colonial",
    label: "Obra entregue",
    tag: "Antes & depois",
  },
  {
    src: acao3,
    alt: "Galpão de estocagem de madeira tratada",
    label: "Estoque coberto",
    tag: "Tour da loja",
  },
  {
    src: acao4,
    alt: "Estrutura de madeiramento de galpão industrial",
    label: "Grande porte",
    tag: "Obra em ação",
  },
  {
    src: acao2,
    alt: "Entrega de telhas com frota própria",
    label: "Entrega em 24h",
    tag: "Frota própria",
  },
  {
    src: acao1,
    alt: "Equipe separando madeiramento no pátio",
    label: "Separação de pedido",
    tag: "Bastidores",
  },
];

export function Acao() {
  return (
    <section id="acao" className="surface-dark scroll-mt-24 overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          invert
          kicker="A Rocha em Ação"
          title="Estrutura de verdade, todos os dias"
          subtitle="Transparência e estrutura gigante para atender desde reformas residenciais até grandes construtoras."
        />
        <Carousel opts={{ align: "start", loop: true }} className="mt-14">
          <CarouselContent className="-ml-4">
            {GALLERY.map((g, i) => (
              <CarouselItem
                key={`${g.label}-${i}`}
                className="basis-[78%] pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <figure className="group relative aspect-[9/16] overflow-hidden rounded-3xl border border-primary-foreground/15 shadow-[var(--shadow-lift)]">
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    width={900}
                    height={1600}
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25" />
                  <span className="absolute top-4 left-4 rounded-full border border-primary-foreground/25 bg-black/35 px-3 py-1 text-[0.65rem] font-bold tracking-[0.16em] text-primary-foreground uppercase backdrop-blur-sm">
                    {g.tag}
                  </span>
                  <span className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary-foreground/40 bg-primary-foreground/15 text-primary-foreground opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                    <Play className="ml-0.5 h-6 w-6 fill-current" />
                  </span>
                  <figcaption className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-base font-extrabold text-primary-foreground">{g.label}</p>
                    <p className="mt-1 h-0.5 w-10 rounded-full bg-accent" />
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-2 border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground hover:bg-accent hover:text-accent-foreground lg:-left-6" />
          <CarouselNext className="-right-2 border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground hover:bg-accent hover:text-accent-foreground lg:-right-6" />
        </Carousel>
      </div>
    </section>
  );
}


const REVIEWS = [
  {
    name: "Marcos Andrade",
    role: "Mestre de obras — Caieiras",
    text: "Pedi o madeiramento na quinta e na sexta cedo o caminhão já estava na obra. Cambará de primeira, bitola certinha. Não compro em outro lugar.",
  },
  {
    name: "Arq. Juliana Prado",
    role: "Arquiteta — Perus",
    text: "Especifiquei telha Isotec para três projetos. O atendimento entende de técnica, ajudou no cálculo da estrutura e o acabamento ficou impecável.",
  },
  {
    name: "Roberto Lima",
    role: "Construtora RL — Franco da Rocha",
    text: "Trabalho com eles há mais de 10 anos. Volume grande, prazo curto, sempre cumprem. Estrutura de distribuidora grande com atendimento de bairro.",
  },
  {
    name: "Sandra Ferreira",
    role: "Cliente residencial — Franco da Rocha",
    text: "Reformei o telhado da minha casa e fui muito bem atendida do orçamento à entrega. Parcelei no cartão e recebi tudo no dia combinado.",
  },
];

export function Depoimentos() {
  return (
    <section id="depoimentos" className="scroll-mt-24 bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          kicker="Depoimentos"
          title="Quem constrói, confia na Rocha"
          subtitle="Avaliações reais de clientes e profissionais que compram conosco todos os meses."
        />
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card px-6 py-4 shadow-[var(--shadow-card)]">
            <svg viewBox="0 0 48 48" className="h-9 w-9 shrink-0" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.3h12.1c-.2 2-1.6 5-4.5 7l-.1.3 6.5 5 .5.1c4.2-3.8 6.6-9.5 6.6-15.7"
              />
              <path
                fill="#34A853"
                d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.4c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-.3.1-6.7 5.2-.1.3C8 41.4 15.4 46 24 46"
              />
              <path
                fill="#FBBC05"
                d="M11.5 28.4c-.5-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4v-.3l-6.8-5.3-.2.1C2.9 17 2 20.4 2 24s.9 7 2.5 9.9z"
              />
              <path
                fill="#EA4335"
                d="M24 10.4c4.1 0 6.9 1.8 8.5 3.3l6.2-6C34.9 4.3 29.9 2 24 2 15.4 2 8 6.6 4.5 14.1l7 5.5c1.8-5.3 6.7-9.2 12.5-9.2"
              />
            </svg>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold text-primary">5,0</span>
                <span className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </span>
              </div>
              <p className="text-sm font-semibold text-muted-foreground">
                Mais de 100 avaliações 5 estrelas no Google
              </p>
            </div>
          </div>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]}
          className="mt-14"
        >
          <CarouselContent className="-ml-6">
            {REVIEWS.map((r) => (
              <CarouselItem key={r.name} className="pl-6 md:basis-1/2 lg:basis-1/3">
                <blockquote className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
                  <div className="flex gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 flex-1 text-sm leading-relaxed text-foreground/80">
                    “{r.text}”
                  </p>
                  <footer className="mt-6 border-t border-border pt-4">
                    <p className="text-sm font-extrabold text-primary">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.role}</p>
                  </footer>
                </blockquote>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-2 lg:-left-6" />
          <CarouselNext className="-right-2 lg:-right-6" />
        </Carousel>

      </div>
    </section>
  );
}

export { Faq } from "./FaqSection";


const UNIT = {
  name: "Rocha Telhas — Franco da Rocha",
  address: CONTATO.address,
  hours: CONTATO.hours,
  phone: CONTATO.phone,
  map: CONTATO.map,
};

export function Unidades() {
  return (
    <section id="unidades" className="scroll-mt-24 bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          kicker="Localização"
          title="Venha conhecer nossa loja"
          subtitle="Estamos em Franco da Rocha, atendendo toda a região. Venha tomar um café e conhecer a nossa loja, ou peça sua cotação sem sair de casa."
        />
        <div className="mt-14 grid gap-8 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] lg:grid-cols-2 lg:gap-0">
          <iframe
            title={`Mapa ${UNIT.name}`}
            src={UNIT.map}
            loading="lazy"
            className="h-72 w-full border-0 lg:h-full lg:min-h-[24rem]"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="p-7 lg:p-10">
            <h3 className="text-2xl font-extrabold text-primary">{UNIT.name}</h3>
            <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {UNIT.address}
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {UNIT.hours}
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {UNIT.phone}
              </li>
            </ul>
            <div className="mt-8">
              <WhatsAppButton
                size="lg"
                className="w-full"
                message="Olá! Quero falar com a Rocha Telhas em Franco da Rocha."
              >
                Falar com a loja no WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
