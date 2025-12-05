"use client";

import { useEffect, useState } from "react";
import HotDealCard from "./HotDealsCard";
import type { ProductDetail } from "./Types/product";
import supabase from "../supabase-client";
import MobileCompactProductCard from "../components/MobileCompactProductCard";

export default function TopProductsWithStoreContext() {
  const [activeTab, setActiveTab] = useState<"new" | "popular" | "bestseller">(
    "new"
  );
  const [product, setProduct] = useState<ProductDetail[]>([]);
  function getTwoRandomPerStore(products: ProductDetail[]): ProductDetail[] {
    const grouped = products.reduce((acc, product) => {
      const key = product.stores.name;
      if (!acc[key]) acc[key] = [];
      acc[key].push(product);
      return acc;
    }, {} as Record<string, ProductDetail[]>);

    const result: ProductDetail[] = [];

    Object.values(grouped).forEach((storeProducts) => {
      const shuffled = storeProducts.sort(() => Math.random() - 0.5);
      result.push(...shuffled.slice(0, 2)); // pega só os 2 primeiros
    });

    // Embaralha tudo no final
    return result.sort(() => Math.random() - 0.5);
  }

  // Uso:

  useEffect(() => {
    const fetchTopProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, stores (*)");
      if (error) {
        console.log("Falha obtendo dados do servidor");
      } else {
        if (data) setProduct(data);
      }
    };
    fetchTopProducts();
  }, []);
  const listaAleatoria = getTwoRandomPerStore(product);

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Title + Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              TOP PRODUCTOS
            </h2>
            <div className="w-24 h-1 bg-orange-500 mt-2"></div>
          </div>

          <div className="flex mt-6 sm:mt-0 bg-white rounded overflow-hidden shadow-sm">
            {(["new", "popular", "bestseller"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium transition capitalize ${
                  activeTab === tab
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab === "new"
                  ? "Novos Productos"
                  : tab === "popular"
                  ? "Productos Populares"
                  : "Mais Vendidos"}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {listaAleatoria.map((prod) => (
            <MobileCompactProductCard key={prod.id} product={prod} />
          ))}
        </div>
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {listaAleatoria
            .slice(0, 3) // Mostra apenas os 3 primeiros
            .map((prod) => (
              <HotDealCard key={prod.id} product={prod} />
            ))}
        </div>
      </div>
    </section>
  );
}
