/** Número único de WhatsApp usado em todo o site. */
export const WHATSAPP_NUMBER = "5511985714231";

/** Gera o link da API do WhatsApp com a mensagem pronta formatada. */
export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
