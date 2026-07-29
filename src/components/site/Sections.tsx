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
import { SectionHeading, WhatsAppButton } from "./shared";
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
    role: "Cliente residencial — Pirituba",
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
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <blockquote
              key={r.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
            >
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-5 flex-1 text-sm leading-relaxed text-foreground/80">“{r.text}”</p>
              <footer className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-extrabold text-primary">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  {
    q: "Como funciona o frete e o prazo de entrega?",
    a: "Temos frota própria com caminhões de diferentes portes, o que nos permite entregar em toda a Grande São Paulo e interior. Pedidos confirmados até o meio-dia normalmente são entregues em até 24 a 48 horas, conforme a região e o volume. O valor do frete é calculado na cotação pelo WhatsApp.",
  },
  {
    q: "Vocês vendem madeira sob medida?",
    a: "Sim. Cortamos vigas, caibros, ripas, pranchas e sarrafos nas medidas do seu projeto. Basta enviar a lista ou a planta pelo WhatsApp que a nossa equipe técnica calcula as peças e o rendimento do madeiramento.",
  },
  {
    q: "Como solicitar um orçamento rápido?",
    a: "Clique em qualquer botão verde do site e fale direto com o comercial no WhatsApp. Envie a metragem do telhado, a lista de materiais ou uma foto do projeto — respondemos com a cotação completa em poucos minutos no horário comercial.",
  },
  {
    q: "Quais são as formas de pagamento aceitas?",
    a: "Aceitamos PIX, dinheiro, débito, boleto para clientes cadastrados e cartão de crédito parcelado em até 12x. Para construtoras e obras de grande porte trabalhamos com condições e prazos especiais.",
  },
];

export function Faq() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeading kicker="FAQ" title="Dúvidas frequentes" />
        <Accordion type="single" collapsible className="mt-10">
          {FAQ.map((item) => (
            <AccordionItem
              key={item.q}
              value={item.q}
              className="mb-3 rounded-xl border border-border bg-card px-5"
            >
              <AccordionTrigger className="text-left text-base font-bold text-primary hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

const UNITS = [
  {
    name: "Rocha Telhas — Franco da Rocha",
    address: "Av. Liberdade, 1.200 — Vila Bela, Franco da Rocha / SP",
    hours: "Seg a Sex: 7h30 às 18h · Sáb: 8h às 13h",
    phone: "(11) 4449-0000",
    map: "https://www.google.com/maps?q=Franco+da+Rocha+SP&output=embed",
  },
  {
    name: "ROV Telhas — Pirituba",
    address: "Av. Dr. Felipe Pinel, 850 — Pirituba, São Paulo / SP",
    hours: "Seg a Sex: 7h30 às 18h · Sáb: 8h às 13h",
    phone: "(11) 3901-0000",
    map: "https://www.google.com/maps?q=Pirituba+Sao+Paulo+SP&output=embed",
  },
];

export function Unidades() {
  return (
    <section id="unidades" className="scroll-mt-24 bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          kicker="Unidades"
          title="Duas lojas para atender sua obra"
          subtitle="Venha tomar um café e conhecer o pátio, ou peça sua cotação sem sair do canteiro."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {UNITS.map((u) => (
            <div
              key={u.name}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
            >
              <iframe
                title={`Mapa ${u.name}`}
                src={u.map}
                loading="lazy"
                className="h-64 w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-7">
                <h3 className="text-xl font-extrabold text-primary">{u.name}</h3>
                <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {u.address}
                  </li>
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {u.hours}
                  </li>
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {u.phone}
                  </li>
                </ul>
                <div className="mt-6">
                  <WhatsAppButton
                    size="lg"
                    className="w-full"
                    message={`Olá! Quero falar com a unidade ${u.name}.`}
                  >
                    Falar com esta unidade
                  </WhatsAppButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
