"use client";

import { Star, Percent } from "lucide-react";
import type { ProductDetail } from "./Types/product";

// Update your type to include badge

interface ProductCardProps {
  product: ProductDetail;
  inStore: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, inStore }) => {
  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
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
    // This div makes it responsive: full width on small, fits in grid on large
    <div className="w-full">
      <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 group border border-gray-100">
        {/* Image + Badges */}
        <div className="relative bg-gray-50 p-8 flex items-center justify-center aspect-square">
          {/* Store Logo */}
          <div className="absolute top-3 left-3 z-10">
            <img
              src={product.store.logo}
              alt={product.store.name}
              className="w-11 h-11 rounded-full border-2 border-white shadow-lg object-cover"
            />
          </div>

          {/* Product Badge (NEW or % OFF) */}
          {product.badge && (
            <div className="absolute top-3 right-3 z-10">
              {product.badge.type === "new" ? (
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.badge.text}
                </span>
              ) : (
                <div className="bg-black text-white w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold">
                  <Percent className="w-4 h-4" />
                  {product.badge.percent}
                </div>
              )}
            </div>
          )}

          <img
            src={product.image}
            alt={product.productName}
            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-orange-600 font-medium truncate">
            from {product.store.name}
          </p>
          <h3 className="text-sm font-medium text-gray-800 mt-1 line-clamp-2 min-h-10">
            {product.productName}
          </h3>

          <div className="flex items-center gap-1.5 mt-2">
            {renderStars(product.store.rating)}
            <span className="text-xs text-gray-500">
              ({product.store.rating})
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Compact Buttons */}
          <div className="mt-4 flex gap-2">
            <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium py-2 rounded-md transition">
              Add to Cart
            </button>
            {inStore && (
              <button className="px-3 border border-gray-300 hover:border-orange-600 text-gray-700 hover:text-orange-600 text-xs rounded-md transition">
                Store
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
