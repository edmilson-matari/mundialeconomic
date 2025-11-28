// components/StoreProductsModal.tsx
"use client";

import { useState, useEffect } from "react";
import {
  X,
  Plus,
  Edit,
  Trash2,
  Save,
  Upload,
  Package,
  ToggleLeft,
  ToggleRight,
  LoaderPinwheel,
} from "lucide-react";
import supabase from "../supabase-client";
import toast from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  discount_price?: number;
  quantity: number;
  images: string[];
  status: "active" | "inactive" | "draft";
}

interface StoreProductsModalProps {
  store: any;
  onClose: () => void;
  onUpdate: () => void;
}

export default function StoreProductsModal({
  store,
  onClose,
  onUpdate,
}: StoreProductsModalProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    discount_price: "",
    quantity: "",
    status: "draft" as "active" | "inactive" | "draft",
    images: [] as string[],
  });

  useEffect(() => {
    loadProducts();
  }, [store.id]);

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("store_id", store.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar produtos");
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  if (loading) {
    <LoaderPinwheel />;
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("product-images")
      .upload(`${store.id}/${fileName}`, file);

    if (error) {
      toast.error("Erro ao fazer upload");
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("product-images")
      .getPublicUrl(`${store.id}/${fileName}`);

    setForm((prev) => ({ ...prev, images: [...prev.images, publicUrl] }));
    toast.success("Imagem adicionada!");
  };

  const saveProduct = async () => {
    if (!form.name || !form.price || !form.quantity) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    const productData = {
      store_id: store.id,
      name: form.name,
      price: Number(form.price),
      discount_price: form.discount_price ? Number(form.discount_price) : null,
      quantity: Number(form.quantity),
      images: form.images,
      status: form.status,
    };

    if (editingProduct) {
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingProduct.id);

      if (!error) {
        toast.success("Produto atualizado!");
        setEditingProduct(null);
      }
    } else {
      const { error } = await supabase.from("products").insert(productData);
      if (!error) toast.success("Produto adicionado!");
    }

    setForm({
      name: "",
      price: "",
      discount_price: "",
      quantity: "",
      status: "draft",
      images: [],
    });
    setShowForm(false);
    loadProducts();
    onUpdate();
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Excluir este produto?")) return;
    await supabase.from("products").delete().eq("id", id);
    loadProducts();
    onUpdate();
    toast.success("Produto excluído");
  };

  const toggleStatus = async (product: Product) => {
    const newStatus = product.status === "active" ? "inactive" : "active";
    await supabase
      .from("products")
      .update({ status: newStatus })
      .eq("id", product.id);
    loadProducts();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-orange-600 to-orange-500 text-white">
          <div className="flex items-center gap-4">
            <img
              src={store.logo}
              alt={store.name}
              className="w-16 h-16 rounded-full ring-4 ring-white/30"
            />
            <div>
              <h2 className="text-2xl font-bold">{store.name}</h2>
              <p className="opacity-90">Gerenciar Produtos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              Produtos ({products.length})
            </h3>
            <button
              onClick={() => {
                setEditingProduct(null);
                setForm({
                  name: "",
                  price: "",
                  discount_price: "",
                  quantity: "",
                  status: "draft",
                  images: [],
                });
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-orange-600 text-white px-5 py-3 rounded-xl hover:bg-orange-700 transition"
            >
              <Plus className="w-5 h-5" /> Adicionar Produto
            </button>
          </div>

          {/* Formulário */}
          {showForm && (
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border">
              <h4 className="text-lg font-semibold mb-4">
                {editingProduct ? "Editar" : "Novo"} Produto
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nome do produto"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500"
                />
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Preço"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className="flex-1 px-4 py-3 border rounded-xl"
                  />
                  <input
                    type="number"
                    placeholder="Preço com desconto (opcional)"
                    value={form.discount_price}
                    onChange={(e) =>
                      setForm({ ...form, discount_price: e.target.value })
                    }
                    className="flex-1 px-4 py-3 border rounded-xl"
                  />
                </div>
                <input
                  type="number"
                  placeholder="Quantidade em estoque"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: e.target.value })
                  }
                  className="px-4 py-3 border rounded-xl"
                />
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value as any })
                  }
                  className="px-4 py-3 border rounded-xl"
                >
                  <option value="draft">Rascunho</option>
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Imagens
                </label>
                <div className="flex flex-wrap gap-3">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative">
                      <img
                        src={img}
                        alt=""
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() =>
                          setForm({
                            ...form,
                            images: form.images.filter((_, idx) => idx !== i),
                          })
                        }
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <label className="w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    <Upload className="w-8 h-8 text-gray-400" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={saveProduct}
                  className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700"
                >
                  <Save className="w-5 h-5" /> Salvar
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                  }}
                  className="px-6 py-3 border rounded-xl hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Lista de produtos */}
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border rounded-xl p-4 flex items-center justify-between hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  {product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-sm text-gray-600">
                      Kz {product.price.toLocaleString()}
                      {product.discount_price && (
                        <span className="text-orange-600 ml-2">
                          → Kz {product.discount_price.toLocaleString()}{" "}
                          (promoção)
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      Estoque: {product.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleStatus(product)}
                    className={`p-2 rounded-lg ${
                      product.status === "active"
                        ? "bg-green-100"
                        : "bg-gray-100"
                    }`}
                  >
                    {product.status === "active" ? (
                      <ToggleRight className="w-5 h-5 text-green-600" />
                    ) : (
                      <ToggleLeft className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setForm({
                        name: product.name,
                        price: product.price.toString(),
                        discount_price:
                          product.discount_price?.toString() || "",
                        quantity: product.quantity.toString(),
                        status: product.status,
                        images: product.images,
                      });
                      setShowForm(true);
                    }}
                    className="p-2 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="w-5 h-5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-2 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
