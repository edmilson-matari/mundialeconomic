// components/WhatsAppButton.tsx
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  link: string; // Ex: "244923456789" (sem +, sem espaços)
  storeName: string; // Ex: "TechLuanda"
  productName?: string; // Opcional: nome do produto (para mensagem automática)
  className?: string;
}

export default function WhatsAppButton({
  link,
  className = "",
}: WhatsAppButtonProps) {
  // Limpa o número e garante formato internacional

  const whatsappLink = link;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 ${className}`}
    >
      <MessageCircle className="w-6 h-6" />
      <span className="text-base">Falar no WhatsApp</span>
    </a>
  );
}
