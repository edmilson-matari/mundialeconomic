"use client";

import { useState } from "react";
import { Percent, Star } from "lucide-react";

interface Store {
  id: number;
  name: string;
  logo: string;
  rating: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  badge?: { type: "new"; text: "NEW" } | { type: "discount"; percent: number };
  image: string;
  store: Store;
}

export default function TopProductsWithStoreContext() {
  const [activeTab, setActiveTab] = useState<"new" | "popular" | "bestseller">(
    "new"
  );

  const products: Product[] = [
    {
      id: 1,
      title: "Leather Crossbody Bag",
      price: 189.0,
      oldPrice: 259.0,
      badge: { type: "new", text: "NEW" },
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
      store: {
        id: 1,
        name: "Luxe Fashion Boutique",
        logo: "https://images.unsplash.com/photo-1607082349566-5079286ebb72?w=80&h=80&fit=crop",
        rating: 4.8,
      },
    },
    {
      id: 2,
      title: "Wireless Noise-Cancelling Headphones",
      price: 349.0,
      badge: { type: "discount", percent: 20 },
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=800&fit=crop",
      store: {
        id: 2,
        name: "TechTrend Electronics",
        logo: "https://images.unsplash.com/photo-1519389951296-1303fe2fd539?w=80&h=80&fit=crop",
        rating: 4.9,
      },
    },
    {
      id: 3,
      title: "Minimalist Sneakers",
      price: 129.0,
      oldPrice: 179.0,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop",
      store: {
        id: 3,
        name: "Urban Sneakers Co.",
        logo: "https://images.unsplash.com/photo-1605406575497-940d57b521f7?w=80&h=80&fit=crop",
        rating: 4.7,
      },
    },
    {
      id: 4,
      title: "Vitamin C Serum 30ml",
      price: 68.0,
      image:
        "https://images.unsplash.com/photo-1625772292130-c5af89e24ca5?w=600&h=800&fit=crop",
      store: {
        id: 4,
        name: "Glow Beauty Studio",
        logo: "https://images.unsplash.com/photo-1596462502278-ffb48ada4f7b?w=80&h=80&fit=crop",
        rating: 4.9,
      },
    },
    {
      id: 5,
      title: "Smart Watch Series 8",
      price: 399.0,
      badge: { type: "discount", percent: 15 },
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=800&fit=crop",
      store: {
        id: 2,
        name: "TechTrend Electronics",
        logo: "https://images.unsplash.com/photo-1519389951296-1303fe2fd539?w=80&h=80&fit=crop",
        rating: 4.9,
      },
    },
    {
      id: 6,
      title: "Summer Maxi Dress",
      price: 89.0,
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
      store: {
        id: 1,
        name: "Luxe Fashion Boutique",
        logo: "https://images.unsplash.com/photo-1607082349566-5079286ebb72?w=80&h=80&fit=crop",
        rating: 4.8,
      },
    },
    {
      id: 7,
      title: "Running Shoes Pro",
      price: 159.0,
      oldPrice: 199.0,
      badge: { type: "new", text: "NEW" },
      image:
        "https://images.unsplash.com/photo-1608234996168-0c13e1f6b3b3?w=600&h=800&fit=crop",
      store: {
        id: 3,
        name: "Urban Sneakers Co.",
        logo: "https://images.unsplash.com/photo-1605406575497-940d57b521f7?w=80&h=80&fit=crop",
        rating: 4.7,
      },
    },
    {
      id: 8,
      title: "Hydrating Face Cream",
      price: 48.0,
      image:
        "https://images.unsplash.com/photo-1591376931407-31e9b7a856ca?w=600&h=800&fit=crop",
      store: {
        id: 4,
        name: "Glow Beauty Studio",
        logo: "https://images.unsplash.com/photo-1596462502278-ffb48ada4f7b?w=80&h=80&fit=crop",
        rating: 4.9,
      },
    },
  ];

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Title + Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              TOP PRODUCTS
            </h2>
            <div className="w-24 h-1 bg-orange-500 mt-2"></div>
          </div>

          <div className="flex mt-6 sm:mt-0 bg-white rounded overflow-hidden shadow-sm">
            {(["new", "popular", "bestseller"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium transition capitalize ${
                  activeTab === tab
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab === "new"
                  ? "New Products"
                  : tab === "popular"
                  ? "Popular Products"
                  : "Best Seller"}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image + Badges */}
              <div className="relative bg-gray-50 p-10 flex items-center justify-center">
                {/* Store Logo (top-left) */}
                <div className="absolute top-4 left-4 z-10">
                  <img
                    src={product.store.logo}
                    alt={product.store.name}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover"
                  />
                </div>

                {/* Product Badge (NEW / % OFF) */}
                {product.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    {product.badge.type === "new" ? (
                      <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {product.badge.text}
                      </span>
                    ) : (
                      <div className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm">
                        <Percent className="w-4 h-4 mr-1" />
                        {product.badge.percent}
                      </div>
                    )}
                  </div>
                )}

                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-64 object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-xs text-orange-600 font-medium truncate">
                  from {product.store.name}
                </p>
                <h3 className="text-gray-800 font-medium mt-1 line-clamp-2">
                  {product.title}
                </h3>

                <div className="flex items-center gap-2 mt-2">
                  {renderStars(product.store.rating)}
                  <span className="text-xs text-gray-500">
                    ({product.store.rating})
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 rounded-lg transition">
                    Add to Cart
                  </button>
                  <button className="px-4 border border-gray-300 hover:border-orange-600 text-gray-700 hover:text-orange-600 rounded-lg transition">
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
