// app/contato/page.tsx  (ou pages/contato.tsx)
"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Facebook,
  Instagram,
  ShoppingCart,
  Factory,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setMessage("Por favor, preencha os campos obrigatórios.");
      return;
    }

    setStatus("sending");

    // Simulação de envio (substitua por sua API real)
    setTimeout(() => {
      setStatus("success");
      setMessage("Mensagem enviada com sucesso! Responderemos em breve.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }, 1500);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
              <ShoppingCart className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fale Connosco</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Estamos aqui para ajudar! Envie a sua dúvida, sugestão ou
            reclamação. A sua opinião é muito importante para nós.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info Cards */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-5">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Morada</h3>
              <p className="text-gray-600 leading-relaxed">
                Rua do Comércio, Nº 123
                <br />
                Talatona, Luanda Sul
                <br />
                Luanda, Angola
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-5">
                <Phone className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Telefone</h3>
              <p className="text-gray-600">
                <a
                  href="tel:+244923456789"
                  className="hover:text-orange-600 font-semibold"
                >
                  +244 923 456 789
                </a>
                <br />
                <a href="tel:+244934567890" className="hover:text-orange-600">
                  +244 934 567 890
                </a>
              </p>
              <p className="text-sm text-gray-500 mt-3">
                Seg a Sex: 08h00 – 18h00
                <br />
                Sábado: 09h00 – 13h00
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-5">
                <Mail className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Email</h3>
              <p className="text-gray-600">
                <a
                  href="mailto:suporte@mundialeconomico.com"
                  className="hover:text-orange-600 font-semibold"
                >
                  suporte@mundialeconomico.com
                </a>
                <br />
                <a
                  href="mailto:vendas@mundialeconomico.com"
                  className="hover:text-orange-600"
                >
                  vendas@mundialeconomico.com
                </a>
              </p>
              <p className="text-sm text-gray-500 mt-3">
                Resposta em até 24h úteis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Envie a Sua Mensagem
              </h2>

              {status === "success" && (
                <div className="mb-6 p-5 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3">
                  <CheckCircle className="w-6 h-6" />
                  {message}
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-5 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-6 h-6" />
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Seu Nome *"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Seu Email *"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="tel"
                    placeholder="Telefone (opcional)"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  />
                  <input
                    type="text"
                    placeholder="Assunto"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  />
                </div>

                <textarea
                  placeholder="Escreva a sua mensagem aqui... *"
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition resize-none"
                  required
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg transition flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {status === "sending" ? (
                    "A enviar..."
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Google Maps + Info */}
            <div className="space-y-8">
              <div className="bg-gray-200 border-2 border-dashed rounded-2xl w-full h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Mapa da Loja</p>
                  <p className="text-sm">Integração com Google Maps aqui</p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-orange-600" />
                  Horário de Funcionamento
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <strong>Segunda a Sexta:</strong> 08:00 – 18:00
                  </li>
                  <li>
                    <strong>Sábado:</strong> 09:00 – 13:00
                  </li>
                  <li>
                    <strong>Domingo:</strong> Fechado
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social & WhatsApp */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-8">
            Fale Connosco Também Por Aqui
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://wa.me/244923456789"
              className="flex items-center gap-3 bg-green-600 px-8 py-4 rounded-full hover:bg-green-700 transition text-lg font-medium"
            >
              <Factory className="w-7 h-7" />
              WhatsApp: +244 923 456 789
            </a>
            <a
              href="#"
              className="p-4 bg-blue-600 rounded-full hover:bg-blue-700 transition"
            >
              <Facebook className="w-7 h-7" />
            </a>
            <a
              href="#"
              className="p-4 bg-pink-600 rounded-full hover:bg-pink-700 transition"
            >
              <Instagram className="w-7 h-7" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
