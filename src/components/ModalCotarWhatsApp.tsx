import { X, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

const WHATSAPP = "5511971761003";

type Props = {
  aberto: boolean;
  onFechar: () => void;
  // mensagem já formatada do produto, sem nome/cidade ainda
  // ex: "🧱 *Telha Fibrocimento*\n• Dimensão: 244x110cm\n• Qtd: 50 peças"
  corpoMensagem: string;
  nomeProduto: string;
  /** "produto" (configuradores) ou "calculadora" */
  tipo?: "produto" | "calculadora";
};

export default function ModalCotarWhatsApp({ aberto, onFechar, corpoMensagem, nomeProduto, tipo = "produto" }: Props) {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [enviando, setEnviando] = useState(false);

  if (!aberto) return null;

  const handleEnviar = () => {
    if (!nome.trim() || !cidade.trim()) return;
    setEnviando(true);

    const mensagemCompleta =
      tipo === "calculadora"
        ? [
            "Olá! Vim pelo site da Rocha Telhas e gostaria de solicitar um orçamento sem sair de casa. Vou enviar a minha lista de materiais.",
            `Meu nome é ${nome.trim()}.`,
            "",
            "📐 *RESULTADO DO CÁLCULO*",
            corpoMensagem,
            "",
            "📍 *LOCAL DE ENTREGA*",
            cidade.trim(),
            "",
            "Poderia confirmar as quantidades e enviar a cotação completa? Obrigado!",
          ].join("\n")
        : [
            "Olá! Vim pelo site da Rocha Telhas e gostaria de cotar o seguinte produto:",
            `Meu nome é ${nome.trim()} e estou em ${cidade.trim()}.`,
            "",
            "🏷️ *PRODUTO SOLICITADO*",
            corpoMensagem,
            "",
            "📍 *LOCAL DE ENTREGA*",
            cidade.trim(),
            "",
            "Poderia me informar disponibilidade, valor e prazo? Obrigado!",
          ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagemCompleta)}`,
      "_blank"
    );

    setTimeout(() => {
      setEnviando(false);
      onFechar();
      setNome("");
      setCidade("");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[70] flex max-w-full items-end justify-center overflow-x-hidden p-0 sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onFechar} />

      <div className="relative w-full min-w-0 max-w-full overflow-x-hidden rounded-t-3xl bg-white shadow-2xl animate-in slide-in-from-bottom duration-300 sm:max-w-sm sm:rounded-2xl sm:zoom-in-95">
        {/* handle mobile */}
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3 sm:hidden" />

        <div className="p-5">
          {enviando ? (
            <div className="flex flex-col items-center py-8 gap-3">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <Send size={24} className="text-green-600" />
              </div>
              <p className="font-bold text-gray-900 text-center">Abrindo WhatsApp...</p>
              <p className="text-gray-500 text-sm text-center">
                Sua mensagem já está formatada e pronta para enviar.
              </p>
            </div>
          ) : (
            <>
              {/* header */}
              <div className="mb-4 flex min-w-0 items-center justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="font-bold text-gray-900">Cotar pelo WhatsApp</h2>
                  <p className="mt-0.5 break-words text-xs text-gray-500">{nomeProduto}</p>
                </div>
                <button onClick={onFechar} className="shrink-0 text-gray-300 transition-colors hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>

              <p className="text-gray-500 text-sm mb-4">
                Só precisamos de 2 informações para personalizar sua mensagem:
              </p>

              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Seu nome *
                  </label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: João Silva"
                    autoFocus
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Cidade / Bairro de entrega *
                  </label>
                  <input
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    placeholder="Ex: Caieiras - SP"
                    onKeyDown={(e) => e.key === "Enter" && handleEnviar()}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>
              </div>

              {/* preview da mensagem */}
              <div className="bg-gray-50 rounded-xl p-3 mb-5 border border-gray-100">
                <p className="text-xs text-gray-400 font-medium mb-1.5 uppercase tracking-wide">
                  Prévia da mensagem
                </p>
                <p className="break-words text-xs leading-relaxed whitespace-pre-line text-gray-600 [overflow-wrap:anywhere]">
                  {tipo === "calculadora"
                    ? "Olá! Vim pelo site da Rocha Telhas e gostaria de solicitar um orçamento sem sair de casa. Vou enviar a minha lista de materiais.\n"
                    : "Olá! Vim pelo site da Rocha Telhas e gostaria de cotar o seguinte produto:\n"}
                  {nome || "[seu nome]"} em {cidade || "[sua cidade]"}.{"\n\n"}
                  {corpoMensagem.length > 150
                    ? corpoMensagem.slice(0, 150) + "..."
                    : corpoMensagem}
                </p>
              </div>

              <button
                onClick={handleEnviar}
                disabled={!nome.trim() || !cidade.trim()}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <MessageCircle size={18} />
                Enviar no WhatsApp
              </button>

              <button onClick={onFechar} className="w-full text-gray-400 hover:text-gray-600 text-xs py-2 mt-2 transition-colors">
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
