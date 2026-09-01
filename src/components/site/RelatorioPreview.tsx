import { useEffect, useRef, useState } from "react";
import { relatorioTelhadoHtml, type RelatorioData } from "@/components/site/relatorio-telhado";

const A4_W = 794; // 210mm a 96dpi
const A4_H = 1123; // 297mm a 96dpi

/**
 * Preview em tela do relatório A4 — usa exatamente o mesmo HTML/CSS do PDF
 * dentro de um iframe escalado, garantindo que tela e PDF fiquem idênticos.
 */
export function RelatorioPreview({ dados }: { dados: RelatorioData }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [escala, setEscala] = useState(1);
  const [altura, setAltura] = useState(A4_H);
  const html = relatorioTelhadoHtml(dados);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const medir = () => setEscala(Math.min(1, el.clientWidth / A4_W));
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="w-full overflow-hidden">
      <div style={{ height: altura * escala }}>
        <iframe
          title="Pré-visualização do relatório do telhado"
          srcDoc={html}
          onLoad={(e) => {
            const doc = e.currentTarget.contentDocument;
            const h = doc?.body?.scrollHeight;
            if (h && h > 200) setAltura(Math.max(A4_H, h));
          }}
          style={{
            width: A4_W,
            height: altura,
            border: 0,
            transform: `scale(${escala})`,
            transformOrigin: "top left",
          }}
        />
      </div>
    </div>
  );
}

export default RelatorioPreview;
