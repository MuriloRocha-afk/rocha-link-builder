import { useEffect, useState } from "react";
import { Search, X, MessageCircle, ArrowRight, MoreHorizontal } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { agrupar, buscar, CATEGORIAS_SUGERIDAS, type ItemBusca } from "@/data/buscaIndex";
import { waLink } from "@/constants/whatsapp";

export function BuscaGlobal({
  className = "",
  placeholder = "Buscar produto (ex.: caibro, romana, calha...)",
}: {
  className?: string;
  placeholder?: string;
}) {
  const navigate = useNavigate();
  const [termo, setTermo] = useState("");
  const [aberto, setAberto] = useState(false);
  const [ativo, setAtivo] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const resultados = useMemo(() => buscar(termo), [termo]);
  const grupos = useMemo(() => agrupar(resultados), [resultados]);
  const mostrar = aberto && termo.trim().length >= 2;
  const semResultado = mostrar && resultados.length === 0;

  useEffect(() => setAtivo(0), [termo]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setAberto(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const irPara = (item: ItemBusca) => {
    const [pathname, query] = item.rota.split("?");
    const search = query ? Object.fromEntries(new URLSearchParams(query)) : undefined;
    setAberto(false);
    setTermo("");
    navigate({ to: pathname, search: search as never });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!mostrar || resultados.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setAtivo((i) => (i + 1) % resultados.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setAtivo((i) => (i - 1 + resultados.length) % resultados.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = resultados[ativo];
      if (item) irPara(item);
    } else if (e.key === "Escape") {
      setAberto(false);
    }
  };

  let indice = -1;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type="search"
          value={termo}
          onChange={(e) => {
            setTermo(e.target.value);
            setAberto(true);
          }}
          onFocus={() => setAberto(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label="Buscar produtos no catálogo"
          className="w-full bg-transparent text-sm [&::-webkit-search-cancel-button]:appearance-none text-foreground outline-none placeholder:text-muted-foreground"
        />
        {termo ? (
          <button
            type="button"
            onClick={() => setTermo("")}
            aria-label="Limpar busca"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {mostrar ? (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] lg:left-auto lg:w-[26rem] overflow-y-auto rounded-xl border border-border bg-card shadow-xl">
          {resultados.length > 0 ? (
            grupos.map((grupo) => (
              <div key={grupo.categoria} className="border-b border-border/60 last:border-0">
                <p className="px-4 pt-3 pb-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {grupo.categoria}
                </p>
                {grupo.itens.map((item) => {
                  indice += 1;
                  const selecionado = indice === ativo;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setAtivo(resultados.indexOf(item))}
                      onClick={() => irPara(item)}
                      className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors ${
                        selecionado ? "bg-accent/10" : "hover:bg-muted"
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-foreground">
                          {item.nome}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {[item.especie, item.material].filter(Boolean).join(" · ") ||
                            item.categoria}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </button>
                  );
                })}
              </div>
            ))
          ) : null}

          {semResultado ? (
            <div className="p-5">
              <p className="text-sm font-bold text-foreground">Nenhum resultado encontrado</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Não achamos nada para “{termo}”. Veja categorias próximas ou fale com a gente — nós
                conseguimos quase tudo para telhado.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {CATEGORIAS_SUGERIDAS.map((c) => (
                  <button
                    key={c.rota}
                    type="button"
                    onClick={() => {
                      setAberto(false);
                      setTermo("");
                      navigate({ to: c.rota });
                    }}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:border-accent hover:text-accent"
                  >
                    {c.nome}
                  </button>
                ))}
              </div>
              <a
                href={waLink(
                  `Olá! Procurei por "${termo}" no site da Rocha Telhas e não encontrei. Vocês têm esse produto?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-bold text-white hover:bg-green-700"
              >
                <MessageCircle className="h-4 w-4" />
                Perguntar no WhatsApp
              </a>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default BuscaGlobal;
