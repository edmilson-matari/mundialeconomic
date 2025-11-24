"use client";

import { useState } from "react";
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
} from "lucide-react";
import supabase from "../supabase-client";

interface AddShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStoreAdded: (newStore: any) => void; // ← Nova prop para atualizar a lista em tempo real
}

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
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Função para limpar tudo
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
    setLogoPreview(null);
    setSubmitted(false);
  };

  // Upload da logo
  const uploadLogo = async (): Promise<string | null> => {
    if (!logo) return null;

    const fileExt = logo.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}.${fileExt}`;
    const filePath = `logos/${fileName}`;

    const { error } = await supabase.storage
      .from("stores")
      .upload(filePath, logo, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Erro no upload:", error);
      return null;
    }

    const { data } = supabase.storage.from("stores").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || submitted) return;

    setIsSubmitting(true);

    const logoUrl = await uploadLogo();

    if (!logoUrl) {
      alert("Erro ao fazer upload da logo. Tente novamente.");
      setIsSubmitting(false);
      return;
    }

    const newStore = {
      name: formData.name.trim(),
      owner: formData.owner.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      location: formData.address.trim(),
      website: formData.website.trim() || null,
      description: formData.description.trim(),
      category: formData.category,
      total_products: 0,
      logo: logoUrl,
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

    // Envia a nova loja para o componente pai (ex: StoresTable)
    onStoreAdded(data);

    setIsSubmitting(false);
    setSubmitted(true);

    // Limpa e fecha após sucesso
    setTimeout(() => {
      resetForm();
      onClose();
    }, 1200);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Adicionar Nova Loja</h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Logo Upload */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-gray-100 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Upload className="w-10 h-10 text-gray-400" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 transition">
                <Upload className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  required
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Store className="w-4 h-4" />
                Nome da Loja
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
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4" />
                Proprietário
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
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4" />
                E-mail
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
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4" />
                Telefone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                placeholder="(11) 98765-4321"
                disabled={isSubmitting}
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4" />
                Endereço
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                placeholder="Rua Exemplo, 123 - São Paulo, SP"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4" />
                Site (opcional)
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                placeholder="https://minhaloja.com"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Categoria
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                disabled={isSubmitting}
              >
                <option value="">Escolher categoria</option>
                <option value="clothes">Roupa e Vestuário</option>
                <option value="accessories">Acessórios</option>
                <option value="food_and_beverages">Comida e Bebida</option>
                <option value="electronics">Eletrônicos</option>
                <option value="beauty">Beleza</option>
                <option value="other">Outro</option>
              </select>
            </div>
          </div>

          <div>
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
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting || submitted}
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || submitted || !logo}
              className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition"
            >
              {isSubmitting ? (
                "Enviando..."
              ) : submitted ? (
                <>
                  <Check className="w-5 h-5" />
                  Adicionada!
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
