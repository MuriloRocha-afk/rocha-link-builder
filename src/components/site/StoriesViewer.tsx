import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type StoryItem = {
  src: string;
  alt: string;
  label: string;
  tag: string;
  /** "video" | "foto" — itens podem vir misturados na ordem que quiserem */
  tipo: "video" | "foto";
};

const FOTO_DURACAO_MS = 5000;

export function StoriesViewer({
  items,
  startIndex,
  onClose,
}: {
  items: StoryItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const [progresso, setProgresso] = useState(0);
  const [arrastoY, setArrastoY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touch = useRef<{ x: number; y: number; eixo: "x" | "y" | null } | null>(null);

  const atual = items[index];

  const proximo = useCallback(() => {
    setProgresso(0);
    setIndex((i) => (i >= items.length - 1 ? -1 : i + 1));
  }, [items.length]);

  const anterior = useCallback(() => {
    setProgresso(0);
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  useEffect(() => {
    if (index === -1) onClose();
  }, [index, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") proximo();
      if (e.key === "ArrowLeft") anterior();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, proximo, anterior]);

  // Foto: avança sozinha após duração fixa
  useEffect(() => {
    if (!atual || atual.tipo !== "foto") return;
    const inicio = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - inicio) / FOTO_DURACAO_MS);
      setProgresso(p);
      if (p >= 1) proximo();
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [atual, index, proximo]);

  // Vídeo em foco: com áudio, os demais ficam desmontados
  useEffect(() => {
    if (!atual || atual.tipo !== "video") return;
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    v.volume = 1;
    void v.play().catch(() => {
      v.muted = true;
      void v.play().catch(() => {});
    });
    return () => {
      v.pause();
    };
  }, [atual, index]);

  if (!atual) return null;

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY, eixo: null };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const st = touch.current;
    if (!st) return;
    const dx = e.touches[0].clientX - st.x;
    const dy = e.touches[0].clientY - st.y;
    if (!st.eixo && (Math.abs(dx) > 12 || Math.abs(dy) > 12)) {
      st.eixo = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (st.eixo === "y" && dy > 0) setArrastoY(dy);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const st = touch.current;
    touch.current = null;
    if (!st) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - st.x;
    const dy = t.clientY - st.y;
    setArrastoY(0);
    if (st.eixo === "y") {
      if (dy > 110) onClose();
      return;
    }
    if (st.eixo === "x") {
      if (dx < -50) proximo();
      else if (dx > 50) anterior();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={atual.label}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 p-3 sm:p-6"
    >
      {/* Barra de progresso estilo Stories */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex gap-1 p-3">
        {items.map((it, i) => (
          <span key={`${it.label}-${i}`} className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
            <span
              className="block h-full rounded-full bg-white"
              style={{
                width: i < index ? "100%" : i === index ? `${progresso * 100}%` : "0%",
              }}
            />
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-8 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
      >
        <X className="h-5 w-5" />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ transform: arrastoY ? `translateY(${arrastoY}px)` : undefined }}
        className="relative flex max-h-[86vh] max-w-[94vw] items-center justify-center transition-transform"
      >
        {atual.tipo === "video" ? (
          <video
            key={atual.src}
            ref={videoRef}
            src={atual.src}
            controls
            playsInline
            autoPlay
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (v.duration) setProgresso(v.currentTime / v.duration);
            }}
            onEnded={proximo}
            className="max-h-[86vh] max-w-[94vw] rounded-2xl"
          />
        ) : (
          <img
            src={atual.src}
            alt={atual.alt}
            className="max-h-[86vh] max-w-[94vw] rounded-2xl object-contain"
          />
        )}

        {/* Zonas de clique laterais (desktop) */}
        <button
          type="button"
          aria-label="Anterior"
          onClick={anterior}
          className="absolute top-0 bottom-0 left-0 hidden w-1/4 cursor-w-resize items-center justify-start pl-2 text-white/0 hover:text-white/70 sm:flex"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          type="button"
          aria-label="Próximo"
          onClick={proximo}
          className="absolute top-0 right-0 bottom-0 hidden w-1/4 cursor-e-resize items-center justify-end pr-2 text-white/0 hover:text-white/70 sm:flex"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/80">{atual.label}</p>
    </div>
  );
}
