import { useEffect, useState } from "react";
import { useCalcDims } from "@/components/site/calc-dims";
import {
  Calculator,
  MessageCircle,
  AlertTriangle,
  Download,
  Scale,
  Ruler,
  Info,
} from "lucide-react";
import ModalCotarWhatsApp from "@/components/ModalCotarWhatsApp";
import { LOGO_ROCHA_SVG } from "@/components/site/logo-print";
import { estimarFaixa } from "@/data/precosLoja";
import { croquiTelhadoSvg, croquiPerfilSvg, type TipoTelhado } from "@/components/site/croqui-telhado";
import {
  TELHAS_COBERTURA,
  GRUPOS_COBERTURA,
  TELHAS_LUZ,
  GRUPOS_LUZ,
  acharTelha,
  rendimentoTelha,
  pesoM2Telha,
  recobrimentoFibro,
  sistemaEstrutura,
  galgaTelha,
  bitolaVigaPorVao,
  APOIO_PVC,
  ESP_CAIBRO_PADRAO,
  ESP_VIGA_PADRAO,
  type TelhaCatalogo,

} from "@/data/telhasCatalogo";

type Telha = TelhaCatalogo;

const TELHAS = TELHAS_COBERTURA;
const GRUPOS = GRUPOS_COBERTURA;


const ESPECIES = [
  { id: "cambara", label: "Cambará Rosa ★" },
  { id: "eucalipto", label: "Eucalipto Tratado" },
  { id: "pinus", label: "Pinus Tratado" },
];

type Tipo = TipoTelhado;

function IconTelhado({ tipo, ativo }: { tipo: Tipo; ativo: boolean }) {
  const stroke = ativo ? "#ea580c" : "#94a3b8";
  return (
    <svg viewBox="0 0 80 48" className="h-11 w-full" fill="none" aria-hidden="true">
      {tipo === "1agua" && (
        <>
          <path d="M8 36 L72 14" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M8 36 L8 44 M72 14 L72 44" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" opacity=".5" />
        </>
      )}
      {tipo === "2aguas" && (
        <>
          <path d="M6 36 L40 12 L74 36" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 36 L6 44 M74 36 L74 44" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" opacity=".5" />
        </>
      )}
      {tipo === "3aguas" && (
        <>
          <path d="M6 36 L6 14 L54 14 L74 36 Z" stroke={stroke} strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M6 14 L54 14" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M54 14 L74 36" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" opacity=".7" />
          <path d="M6 36 L74 36" stroke={stroke} strokeWidth="2" opacity=".5" />
        </>
      )}
      {tipo === "4aguas" && (
        <>
          <path d="M6 36 L22 14 L58 14 L74 36 Z" stroke={stroke} strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M22 14 L58 14" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M6 36 L74 36" stroke={stroke} strokeWidth="2" opacity=".5" />
        </>
      )}
    </svg>
  );
}

const TIPOS: { id: Tipo; label: string }[] = [
  { id: "1agua", label: "1 água" },
  { id: "2aguas", label: "2 águas" },
  { id: "3aguas", label: "3 águas" },
  { id: "4aguas", label: "4 águas" },
];

type Item = {
  nome: string;
  qtd: string;
  /** chave de preço na tabela real da loja */
  chave?: string | null;
  /** quantidade numérica na unidade da tabela de preços */
  valor?: number;
};

type Comparativo = {
  telha: Telha;
  pecas: number;
  peso: number;
  /** custo médio interno (só para calcular o percentual relativo) */
  custoRef: number;
  semPreco: boolean;
  compativel: boolean;
  /** percentual a mais em relação à opção mais barata (0 = referência) */
  percentual: number | null;
};

/* cumeeira e espigão vêm do cadastro de cada telha (src/data/telhasCatalogo.ts) */



export function CalculadoraTelhado() {
  const { setDims } = useCalcDims();
  const [tipo, setTipo] = useState<Tipo>("2aguas");
  const [comprimento, setComprimento] = useState("");
  const [largura, setLargura] = useState("");
  const [beiral, setBeiral] = useState("0,5");
  const [incl, setIncl] = useState(30);
  const [telhaId, setTelhaId] = useState("fib-244");
  const [comEstrutura, setComEstrutura] = useState(false);
  const [comCalhas, setComCalhas] = useState(true);
  const [comAcabamento, setComAcabamento] = useState(true);
  const [margem, setMargem] = useState(2);
  const [ajustarMargem, setAjustarMargem] = useState(false);
  const [margemMadeira, setMargemMadeira] = useState(5);
  const [especie, setEspecie] = useState("cambara");
  /** espaçamento de caibro/caibrão (m) — padrão 0,50 m, editável no avançado */
  const [espacamento, setEspacamento] = useState(String(ESP_CAIBRO_PADRAO));
  // modo avançado (item 7)
  const [avancado, setAvancado] = useState(false);
  /** galga aplicada (m) — vazio = usa a galga da ficha técnica da telha */
  const [galgaCustom, setGalgaCustom] = useState("");
  /** espaçamento entre vigas (m) */
  const [espViga, setEspViga] = useState(String(ESP_VIGA_PADRAO));
  /** vão livre entre apoios (m) — define a bitola da viga */
  const [vaoLivre, setVaoLivre] = useState("");
  const [comRipao, setComRipao] = useState(false);
  const [comCaibrao, setComCaibrao] = useState(false);

  /** medidas individuais por água (modo avançado) */
  const [aguasCustom, setAguasCustom] = useState<Record<string, { vao: string; comp: string }>>({});

  const [compA, setCompA] = useState("fib-244");
  const [compB, setCompB] = useState("pvc-328");
  const [compC, setCompC] = useState("");
  const [comLuz, setComLuz] = useState(false);
  const [luzId, setLuzId] = useState(TELHAS_LUZ[0]?.id ?? "");
  const [luzQtd, setLuzQtd] = useState("4");
  const [res, setRes] = useState<null | {
    areaBase: number;
    areaIncl: number;
    perimetro: number;
    telhas: number;
    alturaCumeeira: number;
    caibro: number;
    larguraInclinada: number;
    itens: Item[];
    acabamento: Item[];
    estrutura: Item[];
    calhas: Item[];
    telha: Telha;
    peso: number;
    croqui: string;
    perfil: string;
    tipo: Tipo;
    incl: number;
    margem: number;
    luz: { label: string; grupo: string; href: string; qtd: number } | null;
  }>(null);
  const [modal, setModal] = useState(false);

  const telha = acharTelha(telhaId);
  /** sistema de estrutura de madeira exigido pelo tipo de telha escolhido */
  const sistemaTelha = sistemaEstrutura(telha);
  const galgaFichaTelha = galgaTelha(telha);

  const avisoIncl = incl < telha.min;

  const num = (v: string) => Number(v.replace(",", ".")) || 0;

  const larguraNum = num(largura);
  const comprimentoNum = num(comprimento);
  const beiralNum = num(beiral);

  /** vão livre padrão = comprimento real informado no Passo 1 (editável no modo avançado) */
  const vaoLivreAuto = Math.max(0.5, comprimentoNum || 3);
  const vaoLivreEfetivo = avancado ? Math.max(0.5, num(vaoLivre) || vaoLivreAuto) : vaoLivreAuto;

  // Item 4: ao trocar a telha, sugere automaticamente a inclinação mínima (editável)
  useEffect(() => {
    setIncl(telha.min);
  }, [telha.min, telha.id]);

  useEffect(() => {
    if (larguraNum > 0 && comprimentoNum > 0) {
      setDims({
        largura: larguraNum,
        comprimento: comprimentoNum,
        inclinacao: incl,
        aguas: tipo === "1agua" ? "1" : tipo === "3aguas" ? "3" : tipo === "4aguas" ? "4" : "2",
      });
    }
  }, [larguraNum, comprimentoNum, incl, tipo, setDims]);

  const croquiAtual = croquiTelhadoSvg({
    tipo,
    comprimento: comprimentoNum || undefined,
    largura: larguraNum || undefined,
    beiral: beiralNum || undefined,
  });

  const calcularPecas = (t: Telha, areaIncl: number, m: number, inclPct: number) =>
    Math.ceil(areaIncl * rendimentoTelha(t, inclPct) * (1 + m / 100));

  const telhaLuz = TELHAS_LUZ.find((t) => t.id === luzId) ?? TELHAS_LUZ[0];
  const luzQtdNum = Math.max(0, Math.floor(Number(luzQtd.replace(",", ".")) || 0));
  const rendimentoAtual = rendimentoTelha(telha, incl);

  /* ---------- Item 1: medidas individuais por água do telhado ---------- */
  const fatorIncl = Math.sqrt(1 + Math.pow(incl / 100, 2));
  type Agua = { id: string; nome: string; forma: "ret" | "tri"; vao: number; comp: number };

  const aguasPadrao: Agua[] = (() => {
    const C = comprimentoNum;
    const L = larguraNum;
    if (tipo === "1agua") return [{ id: "a1", nome: "Água única", forma: "ret", vao: L, comp: C }];
    if (tipo === "2aguas")
      return [
        { id: "a1", nome: "Água 1", forma: "ret", vao: L / 2, comp: C },
        { id: "a2", nome: "Água 2", forma: "ret", vao: L / 2, comp: C },
      ];
    if (tipo === "3aguas") {
      const cume = Math.max(0, C - L / 2);
      const medio = (C + cume) / 2;
      return [
        { id: "a1", nome: "Água 1 (trapézio)", forma: "ret", vao: L / 2, comp: medio },
        { id: "a2", nome: "Água 2 (trapézio)", forma: "ret", vao: L / 2, comp: medio },
        { id: "a3", nome: "Tacaniça (triangular)", forma: "tri", vao: L / 2, comp: L },
      ];
    }
    const cume4 = Math.max(0, C - L);
    const medio4 = (C + cume4) / 2;
    return [
      { id: "a1", nome: "Água 1 (trapézio)", forma: "ret", vao: L / 2, comp: medio4 },
      { id: "a2", nome: "Água 2 (trapézio)", forma: "ret", vao: L / 2, comp: medio4 },
      { id: "a3", nome: "Tacaniça 1 (triangular)", forma: "tri", vao: L / 2, comp: L },
      { id: "a4", nome: "Tacaniça 2 (triangular)", forma: "tri", vao: L / 2, comp: L },
    ];
  })();

  /** medidas efetivas: no modo avançado o usuário pode sobrescrever água por água */
  const aguas: Agua[] = aguasPadrao.map((a) => {
    const cu = avancado ? aguasCustom[a.id] : undefined;
    if (!cu) return a;
    return { ...a, vao: num(cu.vao) || a.vao, comp: num(cu.comp) || a.comp };
  });

  /** comprimento da rampa da água (do cume à borda), já com beiral */
  const rampaAgua = (a: Agua) => a.vao * fatorIncl + beiralNum;
  const areaAgua = (a: Agua) => (a.forma === "tri" ? 0.5 * a.comp : a.comp) * rampaAgua(a);


  const calcular = () => {
    if (comprimentoNum <= 0 || larguraNum <= 0) return;

    // Projeção do telhado (planta) COM beiral — usada só para calhas/cumeeira
    const c = comprimentoNum + 2 * beiralNum;
    const l = larguraNum + 2 * beiralNum;

    // Área da planta baixa do imóvel: exatamente o que o cliente informou.
    // O beiral NÃO entra aqui — ele é prolongamento do plano inclinado.
    const areaBase = comprimentoNum * larguraNum;
    const perimetro = 2 * (c + l);
    const fator = fatorIncl;
    // vão de cada água (sem beiral) e altura do oitão
    const vao = aguas[0]?.vao ?? (tipo === "1agua" ? larguraNum : larguraNum / 2);
    const alturaCumeeira = vao * (incl / 100);
    // largura inclinada: do cume até a borda, já somando o beiral na direção da água
    const larguraInclinada = vao * fator;
    const caibro = larguraInclinada + beiralNum;

    // ---- área inclinada: soma das áreas reais de cada água (medidas individuais) ----
    const areaIncl = aguas.reduce((s, a) => s + areaAgua(a), 0);
    const telhas = calcularPecas(telha, areaIncl, margem, incl);



    const itens: Item[] = [];
    if (telha.familia === "fibrocimento" || telha.familia === "policarbonato" || telha.familia === "translucida") {
      const parafusos = Math.ceil(telhas * 2.2);
      const mantaM2 = Math.ceil(areaIncl);
      itens.push({ nome: "Parafuso 8x110mm com vedação", qtd: `${parafusos} un`, chave: "parafuso.vedacao", valor: parafusos });
      itens.push({ nome: "Manta térmica aluminizada", qtd: `${mantaM2} m²`, chave: "manta.termica.m2", valor: mantaM2 });
      // Item 5: prego telheiro e arame de amarração só na Fibrocimento 2,44 × 0,50 m
      if (telha.id === "fib-244") {
        const telheiro = Math.ceil(telhas * 2);
        const arameKg = Math.max(1, Math.ceil(telhas * 0.05));
        itens.push({ nome: "Prego telheiro (fixação em madeira)", qtd: `${telheiro} un`, chave: null });
        itens.push({ nome: "Arame de amarração", qtd: `${arameKg} kg`, chave: null });
      }
    } else if (telha.familia === "pvc") {
      const kits = Math.ceil(telhas / 20);
      itens.push({ nome: "Kit de fixação PVC (parafuso + vedação)", qtd: `${kits} kit(s)`, chave: "kit.fixacao.pvc", valor: kits });
    }


    // ---- telhas de acabamento: cumeeira e espigão contados SEPARADAMENTE ----
    const acabamento: Item[] = [];
    if (comAcabamento) {
      // cumeeira = linha de cume, medida sobre a planta do telhado (com beiral nas empenas)
      const mCumeeira =
        tipo === "1agua"
          ? 0
          : tipo === "2aguas"
            ? c
            : tipo === "3aguas"
              ? Math.max(0, c - l / 2)
              : Math.max(0, c - l);
      // espigão = aresta inclinada do canto até o cume
      const hip = Math.sqrt(Math.pow(larguraInclinada + beiralNum, 2) + Math.pow(l / 2, 2));
      const mEspigao = tipo === "3aguas" ? 2 * hip : tipo === "4aguas" ? 4 * hip : 0;
      const totalM = mCumeeira + mEspigao;

      if (mCumeeira > 0) {
        const pcCum = Math.ceil((mCumeeira / telha.cumeeira.util) * (1 + margem / 100));
        acabamento.push({
          nome: `Cumeeira — ${telha.cumeeira.nome} · ${fmtN(mCumeeira)} m lineares`,
          qtd: `${pcCum} un`,
          chave: telha.cumeeira.chave,
          valor: pcCum,
        });
      }
      if (mEspigao > 0) {
        const pcEsp = Math.ceil((mEspigao / telha.espigao.util) * (1 + margem / 100));
        acabamento.push({
          nome: `Espigão — ${telha.espigao.nome} · ${fmtN(mEspigao)} m lineares`,
          qtd: `${pcEsp} un`,
          chave: telha.espigao.chave,
          valor: pcEsp,
        });
      }
      if (totalM <= 0) {

        acabamento.push({
          nome: "Telhado de 1 água — sem cumeeira",
          qtd: "Sem cumeeira — arremate direto no topo",
          chave: null,
        });
      }

    }

    const estrutura: Item[] = [];
    if (comEstrutura) {
      const nomeEsp = ESPECIES.find((e) => e.id === especie)!.label.replace(" ★", "");
      const sistema = sistemaEstrutura(telha);
      const eCaibro = Math.max(0.3, num(espacamento) || ESP_CAIBRO_PADRAO);
      const eViga = Math.max(0.5, num(espViga) || ESP_VIGA_PADRAO);
      const galgaFicha = galgaTelha(telha);
      const galga = Math.max(
        0.15,
        (avancado ? num(galgaCustom) : 0) || galgaFicha || 0.33,
      );
      const vaoLivreAplicado = vaoLivreEfetivo;
      const bitolaViga = sistema === "pvc" ? "11 cm" : bitolaVigaPorVao(vaoLivreAplicado);
      const fMad = 1 + Math.max(0, margemMadeira) / 100;

      // comprimento útil de uma telha na direção da rampa (só sistemas de apoio)
      const compPeca =
        telha.comprimentoPeca ?? (Number(telha.id.match(/(\d{3})$/)?.[1] ?? 244) / 100);
      const utilPeca = Math.max(
        0.5,
        compPeca - (telha.familia === "fibrocimento" ? recobrimentoFibro(incl) : 0.14),
      );

      let mCaibro = 0;
      let mRipa = 0;
      let mViga = 0;
      // pontos de fixação por bitola de prego (item 2 e 4)
      let pRipa = 0; // ripa/ripão × caibro
      let pCaibro = 0; // caibro/caibrão × viga

      for (const a of aguas) {
        const rampa = rampaAgua(a);
        // comprimento médio efetivo da água (tacaniça = metade da base)
        const cef = a.forma === "tri" ? a.comp / 2 : a.comp;
        // comprimento da água JÁ COM beiral nas duas empenas — é nele que os
        // caibros são distribuídos (o beiral também precisa de caibro).
        const cefBeiral = a.forma === "tri" ? cef : cef + 2 * beiralNum;
        if (rampa <= 0 || cef <= 0) continue;

        if (sistema === "ripa") {
          // ripa/ripão: espaçadas pela galga da telha, ao longo da rampa
          const nRipas = Math.ceil(rampa / galga) + 1;
          // caibro/caibrão: atravessam a água acompanhando a inclinação (rampa,
          // já com beiral) e são espaçados ao longo do comprimento com beiral
          const nCaibros = Math.ceil(cefBeiral / eCaibro) + 1;
          // viga: corre no sentido do comprimento, espaçada ao longo da largura
          const nVigas = Math.max(2, Math.ceil(rampa / eViga) + 1);

          mRipa += nRipas * cef;
          mCaibro += nCaibros * rampa;
          mViga += nVigas * cef;

          // cada cruzamento é contado UMA vez
          pRipa += nRipas * nCaibros;
          pCaibro += nCaibros * nVigas * 2;
        } else if (sistema === "apoio") {
          // fibrocimento / policarbonato / translúcida: só viga.
          // apoio no começo, meio e fim de cada telha; o último apoio de uma
          // fiada é o primeiro da fiada seguinte (apoios compartilhados).
          const fiadas = Math.max(1, Math.ceil(rampa / utilPeca));
          const nApoios = 2 * fiadas + 1;
          mViga += nApoios * cef;
        } else {
          // PVC Colonial / Plan: apoio fixo a cada 66 cm
          const nApoios = Math.ceil(rampa / APOIO_PVC) + 1;
          mViga += nApoios * cef;
        }
      }


      const chaveMadeira = (peca: "caibro" | "viga" | "ripa") => {
        const k = `madeira.${especie}.${peca}`;
        return ["madeira.cambara.caibro", "madeira.cambara.viga", "madeira.cambara.ripa",
          "madeira.eucalipto.caibro", "madeira.eucalipto.viga",
          "madeira.peroba.caibro", "madeira.peroba.viga", "madeira.peroba.ripa",
          "madeira.garapeira.ripa"].includes(k)
          ? k
          : null;
      };
      const ml = (n: number) => Math.ceil(n * fMad);
      const addMadeira = (nome: string, metros: number, chave: string | null) => {
        if (metros <= 0) return;
        const v = ml(metros);
        estrutura.push({ nome, qtd: `${v} m lineares`, chave, valor: v });
      };

      const nomeViga =
        sistema === "ripa"
          ? `Viga / terça ${bitolaViga} — ${nomeEsp}`
          : `Viga de apoio ${bitolaViga} — ${nomeEsp}`;
      addMadeira(nomeViga, mViga, chaveMadeira("viga"));

      if (sistema === "ripa") {
        addMadeira(
          comCaibrao ? `Caibrão 5x7 cm — ${nomeEsp}` : `Caibro 5x5 cm — ${nomeEsp}`,
          mCaibro,
          chaveMadeira("caibro"),
        );
        addMadeira(
          comRipao ? `Ripão 2,5x10 cm — ${nomeEsp}` : `Ripa 1,5x5 cm — ${nomeEsp}`,
          mRipa,
          chaveMadeira("ripa"),
        );
      }

      // ---- Pregos discriminados por bitola (itens 2 e 4) ----
      const PREGOS: { bitola: string; peca: string; un: number; kgUn: number; chave: string | null }[] =
        sistema === "ripa"
          ? [
              comRipao
                ? { bitola: "19x36", peca: "ripão", un: pRipa, kgUn: 0.0048, chave: null }
                : { bitola: "17x21", peca: "ripa", un: pRipa, kgUn: 0.0018, chave: null },
              {
                bitola: "22x48",
                peca: comCaibrao ? "caibrão em viga" : "caibro em viga",
                un: pCaibro,
                kgUn: 0.012,
                chave: "prego.18x27",
              },
            ]
          : [];
      for (const p of PREGOS) {
        if (p.un <= 0) continue;
        const un = Math.ceil(p.un * fMad);
        const kg = Math.max(0.5, Math.ceil(un * p.kgUn * 2) / 2);
        estrutura.push({
          nome: `Prego polido ${p.bitola} — fixação de ${p.peca}`,
          qtd: `${kg.toFixed(1)} kg (~${un} pregos)`,
          chave: p.chave,
          valor: kg,
        });
      }

      // ---- critérios aplicados (explicitados no relatório) ----
      estrutura.push({
        nome: "Critérios de estrutura aplicados",
        qtd:
          sistema === "ripa"
            ? `Galga ${(galga * 100).toFixed(1).replace(".", ",")} cm · caibro a cada ${fmtN(eCaibro)} m · viga a cada ${fmtN(eViga)} m · vão livre ${fmtN(vaoLivreAplicado)} m → viga ${bitolaViga}`
            : sistema === "pvc"
              ? `Apoio a cada 66 cm (sem ripa/caibro) · viga 11 cm`
              : `Apoio no começo, meio e fim de cada telha (compartilhado entre fiadas) · sem ripa/caibro · vão livre ${fmtN(vaoLivreAplicado)} m → viga ${bitolaViga}`,
        chave: null,
      });
    }



    // ---- Calhas e acessórios (a loja não trabalha com rufo) ----
    const calhas: Item[] = [];
    if (comCalhas) {
      const mCalha = tipo === "1agua" ? c : tipo === "2aguas" ? c * 2 : perimetro;
      
      const lances = Math.ceil(mCalha / 6);
      const suportes = Math.ceil(mCalha / 0.8);
      const cabeceiras = tipo === "4aguas" ? 0 : lances * 2;
      const vedaCalha = Math.max(1, Math.ceil(lances / 2));

      calhas.push({ nome: "Calha (metro linear)", qtd: `${Math.ceil(mCalha)} m`, chave: "calha.m", valor: Math.ceil(mCalha) });
      
      if (tipo === "4aguas" || tipo === "3aguas")
        calhas.push({ nome: "Água furtada (encontro de águas)", qtd: `${Math.ceil(l)} m`, chave: "aguafurtada.m", valor: Math.ceil(l) });
      calhas.push({ nome: "Suporte de calha (a cada 80 cm)", qtd: `${suportes} un`, chave: "suporte.calha", valor: suportes });
      if (cabeceiras > 0) calhas.push({ nome: "Cabeceira (tampa de extremidade)", qtd: `${cabeceiras} un`, chave: "cabeceira.calha", valor: cabeceiras });
      calhas.push({ nome: "Veda calha PU / silicone", qtd: `${vedaCalha} un`, chave: "vedacalha", valor: vedaCalha });
    }

    const peso = areaIncl * pesoM2Telha(telha, incl);

    setCompA(telha.id);
    const compativeis = TELHAS.filter((t) => t.id !== telha.id && t.min <= incl);
    const sugB =
      compativeis.find((t) => t.grupo !== telha.grupo) ??
      TELHAS.find((t) => t.id !== telha.id)!;
    setCompB(sugB.id);
    const sugC = compativeis.find((t) => t.grupo !== telha.grupo && t.grupo !== sugB.grupo);
    setCompC(sugC ? sugC.id : "");

    setRes({
      areaBase,
      areaIncl,
      perimetro,
      telhas,
      alturaCumeeira,
      caibro,
      larguraInclinada,
      itens,
      acabamento,
      estrutura,
      calhas,
      telha,
      peso,
      croqui: croquiTelhadoSvg({
        tipo,
        comprimento: comprimentoNum,
        largura: larguraNum,
        beiral: beiralNum || undefined,
      }),
      perfil: croquiPerfilSvg({
        tipo,
        largura: larguraNum,
        beiral: beiralNum,
        inclinacao: incl,
      }),
      tipo,
      incl,
      margem,
      luz:
        comLuz && telhaLuz && luzQtdNum > 0
          ? { label: telhaLuz.label, grupo: telhaLuz.grupo, href: telhaLuz.href, qtd: luzQtdNum }
          : null,
    });

  };

  const fmt = (n: number, d = 2) => n.toLocaleString("pt-BR", { maximumFractionDigits: d });

  /**
   * Comparativo: usa internamente a tabela real de preços apenas para calcular
   * a diferença percentual entre as opções — nenhum valor em R$ é exibido.
   */
  const comparativo: Comparativo[] = (() => {
    if (!res) return [];
    const base = [compA, compB, compC].filter(Boolean).map((id) => {
      const t = acharTelha(id);
      const pecas = calcularPecas(t, res.areaIncl, res.margem, res.incl);
      const f = estimarFaixa([{ chave: t.chavePreco, nome: t.label, qtd: pecas }]);
      const semPreco = f.naoEncontrados.length > 0 || f.max <= 0;
      return {
        telha: t,
        pecas,
        peso: res.areaIncl * pesoM2Telha(t, res.incl),
        custoRef: semPreco ? 0 : (f.min + f.max) / 2,
        semPreco,
        compativel: t.min <= res.incl,
      };
    });
    const comPreco = base.filter((b) => !b.semPreco).map((b) => b.custoRef);
    const referencia = comPreco.length ? Math.min(...comPreco) : 0;
    return base.map((b) => ({
      ...b,
      percentual:
        b.semPreco || !referencia ? null : Math.round(((b.custoRef - referencia) / referencia) * 100),
    }));
  })();

  const textoComparativo = (c: Comparativo) =>
    c.percentual === null
      ? "custo sob cotação"
      : c.percentual === 0
        ? "referência (opção mais econômica)"
        : `aproximadamente ${c.percentual}% mais cara que a opção de referência`;



  const mensagem = res
    ? [
        `Telhado`,
        `- Área da base (planta, sem beiral): ${fmt(res.areaBase)} m²`,
        `- Área inclinada (com beiral): ${fmt(res.areaIncl)} m²`,
        `- Largura inclinada da água: ${fmt(res.larguraInclinada)} m (+ beiral ${fmt(beiralNum)} m)`,
        `- Perímetro: ${fmt(res.perimetro)} m`,
        `- Tipo: ${TIPOS.find((t) => t.id === res.tipo)!.label} — Inclinação ${res.incl}%`,
        `- Medidas: ${fmt(comprimentoNum)} × ${fmt(larguraNum)} m · beiral ${fmt(beiralNum)} m`,
        `- Margem de recorte/reposição da telha: ${res.margem}%`,
        ...(comEstrutura ? [`- Margem de corte da madeira: ${margemMadeira}%`] : []),
        ...(avancado
          ? [
              `- Medidas por água: ${aguas.map((a) => `${a.nome} ${fmt(a.vao)} × ${fmt(a.comp)} m`).join(" · ")}`,
            ]
          : []),

        `- Telha escolhida: ${res.telha.label} (${res.telha.grupo})`,
        `- Peso estimado da cobertura: ${fmt(res.peso, 0)} kg`,
        ...(comparativo.length > 1
          ? [
              ``,
              `⚖️ *COMPARATIVO ENTRE TELHAS*`,
              ...comparativo.map(
                (c) =>
                  `- ${c.telha.grupo} — ${c.telha.label.replace(" ★", "")}: ${c.pecas} un · ${fmt(c.peso, 0)} kg · ${textoComparativo(c)}`,
              ),
            ]
          : []),
        ``,
        `Obs.: a calculadora não informa valores — o preço final sai na cotação com o vendedor.`,
        ``,
        `📋 *MATERIAIS ESTIMADOS*`,
        `- ${res.telha.label} — Qtd: ${res.telhas} un`,
        ...res.itens.map((i) => `- ${i.nome} — Qtd: ${i.qtd}`),
        ...(res.luz ? [`- Pontos de Luz Natural: ${res.luz.qtd} peças de ${res.luz.label}`] : []),
        ...(res.acabamento.length
          ? ["", "*Acabamento (cumeeira / espigão):*", ...res.acabamento.map((i) => `- ${i.nome} — Qtd: ${i.qtd}`)]
          : []),
        ...(res.calhas.length
          ? ["", "*Calhas e acessórios:*", ...res.calhas.map((i) => `- ${i.nome} — Qtd: ${i.qtd}`)]
          : []),
        ...(res.estrutura.length
          ? ["", "*Estrutura de madeira:*", ...res.estrutura.map((i) => `- ${i.nome} — Qtd: ${i.qtd}`)]
          : []),
      ].join("\n")
    : "";

  const baixarPdf = () => {
    if (!res) return;
    const linha = (i: Item) => `<tr><td>${i.nome}</td><td class="qty">${i.qtd}</td></tr>`;
    const bloco = (titulo: string, itens: Item[]) =>
      itens.length
        ? `<div class="section-title">${titulo}</div><table class="data">${itens.map(linha).join("")}</table>`
        : "";

    const pregos = res.estrutura.filter((i) => /^Prego/i.test(i.nome));
    const madeira = res.estrutura.filter((i) => !/^Prego/i.test(i.nome));
    const nomeEspecie = ESPECIES.find((e) => e.id === especie)?.label.replace(" ★", "") ?? "";

    const comparaHtml = comparativo.length
      ? `<div class="comparativo-wrap">
      <div class="section-title">Comparativo entre telhas do catálogo</div>
      <table class="comparativo">
        <thead><tr>
          <th>Telha</th><th class="num">Peças</th><th class="num">Peso</th>
          <th>Inclinação mínima</th><th>Comparação relativa</th>
        </tr></thead>
        <tbody>
        ${comparativo
          .map((c) => {
            const ref = c.percentual === 0;
            const badge = ref
              ? `<span class="badge ref">REFERÊNCIA</span> Opção mais econômica`
              : c.percentual === null
                ? `<span class="badge pricier">—</span> custo sob cotação`
                : `<span class="badge pricier">+${c.percentual}%</span> mais cara que a referência`;
            return `<tr class="${ref ? "reference" : ""}">
              <td>${ref ? "<strong>" : ""}${c.telha.label.replace(" ★", "")}${ref ? "</strong>" : ""} — ${c.telha.grupo}</td>
              <td class="num">${c.pecas} un</td>
              <td class="num">${fmt(c.peso, 0)} kg</td>
              <td><span class="compat ${c.compativel ? "ok" : "no"}">${c.telha.min}% · ${c.compativel ? "compatível" : "incompatível"}</span></td>
              <td>${badge}</td>
            </tr>`;
          })
          .join("")}
        </tbody>
      </table>
      <div class="comparativo-note">A diferença percentual é calculada com a tabela interna da loja, sem exibir valores — serve apenas para comparar as opções entre si. Coberturas mais leves (PVC e policarbonato) exigem menos madeira; cerâmica e concreto pedem estrutura reforçada.</div>
    </div>`
      : "";

    const agora = new Date();
    const logoGrande = LOGO_ROCHA_SVG.replace('width="58" height="32"', 'width="104" height="58"');

    const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<title>Calculo de telhado - Rocha Telhas</title>
<style>
  @page{size:A4 portrait;margin:0}
  *{box-sizing:border-box}
  body{font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;color:#1f2937;margin:0}
  .page{width:210mm;min-height:297mm;padding:11mm 12mm 9mm;display:flex;flex-direction:column}
  .header{display:flex;align-items:center;justify-content:space-between;border-bottom:3px solid #E8622E;padding-bottom:8px;margin-bottom:10px}
  .logo-block{display:flex;align-items:center;gap:12px}
  .brand{font-size:20px;font-weight:800;letter-spacing:-.3px;line-height:1.1}
  .brand span{color:#E8622E}
  .header-right{text-align:right}
  .header-right .title{font-size:14.5px;font-weight:700}
  .header-right .meta{font-size:9.5px;color:#6b7280;margin-top:2px}
  .chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px}
  .chip{background:#FFF3EC;border:1px solid #F7D3BE;color:#B5450F;font-size:10px;font-weight:700;padding:4px 10px;border-radius:20px}
  .diagrams{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}
  .diagram-box{border:1px solid #E5E7EB;border-radius:8px;padding:8px 10px 6px;background:#FAFAFA}
  .diagram-title{font-size:9.5px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}
  svg{display:block}
  .stats{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:6px}
  .stat{border:1px solid #E5E7EB;border-radius:8px;padding:6px 8px;text-align:center;background:#fff}
  .stat .label{font-size:8px;color:#9CA3AF;font-weight:600;text-transform:uppercase;letter-spacing:.3px}
  .stat .value{font-size:13px;font-weight:800;margin-top:2px}
  .section-title{font-size:10.5px;font-weight:800;color:#E8622E;text-transform:uppercase;letter-spacing:.5px;border-bottom:1.5px solid #F0D9CC;padding-bottom:3px;margin:10px 0 5px}
  table.data{width:100%;border-collapse:collapse;font-size:10px}
  table.data td{padding:3px 4px;border-bottom:1px solid #F0F0F0;vertical-align:top}
  table.data td.qty{text-align:right;font-weight:700;color:#B5450F;white-space:nowrap}
  .two-col-sections{display:grid;grid-template-columns:1fr 1fr;gap:0 18px}
  table.comparativo{width:100%;border-collapse:collapse;font-size:9.5px}
  table.comparativo thead th{background:#FFF3EC;color:#B5450F;font-size:8.5px;text-transform:uppercase;letter-spacing:.3px;font-weight:800;padding:5px 6px;text-align:left;border-bottom:2px solid #E8622E}
  table.comparativo thead th.num{text-align:right}
  table.comparativo tbody td{padding:5px 6px;border-bottom:1px solid #F0F0F0;vertical-align:middle}
  table.comparativo tbody td.num{text-align:right;font-weight:700}
  table.comparativo tbody tr.reference{background:#FFF8F4}
  .badge{display:inline-block;font-size:8px;font-weight:800;padding:2px 7px;border-radius:10px}
  .badge.ref{background:#DCFCE7;color:#15803D}
  .badge.pricier{background:#FEF3C7;color:#92400E}
  .compat{font-size:8.5px;font-weight:700}
  .compat.ok{color:#15803D}
  .compat.no{color:#B91C1C}
  .comparativo-note{font-size:8px;color:#9CA3AF;margin-top:4px;line-height:1.4}
  .footer{margin-top:auto;padding-top:8px;border-top:1.5px solid #E5E7EB}
  .disclaimer{background:#FFFBEB;border:1px solid #FDE68A;border-radius:6px;padding:7px 10px;font-size:8.5px;color:#92400E;font-weight:600;line-height:1.4;margin-bottom:5px}
  .footer-bottom{display:flex;justify-content:space-between;font-size:8px;color:#9CA3AF}
</style></head><body>
<div class="page">
  <div class="header">
    <div class="logo-block">
      ${logoGrande}
      <div class="brand">ROCHA <span>TELHAS</span> &amp; MADEIRAS</div>
    </div>
    <div class="header-right">
      <div class="title">Cálculo de Telhado — Orçamento Estimado</div>
      <div class="meta">Gerado em ${agora.toLocaleDateString("pt-BR")} às ${agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</div>
    </div>
  </div>

  <div class="chips">
    <span class="chip">${TIPOS.find((t) => t.id === res.tipo)!.label}</span>
    <span class="chip">Inclinação ${res.incl}%</span>
    <span class="chip">${res.telha.label.replace(" ★", "")}</span>
    <span class="chip">Margem ${res.margem}%</span>
    ${comEstrutura ? `<span class="chip">Madeira ${nomeEspecie} · margem ${margemMadeira}%</span>` : ""}
  </div>

  <div class="diagrams">
    <div class="diagram-box"><div class="diagram-title">Vista superior</div>${res.croqui}</div>
    <div class="diagram-box"><div class="diagram-title">Vista de perfil (corte) · inclinação ${res.incl}%</div>${res.perfil}</div>
  </div>

  <div class="stats">
    <div class="stat"><div class="label">Área da base</div><div class="value">${fmt(res.areaBase)} m²</div></div>
    <div class="stat"><div class="label">Área inclinada</div><div class="value">${fmt(res.areaIncl)} m²</div></div>
    <div class="stat"><div class="label">Largura inclinada</div><div class="value">${fmt(res.larguraInclinada)} m</div></div>
    <div class="stat"><div class="label">Perímetro</div><div class="value">${fmt(res.perimetro)} m</div></div>
    <div class="stat"><div class="label">Peso da cobertura</div><div class="value">${fmt(res.peso, 0)} kg</div></div>
  </div>

  <div class="two-col-sections">
    <div>
      ${bloco("Cobertura", [
        { nome: res.telha.label.replace(" ★", ""), qtd: `${res.telhas} un` },
        ...res.itens,
        ...(res.luz
          ? [{ nome: `Pontos de Luz Natural — ${res.luz.label}`, qtd: `${res.luz.qtd} peças` }]
          : []),
      ])}
      ${bloco("Acabamento (cumeeira / espigão)", res.acabamento)}
      ${bloco("Calhas e acessórios", res.calhas)}
    </div>
    <div>
      ${bloco(`Estrutura de madeira${nomeEspecie && madeira.length ? ` — ${nomeEspecie}` : ""}`, madeira)}
      ${bloco("Pregos", pregos)}
    </div>
  </div>

  ${comparaHtml}

  <div class="footer">
    <div class="disclaimer">
      ⚠️ ESTE DOCUMENTO É UMA ESTIMATIVA DE REFERÊNCIA gerada automaticamente pela calculadora do site. Não apresenta valores em R$ — o preço final e a
      conferência definitiva das quantidades são feitos pela nossa equipe técnica na cotação com o vendedor.
    </div>
    <div class="footer-bottom">
      <span>Rocha Telhas &amp; Madeiras · rochatelhas.com.br · (11) 97176-1003</span>
      <span>Página 1 de 1</span>
    </div>
  </div>
</div>
</body></html>`;

    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  };


  const card = "rounded-xl border border-gray-200 bg-white p-5";
  const passo = "text-xs font-bold uppercase tracking-wider text-orange-600";
  const input =
    "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none";

  const Toggle = ({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) => (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-orange-600" : "bg-gray-300"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${on ? "left-5.5" : "left-0.5"}`} />
    </button>
  );

  return (
    <div className="space-y-4">
      {/* Modo simples x avançado (item 7) */}
      <div className={card}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className={passo}>{avancado ? "Modo avançado" : "Modo simples"}</p>
            <p className="mt-1 text-xs text-gray-500">
              {avancado
                ? "Medida por água, espaçamento por peça, bitola de prego e margem da madeira liberados para edição."
                : "Usamos valores recomendados de espaçamento, prego e margem. Ative o modo avançado para especificar tudo manualmente."}
            </p>
          </div>
          <Toggle
            on={avancado}
            label="Modo avançado"
            onClick={() =>
              setAvancado((v) => {
                // ao entrar no avançado, herda as medidas calculadas no modo simples
                if (!v) {
                  setVaoLivre(String(Number(vaoLivreAuto.toFixed(2))));
                  setAguasCustom(
                    Object.fromEntries(
                      aguasPadrao.map((a) => [
                        a.id,
                        { vao: a.vao ? String(Number(a.vao.toFixed(2))) : "", comp: a.comp ? String(Number(a.comp.toFixed(2))) : "" },
                      ]),
                    ),
                  );
                }
                return !v;
              })
            }
          />
        </div>
      </div>


      {/* Passo 1 */}
      <div className={card}>
        <p className={passo}>Passo 1 · Tipo de telhado</p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TIPOS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTipo(t.id)}
              className={`rounded-xl border-2 p-2 transition-all ${
                tipo === t.id ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"
              }`}
            >
              <IconTelhado tipo={t.id} ativo={tipo === t.id} />
              <span className={`mt-1 block text-xs font-bold ${tipo === t.id ? "text-orange-600" : "text-gray-600"}`}>
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Passo 2 — medidas com croqui */}
      <div className={card}>
        <p className={passo}>Passo 2 · Medidas do telhado</p>
        <div
          className="mt-3 rounded-xl border border-orange-100 bg-orange-50/40 p-3"
          dangerouslySetInnerHTML={{ __html: croquiAtual }}
        />
        <p className="mt-2 flex items-start gap-1.5 text-[11px] text-gray-500">
          <Ruler size={13} className="mt-0.5 shrink-0" /> Informe as medidas da planta (largura × comprimento). O beiral não entra na área da
          planta — ele é somado apenas no comprimento da água inclinada.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">Comprimento (m)</label>
            <input inputMode="decimal" value={comprimento} onChange={(e) => setComprimento(e.target.value)} placeholder="Ex.: 12" className={input} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">Largura (m)</label>
            <input inputMode="decimal" value={largura} onChange={(e) => setLargura(e.target.value)} placeholder="Ex.: 8" className={input} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">Beiral (m)</label>
            <input inputMode="decimal" value={beiral} onChange={(e) => setBeiral(e.target.value)} placeholder="Ex.: 0,5" className={input} />
          </div>
        </div>

        {/* Item 1 — medidas individuais por água */}
        {avancado && (
          <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50/40 p-3">
            <p className="text-[11px] font-bold tracking-wider text-orange-700 uppercase">
              Medidas de cada água
            </p>
            <p className="mt-1 text-[11px] text-gray-600">
              Águas com tamanhos diferentes? Ajuste o vão (do cume à borda, em planta) e o comprimento de cada
              uma — o cálculo de telha e de estrutura soma água por água.
            </p>
            <div className="mt-3 space-y-2">
              {aguasPadrao.map((a) => {
                const cu = aguasCustom[a.id] ?? { vao: "", comp: "" };
                const set = (campo: "vao" | "comp", v: string) =>
                  setAguasCustom((s) => ({ ...s, [a.id]: { ...(s[a.id] ?? { vao: "", comp: "" }), [campo]: v } }));
                return (
                  <div key={a.id} className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:items-center">
                    <p className="col-span-2 text-xs font-bold text-gray-700 sm:col-span-1">{a.nome}</p>
                    <input
                      inputMode="decimal"
                      value={cu.vao}
                      onChange={(e) => set("vao", e.target.value)}
                      placeholder={`Vão ${fmt(a.vao)} m`}
                      aria-label={`Vão da ${a.nome}`}
                      className={input}
                    />
                    <input
                      inputMode="decimal"
                      value={cu.comp}
                      onChange={(e) => set("comp", e.target.value)}
                      placeholder={`${a.forma === "tri" ? "Base" : "Comprimento"} ${fmt(a.comp)} m`}
                      aria-label={`Comprimento da ${a.nome}`}
                      className={input}
                    />
                  </div>
                );
              })}
            </div>
            <p className="mt-2 text-[11px] text-gray-500">
              Área inclinada somada das águas: <b className="text-gray-700">{fmt(aguas.reduce((s, a) => s + areaAgua(a), 0))} m²</b>
            </p>
          </div>
        )}

      </div>

      {/* Passo 3 — telha + ficha técnica */}
      <div className={card}>
        <p className={passo}>Passo 3 · Tipo de telha</p>
        <select
          value={telhaId}
          onChange={(e) => setTelhaId(e.target.value)}
          className="mt-3 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none"
        >
          {GRUPOS.map((g) => (
            <optgroup key={g} label={g}>
              {TELHAS.filter((t) => t.grupo === g).map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        {/* Ficha técnica automática */}
        <div className="mt-3 rounded-xl border border-orange-100 bg-orange-50/50 p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-orange-700 uppercase">
            <Info size={13} /> Ficha técnica — {telha.label.replace(" ★", "")}
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              {
                l: "Telhas por m²",
                v: rendimentoAtual >= 1 ? `${fmt(rendimentoAtual, 1)} un` : `${fmt(rendimentoAtual, 2)} un`,
              },
              { l: "Galga mínima", v: telha.galga ?? "Não se aplica" },
              { l: "Peso por peça", v: `${fmt(telha.pesoPeca, 1)} kg` },
              { l: "Inclinação mínima", v: `${telha.min}%` },
            ].map((f) => (
              <div key={f.l} className="rounded-lg bg-white p-2.5">
                <p className="text-[10px] font-semibold text-gray-500">{f.l}</p>
                <p className="text-sm font-extrabold text-gray-900">{f.v}</p>
              </div>
            ))}
          </div>
          {telha.notaDados && (
            <p className="mt-2 flex items-start gap-1.5 rounded-lg bg-amber-50 p-2 text-[11px] text-amber-800">
              <AlertTriangle size={13} className="mt-0.5 shrink-0" />
              <span>
                <b>Dado a confirmar:</b> {telha.notaDados}
              </span>
            </p>
          )}
          {telha.familia === "fibrocimento" && telha.comprimentoPeca && (
            <p className="mt-2 rounded-lg bg-white p-2 text-[11px] text-gray-600">
              <b>Área útil dinâmica (Infibra):</b> {fmt(telha.larguraUtil ?? 1.05, 2)} m ×
              ({fmt(telha.comprimentoPeca, 2)} m − {fmt(recobrimentoFibro(incl), 2)} m de recobrimento em{" "}
              {incl}%) = <b>{fmt(1 / rendimentoAtual, 2)} m² por telha</b> · {fmt(rendimentoAtual, 2)} telhas/m².
              O recobrimento muda com a inclinação (14 cm ≥ 15°, 20 cm de 10° a 15°, 25 cm de 5° a 10°).
            </p>
          )}
          <p className="mt-2 text-[11px] text-gray-500">
            Fabricante de referência: <b className="text-gray-700">{telha.fabricante}</b> · Peso aproximado da cobertura: <b className="text-gray-700">{telha.pesoM2} kg/m²</b> ·{" "}
            <a href={telha.href} className="font-bold text-orange-600 hover:underline">
              ver ficha completa no catálogo →
            </a>
          </p>
        </div>
      </div>

      {/* Passo 4 — inclinação */}
      <div className={card}>
        <div className="flex items-center justify-between">
          <p className={passo}>Passo 4 · Inclinação</p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={5}
              max={100}
              value={incl}
              onChange={(e) => setIncl(Number(e.target.value))}
              aria-label="Inclinação em porcentagem"
              className={`w-20 rounded-lg border px-2 py-1 text-right text-sm font-extrabold ${
                avisoIncl ? "border-red-300 text-red-600" : "border-orange-200 text-orange-600"
              }`}
            />
            <span className="text-sm font-bold text-gray-500">%</span>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-gray-500">
          Pré-preenchido com o mínimo recomendado de {telha.label.replace(" ★", "")} ({telha.min}%) — você pode aumentar.
        </p>
        <input
          type="range"
          min={5}
          max={80}
          step={1}
          value={incl}
          onChange={(e) => setIncl(Number(e.target.value))}
          className={`mt-3 w-full ${avisoIncl ? "accent-red-600" : "accent-orange-600"}`}
          aria-label="Inclinação do telhado"
        />

        {avisoIncl && (
          <div className="mt-3 flex gap-2 rounded-lg border border-red-300 bg-red-50 p-3" role="alert">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
            <div className="text-xs text-red-800">
              <p className="font-bold">Inclinação abaixo do mínimo técnico</p>
              <p className="mt-0.5 font-medium">
                {telha.label} exige no mínimo <b>{telha.min}%</b> de caimento. Com {incl}% há risco real de retorno de
                água e infiltração nas emendas.
              </p>
              <button
                type="button"
                onClick={() => setIncl(telha.min)}
                className="mt-2 rounded-lg bg-red-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-red-700"
              >
                Ajustar para {telha.min}%
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Passo 5 — acabamento */}
      <div className={card}>
        <div className="flex items-center justify-between gap-3">
          <p className={passo}>Passo 5 · Calcular telhas de acabamento (cumeeira, espigão)?</p>
          <Toggle on={comAcabamento} onClick={() => setComAcabamento((v) => !v)} label="Calcular acabamento" />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Calculamos o metro linear de cumeeira e de espigão conforme o número de águas e convertemos em peças pelo
          rendimento da cumeeira compatível com a sua telha.
        </p>
      </div>

      {/* Pontos de luz natural */}
      <div className={card}>
        <div className="flex items-center justify-between gap-3">
          <p className={passo}>Quer adicionar pontos de luz natural (telha translúcida)?</p>
          <Toggle on={comLuz} onClick={() => setComLuz((v) => !v)} label="Adicionar pontos de luz" />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Telhas de vidro, polipropileno e policarbonato são usadas como pontos pontuais de iluminação, misturadas à
          telha principal — por isso você informa a quantidade de peças, não uma área.
        </p>
        {comLuz && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">Tipo de telha translúcida</label>
              <select value={luzId} onChange={(e) => setLuzId(e.target.value)} className={input}>
                {GRUPOS_LUZ.map((g) => (
                  <optgroup key={g} label={g}>
                    {TELHAS_LUZ.filter((t) => t.grupo === g).map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">Quantidade de peças</label>
              <input
                type="number"
                min={0}
                value={luzQtd}
                onChange={(e) => setLuzQtd(e.target.value)}
                className={input}
                aria-label="Quantidade de peças de telha translúcida"
              />
            </div>
            {telhaLuz?.familia === "vidro" && (
              <div className="sm:col-span-2 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <p className="text-xs text-amber-800">
                  A telha de vidro deve ser do mesmo formato da telha cerâmica escolhida (ex.: Vidro Portuguesa com
                  Cerâmica Portuguesa), para garantir o encaixe correto.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Passo 6 — calhas */}
      <div className={card}>
        <div className="flex items-center justify-between gap-3">
          <p className={passo}>Passo 6 · Incluir calhas e acessórios?</p>
          <Toggle on={comCalhas} onClick={() => setComCalhas((v) => !v)} label="Incluir calhas" />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Calculamos o metro linear de calha pelo perímetro do telhado e sugerimos suportes, saídas e cabeceiras
          na proporção correta.
        </p>
      </div>

      {/* Passo 7 — estrutura */}
      <div className={card}>
        <div className="flex items-center justify-between gap-3">
          <p className={passo}>Passo 7 · Calcular estrutura de madeira também?</p>
          <Toggle on={comEstrutura} onClick={() => setComEstrutura((v) => !v)} label="Calcular estrutura" />
        </div>
        {comEstrutura && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">Espécie da madeira</label>
              <select value={especie} onChange={(e) => setEspecie(e.target.value)} className={input}>
                {ESPECIES.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.label}
                  </option>
                ))}
              </select>
            </div>
            {!avancado && (
              <div className="sm:col-span-2 rounded-lg bg-gray-50 p-3 text-[11px] text-gray-600">
                {sistemaTelha === "ripa" ? (
                  <>
                    Modo simples: ripa/ripão pela galga da telha escolhida (
                    <b>{galgaFichaTelha ? `${(galgaFichaTelha * 100).toFixed(1).replace(".", ",")} cm` : "—"}</b>
                    ), caibro/caibrão a cada 0,50 m e viga a cada 1,50 m, com bitola de viga definida pelo vão
                    livre (padrão 3 m → 11 cm).
                  </>
                ) : sistemaTelha === "pvc" ? (
                  <>Telha PVC: apoio de madeira a cada 66 cm e viga de 11 cm — sem ripa e sem caibro.</>
                ) : (
                  <>
                    Fibrocimento, policarbonato e translúcida: só viga de apoio (começo, meio e fim de cada telha,
                    com apoio compartilhado entre fiadas) — sem ripa e sem caibro.
                  </>
                )}{" "}
                Margem de corte da madeira: 5%. Ative o modo avançado no topo para editar esses valores.
              </div>
            )}

            {avancado && (
              <>
                {sistemaTelha === "ripa" && (
                  <>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-gray-700">
                        Galga da telha (m) — espaçamento entre ripas
                      </label>
                      <input
                        inputMode="decimal"
                        placeholder={galgaFichaTelha ? galgaFichaTelha.toFixed(3) : "0,330"}
                        value={galgaCustom}
                        onChange={(e) => setGalgaCustom(e.target.value)}
                        className={input}
                      />
                      <p className="mt-1 text-[11px] text-gray-500">
                        Ficha técnica: {galgaFichaTelha ? `${(galgaFichaTelha * 100).toFixed(1).replace(".", ",")} cm` : "—"} ·
                        deixe vazio para usar esse valor.
                      </p>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-gray-700">
                        Espaçamento entre caibros / caibrões (m)
                      </label>
                      <input inputMode="decimal" value={espacamento} onChange={(e) => setEspacamento(e.target.value)} className={input} />
                    </div>

                    <div className="sm:col-span-2 flex items-center justify-between gap-3 rounded-lg bg-gray-50 p-3">
                      <span className="text-xs font-semibold text-gray-700">
                        Usar ripão (mesma medida da ripa, bitola reforçada)
                      </span>
                      <Toggle on={comRipao} onClick={() => setComRipao((v) => !v)} label="Usar ripão" />
                    </div>
                    <div className="sm:col-span-2 flex items-center justify-between gap-3 rounded-lg bg-gray-50 p-3">
                      <span className="text-xs font-semibold text-gray-700">
                        Usar caibrão (mesmo espaçamento do caibro, bitola reforçada)
                      </span>
                      <Toggle on={comCaibrao} onClick={() => setComCaibrao((v) => !v)} label="Usar caibrão" />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold text-gray-700">Espaçamento entre vigas (m)</label>
                      <input inputMode="decimal" value={espViga} onChange={(e) => setEspViga(e.target.value)} className={input} />
                    </div>
                  </>
                )}

                {sistemaTelha !== "pvc" && (
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700">Vão livre entre apoios (m)</label>
                    <input
                      inputMode="decimal"
                      placeholder={fmtN(vaoLivreAuto)}
                      value={vaoLivre}
                      onChange={(e) => setVaoLivre(e.target.value)}
                      className={input}
                    />
                    <p className="mt-1 text-[11px] text-gray-500">
                      Padrão automático pelo comprimento do telhado: <b>{fmtN(vaoLivreAuto)} m</b>. Altere apenas se
                      houver apoio intermediário (poste, pilar ou parede) que reduza o vão real. Bitola da viga
                      aplicada: <b>{bitolaVigaPorVao(vaoLivreEfetivo)}</b> (até 3 m → 11 cm · até 4,5 m → 15 cm · até
                      5,5 m → 20 ou 25 cm · acima → 30 cm).
                    </p>
                  </div>
                )}

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">Margem de corte da madeira (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={25}
                    value={margemMadeira}
                    onChange={(e) => setMargemMadeira(Number(e.target.value))}
                    className={input}
                  />
                </div>

                <div className="sm:col-span-2 rounded-lg border border-orange-100 bg-orange-50/50 p-3 text-[11px] text-gray-600">
                  {sistemaTelha === "ripa" ? (
                    <>
                      <b className="text-orange-700">Prego por bitola:</b> ripa → 17x21 · ripão → 19x36 · caibro e
                      caibrão em viga → 22x48. A quantidade é contada por ponto de fixação (cada cruzamento uma vez
                      só).
                    </>
                  ) : (
                    <>
                      <b className="text-orange-700">Sem ripa e sem caibro:</b> esta telha é fixada direto na viga de
                      apoio com parafuso de vedação — por isso não há prego de ripa/caibro no orçamento.
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        )}


      </div>

      {/* Margem de recorte */}
      <div className={card}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold text-gray-600">
            Margem de recorte / reposição da telha: <b className="text-orange-600">{margem}%</b>
            {comEstrutura ? (
              <>
                {" "}· madeira: <b className="text-orange-600">{margemMadeira}%</b>
              </>
            ) : null}
          </p>
          <button
            type="button"
            onClick={() => setAjustarMargem((v) => !v)}
            className="text-xs font-bold text-orange-600 hover:underline"
          >
            {ajustarMargem ? "Fechar" : "Ajustar margem"}
          </button>
        </div>
        {ajustarMargem && (
          <div className="mt-3 flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={5}
              step={0.5}
              value={margem}
              onChange={(e) => setMargem(Number(e.target.value))}
              className="w-full accent-orange-600"
              aria-label="Margem de recorte e reposição"
            />
            <input
              type="number"
              min={0}
              max={10}
              step={0.5}
              value={margem}
              onChange={(e) => setMargem(Number(e.target.value))}
              aria-label="Margem em porcentagem"
              className="w-20 rounded-lg border border-orange-200 px-2 py-1 text-right text-sm font-bold text-orange-600"
            />
          </div>
        )}
        <p className="mt-2 text-[11px] text-gray-500">
          Recomendado de 1,5% a 2% para telha. A madeira usa margem própria (~5%), editável no modo avançado.
        </p>

      </div>

      <button
        type="button"
        onClick={calcular}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 py-4 text-sm font-bold text-white transition-colors hover:bg-orange-700"
      >
        <Calculator size={18} />
        Calcular materiais
      </button>

      {res && (
        <div className="rounded-xl border border-[#fed7aa] bg-[#fff7ed] p-5">
          <p className="text-xs font-bold tracking-wider text-orange-600 uppercase">Resultado estimado</p>

          {/* Croquis: vista superior + vista de perfil */}
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-orange-100 bg-white p-3" dangerouslySetInnerHTML={{ __html: res.croqui }} />
            <div className="rounded-xl border border-orange-100 bg-white p-3" dangerouslySetInnerHTML={{ __html: res.perfil }} />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {[
              { l: "Área da base (planta)", v: `${fmt(res.areaBase)} m²` },
              { l: "Área inclinada real", v: `${fmt(res.areaIncl)} m²` },
              { l: "Perímetro do telhado", v: `${fmt(res.perimetro)} m` },
              { l: `Telhas (+${res.margem}% margem)`, v: `${res.telhas} un` },
              { l: "Altura do oitão", v: `${fmt(res.alturaCumeeira)} m` },
              { l: "Largura inclinada (água)", v: `${fmt(res.larguraInclinada)} m` },
              { l: "Água + beiral (caibro)", v: `${fmt(res.caibro)} m` },
            ].map((b) => (
              <div key={b.l} className="rounded-lg border border-orange-100 bg-white p-3">
                <p className="text-[11px] font-semibold text-gray-500">{b.l}</p>
                <p className="mt-0.5 text-lg font-extrabold text-gray-900">{b.v}</p>
              </div>
            ))}
          </div>

          {/* Peso e aviso de cotação (sem valores em R$) */}
          <div className="mt-4 rounded-xl border border-orange-200 bg-white p-4">
            <p className="flex items-center gap-1.5 text-xs text-gray-600">
              <Scale size={14} className="text-orange-600" /> Peso estimado da cobertura:{" "}
              <b className="text-gray-900">{fmt(res.peso, 0)} kg</b>
            </p>
            <p className="mt-2 text-[11px] text-gray-500">
              A calculadora não exibe preços: o valor final sai somente na cotação com o vendedor, que confere as
              quantidades e as especificações disponíveis em estoque. No comparativo abaixo, mostramos apenas a
              diferença relativa (%) entre as telhas escolhidas.
            </p>
          </div>


          <p className="mt-5 text-xs font-bold tracking-wider text-gray-500 uppercase">Lista sugerida</p>
          <ul className="mt-2 divide-y divide-orange-100 rounded-lg border border-orange-100 bg-white">
            <li className="flex items-center justify-between gap-3 p-3">
              <span className="text-sm text-gray-700">{res.telha.label}</span>
              <span className="shrink-0 text-sm font-bold text-orange-600">{res.telhas} un</span>
            </li>
            {res.itens.map((i) => (
              <li key={i.nome} className="flex items-center justify-between gap-3 p-3">
                <span className="text-sm text-gray-700">{i.nome}</span>
                <span className="shrink-0 text-sm font-bold text-orange-600">{i.qtd}</span>
              </li>
            ))}
            {res.luz && (
              <li className="flex items-center justify-between gap-3 p-3">
                <span className="text-sm text-gray-700">
                  Pontos de Luz Natural — {res.luz.label}{" "}
                  <a href={res.luz.href} className="font-bold text-orange-600 hover:underline">
                    ver no catálogo →
                  </a>
                </span>
                <span className="shrink-0 text-sm font-bold text-orange-600">{res.luz.qtd} peças</span>
              </li>
            )}
          </ul>

          {res.acabamento.length > 0 && (
            <>
              <p className="mt-5 text-xs font-bold tracking-wider text-gray-500 uppercase">
                Telhas de acabamento (cumeeira / espigão)
              </p>
              <ul className="mt-2 divide-y divide-orange-100 rounded-lg border border-orange-100 bg-white">
                {res.acabamento.map((i) => (
                  <li key={i.nome} className="flex items-center justify-between gap-3 p-3">
                    <span className="text-sm text-gray-700">{i.nome}</span>
                    <span className="shrink-0 text-right text-sm font-bold text-orange-600">{i.qtd}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/catalogo/telhas/cumeeiras"
                className="mt-2 inline-block text-xs font-bold text-orange-600 hover:underline"
              >
                Ver linha completa de cumeeiras e espigões →
              </a>
            </>
          )}

          {res.calhas.length > 0 && (
            <>
              <p className="mt-5 text-xs font-bold tracking-wider text-gray-500 uppercase">Calhas e acessórios</p>
              <ul className="mt-2 divide-y divide-orange-100 rounded-lg border border-orange-100 bg-white">
                {res.calhas.map((i) => (
                  <li key={i.nome} className="flex items-center justify-between gap-3 p-3">
                    <span className="text-sm text-gray-700">{i.nome}</span>
                    <span className="shrink-0 text-sm font-bold text-orange-600">{i.qtd}</span>
                  </li>
                ))}
              </ul>
              <a href="/catalogo/calhas" className="mt-2 inline-block text-xs font-bold text-orange-600 hover:underline">
                Ver linha completa de calhas →
              </a>
            </>
          )}

          {res.estrutura.length > 0 && (
            <>
              <p className="mt-5 text-xs font-bold tracking-wider text-gray-500 uppercase">Estrutura de madeira</p>
              <ul className="mt-2 divide-y divide-orange-100 rounded-lg border border-orange-100 bg-white">
                {res.estrutura.map((i) => (
                  <li key={i.nome} className="flex items-center justify-between gap-3 p-3">
                    <span className="text-sm text-gray-700">{i.nome}</span>
                    <span className="shrink-0 text-sm font-bold text-orange-600">{i.qtd}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Comparativo lado a lado — qualquer telha do catálogo */}
          <div className="mt-5">
            <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">
              Comparativo entre telhas do catálogo
            </p>
            <p className="mt-1 text-[11px] text-gray-500">
              Sugerimos telhas compatíveis com a inclinação informada, mas você pode trocar por qualquer outra opção do
              catálogo — inclusive uma terceira telha.
            </p>
          </div>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {[
              { valor: compA, set: setCompA, opcional: false },
              { valor: compB, set: setCompB, opcional: false },
              { valor: compC, set: setCompC, opcional: true },
            ].map((sel, idx) => {
              const c = comparativo.find((x) => x.telha.id === sel.valor);
              return (
                <div key={idx} className="rounded-xl border border-orange-100 bg-white p-3">
                  <select
                    value={sel.valor}
                    onChange={(e) => sel.set(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs font-bold focus:border-orange-400 focus:outline-none"
                    aria-label={`Telha ${idx + 1} do comparativo`}
                  >
                    {sel.opcional && <option value="">+ Comparar uma 3ª telha (opcional)</option>}
                    {GRUPOS.map((g) => (
                      <optgroup key={g} label={g}>
                        {TELHAS.filter((t) => t.grupo === g).map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {c && (
                    <dl className="mt-3 space-y-1.5 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Peças</dt>
                        <dd className="font-bold text-gray-900">{c.pecas} un</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Peso total</dt>
                        <dd className="font-bold text-gray-900">{fmt(c.peso, 0)} kg</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Inclinação mínima</dt>
                        <dd className={`font-bold ${c.compativel ? "text-green-600" : "text-red-600"}`}>
                          {c.telha.min}% {c.compativel ? "· compatível" : "· acima da sua"}
                        </dd>
                      </div>
                      <div className="rounded-lg bg-orange-50 p-2">
                        <p className="text-[10px] font-semibold tracking-wider text-orange-700 uppercase">
                          Comparação relativa
                        </p>
                        <p className="mt-0.5 text-xs font-bold text-gray-800">
                          {c.percentual === null
                            ? "Custo sob cotação"
                            : c.percentual === 0
                              ? "Referência — opção mais econômica"
                              : `≈ ${c.percentual}% mais cara que a referência`}
                        </p>
                      </div>
                    </dl>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] text-gray-500">
            A diferença percentual é calculada com a tabela interna da loja, sem exibir valores: serve só para comparar
            as opções entre si. Coberturas mais leves (PVC e policarbonato) exigem menos madeira; cerâmica e concreto
            pedem estrutura reforçada.
          </p>


          <p className="mt-4 text-[11px] text-gray-500">
            Estimativa de referência. Nossa equipe técnica confere as quantidades na cotação final.
          </p>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setModal(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-700"
            >
              <MessageCircle size={18} />
              Enviar lista no WhatsApp
            </button>
            <button
              type="button"
              onClick={baixarPdf}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-orange-600 bg-white py-3.5 text-sm font-bold text-orange-600 transition-colors hover:bg-orange-50"
            >
              <Download size={18} />
              Baixar resultado em PDF
            </button>
          </div>
        </div>
      )}

      <ModalCotarWhatsApp
        aberto={modal}
        onFechar={() => setModal(false)}
        corpoMensagem={mensagem}
        tipo="calculadora"
        nomeProduto="Cálculo de telhado"
      />
    </div>
  );
}

function fmtN(n: number) {
  return n.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
}
