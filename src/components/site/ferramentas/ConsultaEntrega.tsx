import { useState } from "react";
import { MapPin, MessageCircle, Search, Truck } from "lucide-react";
import { waLink } from "@/constants/whatsapp";

type CidadeFixa = {
  id: string;
  display: string;
  termos: string[];
  cepPrefixo: string;
};

const CIDADES_FIXO: CidadeFixa[] = [
  { id: "franco", display: "Franco da Rocha", termos: ["franco da rocha"], cepPrefixo: "078" },
  { id: "caieiras", display: "Caieiras", termos: ["caieiras"], cepPrefixo: "077" },
  { id: "morato", display: "Francisco Morato", termos: ["morato", "francisco morato"], cepPrefixo: "079" },
];

const AVISO_ACESSO =
  "Para ruas estreitas ou acesso mais difícil, temos caminhão toco/3/4 disponível — avise nosso time na hora da cotação para já prepararmos o veículo certo.";

function removerAcentos(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** Digits-only CEP; empty when the input has no 8-digit CEP in it. */
function extrairCep(termo: string) {
  const digitos = termo.replace(/\D/g, "");
  return digitos.length >= 8 ? digitos.slice(0, 8) : null;
}

type Resultado =
  | { tipo: "fixo"; cidade: string }
  | { tipo: "regiao"; consulta: string };

function classificar(termo: string): Resultado | null {
  const t = removerAcentos(termo.trim().toLowerCase());
  if (!t) return null;

  const cep = extrairCep(t);
  if (cep) {
    const prefixo = cep.slice(0, 3);
    const porCep = CIDADES_FIXO.find((c) => c.cepPrefixo === prefixo);
    if (porCep) return { tipo: "fixo", cidade: porCep.display };
    return { tipo: "regiao", consulta: termo.trim() };
  }

  const porNome = CIDADES_FIXO.find((c) => c.termos.some((k) => t.includes(removerAcentos(k))));
  if (porNome) return { tipo: "fixo", cidade: porNome.display };
  return { tipo: "regiao", consulta: termo.trim() };
}

export function ConsultaEntrega() {
  const [termo, setTermo] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const consultar = (valor: string) => {
    const r = classificar(valor);
    setResultado(r);
  };

  const mensagemWhats = resultado
    ? `Olá! Consultei entrega no site para ${
        resultado.tipo === "fixo" ? resultado.cidade : resultado.consulta
      }. Gostaria de confirmar o frete e prazo para minha compra.`
    : "";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
      <div className="mb-5">
        <h3 className="text-lg font-extrabold text-primary">Consulte entrega e acesso</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Digite seu CEP ou cidade/bairro para ver o frete e o prazo da sua região.
        </p>
      </div>

      <div className="flex gap-2">
        <div className="relative min-w-0 flex-1">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            inputMode="search"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && consultar(termo)}
            placeholder="Ex: 07840-000, Franco da Rocha ou Mairiporã"
            className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 text-base font-[450] outline-none transition-colors focus:border-orange-400 sm:text-sm"
          />
        </div>
        <button
          type="button"
          onClick={() => consultar(termo)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-extrabold text-primary-foreground hover:opacity-90"
        >
          <Search size={15} /> Consultar
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {CIDADES_FIXO.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setTermo(c.display);
              consultar(c.display);
            }}
            className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-600 transition-colors hover:border-orange-400 hover:text-orange-600"
          >
            {c.display}
          </button>
        ))}
      </div>

      {resultado ? (
        <div
          className={`mt-5 animate-in fade-in rounded-2xl border p-5 duration-300 ${
            resultado.tipo === "fixo" ? "border-orange-300 bg-orange-50" : "border-blue-200 bg-blue-50"
          }`}
          key={resultado.tipo === "fixo" ? resultado.cidade : resultado.consulta}
        >
          {resultado.tipo === "fixo" ? (
            <>
              <p className="text-base font-extrabold text-primary sm:text-lg">
                🚚 Frete fixo de R$ 30 para {resultado.cidade}.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                O valor pode ser negociado dependendo da quantidade do pedido — consulte pelo
                WhatsApp.
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-extrabold text-orange-700 ring-1 ring-orange-200">
                🕒 Entrega em 1 a 3 dias úteis
              </p>
            </>
          ) : (
            <>
              <p className="text-base font-extrabold text-primary sm:text-lg">
                🚚 Entregamos na sua região!
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                O frete varia conforme a distância — envie seu endereço pelo WhatsApp para
                calcularmos o valor exato.
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-extrabold text-blue-700 ring-1 ring-blue-200">
                🕒 Prazo definido na negociação, conforme disponibilidade
              </p>
            </>
          )}

          <a
            href={waLink(mensagemWhats)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-extrabold text-white hover:opacity-90"
          >
            <MessageCircle size={16} /> Confirmar entrega no WhatsApp
          </a>
        </div>
      ) : null}

      <div className="mt-5 flex items-start gap-3 rounded-xl border border-gray-200 bg-secondary p-4">
        <Truck className="mt-0.5 size-4 shrink-0 text-accent" />
        <p className="text-xs leading-relaxed text-muted-foreground">{AVISO_ACESSO}</p>
      </div>
    </div>
  );
}

export default ConsultaEntrega;
