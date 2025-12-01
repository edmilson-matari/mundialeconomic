// components/MobileCompactProductCard.tsx
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProductDetail } from "./Types/product";

interface MobileCompactProductCardProps {
  product: ProductDetail;
}

export default function MobileCompactProductCard({
  product,
}: MobileCompactProductCardProps) {
  const rating = product.stores.rating || 4.8;

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
    // block em mobile, hidden em sm+ (640px+)
    <div className="block sm:hidden w-full">
      <Link to={`/lojas/${product.stores.id}`} className="block w-full">
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
          {/* Imagem com aspect ratio fixo para alinhamento perfeito */}
          <div className="aspect-[3/4] bg-gray-50 relative">
            <img
              src={product.image_url || "/placeholder.jpg"}
              alt={product.productName}
              className="w-full h-full object-cover"
            />

            {/* Badge opcional (HOT, NEW, etc) */}
            {product.badge && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                {product.badge.type === "hot"
                  ? "HOT"
                  : product.badge.type === "new"
                  ? "NEW"
                  : "OFERTA"}
              </div>
            )}
          </div>

          {/* Preço e Rating */}
          <div className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-orange-600">
                Kz {product.price.toLocaleString("pt-AO")}
              </span>

              <div className="flex items-center gap-1">
                {renderStars()}
                <span className="text-xs text-gray-600 ml-1">
                  {rating.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Nome do produto opcional (1 linha truncada) - opcional, mas ajuda SEO/UX */}
            <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-tight">
              {product.productName}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
