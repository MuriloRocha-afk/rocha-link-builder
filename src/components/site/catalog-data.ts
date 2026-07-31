import ceramica from "@/assets/prod-ceramica.jpg";
import isotec from "@/assets/prod-isotec.jpg";
import pvc from "@/assets/prod-pvc.jpg";
import fibro from "@/assets/prod-fibro.jpg";
import translucida from "@/assets/prod-translucida.jpg";
import cambara from "@/assets/prod-cambara.jpg";
import cedrinho from "@/assets/prod-cedrinho.jpg";
import eucalipto from "@/assets/prod-eucalipto.jpg";
import verniz from "@/assets/prod-verniz.jpg";
import tintaTelha from "@/assets/prod-tinta-telha.jpg";
import acessorios from "@/assets/prod-acessorios.jpg";
import madeirite from "@/assets/prod-madeirite.jpg";
import rufos from "@/assets/prod-rufos.jpg";
import tabeira from "@/assets/prod-tabeira.jpg";

export type CatalogItem = {
  slug: string;
  name: string;
  image: string;
  summary: string;
  specs: { label: string; value: string }[];
  badges?: string[];
  cta?: string;
  gallery?: string[];
  bitolas?: { label: string; value: string }[];
  note?: string;
};

export type CatalogCategory = {
  id: string;
  title: string;
  short: string;
  description: string;
  image: string;
  items: CatalogItem[];
};

export const CATEGORIES: CatalogCategory[] = [
  {
    id: "telhas",
    title: "Telhas & Coberturas",
    short: "Telhas & Coberturas",
    description:
      "Cerâmicas, PVC, fibrocimento e translúcidas para coberturas residenciais, comerciais e industriais.",
    image: ceramica,
    items: [
      {
        slug: "telha-romana-ceramica",
        name: "Telha Romana (Cerâmica)",
        image: ceramica,
        summary: "Encaixe preciso e visual clássico para coberturas residenciais.",
        specs: [
          { label: "Rendimento", value: "~16 peças/m²" },
          { label: "Inclinação mínima", value: "30%" },
          { label: "Dimensões / peso", value: "41 x 24 cm · ~2,4 kg/peça" },
          { label: "Acabamentos", value: "Natural, Resinada e Esmaltada" },
        ],
      },
      {
        slug: "telha-portuguesa-ceramica",
        name: "Telha Portuguesa (Cerâmica)",
        image: isotec,
        summary: "Encaixe duplo com excelente vedação contra chuva de vento.",
        specs: [
          { label: "Rendimento", value: "~17 peças/m²" },
          { label: "Inclinação mínima", value: "30%" },
          { label: "Dimensões / peso", value: "46 x 24 cm · ~2,5 kg/peça" },
          { label: "Acabamentos", value: "Natural, Resinada e Esmaltada" },
        ],
      },
      {
        slug: "telha-pvc-colonial",
        name: "Telha PVC Colonial",
        image: pvc,
        summary: "Leveza extrema, instalação rápida e alto conforto térmico.",
        specs: [
          { label: "Medidas", value: "1,06 m de largura · 2,20 a 3,60 m" },
          { label: "Inclinação mínima", value: "15%" },
          { label: "Desempenho", value: "Isolamento térmico e acústico" },
          { label: "Cores", value: "Cerâmica, Branca e Areia" },
        ],
      },
      {
        slug: "telha-fibrocimento-infibra",
        name: "Telha Fibrocimento (Infibra)",
        image: fibro,
        summary: "Solução econômica e resistente para grandes coberturas e galpões.",
        specs: [
          { label: "Espessuras", value: "4, 5, 6 e 8 mm" },
          { label: "Inclinação mínima", value: "10% (ondulada)" },
          { label: "Comprimentos", value: "1,22 m até 3,66 m" },
          { label: "Indicação", value: "Galpões, garagens e áreas amplas" },
        ],
      },
      {
        slug: "telhas-translucidas",
        name: "Telhas Translúcidas & Polipropileno",
        image: translucida,
        summary: "Iluminação natural sem abrir mão da vedação da cobertura.",
        specs: [
          { label: "Perfis", value: "Compatível com ondulada e colonial" },
          { label: "Transmissão de luz", value: "Alta luminosidade difusa" },
          { label: "Indicação", value: "Garagens, quintais e áreas de serviço" },
          { label: "Resistência", value: "Proteção UV" },
        ],
      },
    ],
  },
  {
    id: "madeiramento",
    title: "Madeiramento Estrutural & Aparelhado",
    short: "Madeiramento",
    description:
      "Madeira nativa e de reflorestamento cortada, seca e aparelhada em plaina industrial no nosso pátio.",
    image: cambara,
    items: [
      {
        slug: "madeira-cambara",
        name: "Cambará",
        image: cambara,
        summary: "Madeira nobre para coberturas pesadas e estruturas aparentes.",
        specs: [
          { label: "Bitolas padrão", value: "Vigas 5x15 e 5x11 · Caibros 5x7 · Ripas 2x5" },
          { label: "Também em", value: "Pranchas e sarrafos sob medida" },
          { label: "Aplicações", value: "Coberturas pesadas, pergolados e estruturas visíveis" },
          { label: "Acabamento", value: "Aparelhada em plaina industrial" },
        ],
        badges: ["DOF/IBAMA Legalizado", "Aparelhada em Plaina Industrial"],
      },
      {
        slug: "madeira-cedrinho",
        name: "Cedrinho",
        image: cedrinho,
        summary: "Leve, estável e com acabamento estético superior.",
        specs: [
          { label: "Bitolas padrão", value: "Caibros 5x6 · Ripas 2x5 · Lambri 10 cm" },
          { label: "Aplicações", value: "Forros, lambris e caibros leves" },
          { label: "Diferencial", value: "Baixo peso e ótima usinagem" },
          { label: "Acabamento", value: "Aparelhada em plaina industrial" },
        ],
        badges: ["DOF/IBAMA Legalizado", "Aparelhada em Plaina Industrial"],
      },
      {
        slug: "pinus-eucalipto-tratado",
        name: "Pinus & Eucalipto Tratado",
        image: eucalipto,
        summary: "Reflorestamento tratado em autoclave para obra e estrutura.",
        specs: [
          { label: "Bitolas padrão", value: "Tábua 30 cm · Pontaletes 7x7 · Sarrafos 2,5x10" },
          { label: "Aplicações", value: "Caixaria, escoramento, tapumes e vigamento" },
          { label: "Tratamento", value: "Autoclavado contra cupim e umidade" },
          { label: "Complementos", value: "Madeirite resinado e plastificado" },
        ],
        badges: ["Reflorestamento", "Tratado em Autoclave"],
      },
      {
        slug: "madeirite-tabeiras",
        name: "Madeirite & Tabeiras",
        image: madeirite,
        summary: "Chapas estruturais e acabamento periférico do telhado.",
        specs: [
          { label: "Madeirite", value: "Resinado e plastificado · 10 a 18 mm" },
          { label: "Tabeiras", value: "Madeira nobre aparelhada sob medida" },
          { label: "Aplicações", value: "Fôrmas de concreto, tapumes e bordas do telhado" },
          { label: "Corte", value: "Sob medida no pátio" },
        ],
      },
    ],
  },
  {
    id: "tintas",
    title: "Tintas, Vernizes & Proteção",
    short: "Tintas & Proteção",
    description:
      "Proteção UV, hidrorrepelência e impermeabilização para madeiras, telhas e alvenaria.",
    image: verniz,
    items: [
      {
        slug: "vernizes-stain-protector",
        name: "Vernizes & Stain Protector",
        image: verniz,
        summary: "Proteção UV e ação hidrorrepelente para madeiras internas e externas.",
        specs: [
          { label: "Rendimento", value: "~40 a 60 m²/galão por demão" },
          { label: "Indicação", value: "Madeiramento aparente, decks e portas" },
          { label: "Tonalidades", value: "Incolor, Canela, Imbuia e Mogno" },
          { label: "Acabamento", value: "Brilhante, acetinado ou fosco" },
        ],
        cta: "Consultar Cores no Balcão",
      },
      {
        slug: "tintas-emborrachadas-resinas",
        name: "Tintas Emborrachadas & Resinas para Telha",
        image: tintaTelha,
        summary: "Impermeabilização e renovação visual de telhados e alvenaria.",
        specs: [
          { label: "Rendimento", value: "~20 a 30 m²/balde por demão" },
          { label: "Indicação", value: "Telhas cerâmicas, fibrocimento e lajes" },
          { label: "Tonalidades", value: "Cerâmica, Branco, Cinza e Incolor" },
          { label: "Benefício", value: "Barreira contra infiltração e limo" },
        ],
        cta: "Consultar Cores no Balcão",
      },
      {
        slug: "cupinicidas-seladores",
        name: "Cupinicidas & Seladores",
        image: tabeira,
        summary: "Tratamento preventivo e curativo para todo o madeiramento.",
        specs: [
          { label: "Rendimento", value: "~50 m²/galão" },
          { label: "Indicação", value: "Estruturas de telhado, forros e ripados" },
          { label: "Ação", value: "Cupim, broca e fungos" },
          { label: "Uso", value: "Base para verniz ou tinta" },
        ],
        cta: "Consultar Cores no Balcão",
      },
    ],
  },
  {
    id: "fixadores",
    title: "Fixadores & Acessórios de Montagem",
    short: "Fixadores & Acessórios",
    description:
      "Linha completa de fixação, vedação e isolamento para qualquer estrutura metálica ou de madeira.",
    image: acessorios,
    items: [
      {
        slug: "kits-fixacao-vedacao",
        name: "Kits de Fixação e Vedação",
        image: acessorios,
        summary:
          "Temos a linha completa para qualquer estrutura metálica ou de madeira: parafusos, pregos, mantas e fitas.",
        specs: [
          { label: "Parafusos", value: "Soberbos e autobrocantes com arruela de vedação" },
          { label: "Pregos", value: "Com e sem cabeça, todas as bitolas" },
          { label: "Isolamento", value: "Manta térmica de alumínio dupla face" },
          { label: "Vedação", value: "Fitas asfálticas e kits para pregos" },
        ],
        badges: ["Linha completa em estoque"],
      },
      {
        slug: "rufos-calhas-pingadeiras",
        name: "Rufos, Calhas & Pingadeiras",
        image: rufos,
        summary: "Vedação galvanizada sob medida para paredes e bordas do telhado.",
        specs: [
          { label: "Produção", value: "Sob medida conforme o projeto" },
          { label: "Material", value: "Chapa galvanizada" },
          { label: "Itens", value: "Rufo externo, pingadeira e calha" },
          { label: "Função", value: "Proteção contra infiltrações" },
        ],
      },
      {
        slug: "cumeeiras-complementos",
        name: "Cumeeiras & Complementos",
        image: fibro,
        summary: "Peças de arremate para fechar toda a cobertura em uma única compra.",
        specs: [
          { label: "Cumeeiras", value: "Cerâmica, PVC e fibrocimento" },
          { label: "Complementos", value: "Espigões, testeiras e tampões" },
          { label: "Compatibilidade", value: "Todos os perfis que trabalhamos" },
          { label: "Disponibilidade", value: "Pronta entrega" },
        ],
      },
    ],
  },
];
