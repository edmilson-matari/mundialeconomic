"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Download,
  Eye,
  Edit,
  Copy,
  Trash2,
  X,
  Package,
  Store,
  Calendar,
  Hash,
} from "lucide-react";
import supabase from "../supabase-client";
import type { StoreData } from "./Types/store";
import EditStoreModal from "./EditStoreModal";

export default function ProductsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stores, setStores] = useState<StoreData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(
    null
  );
  const [quickViewProduct, setQuickViewProduct] = useState<StoreData | null>(
    null
  );
  const [editingProduct, setEditingProduct] = useState<any>(null);

  useEffect(() => {
    const loadStores = async () => {
      setLoading(true);
      console.log("Tentando buscar lojas..."); // ← veja no console

      const { data, error } = await supabase
        .from("stores")
        .select("*, products (*)")
        .order("id", { ascending: false });
      if (error) {
        console.log("Error fetching stores: ", error);
      } else {
        setStores(data as StoreData[]);
      }
      setLoading(false);
    };
    loadStores();
  }, []);

  const filtered = stores.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDuplicate = (p: any) => {
    const copy = {
      ...p,
      id: Date.now(),
      productName: `${p.productName} (cópia)`,
      addedDate: new Date(),
    };
    setStores((prev) => [...prev, copy]);
  };

  const handleSaveEdit = () => {
    setStores((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );
    setEditingProduct(null);
    alert("Produto atualizado com sucesso!");
  };

  const deleteStore = async (id: Number) => {
    const { error } = await supabase.from("stores").delete().eq("id", id);
    if (error) {
      console.log("error deleting store: ", error);
    } else {
      setStores((prev) => prev.filter((store: StoreData) => store.id !== id));
    }
  };

  if (loading || !stores) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Search + Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por produto ou loja..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-3 border rounded-xl text-sm font-medium hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Mais Filtros
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800">
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Loja & Produto
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Categoria
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Estoque
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={p.logo}
                          alt={p.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{p.name}</p>
                          <p className="text-sm text-gray-600">{p.owner}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {p.category}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          p.totalProducts === 0
                            ? "text-red-600 font-medium"
                            : "text-gray-900"
                        }
                      >
                        {p.totalProducts === 0 ? "Esgotado" : p.totalProducts}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          p.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {p.status === "active" ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setQuickViewProduct(p)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition group"
                          title="Visualizar"
                        >
                          <Eye className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                        </button>
                        <button
                          onClick={() => setEditingProduct({ ...p })}
                          className="p-2 hover:bg-green-50 rounded-lg transition group"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4 text-gray-600 group-hover:text-green-600" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(p)}
                          className="p-2 hover:bg-purple-50 rounded-lg transition group"
                          title="Duplicar"
                        >
                          <Copy className="w-4 h-4 text-gray-600 group-hover:text-purple-600" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(p.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition group"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4 text-red-600 group-hover:text-red-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">Detalhes da Loja</h2>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex gap-6">
                <img
                  src={quickViewProduct.logo}
                  alt={quickViewProduct.name}
                  className="w-24 h-24 rounded-full ring-4 ring-gray-100"
                />
                <div>
                  <h3 className="text-2xl font-bold">
                    {quickViewProduct.name}
                  </h3>
                  <p className="text-lg text-gray-600 mt-1">
                    {quickViewProduct.owner}
                  </p>
                  <p className="text-sm text-gray-500 mt-3">
                    {quickViewProduct.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">SKU</p>
                    <p className="font-medium">
                      {quickViewProduct.products.length}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Store className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Categoria</p>
                    <p className="font-medium">{quickViewProduct.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Adicionado</p>
                    <p className="font-medium">
                      {quickViewProduct.joined_date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Estoque</p>
                    <p
                      className={`font-medium ${
                        quickViewProduct.totalProducts === 0
                          ? "text-red-600"
                          : ""
                      }`}
                    >
                      {quickViewProduct.totalProducts === 0
                        ? "Esgotado"
                        : quickViewProduct.products.length + " unidades"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <EditStoreModal
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          handleSaveEdit={handleSaveEdit}
          storeId={editingProduct.id}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-3">Excluir Loja?</h3>
            <p className="text-gray-600 text-sm mb-6">
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  deleteStore(showDeleteConfirm);
                  setShowDeleteConfirm(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
