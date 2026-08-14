import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  nome: z.string().min(2).max(120),
  telefone: z.string().max(40).optional().default(""),
  endereco: z.string().max(160).optional().default(""),
  cidade: z.string().min(2).max(120),
  observacoes: z.string().max(1000).optional().default(""),
  itens: z
    .array(
      z.object({
        descricao: z.string().min(1).max(200),
        quantidade: z.number().positive().max(100000),
        unidade: z.string().max(10).optional().default("un"),
      }),
    )
    .min(1)
    .max(60),
});

export type TinyPedidoInput = z.infer<typeof schema>;

export const enviarPedidoTiny = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const token = process.env["TINY_API_TOKEN"];
    if (!token) {
      return { ok: false as const, erro: "Integração não configurada." };
    }

    const pedido = {
      pedido: {
        data_pedido: new Date().toLocaleDateString("pt-BR"),
        situacao: "aberto",
        numero_ordem_compra: "Vindo do Site",
        obs: ["Vindo do Site", data.observacoes].filter(Boolean).join(" | "),
        cliente: {
          nome: data.nome,
          tipo_pessoa: "F",
          endereco: data.endereco,
          cidade: data.cidade,
          fone: data.telefone,
        },
        itens: data.itens.map((i) => ({
          item: {
            codigo: "",
            descricao: i.descricao,
            unidade: i.unidade || "un",
            quantidade: i.quantidade,
            valor_unitario: 0,
          },
        })),
        marcadores: [{ marcador: { descricao: "Vindo do Site" } }],
      },
    };

    const body = new URLSearchParams({
      token,
      formato: "json",
      pedido: JSON.stringify(pedido),
    });

    try {
      const res = await fetch("https://api.tiny.com.br/api2/pedido.incluir.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      const text = await res.text();
      let json: any = null;
      try {
        json = JSON.parse(text);
      } catch {
        /* resposta não-JSON */
      }

      const retorno = json?.retorno;
      const status = retorno?.status as string | undefined;
      const registro = retorno?.registros?.[0]?.registro;

      if (status === "OK" && registro?.status !== "Erro") {
        return {
          ok: true as const,
          numeroPedido: String(registro?.numero ?? registro?.id ?? ""),
        };
      }

      const erro =
        registro?.erros?.[0]?.erro ??
        retorno?.erros?.[0]?.erro?.erro ??
        retorno?.erros?.[0]?.erro ??
        "Não foi possível registrar o pedido no sistema.";
      console.error("Tiny ERP erro:", text.slice(0, 500));
      return { ok: false as const, erro: String(erro) };
    } catch (e) {
      console.error("Tiny ERP falha de rede:", e);
      return { ok: false as const, erro: "Falha de comunicação com o sistema." };
    }
  });
