import { useState, type ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import ModalCotarWhatsApp from "@/components/ModalCotarWhatsApp";

type Props = {
  corpoMensagem: string;
  nomeProduto: string;
  tipo?: "produto" | "calculadora";
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

/**
 * Botão verde de WhatsApp que SEMPRE passa pelo modal de nome + cidade
 * antes de abrir a conversa.
 */
export function BotaoCotarWhatsApp({
  corpoMensagem,
  nomeProduto,
  tipo = "produto",
  children,
  className,
  disabled,
}: Props) {
  const [aberto, setAberto] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => !disabled && setAberto(true)}
        disabled={disabled}
        className={
          className ??
          "flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
        }
      >
        <MessageCircle size={18} />
        {children}
      </button>
      <ModalCotarWhatsApp
        aberto={aberto}
        onFechar={() => setAberto(false)}
        corpoMensagem={corpoMensagem}
        nomeProduto={nomeProduto}
        tipo={tipo}
      />
    </>
  );
}

export default BotaoCotarWhatsApp;
