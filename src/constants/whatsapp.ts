/** Número único de WhatsApp usado em todo o site (valor de teste). */
export const WHATSAPP_NUMBER = "5511971761003";

/** Gera o link da API do WhatsApp com a mensagem pronta formatada. */
export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
