import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WhatsAppButton } from "./shared";
import hist1 from "@/assets/hist-1.jpg";
import hist2 from "@/assets/hist-2.jpg";
import hist3 from "@/assets/hist-3.jpg";

const TIMELINE = [
  {
    year: "1998",
    title: "O começo em família",
    image: hist1,
    text: "Dois irmãos e um pequeno depósito de madeira em Franco da Rocha. Sem frota, sem galpão coberto: só o compromisso de entregar madeira honesta, na bitola certa, para os vizinhos que estavam levantando suas casas.",
  },
  {
    year: "2005",
    title: "Desafios e persistência",
    image: hist1,
    text: "Crises no setor da construção e concorrência pesada testaram o negócio. A saída foi ampliar o mix — telhas cerâmicas, fibrocimento e acessórios — e comprar o primeiro caminhão para não depender mais de frete terceirizado.",
  },
  {
    year: "2012",
    title: "Estrutura de distribuidora",
    image: hist2,
    text: "Chegou o galpão coberto, a empilhadeira e o estoque permanente. A Rocha passou a atender construtoras e mestres de obra de toda a região, com separação de pedidos e entrega programada.",
  },
  {
    year: "2018",
    title: "Tecnologia no pátio",
    image: hist2,
    text: "Investimento em serras automáticas e na plaina dupla face industrial Alca Máquinas: madeira aparelhada, padronizada e pronta para envernizar, com corte milimétrico e segurança industrial.",
  },
  {
    year: "Hoje",
    title: "Parque industrial e frota própria",
    image: hist3,
    text: "Mais de 25 anos depois, a Rocha Telhas é uma das maiores distribuidoras e madeireiras da região: pátio logístico amplo, frota própria entregando em toda a Grande São Paulo e a mesma gestão familiar de sempre.",
  },
];

export function SobreModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <span className="inline-flex w-fit items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-accent uppercase">
            Sobre Nós
          </span>
          <DialogTitle className="mt-3 text-2xl font-extrabold text-primary md:text-3xl">
            A Evolução da Rocha Telhas — 25 Anos
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Uma história de união familiar, trabalho duro e crescimento contínuo em Franco da Rocha.
          </DialogDescription>
        </DialogHeader>

        <ol className="relative mt-4 space-y-8 border-l-2 border-accent/25 pl-6">
          {TIMELINE.map((item) => (
            <li key={item.year} className="relative">
              <span className="absolute top-1.5 -left-[1.95rem] flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-card" />
              <p className="text-xs font-bold tracking-[0.18em] text-accent uppercase">
                {item.year}
              </p>
              <h3 className="mt-1 text-lg font-extrabold text-primary">{item.title}</h3>
              <div className="mt-3 overflow-hidden rounded-xl border border-border">
                <img
                  src={item.image}
                  alt={`Rocha Telhas em ${item.year} — ${item.title}`}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-2xl border border-border bg-secondary p-6 text-center">
          <p className="text-base font-extrabold text-primary">
            Faça parte da próxima página dessa história.
          </p>
          <div className="mt-4 flex justify-center">
            <WhatsAppButton
              size="lg"
              message="Olá! Conheci a história da Rocha Telhas no site e gostaria de um orçamento."
            >
              Falar com o comercial
            </WhatsAppButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
