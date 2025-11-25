"use client";

import { useState } from "react";
import { X, Save, Upload, Plus, Trash, CheckCircle } from "lucide-react";

import supabase from "../supabase-client";

interface Product {
  id?: string;
  productName: string;
  stock: number;
  status: boolean;
}

interface NewProduct {
  productName: string;
  price: string;
  stock: string;
  image: File | null;
  imagePreview: string | null;
}

interface EditStoreModalProps {
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;
  handleSaveEdit: () => void;
  storeId: string; // ← Obrigatório agora (ID da loja que está sendo editada)
}

export default function EditStoreModal({
  editingProduct,
  setEditingProduct,
  handleSaveEdit,
  storeId,
}: EditStoreModalProps) {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProducts, setNewProducts] = useState<NewProduct[]>([]);
  const [currentProduct, setCurrentProduct] = useState<NewProduct>({
    productName: "",
    price: "",
    stock: "",
    image: null,
    imagePreview: null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCurrentProduct({
        ...currentProduct,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const addCurrentProduct = () => {
    if (
      !currentProduct.productName.trim() ||
      !currentProduct.price.trim() ||
      !currentProduct.stock.trim() ||
      !currentProduct.image
    ) {
      alert("Preencha todos os campos do produto!");
      return;
    }

    setNewProducts((prev) => [...prev, { ...currentProduct }]);
    setCurrentProduct({
      productName: "",
      price: "",
      stock: "",
      image: null,
      imagePreview: null,
    });
  };

  const removeProduct = (index: number) => {
    setNewProducts((prev) => prev.filter((_, i) => i !== index));
  };

  // Função de upload da imagem
  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${storeId}/${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}.${fileExt}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file, { upsert: false });

    if (error) {
      console.error("Erro no upload:", error);
      return null;
    }

    const { data } = supabase.storage.from("products").getPublicUrl(fileName);
    return data.publicUrl;
  };

  // Salvar todos os produtos no Supabase
  const saveAllProducts = async () => {
    if (newProducts.length === 0) return;

    setIsUploading(true);
    setUploadMessage(null);

    try {
      const productsToInsert = [];

      for (const prod of newProducts) {
        if (!prod.image) continue;

        const imageUrl = await uploadImage(prod.image);
        console.log("ImageUrl: ", imageUrl);
        console.log("name: ", prod.productName);
        if (!imageUrl)
          throw new Error(
            `Falha ao subir imagem do produto: ${prod.productName}`
          );

        productsToInsert.push({
          store_id: storeId,
          productName: prod.productName,
          price: parseFloat(prod.price),
          stock: parseInt(prod.stock, 10),
          image_url: imageUrl,
        });
      }

      const { error } = await supabase
        .from("products")
        .insert(productsToInsert);

      if (error) throw error;

      setUploadMessage({
        type: "success",
        text: `${productsToInsert.length} produto(s) adicionado(s)!`,
      });
      setNewProducts([]);
      setShowAddProduct(false);

      setTimeout(() => setUploadMessage(null), 4000);
    } catch (err: any) {
      console.error("Erro ao salvar produtos:", err);
      setUploadMessage({
        type: "error",
        text: err.message || "Erro ao salvar produtos",
      });
      setTimeout(() => setUploadMessage(null), 5000);
    } finally {
      setIsUploading(false);
    }
  };

  if (!editingProduct) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold">Editar Loja</h2>
          <button
            onClick={() => setEditingProduct(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Seus campos da loja (inalterados) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da Loja
              </label>
              <input
                type="text"
                value={editingProduct.productName}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estoque Total
              </label>
              <input
                type="number"
                value={editingProduct.stock}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    stock: Number(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setEditingProduct({ ...editingProduct, status: true })
                  }
                  className={`px-5 py-2.5 rounded-lg font-medium transition ${
                    editingProduct.status === true
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Ativo
                </button>
                <button
                  onClick={() =>
                    setEditingProduct({ ...editingProduct, status: false })
                  }
                  className={`px-5 py-2.5 rounded-lg font-medium transition ${
                    editingProduct.status === false
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Inativo
                </button>
              </div>
            </div>
          </div>

          {/* Mensagem de feedback */}
          {uploadMessage && (
            <div
              className={`flex items-center gap-2 p-4 rounded-lg ${
                uploadMessage.type === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              {uploadMessage.text}
            </div>
          )}

          {/* Botão Adicionar Produtos */}
          <div className="pt-4 border-t">
            <button
              onClick={() => setShowAddProduct(!showAddProduct)}
              className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition font-medium"
            >
              <Plus className="w-5 h-5" />
              {showAddProduct ? "Fechar" : "Adicionar Produtos"}
              {newProducts.length > 0 && (
                <span className="ml-3 bg-white/30 px-3 py-1 rounded-full text-sm">
                  {newProducts.length} na lista
                </span>
              )}
            </button>
          </div>

          {/* Formulário de Produto (inalterado) */}
          {showAddProduct && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-dashed border-gray-300 space-y-6">
              <h3 className="text-lg font-bold text-gray-800">Novo Produto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Foto do Produto
                  </label>
                  <div className="relative h-52 bg-white rounded-xl border-2 border-dashed border-gray-300 overflow-hidden">
                    {currentProduct.imagePreview ? (
                      <img
                        src={currentProduct.imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <Upload className="w-12 h-12 mb-2" />
                        <p className="text-sm">Clique para adicionar</p>
                      </div>
                    )}
                    <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition">
                      <Upload className="w-10 h-10 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nome do produto"
                    value={currentProduct.productName}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        productName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Preço R$"
                      value={currentProduct.price}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          price: e.target.value,
                        })
                      }
                      className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500"
                    />
                    <input
                      type="number"
                      placeholder="Estoque"
                      value={currentProduct.stock}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          stock: e.target.value,
                        })
                      }
                      className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <button
                    onClick={addCurrentProduct}
                    className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium transition flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Adicionar à Lista
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Lista de produtos + botão salvar */}
          {newProducts.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="font-bold text-gray-800">
                Produtos para salvar ({newProducts.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {newProducts.map((prod, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow border p-4 flex items-center gap-3 hover:shadow-md transition"
                  >
                    {prod.imagePreview && (
                      <img
                        src={prod.imagePreview}
                        alt={prod.productName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-sm line-clamp-1">
                        {prod.productName}
                      </p>
                      <p className="text-xs text-gray-600">
                        Kz$ {prod.price} • {prod.stock} unid.
                      </p>
                    </div>
                    <button
                      onClick={() => removeProduct(i)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={saveAllProducts}
                  disabled={isUploading}
                  className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-bold transition flex items-center gap-2 disabled:opacity-60"
                >
                  {isUploading ? (
                    "Salvando..."
                  ) : (
                    <>
                      <Save className="w-5 h-5" /> Salvar Todos os Produtos
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Botões principais */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={() => setEditingProduct(null)}
            className="px-5 py-3 border rounded-xl hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveEdit}
            className="px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center gap-2 transition font-medium"
          >
            <Save className="w-4 h-4" />
            Salvar Loja
          </button>
        </div>
      </div>
    </div>
  );
}
