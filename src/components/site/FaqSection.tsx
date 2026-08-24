import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { SectionHeading } from "./shared";

type QA = { q: string; a: string };

const FAQ_DATA: { id: string; label: string; items: QA[] }[] = [
  {
    id: "geral",
    label: "Geral",
    items: [
      {
        q: "Quais regiões a Rocha Telhas atende com entrega?",
        a: "Atendemos com frota própria Franco da Rocha, Caieiras, Francisco Morato, Mairiporã, Perus, Cajamar, Jarinu e toda a região metropolitana de São Paulo. Para outras regiões do estado, consulte disponibilidade pelo WhatsApp.",
      },
      {
        q: "Vocês vendem para pessoa física e para construtoras?",
        a: "Sim, atendemos desde o cliente que vai reformar o telhado da própria casa até construtoras com grandes volumes. O atendimento e os prazos são os mesmos — o que muda é a negociação de condições para volumes maiores.",
      },
      {
        q: "Como funciona o orçamento pelo site?",
        a: "Você monta sua lista de materiais pelo catálogo, adiciona os produtos ao orçamento e envia pelo WhatsApp com um clique. Nossa equipe responde com a cotação completa em minutos durante o horário comercial.",
      },
      {
        q: "Quais as formas de pagamento aceitas?",
        a: "Aceitamos dinheiro, PIX, cartão de débito e cartão de crédito em até 6 vezes. Para pedidos de volume maior, consulte condições especiais de prazo com nossa equipe comercial.",
      },
      {
        q: "Qual o horário de atendimento?",
        a: "Segunda a sexta das 08h às 18h e sábados das 08h às 13h. Fora desse horário, você pode enviar mensagem no WhatsApp e respondemos assim que a loja abrir.",
      },
      {
        q: "Vocês têm estoque pronto ou é preciso verificar disponibilidade?",
        a: "Trabalhamos com estoque permanente dos produtos mais vendidos — fibrocimento, cambará, pontaletes, forro PVC e tintas Anjo. Para produtos específicos ou grandes volumes, consulte disponibilidade.",
      },
    ],
  },
  {
    id: "telhas",
    label: "Telhas",
    items: [
      {
        q: "Qual a diferença entre fibrocimento 5mm, 6mm e 8mm?",
        a: "A espessura define a resistência mecânica da telha. O 5mm é o mais vendido e suficiente para a maioria das coberturas residenciais. O 6mm é recomendado para vãos maiores ou regiões com granizo frequente. O 8mm é indicado para coberturas industriais com grandes balanços ou tráfego de manutenção sobre as telhas.",
      },
      {
        q: "Posso pintar a telha de fibrocimento?",
        a: "Sim, mas somente após o período de cura de pelo menos 6 meses. Use tinta acrílica específica para fibrocimento — a Anjo Emborrachada é a que mais vendemos para essa aplicação. Nunca pinte telha nova sem cura, pois ela ainda libera resíduos que impedem a aderência da tinta.",
      },
      {
        q: "Qual a inclinação mínima para cada tipo de telha?",
        a: "Fibrocimento e Polipropileno: mínimo 10%. Telha Colonial PVC: mínimo 15%. Telha Cerâmica (Portuguesa e Romana): mínimo 30%. Policarbonato: mínimo 5%. Concreto Eurotop: mínimo 30%. Use nossa calculadora para simular a inclinação ideal para sua cobertura.",
      },
      {
        q: "Qual comprimento de fibrocimento devo escolher?",
        a: "Para coberturas residenciais comuns, o 244cm é o mais indicado — é o mais vendido por equilibrar peso, facilidade de instalação e custo. Para galpões ou coberturas maiores, o 305cm ou 366cm reduzem o número de emendas. Nossa equipe pode ajudar no cálculo pela calculadora do site.",
      },
      {
        q: "A telha Colonial PVC aguenta o peso de uma pessoa?",
        a: "Não. A telha PVC não deve receber carga de pessoas. Para manutenção no telhado, use pranchas de distribuição de carga apoiadas na estrutura. Este cuidado se aplica também ao fibrocimento — sempre apoie-se nos caibros, nunca na telha.",
      },
      {
        q: "Posso misturar telha translúcida com fibrocimento?",
        a: "Sim, essa é justamente a aplicação mais comum. A telha translúcida Polipropileno que vendemos tem as mesmas dimensões e sobreposição que o fibrocimento INFIBRA, então encaixam perfeitamente na mesma estrutura e carreira.",
      },
      {
        q: "Qual a diferença entre telha Portuguesa e Romana?",
        a: "A Portuguesa tem perfil arredondado clássico com encaixe lateral por sobreposição simples — é a mais tradicional e acessível. A Romana tem perfil com nervura central mais pronunciada e encaixe macho-fêmea, o que dá mais rigidez e vedação. As duas têm inclinação mínima de 30% e cobertura por peça similar de aproximadamente 0,042 m².",
      },
      {
        q: "O que é telha resinada? Vale a pena?",
        a: "A telha resinada recebe um tratamento superficial de silicone ou resina que reduz a absorção de água, inibe o crescimento de fungo e musgo e facilita a limpeza. Para regiões úmidas ou telhados com pouca inclinação, a resinada é a melhor escolha — durabilidade muito superior no longo prazo.",
      },
    ],
  },
  {
    id: "madeiramento",
    label: "Madeiramento",
    items: [
      {
        q: "Qual a diferença entre madeira bruta e aparelhada?",
        a: "A madeira bruta sai diretamente da serraria com a superfície áspera da lâmina da serra. A aparelhada passa pela plaina industrial, que remove a aspereza e deixa a superfície lisa e padronizada. Para estruturas de telhado escondidas, a bruta serve. Para forros, tabeiras, decks ou onde a madeira fica à vista, recomendamos sempre a aparelhada.",
      },
      {
        q: "Por que o Cambará é a madeira mais recomendada para telhado?",
        a: "O Cambará Rosa tem alta densidade, boa resistência à umidade e ao ataque de cupins, e aceita bem pregos e parafusos. Além disso, toda a madeira que vendemos tem DOF/IBAMA — origem legal certificada. Na prática, é a madeira com melhor equilíbrio entre resistência, trabalhabilidade e preço na região.",
      },
      {
        q: "Preciso tratar o Cambará contra cupim?",
        a: "O Cambará já tem resistência natural razoável, mas em regiões com cupim de madeira seca ou de solo, o tratamento preventivo é recomendado. Vendemos o Apus Química e o Ecol Exterminador de Cupim que podem ser aplicados antes da instalação para máxima proteção.",
      },
      {
        q: "O que significa DOF/IBAMA na madeira?",
        a: "O DOF (Documento de Origem Florestal) é a nota fiscal ambiental da madeira, emitida pelo IBAMA. Garante que a madeira foi extraída legalmente de área de manejo florestal ou reflorestamento. Toda a madeira nativa que vendemos tem DOF — exija isso de qualquer fornecedor de madeira.",
      },
      {
        q: "Quanto tempo dura um pontalete de Eucalipto tratado no solo?",
        a: "Com tratamento autoclave CCA tipo C, que é o que utilizamos, a vida útil em contato com o solo é de 15 a 25 anos. Sem tratamento, a madeira de eucalipto dura no máximo 2 a 3 anos no solo. O custo do tratamento se paga no primeiro ano de uso.",
      },
      {
        q: "Qual bitola de caibro devo usar para telha de fibrocimento?",
        a: "Para espaçamento de 50cm entre caibros, o 5x7cm é o padrão recomendado pela ABNT. Para vãos maiores de 60cm ou mais, ou regiões com ventos fortes, use 7x7cm. Para sarrafeamento de fixação das telhas, use ripas de 4,5x3cm ou 5x5cm de Cambará ou Eucalipto.",
      },
      {
        q: "O forro de PVC precisa de estrutura de madeira para instalar?",
        a: "Sim. O forro PVC é instalado em uma estrutura de madeira (barrotes ou sarrafos) fixada no teto ou em ganchos. O espaçamento entre barrotes deve ser de 40 a 60cm. Vendemos tanto as réguas PVC quanto os sarrafos de Cedrinho ou Pinus para a estrutura de suporte.",
      },
    ],
  },
  {
    id: "tintas",
    label: "Tintas & Vernizes",
    items: [
      {
        q: "Qual a diferença entre verniz e stain para madeira?",
        a: "O verniz forma uma película protetora sobre a madeira — transparente ou levemente colorida — que sela a superfície. O stain penetra na fibra da madeira, realça o veio natural e protege de dentro para fora, deixando a textura da madeira à mostra. Para madeiras com veio bonito como Cedrinho e Cambará aparelhado, o stain valoriza mais o material.",
      },
      {
        q: "Quantas demãos de verniz preciso dar?",
        a: "Em madeira nova ou porosa: 3 demãos com lixamento leve entre cada uma. Em madeira já envernizada em bom estado: 1 a 2 demãos de renovação. Para uso externo em pergolado, deck ou janela, sempre 3 demãos e renovação anual ou bianual.",
      },
      {
        q: "Posso dar verniz em madeira verde ou úmida?",
        a: "Não. A madeira precisa ter umidade abaixo de 15% para receber verniz. Madeira úmida vai descascar a película em semanas. Aguarde pelo menos 30 dias após a entrega em local ventilado. Nossa madeira é seca, mas pode absorver umidade durante o transporte — verifique antes de aplicar.",
      },
      {
        q: "Qual tinta usar para pintar telhado de fibrocimento?",
        a: "A Anjo Emborrachada é a mais indicada — vendemos muito para essa aplicação. Aplique após o período de cura de mínimo 6 meses para telha nova, com 2 demãos e limpeza prévia da telha. Evite tintas de base solvente em fibrocimento.",
      },
      {
        q: "O stain Anjo precisa de selador antes?",
        a: "Não, o Stain Anjo é autossuficiente — aplique diretamente na madeira limpa e seca. Lixe levemente com lixa 120 antes da primeira demão. O selador só é necessário quando for usar verniz ou esmalte após o stain.",
      },
      {
        q: "Qual produto usar para proteger madeira exposta à chuva?",
        a: "Para madeira estrutural exposta como pergolado, deck e fachada: Anjo Verniz Marítimo Premium ou Sayerlack Sayermar — formulados especificamente para resistência à água e UV. Para estrutura interna de telhado exposta à umidade, o Cupicida preventivo mais Verniz Marítimo é a combinação mais eficaz.",
      },
    ],
  },
  {
    id: "entrega",
    label: "Entrega & Pagamento",
    items: [
      {
        q: "Como funciona o descarregamento na entrega?",
        a: "O descarregamento é realizado exclusivamente na frente do imóvel, no nível do solo ou térreo. Nossa equipe não realiza transporte manual interno, subida de escadas, rampas ou elevadores. Tenha pessoal disponível para auxiliar no recebimento e organização do material dentro do canteiro.",
      },
      {
        q: "Qual o prazo de entrega?",
        a: "Para pedidos com produtos em estoque, o prazo é de 1 a 3 dias úteis para Franco da Rocha e municípios vizinhos. Para cidades mais distantes ou pedidos com produtos especiais, o prazo pode variar — consulte nossa equipe pelo WhatsApp.",
      },
      {
        q: "É possível retirar o material na loja?",
        a: "Sim. Você pode retirar pessoalmente na nossa loja em Franco da Rocha na Rua Dr. Hamilton Prado, 856, Centro, de segunda a sexta das 8h às 18h e sábados das 8h às 13h. Para retirada de madeiras longas, verifique as dimensões do seu veículo antes de vir.",
      },
      {
        q: "Vocês parcelam a compra no cartão de crédito?",
        a: "Sim, parcelamos em até 6 vezes no cartão de crédito. Também aceitamos PIX, débito e dinheiro. Para obras de grande volume, consulte condições especiais de prazo com nossa equipe.",
      },
      {
        q: "O frete é cobrado? Como é calculado?",
        a: "O valor do frete varia conforme a distância e o volume do pedido. Para alguns produtos e regiões, pode haver frete grátis em pedidos acima de determinado valor. Consulte nossa equipe pelo WhatsApp com o endereço de entrega e a lista de materiais para receber o valor exato do frete junto com a cotação.",
      },
      {
        q: "O que acontece se o material chegar danificado?",
        a: "Antes de assinar o recibo de entrega, verifique as peças. Em caso de avaria visível, recuse o item danificado e comunique imediatamente nossa equipe. Trabalhamos para resolver qualquer problema rapidamente — nossa reputação de 25 anos foi construída assim.",
      },
    ],
  },
];

const WHATS_FAQ =
  "https://wa.me/5511971761003?text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20um%20produto%20da%20Rocha%20Telhas.";

export function Faq() {
  const [aba, setAba] = useState(FAQ_DATA[0].id);
  const [aberta, setAberta] = useState<string | null>(null);

  const grupo = FAQ_DATA.find((g) => g.id === aba) ?? FAQ_DATA[0];

  return (
    <section id="faq" className="scroll-mt-24 bg-background py-24">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeading
          kicker="FAQ"
          title="Dúvidas frequentes"
          subtitle="Respostas para as perguntas mais comuns sobre produtos, entrega e pedidos."
        />

        {/* Abas de categoria */}
        <div className="-mx-5 mt-10 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-2 pb-1">
            {FAQ_DATA.map((g) => {
              const ativo = g.id === aba;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    setAba(g.id);
                    setAberta(null);
                  }}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    ativo
                      ? "bg-[#ea580c] text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {g.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordions */}
        <div key={grupo.id} className="mt-8 animate-in fade-in duration-300 space-y-3">
          {grupo.items.map((item) => {
            const id = `${grupo.id}-${item.q}`;
            const open = aberta === id;
            return (
              <div
                key={id}
                className="overflow-hidden rounded-xl border-[0.5px] border-border bg-card"
              >
                <button
                  type="button"
                  onClick={() => setAberta(open ? null : id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold text-primary"
                >
                  {item.q}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl border border-border bg-secondary p-7 text-center">
          <p className="text-lg font-extrabold text-primary">Não encontrou sua dúvida?</p>
          <a
            href={WHATS_FAQ}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-700"
          >
            <MessageCircle className="h-4 w-4" />
            Perguntar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export default Faq;
