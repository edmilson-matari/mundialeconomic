// components/HotDealCard.tsx
import { Star, Store, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProductDetail } from "./Types/product";

interface HotDealCardProps {
  product: ProductDetail;
}

export default function HotDealCard({ product }: HotDealCardProps) {
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
    <div className="flex-none w-full sm:w-80 md:w-72 lg:w-80">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
        {/* Imagem com altura fixa */}
        <div className="relative bg-gray-50 h-60 flex items-center justify-center overflow-hidden">
          <img
            src={product.image_url}
            alt={product.productName}
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />

          {/* Logo da loja no canto */}
          <div className="absolute top-3 left-3">
            <img
              src={product.stores.logo || "/default-store.png"}
              alt={product.stores.name}
              className="w-14 h-14 rounded-full border-4 border-white shadow-xl object-cover ring-2 ring-white/50"
            />
          </div>

          {/* Badge Hot Deal */}
          {product.badge && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              {product.badge?.type === "new"
                ? "NEW"
                : product.badge?.type === "hot"
                ? "HOT"
                : "DISCOUNT"}
            </div>
          )}
        </div>

        {/* Conteúdo com altura flexível mas controlada */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Nome da loja */}
          <p className="text-sm font-semibold text-orange-600 truncate">
            {product.stores.name}
          </p>

          {/* Nome do produto - sempre 2 linhas */}
          <h3 className="font-bold text-gray-800 mt-1 line-clamp-2 leading-tight min-h-12">
            {product.productName}
          </h3>

          {/* Avaliação */}
          <div className="flex items-center gap-2 mt-2">
            {renderStars(product.stores.rating || 4)}
            <span className="text-xs text-gray-500">
              ({product.stores.rating || "4.8"})
            </span>
          </div>

          {/* Preço */}
          <div className="mt-4 flex items-end justify-between">
            <div>
              <span className="text-3xl font-bold text-orange-600">
                Kz {product.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Botões - sempre na mesma posição */}
          <div className="mt-6 flex gap-3">
            {/* Adicionar ao Carrinho */}
            <button className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Adicionar</span>
            </button>

            {/* Visitar Loja */}
            <Link to={`/lojas/${product.stores.id}`} className="flex-1">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-white border-2 border-gray-300 rounded-xl font-medium text-gray-700 hover:border-orange-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 shadow-sm hover:shadow-md">
                <Store className="w-5 h-5" />
                <span>Visitar Loja</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
