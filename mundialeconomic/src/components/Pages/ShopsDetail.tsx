import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import HeroBanner from "../HeroBanner";
import type { ProductDetail } from "../Types/product";
import type { StoreData } from "../Types/store";
import { Star, Package } from "lucide-react";

export default function StoreDetail() {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState<StoreData | null>(null);
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStore({
        id: Number(id),
        owner: "Jorge",
        email: "jondoe@gmail.com",
        phone: "34343434",
        name: "Luxe Fashion Boutique",
        logo: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
        banner:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
        category: "Women's Fashion",
        rating: 4.8,
        totalReviews: 842,
        totalProducts: 342,
        joinedDate: "March 2023",
        location: "Los Angeles, USA",
        description:
          "Premium fashion for the modern woman. Curated collections of dresses, bags, shoes & accessories from top designers.",
        isVerified: true,
      });

      setProducts([
        {
          id: 1,
          productName: "Leather Crossbody Bag",
          price: 89,
          image:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
          store: {
            name: "Luxe Fashion Boutique",
            logo: "https://images.unsplash.com/photo-1607082349566-5079286ebb72?w=80&h=80&fit=crop",
            rating: 4.8,
          },
        },
        {
          id: 2,
          productName: "Wireless ANC Headphones",
          price: 199,
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=1000&fit=crop",
          store: {
            name: "TechTrend Electronics",
            logo: "https://images.unsplash.com/photo-1519389951296-1303fe2fd539?w=80&h=80&fit=crop",
            rating: 4.9,
          },
        },
        {
          id: 3,
          productName: "Minimalist White Sneakers",
          price: 119,
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
          store: {
            name: "Urban Sneakers Co.",
            logo: "https://images.unsplash.com/photo-1605406575497-940d57b521f7?w=80&h=80&fit=crop",
            rating: 4.7,
          },
        },
        {
          id: 4,
          productName: "Vitamin C Glow Serum",
          price: 59,
          image:
            "https://images.unsplash.com/photo-1625772292130-c5af89e24ca5?w=800&h=1000&fit=crop",
          store: {
            name: "Glow Beauty Studio",
            logo: "https://images.unsplash.com/photo-1596462502278-ffb48ada4f7b?w=80&h=80&fit=crop",
            rating: 4.9,
          },
        },
        {
          id: 5,
          productName: "Summer Linen Dress",
          price: 79,
          image:
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
          store: {
            name: "Luxe Fashion Boutique",
            logo: "https://images.unsplash.com/photo-1607082349566-5079286ebb72?w=80&h=80&fit=crop",
            rating: 4.8,
          },
        },
        {
          id: 6,
          productName: "Smart Watch Pro",
          price: 299,
          image:
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=1000&fit=crop",
          store: {
            name: "TechTrend Electronics",
            logo: "https://images.unsplash.com/photo-1519389951296-1303fe2fd539?w=80&h=80&fit=crop",
            rating: 4.9,
          },
        },
      ]);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
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
          <p className="mt-4 text-gray-600 font-medium">Loading store...</p>
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
                      {store.totalProducts} Products
                    </p>
                    <p className="text-sm text-gray-500">Available now</p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-3">About Store</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {store.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:pl-96">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            All Products ({store.totalProducts})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} inStore={false} />
            ))}
          </div>
        </div>

        {/* Clear float */}
        <div className="clear-both" />
      </div>
    </>
  );
}
