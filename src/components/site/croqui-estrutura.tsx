/**
 * Desenho técnico ilustrativo da estrutura de madeira (ripa/ripão sobre
 * caibro/caibrão sobre viga/terça).
 *
 * A peça configurada na etapa atual aparece destacada em laranja (cor de
 * marca) e o espaçamento correspondente é desenhado como cota sobre a própria
 * imagem — as demais peças ficam em cinza neutro.
 */

type Destaque = "ripa" | "caibro" | "viga" | "galga";

const LARANJA = "#EA580C";
const NEUTRO = "#94A3B8";
const NEUTRO_ESCURO = "#64748B";

const RIPAS_Y = [34, 62, 90, 118];
const CAIBROS_X = [56, 116, 176, 236];
const VIGAS_Y = [46, 106];

function Cota({
  orientacao,
  a,
  b,
  pos,
  texto,
}: {
  orientacao: "h" | "v";
  a: number;
  b: number;
  pos: number;
  texto: string;
}) {
  const meio = (a + b) / 2;
  if (orientacao === "h") {
    return (
      <g>
        <line x1={a} y1={pos - 5} x2={a} y2={pos + 5} stroke={LARANJA} strokeWidth="1.5" />
        <line x1={b} y1={pos - 5} x2={b} y2={pos + 5} stroke={LARANJA} strokeWidth="1.5" />
        <line x1={a} y1={pos} x2={b} y2={pos} stroke={LARANJA} strokeWidth="1.5" />
        <rect x={meio - 26} y={pos - 9} width="52" height="18" rx="9" fill="#FFF3EC" stroke={LARANJA} />
        <text x={meio} y={pos + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill={LARANJA}>
          {texto}
        </text>
      </g>
    );
  }
  return (
    <g>
      <line x1={pos - 5} y1={a} x2={pos + 5} y2={a} stroke={LARANJA} strokeWidth="1.5" />
      <line x1={pos - 5} y1={b} x2={pos + 5} y2={b} stroke={LARANJA} strokeWidth="1.5" />
      <line x1={pos} y1={a} x2={pos} y2={b} stroke={LARANJA} strokeWidth="1.5" />
      <rect x={pos - 28} y={meio - 9} width="56" height="18" rx="9" fill="#FFF3EC" stroke={LARANJA} />
      <text x={pos} y={meio + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill={LARANJA}>
        {texto}
      </text>
    </g>
  );
}

export function CroquiEstrutura({
  destaque,
  cota,
  legenda,
}: {
  destaque: Destaque;
  /** texto da cota desenhada sobre a imagem (ex.: "40 cm") */
  cota: string;
  legenda?: string;
}) {
  const corRipa = destaque === "ripa" || destaque === "galga" ? LARANJA : NEUTRO;
  const corCaibro = destaque === "caibro" ? LARANJA : NEUTRO;
  const corViga = destaque === "viga" ? LARANJA : NEUTRO_ESCURO;

  return (
    <figure className="rounded-xl border border-gray-200 bg-gray-50 p-3">
      <svg viewBox="0 0 330 175" className="h-auto w-full" role="img" aria-label={legenda ?? "Estrutura de madeira"}>
        {/* vigas / terças (3º apoio) — sob tudo */}
        {VIGAS_Y.map((y) => (
          <rect key={`v${y}`} x="20" y={y} width="270" height="12" rx="2" fill={corViga} opacity={destaque === "viga" ? 1 : 0.45} />
        ))}
        {/* caibros / caibrões (2º apoio) */}
        {CAIBROS_X.map((x) => (
          <rect key={`c${x}`} x={x} y="22" width="9" height="112" rx="2" fill={corCaibro} opacity={destaque === "caibro" ? 1 : 0.7} />
        ))}
        {/* ripas / ripões (1º apoio) */}
        {RIPAS_Y.map((y) => (
          <rect key={`r${y}`} x="26" y={y} width="258" height="6" rx="2" fill={corRipa} opacity={corRipa === LARANJA ? 1 : 0.9} />
        ))}

        {destaque === "galga" && <Cota orientacao="v" a={37} b={65} pos={305} texto={cota} />}
        {destaque === "ripa" && <Cota orientacao="h" a={60} b={120} pos={155} texto={cota} />}
        {destaque === "caibro" && <Cota orientacao="v" a={52} b={112} pos={305} texto={cota} />}
        {destaque === "viga" && <Cota orientacao="v" a={52} b={112} pos={305} texto={cota} />}
      </svg>
      {legenda && <figcaption className="mt-1 text-[11px] text-gray-500">{legenda}</figcaption>}
    </figure>
  );
}

export default CroquiEstrutura;
