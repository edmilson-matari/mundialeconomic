import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard";
import HeroBanner from "../HeroBanner";
import type { StoreData } from "../Types/store";
import { Star, Package } from "lucide-react";
import supabase from "../../supabase-client";
import WhatsAppButton from "../Whatsapp";

export default function StoreDetail() {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error("ID não encontrada");
  const [store, setStore] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStore = async () => {
      setLoading(true);
      const idNum: Number = parseInt(id);
      const { data } = await supabase
        .from("stores")
        .select("*, products (*)")
        .eq("id", idNum)
        .single();
      if (data) setStore(data);
    };

    loadStore();
    setLoading(false);
  }, [id]);

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  if (loading || !store) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroBanner store={store} />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Store Info Sidebar (Mobile: Full Width, Desktop: Sticky) */}
        <div className="mb-12 lg:mb-0 lg:w-80 lg:float-left lg:mr-10">
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 lg:sticky lg:top-24">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  {renderStars(store.rating)}
                  <span>{store.rating}</span>
                </h3>
                <p className="text-gray-600 mt-1">
                  {store.totalReviews} reviews
                </p>
              </div>
              <div className="border-t pt-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <Package className="w-6 h-6 text-orange-600" />
                  <div>
                    <p className="font-semibold">
                      {store.products.length} Productos
                    </p>
                    <p className="text-sm text-gray-500">Disponível agora</p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-3">Sobre a loja</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {store.description}
                </p>
              </div>
              <WhatsAppButton
                link={store.website}
                storeName={store.name}
                productName={" "}
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:pl-96">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            Todos os Productos ({store.products.length})
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {store.products.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                store={store}
                inStore={false}
              />
            ))}
          </div>
        </div>

        {/* Clear float */}
        <div className="clear-both" />
      </div>
    </>
  );
}
