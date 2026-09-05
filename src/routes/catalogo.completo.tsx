import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Printer } from "lucide-react";
import { RochaLogoHorizontal } from "@/components/site/RochaLogoMark";
import { CONTATO, waLink, WHATSAPP_NUMBER } from "@/components/site/shared";
import { SECOES_PDF, type ProdutoPdf } from "@/data/catalogoCompleto";
import fotoPatio from "@/assets/IMG_1486.jpg.asset.json";
import fotoLoja from "@/assets/IMG_1490.jpg.asset.json";

const TITLE = "Catálogo Completo em PDF | Rocha Telhas";
const DESCRIPTION =
  "Catálogo completo da Rocha Telhas em PDF: telhas e cobertura, madeiras, calhas, tintas e ferragens com fotos e opções disponíveis.";

/** Quantos blocos de produto cabem por página A4. */
const POR_PAGINA = 4;

function paginar<T>(itens: T[], tamanho: number) {
  const paginas: T[][] = [];
  for (let i = 0; i < itens.length; i += tamanho) paginas.push(itens.slice(i, i + tamanho));
  return paginas.length ? paginas : [[]];
}

export const Route = createFileRoute("/catalogo/completo")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CatalogoCompletoPage,
});

function Pagina({
  children,
  numero,
  titulo,
}: {
  children: React.ReactNode;
  numero?: number;
  titulo?: string;
}) {
  return (
    <section className="cat-page relative mx-auto mb-6 flex w-[210mm] flex-col overflow-hidden bg-white text-[#0F1B2D] shadow-[var(--shadow-card)] print:mb-0 print:shadow-none">
      {titulo ? (
        <header className="flex items-center justify-between border-b border-[#E3E7EE] px-[14mm] pt-[10mm] pb-3">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#8A93A2] uppercase">
            Rocha Telhas · Catálogo de Produtos
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#E8622E] uppercase">
            {titulo}
          </span>
        </header>
      ) : null}
      <div className="flex-1">{children}</div>
      {numero ? (
        <footer className="flex items-center justify-between border-t border-[#E3E7EE] px-[14mm] pt-3 pb-[10mm] text-[9px] text-[#8A93A2]">
          <span>rochatelhas.com.br · (11) 97176-1003</span>
          <span>{numero}</span>
        </footer>
      ) : null}
    </section>
  );
}

function BlocoProduto({ produto }: { produto: ProdutoPdf }) {
  const fotos = produto.fotos.slice(0, 3);
  return (
    <article className="flex break-inside-avoid gap-4 rounded-xl border border-[#E3E7EE] p-4">
      <div className="flex w-[46mm] shrink-0 flex-col gap-2">
        {fotos.length ? (
          fotos.slice(0, 2).map((f) => (
            <img
              key={f.src}
              src={f.src}
              alt={f.alt || produto.nome}
              className="h-[24mm] w-full rounded-lg object-cover"
            />
          ))
        ) : (
          <div className="flex h-[24mm] w-full items-center justify-center rounded-lg border border-dashed border-[#C9D0DA] bg-[#F5F7FA] text-[10px] font-semibold text-[#8A93A2]">
            Foto em breve
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-[13px] leading-tight font-extrabold text-[#0F1B2D]">{produto.nome}</h3>
        <p className="mt-1 line-clamp-3 text-[10px] leading-snug text-[#5A6472]">
          {produto.descricao}
        </p>
        <div className="mt-2 space-y-1">
          {produto.opcoes.length ? (
            produto.opcoes.slice(0, 3).map((g) => (
              <p key={g.label} className="text-[9.5px] leading-snug text-[#0F1B2D]">
                <span className="font-bold text-[#E8622E]">{g.label}: </span>
                {g.valores.slice(0, 10).join(" · ")}
              </p>
            ))
          ) : (
            <p className="text-[9.5px] text-[#8A93A2]">Opções sob consulta no WhatsApp.</p>
          )}
        </div>
      </div>
    </article>
  );
}

function CatalogoCompletoPage() {
  // numeração: 1 capa, 2 institucional, 3 sumário, seções a partir da 4
  let pagina = 3;
  const secoes = SECOES_PDF.map((s) => {
    const paginas = paginar(s.produtos, POR_PAGINA);
    const inicio = pagina + 1;
    pagina += paginas.length;
    return { ...s, paginas, inicio };
  });
  const paginaContato = pagina + 1;

  return (
    <div className="min-h-screen bg-[#EEF1F5] py-8 print:bg-white print:py-0">
      <style>{`
        @page { size: A4; margin: 0; }
        .cat-page { min-height: 297mm; }
        @media print {
          html, body { background: #fff; }
          .cat-page { page-break-after: always; break-after: page; box-shadow: none; }
          .cat-page:last-of-type { page-break-after: auto; break-after: auto; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="no-print mx-auto mb-6 flex w-[210mm] max-w-full items-center justify-between gap-3 px-4">
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao catálogo
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 text-sm font-extrabold text-white shadow-lg transition-colors hover:bg-[#EA580C]"
        >
          <Printer className="h-4 w-4" />
          Salvar / imprimir em PDF
        </button>
      </div>

      {/* 1 — Capa */}
      <Pagina>
        <div className="flex h-full min-h-[297mm] flex-col">
          <div className="px-[16mm] pt-[18mm]">
            <RochaLogoHorizontal className="h-16" />
          </div>
          <img
            src={fotoPatio.url}
            alt="Pátio da Rocha Telhas em Franco da Rocha"
            className="mt-[10mm] h-[120mm] w-full object-cover"
          />
          <div className="flex flex-1 flex-col justify-center px-[16mm]">
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#E8622E] uppercase">
              Distribuidora e Madeireira
            </span>
            <h1 className="mt-3 text-[44px] leading-[1.05] font-black text-[#0F1B2D]">
              Catálogo de
              <br />
              Produtos
            </h1>
            <p className="mt-4 max-w-[120mm] text-[12px] leading-relaxed text-[#5A6472]">
              Telhas, madeiramento, calhas, tintas e ferragens com entrega em Franco da Rocha,
              Caieiras, Francisco Morato, Mairiporã, Perus e toda a Grande São Paulo.
            </p>
            <p className="mt-6 text-[11px] font-semibold text-[#0F1B2D]">
              {CONTATO.phone} · {CONTATO.address}
            </p>
          </div>
        </div>
      </Pagina>

      {/* 2 — Institucional */}
      <Pagina numero={2} titulo="A Rocha Telhas">
        <div className="px-[16mm] pt-[10mm]">
          <h2 className="text-[30px] leading-tight font-black text-[#0F1B2D]">
            Tradição em cobertura e madeira na Grande São Paulo
          </h2>
          <div className="mt-5 space-y-3 text-[12px] leading-relaxed text-[#3C4655]">
            <p>
              A Rocha Telhas é uma distribuidora e madeireira de Franco da Rocha que atende obras
              residenciais, comerciais e rurais de toda a região. Trabalhamos com estoque próprio,
              madeira aparelhada em plaina no nosso pátio e frota própria de entrega.
            </p>
            <p>
              São mais de 30.000 entregas realizadas, 50.000 clientes atendidos e uma equipe que
              acompanha a obra do primeiro orçamento até a última telha assentada — indicando
              telha, madeiramento, calha e fixação corretos para cada projeto.
            </p>
            <p className="text-[#8A93A2] italic">
              [Espaço reservado para o texto institucional final que será fornecido pela Rocha
              Telhas — o layout já está pronto para recebê-lo.]
            </p>
          </div>
          <img
            src={fotoLoja.url}
            alt="Estoque de madeira no pátio da Rocha Telhas"
            className="mt-6 h-[95mm] w-full rounded-xl object-cover"
          />
        </div>
      </Pagina>

      {/* 3 — Sumário */}
      <Pagina numero={3} titulo="Sumário">
        <div className="px-[16mm] pt-[14mm]">
          <h2 className="text-[30px] font-black text-[#0F1B2D]">Sumário</h2>
          <ul className="mt-8 space-y-4">
            {secoes.map((s, i) => (
              <li key={s.id} className="flex items-end gap-3 border-b border-dashed border-[#D6DCE5] pb-3">
                <span className="text-[13px] font-black text-[#E8622E]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <p className="text-[14px] font-extrabold text-[#0F1B2D]">{s.titulo}</p>
                  <p className="text-[10px] text-[#5A6472]">
                    {s.produtos.length} linhas de produto
                  </p>
                </div>
                <span className="text-[13px] font-bold text-[#0F1B2D]">{s.inicio}</span>
              </li>
            ))}
            <li className="flex items-end gap-3 pb-3">
              <span className="text-[13px] font-black text-[#E8622E]">06</span>
              <div className="flex-1">
                <p className="text-[14px] font-extrabold text-[#0F1B2D]">Contato e atendimento</p>
              </div>
              <span className="text-[13px] font-bold text-[#0F1B2D]">{paginaContato}</span>
            </li>
          </ul>
        </div>
      </Pagina>

      {/* 4+ — Seções por categoria */}
      {secoes.map((s) =>
        s.paginas.map((bloco, idx) => (
          <Pagina key={`${s.id}-${idx}`} numero={s.inicio + idx} titulo={s.titulo}>
            <div className="px-[14mm] pt-[8mm]">
              {idx === 0 ? (
                <div className="mb-5">
                  <h2 className="text-[26px] leading-tight font-black text-[#0F1B2D]">
                    {s.titulo}
                  </h2>
                  <p className="mt-2 max-w-[150mm] text-[11px] text-[#5A6472]">{s.descricao}</p>
                  <span className="mt-3 block h-1 w-16 rounded-full bg-[#E8622E]" />
                </div>
              ) : null}
              <div className="grid gap-4">
                {bloco.map((p) => (
                  <BlocoProduto key={p.slug} produto={p} />
                ))}
              </div>
            </div>
          </Pagina>
        )),
      )}

      {/* Última — Contato */}
      <Pagina numero={paginaContato} titulo="Contato">
        <div className="px-[16mm] pt-[16mm]">
          <RochaLogoHorizontal className="h-14" />
          <h2 className="mt-8 text-[30px] font-black text-[#0F1B2D]">Fale com a gente</h2>
          <div className="mt-8 space-y-6 text-[12px] leading-relaxed text-[#3C4655]">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#E8622E] uppercase">
                WhatsApp
              </p>
              <a
                href={waLink("Olá! Vi o catálogo em PDF da Rocha Telhas e quero um orçamento.")}
                className="text-[16px] font-extrabold text-[#0F1B2D]"
              >
                (11) 97176-1003
              </a>
              <p className="text-[10px] text-[#5A6472]">wa.me/{WHATSAPP_NUMBER}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#E8622E] uppercase">
                Endereço
              </p>
              <p className="font-semibold">{CONTATO.address}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#E8622E] uppercase">
                Horário de funcionamento
              </p>
              <p className="font-semibold">{CONTATO.hours}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#E8622E] uppercase">
                Site e redes
              </p>
              <p className="font-semibold">rochatelhas.com.br</p>
              <p className="font-semibold">Instagram e Facebook: @rochatelhas</p>
            </div>
          </div>
          <div className="mt-10 rounded-xl bg-[#0F1B2D] px-6 py-5 text-white">
            <p className="text-[13px] font-extrabold">Peça seu orçamento pelo WhatsApp</p>
            <p className="mt-1 text-[11px] text-white/75">
              Envie sua lista de materiais e receba a cotação completa em minutos, com entrega em
              frota própria.
            </p>
          </div>
        </div>
      </Pagina>
    </div>
  );
}
