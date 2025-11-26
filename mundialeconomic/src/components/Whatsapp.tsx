// components/WhatsAppButton.tsx
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phone: string; // Ex: "244923456789" (sem +, sem espaços)
  storeName: string; // Ex: "TechLuanda"
  productName?: string; // Opcional: nome do produto (para mensagem automática)
  className?: string;
}

export default function WhatsAppButton({
  phone,
  storeName,
  productName,
  className = "",
}: WhatsAppButtonProps) {
  // Limpa o número e garante formato internacional
  const cleanPhone = phone.replace(/\D/g, "").replace(/^0+/, "");
  const fullPhone = cleanPhone.startsWith("244")
    ? cleanPhone
    : `244${cleanPhone}`;

  // Mensagem automática personalizada
  const defaultMessage = productName
    ? `Olá ${storeName}! Estou interessado no produto "${productName}". Pode me dar mais informações?`
    : `Olá ${storeName}! Vi a vossa loja na Mundial Económico e gostaria de falar convosco.`;

  const whatsappLink = `https://wa.me/${fullPhone}?text=${encodeURIComponent(
    defaultMessage
  )}`;

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
