export type TipoTelhado = "1agua" | "2aguas" | "3aguas" | "4aguas";

const LARANJA = "#EA580C";
const LARANJA_ESC = "#B5450F";
const CINZA = "#94A3B8";
const CINZA_TXT = "#6B7280";
const TEXTO = "#1F2937";
const TELHA_FILL = "#FDEBD8";
const MADEIRA = "#E7E1D6";
const MADEIRA_BORDA = "#C8BFAE";

const fmt = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const FONTE = `font-family="Arial, Helvetica, sans-serif"`;

/** cota horizontal com traços de extremidade e rótulo (uma ou duas linhas) */
function cotaH(
  x1: number,
  x2: number,
  y: number,
  linha1: string,
  linha2?: string,
  cor = TEXTO,
  acima = true,
  peso = 700,
) {
  const meio = (x1 + x2) / 2;
  const yT = acima ? y - 8 : y + 14;
  const curto = Math.abs(x2 - x1) < 60;
  return `
  <line x1="${x1}" y1="${y - 5}" x2="${x1}" y2="${y + 5}" stroke="${cor}" stroke-width="1"/>
  <line x1="${x2}" y1="${y - 5}" x2="${x2}" y2="${y + 5}" stroke="${cor}" stroke-width="1"/>
  <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${cor}" stroke-width="1" marker-start="url(#seta)" marker-end="url(#seta)"/>
  <text x="${meio}" y="${curto ? yT - 18 : yT}" text-anchor="middle" font-size="${curto ? 9 : 10}" font-weight="${peso}" fill="${cor}">${linha1}</text>
  ${linha2 ? `<text x="${meio}" y="${(curto ? yT - 18 : yT) + 10}" text-anchor="middle" font-size="8.5" fill="${CINZA_TXT}">${linha2}</text>` : ""}`;
}

/** cota vertical com rótulo à esquerda */
function cotaV(y1: number, y2: number, x: number, linha1: string, linha2?: string, cor = TEXTO) {
  const meio = (y1 + y2) / 2;
  return `
  <line x1="${x - 5}" y1="${y1}" x2="${x + 5}" y2="${y1}" stroke="${cor}" stroke-width="1"/>
  <line x1="${x - 5}" y1="${y2}" x2="${x + 5}" y2="${y2}" stroke="${cor}" stroke-width="1"/>
  <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${cor}" stroke-width="1" marker-start="url(#seta)" marker-end="url(#seta)"/>
  <text x="${x - 9}" y="${meio - (linha2 ? 2 : -3)}" text-anchor="end" font-size="10" font-weight="700" fill="${cor}">${linha1}</text>
  ${linha2 ? `<text x="${x - 9}" y="${meio + 9}" text-anchor="end" font-size="9" fill="${CINZA_TXT}">${linha2}</text>` : ""}`;
}

const defs = `
  <defs>
    <marker id="seta" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 9.5 5 L 0 9 z" fill="${TEXTO}"/>
    </marker>
    <marker id="seta-laranja" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 9.5 5 L 0 9 z" fill="${LARANJA}"/>
    </marker>
    <marker id="seta-fluxo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${LARANJA}"/>
    </marker>
  </defs>`;

type Opts = {
  tipo: TipoTelhado;
  /** comprimento da construção em metros */
  comprimento?: number;
  /** largura da construção em metros */
  largura?: number;
  /** beiral lateral em metros */
  beiral?: number;
  /** beiral frontal em metros (se omitido usa o lateral) */
  beiralFrontal?: number;
};

/**
 * Planta baixa (vista superior) da cobertura: limite da cobertura em linha
 * sólida laranja, projeção da construção em tracejado, setas de escoamento de
 * água por água do telhado e cotas de beiral segmentadas + totais em laranja.
 */
export function croquiTelhadoSvg({ tipo, comprimento, largura, beiral, beiralFrontal }: Opts): string {
  const C = comprimento && comprimento > 0 ? comprimento : 10;
  const L = largura && largura > 0 ? largura : 5;
  const bLat = beiral && beiral > 0 ? beiral : 0;
  const bFro = beiralFrontal !== undefined && beiralFrontal > 0 ? beiralFrontal : bLat;

  const X0 = 122;
  const Y0 = 96;
  const W = 232;
  const H = 178;
  const X1 = X0 + W;
  const Y1 = Y0 + H;
  const cx = X0 + W / 2;
  const cy = Y0 + H / 2;

  const insetX = bLat > 0 ? Math.min(38, Math.max(16, (bLat / (L + 2 * bLat)) * W)) : 0;
  const insetY = bFro > 0 ? Math.min(34, Math.max(14, (bFro / (C + 2 * bFro)) * H)) : 0;

  const ax0 = X0 + insetX;
  const ay0 = Y0 + insetY;
  const ax1 = X1 - insetX;
  const ay1 = Y1 - insetY;

  const p: string[] = [];

  // limite da cobertura (inclui beirais)
  p.push(
    `<rect x="${X0}" y="${Y0}" width="${W}" height="${H}" fill="${TELHA_FILL}" fill-opacity="0.5" stroke="${LARANJA}" stroke-width="2.4"/>`,
  );
  // projeção da construção sob a cobertura
  p.push(
    `<rect x="${ax0}" y="${ay0}" width="${ax1 - ax0}" height="${ay1 - ay0}" fill="none" stroke="${CINZA}" stroke-width="1.3" stroke-dasharray="6 4"/>`,
  );

  // linhas de cumeeira / espigões + setas de escoamento
  const fluxoV = (x: number, yDe: number, yPara: number) =>
    `<line x1="${x}" y1="${yDe}" x2="${x}" y2="${yPara}" stroke="${LARANJA}" stroke-width="4" marker-end="url(#seta-fluxo)" stroke-linecap="butt"/>`;
  const fluxoH = (y: number, xDe: number, xPara: number) =>
    `<line x1="${xDe}" y1="${y}" x2="${xPara}" y2="${y}" stroke="${LARANJA}" stroke-width="4" marker-end="url(#seta-fluxo)" stroke-linecap="butt"/>`;
  const cume = (x1: number, y1: number, x2: number, y2: number, w = 2.4) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${LARANJA}" stroke-width="${w}" stroke-linecap="round"/>`;

  if (tipo === "1agua") {
    p.push(cume(X0, Y0, X1, Y0));
    p.push(fluxoV(cx - 44, ay0 + 16, ay1 - 12), fluxoV(cx + 44, ay0 + 16, ay1 - 12));
  } else if (tipo === "2aguas") {
    p.push(cume(X0, cy, X1, cy));
    p.push(fluxoV(cx, cy - 22, ay0 + 12), fluxoV(cx, cy + 22, ay1 - 12));
  } else if (tipo === "3aguas") {
    p.push(cume(X0, cy, X1 - H / 2, cy));
    p.push(cume(X1 - H / 2, cy, X1, Y0, 1.5), cume(X1 - H / 2, cy, X1, Y1, 1.5));
    p.push(fluxoV(cx - 30, cy - 22, ay0 + 12), fluxoV(cx - 30, cy + 22, ay1 - 12));
    p.push(fluxoH(cy, X1 - H / 2 + 14, ax1 - 10));
  } else {
    p.push(cume(X0 + H / 2, cy, X1 - H / 2, cy));
    p.push(
      cume(X0 + H / 2, cy, X0, Y0, 1.5),
      cume(X0 + H / 2, cy, X0, Y1, 1.5),
      cume(X1 - H / 2, cy, X1, Y0, 1.5),
      cume(X1 - H / 2, cy, X1, Y1, 1.5),
    );
    p.push(fluxoV(cx, cy - 22, ay0 + 12), fluxoV(cx, cy + 22, ay1 - 12));
    p.push(fluxoH(cy, X0 + H / 2 - 14, ax0 + 10), fluxoH(cy, X1 - H / 2 + 14, ax1 - 10));
  }

  // ----- cotas horizontais (topo) -----
  p.push(
    cotaH(X0, X1, 44, `${fmt(L + 2 * bLat)} m TOTAL (largura do telhado)`, undefined, LARANJA),
  );
  if (bLat > 0) {
    p.push(cotaH(X0, ax0, 86, `${fmt(bLat)} m`, "beiral"));
    p.push(cotaH(ax1, X1, 86, `${fmt(bLat)} m`, "beiral"));
  }
  p.push(cotaH(ax0, ax1, 86, `${fmt(L)} m`, "largura da construção"));

  // ----- cotas verticais (esquerda) -----
  if (bFro > 0) {
    p.push(cotaV(Y0, ay0, 108, `${fmt(bFro)} m`, "beiral"));
    p.push(cotaV(ay1, Y1, 108, `${fmt(bFro)} m`, "beiral"));
  }
  p.push(cotaV(ay0, ay1, 108, `${fmt(C)} m`, "comprimento"));
  p.push(
    `<line x1="52" y1="${Y0}" x2="52" y2="${Y1}" stroke="${LARANJA}" stroke-width="1" marker-start="url(#seta-laranja)" marker-end="url(#seta-laranja)"/>
     <text x="44" y="${cy}" text-anchor="middle" font-size="10" font-weight="700" fill="${LARANJA}" transform="rotate(-90 44 ${cy})">${fmt(C + 2 * bFro)} m TOTAL (comprimento)</text>`,
  );

  // ----- legenda -----
  p.push(`
  <line x1="${cx - 96}" y1="${Y1 + 26}" x2="${cx - 66}" y2="${Y1 + 26}" stroke="${LARANJA}" stroke-width="2.6"/>
  <text x="${cx - 58}" y="${Y1 + 29}" font-size="9" fill="${CINZA_TXT}">Limite da cobertura (inclui beirais)</text>
  <line x1="${cx - 96}" y1="${Y1 + 42}" x2="${cx - 66}" y2="${Y1 + 42}" stroke="${CINZA}" stroke-width="1.4" stroke-dasharray="6 4"/>
  <text x="${cx - 58}" y="${Y1 + 45}" font-size="9" fill="${CINZA_TXT}">Projeção da construção sob a cobertura</text>`);

  return `<svg viewBox="0 0 420 340" width="100%" ${FONTE} shape-rendering="geometricPrecision" role="img" aria-label="Planta baixa da cobertura" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  <text x="210" y="20" text-anchor="middle" font-size="11.5" font-weight="800" letter-spacing="0.6" fill="${TEXTO}">PLANTA BAIXA — COBERTURA (VISTA SUPERIOR)</text>
  ${p.join("\n  ")}
</svg>`;
}

type PerfilOpts = {
  tipo: TipoTelhado;
  /** largura da construção em metros */
  largura?: number;
  /** beiral lateral em metros */
  beiral?: number;
  /** inclinação em % */
  inclinacao: number;
};

/**
 * Corte / perfil do telhado: estrutura de madeira aparente (pilares e viga de
 * amarração), telhado com textura de telha, cumeeira destacada no topo,
 * cota da altura do oitão, do comprimento inclinado e cotas de beiral + total.
 */
export function croquiPerfilSvg({ tipo, largura, beiral = 0, inclinacao }: PerfilOpts): string {
  const L = largura && largura > 0 ? largura : 8;
  const b = beiral > 0 ? beiral : 0;
  const i = inclinacao / 100;
  const umaAgua = tipo === "1agua";
  const run = umaAgua ? L : L / 2;
  const h = run * i;
  const fator = Math.sqrt(1 + i * i);
  const inclinada = run * fator;
  /** o beiral informado é medido em projeção horizontal (mesma base da planta) */
  const bH = b;

  const totalM = L + 2 * bH;

  const escalaX = 286 / totalM;
  const escalaY = h > 0 ? Math.min(escalaX, 92 / h) : escalaX;
  const escala = Math.min(escalaX, escalaY);
  const px = (m: number) => m * escala;

  const cxBase = 212;
  const yBeiral = 208; // altura da linha de beiral (borda inferior do telhado)
  const xEsq = cxBase - px(L / 2);
  const xDir = cxBase + px(L / 2);
  const xB1 = xEsq - px(bH);
  const xB2 = xDir + px(bH);
  const yApex = yBeiral - px(h);
  const xApex = umaAgua ? xB1 : cxBase;

  const p: string[] = [];
  const chao = 262;

  // ----- estrutura de madeira aparente -----
  const pilarW = 9;
  const pilarEsq = xEsq + 14;
  const pilarDir = xDir - 14 - pilarW;
  const yViga = yBeiral - 22;
  p.push(
    `<line x1="${xB1 - 12}" y1="${chao}" x2="${xB2 + 12}" y2="${chao}" stroke="${CINZA}" stroke-width="1"/>`,
    // viga de amarração
    `<rect x="${pilarEsq - 6}" y="${yViga}" width="${pilarDir - pilarEsq + pilarW + 12}" height="9" fill="${MADEIRA}" stroke="${MADEIRA_BORDA}" stroke-width="1"/>`,
    // pilares
    `<rect x="${pilarEsq}" y="${yBeiral - 26}" width="${pilarW}" height="${chao - yBeiral + 26}" fill="${MADEIRA}" stroke="${MADEIRA_BORDA}" stroke-width="1"/>`,
    `<rect x="${pilarDir}" y="${yBeiral - 26}" width="${pilarW}" height="${chao - yBeiral + 26}" fill="${MADEIRA}" stroke="${MADEIRA_BORDA}" stroke-width="1"/>`,
  );

  /** desenha uma água com espessura de telha + textura de ondas */
  const agua = (x1: number, y1: number, x2: number, y2: number) => {
    const esp = 7;
    const out: string[] = [];
    out.push(
      `<path d="M ${x1} ${y1} L ${x2} ${y2} L ${x2} ${y2 + esp} L ${x1} ${y1 + esp} Z" fill="${TELHA_FILL}" stroke="${LARANJA}" stroke-width="1.6" stroke-linejoin="round"/>`,
    );
    const n = Math.max(6, Math.round(Math.hypot(x2 - x1, y2 - y1) / 11));
    for (let k = 1; k < n; k++) {
      const t = k / n;
      const xt = x1 + (x2 - x1) * t;
      const yt = y1 + (y2 - y1) * t;
      out.push(
        `<line x1="${xt}" y1="${yt}" x2="${xt}" y2="${yt + esp}" stroke="${LARANJA}" stroke-width="1" opacity="0.55"/>`,
      );
    }
    return out.join("\n  ");
  };

  if (umaAgua) {
    p.push(agua(xB1, yApex, xB2, yBeiral + px(bH * i)));
  } else {
    p.push(agua(xB1, yBeiral + px(bH * i), xApex, yApex));
    p.push(agua(xApex, yApex, xB2, yBeiral + px(bH * i)));
  }

  // ----- cumeeira no topo + linha indicativa -----
  if (!umaAgua) {
    p.push(
      `<ellipse cx="${xApex}" cy="${yApex - 2}" rx="8" ry="7" fill="#FFFFFF" stroke="${LARANJA}" stroke-width="1.8"/>`,
      `<path d="M ${xApex - 5} ${yApex + 1} Q ${xApex} ${yApex - 8} ${xApex + 5} ${yApex + 1}" fill="none" stroke="${LARANJA}" stroke-width="1.4"/>`,
      `<line x1="${xApex + 8}" y1="${yApex - 6}" x2="${xApex + 42}" y2="${yApex - 30}" stroke="${TEXTO}" stroke-width="0.9"/>`,
      `<text x="${xApex + 45}" y="${yApex - 31}" font-size="9" font-weight="700" fill="${TEXTO}">cumeeira</text>`,
    );

    // altura do oitão
    p.push(
      `<line x1="${xApex}" y1="${yApex + 6}" x2="${xApex}" y2="${yViga}" stroke="${TEXTO}" stroke-width="1" marker-start="url(#seta)" marker-end="url(#seta)"/>`,
      `<text x="${xApex - 22}" y="${(yApex + yViga) / 2 - 1}" text-anchor="end" font-size="10" font-weight="700" fill="${TEXTO}">${fmt(h)} m</text>`,
      `<text x="${xApex - 22}" y="${(yApex + yViga) / 2 + 11}" text-anchor="end" font-size="9" fill="${CINZA_TXT}">altura do oitão</text>`,
    );
  }

  // ----- comprimento inclinado (seta dupla ao longo da água direita) -----
  {
    const x1 = umaAgua ? xB1 : xApex;
    const y1 = umaAgua ? yApex : yApex;
    const x2 = xB2;
    const y2 = yBeiral + px(bH * i);
    const ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
    const dx = 16;
    const dy = -20;
    p.push(
      `<line x1="${x1 + dx}" y1="${y1 + dy}" x2="${x2 + dx}" y2="${y2 + dy}" stroke="${TEXTO}" stroke-width="1" marker-start="url(#seta)" marker-end="url(#seta)"/>`,
      `<g transform="translate(${(x1 + x2) / 2 + dx} ${(y1 + y2) / 2 + dy}) rotate(${ang})">
        <text x="0" y="-6" text-anchor="middle" font-size="10" font-weight="700" fill="${TEXTO}">${fmt(inclinada)} m</text>
        <text x="0" y="4" text-anchor="middle" font-size="8.5" fill="${CINZA_TXT}">comprimento inclinado</text>
      </g>`,
    );
  }

  // ----- cotas inferiores -----
  const yCota = chao + 20;
  if (b > 0) {
    p.push(cotaH(xB1, xEsq, yCota, `${fmt(b)} m`, "beiral"));
    p.push(cotaH(xDir, xB2, yCota, `${fmt(b)} m`, "beiral"));
  }
  p.push(cotaH(xEsq, xDir, yCota, `${fmt(L)} m`, "largura da construção"));
  p.push(cotaH(xB1, xB2, yCota + 40, `${fmt(L + 2 * bH)} m TOTAL (largura do telhado)`, undefined, LARANJA));

  return `<svg viewBox="0 0 420 340" width="100%" ${FONTE} shape-rendering="geometricPrecision" role="img" aria-label="Corte de perfil do telhado" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  <text x="210" y="20" text-anchor="middle" font-size="11.5" font-weight="800" letter-spacing="0.6" fill="${TEXTO}">CORTE — PERFIL (${tipo === "1agua" ? "1 ÁGUA" : tipo === "2aguas" ? "2 ÁGUAS" : tipo === "3aguas" ? "3 ÁGUAS" : "4 ÁGUAS"})</text>
  <text x="210" y="35" text-anchor="middle" font-size="10" font-weight="700" fill="${LARANJA_ESC}">INCLINAÇÃO ${inclinacao.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%</text>
  ${p.join("\n  ")}
</svg>`;
}
