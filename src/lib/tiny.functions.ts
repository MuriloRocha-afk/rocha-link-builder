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

export const enviarPedidoTiny = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const token = process.env["OLIST_API_TOKEN"] ?? process.env["TINY_API_TOKEN"];
    if (!token) {
      return { ok: false as const, erro: "Integração não configurada." };
    }

    // Produtos com cadastro no Olist (id do produto no ERP)
    const PRODUTO_IDS: { match: RegExp; id: number }[] = [
      { match: /cambar[áa]/i, id: 341009801 },
    ];

    const resolverId = (descricao: string) =>
      PRODUTO_IDS.find((p) => p.match.test(descricao))?.id ?? null;

    const mapeados = data.itens
      .map((i) => ({ ...i, produtoId: resolverId(i.descricao) }))
      .filter((i) => i.produtoId !== null);
    const naoMapeados = data.itens.filter((i) => resolverId(i.descricao) === null);

    const observacoes = [
      "Orçamento vindo do Site",
      `Cliente: ${data.nome}`,
      data.telefone ? `Telefone/WhatsApp: ${data.telefone}` : "",
      data.email ? `E-mail: ${data.email}` : "",
      data.endereco ? `Endereço: ${data.endereco}` : "",
      `Cidade/Bairro: ${data.cidade}`,
      data.observacoes,
      "",
      "Itens:",
      ...data.itens.map((i) => `- ${i.descricao} — ${i.quantidade} ${i.unidade || "un"}`),
      ...(naoMapeados.length
        ? [
            "",
            "Itens sem cadastro no ERP (definir produto e preço):",
            ...naoMapeados.map(
              (i) => `- ${i.descricao} — ${i.quantidade} ${i.unidade || "un"}`,
            ),
          ]
        : []),
    ]
      .filter(Boolean)
      .join("\n")
      .slice(0, 4000);

    const payload = {
      situacao: 0,
      observacoes,
      consumidorFinal: { clienteConsumidorFinal: true },
      itens: mapeados.map((i) => ({
        produto: { id: i.produtoId },
        id: i.produtoId,
        descricao: i.descricao,
        unidade: i.unidade || "un",
        quantidade: i.quantidade,
        valorUnitario: 0,
      })),
    };


    try {
      const res = await fetch("https://api.tiny.com.br/public-api/v3/pedidos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let json: any = null;
      try {
        json = JSON.parse(text);
      } catch {
        /* resposta não-JSON */
      }

      if (res.ok) {
        const numero = json?.numeroPedido ?? json?.numero ?? json?.id ?? "";
        return { ok: true as const, numeroPedido: String(numero) };
      }

      console.error("Olist ERP erro:", res.status, text.slice(0, 500));
      if (res.status === 401 || res.status === 403) {
        return {
          ok: false as const,
          erro: "Token do Olist recusado (401). A API v3 exige um access token OAuth2 válido.",
        };
      }
      const erro =
        json?.mensagem ??
        json?.message ??
        json?.erros?.[0]?.mensagem ??
        "Não foi possível registrar o orçamento no sistema.";
      return { ok: false as const, erro: String(erro) };

    } catch (e) {
      console.error("Olist ERP falha de rede:", e);
      return { ok: false as const, erro: "Falha de comunicação com o sistema." };
    }
  });
