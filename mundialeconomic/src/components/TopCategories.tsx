"use client";

import React, { useState } from "react";
import { Percent } from "lucide-react";

export default function TopCategories() {
  const [activeTab, setActiveTab] = useState<"new" | "popular" | "bestseller">(
    "new"
  );

  const products = [
    {
      id: 1,
      title: "Best Handbags for Girls",
      price: 260.0,
      oldPrice: 290.0,
      badge: { type: "new", text: "NEW" } as const,
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop",
    },
    {
      id: 2,
      title: "Stylish Dress for Women",
      price: 300.0,
      oldPrice: null,
      badge: null,
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    },
    {
      id: 3,
      title: "Leather Handbags for Girls",
      price: 180.0,
      oldPrice: 200.0,
      badge: { type: "discount", percent: 15 } as const,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
    },
    {
      id: 4,
      title: "Trendy Shoes for Women",
      price: 250.0,
      oldPrice: null,
      badge: null,
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop",
    },
    {
      id: 5,
      title: "Best Handbags for Girls",
      price: 260.0,
      oldPrice: 290.0,
      badge: null,
      image:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&h=800&fit=crop",
    },
    {
      id: 6,
      title: "Stylish Dress for Women",
      price: 300.0,
      oldPrice: null,
      badge: { type: "discount", percent: 15 } as const,
      image:
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop",
    },
    {
      id: 7,
      title: "Leather Handbags for Girls",
      price: 180.0,
      oldPrice: 200.0,
      badge: null,
      image:
        "https://images.unsplash.com/photo-1523772721666-22ad3c126957?w=600&h=800&fit=crop",
    },
    {
      id: 8,
      title: "Trendy Shoes for Women",
      price: 250.0,
      oldPrice: null,
      badge: { type: "new", text: "NEW" } as const,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Title + Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              WOMEN ACCESSORIES
            </h2>
            <div className="w-24 h-1 bg-orange-500 mt-2"></div>
          </div>

          <div className="flex mt-6 sm:mt-0 bg-white rounded overflow-hidden shadow-sm">
            <button
              onClick={() => setActiveTab("new")}
              className={`px-6 py-3 font-medium transition ${
                activeTab === "new"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              NEW PRODUCTS
            </button>
            <button
              onClick={() => setActiveTab("popular")}
              className={`px-6 py-3 font-medium transition ${
                activeTab === "popular"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              POPULAR PRODUCTS
            </button>
            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-6 py-3 font-medium transition ${
                activeTab === "bestseller"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              BEST SELLER
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white group cursor-pointer overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative bg-gray-50 p-12 flex items-center justify-center">
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4">
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
                  className="max-h-64 object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="text-gray-600 text-sm uppercase tracking-wider mb-2">
                  {product.title}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through text-lg">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
