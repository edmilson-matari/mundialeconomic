// components/MobileCompactProductCard.tsx
import { useState } from "react";
import { Star, ShoppingCart, Store, Check } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProductDetail } from "./Types/product";
import { useCart } from "./useCart";

interface MobileCompactProductCardProps {
  product: ProductDetail;
}

export default function MobileCompactProductCard({
  product,
}: MobileCompactProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const rating = product.stores.rating || 4.8;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      productName: product.productName,
      price: product.price,
      image_url: product.image_url,
      storeId: product.stores.id,
      storeName: product.stores.name,
      storeLogo: product.stores.logo,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const renderStars = () => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="flex-none w-[72vw] max-w-[280px] sm:hidden">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col h-full">
        {/* Image */}
        <Link to={`/producto/${product.id}`}>
          <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
            <img
              src={product.image_url || "/placeholder.jpg"}
              alt={product.productName}
              className="w-full h-full object-cover"
            />

            {/* Store logo */}
            <div className="absolute top-2 left-2">
              <img
                src={product.stores.logo}
                alt={product.stores.name}
                className="w-9 h-9 rounded-full border-2 border-white shadow object-cover"
              />
            </div>

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                {product.badge.type === "hot"
                  ? "HOT"
                  : product.badge.type === "new"
                    ? "NEW"
                    : "OFERTA"}
              </div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="p-3 flex flex-col gap-2 flex-1">
          <p className="text-xs text-orange-600 font-medium truncate">
            {product.stores.name}
          </p>
          <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight min-h-[2.5rem]">
            {product.productName}
          </p>

          <div className="flex items-center gap-1">
            {renderStars()}
            <span className="text-xs text-gray-500">{rating.toFixed(1)}</span>
          </div>

          <div className="text-lg font-bold text-gray-900 mt-auto">
            Kz {product.price.toLocaleString("pt-AO")}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-1">
            <button
              onClick={handleAdd}
              className={`flex-1 flex items-center justify-center gap-1 text-white text-xs font-semibold py-2 rounded-lg transition ${
                added ? "bg-green-600" : "bg-black hover:bg-orange-600"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Adicionado
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" /> Adicionar
                </>
              )}
            </button>
            <Link
              to={`/lojas/${product.stores.id}`}
              className="flex items-center justify-center w-9 rounded-lg border border-gray-200 hover:border-orange-500 hover:text-orange-600 text-gray-600 transition"
            >
              <Store className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
