// src/components/StoresOverview.tsx
import { useEffect, useState } from "react";
import supabase from "../../supabase-client";
import { Store, Package, Loader2 } from "lucide-react";
import type { ProductDetail } from "../Types/product";

interface StoreWithProducts {
  id: number;
  name: string;
  products: ProductDetail[];
}

export default function StoresOverview() {
  const [stores, setStores] = useState<StoreWithProducts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStores() {
      const { data, error } = await supabase
        .from("stores")
        .select("id, name, products (*)")
        .order("name", { ascending: true });

      if (error) {
        console.error("Erro ao buscar lojas:", error);
      } else {
        setStores(data || []);
      }
      setLoading(false);
    }

    fetchStores();
  }, []);

  const totalStores = stores.length;
  const totalProducts = stores.reduce(
    (sum, store) => sum + (store.products.length || 0),
    0
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-3 text-lg">Carregando lojas...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Cabeçalho com totais */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Resumo de Lojas
        </h1>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <div className="bg-blue-50 px-8 py-6 rounded-xl shadow">
            <div className="flex items-center gap-3">
              <Store className="w-10 h-10 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">
                  Total de lojas registradas
                </p>
                <p className="text-4xl font-bold text-blue-700">
                  {totalStores}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 px-8 py-6 rounded-xl shadow">
            <div className="flex items-center gap-3">
              <Package className="w-10 h-10 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total de produtos</p>
                <p className="text-4xl font-bold text-green-700">
                  {totalProducts.toLocaleString("pt-BR")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de lojas */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gray-800 text-white p-4">
          <h2 className="text-xl font-semibold">Produtos por loja</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {stores.length === 0 ? (
            <p className="text-center py-12 text-gray-500">
              Nenhuma loja cadastrada ainda.
            </p>
          ) : (
            stores.map((store) => (
              <div
                key={store.id}
                className="p-5 hover:bg-gray-50 transition flex justify-between items-center"
              >
                <span className="font-medium text-lg text-gray-800">
                  {store.name}
                </span>

                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-500" />
                  <span className="text-2xl font-bold text-gray-700">
                    {store.products.length || 0}
                  </span>
                  <span className="text-sm text-gray-500">
                    produto{store.products.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Rodapé com média */}
      {totalStores > 0 && (
        <div className="mt-6 text-center text-gray-600">
          Média de produtos por loja:{" "}
          <span className="font-bold text-xl">
            {Math.round(totalProducts / totalStores)}
          </span>
        </div>
      )}
    </div>
  );
}
