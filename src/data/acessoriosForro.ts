import type { AcessorioItem } from "@/components/site/BlocoAcessorios";

/**
 * Acessórios de forro de madeira — aplicável a Forro PVC, Forro Cedrinho e Forro Pinus.
 * @param areaM2 área estimada do forro em m² (usada para sugerir quantidades)
 */
export const acessoriosForroMadeira = (areaM2: number): AcessorioItem[] => {
  const area = Math.max(1, areaM2);
  const perimetro = Math.max(8, Math.ceil(Math.sqrt(area) * 4));
  return [
    {
      id: "meia-cana-forro",
      nome: "Meia-Cana — por metro",
      descricao: "Acabamento perimetral entre o forro e a parede.",
      emoji: "📐",
      unidade: "mt",
      categoria: "Madeiramento",
      quantidadeSugerida: perimetro,
    },
    {
      id: "prego-10x10-sem-cabeca",
      nome: "Prego 10×10 sem cabeça",
      descricao: "Fixação discreta das réguas do forro, sem marcar a face.",
      emoji: "📌",
      unidade: "emb",
      categoria: "Fixadores",
      quantidadeSugerida: Math.max(1, Math.ceil(area / 25)),
    },
    {
      id: "prego-12x12-sem-cabeca",
      nome: "Prego 12×12 sem cabeça",
      descricao: "Fixação em ripas e sarrafos de apoio mais espessos.",
      emoji: "📌",
      unidade: "emb",
      categoria: "Fixadores",
      quantidadeSugerida: Math.max(1, Math.ceil(area / 30)),
    },
  ];
};
