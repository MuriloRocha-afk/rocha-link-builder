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
import tintas from "@/assets/prod-tintas.jpg";
import acessorios from "@/assets/prod-acessorios.jpg";
import vedacao from "@/assets/prod-vedacao.jpg";
import madeirite from "@/assets/prod-madeirite.jpg";
import rufos from "@/assets/prod-rufos.jpg";
import tabeira from "@/assets/prod-tabeira.jpg";
import concreto from "@/assets/prod-concreto.jpg";
import galvanizada from "@/assets/prod-galvanizada.jpg";
import termoacustica from "@/assets/prod-termoacustica.jpg";
import mediterranea from "@/assets/prod-mediterranea.jpg";

export type VariantOption = {
  value: string;
  label: string;
  image?: string;
  note?: string;
  highlight?: string;
};

export type VariantSelector = {
  key: string;
  label: string;
  options: VariantOption[];
};

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
  instrucoes?: string[];
  note?: string;
  /** Texto do selo de campeão de vendas (Curva ABC). */
  bestseller?: string;
  /** Card expansivo (ocupa 2 colunas no desktop). */
  featured?: boolean;
  selectors?: VariantSelector[];
  showQty?: boolean;
};

export type CatalogCategory = {
  id: string;
  title: string;
  short: string;
  description: string;
  image: string;
  items: CatalogItem[];
  /** Selo de campeão de vendas no card de categoria. */
  bestseller?: string;
  /** Texto do CTA no card de categoria. */
  ctaLabel: string;
};

const COMPRIMENTOS_MADEIRA: VariantOption[] = Array.from({ length: 13 }, (_, i) => {
  const m = 2.5 + i * 0.5;
  const label = `${m.toFixed(1).replace(".", ",")} m`;
  return { value: label, label };
});

const INSTRUCOES_MADEIRA = [
  "Galgamento das ripas: confira o rendimento da telha escolhida antes de fixar as ripas e mantenha o espaçamento constante em todo o pano do telhado.",
  "Armazenagem na obra: empilhe as peças sobre calços a pelo menos 10 cm do solo, em local coberto e ventilado, evitando contato direto com umidade e concreto fresco.",
  "Para evitar empenamento, mantenha as pilhas alinhadas com sarrafos espaçadores entre as camadas e nunca deixe as peças ao sol e chuva alternados.",
  "Aplique cupinicida/selador antes da montagem e finalize com verniz ou stain após a estrutura montada, reforçando topos e cortes feitos na obra.",
  "Cortes realizados no canteiro devem receber nova demão de proteção no mesmo dia.",
];

const BITOLAS_NATIVA = [
  { label: "Ripas", value: "1,5 x 5 cm" },
  { label: "Sarrafos", value: "2x5 cm · 2x7 cm · 2x10 cm · 2x15 cm" },
  { label: "Caibros", value: "5x5 cm · 5x7 cm" },
  {
    label: "Vigas e vigotas",
    value: "5x11 · 5x15 · 5x20 · 5x25 · 5x30 · 7x15 · 7x20 · 7x30 cm",
  },
  {
    label: "Tábuas e pranchões",
    value: "2x20 · 2x25 · 2x30 · 5x30 · 7x30 · 10x30 cm",
  },
  {
    label: "Comprimentos",
    value: "De 2,5 m a 8,5 m (passos de 0,5 m) ou corte sob medida no pátio",
  },
];

export const CATEGORIES: CatalogCategory[] = [
  {
    id: "telhas",
    title: "Telhas & Coberturas",
    short: "Telhas & Coberturas",
    description:
      "Fibrocimento, Colonial PVC, Cerâmica, Policarbonato e mais — todos os tipos para sua obra.",
    image: ceramica,
    bestseller: "Campeão de Vendas",
    ctaLabel: "Ver Tipos de Telha",
    items: [
      {
        slug: "telha-fibrocimento-infibra",
        name: "Telha Fibrocimento Ondulada Infibra",
        image: fibro,
        summary:
          "A campeã absoluta do pátio: econômica, resistente e disponível em todos os comprimentos para pronta entrega.",
        bestseller: "Campeão de Vendas",
        featured: true,
        showQty: true,
        selectors: [
          {
            key: "Dimensão",
            label: "Dimensão da chapa",
            options: [
              {
                value: "244 x 110 cm (5 mm)",
                label: "244 x 110 cm (5 mm)",
                highlight: "Líder de vendas",
                note: "Espessura 5 mm · a medida mais pedida da loja",
              },
              { value: "305 x 110 cm", label: "305 x 110 cm", note: "Vãos médios e garagens" },
              { value: "366 x 110 cm", label: "366 x 110 cm", note: "Galpões e grandes panos" },
              { value: "183 x 110 cm", label: "183 x 110 cm", note: "Áreas de serviço e puxadinhos" },
              { value: "153 x 110 cm", label: "153 x 110 cm", note: "Arremates e coberturas curtas" },
            ],
          },
        ],
        specs: [
          { label: "Espessuras", value: "4, 5, 6 e 8 mm" },
          { label: "Inclinação mínima", value: "10% (ondulada)" },
          { label: "Largura útil", value: "1,05 m (largura total 1,10 m)" },
          { label: "Indicação", value: "Galpões, garagens e áreas amplas" },
        ],
        badges: ["Pronta entrega", "Todos os comprimentos"],
      },
      {
        slug: "telha-pvc-colonial",
        name: "Telha Colonial PVC",
        image: pvc,
        summary:
          "Leveza extrema, conforto térmico e instalação rápida — escolha a cor e o comprimento ideais para o seu telhado.",
        bestseller: "Campeão de Vendas",
        featured: true,
        showQty: true,
        selectors: [
          {
            key: "Cor",
            label: "Cor da telha",
            options: [
              { value: "Cerâmica", label: "Cerâmica", note: "Tom terracota tradicional" },
              { value: "Marfim / Branca", label: "Marfim / Branca", note: "Maior reflexão de calor" },
              { value: "Cinza", label: "Cinza", note: "Visual moderno e sóbrio" },
            ],
          },
          {
            key: "Comprimento",
            label: "Comprimento x largura",
            options: [
              { value: "230 x 86 cm", label: "230 x 86 cm" },
              { value: "328 x 86 cm", label: "328 x 86 cm" },
              { value: "420 x 86 cm", label: "420 x 86 cm" },
              { value: "525 x 86 cm", label: "525 x 86 cm" },
            ],
          },
        ],
        specs: [
          { label: "Largura útil", value: "0,86 m" },
          { label: "Inclinação mínima", value: "15%" },
          { label: "Desempenho", value: "Isolamento térmico e acústico" },
          { label: "Cores", value: "Cerâmica, Marfim/Branca e Cinza" },
        ],
        badges: ["Instalação rápida", "Não enferruja"],
      },
      {
        slug: "telhas-ceramicas-tradicionais",
        name: "Telhas Cerâmicas Tradicionais",
        image: ceramica,
        gallery: [ceramica, isotec],
        summary:
          "Romana e Portuguesa com encaixe preciso e acabamento à sua escolha: natural, resinada ou esmaltada.",
        featured: true,
        showQty: true,
        selectors: [
          {
            key: "Modelo",
            label: "Modelo da telha",
            options: [
              {
                value: "Romana",
                label: "Romana",
                image: ceramica,
                note: "~16 peças/m² · 41 x 24 cm",
              },
              {
                value: "Portuguesa",
                label: "Portuguesa",
                image: isotec,
                note: "~17 peças/m² · 46 x 24 cm",
              },
            ],
          },
          {
            key: "Acabamento",
            label: "Acabamento",
            options: [
              { value: "Natural", label: "Natural", note: "Barro puro, custo mais acessível" },
              { value: "Resinada", label: "Resinada", note: "Camada protetora contra umidade e limo" },
              { value: "Esmaltada", label: "Esmaltada", note: "Brilho intenso e limpeza fácil" },
            ],
          },
        ],
        specs: [
          { label: "Rendimento", value: "16 a 17 peças/m²" },
          { label: "Inclinação mínima", value: "30%" },
          { label: "Peso médio", value: "~2,4 a 2,5 kg/peça" },
          { label: "Acabamentos", value: "Natural, Resinada e Esmaltada" },
        ],
      },
      {
        slug: "outros-modelos-telhas",
        name: "Outros Modelos de Telhas & Especialidades",
        image: concreto,
        summary:
          "Linha complementar completa: selecione o modelo e veja a foto e as medidas padrão de fábrica.",
        showQty: true,
        selectors: [
          {
            key: "Modelo",
            label: "Escolha o modelo",
            options: [
              {
                value: "Telha de Concreto",
                label: "Telha de Concreto",
                image: concreto,
                note: "42 x 33 cm · ~10,5 peças/m² · inclinação mínima 30%",
              },
              {
                value: "Telha Galvanizada / Trapezoidal",
                label: "Telha Galvanizada / Trapezoidal",
                image: galvanizada,
                note: "Largura útil 0,98 m · comprimento sob medida · 0,43 a 0,50 mm",
              },
              {
                value: "Telha Mediterrânea",
                label: "Telha Mediterrânea",
                image: mediterranea,
                note: "Cerâmica · ~12 peças/m² · inclinação mínima 30%",
              },
              {
                value: "Telha Termoacústica Sanduíche",
                label: "Telha Termoacústica Sanduíche",
                image: termoacustica,
                note: "Miolo EPS/PU 30, 40 e 50 mm · largura útil 1,00 m",
              },
              {
                value: "Telha Translúcida Polipropileno",
                label: "Telha Translúcida Polipropileno",
                image: translucida,
                note: "Perfis ondulado e colonial · proteção UV",
              },
            ],
          },
        ],
        specs: [
          { label: "Modelos", value: "Concreto, galvanizada, mediterrânea, termoacústica e translúcida" },
          { label: "Medidas", value: "Padrão de fábrica ou sob encomenda" },
          { label: "Indicação", value: "Projetos específicos e complementos de cobertura" },
          { label: "Entrega", value: "Estoque e encomenda rápida" },
        ],
      },
      {
        slug: "cumeeiras-complementos",
        name: "Cumeeiras & Acessórios de Cobertura",
        image: fibro,
        summary: "Peças de arremate para fechar toda a cobertura em uma única compra.",
        showQty: true,
        selectors: [
          {
            key: "Tipo",
            label: "Tipo de cumeeira",
            options: [
              { value: "Cumeeira Cerâmica", label: "Cumeeira Cerâmica", image: ceramica, note: "Compatível com romana, portuguesa e mediterrânea" },
              { value: "Cumeeira PVC", label: "Cumeeira PVC", image: pvc, note: "Articulada, acompanha a cor da telha" },
              { value: "Cumeeira Fibrocimento", label: "Cumeeira Fibrocimento", image: fibro, note: "Normal e universal, 90° e 15°" },
              { value: "Cumeeira Espigão", label: "Cumeeira Espigão", image: ceramica, note: "Arremate de águas inclinadas e testeiras" },
            ],
          },
        ],
        specs: [
          { label: "Cumeeiras", value: "Cerâmica, PVC e fibrocimento" },
          { label: "Complementos", value: "Espigões, testeiras e tampões" },
          { label: "Compatibilidade", value: "Todos os perfis que trabalhamos" },
          { label: "Disponibilidade", value: "Pronta entrega" },
        ],
      },
    ],
  },
  {
    id: "madeiramento",
    title: "Madeiramento Estrutural",
    short: "Madeiramento",
    description:
      "Cambará, Eucalipto, Cedrinho, Pinus e mais — cortado e aparelhado no nosso pátio.",
    image: cambara,
    bestseller: "Campeão de Vendas",
    ctaLabel: "Ver Espécies de Madeira",
    items: [
      {
        slug: "madeira-cambara",
        name: "Madeira Cambará Nobre",
        image: cambara,
        summary:
          "A madeira mais vendida do pátio: escolha a bitola, o comprimento e a quantidade exata da sua estrutura.",
        bestseller: "Campeão de Pátio",
        featured: true,
        showQty: true,
        selectors: [
          {
            key: "Bitola",
            label: "Bitola da peça",
            options: [
              { value: "Viga 5x15 cm", label: "Viga 5x15 cm", highlight: "Mais pedida" },
              { value: "Viga 5x11 cm", label: "Viga 5x11 cm" },
              { value: "Caibro 5x7 cm", label: "Caibro 5x7 cm" },
              { value: "Caibro 5x5 cm", label: "Caibro 5x5 cm" },
              { value: "Ripa 1,5x5 cm", label: "Ripa 1,5x5 cm" },
              { value: "Sarrafo 2x5 cm", label: "Sarrafo 2x5 cm" },
              { value: "Prancha 5x30 cm", label: "Prancha 5x30 cm" },
              { value: "Pranchão 7x30 cm", label: "Pranchão 7x30 cm" },
            ],
          },
          {
            key: "Comprimento",
            label: "Comprimento (2,5 m a 8,5 m)",
            options: COMPRIMENTOS_MADEIRA,
          },
        ],
        specs: [
          { label: "Bitolas padrão", value: "Vigas 5x15 e 5x11 · Caibros 5x7 · Ripas 1,5x5" },
          { label: "Também em", value: "Pranchas, pranchões e sarrafos sob medida" },
          { label: "Aplicações", value: "Coberturas pesadas, pergolados e estruturas visíveis" },
          { label: "Acabamento", value: "Aparelhada em plaina industrial" },
        ],
        bitolas: BITOLAS_NATIVA,
        instrucoes: INSTRUCOES_MADEIRA,
        note: "Corte e beneficiamento sob medida no pátio.",
        badges: ["DOF/IBAMA Legalizado", "Aparelhada em Plaina Industrial"],
      },
      {
        slug: "pinus-eucalipto-tratado",
        name: "Eucalipto Roliço Tratado & Pontaletes",
        image: eucalipto,
        summary:
          "Pontaletes de eucalipto 6,0 m e tábuas de caixaria em pinus: a dupla que sai todo dia para a obra.",
        bestseller: "Campeão de Pátio",
        featured: true,
        showQty: true,
        selectors: [
          {
            key: "Produto",
            label: "Tipo de peça",
            options: [
              {
                value: "Pontalete Eucalipto Roliço 6,0 m",
                label: "Pontalete Eucalipto Roliço 6,0 m",
                highlight: "Destaque",
                note: "Tratado em autoclave · escoramento de laje",
              },
              { value: "Pontalete Serrado 7x7 cm", label: "Pontalete Serrado 7x7 cm", note: "Comprimentos de 3,0 m a 6,0 m" },
              { value: "Tábua de Caixaria Pinus 30 cm", label: "Tábua de Caixaria Pinus 30 cm", note: "Fôrmas de concreto e tapumes" },
              { value: "Tábua de Caixaria Pinus 20 cm", label: "Tábua de Caixaria Pinus 20 cm", note: "Fôrmas menores e travamentos" },
              { value: "Sarrafo Pinus 2,5x10 cm", label: "Sarrafo Pinus 2,5x10 cm", note: "Travamento e gravatas" },
            ],
          },
          {
            key: "Comprimento",
            label: "Comprimento",
            options: [
              { value: "3,0 m", label: "3,0 m" },
              { value: "4,0 m", label: "4,0 m" },
              { value: "5,0 m", label: "5,0 m" },
              { value: "6,0 m", label: "6,0 m" },
            ],
          },
        ],
        specs: [
          { label: "Destaques", value: "Pontalete roliço 6,0 m e tábua de pinus 30 cm" },
          { label: "Aplicações", value: "Caixaria, escoramento, tapumes e vigamento" },
          { label: "Tratamento", value: "Autoclavado contra cupim e umidade" },
          { label: "Complementos", value: "Madeirite resinado e plastificado" },
        ],
        bitolas: [
          { label: "Tábuas", value: "20 cm e 30 cm de largura" },
          { label: "Pontaletes", value: "Roliço 6,0 m · Serrado 7x7 cm" },
          { label: "Sarrafos", value: "2,5x10 cm" },
          { label: "Comprimentos", value: "De 3,0 m a 6,0 m" },
        ],
        instrucoes: INSTRUCOES_MADEIRA,
        badges: ["Reflorestamento", "Tratado em Autoclave"],
      },
      {
        slug: "outras-madeiras",
        name: "Outras Opções de Madeiramento",
        image: cedrinho,
        summary:
          "Essências nobres complementares para forros, caibros leves e estruturas de alto padrão.",
        showQty: true,
        selectors: [
          {
            key: "Essência",
            label: "Escolha a essência",
            options: [
              {
                value: "Cedrinho p/ Forro e Caibros Leves",
                label: "Cedrinho p/ Forro e Caibros Leves",
                image: cedrinho,
                note: "Leve, estável e com ótima usinagem · lambri 10 cm",
              },
              {
                value: "Angelim Pedra",
                label: "Angelim Pedra",
                image: cambara,
                note: "Alta densidade para vigas e estruturas pesadas",
              },
              {
                value: "Tauari",
                label: "Tauari",
                image: cedrinho,
                note: "Fibra clara e uniforme, ótima para acabamento",
              },
              {
                value: "Itaúba",
                label: "Itaúba",
                image: cambara,
                note: "Altíssima durabilidade natural para áreas externas",
              },
            ],
          },
          {
            key: "Comprimento",
            label: "Comprimento (2,5 m a 8,5 m)",
            options: COMPRIMENTOS_MADEIRA,
          },
        ],
        specs: [
          { label: "Essências", value: "Cedrinho, Angelim Pedra, Tauari e Itaúba" },
          { label: "Aplicações", value: "Forros, lambris, caibros e estruturas nobres" },
          { label: "Acabamento", value: "Aparelhada em plaina industrial" },
          { label: "Corte", value: "Sob medida no pátio" },
        ],
        bitolas: BITOLAS_NATIVA,
        instrucoes: INSTRUCOES_MADEIRA,
        note: "Disponibilidade conforme lote; consulte o comercial.",
        badges: ["DOF/IBAMA Legalizado"],
      },
      {
        slug: "madeirite-tabeiras",
        name: "Madeirite & Tabeiras",
        image: madeirite,
        gallery: [madeirite, tabeira],
        summary: "Chapas estruturais e acabamento periférico do telhado.",
        showQty: true,
        selectors: [
          {
            key: "Item",
            label: "Escolha o item",
            options: [
              { value: "Madeirite Resinado 10 mm", label: "Madeirite Resinado 10 mm", image: madeirite, note: "Chapa 2,20 x 1,10 m" },
              { value: "Madeirite Resinado 14 mm", label: "Madeirite Resinado 14 mm", image: madeirite, note: "Chapa 2,20 x 1,10 m" },
              { value: "Madeirite Plastificado 18 mm", label: "Madeirite Plastificado 18 mm", image: madeirite, note: "Fôrmas de concreto aparente" },
              { value: "Tabeira em Madeira Nobre", label: "Tabeira em Madeira Nobre", image: tabeira, note: "Aparelhada sob medida" },
            ],
          },
        ],
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
      "Anjo, Sayerlack, Vedacit — linha completa para proteger madeira, telha e alvenaria.",
    image: verniz,
    ctaLabel: "Ver Produtos",
    items: [
      {
        slug: "vernizes-stain-protector",
        name: "Vernizes & Stain Protector p/ Madeira",
        image: verniz,
        summary:
          "Proteção UV e ação hidrorrepelente: escolha a linha, a tonalidade e o tamanho da embalagem.",
        featured: true,
        showQty: true,
        cta: "Consultar Cores no Balcão",
        selectors: [
          {
            key: "Linha",
            label: "Linha do produto",
            options: [
              { value: "Verniz Marítimo", label: "Verniz Marítimo", note: "Alto brilho e filme resistente" },
              { value: "Stain Preservativo UV", label: "Stain Preservativo UV", note: "Acetinado, penetra na fibra e não descasca" },
            ],
          },
          {
            key: "Cor",
            label: "Tonalidade",
            options: [
              { value: "Incolor / Natural", label: "Incolor / Natural" },
              { value: "Canela", label: "Canela" },
              { value: "Mogno", label: "Mogno" },
              { value: "Imbuia", label: "Imbuia" },
              { value: "Nogueira", label: "Nogueira" },
            ],
          },
          {
            key: "Embalagem",
            label: "Embalagem",
            options: [
              { value: "Galão 3,6 L", label: "Galão 3,6 L", highlight: "Mais vendido" },
              { value: "Lata 900 ml", label: "Lata 900 ml" },
            ],
          },
        ],
        specs: [
          { label: "Rendimento", value: "~40 a 60 m²/galão por demão" },
          { label: "Indicação", value: "Madeiramento aparente, decks e portas" },
          { label: "Tonalidades", value: "Incolor, Canela, Mogno, Imbuia e Nogueira" },
          { label: "Acabamento", value: "Brilhante, acetinado ou fosco" },
        ],
      },
      {
        slug: "complementos-pintura",
        name: "Complementos de Pintura & Impermeabilização",
        image: tintaTelha,
        gallery: [tintaTelha, tintas],
        summary:
          "Tudo o que completa a proteção da obra: seladoras, resinas para telha, cupinicidas e tintas emborrachadas.",
        showQty: true,
        cta: "Consultar Cores no Balcão",
        selectors: [
          {
            key: "Produto",
            label: "Escolha o produto",
            options: [
              { value: "Seladora p/ Madeira", label: "Seladora p/ Madeira", image: verniz, note: "Base uniformizadora antes do verniz" },
              { value: "Resina Acrílica p/ Telhas", label: "Resina Acrílica p/ Telhas", image: tintaTelha, note: "Brilho e impermeabilização · base água ou solvente" },
              { value: "Cupinicida", label: "Cupinicida", image: tintas, note: "Preventivo e curativo contra cupim e broca" },
              { value: "Tinta Emborrachada", label: "Tinta Emborrachada", image: tintaTelha, note: "Lajes, telhas e alvenaria · barreira elástica" },
            ],
          },
          {
            key: "Embalagem",
            label: "Embalagem",
            options: [
              { value: "Galão 3,6 L", label: "Galão 3,6 L" },
              { value: "Balde 18 L", label: "Balde 18 L" },
            ],
          },
        ],
        specs: [
          { label: "Rendimento", value: "~20 a 50 m² por demão (conforme linha)" },
          { label: "Indicação", value: "Telhas cerâmicas, fibrocimento, lajes e madeiras" },
          { label: "Ação", value: "Impermeabilização, selagem e proteção contra cupim" },
          { label: "Embalagens", value: "Galão 3,6 L e balde 18 L" },
        ],
      },
    ],
  },
  {
    id: "calhas",
    title: "Calhas, Rufos & Funilaria",
    short: "Calhas & Rufos",
    description:
      "Calhas Alge e Aquapluv, rufos galvanizados e mantas térmicas e asfálticas.",
    image: rufos,
    ctaLabel: "Ver Produtos",
    items: [
      {
        slug: "rufos-calhas-pingadeiras",
        name: "Calhas, Rufos e Funilaria Sob Medida",
        image: rufos,
        summary:
          "Vedação galvanizada produzida sob medida: escolha o modelo e a largura do corte da chapa.",
        featured: true,
        showQty: true,
        selectors: [
          {
            key: "Modelo",
            label: "Modelo da peça",
            options: [
              { value: "Calha Moldura", label: "Calha Moldura", highlight: "Mais pedida" },
              { value: "Calha U", label: "Calha U" },
              { value: "Rufo Encosto", label: "Rufo Encosto" },
              { value: "Rufo Pingadeira", label: "Rufo Pingadeira" },
              { value: "Condutor", label: "Condutor" },
            ],
          },
          {
            key: "Corte",
            label: "Largura do corte",
            options: [
              { value: "28 cm", label: "28 cm" },
              { value: "33 cm", label: "33 cm" },
              { value: "40 cm", label: "40 cm" },
            ],
          },
        ],
        specs: [
          { label: "Produção", value: "Sob medida conforme o projeto" },
          { label: "Material", value: "Chapa galvanizada" },
          { label: "Cortes", value: "28, 33 e 40 cm" },
          { label: "Função", value: "Proteção contra infiltrações" },
        ],
      },
      {
        slug: "mantas-vedacao",
        name: "Mantas Térmicas e Asfálticas",
        image: vedacao,
        summary:
          "Manta térmica de alumínio dupla face e fitas asfálticas para vedação completa da cobertura.",
        showQty: true,
        selectors: [
          {
            key: "Item",
            label: "Escolha o item",
            options: [
              { value: "Manta Térmica Alumínio Dupla Face", label: "Manta Térmica Alumínio Dupla Face", image: vedacao, note: "Rolos de 25 m² e 50 m²" },
              { value: "Fita Asfáltica Multiuso", label: "Fita Asfáltica Multiuso", image: vedacao, note: "Vedação de rufos, calhas e trincas" },
            ],
          },
          {
            key: "Volume",
            label: "Volume",
            options: [
              { value: "Unidade / metro", label: "Unidade / metro" },
              { value: "Rolo 25 m²", label: "Rolo 25 m²" },
              { value: "Rolo 50 m²", label: "Rolo 50 m²" },
            ],
          },
        ],
        specs: [
          { label: "Manta Térmica", value: "Alumínio dupla face (25 e 50 m²)" },
          { label: "Fita Asfáltica", value: "Multiuso para vedação e calhas" },
          { label: "Aplicação", value: "Coberturas, rufos e trincas" },
          { label: "Disponibilidade", value: "Pronta entrega" },
        ],
      },
    ],
  },
  {
    id: "fixadores",
    title: "Fixadores & Acessórios",
    short: "Fixadores",
    description:
      "Parafusos para telha, pregos, espigões, kits de fixação e acessórios de instalação.",
    image: acessorios,
    ctaLabel: "Ver Produtos",
    items: [
      {
        slug: "kits-fixacao-vedacao",
        name: "Kits de Fixação e Vedações",
        image: acessorios,
        gallery: [acessorios, vedacao],
        summary:
          "Linha completa para qualquer estrutura metálica ou de madeira: parafusos, pregos e kits.",
        showQty: true,
        selectors: [
          {
            key: "Item",
            label: "Escolha o item",
            options: [
              { value: "Parafuso Autobrocante PVC/Fibrocimento", label: "Parafuso Autobrocante PVC/Fibrocimento", image: acessorios, note: "Com arruela de vedação" },
              { value: "Parafuso Soberbo com Vedação", label: "Parafuso Soberbo com Vedação", image: acessorios, note: "Fixação em madeiramento" },
              { value: "Pregos com/sem cabeça", label: "Pregos com/sem cabeça", image: acessorios, note: "Todas as bitolas, a granel ou em caixa" },
              { value: "Espigão / Gancho", label: "Espigão / Gancho", image: acessorios, note: "Acessórios de instalação" },
            ],
          },
          {
            key: "Volume",
            label: "Volume",
            options: [
              { value: "Unidade / metro", label: "Unidade / metro" },
              { value: "Caixa fechada", label: "Caixa fechada" },
              { value: "Pacote", label: "Pacote" },
            ],
          },
        ],
        specs: [
          { label: "Parafusos", value: "Soberbos e autobrocantes com arruela de vedação" },
          { label: "Pregos", value: "Com e sem cabeça, todas as bitolas" },
          { label: "Acessórios", value: "Espigões, ganchos e kits de instalação" },
          { label: "Vedação", value: "Arruelas e fitas complementares" },
        ],
        badges: ["Linha completa em estoque"],
      },
    ],
  },
];

export function findProduct(slug: string) {
  for (const category of CATEGORIES) {
    const item = category.items.find((i) => i.slug === slug);
    if (item) return { category, item };
  }
  return undefined;
}

export const ALL_PRODUCTS = CATEGORIES.flatMap((c) =>
  c.items.map((item) => ({ category: c, item })),
);

/** Slugs amigáveis do Nível 2 de Telhas → slug real do produto (Nível 3). */
export const ITEM_SLUG_ALIASES: Record<string, string> = {
  fibrocimento: "telha-fibrocimento-infibra",
  "colonial-pvc": "telha-pvc-colonial",
  ceramica: "telhas-ceramicas-tradicionais",
  policarbonato: "outros-modelos-telhas",
  polipropileno: "outros-modelos-telhas",
  concreto: "outros-modelos-telhas",
  cumeeiras: "cumeeiras-complementos",
  cambara: "madeira-cambara",
  eucalipto: "pinus-eucalipto-tratado",
  cedrinho: "outras-madeiras",
  pinus: "outras-madeiras",
  garapeira: "outras-madeiras",
  amescla: "outras-madeiras",
  "forro-pvc": "outras-madeiras",
  "forro-cedrinho": "outras-madeiras",
  madeirit: "madeirite-tabeiras",
  "tabeiras-deck": "madeirite-tabeiras",
  mourao: "madeirite-tabeiras",
};


export function findCategoryItem(categoryId: string, slug: string) {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return undefined;
  const realSlug = ITEM_SLUG_ALIASES[slug] ?? slug;
  const item = category.items.find((i) => i.slug === realSlug);
  if (!item) return undefined;
  return { category, item };
}
