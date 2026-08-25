export type TipoTelhado = "1agua" | "2aguas" | "3aguas" | "4aguas";

type Opts = {
  tipo: TipoTelhado;
  /** comprimento da base em metros */
  comprimento?: number;
  /** largura da base em metros */
  largura?: number;
  /** beiral em metros */
  beiral?: number;
};

const fmt = (n: number) => n.toLocaleString("pt-BR", { maximumFractionDigits: 2 });

/**
 * Planta baixa (vista superior) esquemática do telhado, no estilo dos croquis
 * técnicos: retângulo do telhado, alvenaria em tracejado, linhas de cumeeira e
 * espigões conforme o número de águas, com as medidas informadas.
 * Retorna markup SVG puro para ser usado na tela e também no PDF exportado.
 */
export function croquiTelhadoSvg({ tipo, comprimento, largura, beiral }: Opts): string {
  const X0 = 46;
  const Y0 = 34;
  const W = 236;
  const H = 132;
  const X1 = X0 + W;
  const Y1 = Y0 + H;
  const cx = X0 + W / 2;
  const cy = Y0 + H / 2;
  const inset = 16;

  const laranja = "#ea580c";
  const cinza = "#94a3b8";
  const texto = "#475569";

  const linhas: string[] = [];

  // telhado
  linhas.push(
    `<rect x="${X0}" y="${Y0}" width="${W}" height="${H}" rx="3" fill="#fff7ed" stroke="${laranja}" stroke-width="2"/>`,
  );
  // alvenaria (beiral)
  linhas.push(
    `<rect x="${X0 + inset}" y="${Y0 + inset}" width="${W - inset * 2}" height="${H - inset * 2}" rx="2" fill="none" stroke="${cinza}" stroke-width="1.4" stroke-dasharray="5 4"/>`,
  );

  const cume = (x1: number, y1: number, x2: number, y2: number) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${laranja}" stroke-width="2.4" stroke-linecap="round"/>`;
  const espigao = (x1: number, y1: number, x2: number, y2: number) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${laranja}" stroke-width="1.5" stroke-linecap="round" opacity="0.75"/>`;

  if (tipo === "1agua") {
    linhas.push(cume(X0, Y0, X1, Y0));
    for (let i = 1; i <= 3; i++) {
      const x = X0 + (W * i) / 4;
      linhas.push(
        `<line x1="${x}" y1="${Y1 - 8}" x2="${x}" y2="${Y0 + 8}" stroke="${cinza}" stroke-width="1.2" stroke-dasharray="3 3" marker-end="url(#cq-arrow)"/>`,
      );
    }
  }

  if (tipo === "2aguas") {
    linhas.push(cume(X0, cy, X1, cy));
  }

  if (tipo === "3aguas") {
    linhas.push(cume(X0, cy, X1 - H / 2, cy));
    linhas.push(espigao(X1 - H / 2, cy, X1, Y0));
    linhas.push(espigao(X1 - H / 2, cy, X1, Y1));
  }

  if (tipo === "4aguas") {
    linhas.push(cume(X0 + H / 2, cy, X1 - H / 2, cy));
    linhas.push(espigao(X0 + H / 2, cy, X0, Y0));
    linhas.push(espigao(X0 + H / 2, cy, X0, Y1));
    linhas.push(espigao(X1 - H / 2, cy, X1, Y0));
    linhas.push(espigao(X1 - H / 2, cy, X1, Y1));
  }

  // cotas
  const rotComp = comprimento ? `Comprimento ${fmt(comprimento)} m` : "Comprimento";
  const rotLarg = largura ? `Largura ${fmt(largura)} m` : "Largura";
  const rotBei = beiral ? `Beiral ${fmt(beiral)} m` : "Beiral";

  linhas.push(
    `<line x1="${X0}" y1="20" x2="${X1}" y2="20" stroke="${texto}" stroke-width="1" marker-start="url(#cq-arrow)" marker-end="url(#cq-arrow)"/>`,
    `<text x="${cx}" y="14" text-anchor="middle" font-size="10" font-weight="bold" fill="${texto}">${rotComp}</text>`,
    `<line x1="${X1 + 14}" y1="${Y0}" x2="${X1 + 14}" y2="${Y1}" stroke="${texto}" stroke-width="1" marker-start="url(#cq-arrow)" marker-end="url(#cq-arrow)"/>`,
    `<text x="${X1 + 20}" y="${cy}" font-size="10" font-weight="bold" fill="${texto}" transform="rotate(90 ${X1 + 20} ${cy})" text-anchor="middle">${rotLarg}</text>`,
    `<line x1="${X0}" y1="${Y1 + 12}" x2="${X0 + inset}" y2="${Y1 + 12}" stroke="${texto}" stroke-width="1" marker-start="url(#cq-arrow)" marker-end="url(#cq-arrow)"/>`,
    `<text x="${X0 + inset + 6}" y="${Y1 + 16}" font-size="9.5" font-weight="bold" fill="${texto}">${rotBei}</text>`,
    `<text x="${X0 + 6}" y="${Y0 - 4}" font-size="9" fill="${cinza}">vista superior</text>`,
  );

  return `<svg viewBox="0 0 330 200" width="100%" role="img" aria-label="Croqui do telhado em planta baixa" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="cq-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 1 L 9 5 L 0 9 z" fill="${texto}"/>
    </marker>
  </defs>
  ${linhas.join("\n  ")}
</svg>`;
}
