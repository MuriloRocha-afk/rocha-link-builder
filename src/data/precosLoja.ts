/**
 * Preços reais da tabela oficial Rocha & Telhas (tabela_de_preco 22/08/26).
 * Cada entrada guarda o código e a descrição do produto usado como referência,
 * com a especificação mais barata (min) e a mais cara (max) que são plausíveis
 * para o mesmo item da lista sugerida — a faixa vem da variação real de produto,
 * nunca de uma margem percentual inventada.
 */

export type LinhaPreco = {
  codigo: string;
  descricao: string;
  /** preço em R$ na unidade indicada em `unidade` */
  preco: number;
};

export type EntradaPreco = {
  /** unidade em que a quantidade calculada deve ser informada */
  unidade: "un" | "m" | "m2" | "kg";
  min: LinhaPreco;
  max: LinhaPreco;
};

const p = (codigo: string, descricao: string, preco: number): LinhaPreco => ({
  codigo,
  descricao,
  preco,
});

export const TABELA_PRECOS: Record<string, EntradaPreco> = {
  // ---------- Telhas de fibrocimento (INFIBRA) ----------
  "telha.fib-153": {
    unidade: "un",
    min: p("153011005", "Telha Ond. 153cm x 110cm x 5mm - INFIBRA", 38.1),
    max: p("1530110081", "Telha Ond. 153cm x 110cm x 8mm - INFIBRA", 80.54),
  },
  "telha.fib-183": {
    unidade: "un",
    min: p("183011005", "Telha Ond. 183cm x 110cm x 5mm - INFIBRA", 44.18),
    max: p("183011008", "Telha Ond. 183cm x 110cm x 8mm - INFIBRA", 96.34),
  },
  "telha.fib-244": {
    unidade: "un",
    min: p("244011005", "Telha Ond. 244cm x 110cm x 5mm - INFIBRA", 52.71),
    max: p("244011008", "Telha Ond. 244cm x 110cm x 8mm - INFIBRA", 128.48),
  },
  "telha.fib-305": {
    unidade: "un",
    min: p("305011006", "Telha Ond. 305cm x 110cm x 6mm - INFIBRA", 89.81),
    max: p("305011006", "Telha Ond. 305cm x 110cm x 6mm - INFIBRA", 89.81),
  },
  "telha.fib-366": {
    unidade: "un",
    min: p("366011006", "Telha Ond. 366cm x 110cm x 6mm - INFIBRA", 107.76),
    max: p("366011006", "Telha Ond. 366cm x 110cm x 6mm - INFIBRA", 107.76),
  },

  // ---------- Telhas Colonial PVC ----------
  "telha.pvc-230": {
    unidade: "un",
    min: p("23008601", "Telha Colonial PVC 230cm x 86cm - Cerâmica", 113.06),
    max: p("23008603", "Telha Colonial PVC 230cm x 86cm - Cinza", 124.34),
  },
  "telha.pvc-328": {
    unidade: "un",
    min: p("32808601", "Telha Colonial PVC 328cm x 86cm - Cerâmica", 164.54),
    max: p("32808603", "Telha Colonial PVC 328cm x 86cm - Cinza", 180.84),
  },
  "telha.pvc-459": {
    unidade: "un",
    min: p("45908601", "Telha Colonial PVC 459cm x 86cm - Cerâmica", 237.72),
    max: p("45908603", "Telha Colonial PVC 459cm x 86cm - Cinza", 253.06),
  },
  "telha.pvc-525": {
    unidade: "un",
    min: p("52508601", "Telha Colonial PVC 525cm x 86cm - Cerâmica", 280.69),
    max: p("52508603", "Telha Colonial PVC 525cm x 86cm - Cinza", 298.23),
  },

  // ---------- Telhas cerâmicas ----------
  "telha.cer-port": {
    unidade: "un",
    min: p("00189", "Telha Portuguesa - Resinada (Isotec)", 2.45),
    max: p("00188", "Telha Portuguesa - Mesclada Resinada (Rodrigues)", 3.05),
  },
  "telha.cer-romana": {
    unidade: "un",
    min: p("00196", "Telha Romana - Resinada (Isotec)", 2.45),
    max: p("011068", "Telha Romana - Top Telha Terracota Prime", 3.05),
  },

  // ---------- Policarbonato ----------
  "telha.pol-183": {
    unidade: "un",
    min: p("1830110", "Telha Policarbonato 183cm x 110cm - Cristal", 187.8),
    max: p("1830110", "Telha Policarbonato 183cm x 110cm - Cristal", 187.8),
  },
  "telha.pol-244": {
    unidade: "un",
    min: p("2440110", "Telha Policarbonato 244cm x 110cm - Cristal", 232.7),
    max: p("2440110", "Telha Policarbonato 244cm x 110cm - Cristal", 232.7),
  },
  "telha.pol-305": {
    unidade: "un",
    min: p("3050110", "Telha Policarbonato 305cm x 110cm - Cristal", 288.16),
    max: p("3050110", "Telha Policarbonato 305cm x 110cm - Cristal", 288.16),
  },
  "telha.pol-366": {
    unidade: "un",
    min: p("3660110", "Telha Policarbonato 366cm x 110cm - Cristal", 340.85),
    max: p("3660110", "Telha Policarbonato 366cm x 110cm - Cristal", 340.85),
  },

  // ---------- Concreto ----------
  "telha.con-euro": {
    unidade: "un",
    min: p("00201", "Telha De Concreto - Cinza - Eurotop", 3.68),
    max: p("00202", "Telha De Concreto - Grafite - Eurotop", 4.94),
  },

  // ---------- Acessórios de cobertura ----------
  "parafuso.vedacao": {
    unidade: "un",
    min: p("00630", "Parafuso com Vedação 110mm - Avulso", 1.8),
    max: p("00631", "Parafuso com Vedação 150mm - Avulso", 2.69),
  },
  "manta.termica.m2": {
    unidade: "m2",
    min: p("00580", "Manta Térmica Aluminizada - 1f x 50m² (R$ 264,10 ÷ 50 m²)", 5.28),
    max: p("00583", "Manta Térmica Aluminizada - 2f x 50m² (R$ 336,00 ÷ 50 m²)", 6.72),
  },
  "cumeeira.fibrocimento": {
    unidade: "un",
    min: p("00394", "Cumeeira - Fibrocimento - Normal 15° - 092cm x 60cm x 6mm", 48.68),
    max: p("00393", "Cumeeira - Fibrocimento - Normal 15° - 110cm x 60cm x 6mm", 56.92),
  },
  "kit.fixacao.pvc": {
    unidade: "un",
    min: p("146032", "Kit de Fixação e Vedação (Sem Parafuso) Cores", 29.5),
    max: p("146032", "Kit de Fixação e Vedação (Sem Parafuso) Cores", 29.5),
  },
  "cumeeira.pvc": {
    unidade: "un",
    min: p("5308601", "Cumeeira - PVC - Central Fixa - 53cm x 86cm - Cerâmica", 89.15),
    max: p("53086032", "Cumeeira - PVC - Central Articulada - 53cm x 86cm - Cinza", 110.74),
  },
  "cumeeira.barro": {
    unidade: "un",
    min: p("00384", "Cumeeira - Barro - Larga - Resinada", 3.7),
    max: p("00381", "Cumeeira - Mesclada Branca - Resinada", 6.9),
  },

  // ---------- Calhas, rufos e acessórios (linha Alge Corte 33) ----------
  "calha.m": {
    unidade: "m",
    min: p("00265", "Alge - Calha Moldura Corte 33 - 2,0m (R$ 58,48 ÷ 2 m)", 29.24),
    max: p("00269", "Alge - Calha Moldura Corte 33 - 6,0m (R$ 194,21 ÷ 6 m)", 32.37),
  },
  "rufo.m": {
    unidade: "m",
    min: p("00276", "Alge - Rufo Corte 33 - 2,0m (R$ 58,48 ÷ 2 m)", 29.24),
    max: p("01060", "Alge - Rufo Corte 33 - 6,0m (R$ 175,44 ÷ 6 m)", 29.24),
  },
  "aguafurtada.m": {
    unidade: "m",
    min: p("00286", "Alge - Água Furtada Corte 28 - 3,0m (R$ 136,00 ÷ 3 m)", 45.33),
    max: p("00286", "Alge - Água Furtada Corte 28 - 3,0m (R$ 136,00 ÷ 3 m)", 45.33),
  },
  "suporte.calha": {
    unidade: "un",
    min: p("00284", "Alge - Suporte Calha Moldura 28/33", 13.18),
    max: p("00285", "Alge - Suporte Calha Platibanda 28/33", 13.18),
  },
  "saida.calha": {
    unidade: "un",
    min: p("00279", "Alge - Saída Central Moldura 28/33", 27.45),
    max: p("00281", "Alge - Saída Lateral Moldura 28/33 Direita", 52.58),
  },
  "cabeceira.calha": {
    unidade: "un",
    min: p("00257", "Alge - Cabeceira Moldura 28/33 - Direita", 10.52),
    max: p("00793", "Tigre - Aquapluv - Cabeceira - Direita - Bege", 19.57),
  },
  "vedacalha": {
    unidade: "un",
    min: p("00996", "Tek Bond - Veda Calha - Alumínio - 280g", 23.9),
    max: p("00996", "Tek Bond - Veda Calha - Alumínio - 280g", 23.9),
  },

  // ---------- Estrutura de madeira (preço por metro linear) ----------
  "madeira.cambara.caibro": {
    unidade: "m",
    min: p("0507061", "Cambará - Caibro 5cm x 7cm x 6.0m - Bruto (R$ 93,68 ÷ 6 m)", 15.61),
    max: p("0507062", "Cambará - Caibro 5cm x 7cm x 6.0m - Aparelhado (R$ 105,88 ÷ 6 m)", 17.65),
  },
  "madeira.cambara.viga": {
    unidade: "m",
    min: p("05015061", "Cambará - Viga 5cm x 15cm x 6.0m - Bruta (R$ 187,45 ÷ 6 m)", 31.24),
    max: p("05015062", "Cambará - Viga 5cm x 15cm x 6.0m - Aparelhada (R$ 211,76 ÷ 6 m)", 35.29),
  },
  "madeira.cambara.ripa": {
    unidade: "m",
    min: p("01505012", "Cambará - Ripa 1,5cm x 5cm - Bruta C/R", 3.56),
    max: p("01505011", "Cambará - Ripa 1,5cm x 5cm - Aparelhada", 4.36),
  },
  "madeira.peroba.caibro": {
    unidade: "m",
    min: p("05070112", "Peroba do Norte - Caibro 5cm x 7cm x 1.0m - Bruto", 18.17),
    max: p("05070122", "Peroba do Norte - Caibro 5cm x 7cm x 1.0m - Aparelhado", 21.44),
  },
  "madeira.peroba.viga": {
    unidade: "m",
    min: p("050150112", "Peroba do Norte - Viga 5cm x 15cm x 1.0m - Bruta", 36.35),
    max: p("050150122", "Peroba do Norte - Viga 5cm x 15cm x 1.0m - Aparelhada", 42.89),
  },
  "madeira.peroba.ripa": {
    unidade: "m",
    min: p("020501", "Peroba do Norte - Ripão 2cm x 5cm - Bruto", 4.85),
    max: p("020502", "Peroba do Norte - Ripão 2cm x 5cm - Aparelhado", 5.72),
  },
  "madeira.eucalipto.caibro": {
    unidade: "m",
    min: p("0003281", "Eucalipto - Caibro 5cm x 7cm x 3,0m (R$ 27,30 ÷ 3 m)", 9.1),
    max: p("0003281", "Eucalipto - Caibro 5cm x 7cm x 3,0m (R$ 27,30 ÷ 3 m)", 9.1),
  },
  "madeira.eucalipto.viga": {
    unidade: "m",
    min: p("0001012", "Eucalipto - Viga 5cm x 15cm x 4,0m (R$ 78,60 ÷ 4 m)", 19.65),
    max: p("0009", "Eucalipto - Viga 5cm x 15cm x 6,0m (R$ 117,90 ÷ 6 m)", 19.65),
  },
  "madeira.garapeira.ripa": {
    unidade: "m",
    min: p("00421", "Garapeira - Ripa 1,5cm x 5cm - Bruta", 5.36),
    max: p("00420", "Garapeira - Ripa 1,5cm x 5cm - Aparelhada", 6.46),
  },
  "prego.18x27": {
    unidade: "kg",
    min: p("180271", "Prego Polido com Cabeça 18x27 - kg", 18.5),
    max: p("180271", "Prego Polido com Cabeça 18x27 - kg", 18.5),
  },

  // ---------- Forro ----------
  "forro.pvc.3": {
    unidade: "un",
    min: p("00523", "Forro - PVC Branco - 20cm x 3,0m", 16.07),
    max: p("00523", "Forro - PVC Branco - 20cm x 3,0m", 16.07),
  },
  "forro.pvc.4": {
    unidade: "un",
    min: p("00525", "Forro - PVC Branco - 20cm x 4,0m", 21.42),
    max: p("00525", "Forro - PVC Branco - 20cm x 4,0m", 21.42),
  },
  "forro.pvc.5": {
    unidade: "un",
    min: p("00527", "Forro - PVC Branco - 20cm x 5,0m", 26.78),
    max: p("00527", "Forro - PVC Branco - 20cm x 5,0m", 26.78),
  },
  "forro.pvc.6": {
    unidade: "un",
    min: p("00529", "Forro - PVC Branco - 20cm x 6,0m", 34.29),
    max: p("00529", "Forro - PVC Branco - 20cm x 6,0m", 34.29),
  },
  "meiacana.m": {
    unidade: "m",
    min: p("81781", "Meia Cana Cedrinho", 6.3),
    max: p("00585", "Meia Cana - Cedrinho", 7.5),
  },

  // ---------- Tintas, vernizes e acabamentos ----------
  "tinta.verniz.duramais": {
    unidade: "un",
    min: p("01022", "Anjo - Verniz Dura Mais - Natural - Brilhante - 3,6L", 158.78),
    max: p("01022", "Anjo - Verniz Dura Mais - Natural - Brilhante - 3,6L", 158.78),
  },
  "tinta.verniz.maritimo": {
    unidade: "un",
    min: p("01028", "Anjo - Verniz Marítimo Premium - Natural - Brilhante - 3,6L", 130.48),
    max: p("011062", "Anjo - Verniz Marítimo Premium - Imbuia - Brilhante - 3,6L", 130.48),
  },
  "tinta.selador.acrilico": {
    unidade: "un",
    min: p("00295", "Anjo - Selador Acrílico - Branco Fosco - 3,6L", 35.74),
    max: p("00295", "Anjo - Selador Acrílico - Branco Fosco - 3,6L", 35.74),
  },
  "tinta.stain.ipe": {
    unidade: "un",
    min: p("01007", "Anjo - Stain Casa - Ipê - Acetinado - 3,6L", 236.4),
    max: p("01007", "Anjo - Stain Casa - Ipê - Acetinado - 3,6L", 236.4),
  },
  "tinta.stain.imbuia": {
    unidade: "un",
    min: p("01001", "Anjo - Stain Casa - Imbuia - Acetinado - 3,6L", 229.23),
    max: p("01001", "Anjo - Stain Casa - Imbuia - Acetinado - 3,6L", 229.23),
  },
  "tinta.stain.incolor": {
    unidade: "un",
    min: p("01004", "Anjo - Stain Casa - Incolor - Acetinado - 3,6L", 192.14),
    max: p("01004", "Anjo - Stain Casa - Incolor - Acetinado - 3,6L", 192.14),
  },
  "tinta.esmalte.tomplus": {
    unidade: "un",
    min: p("00326", "Anjo - Esmal. Sin. Tomplus - Preto Brilhante - 3,6L", 85.4),
    max: p("00325", "Anjo - Esmal. Sin. Tomplus - Vermelho Brilhante - 3,6L", 98.38),
  },
  "tinta.emborrachada.18": {
    unidade: "un",
    min: p("00346", "Anjo - Emborrachada - 16,2L", 575.28),
    max: p("00345", "Anjo - Emborrachada - 18L", 675.0),
  },
  "tinta.anjomais": {
    unidade: "un",
    min: p("00343", "Anjo - AnjoMais - Base B Fosca - 16,2L", 290.85),
    max: p("00342", "Anjo - AnjoMais - Base A Fosca - 16,2L", 323.17),
  },
  "tinta.cupicida.5l": {
    unidade: "un",
    min: p("00462", "Ecol - Exterminador De Cupim - 5L", 149.67),
    max: p("0001", "Apus Química - Exterminador de Cupim - 5L", 149.9),
  },
  "tinta.vedalit.18": {
    unidade: "un",
    min: p("00932", "Vedacit - Vedalit - 18L", 112.5),
    max: p("00932", "Vedacit - Vedalit - 18L", 112.5),
  },
  "tinta.penetrol.3.6": {
    unidade: "un",
    min: p("00925", "Vedacit - Penetrol - 3,6L", 139.9),
    max: p("00925", "Vedacit - Penetrol - 3,6L", 139.9),
  },
};

export type ItemCusto = {
  /** chave na tabela de preços; null/desconhecida => item fica fora da faixa */
  chave?: string | null;
  nome: string;
  /** quantidade já na unidade da entrada de preço */
  qtd: number;
};

export type ResultadoFaixa = {
  min: number;
  max: number;
  /** nomes dos itens sem preço tabelado */
  naoEncontrados: string[];
  /** referências reais usadas no cálculo */
  referencias: { item: string; min: LinhaPreco; max: LinhaPreco }[];
};

export function estimarFaixa(itens: ItemCusto[]): ResultadoFaixa {
  let min = 0;
  let max = 0;
  const naoEncontrados: string[] = [];
  const referencias: ResultadoFaixa["referencias"] = [];

  for (const item of itens) {
    if (!item.qtd || item.qtd <= 0) continue;
    const entrada = item.chave ? TABELA_PRECOS[item.chave] : undefined;
    if (!entrada) {
      naoEncontrados.push(item.nome);
      continue;
    }
    min += entrada.min.preco * item.qtd;
    max += entrada.max.preco * item.qtd;
    referencias.push({ item: item.nome, min: entrada.min, max: entrada.max });
  }

  return { min, max, naoEncontrados, referencias };
}

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
