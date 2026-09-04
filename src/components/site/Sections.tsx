import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Star, MapPin, Clock, Phone, Play, X } from "lucide-react";

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
import video1 from "@/assets/videos/01_carga_montada.mp4.asset.json";
import video2 from "@/assets/videos/02_carga_montada.mp4.asset.json";
import video3 from "@/assets/videos/03_aparelhagem_dormente.mp4.asset.json";

type GalleryItem = {
  src: string;
  alt: string;
  label: string;
  tag: string;
  video?: boolean;
};

const GALLERY: GalleryItem[] = [
  {
    src: acao1,
    alt: "Carregamento de madeira no pátio da Rocha Telhas",
    label: "Pátio logístico",
    tag: "Bastidores",
  },
  {
    src: video1.url,
    alt: "Carga de telhas e madeira montada no caminhão, pronta para entrega",
    label: "Carga pronta pra entrega",
    tag: "Frota própria",
    video: true,
  },
  {
    src: acao2,
    alt: "Telhado residencial finalizado com telha colonial",
    label: "Obra entregue",
    tag: "Antes & depois",
  },
  {
    src: video2.url,
    alt: "Carga montada no pátio da Rocha Telhas",
    label: "Carga montada",
    tag: "Bastidores",
    video: true,
  },
  {
    src: acao3,
    alt: "Galpão de estocagem de madeira tratada",
    label: "Estoque coberto",
    tag: "Tour da loja",
  },
  {
    src: video3.url,
    alt: "Aparelhagem de dormente na plaina industrial",
    label: "Aparelhagem de dormente",
    tag: "Tecnologia",
    video: true,
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

function VideoLightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    if (ref.current) {
      ref.current.muted = false;
      void ref.current.play().catch(() => {});
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar vídeo"
        className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
      >
        <X className="h-5 w-5" />
      </button>
      <video
        ref={ref}
        src={item.src}
        controls
        playsInline
        autoPlay
        loop
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] max-w-[92vw] rounded-2xl"
      />
      <p className="absolute bottom-5 left-0 right-0 text-center text-sm text-white/80">
        {item.label}
      </p>
    </div>
  );
}

export function Acao() {
  const [ativo, setAtivo] = useState<GalleryItem | null>(null);

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
                  {g.video ? (
                    <video
                      src={g.src}
                      aria-label={g.alt}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onClick={() => setAtivo(g)}
                      className="h-full w-full cursor-pointer object-cover"
                    />
                  ) : (
                    <img
                      src={g.src}
                      alt={g.alt}
                      loading="lazy"
                      width={900}
                      height={1600}
                      className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25" />
                  <span className="pointer-events-none absolute top-4 left-4 rounded-full border border-primary-foreground/25 bg-black/35 px-3 py-1 text-[0.65rem] font-bold tracking-[0.16em] text-primary-foreground uppercase backdrop-blur-sm">
                    {g.tag}
                  </span>
                  {g.video ? (
                    <button
                      type="button"
                      onClick={() => setAtivo(g)}
                      aria-label={`Assistir: ${g.label}`}
                      className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary-foreground/40 bg-primary-foreground/15 text-primary-foreground backdrop-blur-md transition-all duration-300 hover:scale-110"
                    >
                      <Play className="ml-0.5 h-6 w-6 fill-current" />
                    </button>
                  ) : (
                    <span className="pointer-events-none absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary-foreground/40 bg-primary-foreground/15 text-primary-foreground opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                      <Play className="ml-0.5 h-6 w-6 fill-current" />
                    </span>
                  )}
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
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
      {ativo ? <VideoLightbox item={ativo} onClose={() => setAtivo(null)} /> : null}
    </section>
  );
}



const REVIEWS = [
  {
    name: "Elvis Melo",
    text: "Maravilhosa a experiência! Atenciosos desde o primeiro contato com WhatsApp, até o fechamento do orçamento presencialmente. A equipe é magnífica, muito atenciosa e dificilmente qualquer outro concorrente consegue bater o preço deles ou o atendimento. Sou cliente e já os considero amigos.",
  },
  {
    name: "Daniel Jose Galvão",
    text: "Bom atendimento! Melhor preço da região",
  },
  {
    name: "Daiani Pardo",
    text: "Atendimento excelente e pontualidade na entrega.",
  },
  {
    name: "Humberto dos Anjos",
    text: "Para quem não tem tempo a perder. O que precisa acha tudo lá. O atendimento conta com equipe de alto nível. Pessoas educadas e gentis até mesmo no pátio do depósito de madeiras.",
  },
  {
    name: "Hugo Alves de Oliveira",
    text: "Atendimento no balcão e na entrega top nota 10.",
  },
  {
    name: "Henrique Teles",
    text: "O único que atendeu meu pedido de uma prancha de 8 x 40 x 0,08.",
  },
  {
    name: "Medina",
    text: "Compro com frequência. Mercadorias de qualidade, preço justo e entrega rápida. Atendimento ágil e prático por WhatsApp. No resumo, atende todos os quesitos de um bom fornecedor.",
  },
  {
    name: "Thomas Alves",
    text: "Melhor loja da região, indico sem medo. Confiança e preço justo é aqui 😊",
  },
  {
    name: "Thays Magalhães",
    text: "Comércio com variedade de produtos, e produtos de qualidade! Excelente atendimento, valores cobrem a concorrência pelo custo benefício. Super indico!!!",
  },
  {
    name: "Loriane Magalhaes",
    text: "As atendentes são super simpáticas, materiais com preço bom e de boa qualidade!!! Recomendo de Mais!",
  },
  {
    name: "Manuelly Silva",
    text: "Melhor madeireira da região. Fim. Telhado de 120m2. Entrega rápida e o melhor preço e qualidade.",
  },
  {
    name: "Danilo Pereira",
    text: "Bom dia, consegui resolver o meu problema na ROCHA Telhas e Madeiras.",
  },
  {
    name: "Vanderlei Apolinario da Silva",
    text: "Muito bom atendimento a moça com muita educação pra conversar gostei muito parabéns atendente balconista 👏",
  },
  {
    name: "Carlos Roberto Marul",
    text: "Ótimo atendimento volto novamente 😀",
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
                  </footer>
                </blockquote>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-2 lg:-left-6" />
          <CarouselNext className="-right-2 lg:-right-6" />
        </Carousel>

        <div className="mt-10 flex justify-center">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Rocha+Telhas+%26+Madeiras%2C+R.+Dr.+Hamilton+Prado%2C+856%2C+Centro%2C+Franco+da+Rocha+-+SP%2C+07849-070"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-primary shadow-[var(--shadow-card)] transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <svg viewBox="0 0 48 48" className="h-5 w-5 shrink-0" aria-hidden="true">
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
            Ver todas as avaliações no Google
          </a>
        </div>

      </div>
    </section>
  );
}

export { Faq } from "./FaqSection";


const UNIT = {
  name: "Rocha Telhas - Franco da Rocha",
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
