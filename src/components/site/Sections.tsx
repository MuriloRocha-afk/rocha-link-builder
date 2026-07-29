import { Star, MapPin, Clock, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading, WhatsAppButton } from "./shared";
import acao1 from "@/assets/acao-1.jpg";
import acao2 from "@/assets/acao-2.jpg";
import acao3 from "@/assets/acao-3.jpg";
import acao4 from "@/assets/acao-4.jpg";

const GALLERY = [
  { src: acao1, alt: "Carregamento de madeira no pátio da Rocha Telhas", label: "Pátio logístico" },
  { src: acao2, alt: "Telhado residencial finalizado com telha colonial", label: "Obra entregue" },
  { src: acao3, alt: "Galpão de estocagem de madeira tratada", label: "Estoque coberto" },
  { src: acao4, alt: "Estrutura de madeiramento de galpão industrial", label: "Grande porte" },
];

export function Acao() {
  return (
    <section id="acao" className="surface-dark scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          invert
          kicker="A Rocha em Ação"
          title="Estrutura de verdade, todos os dias"
          subtitle="Transparência e estrutura gigante para atender desde reformas residenciais até grandes construtoras."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {GALLERY.map((g, i) => (
            <figure
              key={g.label}
              className={`group relative overflow-hidden rounded-2xl border border-primary-foreground/10 ${
                i === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                width={1200}
                height={900}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  i === 0 ? "h-72 lg:h-full lg:min-h-[26rem]" : "h-56"
                }`}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-bold text-primary-foreground">
                {g.label}
              </figcaption>
            </figure>
          ))}
        </div>
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
