import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { CONTATO, waLink } from "@/components/site/shared";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Rocha Telhas & Madeiras" },
      {
        name: "description",
        content:
          "Saiba como a Rocha Telhas coleta e usa seus dados, conforme a Lei Geral de Proteção de Dados (LGPD).",
      },
      { property: "og:title", content: "Política de Privacidade — Rocha Telhas & Madeiras" },
      {
        property: "og:description",
        content:
          "Saiba como a Rocha Telhas coleta e usa seus dados, conforme a Lei Geral de Proteção de Dados (LGPD).",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PoliticaPrivacidade,
});

function PoliticaPrivacidade() {
  return (
    <div className="surface-light">
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
        <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
          Rocha Telhas &amp; Madeiras
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-sm text-ink/60">
          Última atualização: setembro de 2026
        </p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-ink/80">
          <section>
            <h2 className="text-xl font-bold text-ink">1. Sobre esta política</h2>
            <p className="mt-3">
              Esta Política de Privacidade explica como a <strong>Rocha Telhas &amp; Madeiras</strong>{" "}
              (R. Dr. Hamilton Prado, 856 — Centro, Franco da Rocha/SP), responsável por este site,
              coleta, usa e protege os seus dados pessoais, em conformidade com a Lei Geral de
              Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">2. Quais dados coletamos</h2>
            <p className="mt-3">Coletamos apenas os dados que você fornece voluntariamente:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Nome e telefone</strong>, quando você envia uma solicitação de orçamento
                pelo site ou pelo WhatsApp.
              </li>
              <li>
                <strong>Informações do seu projeto</strong> (medidas, produtos de interesse,
                bairro/endereço de entrega), quando você usa a calculadora do site ou detalha o
                orçamento com o nosso time.
              </li>
              <li>
                <strong>Dados de navegação anônimos</strong> (páginas visitadas), usados apenas de
                forma agregada para melhorar o site.
              </li>
            </ul>
            <p className="mt-3">
              A calculadora do site funciona no seu próprio navegador: as medidas e o cálculo que
              você faz não são armazenados por nós, a menos que você opte por enviar o resultado
              pelo WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">3. Como usamos os seus dados</h2>
            <p className="mt-3">
              Os dados informados são usados <strong>exclusivamente para responder ao seu
              atendimento</strong>: montar o orçamento solicitado, tirar dúvidas sobre produtos e
              combinar a entrega. Eles não são usados para nenhum outro fim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">4. Não vendemos seus dados</h2>
            <p className="mt-3">
              A Rocha Telhas <strong>não vende, aluga nem compartilha</strong> os seus dados
              pessoais com terceiros para fins comerciais ou de marketing. Suas informações ficam
              apenas com a nossa equipe de atendimento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">5. Compartilhamento</h2>
            <p className="mt-3">
              Só acessam seus dados os colaboradores da Rocha Telhas envolvidos no seu atendimento e
              os provedores de tecnologia estritamente necessários para o funcionamento do site
              (como o serviço de hospedagem e o WhatsApp). Esses provedores tratam os dados apenas
              para manter o serviço funcionando.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">6. Seus direitos</h2>
            <p className="mt-3">
              Nos termos da LGPD, você pode solicitar a qualquer momento: a confirmação de que
              tratamos seus dados, o acesso a eles, a correção de informações incompletas ou
              desatualizadas, e a <strong>exclusão dos dados</strong> que mantenhamos. Também pode
              pedir que deixemos de usá-los. Basta entrar em contato pelos canais abaixo e
              atenderemos sua solicitação.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">7. Segurança e conservação</h2>
            <p className="mt-3">
              Adotamos medidas técnicas e administrativas para proteger seus dados contra acesso
              não autorizado. Mantemos suas informações apenas pelo tempo necessário para concluir o
              atendimento e cumprir eventuais obrigações legais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">8. Dúvidas e contato</h2>
            <p className="mt-3">
              Para qualquer dúvida sobre esta política ou para exercer seus direitos, fale com a
              gente:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>WhatsApp:</strong>{" "}
                <a
                  href={waLink("Olá! Tenho uma dúvida sobre a Política de Privacidade do site.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent underline underline-offset-4"
                >
                  {CONTATO.phone}
                </a>
              </li>
              <li>
                <strong>Endereço:</strong> {CONTATO.address}
              </li>
              <li>
                <strong>Horário:</strong> {CONTATO.hours}
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-12 rounded-2xl border border-primary/15 bg-primary-foreground/60 p-6">
          <p className="text-sm text-ink/70">
            Precisa de um orçamento ou tem alguma dúvida sobre seus dados?
          </p>
          <a
            href={waLink("Olá! Vim pelo site da Rocha Telhas e tenho uma dúvida.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-whats px-5 py-3 text-sm font-bold text-primary-deep transition-transform hover:scale-105"
          >
            <MessageCircle className="h-4 w-4" />
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
