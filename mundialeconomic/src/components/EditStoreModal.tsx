"use client";

import { useState, useEffect } from "react";
import { X, Plus, CheckCircle, Upload } from "lucide-react";
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
  storeId: string;
}

export default function EditStoreModal({
  editingProduct,
  setEditingProduct,
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

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${storeId}/${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}.${fileExt}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file, { upsert: false });

    if (error) return null;

    const { data } = supabase.storage.from("products").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const saveAllProducts = async () => {
    if (newProducts.length === 0) return;
    setIsUploading(true);
    setUploadMessage(null);

    try {
      const productsToInsert = [];

      for (const prod of newProducts) {
        if (!prod.image) continue;
        const imageUrl = await uploadImage(prod.image);
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold">Editar Loja</h2>
          <button
            onClick={() => setEditingProduct(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Store Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da Loja
              </label>
              <input
                type="text"
                value={editingProduct.productName}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    productName: e.target.value,
                  })
                }
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
                    editingProduct.status
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
                    !editingProduct.status
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Inativo
                </button>
              </div>
            </div>
          </div>

          {/* Upload Feedback */}
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

          {/* Add Product Section */}
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

            {showAddProduct && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Nome do Produto"
                    value={currentProduct.productName}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        productName: e.target.value,
                      })
                    }
                    className="col-span-1 md:col-span-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="number"
                    placeholder="Preço"
                    value={currentProduct.price}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        price: e.target.value,
                      })
                    }
                    className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-500"
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
                    className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-500"
                  />
                  <label className="flex items-center justify-center gap-2 px-4 py-2 border rounded-xl cursor-pointer hover:bg-orange-50 transition text-gray-600">
                    <Upload className="w-5 h-5" />
                    {currentProduct.image
                      ? "Imagem Selecionada"
                      : "Selecionar Imagem"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {currentProduct.imagePreview && (
                  <img
                    src={currentProduct.imagePreview}
                    alt="Preview do Produto"
                    className="w-40 h-40 object-cover rounded-xl border mt-2"
                  />
                )}

                <button
                  onClick={addCurrentProduct}
                  className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium"
                >
                  Adicionar à lista
                </button>

                {/* Lista de produtos novos */}
                {newProducts.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {newProducts.map((prod, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between p-3 border rounded-xl"
                      >
                        <span>{prod.productName}</span>
                        <button
                          onClick={() => removeProduct(i)}
                          className="text-red-600 hover:text-red-700 transition"
                          aria-label={`Remover ${prod.productName}`}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  onClick={saveAllProducts}
                  disabled={isUploading}
                  className="mt-4 w-full px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition font-medium"
                >
                  {isUploading ? "Enviando..." : "Salvar Todos os Produtos"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
