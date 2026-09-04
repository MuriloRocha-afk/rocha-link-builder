import * as React from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Dispara uma única vez quando o elemento entra na tela. */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = React.useRef<T | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setInView(true);
      obs.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };

    // Fallback: alguns navegadores demoram a disparar o observer.
    const check = () => {
      const r = el.getBoundingClientRect();
      const h = window.innerHeight || 0;
      if (r.top < h * 0.92 && r.bottom > 0) reveal();
    };

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) reveal();
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...options }
    );
    obs.observe(el);
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return { ref, inView };
}

type RevealProps = React.HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  as?: "div" | "li" | "section";
};

/** Fade + slide-in único ao entrar na tela. */
export function Reveal({ delay = 0, className = "", style, children, ...rest }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 motion-safe:translate-y-9"
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms", ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}

/** Conta de 0 até `value` quando fica visível pela primeira vez. */
export function CountUp({
  value,
  duration = 1800,
  className = "",
  prefix = "",
  suffix = "",
}: {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [n, setN] = React.useState(0);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={`inline-block ${done ? "count-pop" : ""} ${className}`}>
      {prefix}
      {n.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}
