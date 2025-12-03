// src/pages/admin/StoresProductsManager.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Store,
  Plus,
  Edit,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import supabase from "../../supabase-client";
import toast from "react-hot-toast";

interface StoreType {
  id: number;
  name: string;
  logo: string;
  owner: string;
}

interface Product {
  id: number;
  productName: string;
  price: number;
  stock: number;
  image_url: string;
}

// ==================== MODAL DE PRODUTO ====================
function ProductModal({
  product,
  storeId,
  onClose,
  onSave,
}: {
  product: Product | null;
  storeId: number;
  onClose: () => void;
  onSave: () => void;
}) {
  const [form, setForm] = useState({
    productName: product?.productName || "",
    price: product?.price?.toString() || "",
    stock: product?.stock?.toString() || "",
    image_url: product?.image_url,
  });

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileName = `${Date.now()}_${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(`store_${storeId}/${fileName}`, file);

    if (error) {
      toast.error("Erro ao enviar imagem");
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("products")
      .getPublicUrl(`store_${storeId}/${fileName}`);

    setForm((prev) => ({ ...prev, image_url: publicUrl }));
    toast.success("Imagem enviada!");
    setUploading(false);
  };

  const saveProduct = async () => {
    if (!form.productName || !form.price || !form.stock) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const data = {
      store_id: storeId,
      productName: form.productName,
      price: Number(form.price),
      stock: Number(form.stock),
      image_url:
        form.image_url ||
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png",
    };

    if (product) {
      const { error } = await supabase
        .from("products")
        .update(data)
        .eq("id", product.id);

      if (!error) toast.success("Produto atualizado!");
    } else {
      const { error } = await supabase.from("products").insert(data);

      if (!error) toast.success("Produto adicionado!");
    }

    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur">
      {/* Modal card */}
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl animate-fadeIn p-6 relative">
        {/* Top */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {product ? "Editar Produto" : "Adicionar Produto"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Fechar modal"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5">
          {/* Upload de imagem */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-40 h-40 rounded-xl overflow-hidden shadow bg-gray-100 flex items-center justify-center">
              {form.image_url ? (
                <img
                  src={form.image_url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="w-10 h-10 text-gray-400" />
              )}
            </div>

            <label className="cursor-pointer px-4 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center gap-2">
              <Upload className="w-4 h-4" />
              {uploading ? "Enviando..." : "Enviar Imagem"}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </label>
          </div>

          {/* Nome */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Nome do Produto
            </label>
            <input
              type="text"
              value={form.productName}
              onChange={(e) =>
                setForm({ ...form, productName: e.target.value })
              }
              className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Ex: Camisa Nike"
            />
          </div>

          {/* Preço e Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Preço</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button
            onClick={saveProduct}
            className="px-5 py-3 rounded-xl bg-orange-600 text-white hover:bg-orange-700 transition shadow-md"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== COMPONENTE PRINCIPAL ====================
export default function StoresProductsManager() {
  const [stores, setStores] = useState<StoreType[]>([]);
  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingStores, setLoadingStores] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    loadStores();
  }, []);

  const loadStores = async () => {
    const { data, error } = await supabase
      .from("stores")
      .select("id, name, logo, owner")
      .order("name");
    if (error) toast.error("Erro ao carregar lojas");
    else setStores(data || []);
    setLoadingStores(false);
  };

  const loadProducts = async (storeId: number) => {
    setLoadingProducts(true);
    const { data, error } = await supabase
      .from("products")
      .select("id, productName, price, stock, image_url")
      .eq("store_id", storeId);
    if (error) toast.error("Erro ao carregar produtos");
    else setProducts(data || []);
    setLoadingProducts(false);
  };

  const selectStore = (store: StoreType) => {
    setSelectedStore(store);
    loadProducts(store.id);
    setSidebarOpen(false);
  };

  const openModal = (product?: Product) => {
    setEditingProduct(product || null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };

  const handleSave = () => {
    if (selectedStore) loadProducts(selectedStore.id);
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      toast.success("Produto excluído");
      if (selectedStore) loadProducts(selectedStore.id);
    }
  };

  return (
    <>
      {/* Mobile Header */}

      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-20 w-80 bg-white border-r shadow-lg transform transition-transform lg:translate-x-0 lg:static ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } flex flex-col`}
        >
          <div className="p-6 border-b bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <h2 className="text-xl font-bold">Lojas</h2>
            <p className="text-sm opacity-90 mt-1">
              {stores.length} registradas
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {loadingStores ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 rounded-xl h-20 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {stores.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => selectStore(store)}
                    className={`w-full p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all hover:shadow-md ${
                      selectedStore?.id === store.id
                        ? "border-orange-500 bg-orange-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={store.logo}
                      alt={store.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-200"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {store.name}
                      </h3>
                      <p className="text-xs text-gray-500">{store.owner}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Overlay mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {selectedStore ? (
            <>
              {/* HEADER MELHORADO */}
              <header className="bg-white border-b p-4 lg:p-6 sticky top-0 z-0 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                  {/* Left section */}

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSidebarOpen(true)}
                      className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                      aria-label="Abrir menu lateral"
                    >
                      <Store className="w-6 h-6" />
                    </button>

                    <img
                      src={selectedStore.logo}
                      alt={selectedStore.name}
                      className="w-14 h-14 rounded-full ring-4 ring-orange-100 shadow-md"
                    />

                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {selectedStore.name}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        {products.length} produto(s) cadastrados
                      </p>
                    </div>
                  </div>

                  {/* Botão de adicionar produto (agora aparece no desktop também) */}
                  <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-xl shadow hover:bg-orange-700 transition font-medium"
                  >
                    <Plus className="w-5 h-5" />
                    Novo Produto
                  </button>
                </div>
              </header>

              {/* Products Grid */}
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
                  {loadingProducts ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className="bg-white h-64 rounded-xl animate-pulse shadow-sm"
                        />
                      ))}
                    </div>
                  ) : products.length === 0 ? (
                    <div className="text-center py-20">
                      <h3 className="text-lg font-semibold text-gray-700">
                        Nenhum produto encontrado
                      </h3>
                      <p className="text-gray-500 mt-2 mb-6">
                        Comece adicionando um novo produto à loja.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {products.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
                        >
                          <img
                            src={product.image_url}
                            className="w-full h-52 object-cover rounded-xl mb-4"
                            alt={product.productName}
                          />

                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">
                              {product.productName}
                            </h3>
                            <p className="text-gray-600 mt-1">
                              {product.price.toLocaleString()} Kz
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {product.stock} em estoque
                            </p>
                          </div>

                          <div className="flex justify-between mt-4">
                            <button
                              onClick={() => openModal(product)}
                              className="p-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition"
                              aria-label="Editar produto"
                            >
                              <Edit className="w-5 h-5" />
                            </button>

                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                              aria-label="Excluir produto"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-600">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex flex-1 items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                aria-label="Abrir menu lateral"
              >
                Ver lojas
                <Store className="w-6 h-6" />
              </button>
              Selecione uma loja para visualizar os produtos.
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {modalOpen && selectedStore && (
        <ProductModal
          product={editingProduct}
          storeId={selectedStore.id}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </>
  );
}
