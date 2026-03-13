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
      const idNum: number = parseInt(id);
      const { data } = await supabase
        .from("stores")
        .select("*, products (*)")
        .eq("id", idNum)
        .single();
      if (data) setStore(data);
      setLoading(false);
    };

    loadStore();
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
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroBanner store={store} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 md:mb-10">
          <div className="space-y-7">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Informações da loja
              </h2>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-3 text-gray-900">
                {renderStars(store.rating)}
                <span>{store.rating}</span>
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {store.totalReviews} reviews
              </p>
            </div>
            <div className="border-t pt-5">
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
            <div className="border-t pt-5">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Sobre a loja
              </h4>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed sm:leading-7">
                {store.description || "Sem descrição disponível."}
              </p>
            </div>
            <WhatsAppButton
              link={store.website}
              storeName={store.name}
              productName={" "}
            />
          </div>
        </div>

        <section className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="mb-6 pb-4 border-b">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Todos os Productos
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {store.products.length} itens disponíveis
            </p>
          </div>

          <div className="-mx-4 sm:mx-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 sm:gap-6">
            {store.products.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                store={store}
                inStore={false}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
