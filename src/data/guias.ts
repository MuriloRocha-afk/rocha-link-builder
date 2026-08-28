export type BlocoGuia =
  | { tipo: "h2"; texto: string }
  | { tipo: "p"; texto: string }
  | { tipo: "lista"; itens: string[] };

export type Guia = {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  tempoLeitura: string;
  /** URL da imagem de capa. Vazio = placeholder até a foto real ser anexada. */
  imagem?: string;
  corpo: BlocoGuia[];
};

export const GUIAS: Guia[] = [
  {
    slug: "quantas-telhas-voce-precisa",
    titulo: "Quantas telhas você precisa para o seu telhado?",
    resumo:
      "Aprenda a calcular a quantidade certa de telhas por m², entender a inclinação e evitar sobra ou falta de material na obra.",
    categoria: "Cálculo de obra",
    tempoLeitura: "6 min de leitura",
    corpo: [
      {
        tipo: "p",
        texto:
          "Comprar telha a mais custa dinheiro parado; comprar a menos para a obra e ainda arrisca diferença de lote e tonalidade. A boa notícia é que o cálculo é simples quando você separa duas coisas: a área real do telhado (que não é a área da casa) e o consumo por metro quadrado de cada modelo de telha.",
      },
      { tipo: "h2", texto: "1. A área do telhado não é a área da planta" },
      {
        tipo: "p",
        texto:
          "A planta baixa mostra a projeção horizontal. O telhado é inclinado, então ele sempre tem mais área do que a planta. Além disso, entra o beiral — aquele avanço da telha para fora da parede, normalmente entre 40 cm e 80 cm de cada lado. Some o beiral à projeção e depois aplique o fator de inclinação.",
      },
      {
        tipo: "lista",
        itens: [
          "Inclinação 30% (cerâmica): multiplique a área projetada por 1,05",
          "Inclinação 40%: multiplique por 1,08",
          "Fibrocimento com 10% a 15%: multiplique por 1,01 a 1,02",
        ],
      },
      { tipo: "h2", texto: "2. Consumo médio por metro quadrado" },
      {
        tipo: "p",
        texto:
          "Cada modelo tem um rendimento diferente. Use estes números como referência e confirme sempre com a ficha do fabricante do lote que você vai comprar:",
      },
      {
        tipo: "lista",
        itens: [
          "Cerâmica portuguesa / romana: 16 a 17 peças por m²",
          "Cerâmica colonial (capa e canal): 24 a 26 peças por m²",
          "Concreto: 10 a 11 peças por m²",
          "PVC colonial: vendida por peça de comprimento fixo — calcule por metro linear",
          "Fibrocimento: vendida por chapa, calcule pelo comprimento útil com sobreposição",
        ],
      },
      { tipo: "h2", texto: "3. Sobreposição e perdas" },
      {
        tipo: "p",
        texto:
          "Telhas se encaixam umas sobre as outras, e essa sobreposição já está embutida no consumo por m² das cerâmicas. No fibrocimento e no PVC ela precisa ser descontada do comprimento da peça. Sobre o total, trabalhe com uma margem de segurança de 2% para quebras no transporte e no assentamento — em telhados com muitos recortes, água furtada ou rincão, suba para 5%.",
      },
      { tipo: "h2", texto: "4. Não esqueça a cumeeira e os acessórios" },
      {
        tipo: "p",
        texto:
          "A cumeeira é calculada em metros lineares da linha de topo do telhado, com cerca de 3 peças por metro no modelo cerâmico. Além dela, entram parafusos ou pregos de fixação, rufos, calhas e, no madeiramento, ripas, caibros e terças dimensionados conforme o peso da telha escolhida.",
      },
      { tipo: "h2", texto: "5. O jeito rápido: use a calculadora" },
      {
        tipo: "p",
        texto:
          "Nossa calculadora de telhado faz todas essas contas de uma vez: você informa as medidas de cada água, o beiral, o modelo da telha e a inclinação, e ela devolve a quantidade de telhas, cumeeiras, madeiramento e fixadores — com margem já aplicada e pronta para enviar como orçamento pelo WhatsApp.",
      },
    ],
  },
];

export function getGuia(slug: string) {
  return GUIAS.find((g) => g.slug === slug);
}

export function guiasRelacionados(slug: string, limite = 3) {
  return GUIAS.filter((g) => g.slug !== slug).slice(0, limite);
}
