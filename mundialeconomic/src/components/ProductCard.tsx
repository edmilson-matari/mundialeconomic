"use client";

import { Star, Percent } from "lucide-react";
import type { ProductDetail } from "./Types/product";
import type { StoreData } from "./Types/store";

interface ProductCardProps {
  product: ProductDetail;
  inStore: boolean;
  store: StoreData;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  inStore,
  store,
}) => {
  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100">
        {/* Image Container */}
        <div className="relative w-full">
          {/* Product Image */}
          <img
            src={product.image_url}
            alt={product.productName}
            className="w-full h-60 md:h-72 lg:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Store Logo */}
          <div className="absolute top-3 left-3 z-10">
            <img
              src={store.logo}
              alt={store.name}
              className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
            />
          </div>

          {/* Product Badge */}
          {product.badge && (
            <div className="absolute top-3 right-3 z-10">
              {product.badge.type === "new" ? (
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  {product.badge.text}
                </span>
              ) : (
                <div className="bg-red-600 text-white w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold shadow">
                  <Percent className="w-4 h-4 mr-1" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col justify-between h-48 md:h-52 lg:h-56">
          {/* Store Info */}
          <p className="text-xs text-orange-600 font-medium truncate">
            from {store.name}
          </p>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-gray-800 mt-1 line-clamp-2 min-h-[2.5rem]">
            {product.productName}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {renderStars(product.rating)}
            <span className="text-xs text-gray-500">({product.rating})</span>
          </div>

          {/* Price */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              Kz {product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-2">
            <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium py-2 rounded-lg transition">
              Adicionar
            </button>
            {inStore && (
              <button className="flex-1 border border-gray-300 hover:border-orange-600 text-gray-700 hover:text-orange-600 text-sm font-medium py-2 rounded-lg transition">
                Visitar Loja
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
