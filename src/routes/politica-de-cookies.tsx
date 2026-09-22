import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTATO } from "@/components/site/shared";

export const Route = createFileRoute("/politica-de-cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies — Rocha Telhas & Madeiras" },
      {
        name: "description",
        content:
          "Entenda como o site da Rocha Telhas usa cookies de funcionamento e analytics (Google Analytics) e como desativá-los no seu navegador.",
      },
      { property: "og:title", content: "Política de Cookies — Rocha Telhas & Madeiras" },
      {
        property: "og:description",
        content:
          "Entenda como o site da Rocha Telhas usa cookies de funcionamento e analytics (Google Analytics) e como desativá-los no seu navegador.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PoliticaCookies,
});

function PoliticaCookies() {
  return (
    <div className="surface-light">
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
        <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
          Rocha Telhas &amp; Madeiras
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">
          Política de Cookies
        </h1>
        <p className="mt-4 text-sm text-ink/60">Última atualização: setembro de 2026</p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-ink/80">
          <section>
            <h2 className="text-xl font-bold text-ink">1. O que são cookies</h2>
            <p className="mt-3">
              Cookies são pequenos arquivos armazenados no seu navegador quando você visita um
              site. Eles ajudam o site a funcionar corretamente e permitem entender, de forma
              agregada, como as pessoas usam as páginas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">2. Quais cookies usamos</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Cookies de funcionamento (essenciais):</strong> guardam preferências
                básicas de navegação — por exemplo, a sua resposta a este aviso de cookies e o
                carrinho de orçamento montado no site. Sem eles, algumas funções não funcionam
                como esperado.
              </li>
              <li>
                <strong>Cookies de analytics (Google Analytics):</strong> coletam informações
                anônimas e agregadas sobre as páginas visitadas (como páginas mais acessadas e
                tempo de navegação), para melhorarmos o site continuamente. Esses cookies não
                identificam você pessoalmente.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">3. Cookies que NÃO usamos</h2>
            <p className="mt-3">
              Este site <strong>não utiliza cookies de publicidade nem de remarketing</strong> de
              terceiros. Nenhum dado de navegação é usado para exibir anúncios direcionados em
              outros sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">4. Como desativar os cookies</h2>
            <p className="mt-3">
              Você pode apagar ou bloquear cookies a qualquer momento nas configurações do seu
              navegador. Os caminhos mais comuns são:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Google Chrome:</strong> Configurações → Privacidade e segurança → Cookies
                e outros dados de sites.
              </li>
              <li>
                <strong>Safari (iPhone/Mac):</strong> Ajustes/Preferências → Privacidade e
                segurança → Gerenciar dados de sites / Impedir cookies.
              </li>
              <li>
                <strong>Firefox:</strong> Configurações → Privacidade e segurança → Cookies e
                dados de sites.
              </li>
              <li>
                <strong>Edge:</strong> Configurações → Cookies e permissões de sites → Gerenciar
                cookies.
              </li>
            </ul>
            <p className="mt-3">
              Ao bloquear cookies de funcionamento, recursos como o carrinho de orçamento e o
              aviso de cookies podem não funcionar corretamente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">5. Relação com a Política de Privacidade</h2>
            <p className="mt-3">
              O tratamento de dados pessoais realizado por este site está detalhado na nossa{" "}
              <Link
                to="/politica-de-privacidade"
                className="font-semibold text-accent underline underline-offset-4"
              >
                Política de Privacidade
              </Link>
              , em conformidade com a Lei Geral de Proteção de Dados (LGPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">6. Dúvidas e contato</h2>
            <p className="mt-3">Para qualquer dúvida sobre esta política, fale com a gente:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>WhatsApp:</strong> {CONTATO.phone}
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
          <p className="text-sm text-ink/70">Quer saber mais sobre como tratamos seus dados?</p>
          <Link
            to="/politica-de-privacidade"
            className="mt-4 inline-flex items-center justify-center rounded-lg border border-primary/20 px-5 py-3 text-sm font-bold text-primary transition-transform hover:scale-105"
          >
            Ler a Política de Privacidade
          </Link>
        </div>
      </div>
    </div>
  );
}
