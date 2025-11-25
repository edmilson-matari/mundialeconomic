"use client";

import React, { useState } from "react";
import {
  X,
  Upload,
  Store,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Check,
  Image as ImageIcon,
} from "lucide-react";
import { uploadFile } from "../utils/utils";
import supabase from "../supabase-client";

interface AddShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStoreAdded: (newStore: any) => void;
}

const categories = [
  { value: "Roupas", name: "Roupa e Vestuário" },
  { value: "Acessórios", name: "Acessórios" },
  { value: "Comida e bebidas", name: "Comida e Bebida" },
  { value: "Electrónicos", name: "Eletrônicos" },
  { value: "Beleza", name: "Beleza" },
  { value: "Outro", name: "Outro" },
];

export default function AddShopModal({
  isOpen,
  onClose,
  onStoreAdded,
}: AddShopModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    description: "",
    category: "",
  });

  const [logo, setLogo] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      owner: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      description: "",
      category: "",
    });
    setLogo(null);
    setBanner(null);
    setLogoPreview(null);
    setBannerPreview(null);
    setSubmitted(false);
  };

  // Upload helper (keeps your original approach)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || submitted) return;

    setIsSubmitting(true);

    const logoUrl = await uploadFile(logo, "logos");
    const bannerUrl = await uploadFile(banner, "banners");

    if (!logoUrl || !bannerUrl) {
      alert("Erro ao fazer upload das imagens. Tente novamente.");
      setIsSubmitting(false);
      return;
    }

    const newStore = {
      name: formData.name.trim(),
      owner: formData.owner.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || null,
      location: formData.address.trim() || null,
      website: formData.website.trim() || null,
      description: formData.description.trim(),
      category: formData.category,
      total_products: 0,
      logo: logoUrl,
      banner: bannerUrl,
      rating: 0,
      total_reviews: 0,
      is_verified: false,
      joined_date: new Date().toISOString(),
      badge: "new" as const,
    };

    const { data, error } = await supabase
      .from("stores")
      .insert(newStore)
      .select()
      .single();

    if (error) {
      console.error("Erro ao cadastrar loja:", error);
      alert("Erro ao cadastrar loja. Verifique os dados.");
      setIsSubmitting(false);
      return;
    }

    onStoreAdded(data);
    setIsSubmitting(false);
    setSubmitted(true);

    // close after a short success feedback
    setTimeout(() => {
      resetForm();
      onClose();
    }, 900);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    // Backdrop: block background interaction. Note: overflow-y-auto here only allows the modal to be scrollable
    // if viewport is smaller than modal container; page behind is not scrollable because this fixed element sits on top.
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      aria-modal="true"
      role="dialog"
    >
      {/* modal shell: relative so footer can be positioned; constrain height to 90vh */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl
                   max-h-[90vh] mx-4 flex flex-col overflow-hidden"
      >
        {/* Header (non-scrolling) */}
        <div className="flex items-center justify-between px-6 py-5 border-b flex-shrink-0">
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">
            Adicionar Nova Loja
          </h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 rounded-md hover:bg-gray-100 transition disabled:opacity-50"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content area */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col h-full overflow-x-auto"
        >
          <div
            className="px-6 pt-6"
            // ensure content area uses remaining height and scrolls
          >
            {/* Uploads area */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <ImageIcon className="w-5 h-5 inline mr-2" />
                  Banner da Loja (1920x600 recomendado)
                </label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50 hover:border-gray-400 transition">
                  {bannerPreview ? (
                    <img
                      src={bannerPreview}
                      alt="Banner preview"
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                      <ImageIcon className="w-12 h-12 mb-2" />
                      <p className="text-sm">Clique para adicionar o banner</p>
                    </div>
                  )}

                  <label className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/10 opacity-0 hover:opacity-100 transition">
                    <Upload className="w-8 h-8 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        if (file) {
                          setBanner(file);
                          setBannerPreview(URL.createObjectURL(file));
                        }
                      }}
                      disabled={isSubmitting}
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Logo da Loja
                </label>
                <div className="relative">
                  <div className="w-32 h-32 bg-gray-100 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shadow">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                  <label className="absolute -bottom-1 -right-1 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 transition">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        if (file) {
                          setLogo(file);
                          setLogoPreview(URL.createObjectURL(file));
                        }
                      }}
                      disabled={isSubmitting}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Store className="w-4 h-4" /> Nome da Loja
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="Ex: Luxe Boutique"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4" /> Proprietário
                </label>
                <input
                  type="text"
                  required
                  value={formData.owner}
                  onChange={(e) =>
                    setFormData({ ...formData, owner: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="Nome completo"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4" /> E-mail
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="contato@loja.com"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4" /> Telefone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="(11) 98765-4321"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4" /> Endereço
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="Rua Exemplo, 123 - São Paulo, SP"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4" /> Site (opcional)
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="https://minhaloja.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Escolher categoria</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 mb-24">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição da Loja
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 resize-none"
                placeholder="Fale um pouco sobre sua loja..."
              />
            </div>
          </div>

          {/* Footer: positioned above content (always visible). We make it absolute so it stays visible inside modal.
              The content area includes bottom margin (mb-24 / pb in content) so text doesn't go under the footer. */}
          <div className="absolute left-0 right-0 bottom-0 px-6 py-4 bg-white border-t flex justify-end gap-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting || submitted}
              className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || submitted || !logo || !banner}
              className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                "Enviando..."
              ) : submitted ? (
                <>
                  <Check className="w-4 h-4" />
                  Loja Adicionada!
                </>
              ) : (
                "Adicionar Loja"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
