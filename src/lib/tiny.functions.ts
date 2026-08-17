import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  nome: z.string().min(2).max(120),
  telefone: z.string().max(40).optional().default(""),
  email: z.string().max(160).optional().default(""),
  endereco: z.string().max(160).optional().default(""),
  cidade: z.string().min(2).max(120),
  observacoes: z.string().max(1000).optional().default(""),
  itens: z
    .array(
      z.object({
        id: z.union([z.string(), z.number()]).optional(),
        descricao: z.string().min(1).max(200),
        quantidade: z.number().positive().max(100000),
        unidade: z.string().max(10).optional().default("un"),
        valorUnitario: z.number().min(0).optional().default(0),
      }),
    )
    .min(1)
    .max(60),
});

export type TinyPedidoInput = z.infer<typeof schema>;

function formatarItemTexto(
  descricao: string,
  quantidade: number,
  unidade: string,
): string {
  return `- ${descricao} · ${quantidade} ${unidade || "un"}`;
}

export const enviarPedidoTiny = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const token = process.env["OLIST_API_TOKEN"] ?? process.env["TINY_API_TOKEN"];
    if (!token) {
      return { ok: false as const, erro: "Integração não configurada." };
    }

    const itensTexto = data.itens
      .map((i) => formatarItemTexto(i.descricao, i.quantidade, i.unidade || "un"))
      .join("\n");

    const observacoes = [
      "Orçamento via site",
      `Cliente: ${data.nome}`,
      data.telefone ? `Tel: ${data.telefone}` : "",
      data.email ? `Email: ${data.email}` : "Email: não informado",
      `Bairro/cidade: ${data.cidade}`,
      data.endereco ? `Endereço: ${data.endereco}` : "",
      data.observacoes ? `Observações: ${data.observacoes}` : "",
      "",
      "Produtos:",
      itensTexto,
    ]
      .filter(Boolean)
      .join("\n")
      .slice(0, 4000);

    const pedido = {
      pedido: {
        situacao: "Em aberto",
        obs: observacoes,
        cliente: {
          nome: data.nome,
          fone: data.telefone,
          email: data.email ?? "",
          tipoPessoa: "F",
        },
        itens: {
          item: [] as Array<Record<string, unknown>>,
        },
      },
    };

    const params = new URLSearchParams({
      token,
      formato: "JSON",
      pedido: JSON.stringify(pedido),
    });

    try {
      const res = await fetch("https://api.tiny.com.br/api2/pedido.incluir.php", {
        method: "POST",
        body: params,
      });

      const text = await res.text();
      let json: any = null;
      try {
        json = JSON.parse(text);
      } catch {
        /* resposta não-JSON */
      }

      const retorno = json?.retorno;
      const codigoResultado = retorno?.codigo_resultado;
      const status = retorno?.status;

      if (res.ok && (codigoResultado === "0" || codigoResultado === 0 || status === "OK")) {
        const numero =
          retorno?.pedido?.numero_pedido ??
          retorno?.pedido?.numero ??
          retorno?.numero_pedido ??
          retorno?.numero ??
          "";
        return { ok: true as const, numeroPedido: String(numero) };
      }

      console.error("Tiny ERP v2 erro:", res.status, text.slice(0, 1000));

      const erroMensagem =
        retorno?.erros?.[0]?.erro ??
        retorno?.erros?.[0]?.mensagem ??
        retorno?.mensagem ??
        json?.mensagem ??
        (res.status === 401 || res.status === 403
          ? "Token do Tiny recusado. Verifique o OLIST_API_TOKEN."
          : "Não foi possível registrar o orçamento no sistema.");

      return {
        ok: false as const,
        erro: `Olist retornou erro ${codigoResultado ?? res.status}: ${String(erroMensagem)}`,
      };
    } catch (e) {
      console.error("Tiny ERP v2 falha de rede:", e);
      return { ok: false as const, erro: "Falha de comunicação com o sistema." };
    }
  });
