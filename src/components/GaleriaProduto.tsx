import { useState } from "react";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";

export type ImagemProduto = {
  src: string;
  alt: string;
  legenda?: string;
};

type Props = {
  imagens: ImagemProduto[];
  titulo: string;
  /** Texto secundário do placeholder (padrão: "Foto em breve") */
  subtitulo?: string;
};

export default function GaleriaProduto({ imagens, titulo, subtitulo = "Foto em breve" }: Props) {
  const [indexAtivo, setIndexAtivo] = useState(0);
  const [erros, setErros] = useState<Record<number, boolean>>({});

  const lista: ImagemProduto[] =
    imagens.length > 0 ? imagens : [{ src: "", alt: titulo }];
  const index = Math.min(indexAtivo, lista.length - 1);

  const anterior = () => setIndexAtivo((i) => (i - 1 + lista.length) % lista.length);
  const proximo = () => setIndexAtivo((i) => (i + 1) % lista.length);

  const imagemAtiva = lista[index];
  const temErro = !imagemAtiva.src || erros[index];

  return (
    <section className="bg-white rounded-2xl overflow-hidden shadow-sm">
      {/* Imagem principal */}
      <div className="relative bg-gray-100 aspect-[4/3] sm:aspect-[16/9] flex items-center justify-center overflow-hidden">
        {temErro ? (
          /* Placeholder quando a imagem falha ou não foi adicionada ainda */
          <div className="flex flex-col items-center gap-3 text-gray-300 p-8 text-center">
            <Camera size={48} />
            <div>
              <p className="text-sm font-medium text-gray-400">{titulo}</p>
              <p className="text-xs text-gray-400 mt-1">Foto em breve</p>
            </div>
          </div>
        ) : (
          <img
            key={imagemAtiva.src}
            src={imagemAtiva.src}
            alt={imagemAtiva.alt}
            onError={() => setErros((e) => ({ ...e, [indexAtivo]: true }))}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        )}

        {/* Setas de navegação — só aparecem com 2+ imagens */}
        {imagens.length > 1 && !temErro && (
          <>
            <button onClick={anterior}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button onClick={proximo}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors">
              <ChevronRight size={18} />
            </button>
            {/* Contador */}
            <span className="absolute bottom-2 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
              {indexAtivo + 1}/{imagens.length}
            </span>
          </>
        )}

        {/* Legenda */}
        {imagemAtiva.legenda && !temErro && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
            <p className="text-white text-xs font-medium">{imagemAtiva.legenda}</p>
          </div>
        )}
      </div>

      {/* Miniaturas — só com 2+ imagens */}
      {imagens.length > 1 && (
        <div className="flex gap-2 p-3 overflow-x-auto">
          {imagens.map((img, i) => (
            <button key={i} onClick={() => setIndexAtivo(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${indexAtivo === i ? "border-orange-500" : "border-transparent hover:border-orange-300"}`}>
              {erros[i] ? (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <Camera size={16} className="text-gray-300" />
                </div>
              ) : (
                <img src={img.src} alt={img.alt}
                  onError={() => setErros((e) => ({ ...e, [i]: true }))}
                  className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
