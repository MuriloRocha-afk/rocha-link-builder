import { LOGO_ROCHA_SVG } from "@/components/site/logo-print";

export type RelItem = { nome: string; qtd: string; chave?: string | null; valor?: number };

export type RelComparativo = {
  nome: string;
  grupo: string;
  pecas: string;
  peso: string;
  inclinacaoMin: number;
  compativel: boolean;
  percentual: number | null;
};

export type RelatorioData = {
  chips: string[];
  croqui: string;
  perfil: string;
  stats: { label: string; valor: string; icone: string }[];
  colunaEsq: { titulo: string; icone: string; itens: RelItem[] }[];
  colunaDir: { titulo: string; icone: string; itens: RelItem[] }[];
  comparativo: RelComparativo[];
};

const O = "#E8622E";

/** ícones em SVG inline (traço laranja) usados nos títulos e indicadores */
export const ICONES: Record<string, string> = {
  cobertura: `<path d="M2 12 12 4l10 8"/><path d="M4 12v8h16v-8"/>`,
  acabamento: `<path d="M3 14 12 6l9 8"/><path d="M12 6v14"/>`,
  calhas: `<path d="M3 8h18l-2 8H5z"/><path d="M8 20v-4M16 20v-4"/>`,
  estrutura: `<path d="M4 18 18 4l2 2L6 20z"/><path d="M14 6l4 4"/>`,
  pregos: `<path d="M9 3h6l-2 4h-2z"/><path d="M12 7v14"/>`,
  base: `<rect x="3" y="5" width="18" height="14" rx="2" stroke-dasharray="4 3"/>`,
  inclinada: `<path d="M3 19 12 6l9 13z"/>`,
  largura: `<path d="M4 20h16"/><path d="M4 20 16 6"/><path d="M16 6v14"/>`,
  perimetro: `<rect x="4" y="6" width="16" height="12" rx="1"/>`,
  peso: `<path d="M6 8h12l2 12H4z"/><path d="M9 8a3 3 0 0 1 6 0"/>`,
  comparativo: `<path d="M12 4v16"/><path d="M5 8h14"/><path d="M5 8 2 15h6z"/><path d="M19 8l-3 7h6z"/>`,
  alerta: `<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>`,
};

const ico = (nome: string, tamanho = 13, cor = O) =>
  `<svg class="ico" width="${tamanho}" height="${tamanho}" viewBox="0 0 24 24" fill="none" stroke="${cor}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${ICONES[nome] ?? ""}</svg>`;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const linha = (i: RelItem) =>
  i.chave === null && /^Crit[ée]rios/i.test(i.nome)
    ? `<div class="criterio"><b>${esc(i.nome)}:</b> ${esc(i.qtd)}</div>`
    : `<div class="linha"><span class="nome">${esc(i.nome)}</span><span class="leader"></span><span class="qty">${esc(i.qtd)}</span></div>`;

const bloco = (titulo: string, icone: string, itens: RelItem[]) =>
  itens.length
    ? `<div class="bloco">
        <div class="section-title">${ico(icone)}<span>${esc(titulo)}</span></div>
        <div class="data">${itens.map(linha).join("")}</div>
      </div>`
    : "";

export const RELATORIO_CSS = `
  @page{size:A4 portrait;margin:0}
  *{box-sizing:border-box}
  body{font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;color:#1F2937;margin:0;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .page{width:210mm;min-height:297mm;padding:10mm 11mm 8mm;display:flex;flex-direction:column;background:#fff}
  .header{display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid ${O};padding-bottom:7px;margin-bottom:9px}
  .logo-block{display:flex;align-items:center;gap:10px}
  .brand{font-size:19px;font-weight:800;letter-spacing:-.4px;line-height:1.05;color:#0F172A}
  .brand span{color:${O}}
  .header-right{text-align:right}
  .header-right .title{font-size:14px;font-weight:700}
  .header-right .meta{font-size:9px;color:#6B7280;margin-top:2px}
  .chips{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:9px}
  .chip{background:#fff;border:1px solid #F3C6AC;color:${O};font-size:9.5px;font-weight:700;padding:4px 11px;border-radius:20px}
  .diagrams{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:9px}
  .diagram-box{border:1px solid #E9E2DC;border-radius:10px;padding:7px 8px;background:#fff;display:flex;align-items:center}
  .diagram-box>svg{width:100%;height:auto}
  svg{display:block}
  .stats{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:9px}
  .stat{border:1px solid #E9E2DC;border-radius:9px;padding:7px 8px;background:#fff;display:flex;flex-direction:column;gap:2px}
  .stat .top{display:flex;align-items:center;gap:5px}
  .stat .label{font-size:7.4px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:.3px;line-height:1.15}
  .stat .value{font-size:13.5px;font-weight:800;color:#0F172A}
  .two-col-sections{display:grid;grid-template-columns:1fr 1fr;gap:9px}
  .bloco{border:1px solid #E9E2DC;border-radius:9px;padding:7px 9px 8px;background:#fff;margin-bottom:9px}
  .section-title{display:flex;align-items:center;gap:5px;font-size:9.5px;font-weight:800;color:${O};text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}
  .data{font-size:8.6px}
  .data .linha{display:flex;align-items:baseline;gap:4px;padding:1.8px 0}
  .data .nome{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:0 1 auto;color:#374151}
  .data .leader{flex:1 1 auto;min-width:10px;border-bottom:1.4px dotted #C9CDD3;transform:translateY(-2px)}
  .data .qty{white-space:nowrap;font-weight:800;color:${O};flex:0 0 auto}
  .data .criterio{margin-top:3px;padding:0;font-size:7.8px;line-height:1.45;color:#4B5563}
  table.comparativo{width:100%;border-collapse:collapse;font-size:9px}
  table.comparativo thead th{color:${O};font-size:8px;text-transform:uppercase;letter-spacing:.3px;font-weight:800;padding:5px 7px;text-align:left;border-bottom:1.5px solid #F0D6C6}
  table.comparativo thead th.num{text-align:right}
  table.comparativo tbody td{padding:6px 7px;border-bottom:1px solid #F1F1F1;vertical-align:middle;color:#374151}
  table.comparativo tbody td.num{text-align:right;font-weight:800;color:#0F172A}
  table.comparativo tbody tr.reference{background:#FFF6F0}
  table.comparativo tbody tr.reference td{font-weight:600}
  .tag-ref{font-weight:800;color:#15803D}
  .tag-mais{font-weight:800;color:${O}}
  .compat{font-weight:800}
  .compat.ok{color:#15803D}
  .compat.no{color:#B91C1C}
  .nota{display:flex;gap:6px;font-size:7.8px;color:#6B7280;margin-top:5px;line-height:1.45}
  .footer{margin-top:auto}
  .disclaimer{display:flex;gap:8px;background:#FFF7F2;border:1px solid #F3C6AC;border-radius:9px;padding:8px 10px;font-size:8.6px;color:#4B5563;line-height:1.5}
  .disclaimer b{color:${O}}
  .footer-bottom{display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:8.2px;color:#6B7280;border-top:1px solid #E5E7EB;margin-top:8px;padding-top:7px}
  .footer-bottom .sep{color:#D1D5DB}
`;

export function relatorioTelhadoBody(d: RelatorioData, agora = new Date()): string {
  const logoGrande = LOGO_ROCHA_SVG.replace('width="58" height="32"', 'width="96" height="53"');

  const comparaHtml = d.comparativo.length
    ? `<div class="bloco">
      <div class="section-title">${ico("comparativo")}<span>Comparativo entre telhas do catálogo</span></div>
      <table class="comparativo">
        <thead><tr>
          <th>Telha</th><th class="num">Peças</th><th class="num">Peso</th>
          <th>Inclinação mínima</th><th>Comparação relativa</th>
        </tr></thead>
        <tbody>
        ${d.comparativo
          .map((c) => {
            const ref = c.percentual === 0;
            const badge = ref
              ? `<span class="tag-ref">REFERÊNCIA</span> Opção mais econômica`
              : c.percentual === null
                ? `<span class="tag-mais">—</span> custo sob cotação`
                : `<span class="tag-mais">+${c.percentual}%</span> mais cara que a referência`;
            return `<tr class="${ref ? "reference" : ""}">
              <td>${ref ? "<strong>" : ""}${esc(c.nome)}${ref ? "</strong>" : ""} — ${esc(c.grupo)}</td>
              <td class="num">${esc(c.pecas)}</td>
              <td class="num">${esc(c.peso)}</td>
              <td><span class="compat ${c.compativel ? "ok" : "no"}">${c.inclinacaoMin}% · ${c.compativel ? "compatível" : "incompatível"}</span></td>
              <td>${badge}</td>
            </tr>`;
          })
          .join("")}
        </tbody>
      </table>
      <div class="nota">${ico("alerta", 11, "#9CA3AF")}<span>A diferença percentual é calculada com a tabela interna da loja, sem exibir valores — serve apenas para comparar as opções entre si. Coberturas mais leves (PVC e policarbonato) exigem menos madeira; cerâmica e concreto pedem estrutura reforçada.</span></div>
    </div>`
    : "";

  return `<div class="page">
  <div class="header">
    <div class="logo-block">
      ${logoGrande}
      <div class="brand">ROCHA <span>TELHAS</span> &amp;<br/>MADEIRAS</div>
    </div>
    <div class="header-right">
      <div class="title">Cálculo de Telhado — Orçamento Estimado</div>
      <div class="meta">Gerado em ${agora.toLocaleDateString("pt-BR")} às ${agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</div>
    </div>
  </div>

  <div class="chips">${d.chips.filter(Boolean).map((c) => `<span class="chip">${esc(c)}</span>`).join("")}</div>

  <div class="diagrams">
    <div class="diagram-box">${d.croqui}</div>
    <div class="diagram-box">${d.perfil}</div>
  </div>

  <div class="stats">
    ${d.stats
      .map(
        (s) =>
          `<div class="stat"><div class="top">${ico(s.icone, 15)}<div class="label">${esc(s.label)}</div></div><div class="value">${esc(s.valor)}</div></div>`,
      )
      .join("")}
  </div>

  <div class="two-col-sections">
    <div>${d.colunaEsq.map((b) => bloco(b.titulo, b.icone, b.itens)).join("")}</div>
    <div>${d.colunaDir.map((b) => bloco(b.titulo, b.icone, b.itens)).join("")}</div>
  </div>

  ${comparaHtml}

  <div class="footer">
    <div class="disclaimer">
      ${ico("alerta", 16)}
      <span><b>ESTE DOCUMENTO É UMA ESTIMATIVA DE REFERÊNCIA</b> gerada automaticamente pela calculadora do site.
      Não apresenta valores em R$ — o preço final e a conferência definitiva das quantidades são feitos pela nossa
      equipe técnica na cotação com o vendedor.</span>
    </div>
    <div class="footer-bottom">
      <span>Rocha Telhas &amp; Madeiras</span>
      <span class="sep">|</span>
      <span>rochatelhas.com.br</span>
      <span class="sep">|</span>
      <span>(11) 97176-1003</span>
      <span style="margin-left:auto">Página 1 de 1</span>
    </div>
  </div>
</div>`;
}

/** documento completo (usado no PDF e no preview em iframe da tela) */
export function relatorioTelhadoHtml(d: RelatorioData, agora = new Date()): string {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<title>Cálculo de telhado — Rocha Telhas</title>
<style>${RELATORIO_CSS}</style></head><body>${relatorioTelhadoBody(d, agora)}</body></html>`;
}
