// components/admin/EditStoreModal.tsx
"use client";

import { useState, useEffect } from "react";
import {
  X,
  Upload,
  CheckCircle,
  Store as StoreIcon,
  Image as ImageIcon,
} from "lucide-react";
import supabase from "../supabase-client";
import toast from "react-hot-toast";

interface StoreData {
  id: number;
  name: string;
  owner: string;
  logo: string | null;
  banner: string | null; // ← novo campo
  phone: string | null;
  website: string | null;
  description: string | null;
}

interface EditStoreModalProps {
  store: StoreData | null;
  onClose: () => void;
  onSave: () => void;
}

export default function EditStoreModal({
  store,
  onClose,
  onSave,
}: EditStoreModalProps) {
  const [form, setForm] = useState<StoreData>({
    id: store?.id || 0,
    name: store?.name || "",
    owner: store?.owner || "",
    logo: store?.logo || null,
    banner: store?.banner || null,
    phone: store?.phone || "",
    website: store?.website || "",
    description: store?.description || "",
  });

  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);

  // Bloqueia scroll do body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!store) return null;

  // Upload Logo
  const uploadLogo = async (file: File) => {
    setUploadingLogo(true);
    const fileName = `logo-${store.id}-${Date.now()}`;
    const { error } = await supabase.storage
      .from("stores")
      .upload(`logos/${fileName}`, file, { upsert: false });

    if (error) {
      toast.error("Erro ao enviar logo");
      setUploadingLogo(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("stores").getPublicUrl(`logos/${fileName}`);

    setForm((prev) => ({ ...prev, logo: publicUrl }));
    setUploadingLogo(false);
    toast.success("Logo atualizado!");
  };

  if (uploadingLogo) return <div>Carregando Logo</div>;

  // Upload Banner
  const uploadBanner = async (file: File) => {
    setUploadingBanner(true);
    const fileName = `banner-${store.id}-${Date.now()}`;
    const { error } = await supabase.storage
      .from("stores")
      .upload(`banners/${fileName}`, file);

    if (error) {
      toast.error("Erro ao enviar banner");
      setUploadingBanner(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("stores").getPublicUrl(`banners/${fileName}`);

    setForm((prev) => ({ ...prev, banner: publicUrl }));
    setUploadingBanner(false);
    toast.success("Banner atualizado!");
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.owner.trim()) {
      toast.error("Nome e dono são obrigatórios");
      return;
    }

    const { error } = await supabase
      .from("stores")
      .update({
        name: form.name,
        owner: form.owner,
        logo: form.logo,
        banner: form.banner,
        phone: form.phone || null,
        website: form.website || null,
        description: form.description || null,
      })
      .eq("id", store.id);

    if (error) toast.error("Erro ao salvar");
    else {
      toast.success("Loja atualizada com sucesso!");
      onSave();
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal com scroll apenas no conteúdo */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* HEADER FIXO */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-t-3xl shrink-0">
          <div className="flex items-center gap-4">
            <StoreIcon className="w-10 h-10" />
            <div>
              <h2 className="text-2xl font-bold">Editar Loja</h2>
              <p className="text-sm opacity-90">
                Atualize todos os dados da loja
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* CONTEÚDO COM SCROLL */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
          {/* Banner */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" /> Banner da Loja
            </h3>
            {form.banner ? (
              <div className="relative group rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={form.banner}
                  alt="Banner"
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <label className="cursor-pointer bg-white/90 hover:bg-white px-6 py-3 rounded-xl font-medium flex items-center gap-2">
                    <Upload className="w-5 h-5" /> Trocar Banner
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files?.[0] && uploadBanner(e.target.files[0])
                      }
                      className="hidden"
                      disabled={uploadingBanner}
                    />
                  </label>
                </div>
                <button
                  onClick={() => setForm((prev) => ({ ...prev, banner: null }))}
                  className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 md:h-80 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition bg-gray-50">
                {uploadingBanner ? (
                  <div className="text-center">
                    <div className="animate-spin w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-gray-600">Enviando banner...</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-xl font-semibold text-gray-700">
                      Enviar Banner
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      1920x600 recomendado • PNG, JPG
                    </p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files?.[0] && uploadBanner(e.target.files[0])
                  }
                  className="hidden"
                  disabled={uploadingBanner}
                />
              </label>
            )}
          </div>

          {/* Logo + Nome + Dono */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Logo</h3>
              {form.logo ? (
                <div className="relative group">
                  <img
                    src={form.logo}
                    alt="Logo"
                    className="w-full h-48 object-contain bg-gray-50 rounded-2xl p-4 shadow-md"
                  />
                  <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer rounded-2xl">
                    <span className="bg-white px-4 py-2 rounded-lg font-medium">
                      Trocar
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files?.[0] && uploadLogo(e.target.files[0])
                      }
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-orange-500 hover:bg-orange-50 bg-gray-50">
                  <Upload className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="font-medium">Enviar Logo</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files?.[0] && uploadLogo(e.target.files[0])
                    }
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="md:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome da Loja
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-lg"
                  placeholder="TechStore Angola"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Dono / Responsável
                </label>
                <input
                  type="text"
                  value={form.owner}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, owner: e.target.value }))
                  }
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="João Silva"
                />
              </div>
            </div>
          </div>

          {/* Contacto + Website */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Telefone
              </label>
              <input
                type="text"
                value={form.phone || ""}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, contact: e.target.value }))
                }
                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="+244 923 456 789"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                value={form.website || ""}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, website: e.target.value }))
                }
                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="https://minhaloja.com"
              />
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descrição da Loja
            </label>
            <textarea
              rows={4}
              value={form.description || ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none resize-none"
              placeholder="Conte um pouco sobre a sua loja, produtos, missão..."
            />
          </div>
        </div>

        {/* FOOTER FIXO */}
        <div className="p-6 border-t bg-gray-50 shrink-0 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-4 border border-gray-300 rounded-xl hover:bg-gray-100 font-medium transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 font-semibold transition shadow-lg flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5" />
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}
