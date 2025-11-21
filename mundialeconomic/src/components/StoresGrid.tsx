"use client";

import { Star, BadgeCheck, Sparkles } from "lucide-react";

interface Store {
  id: number;
  name: string;
  logo: string;
  banner: string;
  category: string;
  rating: number;
  totalProducts?: number;
  badge?: "new" | "verified" | "top";
}

const stores: Store[] = [
  {
    id: 1,
    name: "Luxe Fashion Boutique",
    logo: "https://images.unsplash.com/photo-1607082349566-5079286ebb72?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1441986300917-6467280960d7?w=1200&h=600&fit=crop",
    category: "Women's Fashion",
    rating: 4.8,
    totalProducts: 342,
    badge: "verified",
  },
  {
    id: 2,
    name: "TechTrend Electronics",
    logo: "https://images.unsplash.com/photo-1519389951296-1303fe2fd539?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=600&fit=crop",
    category: "Electronics",
    rating: 4.9,
    totalProducts: 892,
    badge: "top",
  },
  {
    id: 3,
    name: "Urban Sneakers Co.",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=1200&h=600&fit=crop",
    category: "Footwear",
    rating: 4.6,
    totalProducts: 156,
    badge: "new",
  },
  {
    id: 4,
    name: "Glow Beauty Studio",
    logo: "https://images.unsplash.com/photo-1596462502278-ffb48ada4f7b?w=200&h=200&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1571781926291-c477808397bb?w=1200&h=600&fit=crop",
    category: "Beauty & Care",
    rating: 4.7,
    totalProducts: 428,
  },
  // Add more stores as needed...
];

export default function StoresGrid() {
  const getBadge = (badge?: "new" | "verified" | "top") => {
    if (!badge) return null;

    const styles = {
      new: "bg-orange-500 text-white",
      verified: "bg-blue-600 text-white",
      top: "bg-purple-600 text-white",
    };

    const icons = {
      new: "NEW",
      verified: <BadgeCheck className="w-4 h-4" />,
      top: <Sparkles className="w-4 h-4" />,
    };

    return (
      <span
        className={`absolute top-4 left-4 ${styles[badge]} px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg`}
      >
        {icons[badge]} {badge === "new" && "NEW"}
      </span>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Discover Top Stores
          </h2>
          <p className="text-gray-600 mt-4">
            Shop from verified and trending stores
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {stores.map((store) => (
            <div
              key={store.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Banner */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={store.banner}
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {getBadge(store.badge)}
              </div>

              {/* Store Info */}
              <div className="p-6 -mt-12 relative">
                <div className="bg-white rounded-2xl p-4 shadow-xl border-4 border-white">
                  <div className="flex items-center justify-center -mt-16 mb-4">
                    <img
                      src={store.logo}
                      alt={store.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-center text-gray-900">
                    {store.name}
                  </h3>

                  <p className="text-sm text-orange-600 text-center font-medium mt-1">
                    {store.category}
                  </p>

                  <div className="flex justify-center my-3">
                    {renderStars(store.rating)}
                  </div>

                  {store.totalProducts && (
                    <p className="text-center text-sm text-gray-500">
                      {store.totalProducts} products
                    </p>
                  )}

                  <button className="w-full mt-5 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition transform hover:scale-105">
                    Visit Store
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
