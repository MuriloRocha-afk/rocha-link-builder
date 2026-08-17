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

    const nome = data.nome;
    const telefone = data.telefone;
    const email = data.email;
    const endereco = data.endereco;
    const bairro = data.cidade;

    const itensTexto = data.itens
      .map((item) => `- ${item.descricao} · ${item.quantidade} ${item.unidade || "un"}`)
      .join("\n");

    const obs = [
      "Orçamento via site",
      `Cliente: ${nome}`,
      `Tel: ${telefone || "não informado"}`,
      `Email: ${email || "não informado"}`,
      `Bairro/cidade: ${bairro}`,
      `Endereço: ${endereco || "não informado"}`,
      data.observacoes ? `Observações: ${data.observacoes}` : "",
      "",
      "Produtos:",
      itensTexto,
    ]
      .filter(Boolean)
      .join("\n")
      .slice(0, 4000);

    const pedidoObj = {
      pedido: {
        situacao: "Em aberto",
        obs,
        cliente: {
          nome,
          fone: telefone,
          email: email || "",
          tipo_pessoa: "F",
        },
        itens: data.itens.map((item) => ({
          item: {
            descricao: item.descricao,
            unidade: "PC",
            quantidade: item.quantidade,
            valor_unitario: "0.00",
          },
        })),
      },
    };

    const body = new URLSearchParams();
    body.append("token", token);
    body.append("formato", "JSON");
    body.append("pedido", JSON.stringify(pedidoObj));

    try {
      const response = await fetch("https://api.tiny.com.br/api2/pedido.incluir.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      const resposta = await response.json();
      console.log("Retorno completo Olist:", JSON.stringify(resposta, null, 2));

      if (resposta?.retorno?.status !== "OK") {
        const erros = resposta?.retorno?.erros
          ?.map((e: { erro?: string; mensagem?: string }) => e.erro || e.mensagem)
          .filter(Boolean)
          .join(", ");
        return {
          ok: false as const,
          erro: `Olist rejeitou: ${erros || "erro desconhecido"}`,
        };
      }

      const numero =
        resposta?.retorno?.pedido?.numero_pedido ??
        resposta?.retorno?.pedido?.numero ??
        "";

      return { ok: true as const, numeroPedido: String(numero) };
    } catch (e) {
      console.error("Tiny ERP v2 falha de rede:", e);
      return { ok: false as const, erro: "Falha de comunicação com o sistema." };
    }
  });
